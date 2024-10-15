import { Store } from 'vuex';
import { VueI18n } from 'vue-i18n';
import { DeconfPlugin } from '../lib/deconf-plugin';

declare module 'vue' {
  // declare your own store states
  type State = Record<string, unknown>;

  // provide typings for `this.$store`
  export interface ComponentCustomProperties {
    $store: Store<State>;
    $i18n: VueI18n;
    $deconf: DeconfPlugin;
  }
}
