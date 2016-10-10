/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */

// import 'core-js/fn/symbol';
// import 'core-js/fn/object/assign';

import SmoothState from 'y-smooth-state/src/vanilla';
// import HTMLSmoothStateElement from 'y-smooth-state/src/webcomponent';

import hasFeatures from '../lib/has-features';
import upgradeKatex from './katex';
// import { defineCustomElement } from './common';

const smoothState = document.querySelector('y-smooth-state');

// global.setImmediate = global.setImmediate || (f => global.setTimeout(f, 0));

if (hasFeatures(['eventlistener',
                 'queryselector',
                 'requestanimationframe',
                 'classlist',
                 'documentfragment',
               ])) {
  const error = document.getElementById('_error');
  // const loading = document.getElementById('_loading');

  smoothState.addEventListener('y-smooth-state-before', () => {
    document.body.classList.add('is-loading');
    error.style.display = '';
    error.style.visibility = '';
    if (!global.isDesktop && global.drawer.opened) {
      global.drawer.close();
    }
  });

  smoothState.addEventListener('y-smooth-state-after', () => {
    document.body.classList.remove('is-loading');
    // send google analytics pageview
    if (global.ga) global.ga('send', 'pageview');

    // upgrade math blocks
    upgradeKatex();
  });

  smoothState.addEventListener('y-smooth-state-error', () => {
    error.style.display = 'block';
    error.style.visibility = 'visible';
  });

  const setup = () => {
    smoothState.startHistory();
    smoothState.removeEventListener('y-smooth-state-attached', setup);
  };

  // if ('customElement' in global || 'registerElement' in document) {
  //   smoothState.addEventListener('y-smooth-state-attached', setup);
  //   defineCustomElement('y-smooth-state', HTMLSmoothStateElement);
  // } else {
  new SmoothState(smoothState, {
    replaceIds: ['_main', '_asidebar'],
    linkSelector: 'a[href^="/"]',
    // scrollRestoration: true,
  }).startHistory();
  // }
}
