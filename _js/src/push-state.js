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

import { fromEvent, merge, timer, zip } from 'rxjs';
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
  takeUntil,
} from 'rxjs/operators';

import { animate, empty, importTemplate, webComponentsReady } from './common';
import { CrossFader } from './cross-fader';
import { setupFLIP } from './flip';

(async () => {
  await Promise.all([
    ...('fetch' in window ? [] : [import(/* webpackChunkName: "fetch" */ './polyfills/fetch')]),
    ...('customElements' in window
      ? []
      : [import(/* webpackChunkName: "webcomponents" */ './polyfills/webcomponents')]),
    ...('animate' in Element.prototype ? [] : [import(/* webpackChunkName: "webanimations" */ 'web-animations-js')]),
    ...('IntersectionObserver' in window
      ? []
      : [import(/* webpackChunkName: "intersection-observer" */ 'intersection-observer')]),
  ]);

  await webComponentsReady;

  const NAVBAR_SEL = '#_navbar > .content > .nav-btn-bar';
  const CANONICAL_SEL = 'link[rel=canonical]';
  const META_DESC_SEL = 'meta[name=description]';
  const FN_SEL = "li[id^='fn:']";
  const FN_LINK_SEL = "a[href^='#fn:']";
  const HORIZONTAL_SCROLL_SEL = 'pre, table:not(.highlight), .katex-display, .break-layout';
  const CODE_BLOCK_SEL = 'pre.highlight > code';
  const CODE_TITLE_REX = /(?:title|file):\s*['"`](.*)['"`]/i;

  const DURATION = 350;

  const FADE_DURATION = 2000;

  const FADE_OUT = [{ opacity: 1 }, { opacity: 0 }];

  const FADE_IN = [
    { opacity: 0, transform: 'translateY(-3rem)' },
    { opacity: 1, transform: 'translateY(0)' },
  ];

  const SETTINGS = {
    duration: DURATION,
    easing: 'ease-out',
  };

  const HEADING_SELECTOR = 'h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]';

  function upgradeHeading(h) {
    const df = importTemplate('_permalink-template');
    const a = df.querySelector('.permalink');
    requestAnimationFrame(() => ((a.href = `#${h.id}`), h.appendChild(df)));
  }

  function setupAnimationMain(pushStateEl) {
    const animationMain = importTemplate('_animation-template');
    pushStateEl.parentNode.insertBefore(animationMain, pushStateEl);
    return pushStateEl.previousElementSibling;
  }

  function setupLoading(navbarEl) {
    const loading = importTemplate('_loading-template');
    navbarEl.appendChild(loading);
    return navbarEl.lastElementChild;
  }

  function setupErrorPage(main, { pathname }) {
    const error = importTemplate('_error-template');
    const anchor = error.querySelector('.this-link');
    if (anchor) {
      anchor.href = pathname;
      anchor.textContent = pathname;
    }
    main.appendChild(error);
    return main.lastElementChild;
  }

  function setupButton(parent, templateId, clickFn) {
    const button = importTemplate(templateId);
    button.querySelector('.nav-btn').addEventListener('click', clickFn);
    parent.appendChild(button);
    return parent.lastElementChild;
  }

  function getFlipType(el) {
    if (!el || !el.classList) return null;
    if (el.classList.contains('flip-title')) return 'title';
    if (el.classList.contains('flip-project')) return 'project';
    return el.getAttribute && el.getAttribute('data-flip');
  }

  function animateFadeOut({ main }, drawerEl) {
    return animate(main, FADE_OUT, { ...SETTINGS, fill: 'forwards' }).pipe(mapTo({ main }));
  }

  function animateFadeIn({ replaceEls: [main], flipType }) {
    return animate(main, FADE_IN, SETTINGS).pipe(mapTo({ main, flipType }));
  }

  const isStandalone = !!navigator.standalone || window.matchMedia('(display-mode: standalone)').matches;

  const pushStateEl = document.querySelector('hy-push-state');
  const drawerEl = document.querySelector('hy-drawer');
  const navbarEl = document.querySelector(NAVBAR_SEL);
  const canonicalEl = document.querySelector(CANONICAL_SEL);
  const metaDescEl = document.querySelector(META_DESC_SEL);

  const animationMain = setupAnimationMain(pushStateEl);
  const loading = setupLoading(navbarEl);

  if (isStandalone) {
    setupButton(navbarEl, '_back-template', () => window.history.back());
    setupButton(navbarEl, '_forward-template', () => window.history.forward());
  }

  const fromEventX = (eventName, mapFn) =>
    fromEvent(pushStateEl, eventName).pipe(
      map(({ detail }) => detail),
      mapFn ? map(mapFn) : _ => _,
      share(),
    );

  const start$ = fromEventX('hy-push-state-start', detail =>
    Object.assign(detail, { flipType: getFlipType(detail.anchor) }),
  );
  const ready$ = fromEventX('hy-push-state-ready');
  const after$ = fromEventX('hy-push-state-after');
  const progress$ = fromEventX('hy-push-state-progress');
  const error$ = fromEventX('hy-push-state-networkerror');

  const fadeOut$ = start$.pipe(
    map(context => Object.assign(context, { main: document.getElementById('_main') })),
    tap(({ main }) => (main.style.pointerEvents = 'none')),
    exhaustMap(ctx => animateFadeOut(ctx, drawerEl)),

    tap(({ main }) => empty.call(main)),
    share(),
  );

  progress$.subscribe(() => (loading.style.display = 'block'));

  ready$.pipe(startWith({ replaceEls: [document.getElementById('_main')] })).subscribe(({ replaceEls: [main] }) => {
    main.querySelectorAll(HEADING_SELECTOR).forEach(upgradeHeading);
    loading.style.display = 'none';

    const toc = main.querySelector('#markdown-toc');
    if (toc) toc.classList.add('toc-hide');
      
    Array.from(main.querySelectorAll(CODE_BLOCK_SEL))
      .map(el => el.children[0])
      .filter(el => el && CODE_TITLE_REX.test(el.innerText))
      .forEach(el => {
        const [, fileName] = CODE_TITLE_REX.exec(el.innerText);

        // Remove element before making changes
        const code = el.parentNode;
        code.removeChild(el);

        // Remove newline
        code.childNodes[0].splitText(1);
        code.removeChild(code.childNodes[0]);

        // Update DOM
        el.innerText = fileName;
        el.classList.add('pre-header');
        const container = code.parentNode.parentNode;
        container.insertBefore(el, container.firstChild);
      });

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
        replaceEls: [document.getElementById('_main')],
        documentFragment: document,
      }),
    )
    .subscribe(({ replaceEls: [main], documentFragment }) => {
      const cEl = documentFragment.querySelector(CANONICAL_SEL);
      if (canonicalEl && cEl) canonicalEl.href = cEl.href;

      const mEl = documentFragment.querySelector(META_DESC_SEL);
      if (metaDescEl && mEl) metaDescEl.content = mEl.content;

      main.querySelectorAll(FN_SEL).forEach(li => (li.tabIndex = 0));

      main
        .querySelectorAll(FN_LINK_SEL)
        .forEach(a =>
          a.addEventListener('click', e => document.getElementById(e.currentTarget.hash.substr(1)).focus()),
        );

      main
        .querySelectorAll(HORIZONTAL_SCROLL_SEL)
        .forEach(el =>
          el.addEventListener('touchstart', e => el.scrollLeft > 0 && e.stopPropagation(), { passive: false }),
        );
    });

  const fadeIn$ = after$.pipe(switchMap(animateFadeIn), share());

  const flip$ = setupFLIP(start$, ready$, merge(fadeIn$, error$), {
    animationMain,
    settings: SETTINGS,
  }).pipe(share());

  start$
    .pipe(
      switchMap(context => {
        const promise = zip(timer(DURATION), fadeOut$, flip$).toPromise();
        context.transitionUntil(promise);
        return promise;
      }),
    )
    .subscribe();

  // FIXME: Keeping permanent subscription? turn into hot observable?
  fadeOut$.subscribe();
  flip$.subscribe();

  const crossFader = new CrossFader(FADE_DURATION);

  after$
    .pipe(
      switchMap(({ replaceEls: [main] }) => zip(crossFader.fetchImage(main), fadeIn$, x => x).pipe(takeUntil(start$))),
      startWith([document.querySelector('.sidebar-bg')]),
      pairwise(),
      mergeMap(([prev, curr]) => crossFader.fade(prev, curr)),
    )
    .subscribe();

  fadeIn$
    .pipe(
      startWith({ main: document.getElementById('_main') }),
      tap(({ main }) => {
        const toc = main.querySelector('#markdown-toc');
        if (toc) {
          toc.classList.remove('toc-hide');
          toc.classList.add('toc-show');
        }
      }),
    )
    .subscribe();

  error$
    .pipe(
      switchMap(({ url }) => {
        loading.style.display = 'none';

        const main = document.getElementById('_main');
        main.style.pointerEvents = '';
        empty.call(animationMain.querySelector('.page'));
        empty.call(main);

        setupErrorPage(main, url);

        return animate(main, FADE_IN, SETTINGS);
      }),
    )
    .subscribe();

  import(/* webpackMode: "eager" */ '@hydecorp/push-state');

  window._pushState = pushStateEl;
})();
