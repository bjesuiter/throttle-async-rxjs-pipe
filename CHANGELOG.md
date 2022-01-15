# Changelog for ThrottleAsyncRxjsPipe

## [1.2.0] - WIP

- update package-lock file to newest lockfile format version
- Switched to @pika/pack for building the library, which unlocks lot more formats for consuming the library:
  - dist-src (ES2020, ESM)

## [1.1.0] - 2020-04-13

- Updated Dependencies to fix dependency security issues
- Improved npm packaging for easier usage

### [1.0.0] - 2018-11-12

_Initial Release_

#### Features

- throttleAsync pipe which emits one event and then waits for `waitUntil$` observable emissions
