/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/fromEvent';

import PushState from 'y-push-state/src/vanilla';
// import HTMLPushStateElement from 'y-push-state/src/webcomponent';

import { hasFeatures /* , defineCustomElement */ } from './common';
import upgradeMathBlocks from './katex';

const REQUIREMENTS = [
  'eventlistener',
  'queryselector',
  'requestanimationframe',
  'classlist',
  'documentfragment',
  'history',
];

const pushState = document.querySelector('y-push-state');

function beforeCallback() {
  document.body.classList.add('is-loading');

  // unshow(error);

  // if a link on the drawer has been clicked, close it
  if (!window.isDesktop && window.drawer.opened) {
    window.drawer.close();
  }
}

function afterSequence($) {
  return $
    .do(() => document.body.classList.remove('is-loading'))
    .debounceTime(200)
    .subscribe(() => {
      // send google analytics pageview
      if (window.ga) window.ga('send', 'pageview');

      // upgrade math blocks
      upgradeMathBlocks();
    });
}

function errorCallback() {
  // TODO
  // show(error);
}

// function withCustomElements() {
//   const setup = () => {
//     pushState.startHistory();
//     pushState.removeEventListener('y-push-state-attached', setup);
//   };
//
//   pushState.addEventListener('y-push-state-attached', setup);
//   defineCustomElement('y-push-state', HTMLPushStateElement);
// }

function withoutCustomElements() {
  new PushState(pushState, {
    replaceIds: ['_main', '_asidebar'],
    linkSelector: 'a[href^="/"]',
    scrollRestoration: true,
  }).startHistory();
}

if (hasFeatures(REQUIREMENTS)) {
  pushState.addEventListener('y-push-state-before', beforeCallback);
  pushState.addEventListener('y-push-state-error', errorCallback);
  afterSequence(Observable.fromEvent(pushState, 'y-push-state-after'));

  // if ('customElement' in window || 'registerElement' in document) {
  //   withCustomElements();
  // } else {
  withoutCustomElements();
  // }
}
