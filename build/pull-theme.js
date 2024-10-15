/* eslint-disable @typescript-eslint/no-var-requires */

//
// Experimental script to pull out <theme> blocks from .vue sfc's
//

import fs from 'node:fs'
import { globby } from 'globby'

const debug = console.debug

const sassRegex = () => /<style\s+lang="scss">([\w\W]*)<\/style>/g

// Files to import first (in order)
const prependFiles = ['src/scss/common.scss', 'src/scss/app.scss']

// How to seperate sass blocks
const sassSeperator = '\n\n\n'

// How to wrap sass into the output
const wrapSass = (name, code) =>
  [`/*\n  START ${name}\n*/`, code, `/*\n  END ${name}\n*/`].join('\n')

//
// Script entrypoint
// -> Goal reproducable
//
async function main() {
  // Find all vue files
  const matches = await globby('src/**/*.vue')
  matches.sort((a, b) => a.localeCompare(b))
  debug('matches=%o', matches.length)

  // Load the prepend files first and convert into components (scss strings)
  const components = await Promise.all(
    prependFiles.map(async (filename) => ({
      name: filename,
      code: await fs.promises.readFile(filename, 'utf8'),
    })),
  )

  // Loop through vue component files and look for <theme> blocks to pull out
  for (const filepath of matches) {
    debug('read %o', filepath)
    const file = await fs.promises.readFile(filepath, 'utf8')
    const result = sassRegex().exec(file)
    if (!result) {
      debug('miss %o', filepath)
      continue
    }
    components.push({ name: filepath, code: result[1] })
  }

  // Make sure the dist folder exists
  await fs.promises.mkdir('dist', { recursive: true })

  // Create the combined scss file
  components.sort((a, b) => a.name.localeCompare(b))
  const scss = components
    .map(({ name, code }) => wrapSass(name, code))
    .join(sassSeperator)

  await fs.promises.writeFile('dist/theme.scss', scss)

  // Copy the common.scss too
  const commonSass = await fs.promises.readFile('src/scss/common.scss')
  await fs.promises.writeFile('dist/common.scss', commonSass)
}

//
// Run the main function and log any errors
//
main().catch((error) => {
  console.error(error)
  process.exit(1)
})
