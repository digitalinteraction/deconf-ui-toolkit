import { action } from '@storybook/addon-actions';
import Vue from 'vue';
import '../src/scss/app.scss';
import { setupFontawesome } from '../src/story-lib/module';
import locales from './locale.json';
import { get } from 'lodash';

document.dir = 'ltr';

// TODO: our use of `action` will be dropped in storybook 7.x

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
      const route = this.to;
      action(`[router] ${route.name}`)(route);
    }
  }
});

function templated(template, params) {
  const regexes = Object.keys(params).map(key => [
    new RegExp(`{\\s*${key}\\s*}`, 'g'),
    params[key]
  ]);
  let output = template;
  for (const [regex, value] of regexes) output = output.replace(regex, value);
  return output;
}
function counted(template, count) {
  const [none, singlur, plural] = template.split('|').map(s => s.trim());

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
  }
};
Vue.prototype.$t = Vue.prototype.$i18n.t;
Vue.prototype.$tc = Vue.prototype.$i18n.tc;

//
// Stub out vuex
//
Vue.prototype.$store = {
  state: {},
  getters: {
    'api/calendarLink': session => `/ical/${session.id}`
  },
  commit(key, value) {
    action(`[vuex commit] ${key}`)(value);
  },
  dispatch(key, value) {
    action(`[vuex dispatch] ${key}`)(value);
    return new Promise(resolve, setTimeout(resolve, 1000));
  }
};

//
// Stub out $deconf
//
Vue.prototype.$deconf = {
  getCalendarLink(session) {
    return `/session/${session.id}/ics`;
  },
  trackMetric(metric) {
    const { eventName, ...payload } = metric;
    action(`[metric] ${eventName}`)(payload);
  }
};

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' }
};
