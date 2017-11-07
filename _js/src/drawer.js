// # src / drawer.js
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

// ## Includes
// First, we patch the environment with some ES6+ functions we intend to use.
import 'core-js/fn/function/bind';

// We include our main component, hy-drawer,
// in both the vanilla JS and the WebComponent version (will decide later which one to use).
// Since they share most of their code, it's not a big deal in terms of file size.
import { Set } from 'hy-drawer/src/common';
import { Drawer, VANILLA_FEATURE_TESTS } from 'hy-drawer/src/vanilla';
import { HTMLDrawerElement } from 'hy-drawer/src/webcomponent';

// Next, we include `Observable` and the RxJS functions we inted to use on it.
import { Observable } from 'rxjs/Observable';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { never } from 'rxjs/observable/never';

import { _do as tap } from 'rxjs/operator/do';
import { map } from 'rxjs/operator/map';
import { share } from 'rxjs/operator/share';
import { startWith } from 'rxjs/operator/startWith';
import { switchMap } from 'rxjs/operator/switchMap';
import { withLatestFrom } from 'rxjs/operator/withLatestFrom';

// And some of our own helper functions/constants.
import { hasFeatures, isSafari, isMobile, isMobileSafari, isUCBrowser } from './common';

// A list of Modernizr tests that are required for the drawer to work.
const REQUIREMENTS = new Set([
  ...VANILLA_FEATURE_TESTS,
  'cssremunit',
  'classlist',
  'eventlistener',
  'matchmedia',
]);

// HACK: hard-coded SCSS break-point.
const BREAK_POINT_3 = '(min-width: 64em)';
const BREAK_POINT_DYNAMIC = '(min-width: 102.5em)';

// ## Functions
function subscribeWhen(p$) {
  if (process.env.DEBUG && !p$) throw Error();
  return p$::switchMap(p => (p ? this : Observable::never()));
}

const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);

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
function setupWebComponent(drawerEl, opened) {
  if (opened) drawerEl.setAttribute('opened', '');
  drawerEl.setAttribute('align', 'left');
  // drawerEl.setAttribute('range', getRange().join(','));
  drawerEl.setAttribute('threshold', isSafari ? 0 : 10);
  drawerEl.setAttribute('prevent-default', '');
  // drawerEl.setAttribute('mouse-events', '');

  customElements.define('hy-drawer', HTMLDrawerElement);
  return drawerEl;
}

// This function sets y-drawer up as a vanilla JS class.
function setupVanilla(drawerEl, opened) {
  return new Drawer(drawerEl, {
    opened,
    align: 'left',
    // range: getRange(),
    threshold: isSafari ? 0 : 10,
    preventDefault: true,
    // mouseEvents: true,
  });
}

// ## Main
// First, we determine if the drawer is enabled,
// and whether the current user agent meets our requirements.
// UC Browser has even more invasive native swipe guestures than iOS Safari,
// (that ignore `preventDefault` on top of that...),
// so we disable the component alltogether. UC Mini is fine though.
if (!window._noDrawer && hasFeatures(REQUIREMENTS) && !isUCBrowser) {
  // Now we get a hold of some DOM elements
  const drawerEl = document.getElementsByTagName('hy-drawer')[0];
  const menuEl = document.getElementById('_menu');

  const isDesktop$ = Observable::fromEvent(window, 'resize', { passive: true })
    ::map(() => window.matchMedia(BREAK_POINT_3).matches)
    ::share()
    ::startWith(window.matchMedia(BREAK_POINT_3).matches);

  const drawerWidth$ = isDesktop$
    ::map(() => (window.matchMedia(BREAK_POINT_DYNAMIC).matches ?
      (document.body.clientWidth / 2) - (28 * rem) :
      20 * rem));

  const dist$ = drawerWidth$::map(drawerWidth =>
    (document.body.clientWidth / 2) - (drawerWidth / 2));

  const range$ = isDesktop$
    ::withLatestFrom(drawerWidth$)
    ::map(([isDesktop, drawerWidth]) => (isDesktop ? [0, drawerWidth] : getRange()));

  // Adding the click callback to the menu button.
  menuEl.addEventListener('click', () => { window._drawer.toggle(); });

  Observable::fromEvent(drawerEl, 'hy-drawer-move')
    ::subscribeWhen(isDesktop$)
    ::withLatestFrom(dist$)
    .subscribe(([{ detail: { opacity } }, dist]) => {
      const t = 1 - opacity;
      window._sidebar.style.transform = `translateX(${dist * t}px)`;
    });

  isDesktop$.subscribe((isDesktop) => {
    if (!isDesktop) window._sidebar.style.transform = '';
  });

  const opened$ = Observable::fromEvent(drawerEl, 'hy-drawer-transitioned')
    ::map(e => e.detail)
    ::tap((opened) => { window._sidebar.style.willChange = opened ? 'transform' : ''; })
    ::share();

  // TODO
  if (!isMobile) {
    Observable::fromEvent(document, 'scroll', { passive: true })
      ::subscribeWhen(opened$)
      .subscribe(() => {
        if (window._drawer.opened) { // extra check, because scroll can fire multiple times
          window._drawer.close();
        }
      });
  }

  // Close the drawer on popstate, i.e. the back button.
  Observable::fromEvent(window, 'popstate', { passive: true })
    ::subscribeWhen(opened$)
    .subscribe(() => { window._drawer.close(); });

  const scrollTop = window.pageYOffset || document.body.scrollTop;

  // Start the drawer in `opened` state when the cover class is present,
  // and the user hasn't started scrolling already.
  const opened = drawerEl.classList.contains('cover') && scrollTop <= 0;

  // Now we create the component.
  // If we have Custom Elements and ShadowDOM (v1) we use the web component.
  window._drawer = 'customElements' in window && 'attachShadow' in Element.prototype ?
    setupWebComponent(drawerEl, opened) :
    setupVanilla(drawerEl, opened);

  // Keeping the draw range updated.
  range$.subscribe((range) => { window._drawer.range = range; });

  // TODO
  drawerEl.classList.add('loaded');

  // The drawer width was `100vh` before JS gets loaded, now it is set to 0,
  // so we remove `innerHeight` from the old scroll position to keep the position constant.
  if (drawerEl.classList.contains('cover')) {
    window.scrollTo(0, scrollTop - window.innerHeight);
  }
}
