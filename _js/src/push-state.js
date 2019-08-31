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

// ## Overview
// This file sets up the hy-push-state component,
// which is responsible for dynimically changing the content when users click on links.
// However, the component only handles changing the content.
// Animating it, responding to errors and showing loading spinners is still up to us,
// which is the purpose of this file.

// ## Includes
// We include our main component, hy-push-state,
// in both the vanilla JS and the WebComponent version (will decide later which one to use).
// Since they share most of their code, it's not a big deal in terms of file size.
import {
  HyPushStateElement,
  WEBCOMPONENT_FEATURE_TESTS,
  Set
} from "hy-push-state/src/webcomponent";

import { fromEvent, merge, timer, zip } from "rxjs";
import {
  tap,
  exhaustMap,
  map,
  mapTo,
  mergeMap,
  pairwise,
  share,
  startWith,
  switchMap,
  take,
  takeUntil
} from "rxjs/operators";

// Some of our own helper functions and classes.
import {
  animate,
  empty,
  hasFeatures,
  isFirefoxIOS,
  importTemplate,
  webComponentsReady
} from "./common";
import { CrossFader } from "./cross-fader";
import { upgradeMathBlocks } from "./katex";
import { setupFLIP } from "./flip";

// ## Constants
// A list of Modernizr feature tests that are required for the push state feature to work.
const REQUIREMENTS = new Set([
  ...WEBCOMPONENT_FEATURE_TESTS,
  "classlist",
  "cssanimations",
  "cssremunit",
  "documentfragment",
  "eventlistener",
  "history",
  "matchmedia",
  "opacity",
  "queryselector",
  "requestanimationframe"
]);

const NAVBAR_SEL = "#_navbar > .content > .nav-btn-bar";
const CANONICAL_SEL = "link[rel=canonical]";
const META_DESC_SEL = "meta[name=description]";
const FN_SEL = "li[id^='fn:']";
const FN_LINK_SEL = "a[href^='#fn:']";

// TODO:
const DURATION = 350;

// Duration of cross-fading the sidebar background images.
const FADE_DURATION = 2000;

// Details of the fade-out animation.
const FADE_OUT = [{ opacity: 1 }, { opacity: 0 }];

// Details of the fade-in animation.
const FADE_IN = [
  { opacity: 0, transform: "translateY(-3rem)" },
  { opacity: 1, transform: "translateY(0)" }
];

// Settings as passed to the WebAnimations API.
const SETTINGS = {
  duration: DURATION,
  easing: "ease-out",
  fill: "forwards"
};

// A CSS selector for headlines with ids.
const HEADING_SELECTOR = "h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]";

// ## Functions
// Takes a heading and adds a "#" link for permalinks:
function upgradeHeading(h) {
  const df = importTemplate("_permalink-template");
  const a = df.querySelector(".permalink");
  requestAnimationFrame(() => ((a.href = `#${h.id}`), h.appendChild(df)));
}

// Set up the DOM elements:
function setupAnimationMain(pushStateEl) {
  const animationMain = importTemplate("_animation-template");
  pushStateEl.parentNode.insertBefore(animationMain, pushStateEl);
  return pushStateEl.previousElementSibling;
}

function setupLoading(navbarEl) {
  const loading = importTemplate("_loading-template");
  navbarEl.appendChild(loading);
  return navbarEl.lastElementChild;
}

function setupErrorPage(main, { pathname }) {
  const error = importTemplate("_error-template");
  const anchor = error.querySelector(".this-link");
  if (anchor) {
    anchor.href = pathname;
    anchor.textContent = pathname;
  }
  main.appendChild(error);
  return main.lastElementChild;
}

function setupButton(parent, templateId, clickFn) {
  const button = importTemplate(templateId);
  button.querySelector(".nav-btn").addEventListener("click", clickFn);
  parent.appendChild(button);
  return parent.lastElementChild;
}

// Get the FLIP type (currently 'title' or 'project') from an element.
function getFlipType(el) {
  if (!el || !el.classList) return null;
  if (el.classList.contains("flip-title")) return "title";
  if (el.classList.contains("flip-project")) return "project";
  return el.getAttribute && el.getAttribute("data-flip");
}

function animateFadeOut({ type, main }) {
  const anim$ = animate(main, FADE_OUT, SETTINGS).pipe(mapTo({ main }));

  if (window._drawer && window._drawer.opened) {
    window._drawer.close();
    return zip(
      anim$,
      fromEvent(window._drawer.el, "hy-drawer-transitioned").pipe(take(1)),
      x => x
    );
  }

  return anim$;
}

function animateFadeIn({ type, replaceEls: [main], flipType }) {
  return animate(main, FADE_IN, SETTINGS).pipe(mapTo({ main, flipType }));
}

// Before we register the WebComponent with the DOM, we set essential properties,
// some of which depend on browser, standalone mode, etc...
function defineWebComponent(pushStateEl) {
  window.customElements.define("hy-push-state", HyPushStateElement);
  return pushStateEl;
}

// ## Main
// First, we determine if push state is enabled,
// and if the current user agent meets our requirements.
if (!window._noPushState && hasFeatures(REQUIREMENTS) && !isFirefoxIOS) {
  webComponentsReady.then(() => {
    // ### Setup
    // We save some variables and setup the DOM:
    const isStandalone =
      !!navigator.standalone ||
      window.matchMedia("(display-mode: standalone)").matches;

    const pushStateEl = document.getElementsByTagName("hy-push-state")[0];
    const navbarEl = document.querySelector(NAVBAR_SEL);
    const canonicalEl = document.querySelector(CANONICAL_SEL);
    const metaDescEl = document.querySelector(META_DESC_SEL);

    const animationMain = setupAnimationMain(pushStateEl);
    const loading = setupLoading(navbarEl);

    if (isStandalone) {
      setupButton(navbarEl, "_back-template", () => window.history.back());
      setupButton(navbarEl, "_forward-template", () =>
        window.history.forward()
      );
    }

    // Setting up the basic event observables.
    // In case of a start event we also add the `flipType` to the context,
    // so that we can use filter based on it later.
    const start$ = fromEvent(pushStateEl, "hy-push-state-start").pipe(
      map(({ detail }) =>
        Object.assign(detail, { flipType: getFlipType(detail.anchor) })
      ),
      share()
    );

    const ready$ = fromEvent(pushStateEl, "hy-push-state-ready").pipe(
      map(({ detail }) => detail),
      share()
    );

    const after$ = fromEvent(pushStateEl, "hy-push-state-after").pipe(
      map(({ detail }) => detail),
      share()
    );

    const progress$ = fromEvent(pushStateEl, "hy-push-state-progress").pipe(
      map(({ detail }) => detail),
      share()
    );

    const error$ = fromEvent(pushStateEl, "hy-push-state-networkerror").pipe(
      map(({ detail }) => detail),
      share()
    );

    // ### Fade main content out
    // A `start` occurs immediately after a user clicks on a link.
    // First we get a hold fo the current content.
    // TODO: Change hy-push-state to provide this as part of the event?
    const fadeOut$ = start$.pipe(
      map(context =>
        Object.assign(context, { main: document.getElementById("_main") })
      ),

      tap(({ main }) => (main.style.pointerEvents = "none")),

      // We don't want new animations to cancel the one currently in progress, so we use `exhaustMap`.
      // If we don't animate (i.e. `popstate` event in Safari) we just return `main`.
      exhaustMap(animateFadeOut),

      // After the animation is complete, we empty the current content and scroll to the top.
      tap(({ main }) => empty.call(main)),
      share()
    );

    // ### Show loading spinner
    // Show loading spinner --- but only when fetching takes longer than `DURATION`.
    progress$.subscribe(() => (loading.style.display = "block"));

    // ### Prepare showing the new content
    // The `ready` event occurs when we've received the content from the server
    // and it is parsed as a document fragment, but before we add it to the DOM.
    // This is were we can make some changes to the content without triggering repaints.
    ready$
      .pipe(startWith({ replaceEls: [document.getElementById("_main")] }))
      .subscribe(({ replaceEls: [main] }) => {
        main.classList.remove("fade-in");

        // FIXME: does `requestAnimationFrame` make sense here?
        requestAnimationFrame(() => (loading.style.display = "none"));

        // FIXME: put on idlecallback scheduler?
        requestIdleCallback(() =>
          Array.from(main.querySelectorAll(HEADING_SELECTOR)).forEach(
            upgradeHeading
          )
        );

        /*
        requestIdleCallback(() => {
          Array.from(main.querySelectorAll(pushStateEl.linkSelector)).forEach(anchor => {
            caches.match(anchor.href).then(m => {
              if (m) requestAnimationFrame(() => anchor.classList.add("visited"));
            });
          });
        });
        */
      });

    after$
      .pipe(
        startWith({
          replaceEls: [document.getElementById("_main")],
          documentFragment: document
        })
      )
      .subscribe(({ replaceEls: [main], documentFragment }) => {
        const cEl = documentFragment.querySelector(CANONICAL_SEL);
        if (canonicalEl && cEl) canonicalEl.href = cEl.href;

        const mEl = documentFragment.querySelector(META_DESC_SEL);
        if (metaDescEl && mEl) metaDescEl.content = mEl.content;

        Array.from(main.querySelectorAll(FN_SEL)).forEach(
          li => (li.tabIndex = 0)
        );

        Array.from(main.querySelectorAll(FN_LINK_SEL)).forEach(a =>
          a.addEventListener("click", e =>
            document.getElementById(e.currentTarget.hash.substr(1)).focus()
          )
        );
      });

    // ### Fade new content in
    // `after` new content is added to the DOM, start animating it.
    const fadeIn$ = after$.pipe(
      switchMap(animateFadeIn),
      share()
    );

    // In addition to fading the main content out,
    // there's also a FLIP animation playing when clicking certain links.
    // We set it up here because FLIP animation may do extra work after a `fadeIn` and/or cleanup
    // work when an error occurs.
    const flip$ = setupFLIP(start$, ready$, merge(fadeIn$, error$), {
      animationMain,
      settings: SETTINGS
    }).pipe(share());

    start$
      .pipe(
        switchMap(context => {
          const promise = zip(timer(DURATION), fadeOut$, flip$).toPromise();
          context.transitionUntil(promise);
          return promise;
        })
      )
      .subscribe();

    // FIXME: Keeping permanent subscription? turn into hot observable?
    fadeOut$.subscribe();
    flip$.subscribe();

    // ### Cross-fade the sidebar image
    // The cross fader has some internal state, i.e. it keeps track of DOM nodes,
    // so it is implemented as a class.
    const crossFader = new CrossFader(FADE_DURATION);

    // There is no point in swapping out the image while it is still loading, so we only start
    // fetching the sidebar image `after` the new content was added to the DOM.
    // However, we also want to gurantee that we don't start cross-fading the image
    // while the fade-in animation is still playing, so we wait for `fadeIn`.
    // Also, we want to abort fetching the image whne the user has already `start`ed another request.
    // TODO: Maybe only abort `after` it becomes clear that the new site
    // is using a different background image?
    after$
      .pipe(
        switchMap(({ replaceEls: [main] }) =>
          zip(crossFader.fetchImage(main), fadeIn$, x => x).pipe(
            takeUntil(start$)
          )
        ),

        // Once we have both images, we take them `pairwise` and cross-fade.
        // We start with the initial sidebar image, which was part of HTML content.
        // Here we use `mergeMap`, because in edge cases there could be 3 or more images
        // being faded at the same time, but there is no reason to cancel the old ones.
        startWith([document.querySelector(".sidebar-bg")]),
        pairwise(),
        mergeMap(([prev, curr]) => crossFader.fade(prev, curr))
      )
      .subscribe();

    // ### Upgrade math blocks
    // Once the content is faded in, upgrade the math blocks with KaTeX.
    // This can take a while and will trigger multiple repaints,
    // so we don't want to start until after the animation.
    fadeIn$.subscribe(() => upgradeMathBlocks());

    // ### Show error page
    // In case of a network error, we don't want to show the browser's default offline page.
    error$
      .pipe(
        switchMap(({ url }) => {
          loading.style.display = "none";

          const main = document.getElementById("_main");
          main.style.pointerEvents = "";
          empty.call(animationMain.querySelector(".page"));
          empty.call(main);

          setupErrorPage(main, url);

          return animate(main, FADE_IN, SETTINGS);
        })
      )
      .subscribe();

    // ### Create the component
    // If we have Custom Elements, use the WebComponent (it doesn't use ShadowDOM, so we are fine),
    // otherwise use the vanilla JS version.
    window._pushState = defineWebComponent(pushStateEl);
  });
}
