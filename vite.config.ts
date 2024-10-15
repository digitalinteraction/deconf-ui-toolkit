import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import '@/scss/common.scss';
        `,
        quietDeps: true,
      },
    },
  },
  build: {
    lib: {
      entry: {
        'deconf-ui': 'src/module.ts',
        atrium: 'src/atrium/module.ts',
        'audio-lib': 'src/audio-lib/module.ts',
        content: 'src/content/module.ts',
        core: 'src/core/module.ts',
        dev: 'src/dev/module.ts',
        form: 'src/form/module.ts',
        lib: 'src/lib/module.ts',
        registration: 'src/registration/module.ts',
        schedule: 'src/schedule/module.ts',
        session: 'src/session/module.ts',
        store: 'src/store/module.ts',
      },
      formats: ['es'],
    },
    rollupOptions: {
      external: [
        'bulma',
        'vue',
        'vue-i18n',
        'vue-router',
        'vuex',
        '@fortawesome/vue-fontawesome',
        'copy-to-clipboard',
      ],
      output: {
        format: 'esm',
        compact: true,
      },
    },
  },
})
