/* eslint-disable @typescript-eslint/no-var-requires */

//
// A custom sass plugin to get scss from the loader and output a file at the end
// - https://v4.webpack.js.org/contribute/writing-a-plugin/
// - https://github.com/webpack-contrib/mini-css-extract-plugin
// - https://github.com/webpack/schema-utils
//

//
// Notes:
// - relies on not using vue's scoped
// - only webpack 4
//

const validate = require('schema-utils');

const schema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    filename: { type: 'string' }
  }
};

const PLUGIN_NAME = 'SassExtract';

class SassExtractPlugin {
  /** @type {string} */
  get filename() {
    return this.options.filename;
  }

  constructor(options = {}) {
    validate(schema, options, {
      name: 'SassExtract Loader',
      baseDataPath: 'options'
    });

    this.options = options;
    this.chunks = [];

    // hook into sass-extractor-loader ?
    // - get chunks and add to the array
    // - output a new file with the chunks concatenated
  }

  /**
   * @param {import("webpack").Compiler} compiler
   */
  apply(compiler) {
    // compiler.hooks.chunk.tap(PLUGIN_NAME, (...args) => {
    //   console.log(args);
    // });

    compiler.hooks.thisCompilation.tap(PLUGIN_NAME, compilation => {
      // compilation.mainTemplate.hooks.succeedModule.tap(
      //   PLUGIN_NAME,
      //   (...args) => {
      //     console.log(args);
      //     process.exit(1);
      //   }
      // );
      //
      // compilation.hooks.succeedModule.tap(PLUGIN_NAME, result => {
      //   console.log(result.type, result.id);
      // });
      //
      compilation.mainTemplate.hooks.renderManifest.tap(
        PLUGIN_NAME,
        (result, { chunk }) => {
          // ...
          console.log([...chunk.modulesIterable]);
          // result.push({
          //   render: () => this.renderScss(),
          //   filenameTemplate: this.filename,
          //   pathOptions: {}
          // });
          process.exit(1);
        }
      );
    });
  }
}

module.exports = SassExtractPlugin;
