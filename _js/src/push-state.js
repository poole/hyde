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

import { PushState } from 'hy-push-state/src/vanilla';

import { Observable } from 'rxjs/Observable';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { timer } from 'rxjs/observable/timer';

// import { animationFrame } from 'rxjs/scheduler/animationFrame';

import { _catch as recover } from 'rxjs/operator/catch';
import { _do as effect } from 'rxjs/operator/do';
import { debounceTime } from 'rxjs/operator/debounceTime';
import { exhaustMap } from 'rxjs/operator/exhaustMap';
import { filter } from 'rxjs/operator/filter';
import { map } from 'rxjs/operator/map';
import { mergeMap } from 'rxjs/operator/mergeMap';
// import { observeOn } from 'rxjs/operator/observeOn';
import { pairwise } from 'rxjs/operator/pairwise';
import { share } from 'rxjs/operator/share';
import { startWith } from 'rxjs/operator/startWith';
import { switchMap } from 'rxjs/operator/switchMap';
import { takeUntil } from 'rxjs/operator/takeUntil';
// import { throttleTime } from 'rxjs/operator/throttleTime';
import { zipProto as zipWith } from 'rxjs/operator/zip';

import elemDataset from 'elem-dataset';

import { animate, hasFeatures, isSafari } from './common';
import CrossFader from './cross-fader';
import upgradeMathBlocks from './katex';

import Flip from './flip/flip';
import './flip/title';

const REQUIREMENTS = [
  'eventlistener',
  'queryselector',
  'requestanimationframe',
  'classlist',
  'documentfragment',
  'history',
  'opacity',
  'cssanimations',
];

const DURATION = 250;
const FADE_DURATION = 600;

const FADE_OUT = [
  { opacity: 1 },
  { opacity: 0 },
];

const FADE_IN = [
  { opacity: 0, transform: 'translateY(-2rem)' },
  { opacity: 1, transform: 'translateY(0)' },
];

// TODO: rename
const SETTINGS = {
  duration: DURATION,
  easing: 'cubic-bezier(0,0,0.32,1)',
};

//
// we log it to the console, but continue as if it never happend
function unstoppable() {
  return this::effect({ error: ::console.error })::recover((e, c) => c);
}

function setupAnimationMain(pushStateEl) {
  const animationMain = document.createElement('div');
  animationMain.classList.add('animation-main');
  animationMain.classList.add('fixed-top');
  animationMain.innerHTML = `
    <div class="content">
      <div class="page"></div>
    </div>`;
  pushStateEl.parentNode.insertBefore(animationMain, pushStateEl);
  return animationMain;
}

function setupLoading(navbarEl) {
  const loading = document.createElement('div');
  loading.classList.add('loading');
  loading.innerHTML = `
    <span class="sr-only">Loading...</span>
    <div class="sk-folding-cube">
      <div class="sk-cube1 sk-cube"></div>
      <div class="sk-cube2 sk-cube"></div>
      <div class="sk-cube4 sk-cube"></div>
      <div class="sk-cube3 sk-cube"></div>
    </div>
  `;
  navbarEl.appendChild(loading);
  return loading;
}

function getFlipType(t = {}) {
  /* TODO: what is this checking? */
  if (t.classList && t.classList.contains('flip-title')) return 'title';
  if (t.classList && t.classList.contains('flip-project')) return 'project';
  return t.getAttribute && t.getAttribute('data-flip');
}

if (!window._noPushState && hasFeatures(REQUIREMENTS)) {
  const crossFader = new CrossFader(FADE_DURATION);

  const pushStateEl = document.getElementById('_hyPushState');

  const animationMain = setupAnimationMain(pushStateEl);
  const loading = setupLoading(document.querySelector('.navbar .content'));

  const start$ = Observable::fromEvent(pushStateEl, 'hy-push-state-start')
    ::map(({ detail }) => [detail, document.getElementById('_main')])
    ::effect(() => {
      // If a link on the drawer has been clicked, close it
      if (!window._isDesktop && window._drawer.opened) {
        window._drawer.close();
      }
    })
    ::share();

  const ready$ = Observable::fromEvent(pushStateEl, 'hy-push-state-ready')
    ::map(({ detail }) => detail)
    ::share();

  const progress$ = Observable::fromEvent(pushStateEl, 'hy-push-state-progress')
    ::map(({ detail }) => [detail, document.getElementById('_main')]);
    // ::share();

  const after$ = Observable::fromEvent(pushStateEl, 'hy-push-state-after')
    ::map(({ detail }) => detail)
    ::share();

  // const error$ = Observable.fromEvent(pushStateEl, 'hy-push-state-error');

  // HACK
  if (isSafari()) {
    Observable::fromEvent(window, 'popstate')
      ::filter(() => history.state && history.state.id === '_hyPushState')
      .subscribe(() => { document.body.style.minHeight = '999999px'; });

    after$
      .subscribe(() => { document.body.style.minHeight = ''; });
  }

  // FLIP animation (when applicable)
  start$
    ::switchMap(([detail]) => {
      const { anchor } = detail;

      const flip = Flip.create(getFlipType(anchor), {
        anchor,
        animationMain,
        duration: DURATION,
      });

      // HACK: This assumes knowledge of the internal rx pipeline.
      // Could possibly be replaced with `withLatestFrom` shinanigans,
      // but it's more convenient like that.
      detail.flip = flip;

      return flip.start();
    })
    ::unstoppable()
    .subscribe();

  // Fade main content out
  start$
    ::filter(([{ type }]) => type === 'push' || !isSafari())
    ::effect(([, main]) => {
      main.style.pointerEvents = 'none';
      main.style.opacity = 0;
    })
    ::exhaustMap(([, main]) =>
      animate(main, FADE_OUT, SETTINGS)
        // ::effect({
        //   next: () => {
        //     window._pushState._ready1();
        //   },
        // })
        ::zipWith(after$))
    ::unstoppable()
    .subscribe();

  // Show loading bar when taking longer than expected
  progress$
    ::effect(([, main]) => {
      main.innerHTML = '';
      loading.style.display = 'block';
    })
    ::unstoppable()
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
    ::effect((/* { content: [main] } */) => {
      /*
      main.style.opacity = 0;
      main.style.willChange = 'opacity';
      main.style.pointerEvents = 'none';
      */
      loading.style.display = 'none';
    })
    ::filter(({ type }) => type === 'push' || !isSafari())
    ::switchMap(({ flip, content: [main] }) =>
      flip.ready(main)::takeUntil(start$))
    ::unstoppable()
    .subscribe();

  // Swap out the sidebar image (if applicable)
  ready$
    ::switchMap(({ content: [main] }) =>
      crossFader.fetchImage(elemDataset(main))
        ::zipWith(Observable::timer(DURATION * 2), x => x)
        ::takeUntil(start$))
    ::startWith(document.querySelector('.sidebar-bg'))
    ::pairwise()
    ::mergeMap(::crossFader.fade)
    ::unstoppable()
    .subscribe();

  // Animate the new content
  after$
    ::filter(({ type }) => type === 'push' || !isSafari())
    ::map(kind => [kind, document.querySelector('main')])
    ::effect(([, main]) => { main.pointerEvents = 'none'; })
    ::switchMap(([, main]) =>
      animate(main, FADE_IN, SETTINGS)
        ::effect({
          complete: () => {
            // main.style.opacity = 1;
            // main.style.willChange = '';
            main.style.pointerEvents = '';
            // window._pushState._ready2();
          },
        }))
    // Send google analytics pageview and upgrade math blocks.
    // Don't send a pageview when the user blasts through the history..
    ::debounceTime(DURATION)
    ::effect(() => {
      if (window.ga) window.ga('send', 'pageview', location.pathname);
      upgradeMathBlocks();
    })
    ::unstoppable()
    .subscribe();

  window._pushState = new PushState(pushStateEl, {
    replaceIds: ['_main'],
    linkSelector: 'a[href]',
    scriptSelector: 'script:not([type^="math/tex"])',
    duration: DURATION,
    instantPop: isSafari(),
    scrollRestoration: !isSafari(),
  });
}
