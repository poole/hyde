(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["search"],{

/***/ "./_js/src/pro/search.js":
/*!*******************************!*\
  !*** ./_js/src/pro/search.js ***!
  \*******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/dist/esm5/operators/index.js");
/* harmony import */ var lit_html__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lit-html */ "./node_modules/lit-html/lit-html.js");
/* harmony import */ var lit_html_directives_repeat__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lit-html/directives/repeat */ "./node_modules/lit-html/directives/repeat.js");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common */ "./_js/src/common.js");
function _templateObject4() {
  var data = _taggedTemplateLiteral([" <p>", "</p> "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral([" <img src=\"", "\" /> "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n                      <li class=\"search-item\" @click=", ">\n                        <div class=\"search-img aspect-ratio sixteen-ten\">\n                          ", "\n                        </div>\n                        <div class=\"search-text\">\n                          <p>\n                            <a class=\"heading\" href=", ">", "</a>\n                            <small>", "</small>\n                          </p>\n                          ", "\n                        </div>\n                      </li>\n                    "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n                <ul>\n                  ", "\n                </ul>\n              "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

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





var SEL_NAVBAR_BTN_BAR = '#_navbar > .content > .nav-btn-bar';

_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  var _document$getElementB;

  var pushStateEl, searchFrag, workerHref, navbarEl, _searchFrag$children, searchBtnEl, searchBoxEl, hitsEl, searchInputEl, searchCloseEl, closeHandler, worker, prevVal;

  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _common__WEBPACK_IMPORTED_MODULE_4__["stylesheetReady"];

        case 2:
          pushStateEl = document.getElementById('_pushState');
          searchFrag = Object(_common__WEBPACK_IMPORTED_MODULE_4__["importTemplate"])('_search-template');
          workerHref = (_document$getElementB = document.getElementById('_hrefSearch')) === null || _document$getElementB === void 0 ? void 0 : _document$getElementB.href;

          if (!(searchFrag && workerHref)) {
            _context.next = 28;
            break;
          }

          navbarEl = document.querySelector(SEL_NAVBAR_BTN_BAR);
          _searchFrag$children = _slicedToArray(searchFrag.children, 3), searchBtnEl = _searchFrag$children[0], searchBoxEl = _searchFrag$children[1], hitsEl = _searchFrag$children[2];

          if (!(!searchBtnEl || !searchBoxEl || !hitsEl || !navbarEl)) {
            _context.next = 10;
            break;
          }

          return _context.abrupt("return");

        case 10:
          navbarEl.insertBefore(searchBtnEl, navbarEl.querySelector('.nav-span'));
          navbarEl.insertBefore(searchBoxEl, navbarEl.querySelector('.nav-span'));
          navbarEl.insertBefore(hitsEl, navbarEl.querySelector('.nav-span'));
          searchInputEl = searchBoxEl.querySelector('input[type=search]');
          searchCloseEl = searchBoxEl.querySelector('button[type=reset]');

          if (!(!searchInputEl || !searchCloseEl)) {
            _context.next = 17;
            break;
          }

          return _context.abrupt("return");

        case 17:
          searchBtnEl.addEventListener('click', function () {
            searchInputEl.focus();
          });
          searchInputEl.addEventListener('focus', function () {
            searchInputEl.select();
            searchBoxEl.classList.add('show');
            if (searchInputEl.value !== '') hitsEl.style.display = '';
          });

          closeHandler = function closeHandler() {
            var _document$activeEleme;

            (_document$activeEleme = document.activeElement) === null || _document$activeEleme === void 0 ? void 0 : _document$activeEleme.blur();
            searchBoxEl.classList.remove('show');
            hitsEl.style.display = 'none';
          };

          hitsEl.style.display = 'none';
          searchCloseEl.addEventListener('click', closeHandler);
          pushStateEl === null || pushStateEl === void 0 ? void 0 : pushStateEl.addEventListener('hy-push-state-start', closeHandler); // Load search worker after user interaction

          _context.next = 25;
          return Object(_common__WEBPACK_IMPORTED_MODULE_4__["once"])(document, 'click');

        case 25:
          worker = new Worker(workerHref);
          prevVal = '';
          Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["fromEvent"])(searchInputEl, 'keyup').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(function (e) {
            if (e.target.value === '' && prevVal === '' && e.keyCode === 27) {
              e.preventDefault();
              closeHandler();
            }

            prevVal = e.target.value;
          }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])(function (e) {
            return Object(_common__WEBPACK_IMPORTED_MODULE_4__["postMessage"])(worker, e.target.value);
          }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(function (items) {
            if (items.length) {
              Object(lit_html__WEBPACK_IMPORTED_MODULE_2__["render"])(Object(lit_html__WEBPACK_IMPORTED_MODULE_2__["html"])(_templateObject(), Object(lit_html_directives_repeat__WEBPACK_IMPORTED_MODULE_3__["repeat"])(items, function (item) {
                return item.url;
              }, function (item) {
                return Object(lit_html__WEBPACK_IMPORTED_MODULE_2__["html"])(_templateObject2(), function () {
                  var _pushStateEl$assign;

                  return pushStateEl === null || pushStateEl === void 0 ? void 0 : (_pushStateEl$assign = pushStateEl.assign) === null || _pushStateEl$assign === void 0 ? void 0 : _pushStateEl$assign.call(pushStateEl, item.url);
                }, item.image ? Object(lit_html__WEBPACK_IMPORTED_MODULE_2__["html"])(_templateObject3(), item.image) : '', item.url, item.title, item.url, item.description ? Object(lit_html__WEBPACK_IMPORTED_MODULE_2__["html"])(_templateObject4(), item.description) : '');
              })), hitsEl);
              hitsEl.style.display = '';
            } else {
              hitsEl.style.display = 'none';
            }
          })).subscribe();

        case 28:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}))();

/***/ })

}]);
//# sourceMappingURL=LEGACY-search-hydejack-9.0.0-rc.js.map