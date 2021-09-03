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
import extractSass from './sass-plugin';

// Get browserslist config and remove ie from es build targets
const esbrowserslist = fs
  .readFileSync('./.browserslistrc')
  .toString()
  .split('\n')
  .filter(entry => entry && entry.substring(0, 2) !== 'ie');

// Extract babel preset-env config, to combine with esbrowserslist
const babelPresetEnvConfig = require('../babel.config').presets.filter(
  entry => entry[0] === '@babel/preset-env'
)[0][1];

const argv = minimist(process.argv.slice(2));

const projectRoot = path.resolve(__dirname, '..');

const baseConfig = {
  input: 'src/module.ts',
  plugins: {
    preVue: [
      alias({
        entries: [
          {
            find: '@',
            replacement: `${path.resolve(projectRoot, 'src')}`
          }
        ]
      }),
      extractSass({
        prependData: [
          fs.readFileSync('./src/scss/common.scss'),
          fs.readFileSync('./src/scss/app.scss')
        ].join('\n'),
        copyFiles: [
          {
            input: path.resolve(projectRoot, 'src/scss/common.scss'),
            output: 'common.scss'
          }
        ],
        filename: null
      })
    ],
    replace: {
      preventAssignment: true,
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
              url => {
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
    },
    postVue: [
      resolve({
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue']
      }),
      commonjs()
    ],
    babel: {
      exclude: 'node_modules/**',
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
      babelHelpers: 'bundled'
    }
  }
};

// ESM/UMD/IIFE shared settings: externals
// Refer to https://rollupjs.org/guide/en/#warning-treating-module-as-external-dependency
// list external dependencies, exactly the way it is written in the import statement.
const external = [
  'vue',
  '@fortawesome/vue-fontawesome',
  'copy-to-clipboard',
  '@openlab/deconf-shared',
  'lodash.debounce'
];

// Customize configs for individual targets
const buildFormats = [];
if (!argv.format || argv.format === 'es') {
  const esConfig = {
    ...baseConfig,
    external,
    output: {
      file: `dist/deconf-ui.esm.js`,
      format: 'esm',
      exports: 'named'
    },
    plugins: [
      replace(baseConfig.plugins.replace),
      ...baseConfig.plugins.preVue,
      vue(baseConfig.plugins.vue),
      ...baseConfig.plugins.postVue,
      babel({
        ...baseConfig.plugins.babel,
        presets: [
          [
            '@babel/preset-env',
            {
              ...babelPresetEnvConfig,
              targets: esbrowserslist
            }
          ]
        ]
      }),
      commonjs({
        extensions: ['.js', '.ts', '.vue']
      })
    ]
  };
  buildFormats.push(esConfig);
}

// Export config
export default buildFormats;
