export interface ConfigFlag {
  enabled: boolean;
  visible: boolean;
}

export interface User {
  kind: 'auth';
  sub: number;
  user_roles: string[];
  user_lang: string;
}

export interface AppSettings {
  atrium: ConfigFlag;
  whatsOn: ConfigFlag;
  schedule: ConfigFlag;
  coffeeChat: ConfigFlag;
  helpDesk: ConfigFlag;

  startDate: Date;
  endDate: Date;
  isStatic: boolean;

  availableLanguages: Array<{
    locale: string;
    title: string;
  }>;
}

// IDEA: can we abstract the theme to this object and pass it around?
export interface AppTheme {
  // #ff6f61
  primaryColor: string;

  // #ffffff
  primaryColorAlt: string;

  // #6c63ff
  secondaryColor: string;
  // #ffffff

  secondaryColorAlt: string;

  // #363636
  textColor: string;
}

type Localised = Record<string, string | undefined>;

export interface SessionLink {
  type: string;
  url: string;
  title?: string;
  language: string;
}

export interface Session {
  id: string;
  type: string;
  slot: string | undefined;
  track: string;
  themes: string[];
  coverImage: string;
  title: Localised;
  content: Localised;
  links: SessionLink[];
  // hostName: string,
  // hostEmail: string,
  hostLanguage: string[];
  enableInterpretation: boolean;
  speakers: string[];
  hostOrganisation: Localised;
  isRecorded: boolean;
  // attendeeInteraction: enums(['view', 'q-and-a', 'workshop', 'games']),
  // attendeeDevices: enums(['desktop', 'mobile', 'all']),
  isOfficial: boolean;
  // isDraft: boolean
  isFeatured: boolean;
  // isCancelled: optional(boolean()),
  // isPublic: optional(boolean()),
  visibility: 'public' | 'private';
  state: 'draft' | 'accepted' | 'rejected' | 'cancelled';

  proxyUrl: string | undefined;
  hideFromSchedule: boolean;
}

export interface SessionSlot {
  id: string;
  start: Date;
  end: Date;
}

export interface SessionType {
  id: string;
  iconGroup: string;
  iconName: string;
  layout: string;
  title: Localised;
}

export interface Speaker {
  id: string;
  name: string;
  role: Localised;
  bio: Localised;
  headshot: string;
}

//
// Previously in components/SponsorGrid but moved out for building TypeScript
// - https://github.com/vuejs/vue-loader/issues/1281
//
export type SponsorSize = 'large' | 'medium' | 'regular' | 'small';

export interface SponsorGroup {
  title: string;
  size: SponsorSize;
  sponsors: Sponsor[];
}

export interface Sponsor {
  title: string;
  image: string;
  href?: string;
}
