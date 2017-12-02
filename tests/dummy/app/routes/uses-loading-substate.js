import Route from '@ember/routing/route';
import { next } from '@ember/runloop';
import { Promise } from 'rsvp';

export default Route.extend({
  model() {
    return new Promise((resolve) => {
      next(resolve);
    });
  }
});
