import { TranslateResult } from 'vue-i18n';
import { friendlyDate, isSameDay, startOfDay } from './dates';
import { localiseFromObject } from './locales';
import {
  ConferenceConfig,
  ScheduleRecord,
  Session,
  SessionSlot
} from '@openlab/deconf-shared';

export interface ScheduleFilterRecord {
  query: string;
  sessionType: string | null;
  track: string | null;
  theme: string | null;
  date: Date | null;
  isRecorded: boolean | null;
  viewMode: 'all' | 'user';
  language: string | null;
}

export interface SlotWithSessions {
  slot: SessionSlot;
  sessions: Session[];
}

export interface SessionAndSlot {
  session: Session;
  slot: SessionSlot;
}

/** Take a set of sessios and slots and group them by slot */
export function groupSessionsBySlot(
  sessions: Session[],
  sessionSlots: SessionSlot[]
): SlotWithSessions[] {
  const bySlot = new Map<string, Session[]>();

  for (const session of sessions) {
    if (!session.slot) continue;
    const match = bySlot.get(session.slot);

    if (match) match.push(session);
    else bySlot.set(session.slot, [session]);
  }

  return sessionSlots
    .map(slot => ({
      slot: slot,
      sessions: bySlot.get(slot.id) || []
    }))
    .filter(slotted => slotted.sessions.length > 0);
}

export interface DailySessions {
  title: TranslateResult;
  date: Date;
  groups: SlotWithSessions[];
}

export function groupSessionsByDay(
  sessions: Session[],
  sessionSlots: SessionSlot[]
): DailySessions[] {
  // Group sessions by their slot
  const slottedSessions = groupSessionsBySlot(sessions, sessionSlots);

  // Generate a key based on a date (excluding time)
  const keyify = (d: Date) => startOfDay(d).toISOString();

  // Group slots (and their sessions) by the day that they are on
  // Only include where there are sessions
  const groupedByDay = new Map<string, SlotWithSessions[]>();
  for (const group of slottedSessions) {
    if (group.sessions.length === 0) continue;
    const key = keyify(group.slot.start);
    const groups = groupedByDay.get(key) || [];
    groups.push(group);
    groupedByDay.set(key, groups);
  }

  // Bundle the date-mapped groups into an single array for return
  const output: DailySessions[] = [];
  for (const [day, groups] of groupedByDay) {
    const date = new Date(day);
    const title = friendlyDate(date);
    output.push({ date, title, groups });
  }

  // Make sure they are still in order
  output.sort((a, b) => a.date.getTime() - b.date.getTime());

  return output;
}

/** Load and parse schedule filters from localStorage, setting missing default values */
export function loadScheduleFilters(key: string): ScheduleFilterRecord {
  try {
    const json = localStorage.getItem(key);
    if (!json) throw new Error();

    const urlFilters = JSON.parse(json);

    const filters: ScheduleFilterRecord = {
      ...decodeScheduleFilters(urlFilters),
      viewMode: decoder.enum(urlFilters.viewMode, ['all', 'user'])
    };

    return filters;
  } catch (error) {
    return decodeScheduleFilters({});
  }
}

/** Determine if any of the filters in a record are "active" */
export function filtersAreSet(filters: ScheduleFilterRecord): boolean {
  return Object.keys(filters)
    .filter(k => k !== 'viewMode')
    .some(k => Boolean(filters[k as keyof ScheduleFilterRecord]));
}

/** A method used to yes/no a session based on some unknown logic */
export type SessionPredicate = (session: Session) => boolean;

/**
 * Create a SessionPredicate based on a text query an a locale
 * Returns null when no query should be applied
 */
export function createQueryPredicate(
  locale: string,
  query: string | undefined,
  schedule: ScheduleRecord
): SessionPredicate | null {
  if (!query || !query.trim()) return null;

  // A little method to trim down a string, removing excess whitespace and casing
  const trim = (input: string) => input.toLowerCase().replace(/\s+/g, ' ');

  // Cache a trimmed version of the query and have a method to test a string matches it
  const trimmedQuery = trim(query);
  const matchesQuery = (input: string) => trim(input).includes(trimmedQuery);

  // Cache a map of speaker-id to their name for easy lookups
  const speakerNames = new Map(schedule.speakers.map(s => [s.id, s.name]));

  // Create a SessionPredicate to match if a session contains a text value
  // Based on OR logic so passes if any sub-value matches the string.
  // So it returns true as soon as possible.
  return (session: Session): boolean => {
    if (matchesQuery(session.id)) return true;

    // Check the session title
    const title = localiseFromObject(locale, session.title);
    if (title && matchesQuery(title)) return true;

    // Check the speaker names
    const speakers = session.speakers.map(s => speakerNames.get(s));
    if (speakers.some(name => name && matchesQuery(name))) return true;

    // At this point no strings matched
    return false;
  };
}

/**
 * Create a SessionPredicate based on a set of relational filters.
 * With null meaning "no filters apply"
 */
export function createFilterPredicate(
  locale: string,
  filters: ScheduleFilterRecord,
  schedule: ScheduleRecord
): SessionPredicate | null {
  if (!filtersAreSet(filters)) return null;

  const { sessionType, track, date, isRecorded, theme, language } = filters;

  // Cache a map of slot-id to slot for easy lookups
  const sessionSlotMap = new Map(schedule.slots.map(s => [s.id, s]));

  // Cache a text-based query predicate
  const queryPredicate = createQueryPredicate(locale, filters.query, schedule);

  // Create a predicate based on cached values to determine if a session
  // matches the set filters.
  // Based on AND logic so all parts of the filter (if set) must match.
  // So it returns false as soon as possible.
  return session => {
    // Check the text query
    if (queryPredicate && !queryPredicate(session)) return false;

    // Check the session type
    if (sessionType !== null && session.type !== sessionType) return false;

    // Check the track
    if (track !== null && session.track !== track) return false;

    // Check for themes
    if (theme !== null && !session.themes.includes(theme)) return false;

    // Check for language
    if (language !== null && !session.hostLanguages.includes(language)) {
      return false;
    }

    // Check the date
    const slot = session.slot ? sessionSlotMap.get(session.slot) : null;
    if (date && !slot) return false;
    if (date && slot && !isSameDay(slot.start, date)) return false;

    // Check if recorded
    if (isRecorded !== null && session.isRecorded !== isRecorded) return false;

    // If all logic passed at this point, the session matches
    return true;
  };
}

/** Determine if the cofference is happening right now or not */
export function isDuringConference(
  scheduleDate: Date,
  appSettings: ConferenceConfig | null
): boolean {
  if (!appSettings) return false;
  return (
    appSettings.startDate.getTime() < scheduleDate.getTime() &&
    appSettings.endDate.getTime() > scheduleDate.getTime()
  );
}

export function getFeaturedSessions(
  schedule: ScheduleRecord | null,
  daysInFuture: number,
  currentDate: Date,
  predicate: (session: Session) => boolean
): SessionAndSlot[] | null {
  if (!schedule) return null;
  if (!schedule.settings.schedule.enabled) return null;

  const now = currentDate.getTime();
  const inTheFuture = now + daysInFuture * 24 * 60 * 60 * 1000;
  const slotMap = new Map(schedule.slots.map(s => [s.id, s]));

  return schedule.sessions
    .filter(session => Boolean(session.slot) && predicate(session))
    .map(session => ({
      slot: slotMap.get(session.slot as string) as SessionSlot,
      session: session
    }))
    .filter(
      group =>
        Boolean(group.slot) &&
        group.slot.end.getTime() > now &&
        group.slot.start.getTime() < inTheFuture
    )
    .sort((a, b) => a.slot.start.getTime() - b.slot.start.getTime());
}

export function encodeScheduleFilters(
  filters: ScheduleFilterRecord
): Record<Exclude<keyof ScheduleFilterRecord, 'viewMode'>, string> {
  return stripNulls({
    query: encoder.string(filters.query),
    sessionType: encoder.string(filters.sessionType),
    track: encoder.string(filters.track),
    theme: encoder.string(filters.theme),
    language: encoder.string(filters.language),
    date: encoder.date(filters.date),
    isRecorded: encoder.boolean(filters.isRecorded)
  });
}

export function decodeUrlScheduleFilters(
  input: Record<string, unknown>
): ScheduleFilterRecord | null {
  if (Object.keys(input).length === 0) return null;
  return decodeScheduleFilters(input);
}

export function decodeScheduleFilters(
  input: Record<string, unknown>
): ScheduleFilterRecord {
  return {
    viewMode: 'all',
    query: decoder.string(input.query) || '',
    sessionType: decoder.string(input.sessionType),
    track: decoder.string(input.track),
    theme: decoder.string(input.theme),
    date: decoder.date(input.date),
    isRecorded: decoder.boolean(input.isRecorded),
    language: decoder.string(input.language)
  };
}

const encoder = {
  string(value: unknown) {
    return typeof value === 'string' && value ? value : null;
  },
  boolean(value: unknown) {
    if (typeof value !== 'boolean') return null;
    return value ? 'true' : 'false';
  },
  date(value: unknown) {
    return value instanceof Date ? value.toISOString() : null;
  },
  enum(value: unknown, options: unknown[]) {
    return options.includes(value) ? value : null;
  }
};
const decoder = {
  string(value: unknown) {
    return typeof value === 'string' ? value : null;
  },
  boolean(value: unknown) {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return null;
  },
  date(value: unknown) {
    if (typeof value !== 'string') return null;
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return null;
    return date;
  },
  enum<T extends string>(value: T, options: T[]) {
    return options.includes(value) ? value : options[0];
  }
};

type NonNullRecord<T> = { [K in keyof T]: NonNullable<T[K]> };

function stripNulls<T extends Record<string, unknown>>(
  input: T
): NonNullRecord<T> {
  return Object.fromEntries(
    Object.entries(input).filter(pair => pair[1] !== null)
  ) as NonNullRecord<T>;
}

export function getSlug(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/[^\w-]+/g, '');
}

export interface DateRange {
  start: Date;
  end: Date;
}

/** Get the earliest and lastest dates based on a set of sessions */
export function getScheduleStartAndEnd(
  sessions: Session[],
  schedule: ScheduleRecord
): DateRange | null {
  const slots = new Map(schedule.slots.map(s => [s.id, s]));

  let firstDate: Date | null = null;
  let lastDate: Date | null = null;

  for (const session of sessions) {
    const slot = session.slot ? slots.get(session.slot) : undefined;
    if (!slot) continue;

    if (!firstDate || slot.start.getTime() < firstDate.getTime()) {
      firstDate = slot.start;
    }

    if (!lastDate || slot.end.getTime() > lastDate.getTime()) {
      lastDate = slot.end;
    }
  }

  if (!firstDate || !lastDate) return null;

  return {
    start: firstDate,
    end: lastDate
  };
}

/** Wether a `Date` is inside a `DateRange` */
export function isInRange(range: DateRange, date: Date): boolean {
  return (
    date.getTime() >= range.start.getTime() &&
    date.getTime() <= range.end.getTime()
  );
}

/**
 * Create a new schedule record with only the relevant resource in it.
 * It looks through each session and only keeps slots/speakers/themes/tracks/types
 * that existing on the provided sessions.
 */
export function filterScheduleFromSessions(
  schedule: ScheduleRecord,
  sessions: Session[]
): ScheduleRecord {
  const slotIds = new Set<string>();
  const speakerIds = new Set<string>();
  const themeIds = new Set<string>();
  const trackIds = new Set<string>();
  const typeIds = new Set<string>();

  for (const session of sessions) {
    if (session.slot) slotIds.add(session.slot);
    if (session.track) trackIds.add(session.track);
    if (session.type) typeIds.add(session.type);

    session.speakers.forEach(id => speakerIds.add(id));
    session.themes.forEach(id => themeIds.add(id));
  }

  const slots = schedule.slots.filter(s => slotIds.has(s.id));
  const speakers = schedule.speakers.filter(s => speakerIds.has(s.id));
  const themes = schedule.themes.filter(s => themeIds.has(s.id));
  const tracks = schedule.tracks.filter(s => trackIds.has(s.id));
  const types = schedule.types.filter(s => typeIds.has(s.id));

  return { ...schedule, slots, speakers, themes, tracks, types };
}
