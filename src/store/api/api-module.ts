import { Module } from 'vuex';
import ky from 'ky';
import {
  AuthenticateOptions,
  AuthToken,
  ConfigSettings,
  Registration,
  Session,
  SessionSlot,
  SessionType,
  Speaker,
  Theme,
  Track
} from '../../lib/module';
import { ApiState } from './ApiState';

export interface ApiModuleState {
  schedule: null | {
    sessions: Session[];
    settings: ConfigSettings;
    slots: SessionSlot[];
    speakers: Speaker[];
    themes: Theme[];
    tracks: Track[];
    types: SessionType[];
  };
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
function deserialiseData(data: NotNull<ApiModuleState['schedule']>) {
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
}

/** A method to seal javascript objects to improve Vue performance */
export function deepSeal<T>(input: T): T {
  Object.seal(input);
  if (Array.isArray(input)) {
    for (const item of input) deepSeal(item);
  }
  if (typeof input === 'object') {
    for (const key in input) deepSeal(input[key]);
  }
  return input;
}

/** Decode a base64 JWT */
function decodeJwt(token: string) {
  return JSON.parse(window.atob(token.split('.')[1]));
}

interface ApiStoreModuleOptions {
  apiBaseUrl: string;
  getAuthorization: () => string;
}

interface ApiClient {
  getSchedule(): Promise<void>;
  getSessionLinks(sessionId: string): Promise<void>;
}

export function createApiStoreModule({
  apiBaseUrl,
  getAuthorization
}: ApiStoreModuleOptions): ApiModule {
  const agent = ky.extend({
    prefixUrl: apiBaseUrl,
    hooks: {
      beforeRequest: [
        request => {
          const token = getAuthorization();
          if (token) {
            request.headers.set('Authorization', `Bearer ${token}`);
          }
        }
      ]
    }
  });

  return {
    state: {
      schedule: null,
      apiState: ApiState.init,
      user: null,
      siteVisitors: 0,
      profile: null,
      carbon: null,
      userSessions: null
    },
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
        if (schedule) deserialiseData(schedule);
        state.schedule = schedule;
      },
      state: (state, apiState: ApiState) => {
        state.apiState = apiState;
      },
      user: (state, user: AuthToken) => {
        state.user = user;
      },
      profile: (state, profile: Registration) => {
        state.profile = profile;
      },
      userSessions: (state, userSessions: string[]) => {
        state.userSessions = userSessions;
      }
    },
    actions: {
      async authenticate({ commit, dispatch }, { token }: AuthenticateOptions) {
        const user = decodeJwt(token);
        commit('user', user);

        dispatch('fetchUserAttendance');
      },
      async fetchData({ commit }): Promise<boolean> {
        try {
          const data = await agent.get('schedule').json();
          commit('data', deepSeal(data));
          commit('state', ApiState.ready);
          return true;
        } catch (error) {
          console.error(error);
          commit('data', null);
          commit('state', ApiState.error);
          return false;
        }
      }
    }
  };
}
