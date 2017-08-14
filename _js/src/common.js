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

export function hasFeatures(features) {
  let acc = true;
  for (let i = 0; i < features.length; i += 1) {
    const feature = features[i];
    const hasFeature = window.Modernizr[feature];
    // if (!hasFeature) console.warn('Feature "' + feature + '" missing!');
    acc = acc && hasFeature;
  }
  return acc;
}

export function show(el) {
  el.style.display = 'block';
  el.style.visibility = 'visible';
}

export function hide(el) {
  el.style.display = 'none';
  el.style.visibility = 'hidden';
}

export function unshow(el) {
  el.style.display = '';
  el.style.visibility = '';
}

export const unhide = unshow;

export function matches(el, selector) {
  return (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector ||
    el.webkitMatchesSelector || el.oMatchesSelector).call(el, selector);
}

export function animate(el, keyframes, options) {
  return Observable.create((observer) => {
    const anim = el.animate(keyframes, options);

    anim.addEventListener('finish', (e) => {
      observer.next(e);
      observer.complete();
    });

    return () => {
      // if (anim.playState !== 'finished') anim.cancel();
    };
  });
}
