import {
  click,
  currentURL,
  currentPath,
  visit
} from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | test helpers', function(hooks) {
  setupApplicationTest(hooks);

  test('usage', async function(assert) {
    setupBrowserNavigationButtons();

    await visit('/');
    await click('a.foo');
    assert.equal(currentURL(), '/foo');
    assert.equal(currentPath(), 'foo');

    await click('a');
    assert.equal(currentURL(), '/bar');
    assert.equal(currentPath(), 'bar');

    backButton();
    assert.equal(currentURL(), '/foo', 'url after back button');
    assert.equal(currentPath(), 'foo', 'path after back button');

    backButton();
    assert.equal(currentURL(), '/', 'url after another back button');
    assert.equal(currentPath(), 'index', 'path after another back button');

    forwardButton();
    assert.equal(currentURL(), '/foo', 'url after forward button');
    assert.equal(currentPath(), 'foo', 'path after forward button');

    forwardButton();
    assert.equal(currentURL(), '/bar', 'url after another forward button');
    assert.equal(currentPath(), 'bar', 'path after another forward button');
  });

  test('handles route substates', async function(assert) {
    setupBrowserNavigationButtons();

    await visit('/');
    await click('a.uses-loading-substate');
    assert.equal(currentPath(), 'uses-loading-substate');

    backButton();
    assert.equal(currentPath(), 'index');
  });
});
