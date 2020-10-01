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
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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




_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  var _document$getElementB2;

  var MOBILE, DESKTOP, LARGE_DESKTOP, subscribeWhen, getRange, setupIcon, removeIcon, detectSize, drawerEl, sidebarEl, contentEl, _ref2, _ref3, tValue, oValue, updateSidebar, size$, peekWidth$, viewWidth$, distance$, t$, scrollTop, opened, opened$, drawerHeight;

  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          removeIcon = function _removeIcon() {
            var _svg$parentNode;

            var svg = document.getElementById('_swipe');
            svg === null || svg === void 0 ? void 0 : (_svg$parentNode = svg.parentNode) === null || _svg$parentNode === void 0 ? void 0 : _svg$parentNode.removeChild(svg);
          };

          setupIcon = function _setupIcon(drawerEl) {
            var img = document.getElementById('_hrefSwipeSVG');

            if (img) {
              var _document$getElementB;

              var svg = document.createElement('img');
              svg.id = '_swipe';
              svg.src = img.href;
              svg.alt = 'Swipe image';
              svg.addEventListener('click', function () {
                return drawerEl.close();
              });
              (_document$getElementB = document.getElementById('_sidebar')) === null || _document$getElementB === void 0 ? void 0 : _document$getElementB.appendChild(svg);
            }
          };

          getRange = function _getRange(drawerWidth, size) {
            if (size >= DESKTOP) return [0, drawerWidth];
            if (_common__WEBPACK_IMPORTED_MODULE_2__["isMobileSafari"]) return [35, 150];
            return [0, 150];
          };

          _context.next = 5;
          return Promise.all([].concat(_toConsumableArray('customElements' in window ? [] : [Promise.all(/*! import() | webcomponents */[__webpack_require__.e("vendors~webcomponents"), __webpack_require__.e("webcomponents")]).then(__webpack_require__.bind(null, /*! ./polyfills/webcomponents */ "./_js/src/polyfills/webcomponents.js")).then(function () {
            return Promise.all(/*! import() | shadydom */[__webpack_require__.e("vendors~shadydom"), __webpack_require__.e("shadydom")]).then(__webpack_require__.bind(null, /*! ./polyfills/shadydom */ "./_js/src/polyfills/shadydom.js"));
          })]), _toConsumableArray('ResizeObserver' in window ? [] : [Promise.all(/*! import() | resize-observer */[__webpack_require__.e("vendors~resize-observer"), __webpack_require__.e("resize-observer")]).then(__webpack_require__.bind(null, /*! ./polyfills/resize-observer */ "./_js/src/polyfills/resize-observer.js"))])));

        case 5:
          _context.next = 7;
          return _common__WEBPACK_IMPORTED_MODULE_2__["webComponentsReady"];

        case 7:
          _context.next = 9;
          return _common__WEBPACK_IMPORTED_MODULE_2__["stylesheetReady"];

        case 9:
          MOBILE = 1;
          DESKTOP = 2;
          LARGE_DESKTOP = 3;

          subscribeWhen = function subscribeWhen(p$) {
            return function (source) {
              if ( true && !p$) throw Error();
              return p$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])(function (p) {
                return p ? source : rxjs__WEBPACK_IMPORTED_MODULE_0__["NEVER"];
              }));
            };
          }; // Determines the range from which to draw the drawer in pixels, counted from the left edge.
          // It depends on the browser, e.g. Safari has a native gesture when sliding form the side,
          // so we ignore the first 35 pixels (roughly the range for the native gesture),
          // to avoid triggering both gestures.


          detectSize = function detectSize() {
            return window.matchMedia(_common__WEBPACK_IMPORTED_MODULE_2__["BREAK_POINT_DYNAMIC"]).matches ? LARGE_DESKTOP : window.matchMedia(_common__WEBPACK_IMPORTED_MODULE_2__["BREAK_POINT_3"]).matches ? DESKTOP : MOBILE;
          }; // First we get hold of some DOM elements.


          drawerEl = document.getElementById('_drawer');
          sidebarEl = document.getElementById('_sidebar');
          contentEl = sidebarEl === null || sidebarEl === void 0 ? void 0 : sidebarEl.querySelector('.sidebar-sticky');

          if (!(!drawerEl || !sidebarEl || !contentEl)) {
            _context.next = 19;
            break;
          }

          return _context.abrupt("return");

        case 19:
          (_document$getElementB2 = document.getElementById('_menu')) === null || _document$getElementB2 === void 0 ? void 0 : _document$getElementB2.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            drawerEl.toggle();
          });
          sidebarEl.querySelectorAll('a[href^="/"]:not(.external)').forEach(function (el) {
            return el.addEventListener('click', function () {
              return drawerEl.close();
            });
          });
          if (_common__WEBPACK_IMPORTED_MODULE_2__["isSafari"]) drawerEl.setAttribute('threshold', '0');
          if (!_common__WEBPACK_IMPORTED_MODULE_2__["isMobile"]) drawerEl.setAttribute('mouseevents', '');
          _ref2 = _common__WEBPACK_IMPORTED_MODULE_2__["hasCSSOM"] ? [new CSSTransformValue([new CSSTranslate(CSS.px(0), CSS.px(0))]), CSS.number(1)] : [null, null], _ref3 = _slicedToArray(_ref2, 2), tValue = _ref3[0], oValue = _ref3[1];

          updateSidebar = function updateSidebar(t, size, distance) {
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


          size$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["merge"])(Object(_common__WEBPACK_IMPORTED_MODULE_2__["fromMediaQuery"])(window.matchMedia(_common__WEBPACK_IMPORTED_MODULE_2__["BREAK_POINT_3"])), Object(_common__WEBPACK_IMPORTED_MODULE_2__["fromMediaQuery"])(window.matchMedia(_common__WEBPACK_IMPORTED_MODULE_2__["BREAK_POINT_DYNAMIC"]))).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["startWith"])({}), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(detectSize)); // An observable keeping track of the drawer (peek) width.

          peekWidth$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["fromEvent"])(drawerEl, 'peek-width-change').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (e) {
            return e.detail;
          })); // An observable keeping track the viewport width

          viewWidth$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["fromEvent"])(window, 'resize', {
            passive: true
          }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["startWith"])({}), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(_common__WEBPACK_IMPORTED_MODULE_2__["getViewWidth"])); // An observable keeping track of the distance between
          // the middle point of the screen and the middle point of the drawer.

          distance$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["combineLatest"])(peekWidth$, viewWidth$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (_ref4) {
            var _ref5 = _slicedToArray(_ref4, 2),
                drawerWidth = _ref5[0],
                viewWidth = _ref5[1];

            return viewWidth / 2 - drawerWidth / 2;
          }));
          t$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["merge"])(distance$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function () {
            return drawerEl.opacity !== undefined ? 1 - drawerEl.opacity : opened ? 0 : 1;
          })), Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["fromEvent"])(drawerEl, 'hy-drawer-move').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (_ref6) {
            var opacity = _ref6.detail.opacity;
            return 1 - opacity;
          })));
          drawerEl.addEventListener('hy-drawer-prepare', function () {
            sidebarEl.style.willChange = 'transform';
            contentEl.style.willChange = 'opacity';
          });
          drawerEl.addEventListener('hy-drawer-transitioned', function () {
            sidebarEl.style.willChange = '';
            contentEl.style.willChange = '';
          }); // Save scroll position before the drawer gets initialized.

          scrollTop = Object(_common__WEBPACK_IMPORTED_MODULE_2__["getScrollTop"])(); // Start the drawer in `opened` state when the cover class is present,
          // and the user hasn't started scrolling already.

          opened = drawerEl.classList.contains('cover') && scrollTop <= 0 && !(history.state && history.state.closedOnce);

          if (!opened) {
            if (!history.state) history.replaceState({}, document.title);
            history.state.closedOnce = true;
            drawerEl.removeAttribute('opened');
          }

          opened$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["fromEvent"])(drawerEl, 'hy-drawer-transitioned').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (e) {
            return e.detail;
          }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["distinctUntilChanged"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(function (opened) {
            if (!opened) {
              removeIcon();
              if (!history.state) history.replaceState({}, document.title);
              history.state.closedOnce = true;
            }
          }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["startWith"])(opened)); // We need the height of the drawer in case we need to reset the scroll position

          drawerHeight = opened ? null : drawerEl.getBoundingClientRect().height;
          drawerEl.addEventListener('hy-drawer-init', function () {
            drawerEl.classList.add('loaded');
            setupIcon(drawerEl);

            if (drawerHeight && scrollTop >= drawerHeight) {
              window.scrollTo(0, scrollTop - drawerHeight);
            }
          }, {
            once: true
          });
          _context.next = 40;
          return Promise.resolve(/*! import() eager */).then(__webpack_require__.bind(null, /*! @hydecorp/drawer */ "./node_modules/@hydecorp/drawer/lib/index.js"));

        case 40:
          window._drawer = drawerEl;
          t$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["withLatestFrom"])(size$, distance$), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(function (args) {
            return updateSidebar.apply(void 0, _toConsumableArray(args));
          })).subscribe(); // Keeping the drawer updated.

          peekWidth$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["withLatestFrom"])(size$), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (args) {
            return getRange.apply(void 0, _toConsumableArray(args));
          }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(function (range) {
            drawerEl.range = range;
          })).subscribe(); // Hacky way of letting the cover page close when scrolling

          Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["fromEvent"])(document, 'wheel', {
            passive: false
          }).pipe(subscribeWhen(opened$), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["filter"])(function (e) {
            return e.deltaY > 0;
          }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(function (e) {
            if (drawerEl.translateX > 0) e.preventDefault();
          }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["throttleTime"])(500), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(function () {
            return drawerEl.close();
          })).subscribe();

        case 44:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}))();

/***/ })

}]);
//# sourceMappingURL=LEGACY-drawer-hydejack-9.0.4.js.map