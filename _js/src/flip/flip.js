// Copyright (c) 2017 Florian Klampfer <https://qwtel.com/>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

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
