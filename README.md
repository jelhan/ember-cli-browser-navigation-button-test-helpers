# ember-cli-browser-navigation-button-test-helper

Test helper to simulate browser's back and forward buttons in acceptance tests
of Ember applications.

Compatibility
------------------------------------------------------------------------------

* Ember.js v3.20 or above
* Ember CLI v3.20 or above
* Node.js v12 or above

Installation
------------------------------------------------------------------------------

```
ember install ember-cli-browser-navigation-button-test-helper
```

Usage
------------------------------------------------------------------------------

This addon exports three test helpers from `ember-cli-browser-navigation-button-test-helper/test-support`:

- `setupBrowserNavigationButtons`,
- `backButton` and
- `forwardButton`.

`setupBrowserNavigationButtons` must be called in every acceptance test which
uses `backButton` and `forwardButton` _before_ `visit()`. It registers a service
to track and manage the history.

`backbutton` and `forwardButton` simulates the browser's back and forward
buttons by firing a transition using `RouterService.transitionTo()`.

Please find an usage example [in this acceptance test](https://github.com/jelhan/ember-cli-browser-navigation-button-test-helpers/blob/master/tests/acceptance/browser-navigation-buttons-test.js).


Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
