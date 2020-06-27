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

_asyncToGenerator(function* () {
  var _document$getElementB;

  yield _common__WEBPACK_IMPORTED_MODULE_4__["stylesheetReady"];
  var pushStateEl = document.getElementById('_pushState');
  var searchFrag = Object(_common__WEBPACK_IMPORTED_MODULE_4__["importTemplate"])('_search-template');
  var workerHref = (_document$getElementB = document.getElementById('_hrefSearch')) === null || _document$getElementB === void 0 ? void 0 : _document$getElementB.href;

  if (searchFrag && workerHref) {
    var navbarEl = document.querySelector(SEL_NAVBAR_BTN_BAR);
    var [searchBtnEl, searchBoxEl, hitsEl] = searchFrag.children;
    if (!searchBtnEl || !searchBoxEl || !hitsEl || !navbarEl) return;
    navbarEl.insertBefore(searchBtnEl, navbarEl.querySelector('.nav-span'));
    navbarEl.insertBefore(searchBoxEl, navbarEl.querySelector('.nav-span'));
    navbarEl.insertBefore(hitsEl, navbarEl.querySelector('.nav-span'));
    var searchInputEl = searchBoxEl.querySelector('input[type=search]');
    var searchCloseEl = searchBoxEl.querySelector('button[type=reset]');
    if (!searchInputEl || !searchCloseEl) return;
    searchBtnEl.addEventListener('click', () => {
      searchInputEl.focus();
    });
    searchInputEl.addEventListener('focus', () => {
      searchInputEl.select();
      searchBoxEl.classList.add('show');
      if (searchInputEl.value !== '') hitsEl.style.display = '';
    });

    var closeHandler = () => {
      var _document$activeEleme;

      (_document$activeEleme = document.activeElement) === null || _document$activeEleme === void 0 ? void 0 : _document$activeEleme.blur();
      searchBoxEl.classList.remove('show');
      hitsEl.style.display = 'none';
    };

    hitsEl.style.display = 'none';
    searchCloseEl.addEventListener('click', closeHandler);
    pushStateEl === null || pushStateEl === void 0 ? void 0 : pushStateEl.addEventListener('hy-push-state-start', closeHandler); // Load search worker after user interaction

    yield Object(_common__WEBPACK_IMPORTED_MODULE_4__["once"])(document, 'click');
    var worker = new Worker(workerHref);
    var prevVal = '';
    Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["fromEvent"])(searchInputEl, 'keyup').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(e => {
      if (e.target.value === '' && prevVal === '' && e.keyCode === 27) {
        e.preventDefault();
        closeHandler();
      }

      prevVal = e.target.value;
    }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])(e => Object(_common__WEBPACK_IMPORTED_MODULE_4__["postMessage"])(worker, e.target.value)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(items => {
      if (items.length) {
        Object(lit_html__WEBPACK_IMPORTED_MODULE_2__["render"])(Object(lit_html__WEBPACK_IMPORTED_MODULE_2__["html"])(_templateObject(), Object(lit_html_directives_repeat__WEBPACK_IMPORTED_MODULE_3__["repeat"])(items, item => item.url, item => Object(lit_html__WEBPACK_IMPORTED_MODULE_2__["html"])(_templateObject2(), () => {
          var _pushStateEl$assign;

          return pushStateEl === null || pushStateEl === void 0 ? void 0 : (_pushStateEl$assign = pushStateEl.assign) === null || _pushStateEl$assign === void 0 ? void 0 : _pushStateEl$assign.call(pushStateEl, item.url);
        }, item.image ? Object(lit_html__WEBPACK_IMPORTED_MODULE_2__["html"])(_templateObject3(), item.image) : '', item.url, item.title, item.url, item.description ? Object(lit_html__WEBPACK_IMPORTED_MODULE_2__["html"])(_templateObject4(), item.description) : ''))), hitsEl);
        hitsEl.style.display = '';
      } else {
        hitsEl.style.display = 'none';
      }
    })).subscribe();
  }
})();

/***/ })

}]);
//# sourceMappingURL=search-hydejack-9.0.0-rc.js.map