import { action } from '@storybook/addon-actions';

import { library } from '@fortawesome/fontawesome-svg-core';
import * as brands from '@fortawesome/free-brands-svg-icons';
import * as solid from '@fortawesome/free-solid-svg-icons';
import * as regular from '@fortawesome/free-regular-svg-icons';

import { defineComponent, h } from 'vue';
import { setup } from '@storybook/vue3';
import { createI18n } from 'vue-i18n';

import '../src/scss/app.scss';
import en from './i18n.json';

library.add(brands.fab, solid.fas, regular.far);

document.dir = 'ltr';

const i18n = createI18n({ messages: { en } });

const RouterLink = defineComponent({
  props: ['to'],
  render() {
    const onClick = (e: Event) => {
      e.preventDefault();
      action('router-link')(this.to);
    };
    return h('a', { onClick }, this.$slots.default());
  },
});

const actions = {
  'api/fetchContent': () => ({
    en: `<p>Hello there</p><div id="featured_thing"></div>`,
  }),
};

setup((app) => {
  app.use(i18n);
  app.component('router-link', RouterLink);
  app.config.globalProperties.$store = {
    dispatch: (k: string) => {
      action('vuex-action')(k);
      return actions[k]?.();
    },
  };
  app.config.globalProperties.$deconf = {
    // ...
  };
});
