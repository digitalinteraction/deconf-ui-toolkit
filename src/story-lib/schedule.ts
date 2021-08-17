import {
  ScheduleRecord,
  Session,
  SessionSlot,
  SessionState,
  SessionVisibility,
  Speaker,
  Theme,
  Track
} from '../lib/module';
import { dates } from './dates';

export function createSpeaker(id: string, name: string, role: string): Speaker {
  return {
    id: id,
    name: name,
    role: { en: role },
    bio: {
      en: ` Just my luck, no ice. You really think you can fly that thing? Eventually, you do plan to have dinosaurs on your dinosaur tour, right? You really think you can fly that thing? Yeah, but your scientists were so preoccupied with whether or not they could, they didn't stop to think if they should.`
    },
    headshot: '/headshot.svg'
  };
}

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function randomElement<T>(array: T[]) {
  return array[Math.floor(Math.random() * array.length)];
}

export function createSponsors(n: number) {
  const s = [];
  for (let i = 0; i < n; i++) {
    s.push({
      title: `Corp ${alphabet[i % alphabet.length]}`,
      image: '/openlab.svg',
      href: 'https://openlab.ncl.ac.uk'
    });
  }
  return s;
}

export function createTrack(id: string, name: string): Track {
  return { id, title: { en: name } };
}

export function createTheme(id: string, name: string): Theme {
  return { id, title: { en: name } };
}

export function defaultSessionTypes() {
  return [
    {
      id: 'plenary',
      iconGroup: 'fab',
      iconName: 'youtube',
      layout: 'plenary',
      title: { en: 'Plenary' }
    },
    {
      id: 'workshop',
      iconGroup: 'fas',
      iconName: 'users',
      layout: 'workshop',
      title: { en: 'Workshop' }
    }
  ];
}

export function defaultSpeakers() {
  return [
    createSpeaker('1', 'Geoff Testington', 'Chief Financial Officer'),
    createSpeaker('2', 'Felicity Wainwright', 'Chief Technical Officer'),
    createSpeaker('3', 'David Edge', 'Internal Interactions Designer'),
    createSpeaker('4', 'Lorena Bernal', 'Chief Metrics Specialist'),
    createSpeaker('5', 'Katlyn Swift', 'Lead Implementation Coordinator'),
    createSpeaker('6', 'Sid Hills', 'Product Data Associate'),
    createSpeaker('7', 'Noah Senior', 'Principal Identity Planner'),
    createSpeaker('8', 'Dolcie Wallace', 'Dynamic Interactions Analyst'),
    createSpeaker('9', 'Farrell Rocha', 'Human Paradigm Liason')
  ];
}

export function defaultTracks() {
  return [
    createTrack('1', 'AI and Agriculture'),
    createTrack('2', 'Machine Learning with Fish'),
    createTrack('3', 'Block Chain Horoscopes')
  ];
}

export function createSession(
  id: string,
  title: string,
  type: string,
  speakers: string[],
  themes: string[],
  track: string
): Partial<Session> {
  return {
    id: id,
    type: type,
    title: {
      en: title
    },
    track: track,
    content: {
      en: `We gotta burn the rain forest, dump toxic waste, pollute the air, and rip up the OZONE! 'Cause maybe if we screw up this planet enough, they won't want it anymore! Eventually, you do plan to have dinosaurs on your dinosaur tour, right? Yeah, but your scientists were so preoccupied with whether or not they could, they didn't stop to think if they should.`
    },
    themes: themes,
    hostLanguages: ['EN', 'FR'],
    isRecorded: true,
    speakers: speakers
  };
}

export function createSchedule(): ScheduleRecord {
  return {
    speakers: defaultSpeakers().slice(0, 4),
    sessionSlots: [
      {
        id: '1',
        start: dates.addMinutes(dates.now, -15),
        end: dates.addMinutes(dates.now, 15)
      }
    ],
    tracks: [createTrack('1', 'AI and Agriculture')],
    themes: [createTheme('a', 'OSS'), createTheme('b', 'Micro services')],
    sessionTypes: [
      {
        id: 'plenary',
        iconGroup: 'fab',
        iconName: 'youtube',
        layout: 'plenary',
        title: { en: 'Plenary' }
      },
      {
        id: 'workshop',
        iconGroup: 'fas',
        iconName: 'users',
        layout: 'workshop',
        title: { en: 'Workshop' }
      }
    ]
  };
}

export function createSessionFromSchedule(
  schedule: ScheduleRecord
): Partial<Session> {
  const title = 'Lorem ipsum sil dor amet';

  return {
    id: '1',
    type: schedule.sessionTypes[0].id,
    title: {
      en: title
    },
    track: schedule.tracks[0].id,
    content: {
      en: `We gotta burn the rain forest, dump toxic waste, pollute the air, and rip up the OZONE! 'Cause maybe if we screw up this planet enough, they won't want it anymore! Eventually, you do plan to have dinosaurs on your dinosaur tour, right? Yeah, but your scientists were so preoccupied with whether or not they could, they didn't stop to think if they should.`
    },
    themes: schedule.themes.map(t => t.id),
    hostLanguages: ['EN', 'FR'],
    isRecorded: true,
    speakers: schedule.speakers.map(s => s.id)
  };
}

function makeFixture<T>(base: T) {
  return (options: Partial<T> = {}): T => ({ ...base, ...options });
}

export const mockSession = makeFixture<Session>({
  id: 'session-a',
  type: 'plenary',
  slot: undefined,
  track: 'track-a',
  themes: ['theme-a', 'theme-b'],
  coverImage: undefined,
  title: { en: 'Session Title' },
  content: { en: 'Session Info' },
  links: [{ type: 'video', url: 'https://youtu.be', language: 'en' }],
  hostLanguages: ['en'],
  enableInterpretation: false,
  speakers: ['speaker-a', 'speaker-b', 'speaker-c'],
  hostOrganisation: { en: 'Host Organisation' },
  isRecorded: false,
  isOfficial: false,
  isFeatured: false,
  visibility: SessionVisibility.public,
  state: SessionState.confirmed,
  participantCap: null,
  proxyUrl: undefined,
  hideFromSchedule: false
});

export const mockSessionSlot = makeFixture<SessionSlot>({
  id: 'slot-a',
  start: dates.future,
  end: dates.past
});
