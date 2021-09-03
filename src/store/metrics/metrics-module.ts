import { Module } from 'vuex';

export interface MetricsModuleState {
  userId: number | null;
  socketId: string | null;
  siteVisitors: number | null;
}

export interface MetricsAuthenticateOptions {
  userId: number | null;
  socketId: string | null;
}

export type MetricsModule = Module<MetricsModuleState, {}>;

//
// NOTE:
// I'm not sure what value this can add without concrete routes
// - siteVisitors is useful
// - authenticate not so much ~ data is related from the socket id
//

export function createMetricsStoreModule(): MetricsModule {
  return {
    namespaced: true,
    state: {
      userId: null,
      socketId: null,
      siteVisitors: null
    },
    getters: {},
    mutations: {
      authenticate(state, options: MetricsAuthenticateOptions) {
        state.userId = options.userId;
        state.socketId = options.socketId;
      },
      siteVisitors(state, siteVisitors: number) {
        state.siteVisitors = siteVisitors;
      }
    }
  };
}
