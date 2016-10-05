/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */
import SmoothState from 'y-smooth-state/src/vanilla';

import upgradeKatex from './katex';

const smoothState = document.querySelector('y-smooth-state');

window.setImmediate = window.setImmediate || (f => window.setTimeout(f, 0));

window.smoothState = new SmoothState(smoothState, {
  // replaceIds: ['_main', '_asidebar'],
  contentSelector: 'main, header > div',
  scroll: true,
});

smoothState.addEventListener('y-smooth-state-before', () => {
  setImmediate(() => {
    if (!window.isDesktop && window.drawer.opened) {
      window.drawer.close();
    }
  });
});

smoothState.addEventListener('y-smooth-state-after', () => {
  setImmediate(() => {
    // send google analytics pageview
    if (window.ga) window.ga('send', 'pageview');

    // upgrade math blocks
    upgradeKatex();
  });
});
