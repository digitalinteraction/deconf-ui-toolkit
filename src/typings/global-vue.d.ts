import { ComponentCustomProperties } from 'vue';
import { Store } from 'vuex';
import { I18n } from 'vue-i18n';

declare module '@vue/runtime-core' {
  // declare your own store states
  type State = {};

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>;
    $i18n: I18n;
  }
}
