import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';

import { animationFrame } from 'rxjs/scheduler/animationFrame';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/observeOn';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/zip';

import { animate } from './common';

// TODO:....
const DURATION = 300;

// TODO: naming!
const sTag = document.getElementById('_pageStyle');

const styleSheet = Array.prototype.find.call(document.styleSheets, x => x.ownerNode === sTag);
const rules = styleSheet.cssRules || styleSheet.rules;

let lastImage = document.querySelector('main').dataset.image;

export function updateStyle({ font = 'serif', fontHeading = 'sans-serif', color = '#00f' } = {}) {
  rules[0].style.fontFamily = font; // html
  rules[1].style.fontFamily = fontHeading; // h1, h2, h3, h4, h5, h6, .heading
  rules[2].style.color = color; // .content a
  rules[3].style.outlineColor = color; // :focus
  rules[4].style.backgroundColor = color; // ::selection
  rules[5].style.backgroundColor = color; // .sidebar

  // if (image != null && image !== lastImage) {
  //   lastImage = image;
  //   rules[5].style.backgroundImage = `url(${image})`;
  // }
}

export function upgradeStyle(dataset) {
  const { image } = dataset;

  if (image != null && image !== lastImage) {
    const imgObj = new Image();

    const imgLoad$ = Observable.fromEvent(imgObj, 'load')
      .finally(() => { imgObj.src = ''; }) // "cancel" the request // TODO: test!
      .do(() => {
        updateStyle(dataset);
        lastImage = image;
      })
      .map(() => {
        const div = document.createElement('div');
        div.classList.add('_faded');
        // TODO: generate stylesheet? add to non-essential part?
        div.style.backgroundImage = `url(${image})`;
        div.style.backgroundSize = 'cover';
        div.style.backgroundPosition = 'center center';
        div.style.zIndex = 1;
        div.style.opacity = 0;
        div.style.position = 'absolute';
        div.style.top = 0;
        div.style.right = 0;
        div.style.bottom = 0;
        div.style.left = 0;
        return div;
      })
      .observeOn(animationFrame)
      .mergeMap((div) => {
        const sidebar = document.getElementById('_sidebar');
        sidebar.appendChild(div);

        return animate(div, [
          { opacity: 0 },
          { opacity: 1 },
        ], {
          duration: DURATION + 100, // HACK: make it take longer, jtbs
          easing: 'cubic-bezier(0,0,0.32,1)',
          fill: 'forwards',
        })
        .finally(() => {
          // HACK:
          const faded = sidebar.querySelectorAll('._faded');
          if (faded.length > 1) {
            faded[0].parentNode.removeChild(faded[0]);
          }

          // sidebar.querySelector('');
          // TODO: no need to use css rules when we already know which element (singualr) it effects
          // rules[5].style.backgroundImage = `url(${image})`;

          // div.parentNode.removeChild(div);
          // imgObj.parentNode.removeChild(imgObj);
        });
      });

    imgObj.src = image; // Set source path

    return imgLoad$;
  }

  return Observable.empty();
}
