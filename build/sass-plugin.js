//
// A plugin for rollup to take all sass out and combine into a single scss
// file to be imported by clients
//
//
// 16/09/21 TODO:
//   This is only used to strip CSS out of the rollup build (filename === null).
//   With rollup-plugin-vue@5 it handles the SCSS and doesn't export for rollup,
//   with @6 it does export the SCSS which means we can bundle it ourselfs.
//   But that isn't possible for now.
//

import { createFilter } from 'rollup-pluginutils';
import fs from 'fs';

const sassSeperator = '\n\n\n';
const sassBlock = (name, inner) =>
  [`/*\n  START ${name}\n*/`, inner, `/*\n  END ${name}\n*/`].join('\n');

/** @returns {import("rollup").PluginHooks} */
export default function(options = {}) {
  const {
    filename = 'theme.scss',
    include = ['/**/*.css', '/**/*.scss', '/**/*.sass'],
    exclude,
    prependData = null,
    copyFiles = [],
    appendData = null
  } = options;

  const filter = createFilter(include, exclude);

  const styles = new Map();

  return {
    name: 'scss',
    transform(code, id) {
      if (!filter(id)) return;

      styles.set(id, code);

      return '// redacted scss';
    },
    generateBundle() {
      // "=== null" isn't ideal but works to quickly disable output from rollup.config.js
      if (filename === null) return;

      const components = [`/* AUTOGENERATED SASS FILE */`];

      if (prependData) {
        components.push(sassBlock('PREPEND_DATA', prependData));
      }

      if (Array.isArray(copyFiles)) {
        for (const { input, output } of copyFiles) {
          if (typeof input !== 'string' || typeof output !== 'string') {
            console.error('Invalid copyFiles %o', { input, output });
            continue;
          }

          this.emitFile({
            type: 'asset',
            fileName: output,
            source: fs.readFileSync(input, 'utf8')
          });
        }
      }

      const sortedKeys = Array.from(styles.keys()).sort((a, b) =>
        a.localeCompare(b)
      );

      for (const id of sortedKeys) {
        components.push(sassBlock(id, styles.get(id)));
      }

      if (appendData) {
        components.push(sassBlock('APPEND_DATA', appendData));
      }

      // Emit the new file
      this.emitFile({
        type: 'asset',
        fileName: filename,
        source: components.join(sassSeperator)
      });
    }
  };
}
