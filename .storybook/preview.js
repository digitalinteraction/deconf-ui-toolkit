import { action } from '@storybook/addon-actions';
import Vue from 'vue';
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

    const extra = params ? `, ${JSON.stringify(params)}` : '';
    return `{{ ${key}${extra} }}`;
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
const attendance = new Set();
const actions = {
  'api/login': (payload) => payload.includes('@'),
  'api/register': (payload) => payload.email.includes('@'),
  'api/unregister': (payload) => true,
  'api/fetchLinks': (sessionId) => {
    if (!attendance.has(sessionId)) return { links: null };
    return {
      links: [
        { type: '', url: 'https://youtu.be/yPYZpwSpKmA', language: 'fr' },
        { type: '', url: 'https://youtu.be/dQw4w9WgXcQ', language: 'en' },
        {
          type: '',
          url: 'https://vimeo.com/live-chat/622215885/',
          language: 'en',
        },
        { type: '', url: 'https://miro.com/en', language: 'en' },
        { type: '', url: 'https://miro.com/fr', language: 'fr' },
        { type: '', url: 'https://docs.google.com/abcdef', language: 'en' },
      ],
    };
  },
  'api/fetchSessionAttendance': (sessionId) => ({
    isAttending: attendance.has(sessionId),
    sessionCount: 14,
  }),
  'api/attend': (sessionId) => {
    attendance.add(sessionId);
  },
  'api/unattend': (sessionId) => {
    attendance.delete(sessionId);
  },
  'api/fetchContent': ({ slug }) => ({
    en: `
      <p>${CONTENT_PARAGRAPHS[0]}</p>
      <div id="featured_thing"></div>
      <p>${CONTENT_PARAGRAPHS[1]}</p>
      <p><a href="https://duck.com">A link</a></p>
    `,
  }),
  'api/fetchUserCalendar': () => ({ url: new URL('https://duck.com') }),
};
Vue.prototype.$store = {
  state: {},
  getters: {
    'api/calendarLink': (session) => `/ical/${session.id}`,
  },
  commit(key, value) {
    action(`[vuex commit] ${key}`)(value);
  },
  dispatch(key, value) {
    action(`[vuex dispatch] ${key}`)(value);
    const result = actions[key] ? actions[key](value) : undefined;

    return new Promise((resolve) => setTimeout(() => resolve(result)), 1000);
  },
};

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
