import { Module } from 'vuex';
import { deepSeal, FullSchedule, createStateMapper } from '../../lib/module';
import {
  Attendance,
  AuthToken,
  CarbonCalculation,
  Registration
} from '@openlab/deconf-shared';
import { ApiState } from './api-state';

export interface ApiModuleState {
  schedule: null | FullSchedule;
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
