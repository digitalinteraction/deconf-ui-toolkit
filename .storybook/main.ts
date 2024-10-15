import type { StorybookConfig } from '@storybook/vue3-vite'

export default {
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },

  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],

  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
} satisfies StorybookConfig
