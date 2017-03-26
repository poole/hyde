/*
eslint-disable
no-param-reassign,
import/no-extraneous-dependencies,
import/no-unresolved,
import/extensions,
class-methods-use-this,
*/

import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { of } from 'rxjs/observable/of';
import { timer } from 'rxjs/observable/timer';

import { _do as effect } from 'rxjs/operator/do';
import { _finally as cleanup } from 'rxjs/operator/finally';
import { map } from 'rxjs/operator/map';
import { zipProto as zipWith } from 'rxjs/operator/zip';

import { animate } from './common';

const { find } = Array.prototype;

function updateStyle({ font = 'serif', fontHeading = 'sans-serif', color = '#00f' } = {}) {
  this.rules[0].style.fontFamily = font; // html
  this.rules[1].style.fontFamily = fontHeading; // h1, h2, h3, h4, h5, h6, .heading
  this.rules[2].style.color = color; // .content a
  this.rules[3].style.outlineColor = color; // :focus
  this.rules[4].style.backgroundColor = color; // ::selection
}

export default class CrossFader {
  constructor({ duration }) {
    this.sidebar = document.getElementById('_sidebar');
    this.duration = duration;

    const pageStyle = document.getElementById('_pageStyle');
    const styleSheet = document.styleSheets::find(ss => ss.ownerNode === pageStyle);
    this.rules = styleSheet.cssRules || styleSheet.rules;
    this.lastImage = document.getElementById('_main').getAttribute('data-image');
  }

  fetchImage(dataset) {
    const { color, image } = dataset;

    let res;

    if (image === this.lastImage) {
      res = Observable::empty();
    } else if (image === '') {
      res = Observable::of(true);
    } else {
      const imgObj = new Image();

      res = Observable::fromEvent(imgObj, 'load')
        ::zipWith(Observable::timer(this.duration), x => x)
        ::effect(() => { this.lastImage = image; })
        ::cleanup(() => { imgObj.src = ''; });

      imgObj.src = image;
    }

    return res
      ::effect(() => { this::updateStyle(dataset); })
      ::map(() => {
        const div = document.createElement('div');
        div.classList.add('sidebar-bg');
        div.style.backgroundColor = color;
        if (image !== '') div.style.backgroundImage = `url(${image})`;
        return div;
      });
  }

  crossFade([prevDiv, div]) {
    prevDiv.parentNode.insertBefore(div, prevDiv.nextElementSibling);

    return animate(div, [
      { opacity: 0 },
      { opacity: 1 },
    ], {
      duration: this.duration,
      // easing: 'cubic-bezier(0,0,0.32,1)',
    })
    ::cleanup(() => prevDiv.parentNode.removeChild(prevDiv));
  }
}
