import { defineComponent } from 'vue'

// TODO: refactor `Content = createContent()` to a component here

export const BrandA = defineComponent({
  template: `
    <img
      src="/brand.svg"
      width="160"
      height="28"
    />
  `,
})

export const BrandB = defineComponent({
  template: `
    <img
      src="/openlab.svg"
      width="110"
      height="28"
    />
  `,
})

export const BrandC = defineComponent({
  template: `
    <img
      src="/square-brand.svg"
      width="64"
      height="64"
    />
  `,
})

export const LanguageControl = defineComponent({
  template: `
    <div class="select is-small">
      <select>
        <option>EN</option>
        <option>FR</option>
        <option>ES</option>
        <option>AR</option>
      </select>
    </div>
  `,
})

export const MockAppLayout = defineComponent({
  components: { BrandA },
  template: `
    <div class="position: relative">
      <nav class="navbar" style="position: sticky; top: 0; border-bottom: 1px solid #dbdbdb;">
        <div class="navbar-item">
          <BrandA />
        </div>
      </nav>
      <div style="display: flex; min-height: 100vh; flex-direction: column">
        <slot />
      </div>
    </div>
  `,
})
