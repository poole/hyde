(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["drawer"],{

/***/ "./_js/src/drawer.js":
/*!***************************!*\
  !*** ./_js/src/drawer.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/dist/esm5/operators/index.js");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common */ "./_js/src/common.js");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Copyright (c) 2019 Florian Klampfer <https://qwtel.com/>
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




_asyncToGenerator(function* () {
  var _document$getElementB2;

  yield Promise.all([...('customElements' in window ? [] : [Promise.all(/*! import() | webcomponents */[__webpack_require__.e("vendors~webcomponents"), __webpack_require__.e("webcomponents")]).then(__webpack_require__.bind(null, /*! ./polyfills/webcomponents */ "./_js/src/polyfills/webcomponents.js")).then(() => Promise.all(/*! import() | shadydom */[__webpack_require__.e("vendors~shadydom"), __webpack_require__.e("shadydom")]).then(__webpack_require__.bind(null, /*! ./polyfills/shadydom */ "./_js/src/polyfills/shadydom.js")))]), ...('ResizeObserver' in window ? [] : [Promise.all(/*! import() | resize-observer */[__webpack_require__.e("vendors~resize-observer"), __webpack_require__.e("resize-observer")]).then(__webpack_require__.bind(null, /*! ./polyfills/resize-observer */ "./_js/src/polyfills/resize-observer.js"))])]);
  yield _common__WEBPACK_IMPORTED_MODULE_2__["webComponentsReady"];
  yield _common__WEBPACK_IMPORTED_MODULE_2__["stylesheetReady"];
  var MOBILE = 1;
  var DESKTOP = 2;
  var LARGE_DESKTOP = 3;

  var subscribeWhen = p$ => source => {
    if ( true && !p$) throw Error();
    return p$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])(p => p ? source : rxjs__WEBPACK_IMPORTED_MODULE_0__["NEVER"]));
  }; // Determines the range from which to draw the drawer in pixels, counted from the left edge.
  // It depends on the browser, e.g. Safari has a native gesture when sliding form the side,
  // so we ignore the first 35 pixels (roughly the range for the native gesture),
  // to avoid triggering both gestures.


  function getRange(drawerWidth, size) {
    if (size >= DESKTOP) return [0, drawerWidth];
    if (_common__WEBPACK_IMPORTED_MODULE_2__["isMobileSafari"]) return [35, 150];
    return [0, 150];
  } // The functions below add an svg graphic to the sidebar
  // that indicate that the sidebar can be drawn using touch gestures.


  function setupIcon(drawerEl) {
    var img = document.getElementById('_hrefSwipeSVG');

    if (img) {
      var _document$getElementB;

      var svg = document.createElement('img');
      svg.id = '_swipe';
      svg.src = img.href;
      svg.alt = 'Swipe image';
      svg.addEventListener('click', () => drawerEl.close());
      (_document$getElementB = document.getElementById('_sidebar')) === null || _document$getElementB === void 0 ? void 0 : _document$getElementB.appendChild(svg);
    }
  }

  function removeIcon() {
    var _svg$parentNode;

    var svg = document.getElementById('_swipe');
    svg === null || svg === void 0 ? void 0 : (_svg$parentNode = svg.parentNode) === null || _svg$parentNode === void 0 ? void 0 : _svg$parentNode.removeChild(svg);
  }

  var detectSize = () => window.matchMedia(_common__WEBPACK_IMPORTED_MODULE_2__["BREAK_POINT_DYNAMIC"]).matches ? LARGE_DESKTOP : window.matchMedia(_common__WEBPACK_IMPORTED_MODULE_2__["BREAK_POINT_3"]).matches ? DESKTOP : MOBILE; // First we get hold of some DOM elements.


  var drawerEl = document.getElementById('_drawer');
  var sidebarEl = document.getElementById('_sidebar');
  var contentEl = sidebarEl === null || sidebarEl === void 0 ? void 0 : sidebarEl.querySelector('.sidebar-sticky');
  if (!drawerEl || !sidebarEl || !contentEl) return;
  (_document$getElementB2 = document.getElementById('_menu')) === null || _document$getElementB2 === void 0 ? void 0 : _document$getElementB2.addEventListener('click', e => {
    e.preventDefault();
    e.stopPropagation();
    drawerEl.toggle();
  });
  sidebarEl.querySelectorAll('a[href^="/"]:not(.external)').forEach(el => el.addEventListener('click', () => drawerEl.close()));
  if (_common__WEBPACK_IMPORTED_MODULE_2__["isSafari"]) drawerEl.setAttribute('threshold', '0');
  if (!_common__WEBPACK_IMPORTED_MODULE_2__["isMobile"]) drawerEl.setAttribute('mouseevents', '');
  var [tValue, oValue] = _common__WEBPACK_IMPORTED_MODULE_2__["hasCSSOM"] ? [new CSSTransformValue([new CSSTranslate(CSS.px(0), CSS.px(0))]), CSS.number(1)] : [null, null];

  var updateSidebar = (t, size, distance) => {
    var value = distance * t;
    var opacity = size >= DESKTOP ? 1 : 1 - t;

    if (_common__WEBPACK_IMPORTED_MODULE_2__["hasCSSOM"]) {
      tValue[0].x.value = value;
      oValue.value = opacity;
      sidebarEl.attributeStyleMap.set('transform', tValue);
      contentEl.attributeStyleMap.set('opacity', oValue);
    } else {
      sidebarEl.style.transform = "translateX(".concat(value, "px)");
      contentEl.style.opacity = opacity;
    }
  }; // A flag for the 3 major viewport sizes we support


  var size$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["merge"])(Object(_common__WEBPACK_IMPORTED_MODULE_2__["fromMediaQuery"])(window.matchMedia(_common__WEBPACK_IMPORTED_MODULE_2__["BREAK_POINT_3"])), Object(_common__WEBPACK_IMPORTED_MODULE_2__["fromMediaQuery"])(window.matchMedia(_common__WEBPACK_IMPORTED_MODULE_2__["BREAK_POINT_DYNAMIC"]))).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["startWith"])({}), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(detectSize)); // An observable keeping track of the drawer (peek) width.

  var peekWidth$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["fromEvent"])(drawerEl, 'peek-width-change').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(e => e.detail)); // An observable keeping track the viewport width

  var viewWidth$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["fromEvent"])(window, 'resize', {
    passive: true
  }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["startWith"])({}), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(_common__WEBPACK_IMPORTED_MODULE_2__["getViewWidth"])); // An observable keeping track of the distance between
  // the middle point of the screen and the middle point of the drawer.

  var distance$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["combineLatest"])(peekWidth$, viewWidth$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])((_ref2) => {
    var [drawerWidth, viewWidth] = _ref2;
    return viewWidth / 2 - drawerWidth / 2;
  }));
  var t$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["merge"])(distance$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(() => drawerEl.opacity !== undefined ? 1 - drawerEl.opacity : opened ? 0 : 1)), Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["fromEvent"])(drawerEl, 'hy-drawer-move').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])((_ref3) => {
    var {
      detail: {
        opacity
      }
    } = _ref3;
    return 1 - opacity;
  })));
  drawerEl.addEventListener('hy-drawer-prepare', () => {
    sidebarEl.style.willChange = 'transform';
    contentEl.style.willChange = 'opacity';
  });
  drawerEl.addEventListener('hy-drawer-transitioned', () => {
    sidebarEl.style.willChange = '';
    contentEl.style.willChange = '';
  }); // Save scroll position before the drawer gets initialized.

  var scrollTop = Object(_common__WEBPACK_IMPORTED_MODULE_2__["getScrollTop"])(); // Start the drawer in `opened` state when the cover class is present,
  // and the user hasn't started scrolling already.

  var opened = drawerEl.classList.contains('cover') && scrollTop <= 0 && !(history.state && history.state.closedOnce);

  if (!opened) {
    if (!history.state) history.replaceState({}, document.title);
    history.state.closedOnce = true;
    drawerEl.removeAttribute('opened');
  }

  var opened$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["fromEvent"])(drawerEl, 'hy-drawer-transitioned').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(e => e.detail), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["distinctUntilChanged"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(opened => {
    if (!opened) {
      removeIcon();
      if (!history.state) history.replaceState({}, document.title);
      history.state.closedOnce = true;
    }
  }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["startWith"])(opened)); // We need the height of the drawer in case we need to reset the scroll position

  var drawerHeight = opened ? null : drawerEl.getBoundingClientRect().height;
  drawerEl.addEventListener('hy-drawer-init', () => {
    drawerEl.classList.add('loaded');
    setupIcon(drawerEl);

    if (drawerHeight && scrollTop >= drawerHeight) {
      window.scrollTo(0, scrollTop - drawerHeight);
    }
  }, {
    once: true
  });
  yield Promise.resolve(/*! import() eager */).then(__webpack_require__.bind(null, /*! @hydecorp/drawer */ "./node_modules/@hydecorp/drawer/lib/index.js"));
  window._drawer = drawerEl;
  t$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["withLatestFrom"])(size$, distance$), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(args => updateSidebar(...args))).subscribe(); // Keeping the drawer updated.

  peekWidth$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["withLatestFrom"])(size$), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(args => getRange(...args)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(range => {
    drawerEl.range = range;
  })).subscribe(); // Hacky way of letting the cover page close when scrolling

  Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["fromEvent"])(document, 'wheel', {
    passive: false
  }).pipe(subscribeWhen(opened$), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["filter"])(e => e.deltaY > 0), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(e => {
    if (drawerEl.translateX > 0) e.preventDefault();
  }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["throttleTime"])(500), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(() => drawerEl.close())).subscribe();
})();

/***/ })

}]);
//# sourceMappingURL=drawer-hydejack-9.0.4.js.map