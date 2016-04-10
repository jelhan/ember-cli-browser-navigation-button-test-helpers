import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | test helpers');

test('usage', function(assert) {
  setupBrowserNavigationButtons();

  visit('/');
  click('a');
  andThen(() => {
    assert.equal(currentURL(), '/foo');
    assert.equal(currentPath(), 'foo');

    click('a');
    andThen(() => {
      assert.equal(currentURL(), '/bar');
      assert.equal(currentPath(), 'bar');

      backButton();
      andThen(() => {
        assert.equal(currentURL(), '/foo', 'url after back button');
        assert.equal(currentPath(), 'foo', 'path after back button');

        backButton();
        andThen(() => {
          assert.equal(currentURL(), '/', 'url after another back button');
          assert.equal(currentPath(), 'index', 'path after another back button');

          forwardButton();
          andThen(() => {
            assert.equal(currentURL(), '/foo', 'url after forward button');
            assert.equal(currentPath(), 'foo', 'path after forward button');

            forwardButton();
            andThen(() => {
              assert.equal(currentURL(), '/bar', 'url after another forward button');
              assert.equal(currentPath(), 'bar', 'path after another forward button');
            });
          });
        });
      });
    });
  });
});
