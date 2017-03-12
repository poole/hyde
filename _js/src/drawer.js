/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */

import { loadCSS } from 'fg-loadcss/src/loadCSS';
import YDrawer from 'y-drawer/src/vanilla';
// import HTMLYDrawerElement from 'y-drawer/src/webcomponent';

import { hasFeatures /* , defineCustomElement, ensureCustomElements */ } from './common';

const REQUIREMENTS = [
  'eventlistener',
  'queryselector',
  'matchmedia',
  'requestanimationframe',
  'classlist',
  'opacity',
  'csstransforms',
  'csspointerevents',
  'cssremunit',
];

const MEDIA_QUERY = '(min-width: 801px)';

function resizeCallback() {
  const hasChanged = window.isDesktop !== window.matchMedia(MEDIA_QUERY).matches;
  if (hasChanged) {
    window.isDesktop = !window.isDesktop;
    window.drawer.persistent = window.isDesktop;
    window.drawer.jumpTo(window.isDesktop);
  }
}

function menuClickClallback(e) {
  if (!window.isDesktop) {
    e.preventDefault();
    window.drawer.toggle();
  }
}

function addEventListeners(drawer) {
  window.drawer = drawer;
  window.addEventListener('resize', resizeCallback);
  document.getElementById('_menu').addEventListener('click', menuClickClallback);
}

// function defineYDrawer() {
//   defineCustomElement('y-drawer', HTMLYDrawerElement);
//   addEventListeners(document.querySelector('y-drawer'));
// }

// function withShadowDOM(drawer) {
//   if (window.isDesktop) drawer.setAttribute('opened', '');
//   if (window.isDesktop) drawer.setAttribute('persistent', '');
//   ensureCustomElements(defineYDrawer);
// }

function globalCSSLoaded(drawer) {
  // You Only Load Once
  if (!(window.drawer instanceof YDrawer)) {
    addEventListeners(new YDrawer(drawer, {
      opened: window.isDesktop,
      persistent: window.isDesktop,
    }));
  }
}

function withoutShadowDOM(drawer) {
  const ref = document.getElementsByTagName('style')[0];
  loadCSS('https://unpkg.com/y-drawer@3/dist/drawer.css', ref)
    .addEventListener('load', () => globalCSSLoaded(drawer));
}

if (hasFeatures(REQUIREMENTS)) {
  window.isDesktop = window.matchMedia(MEDIA_QUERY).matches;

  const drawer = document.querySelector('y-drawer');

  // if ('attachShadow' in document.body || 'createShadowRoot' in document.body) {
  //   withShadowDOM(drawer);
  // } else {
  withoutShadowDOM(drawer);
  // }
}
