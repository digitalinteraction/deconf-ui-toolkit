import { Module } from 'vuex';
import { deepSeal, createStateMapper, pause } from '../../lib/module';
import {
  Attendance,
  AuthToken,
  CarbonCalculation,
  Registration,
  ScheduleRecord
} from '@openlab/deconf-shared';
import { ApiState } from './api-state';
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

  data.settings.startDate = new Date(data.settings.startDate);
  data.settings.endDate = new Date(data.settings.endDate);
  // data.settings.endDate.setHours(23, 59, 59);

  for (const slot of data.slots) {
    slot.start = new Date(slot.start);
    slot.end = new Date(slot.end);
  }
  for (const speaker of data.speakers) {
    if (!speaker.headshot) speaker.headshot = '/default-headshot.png';
  }

  return deepSeal(data);
}

function hydrateProfile(profile: Registration | null) {
  if (profile === null) return null;

  return deepSeal({
    ...profile,
    created: new Date(profile.created)
  });
}

//
// NOTE:
// I'm not sure what value this can add without concrete routes
//

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
      userSessions: null
    },
    getters: {},
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
        state.userSessions = deepSeal(attendance.map(a => a.session));
      }
    },
    actions: {
      // Let library-users provide the actions
    }
  };
}

/** @deprecated this will used in `createApiStoreModule` in the next major version */
export function createApiStoreActions(
  api: DeconfApiClient
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
    login(ctx, email) {
      return api.startEmailLogin(email);
    },
    register(ctx, body) {
      return api.startRegister(body);
    },
    unregister(ctx, body) {
      return api.unregister();
    },
    async fetchProfile({ commit }) {
      commit('profile', await api.getRegistration());
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
    fetchLinks(ctx, sessionId) {
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
    fetchSessionAttendance(ctx, sessionId) {
      return api.getSessionAttendance(sessionId);
    },

    //
    // Content
    //
    fetchContent(ctx, { slug }) {
      return api.getContent(slug);
    },

    //
    // Calendar
    //
    fetchUserCalendar() {
      return api.createUserCalendar();
    }
  };
}
