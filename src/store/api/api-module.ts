import { Module } from '../vuex.ts';
import { deepSeal, createStateMapper, pause } from '../../lib/module';
import {
  Attendance,
  AuthToken,
  CarbonCalculation,
  Registration,
  ScheduleRecord,
} from '@openlab/deconf-shared';
import { ApiState } from './api-state.js';
import { DeconfApiClient } from '../../lib/api-client';

const API_DELAY = 300;

export interface ApiModuleState {
  schedule: null | ScheduleRecord;
  apiState: ApiState;
  user: AuthToken | null;
  profile: null | Registration;
  carbon: null | CarbonCalculation;
  userSessions: null | string[];
}

export type ApiStoreModule = Module<ApiModuleState, unknown>;

/** This function processes data before it is put into the store */
function hydrateSchedule(data: ApiModuleState['schedule']) {
  if (data === null) return null;

  for (const slot of data.slots) {
    slot.start = new Date(slot.start);
    slot.end = new Date(slot.end);
  }
  for (const speaker of data.speakers) {
    if (!speaker.headshot) speaker.headshot = '/default-headshot.png';
  }

  return deepSeal(data);
}

// function hydrateSettings(settings: ConferenceConfig) {
//   settings.startDate = new Date(settings.startDate);
//   settings.endDate = new Date(settings.endDate);
//   return deepSeal(settings);
// }

function hydrateProfile(profile: Registration | null) {
  if (profile === null) return null;

  return deepSeal({
    ...profile,
    created: new Date(profile.created),
  });
}

/** @deprecated clients should create their own with `createStateMapper` */
export const mapApiState = createStateMapper<ApiModuleState>();

export function createApiStoreModule(): ApiStoreModule {
  return {
    namespaced: true,
    state: {
      schedule: null,
      apiState: ApiState.init,
      user: null,
      profile: null,
      carbon: null,
      userSessions: null,
    },
    getters: {
      /** Internal to get a the ids of a user's sessions */
      userSessions: (state) => new Set(state.userSessions),

      /** Internal to know when there is a signed in user */
      isSignedIn: (state) => Boolean(state.user),
    },
    mutations: {
      schedule: (state, schedule: ApiModuleState['schedule']) => {
        state.schedule = hydrateSchedule(schedule);
        state.apiState = schedule ? ApiState.ready : ApiState.error;
      },
      state: (state, apiState: ApiState) => {
        state.apiState = apiState;
      },
      user: (state, user: AuthToken | null) => {
        state.user = deepSeal(user);
      },
      profile: (state, profile: Registration | null) => {
        state.profile = hydrateProfile(profile);
      },
      carbon: (state, carbon: CarbonCalculation) => {
        state.carbon = deepSeal(carbon);
      },
      userSessions: (state, userSessions: string[]) => {
        state.userSessions = deepSeal(userSessions);
      },
      userAttendance: (state, attendance: Attendance[]) => {
        state.userSessions = deepSeal(attendance.map((a) => a.session));
      },
    },
    actions: {
      // Let library-users provide the actions
    },
  };
}

/**
 * @deprecated this will used in `createApiStoreModule` in the next major version
 * @warning the `authenticate` action must still be implemented
 */
export function createApiStoreActions(
  api: DeconfApiClient,
): ApiStoreModule['actions'] {
  return {
    //
    // Conference
    //
    async fetchData({ commit }) {
      const data = await api.getSchedule();
      commit('schedule', data);
      return data !== null;
    },

    //
    // Registration
    //
    login(_ctx, email) {
      return api.startEmailLogin(email);
    },
    register(_ctx, body) {
      return api.startRegister(body);
    },
    unregister(/* ctx, body */) {
      return api.unregister();
    },
    async fetchProfile({ commit }) {
      const result = await api.getRegistration();
      commit('profile', result?.registration ?? null);
    },

    //
    // Carbon
    //
    async fetchCarbon({ commit }) {
      commit('carbon', await api.getCarbon());
    },

    //
    // Conference
    //
    fetchLinks(_ctx, sessionId) {
      return api.getLinks(sessionId);
    },

    //
    // Attendance
    //
    async attend({ dispatch }, sessionId) {
      await api.attend(sessionId);
      dispatch('fetchUserAttendance');
      await pause(API_DELAY);
    },
    async unattend({ dispatch }, sessionId) {
      await api.unattend(sessionId);
      dispatch('fetchUserAttendance');
      await pause(API_DELAY);
    },
    async fetchUserAttendance({ commit }) {
      const result = await api.getUserAttendance();
      commit('userAttendance', result?.attendance ?? []);
    },
    fetchSessionAttendance(_ctx, sessionId) {
      return api.getSessionAttendance(sessionId);
    },

    //
    // Content
    //
    fetchContent(_ctx, { slug }) {
      return api.getContent(slug);
    },

    //
    // Calendar
    //
    fetchUserCalendar() {
      return api.createUserCalendar();
    },
  };
}
