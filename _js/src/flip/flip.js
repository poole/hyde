/*
eslint-disable
class-methods-use-this
*/

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/empty';

export default class Flip {
  static create(type, ...args) {
    return Flip.types[type] != null ?
      new Flip.types[type](...args) :
      new Flip(...args);
  }

  constructor(shadowMain) {
    this.shadowMain = shadowMain;
  }

  start() {
    return Observable.empty();
  }

  ready() {
    return Observable.empty();
  }

  after() {
    return null;
  }
}

Flip.types = {};
