//
// rollup.config.js
// generated with vue-sfc-rollup and imported accross
//
import fs from 'fs';
import path from 'path';

import vue from 'rollup-plugin-vue';
import node from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';

import extractSass from './sass-plugin';

const projectRoot = path.resolve(__dirname, '..');

const exportedModules = [
  { input: 'src/module.ts', output: 'dist/deconf-ui.esm.js' },
  { input: 'src/atrium/module.ts', output: 'dist/atrium.js' },
  { input: 'src/audio-lib/module.ts', output: 'dist/audio-lib.js' },
  { input: 'src/content/module.ts', output: 'dist/content.js' },
  { input: 'src/core/module.ts', output: 'dist/core.js' },
  { input: 'src/dev/module.ts', output: 'dist/dev.js' },
  { input: 'src/form/module.ts', output: 'dist/form.js' },
  { input: 'src/lib/module.ts', output: 'dist/lib.js' },
  { input: 'src/registration/module.ts', output: 'dist/registration.js' },
  { input: 'src/schedule/module.ts', output: 'dist/schedule.js' },
  { input: 'src/session/module.ts', output: 'dist/session.js' },
  { input: 'src/store/module.ts', output: 'dist/store.js' }
];

const babelConfig = {
  // ...require('../babel.config'),
  extensions: ['.js', '.ts', '.vue'],
  exclude: 'node_modules/**',
  babelHelpers: 'runtime',
  babelrc: false,
  presets: [
    ['@babel/preset-env', { modules: false }],
    '@babel/preset-typescript'
  ],
  plugins: ['@babel/plugin-transform-runtime']
};

/** @type {import('rollup-plugin-vue').VuePluginOptions} */
const vueConfig = {
  css: false,
  template: {
    isProduction: true,
    compilerOptions: {
      whitespace: 'condense'
    }
  },
  data: {
    scss: '@import "@/scss/common.scss";\n'
  },
  style: {
    preprocessOptions: {
      scss: {
        importer: [
          url => {
            const file = url
              .replace(/^~/, `${path.join(projectRoot, 'node_modules')}/`)
              .replace(/^@/, path.join(projectRoot, 'src'));
            return { file };
          }
        ]
      }
    }
  }
};

const sassConfig = {
  prependData: [
    fs.readFileSync('src/scss/common.scss'),
    fs.readFileSync('src/scss/app.scss')
  ].join('\n\n\n'),
  copyFiles: [
    {
      input: path.resolve(projectRoot, 'src/scss/common.scss'),
      output: 'common.scss'
    }
  ],
  filename: null
};

// const argv = minimist(process.argv.slice(2));

// list external dependencies, exactly the way it is written in the import statement.
// https://rollupjs.org/guide/en/#warning-treating-module-as-external-dependency
const externalPackages = [
  'bulma',
  'vue',
  'vue-i18n',
  'vue-router',
  'vuex',
  '@fortawesome/vue-fontawesome',
  'copy-to-clipboard',
  '@openlab/deconf-shared',
  '@babel/runtime'
];

// Customize configs for individual targets
/** @type {import("rollup").InputOptions[]} */
const buildFormats = [];

//
// ESM
//
const vuePlugin = vue(vueConfig);
for (const { input, output } of exportedModules) {
  buildFormats.push({
    input: path.resolve(projectRoot, input),
    external: externalPackages,
    output: {
      format: 'esm',
      file: output,
      exports: 'named'
    },
    plugins: [
      node({ extensions: ['.js', '.ts', '.vue'] }),
      extractSass(sassConfig),
      vuePlugin,
      babel(babelConfig),
      commonjs()
      // terser()
    ]
  });
}

// Export config
export default buildFormats;
