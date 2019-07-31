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
  var protocol = _ref.protocol,
      host = _ref.host;
  var location = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window.location;
  return protocol !== location.protocol || host !== location.host;
}
function subscribeWhen(p$) {
  return function (source) {
    // if (process.env.DEBUG && !p$) throw Error();
    return p$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])(function (p) {
      return p ? source : rxjs__WEBPACK_IMPORTED_MODULE_0__["NEVER"];
    }));
  };
}
function createResizeObservable(el) {
  return rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"].create(function (obs) {
    var observer = new window.ResizeObserver(function (xs) {
      return xs.forEach(function (x) {
        return obs.next(x);
      });
    });
    observer.observe(el);
    return function () {
      observer.unobserve(el);
    };
  });
}
function createItersectionObservable(el, options) {
  return rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"].create(function (obs) {
    var observer = new IntersectionObserver(function (xs) {
      return xs.forEach(function (x) {
        return obs.next(x);
      });
    }, options);
    observer.observe(el);
    return function () {
      observer.unobserve(el);
    };
  });
}
function fetchRx(input, init) {
  return rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"].create(function (observer) {
    var controller = new AbortController();
    var signal = controller.signal;
    var response = null;
    fetch(input, _objectSpread({}, init, {
      signal: signal
    })).then(function (r) {
      response = r;
      observer.next(r);
      observer.complete();
    })["catch"](function (x) {
      return observer.error(x);
    });
    return function () {
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

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
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










var RxLitElement =
/*#__PURE__*/
function (_LitElement) {
  _inherits(RxLitElement, _LitElement);

  function RxLitElement() {
    var _this;

    _classCallCheck(this, RxLitElement);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RxLitElement).apply(this, arguments));
    _this.$connected = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
    return _this;
  }

  _createClass(RxLitElement, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      _get(_getPrototypeOf(RxLitElement.prototype), "connectedCallback", this).call(this);

      this.$connected.next(true);
    }
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      _get(_getPrototypeOf(RxLitElement.prototype), "disconnectedCallback", this).call(this);

      this.$connected.next(false);
    }
  }, {
    key: "firstUpdated",
    value: function firstUpdated() {
      this.firstUpdate = true;
    }
  }, {
    key: "updated",
    value: function updated(changedProperties) {
      if (!this.firstUpdate) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = changedProperties.keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var prop = _step.value;
            if (prop in this.$) this.$[prop].next(this[prop]);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }

      this.firstUpdate = false;
    }
  }]);

  return RxLitElement;
}(lit_element__WEBPACK_IMPORTED_MODULE_0__["LitElement"]);

var HTMLHyImgElement =
/*#__PURE__*/
function (_RxLitElement) {
  _inherits(HTMLHyImgElement, _RxLitElement);

  function HTMLHyImgElement() {
    var _this2;

    _classCallCheck(this, HTMLHyImgElement);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(HTMLHyImgElement).apply(this, arguments));
    _this2.w = 0;
    _this2.h = 0;
    _this2.strategy = 'cache';
    _this2.url = null;
    _this2.visibility = 'hidden';
    _this2.$ = {};
    _this2.$loadImage = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
    _this2.cache = new Map();
    return _this2;
  }

  _createClass(HTMLHyImgElement, [{
    key: "getIsIntersecting",
    value: function getIsIntersecting() {
      var _this3 = this;

      return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["combineLatest"])(this.$.root, this.$.rootMargin).pipe( // subscribeWhen(this.connected$),
      Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["switchMap"])(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            root = _ref2[0],
            rootMargin = _ref2[1];

        return "IntersectionObserver" in window ? Object(_common__WEBPACK_IMPORTED_MODULE_5__["createItersectionObservable"])(_this3, {
          root: root ? document.querySelector(root) : undefined,
          rootMargin: rootMargin
        }) : Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])({
          isIntersecting: true
        });
      }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (_ref3) {
        var isIntersecting = _ref3.isIntersecting;
        return isIntersecting;
      }));
    }
  }, {
    key: "getContentWidth",
    value: function getContentWidth() {
      return "ResizeObserver" in window ? Object(_common__WEBPACK_IMPORTED_MODULE_5__["createResizeObservable"])(this).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (x) {
        return x.contentRect.width;
      }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["startWith"])(this.clientWidth)) : rxjs__WEBPACK_IMPORTED_MODULE_3__["NEVER"];
    }
  }, {
    key: "connectedCallback",
    value: function connectedCallback() {
      var _this4 = this;

      _get(_getPrototypeOf(HTMLHyImgElement.prototype), "connectedCallback", this).call(this);

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
      .subscribe(function (_ref4) {
        var _ref5 = _slicedToArray(_ref4, 3),
            contentWidth = _ref5[0],
            width = _ref5[1],
            height = _ref5[2];

        _this4.contentWidth = contentWidth;
        _this4.renderWidth = width;
        _this4.renderHeight = height;
      });
      var $trigger = Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["merge"])(this.getIsIntersecting(), this.$loadImage).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["share"])());
      $trigger.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["filter"])(function (x) {
        return !!x;
      }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["distinctUntilChanged"])()).subscribe(function () {
        return _this4.triggered($trigger, $contentWidth);
      });
    } // TODO: rename

  }, {
    key: "triggered",
    value: function triggered($trigger, contentWidth$) {
      var _this5 = this;

      // this.loading = true;
      var $srcset = Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["combineLatest"])(this.$.src, this.$.srcset).pipe( // subscribeWhen(this.connected$),
      Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["filter"])(function (_ref6) {
        var _ref7 = _slicedToArray(_ref6, 2),
            a = _ref7[0],
            b = _ref7[1];

        return a != null || b != null;
      }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["distinctUntilChanged"])(function (_ref8, _ref9) {
        var _ref10 = _slicedToArray(_ref8, 2),
            p1 = _ref10[0],
            p2 = _ref10[1];

        var _ref11 = _slicedToArray(_ref9, 2),
            q1 = _ref11[0],
            q2 = _ref11[1];

        return p1 === q1 && p2 === q2;
      }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (_ref12) {
        var _ref13 = _slicedToArray(_ref12, 2),
            src = _ref13[0],
            srcset = _ref13[1];

        return srcset ? Object(_srcset__WEBPACK_IMPORTED_MODULE_6__["parseSrcset"])(srcset) : Object(_srcset__WEBPACK_IMPORTED_MODULE_6__["srcsetFromSrc"])(src);
      }));
      var $url = Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["combineLatest"])(contentWidth$, $srcset).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (args) {
        return _this5.selectSrcsetURL.apply(_this5, _toConsumableArray(args));
      }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["distinctUntilKeyChanged"])("href"));
      var $trigger2 = $trigger.pipe( // distinctUntilChanged(), // ???
      Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["startWith"])(true));
      Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["combineLatest"])($url, $trigger2).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["switchMap"])(function (args) {
        return _this5.fetchImage.apply(_this5, _toConsumableArray(args));
      }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])(function () {
        return $url;
      })).subscribe(function (url) {
        _this5.url = url;
      });
    }
  }, {
    key: "selectSrcsetURL",
    value: function selectSrcsetURL(width, srcsetObj) {
      var dpr = window.devicePixelRatio || 1;
      var selection = srcsetObj.select(width || window.screen.width, dpr);
      return new URL(selection, window.location.href);
    }
  }, {
    key: "cacheStrategy",
    value: function cacheStrategy(fetch$) {
      switch (this.strategy) {
        case 'blob':
          {
            return fetch$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["switchMap"])(function (x) {
              return x.blob();
            }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (blob) {
              return URL.createObjectURL(blob);
            }));
          }

        case 'cache':
        default:
          {
            return fetch$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (x) {
              return x.url;
            }));
          }
      }
    }
  }, {
    key: "fetchImage",
    value: function fetchImage(url, isIntersecting) {
      var href = url.href;
      var cache = this.cache;

      if (isIntersecting && !cache.has(href)) {
        var fetch$ = Object(_common__WEBPACK_IMPORTED_MODULE_5__["fetchRx"])(href, {
          method: "GET",
          headers: {
            Accept: "image/*"
          },
          mode: Object(_common__WEBPACK_IMPORTED_MODULE_5__["isExternal"])(url) ? 'cors' : undefined
        });
        return this.cacheStrategy(fetch$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (objectURL) {
          return cache.set(href, objectURL);
        }));
      } else if (cache.has(href)) {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(cache.get(href));
      } else {
        return rxjs__WEBPACK_IMPORTED_MODULE_3__["NEVER"];
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this6 = this;

      return Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["html"])(_templateObject(), Object(lit_html_directives_style_map__WEBPACK_IMPORTED_MODULE_1__["styleMap"])(this.calcSizerStyle()), !this.url || this.visibility === 'hidden' ? Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["html"])(_templateObject2()) : null, this.url ? Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["html"])(_templateObject3(), this.url, Object(lit_html_directives_style_map__WEBPACK_IMPORTED_MODULE_1__["styleMap"])(this.calcImageStyle()), Object(lit_html_directives_if_defined__WEBPACK_IMPORTED_MODULE_2__["ifDefined"])(this.alt), Object(lit_html_directives_if_defined__WEBPACK_IMPORTED_MODULE_2__["ifDefined"])(this.decoding), Object(lit_html_directives_if_defined__WEBPACK_IMPORTED_MODULE_2__["ifDefined"])(this.useMap), function () {
        return _this6.visibility = 'visible';
      }) : null);
    }
  }, {
    key: "calcImageStyle",
    value: function calcImageStyle() {
      return {
        visibility: this.visibility
      };
    }
  }, {
    key: "calcSizerStyle",
    value: function calcSizerStyle() {
      var renderWidth = this.renderWidth,
          renderHeight = this.renderHeight,
          contentWidth = this.contentWidth;
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
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      _get(_getPrototypeOf(HTMLHyImgElement.prototype), "disconnectedCallback", this).call(this);

      if (this.cache) {
        this.cache.forEach(function (objURL) {
          URL.revokeObjectURL(objURL);
        });
      }
    }
  }, {
    key: "loadImage",
    value: function loadImage() {
      this.$loadImage.next(true);
    }
  }]);

  return HTMLHyImgElement;
}(RxLitElement);

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
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
      url: url,
      width: width,
      dpr: dpr
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

var Srcset =
/*#__PURE__*/
function () {
  /**
   * @param {!Array<!SrcsetSourceDef>} sources
   */
  function Srcset(sources) {
    _classCallCheck(this, Srcset);

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


  _createClass(Srcset, [{
    key: "select",
    value: function select(width, dpr) {
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

  }, {
    key: "selectByWidth_",
    value: function selectByWidth_(width) {
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

  }, {
    key: "selectByDpr_",
    value: function selectByDpr_(dpr) {
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

  }, {
    key: "getUrls",
    value: function getUrls() {
      return this.sources_.map(function (s) {
        return s.url;
      });
    }
    /**
     * Reconstructs the string expression for this srcset.
     * @param {function(string):string=} opt_mapper
     * @return {string}
     */

  }, {
    key: "stringify",
    value: function stringify(opt_mapper) {
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
  }]);

  return Srcset;
}();
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
//# sourceMappingURL=1.hydejack-legacy-8.5.0-beta.0.js.map