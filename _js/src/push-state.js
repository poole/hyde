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

import { fromEvent, merge, timer, zip } from "rxjs";
import { tap, exhaustMap, map, mapTo, mergeMap, pairwise, share, startWith, switchMap, takeUntil } from "rxjs/operators";

import { animate, empty, importTemplate, webComponentsReady } from "./common";
import { CrossFader } from "./cross-fader";
import { setupFLIP } from "./flip";

(async () => {
  if ('prepend' in Element.prototype) {} else {
    await import(/* webpackChunkName: "dom4" */ "./polyfills/dom4");
  }
  await Promise.all([
    ...'customElements' in window ? [] : [
      import(/* webpackChunkName: "webcomponents" */ "./polyfills/webcomponents"),
    ],
    ...'fetch' in window ? [] : [
      import(/* webpackChunkName: "fetch" */ "./polyfills/fetch"),
    ],
    ...'animate' in Element.prototype ? [] : [
      import(/* webpackChunkName: "webanimations" */ "./polyfills/webanimations"),
    ],
    ...'IntersectionObserver' in window ? [] : [
      import(/* webpackChunkName: "intersection-observer" */ "./polyfills/intersection-observer"),
    ],
    ...'scrollBehavior' in document.body.style ? [] : [
      import(/* webpackChunkName: "smoothscroll" */ './polyfills/smoothscroll'),
    ],
  ]);

  await webComponentsReady;

  const NAVBAR_SEL = "#_navbar > .content > .nav-btn-bar";
  const CANONICAL_SEL = "link[rel=canonical]";
  const META_DESC_SEL = "meta[name=description]";
  const FN_SEL = "li[id^='fn:']";
  const FN_LINK_SEL = "a[href^='#fn:']";
  const HORIZONTAL_SCROLL_SEL = 'pre, table:not(.highlight), .katex-display, .break-layout';

  const DURATION = 350;

  const FADE_DURATION = 2000;

  const FADE_OUT = [{ opacity: 1 }, { opacity: 0 }];

  const FADE_IN = [
    { opacity: 0, transform: "translateY(-3rem)" },
    { opacity: 1, transform: "translateY(0)" }
  ];

  const SETTINGS = {
    duration: DURATION,
    easing: "ease-out",
    fill: "forwards"
  };

  const HEADING_SELECTOR = "h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]";

  function upgradeHeading(h) {
    const df = importTemplate("_permalink-template");
    const a = df.querySelector(".permalink");
    requestAnimationFrame(() => ((a.href = `#${h.id}`), h.appendChild(df)));
  }

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

  function getFlipType(el) {
    if (!el || !el.classList) return null;
    if (el.classList.contains("flip-title")) return "title";
    if (el.classList.contains("flip-project")) return "project";
    return el.getAttribute && el.getAttribute("data-flip");
  }

  function animateFadeOut({ main }, drawerEl) {
    const anim$ = animate(main, FADE_OUT, SETTINGS).pipe(mapTo({ main }));
    return anim$;
  }

  function animateFadeIn({ replaceEls: [main], flipType }) {
    return animate(main, FADE_IN, SETTINGS).pipe(mapTo({ main, flipType }));
  }

  const isStandalone =
    !!navigator.standalone ||
    window.matchMedia("(display-mode: standalone)").matches;

  const pushStateEl = document.getElementsByTagName("hy-push-state")[0];
  const drawerEl = document.getElementsByTagName("hy-drawer")[0];
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

  const start$ = fromEvent(pushStateEl, "start").pipe(
    map(({ detail }) => Object.assign(detail, { flipType: getFlipType(detail.anchor) })),
    share()
  );

  const ready$ = fromEvent(pushStateEl, "ready").pipe(
    map(({ detail }) => detail),
    share()
  );

  const after$ = fromEvent(pushStateEl, "after").pipe(
    map(({ detail }) => detail),
    share()
  );

  const progress$ = fromEvent(pushStateEl, "progress").pipe(
    map(({ detail }) => detail),
    share()
  );

  const error$ = fromEvent(pushStateEl, "networkerror").pipe(
    map(({ detail }) => detail),
    share()
  );

  const fadeOut$ = start$.pipe(
    map(context => Object.assign(context, { main: document.getElementById("_main") })),
    tap(({ main }) => (main.style.pointerEvents = "none")),
    exhaustMap(ctx => animateFadeOut(ctx, drawerEl)),

    tap(({ main }) => empty.call(main)),
    share()
  );

  progress$.subscribe(() => (loading.style.display = "block"));

  ready$
    .pipe(startWith({ replaceEls: [document.getElementById("_main")] }))
    .subscribe(({ replaceEls: [main] }) => {
      main.classList.remove("fade-in");
      main.querySelectorAll(HEADING_SELECTOR).forEach(upgradeHeading)

      loading.style.display = "none"

      /*
      requestIdleCallback(() => {
        main.querySelectorAll(pushStateEl.linkSelector).forEach(anchor => {
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

      main.querySelectorAll(FN_SEL).forEach(li => (li.tabIndex = 0));

      main.querySelectorAll(FN_LINK_SEL).forEach(a =>
        a.addEventListener("click", e =>
          document.getElementById(e.currentTarget.hash.substr(1)).focus()
        )
      );

      main.querySelectorAll(HORIZONTAL_SCROLL_SEL).forEach(el => 
        el.addEventListener('touchstart', e => el.scrollLeft > 0 && e.stopPropagation(), { passive: false })
      );
    });

  const fadeIn$ = after$.pipe(
    switchMap(animateFadeIn),
    share()
  );

  const flip$ = setupFLIP(start$, ready$, merge(fadeIn$, error$), {
    animationMain,
    settings: SETTINGS
  }).pipe(share());

  start$.pipe(switchMap(context => {
    const promise = zip(timer(DURATION), fadeOut$, flip$).toPromise();
    context.transitionUntil(promise);
    return promise;
  }))
    .subscribe();

  // FIXME: Keeping permanent subscription? turn into hot observable?
  fadeOut$.subscribe();
  flip$.subscribe();

  const crossFader = new CrossFader(FADE_DURATION);

  after$
    .pipe(
      switchMap(({ replaceEls: [main] }) =>
        zip(crossFader.fetchImage(main), fadeIn$, x => x).pipe(
          takeUntil(start$)
        )
      ),
      startWith([document.querySelector(".sidebar-bg")]),
      pairwise(),
      mergeMap(([prev, curr]) => crossFader.fade(prev, curr))
    )
    .subscribe();

  fadeIn$.subscribe();

  error$.pipe(switchMap(({ url }) => {
    loading.style.display = "none";

    const main = document.getElementById("_main");
    main.style.pointerEvents = "";
    empty.call(animationMain.querySelector(".page"));
    empty.call(main);

    setupErrorPage(main, url);

    return animate(main, FADE_IN, SETTINGS);
  }))
    .subscribe();

  import(/* webpackMode: "eager" */ 'hy-push-state/lib');

  window._pushState = pushStateEl;
})();
