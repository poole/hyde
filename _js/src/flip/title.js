// Copyright (c) 2017 Florian Klampfer
// Licensed under MIT

/*
eslint-disable
no-param-reassign,
import/no-extraneous-dependencies,
import/no-unresolved,
import/extensions,
class-methods-use-this,
*/

import { Observable } from 'rxjs/Observable';
import { timer } from 'rxjs/observable/timer';

import { _do as effect } from 'rxjs/operator/do';
import { _finally as cleanup } from 'rxjs/operator/finally';

import { animate } from '../common';
import Flip from './flip';

const TITLE_SELECTOR = '.page-title, .post-title';

class TitleFlip extends Flip {
  start(currentTarget) {
    const title = document.createElement('h1');

    title.classList.add('page-title');
    title.textContent = currentTarget.textContent;
    title.style.transformOrigin = 'left top';

    this.animationMain.querySelector('.page').innerHTML = '';
    this.animationMain.querySelector('.page').appendChild(title);
    this.animationMain.style.position = 'fixed';
    this.animationMain.style.opacity = 1;

    const first = currentTarget.getBoundingClientRect();
    const firstFontSize = parseInt(getComputedStyle(currentTarget).fontSize, 10);
    const last = title.getBoundingClientRect();
    const lastFontSize = parseInt(getComputedStyle(title).fontSize, 10);

    const invertX = first.left - last.left;
    const invertY = first.top - last.top;
    const invertScale = firstFontSize / lastFontSize;

    currentTarget.style.opacity = 0;

    return animate(title, [
      { transform: `translate3d(${invertX}px, ${invertY}px, 0) scale(${invertScale})` },
      { transform: 'translate3d(0, 0, 0) scale(1)' },
    ], {
      duration: this.duration,
      // easing: 'ease',
      easing: 'cubic-bezier(0,0,0.32,1)',
    })
      ::effect(() => { this.animationMain.style.position = 'absolute'; });
  }

  ready(main) {
    this.animationMain.style.willChange = 'opacity';

    const title = main.querySelector(TITLE_SELECTOR);

    if (title != null) {
      title.style.opacity = 0;
      title.style.willChange = 'opacity';
    }

    // HACK: add some extra time to prevent hiccups
    return Observable::timer(this.duration + 100)
      ::effect(() => {
        if (title != null) {
          title.style.opacity = 1;
          title.style.willChange = '';
        }
      })
      ::cleanup(() => {
        this.animationMain.style.opacity = 0;
        this.animationMain.style.willChange = '';
      });
  }
}

Flip.types.title = TitleFlip;
