import { defineComponent } from 'vue'

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
      <div style="display: flex; min-height: calc(100vh - 56px); flex-direction: column">
        <slot />
      </div>
    </div>
  `,
})

export const TabIcon = defineComponent({
  template: `
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0" y="0" width="128" height="128" viewBox="0, 0, 128, 128">
      <path d="M64,6.007 L69.357,15.286 L95.75,61 L122.143,106.714 L127.5,115.993 L0.5,115.993 L5.857,106.714 L32.25,61 L58.643,15.286 L64,6.007 z M64,30.751 L42.964,67.186 L21.928,103.621 L106.072,103.621 L64,30.751 z" fill="currentColor"/>
    </svg>
  `,
})
