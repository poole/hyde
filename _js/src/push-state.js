/*
eslint-disable
no-param-reassign, import/no-extraneous-dependencies, import/no-unresolved, import/extensions
*/

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/zip';

import PushState from 'y-push-state/src/vanilla';

import { hasFeatures } from './common';
import upgradeMathBlocks from './katex';

const REQUIREMENTS = [
  'eventlistener',
  'queryselector',
  'requestanimationframe',
  'classlist',
  'documentfragment',
  'history',
];

const TITLE_SELECTOR = '.page-title, .post-title';
const DURATION = 200;

const pushState = document.querySelector('#y-push-state');
const shadowMain = document.getElementById('shadow-main');

const sTag = document.getElementById('_pageStyle');
const styleSheet = Array.prototype.find.call(document.styleSheets, x => x.ownerNode === sTag);
const rules = styleSheet.cssRules || styleSheet.rules;

let lastImage = document.querySelector('main').dataset.image;

function updateStyle({ font = 'serif', fontHeading = 'sans-serif', color = '#00f', image } = {}) {
  rules[0].style.fontFamily = font; // html
  rules[1].style.fontFamily = fontHeading; // h1, h2, h3, h4, h5, h6, .heading
  rules[2].style.color = color; // .content a
  rules[3].style.outlineColor = color; // :focus
  rules[4].style.backgroundColor = color; // ::selection
  rules[5].style.backgroundColor = color; // .sidebar
  if (image != null && image !== lastImage) {
    lastImage = image;
    rules[5].style.backgroundImage = `url(${image})`;
  }
}

function animate(el, keyframes, options) {
  return Observable.create((observer) => {
    const anim = el.animate(keyframes, options);

    anim.addEventListener('finish', (e) => {
      observer.next(e);
      observer.complete();
    });

    return () => {
      if (anim.playState !== 'finished') anim.cancel();
    };
  });
}

if (hasFeatures(REQUIREMENTS)) {
  // pushState.addEventListener('y-push-state-error', errorCallback);

  const start$ = Observable.fromEvent(pushState, 'y-push-state-start')
    .map(kind => [kind, document.querySelector('main')])
    .do(() => {
      // TODO: does animate handle will-change?
      // will change opacity
      // main.style.willChange = 'opacity';

      // if a link on the drawer has been clicked, close it
      if (!window.isDesktop && window.drawer.opened) {
        window.drawer.close();
      }
    })
    .share();

  const ready$ = Observable.fromEvent(pushState, 'y-push-state-ready').share();
  const after$ = Observable.fromEvent(pushState, 'y-push-state-after').share();

  start$
    .filter(([{ detail: { type, event: { currentTarget } } }]) => type === 'push' &&
      currentTarget.hasAttribute('data-flip'))
    .switchMap(([{ detail }]) => {
      const { event: { currentTarget } } = detail;
      detail.flip = true;

      // FLIP
      // Get the first position.
      const first = currentTarget.getBoundingClientRect();
      const firstFontSize = parseInt(getComputedStyle(currentTarget).fontSize, 10);

      // Move it to the end.
      const titleEl = document.querySelector(TITLE_SELECTOR).cloneNode(true);
      shadowMain.querySelector('*').innerHTML = '';
      shadowMain.querySelector('*').appendChild(titleEl);
      shadowMain.style.display = 'block';
      titleEl.textContent = currentTarget.textContent;
      titleEl.style.display = 'inline-block';
      titleEl.style.transformOrigin = 'left top';

      // Get the last position.
      const last = titleEl.getBoundingClientRect();
      const lastFontSize = parseInt(getComputedStyle(titleEl).fontSize, 10);

      // Invert.
      const invertX = first.left - last.left;
      const invertY = first.top - last.top;
      const invertScale = firstFontSize / lastFontSize;

      currentTarget.style.visibility = 'hidden';

      return animate(titleEl, [
        { transform: `translate3d(${invertX}px, ${invertY}px, 0) scale(${invertScale})` },
        { transform: 'translate3d(0, 0, 0) scale(1)' },
      ], {
        duration: DURATION,
        easing: 'cubic-bezier(0,0,0.32,1)',
      });
    })
    .subscribe();

  start$
    .exhaustMap(([, main]) =>
      animate(main, [
        { opacity: 1 },
        { opacity: 0 },
      ], {
        duration: DURATION,
        easing: 'cubic-bezier(0,0,0.32,1)',
        fill: 'forwards',
      }).zip(after$), // "stretch" animation until the next page is loaded
    )
    .subscribe();

  ready$
    .subscribe(({ detail: { flip, content: [main] } }) => {
      updateStyle(main.dataset);
      // main.style.willChange = 'transform, opacity';
      main.style.opacity = 0;
      if (flip) main.querySelector(TITLE_SELECTOR).style.visibility = 'hidden';
    });

  after$
    .map(kind => [kind, document.querySelector('main')])
    .switchMap(([, main]) =>
      animate(main, [
        { transform: 'translateY(-2rem)', opacity: 0 },
        { transform: 'translateY(0)', opacity: 1 },
      ], {
        duration: DURATION,
        easing: 'cubic-bezier(0,0,0.32,1)',
        fill: 'forwards',
      }).do(() => {
        // main.style.willChange = '';
        shadowMain.style.display = 'none';
        main.querySelector(TITLE_SELECTOR).style.visibility = 'visible';
      }))
    .subscribe(() => {
      // send google analytics pageview
      if (window.ga) window.ga('send', 'pageview');

      // upgrade math blocks
      upgradeMathBlocks();
    });

  new PushState(pushState, {
    replaceIds: ['_main'],
    linkSelector: 'a[href^="/"]',
    scrollRestoration: true,
    duration: DURATION,
  }).startHistory();
}
