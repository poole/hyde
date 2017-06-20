// Copyright (c) 2017 Florian Klampfer
// Licensed under MIT

/*
eslint-disable
class-methods-use-this
*/

import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';

export default class Flip {
  static create(type, ...args) {
    return Flip.types[type] != null ?
      new Flip.types[type](...args) :
      new Flip(...args);
  }

  constructor({ animationMain, duration }) {
    this.animationMain = animationMain;
    this.duration = duration;
  }

  start() {
    // HACK: use proper cleanup instead
    this.animationMain.style.opacity = 0;
    this.animationMain.style.willChange = '';

    return Observable::empty();
  }

  ready() {
    return Observable::empty();
  }
}

Flip.types = {};
