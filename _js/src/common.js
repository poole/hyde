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

import { Observable, NEVER } from 'rxjs';
import { switchMap } from 'rxjs/operators';

const style = getComputedStyle(document.body);

export const BREAK_POINT_3 = `(min-width: ${style.getPropertyValue('--break-point-3')})`;
export const BREAK_POINT_DYNAMIC = `(min-width: ${style.getPropertyValue('--break-point-dynamic')})`;
export const CONTENT_WIDTH_5 = parseFloat(style.getPropertyValue('--content-width-5'));
export const CONTENT_MARGIN_5 = parseFloat(style.getPropertyValue('--content-margin-5'));
export const DRAWER_WIDTH = parseFloat(style.getPropertyValue('--sidebar-width'));
export const R_28 = parseFloat(style.getPropertyValue('--r28'));

// Check the user agent for Safari and iOS Safari, to give them some special treatment...
const ua = navigator.userAgent.toLowerCase();
export const isSafari = ua.indexOf('safari') > 0 && ua.indexOf('chrome') < 0;
export const isMobile = ua.indexOf('mobile') > 0;
export const isMobileSafari = isSafari && isMobile;
export const isUCBrowser = ua.indexOf('ucbrowser') > 0;
export const isFirefox = ua.indexOf('firefox') > 0;
export const isFirefoxIOS = ua.indexOf('fxios') > 0 && ua.indexOf('safari') > 0;

export const hasCSSOM = 'attributeStyleMap' in Element.prototype && 'CSS' in window && CSS.number;

export const webComponentsReady = new Promise(res => {
  if ('customElements' in window) res(true);
  else document.addEventListener('WebComponentsReady', res);
});

// FIXME: Replace with something more robust!?
export const stylesheetReady = new Promise(function checkCSS(res, rej, retries = 30) {
  if (getComputedStyle(document.querySelector('hy-drawer')).getPropertyValue('--hy-drawer-width')) res(true);
  else if (retries <= 0) rej(Error('Stylesheet not loaded within 10 seconds'));
  else setTimeout(() => checkCSS(res, rej, retries - 1), 1000 / 3);
});

export const once = (el, eventName) => new Promise(res => el.addEventListener(eventName, res, { once: true }));
export const timeout = t => new Promise(res => setTimeout(res, t));

// Takes an array of Modernizr feature tests and makes sure they all pass.
export function hasFeatures(features) {
  if (!window.Modernizr) return true;
  return [...features].every(feature => {
    const hasFeature = window.Modernizr[feature];
    if (!hasFeature && process.env.DEBUG) console.warn(`Feature '${feature}' missing!`);
    return hasFeature;
  });
}

// Some functions to hide and show content.
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

// Same as `el.innerHTML = ''`, but not quite so hacky.
export function empty() {
  while (this.firstChild) this.removeChild(this.firstChild);
}

// An observable wrapper for the WebAnimations API.
// Will return an observable that emits once when the animation finishes.
export function animate(el, keyframes, options) {
  return Observable.create(observer => {
    const anim = el.animate(keyframes, options);

    anim.addEventListener('finish', e =>
      requestAnimationFrame(() => {
        observer.next(e);
        requestAnimationFrame(() => observer.complete());
      }),
    );

    return () => {
      if (anim.playState !== 'finished') anim.cancel();
    };
  });
}

export function importTemplate(templateId) {
  const template = document.getElementById(templateId);
  return template && document.importNode(template.content, true);
}

export function getScrollHeight() {
  const h = document.documentElement;
  const b = document.body;
  const sh = 'scrollHeight';
  return h[sh] || b[sh];
}

export function getScrollLeft() {
  return window.pageXOffset || document.body.scrollLeft;
}

export function getScrollTop() {
  return window.pageYOffset || document.body.scrollTop;
}

export const body = document.body || document.documentElement;
export const rem = units => units * parseFloat(getComputedStyle(body).fontSize);
export const getViewWidth = () => window.innerWidth || body.clientWidth;

/**
 * @param {HTMLElement|HTMLElement[]} els
 * @param {IntersectionObserverInit} [options]
 * @returns {Observable<IntersectionObserverEntry[]>}
 */
export function createIntersectionObservable(els, options) {
  return Observable.create(obs => {
    const observer = new IntersectionObserver(xs => obs.next(xs), options);

    if (Array.isArray(els)) els.forEach(el => observer.observe(el));
    else observer.observe(els);

    return () => {
      if (Array.isArray(els)) els.forEach(el => observer.unobserve(el));
      else observer.unobserve(els);
    };
  });
}

/**
 * @template T
 * @param {Observable<boolean>} p$
 * @returns {(source: Observable<T>) => Observable<T>}
 */
export function subscribeWhen(p$) {
  return source => {
    return p$.pipe(switchMap(p => (p ? source : NEVER)));
  };
}

/**
 * @param {MediaQueryList} mql
 * @returns {Observable<MediaQueryListEvent>}
 */
export function fromMediaQuery(mql) {
  return Observable.create(o => {
    const l = o.next.bind(o);
    mql.addListener(l);
    return () => mql.removeListener(l);
  });
}

/**
 * @template Req
 * @template Res
 * @param {Worker} worker
 * @param {Req} message
 * @returns {Promise<Res>}
 */
export function postMessage(worker, message) {
  return new Promise((resolve, reject) => {
    const messageChannel = new MessageChannel();
    messageChannel.port1.onmessage = event => {
      if (event.data.error) {
        reject(event.data.error);
      } else {
        resolve(event.data);
      }
    };
    worker.postMessage(message, [messageChannel.port2]);
  });
}
