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
  // const restoreScrollPosition = 'scrollRestoration' in window.history;

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
    .filter(([{ detail: { type } }]) => type === 'push')
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
    .subscribe(() => {
      if (!('scrollRestoration' in window.history)) window.scrollTo(0, 0);
    });

  // Fade main content out
  start$
    .filter(([{ detail: { type } }]) => type === 'push')
    .do(([, main]) => { main.style.opacity = 0; })
    .exhaustMap(([, main]) =>
      animate(main, [
        { opacity: 1 },
        { opacity: 0 },
      ], {
        duration: DURATION,
        easing: 'cubic-bezier(0,0,0.32,1)',
      })
        .zip(after$))
    .catch((err, c) => c)
    .subscribe();

  // Show loading bar when taking longer than expected
  // TODO: Don't hide main when there's already a new "start$"
  progress$
    .do(() => {
      loading.style.display = 'block';
      document.getElementById('_main').style.display = 'none';
    })
    .catch((err, c) => c)
    .subscribe();

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
      type === 'push' ? flip.ready(main) : Observable.emtpy(),
      crossFade(main.dataset, { duration: DURATION }),
    ))
    .catch((err, c) => c)
    .subscribe();

  // Animate the new content
  after$
    .filter(({ detail: { type } }) => type === 'push')
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
      // send google analytics pageview
      if (window.ga) window.ga('send', 'pageview');

      // upgrade math blocks
      upgradeMathBlocks();
    })
    .catch((err, c) => c)
    .subscribe();

  new PushState(pushState, {
    replaceIds: ['_main'],
    linkSelector: 'a[href^="/"]',
    scrollRestoration: 'scrollRestoration' in window.history,
    duration: DURATION,
  }).startHistory();
}
