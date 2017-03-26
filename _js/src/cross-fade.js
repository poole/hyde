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
import { timer } from 'rxjs/observable/timer';

import { _do as doRx } from 'rxjs/operator/do';
import { mergeMap } from 'rxjs/operator/mergeMap';
import { _finally as finallyRx } from 'rxjs/operator/finally';
import { map } from 'rxjs/operator/map';
import { zipProto as zipWith } from 'rxjs/operator/zip';

import { animate } from './common';

const { find } = Array.prototype;

export default class CrossFader {
  constructor() {
    const pageStyle = document.getElementById('_page-style');
    const styleSheet = document.styleSheets::find(ss => ss.ownerNode === pageStyle);

    this.rules = styleSheet.cssRules || styleSheet.rules;
    this.lastImage = document.getElementById('_main').getAttribute('data-image');
  }

  updateStyle({ font = 'serif', fontHeading = 'sans-serif', color = '#00f' } = {}) {
    this.rules[0].style.fontFamily = font; // html
    this.rules[1].style.fontFamily = fontHeading; // h1, h2, h3, h4, h5, h6, .heading
    this.rules[2].style.color = color; // .content a
    this.rules[3].style.outlineColor = color; // :focus
    this.rules[4].style.backgroundColor = color; // ::selection
    this.rules[5].style.backgroundColor = color; // .sidebar
  }

  crossFade(dataset, { duration }) {
    const { image } = dataset;

    if (image != null && image !== this.lastImage) {
      const imgObj = new Image();

      const imgLoad$ = Observable::fromEvent(imgObj, 'load')
        ::zipWith(Observable::timer(duration), x => x)
        ::finallyRx(() => { imgObj.src = ''; }) // "cancel" the request // TODO: test!
        ::doRx(() => {
          this.updateStyle(dataset);
          this.lastImage = image;
        })
        ::map(() => {
          const div = document.createElement('div');
          div.classList.add('_faded');
          // TODO: generate stylesheet? add to non-essential part?
          div.style.backgroundImage = `url(${image})`;
          div.style.backgroundSize = 'cover';
          div.style.backgroundPosition = 'center center';
          div.style.zIndex = 1;
          div.style.position = 'absolute';
          div.style.top = 0;
          div.style.right = 0;
          div.style.bottom = 0;
          div.style.left = 0;
          return div;
        })
        ::mergeMap((div) => {
          const sidebar = document.getElementById('_sidebar');
          sidebar.appendChild(div);

          return animate(div, [
            { opacity: 0 },
            { opacity: 1 },
          ], {
            duration: duration + 16.67, // HACK: make it take longer, jtbs
            // easing: 'cubic-bezier(0,0,0.32,1)',
          })
          ::finallyRx(() => {
            // HACK: ideally we would do something like `pairwise`
            // to get a ref of the prev div
            const faded = sidebar.querySelectorAll('._faded');
            if (faded.length > 1) {
              faded[0].parentNode.removeChild(faded[0]);
            }
          });
        });

      imgObj.src = image; // Set source path

      return imgLoad$;
    }

    // else
    this.updateStyle(dataset);
    return Observable::empty();
  }
}
