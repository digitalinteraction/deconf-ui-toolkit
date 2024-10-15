import pluginVue from 'eslint-plugin-vue';
import vueTsEslintConfig from '@vue/eslint-config-typescript';
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,js,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: [
      '**/dist/**',
      '**/dist-ssr/**',
      '**/coverage/**',
      'storybook-static',
      '**/*.stories.ts',
    ],
  },

  // {
  //   extends: ['plugin:storybook/recommended'],
  // },

  ...pluginVue.configs['flat/essential'],
  ...vueTsEslintConfig(),

  skipFormatting,
];
