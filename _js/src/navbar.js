// Copyright (c) 2018 Florian Klampfer <https://qwtel.com/>
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

import { fromEvent } from 'rxjs';
import { map, filter, pairwise, merge, mapTo, tap } from 'rxjs/operators';

import { hasCSSOM, getScrollTop } from './common';

(async () => {
  const navbarEl = document.getElementById('_navbar');
  const height = navbarEl.clientHeight;

  let offset = 0;

  const tvalue = hasCSSOM ? new CSSTransformValue([new CSSTranslate(CSS.px(0), CSS.px(0))]) : null;

  const navbarInactive = () => !document.activeElement || !document.activeElement.classList.contains('nav-btn');

  fromEvent(document, 'scroll', { passive: true })
    .pipe(
      map(getScrollTop),
      filter(x => x >= 0),
      pairwise(),
      map(([prev, curr]) => prev - curr),
      filter(navbarInactive),
      merge(fromEvent(navbarEl, 'focus', { capture: true }).pipe(mapTo(2 * height))),
      tap(x => {
        offset += x;
        offset = Math.max(-height * 1.5, Math.min(0, offset));
        if (hasCSSOM) {
          tvalue[0].y.value = offset;
          navbarEl.attributeStyleMap.set('transform', tvalue);
        } else {
          navbarEl.style.transform = `translateY(${offset}px)`;
        }
      }),
    )
    .subscribe();
})();
