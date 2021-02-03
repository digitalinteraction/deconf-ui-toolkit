/* eslint-disable @typescript-eslint/no-var-requires */

//
// A function to apply the plugin & loader to an existing webpack-chain instance
// - https://github.com/neutrinojs/webpack-chain
// - https://github.com/neutrinojs/webpack-chain/issues/119
//

//
// View config with
// `NODE_ENV=production vue inspect > webpack.js`
// or
// add `--debug-webpack` to storyboard scripts in the package.json
//

const Plugin = require('./plugin');

const path = require('path');

/**
 * @param {import("webpack-chain")} config
 */
module.exports = function(config) {
  // const scssRule = config.module.rule('scss');

  // scssRule.clear();
  // scssRule
  //   .use('scss-extract-loader')
  //   .loader(loader)
  //   .end();

  const loaderPath = path.join(__dirname, 'loader.js');

  // Inject our loader
  // config.module
  //   .rule('scss')
  //   .oneOf('vue-modules')
  //   .after('sass-loader')
  //   .use('scss-extract-loader')
  //   .loader(loaderPath)
  //   .options({ filename: 'theme.scss' });

  // config.module
  //   .rule('scss')
  //   .oneOf('vue-modules')
  //   .clear()
  //   .use('raw-loader')
  //   .loader('raw-loader');

  config.plugin('sass-extract').use(Plugin, [{}]);
};
