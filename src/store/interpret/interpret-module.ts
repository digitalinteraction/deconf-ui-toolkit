import { InterpretBooth, Interpreter } from '@openlab/deconf-shared';
import { Module } from '../vuex.ts';
import { createStateMapper } from '../../lib/module';

export interface ActiveBooth {
  interpreter: Interpreter;
  isSelf: boolean;
}

export interface BoothMessage {
  user: string;
  date: Date;
  body: string;
}

export interface InterpretationRequest {
  interpreter: Interpreter;
  duration: number;
}

export interface InterpretModuleState {
  self: null | Interpreter;
  booth: null | InterpretBooth;
  activeBooth: null | ActiveBooth;
  messages: BoothMessage[];
  interpreters: Interpreter[];
}

export interface NewBoothMessage {
  message: string;
  user: Interpreter;
}

export type InterpretStoreModule = Module<InterpretModuleState, unknown>;

/** @deprecated clients should create their own with `createStateMapper` */
export const mapInterpretState = createStateMapper<InterpretModuleState>();

export function createInterpretStoreModule(): InterpretStoreModule {
  return {
    namespaced: true,
    state: () => ({
      self: null,
      booth: null,
      activeBooth: null,
      messages: [],
      interpreters: [],
    }),
    getters: {},
    mutations: {
      self(state, interpreter: Interpreter) {
        state.self = interpreter;
      },
      join(state, booth: InterpretBooth) {
        state.booth = booth;
      },
      leave(state) {
        state.booth = null;
        state.activeBooth = null;
        state.messages = [];
        state.interpreters = [];
      },
      messageBooth(state, { user, message }: NewBoothMessage) {
        state.messages = state.messages.concat([
          { date: new Date(), body: message, user: user.name },
        ]);
      },

      startInterpreting(state, interpreter: Interpreter) {
        const booth = state.booth;
        if (!booth) {
          throw new Error('Cannot go live if not in a booth');
        }

        state.activeBooth = {
          interpreter,
          isSelf: interpreter.id === state.self?.id,
        };
      },
      stopInterpreting(state) {
        state.activeBooth = null;
      },

      interpreterJoined(state, interpreter: Interpreter) {
        state.interpreters = state.interpreters
          .filter((i) => i.id !== interpreter.id)
          .concat([interpreter]);
      },
      interpreterLeft(state, interpreter: Interpreter) {
        state.interpreters = state.interpreters.filter(
          (i) => i.id !== interpreter.id,
        );
      },
    },
  };
}
