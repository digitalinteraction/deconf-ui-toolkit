//
// rollup.config.js
// generated with vue-sfc-rollup and imported accross
//
import fs from 'fs';
import path from 'path';
import typescript from '@rollup/plugin-typescript';
import vue from 'rollup-plugin-vue';
import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import minimist from 'minimist';
import sass from './sass-plugin';

// Get browserslist config and remove ie from es build targets
const esbrowserslist = JSON.parse(
  fs.readFileSync('./package.json', 'utf8')
).browserslist.filter(e => e.substring(0, 2) !== 'ie');

const argv = minimist(process.argv.slice(2));

const projectRoot = path.resolve(__dirname, '..');

const moduleName = 'DeconfUI';
const fileName = 'dist/deconf-ui';
const sorucemap = true;

const readSync = filename => {
  return fs.readFileSync(path.join(__dirname, '../', filename), 'utf8');
};

const baseConfig = {
  input: 'src/entrypoint.ts',
  plugins: {
    preVue: [
      alias({
        resolve: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
        entries: {
          '@': path.resolve(projectRoot, 'src')
        }
      })
    ],
    replace: {
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env.ES_BUILD': JSON.stringify('false')
    },
    vue: {
      css: false,
      template: {
        isProduction: true
      }
    },
    babel: {
      exclude: ['node_modules/**', 'tests/**'],
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue']
    },
    typescript: {
      exclude: ['tests/**']
    },
    sass: {
      prependData: [
        readSync('src/scss/common.scss'),
        readSync('src/scss/app.scss')
      ].join('\n')
    }
  }
};

// ESM/UMD/IIFE shared settings: externals
// Refer to https://rollupjs.org/guide/en/#warning-treating-module-as-external-dependency
const external = [
  // list external dependencies, exactly the way it is written in the import statement.
  // eg. 'jquery'
  'vue',
  '@fortawesome/vue-fontawesome'
];

// UMD/IIFE shared settings: output.globals
// Refer to https://rollupjs.org/guide/en#output-globals for details
const globals = {
  // Provide global variable names to replace your external imports
  // eg. jquery: '$'
  vue: 'Vue',
  '@fortawesome/vue-fontawesome': 'vue-fontawesome'
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
      replace({
        ...baseConfig.plugins.replace,
        'process.env.ES_BUILD': JSON.stringify('true')
      }),
      ...baseConfig.plugins.preVue,
      vue(baseConfig.plugins.vue),
      babel({
        ...baseConfig.plugins.babel,
        presets: [
          [
            '@babel/preset-env',
            {
              targets: esbrowserslist
            }
          ]
        ]
      }),
      commonjs(),
      typescript({
        ...baseConfig.plugins.typescript
      }),
      sass({
        ...baseConfig.plugins.sass
      })
    ]
  };
  buildFormats.push(esConfig);
}

if (!argv.format || argv.format === 'cjs') {
  const umdConfig = {
    ...baseConfig,
    external,
    output: {
      compact: true,
      file: `${fileName}.ssr.js`,
      format: 'cjs',
      name: moduleName,
      exports: 'named',
      globals,
      sourcemap: sorucemap
    },
    plugins: [
      replace(baseConfig.plugins.replace),
      ...baseConfig.plugins.preVue,
      vue({
        ...baseConfig.plugins.vue,
        template: {
          ...baseConfig.plugins.vue.template,
          optimizeSSR: true
        }
      }),
      babel(baseConfig.plugins.babel),
      commonjs(),
      typescript({
        ...baseConfig.plugins.typescript
      }),
      sass({
        ...baseConfig.plugins.sass
      })
    ]
  };
  buildFormats.push(umdConfig);
}

if (!argv.format || argv.format === 'iife') {
  const unpkgConfig = {
    ...baseConfig,
    external,
    output: {
      compact: true,
      file: `${fileName}.min.js`,
      format: 'iife',
      name: moduleName,
      exports: 'named',
      globals,
      sourcemap: sorucemap
    },
    plugins: [
      replace(baseConfig.plugins.replace),
      ...baseConfig.plugins.preVue,
      vue(baseConfig.plugins.vue),
      babel(baseConfig.plugins.babel),
      commonjs(),
      terser({
        output: {
          ecma: 5
        }
      }),
      typescript({
        ...baseConfig.plugins.typescript
      }),
      sass({
        ...baseConfig.plugins.sass
      })
    ]
  };
  buildFormats.push(unpkgConfig);
}

// Export config
export default buildFormats;
