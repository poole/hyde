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

// import { Observable } from 'rxjs/Observable';
// import { timer } from 'rxjs/observable/timer';

import { _do as effect } from 'rxjs/operator/do';
import { filter } from 'rxjs/operator/filter';
import { map } from 'rxjs/operator/map';
import { switchMap } from 'rxjs/operator/switchMap';
// import { _finally as cleanup } from 'rxjs/operator/finally';
import { zipProto as zipWith } from 'rxjs/operator/zip';

import { animate, empty } from '../common';

const TITLE_SELECTOR = '.page-title, .post-title';

export function flipTitle(start$, ready$, fadeIn$, { animationMain, settings }) {
  const flip$ = start$
    ::filter(({ flipType }) => flipType === 'title')
    ::switchMap(({ anchor }) => {
      // console.log('title start');
      const title = document.createElement('h1');

      title.classList.add('page-title');
      title.textContent = anchor.textContent;
      title.style.transformOrigin = 'left top';

      const page = animationMain.querySelector('.page');
      page::empty();
      page.appendChild(title);
      animationMain.style.position = 'fixed';
      animationMain.style.opacity = 1;

      const first = anchor.getBoundingClientRect();
      const last = title.getBoundingClientRect();
      const firstFontSize = parseInt(getComputedStyle(anchor).fontSize, 10);
      const lastFontSize = parseInt(getComputedStyle(title).fontSize, 10);

      const invertX = first.left - last.left;
      const invertY = first.top - last.top;
      const invertScale = firstFontSize / lastFontSize;

      anchor.style.opacity = 0;

      return animate(title, [
        { transform: `translate3d(${invertX}px, ${invertY}px, 0) scale(${invertScale})` },
        { transform: 'translate3d(0, 0, 0) scale(1)' },
      ], settings)
        ::effect(() => { animationMain.style.position = 'absolute'; });
    });

  start$::switchMap(({ flipType }) =>
    ready$
      ::filter(() => flipType === 'title')
      ::map(({ content: [main] }) => {
        // console.log('title ready');
        animationMain.style.willChange = 'opacity';

        const title = main.querySelector(TITLE_SELECTOR);

        if (title != null) {
          title.style.opacity = 0;
          title.style.willChange = 'opacity';
        }

        return title;
      })
      ::zipWith(fadeIn$)
      ::effect(([title]) => {
        if (title != null) {
          title.style.opacity = 1;
          title.style.willChange = '';
        }
        animationMain.style.opacity = 0;
        animationMain.style.willChange = '';
      }))
      // ::cleanup(() => {
      //   animationMain.style.opacity = 0;
      //   animationMain.style.willChange = '';
      // }))
    .subscribe();

  return flip$;
}
