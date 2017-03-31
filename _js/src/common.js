// Copyright (c) 2017 Florian Klampfer
// Licensed under MIT

import { Observable } from 'rxjs/Observable';

import '../lib/modernizr';

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
  el.style.display = 'block'; // eslint-disable-line no-param-reassign
  el.style.visibility = 'visible'; // eslint-disable-line no-param-reassign
}

export function hide(el) {
  el.style.display = 'none'; // eslint-disable-line no-param-reassign
  el.style.visibility = 'hidden'; // eslint-disable-line no-param-reassign
}

export function unshow(el) {
  el.style.display = ''; // eslint-disable-line no-param-reassign
  el.style.visibility = ''; // eslint-disable-line no-param-reassign
}

export const unhide = unshow;

export function defineCustomElement(tagName, CustomHTMLElement) {
  if ('customElements' in window) {
    customElements.define(tagName, CustomHTMLElement);
  } else if ('registerElement' in document) {
    document.registerElement(tagName, CustomHTMLElement);
  }
}

export function ensureCustomElements(f) {
  if ('customElements' in window || 'registerElement' in document) {
    f();
  } else {
    if (!window.loadingCustomElements) loadJSDeferred('https://unpkg.com/webcomponents.js@0.7.22/CustomElements.min.js');
    window.loadingCustomElements = true;
    window.addEventListener('WebComponentsReady', f);
  }
}

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
