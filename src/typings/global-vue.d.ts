import { Store } from 'vuex';
import { I18n } from 'vue-i18n';

// declare module '@vue/runtime-core' {
declare module 'vue/types/vue' {
  // declare your own store states
  type State = {};

  // provide typings for `this.$store`
  interface Vue {
    $store: Store<State>;
    $i18n: I18n;
  }
}
