import { Interpreter } from '@openlab/deconf-shared';
import { Module } from 'vuex';
import { createStateMapper } from '../../lib/module';

interface Booth {
  sessionId: string;
  channel: string;
  self: Interpreter;
}

interface ActiveBooth {
  interpreter: Interpreter;
  isSelf: boolean;
}

interface BoothMessage {
  date: Date;
  text: string;
}

interface InterpretationRequest {
  interpreter: Interpreter;
  duration: number;
}

export interface InterpretModuleState {
  booth: null | Booth;
  activeBooth: null | ActiveBooth;
  messages: BoothMessage[];
  interpreters: Interpreter[];
}

export type InterpretStoreModule = Module<InterpretModuleState, unknown>;

export const mapInterpretState = createStateMapper<InterpretModuleState>();

export function createInterpretStoreModule(): InterpretStoreModule {
  return {
    namespaced: true,
    state: () => ({
      booth: null,
      activeBooth: null,
      messages: [],
      interpreters: []
    }),
    getters: {},
    mutations: {
      join(state, booth: Booth) {
        state.booth = booth;
      },
      leave(state) {
        state.booth = null;
        state.activeBooth = null;
        state.messages = [];
        state.interpreters = [];
      },
      messageBooth(state, message: string) {
        state.messages.push({
          date: new Date(),
          text: message
        });
      },

      startInterpreting(state, interpreter: Interpreter) {
        const booth = state.booth;
        if (!booth) {
          throw new Error('Cannot go live if not in a booth');
        }

        state.activeBooth = {
          interpreter,
          isSelf: booth.self.id === interpreter.id
        };
      },
      stopInterpreting(state) {
        state.activeBooth = null;
      },

      interpreterJoined(state, interpreter: Interpreter) {
        state.interpreters.push(interpreter);
      },
      interpreterLeft(state, interpreter: Interpreter) {
        state.interpreters = state.interpreters.filter(
          i => i.id !== interpreter.id
        );
      }
    }
  };
}
