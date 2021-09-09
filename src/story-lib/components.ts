import Vue from 'vue';

// TODO: refactor `Content = createContent()` to a component here

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

export const LanguageControl = Vue.extend({
  template: `
    <div class="select is-small">
      <select>
        <option>EN</option>
        <option>FR</option>
        <option>ES</option>
        <option>AR</option>
      </select>
    </div>
  `
});
