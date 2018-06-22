import { addObserver } from '@ember/object/observers';
import Service from '@ember/service';
import { assert } from '@ember/debug';
import { getContext } from '@ember/test-helpers';

const pathIsSubstate = function(path) {
  return /(^|\.|-)(loading|error)$/.test(path);
};

const backButton = async function() {
  let { owner } = getContext();
  const history = owner.lookup('service:history');
  assert('setupBrowserNavigationButtons must be called before `backButton` could be used.', history);
  await history.goBack();
  return;
};

const forwardButton = async function() {
  let { owner } = getContext();
  const history = owner.lookup('service:history');
  assert('setupBrowserNavigationButtons must be called before `forwardButton` could be used.', history);
  await history.goForward();
  return;
};

const setupBrowserNavigationButtons = function() {
  let { owner } = getContext();
  const router = owner.lookup('router:main');
  const history = Service.create({
    addHistory() {
      const currentPath = this.router.get('currentPath');
      if (!pathIsSubstate(currentPath)) {
        this.history.push(currentPath);
      }
    },
    history: [],
    forward: [],
    goBack() {
      // last element in router.history is current page
      // remove it from history and apply to forward list
      this.forward.push(
        this.history.pop()
      );
      // get the page before is our target
      // remove that one also, since it's readded by transition
      const lastPage = this.history.pop();
      assert('A transition must be recognized after `setupBrowserNavigationButtons` was called.', lastPage);
      return this.router.transitionTo(lastPage);
    },
    goForward() {
      const nextPage = this.forward.pop();
      assert('backButton must be used atleast one time before forwardButton could be used..', nextPage);
      return this.router.transitionTo(nextPage);
    },
    router
  });
  owner.register('service:history', history, { instantiate: false });
  addObserver(router, 'currentPath', history, 'addHistory');
};

export {
  backButton,
  forwardButton,
  setupBrowserNavigationButtons,
}
