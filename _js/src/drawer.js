/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */

import YDrawer from 'y-drawer/src/vanilla';

import { hasFeatures } from './common';

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

if (hasFeatures(REQUIREMENTS)) {
  window.isDesktop = window.matchMedia(MEDIA_QUERY).matches;
  const drawer = document.querySelector('#y-drawer');

  addEventListeners(new YDrawer(drawer, {
    opened: window.isDesktop,
    persistent: window.isDesktop,
  }));

  drawer.classList.add('loaded');
}
