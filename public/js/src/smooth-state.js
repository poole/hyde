import SmoothState from './smooth-state-lib';

import upgradeKatex from './katex';

const smoothState = document.querySelector('#_smooth-state');

window.smoothState = new SmoothState(smoothState, {
  // replaceIds: ['_main', '_asidebar'],
  contentSelector: 'main, header > div',
});

smoothState.addEventListener('beforesmoothstate', () => {
  if (!window.isDesktop && window.drawer.opened) {
    window.drawer.close();
  }
});

smoothState.addEventListener('aftersmoothstate', () => {
   // send google analytics pageview
  if (window.ga) window.ga('send', 'pageview');

  // upgrade math blocks
  upgradeKatex();
});
