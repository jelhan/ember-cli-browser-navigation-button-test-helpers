# ember-cli-browser-navigation-button-test-helper
[![Build Status](https://travis-ci.org/jelhan/ember-cli-browser-navigation-button-test-helpers.svg?branch=master)](https://travis-ci.org/jelhan/ember-cli-browser-navigation-button-test-helpers)

Test helper to simulate browsers back and forward buttons in acceptance tests.

Compatibility
------------------------------------------------------------------------------

* Ember.js v3.4 or above
* Ember CLI v2.13 or above
* Node.js v12 or above


Installation
------------------------------------------------------------------------------

```
ember install ember-cli-browser-navigation-button-test-helper
```

Usage
------------------------------------------------------------------------------

This addon exportes three test helpers: `setupBrowserNavigationButtons()`, `backButton()` and `forwardButton()` from `ember-cli-browser-navigation-button-test-helper/test-support`. `setupBrowserNavigationButtons` should be called at the very beginning of every acceptance test which should use the later ones. It registers a service to manage history. The other two simulates clicks on browsers back and forward buttons.

There is an usage example [in this acceptance test](https://github.com/jelhan/ember-cli-browser-navigation-button-test-helpers/blob/master/tests/acceptance/browser-navigation-buttons-test.js).

Known limitations
------------------------------------------------------------------------------

Support for old-style acceptance tests (before RFC #232 and #268) was dropped in `v0.1.0`. You could use `v0.0.5` if you need to support them, but this one does not support Ember 3.x.


Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
