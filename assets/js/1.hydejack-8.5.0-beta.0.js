(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "../hy-img/lib/common.js":
/*!*******************************!*\
  !*** ../hy-img/lib/common.js ***!
  \*******************************/
/*! exports provided: isExternal, subscribeWhen, createResizeObservable, createItersectionObservable, fetchRx */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isExternal", function() { return isExternal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subscribeWhen", function() { return subscribeWhen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createResizeObservable", function() { return createResizeObservable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createItersectionObservable", function() { return createItersectionObservable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchRx", function() { return fetchRx; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// export const hasCSSOM = "attributeStyleMap" in Element.prototype && "CSS" in window && CSS.number;

/* export const idle = x => new Promise(res => requestIdleCallback(() => res(x))); */

/* export const anim = x => new Promise(res => requestAnimationFrame(() => res(x))); */

 // Consider a URL external if either the protocol, hostname or port is different.

function isExternal(_ref) {
  var {
    protocol,
    host
  } = _ref;
  var location = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window.location;
  return protocol !== location.protocol || host !== location.host;
}
function subscribeWhen(p$) {
  return source => {
    // if (process.env.DEBUG && !p$) throw Error();
    return p$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])(p => p ? source : rxjs__WEBPACK_IMPORTED_MODULE_0__["NEVER"]));
  };
}
function createResizeObservable(el) {
  return rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"].create(obs => {
    var observer = new window.ResizeObserver(xs => xs.forEach(x => obs.next(x)));
    observer.observe(el);
    return () => {
      observer.unobserve(el);
    };
  });
}
function createItersectionObservable(el, options) {
  return rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"].create(obs => {
    var observer = new IntersectionObserver(xs => xs.forEach(x => obs.next(x)), options);
    observer.observe(el);
    return () => {
      observer.unobserve(el);
    };
  });
}
function fetchRx(input, init) {
  return rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"].create(observer => {
    var controller = new AbortController();
    var {
      signal
    } = controller;
    var response = null;
    fetch(input, _objectSpread({}, init, {
      signal
    })).then(r => {
      response = r;
      observer.next(r);
      observer.complete();
    }).catch(x => observer.error(x));
    return () => {
      if (!response) controller.abort();
    };
  });
}
/*
function blobToDataURL(blob) {
  return new Promise((res, rej) => {
    const a = new FileReader();
    a.onload = ({ target: { result } }) => res(result);
    a.onerror = rej;
    a.readAsDataURL(blob);
  });
}
*/

/*
const createObjectURL = blob =>
  Observable.create(obs => {
    const objURL = URL.createObjectURL(blob);
    obs.next(objURL);
    return () => {
      if (process.env.DEBUG) console.log("revoke", objURL);
      URL.revokeObjectURL(objURL);
    };
  });
*/

/***/ }),

/***/ "../hy-img/lib/index.js":
/*!******************************!*\
  !*** ../hy-img/lib/index.js ***!
  \******************************/
/*! exports provided: HTMLHyImgElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HTMLHyImgElement", function() { return HTMLHyImgElement; });
/* harmony import */ var lit_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit-element */ "./node_modules/lit-element/lit-element.js");
/* harmony import */ var lit_html_directives_style_map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lit-html/directives/style-map */ "./node_modules/lit-html/directives/style-map.js");
/* harmony import */ var lit_html_directives_if_defined__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lit-html/directives/if-defined */ "./node_modules/lit-html/directives/if-defined.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./common */ "../hy-img/lib/common.js");
/* harmony import */ var _srcset__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./srcset */ "../hy-img/lib/srcset.js");
function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n    .sizer {\n      position: relative;\n    }\n\n    img {\n      position: absolute;\n      top: 0;\n      left: 0;\n      width: 100%;\n    }\n  "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n        <img src=", " style=", " alt=", " decoding=", "\n          useMap=", " @load=", " />"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n        <slot name=\"loading\" />"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n      <div class=\"sizer\" style=", ">\n        ", " ", "\n      </div>\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Copyright (c) 2019 Florian Klampfer <https://qwtel.com/>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @license
 * @nocompile
 */
// import { h, Component, Prop, Element, Watch, State, Method } from 'pencil-runtime';










class RxLitElement extends lit_element__WEBPACK_IMPORTED_MODULE_0__["LitElement"] {
  constructor() {
    super(...arguments);
    this.$connected = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
  }

  connectedCallback() {
    super.connectedCallback();
    this.$connected.next(true);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.$connected.next(false);
  }

  firstUpdated() {
    this.firstUpdate = true;
  }

  updated(changedProperties) {
    if (!this.firstUpdate) for (var prop of changedProperties.keys()) {
      if (prop in this.$) this.$[prop].next(this[prop]);
    }
    this.firstUpdate = false;
  }

}

var HTMLHyImgElement = class HTMLHyImgElement extends RxLitElement {
  constructor() {
    super(...arguments);
    this.w = 0;
    this.h = 0;
    this.strategy = 'cache';
    this.url = null;
    this.visibility = 'hidden';
    this.$ = {};
    this.$loadImage = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
    this.cache = new Map();
  }

  getIsIntersecting() {
    return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["combineLatest"])(this.$.root, this.$.rootMargin).pipe( // subscribeWhen(this.connected$),
    Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["switchMap"])((_ref) => {
      var [root, rootMargin] = _ref;
      return "IntersectionObserver" in window ? Object(_common__WEBPACK_IMPORTED_MODULE_5__["createItersectionObservable"])(this, {
        root: root ? document.querySelector(root) : undefined,
        rootMargin
      }) : Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])({
        isIntersecting: true
      });
    }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((_ref2) => {
      var {
        isIntersecting
      } = _ref2;
      return isIntersecting;
    }));
  }

  getContentWidth() {
    return "ResizeObserver" in window ? Object(_common__WEBPACK_IMPORTED_MODULE_5__["createResizeObservable"])(this).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(x => x.contentRect.width), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["startWith"])(this.clientWidth)) : rxjs__WEBPACK_IMPORTED_MODULE_3__["NEVER"];
  }

  connectedCallback() {
    super.connectedCallback();
    this.$.root = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"](this.root);
    this.$.rootMargin = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"](this.rootMargin);
    this.$.w = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"](this.w);
    this.$.h = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"](this.h);
    this.$.src = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"](this.src);
    this.$.srcset = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"](this.srcset);
    var noscript = this.querySelector('noscript');
    if (noscript) noscript.parentNode.removeChild(noscript);
    var $contentWidth = this.getContentWidth();
    Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["combineLatest"])($contentWidth, this.$.w, this.$.h) // .pipe(subscribeWhen(this.connected$))
    .subscribe((_ref3) => {
      var [contentWidth, width, height] = _ref3;
      this.contentWidth = contentWidth;
      this.renderWidth = width;
      this.renderHeight = height;
    });
    var $trigger = Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["merge"])(this.getIsIntersecting(), this.$loadImage).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["share"])());
    $trigger.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["filter"])(x => !!x), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["distinctUntilChanged"])()).subscribe(() => this.triggered($trigger, $contentWidth));
  } // TODO: rename


  triggered($trigger, contentWidth$) {
    // this.loading = true;
    var $srcset = Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["combineLatest"])(this.$.src, this.$.srcset).pipe( // subscribeWhen(this.connected$),
    Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["filter"])((_ref4) => {
      var [a, b] = _ref4;
      return a != null || b != null;
    }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["distinctUntilChanged"])((_ref5, _ref6) => {
      var [p1, p2] = _ref5;
      var [q1, q2] = _ref6;
      return p1 === q1 && p2 === q2;
    }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((_ref7) => {
      var [src, srcset] = _ref7;
      return srcset ? Object(_srcset__WEBPACK_IMPORTED_MODULE_6__["parseSrcset"])(srcset) : Object(_srcset__WEBPACK_IMPORTED_MODULE_6__["srcsetFromSrc"])(src);
    }));
    var $url = Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["combineLatest"])(contentWidth$, $srcset).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(args => this.selectSrcsetURL(...args)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["distinctUntilKeyChanged"])("href"));
    var $trigger2 = $trigger.pipe( // distinctUntilChanged(), // ???
    Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["startWith"])(true));
    Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["combineLatest"])($url, $trigger2).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["switchMap"])(args => this.fetchImage(...args)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])(() => $url)).subscribe(url => {
      this.url = url;
    });
  }

  selectSrcsetURL(width, srcsetObj) {
    var dpr = window.devicePixelRatio || 1;
    var selection = srcsetObj.select(width || window.screen.width, dpr);
    return new URL(selection, window.location.href);
  }

  cacheStrategy(fetch$) {
    switch (this.strategy) {
      case 'blob':
        {
          return fetch$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["switchMap"])(x => x.blob()), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(blob => URL.createObjectURL(blob)));
        }

      case 'cache':
      default:
        {
          return fetch$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(x => x.url));
        }
    }
  }

  fetchImage(url, isIntersecting) {
    var {
      href
    } = url;
    var {
      cache
    } = this;

    if (isIntersecting && !cache.has(href)) {
      var fetch$ = Object(_common__WEBPACK_IMPORTED_MODULE_5__["fetchRx"])(href, {
        method: "GET",
        headers: {
          Accept: "image/*"
        },
        mode: Object(_common__WEBPACK_IMPORTED_MODULE_5__["isExternal"])(url) ? 'cors' : undefined
      });
      return this.cacheStrategy(fetch$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(objectURL => cache.set(href, objectURL)));
    } else if (cache.has(href)) {
      return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(cache.get(href));
    } else {
      return rxjs__WEBPACK_IMPORTED_MODULE_3__["NEVER"];
    }
  }

  render() {
    return Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["html"])(_templateObject(), Object(lit_html_directives_style_map__WEBPACK_IMPORTED_MODULE_1__["styleMap"])(this.calcSizerStyle()), !this.url || this.visibility === 'hidden' ? Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["html"])(_templateObject2()) : null, this.url ? Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["html"])(_templateObject3(), this.url, Object(lit_html_directives_style_map__WEBPACK_IMPORTED_MODULE_1__["styleMap"])(this.calcImageStyle()), Object(lit_html_directives_if_defined__WEBPACK_IMPORTED_MODULE_2__["ifDefined"])(this.alt), Object(lit_html_directives_if_defined__WEBPACK_IMPORTED_MODULE_2__["ifDefined"])(this.decoding), Object(lit_html_directives_if_defined__WEBPACK_IMPORTED_MODULE_2__["ifDefined"])(this.useMap), () => this.visibility = 'visible') : null);
  }

  calcImageStyle() {
    return {
      visibility: this.visibility
    };
  }

  calcSizerStyle() {
    var {
      renderWidth,
      renderHeight,
      contentWidth
    } = this;
    var style = {};

    if (renderWidth !== 0 && renderHeight !== 0) {
      if (renderWidth >= contentWidth) {
        style.width = "100%";
        style.paddingTop = "".concat(renderHeight / renderWidth * 100, "%");
      } else {
        style.width = "".concat(renderWidth, "px");
        style.height = "".concat(renderHeight, "px");
      } // } else if (renderHeight !== 0) {
      //   style.width = "";
      //   style.height = `${renderHeight}px`;

    } else {
      style.width = "100%";
      style.height = "100%";
    }

    return style;
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    if (this.cache) {
      this.cache.forEach(objURL => {
        URL.revokeObjectURL(objURL);
      });
    }
  }

  loadImage() {
    this.$loadImage.next(true);
  }

};
HTMLHyImgElement.styles = Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["css"])(_templateObject4());

__decorate([Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["property"])({
  type: String,
  reflect: true
})], HTMLHyImgElement.prototype, "root", void 0);

__decorate([Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["property"])({
  type: String,
  reflect: true,
  attribute: 'root-margin'
})], HTMLHyImgElement.prototype, "rootMargin", void 0);

__decorate([Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["property"])({
  type: String,
  reflect: true
})], HTMLHyImgElement.prototype, "src", void 0);

__decorate([Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["property"])({
  type: String,
  reflect: true
})], HTMLHyImgElement.prototype, "srcset", void 0);

__decorate([Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["property"])({
  type: Number,
  reflect: true
})], HTMLHyImgElement.prototype, "w", void 0);

__decorate([Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["property"])({
  type: Number,
  reflect: true
})], HTMLHyImgElement.prototype, "h", void 0);

__decorate([Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["property"])({
  type: String,
  reflect: true
})], HTMLHyImgElement.prototype, "alt", void 0);

__decorate([Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["property"])({
  type: String,
  reflect: true
})], HTMLHyImgElement.prototype, "decoding", void 0);

__decorate([Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["property"])({
  type: String,
  reflect: true,
  attribute: 'usemap'
})], HTMLHyImgElement.prototype, "useMap", void 0);

__decorate([Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["property"])({
  type: String,
  reflect: true
})], HTMLHyImgElement.prototype, "strategy", void 0);

__decorate([Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["property"])({
  type: Number,
  reflect: false
})], HTMLHyImgElement.prototype, "renderWidth", void 0);

__decorate([Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["property"])({
  type: Number,
  reflect: false
})], HTMLHyImgElement.prototype, "renderHeight", void 0);

__decorate([Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["property"])({
  type: Number,
  reflect: false
})], HTMLHyImgElement.prototype, "contentWidth", void 0);

__decorate([Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["property"])({
  type: String,
  reflect: false
})], HTMLHyImgElement.prototype, "url", void 0);

__decorate([Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["property"])({
  type: String,
  reflect: false
})], HTMLHyImgElement.prototype, "visibility", void 0);

__decorate([Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["property"])()], HTMLHyImgElement.prototype, "loadImage", null);

HTMLHyImgElement = __decorate([Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["customElement"])('hy-img')], HTMLHyImgElement);


/***/ }),

/***/ "../hy-img/lib/log.js":
/*!****************************!*\
  !*** ../hy-img/lib/log.js ***!
  \****************************/
/*! exports provided: devAssert, userAssert */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "devAssert", function() { return devAssert; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "userAssert", function() { return userAssert; });
var devAssert = function devAssert(_) {
  return _;
};
var userAssert = function userAssert(_) {
  return _;
};

/***/ }),

/***/ "../hy-img/lib/srcset.js":
/*!*******************************!*\
  !*** ../hy-img/lib/srcset.js ***!
  \*******************************/
/*! exports provided: srcsetFromElement, srcsetFromSrc, parseSrcset, Srcset */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "srcsetFromElement", function() { return srcsetFromElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "srcsetFromSrc", function() { return srcsetFromSrc; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseSrcset", function() { return parseSrcset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Srcset", function() { return Srcset; });
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./log */ "../hy-img/lib/log.js");
/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * A single source within a srcset. Only one: width or DPR can be specified at
 * a time.
 * @typedef {{
 *   url: string,
 *   width: (number|undefined),
 *   dpr: (number|undefined)
 * }}
 */

var SrcsetSourceDef;
/**
 * General grammar: (URL [NUM[w|x]],)*
 * Example 1: "image1.png 100w, image2.png 50w"
 * Example 2: "image1.png 2x, image2.png"
 * Example 3: "image1,100w.png 100w, image2.png 50w"
 */

var srcsetRegex = /(\S+)(?:\s+(?:(-?\d+(?:\.\d+)?)([a-zA-Z]*)))?\s*(?:,|$)/g;
/**
 * Extracts `srcset` and fallbacks to `src` if not available.
 * @param {!Element} element
 * @return {!Srcset}
 */

function srcsetFromElement(element) {
  var srcsetAttr = element.getAttribute('srcset');

  if (srcsetAttr) {
    return parseSrcset(srcsetAttr);
  } // We can't push `src` via `parseSrcset` because URLs in `src` are not always
  // RFC compliant and can't be easily parsed as an `srcset`. For instance,
  // they sometimes contain space characters.


  var srcAttr = Object(_log__WEBPACK_IMPORTED_MODULE_0__["userAssert"])(element.getAttribute('src'), 'Either non-empty "srcset" or "src" attribute must be specified: %s', element);
  return srcsetFromSrc(srcAttr);
}
/**
 * Creates a Srcset from a `src` attribute value.
 * @param {string} src
 * @return {!Srcset}
 */

function srcsetFromSrc(src) {
  return new Srcset([{
    url: src,
    width: undefined,
    dpr: 1
  }]);
}
/**
 * Parses the text representation of srcset into Srcset object.
 * See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#Attributes.
 * See http://www.w3.org/html/wg/drafts/html/master/semantics.html#attr-img-srcset.
 * @param {string} s
 * @return {!Srcset}
 */

function parseSrcset(s) {
  var sources = [];
  var match;

  while (match = srcsetRegex.exec(s)) {
    var url = match[1];
    var width = void 0,
        dpr = void 0;

    if (match[2]) {
      var type = match[3].toLowerCase();

      if (type == 'w') {
        width = parseInt(match[2], 10);
      } else if (type == 'x') {
        dpr = parseFloat(match[2]);
      } else {
        continue;
      }
    } else {
      // If no "w" or "x" specified, we assume it's "1x".
      dpr = 1;
    }

    sources.push({
      url,
      width,
      dpr
    });
  }

  return new Srcset(sources);
}
/**
 * A srcset object contains one or more sources.
 *
 * There are two types of sources: width-based and DPR-based. Only one type
 * of sources allowed to be specified within a single srcset. Depending on a
 * usecase, the components are free to choose any source that best corresponds
 * to the required rendering quality and network and CPU conditions. See
 * "select" method for details on how this selection is performed.
 *
 * See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#Attributes
 */

class Srcset {
  /**
   * @param {!Array<!SrcsetSourceDef>} sources
   */
  constructor(sources) {
    Object(_log__WEBPACK_IMPORTED_MODULE_0__["userAssert"])(sources.length > 0, 'Srcset must have at least one source');
    /** @private @const {!Array<!SrcsetSourceDef>} */

    this.sources_ = sources; // Only one type of source specified can be used - width or DPR.

    var hasWidth = false;
    var hasDpr = false;

    for (var i = 0; i < sources.length; i++) {
      var source = sources[i];
      hasWidth = hasWidth || !!source.width;
      hasDpr = hasDpr || !!source.dpr;
    }

    Object(_log__WEBPACK_IMPORTED_MODULE_0__["userAssert"])(!!(hasWidth ^ hasDpr), 'Srcset must have width or dpr sources, but not both'); // Source and assert duplicates.

    sources.sort(hasWidth ? sortByWidth : sortByDpr);
    /** @private @const {boolean} */

    this.widthBased_ = hasWidth;
  }
  /**
   * Performs selection for specified width and DPR. Here, width is the width
   * in screen pixels and DPR is the device-pixel-ratio or pixel density of
   * the device. Depending on the circumstances, such as low network conditions,
   * it's possible to manipulate the result of this method by passing a lower
   * DPR value.
   *
   * The source selection depends on whether this is width-based or DPR-based
   * srcset.
   *
   * In a width-based source, the source's width is the physical width of a
   * resource (e.g. an image). Depending on the provided DPR, this width is
   * converted to the screen pixels as following:
   *   pixelWidth = sourceWidth / DPR
   *
   * Then, the source closest to the requested "width" is selected using
   * the "pixelWidth". The slight preference is given to the bigger sources to
   * ensure the most optimal quality.
   *
   * In a DPR-based source, the source's DPR is used to return the source that
   * is closest to the requested DPR.
   *
   * Based on
   * http://www.w3.org/html/wg/drafts/html/master/semantics.html#attr-img-srcset.
   * @param {number} width
   * @param {number} dpr
   * @return {string}
   */


  select(width, dpr) {
    Object(_log__WEBPACK_IMPORTED_MODULE_0__["devAssert"])(width, 'width=%s', width);
    Object(_log__WEBPACK_IMPORTED_MODULE_0__["devAssert"])(dpr, 'dpr=%s', dpr);
    var index = 0;

    if (this.widthBased_) {
      index = this.selectByWidth_(width * dpr);
    } else {
      index = this.selectByDpr_(dpr);
    }

    return this.sources_[index].url;
  }
  /**
   * @param {number} width
   * @return {number}
   * @private
   */


  selectByWidth_(width) {
    var sources = this.sources_;
    var minIndex = 0;
    var minScore = Infinity;
    var minWidth = Infinity;

    for (var i = 0; i < sources.length; i++) {
      var sWidth = sources[i].width;
      var score = Math.abs(sWidth - width); // Select the one that is closer with a slight preference toward larger
      // widths. If smaller size is closer, enforce minimum ratio to ensure
      // image isn't too distorted.

      if (score <= minScore * 1.1 || width / minWidth > 1.2) {
        minIndex = i;
        minScore = score;
        minWidth = sWidth;
      } else {
        break;
      }
    }

    return minIndex;
  }
  /**
   * @param {number} dpr
   * @return {number}
   * @private
   */


  selectByDpr_(dpr) {
    var sources = this.sources_;
    var minIndex = 0;
    var minScore = Infinity;

    for (var i = 0; i < sources.length; i++) {
      var score = Math.abs(sources[i].dpr - dpr);

      if (score <= minScore) {
        minIndex = i;
        minScore = score;
      } else {
        break;
      }
    }

    return minIndex;
  }
  /**
   * Returns all URLs in the srcset.
   * @return {!Array<string>}
   */


  getUrls() {
    return this.sources_.map(s => s.url);
  }
  /**
   * Reconstructs the string expression for this srcset.
   * @param {function(string):string=} opt_mapper
   * @return {string}
   */


  stringify(opt_mapper) {
    var res = [];
    var sources = this.sources_;

    for (var i = 0; i < sources.length; i++) {
      var source = sources[i];
      var src = source.url;

      if (opt_mapper) {
        src = opt_mapper(src);
      }

      if (this.widthBased_) {
        src += " ".concat(source.width, "w");
      } else {
        src += " ".concat(source.dpr, "x");
      }

      res.push(src);
    }

    return res.join(', ');
  }

}
/**
 * Sorts by width
 *
 * @param {number} s1
 * @param {number} s2
 * @return {number}
 */

function sortByWidth(s1, s2) {
  Object(_log__WEBPACK_IMPORTED_MODULE_0__["userAssert"])(s1.width != s2.width, 'Duplicate width: %s', s1.width);
  return s1.width - s2.width;
}
/**
 * Sorts by dpr
 *
 * @param {!Object} s1
 * @param {!Object} s2
 * @return {number}
 */


function sortByDpr(s1, s2) {
  Object(_log__WEBPACK_IMPORTED_MODULE_0__["userAssert"])(s1.dpr != s2.dpr, 'Duplicate dpr: %s', s1.dpr);
  return s1.dpr - s2.dpr;
}

/***/ })

}]);
//# sourceMappingURL=1.hydejack-8.5.0-beta.0.js.map