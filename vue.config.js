//
// @vue/cli-service configuration
// see: https://cli.vuejs.org/config/#global-cli-config
//

// Push the package version into the vue app with an environment variable
process.env.VUE_APP_NAME = require('./package.json').name;
process.env.VUE_APP_VERSION = require('./package.json').version;

// Add an extra import to all sass imports
module.exports = {
  //   chainWebpack: config => {
  //     //
  //     // from: https://cli.vuejs.org/guide/webpack.html#replacing-loaders-of-a-rule
  //     //
  //     const svgRule = config.module.rule('svg');

  //     // clear all existing loaders.
  //     // if you don't do this, the loader below will be appended to
  //     // existing loaders of the rule.
  //     svgRule.uses.clear();

  //     // add replacement loader(s)
  //     svgRule.use('vue-svg-loader').loader('vue-svg-loader');

  //     // Turn on auto fixing
  //     config.module
  //       .rule('eslint')
  //       .use('eslint-loader')
  //       .options({ fix: true });
  //   },
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "~@/scss/common.scss";\n'
      }
    }
  }
};
