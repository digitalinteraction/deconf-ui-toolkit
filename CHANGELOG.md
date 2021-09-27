# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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
