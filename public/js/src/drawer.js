import 'core-js/fn/object/assign';
import 'core-js/fn/object/define-property';
import 'core-js/fn/object/keys';
import { loadCSS } from 'fg-loadcss/src/loadCSS';

import hasFeatures from '../lib/has-features';

const MEDIA_QUERY = '(min-width: 48em)';

function hasShadowDOMV0() {
  return 'createShadowRoot' in document.body;
}

function hasShadowDOMV1() {
  return 'attachShadow' in document.body;
}

function hasShadowDOM() {
  return hasShadowDOMV0() || hasShadowDOMV1();
}

function hasCustomElementsV0() {
  return 'registerElement' in document;
}

function hasCustomElementsV1() {
  return 'customElements' in window;
}

function hasCustomElements() {
  return hasCustomElementsV0() || hasCustomElementsV1();
}

function importCustomElement() {
  const link = document.createElement('link');
  link.rel = 'import';
  link.href = 'https://unpkg.com/y-drawer@3/dist/webcomponent/y-drawer.html';

  const ref = document.getElementsByTagName('link')[0];
  ref.parentNode.insertBefore(link, ref);
}

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
  window.drawer = document.querySelector('y-drawer');
  window.isDesktop = window.matchMedia(MEDIA_QUERY).matches;

  if (hasShadowDOM()) {
    if (window.isDesktop) window.drawer.setAttribute('opened', '');
    if (window.isDesktop) window.drawer.setAttribute('persistent', '');

    if (hasFeatures(['template', 'htmlimports']) && hasCustomElements()) {
      importCustomElement();
    } else {
      loadJSDeferred('https://unpkg.com/webcomponents.js@0.7.22/webcomponents-lite.min.js');
      window.addEventListener('WebComponentsReady', importCustomElement);
    }
  } else {
    const ref = document.getElementsByTagName('style')[0];
    loadCSS('https://unpkg.com/y-drawer@3/dist/drawer.css', ref);
    loadJSDeferred('https://unpkg.com/y-drawer@3/dist/vanilla/index.js', () => {
      /* global y */
      const YDrawer = y.drawer.vanilla.default;

      window.drawer = new YDrawer(window.drawer, {
        opened: window.isDesktop,
        persistent: window.isDesktop,
      });
    });
  }

  window.addEventListener('resize', () => {
    const hasChanged = window.isDesktop !== window.matchMedia(MEDIA_QUERY).matches;
    if (window.drawer && hasChanged) {
      window.isDesktop = !window.isDesktop;
      window.drawer.persistent = window.isDesktop;
      window.drawer.jumpTo(window.isDesktop);
    }
  });

  document.getElementById('_menu').addEventListener('click', (e) => {
    if (window.drawer && !window.isDesktop) {
      e.preventDefault();
      window.drawer.toggle();
    }
  });
}
