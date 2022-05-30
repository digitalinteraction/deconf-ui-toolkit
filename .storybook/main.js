const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    {
      name: '@storybook/preset-scss',
      options: {
        sassLoaderOptions: {
          prependData: `
            @import "~@/scss/common.scss";
          `,
        },
      },
    },
  ],
  webpackFinal: async (config, { configType }) => {
    //
    // Add @ alias
    //
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../src'),
    };

    return config;
  },
};
