//
// @vue/cli-service configuration
// see: https://cli.vuejs.org/config/#global-cli-config
//

// Push the package version into the vue app with an environment variable
process.env.VUE_APP_NAME = require('./package.json').name;
process.env.VUE_APP_VERSION = require('./package.json').version;

/** @type {import("@vue/cli-service").ProjectOptions} */
module.exports = {
  chainWebpack: () => {
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
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "~@/scss/common.scss";\n'
      }
    }
  }
};
