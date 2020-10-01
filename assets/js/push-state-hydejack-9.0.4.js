(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["push-state"],{

/***/ "./_js/src/cross-fader.js":
/*!********************************!*\
  !*** ./_js/src/cross-fader.js ***!
  \********************************/
/*! exports provided: CrossFader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CrossFader", function() { return CrossFader; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/dist/esm5/operators/index.js");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common */ "./_js/src/common.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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



var RE_CSS_URL = /url[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*\(["']?(((?:[\0-!#-&\(-\[\]-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])|\\(?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]))*)["']?\)/;
/** @param {Document} doc */

var calcHash = doc => {
  var _pageStyle$innerText;

  var sidebarBg = doc.querySelector('.sidebar-bg');
  var pageStyle = doc.querySelector('#_pageStyle'); // const rule = Array.from(pageStyle?.sheet?.rules ?? []).find(r => r.selectorText === 'html');
  // const accentColor = rule?.style.getPropertyValue('--accent-color') ?? '';
  // const themeColor = rule?.style.getPropertyValue('--theme-color') ?? '';

  return [pageStyle === null || pageStyle === void 0 ? void 0 : (_pageStyle$innerText = pageStyle.innerText) === null || _pageStyle$innerText === void 0 ? void 0 : _pageStyle$innerText.trim(), sidebarBg === null || sidebarBg === void 0 ? void 0 : sidebarBg.classList, sidebarBg === null || sidebarBg === void 0 ? void 0 : sidebarBg.style.backgroundImage].join('\n');
};
/**
 * Consider a URL external if either the protocol, hostname or port is different.
 * @param {URL} param0
 * @param {Location=} location
 */


function isExternal(_ref) {
  var {
    protocol,
    host
  } = _ref;
  var location = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window.location;
  return protocol !== location.protocol || host !== location.host;
}

var objectURLs = new WeakMap();
class CrossFader {
  /** @param {number} fadeDuration */
  constructor(fadeDuration) {
    this.sidebar = document.getElementById('_sidebar');
    this.fadeDuration = fadeDuration;
    this.prevHash = calcHash(document);
    this.themeColorEl = document.querySelector('meta[name="theme-color"]');
  }
  /** @param {Document} newDocument */


  fetchImage2(newDocument) {
    var _newDocument$querySel, _newDocument$querySel2;

    var {
      backgroundImage = ''
    } = (_newDocument$querySel = (_newDocument$querySel2 = newDocument.querySelector('.sidebar-bg')) === null || _newDocument$querySel2 === void 0 ? void 0 : _newDocument$querySel2.style) !== null && _newDocument$querySel !== void 0 ? _newDocument$querySel : {};
    var result = RE_CSS_URL.exec(backgroundImage);

    if (!result) {
      return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])('');
    }

    var url = new URL(result[1], window.location.origin);
    return Object(_common__WEBPACK_IMPORTED_MODULE_2__["fetchRx"])(url.href, _objectSpread({
      method: 'GET',
      headers: {
        Accept: 'image/*'
      }
    }, isExternal(url) ? {
      mode: 'cors'
    } : {})).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])(r => r.blob()), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(blob => URL.createObjectURL(blob)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["catchError"])(() => Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])(url.href)));
  }
  /** @param {Document} newDocument */


  fetchImage(newDocument) {
    var hash = calcHash(newDocument);
    if (hash === this.prevHash) return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["empty"])();
    return this.fetchImage2(newDocument).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(objectURL => {
      var _newDocument$querySel3;

      /** @type {HTMLDivElement} */
      var div = (_newDocument$querySel3 = newDocument.querySelector('.sidebar-bg')) !== null && _newDocument$querySel3 !== void 0 ? _newDocument$querySel3 : document.createElement('div');

      if (objectURL) {
        div.style.backgroundImage = "url(".concat(objectURL, ")");
        objectURLs.set(div, objectURL);
      }

      return [div, hash, newDocument];
    }));
  }
  /** @param {Document} newDocument */


  updateStyle(newDocument) {
    if (this.themeColorEl) {
      var _newDocument$head$que;

      var themeColor = (_newDocument$head$que = newDocument.head.querySelector('meta[name="theme-color"]')) === null || _newDocument$head$que === void 0 ? void 0 : _newDocument$head$que.content;

      if (themeColor) {
        window.setTimeout(() => {
          if (this.themeColorEl) {
            this.themeColorEl.content = themeColor;
          }
        }, 250);
      }
    }

    try {
      var _pageStyle$parentNode;

      var pageStyle = document.getElementById('_pageStyle');
      var newPageStyle = newDocument.getElementById('_pageStyle');
      if (!newPageStyle) return;
      pageStyle === null || pageStyle === void 0 ? void 0 : (_pageStyle$parentNode = pageStyle.parentNode) === null || _pageStyle$parentNode === void 0 ? void 0 : _pageStyle$parentNode.replaceChild(newPageStyle, pageStyle);
    } catch (e) {
      if (true) console.error(e);
    }
  }
  /**
   * @param {[HTMLDivElement]} param0
   * @param {[HTMLDListElement, string, Document]} param1
   */


  fade(_ref2, _ref3) {
    var _prevDiv$parentNode;

    var [prevDiv] = _ref2;
    var [div, hash, newDocument] = _ref3;
    prevDiv === null || prevDiv === void 0 ? void 0 : (_prevDiv$parentNode = prevDiv.parentNode) === null || _prevDiv$parentNode === void 0 ? void 0 : _prevDiv$parentNode.insertBefore(div, prevDiv.nextElementSibling);
    this.updateStyle(newDocument); // Only update the prev hash after we're actually in the fade stage

    this.prevHash = hash;
    return Object(_common__WEBPACK_IMPORTED_MODULE_2__["animate"])(div, [{
      opacity: 0
    }, {
      opacity: 1
    }], {
      duration: this.fadeDuration,
      easing: 'ease'
    }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["finalize"])(() => {
      var _prevDiv$parentNode2;

      if (objectURLs.has(prevDiv)) URL.revokeObjectURL(objectURLs.get(prevDiv));
      prevDiv === null || prevDiv === void 0 ? void 0 : (_prevDiv$parentNode2 = prevDiv.parentNode) === null || _prevDiv$parentNode2 === void 0 ? void 0 : _prevDiv$parentNode2.removeChild(prevDiv);
    }));
  }

}

/***/ }),

/***/ "./_js/src/flip/index.js":
/*!*******************************!*\
  !*** ./_js/src/flip/index.js ***!
  \*******************************/
/*! exports provided: setupFLIP */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setupFLIP", function() { return setupFLIP; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/dist/esm5/operators/index.js");
/* harmony import */ var _title__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./title */ "./_js/src/flip/title.js");
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



var FLIP_TYPES = ['title'];
function setupFLIP(start$, ready$, fadeIn$, options) {
  var other$ = start$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["filter"])((_ref) => {
    var {
      flipType
    } = _ref;
    return !FLIP_TYPES.includes(flipType);
  }));
  return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["merge"])(Object(_title__WEBPACK_IMPORTED_MODULE_2__["setupFLIPTitle"])(start$, ready$, fadeIn$, options), other$);
}

/***/ }),

/***/ "./_js/src/flip/title.js":
/*!*******************************!*\
  !*** ./_js/src/flip/title.js ***!
  \*******************************/
/*! exports provided: setupFLIPTitle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setupFLIPTitle", function() { return setupFLIPTitle; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/dist/esm5/operators/index.js");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common */ "./_js/src/common.js");
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



var TITLE_SELECTOR = '.page-title, .post-title';
function setupFLIPTitle(start$, ready$, fadeIn$, _ref) {
  var {
    animationMain,
    settings
  } = _ref;
  if (!animationMain) return start$;
  var flip$ = start$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["filter"])((_ref2) => {
    var {
      flipType
    } = _ref2;
    return flipType === 'title';
  }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])((_ref3) => {
    var {
      anchor
    } = _ref3;
    if (!anchor) return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])({});
    var title = document.createElement('h1');
    title.classList.add('page-title');
    title.textContent = anchor.textContent;
    title.style.transformOrigin = 'left top';
    var page = animationMain.querySelector('.page');
    if (!page) return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])({});
    _common__WEBPACK_IMPORTED_MODULE_2__["empty"].call(page);
    page.appendChild(title);
    animationMain.style.position = 'fixed';
    animationMain.style.opacity = 1;
    var first = anchor.getBoundingClientRect();
    var last = title.getBoundingClientRect();
    var firstFontSize = parseInt(getComputedStyle(anchor).fontSize, 10);
    var lastFontSize = parseInt(getComputedStyle(title).fontSize, 10);
    var invertX = first.left - last.left;
    var invertY = first.top - last.top;
    var invertScale = firstFontSize / lastFontSize;
    anchor.style.opacity = 0;
    var transform = [{
      transform: "translate3d(".concat(invertX, "px, ").concat(invertY, "px, 0) scale(").concat(invertScale, ")")
    }, {
      transform: 'translate3d(0, 0, 0) scale(1)'
    }];
    return Object(_common__WEBPACK_IMPORTED_MODULE_2__["animate"])(title, transform, settings).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])({
      complete() {
        animationMain.style.position = 'absolute';
      }

    }));
  }));
  start$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])((_ref4) => {
    var {
      flipType
    } = _ref4;
    return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["zip"])(ready$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["filter"])(() => flipType === 'title'), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])((_ref5) => {
      var {
        replaceEls: [main]
      } = _ref5;
      var title = main.querySelector(TITLE_SELECTOR);
      if (title) title.style.opacity = 0;
      return title;
    })), fadeIn$, x => x).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(title => {
      if (title) title.style.opacity = 1;
      animationMain.style.opacity = 0;
    }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["finalize"])(() => {
      animationMain.style.opacity = 0;
    }));
  })).subscribe();
  return flip$;
}

/***/ }),

/***/ "./_js/src/push-state.js":
/*!*******************************!*\
  !*** ./_js/src/push-state.js ***!
  \*******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/dist/esm5/operators/index.js");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common */ "./_js/src/common.js");
/* harmony import */ var _cross_fader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cross-fader */ "./_js/src/cross-fader.js");
/* harmony import */ var _flip__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./flip */ "./_js/src/flip/index.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
  yield Promise.all([...('fetch' in window ? [] : [Promise.all(/*! import() | fetch */[__webpack_require__.e("vendors~fetch"), __webpack_require__.e("fetch")]).then(__webpack_require__.bind(null, /*! ./polyfills/fetch */ "./_js/src/polyfills/fetch.js"))]), ...('customElements' in window ? [] : [Promise.all(/*! import() | webcomponents */[__webpack_require__.e("vendors~webcomponents"), __webpack_require__.e("webcomponents")]).then(__webpack_require__.bind(null, /*! ./polyfills/webcomponents */ "./_js/src/polyfills/webcomponents.js"))]), ...('animate' in Element.prototype ? [] : [__webpack_require__.e(/*! import() | webanimations */ "vendors~webanimations").then(__webpack_require__.t.bind(null, /*! web-animations-js */ "./node_modules/web-animations-js/web-animations.min.js", 7))]), ...('IntersectionObserver' in window ? [] : [__webpack_require__.e(/*! import() | intersection-observer */ "vendors~intersection-observer").then(__webpack_require__.t.bind(null, /*! intersection-observer */ "./node_modules/intersection-observer/intersection-observer.js", 7))])]);
  yield _common__WEBPACK_IMPORTED_MODULE_2__["webComponentsReady"];
  var NAVBAR_SEL = '#_navbar > .content > .nav-btn-bar';
  var MQ_STANDALONE = '(display-mode: standalone)';
  var CROSS_FADE_DURATION = 2000;
  var FADE_OUT = [{
    opacity: 1
  }, {
    opacity: 0
  }];
  var FADE_IN = [{
    opacity: 0,
    transform: 'translateY(-3rem)'
  }, {
    opacity: 1,
    transform: 'translateY(0)'
  }];

  function setupAnimationMain(pushStateEl) {
    var _pushStateEl$parentNo;

    pushStateEl === null || pushStateEl === void 0 ? void 0 : (_pushStateEl$parentNo = pushStateEl.parentNode) === null || _pushStateEl$parentNo === void 0 ? void 0 : _pushStateEl$parentNo.insertBefore(Object(_common__WEBPACK_IMPORTED_MODULE_2__["importTemplate"])('_animation-template'), pushStateEl);
    return pushStateEl === null || pushStateEl === void 0 ? void 0 : pushStateEl.previousElementSibling;
  }

  function setupLoading(navbarEl) {
    navbarEl === null || navbarEl === void 0 ? void 0 : navbarEl.appendChild(Object(_common__WEBPACK_IMPORTED_MODULE_2__["importTemplate"])('_loading-template'));
    return navbarEl === null || navbarEl === void 0 ? void 0 : navbarEl.lastElementChild;
  }

  function setupErrorPage(main, url) {
    var {
      pathname
    } = url;
    var error = Object(_common__WEBPACK_IMPORTED_MODULE_2__["importTemplate"])('_error-template');
    var anchor = error === null || error === void 0 ? void 0 : error.querySelector('.this-link');

    if (anchor) {
      anchor.href = pathname;
      anchor.textContent = pathname;
    }

    main === null || main === void 0 ? void 0 : main.appendChild(error);
    return main === null || main === void 0 ? void 0 : main.lastElementChild;
  }

  function importBackButton() {
    var _button$querySelector;

    var button = Object(_common__WEBPACK_IMPORTED_MODULE_2__["importTemplate"])('_back-template');
    var buttonEl = button === null || button === void 0 ? void 0 : button.children[0];
    button === null || button === void 0 ? void 0 : (_button$querySelector = button.querySelector('.nav-btn')) === null || _button$querySelector === void 0 ? void 0 : _button$querySelector.addEventListener('click', () => window.history.back());
    return buttonEl;
  }

  function getFlipType(el) {
    var _el$getAttribute;

    if (el === null || el === void 0 ? void 0 : el.classList.contains('flip-title')) return 'title';
    if (el === null || el === void 0 ? void 0 : el.classList.contains('flip-project')) return 'project';
    return el === null || el === void 0 ? void 0 : (_el$getAttribute = el.getAttribute) === null || _el$getAttribute === void 0 ? void 0 : _el$getAttribute.call(el, 'data-flip');
  }

  var pushStateEl = document.querySelector('hy-push-state');
  if (!pushStateEl) return;
  var duration = Number(pushStateEl.getAttribute('duration')) || 350;
  var settings = {
    duration: duration,
    easing: 'ease'
  };

  var animateFadeOut = (_ref2) => {
    var {
      main
    } = _ref2;
    return Object(_common__WEBPACK_IMPORTED_MODULE_2__["animate"])(main, FADE_OUT, _objectSpread(_objectSpread({}, settings), {}, {
      fill: 'forwards'
    })).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["mapTo"])({
      main
    }));
  };

  var animateFadeIn = (_ref3) => {
    var {
      replaceEls: [main],
      flipType
    } = _ref3;
    return Object(_common__WEBPACK_IMPORTED_MODULE_2__["animate"])(main, FADE_IN, settings).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["mapTo"])({
      main,
      flipType
    }));
  };

  var drawerEl = document.querySelector('hy-drawer');
  var navbarEl = document.querySelector(NAVBAR_SEL);
  var animationMain = setupAnimationMain(pushStateEl);
  var loadingEl = setupLoading(navbarEl);
  var backBtnEl = importBackButton();

  if (navbarEl && backBtnEl) {
    var standaloneMQ = window.matchMedia(MQ_STANDALONE);
    var standalone = !!navigator.standalone || standaloneMQ.matches;
    var standalone$ = Object(_common__WEBPACK_IMPORTED_MODULE_2__["fromMediaQuery"])(standaloneMQ).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(e => e.matches), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["startWith"])(standalone));
    standalone$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(matches => {
      if (matches) navbarEl.prepend(backBtnEl);else if (backBtnEl.parentNode === navbarEl) navbarEl.removeChild(backBtnEl);
    })).subscribe();
  }

  var fromEventX = (eventName, mapFn) => Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["fromEvent"])(pushStateEl, eventName).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])((_ref4) => {
    var {
      detail
    } = _ref4;
    return detail;
  }), mapFn ? Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(mapFn) : _ => _, Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["share"])());

  var start$ = fromEventX('hy-push-state-start', detail => Object.assign(detail, {
    flipType: getFlipType(detail.anchor)
  }));
  var ready$ = fromEventX('hy-push-state-ready');
  var after$ = fromEventX('hy-push-state-after');
  var progress$ = fromEventX('hy-push-state-progress');
  var error$ = fromEventX('hy-push-state-networkerror');
  var fadeOut$ = start$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(context => Object.assign(context, {
    main: document.getElementById('_main')
  })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])((_ref5) => {
    var {
      main
    } = _ref5;
    main.style.pointerEvents = 'none';
  }), window._noDrawer && (drawerEl === null || drawerEl === void 0 ? void 0 : drawerEl.classList.contains('cover')) ? Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(() => {
    var _drawerEl$parentNode;

    drawerEl.classList.remove('cover');
    (_drawerEl$parentNode = drawerEl.parentNode) === null || _drawerEl$parentNode === void 0 ? void 0 : _drawerEl$parentNode.appendChild(drawerEl);
  }) : _ => _, Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["exhaustMap"])(animateFadeOut), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])((_ref6) => {
    var {
      main
    } = _ref6;
    return _common__WEBPACK_IMPORTED_MODULE_2__["empty"].call(main);
  }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["share"])());

  if (loadingEl) {
    progress$.subscribe(() => {
      loadingEl.style.display = 'flex';
    });
    ready$.subscribe(() => {
      loadingEl.style.display = 'none';
    });
  }

  var fadeIn$ = after$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])(context => {
    var p = animateFadeIn(context).toPromise();
    context.transitionUntil(p);
    return p;
  }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["share"])());
  var flip$ = Object(_flip__WEBPACK_IMPORTED_MODULE_4__["setupFLIP"])(start$, ready$, Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["merge"])(fadeIn$, error$), {
    animationMain,
    settings: settings
  }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["share"])());
  start$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])(context => {
    var promise = Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["zip"])(Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["timer"])(duration), fadeOut$, flip$).toPromise();
    context.transitionUntil(promise);
    return promise;
  })).subscribe(); // FIXME: Keeping permanent subscription? turn into hot observable?

  fadeOut$.subscribe();
  flip$.subscribe();
  var sidebarBg = document.querySelector('.sidebar-bg');

  if (sidebarBg) {
    var crossFader = new _cross_fader__WEBPACK_IMPORTED_MODULE_3__["CrossFader"](CROSS_FADE_DURATION);
    after$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])((_ref7) => {
      var {
        document
      } = _ref7;
      return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["zip"])(crossFader.fetchImage(document), fadeIn$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])((_ref8) => {
        var [x] = _ref8;
        return x;
      }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["takeUntil"])(start$));
    }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["startWith"])([sidebarBg]), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["pairwise"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["mergeMap"])((_ref9) => {
      var [prev, curr] = _ref9;
      return crossFader.fade(prev, curr);
    })).subscribe();
  }

  error$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])((_ref10) => {
    var {
      url
    } = _ref10;
    if (loadingEl) loadingEl.style.display = 'none';
    var main = document.getElementById('_main');
    if (main) main.style.pointerEvents = '';
    _common__WEBPACK_IMPORTED_MODULE_2__["empty"].call(animationMain === null || animationMain === void 0 ? void 0 : animationMain.querySelector('.page'));
    _common__WEBPACK_IMPORTED_MODULE_2__["empty"].call(main);
    setupErrorPage(main, url);
    return Object(_common__WEBPACK_IMPORTED_MODULE_2__["animate"])(main, FADE_IN, _objectSpread(_objectSpread({}, settings), {}, {
      fill: 'forwards'
    }));
  })).subscribe();
  Promise.resolve(/*! import() eager */).then(__webpack_require__.bind(null, /*! @hydecorp/push-state */ "./node_modules/@hydecorp/push-state/lib/index.js"));
  window._pushState = pushStateEl;
})();

/***/ })

}]);
//# sourceMappingURL=push-state-hydejack-9.0.4.js.map