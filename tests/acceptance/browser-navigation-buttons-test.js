import {
  click,
  currentURL,
  currentRouteName,
  visit
} from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { setupBrowserNavigationButtons, backButton, forwardButton } from 'ember-cli-browser-navigation-button-test-helper/test-support';

module('Acceptance | test helpers', function(hooks) {
  setupApplicationTest(hooks);

  test('usage', async function(assert) {
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
    assert.equal(currentRouteName(), 'bar', 'path after another forward button');
  });

  test('handles route substates', async function(assert) {
    setupBrowserNavigationButtons();

    await visit('/');
    await click('a.uses-loading-substate');
    assert.equal(currentRouteName(), 'uses-loading-substate');

    await backButton();
    assert.equal(currentRouteName(), 'index');
  });
});
