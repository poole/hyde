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
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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




_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  var navbarEl, height, offset, tv, checkNavbarInactive, hashchange$, notScrollIntoView$, jump$;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _common__WEBPACK_IMPORTED_MODULE_2__["stylesheetReady"];

        case 2:
          navbarEl = document.getElementById('_navbar');

          if (navbarEl) {
            _context.next = 5;
            break;
          }

          return _context.abrupt("return");

        case 5:
          // FIXME: update when size changes
          height = navbarEl.clientHeight;
          offset = 0;
          tv = _common__WEBPACK_IMPORTED_MODULE_2__["hasCSSOM"] ? new CSSTransformValue([new CSSTranslate(CSS.px(0), CSS.px(0))]) : null;

          checkNavbarInactive = function checkNavbarInactive() {
            var _document$activeEleme;

            return !((_document$activeEleme = document.activeElement) === null || _document$activeEleme === void 0 ? void 0 : _document$activeEleme.classList.contains('nav-btn'));
          };

          hashchange$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["fromEvent"])(window, 'hashchange').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (e) {
            return new URL(e.newURL).hash;
          }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["filter"])(function (hash) {
            return hash !== '' && hash !== '#_search-input';
          }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["share"])()); // To disable the navbar while the "scroll into view" animation is active.

          notScrollIntoView$ = hashchange$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])(function () {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["timer"])(1000).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["mapTo"])(true), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["startWith"])(false));
          }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["startWith"])(true)); // Certain events should make the navbar "jump" to a new position.

          jump$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["merge"])( // Focusing any navbar element should show the navbar to enable keyboard-only interaction.
          Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["fromEvent"])(navbarEl, 'focus', {
            capture: true
          }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["mapTo"])(2 * height)), // Scrolling to a certain headline should hide the navbar to prevent hiding it.
          hashchange$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["mapTo"])(-2 * height)));
          Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["fromEvent"])(document, 'scroll', {
            passive: true
          }).pipe(Object(_common__WEBPACK_IMPORTED_MODULE_2__["filterWhen"])(notScrollIntoView$), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(_common__WEBPACK_IMPORTED_MODULE_2__["getScrollTop"]), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["filter"])(function (x) {
            return x >= 0;
          }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["pairwise"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (_ref2) {
            var _ref3 = _slicedToArray(_ref2, 2),
                prev = _ref3[0],
                curr = _ref3[1];

            return prev - curr;
          }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["filter"])(checkNavbarInactive), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["merge"])(jump$), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(function (x) {
            offset += x;
            offset = Math.max(-height, Math.min(0, offset));

            if (_common__WEBPACK_IMPORTED_MODULE_2__["hasCSSOM"]) {
              tv[0].y.value = offset;
              navbarEl.attributeStyleMap.set('transform', tv);
            } else {
              navbarEl.style.transform = "translateY(".concat(offset, "px)");
            }
          })).subscribe();

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}))();

/***/ })

}]);
//# sourceMappingURL=LEGACY-navbar-hydejack-9.0.0-rc.js.map