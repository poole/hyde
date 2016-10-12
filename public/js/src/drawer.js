/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */

import { loadCSS } from 'fg-loadcss/src/loadCSS';
import YDrawer from 'y-drawer/src/vanilla';
import HTMLYDrawerElement from 'y-drawer/src/webcomponent';

import { hasFeatures, defineCustomElement, ensureCustomElements } from './common';

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

const MEDIA_QUERY = '(min-width: 48em)';

function addEventListeners(drawer) {
  const d = drawer;

  window.addEventListener('resize', () => {
    const hasChanged = window.isDesktop !== window.matchMedia(MEDIA_QUERY).matches;
    if (hasChanged) {
      window.isDesktop = !window.isDesktop;
      d.persistent = window.isDesktop;
      d.jumpTo(window.isDesktop);
    }
  });

  document.getElementById('_menu').addEventListener('click', (e) => {
    if (!window.isDesktop) {
      e.preventDefault();
      d.toggle();
    }
  });

  window.drawer = d;
}

function defineYDrawer() {
  defineCustomElement('y-drawer', HTMLYDrawerElement);
  addEventListeners(document.querySelector('y-drawer'));
}

if (hasFeatures(REQUIREMENTS)) {
  window.isDesktop = window.matchMedia(MEDIA_QUERY).matches;

  const drawer = document.querySelector('y-drawer');

  if ('attachShadow' in document.body || 'createShadowRoot' in document.body) {
    if (window.isDesktop) drawer.setAttribute('opened', '');
    if (window.isDesktop) drawer.setAttribute('persistent', '');
    ensureCustomElements(defineYDrawer);
  } else {
    const ref = document.getElementsByTagName('style')[0];
    loadCSS('https://unpkg.com/y-drawer@3/dist/drawer.css', ref).addEventListener('load', () => {
      // You Only Load Once
      if (!(window.drawer instanceof YDrawer)) {
        const drawerObj = new YDrawer(drawer, {
          opened: window.isDesktop,
          persistent: window.isDesktop,
        });
        addEventListeners(drawerObj);
      }
    });
  }
}
