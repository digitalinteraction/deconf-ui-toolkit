import { Module } from '../vuex.ts';
import { createStateMapper } from '../../lib/module';

export interface MetricsModuleState {
  userId: number | null;
  socketId: string | null;
  siteVisitors: number | null;
}

export interface MetricsAuthenticateOptions {
  userId: number | null;
  socketId: string | null;
}

export type MetricsStoreModule = Module<MetricsModuleState, unknown>;

/** @deprecated clients should create their own with `createStateMapper` */
export const mapMetricsState = createStateMapper<MetricsModuleState>();

//
// NOTE:
// I'm not sure what value this can add without concrete routes
// - siteVisitors is useful
// - authenticate not so much ~ data is related from the socket id
//

export function createMetricsStoreModule(): MetricsStoreModule {
  return {
    namespaced: true,
    state: {
      userId: null,
      socketId: null,
      siteVisitors: null,
    },
    getters: {},
    mutations: {
      authenticate(state, options: MetricsAuthenticateOptions) {
        state.userId = options.userId;
        state.socketId = options.socketId;
      },
      siteVisitors(state, siteVisitors: number) {
        state.siteVisitors = siteVisitors;
      },
    },
  };
}
