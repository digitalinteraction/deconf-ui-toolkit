import { ScheduleFilterRecord } from '../components/schedule/filtering/ScheduleFilterRecord'
import { FullSchedule } from './api'
import { friendlyDate, isSameDay, startOfDay } from './dates'
import { localiseFromObject } from './locales'
import { ConferenceConfig, Session, SessionSlot } from '@openlab/deconf-shared'

// TODO:
// - Add test coverage

export interface SlotWithSessions {
  slot: SessionSlot
  sessions: Session[]
}

/** Take a set of sessios and slots and group them by slot */
export function groupSessionsBySlot(
  sessions: Session[],
  sessionSlots: SessionSlot[]
): SlotWithSessions[] {
  const bySlot = new Map<string, Session[]>()

  for (const session of sessions) {
    if (!session.slot) continue
    const match = bySlot.get(session.slot)

    if (match) match.push(session)
    else bySlot.set(session.slot, [session])
  }

  return sessionSlots
    .map((slot) => ({
      slot: slot,
      sessions: bySlot.get(slot.id) || [],
    }))
    .filter((slotted) => slotted.sessions.length > 0)
}

export interface DailySessions {
  title: string
  date: Date
  groups: SlotWithSessions[]
}

export function groupSessionsByDay(
  sessions: Session[],
  sessionSlots: SessionSlot[]
): DailySessions[] {
  // Group sessions by their slot
  const slottedSessions = groupSessionsBySlot(sessions, sessionSlots)

  // Generate a key based on a date (excluding time)
  const keyify = (d: Date) => startOfDay(d).toISOString()

  // Group slots (and their sessions) by the day that they are on
  // Only include where there are sessions
  const groupedByDay = new Map<string, SlotWithSessions[]>()
  for (const group of slottedSessions) {
    if (group.sessions.length === 0) continue
    const key = keyify(group.slot.start)
    const groups = groupedByDay.get(key) || []
    groups.push(group)
    groupedByDay.set(key, groups)
  }

  // Bundle the date-mapped groups into an single array for return
  const output: DailySessions[] = []
  for (const [day, groups] of groupedByDay) {
    const date = new Date(day)
    const title = friendlyDate(date)
    output.push({ date, title, groups })
  }

  // Make sure they are still in order
  output.sort((a, b) => a.date.getTime() - b.date.getTime())

  return output
}

/** Load and parse schedule filters from localStorage, setting missing default values */
export function loadScheduleFilters(key: string): ScheduleFilterRecord {
  try {
    const json = localStorage.getItem(key)
    if (!json) throw new Error()

    // Using a reviver is fine while ScheduleFilters contains no complex objects
    return JSON.parse(json, (key, value) => {
      switch (key) {
        case 'query': {
          return typeof value === 'string' ? value : ''
        }
        case 'sessionType':
        case 'theme':
        case 'track': {
          return typeof value === 'string' ? value : null
        }
        case 'date': {
          if (typeof value !== 'string') return null
          const date = new Date(value)
          return Number.isNaN(date) ? null : date
        }
        case 'isRecorded': {
          return typeof value === 'boolean' ? value : null
        }
        case 'viewMode': {
          return ['all', 'user'].includes(value) ? value : 'all'
        }

        default:
          return value
      }
    })
  } catch (error) {
    return {
      viewMode: 'all',
      query: '',
      sessionType: null,
      track: null,
      theme: null,
      date: null,
      isRecorded: null,
    }
  }
}

/** Determine if any of the filters in a record are "active" */
export function filtersAreSet(filters: ScheduleFilterRecord): boolean {
  return Object.keys(filters)
    .filter((k) => k !== 'viewMode')
    .some((k) => Boolean(filters[k as keyof ScheduleFilterRecord]))
}

/** A method used to yes/no a session based on some unknown logic */
export type SessionPredicate = (session: Session) => boolean

/**
 * Create a SessionPredicate based on a text query an a locale
 * Returns null when no query should be applied
 */
export function createQueryPredicate(
  locale: string,
  query: string | undefined,
  schedule: FullSchedule
): SessionPredicate | null {
  if (!query || !query.trim()) return null

  // A little method to trim down a string, removing excess whitespace and casing
  const trim = (input: string) => input.toLowerCase().replace(/\s+/g, ' ')

  // Cache a trimmed version of the query and have a method to test a string matches it
  const trimmedQuery = trim(query)
  const matchesQuery = (input: string) => trim(input).includes(trimmedQuery)

  // Cache a map of speaker-id to their name for easy lookups
  const speakerNames = new Map(schedule.speakers.map((s) => [s.id, s.name]))

  // Create a SessionPredicate to match if a session contains a text value
  // Based on OR logic so passes if any sub-value matches the string.
  // So it returns true as soon as possible.
  return (session: Session): boolean => {
    if (matchesQuery(session.id)) return true

    // Check the session title
    const title = localiseFromObject(locale, session.title)
    if (title && matchesQuery(title)) return true

    // Check the speaker names
    const speakers = session.speakers.map((s) => speakerNames.get(s))
    if (speakers.some((name) => name && matchesQuery(name))) return true

    // At this point no strings matched
    return false
  }
}

/**
 * Create a SessionPredicate based on a set of relational filters.
 * With null meaning "no filters apply"
 */
export function createFilterPredicate(
  locale: string,
  filters: ScheduleFilterRecord,
  schedule: FullSchedule
): SessionPredicate | null {
  if (!filtersAreSet(filters)) return null

  const { sessionType, track, date, isRecorded, theme } = filters

  // Cache a map of slot-id to slot for easy lookups
  const sessionSlotMap = new Map(schedule.slots.map((s) => [s.id, s]))

  // Cache a text-based query predicate
  const queryPredicate = createQueryPredicate(locale, filters.query, schedule)

  // Create a predicate based on cached values to determine if a session
  // matches the set filters.
  // Based on AND logic so all parts of the filter (if set) must match.
  // So it returns false as soon as possible.
  return (session) => {
    // Check the text query
    if (queryPredicate && !queryPredicate(session)) return false

    // Check the session type
    if (sessionType !== null && session.type !== sessionType) return false

    // Check the track
    if (track !== null && session.track !== track) return false

    // Check for themes
    if (theme !== null && !session.themes.includes(theme)) return false

    // Check the date
    const slot = session.slot ? sessionSlotMap.get(session.slot) : null
    if (date && !slot) return false
    if (date && slot && !isSameDay(slot.start, date)) return false

    // Check if recorded
    if (isRecorded !== null && session.isRecorded !== isRecorded) return false

    // If all logic passed at this point, the session matches
    return true
  }
}

/** Determine if the cofference is happening right now or not */
export function isDuringConference(
  scheduleDate: Date,
  appSettings: ConferenceConfig | null
): boolean {
  if (!appSettings) return false
  return (
    appSettings.startDate.getTime() < scheduleDate.getTime() &&
    appSettings.endDate.getTime() > scheduleDate.getTime()
  )
}
