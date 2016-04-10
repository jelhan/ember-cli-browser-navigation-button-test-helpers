# ember-cli-browser-navigation-button-test-helper

Test helper to simulate browsers back and forward buttons in acceptance tests.

## Installation
* `ember-install ember-cli-back-button-test-helper`
* Add `import './browser-navigation-buttons'` to `tests/helpers/start-app.js`.
* Add `backButton`, `forwardButton` and `setupBrowserNavigationButtons` as predef in `tests/.jshintrc`.

## Quickstart

* Call `setupBrowserNavigationButtons();` at the start of your acceptance test.
* Simulate back button clicks by `backButton();`.
* Simpute forward button clicks by `forwardButton();`.

There is an usage example [https://github.com/jelhan/ember-cli-browser-navigation-button-test-helpers/blob/master/tests/acceptance/browser-navigation-buttons-test.js](in this acceptance test).

## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).
