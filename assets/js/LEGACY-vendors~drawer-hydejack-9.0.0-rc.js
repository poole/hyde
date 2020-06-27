(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~drawer"],{

/***/ "./node_modules/@hydecorp/drawer/lib/calc.js":
/*!***************************************************!*\
  !*** ./node_modules/@hydecorp/drawer/lib/calc.js ***!
  \***************************************************/
/*! exports provided: CalcMixin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CalcMixin", function() { return CalcMixin; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./node_modules/@hydecorp/drawer/lib/constants.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

 // Using shorthands for common functions

var min = Math.min.bind(Math);
var max = Math.max.bind(Math);
var CalcMixin = /*#__PURE__*/function () {
  function CalcMixin() {
    _classCallCheck(this, CalcMixin);
  }

  _createClass(CalcMixin, [{
    key: "calcIsInRange",
    value: function calcIsInRange(_ref, opened) {
      var clientX = _ref.clientX;

      // console.log(this.range, this.align);
      switch (this.side) {
        case "left":
          {
            var _this$range = _slicedToArray(this.range, 2),
                lower = _this$range[0],
                upper = _this$range[1];

            return clientX > lower && (opened || clientX < upper);
          }

        case "right":
          {
            var _upper = window.innerWidth - this.range[0];

            var _lower = window.innerWidth - this.range[1];

            return clientX < _upper && (opened || clientX > _lower);
          }

        default:
          throw Error();
      }
    }
  }, {
    key: "calcIsSwipe",
    value: function calcIsSwipe(_ref2, _ref3, translateX, drawerWidth, _) {
      var startX = _ref2.clientX;
      var endX = _ref3.clientX;
      return endX !== startX || translateX > 0 && translateX < drawerWidth;
    }
  }, {
    key: "calcWillOpen",
    value: function calcWillOpen(_, __, translateX, drawerWidth, velocity) {
      switch (this.side) {
        case "left":
          {
            if (velocity > _constants__WEBPACK_IMPORTED_MODULE_0__["VELOCITY_THRESHOLD"]) return true;else if (velocity < -_constants__WEBPACK_IMPORTED_MODULE_0__["VELOCITY_THRESHOLD"]) return false;else if (translateX >= drawerWidth / 2) return true;else return false;
          }

        case "right":
          {
            if (-velocity > _constants__WEBPACK_IMPORTED_MODULE_0__["VELOCITY_THRESHOLD"]) return true;else if (-velocity < -_constants__WEBPACK_IMPORTED_MODULE_0__["VELOCITY_THRESHOLD"]) return false;else if (translateX <= -drawerWidth / 2) return true;else return false;
          }

        default:
          throw Error();
      }
    }
  }, {
    key: "calcTranslateX",
    value: function calcTranslateX(_ref4, _ref5, startTranslateX, drawerWidth) {
      var moveX = _ref4.clientX;
      var startX = _ref5.clientX;

      switch (this.side) {
        case "left":
          {
            var deltaX = moveX - startX;
            var translateX = startTranslateX + deltaX;
            return max(0, min(drawerWidth, translateX));
          }

        case "right":
          {
            var _deltaX = moveX - startX;

            var _translateX = startTranslateX + _deltaX;

            return min(0, max(-drawerWidth, _translateX));
          }

        default:
          throw Error();
      }
    }
  }]);

  return CalcMixin;
}();
;

/***/ }),

/***/ "./node_modules/@hydecorp/drawer/lib/common.js":
/*!*****************************************************!*\
  !*** ./node_modules/@hydecorp/drawer/lib/common.js ***!
  \*****************************************************/
/*! exports provided: applyMixins, subscribeWhen, filterWhen, tween, easeOutSine, observeWidth, rangeConverter, rangeHasChanged */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "easeOutSine", function() { return easeOutSine; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "observeWidth", function() { return observeWidth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rangeConverter", function() { return rangeConverter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rangeHasChanged", function() { return rangeHasChanged; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/dist/esm5/operators/index.js");
/* harmony import */ var _hydecorp_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @hydecorp/component */ "./node_modules/@hydecorp/component/lib/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "applyMixins", function() { return _hydecorp_component__WEBPACK_IMPORTED_MODULE_2__["applyMixins"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "subscribeWhen", function() { return _hydecorp_component__WEBPACK_IMPORTED_MODULE_2__["subscribeWhen"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "filterWhen", function() { return _hydecorp_component__WEBPACK_IMPORTED_MODULE_2__["filterWhen"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "tween", function() { return _hydecorp_component__WEBPACK_IMPORTED_MODULE_2__["tween"]; });





function easeOutSine(t, b, c, d) {
  return c * Math.sin(t / d * (Math.PI / 2)) + b;
}
function observeWidth(el) {
  // This component should have at least basic support without `ResizeObserver` support,
  // so we pass a one-time measurement when it's missing. Obviously this won't update, so BYO polyfill.
  var resize$ = "ResizeObserver" in window ? Object(_hydecorp_component__WEBPACK_IMPORTED_MODULE_2__["createResizeObservable"])(el) : Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])({
    contentRect: {
      width: el.clientWidth
    }
  });
  return resize$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (_ref) {
    var width = _ref.contentRect.width;
    return width;
  }));
}
var rangeConverter = {
  fromAttribute: function fromAttribute() {
    var attr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return attr.replace(/[\[\]]/g, '').split(",").map(Number);
  },
  toAttribute: function toAttribute() {
    var range = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    return range.join(',');
  }
};
function rangeHasChanged(curr) {
  var prev = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return curr.length !== prev.length || curr.some(function (v, i) {
    return v !== prev[i];
  });
}

/***/ }),

/***/ "./node_modules/@hydecorp/drawer/lib/constants.js":
/*!********************************************************!*\
  !*** ./node_modules/@hydecorp/drawer/lib/constants.js ***!
  \********************************************************/
/*! exports provided: BASE_DURATION, WIDTH_CONTRIBUTION, VELOCITY_THRESHOLD */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BASE_DURATION", function() { return BASE_DURATION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WIDTH_CONTRIBUTION", function() { return WIDTH_CONTRIBUTION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VELOCITY_THRESHOLD", function() { return VELOCITY_THRESHOLD; });
// The base duration of the fling animation.
var BASE_DURATION = 200; // We adjust the duration of the animation using the width of the drawer.
// There is no physics to this, but we know from testing that the animation starts to feel bad
// when the drawer increases in size.
// From testing we know that, if we increase the duration as a fraction of the drawer width,
// the animation stays smooth across common display sizes.

var WIDTH_CONTRIBUTION = 0.15; // Minimum velocity of the drawer (in px/ms) when releasing to make it fling to opened/closed state.

var VELOCITY_THRESHOLD = 0.15;

/***/ }),

/***/ "./node_modules/@hydecorp/drawer/lib/index.js":
/*!****************************************************!*\
  !*** ./node_modules/@hydecorp/drawer/lib/index.js ***!
  \****************************************************/
/*! exports provided: HyDrawer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HyDrawer", function() { return HyDrawer; });
/* harmony import */ var lit_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit-element */ "./node_modules/lit-element/lit-element.js");
/* harmony import */ var lit_html_directives_class_map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lit-html/directives/class-map */ "./node_modules/lit-html/directives/class-map.js");
/* harmony import */ var lit_html_directives_style_map__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lit-html/directives/style-map */ "./node_modules/lit-html/directives/style-map.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/dist/esm5/operators/index.js");
/* harmony import */ var _hydecorp_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @hydecorp/component */ "./node_modules/@hydecorp/component/lib/index.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./constants */ "./node_modules/@hydecorp/drawer/lib/constants.js");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./common */ "./node_modules/@hydecorp/drawer/lib/common.js");
/* harmony import */ var _observables__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./observables */ "./node_modules/@hydecorp/drawer/lib/observables.js");
/* harmony import */ var _calc__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./calc */ "./node_modules/@hydecorp/drawer/lib/calc.js");
/* harmony import */ var _update__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./update */ "./node_modules/@hydecorp/drawer/lib/update.js");
/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./styles */ "./node_modules/@hydecorp/drawer/lib/styles.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["<div class=\"grabbing-screen full-screen\"></div>"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n      <div class=\"peek full-height\"></div>\n      <div\n        class=\"scrim\"\n        style=", ">\n      </div>\n      ", "\n      <div\n        class=", "\n        style=", "\n      >\n        <div class=\"overflow\">\n          <slot></slot>\n        </div>\n      </div>\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
 * Copyright (c) 2020 Florian Klampfer <https://qwtel.com/>
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















var HyDrawer = /*#__PURE__*/function (_applyMixins) {
  _inherits(HyDrawer, _applyMixins);

  var _super = _createSuper(HyDrawer);

  function HyDrawer() {
    var _this;

    _classCallCheck(this, HyDrawer);

    _this = _super.apply(this, arguments);
    _this.el = _assertThisInitialized(_this);
    _this.opened = false;
    _this.side = "left";
    _this.persistent = false;
    _this.threshold = 10;
    _this.noScroll = false;
    _this.mouseEvents = false; // @property({ type: Boolean, reflect: true }) hashChange: boolean = false;

    _this.range = [0, 100];
    _this.willChange = false;
    _this._initialized = Object(_hydecorp_component__WEBPACK_IMPORTED_MODULE_5__["createResolvablePromise"])();
    _this.$ = {};

    _this.upgrade = function () {
      var drawerWidth$ = _this.getDrawerWidth();

      var active$ = _this.$.persistent.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (_) {
        return !_;
      }));

      var start$ = _this.getStartObservable().pipe( // takeUntil(this.subjects.disconnect),
      Object(_common__WEBPACK_IMPORTED_MODULE_7__["filterWhen"])(active$), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["share"])());

      var deferred = {};
      var isScrimVisible$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["defer"])(function () {
        return deferred.translateX$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (translateX) {
          return translateX !== 0;
        }));
      });
      var isInRange$ = start$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["withLatestFrom"])(isScrimVisible$), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (args) {
        var _this2;

        return (_this2 = _this).calcIsInRange.apply(_this2, _toConsumableArray(args));
      }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (inRange) {
        if (inRange) {
          _this.willChange = true;

          _this.fireEvent('prepare');
        }
      }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["share"])());

      var end$ = _this.getEndObservable().pipe( // takeUntil(this.subjects.disconnect),
      Object(_common__WEBPACK_IMPORTED_MODULE_7__["filterWhen"])(active$, isInRange$), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function () {
        if (_this.mouseEvents) _this.grabbing = false;
      }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["share"])());

      var move$ = _this.getMoveObservable(start$, end$).pipe( // takeUntil(this.subjects.disconnect),
      Object(_common__WEBPACK_IMPORTED_MODULE_7__["filterWhen"])(active$, isInRange$), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["share"])());

      var isSliding$ = _this.getIsSlidingObservable(move$, start$, end$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (isSliding) {
        _this.isSliding = isSliding;
        if (isSliding && _this.mouseEvents) _this.grabbing = true; // if (isSliding) this.fireEvent('slidestart', { detail: this.opened });
      }));

      var translateX$ = deferred.translateX$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["defer"])(function () {
        var jumpTranslateX$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["combineLatest"])(_this.$.opened, _this.$.side, drawerWidth$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 3),
              opened = _ref2[0],
              side = _ref2[1],
              drawerWidth = _ref2[2];

          return !opened ? 0 : drawerWidth * (side === "left" ? 1 : -1);
        }));
        var moveTranslateX$ = move$.pipe(Object(_common__WEBPACK_IMPORTED_MODULE_7__["filterWhen"])(isSliding$), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function () {
          return _this.scrimClickable = false;
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (_ref3) {
          var event = _ref3.event;
          return _this.noScroll && event.preventDefault();
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["withLatestFrom"])(start$, deferred.startTranslateX$, drawerWidth$), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (args) {
          var _this3;

          return (_this3 = _this).calcTranslateX.apply(_this3, _toConsumableArray(args));
        }));
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["merge"])(deferred.tweenTranslateX$, jumpTranslateX$, moveTranslateX$);
      }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["share"])());
      deferred.startTranslateX$ = translateX$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["sample"])(start$));
      var velocity$ = translateX$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["timestamp"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["pairwise"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["filter"])(function (_ref4) {
        var _ref5 = _slicedToArray(_ref4, 2),
            prevTime = _ref5[0].timestamp,
            time = _ref5[1].timestamp;

        return time - prevTime > 0;
      }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (_ref6) {
        var _ref7 = _slicedToArray(_ref6, 2),
            _ref7$ = _ref7[0],
            prevX = _ref7$.value,
            prevTime = _ref7$.timestamp,
            _ref7$2 = _ref7[1],
            x = _ref7$2.value,
            time = _ref7$2.timestamp;

        return (x - prevX) / (time - prevTime);
      }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["startWith"])(0));
      var willOpen$ = end$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["withLatestFrom"])(start$, translateX$, drawerWidth$, velocity$), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["filter"])(function (args) {
        var _this4;

        return (_this4 = _this).calcIsSwipe.apply(_this4, _toConsumableArray(args));
      }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (args) {
        var _this5;

        return (_this5 = _this).calcWillOpen.apply(_this5, _toConsumableArray(args));
      }));

      var animateTo$ = _this.animateTo$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function () {
        _this.willChange = true;

        _this.fireEvent('prepare');
      }));

      deferred.tweenTranslateX$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["merge"])(willOpen$, animateTo$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["withLatestFrom"])(translateX$, drawerWidth$), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["switchMap"])(function (_ref8) {
        var _ref9 = _slicedToArray(_ref8, 3),
            willOpen = _ref9[0],
            translateX = _ref9[1],
            drawerWidth = _ref9[2];

        var inv = _this.side === "left" ? 1 : -1;
        var endTranslateX = willOpen ? drawerWidth * inv : 0;
        var diffTranslateX = endTranslateX - translateX;
        var duration = Math.ceil(_constants__WEBPACK_IMPORTED_MODULE_6__["BASE_DURATION"] + drawerWidth * _constants__WEBPACK_IMPORTED_MODULE_6__["WIDTH_CONTRIBUTION"]);
        return Object(_common__WEBPACK_IMPORTED_MODULE_7__["tween"])(_common__WEBPACK_IMPORTED_MODULE_7__["easeOutSine"], translateX, diffTranslateX, duration).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["finalize"])(function () {
          _this.transitioned(willOpen);
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(start$), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(_this.$.side.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["skip"])(1))), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["share"])());
      }));
      translateX$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["withLatestFrom"])(drawerWidth$), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (args) {
        var _this6;

        (_this6 = _this).updateDOM.apply(_this6, _toConsumableArray(args));

        var _assertThisInitialize = _assertThisInitialized(_this),
            translateX = _assertThisInitialize.translateX,
            opacity = _assertThisInitialize.opacity;

        _this.fireEvent('move', {
          detail: {
            translateX: translateX,
            opacity: opacity
          },
          bubbles: false
        });
      })).subscribe();
      Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["fromEvent"])(_this.scrimEl, "click").pipe( // takeUntil(this.subjects.disconnect),
      Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function () {
        return _this.close();
      })).subscribe();
      active$.pipe( // takeUntil(this.subjects.disconnect),
      Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (active) {
        _this.scrimEl.style.display = active ? "block" : "none";
      })).subscribe();

      _this.$.mouseEvents.pipe( // takeUntil(this.subjects.disconnect),
      Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["switchMap"])(function (mouseEvents) {
        return mouseEvents ? start$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["withLatestFrom"])(isInRange$)) : rxjs__WEBPACK_IMPORTED_MODULE_3__["NEVER"];
      }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["filter"])(function (_ref10) {
        var _ref11 = _slicedToArray(_ref10, 2),
            coord = _ref11[0],
            isInRange = _ref11[1];

        return isInRange && coord.event != null;
      }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (_ref12) {
        var _ref13 = _slicedToArray(_ref12, 1),
            event = _ref13[0].event;

        return event.preventDefault();
      })).subscribe(); // fromEvent(window, 'hashchange').pipe(
      //   // takeUntil(this.subjects.disconnect),
      //   subscribeWhen(this.$.hashChange),
      //   tap(() => {
      //     const opened = location.hash === this.hashId;
      //     if (!history.state && opened) {
      //       history.replaceState({ [this.histId]: { backable: true } }, document.title)
      //     }
      //     // If the state doesn't match open/close the drawer
      //     if (opened !== this.opened) this.animateTo$.next(opened);
      //   }),
      // ).subscribe();


      _this.fireEvent("init", {
        detail: _this.opened
      });

      _this._initialized.resolve(_assertThisInitialized(_this));
    };

    _this.transitioned = function (hasOpened) {
      _this.opened = _this.scrimClickable = hasOpened;
      _this.willChange = false; // if (this.hashChange) this.transitionedHash(hasOpened)

      _this.fireEvent('transitioned', {
        detail: hasOpened
      });
    };

    return _this;
  }

  _createClass(HyDrawer, [{
    key: "getDrawerWidth",
    // HyDrawer
    value: function getDrawerWidth() {
      var _this7 = this;

      var content$ = Object(_common__WEBPACK_IMPORTED_MODULE_7__["observeWidth"])(this.contentEl).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (px) {
        return _this7.fireEvent('content-width-change', {
          detail: px
        });
      }));
      var peek$ = Object(_common__WEBPACK_IMPORTED_MODULE_7__["observeWidth"])(this.peekEl).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (px) {
        return _this7.fireEvent('peek-width-change', {
          detail: px
        });
      }));
      return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["combineLatest"])(content$, peek$).pipe( // takeUntil(this.subjects.disconnect),
      Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (_ref14) {
        var _ref15 = _slicedToArray(_ref14, 2),
            contentWidth = _ref15[0],
            peekWidth = _ref15[1];

        return contentWidth - peekWidth;
      }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["share"])());
    } // private consolidateState() {
    //   const hashOpened = location.hash === this.hashId;
    //   const isReload = history.state && history.state[this.histId];
    //   if (isReload) {
    //     if (hashOpened !== this.opened) {
    //       this.opened = hashOpened;
    //     }
    //   } else {
    //     const url = new URL(location.href);
    //     const newState = { ...history.state, [this.histId]: { backable: false } };
    //     if (hashOpened && !this.opened) {
    //       url.hash = '';
    //       history.replaceState(newState, document.title, url.href);
    //       url.hash = this.hashId;
    //       history.pushState({ [this.histId]: { backable: true } }, document.title, url.href);
    //       this.opened = true;
    //     }
    //     else if (!hashOpened && this.opened) {
    //       history.replaceState(newState, document.title, url.href);
    //       url.hash = this.hashId;
    //       history.pushState({ [this.histId]: { backable: true } }, document.title, url.href);
    //     }
    //     else {
    //       history.replaceState(newState, document.title, url.href);
    //     }
    //   }
    // }

  }, {
    key: "connectedCallback",
    value: function connectedCallback() {
      _get(_getPrototypeOf(HyDrawer.prototype), "connectedCallback", this).call(this); // if (this.hashChange) this.consolidateState()


      this.$.opened = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"](this.opened);
      this.$.side = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"](this.side);
      this.$.persistent = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"](this.persistent);
      this.$.preventDefault = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"](this.noScroll);
      this.$.mouseEvents = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"](this.mouseEvents); // this.$.hashChange = new BehaviorSubject(this.hashChange)

      this.scrimClickable = this.opened;
      this.animateTo$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
      this.updater = _update__WEBPACK_IMPORTED_MODULE_10__["Updater"].getUpdaterForPlatform(this);
      this.updateComplete.then(this.upgrade);
    } // private transitionedHash(hasOpened: boolean) {
    //   const hasClosed = !hasOpened;
    //   const { backable } = history.state && history.state[this.histId] || { backable: false }
    //   if (hasClosed && backable) {
    //     history.back()
    //   } 
    //   if (hasOpened && location.hash !== this.hashId) {
    //     location.hash = this.hashId;
    //   }
    // }

  }, {
    key: "render",
    value: function render() {
      var _classMap;

      return Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["html"])(_templateObject(), Object(lit_html_directives_style_map__WEBPACK_IMPORTED_MODULE_2__["styleMap"])({
        willChange: this.willChange ? 'opacity' : '',
        pointerEvents: this.scrimClickable ? 'all' : ''
      }), this.mouseEvents && this.grabbing && !this.scrimClickable ? Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["html"])(_templateObject2()) : null, Object(lit_html_directives_class_map__WEBPACK_IMPORTED_MODULE_1__["classMap"])((_classMap = {
        wrapper: true,
        'full-height': true
      }, _defineProperty(_classMap, this.side, true), _defineProperty(_classMap, "grab", this.mouseEvents), _defineProperty(_classMap, "grabbing", this.mouseEvents && this.grabbing), _classMap)), Object(lit_html_directives_style_map__WEBPACK_IMPORTED_MODULE_2__["styleMap"])({
        willChange: this.willChange ? 'transform' : ''
      }));
    }
  }, {
    key: "open",
    value: function open() {
      this.animateTo$.next(true);
    }
  }, {
    key: "close",
    value: function close() {
      this.animateTo$.next(false);
    }
  }, {
    key: "toggle",
    value: function toggle() {
      this.animateTo$.next(!this.opened);
    }
  }, {
    key: "initialized",
    get: function get() {
      return this._initialized;
    }
  }, {
    key: "histId",
    get: function get() {
      return this.id || this.tagName;
    }
  }, {
    key: "hashId",
    get: function get() {
      return "#".concat(this.histId, "--opened");
    }
  }]);

  return HyDrawer;
}(Object(_common__WEBPACK_IMPORTED_MODULE_7__["applyMixins"])(_hydecorp_component__WEBPACK_IMPORTED_MODULE_5__["RxLitElement"], [_observables__WEBPACK_IMPORTED_MODULE_8__["ObservablesMixin"], _update__WEBPACK_IMPORTED_MODULE_10__["UpdateMixin"], _calc__WEBPACK_IMPORTED_MODULE_9__["CalcMixin"]]));

HyDrawer.styles = _styles__WEBPACK_IMPORTED_MODULE_11__["styles"];

__decorate([Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["query"])('.scrim')], HyDrawer.prototype, "scrimEl", void 0);

__decorate([Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["query"])('.wrapper')], HyDrawer.prototype, "contentEl", void 0);

__decorate([Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["query"])('.peek')], HyDrawer.prototype, "peekEl", void 0);

__decorate([Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["property"])({
  type: Boolean,
  reflect: true
})], HyDrawer.prototype, "opened", void 0);

__decorate([Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["property"])({
  type: String,
  reflect: true
})], HyDrawer.prototype, "side", void 0);

__decorate([Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["property"])({
  type: Boolean,
  reflect: true
})], HyDrawer.prototype, "persistent", void 0);

__decorate([Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["property"])({
  type: Number,
  reflect: true
})], HyDrawer.prototype, "threshold", void 0);

__decorate([Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["property"])({
  type: Boolean,
  reflect: true
})], HyDrawer.prototype, "noScroll", void 0);

__decorate([Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["property"])({
  type: Boolean,
  reflect: true
})], HyDrawer.prototype, "mouseEvents", void 0);

__decorate([Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["property"])({
  reflect: true,
  converter: _common__WEBPACK_IMPORTED_MODULE_7__["rangeConverter"],
  hasChanged: _common__WEBPACK_IMPORTED_MODULE_7__["rangeHasChanged"]
})], HyDrawer.prototype, "range", void 0);

__decorate([Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["property"])()], HyDrawer.prototype, "scrimClickable", void 0);

__decorate([Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["property"])()], HyDrawer.prototype, "grabbing", void 0);

__decorate([Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["property"])()], HyDrawer.prototype, "willChange", void 0);

__decorate([Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["property"])()], HyDrawer.prototype, "open", null);

__decorate([Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["property"])()], HyDrawer.prototype, "close", null);

__decorate([Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["property"])()], HyDrawer.prototype, "toggle", null);

HyDrawer = __decorate([Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["customElement"])('hy-drawer')], HyDrawer);


/***/ }),

/***/ "./node_modules/@hydecorp/drawer/lib/observables.js":
/*!**********************************************************!*\
  !*** ./node_modules/@hydecorp/drawer/lib/observables.js ***!
  \**********************************************************/
/*! exports provided: ObservablesMixin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ObservablesMixin", function() { return ObservablesMixin; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/dist/esm5/operators/index.js");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common */ "./node_modules/@hydecorp/drawer/lib/common.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var abs = Math.abs.bind(Math);
var ObservablesMixin = /*#__PURE__*/function () {
  function ObservablesMixin() {
    _classCallCheck(this, ObservablesMixin);
  }

  _createClass(ObservablesMixin, [{
    key: "getStartObservable",
    value: function getStartObservable() {
      return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["combineLatest"])(this.$.mouseEvents).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 1),
            mouseEvents = _ref2[0];

        var touchstart$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["fromEvent"])(document, "touchstart", {
          passive: true
        }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["filter"])(function (_ref3) {
          var touches = _ref3.touches;
          return touches.length === 1;
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (_ref4) {
          var touches = _ref4.touches;
          return touches[0];
        }));
        var mousedown$ = !mouseEvents ? rxjs__WEBPACK_IMPORTED_MODULE_0__["NEVER"] : Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["fromEvent"])(document, "mousedown").pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (e) {
          return e.event = e, e;
        }));
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["merge"])(touchstart$, mousedown$);
      }));
    }
  }, {
    key: "getMoveObservable",
    value: function getMoveObservable(start$, end$) {
      return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["combineLatest"])(this.$.mouseEvents, this.$.preventDefault).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])(function (_ref5) {
        var _ref6 = _slicedToArray(_ref5, 2),
            mouseEvents = _ref6[0],
            preventDefault = _ref6[1];

        var touchmove$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["fromEvent"])(document, "touchmove", {
          passive: !preventDefault
        }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (e) {
          return e.touches[0].event = e, e.touches[0];
        }));
        var mousemove$ = !mouseEvents ? rxjs__WEBPACK_IMPORTED_MODULE_0__["NEVER"] : Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["fromEvent"])(document, "mousemove", {
          passive: !preventDefault
        }).pipe(Object(_common__WEBPACK_IMPORTED_MODULE_2__["subscribeWhen"])(Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["merge"])(start$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["mapTo"])(true)), end$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["mapTo"])(false)))), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (e) {
          return e.event = e, e;
        }));
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["merge"])(touchmove$, mousemove$);
      }));
    }
  }, {
    key: "getEndObservable",
    value: function getEndObservable() {
      return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["combineLatest"])(this.$.mouseEvents).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])(function (_ref7) {
        var _ref8 = _slicedToArray(_ref7, 1),
            mouseEvents = _ref8[0];

        var touchend$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["fromEvent"])(document, "touchend", {
          passive: true
        }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["filter"])(function (_ref9) {
          var touches = _ref9.touches;
          return touches.length === 0;
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (event) {
          return event.changedTouches[0];
        }));
        var mouseup$ = !mouseEvents ? rxjs__WEBPACK_IMPORTED_MODULE_0__["NEVER"] : Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["fromEvent"])(document, "mouseup", {
          passive: true
        });
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["merge"])(touchend$, mouseup$);
      }));
    }
  }, {
    key: "getIsSlidingObservable",
    value: function getIsSlidingObservable(move$, start$, end$) {
      return this.getIsSlidingObservableInner(move$, start$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["startWith"])(undefined), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["repeatWhen"])(function () {
        return end$;
      }));
    }
  }, {
    key: "getIsSlidingObservableInner",
    value: function getIsSlidingObservableInner(move$, start$) {
      var _this = this;

      if (this.threshold) {
        return move$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["withLatestFrom"])(start$), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["skipWhile"])(function (_ref10) {
          var _ref11 = _slicedToArray(_ref10, 2),
              _ref11$ = _ref11[0],
              clientX = _ref11$.clientX,
              clientY = _ref11$.clientY,
              _ref11$2 = _ref11[1],
              startX = _ref11$2.clientX,
              startY = _ref11$2.clientY;

          return abs(startY - clientY) < _this.threshold && abs(startX - clientX) < _this.threshold;
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (_ref12) {
          var _ref13 = _slicedToArray(_ref12, 2),
              _ref13$ = _ref13[0],
              clientX = _ref13$.clientX,
              clientY = _ref13$.clientY,
              _ref13$2 = _ref13[1],
              startX = _ref13$2.clientX,
              startY = _ref13$2.clientY;

          return abs(startX - clientX) >= abs(startY - clientY);
        }));
      } else {
        return move$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["withLatestFrom"])(start$), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (_ref14) {
          var _ref15 = _slicedToArray(_ref14, 2),
              _ref15$ = _ref15[0],
              clientX = _ref15$.clientX,
              clientY = _ref15$.clientY,
              event = _ref15$.event,
              _ref15$2 = _ref15[1],
              startX = _ref15$2.clientX,
              startY = _ref15$2.clientY;

          var isSliding = abs(startX - clientX) >= abs(startY - clientY);
          if (_this.noScroll && isSliding) event.preventDefault();
          return isSliding;
        }));
      }
    }
  }]);

  return ObservablesMixin;
}();

/***/ }),

/***/ "./node_modules/@hydecorp/drawer/lib/styles.js":
/*!*****************************************************!*\
  !*** ./node_modules/@hydecorp/drawer/lib/styles.js ***!
  \*****************************************************/
/*! exports provided: styles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "styles", function() { return styles; });
/* harmony import */ var lit_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit-element */ "./node_modules/lit-element/lit-element.js");
function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  @media screen {\n    :host {\n      touch-action: pan-x;\n    }\n\n    .full-screen {\n      position: fixed;\n      top: 0;\n      left: 0;\n      height: 100vh;\n      width: 100vw;\n    }\n\n    .full-height {\n      position: fixed;\n      top: 0;\n      height: 100vh;\n    }\n\n    .peek {\n      left: 0;\n      width: var(--hy-drawer-peek-width, 0px);\n      visibility: hidden;\n      z-index: calc(var(--hy-drawer-z-index, 100) - 1);\n    }\n\n    .scrim {\n      position: fixed;\n      top: 0;\n      left: 0;\n      height: 10vh;\n      width: 10vw;\n      transform: scale(10);\n      transform-origin: top left;\n      opacity: 0;\n      pointer-events: none;\n      background: var(--hy-drawer-scrim-background, rgba(0, 0, 0, 0.5));\n      z-index: var(--hy-drawer-z-index, 100);\n      -webkit-tap-highlight-color: transparent;\n    }\n\n    .range {\n      position: fixed;\n      top: 0;\n      height: 100vh;\n      z-index: calc(var(--hy-drawer-z-index, 100) + 1);\n    }\n\n    .grabbing-screen {\n      cursor: grabbing;\n      z-index: calc(var(--hy-drawer-z-index, 100) + 2);\n    }\n\n    .wrapper {\n      width: var(--hy-drawer-width, 300px);\n      background: var(--hy-drawer-background, inherit);\n      box-shadow: var(--hy-drawer-box-shadow, 0 0 15px rgba(0, 0, 0, 0.25));\n      z-index: calc(var(--hy-drawer-z-index, 100) + 3);\n      contain: strict;\n    }\n\n    .wrapper.left {\n      left:  calc(-1 * var(--hy-drawer-width, 300px) + var(--hy-drawer-peek-width, 0px));\n    }\n\n    .wrapper.right {\n      right:  calc(-1 * var(--hy-drawer-width, 300px) + var(--hy-drawer-peek-width, 0px));\n    }\n\n    .wrapper > .overflow {\n      position: absolute;\n      top: 0;\n      right: 0;\n      bottom: 0;\n      left: 0;\n      overflow-x: hidden;\n      overflow-y: auto;\n      overscroll-behavior: contain;\n      -webkit-overflow-scrolling: touch;\n    }\n\n    .grab {\n      cursor: move;\n      cursor: grab;\n    }\n\n    .grabbing {\n      cursor: grabbing;\n    }\n  }\n\n  @media print {\n    .scrim {\n      display: none !important;\n    }\n\n    .wrapper {\n      transform: none !important;\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }


var styles = Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["css"])(_templateObject());

/***/ }),

/***/ "./node_modules/@hydecorp/drawer/lib/update.js":
/*!*****************************************************!*\
  !*** ./node_modules/@hydecorp/drawer/lib/update.js ***!
  \*****************************************************/
/*! exports provided: UpdateMixin, Updater, StyleUpdater, AttributeStyleMapUpdater */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UpdateMixin", function() { return UpdateMixin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Updater", function() { return Updater; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StyleUpdater", function() { return StyleUpdater; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AttributeStyleMapUpdater", function() { return AttributeStyleMapUpdater; });
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UpdateMixin = /*#__PURE__*/function () {
  function UpdateMixin() {
    _classCallCheck(this, UpdateMixin);
  }

  _createClass(UpdateMixin, [{
    key: "updateDOM",
    value: function updateDOM(translateX, drawerWidth) {
      var inv = this.side === "left" ? 1 : -1;
      var opacity = translateX / drawerWidth * inv || 0;
      this.translateX = translateX;
      this.opacity = opacity;
      this.updater.updateDOM(translateX, opacity);
    }
  }]);

  return UpdateMixin;
}();
var Updater = /*#__PURE__*/function () {
  function Updater(parent) {
    _classCallCheck(this, Updater);

    this.parent = parent;
  }

  _createClass(Updater, [{
    key: "contentEl",
    get: function get() {
      return this.parent.contentEl;
    }
  }, {
    key: "scrimEl",
    get: function get() {
      return this.parent.scrimEl;
    }
  }], [{
    key: "getUpdaterForPlatform",
    value: function getUpdaterForPlatform(parent) {
      var hasCSSOM = "attributeStyleMap" in Element.prototype && "CSS" in window && "number" in CSS;
      return hasCSSOM ? new AttributeStyleMapUpdater(parent) : new StyleUpdater(parent);
    }
  }]);

  return Updater;
}();
var StyleUpdater = /*#__PURE__*/function (_Updater) {
  _inherits(StyleUpdater, _Updater);

  var _super = _createSuper(StyleUpdater);

  function StyleUpdater(parent) {
    _classCallCheck(this, StyleUpdater);

    return _super.call(this, parent);
  }

  _createClass(StyleUpdater, [{
    key: "updateDOM",
    value: function updateDOM(translateX, opacity) {
      this.contentEl.style.transform = "translate(".concat(translateX, "px, 0px)");
      this.scrimEl.style.opacity = "".concat(opacity);
    }
  }]);

  return StyleUpdater;
}(Updater);
var AttributeStyleMapUpdater = /*#__PURE__*/function (_Updater2) {
  _inherits(AttributeStyleMapUpdater, _Updater2);

  var _super2 = _createSuper(AttributeStyleMapUpdater);

  function AttributeStyleMapUpdater(parent) {
    var _this;

    _classCallCheck(this, AttributeStyleMapUpdater);

    _this = _super2.call(this, parent); // @ts-ignore

    _this.tvalue = new CSSTransformValue([new CSSTranslate(CSS.px(0), CSS.px(0))]); // @ts-ignore

    _this.ovalue = CSS.number(1);
    return _this;
  }

  _createClass(AttributeStyleMapUpdater, [{
    key: "updateDOM",
    value: function updateDOM(translateX, opacity) {
      // @ts-ignore
      this.tvalue[0].x.value = translateX; // @ts-ignore

      this.ovalue.value = opacity; // @ts-ignore

      this.contentEl.attributeStyleMap.set("transform", this.tvalue); // @ts-ignore

      this.scrimEl.attributeStyleMap.set("opacity", this.ovalue);
    }
  }]);

  return AttributeStyleMapUpdater;
}(Updater);

/***/ }),

/***/ "./node_modules/lit-html/directives/class-map.js":
/*!*******************************************************!*\
  !*** ./node_modules/lit-html/directives/class-map.js ***!
  \*******************************************************/
/*! exports provided: classMap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "classMap", function() { return classMap; });
/* harmony import */ var _lit_html_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lit-html.js */ "./node_modules/lit-html/lit-html.js");
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
 // IE11 doesn't support classList on SVG elements, so we emulate it with a Set

var ClassList = /*#__PURE__*/function () {
  function ClassList(element) {
    _classCallCheck(this, ClassList);

    this.classes = new Set();
    this.changed = false;
    this.element = element;
    var classList = (element.getAttribute('class') || '').split(/\s+/);

    var _iterator = _createForOfIteratorHelper(classList),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var cls = _step.value;
        this.classes.add(cls);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }

  _createClass(ClassList, [{
    key: "add",
    value: function add(cls) {
      this.classes.add(cls);
      this.changed = true;
    }
  }, {
    key: "remove",
    value: function remove(cls) {
      this.classes.delete(cls);
      this.changed = true;
    }
  }, {
    key: "commit",
    value: function commit() {
      if (this.changed) {
        var classString = '';
        this.classes.forEach(function (cls) {
          return classString += cls + ' ';
        });
        this.element.setAttribute('class', classString);
      }
    }
  }]);

  return ClassList;
}();
/**
 * Stores the ClassInfo object applied to a given AttributePart.
 * Used to unset existing values when a new ClassInfo object is applied.
 */


var previousClassesCache = new WeakMap();
/**
 * A directive that applies CSS classes. This must be used in the `class`
 * attribute and must be the only part used in the attribute. It takes each
 * property in the `classInfo` argument and adds the property name to the
 * element's `class` if the property value is truthy; if the property value is
 * falsey, the property name is removed from the element's `class`. For example
 * `{foo: bar}` applies the class `foo` if the value of `bar` is truthy.
 * @param classInfo {ClassInfo}
 */

var classMap = Object(_lit_html_js__WEBPACK_IMPORTED_MODULE_0__["directive"])(function (classInfo) {
  return function (part) {
    if (!(part instanceof _lit_html_js__WEBPACK_IMPORTED_MODULE_0__["AttributePart"]) || part instanceof _lit_html_js__WEBPACK_IMPORTED_MODULE_0__["PropertyPart"] || part.committer.name !== 'class' || part.committer.parts.length > 1) {
      throw new Error('The `classMap` directive must be used in the `class` attribute ' + 'and must be the only part in the attribute.');
    }

    var committer = part.committer;
    var element = committer.element;
    var previousClasses = previousClassesCache.get(part);

    if (previousClasses === undefined) {
      // Write static classes once
      // Use setAttribute() because className isn't a string on SVG elements
      element.setAttribute('class', committer.strings.join(' '));
      previousClassesCache.set(part, previousClasses = new Set());
    }

    var classList = element.classList || new ClassList(element); // Remove old classes that no longer apply
    // We use forEach() instead of for-of so that re don't require down-level
    // iteration.

    previousClasses.forEach(function (name) {
      if (!(name in classInfo)) {
        classList.remove(name);
        previousClasses.delete(name);
      }
    }); // Add or remove classes based on their classMap value

    for (var name in classInfo) {
      var value = classInfo[name];

      if (value != previousClasses.has(name)) {
        // We explicitly want a loose truthy check of `value` because it seems
        // more convenient that '' and 0 are skipped.
        if (value) {
          classList.add(name);
          previousClasses.add(name);
        } else {
          classList.remove(name);
          previousClasses.delete(name);
        }
      }
    }

    if (typeof classList.commit === 'function') {
      classList.commit();
    }
  };
});

/***/ }),

/***/ "./node_modules/lit-html/directives/style-map.js":
/*!*******************************************************!*\
  !*** ./node_modules/lit-html/directives/style-map.js ***!
  \*******************************************************/
/*! exports provided: styleMap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "styleMap", function() { return styleMap; });
/* harmony import */ var _lit_html_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lit-html.js */ "./node_modules/lit-html/lit-html.js");
/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * Stores the StyleInfo object applied to a given AttributePart.
 * Used to unset existing values when a new StyleInfo object is applied.
 */

var previousStylePropertyCache = new WeakMap();
/**
 * A directive that applies CSS properties to an element.
 *
 * `styleMap` can only be used in the `style` attribute and must be the only
 * expression in the attribute. It takes the property names in the `styleInfo`
 * object and adds the property values as CSS properties. Property names with
 * dashes (`-`) are assumed to be valid CSS property names and set on the
 * element's style object using `setProperty()`. Names without dashes are
 * assumed to be camelCased JavaScript property names and set on the element's
 * style object using property assignment, allowing the style object to
 * translate JavaScript-style names to CSS property names.
 *
 * For example `styleMap({backgroundColor: 'red', 'border-top': '5px', '--size':
 * '0'})` sets the `background-color`, `border-top` and `--size` properties.
 *
 * @param styleInfo {StyleInfo}
 */

var styleMap = Object(_lit_html_js__WEBPACK_IMPORTED_MODULE_0__["directive"])(function (styleInfo) {
  return function (part) {
    if (!(part instanceof _lit_html_js__WEBPACK_IMPORTED_MODULE_0__["AttributePart"]) || part instanceof _lit_html_js__WEBPACK_IMPORTED_MODULE_0__["PropertyPart"] || part.committer.name !== 'style' || part.committer.parts.length > 1) {
      throw new Error('The `styleMap` directive must be used in the style attribute ' + 'and must be the only part in the attribute.');
    }

    var committer = part.committer;
    var style = committer.element.style;
    var previousStyleProperties = previousStylePropertyCache.get(part);

    if (previousStyleProperties === undefined) {
      // Write static styles once
      style.cssText = committer.strings.join(' ');
      previousStylePropertyCache.set(part, previousStyleProperties = new Set());
    } // Remove old properties that no longer exist in styleInfo
    // We use forEach() instead of for-of so that re don't require down-level
    // iteration.


    previousStyleProperties.forEach(function (name) {
      if (!(name in styleInfo)) {
        previousStyleProperties.delete(name);

        if (name.indexOf('-') === -1) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          style[name] = null;
        } else {
          style.removeProperty(name);
        }
      }
    }); // Add or update properties

    for (var name in styleInfo) {
      previousStyleProperties.add(name);

      if (name.indexOf('-') === -1) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        style[name] = styleInfo[name];
      } else {
        style.setProperty(name, styleInfo[name]);
      }
    }
  };
});

/***/ })

}]);
//# sourceMappingURL=LEGACY-vendors~drawer-hydejack-9.0.0-rc.js.map