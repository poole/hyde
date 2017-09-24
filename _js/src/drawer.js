// Copyright (c) 2017 Florian Klampfer <https://qwtel.com/>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

import { Drawer } from 'hy-drawer/src/vanilla';
import { HTMLDrawerElement } from 'hy-drawer/src/webcomponent';

import { hasFeatures, isSafari, isMobileSafari } from './common';

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

const MEDIA_QUERY = '(min-width: 64em)';

function resizeCallback() {
  const hasChanged = window._isDesktop !== window.matchMedia(MEDIA_QUERY).matches;
  if (hasChanged) {
    window._isDesktop = !window._isDesktop;
    window._drawer.persistent = window._isDesktop;
    window._drawer.jumpTo(window._isDesktop);
  }
}

function menuClickClallback(e) {
  if (!window._isDesktop) {
    e.preventDefault();
    window._drawer.toggle();
  }
}

function getRange() {
  if (isMobileSafari()) {
    if (window.navigator.standalone) return [0, 150];
    return [35, 150];
  }
  return [0, 50];
}

function setupWebComponent(drawerEl) {
  const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);

  if (window._isDesktop) drawerEl.setAttribute('opened', '');
  if (window._isDesktop) drawerEl.setAttribute('persistent', '');
  drawerEl.setAttribute('range', getRange().join(','));
  drawerEl.setAttribute('slide-threshold', isSafari() ? 0 : 10);
  drawerEl.setAttribute('prevent-default', '');
  drawerEl.setAttribute('peek-over-edge', 0.5 * rem);
  // if (!isSafari()) drawerEl.setAttribte('back-button', '');

  customElements.define('hy-drawer', HTMLDrawerElement);
  return drawerEl;
}

function setupVanilla(drawerEl) {
  const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);

  return new Drawer(drawerEl, {
    opened: window._isDesktop,
    persistent: window._isDesktop,
    range: getRange(),
    slideThreshold: isSafari() ? 0 : 10,
    preventDefault: true,
    peekOverEdge: 0.5 * rem,
    // backButton: !isSafari(),
  });
}

if (!window._noDrawer && hasFeatures(REQUIREMENTS)) {
  const drawerEl = document.getElementsByTagName('hy-drawer')[0];
  const menuEl = document.getElementById('_menu');

  window._isDesktop = window.matchMedia(MEDIA_QUERY).matches;

  window._drawer = 'customElements' in window && 'attachShadow' in Element.prototype ?
    setupWebComponent(drawerEl) :
    setupVanilla(drawerEl);

  drawerEl.classList.add('loaded');
  window.addEventListener('resize', resizeCallback);
  menuEl.addEventListener('click', menuClickClallback);
}
