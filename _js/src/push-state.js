/*
eslint-disable
no-param-reassign,
import/no-extraneous-dependencies,
import/no-unresolved,
import/extensions
*/

import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { merge } from 'rxjs/observable/merge';

import { _catch as catchRx } from 'rxjs/operator/catch';
import { _do as doRx } from 'rxjs/operator/do';
import { exhaustMap } from 'rxjs/operator/exhaustMap';
import { filter } from 'rxjs/operator/filter';
import { map } from 'rxjs/operator/map';
import { share } from 'rxjs/operator/share';
import { switchMap } from 'rxjs/operator/switchMap';
import { takeUntil } from 'rxjs/operator/takeUntil';
import { throttleTime } from 'rxjs/operator/throttleTime';
import { zipProto as zipWith } from 'rxjs/operator/zip';

import PushState from 'y-push-state/src/vanilla';

import { hasFeatures, animate } from './common';
import CrossFader from './cross-fade';
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

// whenever the source observable encounters an error,
// we log it to the console, but continue as if it never happend
function makeUnstoppable() {
  return this::catchRx((error, caught) => {
    console.error(error); // eslint-disable-line
    return caught;
  });
}

if (hasFeatures(REQUIREMENTS)) {
  const ua = navigator.userAgent.toLowerCase();
  const isSafari = ua.indexOf('safari') > 0 && ua.indexOf('chrome') < 0;

  const crossFader = new CrossFader();

  const pushState = document.getElementById('_yPushState');
  const loading = document.getElementById('_loading');

  const shadowMain = document.createElement('div');
  shadowMain.classList.add('shadow-main');
  shadowMain.innerHTML = `
    <div class="content container">
      <div class="page"></div>
    </div>`;
  pushState.parentNode.insertBefore(shadowMain, pushState);

  const start$ = Observable::fromEvent(pushState, 'y-push-state-start')
    ::map(kind => [kind, document.getElementById('_main')])
    ::doRx(() => {
      // If a link on the drawer has been clicked, close it
      if (!window.isDesktop && window.drawer.opened) {
        window.drawer.close();
      }
    })
    ::share();

  const ready$ = Observable::fromEvent(pushState, 'y-push-state-ready')::share();
  const progress$ = Observable::fromEvent(pushState, 'y-push-state-progress');
  const after$ = Observable::fromEvent(pushState, 'y-push-state-after')::share();
  // const error$ = Observable.fromEvent(pushState, 'y-push-state-error');

  // HACK
  if (isSafari) {
    Observable::fromEvent(window, 'popstate')
      .subscribe(() => { document.body.style.minHeight = '999999px'; });

    after$
      .subscribe(() => { document.body.style.minHeight = ''; });
  }

  // FLIP animation (when applicable)
  start$
    ::switchMap(([{ detail }]) => {
      const { event: { currentTarget } } = detail;

      const flip = Flip.create(currentTarget.dataset && currentTarget.dataset.flip, {
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
    ::makeUnstoppable()
    .subscribe();

  // Fade main content out
  start$
    ::doRx(([, main]) => { main.style.opacity = 0; })
    ::filter(([{ detail: { type } }]) => type === 'push' || !isSafari)
    ::exhaustMap(([{ detail: { type } }, main]) =>
      animate(main, [
        { opacity: 1 },
        { opacity: 0 },
      ], {
        duration: DURATION,
        easing: 'cubic-bezier(0,0,0.32,1)',
      })
        ::doRx(() => { if (type === 'push') window.scroll(0, 0); })
        ::zipWith(after$))
    ::makeUnstoppable()
    .subscribe();

  // Show loading bar when taking longer than expected
  progress$
    ::doRx(() => { loading.style.display = 'block'; })
    ::makeUnstoppable()
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
    ::doRx(() => { loading.style.display = 'none'; })
    ::switchMap(({ detail: { flip, type, content: [main] } }) => Observable::merge(
      type === 'push' || !isSafari ?
        flip.ready(main)::takeUntil(start$) :
        Observable::empty(),
      crossFader.crossFade(main.dataset, { duration: 3 * DURATION }),
    ))
    ::makeUnstoppable()
    .subscribe();

  // Animate the new content
  after$
    ::filter(({ detail: { type } }) => type === 'push' || !isSafari)
    ::map(kind => [kind, document.querySelector('main')])
    ::switchMap(([, main]) =>
      animate(main, [
        { transform: 'translateY(-2rem)', opacity: 0 },
        { transform: 'translateY(0)', opacity: 1 },
      ], {
        duration: DURATION,
        easing: 'cubic-bezier(0,0,0.32,1)',
      }))
    ::makeUnstoppable()
    .subscribe();

  after$
    // Don't send a pageview when the user blasts through the history..
    ::throttleTime(500)
    ::doRx(() => {
      // Send google analytics pageview
      if (window.ga) window.ga('send', 'pageview');

      // Upgrade math blocks
      upgradeMathBlocks();
    })
    ::makeUnstoppable()
    .subscribe();

  new PushState(pushState, {
    replaceIds: ['_main'],
    linkSelector: 'a[href^="/"]',
    duration: DURATION,
    noPopDuration: isSafari,
    scrollRestoration: !isSafari,
  }).startHistory();
}
