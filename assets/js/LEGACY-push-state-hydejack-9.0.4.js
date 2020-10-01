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
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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

var calcHash = function calcHash(doc) {
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
  var protocol = _ref.protocol,
      host = _ref.host;
  var location = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window.location;
  return protocol !== location.protocol || host !== location.host;
}

var objectURLs = new WeakMap();
var CrossFader = /*#__PURE__*/function () {
  /** @param {number} fadeDuration */
  function CrossFader(fadeDuration) {
    _classCallCheck(this, CrossFader);

    this.sidebar = document.getElementById('_sidebar');
    this.fadeDuration = fadeDuration;
    this.prevHash = calcHash(document);
    this.themeColorEl = document.querySelector('meta[name="theme-color"]');
  }
  /** @param {Document} newDocument */


  _createClass(CrossFader, [{
    key: "fetchImage2",
    value: function fetchImage2(newDocument) {
      var _newDocument$querySel, _newDocument$querySel2;

      var _ref2 = (_newDocument$querySel = (_newDocument$querySel2 = newDocument.querySelector('.sidebar-bg')) === null || _newDocument$querySel2 === void 0 ? void 0 : _newDocument$querySel2.style) !== null && _newDocument$querySel !== void 0 ? _newDocument$querySel : {},
          _ref2$backgroundImage = _ref2.backgroundImage,
          backgroundImage = _ref2$backgroundImage === void 0 ? '' : _ref2$backgroundImage;

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
      } : {})).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])(function (r) {
        return r.blob();
      }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (blob) {
        return URL.createObjectURL(blob);
      }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["catchError"])(function () {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])(url.href);
      }));
    }
    /** @param {Document} newDocument */

  }, {
    key: "fetchImage",
    value: function fetchImage(newDocument) {
      var hash = calcHash(newDocument);
      if (hash === this.prevHash) return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["empty"])();
      return this.fetchImage2(newDocument).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (objectURL) {
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

  }, {
    key: "updateStyle",
    value: function updateStyle(newDocument) {
      var _this = this;

      if (this.themeColorEl) {
        var _newDocument$head$que;

        var themeColor = (_newDocument$head$que = newDocument.head.querySelector('meta[name="theme-color"]')) === null || _newDocument$head$que === void 0 ? void 0 : _newDocument$head$que.content;

        if (themeColor) {
          window.setTimeout(function () {
            if (_this.themeColorEl) {
              _this.themeColorEl.content = themeColor;
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

  }, {
    key: "fade",
    value: function fade(_ref3, _ref4) {
      var _prevDiv$parentNode;

      var _ref5 = _slicedToArray(_ref3, 1),
          prevDiv = _ref5[0];

      var _ref6 = _slicedToArray(_ref4, 3),
          div = _ref6[0],
          hash = _ref6[1],
          newDocument = _ref6[2];

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
      }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["finalize"])(function () {
        var _prevDiv$parentNode2;

        if (objectURLs.has(prevDiv)) URL.revokeObjectURL(objectURLs.get(prevDiv));
        prevDiv === null || prevDiv === void 0 ? void 0 : (_prevDiv$parentNode2 = prevDiv.parentNode) === null || _prevDiv$parentNode2 === void 0 ? void 0 : _prevDiv$parentNode2.removeChild(prevDiv);
      }));
    }
  }]);

  return CrossFader;
}();

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
  var other$ = start$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["filter"])(function (_ref) {
    var flipType = _ref.flipType;
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
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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
  var animationMain = _ref.animationMain,
      settings = _ref.settings;
  if (!animationMain) return start$;
  var flip$ = start$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["filter"])(function (_ref2) {
    var flipType = _ref2.flipType;
    return flipType === 'title';
  }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])(function (_ref3) {
    var anchor = _ref3.anchor;
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
      complete: function complete() {
        animationMain.style.position = 'absolute';
      }
    }));
  }));
  start$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])(function (_ref4) {
    var flipType = _ref4.flipType;
    return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["zip"])(ready$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["filter"])(function () {
      return flipType === 'title';
    }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (_ref5) {
      var _ref5$replaceEls = _slicedToArray(_ref5.replaceEls, 1),
          main = _ref5$replaceEls[0];

      var title = main.querySelector(TITLE_SELECTOR);
      if (title) title.style.opacity = 0;
      return title;
    })), fadeIn$, function (x) {
      return x;
    }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(function (title) {
      if (title) title.style.opacity = 1;
      animationMain.style.opacity = 0;
    }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["finalize"])(function () {
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
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
  var NAVBAR_SEL, MQ_STANDALONE, CROSS_FADE_DURATION, FADE_OUT, FADE_IN, setupAnimationMain, setupLoading, setupErrorPage, importBackButton, getFlipType, pushStateEl, duration, settings, animateFadeOut, animateFadeIn, drawerEl, navbarEl, animationMain, loadingEl, backBtnEl, standaloneMQ, standalone, standalone$, fromEventX, start$, ready$, after$, progress$, error$, fadeOut$, fadeIn$, flip$, sidebarBg, crossFader;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          getFlipType = function _getFlipType(el) {
            var _el$getAttribute;

            if (el === null || el === void 0 ? void 0 : el.classList.contains('flip-title')) return 'title';
            if (el === null || el === void 0 ? void 0 : el.classList.contains('flip-project')) return 'project';
            return el === null || el === void 0 ? void 0 : (_el$getAttribute = el.getAttribute) === null || _el$getAttribute === void 0 ? void 0 : _el$getAttribute.call(el, 'data-flip');
          };

          importBackButton = function _importBackButton() {
            var _button$querySelector;

            var button = Object(_common__WEBPACK_IMPORTED_MODULE_2__["importTemplate"])('_back-template');
            var buttonEl = button === null || button === void 0 ? void 0 : button.children[0];
            button === null || button === void 0 ? void 0 : (_button$querySelector = button.querySelector('.nav-btn')) === null || _button$querySelector === void 0 ? void 0 : _button$querySelector.addEventListener('click', function () {
              return window.history.back();
            });
            return buttonEl;
          };

          setupErrorPage = function _setupErrorPage(main, url) {
            var pathname = url.pathname;
            var error = Object(_common__WEBPACK_IMPORTED_MODULE_2__["importTemplate"])('_error-template');
            var anchor = error === null || error === void 0 ? void 0 : error.querySelector('.this-link');

            if (anchor) {
              anchor.href = pathname;
              anchor.textContent = pathname;
            }

            main === null || main === void 0 ? void 0 : main.appendChild(error);
            return main === null || main === void 0 ? void 0 : main.lastElementChild;
          };

          setupLoading = function _setupLoading(navbarEl) {
            navbarEl === null || navbarEl === void 0 ? void 0 : navbarEl.appendChild(Object(_common__WEBPACK_IMPORTED_MODULE_2__["importTemplate"])('_loading-template'));
            return navbarEl === null || navbarEl === void 0 ? void 0 : navbarEl.lastElementChild;
          };

          setupAnimationMain = function _setupAnimationMain(pushStateEl) {
            var _pushStateEl$parentNo;

            pushStateEl === null || pushStateEl === void 0 ? void 0 : (_pushStateEl$parentNo = pushStateEl.parentNode) === null || _pushStateEl$parentNo === void 0 ? void 0 : _pushStateEl$parentNo.insertBefore(Object(_common__WEBPACK_IMPORTED_MODULE_2__["importTemplate"])('_animation-template'), pushStateEl);
            return pushStateEl === null || pushStateEl === void 0 ? void 0 : pushStateEl.previousElementSibling;
          };

          _context.next = 7;
          return Promise.all([].concat(_toConsumableArray('fetch' in window ? [] : [Promise.all(/*! import() | fetch */[__webpack_require__.e("vendors~fetch"), __webpack_require__.e("fetch")]).then(__webpack_require__.bind(null, /*! ./polyfills/fetch */ "./_js/src/polyfills/fetch.js"))]), _toConsumableArray('customElements' in window ? [] : [Promise.all(/*! import() | webcomponents */[__webpack_require__.e("vendors~webcomponents"), __webpack_require__.e("webcomponents")]).then(__webpack_require__.bind(null, /*! ./polyfills/webcomponents */ "./_js/src/polyfills/webcomponents.js"))]), _toConsumableArray('animate' in Element.prototype ? [] : [__webpack_require__.e(/*! import() | webanimations */ "vendors~webanimations").then(__webpack_require__.t.bind(null, /*! web-animations-js */ "./node_modules/web-animations-js/web-animations.min.js", 7))]), _toConsumableArray('IntersectionObserver' in window ? [] : [__webpack_require__.e(/*! import() | intersection-observer */ "vendors~intersection-observer").then(__webpack_require__.t.bind(null, /*! intersection-observer */ "./node_modules/intersection-observer/intersection-observer.js", 7))])));

        case 7:
          _context.next = 9;
          return _common__WEBPACK_IMPORTED_MODULE_2__["webComponentsReady"];

        case 9:
          NAVBAR_SEL = '#_navbar > .content > .nav-btn-bar';
          MQ_STANDALONE = '(display-mode: standalone)';
          CROSS_FADE_DURATION = 2000;
          FADE_OUT = [{
            opacity: 1
          }, {
            opacity: 0
          }];
          FADE_IN = [{
            opacity: 0,
            transform: 'translateY(-3rem)'
          }, {
            opacity: 1,
            transform: 'translateY(0)'
          }];
          pushStateEl = document.querySelector('hy-push-state');

          if (pushStateEl) {
            _context.next = 17;
            break;
          }

          return _context.abrupt("return");

        case 17:
          duration = Number(pushStateEl.getAttribute('duration')) || 350;
          settings = {
            duration: duration,
            easing: 'ease'
          };

          animateFadeOut = function animateFadeOut(_ref2) {
            var main = _ref2.main;
            return Object(_common__WEBPACK_IMPORTED_MODULE_2__["animate"])(main, FADE_OUT, _objectSpread(_objectSpread({}, settings), {}, {
              fill: 'forwards'
            })).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["mapTo"])({
              main: main
            }));
          };

          animateFadeIn = function animateFadeIn(_ref3) {
            var _ref3$replaceEls = _slicedToArray(_ref3.replaceEls, 1),
                main = _ref3$replaceEls[0],
                flipType = _ref3.flipType;

            return Object(_common__WEBPACK_IMPORTED_MODULE_2__["animate"])(main, FADE_IN, settings).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["mapTo"])({
              main: main,
              flipType: flipType
            }));
          };

          drawerEl = document.querySelector('hy-drawer');
          navbarEl = document.querySelector(NAVBAR_SEL);
          animationMain = setupAnimationMain(pushStateEl);
          loadingEl = setupLoading(navbarEl);
          backBtnEl = importBackButton();

          if (navbarEl && backBtnEl) {
            standaloneMQ = window.matchMedia(MQ_STANDALONE);
            standalone = !!navigator.standalone || standaloneMQ.matches;
            standalone$ = Object(_common__WEBPACK_IMPORTED_MODULE_2__["fromMediaQuery"])(standaloneMQ).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (e) {
              return e.matches;
            }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["startWith"])(standalone));
            standalone$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(function (matches) {
              if (matches) navbarEl.prepend(backBtnEl);else if (backBtnEl.parentNode === navbarEl) navbarEl.removeChild(backBtnEl);
            })).subscribe();
          }

          fromEventX = function fromEventX(eventName, mapFn) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["fromEvent"])(pushStateEl, eventName).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (_ref4) {
              var detail = _ref4.detail;
              return detail;
            }), mapFn ? Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(mapFn) : function (_) {
              return _;
            }, Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["share"])());
          };

          start$ = fromEventX('hy-push-state-start', function (detail) {
            return Object.assign(detail, {
              flipType: getFlipType(detail.anchor)
            });
          });
          ready$ = fromEventX('hy-push-state-ready');
          after$ = fromEventX('hy-push-state-after');
          progress$ = fromEventX('hy-push-state-progress');
          error$ = fromEventX('hy-push-state-networkerror');
          fadeOut$ = start$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (context) {
            return Object.assign(context, {
              main: document.getElementById('_main')
            });
          }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(function (_ref5) {
            var main = _ref5.main;
            main.style.pointerEvents = 'none';
          }), window._noDrawer && (drawerEl === null || drawerEl === void 0 ? void 0 : drawerEl.classList.contains('cover')) ? Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(function () {
            var _drawerEl$parentNode;

            drawerEl.classList.remove('cover');
            (_drawerEl$parentNode = drawerEl.parentNode) === null || _drawerEl$parentNode === void 0 ? void 0 : _drawerEl$parentNode.appendChild(drawerEl);
          }) : function (_) {
            return _;
          }, Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["exhaustMap"])(animateFadeOut), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(function (_ref6) {
            var main = _ref6.main;
            return _common__WEBPACK_IMPORTED_MODULE_2__["empty"].call(main);
          }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["share"])());

          if (loadingEl) {
            progress$.subscribe(function () {
              loadingEl.style.display = 'flex';
            });
            ready$.subscribe(function () {
              loadingEl.style.display = 'none';
            });
          }

          fadeIn$ = after$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])(function (context) {
            var p = animateFadeIn(context).toPromise();
            context.transitionUntil(p);
            return p;
          }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["share"])());
          flip$ = Object(_flip__WEBPACK_IMPORTED_MODULE_4__["setupFLIP"])(start$, ready$, Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["merge"])(fadeIn$, error$), {
            animationMain: animationMain,
            settings: settings
          }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["share"])());
          start$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])(function (context) {
            var promise = Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["zip"])(Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["timer"])(duration), fadeOut$, flip$).toPromise();
            context.transitionUntil(promise);
            return promise;
          })).subscribe(); // FIXME: Keeping permanent subscription? turn into hot observable?

          fadeOut$.subscribe();
          flip$.subscribe();
          sidebarBg = document.querySelector('.sidebar-bg');

          if (sidebarBg) {
            crossFader = new _cross_fader__WEBPACK_IMPORTED_MODULE_3__["CrossFader"](CROSS_FADE_DURATION);
            after$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])(function (_ref7) {
              var document = _ref7.document;
              return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["zip"])(crossFader.fetchImage(document), fadeIn$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (_ref8) {
                var _ref9 = _slicedToArray(_ref8, 1),
                    x = _ref9[0];

                return x;
              }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["takeUntil"])(start$));
            }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["startWith"])([sidebarBg]), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["pairwise"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["mergeMap"])(function (_ref10) {
              var _ref11 = _slicedToArray(_ref10, 2),
                  prev = _ref11[0],
                  curr = _ref11[1];

              return crossFader.fade(prev, curr);
            })).subscribe();
          }

          error$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])(function (_ref12) {
            var url = _ref12.url;
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

        case 45:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}))();

/***/ })

}]);
//# sourceMappingURL=LEGACY-push-state-hydejack-9.0.4.js.map