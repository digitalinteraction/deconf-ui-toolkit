# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [2.5.0](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.4.0...v2.5.0) (2021-11-18)


### Features

* add $sessionView-titleFamily to SessionView to customise the title font ([7379223](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/7379223fdd87d2f0d53abb77e19aded32374143a)), closes [#30](https://github.com/digitalinteraction/deconf-ui-toolkit/issues/30)
* add $sideTabs-activeBackground to SideTabs to customise the background when a tab is active ([87055eb](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/87055ebb7304467358bdf83445cef410dbf3886f)), closes [#8](https://github.com/digitalinteraction/deconf-ui-toolkit/issues/8)
* add $whatsOn-titleFamily to WhatsOnView to customise the title's font ([0c1c2ef](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/0c1c2efd3428cc9a2884d41f2351656aa6588bd7)), closes [#31](https://github.com/digitalinteraction/deconf-ui-toolkit/issues/31)
* add support for google meet links ([e7e2a3b](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/e7e2a3b09708df086a70b9dfb18e0d1040941aa4)), closes [#34](https://github.com/digitalinteraction/deconf-ui-toolkit/issues/34)
* add support for zoom meeting registration links ([cc44507](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/cc44507123a17972627f5c76fbf66fee007341dc)), closes [#35](https://github.com/digitalinteraction/deconf-ui-toolkit/issues/35)
* add variables to customize ProfileView's title & headings ([641871b](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/641871b145ddaf44633e4fb2cd8fc115008c2129)), closes [#25](https://github.com/digitalinteraction/deconf-ui-toolkit/issues/25)
* **content:** add content module and migrate ApiContent from PlanetRed ([11649c3](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/11649c372a680ced602201c30a15afd9a1a05bfb)), closes [#41](https://github.com/digitalinteraction/deconf-ui-toolkit/issues/41)
* **core:** add FullScreenDialog component ([e69d1f4](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/e69d1f4f16fd581a91046a68910591ea148ce3ab)), closes [#39](https://github.com/digitalinteraction/deconf-ui-toolkit/issues/39)
* **core:** add PageFooter component ([0c82f14](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/0c82f149575e1c393038bb5743f2ab1af33a9359)), closes [#44](https://github.com/digitalinteraction/deconf-ui-toolkit/issues/44)
* **dev:** add optional prop to set which controls to show ([3431829](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/3431829811118de667aec83c307f6558a494ddff)), closes [#49](https://github.com/digitalinteraction/deconf-ui-toolkit/issues/49)
* export SessionAndSlot interface for FeaturedSessions use ([715a041](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/715a04176f67f93227df3b89342f9fea7b29f56f)), closes [#9](https://github.com/digitalinteraction/deconf-ui-toolkit/issues/9)
* **lib:** add option to localiseFromObject to customise fallbacks ([3f86cdd](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/3f86cdd8e81290f101b0e812c781f1ca518bd8a3)), closes [#17](https://github.com/digitalinteraction/deconf-ui-toolkit/issues/17)
* **store:** add userAttendance mutation to api to convert from the API ([fb8886b](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/fb8886bca55fdb01feff07643c527eab6e9bafaf))


### Bug Fixes

* add RTL support to MiniSession's button ([ec3e130](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/ec3e130a67e89cbe24cc4580c3ea647b750989e1)), closes [#10](https://github.com/digitalinteraction/deconf-ui-toolkit/issues/10)
* fix audio-receiver typo ([b3a0e83](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/b3a0e8394c0edb39850d638208d0cb67e6fd6b48)), closes [#48](https://github.com/digitalinteraction/deconf-ui-toolkit/issues/48)
* fix AudioBroadcaster bugs and add example processor ([cf9d27a](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/cf9d27a9032ee43eacdc502b866b91f1addcdee2)), closes [#22](https://github.com/digitalinteraction/deconf-ui-toolkit/issues/22) [#21](https://github.com/digitalinteraction/deconf-ui-toolkit/issues/21)
* fix button's icon in RTL ([317358a](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/317358acf50c24be5c7e07a22022688c6050a379)), closes [#50](https://github.com/digitalinteraction/deconf-ui-toolkit/issues/50)
* fix insecure hashing in log-in metric, to be re-added in the future. ([23d76ff](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/23d76ff2ee4a5c46a701d4ffe001e986a226d5f5)), closes [#33](https://github.com/digitalinteraction/deconf-ui-toolkit/issues/33)
* mark SessionLayout as deprecated ([f369d02](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/f369d02ca63787e66ffbf8a346c06be6f95600f2)), closes [#15](https://github.com/digitalinteraction/deconf-ui-toolkit/issues/15)

## [2.4.0](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.3.3...v2.4.0) (2021-10-12)


### Features

* add click metric to primary embed ([1cde122](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/1cde12238e134631113b5bce11710f65b074f242))

### [2.3.3](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.3.2...v2.3.3) (2021-10-11)


### Bug Fixes

* fix settings.endDate being pushed forwards ([196d20e](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/196d20e7a56bbab97533555befa274f953755aff))

### [2.3.2](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.3.1...v2.3.2) (2021-10-11)


### Bug Fixes

* **LanguageWarning:** make locales uppercase ([7e57124](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/7e57124213d235daeacfb8fa3aeb7c5c204354e2))
* **SessionTile:** fix localisation to try the host language ([b18c86d](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/b18c86d56d2865d795c1dbf26576cfaa59320517))
* **SessionView:** improve localisation logic with respect to session language ([cdbd70c](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/cdbd70c30116ec0bd08bcf4b1ca2c153006c2fa9))

### [2.3.1](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.3.0...v2.3.1) (2021-10-11)


### Bug Fixes

* fix new vimeo embed iframes ([d8a7f66](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/d8a7f669339610ee6966c390325c20f22e5777df))

## [2.3.0](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.2.1...v2.3.0) (2021-10-11)


### Features

* add new vimeo formats ([9a709ab](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/9a709ab8ec183171029c1e5bb3a7154b40907207))

### [2.2.1](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.2.0...v2.2.1) (2021-10-08)


### Bug Fixes

* **schedule:** fix all/user toggle not localising ([4bc50fe](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/4bc50fecd3ed238ddbdb15997ee70b5657cf934a))

## [2.2.0](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.1.2...v2.2.0) (2021-10-07)


### Features

* add language filter to ScheduleFilters ([e1b3b85](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/e1b3b85348a8a898ccc4bb1b36c88bc48ac50f6a))
* show an organisation in SessionAttributes ([2c94672](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/2c94672ac45c280754b5b33185e961c5491bca5a))
* show organisation in SessionView and SessionTile ([95090b4](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/95090b43fef4be7e04c5ed416755f4ca0dbb23f8))

### [2.1.2](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.1.1...v2.1.2) (2021-10-06)


### Bug Fixes

* show session interested when not capped ([7252181](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/72521816b0fd149a40f1de6410937ae26abb6134))

### [2.1.1](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.1.0...v2.1.1) (2021-10-05)


### Bug Fixes

* add option to hide FeaturedSession's buttons ([d7a178b](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/d7a178b142b424c76c7bf224c710f4d8655155ae))

## [2.1.0](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.0.2...v2.1.0) (2021-10-05)


### Features

* **session:** show interest section when not capped ([845c6ae](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/845c6ae5b12dcac5677dfb30001d268b7dc45f9a))


### Bug Fixes

* **session:** show 'please log in' message when logged out ([201bd02](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/201bd02cbce349fc3a61a0110751fb79ce9a7007))

### [2.0.2](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.0.1...v2.0.2) (2021-10-05)


### Bug Fixes

* **nav:** show the active route on mobile ([33de4da](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/33de4daff6c900b4ca984c95e30c3bb06c4b440a))

### [2.0.1](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.0.0...v2.0.1) (2021-10-04)


### Bug Fixes

* secondary links now show on sessions when there are no "other" links ([407d3db](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/407d3db8e5c3a93609f9d741cbc1195674ab6f34))

## [2.0.0](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.0.0-beta.20...v2.0.0) (2021-10-04)


### ⚠ BREAKING CHANGES

* remove unused assets

### Features

* embed vimeo-chats alongside sessions. Deprecate SessionEmbed for PrimaryEmbed ([c40a7b7](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/c40a7b7aae456e9c0ebf5748778d8305c6e4d7f4))


### Bug Fixes

* remove unused assets ([c441825](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/c44182589d83385612d3c006c4b75a5958482452))

## [2.0.0-beta.20](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.0.0-beta.19...v2.0.0-beta.20) (2021-09-29)


### Features

* **session-view:** add language-warning ([45f9a21](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/45f9a21ef03789f3a485605f1c3df51442b492df))


### Bug Fixes

* **box-content:** reduce padding on mobile ([4b945cf](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/4b945cf46896a2896a90e0cc9ba3eb8205c49009))
* **box-content:** round corners on tablet as well desktop ([319a29a](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/319a29ac86cbf58bd155ee5277c2888780e7a039))
* **schedule-view:** add padding between infoText and filters ([13a8be6](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/13a8be6fb3f009f4ef06ad2f2c1022fcd83e1101))
* **util-layout:** stop buttons overflowing on mobile ([1da03af](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/1da03afc9487ea9a2bcf1082524db1f36defa602))
* **whats-on:** normalise infoText spacing with ScheduleView ([6388f1e](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/6388f1ec693a41b5be52c4247ba0fb62778d5cec))

## [2.0.0-beta.19](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.0.0-beta.18...v2.0.0-beta.19) (2021-09-28)


### Features

* add new slots to SessionView and add language to link's name ([4ba0ac3](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/4ba0ac325d001ac87a6a8ffcc79136ca3a3f1d74))


### Bug Fixes

* createStateMapper generics to return a subset of state ([b5a9638](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/b5a9638addc1b1bc5250379bf49b1cf5dd095ab8))
* fix duplicate links and improve multi-lingual links order ([5ca6b1b](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/5ca6b1b65773bd7bad90d3971ac9fa0757e9c2ad))
* **interpret:** fix self mutation ([8e2670b](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/8e2670b3acabe726189559bdc0deb986484e763b))
* short-circuit countdown when negative to always return 0s ([341a812](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/341a812b99d85d25614fa3637623adfb7324ac2e))

## [2.0.0-beta.18](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.0.0-beta.17...v2.0.0-beta.18) (2021-09-27)


### Bug Fixes

* **interpret:** work on store ([fba9310](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/fba93100887c53f9f0eed48a1c09bc0487a62be5))
* show interpret-mode button if an admin ([d0e355c](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/d0e355c95e8d32a0678bd33a41ce099a26f25bf1))

## [2.0.0-beta.17](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.0.0-beta.16...v2.0.0-beta.17) (2021-09-27)


### Features

* add "width" prop to UtilLayout ([23d3b31](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/23d3b31b93eb17de22f3acdbb2af502c7346774e))


### Bug Fixes

* add NoResults to WhatsOnView ([017aac7](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/017aac704797705672c30637974b3110d76c8225))
* **session:** fix links not being reset after unattend ([b6dfe39](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/b6dfe39ff7a31faf1d84005c58b5a030b965e2c5))

## [2.0.0-beta.16](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.0.0-beta.15...v2.0.0-beta.16) (2021-09-22)


### Features

* **metrics:** organise metrics, ensure implementation and add more ([2142312](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/2142312f85d0c36928c2de7b66ea00aeda26f9c0))


### Bug Fixes

* **SessionView:** fix links error ([e922bff](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/e922bffc65dea7ea9d7a4b16a83917845b029f7e))
* show loading when attend/unattend-ing a session ([8d3e475](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/8d3e475abebb978e68fd63f5231164e28467c010))

## [2.0.0-beta.15](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.0.0-beta.14...v2.0.0-beta.15) (2021-09-21)


### Bug Fixes

* fix SessionView not waiting for attend endpoints ([7415ea9](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/7415ea96ac3f875a750287cbe72d867f475ba640))

## [2.0.0-beta.14](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.0.0-beta.13...v2.0.0-beta.14) (2021-09-21)


### Features

* support multi-lingual links and upgrade deconf-shared ([48aef9b](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/48aef9bc214a20bdb6d686d56a4a10ee4674d07d))


### Bug Fixes

* fix countdown logic ([98a85d4](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/98a85d4f7764cc6d71d2d8987f58624e8a35dfd0))

## [2.0.0-beta.13](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.0.0-beta.12...v2.0.0-beta.13) (2021-09-21)


### Bug Fixes

* fix WhatsOnView to not show links ([dacef2f](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/dacef2f580222a451b41da8232201e40ae934e83))

## [2.0.0-beta.12](https://github.com/digitalinteraction/deconf-ui-toolkit/compare/v2.0.0-beta.11...v2.0.0-beta.12) (2021-09-21)


### ⚠ BREAKING CHANGES

* add all/user toggle to ScheduleView using new required prop userSessions.
* update ScheduleFilter to take a FullSchedule

### Features

* add "days" support for countdowns ([1867cf5](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/1867cf54a3cd759a338ec57c39600ac0d460353b))
* add all/user toggle to ScheduleView using new required prop userSessions. ([0ab5497](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/0ab54973bb407b9607d2a844e4293da48ea077dd))
* add infoText and doneText slots to LoginView and expose initialState for dev ([2a4cd9e](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/2a4cd9e2d0d521d8ed198c4fcc92b79c03890b9c))
* add infoText slot to ScheduleView ([125c6a3](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/125c6a36dc1b094794e0f813a9e1e4532783c3a4))
* add SegmentControl ([48b60b0](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/48b60b05eaaf6473fb104a91491ec4f3352eb796))
* improve DevControl ([f13a010](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/f13a01063438c95800384aa2db28f6e061f438f2))


### Bug Fixes

* add default interval to TemporalPlugin ([7dfe395](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/7dfe39515bd179ff225b70535304ee0568fedf78))
* add InlineFilter rtl support ([8ac14cd](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/8ac14cdfc8964c7a0932e67d86368bcb0567c2a7))
* add rtl support to AppLayout ([376fe3a](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/376fe3a31591fd5e91660a80f349ecb0453db8b7))
* add ScheduleFilters search rtl support ([ae47803](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/ae478037c1f8edd23d019dedc561953e0a52e385))
* fix ApiError message at 0 seconds ([a85755a](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/a85755a5576ee2671c624876ede51ef88379b53b))
* fix ScheduleView to pass schedule to ScheduleFilters ([0d28a08](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/0d28a0802cad19f90d53013a4f27b9af30f23b97))
* remove package "sideEffects" ([09b8b7c](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/09b8b7c133699848bbc383aefaad250c26396b2d))


* update ScheduleFilter to take a FullSchedule ([f225c71](https://github.com/digitalinteraction/deconf-ui-toolkit/commit/f225c71fbed03f7df840e9b2717b2c44ee3fcb6f))
