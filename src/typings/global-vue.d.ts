import { Store } from 'vuex'
import { I18n } from 'vue-i18n'
import { DeconfPlugin } from '../lib/deconf-plugin'

// declare module '@vue/runtime-core' {
declare module 'vue/types/vue' {
  // declare your own store states
  type State = Record<string, unknown>

  // provide typings for `this.$store`
  interface Vue {
    $store: Store<State>
    $i18n: I18n
    $deconf: DeconfPlugin
  }
}
