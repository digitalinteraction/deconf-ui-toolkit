/* eslint-disable @typescript-eslint/no-var-requires */

//
// Experimental script to pull out <theme> blocks from .vue sfc's
//

// TODO: make sure these are top-level dependencies
const fs = require('fs');
const glob = require('globby');
const debug = require('debug')('theme');

const regex = /<theme>\s*([\s\S]*)\s*<\/theme>/g;

// Files to import first (in order)
const prependFiles = ['src/scss/common.scss', 'src/scss/app.scss'];

// How to seperate sass blocks
const sassSeperator = '\n\n\n';

// How to wrap sass into the output
const wrapSass = (name, inner) =>
  [`/*\n  START ${name}\n*/`, inner, `/*\n  END ${name}\n*/`].join('\n');

//
// Script entrypoint
//
async function main() {
  // Find all vue files
  const matches = await glob('src/**/*.vue');
  debug('matches=%o', matches);

  // Load the prepend files first and convert into components (scss strings)
  const components = await Promise.all(
    prependFiles.map(async filename => {
      const file = await fs.promises.readFile(filename, 'utf8');
      return wrapSass(filename, file);
    })
  );

  // Loop through vue component files and look for <theme> blocks to pull out
  await Promise.all(
    matches.map(async filepath => {
      debug('read %o', filepath);
      const file = await fs.promises.readFile(filepath, 'utf8');

      const result = regex.exec(file);
      if (!result) return;

      components.push(wrapSass(filepath, result[1].trim()));
    })
  );

  // Make sure the dist folder exists
  await fs.promises.mkdir('dist', { recursive: true });

  // Create the combined scss file
  await fs.promises.writeFile(
    'dist/theme.scss',
    components.join(sassSeperator)
  );
}

//
// Run the main function and log any errors
//
main().catch(error => {
  console.error(error);
  process.exit(1);
});
