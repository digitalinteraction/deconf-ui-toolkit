# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [3.0.3](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v3.0.1...v3.0.2) (2024-11-13)

**fixed** `NavigationBar` items are always disabled

## [3.0.2](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v3.0.1...v3.0.2) (2024-11-10)

**fixed** improved component types

## [3.0.1](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v3.0.0...v3.0.1) (2024-10-16)

**fixed** fixed the package build

## [3.0.0](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.35.0...v3.0.0) (2024-10-16)

**Now with vue 3**

Most of the logic of the library is as-is. It is now built for `vue-3` and bundled with `vite`.
The library is more stict with it's TypeScript so there might be some issues there.
All dependencies have been upgraded, majorly:

- fontawesome 6
- storybook 8
- vue 3
- eslint 9
- vue-i18n 10
- vue-router 4
- vuex 4

There are updated peer dependencies too.

### Features

- New QR option on `<SessionLinks>` which tries to load

## [2.35.0](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.34.0...v2.35.0) (2023-06-15)

### Features

- add discord primary embed ([8eb4bfc](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/8eb4bfcde2acd5acfdbb6f764f90d6c5c5bd932d))

## [2.34.0](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.33.1...v2.34.0) (2023-03-20)

### Features

- add myhubs as hubs embeds ([c54efa8](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/c54efa82e1b8788e0dcf36993bc5c4d1c037f29b))

### [2.33.1](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.33.0...v2.33.1) (2023-02-27)

### Bug Fixes

- update browserlists ([b15ec28](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/b15ec289cd60fca173c46339c8849d49e05bf6d4))

## [2.33.0](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.32.0...v2.33.0) (2023-02-27)

### Features

- support hyper.audio embeds ([996f1a8](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/996f1a87d98db538ef6ce97578d250a3a2211a7c))

## [2.32.0](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.31.0...v2.32.0) (2023-02-01)

### Features

- add new vimeo embed links ([91b3ab3](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/91b3ab3a1f76d31a59e62e145474fc909b3e37ca))

## [2.31.0](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.30.0...v2.31.0) (2023-01-18)

### Features

- **session:** add "footer" slot to SessionView ([e3b00b1](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/e3b00b13382bbfb7a22add546cfe5a7449306262))

## [2.30.0](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.29.1...v2.30.0) (2023-01-12)

### Features

- **session:** add slot to swap out login text ([266dcd7](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/266dcd7b79712c03e4c3cd90e91b87529d537ef4))

### Bug Fixes

- **schedule:** show shorter sessions first when grouping slots ([635f20e](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/635f20e7b610aeccbc27611e4777d615d07e1a0b))

### [2.29.1](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.29.0...v2.29.1) (2022-12-06)

### Bug Fixes

- don't show "Add to my schedule" when signed out ([01126c1](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/01126c1d704efa51544f02619ede94e54fad8359))
- update browser lists ([21b2031](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/21b20315fecae08149ec79e670a9d0e97996a4c7))

## [2.29.0](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.28.1...v2.29.0) (2022-11-25)

### Features

- add StaticDeconfApiClient ([98230bf](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/98230bf9e5546e3235f86a7684d9711457d7e9b5))

### Bug Fixes

- export DeconfApiClientOptions ([63e3466](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/63e3466df3c917da1300210a3cb94d5606dffad8))

### [2.28.1](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.28.0...v2.28.1) (2022-10-28)

### Bug Fixes

- **core:** TokenCaptureView no longer emits success when it actually failed ([a3ba873](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/a3ba8734a893d79e3f531d09049a3e6c37d3e90e))

## [2.28.0](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.27.0...v2.28.0) (2022-10-27)

### Features

- **core:** emit params for TokenCaptureView@success ([6b077e7](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/6b077e7dcb472d09021f1bb12a12d58f13038c37))

## [2.27.0](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.26.1...v2.27.0) (2022-10-27)

### Features

- **core:** add InterestButton to encapsulate the rendering of that button ([0c8b45a](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/0c8b45adf2d760b48168e12962b6ef3df6ea91bb))
- deprecate api-module prop in favor of DeconfPlugin#apiModule + add namespaceForApi util ([8f7de41](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/8f7de41c3c7da7bc38d033b70817de7aaf162043))
- **schedule:** add "actions" option to SessionTile with new InterestButton ([af98ce4](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/af98ce4bd7f9f23244f0a24f7b24dfa48b5e43c2))

### Bug Fixes

- **content:** ApiContent now uses namespaceForApi ([eddbc40](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/eddbc403218e90fd13aa7f0666935370db532235))
- **core:** TokenCaptureView now uses namespaceForApi ([46d693f](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/46d693f172fedb88ed3f0bdadda46c02adcee30b))
- fix bad InterestButton import ([42fd86d](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/42fd86df5c7024d80c735a1cb6b7c53c061761fa))

### [2.26.1](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.26.0...v2.26.1) (2022-10-25)

### Bug Fixes

- **lib:** reduce schedule method's type requirements for ScheduleView ([f49247c](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/f49247c2d955027b4644191bfb68d61dbbb1e2a7))

## [2.26.0](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.25.0...v2.26.0) (2022-10-25)

### Features

- **lib:** add `guardPage` and deprecated `guardRoute` ([9c82d14](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/9c82d14511dbc37688b2892e87bbfcecf3fde50b))

## [2.25.0](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.24.2...v2.25.0) (2022-10-25)

### Features

- **core:** add ApiMessage for displaying well-known API errors ([b932b37](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/b932b379d7bcd12af7b390349955463185ec0239))
- **core:** add optional "appLayout-main" class to AppLayout to auto-fill vertically ([ac66282](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/ac6628206f4c36c4666447c95ffa518250c7014b))
- **core:** add TokenCaptureView to encapsulate the login flow ([9b3318e](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/9b3318eee9c58cf2344b5bdcb4ed5a94368288a5))
- **core:** SpeakerDialog supports markdown and strips it from the role ([0d02747](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/0d02747256e15670929111bbc32a6f1c03bec09e))
- **lib:** add getRouteTitle & getScrollBehaviour router helpers ([a71083e](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/a71083efa5cdbe1354c8ba69f2f38199b12c1efb))
- **schedule:** stick "toggle history" to the bottom of the screen ([aaf6c00](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/aaf6c006e2d5f169ff472ee51936bb93b75d7aec))

### Bug Fixes

- **core:** improve inline icons ([5daed59](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/5daed5940d2c664c4068925eac579c850b4accbf))
- **lib:** deprecate `getDefaultRoutes` ([90b4256](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/90b4256110e8a60a5c770b006535c0415960a674))
- **lib:** fix ApiClient#getContent to match the API ([1771e60](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/1771e604c00db1379dfb64460877fdee52ab571e))

### [2.24.2](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.24.1...v2.24.2) (2022-07-29)

### Bug Fixes

- fix ColorWidget not displaying icons ([a9b9b66](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/a9b9b668db846535f8a01b1d9d14239b554f7e6a))

### [2.24.1](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.24.0...v2.24.1) (2022-07-28)

### Bug Fixes

- fix schedule slot sorting ([5066729](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/50667291632f1824814f9afd37fc97ac97092b06))

## [2.24.0](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.23.0...v2.24.0) (2022-07-28)

### Features

- group search results by day. New optional deconf.schedule.resultHeading i18n key ([0aa3373](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/0aa33738338fcc9e9bb971d96ed57a458de0c685))

### Bug Fixes

- revert broken sort for FilteredScheduleView ([5bba978](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/5bba978bd38bbf20f61faa2e6d09363abadf68ab))

## [2.23.0](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.22.0...v2.23.0) (2022-07-28)

### Features

- add option to sort a FilteredScheduleView ([38e1163](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/38e1163fbd4d9f24dd49cf1abdd67356e1662d52))

## [2.22.0](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.21.3...v2.22.0) (2022-07-18)

### Features

- **core:** add BidirectionalIcon to ease ltr/rtl icon usage ([0e9dedf](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/0e9dedf42bbcdb83798d52091f4bb8d3a26cd83a))

### Bug Fixes

- **core:** show the end-date of a TimeSlot when it is meaningful ([531bf4d](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/531bf4da3391ee4e4cfaddeebd499aa00200e6a0))
- **core:** stop long speaker roles breaking the headshots ([c7eee49](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/c7eee49c309dee3d5f2523964e8a9ae072e02dbc))
- **schedule:** stop Firefox overflow in SessionBoard ([6c86c9f](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/6c86c9f1e99edf6dd9e93c35275e84739f1f328d))

### [2.21.3](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.21.2...v2.21.3) (2022-07-01)

### Bug Fixes

- sort schedule filter date options ([c2e9d0b](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/c2e9d0b00f1386ac820a93ff83597fa18f006d54))

### [2.21.2](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.21.1...v2.21.2) (2022-06-24)

### Bug Fixes

- **core:** strip html tags from markdown too ([97f76a8](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/97f76a8533de23514199304166f8bd84738098f3))

### [2.21.1](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.21.0...v2.21.1) (2022-06-23)

### Bug Fixes

- add missing apiModule param to PrivateCalendarCreator ([249f8c1](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/249f8c1c2004996e7e2d0977f9adaa6977a39eb4)), closes [#79](https://github.com/digitalinteraction/deconf-ui-toolkit/issues/79)
- **core:** fetchProfile properly commits the registration now ([edf89d0](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/edf89d03671c29f6cd585519a86741b3add11c73))
- fix badly mapped attendance routes ([4e07523](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/4e0752319fe521f6900e19e7a6228e428dccb49e))
- **registration:** fix PrivateCalendarCreator's api inconsistency ([71954b4](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/71954b4374b7cd780accccf5af77b480639d19b7))
- strip markdown from speaker roles and session content ([a12f875](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/a12f875a2e28eef6a16503b669c051496e14463b))

## [2.21.0](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.20.0...v2.21.0) (2022-06-06)

### Features

- **core:** add slot to PageFooter for text above the links ([5a3c6c6](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/5a3c6c6937661863ca5be72615c46fff3ad6737a))

## [2.20.0](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.19.1...v2.20.0) (2022-05-30)

### Features

- **session:** add "beforeHeader" slot ([57eb9f5](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/57eb9f5bd62e5c2b161bbff41478675bf2fa7d30))

### Bug Fixes

- **storybook:** tweak MockAppLayout style ([f5f7b6a](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/f5f7b6af07d4c35d65d72f5fe3114c3b19b3a85a))

### [2.19.1](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.19.0...v2.19.1) (2022-05-30)

## [2.19.0](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.18.1...v2.19.0) (2022-05-30)

### Features

- **schedule:** optionally allow custom session routes in ScheduleConfig ([04c9851](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/04c9851a06c13960896bd020f746ffca4883a275))

### Bug Fixes

- **lib:** fix api-client getSessionAttendance URL ([7335400](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/7335400d8d927265010ae02f8ef8241ce3c8b60b))
- remove broken style ([bb210d7](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/bb210d7fd212c33efb6db546f2708729caa19d26))

### [2.18.1](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.18.0...v2.18.1) (2022-05-19)

### Bug Fixes

- **lib:** fix ApiClient usage ([4c30fda](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/4c30fdafb8b4c2063ef9993e134e31499c4b3769))

## [2.18.0](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.17.0...v2.18.0) (2022-05-17)

### Features

- add AppDialog ([357d20d](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/357d20dc64ec4c99b1dc615818f01738d1f070e3))
- add DialogPlugin ([bbf54ca](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/bbf54cad381a2be31f799f2a595f391caafc4e30))
- add getSlug to lib module ([4f93ac5](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/4f93ac51b581258d4f02e9f2183742884d72863c))
- add guardRoute to lib module ([b69f127](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/b69f12753264bba44ae6365df7d21f9426c6cc02))
- add PrivateCalendarCreator ([5e36265](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/5e36265d155e6e1e8052752ae4fa58b302f0457e))
- **build:** show events in dependencies.html ([df28d81](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/df28d81c291cfd3f8c2a4b298c4d0f49d976f885))
- **core:** add InlineMessage ([641f739](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/641f739a3c78696de1ac310d6eaa6384c27bef2c))
- **schedule:** add FilteredScheduleView and associated library functions ([2f978e5](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/2f978e530395df48c9e5b7e2d514e79fe30be2ce))

### Bug Fixes

- improve package "exports" ([3f7acb5](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/3f7acb555c9013e5488392b32e10e72ca9fa4ac9))

## [2.17.0](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.16.3...v2.17.0) (2022-03-09)

### Features

- **session:** add support for mozfest mozilla hubs links ([b6ef6d8](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/b6ef6d8cf1884522ceb0af1b94e20d4255fce29f))

### [2.16.3](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.16.2...v2.16.3) (2022-03-01)

### Bug Fixes

- **schedule:** don't show filters with no options ([dc76eb3](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/dc76eb3b739ccdef0ffeaa1df1aba9f5e0b67532))

### [2.16.2](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.16.1...v2.16.2) (2022-02-25)

### Bug Fixes

- **core:** stop AppLayout's header covering the page ([41c865d](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/41c865d34a2a877d5557049b4a97a90048819cc8))

### [2.16.1](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.16.0...v2.16.1) (2022-02-25)

### Bug Fixes

- **core:** allow AppLayout menu to scroll on mobile ([f2cd452](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/f2cd452718432090fd16682578d595466482e173))

## [2.16.0](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.15.2...v2.16.0) (2022-02-24)

### Features

- **session:** embed cinnamon videos ([7b30164](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/7b30164418190da8e28c2fcfd635675a52e928b5))

### [2.15.2](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.15.1...v2.15.2) (2022-02-11)

### Bug Fixes

- **core:** fix AppLoading not appearing when compiled ([53c9bd9](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/53c9bd94f7de10e5678e7baa31f78abfaef20be8))

### [2.15.1](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.15.0...v2.15.1) (2022-02-11)

### Bug Fixes

- **lib:** decodeScheduleFilters returns null as expected when empty params passed ([98ea94f](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/98ea94fb815ff3ee8b9b5f13876c7110e8dc5f82))
- revert decodeScheduleFilters and add decodeUrlScheduleFilters instead ([e73987e](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/e73987ea8ec466c763e3812b139530b121217c8a))

## [2.15.0](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.14.3...v2.15.0) (2022-02-07)

### Features

- **session:** add anchor-fm embed ([a288ef7](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/a288ef700c825ffb896233ed14bf74f2c8a59365))

### Bug Fixes

- **session:** track attribute shows correctly ([63000c2](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/63000c2523d872200bca8c92e498c9ef48b35f1b))

### [2.14.3](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.14.2...v2.14.3) (2022-02-07)

### Bug Fixes

- **session:** describe sidebar items with classes ([8fb281f](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/8fb281f3b0d78f0f888a2d792ebd2e2336e74e22))

### [2.14.2](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.14.1...v2.14.2) (2022-02-07)

### Bug Fixes

- **session:** add padding between header & title ([e46773d](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/e46773d08b09697550435e9bf36eeb22c6c686a3))

### [2.14.1](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.14.0...v2.14.1) (2022-01-27)

### Bug Fixes

- **session:** speakers are shown in the correct order ([baf8f3d](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/baf8f3d3ac3fb3f63ea091ed255686c759903696))

## [2.14.0](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.13.0...v2.14.0) (2022-01-20)

### Features

- **session:** allow session content to be overidden by a slot ([0ed33b3](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/0ed33b358629681f74489cf066c4cf0dddbb81ff))

## [2.13.0](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.12.1...v2.13.0) (2022-01-19)

### Features

- **core:** add `options` to DeconfPlugin#showDialog to request a dialog size ([be536e2](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/be536e233c0c5ca67c97cf19638f5ebcda5b7664))
- **registration:** add "preActions" slot to ProfileView ([f1424da](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/f1424dab40d2415d02186d78c58520611b34382f))

### Bug Fixes

- **core:** close AddToCalendarDialog after picking a calendar ([da62c4b](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/da62c4b6eef91260f530d239da93994474b49958))

### [2.12.1](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.12.0...v2.12.1) (2022-01-19)

### Bug Fixes

- show AddToCalendar buttons as expected ([006ad5c](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/006ad5c98bafa53f7089a8d7ab50129da2c80720))

## [2.12.0](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.11.0...v2.12.0) (2022-01-19)

### Features

- add argument `kind` to getCalendarLink and deprecate the method without kind passed ([055ae3d](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/055ae3d29ae0562a7cf1171d130d3b1cab49db1d))
- **core:** add FullScreenDialog size prop with small option ([f6497ab](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/f6497abf51a317ae8d0f03e18c0f55d243c66ecf))
- **core:** add updated AddToCalendar button to show AddToCalendarDialog with multiple options ([5b5aa0e](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/5b5aa0e35ef31c85ad09a61ce5e7b340bc7000ce))
- track the type of calendar used from the dialog ([e8124e0](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/e8124e005ed4077382a3ca81a2ed8c204a7949bf))

### Bug Fixes

- add missing AddToCalendarDialog export ([ec20e3c](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/ec20e3c1e298eef4362a1e03667f5d2b80eeeba3))
- add subtitle to AddToCalendarDialog ([8af04df](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/8af04df7b55073e546de59ac92587d4dcdf13895))

## [2.11.0](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.10.1...v2.11.0) (2022-01-12)

### Features

- **dev:** add "extras" slot to allow custom controls to be added ([e3ec72c](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/e3ec72ccc5b3372c65127186bf7a53e328f9b213))

### [2.10.1](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.10.0...v2.10.1) (2022-01-07)

### Bug Fixes

- hide AddToCalendar when there is no calendar link (ie unscheduled) ([d9142cb](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/d9142cb4412f48c3a6f8cf56c2cd902da70689d1))

## [2.10.0](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.9.1...v2.10.0) (2022-01-07)

### Features

- **schedule:** allow WhatsOnView readonly to be configured by a prop ([e3773be](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/e3773be63a655338191f5ae97b90c6eafe516307))
- **session:** emit links & attendance from SessionView for parents to use ([5cddaea](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/5cddaeaee2f76429c6d9d1a86ed270444ecb69dd))

### Bug Fixes

- **core:** make SpeakerDialog headshots fit into the circle ([9a8de64](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/9a8de648362d383e1c9058eafc9088a504901c5b))

### [2.9.1](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.9.0...v2.9.1) (2022-01-06)

### Bug Fixes

- **core:** make SpeakerDialog headshots circular ([c98e801](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/c98e801933a8fd62c4a9c981eac515e49da196db))

## [2.9.0](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.8.1...v2.9.0) (2022-01-06)

### Features

- add Core/SpeakerDialog ([a295729](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/a295729e2e7a634b7c49888181065e8d9d0bdfb6))
- add dialog open/close to deconf-plugin interface — lightly backwards incompatible. ([80234ff](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/80234ff9ace8d9a47411b46458c4d7617ea484d1))
- show SpeakerDialog when clicking on SpeakerGrid ([81d2c3e](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/81d2c3e131f3de7fa7c39f0e499cd288145a0ab1))

### [2.8.1](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.8.0...v2.8.1) (2022-01-06)

### Bug Fixes

- add missing url-filters prop to WhatsOnView ([cf82636](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/cf82636d7bd4964877acf288cdd7ab2e4fb6106e))

## [2.8.0](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.7.0...v2.8.0) (2022-01-06)

### Features

- improve ScheduleFilter serialisation + expose to parents components ([74874df](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/74874df22068f89e7477da56a37895d5cb7ba678))
- **schedule:** add getFeaturedSessions to get upcoming sessions and slots for FeaturedSessions ([d02644d](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/d02644dade9ad3b5973509e6219b748f62258875))

## [2.7.0](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.6.1...v2.7.0) (2021-11-26)

### Features

- add tool to view component dependencies ([b408d72](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/b408d72a9e3fe26761d01b95f1eedfd9bd82408d))
- **core:** add prop to control which links NavigationBar shows ([8bd4051](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/8bd40515dc487b10475adec3a214a790703efc02))

### Bug Fixes

- **schedule:** add infoText fallback i18n to ScheduleView ([834fac9](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/834fac96eeba4405972a042cfc31ba418e048806))
- update dependency docs ([942aac8](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/942aac801fef94247eb9af942b8399225b380ffc))
- update missing docs ([d8b511e](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/d8b511e90c1b15f72621cf1111fae1b19298fb5f))

### [2.6.1](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.6.0...v2.6.1) (2021-11-24)

### Bug Fixes

- fix ApiContent not showing links properly ([5a4d627](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/5a4d627e50dbf641234fb85df83e217596ce825e))

## [2.6.0](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.5.0...v2.6.0) (2021-11-24)

### Features

- **registration:** expose ProfileField and FullAuthToken interfaces ([de229c7](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/de229c74062409c9441ce6c4f4f06d6fbb94fb6f)), closes [#62](https://github.com/digitalinteraction/deconf-ui-toolkit/issues/62)
- **schedule:** add slots for WhatsOnView content ([98fbae5](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/98fbae5e4750548c845c7c4cb0777dfb99a2d7a3))
- **schedule:** add title & noResults customisation to ScheduleView via slots ([f1f6843](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/f1f68434fc90f96ae6333a919cfa1f00c3e665de))

### Bug Fixes

- **schedule:** fix WhatsOnView breaking up tiles on FireFox ([89c3368](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/89c336848d1daac352748be12917a6a44efcce96)), closes [#63](https://github.com/digitalinteraction/deconf-ui-toolkit/issues/63)

## [2.5.0](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.4.0...v2.5.0) (2021-11-18)

### Features

- add $sessionView-titleFamily to SessionView to customise the title font ([7379223](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/7379223fdd87d2f0d53abb77e19aded32374143a)), closes [#30](https://github.com/digitalinteraction/deconf-ui-toolkit/issues/30)
- add $sideTabs-activeBackground to SideTabs to customise the background when a tab is active ([87055eb](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/87055ebb7304467358bdf83445cef410dbf3886f)), closes [#8](https://github.com/digitalinteraction/deconf-ui-toolkit/issues/8)
- add $whatsOn-titleFamily to WhatsOnView to customise the title's font ([0c1c2ef](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/0c1c2efd3428cc9a2884d41f2351656aa6588bd7)), closes [#31](https://github.com/digitalinteraction/deconf-ui-toolkit/issues/31)
- add support for google meet links ([e7e2a3b](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/e7e2a3b09708df086a70b9dfb18e0d1040941aa4)), closes [#34](https://github.com/digitalinteraction/deconf-ui-toolkit/issues/34)
- add support for zoom meeting registration links ([cc44507](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/cc44507123a17972627f5c76fbf66fee007341dc)), closes [#35](https://github.com/digitalinteraction/deconf-ui-toolkit/issues/35)
- add variables to customize ProfileView's title & headings ([641871b](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/641871b145ddaf44633e4fb2cd8fc115008c2129)), closes [#25](https://github.com/digitalinteraction/deconf-ui-toolkit/issues/25)
- **content:** add content module and migrate ApiContent from PlanetRed ([11649c3](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/11649c372a680ced602201c30a15afd9a1a05bfb)), closes [#41](https://github.com/digitalinteraction/deconf-ui-toolkit/issues/41)
- **core:** add FullScreenDialog component ([e69d1f4](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/e69d1f4f16fd581a91046a68910591ea148ce3ab)), closes [#39](https://github.com/digitalinteraction/deconf-ui-toolkit/issues/39)
- **core:** add PageFooter component ([0c82f14](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/0c82f149575e1c393038bb5743f2ab1af33a9359)), closes [#44](https://github.com/digitalinteraction/deconf-ui-toolkit/issues/44)
- **dev:** add optional prop to set which controls to show ([3431829](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/3431829811118de667aec83c307f6558a494ddff)), closes [#49](https://github.com/digitalinteraction/deconf-ui-toolkit/issues/49)
- export SessionAndSlot interface for FeaturedSessions use ([715a041](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/715a04176f67f93227df3b89342f9fea7b29f56f)), closes [#9](https://github.com/digitalinteraction/deconf-ui-toolkit/issues/9)
- **lib:** add option to localiseFromObject to customise fallbacks ([3f86cdd](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/3f86cdd8e81290f101b0e812c781f1ca518bd8a3)), closes [#17](https://github.com/digitalinteraction/deconf-ui-toolkit/issues/17)
- **store:** add userAttendance mutation to api to convert from the API ([fb8886b](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/fb8886bca55fdb01feff07643c527eab6e9bafaf))

### Bug Fixes

- add RTL support to MiniSession's button ([ec3e130](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/ec3e130a67e89cbe24cc4580c3ea647b750989e1)), closes [#10](https://github.com/digitalinteraction/deconf-ui-toolkit/issues/10)
- fix audio-receiver typo ([b3a0e83](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/b3a0e8394c0edb39850d638208d0cb67e6fd6b48)), closes [#48](https://github.com/digitalinteraction/deconf-ui-toolkit/issues/48)
- fix AudioBroadcaster bugs and add example processor ([cf9d27a](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/cf9d27a9032ee43eacdc502b866b91f1addcdee2)), closes [#22](https://github.com/digitalinteraction/deconf-ui-toolkit/issues/22) [#21](https://github.com/digitalinteraction/deconf-ui-toolkit/issues/21)
- fix button's icon in RTL ([317358a](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/317358acf50c24be5c7e07a22022688c6050a379)), closes [#50](https://github.com/digitalinteraction/deconf-ui-toolkit/issues/50)
- fix insecure hashing in log-in metric, to be re-added in the future. ([23d76ff](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/23d76ff2ee4a5c46a701d4ffe001e986a226d5f5)), closes [#33](https://github.com/digitalinteraction/deconf-ui-toolkit/issues/33)
- mark SessionLayout as deprecated ([f369d02](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/f369d02ca63787e66ffbf8a346c06be6f95600f2)), closes [#15](https://github.com/digitalinteraction/deconf-ui-toolkit/issues/15)

## [2.4.0](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.3.3...v2.4.0) (2021-10-12)

### Features

- add click metric to primary embed ([1cde122](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/1cde12238e134631113b5bce11710f65b074f242))

### [2.3.3](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.3.2...v2.3.3) (2021-10-11)

### Bug Fixes

- fix settings.endDate being pushed forwards ([196d20e](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/196d20e7a56bbab97533555befa274f953755aff))

### [2.3.2](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.3.1...v2.3.2) (2021-10-11)

### Bug Fixes

- **LanguageWarning:** make locales uppercase ([7e57124](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/7e57124213d235daeacfb8fa3aeb7c5c204354e2))
- **SessionTile:** fix localisation to try the host language ([b18c86d](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/b18c86d56d2865d795c1dbf26576cfaa59320517))
- **SessionView:** improve localisation logic with respect to session language ([cdbd70c](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/cdbd70c30116ec0bd08bcf4b1ca2c153006c2fa9))

### [2.3.1](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.3.0...v2.3.1) (2021-10-11)

### Bug Fixes

- fix new vimeo embed iframes ([d8a7f66](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/d8a7f669339610ee6966c390325c20f22e5777df))

## [2.3.0](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.2.1...v2.3.0) (2021-10-11)

### Features

- add new vimeo formats ([9a709ab](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/9a709ab8ec183171029c1e5bb3a7154b40907207))

### [2.2.1](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.2.0...v2.2.1) (2021-10-08)

### Bug Fixes

- **schedule:** fix all/user toggle not localising ([4bc50fe](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/4bc50fecd3ed238ddbdb15997ee70b5657cf934a))

## [2.2.0](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.1.2...v2.2.0) (2021-10-07)

### Features

- add language filter to ScheduleFilters ([e1b3b85](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/e1b3b85348a8a898ccc4bb1b36c88bc48ac50f6a))
- show an organisation in SessionAttributes ([2c94672](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/2c94672ac45c280754b5b33185e961c5491bca5a))
- show organisation in SessionView and SessionTile ([95090b4](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/95090b43fef4be7e04c5ed416755f4ca0dbb23f8))

### [2.1.2](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.1.1...v2.1.2) (2021-10-06)

### Bug Fixes

- show session interested when not capped ([7252181](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/72521816b0fd149a40f1de6410937ae26abb6134))

### [2.1.1](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.1.0...v2.1.1) (2021-10-05)

### Bug Fixes

- add option to hide FeaturedSession's buttons ([d7a178b](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/d7a178b142b424c76c7bf224c710f4d8655155ae))

## [2.1.0](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.0.2...v2.1.0) (2021-10-05)

### Features

- **session:** show interest section when not capped ([845c6ae](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/845c6ae5b12dcac5677dfb30001d268b7dc45f9a))

### Bug Fixes

- **session:** show 'please log in' message when logged out ([201bd02](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/201bd02cbce349fc3a61a0110751fb79ce9a7007))

### [2.0.2](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.0.1...v2.0.2) (2021-10-05)

### Bug Fixes

- **nav:** show the active route on mobile ([33de4da](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/33de4daff6c900b4ca984c95e30c3bb06c4b440a))

### [2.0.1](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.0.0...v2.0.1) (2021-10-04)

### Bug Fixes

- secondary links now show on sessions when there are no "other" links ([407d3db](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/407d3db8e5c3a93609f9d741cbc1195674ab6f34))

## [2.0.0](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.0.0-beta.20...v2.0.0) (2021-10-04)

### ⚠ BREAKING CHANGES

- remove unused assets

### Features

- embed vimeo-chats alongside sessions. Deprecate SessionEmbed for PrimaryEmbed ([c40a7b7](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/c40a7b7aae456e9c0ebf5748778d8305c6e4d7f4))

### Bug Fixes

- remove unused assets ([c441825](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/c44182589d83385612d3c006c4b75a5958482452))

## [2.0.0-beta.20](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.0.0-beta.19...v2.0.0-beta.20) (2021-09-29)

### Features

- **session-view:** add language-warning ([45f9a21](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/45f9a21ef03789f3a485605f1c3df51442b492df))

### Bug Fixes

- **box-content:** reduce padding on mobile ([4b945cf](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/4b945cf46896a2896a90e0cc9ba3eb8205c49009))
- **box-content:** round corners on tablet as well desktop ([319a29a](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/319a29ac86cbf58bd155ee5277c2888780e7a039))
- **schedule-view:** add padding between infoText and filters ([13a8be6](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/13a8be6fb3f009f4ef06ad2f2c1022fcd83e1101))
- **util-layout:** stop buttons overflowing on mobile ([1da03af](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/1da03afc9487ea9a2bcf1082524db1f36defa602))
- **whats-on:** normalise infoText spacing with ScheduleView ([6388f1e](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/6388f1ec693a41b5be52c4247ba0fb62778d5cec))

## [2.0.0-beta.19](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.0.0-beta.18...v2.0.0-beta.19) (2021-09-28)

### Features

- add new slots to SessionView and add language to link's name ([4ba0ac3](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/4ba0ac325d001ac87a6a8ffcc79136ca3a3f1d74))

### Bug Fixes

- createStateMapper generics to return a subset of state ([b5a9638](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/b5a9638addc1b1bc5250379bf49b1cf5dd095ab8))
- fix duplicate links and improve multi-lingual links order ([5ca6b1b](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/5ca6b1b65773bd7bad90d3971ac9fa0757e9c2ad))
- **interpret:** fix self mutation ([8e2670b](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/8e2670b3acabe726189559bdc0deb986484e763b))
- short-circuit countdown when negative to always return 0s ([341a812](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/341a812b99d85d25614fa3637623adfb7324ac2e))

## [2.0.0-beta.18](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.0.0-beta.17...v2.0.0-beta.18) (2021-09-27)

### Bug Fixes

- **interpret:** work on store ([fba9310](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/fba93100887c53f9f0eed48a1c09bc0487a62be5))
- show interpret-mode button if an admin ([d0e355c](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/d0e355c95e8d32a0678bd33a41ce099a26f25bf1))

## [2.0.0-beta.17](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.0.0-beta.16...v2.0.0-beta.17) (2021-09-27)

### Features

- add "width" prop to UtilLayout ([23d3b31](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/23d3b31b93eb17de22f3acdbb2af502c7346774e))

### Bug Fixes

- add NoResults to WhatsOnView ([017aac7](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/017aac704797705672c30637974b3110d76c8225))
- **session:** fix links not being reset after unattend ([b6dfe39](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/b6dfe39ff7a31faf1d84005c58b5a030b965e2c5))

## [2.0.0-beta.16](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.0.0-beta.15...v2.0.0-beta.16) (2021-09-22)

### Features

- **metrics:** organise metrics, ensure implementation and add more ([2142312](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/2142312f85d0c36928c2de7b66ea00aeda26f9c0))

### Bug Fixes

- **SessionView:** fix links error ([e922bff](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/e922bffc65dea7ea9d7a4b16a83917845b029f7e))
- show loading when attend/unattend-ing a session ([8d3e475](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/8d3e475abebb978e68fd63f5231164e28467c010))

## [2.0.0-beta.15](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.0.0-beta.14...v2.0.0-beta.15) (2021-09-21)

### Bug Fixes

- fix SessionView not waiting for attend endpoints ([7415ea9](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/7415ea96ac3f875a750287cbe72d867f475ba640))

## [2.0.0-beta.14](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.0.0-beta.13...v2.0.0-beta.14) (2021-09-21)

### Features

- support multi-lingual links and upgrade deconf-shared ([48aef9b](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/48aef9bc214a20bdb6d686d56a4a10ee4674d07d))

### Bug Fixes

- fix countdown logic ([98a85d4](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/98a85d4f7764cc6d71d2d8987f58624e8a35dfd0))

## [2.0.0-beta.13](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.0.0-beta.12...v2.0.0-beta.13) (2021-09-21)

### Bug Fixes

- fix WhatsOnView to not show links ([dacef2f](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/dacef2f580222a451b41da8232201e40ae934e83))

## [2.0.0-beta.12](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.0.0-beta.11...v2.0.0-beta.12) (2021-09-21)

### ⚠ BREAKING CHANGES

- add all/user toggle to ScheduleView using new required prop userSessions.
- update ScheduleFilter to take a FullSchedule

### Features

- add "days" support for countdowns ([1867cf5](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/1867cf54a3cd759a338ec57c39600ac0d460353b))
- add all/user toggle to ScheduleView using new required prop userSessions. ([0ab5497](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/0ab54973bb407b9607d2a844e4293da48ea077dd))
- add infoText and doneText slots to LoginView and expose initialState for dev ([2a4cd9e](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/2a4cd9e2d0d521d8ed198c4fcc92b79c03890b9c))
- add infoText slot to ScheduleView ([125c6a3](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/125c6a36dc1b094794e0f813a9e1e4532783c3a4))
- add SegmentControl ([48b60b0](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/48b60b05eaaf6473fb104a91491ec4f3352eb796))
- improve DevControl ([f13a010](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/f13a01063438c95800384aa2db28f6e061f438f2))

### Bug Fixes

- add default interval to TemporalPlugin ([7dfe395](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/7dfe39515bd179ff225b70535304ee0568fedf78))
- add InlineFilter rtl support ([8ac14cd](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/8ac14cdfc8964c7a0932e67d86368bcb0567c2a7))
- add rtl support to AppLayout ([376fe3a](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/376fe3a31591fd5e91660a80f349ecb0453db8b7))
- add ScheduleFilters search rtl support ([ae47803](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/ae478037c1f8edd23d019dedc561953e0a52e385))
- fix ApiError message at 0 seconds ([a85755a](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/a85755a5576ee2671c624876ede51ef88379b53b))
- fix ScheduleView to pass schedule to ScheduleFilters ([0d28a08](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/0d28a0802cad19f90d53013a4f27b9af30f23b97))
- remove package "sideEffects" ([09b8b7c](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/09b8b7c133699848bbc383aefaad250c26396b2d))

- update ScheduleFilter to take a FullSchedule ([f225c71](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/f225c71fbed03f7df840e9b2717b2c44ee3fcb6f))
