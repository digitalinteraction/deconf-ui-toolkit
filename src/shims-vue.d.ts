import { ComponentCustomProperties } from 'vue';
import { Store } from 'vuex';
import { I18n } from 'vue-i18n';

/* eslint-disable */
declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

declare module '@vue/runtime-core' {
  interface State {
    // declare your own store states
  }

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>;
    $i18n: I18n;
  }
}
