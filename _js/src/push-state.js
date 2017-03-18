/*
eslint-disable
no-param-reassign, import/no-extraneous-dependencies, import/no-unresolved, import/extensions
*/

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';

import { animationFrame } from 'rxjs/scheduler/animationFrame';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/observeOn';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/zip';

import PushState from 'y-push-state/src/vanilla';

import { hasFeatures, animate } from './common';
import { upgradeStyle } from './cross-fade';
import upgradeMathBlocks from './katex';

import Flip from './flip/flip';
import './flip/title';
import './flip/project';

const REQUIREMENTS = [
  'eventlistener',
  'queryselector',
  'requestanimationframe',
  'classlist',
  'documentfragment',
  'history',
  'opacity',
  'cssanimations',
  'dataset',
];

const DURATION = 200;

// TODO: naming!
const pushState = document.getElementById('y-push-state');
const shadowMain = document.getElementById('shadow-main');
const loading = document.getElementById('_loading');

if (hasFeatures(REQUIREMENTS)) {
  const start$ = Observable.fromEvent(pushState, 'y-push-state-start')
    .map(kind => [kind, document.querySelector('main')])
    .do(() => {
      // if a link on the drawer has been clicked, close it
      if (!window.isDesktop && window.drawer.opened) {
        window.drawer.close();
      }
    })
    .share();

  const ready$ = Observable.fromEvent(pushState, 'y-push-state-ready').share();
  const progress$ = Observable.fromEvent(pushState, 'y-push-state-progress'); // .share();
  const after$ = Observable.fromEvent(pushState, 'y-push-state-after').share();
  // const error$ = Observable.fromEvent(pushState, 'y-push-state-error');

  // FLIP animation (when applicable)
  start$
    .switchMap(([{ detail }]) => {
      const { type, event: { currentTarget } } = detail;

      const flip = Flip.create(type === 'push' && currentTarget.dataset.flip, {
        shadowMain,
        duration: DURATION,
      });

      // HACK: This assumes knowledge of the internal rx pipeline.
      // Could possibly be replaced with `withLatestFrom` shinanigans,
      // but it's more convenient like that.
      detail.flip = flip;

      return flip.start(currentTarget);
    })
    .subscribe();

  // Fade main content out
  start$
    .exhaustMap(([, main]) =>
      animate(main, [
        { opacity: 1 },
        { opacity: 0 },
      ], {
        duration: DURATION,
        easing: 'cubic-bezier(0,0,0.32,1)',
        fill: 'forwards',
      })
        .zip(after$))
    .subscribe();

  // Show loading bar when taking longer than expected
  // TODO: Don't hide main when there's already a new "start$"
  progress$
    .observeOn(animationFrame)
    .do(() => {
      loading.style.display = 'block';
      document.querySelector('main').style.display = 'none';
    })
    .subscribe();

  // error$
  //   // .delay(DURATION) // HACK
  //   .observeOn(animationFrame)
  //   .do(() => {
  //     loading.style.display = 'none';
  //   })
  //   .subscribe();

  // Prepare showing the new content
  ready$
    .do(({ detail: { content: [main] } }) => { main.style.opacity = 0; })
    .observeOn(animationFrame)
    .do(() => { loading.style.display = 'none'; })
    .switchMap(({ detail: { flip, content: [main] } }) => flip.ready(main))
    .subscribe();

  // Animate the new content
  after$
    .map(kind => [kind, document.querySelector('main')])
    .switchMap(([{ detail: { flip } }, main]) =>
      animate(main, [
        { transform: 'translateY(-2rem)', opacity: 0 },
        { transform: 'translateY(0)', opacity: 1 },
      ], {
        duration: DURATION,
        easing: 'cubic-bezier(0,0,0.32,1)',
        fill: 'forwards',
      })
      .observeOn(animationFrame)
      .do(() => { flip.after(main); })
      .switchMap(() => upgradeStyle(main.dataset)))
    .subscribe(() => {
      // send google analytics pageview
      if (window.ga) window.ga('send', 'pageview');

      // upgrade math blocks
      upgradeMathBlocks();
    });

  new PushState(pushState, {
    replaceIds: ['_main'],
    linkSelector: 'a[href^="/"]',
    scrollRestoration: true,
    duration: DURATION,
  }).startHistory();
}
