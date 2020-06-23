// Copyright (c) 2019 Florian Klampfer <https://qwtel.com/>
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

import { default as Color } from 'color';
import { default as elemDataset } from 'elem-dataset';

import { empty, of } from 'rxjs';
import { catchError, finalize, map, switchMap } from 'rxjs/operators';

import { animate, fetchRx } from './common';

// Given a dataset, generate some string we can use the check if anything has changed...
const pseudoHash = ({ background, color, image, overlay }) =>
  `${color}${image || background}${overlay === '' ? 'overlay' : ''}`;

// Consider a URL external if either the protocol, hostname or port is different.
function isExternal({ protocol, host }, location = window.location) {
  return protocol !== location.protocol || host !== location.host;
}

const objectURLs = new WeakMap();

export class CrossFader {
  constructor(fadeDuration) {
    const main = document.getElementById('_main');
    const styleSheet =
      Array.from(document.styleSheets).find((s) => s.ownerNode && s.ownerNode.id === '_pageStyle') || {};

    this.sidebar = document.getElementById('_sidebar');
    this.fadeDuration = fadeDuration;
    this.rules = styleSheet.cssRules || styleSheet.rules;
    this.prevHash = pseudoHash(elemDataset(main));

    this.themeColorEl = document.querySelector('meta[name="theme-color"]');
  }

  fetchImage2({ background, image }) {
    if (background || !image || image === '' || image === 'none') {
      return of(null);
    }

    const url = new URL(image, window.location.origin);

    return fetchRx(url.href, {
      method: 'GET',
      headers: { Accept: 'image/*' },
      ...(isExternal(url) ? { mode: 'cors' } : {}),
    }).pipe(
      switchMap((r) => r.blob()),
      map((blob) => URL.createObjectURL(blob)),
      catchError(() => of(image)),
    );
  }

  fetchImage(main) {
    const dataset = elemDataset(main);
    const { background, color, image, overlay } = dataset;

    // HACK: Using `dataset` here to store some intermediate data
    const hash = pseudoHash(dataset);
    if (hash === this.prevHash) return empty();

    return this.fetchImage2(dataset).pipe(
      map((objectURL) => {
        const div = document.createElement('div');
        div.classList.add('sidebar-bg');

        // Set overlay
        if (image !== 'none' && overlay === '') {
          div.classList.add('sidebar-overlay');
        }

        // Set background
        if (background) {
          div.style.background = background;
        } else {
          div.style.backgroundColor = color;
          if (objectURL) {
            div.style.backgroundImage = `url(${objectURL})`;
            objectURLs.set(div, objectURL); // HACK: Store objectURL on DOM node for later revocation
          }
        }

        return [div, dataset, hash];
      }),
    );
  }

  updateStyle({ color = '#4fb1ba', themeColor = '#193747' } = {}) {
    if (this.themeColorEl) {
      window.setTimeout(() => (this.themeColorEl.content = themeColor), 250);
    }

    if (this.rules) {
      try {
        const { style } = document.documentElement;

        const accentColor = Color(color);
        const accentColorFaded = accentColor.fade(0.5);
        const accentColorDarkened = accentColor.darken(0.075);

        style.setProperty("--accent-color", color);
        style.setProperty('--accent-color-faded', accentColorFaded.toString());
        style.setProperty('--accent-color-darkened', accentColorDarkened.toString());
        style.setProperty("--theme-color", themeColor);
      } catch (e) {
        if (process.env.DEBUG) console.error(e);
      }
    }
  }

  fade([prevDiv], [div, dataset, hash]) {
    prevDiv.parentNode.insertBefore(div, prevDiv.nextElementSibling);

    this.updateStyle(dataset);

    // Only update the prev hash after we're actually in the fade stage
    this.prevHash = hash;

    return animate(div, [{ opacity: 0 }, { opacity: 1 }], {
      duration: this.fadeDuration,
      easing: 'ease',
    }).pipe(
      finalize(() => {
        if (objectURLs.has(prevDiv)) URL.revokeObjectURL(objectURLs.get(prevDiv));
        prevDiv.parentNode.removeChild(prevDiv);
      }),
    );
  }
}
