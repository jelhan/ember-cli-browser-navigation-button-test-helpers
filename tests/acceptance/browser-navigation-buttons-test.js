import {
  click,
  currentURL,
  currentRouteName,
  visit,
} from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import {
  setupBrowserNavigationButtons,
  backButton,
  forwardButton,
} from 'ember-cli-browser-navigation-button-test-helper/test-support';

module('Acceptance | test helpers', function (hooks) {
  setupApplicationTest(hooks);

  test('usage', async function (assert) {
    setupBrowserNavigationButtons();

    await visit('/');
    await click('a.foo');
    assert.equal(currentURL(), '/foo');
    assert.equal(currentRouteName(), 'foo');

    await click('a');
    assert.equal(currentURL(), '/bar');
    assert.equal(currentRouteName(), 'bar');

    await backButton();
    assert.equal(currentURL(), '/foo', 'url after back button');
    assert.equal(currentRouteName(), 'foo', 'path after back button');

    await backButton();
    assert.equal(currentURL(), '/', 'url after another back button');
    assert.equal(currentRouteName(), 'index', 'path after another back button');

    await forwardButton();
    assert.equal(currentURL(), '/foo', 'url after forward button');
    assert.equal(currentRouteName(), 'foo', 'path after forward button');

    await forwardButton();
    assert.equal(currentURL(), '/bar', 'url after another forward button');
    assert.equal(
      currentRouteName(),
      'bar',
      'path after another forward button'
    );
  });

  test('handles route substates', async function (assert) {
    setupBrowserNavigationButtons();

    await visit('/');
    await click('a.uses-loading-substate');
    assert.equal(currentRouteName(), 'uses-loading-substate');

    await backButton();
    assert.equal(currentRouteName(), 'index');
  });

  test('handles dynamic segments', async function (assert) {
    setupBrowserNavigationButtons();

    await visit('/');
    await click('a.uses-dynamic-segment');
    assert.equal(currentURL(), '/dynamic/item-id');
    assert.equal(currentRouteName(), 'dynamic');

    await click('a.uses-id-only');
    assert.equal(currentURL(), '/dynamic/another-item-id');
    assert.equal(currentRouteName(), 'dynamic');

    await backButton();
    assert.equal(currentURL(), '/dynamic/item-id');
    assert.equal(currentRouteName(), 'dynamic');

    await forwardButton();
    assert.equal(currentURL(), '/dynamic/another-item-id');
    assert.equal(currentRouteName(), 'dynamic');
  });

  test('handle query string parameters', async function (assert) {
    setupBrowserNavigationButtons();

    await visit('/');
    await click('a.uses-query-params');
    assert.equal(currentURL(), '/dynamic/yet-another-item-id?a=1&b=2&c=3');
    assert.equal(currentRouteName(), 'dynamic');

    await click('a.uses-id-and-query-params');
    assert.equal(currentURL(), '/dynamic/a-different-item-id?a=9&b=8&c=7');
    assert.equal(currentRouteName(), 'dynamic');

    await click('a.uses-id-only');
    assert.equal(currentURL(), '/dynamic/another-item-id');
    assert.equal(currentRouteName(), 'dynamic');

    await backButton();
    assert.equal(currentURL(), '/dynamic/a-different-item-id?a=9&b=8&c=7');
    assert.equal(currentRouteName(), 'dynamic');

    await backButton();
    assert.equal(currentURL(), '/dynamic/yet-another-item-id?a=1&b=2&c=3');
    assert.equal(currentRouteName(), 'dynamic');

    await backButton();
    assert.equal(currentURL(), '/');
    assert.equal(currentRouteName(), 'index');
  });
});
