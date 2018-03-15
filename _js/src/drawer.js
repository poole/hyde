// # src / drawer.js
// Copyright (c) 2018 Florian Klampfer <https://qwtel.com/>
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

// ## Includes
// First, we patch the environment with some ES6+ functions we intend to use.
import 'core-js/fn/function/bind';

// We include our main component, hy-drawer,
// in both the vanilla JS and the WebComponent version (will decide later which one to use).
// Since they share most of their code, it's not a big deal in terms of file size.
import { HyDrawerElement, WEBCOMPONENT_FEATURE_TESTS, Set } from 'hy-drawer/src/webcomponent';

// Next, we include `Observable` and the RxJS functions we inted to use on it.
import { fromEvent } from 'rxjs/observable/fromEvent';
import { never } from 'rxjs/observable/never';

import { tap } from 'rxjs/operators/tap';
import { finalize } from 'rxjs/operators/finalize';
import { distinctUntilChanged } from 'rxjs/operators/distinctUntilChanged';
import { map } from 'rxjs/operators/map';
import { share } from 'rxjs/operators/share';
import { startWith } from 'rxjs/operators/startWith';
import { switchMap } from 'rxjs/operators/switchMap';
import { withLatestFrom } from 'rxjs/operators/withLatestFrom';

// Some of our own helper functions/constants.
import { hasFeatures, isSafari, isMobileSafari, isUCBrowser } from './common';

// A list of Modernizr tests that are required for the drawer to work.
const REQUIREMENTS = new Set([
  ...WEBCOMPONENT_FEATURE_TESTS,
  'cssremunit',
  'classlist',
  'eventlistener',
  'matchmedia',
]);

// NOTE: Duplicated values from `_sass_/variables.scss`.
const CONTENT_WIDTH_5 = 48;
const CONTENT_MARGIN_5 = 4;
const BREAK_POINT_3 = '(min-width: 64em)';
const BREAK_POINT_DYNAMIC = '(min-width: 1666px)';

const r28 = CONTENT_WIDTH_5 / 2 + CONTENT_MARGIN_5;

function calcDrawerWidth() {
  const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
  return 21 * rem;
}

function calcDrawerWidthDynamic() {
  const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
  return document.body.clientWidth / 2 - r28 * rem;
}

// ## Functions
const subscribeWhen = p$ => (source) => {
  if (process.env.DEBUG && !p$) throw Error();
  return p$.pipe(switchMap(p => (p ? source : never())));
};

// Determins the range from which to draw the drawer in pixels, counted from the left edge.
// It depends on the browser, e.g. Safari has a native guesture when sliding form the side,
// so we ignore the first 35 pixels (roughly the range for the native guesture).
function getRange() {
  if (isMobileSafari && !navigator.standalone) {
    return [35, 135];
  }
  return [0, 150];
}

// This function sets y-drawer up as a WebComponent.
// First it sets the options as HTML attributes, then it `define`s the WebComponent.
function defineWebComponent(drawerEl, opened) {
  if (opened) drawerEl.setAttribute('opened', '');
  if (isSafari) drawerEl.setAttribute('threshold', 0);
  window.customElements.define('hy-drawer', HyDrawerElement);
  return drawerEl;
}

// The functions below add an svg graphic to the sidebar
// that incidate that the sidebar can be drawn using touch gestures.
function setupIcon() {
  const img = document.getElementById('_swipeSVG');
  if (img) {
    const svg = document.createElement('img');
    svg.id = '_swipe';
    svg.src = img.href;
    svg.addEventListener('click', () => window._drawer.close());
    window._sidebar.appendChild(svg);
  }
}

function removeIcon() {
  const svg = document.getElementById('_swipe');
  if (svg) svg.parentNode.removeChild(svg);
}

// Quick helper function to prevent repeat code.
function updateSidebar(dist, opacity) {
  const t = 1 - opacity;
  window._sidebar.style.transform = `translateX(${dist * t}px)`;
}

// ## Main
// First, we determine if the drawer is enabled,
// and whether the current user agent meets our requirements.
//
// Note that the UC Browser has even more invasive native swipe gestures than iOS Safari,
// so we disable the component alltogether.
if (!window._noDrawer && hasFeatures(REQUIREMENTS) && !isUCBrowser) {
  // First we get hold of some DOM elements.
  const drawerEl = document.getElementsByTagName('hy-drawer')[0];
  const menuEl = document.getElementById('_menu');

  const resize$ = fromEvent(window, 'resize', { passive: true }).pipe(share());

  // An observable keeping track of whether the window size is greater than `BREAK_POINT_3`.
  const isDesktop$ = resize$.pipe(
    map(() => window.matchMedia(BREAK_POINT_3).matches),
    distinctUntilChanged(),
    share(),
    startWith(window.matchMedia(BREAK_POINT_3).matches),
  );

  // An observable keeping track of the drawer width.
  const drawerWidth$ = resize$.pipe(
    startWith({}),
    map(() =>
      (window.matchMedia(BREAK_POINT_DYNAMIC).matches
        ? calcDrawerWidthDynamic()
        : calcDrawerWidth())),
  );

  // An observable keeping track of the distance between
  // the middle point of the screen and the middle point of the drawer.
  const dist$ = drawerWidth$.pipe(map(drawerWidth =>
    (window.matchMedia(BREAK_POINT_3).matches
      ? document.body.clientWidth / 2 - drawerWidth / 2
      : 0)));

  // An observable that keeps track of the range from where the drawer can be drawn.
  // Should be between 0 and the drawer's width on desktop; `getRange` on mobile.
  const range$ = drawerWidth$.pipe(
    withLatestFrom(isDesktop$),
    map(([drawerWidth, isDesktop]) => (isDesktop ? [0, drawerWidth] : getRange())),
  );

  // Sliding the drawer's content between the middle point of the screen,
  // and the middle point of the drawer when closed.
  fromEvent(drawerEl, 'hy-drawer-move')
    .pipe(
      finalize(() => {
        window._sidebar.style.transform = '';
      }),
      subscribeWhen(isDesktop$),
      withLatestFrom(dist$),
    )
    .subscribe(([{ detail: { opacity } }, dist]) => {
      updateSidebar(dist, opacity);
    });

  // Setting `will-change` at the beginning of an interaction, and remove at the end.
  drawerEl.addEventListener('hy-drawer-prepare', () => {
    window._sidebar.style.willChange = 'transform';
  });

  drawerEl.addEventListener('hy-drawer-transitioned', () => {
    window._sidebar.style.willChange = '';
  });

  // Adding the click callback to the menu button.
  // Calling `preventDefault` in iOS Safari, because otherwise it's causing the navbar to appear,
  // which ruins the animation.
  menuEl.addEventListener('click', (e) => {
    if (isMobileSafari) e.preventDefault();
    window._drawer.toggle();
  });

  // Keeping track of the opened state.
  const opened$ = fromEvent(drawerEl, 'hy-drawer-transitioned').pipe(
    map(e => e.detail),
    distinctUntilChanged(),
    tap((opened) => {
      if (!opened) {
        removeIcon();
      }
    }),
    // share(),
  );

  // TODO: Close the drawer when scrolling down?
  /*
  if (!isMobile) {
    Observable::fromEvent(document, 'scroll')
      ::subscribeWhen(opened$)
      .subscribe((e) => {
        e.preventDefault();
        if (window._drawer.opened) { // extra check, because scroll can fire multiple times
          window._drawer.close();
        }
      });
  }
  */

  // Close the drawer on popstate, i.e. the back button.
  fromEvent(window, 'popstate', { passive: true })
    .pipe(subscribeWhen(opened$))
    .subscribe(() => {
      window._drawer.close();
    });

  // Save scroll position before the drawer gets initialized.
  const scrollTop = window.pageYOffset || document.body.scrollTop;

  // Start the drawer in `opened` state when the cover class is present,
  // and the user hasn't started scrolling already.
  const opened = drawerEl.classList.contains('cover') && scrollTop <= 0;

  // Now we create the component.
  window._drawer = defineWebComponent(drawerEl, opened);

  // When the distance changes, update the translateX property.
  dist$.subscribe((dist) => {
    const { opacity } = window._drawer;
    updateSidebar(dist, opacity);
  });

  // Keeping the drawer updated.
  range$.subscribe((range) => {
    window._drawer.range = range;
  });

  isDesktop$.subscribe((isDesktop) => {
    window._drawer.mouseEvents = isDesktop;
  });

  // Show the icon indicating that the drawer can be drawn using touch gestures.
  setupIcon();

  // Add a class to incidate that the drawer has been initialized.
  drawerEl.classList.add('loaded');

  // The drawer height is `100vh` before the drawer is initialized and is now set to 0.
  // We remove `innerHeight` from the old scroll position to prevent the content form "jumping".
  if (!opened) {
    window.scrollTo(0, scrollTop - window.innerHeight);
  }
}
