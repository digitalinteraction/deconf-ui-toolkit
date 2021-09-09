import Vue from 'vue';

export const BrandA = Vue.extend({
  template: `
    <img
      src="/brand.svg"
      width="160"
      height="28"
    />
  `
});

export const BrandB = Vue.extend({
  template: `
    <img
      src="/openlab.svg"
      width="110"
      height="28"
    />
  `
});

export const BrandC = Vue.extend({
  template: `
    <img
      src="/square-brand.svg"
      width="64"
      height="64"
    />
  `
});
