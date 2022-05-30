import {
  ConferenceConfig,
  ScheduleRecord,
  Session,
  SessionSlot,
  SessionState,
  SessionType,
  SessionVisibility,
  Speaker,
  Theme,
  Track,
} from '@openlab/deconf-shared';
import { dates } from './dates';
import { SelectOption } from '../form/module';
import { Sponsor } from '../lib/module';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

//
// V2
//

const loremIpsum = `We gotta burn the rain forest, dump toxic waste, pollute the air, and rip up the OZONE! 'Cause maybe if we screw up this planet enough, they won't want it anymore! Eventually, you do plan to have dinosaurs on your dinosaur tour, right? Yeah, but your scientists were so preoccupied with whether or not they could, they didn't stop to think if they should.`;

function makeFixture<T>(base: T) {
  return (options: Partial<T> = {}): T => ({ ...base, ...options });
}

function localise(text: string) {
  return { en: text, fr: text, es: text, ar: text };
}

export const mockSession = makeFixture<Session>({
  id: 'session-a',
  type: 'plenary',
  slot: undefined,
  track: 'track-a',
  themes: ['theme-a', 'theme-b'],
  coverImage: undefined,
  title: localise('Session Title'),
  content: localise(loremIpsum),
  links: [
    { type: 'video', url: 'https://youtu.be/dQw4w9WgXcQ', language: 'en' },
  ],
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
  hideFromSchedule: false,
});

export const mockSessionSlot = makeFixture<SessionSlot>({
  id: 'slot-a',
  start: dates.future,
  end: dates.past,
});

export const mockSessionType = makeFixture<SessionType>({
  id: 'plenary',
  iconGroup: 'fab',
  iconName: 'youtube',
  layout: 'plenary',
  title: { en: 'Plenary' },
});

export const mockSpeaker = makeFixture<Speaker>({
  id: 'speaker-a',
  name: 'Speaker Name',
  role: localise('Speaker role'),
  bio: localise(loremIpsum),
  headshot: '/headshot.svg',
});

export const mockTrack = makeFixture<Track>({
  id: 'track-a',
  title: localise('Track Name'),
});

export const mockTheme = makeFixture<Theme>({
  id: 'theme-a',
  title: localise('Theme Name'),
});

export const mockSettings = makeFixture<ConferenceConfig>({
  atrium: { enabled: true, visible: true },
  whatsOn: { enabled: true, visible: true },
  schedule: { enabled: true, visible: true },
  coffeeChat: { enabled: true, visible: true },
  helpDesk: { enabled: true, visible: true },

  startDate: new Date(),
  endDate: new Date(),
  isStatic: false,
});

export const mockSponsor = makeFixture<Sponsor>({
  title: 'Corp A',
  image: '/openlab.svg',
  href: 'https://openlab.ncl.ac.uk',
});

export function defaultLanguages(): SelectOption[] {
  return [
    { value: 'en', text: 'English' },
    { value: 'fr', text: 'Français' },
    { value: 'es', text: 'Español' },
    { value: 'ar', text: 'عربى' },
  ];
}

//
// v1
//

export function createSponsors(n: number): Sponsor[] {
  return Array.from({ length: n }, (_, i) =>
    mockSponsor({ title: `Corp ${ALPHABET[i % ALPHABET.length]}` })
  );
}

export function defaultSessionTypes(): SessionType[] {
  return [
    {
      id: 'plenary',
      iconGroup: 'fab',
      iconName: 'youtube',
      layout: 'plenary',
      title: { en: 'Plenary' },
    },
    {
      id: 'workshop',
      iconGroup: 'fas',
      iconName: 'users',
      layout: 'workshop',
      title: { en: 'Workshop' },
    },
  ];
}

export function defaultSpeakers(): Speaker[] {
  return [
    mockSpeaker({
      id: '1',
      name: 'Geoff Testington',
      role: localise('Chief Financial Officer'),
    }),
    mockSpeaker({
      id: '2',
      name: 'Felicity Wainwright',
      role: localise('Chief Technical Officer'),
    }),
    mockSpeaker({
      id: '3',
      name: 'David Edge',
      role: localise('Internal Interactions Designer'),
    }),
    mockSpeaker({
      id: '4',
      name: 'Lorena Bernal',
      role: localise('Chief Metrics Specialist'),
    }),
    mockSpeaker({
      id: '5',
      name: 'Katlyn Swift',
      role: localise('Lead Implementation Coordinator'),
    }),
    mockSpeaker({
      id: '6',
      name: 'Sid Hills',
      role: localise('Product Data Associate'),
    }),
    mockSpeaker({
      id: '7',
      name: 'Noah Senior',
      role: localise('Principal Identity Planner'),
    }),
    mockSpeaker({
      id: '8',
      name: 'Dolcie Wallace',
      role: localise('Dynamic Interactions Analyst'),
    }),
    mockSpeaker({
      id: '9',
      name: 'Farrell Rocha',
      role: localise('Human Paradigm Liason'),
    }),
  ];
}

export function defaultTracks(): Track[] {
  return [
    mockTrack({ id: 'track-a', title: localise('AI and Agriculture') }),
    mockTrack({
      id: 'track-b',
      title: localise('Machine Learning with Fish'),
    }),
    mockTrack({ id: 'track-c', title: localise('Block Chain Horoscopes') }),
  ];
}

export function defaultThemes(): Theme[] {
  return [
    mockTheme({ id: 'theme-a', title: localise('Inclusivity') }),
    mockTheme({ id: 'theme-b', title: localise('Awareness') }),
    mockTheme({ id: 'theme-c', title: localise('Engagement') }),
  ];
}

export function createSchedule(): ScheduleRecord {
  return {
    speakers: defaultSpeakers().slice(0, 4),
    slots: [
      {
        id: 'slot-a',
        start: dates.addMinutes(dates.now, -45),
        end: dates.addMinutes(dates.now, -15),
      },
      {
        id: 'slot-b',
        start: dates.addMinutes(dates.now, -15),
        end: dates.addMinutes(dates.now, 15),
      },
      {
        id: 'slot-c',
        start: dates.addMinutes(dates.now, 15),
        end: dates.addMinutes(dates.now, 75),
      },
    ],
    tracks: defaultTracks(),
    themes: defaultThemes(),
    types: defaultSessionTypes(),
    settings: mockSettings(),
    sessions: [],
  };
}

export function randomNumber(min: number, max: number): number {
  return min + Math.floor(Math.random() * (max - min));
}

export function randomElement<T>(array: T[]): T {
  return array[randomNumber(0, array.length)];
}

export function randomElements<T>(array: T[], max = array.length): T[] {
  const count = randomNumber(1, Math.min(max, array.length));
  return array.slice(0, count).sort(() => (Math.random() > 0.5 ? -1 : 1));
}

let randomId = 1;

export function randomSession(
  schedule: ScheduleRecord,
  options: Partial<Session> = {}
): Session {
  const langs = ['fr', 'es', 'ar'];
  return mockSession({
    id: `session-${randomId++}`,
    type: randomElement(schedule.types).id,
    slot: randomElement(schedule.slots).id,
    track: randomElement(schedule.tracks).id,
    themes: randomElements(schedule.themes, 3).map((t) => t.id),
    speakers: randomElements(schedule.speakers, 5).map((t) => t.id),
    hostLanguages: ['en', randomElement(langs)],
    ...options,
  });
}
