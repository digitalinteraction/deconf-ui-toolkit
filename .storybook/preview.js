import { action } from '@storybook/addon-actions'
import { app } from '@storybook/vue3'
import '../src/scss/app.scss'
import { setupFontawesome } from '../src/story-lib/module'

import { I18n } from './i18n'
import { Deconf } from './deconf'
import { Store } from './store'

document.dir = 'ltr'

// TODO: our use of `action` will be dropped in storybook 7.x

//
// Initialize all icons
//
setupFontawesome()

//
// Stub out router-link
//
app.component('router-link', {
  props: ['to'],
  template: `<a href="#" @click.prevent="log"><slot/></a>`,
  methods: {
    log() {
      const route = this.to
      action(`[router] ${route.name || route}`)(route.params)
    },
  },
})

//
// Stub out vue-i18n
//
app.config.globalProperties.$i18n = new I18n()
app.config.globalProperties.$t = app.config.globalProperties.$i18n.t
app.config.globalProperties.$tc = app.config.globalProperties.$i18n.tc

//
// Stub out vuex
//
app.config.globalProperties.$store = new Store()

//
// Stub out $deconf
//
app.config.globalProperties.$deconf = new Deconf()

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
