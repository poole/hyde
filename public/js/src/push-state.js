/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */

import { Observable } from 'rxjs-es/Observable';
import 'rxjs-es/add/operator/debounceTime';
import 'rxjs-es/add/operator/do';
import 'rxjs-es/add/observable/fromEvent';

import PushState from 'y-push-state/src/vanilla';
import HTMLPushStateElement from 'y-push-state/src/webcomponent';

import { hasFeatures, defineCustomElement } from './common';
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

if (hasFeatures(REQUIREMENTS)) {
  // const error = document.getElementById('_error');
  // const loading = document.getElementById('_loading');

  pushState.addEventListener('y-push-state-before', () => {
    document.body.classList.add('is-loading');

    // unshow(error);

    // if a link on the drawer has been clicked, close it
    if (!window.isDesktop && window.drawer.opened) {
      window.drawer.close();
    }
  });

  Observable.fromEvent(pushState, 'y-push-state-after')
    .do(() => document.body.classList.remove('is-loading'))
    .debounceTime(200)
    .subscribe(() => {
      // send google analytics pageview
      if (window.ga) window.ga('send', 'pageview');

      // upgrade math blocks
      upgradeMathBlocks();
    });

  // smoothState.addEventListener('y-smooth-state-error', () => {
  //   show(error);
  // });

  if ('customElement' in window || 'registerElement' in document) {
    const setup = () => {
      pushState.startHistory();
      pushState.removeEventListener('y-push-state-attached', setup);
    };

    pushState.addEventListener('y-push-state-attached', setup);
    defineCustomElement('y-push-state', HTMLPushStateElement);
  } else {
    new PushState(pushState, {
      replaceIds: ['_main', '_asidebar'],
      linkSelector: 'a[href^="/"]',
      scrollRestoration: true,
    }).startHistory();
  }
}
