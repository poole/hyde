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

const MEDIA_QUERY = '(min-width: 54em)';

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

if (!window._noDrawer && hasFeatures(REQUIREMENTS)) {
  const ua = navigator.userAgent.toLowerCase();
  const isSafari = ua.indexOf('safari') > 0 && ua.indexOf('chrome') < 0;

  const drawerEl = document.getElementById('_hyDrawer');
  const menuEl = document.getElementById('_menu');

  window._isDesktop = window.matchMedia(MEDIA_QUERY).matches;

  window._drawer = new Drawer(drawerEl, {
    opened: window._isDesktop,
    persistent: window._isDesktop,
    transitionDuration: 150,
  });

  window.addEventListener('resize', resizeCallback);
  menuEl.addEventListener('click', menuClickClallback);

  drawerEl.classList.add('loaded');
}
