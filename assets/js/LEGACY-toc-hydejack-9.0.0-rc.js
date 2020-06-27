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
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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




_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  var isLarge$, pushState, drawerEl, load$, toc$;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _common__WEBPACK_IMPORTED_MODULE_2__["stylesheetReady"];

        case 2:
          isLarge$ = Object(_common__WEBPACK_IMPORTED_MODULE_2__["fromMediaQuery"])(window.matchMedia(_common__WEBPACK_IMPORTED_MODULE_2__["BREAK_POINT_DYNAMIC"])).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["startWith"])(window.matchMedia(_common__WEBPACK_IMPORTED_MODULE_2__["BREAK_POINT_DYNAMIC"])), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (m) {
            return m.matches;
          }));
          pushState = document.getElementById('_pushState');
          drawerEl = document.getElementById('_drawer');

          if (pushState) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return");

        case 7:
          if (!(drawerEl && !window._noDrawer)) {
            _context.next = 10;
            break;
          }

          _context.next = 10;
          return drawerEl.initialized;

        case 10:
          _context.next = 12;
          return pushState.initialized;

        case 12:
          load$ = !window._noPushState ? Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["fromEvent"])(pushState, 'load').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["startWith"])({})) : Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])({});
          toc$ = load$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function () {
            return document.querySelector('#markdown-toc');
          }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["share"])());
          Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["combineLatest"])(toc$, isLarge$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])(function (_ref2) {
            var _ref3 = _slicedToArray(_ref2, 2),
                toc = _ref3[0],
                isLarge = _ref3[1];

            if (!toc || !isLarge) return rxjs__WEBPACK_IMPORTED_MODULE_0__["NEVER"];
            var scrollspy = document.createElement('div');
            toc.parentNode.insertBefore(scrollspy, toc);
            return Object(_common__WEBPACK_IMPORTED_MODULE_2__["createIntersectionObservable"])(scrollspy).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["mergeAll"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (x) {
              return !x.intersectionRatio;
            }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(function (affix) {
              if (affix) {
                toc.classList.add('affix');
              } else {
                toc.classList.remove('affix');
              }
            }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["finalize"])(function () {
              toc.classList.remove('affix');
            }));
          })).subscribe();
          Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["combineLatest"])(toc$, isLarge$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])(function (_ref4) {
            var _ref5 = _slicedToArray(_ref4, 2),
                toc = _ref5[0],
                isLarge = _ref5[1];

            if (!toc || !isLarge) return rxjs__WEBPACK_IMPORTED_MODULE_0__["NEVER"];
            var intersecting = new Set();
            var top = new WeakMap();
            var toObserve = Array.from(toc.querySelectorAll('li')).map(function (el) {
              return el.children[0].getAttribute('href') || '';
            }).map(function (hash) {
              return document.getElementById(hash.substr(1));
            }).filter(function (el) {
              return !!el;
            });
            var init = true;
            return Object(_common__WEBPACK_IMPORTED_MODULE_2__["createIntersectionObservable"])(toObserve).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(function (entries) {
              if (init) {
                entries.forEach(function (_ref6) {
                  var target = _ref6.target,
                      boundingClientRect = _ref6.boundingClientRect;
                  return top.set(target, Object(_common__WEBPACK_IMPORTED_MODULE_2__["getScrollTop"])() + boundingClientRect.top);
                });
                init = false;
              }

              entries.forEach(function (_ref7) {
                var isIntersecting = _ref7.isIntersecting,
                    target = _ref7.target;
                isIntersecting ? intersecting.add(target) : intersecting.delete(target);
              });
              var curr = Array.from(intersecting).reduce(function (min, el) {
                return top.get(el) >= top.get(min) ? min : el;
              }, null);

              if (curr) {
                toc.querySelectorAll('a').forEach(function (el) {
                  el.style.fontWeight = '';
                });
                var el = toc.querySelector("a[href=\"#".concat(curr.id, "\"]"));
                if (el) el.style.fontWeight = 'bold';
              }
            }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["finalize"])(function () {
              toc.querySelectorAll('a').forEach(function (el) {
                el.style.fontWeight = '';
              });
            }));
          })).subscribe();

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}))();

/***/ })

}]);
//# sourceMappingURL=LEGACY-toc-hydejack-9.0.0-rc.js.map