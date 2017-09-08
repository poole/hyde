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

import 'core-js/fn/array/filter';
import 'core-js/fn/array/for-each';
import 'core-js/fn/array/map';

import { hasFeatures } from './common';

const { filter, map, forEach } = Array.prototype;

const REQUIREMENTS = [
  'classlist',
  // 'eventlistener',
  // 'queryselector',
];

const featuresOk = !window._noBreakLayout && hasFeatures(REQUIREMENTS);

export default function upgradeBlocks(blocks) {
  if (featuresOk) {
    const innerWidth = window.innerWidth;

    blocks
      ::filter(block => !block.classList.contains('no-break-layout'))
      ::map(block => [block, innerWidth - block.getBoundingClientRect().left])
      ::forEach(([block, width]) => { block.style.width = `${width}px`; });
  }
}
