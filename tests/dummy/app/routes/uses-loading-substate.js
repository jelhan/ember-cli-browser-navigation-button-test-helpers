import Route from '@ember/routing/route';
import { next } from '@ember/runloop';
import { Promise } from 'rsvp';

export default class UsesLoadingSubstateRoute extends Route {
  model() {
    return new Promise((resolve) => {
      next(resolve);
    });
  }
}
