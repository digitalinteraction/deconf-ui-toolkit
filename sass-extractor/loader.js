/* eslint-disable @typescript-eslint/no-var-requires */

//
// A custom sass loader to pass scss to the plugin
// - https://v4.webpack.js.org/contribute/writing-a-loader/
// - https://github.com/webpack/loader-utils
// - https://github.com/webpack/schema-utils
//

const { getOptions } = require('loader-utils');
const validate = require('schema-utils');

const LOADER_NAME = 'sass-extract-loader';

const schema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    filename: { type: 'string' }
  }
};

/**
 * @param {string} src
 * @param {any} map
 * @this import("webpack").loader.LoaderContext
 */
function loader(src, map) {
  const options = getOptions(this);

  validate(schema, options, {
    name: 'SassExtract Loader',
    baseDataPath: 'options'
  });

  if (process.env.NODE_ENV === 'development') return src;

  // Put the sass into some cache ? in a plugin ?
  this._compiler._pluginCompat;

  return `/* Stripped by ${LOADER_NAME} */`;
  // return src;
}

module.exports = loader;
