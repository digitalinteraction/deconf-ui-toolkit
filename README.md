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

**mutations**

- ...

**actions**

- ...

### I18n

You provide your own I18n module when importing the toolkit which has these
strings set (they are all namespaced under `deconf`):

> You can skip strings for sections you aren't using

| key                              | usage                                                      |
| -------------------------------- | ---------------------------------------------------------- |
| `deconf.appLayout.atrium`        | The title of the Atrium tab                                |
| `deconf.appLayout.whatsOn`       | The title of the What's On tab                             |
| `deconf.appLayout.schedule`      | The title of the Schedule tab                              |
| `deconf.appLayout.coffeeChat`    | The title of the Coffee Chat tab                           |
| `deconf.appLayout.helpDesk`      | The title of the Help Desk tab                             |
| `deconf.appLayout.profile`       | The title of the Profile menu item                         |
| `deconf.appLayout.login`         | The title of the Log In menu item                          |
| `deconf.appLayout.register`      | The title of the Register menu item                        |
| `deconf.appLayout.interpret`     | The title of the Interpret menu item                       |
| `deconf.appLayout.unavailable`   | The title of the Unavailable string in the menu            |
| `deconf.session.languageWarning` | The warning when a session is in a different language (^1) |
| `deconf.session.openTeams`       | The text to open a teams link                              |
| `deconf.session.openZoom`        | The text to open a zoom link                               |
| `deconf.session.noEmbed`         | The warning when no embedable option is available          |
| `deconf.session.liveNow`         | State text when a session is live                          |
| `deconf.session.sessionOver`     | State text when a session is in the past                   |
| `deconf.session.interest`        | State text to show registrations (^c)                      |
| `deconf.general.hours`           | Pluralise hours (^c)                                       |
| `deconf.general.minutes`         | Pluralise minutes (^c)                                     |
| `deconf.general.seconds`         | Pluralise seconds (^c)                                     |
| `deconf.general.copy`            | Text to copy a link                                        |
| `deconf.general.copied`          | Text when a link has been copied                           |

**key**

- ^1 - 1 parameter (e.g. `{0}`)
- ^2 - 2 parameters (e.g. `{0} {1}`)
- ^3 - 3 parameters (e.g. `{0} {1} {2}`)
- ^4 - 4 parameters (e.g. `{0} {1} {2} {3}`)
- ^5 - 5 parameters (e.g. `{0} {1} {2} {3} {5}`)
- ^c - count key (e.g. `apples | apple | apples`) to pluralise based on a count/number

> WIP, for full keys used see [.storybook/locale.json](./.storybook/locale.json)

### Routes

These routes need to be implemented

| constant | value | page |
| -------- | ----- | ---- |


> WIP

### FontAwesomeIcon

At least these fa icons are needed:

- ...

> WIP
