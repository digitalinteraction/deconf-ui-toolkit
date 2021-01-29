import { action } from '@storybook/addon-actions';
import Vue from 'vue';
import '@/scss/app.scss';
import { setupFontawesome } from '@/utils';

document.dir = 'ltr';

//
// Initialize all icons
//
setupFontawesome();

//
// Stub out router-link
//
Vue.component('router-link', {
  props: ['to'],
  template: `<a href="#" @click.prevent="log"><slot/></a>`,
  methods: {
    log() {
      action('RouterLink')(this.to);
    }
  }
});

//
// Stub out vue-i18n
//
Vue.prototype.$i18n = {
  locale: 'en',
  translate(key, params) {
    if (params) {
      return `{{ ${key}, ${JSON.stringify(params)} }}`;
    } else {
      return `{{ ${key} }}`;
    }
  },
  translateCount(key, count) {
    return `{{ "${key}" count=${count} }}`;
  }
};
Vue.prototype.$t = Vue.prototype.$i18n.translate;
Vue.prototype.$tc = Vue.prototype.$i18n.translateCount;

//
// Stub out vuex
//
Vue.prototype.$store = {
  state: {},
  getters: {},
  commit(key, value) {
    action('[Vuex] commit')(key, value);
  },
  async dispatch(key, value) {
    action('[Vuex] dispatch')(key, value);
  }
};

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' }
};
