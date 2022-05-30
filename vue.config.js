//
// @vue/cli-service configuration
// see: https://cli.vuejs.org/config/#global-cli-config
//

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
        prependData: '@import "~@/scss/common.scss";\n',
      },
    },
  },
};
