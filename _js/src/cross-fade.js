import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/zip';

import { animate } from './common';

let pageStyle;
let styleSheet;
let rules;
let lastImage;

export function setup() {
  pageStyle = document.getElementById('_page-style');
  styleSheet = Array.prototype.find.call(document.styleSheets, ss => ss.ownerNode === pageStyle);
  rules = styleSheet.cssRules || styleSheet.rules;
  lastImage = document.getElementById('_main').getAttribute('data-image');
}

export function updateStyle({ font = 'serif', fontHeading = 'sans-serif', color = '#00f' } = {}) {
  rules[0].style.fontFamily = font; // html
  rules[1].style.fontFamily = fontHeading; // h1, h2, h3, h4, h5, h6, .heading
  rules[2].style.color = color; // .content a
  rules[3].style.outlineColor = color; // :focus
  rules[4].style.backgroundColor = color; // ::selection
  rules[5].style.backgroundColor = color; // .sidebar
}

export function crossFade(dataset, { duration }) {
  const { image } = dataset;

  if (image != null && image !== lastImage) {
    const imgObj = new Image();

    const imgLoad$ = Observable.fromEvent(imgObj, 'load')
      .zip(Observable.timer(duration), x => x)
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
        div.style.position = 'absolute';
        div.style.top = 0;
        div.style.right = 0;
        div.style.bottom = 0;
        div.style.left = 0;
        return div;
      })
      .mergeMap((div) => {
        const sidebar = document.getElementById('_sidebar');
        sidebar.appendChild(div);

        return animate(div, [
          { opacity: 0 },
          { opacity: 1 },
        ], {
          duration: duration + 16.67, // HACK: make it take longer, jtbs
          easing: 'cubic-bezier(0,0,0.32,1)',
        })
        .finally(() => {
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
  updateStyle(dataset);
  return Observable.empty();
}
