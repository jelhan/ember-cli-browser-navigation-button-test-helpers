import {
  registerAsyncHelper,
  registerHelper
} from '@ember/test';
import { addObserver } from '@ember/object/observers';
import Service from '@ember/service';
import { run } from '@ember/runloop';
import { assert } from '@ember/debug';

const pathIsSubstate = function(path) {
  return /(^|\.|-)(loading|error)$/.test(path);
};

const backButton = function(app) {
  const history = app.__container__.lookup('service:history');
  assert('setupBrowserNavigationButtons must be called before `backButton` could be used.', history);
  run(() => {
    history.goBack();
  });
};

const forwardButton = function(app) {
  const history = app.__container__.lookup('service:history');
  assert('setupBrowserNavigationButtons must be called before `forwardButton` could be used.', history);
  run(() => {
    history.goForward();
  });
};

const setupBrowserNavigationButtons = function(app) {
  const router = app.__container__.lookup('router:main');
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
      this.router.transitionTo(nextPage);
    },
    router
  });
  app.register('service:history', history, { instantiate: false });
  addObserver(router, 'currentPath', history, 'addHistory');
};

export default function() {
  registerAsyncHelper('backButton', backButton);
  registerAsyncHelper('forwardButton', forwardButton);
  registerHelper('setupBrowserNavigationButtons', setupBrowserNavigationButtons);
}
