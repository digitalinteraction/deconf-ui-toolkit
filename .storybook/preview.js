import Vue from 'vue';
import '@/scss/app.scss';
import { setupFontawesome } from '@/utils';

// Initialize all icons
setupFontawesome();

// Stub out router-link
Vue.component('router-link', {
  template: `<a href="#" @click.prevent><slot/></a>`
});

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' }
};
