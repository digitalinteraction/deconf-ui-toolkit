import { action } from '@storybook/addon-actions';
import Vue from 'vue';
import Vuex from 'vuex';
import '../src/scss/app.scss';
import { setupFontawesome, CONTENT_PARAGRAPHS } from '../src/story-lib/module';
import locales from './locale.json';
import { get } from 'lodash';

document.dir = 'ltr';

//
// Initialize all icons
//
setupFontawesome();

//
// Stub out vue-router
//
Vue.prototype.$router = {
  resolve: () => ({ href: '#' }),
  afterEach() {},
};
Vue.component('router-link', {
  props: ['to', 'activeClass'],
  template: `<a href="#" @click.prevent="log"><slot/></a>`,
  methods: {
    log() {
      const route = this.to;
      action(`[router] ${route.name || route}`)(route.params);
    },
  },
});

function templated(template, params) {
  const regexes = Object.keys(params).map((key) => [
    new RegExp(`{\\s*${key}\\s*}`, 'g'),
    params[key],
  ]);
  let output = template;
  for (const [regex, value] of regexes) output = output.replace(regex, value);
  return output;
}
function counted(template, count) {
  const [none, singlur, plural] = template.split('|').map((s) => s.trim());

  const params = { count, n: count };
  if (count === 0) return templated(none, params);
  if (count === 1) return templated(singlur, params);
  return templated(plural, { count, n: count });
}

//
// Stub out vue-i18n
//
Vue.prototype.$i18n = {
  locale: 'en',
  t(key, params) {
    const match = get(locales, key);
    if (match) return params ? templated(match, params) : match;

    return key;
  },
  tc(key, count) {
    const match = get(locales, key);
    if (match) return counted(match, count);

    return `{{ "${key}" count=${count} }}`;
  },
};
Vue.prototype.$t = Vue.prototype.$i18n.t;
Vue.prototype.$tc = Vue.prototype.$i18n.tc;

//
// Stub out vuex
//
const fakeLinks = [
  { type: '', url: 'https://youtu.be/yPYZpwSpKmA', language: 'fr' },
  { type: '', url: 'https://youtu.be/dQw4w9WgXcQ', language: 'en' },
  { type: '', url: 'https://vimeo.com/live-chat/622215885/', language: 'en' },
  { type: '', url: 'https://miro.com/en', language: 'en' },
  { type: '', url: 'https://miro.com/fr', language: 'fr' },
  { type: '', url: 'https://docs.google.com/abcdef', language: 'en' },
];
const fakeContent = `
<p>${CONTENT_PARAGRAPHS[0]}</p>
<div id="featured_thing"></div>
<p>${CONTENT_PARAGRAPHS[1]}</p>
<p><a href="https://duck.com">A link</a></p>
`;

Vue.use(Vuex);
const api = {
  namespaced: true,
  state: {
    attendance: [],
  },
  getters: {
    calendarLink: (state) => (session) => `/ical/${session.id}`,
    userSessions: (state) => state.attendance,
    isSignedIn: () => true,
  },
  actions: {
    login(ctx, payload) {
      return payload.includes('@');
    },
    register(ctx, payload) {
      return payload.email.includes('@');
    },
    unregister(ctx, payload) {
      return true;
    },
    fetchLinks({ state }, sessionId) {
      if (!state.attendance.includes(sessionId)) return { links: null };
      return { links: fakeLinks };
    },
    fetchSessionAttendance({ state }, sessionId) {
      return {
        isAttending: state.attendance.includes(sessionId),
        sessionCount: 14,
      };
    },
    attend({ state }, sessionId) {
      state.attendance.push(sessionId);
    },
    unattend({ state }, sessionId) {
      // state.attendance.delete(sessionId);
      state.attendance = state.attendance.filter((id) => id !== sessionId);
    },
    fetchContent(ctx, { slug }) {
      return { en: fakeContent };
    },
    fetchUserCalendar() {
      return { url: new URL('https://duck.com') };
    },
  },
};
Vue.prototype.$store = new Vuex.Store({ modules: { api } });

//
// Stub out $deconf
//
Vue.prototype.$deconf = {
  getCalendarLink(session, kind) {
    return `/fake/session/${session.id}/${kind}`;
  },
  trackMetric(metric) {
    const { eventName, payload } = metric;
    action(`[metric] ${eventName}`)(payload);
  },
  showDialog(component, props) {
    action(`[show dialog]`)({ component, props });
  },
  closeDialog() {
    action(`[close dialog]`)();
  },
};

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};
