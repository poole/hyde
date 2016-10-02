import YDrawer from 'y-drawer/src/vanilla';
import HTMLYDrawerElement from 'y-drawer/src/webcomponent';

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

function defineCustomElement() {
  if (hasCustomElementsV1()) {
    customElements.define('y-drawer', HTMLYDrawerElement);
  } else if (hasCustomElementsV0()) {
    document.registerElement('y-drawer', HTMLYDrawerElement);
  }
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
                 'template',
               ])) {
  let drawer = document.querySelector('y-drawer');
  let isDesktop = window.matchMedia(MEDIA_QUERY).matches;

  if (hasShadowDOM()) {
    if (isDesktop) drawer.setAttribute('opened', '');
    if (isDesktop) drawer.setAttribute('persistent', '');
    if (hasCustomElements()) {
      defineCustomElement();
    } else {
      loadJSDeferred('https://unpkg.com/webcomponents.js@0.7.22/CustomElements.js');
      window.addEventListener('WebComponentsReady', defineCustomElement);
    }
  } else {
    const style = document.getElementById('y-drawer-template-v1')
      .content
      .querySelector('style')
      .cloneNode(true);
    const ref = document.querySelector('style,link[rel="stylesheet"]');
    ref.parentNode.insertBefore(style, ref);
    drawer = new YDrawer(drawer, {
      opened: isDesktop,
      persistent: isDesktop,
    });
  }

  window.addEventListener('resize', () => {
    const hasChanged = isDesktop !== window.matchMedia(MEDIA_QUERY).matches;
    if (hasChanged) {
      isDesktop = !isDesktop;
      drawer.persistent = isDesktop;
      drawer.jumpTo(isDesktop);
    }
  });

  document.getElementById('_menu').addEventListener('click', () => {
    if (!isDesktop) {
      drawer.toggle();
    }
  });
}
