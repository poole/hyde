/*
eslint-disable
no-param-reassign,
import/no-extraneous-dependencies,
import/no-unresolved,
import/extensions,
*/

import 'rxjs/add/operator/do';

import { animate } from '../common';
import Flip from './flip';

const DURATION = 200; // TODO: pass via constructor or smthing?
const TITLE_SELECTOR = '.page-title, .post-title';

class TitleFlip extends Flip {
  start(currentTarget) {
    // FLIP
    // Get the first position.
    const first = currentTarget.getBoundingClientRect();
    const firstFontSize = parseInt(getComputedStyle(currentTarget).fontSize, 10);

    // Move it to the end.
    this.shadowMain.querySelector('.page').innerHTML = '';

    const titleEl = document.querySelector(TITLE_SELECTOR).cloneNode(true);
    titleEl.textContent = currentTarget.textContent;
    titleEl.style.transformOrigin = 'left top';

    this.shadowMain.querySelector('.page').appendChild(titleEl);
    this.shadowMain.style.position = 'fixed';
    this.shadowMain.style.display = 'block';

    // Get the last position.
    const last = titleEl.getBoundingClientRect();
    const lastFontSize = parseInt(getComputedStyle(titleEl).fontSize, 10);

    // Invert.
    const invertX = first.left - last.left;
    const invertY = first.top - last.top;
    const invertScale = firstFontSize / lastFontSize;

    currentTarget.style.opacity = 0;

    return animate(titleEl, [
      { transform: `translate3d(${invertX}px, ${invertY}px, 0) scale(${invertScale})` },
      { transform: 'translate3d(0, 0, 0) scale(1)' },
    ], {
      duration: DURATION,
      easing: 'cubic-bezier(0,0,0.32,1)',
    }).do(() => {
      // TODO: scrolltop?
      this.shadowMain.style.position = 'absolute';
    });
  }

  ready(main) {
    this.main = main; // TODO: remove
    main.querySelector(TITLE_SELECTOR).style.opacity = 0;
  }

  after(main) {
    // main.style.willChange = '';
    this.shadowMain.style.display = 'none';
    main.querySelector(TITLE_SELECTOR).style.opacity = 1;
  }
}

Flip.types.title = TitleFlip;
