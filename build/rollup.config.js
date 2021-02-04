//
// rollup.config.js
// generated with vue-sfc-rollup and imported accross
//
import fs from 'fs';
import path from 'path';
import vue from 'rollup-plugin-vue';
import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import babel from '@rollup/plugin-babel';
// import { terser } from 'rollup-plugin-terser';
import minimist from 'minimist';
// import scss from 'rollup-plugin-scss';
import extractSass from './sass-plugin';
// import bundleScss from 'rollup-plugin-bundle-scss';

const projectRoot = path.resolve(__dirname, '..');

function readSync(filename) {
  return fs.readFileSync(path.join(projectRoot, filename), 'utf8');
}

// Get browserslist config and remove ie from es build targets
const esbrowserslist = JSON.parse(
  fs.readFileSync('./package.json', 'utf8')
).browserslist.filter(e => e.substring(0, 2) !== 'ie');

const argv = minimist(process.argv.slice(2));

const moduleName = 'DeconfUI';
const fileName = 'dist/deconf-ui';
const sorucemap = true;
const sassPrepend = [
  readSync('src/scss/common.scss'),
  readSync('src/scss/app.scss')
].join('\n');

const baseConfig = {
  input: 'src/entrypoint.ts',
  plugins: {
    preVue: [
      alias({
        entries: [
          {
            find: '@',
            replacement: `${path.resolve(projectRoot, 'src')}`
          }
        ],
        customResolver: resolve({
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'] // .scss here ?
        })
      }),
      // bundleScss()
      extractSass({ prependData: sassPrepend })
      // scss()
    ],
    replace: {
      'process.env.NODE_ENV': JSON.stringify('production')
    },
    vue: {
      css: false,
      template: {
        isProduction: true
      },

      // https://github.com/vuejs/rollup-plugin-vue/issues/300
      data: {
        scss: '@import "@/scss/common.scss";\n'
      },
      style: {
        preprocessOptions: {
          // https://www.npmjs.com/package/sass
          scss: {
            importer: [
              (url, prev) => {
                return {
                  file: url
                    .replace(/^~/, `${path.join(projectRoot, 'node_modules')}/`)
                    .replace(/^@/, path.join(projectRoot, 'src'))
                };
              }
            ]
          }
        }
      }

      // customBlocks: ['!theme'],
      // styleInjector: 'myFunction'
    },
    postVue: [],
    babel: {
      exclude: 'node_modules/**',
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
      babelHelpers: 'bundled'
    }
  }
};

// global.myFunction = (...args) => {
//   console.log('myFunction', ...args);
// };

// ESM/UMD/IIFE shared settings: externals
// Refer to https://rollupjs.org/guide/en/#warning-treating-module-as-external-dependency
const external = [
  // list external dependencies, exactly the way it is written in the import statement.
  // eg. 'jquery'
  'vue',
  '@fortawesome/vue-fontawesome',
  'copy-to-clipboard'
];

// UMD/IIFE shared settings: output.globals
// Refer to https://rollupjs.org/guide/en#output-globals for details
const globals = {
  // Provide global variable names to replace your external imports
  // eg. jquery: '$'
  vue: 'Vue',
  '@fortawesome/vue-fontawesome': 'vue-fontawesome',
  'copy-to-clipboard': 'copyToClipboard'
};

// Customize configs for individual targets
const buildFormats = [];
if (!argv.format || argv.format === 'es') {
  const esConfig = {
    ...baseConfig,
    external,
    output: {
      file: `${fileName}.esm.js`,
      format: 'esm',
      exports: 'named',
      sourcemap: sorucemap
    },
    plugins: [
      replace(baseConfig.plugins.replace),
      ...baseConfig.plugins.preVue,
      vue(baseConfig.plugins.vue),
      ...baseConfig.plugins.postVue,
      babel({
        ...baseConfig.plugins.babel,
        presets: [['@babel/preset-env', { targets: esbrowserslist }]]
      }),
      commonjs({
        extensions: ['.js', '.ts', '.vue']
      })
    ]
  };
  buildFormats.push(esConfig);
}

if (!argv.format || argv.format === 'cjs') {
  //
  // NOTE: "unpkg" has been removed from the package.json
  // - "main": "dist/deconf-ui.ssr.js",
  //
  // const umdConfig = {
  //   ...baseConfig,
  //   external,
  //   output: {
  //     compact: true,
  //     file: `${fileName}.ssr.js`,
  //     format: 'cjs',
  //     name: moduleName,
  //     exports: 'auto',
  //     globals,
  //     sourcemap: sorucemap
  //   },
  //   plugins: [
  //     replace(baseConfig.plugins.replace),
  //     ...baseConfig.plugins.preVue,
  //     vue({
  //       ...baseConfig.plugins.vue,
  //       template: {
  //         ...baseConfig.plugins.vue.template,
  //         optimizeSSR: true
  //       }
  //     }),
  //     ...baseConfig.plugins.postVue,
  //     babel(baseConfig.plugins.babel),
  //     commonjs()
  //   ]
  // };
  // buildFormats.push(umdConfig);
}

if (!argv.format || argv.format === 'iife') {
  //
  // NOTE: "unpkg" has been removed from the package.json
  // - "unpkg": "dist/deconf-ui.min.js",
  //
  // const unpkgConfig = {
  //   ...baseConfig,
  //   external,
  //   output: {
  //     compact: true,
  //     file: `${fileName}.min.js`,
  //     format: 'iife',
  //     name: moduleName,
  //     exports: 'auto',
  //     globals,
  //     sourcemap: sorucemap
  //   },
  //   plugins: [
  //     replace(baseConfig.plugins.replace),
  //     ...baseConfig.plugins.preVue,
  //     vue(baseConfig.plugins.vue),
  //     ...baseConfig.plugins.postVue,
  //     babel(baseConfig.plugins.babel),
  //     commonjs(),
  //     terser({
  //       output: {
  //         ecma: 5
  //       }
  //     })
  //   ]
  // };
  // buildFormats.push(unpkgConfig);
}

// Export config
export default buildFormats;

//
//
//

// https://stackoverflow.com/questions/64438777/trying-to-build-vue-component-library-using-rollup-and-vuejs-3
