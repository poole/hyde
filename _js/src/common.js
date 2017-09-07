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

export function show() {
  this.style.display = 'block';
  this.style.visibility = 'visible';
}

export function hide() {
  this.style.display = 'none';
  this.style.visibility = 'hidden';
}

export function unshow() {
  this.style.display = '';
  this.style.visibility = '';
}

export const unhide = unshow;

export const matches =
  Element.prototype.matches ||
  Element.prototype.matchesSelector ||
  Element.prototype.msMatchesSelector ||
  Element.prototype.mozMatchesSelector ||
  Element.prototype.webkitMatchesSelector ||
  Element.prototype.oMatchesSelector;

export function empty() {
  while (this.firstChild) this.removeChild(this.firstChild);
}

export function animate(el, keyframes, options) {
  return Observable.create((observer) => {
    const anim = el.animate(keyframes, options);

    anim.addEventListener('finish', (e) => {
      observer.next(e);
      requestAnimationFrame(::observer.complete);
    });

    return () => {
      if (anim.playState !== 'finished') anim.cancel();
    };
  });
}

export function isSafari() {
  if (!isSafari.hasResult) {
    const ua = navigator.userAgent.toLowerCase();
    isSafari.result = ua.indexOf('safari') > 0 && ua.indexOf('chrome') < 0;
    isSafari.hasResult = true;
  }
  return isSafari.result;
}

export function isMobileSafari() {
  if (!isMobileSafari.hasResult) {
    const ua = navigator.userAgent.toLowerCase();
    isMobileSafari.result = isSafari() && ua.indexOf('mobile') > 0;
    isMobileSafari.hasResult = true;
  }
  return isMobileSafari.result;
}
