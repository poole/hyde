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

import 'core-js/fn/array/for-each';
import 'core-js/fn/object/assign';

import { PushState } from 'hy-push-state/src/vanilla';

import { Observable } from 'rxjs/Observable';

import { fromEvent } from 'rxjs/observable/fromEvent';
import { merge } from 'rxjs/observable/merge';
import { never } from 'rxjs/observable/never';
import { timer } from 'rxjs/observable/timer';

// import { Subject } from 'rxjs/Subject';

// import { animationFrame } from 'rxjs/scheduler/animationFrame';
import { asap } from 'rxjs/scheduler/asap';

import { _catch as recover } from 'rxjs/operator/catch';
import { _do as effect } from 'rxjs/operator/do';
import { debounceTime } from 'rxjs/operator/debounceTime';
import { filter } from 'rxjs/operator/filter';
import { map } from 'rxjs/operator/map';
import { mapTo } from 'rxjs/operator/mapTo';
import { mergeMap } from 'rxjs/operator/mergeMap';
import { observeOn } from 'rxjs/operator/observeOn';
import { pairwise } from 'rxjs/operator/pairwise';
import { partition } from 'rxjs/operator/partition';
import { share } from 'rxjs/operator/share';
import { startWith } from 'rxjs/operator/startWith';
import { switchMap } from 'rxjs/operator/switchMap';
import { takeUntil } from 'rxjs/operator/takeUntil';
import { zipProto as zipWith } from 'rxjs/operator/zip';

import elemDataset from 'elem-dataset';

import { animate, empty, hasFeatures, isSafari } from './common';
import CrossFader from './cross-fader';
import upgradeMathBlocks from './katex';

import { flip } from './flip';

const { forEach } = Array.prototype;
const assign = ::Object.assign;

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
  { opacity: 0, transform: 'translateY(-3rem)' },
  { opacity: 1, transform: 'translateY(0)' },
];

// TODO: rename
const SETTINGS = {
  duration: DURATION,
  easing: 'cubic-bezier(0,0,0.32,1)',
};

const HEADING_SELECTOR = 'h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]';

function upgradeHeading(h) {
  const hash = `#${h.id}`;
  const a = document.createElement('a');
  const span = document.createElement('span');
  span.textContent = 'Permalink';
  span.classList.add('sr-only');
  a.appendChild(span);
  a.href = hash;
  a.classList.add('permalink');
  h.appendChild(a);
}

// We log errors to the console, but continue as if it never happend
function subscribe(ne, er, co) {
  return this
    ::effect({ error: ::console.error })
    ::recover((e, c) => c)
    .subscribe(ne, er, co);
}

function pauseWith(pauser$) {
  if (process.env.DEBUG && !pauser$) throw Error();
  return pauser$::switchMap(paused => (paused ? Observable::never() : this));
}

function waitUntil(observable) {
  return this::zipWith(observable, x => x);
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
    <span class="icon-spinner4"></span>
  `;
  navbarEl.appendChild(loading);
  return loading;
}

function setupErrorPage(main, url) {
  const error = document.createElement('div');
  error.classList.add('page');
  error.innerHTML = `
    <h1 class="page-title">Error</h1>
    <p>Error loading <a href="${url.pathname}">${url.pathname}</a>...</p>
  `;
  main.appendChild(error);
  return main;
}

function getFlipType(t = {}) {
  if (t.classList && t.classList.contains('flip-title')) return 'title';
  if (t.classList && t.classList.contains('flip-project')) return 'project';
  return t.getAttribute && t.getAttribute('data-flip');
}

function shouldAnimate({ type }) {
  return type === 'push' || !isSafari();
}

if (!window._noPushState && hasFeatures(REQUIREMENTS)) {
  const crossFader = new CrossFader(FADE_DURATION);

  const pushStateEl = document.getElementById('_hyPushState');

  const animationMain = setupAnimationMain(pushStateEl);
  const loading = setupLoading(document.querySelector('.navbar .content'));

  const start$ = Observable::fromEvent(pushStateEl, 'hy-push-state-start')
    ::map(({ detail }) => assign(detail, { flipType: getFlipType(detail.anchor) }))
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

  const after$ = Observable::fromEvent(pushStateEl, 'hy-push-state-after')
    ::map(({ detail }) => detail)
    ::share();

  const progress$ = Observable::fromEvent(pushStateEl, 'hy-push-state-progress')
    ::map(({ detail }) => detail)
    ::share();

  const error$ = Observable::fromEvent(pushStateEl, 'hy-push-state-fetch-error')
    ::map(({ detail }) => detail)
    ::share();

  /* HACK */
  if (isSafari()) {
    Observable::fromEvent(window, 'popstate')
      ::filter(() => history.state && history.state._hyPushState)
      ::subscribe(() => { document.body.style.minHeight = '999999px'; });

    after$
      ::subscribe(() => { document.body.style.minHeight = ''; });
  }

  // We use this to prevent starting new "fade out animations".
  // ie when the content starts fading out,
  // we want it to stay that way until new content has come in.
  const pauser$ = Observable::merge(
    start$::observeOn(asap)::mapTo(true),
    after$::observeOn(asap)::mapTo(false),
    progress$::observeOn(asap)::mapTo(false),
    error$::observeOn(asap)::mapTo(false),
  )
    ::startWith(false);

  // Fade main content out
  const fadeOut$ = start$
    ::filter(shouldAnimate)
    ::pauseWith(pauser$)
    ::effect(() => {
      const main = document.getElementById('_main');
      main.style.pointerEvents = 'none';
      main.style.opacity = 0;
    })
    ::switchMap(() => animate(document.getElementById('_main'), FADE_OUT, SETTINGS));

  // Show loading bar when taking longer than expected
  progress$
    ::effect(() => {
      loading.style.display = 'block';
      const main = document.getElementById('_main');
      main::empty();
    })
    ::subscribe();

  // Prepare showing the new content
  ready$
    ::subscribe(({ type, content: [main] }) => {
      loading.style.display = 'none';
      main.querySelectorAll(HEADING_SELECTOR)::forEach(upgradeHeading);
      if (shouldAnimate({ type })) main.style.pointerEvents = 'none';
    });

  // Animate the new content
  const [afterAnimated$, afterInstant$] = after$::partition(shouldAnimate);

  const fadeIn$ = afterAnimated$
    ::switchMap(({ content: [main], flipType }) =>
      animate(main, FADE_IN, SETTINGS)
        ::effect(() => { main.style.pointerEvents = ''; })
        ::mapTo({ flipType }))
    ::share();

  // afterInstant$
  //   ::effect(({ content: [main] }) => { main.style.pointerEvents = ''; })
  //   ::subscribe();

  const flip$ = flip(start$, ready$, Observable::merge(fadeIn$, afterInstant$, error$), {
    animationMain,
    settings: SETTINGS,
  });

  // Every click starts a timer that lasts as long
  // as it takes for the flip and fade out animations to complete.
  const anim$ = start$
    ::switchMap(() => Observable::timer(DURATION))
    ::zipWith(flip$, fadeOut$)
    ::share();
  anim$::subscribe();

  // Swap out the sidebar image (if applicable)
  after$
    ::switchMap(({ content: [main] }) =>
      crossFader.fetchImage(elemDataset(main))
        ::waitUntil(fadeIn$)
        ::takeUntil(start$))
    ::startWith(document.querySelector('.sidebar-bg'))
    ::pairwise()
    ::mergeMap(::crossFader.fade)
    ::subscribe();

  // Send google analytics pageview and upgrade math blocks.
  // Add some delay to avoid intermediate vales to be sent.
  fadeIn$
    ::debounceTime(DURATION)
    ::effect(() => {
      if (window.ga) window.ga('send', 'pageview', location.pathname);
      upgradeMathBlocks();
    })
    ::subscribe();

  // Show error page
  error$
    ::subscribe(({ url }) => {
      const main = document.getElementById('_main');
      loading.style.display = 'none';
      animationMain.querySelector('.page')::empty();
      main::empty();

      main.style.pointerEvents = '';
      main.style.opacity = '';

      setupErrorPage(main, url);
    });

  // Upgrade headlines to include "permalinks"
  const main = document.getElementById('_main');
  main.querySelectorAll(HEADING_SELECTOR)::forEach(upgradeHeading);

  // Create the component
  window._pushState = new PushState(pushStateEl, {
    replaceIds: ['_main'],
    linkSelector: 'a[href]',
    scriptSelector: 'script:not([type^="math/tex"])',
    duration: DURATION,
    instantPop: isSafari(),
    scrollRestoration: !isSafari(),
    repeatDelay: DURATION,
    scriptHack: true,
  });

  window._pushState._animation$ = anim$;
}
