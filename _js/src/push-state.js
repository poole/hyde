/* eslint-disable no-param-reassign, import/no-extraneous-dependencies, import/no-unresolved, import/extensions */

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/observeOn';

import { animationFrame } from 'rxjs/scheduler/animationFrame';

import PushState from 'y-push-state/src/vanilla';

import { hasFeatures } from './common';
import upgradeMathBlocks from './katex';

const REQUIREMENTS = [
  'eventlistener',
  'queryselector',
  'requestanimationframe',
  'classlist',
  'documentfragment',
  'history',
];

const DURATION = 200;

const pushState = document.querySelector('#y-push-state');

if (hasFeatures(REQUIREMENTS)) {
  // pushState.addEventListener('y-push-state-error', errorCallback);

  Observable.fromEvent(pushState, 'y-push-state-before')
    .map(() => document.querySelector('main'))
    .do((main) => {
      main.style.willChange = 'opacity';
    })
    .observeOn(animationFrame)
    .subscribe((main) => {
      // document.body.classList.add('is-loading');

      main.animate([
        { opacity: 1 },
        { opacity: 0 },
      ], {
        duration: DURATION,
        easing: 'cubic-bezier(0,0,0.32,1)',
        fill: 'forwards',
      });
        // .addEventListener('finish', () => {
        //   main.style.opacity = 0;
        // });

      // unshow(error);

      // if a link on the drawer has been clicked, close it
      if (!window.isDesktop && window.drawer.opened) {
        window.drawer.close();
      }
    });

  Observable.fromEvent(pushState, 'y-push-state-after')
    .map(() => document.querySelector('main'))
    .do((main) => {
      main.style.willChange = 'transform, opacity'; // eslint-disable-line no-param-reassign
    })
    .observeOn(animationFrame)
    .do((main) => {
      // document.body.classList.remove('is-loading')
      console.log('afterseq');

      main.animate([
        { transform: 'translateY(-2rem)', opacity: 0 },
        { transform: 'translateY(0)', opacity: 1 },
      ], {
        duration: DURATION,
        easing: 'cubic-bezier(0,0,0.32,1)',
        // fill: 'forwards',
      }).addEventListener('finish', () => { main.style.willChange = ''; });
    })
    .debounceTime(200)
    .subscribe(() => {
      // send google analytics pageview
      if (window.ga) window.ga('send', 'pageview');

      // upgrade math blocks
      upgradeMathBlocks();
    });

  new PushState(pushState, {
    replaceIds: ['_main', '_asidebar'],
    linkSelector: 'a[href^="/"]',
    scrollRestoration: true,
    duration: DURATION,
  }).startHistory();
}
