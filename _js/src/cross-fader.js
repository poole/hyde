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

import 'core-js/fn/array/find';

import Color from 'color';

import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { of } from 'rxjs/observable/of';

import { _finally as cleanup } from 'rxjs/operator/finally';
import { take } from 'rxjs/operator/take';
import { map } from 'rxjs/operator/map';

import elemDataset from 'elem-dataset';

import { animate } from './common';

const { find } = Array.prototype;

const BORDER_COLOR_FADE = 0.8;

function updateStyle({ color = '#00f' } = {}) {
  if (this.rules) {
    try {
      const c = Color(color);
      const active = c.darken(0.1);

      // .content a
      this.rules[0].style.color = color;
      this.rules[0].style.borderColor = c.fade(BORDER_COLOR_FADE).string();

      // .content a:hover
      this.rules[1].style.borderColor = color;

      // :focus
      this.rules[2].style.outlineColor = color;

       // .btn-primary
      this.rules[3].style.backgroundColor = color;
      this.rules[3].style.borderColor = color;

       // .btn-primary:focus
      this.rules[4].style.boxShadow = `0 0 0 3px ${c.fade(0.5)}`;

      // .btn-primary:hover
      this.rules[5].style.backgroundColor = active;
      this.rules[5].style.borderColor = active;

      // .btn-primary:disabled
      this.rules[6].style.backgroundColor = color;
      this.rules[6].style.borderColor = color;

       // .btn-primary:active
      this.rules[7].style.backgroundColor = active;
      this.rules[7].style.borderColor = active;

      // ::selection or ::-moz-selection (assuming it is last in the list)
      this.rules[this.rules.length - 1].style.backgroundColor = color;
    } catch (e) { console.error(e); }
  }
}

function pseudoHash({ color, image, background, overlay }) {
  return `${color}${image || background}${overlay ? 'overlay' : ''}`;
}

function getImage$({ image }) {
  if (!image || image === '' || image === 'none' || image === this.prevImage) {
    return Observable::of({});
  }

  const imgObj = new Image();

  const image$ = Observable::fromEvent(imgObj, 'load')
    ::take(1)
    ::cleanup(() => { imgObj.src = ''; });

  imgObj.src = image;

  return image$;
}

export default class CrossFader {
  constructor(fadeDuration) {
    const main = document.getElementById('_main');
    const pageStyle = document.getElementById('_pageStyle');
    const styleSheet = document.styleSheets::find(ss => ss.ownerNode === pageStyle) || {};

    this.sidebar = document.getElementById('_sidebar');
    this.fadeDuration = fadeDuration;
    this.rules = styleSheet.cssRules || styleSheet.rules;
    this.prevHash = pseudoHash(elemDataset(main));
  }

  fetchImage({ content: [main] }) {
    const dataset = elemDataset(main);
    const { color, image, background, overlay } = dataset;

    // HACK: Using `dataset` here to store some intermediate data
    const hash = pseudoHash(dataset);
    if (hash === this.prevHash) return Observable::empty();
    // dataset.instant = type === 'pop' && isSafari();

    return this::getImage$(dataset)
      ::map(() => {
        const div = document.createElement('div');
        div.classList.add('sidebar-bg');
        if (image !== 'none' && overlay === '') div.classList.add('sidebar-overlay');
        div.style.backgroundColor = color;
        if (background) div.style.background = background;
        else if (image !== '' && image !== 'none') div.style.backgroundImage = `url(${image})`;
        return [div, dataset, hash];
      });
  }

  fade([[prevDiv], [div, dataset, hash]]) {
    prevDiv.parentNode.insertBefore(div, prevDiv.nextElementSibling);

    this::updateStyle(dataset);

    // Only update the prev hash after we're actually in the fade stage
    this.prevHash = hash;

    return animate(div, [
      { opacity: 0 },
      { opacity: 1 },
    ], {
      duration: this.fadeDuration,
    })
    ::cleanup(() => prevDiv.parentNode.removeChild(prevDiv));
  }
}
