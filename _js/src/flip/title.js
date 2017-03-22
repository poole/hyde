/*
eslint-disable
no-param-reassign,
import/no-extraneous-dependencies,
import/no-unresolved,
import/extensions,
class-methods-use-this,
*/

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/empty';

import 'rxjs/add/operator/do';

import { animate } from '../common';
import Flip from './flip';

const TITLE_SELECTOR = '.page-title, .post-title';

class TitleFlip extends Flip {
  start(currentTarget) {
    // FLIP
    // Get the first position.
    const first = currentTarget.getBoundingClientRect();
    const firstFontSize = parseInt(getComputedStyle(currentTarget).fontSize, 10);

    // Move it to the end.
    this.shadowMain.querySelector('.page').innerHTML = '';

    const title = document.createElement('h1');
    title.classList.add('page-title');
    title.textContent = currentTarget.textContent;
    title.style.transformOrigin = 'left top';

    this.shadowMain.querySelector('.page').appendChild(title);
    this.shadowMain.style.position = 'fixed';
    this.shadowMain.style.opacity = 1;

    // Get the last position.
    const last = title.getBoundingClientRect();
    const lastFontSize = parseInt(getComputedStyle(title).fontSize, 10);

    // Invert.
    const invertX = first.left - last.left;
    const invertY = first.top - last.top;
    const invertScale = firstFontSize / lastFontSize;

    currentTarget.style.opacity = 0;

    return animate(title, [
      { transform: `translate3d(${invertX}px, ${invertY}px, 0) scale(${invertScale})` },
      { transform: 'translate3d(0, 0, 0) scale(1)' },
    ], {
      duration: this.duration,
      easing: 'cubic-bezier(0,0,0.32,1)',
    })
      .do(() => { this.shadowMain.style.position = 'absolute'; });
  }

  ready(main) {
    const title = main.querySelector(TITLE_SELECTOR);
    if (title != null) title.style.opacity = 0;
    // if (title != null) title.style.willChange = 'opacity';
    return Observable.empty();
  }

  after(main) {
    this.shadowMain.style.opacity = 0;
    const title = main.querySelector(TITLE_SELECTOR);
    if (title != null) title.style.opacity = 1;
    // if (title != null) title.style.willChange = '';
  }
}

Flip.types.title = TitleFlip;
