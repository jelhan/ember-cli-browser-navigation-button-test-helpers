import { addObserver } from '@ember/object/observers';
import Service from '@ember/service';
import { assert } from '@ember/debug';
import { getContext, settled } from '@ember/test-helpers';

const backButton = async function() {
  let { owner } = getContext();
  const history = owner.lookup('service:history');
  assert('setupBrowserNavigationButtons must be called before `backButton` could be used.', history);
  await history.goBack();
  await settled();
  return;
};

const forwardButton = async function() {
  let { owner } = getContext();
  const history = owner.lookup('service:history');
  assert('setupBrowserNavigationButtons must be called before `forwardButton` could be used.', history);
  await history.goForward();
  await settled();
  return;
};

const setupBrowserNavigationButtons = function() {
  let { owner } = getContext();
  const router = owner.lookup('service:router');
  const history = Service.create({
    addHistory() {
      const currentURL = this.router.get('currentURL');
      this.history.push(currentURL);
    },
    history: [],
    forward: [],
    goBack() {
      // last element in router.history is current page
      // remove it from history and apply to forward list
      const currentURL = this.history.pop();
      this.forward.push(currentURL);
      // get the page before is our target
      // remove that one also, since it's readded by transition
      const previousURL = this.history.pop();
      assert('There were no URLs in the browser history. Make sure a transition ocurred after `setupBrowserNavigationButtons` was called.', previousURL);
      return this.router.transitionTo(previousURL);
    },
    goForward() {
      const nextURL = this.forward.pop();
      assert('backButton must be used at least once before forwardButton can be used.', nextURL);
      return this.router.transitionTo(nextURL);
    },
    router
  });
  owner.register('service:history', history, { instantiate: false });
  addObserver(router, 'currentURL', history, 'addHistory');
};

export {
  backButton,
  forwardButton,
  setupBrowserNavigationButtons,
}
