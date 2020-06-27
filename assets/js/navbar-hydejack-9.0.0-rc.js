(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["navbar"],{

/***/ "./_js/src/navbar.js":
/*!***************************!*\
  !*** ./_js/src/navbar.js ***!
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

// Copyright (c) 2018 Florian Klampfer <https://qwtel.com/>
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
  var navbarEl = document.getElementById('_navbar');
  if (!navbarEl) return; // FIXME: update when size changes

  var height = navbarEl.clientHeight;
  var offset = 0;
  var tv = _common__WEBPACK_IMPORTED_MODULE_2__["hasCSSOM"] ? new CSSTransformValue([new CSSTranslate(CSS.px(0), CSS.px(0))]) : null;

  var checkNavbarInactive = () => {
    var _document$activeEleme;

    return !((_document$activeEleme = document.activeElement) === null || _document$activeEleme === void 0 ? void 0 : _document$activeEleme.classList.contains('nav-btn'));
  };

  var hashchange$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["fromEvent"])(window, 'hashchange').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(e => new URL(e.newURL).hash), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["filter"])(hash => hash !== '' && hash !== '#_search-input'), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["share"])()); // To disable the navbar while the "scroll into view" animation is active.

  var notScrollIntoView$ = hashchange$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])(() => Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["timer"])(1000).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["mapTo"])(true), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["startWith"])(false))), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["startWith"])(true)); // Certain events should make the navbar "jump" to a new position.

  var jump$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["merge"])( // Focusing any navbar element should show the navbar to enable keyboard-only interaction.
  Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["fromEvent"])(navbarEl, 'focus', {
    capture: true
  }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["mapTo"])(2 * height)), // Scrolling to a certain headline should hide the navbar to prevent hiding it.
  hashchange$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["mapTo"])(-2 * height)));
  Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["fromEvent"])(document, 'scroll', {
    passive: true
  }).pipe(Object(_common__WEBPACK_IMPORTED_MODULE_2__["filterWhen"])(notScrollIntoView$), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(_common__WEBPACK_IMPORTED_MODULE_2__["getScrollTop"]), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["filter"])(x => x >= 0), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["pairwise"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])((_ref2) => {
    var [prev, curr] = _ref2;
    return prev - curr;
  }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["filter"])(checkNavbarInactive), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["merge"])(jump$), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(x => {
    offset += x;
    offset = Math.max(-height, Math.min(0, offset));

    if (_common__WEBPACK_IMPORTED_MODULE_2__["hasCSSOM"]) {
      tv[0].y.value = offset;
      navbarEl.attributeStyleMap.set('transform', tv);
    } else {
      navbarEl.style.transform = "translateY(".concat(offset, "px)");
    }
  })).subscribe();
})();

/***/ })

}]);
//# sourceMappingURL=navbar-hydejack-9.0.0-rc.js.map