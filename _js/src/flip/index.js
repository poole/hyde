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

import 'core-js/fn/array/includes';

import { Observable } from 'rxjs/Observable';
// import { empty } from 'rxjs/observable/empty';
import { merge } from 'rxjs/observable/merge';

import { filter } from 'rxjs/operator/filter';
// import { partition } from 'rxjs/operator/partition';

import flipTitle from './title';
import flipProject from './project';

const FLIP_TYPES = ['title', 'projects'];

export default function flip(start$, ready$, fadeIn$, options) {
  const other$ = start$::filter(({ flipType }) => !FLIP_TYPES.includes(flipType));

  return Observable::merge(
    flipTitle(start$, ready$, fadeIn$, options),
    flipProject(start$, ready$, fadeIn$, options),
    other$,
  );
}
