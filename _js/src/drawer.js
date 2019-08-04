// Copyright (c) 2019 Florian Klampfer <https://qwtel.com/>
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

import { fromEvent, merge, NEVER } from "rxjs";
import { distinctUntilChanged, map, share, startWith, switchMap, tap, throttleTime, withLatestFrom } from "rxjs/operators";

import { hasFeatures, isSafari, isFirefox, isMobile, isMobileSafari, isUCBrowser, hasCSSOM, webComponentsReady, getScrollTop } from "./common";

// A list of Modernizr tests that are required for the drawer to work.
const REQUIREMENTS = new Set([
  // ...WEBCOMPONENT_FEATURE_TESTS,
  "cssremunit",
  "classlist",
  "customproperties",
  "eventlistener",
  "matchmedia"
]);

// NOTE: Duplicated values from `_sass_/variables.scss`.
const CONTENT_WIDTH_5 = 48;
const CONTENT_MARGIN_5 = 4;
const BREAK_POINT_3 = '(min-width: 64em)';
const BREAK_POINT_DYNAMIC = '(min-width: 1666px)';

const DRAWER_WIDTH = 21;
const R_28 = CONTENT_WIDTH_5 / 2 + CONTENT_MARGIN_5;

const MOBILE = 1;
const DESKTOP = 2;
const LARGE_DESKTOP = 3;

const body = document.body || document.documentElement
const rem = () => parseFloat(getComputedStyle(body).fontSize);
const getWidth = () => window.innerWidth || body.clientWidth

const calcDrawerWidth = () => DRAWER_WIDTH * rem()
const calcDrawerWidthDynamic = () => body.clientWidth / 2 - R_28 * rem();

const subscribeWhen = p$ => source => {
  if (process.env.DEBUG && !p$) throw Error();
  return p$.pipe(switchMap(p => (p ? source : NEVER)));
};

// Determines the range from which to draw the drawer in pixels, counted from the left edge.
// It depends on the browser, e.g. Safari has a native gesture when sliding form the side,
// so we ignore the first 35 pixels (roughly the range for the native gesture).
function getRange(drawerWidth, size) {
  if (size >= DESKTOP) return [0, drawerWidth];
  if (isMobileSafari && !navigator.standalone) return [35, 150];
  return [0, 150];
}

// This function sets y-drawer up as a WebComponent.
// First it sets the options as HTML attributes, then it `define`s the WebComponent.
function updateAttributes(el, opened) {
  if (opened) el.setAttribute("opened", "");
  if (isSafari) el.setAttribute("threshold", 0);
  if (!isMobile) el.setAttribute("mouse-events", "");
}

// The functions below add an svg graphic to the sidebar
// that incidate that the sidebar can be drawn using touch gestures.
function setupIcon() {
  const img = document.getElementById('_hrefSwipeSVG');
  if (img) {
    const svg = document.createElement('img');
    svg.id = '_swipe';
    svg.src = img.href;
    svg.alt = 'Swipe image';
    svg.addEventListener('click', () => window._drawer.close());
    document.getElementById('_sidebar').appendChild(svg);
  }
}

function removeIcon() {
  const svg = document.getElementById('_swipe');
  if (svg) svg.parentNode.removeChild(svg);
}

const detectSize = () => window.matchMedia(BREAK_POINT_DYNAMIC).matches
  ? LARGE_DESKTOP
  : window.matchMedia(BREAK_POINT_3).matches
    ? DESKTOP
    : MOBILE

// Note that the UC Browser has even more invasive native swipe gestures than iOS Safari,
// so we disable the component alltogether.
if (!window._noDrawer && hasFeatures(REQUIREMENTS) && !isUCBrowser) {
  (async () => {
    await webComponentsReady;

    // First we get hold of some DOM elements.
    const drawerEl = document.getElementsByTagName("hy-drawer")[0];
    const sidebarEl = document.getElementById("_sidebar");
    const contentEl = sidebarEl.querySelector(".sidebar-sticky");

    const [tValue, oValue] = !hasCSSOM ? [null, null] : [
      new CSSTransformValue([new CSSTranslate(CSS.px(0), CSS.px(0))]),
      CSS.number(1),
    ];

    const updateSidebar = (t, size, distance) => {
      const value = distance * t;
      const opacity = size >= DESKTOP ? 1 : 1 - t;
      if (hasCSSOM) {
        tValue[0].x.value = value;
        oValue.value = opacity;
        sidebarEl.attributeStyleMap.set("transform", tValue);
        contentEl.attributeStyleMap.set("opacity", oValue);
      } else {
        sidebarEl.style.transform = `translateX(${value}px)`;
        contentEl.style.opacity = opacity;
      }
    }

    // HACK: replace with something more robust. do we even need this?
    const cssLoaded = new Promise(function checkCSS(res, rej, retries = 0) {
      if (getComputedStyle(drawerEl).getPropertyValue("--hy-drawer-width")) res();
      else if (retires > 3) rej()
      else setTimeout(() => checkCSS(res, rej, retries + 1), 300);
    });

    await cssLoaded;

    // A flag for the 3 major viewport sizes we support
    const size$ = fromEvent(window, 'resize').pipe(
      startWith({}),
      map(detectSize),
    );

    // An observable keeping track of the drawer width.
    const drawerWidth$ = size$.pipe(
      map(size => {
        switch (size) {
          case LARGE_DESKTOP: return calcDrawerWidthDynamic();
          case DESKTOP: return calcDrawerWidth();
          case MOBILE: return 0.5 * rem();
        }
      }),
    );

    // An observable keeping track of the distance between
    // the middle point of the screen and the middle point of the drawer.
    const distance$ = drawerWidth$.pipe(
      map((drawerWidth) => getWidth() / 2 - drawerWidth / 2),
    );

    const t$ = merge(
      distance$.pipe(map(() => {
        const t = drawerEl.opacity !== undefined
          ? 1 - drawerEl.opacity
          : opened ? 0 : 1;
        return t;
      })),
      fromEvent(drawerEl, 'move').pipe(map(({ detail: { opacity } }) => {
        return 1 - opacity;
      })),
    );

    drawerEl.addEventListener("prepare", () => {
      sidebarEl.style.willChange = "transform";
      contentEl.style.willChange = "opacity";
    });

    drawerEl.addEventListener("transitioned", () => {
      sidebarEl.style.willChange = "";
      contentEl.style.willChange = "";
    });

    const opened$ = fromEvent(drawerEl, "transitioned").pipe(
      map(e => e.detail),
      distinctUntilChanged(),
      tap(opened => {
        if (!opened) {
          removeIcon();
          if (!history.state) history.replaceState({}, document.title);
          history.state.closedOnce = true;
        }
      }),
    );

    // Save scroll position before the drawer gets initialized.
    const scrollTop = getScrollTop()

    // Start the drawer in `opened` state when the cover class is present,
    // and the user hasn't started scrolling already.
    const opened =
      drawerEl.classList.contains("cover") &&
      scrollTop <= 0 &&
      !(history.state && history.state.closedOnce);

    if (!opened) {
      if (!history.state) history.replaceState({}, document.title);
      history.state.closedOnce = true;
    }

    // We need the height of the drawer in case we need to reset the scroll position
    const drawerHeight = opened
      ? null
      : drawerEl.getBoundingClientRect().height;

    drawerEl.addEventListener("init", () => {
      setupIcon();

      drawerEl.classList.add("loaded");

      if (drawerHeight && scrollTop >= drawerHeight) {
        window.scrollTo(0, scrollTop - drawerHeight);
      }
    }, { once: true });

    updateAttributes(drawerEl, opened);

    await import(/* webpackMode: "eager" */ "hy-drawer/lib");

    window._drawer = drawerEl;

    t$.pipe(withLatestFrom(size$, distance$)).subscribe(([t, size, distance]) => {
      updateSidebar(t, size, distance)
    });

    // Keeping the drawer updated.
    drawerWidth$.pipe(
      withLatestFrom(size$),
      map((args) => getRange(...args)),
    ).subscribe(range => (drawerEl.range = range));

    // Hacky way of letting the cover page close when scrolling
    fromEvent(document, "wheel", { passive: false })
      .pipe(
        subscribeWhen(opened$),
        tap(e => {
          if (drawerEl.translateX > 0) e.preventDefault();
        }),
        throttleTime(500),
      )
      .subscribe(() => drawerEl.close());
  })();
}
