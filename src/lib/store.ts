/** A "this" value with a partially strongly typed state */
export interface VuexWithState<Namespace extends string, State> {
  $store: {
    state: Record<Namespace, State>;
  };
}

/** A generated set of "computed" values to retrieve namespaced state */
export type MappedState<Namespace extends string, State> = {
  [K in keyof State]: (this: VuexWithState<Namespace, State>) => State[K];
};

/** Creates a strongly-typed "mapXState" method for easier vuex + TypeScript */
export function createStateMapper<State>() {
  return function<Namespace extends string, Keys extends keyof State>(
    namespace: Namespace,
    keys: Keys[]
  ): MappedState<Namespace, State> {
    const output = {} as MappedState<Namespace, State>;

    for (const key of keys) {
      output[key] = function() {
        return this.$store.state[namespace][key];
      };
    }

    return output;
  };
}