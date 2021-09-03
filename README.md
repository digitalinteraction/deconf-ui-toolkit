# deconf-ui-toolkit

A UI Library for building decentralised conference platforms.
Designed to provide a central homepage for virtual events happening on lots of other services and platforms
like YouTube, Zoom, Vimeo or Twitch.

- [storybook](https://deconf.openlab.dev)
- [npm package](https://www.npmjs.com/@openlab/deconf-ui-toolkit)

---

## Contents

### Sass Styles

It should export a sass file which you can customise the variables of like:

```scss
$primary: rebeccapurple;
$secondary: green;
$family-sans-serif: Helvetica, Avenir;
// etc

@import '~@openlab/deconf-ui-toolkit/toolkit.scss';
```

### I18n

You provide your own I18n module when importing the toolkit which has these
strings set (they are all namespaced under `deconf`):

> You can skip strings for sections you aren't using

_key_

- ^1 - 1 parameter (e.g. `{0}`)
- ^2 - 2 parameters (e.g. `{0} {1}`)
- ^3 - 3 parameters (e.g. `{0} {1} {2}`)
- ^4 - 4 parameters (e.g. `{0} {1} {2} {3}`)
- ^5 - 5 parameters (e.g. `{0} {1} {2} {3} {5}`)
- ^c - count key (e.g. `apples | apple | apples`) to pluralise based on a count/number

> WIP, for full keys used see [.storybook/locale.json](./.storybook/locale.json)

**General**

- `deconf.general.hours` - Pluralise hours (^c)
- `deconf.general.minutes` - Pluralise minutes (^c)
- `deconf.general.seconds` - Pluralise seconds (^c)

Each component to use has a doc comment like this in it.
It lets you know what i18n and FontAwesome icons are required,
along with what sass variables can be customized.

```ts
//
// i18n
// - n/a
//
// icons
// - n/a
//
// sass
// - n/a
//
```

### Routes

The routes that need to be implemented are defined by `Routes` in
[src/lib/constants.ts](/src/lib/constants.ts)

### Scss Variables

Some components expose variables to control how they are styled and coloured.
See the vue component in question for more.

All of [bulma's variables](https://bulma.io/documentation/customize/variables/)
are also used, in particular:

- `$text-strong` - for heavy text
- `$text-light` - for light text
- `$weight-bold` - to make things bold
- `$size-{n}` - to size text
- `$block-spacing` - to space elements apart
- `$background` - to colour the background

> WIP

---

components are writen in a specific way:

- MaintainableCss class naming [#](https://maintainablecss.com)
- Global scss (no scoped)
  - global variables with !default for overrides
  - bulma variables where available
- only default exports from `.vue` files
- specific import filenames where not ts/js
- VSCode "story" snippet for setting up stories
- `../lib/module` for common logic in components
- `../story-lib/module` for common logic in stories
- prefer verbosity in stories so they are self-enclosed
- don't use `Vue.extend` because it ends up with a different global `vue`
  which has different routes.

---

how does the bundler work?

- `rollup` is used to compile vue components together into `dist/deconf-ui.{esm}.{js,map}`
  - scss
    - it currently ignores scss output right now
    - as of rollup-plugin-vue@5 vue processes the sass internally which we can't hook into
    - `build/sass-plugin`
      - was originally for taking sass requests for rollup
        and combining into a single file. This works with rollup-plugin-vue@6 but not **@5**
      - it is now responsible for handling rollup sass requests and completely ignoring everything
  - types
    - I couldn't find a way to get this to output TypeScript types either
- `tsc` is used to generate type definitions into `dist/types`, not bundled
- `build/pull-theme` is used to read in vue files, extract the scss contents into `dist/theme.scss`
  and combine into a single file
  - this relies on having **no** `scoped` vue styles + [MaintainableCss](https://maintainablecss.com) class names
  - it also allows scss variables to be exposed

other notes

- we're using vue2 which storybookjs supports (02/02/2021)
