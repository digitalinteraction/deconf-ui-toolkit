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
  'api/fetchUserCalendar': () => ({
    url: new URL('https://example.com/calendar'),
  }),
  'api/fetchLinks': () => ({
    links: [
      { type: '', url: 'https://youtu.be/yPYZpwSpKmA', language: 'fr' },
      { type: '', url: 'https://youtu.be/dQw4w9WgXcQ', language: 'en' },
      { type: '', url: 'https://miro.com/en', language: 'en' },
      { type: '', url: 'https://miro.com/fr', language: 'fr' },
      { type: '', url: 'https://docs.google.com/abcdef', language: 'en' },
    ],
  }),
  'api/fetchSessionAttendance': () => ({
    isAttending: true,
    sessionCount: 14,
  }),
};
const getters = {
  'api/isSignedIn': true,
  'api/userSessions': [],
};

setup((app) => {
  app.use(i18n);
  app.component('router-link', RouterLink);
  app.config.globalProperties.$store = {
    dispatch: (k: string) => {
      action('vuex-action')(k);
      return actions[k]?.();
    },
    getters,
  };
  app.config.globalProperties.$deconf = {
    showDialog: action('$deconf.showDialog'),
    closeDialog: action('$deconf.closeDialog'),
    getCalendarLink: (session, kind) =>
      `https://example.com/session/${session.id}/${kind}`,
    trackMetric: action('$deconf.trackMetric'),
  };
});
