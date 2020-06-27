(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["toc"],{

/***/ "./_js/src/pro/toc.js":
/*!****************************!*\
  !*** ./_js/src/pro/toc.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/dist/esm5/operators/index.js");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common */ "./_js/src/common.js");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Copyright (c) 2020 Florian Klampfer <https://qwtel.com/>
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
  yield _common__WEBPACK_IMPORTED_MODULE_2__["stylesheetReady"];
  var isLarge$ = Object(_common__WEBPACK_IMPORTED_MODULE_2__["fromMediaQuery"])(window.matchMedia(_common__WEBPACK_IMPORTED_MODULE_2__["BREAK_POINT_DYNAMIC"])).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["startWith"])(window.matchMedia(_common__WEBPACK_IMPORTED_MODULE_2__["BREAK_POINT_DYNAMIC"])), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(m => m.matches));
  var pushState = document.getElementById('_pushState');
  var drawerEl = document.getElementById('_drawer');
  if (!pushState) return;
  if (drawerEl && !window._noDrawer) yield drawerEl.initialized;
  yield pushState.initialized;
  var load$ = !window._noPushState ? Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["fromEvent"])(pushState, 'load').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["startWith"])({})) : Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])({});
  var toc$ = load$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(() => document.querySelector('#markdown-toc')), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["share"])());
  Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["combineLatest"])(toc$, isLarge$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])((_ref2) => {
    var [toc, isLarge] = _ref2;
    if (!toc || !isLarge) return rxjs__WEBPACK_IMPORTED_MODULE_0__["NEVER"];
    var scrollspy = document.createElement('div');
    toc.parentNode.insertBefore(scrollspy, toc);
    return Object(_common__WEBPACK_IMPORTED_MODULE_2__["createIntersectionObservable"])(scrollspy).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["mergeAll"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(x => !x.intersectionRatio), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(affix => {
      if (affix) {
        toc.classList.add('affix');
      } else {
        toc.classList.remove('affix');
      }
    }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["finalize"])(() => {
      toc.classList.remove('affix');
    }));
  })).subscribe();
  Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["combineLatest"])(toc$, isLarge$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])((_ref3) => {
    var [toc, isLarge] = _ref3;
    if (!toc || !isLarge) return rxjs__WEBPACK_IMPORTED_MODULE_0__["NEVER"];
    var intersecting = new Set();
    var top = new WeakMap();
    var toObserve = Array.from(toc.querySelectorAll('li')).map(el => el.children[0].getAttribute('href') || '').map(hash => document.getElementById(hash.substr(1))).filter(el => !!el);
    var init = true;
    return Object(_common__WEBPACK_IMPORTED_MODULE_2__["createIntersectionObservable"])(toObserve).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(entries => {
      if (init) {
        entries.forEach((_ref4) => {
          var {
            target,
            boundingClientRect
          } = _ref4;
          return top.set(target, Object(_common__WEBPACK_IMPORTED_MODULE_2__["getScrollTop"])() + boundingClientRect.top);
        });
        init = false;
      }

      entries.forEach((_ref5) => {
        var {
          isIntersecting,
          target
        } = _ref5;
        isIntersecting ? intersecting.add(target) : intersecting.delete(target);
      });
      var curr = Array.from(intersecting).reduce((min, el) => top.get(el) >= top.get(min) ? min : el, null);

      if (curr) {
        toc.querySelectorAll('a').forEach(el => {
          el.style.fontWeight = '';
        });
        var el = toc.querySelector("a[href=\"#".concat(curr.id, "\"]"));
        if (el) el.style.fontWeight = 'bold';
      }
    }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["finalize"])(() => {
      toc.querySelectorAll('a').forEach(el => {
        el.style.fontWeight = '';
      });
    }));
  })).subscribe();
})();

/***/ })

}]);
//# sourceMappingURL=toc-hydejack-9.0.0-rc.js.map