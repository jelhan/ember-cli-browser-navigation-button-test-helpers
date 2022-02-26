import Controller from '@ember/controller';

export default class DynamicController extends Controller {
  queryParams = ['a', 'b', 'c'];
}
