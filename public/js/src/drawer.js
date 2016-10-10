/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */

// import 'core-js/fn/object/assign';
// import 'core-js/fn/object/define-property';
// import 'core-js/fn/object/keys';

import { loadCSS } from 'fg-loadcss/src/loadCSS';
import YDrawer from 'y-drawer/src/vanilla';
// import HTMLYDrawerElement from 'y-drawer/src/webcomponent';

// import { defineCustomElement, ensureCustomElements } from './common';
import hasFeatures from '../lib/has-features';

const MEDIA_QUERY = '(min-width: 48em)';

function addEventListeners(drawer) {
  const d = drawer;

  global.addEventListener('resize', () => {
    const hasChanged = global.isDesktop !== global.matchMedia(MEDIA_QUERY).matches;
    if (hasChanged) {
      global.isDesktop = !global.isDesktop;
      d.persistent = global.isDesktop;
      d.jumpTo(global.isDesktop);
    }
  });

  document.getElementById('_menu').addEventListener('click', (e) => {
    if (!global.isDesktop) {
      e.preventDefault();
      d.toggle();
    }
  });

  global.drawer = d;
}

// function defineYDrawer() {
//   defineCustomElement('y-drawer', HTMLYDrawerElement);
//   addEventListeners(document.querySelector('y-drawer'));
// }

if (hasFeatures(['eventlistener',
                 'queryselector',
                 'matchmedia',
                 'requestanimationframe',
                 'classlist',
                 'opacity',
                 'csstransforms',
                 'csspointerevents',
                 'cssremunit',
               ])) {
  global.isDesktop = global.matchMedia(MEDIA_QUERY).matches;

  const drawer = document.querySelector('y-drawer');

  // if ('attachShadow' in document.body || 'createShadowRoot' in document.body) {
  //   if (global.isDesktop) drawer.setAttribute('opened', '');
  //   if (global.isDesktop) drawer.setAttribute('persistent', '');
  //   ensureCustomElements(defineYDrawer);
  // } else {
  const ref = document.getElementsByTagName('style')[0];
  loadCSS('https://unpkg.com/y-drawer@3/dist/drawer.css', ref).addEventListener('load', () => {
    // You Only Load Once
    if (!(global.drawer instanceof YDrawer)) {
      const drawerObj = new YDrawer(drawer, {
        opened: global.isDesktop,
        persistent: global.isDesktop,
      });
      addEventListeners(drawerObj);
    }
  });
  // }
}
