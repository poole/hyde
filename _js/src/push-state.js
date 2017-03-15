/*
eslint-disable
no-param-reassign, import/no-extraneous-dependencies, import/no-unresolved, import/extensions
*/

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/zip';

import PushState from 'y-push-state/src/vanilla';

import { hasFeatures, animate } from './common';
import upgradeMathBlocks from './katex';

import Flip from './flip/flip';
import './flip/title';
import './flip/project';

const REQUIREMENTS = [
  'eventlistener',
  'queryselector',
  'requestanimationframe',
  'classlist',
  'documentfragment',
  'history',
  'opacity',
  'cssanimations',
  'dataset',
];

const DURATION = 150;

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

if (hasFeatures(REQUIREMENTS)) {
  // pushState.addEventListener('y-push-state-error', errorCallback);

  const start$ = Observable.fromEvent(pushState, 'y-push-state-start')
    .map(kind => [kind, document.querySelector('main')])
    .do(() => {
      // TODO: does animate handle will-change?
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
    .do(() => { shadowMain.style.display = 'none'; })
    .switchMap(([{ detail }]) => {
      const { type, event: { currentTarget } } = detail;

      const flip = Flip.create(type === 'push' && currentTarget.dataset.flip, shadowMain);
      detail.flip = flip;

      return flip.start(currentTarget);
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

      // TODO: req anim frame?
      main.style.opacity = 0;

      flip.ready(main);
    });

  after$
    .map(kind => [kind, document.querySelector('main')])
    .switchMap(([{ detail: { flip } }, main]) =>
      animate(main, [
        { transform: 'translateY(-2rem)', opacity: 0 },
        { transform: 'translateY(0)', opacity: 1 },
      ], {
        duration: DURATION,
        easing: 'cubic-bezier(0,0,0.32,1)',
        fill: 'forwards',
      }).do(() => { flip.after(main); }))
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
