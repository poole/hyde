/*
eslint-disable
no-param-reassign,
import/no-extraneous-dependencies,
import/no-unresolved,
import/extensions
*/

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/zip';

import PushState from 'y-push-state/src/vanilla';

import { hasFeatures, animate } from './common';
import { setup as setupCrossFade, crossFade } from './cross-fade';
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

const DURATION = 250;

if (hasFeatures(REQUIREMENTS)) {
  const ua = navigator.userAgent.toLowerCase();
  const isSafari = ua.indexOf('safari') > 0 && ua.indexOf('chrome') < 0;

  setupCrossFade();

  const pushState = document.getElementById('y-push-state');
  const loading = document.getElementById('_loading');

  const shadowMain = document.createElement('div');
  shadowMain.classList.add('shadow-main');
  shadowMain.innerHTML = `
    <div class="content container">
      <div class="page"></div>
    </div>`;
  pushState.parentNode.insertBefore(shadowMain, pushState);

  const start$ = Observable.fromEvent(pushState, 'y-push-state-start')
    .map(kind => [kind, document.getElementById('_main')])
    .do(() => {
      // If a link on the drawer has been clicked, close it
      if (!window.isDesktop && window.drawer.opened) {
        window.drawer.close();
      }
    })
    .share();

  const ready$ = Observable.fromEvent(pushState, 'y-push-state-ready').share();
  const progress$ = Observable.fromEvent(pushState, 'y-push-state-progress');
  const after$ = Observable.fromEvent(pushState, 'y-push-state-after').share();
  // const error$ = Observable.fromEvent(pushState, 'y-push-state-error');

  if (isSafari) {
    Observable.fromEvent(window, 'popstate')
      .subscribe(() => { document.body.style.minHeight = '999999px'; });

    after$
      .subscribe(() => { document.body.style.minHeight = ''; });
  }

  // FLIP animation (when applicable)
  start$
    .switchMap(([{ detail }]) => {
      const { event: { currentTarget } } = detail;

      const flip = Flip.create(currentTarget.dataset.flip, {
        shadowMain,
        currentTarget,
        duration: DURATION,
      });

      // HACK: This assumes knowledge of the internal rx pipeline.
      // Could possibly be replaced with `withLatestFrom` shinanigans,
      // but it's more convenient like that.
      detail.flip = flip;

      return flip.start(currentTarget);
    })
    .catch((err, c) => c)
    .subscribe();

  // Fade main content out
  start$
    .do(([, main]) => { main.style.opacity = 0; })
    .filter(([{ detail: { type } }]) => type === 'push' || !isSafari)
    .exhaustMap(([{ detail: { type } }, main]) =>
      animate(main, [
        { opacity: 1 },
        { opacity: 0 },
      ], {
        duration: DURATION,
        easing: 'cubic-bezier(0,0,0.32,1)',
      })
        .do(() => { if (type === 'push') window.scroll(0, 0); })
        .zip(after$))
    .catch((err, c) => c)
    .subscribe();

  // Show loading bar when taking longer than expected
  progress$
    .do(() => { loading.style.display = 'block'; })
    .catch((err, c) => c)
    .subscribe();

  // TODO: error message!?
  // error$
  //   // .delay(DURATION) // HACK
  //   .do(() => {
  //     loading.style.display = 'none';
  //   })
  //   .subscribe();

  // Prepare showing the new content
  ready$
    .do(() => { loading.style.display = 'none'; })
    .switchMap(({ detail: { flip, type, content: [main] } }) => Observable.merge(
      type === 'push' || !isSafari ?
        flip.ready(main).takeUntil(start$) :
        Observable.emtpy(),
      crossFade(main.dataset, { duration: 2 * DURATION }),
    ))
    .catch((err, c) => c)
    .subscribe();

  // Animate the new content
  after$
    .filter(({ detail: { type } }) => type === 'push' || !isSafari)
    .map(kind => [kind, document.querySelector('main')])
    .switchMap(([, main]) =>
      animate(main, [
        { transform: 'translateY(-2rem)', opacity: 0 },
        { transform: 'translateY(0)', opacity: 1 },
      ], {
        duration: DURATION,
        easing: 'cubic-bezier(0,0,0.32,1)',
      }))
    .catch((err, c) => c)
    .subscribe();

  after$
    .do(() => {
      // Send google analytics pageview
      if (window.ga) window.ga('send', 'pageview');

      // Upgrade math blocks
      upgradeMathBlocks();
    })
    .catch((err, c) => c)
    .subscribe();

  new PushState(pushState, {
    replaceIds: ['_main'],
    linkSelector: 'a[href^="/"]',
    duration: DURATION,
    noPopDuration: isSafari,
    scrollRestoration: !isSafari,
  }).startHistory();
}
