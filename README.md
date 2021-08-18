# deconf-ui-toolkit

> Coming soon

---

## Contents

### Vue Components

- **components**
  - BackButton
  - BoxContent
  - SponsorGrid
  - SponsorRow
  - ToggleContents \*needs stories
  - **atrium**
    - HeroCard
    - ColorWidget
  - **app**
    - NavigationBar
    - SideTabs
  - **schedule**
    - **actions**
      - AddToCalendar
      - JoinSession
      - RegisterInterest
    - **tile**
      - SessionActions
      - SessionAttributes
      - SessionTile
      - SessionHeader
    - ScheduleBlock
    - ScheduleHeader
    - SpeakerGrid
    - TimeSlot
  - **session**
    - Countdown
    - IframeEmbed
    - LanguageWarning
    - SessionEmbed
    - SessionLink
    - SidebarItem
- **icons**
  - AtriumIcon
  - CoffeeChatIcon
  - HelpDeskIcon
  - ScheduleIcon
  - WhatsOnIcon
- **layouts**
  - AtriumLayout
  - AppLayout

TODO

- LanguageControl

### Sass Styles

It should export a sass file which you can customise the variables of like:

```scss
$primary: rebeccapurple;
$secondary: green;
$family-sans-serif: Helvetica, Avenir;
// etc

@import '~@openlab/deconf-ui-toolkit/toolkit.scss';
```

### Vuex

You provide your own vuex module when importing the toolkit which implements
the below mutations and actions:

**getters**

- `api/calendarLink` (session: Session) => string | null

**mutations**

- ...

**actions**

- ...

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

**AppLayout**

- `deconf.appLayout.atrium` - The title of the Atrium tab
- `deconf.appLayout.whatsOn` - The title of the What's On tab
- `deconf.appLayout.schedule` - The title of the Schedule tab
- `deconf.appLayout.coffeeChat` - The title of the Coffee Chat tab
- `deconf.appLayout.helpDesk` - The title of the Help Desk tab
- `deconf.appLayout.profile` - The title of the Profile menu item
- `deconf.appLayout.login` - The title of the Log In menu item
- `deconf.appLayout.register` - The title of the Register menu item
- `deconf.appLayout.interpret` - The title of the Interpret menu item
- `deconf.appLayout.unavailable` - The title of the Unavailable string in the menu

**Session**

- `deconf.session.languageWarning` - The warning when a session is in a different language (^1)
- `deconf.session.openTeams` - The text to open a teams link
- `deconf.session.openZoom` - The text to open a zoom link
- `deconf.session.openHubs` - The text to open a Mozilla Hubs link
- `deconf.session.openSpatial` - The text to open a Spatial Chat link
- `deconf.session.noEmbed` - The warning when no embedable option is available
- `deconf.session.liveNow` - State text when a session is live
- `deconf.session.sessionOver` - State text when a session is in the past
- `deconf.session.interest` - State text to show registrations (^c)

**General**

- `deconf.general.hours` - Pluralise hours (^c)
- `deconf.general.minutes` - Pluralise minutes (^c)
- `deconf.general.seconds` - Pluralise seconds (^c)
- `deconf.general.copy` - Text to copy a link
- `deconf.general.copied` - Text when a link has been copied

**ApiError**

- `deconf.apiError.title` - Title if the API is unreachable
- `deconf.apiError.content` - Text if an the API is unreachable
- `deconf.apiError.retry` - Message for retrying if the API is unreachable (^1)

**AppLoading**

- `deconf.appLoading.message` - Message when data is being initially fetched

**MiniSession**

- `deconf.miniSession.view` - Action to view a mini session
- `deconf.miniSession.live` - Live tag on a mini session

**FeaturedSessions**

- `deconf.featuredSessions.title` - Title of featured sessions section
- `deconf.featuredSessions.action` - Action of featured sessions section

**ScheduleFilters**

- `deconf.scheduleFilters.query` - The label of the search field
- `deconf.scheduleFilters.showFilters` - Button to show the extra filters
- `deconf.scheduleFilters.hideFilters` - Button to hide the extra filters
- `deconf.scheduleFilters.clearFilters` - Button to reset filtering
- `deconf.scheduleFilters.dateFilter` - The label of the date filter
- `deconf.scheduleFilters.typeFilter` - The label of the type filter
- `deconf.scheduleFilters.trackFilter` - The label of the track filter
- `deconf.scheduleFilters.themeFilter` - The label of the theme filter
- `deconf.scheduleFilters.recordedFilter` - The label of the "is recorded" filter
- `deconf.scheduleFilters.offLabel` - The label when no value is applied, e.g. "All"
- `deconf.scheduleFilters.yes` - Yes option
- `deconf.scheduleFilters.no` - No option

### Routes

These routes need to be implemented

| constant | value | page |
| -------- | ----- | ---- |


> WIP

### FontAwesomeIcon

At least these fa icons are needed:

| Icon                       | Usage                              |
| -------------------------- | ---------------------------------- |
| `fas user`                 | NavigationBar                      |
| `fas calendar-plus`        | AddToCalendar                      |
| `fas arrow-left`           | JoinSession, BackButton            |
| `fas arrow-right`          | JoinSession, BackButton            |
| `fas check`                | RegisterInterest                   |
| `fas user-plus`            | RegisterInterest                   |
| `fas globe`                | SessionAttributes, LanguageWarning |
| `fas save`                 | SessionAttributes                  |
| `fas long-arrow-alt-right` | TimeSlot                           |
| `fas long-arrow-alt-left`  | TimeSlot                           |
| `fas video`                | SessionEmbed                       |
| `fas circle`               | SessionState                       |
| `fas exclamation-triangle` | SessionState                       |
| `fas fire`                 | SessionState                       |
| `fas code-branch`          | SessionHeader                      |
| `fas tags`                 | SessionHeader                      |
| `fas tag`                  | SessionAttributes                  |
| `fas chevron-right`        | ColorWidget                        |
| `fas sync`                 | AppLoading                         |
| `fas arrow-right`          | MiniSession                        |

> WIP

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

https://www.freecodecamp.org/news/how-to-create-and-publish-a-vue-component-library/

---

components are writen in a specific way:

- MaintainableCss class naming [#](https://maintainablecss.com)
- Global scss (no scoped)
  - global variables with !default for overrides
  - bulma variables where available
- only default exports from `.vue` files
- specific import filenames where not ts/js
- "story" snippet for setting up stories
- `@/story-utils` for util functions in stories
- prefer verbosity in stories so they are self-enclosed
- don't use `Vue.extend` because it ends up with a different global `vue`
  which has different routes.

> WIP

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
