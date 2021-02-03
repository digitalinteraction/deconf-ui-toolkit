/* eslint-disable @typescript-eslint/no-var-requires */

//
// @vue/cli-service configuration
// see: https://cli.vuejs.org/config/#global-cli-config
//

const applySassExtract = require('./sass-extractor');

// Push the package version into the vue app with an environment variable
process.env.VUE_APP_NAME = require('./package.json').name;
process.env.VUE_APP_VERSION = require('./package.json').version;

// Add an extra import to all sass imports
module.exports = {
  /**
   *
   * @param {import("webpack-chain")} config
   */
  chainWebpack: config => {
    //
    // Use svg-loader
    // Clear the existing svg rule and load as a component instead
    //
    // const svgRule = config.module.rule('svg');
    // svgRule.uses.clear();
    // svgRule
    //   .use('babel-loader')
    //   .loader('babel-loader')
    //   .end()
    //   .use('vue-svg-loader')
    //   .loader('vue-svg-loader');
    // Custom scss extractor
    if (process.env.NODE_ENV === 'production') {
      applySassExtract(config);
    }
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "~@/scss/common.scss";\n'
      }
    }
  }
};
