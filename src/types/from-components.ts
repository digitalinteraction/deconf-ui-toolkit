//
// These types were previously in .vue files but moved out for building TypeScript
// - https://github.com/vuejs/vue-loader/issues/1281
//

import {
  SessionSlot,
  SessionType,
  Speaker,
  Theme,
  Track
} from '@openlab/deconf-shared';
import { Component } from 'vue';

//
// Previously in  SponsorRow.vue
//
export type SponsorSize = 'large' | 'medium' | 'regular' | 'small';

export interface Sponsor {
  title: string;
  image: string;
  href?: string;
}

//
// Previously in  SponsorGroup.vue
//
export interface SponsorGroup {
  title: string;
  size: SponsorSize;
  sponsors: Sponsor[];
}

//
// Previously in NavigationBar.vue
//
export interface AppRoute {
  title: string;
  name: string;
  enabled: boolean;
  icon?: Component;
}

//
// WIP
//
export interface ScheduleRecord {
  speakers: Speaker[];
  sessionSlots: SessionSlot[];
  sessionTypes: SessionType[];
  tracks: Track[];
  themes: Theme[];
}

export interface ScheduleConfig {
  tileHeader: Array<'type' | 'track' | 'themes'>;
  tileAttributes: Array<'languages' | 'recorded' | 'track' | 'themes'>;
}
