import Vue from 'vue';
import '@/scss/app.scss';

Vue.component('router-link', {
  template: `<a href="#" @click.prevent><slot/></a>`
});

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' }
};
