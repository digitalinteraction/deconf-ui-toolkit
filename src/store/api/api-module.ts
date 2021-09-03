import { Module } from 'vuex';
import {
  AuthToken,
  deepSeal,
  FullSchedule,
  Registration
} from '../../lib/module';
import { ApiState } from './api-state';

export interface ApiModuleState {
  schedule: null | FullSchedule;
  apiState: ApiState;
  user: AuthToken | null;
  siteVisitors: number | null;
  profile: null | Registration;
  carbon: null;
  userSessions: null | string[];
}

export type ApiModule = Module<ApiModuleState, {}>;

type NotNull<T> = T extends null ? never : T;

/** This function processes data before it is put into the store */
function deserialiseData(data: ApiModuleState['schedule']) {
  if (data === null) return null;

  data.settings.startDate = new Date(data.settings.startDate);
  data.settings.endDate = new Date(data.settings.endDate);
  data.settings.endDate.setHours(23, 59, 59);

  for (const slot of data.slots) {
    slot.start = new Date(slot.start);
    slot.end = new Date(slot.end);
  }
  for (const speaker of data.speakers) {
    if (!speaker.headshot) speaker.headshot = '/default-headshot.png';
  }

  return deepSeal(data);
}

//
// NOTE:
// I'm not sure what value this can add without concrete routes
//

export function createApiStoreModule(): ApiModule {
  return {
    namespaced: true,
    state: {
      schedule: null,
      apiState: ApiState.init,
      user: null,
      siteVisitors: 0,
      profile: null,
      carbon: null,
      userSessions: null
    },
    // TODO: Are these useful?
    getters: {
      user: s => s.user,
      sessions: s => (s.schedule ? s.schedule.sessions : []),
      slots: s => (s.schedule ? s.schedule.slots : []),
      speakers: s => (s.schedule ? s.schedule.speakers : []),
      themes: s => (s.schedule ? s.schedule.themes : []),
      tracks: s => (s.schedule ? s.schedule.tracks : []),
      types: s => (s.schedule ? s.schedule.types : []),
      settings: s => (s.schedule ? s.schedule.settings : null),
      profile: s => (s.schedule ? s.profile : null),
      userSessions: s => (s.schedule ? s.userSessions : [])
    },
    mutations: {
      schedule: (state, schedule: ApiModuleState['schedule']) => {
        state.schedule = deserialiseData(schedule);
        state.apiState = schedule ? ApiState.ready : ApiState.error;
      },
      state: (state, apiState: ApiState) => {
        state.apiState = apiState;
      },
      user: (state, user: AuthToken) => {
        state.user = deepSeal(user);
      },
      profile: (state, profile: Registration) => {
        state.profile = deepSeal(profile);
      },
      userSessions: (state, userSessions: string[]) => {
        state.userSessions = deepSeal(userSessions);
      }
    },
    actions: {
      // Let library-users provide the actions?
    }
  };
}
