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

import ResizeObserver from "resize-observer-polyfill";

import {
  HyDrawerElement,
  WEBCOMPONENT_FEATURE_TESTS,
  Set
} from "hy-drawer/src/webcomponent";
import { createXObservable } from "hy-component/src/rxjs";

import { Observable, fromEvent, NEVER } from "rxjs";
import {
  distinctUntilChanged,
  map,
  share,
  skip,
  startWith,
  switchMap,
  tap,
  throttleTime,
  withLatestFrom
} from "rxjs/operators";

import {
  hasFeatures,
  isSafari,
  isFirefox,
  isMobile,
  isMobileSafari,
  isUCBrowser,
  hasCSSOM,
  webComponentsReady
} from "./common";

// A list of Modernizr tests that are required for the drawer to work.
const REQUIREMENTS = new Set([
  ...WEBCOMPONENT_FEATURE_TESTS,
  "cssremunit",
  "classlist",
  "customproperties",
  "eventlistener",
  "matchmedia"
]);

// NOTE: Duplicated values from `_sass_/variables.scss`.
const CONTENT_WIDTH_5 = 48;
const CONTENT_MARGIN_5 = 4;
const BREAK_POINT_3 = "(min-width: 64em)";
const BREAK_POINT_DYNAMIC = "(min-width: 1666px)";

const DRAWER_WIDTH = 21;
const R_28 = CONTENT_WIDTH_5 / 2 + CONTENT_MARGIN_5;

const MOBILE = 1;
const DESKTOP = 2;
const LARGE_DESKTOP = 3;

function rem() {
  return parseFloat(getComputedStyle(document.documentElement).fontSize);
}

function calcDrawerWidth() {
  return DRAWER_WIDTH * rem();
}

function calcDrawerWidthDynamic() {
  return document.body.clientWidth / 2 - R_28 * rem();
}

const subscribeWhen = p$ => source => {
  if (process.env.DEBUG && !p$) throw Error();
  return p$.pipe(switchMap(p => (p ? source : NEVER)));
};

// Determins the range from which to draw the drawer in pixels, counted from the left edge.
// It depends on the browser, e.g. Safari has a native guesture when sliding form the side,
// so we ignore the first 35 pixels (roughly the range for the native guesture).
function getRange() {
  if (isMobileSafari && !navigator.standalone) return [35, 150];
  return [0, 150];
}

// This function sets y-drawer up as a WebComponent.
// First it sets the options as HTML attributes, then it `define`s the WebComponent.
function defineWebComponent(el, opened) {
  if (opened) el.setAttribute("opened", "");
  if (isSafari) el.setAttribute("threshold", 0);
  if (!isMobile) el.setAttribute("mouse-events", "");
  if (isFirefox) el.removeAttribute("prevent-default"); // ignored by ff anyway
  window.customElements.define("hy-drawer", HyDrawerElement);
  return el;
}

// The functions below add an svg graphic to the sidebar
// that incidate that the sidebar can be drawn using touch gestures.
function setupIcon() {
  const img = document.getElementById("_hrefSwipeSVG");
  if (img) {
    const svg = document.createElement("img");
    svg.id = "_swipe";
    svg.src = img.href;
    svg.alt = "Swipe image";
    svg.addEventListener("click", () => window._drawer.close());
    document.getElementById("_sidebar").appendChild(svg);
  }
}

function removeIcon() {
  const svg = document.getElementById("_swipe");
  if (svg) svg.parentNode.removeChild(svg);
}

// Note that the UC Browser has even more invasive native swipe gestures than iOS Safari,
// so we disable the component alltogether.
if (!window._noDrawer && hasFeatures(REQUIREMENTS) && !isUCBrowser) {
  webComponentsReady.then(() => {
    // First we get hold of some DOM elements.
    const drawerEl = document.getElementsByTagName("hy-drawer")[0];
    const menuEl = document.getElementById("_menu");
    const sidebar = document.getElementById("_sidebar");
    const content = document.querySelector(".sidebar-sticky");

    function setupDrawer() {
      const size$ = createXObservable(ResizeObserver)(drawerEl).pipe(
        map(() =>
          window.matchMedia(BREAK_POINT_DYNAMIC).matches
            ? LARGE_DESKTOP
            : window.matchMedia(BREAK_POINT_3).matches
            ? DESKTOP
            : MOBILE
        ),
        share(),
        startWith(
          window.matchMedia(BREAK_POINT_DYNAMIC).matches
            ? LARGE_DESKTOP
            : window.matchMedia(BREAK_POINT_3).matches
            ? DESKTOP
            : MOBILE
        )
      );

      // An observable keeping track of the drawer width.
      const drawerWidth$ = size$.pipe(
        map(size =>
          size >= LARGE_DESKTOP ? calcDrawerWidthDynamic() : calcDrawerWidth()
        )
      );

      // An observable keeping track of the distance between
      // the middle point of the screen and the middle point of the drawer.
      const dist$ = drawerWidth$.pipe(
        withLatestFrom(size$),
        map(([drawerWidth, s]) =>
          s >= DESKTOP
            ? document.body.clientWidth / 2 - drawerWidth / 2
            : document.body.clientWidth / 2
        )
      );

      // An observable that keeps track of the range from where the drawer can be drawn.
      // Should be between 0 and the drawer's width on desktop; `getRange` on mobile.
      const range$ = drawerWidth$.pipe(
        withLatestFrom(size$),
        map(([drawerWidth, size]) =>
          size >= DESKTOP ? [0, drawerWidth] : getRange()
        )
      );

      // Sliding the drawer's content between the middle point of the screen,
      // and the middle point of the drawer when closed.
      Observable.create(
        observer => (drawerEl.moveCallback = x => observer.next(x))
      )
        .pipe(withLatestFrom(dist$, size$))
        .subscribe(([{ opacity }, dist, size]) =>
          updateSidebar(size >= DESKTOP, dist, opacity)
        );

      // Setting `will-change` at the beginning of an interaction, and remove at the end.
      drawerEl.addEventListener("hy-drawer-prepare", () => {
        if (hasCSSOM) {
          sidebar.attributeStyleMap.set("will-change", "transform");
          content.attributeStyleMap.set("will-change", "opacity");
        } else {
          sidebar.style.willChange = "transform";
          content.style.willChange = "opacity";
        }
      });

      drawerEl.addEventListener("hy-drawer-transitioned", () => {
        if (hasCSSOM) {
          sidebar.attributeStyleMap.delete("will-change");
          content.attributeStyleMap.delete("will-change");
        } else {
          sidebar.style.willChange = "";
          content.style.willChange = "";
        }
      });

      // Adding the click callback to the menu button.
      // Calling `preventDefault` in iOS Safari, because otherwise it's causing the navbar to appear,
      // which ruins the animation.
      menuEl.addEventListener("click", e => {
        if (isMobileSafari) e.preventDefault();
        window._drawer.toggle();
      });

      // Keeping track of the opened state.
      const opened$ = fromEvent(drawerEl, "hy-drawer-transitioned").pipe(
        map(e => e.detail),
        distinctUntilChanged(),
        tap(opened => {
          if (!opened) {
            removeIcon();
            if (!history.state) history.replaceState({}, document.title);
            history.state.closedOnce = true;
          }
        })
      );

      // Close the drawer on popstate, i.e. the back button.
      fromEvent(window, "popstate", { passive: true })
        .pipe(subscribeWhen(opened$))
        .subscribe(() => window._drawer.close());

      // Hacky way of letting the cover page close when scrolling
      fromEvent(document, "wheel", { passive: false })
        .pipe(
          subscribeWhen(opened$),
          tap(e => {
            if (drawerEl.translateX > 0) e.preventDefault();
          }),
          throttleTime(500)
        )
        .subscribe(() => window._drawer.close());

      // Save scroll position before the drawer gets initialized.
      const scrollTop = window.pageYOffset || document.body.scrollTop;

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

      // HACK: uuuugly
      drawerEl._peek$ = size$.pipe(
        map(size => {
          switch (size) {
            case LARGE_DESKTOP:
              return calcDrawerWidthDynamic();
            case DESKTOP:
              return calcDrawerWidth();
            case MOBILE:
              return 0.5 * rem();
          }
        })
      );

      // We need the height of the darwer in case we need to reset the scroll position
      const drawerHeight = opened
        ? null
        : drawerEl.getBoundingClientRect().height;

      drawerEl.addEventListener(
        "hy-drawer-init",
        () => {
          // Show the icon indicating that the drawer can be drawn using touch gestures.
          setupIcon();

          // Add a class to incidate that the drawer has been initialized.
          drawerEl.classList.add("loaded");

          // Compensating for the change in layout after the drawer gets initialized.
          if (drawerHeight && scrollTop >= drawerHeight) {
            window.scrollTo(0, scrollTop - drawerHeight);
          }
        },
        { once: true }
      );

      dist$
        .pipe(
          withLatestFrom(size$),
          skip(1)
        )
        .subscribe(([dist, size]) =>
          updateSidebar(
            size >= DESKTOP,
            dist,
            // HACK
            typeof drawerEl.opacity !== "undefined"
              ? drawerEl.opacity
              : opened
              ? 1
              : 0
          )
        );

      // Now we create the component.
      window._drawer = defineWebComponent(drawerEl, opened);

      // Keeping the drawer updated.
      range$.subscribe(range => (drawerEl.range = range));
    }

    const tvalue = hasCSSOM
      ? new CSSTransformValue([new CSSTranslate(CSS.px(0), CSS.px(0))])
      : null;

    function updateSidebar(isDesktop, dist, opacity) {
      const t = 1 - opacity;
      const value = dist * t;
      const opacityCSS = isDesktop ? 1 : opacity;
      if (hasCSSOM) {
        tvalue[0].x.value = value;
        sidebar.attributeStyleMap.set("transform", tvalue);
        content.attributeStyleMap.set("opacity", opacityCSS);
      } else {
        sidebar.style.transform = `translateX(${value}px)`;
        content.style.opacity = opacityCSS;
      }
    }

    // HACK: Working around a quirk in webkit that sometomes causes
    //       JS to execute before the CSS is loaded.
    (function isCSSLoaded() {
      if (getComputedStyle(drawerEl).getPropertyValue("--hy-drawer-width")) {
        setupDrawer();
      } else {
        setTimeout(isCSSLoaded, 300);
      }
    })();
  });
}
