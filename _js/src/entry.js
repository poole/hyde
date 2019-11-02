// Copyright (c) 2019 Florian Klampfer <https://qwtel.com/>
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

import '@babel/polyfill';

import '../lib/version';
import '../lib/modernizr-custom';
import { hasFeatures } from './common';

const BASELINE = ['classlist', 'eventlistener', 'queryselector'];

const DARK_MODE_FEATURES = [...BASELINE, 'customproperties'];

const DRAWER_FEATURES = [...BASELINE, 'cssremunit', 'customproperties', 'history', 'matchmedia', 'opacity'];

const PUSH_STATE_FEATURES = [
  ...BASELINE,
  'cssanimations',
  'cssremunit',
  'documentfragment',
  'history',
  'matchmedia',
  'opacity',
];

if (hasFeatures(BASELINE)) {
  import(/* webpackMode: "eager" */ './katex');
  import(/* webpackMode: "eager" */ './navbar');
  // import(/* webpackMode: "eager" */ './pro/cookies-banner');
}

// if (hasFeatures(DARK_MODE_FEATURES)) {
//   import(/* webpackMode: "eager" */ './pro/dark-mode');
// }

// A list of Modernizr tests that are required for the drawer to work.
if (!window._noDrawer && hasFeatures(DRAWER_FEATURES)) {
  import(/* webpackChunkName: "drawer" */ './drawer');
}

if (!window._noPushState && hasFeatures(PUSH_STATE_FEATURES)) {
  import(/* webpackChunkName: "push-state" */ './push-state');
}
