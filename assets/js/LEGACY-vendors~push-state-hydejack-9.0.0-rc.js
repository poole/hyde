(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~push-state"],{

/***/ "./node_modules/@hydecorp/push-state/lib/common.js":
/*!*********************************************************!*\
  !*** ./node_modules/@hydecorp/push-state/lib/common.js ***!
  \*********************************************************/
/*! exports provided: applyMixins, subscribeWhen, unsubscribeWhen, filterWhen, bufferDebounceTime, fetchRx, fragmentFromString, createMutationObservable, getScrollHeight, getScrollLeft, getScrollTop, matches, matchesAncestors, Cause, isExternal, isHash, shouldLoadAnchor, isPushEvent, isHintEvent, isHashChange */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Cause", function() { return Cause; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isExternal", function() { return isExternal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isHash", function() { return isHash; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shouldLoadAnchor", function() { return shouldLoadAnchor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPushEvent", function() { return isPushEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isHintEvent", function() { return isHintEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isHashChange", function() { return isHashChange; });
/* harmony import */ var _hydecorp_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @hydecorp/component */ "./node_modules/@hydecorp/component/lib/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "applyMixins", function() { return _hydecorp_component__WEBPACK_IMPORTED_MODULE_0__["applyMixins"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "subscribeWhen", function() { return _hydecorp_component__WEBPACK_IMPORTED_MODULE_0__["subscribeWhen"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "unsubscribeWhen", function() { return _hydecorp_component__WEBPACK_IMPORTED_MODULE_0__["unsubscribeWhen"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "filterWhen", function() { return _hydecorp_component__WEBPACK_IMPORTED_MODULE_0__["filterWhen"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "bufferDebounceTime", function() { return _hydecorp_component__WEBPACK_IMPORTED_MODULE_0__["bufferDebounceTime"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fetchRx", function() { return _hydecorp_component__WEBPACK_IMPORTED_MODULE_0__["fetchRx"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fragmentFromString", function() { return _hydecorp_component__WEBPACK_IMPORTED_MODULE_0__["fragmentFromString"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createMutationObservable", function() { return _hydecorp_component__WEBPACK_IMPORTED_MODULE_0__["createMutationObservable"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getScrollHeight", function() { return _hydecorp_component__WEBPACK_IMPORTED_MODULE_0__["getScrollHeight"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getScrollLeft", function() { return _hydecorp_component__WEBPACK_IMPORTED_MODULE_0__["getScrollLeft"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getScrollTop", function() { return _hydecorp_component__WEBPACK_IMPORTED_MODULE_0__["getScrollTop"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "matches", function() { return _hydecorp_component__WEBPACK_IMPORTED_MODULE_0__["matches"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "matchesAncestors", function() { return _hydecorp_component__WEBPACK_IMPORTED_MODULE_0__["matchesAncestors"]; });


var Cause;

(function (Cause) {
  Cause["Init"] = "init";
  Cause["Hint"] = "hint";
  Cause["Push"] = "push";
  Cause["Pop"] = "pop";
})(Cause || (Cause = {}));

;
function isExternal(_ref) {
  var protocol = _ref.protocol,
      host = _ref.host;
  var location = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window.location;
  return protocol !== location.protocol || host !== location.host;
}
function isHash(_ref2) {
  var hash = _ref2.hash,
      origin = _ref2.origin,
      pathname = _ref2.pathname;
  var location = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window.location;
  return hash !== "" && origin === location.origin && pathname === location.pathname;
}
function shouldLoadAnchor(anchor) {
  return anchor && anchor.target === "";
}
function isPushEvent(_ref3, location) {
  var url = _ref3.url,
      anchor = _ref3.anchor,
      _ref3$event = _ref3.event,
      metaKey = _ref3$event.metaKey,
      ctrlKey = _ref3$event.ctrlKey;
  return !metaKey && !ctrlKey && shouldLoadAnchor(anchor) && !isExternal(url, location);
}
function isHintEvent(_ref4, location) {
  var url = _ref4.url,
      anchor = _ref4.anchor;
  return shouldLoadAnchor(anchor) && !isExternal(url, location) && !isHash(url, location);
}
function isHashChange(_ref5) {
  var cause = _ref5.cause,
      _ref5$url = _ref5.url,
      pathname = _ref5$url.pathname,
      hash = _ref5$url.hash,
      prevPathname = _ref5.oldURL.pathname;
  return pathname === prevPathname && (cause === Cause.Pop || cause === Cause.Push && hash !== '');
}

/***/ }),

/***/ "./node_modules/@hydecorp/push-state/lib/event-listeners.js":
/*!******************************************************************!*\
  !*** ./node_modules/@hydecorp/push-state/lib/event-listeners.js ***!
  \******************************************************************/
/*! exports provided: EventListenersMixin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventListenersMixin", function() { return EventListenersMixin; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/index.js");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common */ "./node_modules/@hydecorp/push-state/lib/common.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/dist/esm5/operators/index.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }





var flat = function flat(x) {
  return Array.prototype.concat.apply([], x);
};

var combineRecords = function combineRecords(records) {
  return {
    addedNodes: new Set(flat(records.map(function (r) {
      return Array.from(r.addedNodes);
    }))),
    removedNodes: new Set(flat(records.map(function (r) {
      return Array.from(r.removedNodes);
    })))
  };
};

var EventListenersMixin = /*#__PURE__*/function () {
  function EventListenersMixin() {
    _classCallCheck(this, EventListenersMixin);
  }

  _createClass(EventListenersMixin, [{
    key: "setupEventListeners",
    // LINKS 2
    value: function setupEventListeners() {
      var _this = this;

      var pushEvent$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["fromEvent"])(this.el, "click").pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (event) {
        var anchor = Object(_common__WEBPACK_IMPORTED_MODULE_1__["matchesAncestors"])(event.target, _this.linkSelector);

        if (anchor instanceof HTMLAnchorElement) {
          return [event, anchor];
        }
      }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["filter"])(function (x) {
        return !!x;
      }));

      var matchOrQuery = function matchOrQuery(el, selector) {
        if (el.matches(selector)) {
          return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])(el);
        } else {
          return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["from"])(el.querySelectorAll(selector));
        }
      };

      var addEventListeners = function addEventListeners(link) {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["merge"])(Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["fromEvent"])(link, "mouseenter", {
          passive: true
        }), Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["fromEvent"])(link, "touchstart", {
          passive: true
        }), Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["fromEvent"])(link, "focus", {
          passive: true
        })).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (event) {
          return [event, link];
        }));
      };

      var hintEvent$ = this.$.linkSelector.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["switchMap"])(function (linkSelector) {
        var links = new Map();

        var addLink = function addLink(link) {
          if (!links.has(link)) {
            links.set(link, addEventListeners(link));
          }
        };

        var removeLink = function removeLink(link) {
          links.delete(link);
        };

        return Object(_common__WEBPACK_IMPORTED_MODULE_1__["createMutationObservable"])(_this.el, {
          childList: true,
          subtree: true
        }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["startWith"])({
          addedNodes: [_this.el],
          removedNodes: []
        }), Object(_common__WEBPACK_IMPORTED_MODULE_1__["bufferDebounceTime"])(500), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(combineRecords), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["switchMap"])(function (_ref) {
          var addedNodes = _ref.addedNodes,
              removedNodes = _ref.removedNodes;
          Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["from"])(removedNodes).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["filter"])(function (el) {
            return el instanceof Element;
          }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["flatMap"])(function (el) {
            return matchOrQuery(el, linkSelector);
          }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])(removeLink)).subscribe();
          Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["from"])(addedNodes).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["filter"])(function (el) {
            return el instanceof Element;
          }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["flatMap"])(function (el) {
            return matchOrQuery(el, linkSelector);
          }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])(addLink)).subscribe();
          return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["from"])(links.values()).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["mergeAll"])());
        }), Object(_common__WEBPACK_IMPORTED_MODULE_1__["subscribeWhen"])(_this.$.prefetch));
      }));
      return {
        hintEvent$: hintEvent$,
        pushEvent$: pushEvent$
      };
    }
  }]);

  return EventListenersMixin;
}();

/***/ }),

/***/ "./node_modules/@hydecorp/push-state/lib/event.js":
/*!********************************************************!*\
  !*** ./node_modules/@hydecorp/push-state/lib/event.js ***!
  \********************************************************/
/*! exports provided: EventManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventManager", function() { return EventManager; });
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var timeout = function timeout(t) {
  return new Promise(function (r) {
    return setTimeout(r, t);
  });
};

var EventManager = /*#__PURE__*/function () {
  function EventManager(parent) {
    _classCallCheck(this, EventManager);

    this.parent = parent;
  }

  _createClass(EventManager, [{
    key: "onStart",
    value: function onStart(context) {
      var _this = this;

      this.parent.animPromise = timeout(this.parent.duration);

      var transitionUntil = function transitionUntil(promise) {
        _this.parent.animPromise = Promise.all([_this.parent.animPromise, promise]);
      };

      this.parent.fireEvent('start', {
        detail: _objectSpread(_objectSpread({}, context), {}, {
          transitionUntil: transitionUntil
        })
      });
    }
  }, {
    key: "emitDOMError",
    value: function emitDOMError(context) {
      var replaceElMissing = context.replaceElMissing,
          url = context.url;

      if (replaceElMissing) {
        if (true) {
          console.warn("Couldn't find one or more element in the document at '".concat(location, "'. Opening the link directly."));
        } // To open the link directly, we first pop one entry off the browser history.
        // We have to do this because (some) browsers won't handle the back button correctly otherwise.
        // We then wait for a short time and change the document's location.
        // TODO: If we didn't call `pushState` optimistically we wouldn't have to do this.


        window.history.back();
        setTimeout(function () {
          return document.location.assign(url);
        }, 100); // If it's a different error, throw the generic `error` event.
      } else {
        if (true) console.error(context);
        this.parent.fireEvent('error', {
          detail: context
        });
      }
    }
  }, {
    key: "emitNetworkError",
    value: function emitNetworkError(context) {
      if (true) console.error(context);
      this.parent.fireEvent('networkerror', {
        detail: context
      });
    }
  }, {
    key: "emitError",
    value: function emitError(context) {
      if (true) console.error(context);
      this.parent.fireEvent('error', {
        detail: context
      });
    }
  }, {
    key: "emitReady",
    value: function emitReady(context) {
      this.parent.fireEvent('ready', {
        detail: context
      });
    }
  }, {
    key: "emitAfter",
    value: function emitAfter(context) {
      var _this2 = this;

      this.parent.fadePromise = timeout(this.parent.duration);

      var transitionUntil = function transitionUntil(promise) {
        _this2.parent.fadePromise = Promise.all([_this2.parent.fadePromise, promise]);
      };

      this.parent.fireEvent('after', {
        detail: _objectSpread(_objectSpread({}, context), {}, {
          transitionUntil: transitionUntil
        })
      });
    }
  }, {
    key: "emitProgress",
    value: function emitProgress(context) {
      this.parent.fireEvent('progress', {
        detail: context
      });
    }
  }, {
    key: "emitLoad",
    value: function emitLoad(context) {
      this.parent.fireEvent('load', {
        detail: context
      });
    }
  }]);

  return EventManager;
}();
;

/***/ }),

/***/ "./node_modules/@hydecorp/push-state/lib/fetch.js":
/*!********************************************************!*\
  !*** ./node_modules/@hydecorp/push-state/lib/fetch.js ***!
  \********************************************************/
/*! exports provided: FetchManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FetchManager", function() { return FetchManager; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/dist/esm5/operators/index.js");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common */ "./node_modules/@hydecorp/push-state/lib/common.js");
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




;
var FetchManager = /*#__PURE__*/function () {
  function FetchManager(parent) {
    _classCallCheck(this, FetchManager);

    this.parent = parent;
  }

  _createClass(FetchManager, [{
    key: "fetchPage",
    value: function fetchPage(context) {
      return Object(_common__WEBPACK_IMPORTED_MODULE_2__["fetchRx"])(context.url.href, {
        method: "GET",
        mode: 'cors',
        headers: {
          Accept: "text/html"
        }
      }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])(function (response) {
        return response.text();
      }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (responseText) {
        return _objectSpread(_objectSpread({}, context), {}, {
          responseText: responseText
        });
      }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["catchError"])(function (error) {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])(_objectSpread(_objectSpread({}, context), {}, {
          error: error,
          responseText: null
        }));
      }));
    }
  }, {
    key: "selectPrefetch",
    value: function selectPrefetch(_ref, latestPrefetch, prefetch$) {
      var href = _ref.href;
      return href === latestPrefetch.url.href // && latestPrefetch.error == null
      ? Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])(latestPrefetch) : prefetch$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["take"])(1));
    } // Returns an observable that emits exactly one notice, which contains the response.
    // It will not emit until an (optional) page transition animation completes.

  }, {
    key: "getResponse",
    value: function getResponse(prefetch$, context, latestPrefetch) {
      return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["zip"])(this.selectPrefetch(context.url, latestPrefetch, prefetch$), this.parent.animPromise).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (_ref2) {
        var _ref3 = _slicedToArray(_ref2, 1),
            prefetch = _ref3[0];

        return _objectSpread(_objectSpread({}, prefetch), context);
      }));
    }
  }]);

  return FetchManager;
}();
;

/***/ }),

/***/ "./node_modules/@hydecorp/push-state/lib/history.js":
/*!**********************************************************!*\
  !*** ./node_modules/@hydecorp/push-state/lib/history.js ***!
  \**********************************************************/
/*! exports provided: HistoryManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HistoryManager", function() { return HistoryManager; });
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common */ "./node_modules/@hydecorp/push-state/lib/common.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

 // @ts-ignore

window.HashChangeEvent = window.HashChangeEvent || function HashChangeEvent(type) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$oldURL = _ref.oldURL,
      oldURL = _ref$oldURL === void 0 ? '' : _ref$oldURL,
      _ref$newURL = _ref.newURL,
      newURL = _ref$newURL === void 0 ? '' : _ref$newURL;

  var e = new CustomEvent(type); // @ts-ignore

  e.oldURL = oldURL; // @ts-ignore

  e.newURL = newURL;
  return e;
};

function simHashChange(newURL, oldURL) {
  if (newURL.hash !== oldURL.hash) {
    window.dispatchEvent(new HashChangeEvent('hashchange', {
      newURL: newURL.href,
      oldURL: oldURL.href
    }));
  }
}

var HistoryManager = /*#__PURE__*/function () {
  function HistoryManager(parent) {
    var _this = this;

    _classCallCheck(this, HistoryManager);

    this.updateHistoryScrollPosition = function () {
      if (Object(_common__WEBPACK_IMPORTED_MODULE_0__["isExternal"])(_this.parent)) return;

      var state = _this.assignScrollPosition(history.state || {});

      history.replaceState(state, document.title);
    };

    this.parent = parent;
  }

  _createClass(HistoryManager, [{
    key: "updateHistoryState",
    value: function updateHistoryState(_ref2) {
      var cause = _ref2.cause,
          replace = _ref2.replace,
          url = _ref2.url,
          oldURL = _ref2.oldURL;
      if (Object(_common__WEBPACK_IMPORTED_MODULE_0__["isExternal"])(this.parent)) return;

      switch (cause) {
        case _common__WEBPACK_IMPORTED_MODULE_0__["Cause"].Init:
        case _common__WEBPACK_IMPORTED_MODULE_0__["Cause"].Push:
          {
            var histId = this.parent.histId;

            if (replace || url.href === location.href) {
              var state = _objectSpread(_objectSpread({}, history.state), {}, _defineProperty({}, histId, {}));

              history.replaceState(state, document.title, url.href);
            } else {
              history.pushState(_defineProperty({}, histId, {}), document.title, url.href);
            } // no break

          }

        case _common__WEBPACK_IMPORTED_MODULE_0__["Cause"].Pop:
          {
            if (this.parent.simulateHashChange) simHashChange(url, oldURL);
            break;
          }

        default:
          {
            // if (process.env.DEBUG) console.warn(`Type '${cause}' not reconginzed`);
            break;
          }
      }
    }
  }, {
    key: "updateTitle",
    value: function updateTitle(_ref3) {
      var cause = _ref3.cause,
          title = _ref3.title;
      document.title = title;

      if (!Object(_common__WEBPACK_IMPORTED_MODULE_0__["isExternal"])(this.parent) && cause === _common__WEBPACK_IMPORTED_MODULE_0__["Cause"].Push) {
        history.replaceState(history.state, title);
      }
    }
  }, {
    key: "assignScrollPosition",
    value: function assignScrollPosition(state) {
      var histId = this.parent.histId;
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, histId, _objectSpread(_objectSpread({}, state[histId]), {}, {
        scrollTop: Object(_common__WEBPACK_IMPORTED_MODULE_0__["getScrollTop"])(),
        scrollHeight: Object(_common__WEBPACK_IMPORTED_MODULE_0__["getScrollHeight"])()
      })));
    }
  }]);

  return HistoryManager;
}();
;

/***/ }),

/***/ "./node_modules/@hydecorp/push-state/lib/index.js":
/*!********************************************************!*\
  !*** ./node_modules/@hydecorp/push-state/lib/index.js ***!
  \********************************************************/
/*! exports provided: HyPushState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HyPushState", function() { return HyPushState; });
/* harmony import */ var lit_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit-element */ "./node_modules/lit-element/lit-element.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/dist/esm5/operators/index.js");
/* harmony import */ var _hydecorp_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @hydecorp/component */ "./node_modules/@hydecorp/component/lib/index.js");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./common */ "./node_modules/@hydecorp/push-state/lib/common.js");
/* harmony import */ var _fetch__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./fetch */ "./node_modules/@hydecorp/push-state/lib/fetch.js");
/* harmony import */ var _update__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./update */ "./node_modules/@hydecorp/push-state/lib/update.js");
/* harmony import */ var _event_listeners__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./event-listeners */ "./node_modules/@hydecorp/push-state/lib/event-listeners.js");
/* harmony import */ var _event__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./event */ "./node_modules/@hydecorp/push-state/lib/event.js");
/* harmony import */ var _history__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./history */ "./node_modules/@hydecorp/push-state/lib/history.js");
/* harmony import */ var _scroll__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./scroll */ "./node_modules/@hydecorp/push-state/lib/scroll.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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














var HyPushState =
/** @class */
function () {
  var HyPushState = /*#__PURE__*/function (_applyMixins) {
    _inherits(HyPushState, _applyMixins);

    var _super = _createSuper(HyPushState);

    function HyPushState() {
      var _this;

      _classCallCheck(this, HyPushState);

      _this = _super.apply(this, arguments);
      _this.el = _assertThisInitialized(_this);
      _this.linkSelector = "a[href]:not([data-no-push])";
      _this.prefetch = false;
      _this.duration = 0; // @property({ type: Boolean, reflect: true, attribute: 'simulate-load' }) simulateLoad: boolean = false;

      _this.simulateHashChange = false;
      _this.baseURL = window.location.href;
      _this._initialized = Object(_hydecorp_component__WEBPACK_IMPORTED_MODULE_3__["createResolvablePromise"])();
      _this.$ = {};
      _this.fadePromise = Promise.resolve(null);
      _this.scrollManager = new _scroll__WEBPACK_IMPORTED_MODULE_10__["ScrollManager"](_assertThisInitialized(_this));
      _this.historyManager = new _history__WEBPACK_IMPORTED_MODULE_9__["HistoryManager"](_assertThisInitialized(_this));
      _this.fetchManager = new _fetch__WEBPACK_IMPORTED_MODULE_5__["FetchManager"](_assertThisInitialized(_this));
      _this.updateManager = new _update__WEBPACK_IMPORTED_MODULE_6__["UpdateManager"](_assertThisInitialized(_this));
      _this.eventManager = new _event__WEBPACK_IMPORTED_MODULE_8__["EventManager"](_assertThisInitialized(_this));
      _this._url = new URL(_this.baseURL);
      _this.reload$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"](); // Methods

      _this.cacheNr = 0;

      _this.upgrade = function () {
        var _this$setupEventListe = _this.setupEventListeners(),
            pushEvent$ = _this$setupEventListe.pushEvent$,
            hintEvent$ = _this$setupEventListe.hintEvent$;

        var deferred = {};
        var push$ = pushEvent$.pipe( // takeUntil(this.subjects.disconnect),
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              event = _ref2[0],
              anchor = _ref2[1];

          return {
            cause: _common__WEBPACK_IMPORTED_MODULE_4__["Cause"].Push,
            url: new URL(anchor.href, _this.href),
            anchor: anchor,
            event: event,
            cacheNr: _this.cacheNr
          };
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["filter"])(function (x) {
          return Object(_common__WEBPACK_IMPORTED_MODULE_4__["isPushEvent"])(x, _assertThisInitialized(_this));
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])(function (_ref3) {
          var event = _ref3.event;
          event.preventDefault();

          _this.historyManager.updateHistoryScrollPosition();
        }));
        var pop$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["fromEvent"])(window, "popstate").pipe( // takeUntil(this.subjects.disconnect),
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["filter"])(function () {
          return window.history.state && window.history.state[_this.histId];
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (event) {
          return {
            cause: _common__WEBPACK_IMPORTED_MODULE_4__["Cause"].Pop,
            url: new URL(window.location.href),
            cacheNr: _this.cacheNr,
            event: event
          };
        }));
        var reload$ = _this.reload$; // .pipe(takeUntil(this.subjects.disconnect));

        var merged$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["merge"])(push$, pop$, reload$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["startWith"])({
          url: new URL(window.location.href)
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["pairwise"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (_ref4) {
          var _ref5 = _slicedToArray(_ref4, 2),
              old = _ref5[0],
              current = _ref5[1];

          return Object.assign(current, {
            oldURL: old.url
          });
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["share"])());
        var page$ = merged$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["filter"])(function (p) {
          return !Object(_common__WEBPACK_IMPORTED_MODULE_4__["isHashChange"])(p);
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["share"])());
        var hash$ = merged$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["filter"])(function (p) {
          return Object(_common__WEBPACK_IMPORTED_MODULE_4__["isHashChange"])(p);
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["filter"])(function () {
          return history.state && history.state[_this.histId];
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["observeOn"])(rxjs__WEBPACK_IMPORTED_MODULE_1__["animationFrameScheduler"]), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])(function (context) {
          _this.historyManager.updateHistoryState(context);

          _this.scrollManager.manageScrollPosition(context);
        }));
        var pauser$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["defer"])(function () {
          return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["merge"])(page$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["mapTo"])(true)), deferred.response$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["mapTo"])(false)));
        }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["startWith"])(false));
        var hint$ = hintEvent$.pipe( // takeUntil(this.subjects.disconnect),
        Object(_common__WEBPACK_IMPORTED_MODULE_4__["filterWhen"])(pauser$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (x) {
          return !x;
        }))), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (_ref6) {
          var _ref7 = _slicedToArray(_ref6, 2),
              event = _ref7[0],
              anchor = _ref7[1];

          return {
            cause: _common__WEBPACK_IMPORTED_MODULE_4__["Cause"].Hint,
            url: new URL(anchor.href, _this.href),
            anchor: anchor,
            event: event,
            cacheNr: _this.cacheNr
          };
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["filter"])(function (x) {
          return Object(_common__WEBPACK_IMPORTED_MODULE_4__["isHintEvent"])(x, _assertThisInitialized(_this));
        }));
        var prefetchResponse$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["merge"])(hint$, page$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["distinctUntilChanged"])(function (x, y) {
          return _this.compareContext(x, y);
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["switchMap"])(function (x) {
          return _this.fetchManager.fetchPage(x);
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["startWith"])({
          url: {}
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["share"])());
        var response$ = deferred.response$ = page$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])(function (context) {
          _this.eventManager.onStart(context);

          _this.historyManager.updateHistoryState(context);

          _this._url = context.url;
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["withLatestFrom"])(prefetchResponse$), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["switchMap"])(function (args) {
          var _this$fetchManager;

          return (_this$fetchManager = _this.fetchManager).getResponse.apply(_this$fetchManager, [prefetchResponse$].concat(_toConsumableArray(args)));
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["share"])());
        var responseOk$ = response$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["filter"])(function (_ref8) {
          var error = _ref8.error;
          return !error;
        }));
        var responseError$ = response$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["filter"])(function (_ref9) {
          var error = _ref9.error;
          return !!error;
        }));
        var main$ = responseOk$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (context) {
          return _this.updateManager.responseToContent(context);
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])(function (context) {
          return _this.eventManager.emitReady(context);
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["observeOn"])(rxjs__WEBPACK_IMPORTED_MODULE_1__["animationFrameScheduler"]), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])(function (context) {
          _this.updateManager.updateDOM(context);

          _this.historyManager.updateTitle(context);

          _this.eventManager.emitAfter(context);
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["startWith"])({
          cause: _common__WEBPACK_IMPORTED_MODULE_4__["Cause"].Init,
          url: _this._url,
          scripts: []
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["observeOn"])(rxjs__WEBPACK_IMPORTED_MODULE_1__["animationFrameScheduler"]), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])(function (context) {
          return _this.scrollManager.manageScrollPosition(context);
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])({
          error: function error(e) {
            return _this.eventManager.emitDOMError(e);
          }
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(function (_, c) {
          return c;
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["switchMap"])(function (x) {
          return _this.updateManager.reinsertScriptTags(x);
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])({
          error: function error(e) {
            return _this.eventManager.emitError(e);
          }
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(function (_, c) {
          return c;
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["switchMap"])(function () {
          return _this.fadePromise;
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])(function (context) {
          return _this.eventManager.emitLoad(context);
        }));
        var error$ = responseError$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])(function (e) {
          return _this.eventManager.emitNetworkError(e);
        }));
        var progress$ = page$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["switchMap"])(function (context) {
          return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["defer"])(function () {
            return _this.animPromise;
          }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["takeUntil"])(response$), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["mapTo"])(context));
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])(function (context) {
          return _this.eventManager.emitProgress(context);
        })); // Subscriptions

        main$.subscribe();
        hash$.subscribe();
        error$.subscribe();
        progress$.subscribe();

        _this._initialized.resolve(_assertThisInitialized(_this));

        _this.fireEvent('init');
      };

      return _this;
    }

    _createClass(HyPushState, [{
      key: "createRenderRoot",
      value: function createRenderRoot() {
        return this;
      }
    }, {
      key: "_setLocation",
      value: function _setLocation(key, value) {
        var u = new URL(this._url.href);
        u[key] = value;
        this.assign(u.href);
      } // Implement Location

    }, {
      key: "assign",
      value: function assign(url) {
        this.reload$.next({
          cause: _common__WEBPACK_IMPORTED_MODULE_4__["Cause"].Push,
          url: new URL(url, this.href),
          cacheNr: ++this.cacheNr
        });
      }
    }, {
      key: "reload",
      value: function reload() {
        this.reload$.next({
          cause: _common__WEBPACK_IMPORTED_MODULE_4__["Cause"].Push,
          url: new URL(this.href),
          cacheNr: ++this.cacheNr,
          replace: true
        });
      }
    }, {
      key: "replace",
      value: function replace(url) {
        this.reload$.next({
          cause: _common__WEBPACK_IMPORTED_MODULE_4__["Cause"].Push,
          url: new URL(url, this.href),
          cacheNr: ++this.cacheNr,
          replace: true
        });
      }
    }, {
      key: "compareContext",
      value: function compareContext(p, q) {
        return p.url.href === q.url.href && p.error === q.error && p.cacheNr === q.cacheNr;
      }
    }, {
      key: "connectedCallback",
      value: function connectedCallback() {
        _get(_getPrototypeOf(HyPushState.prototype), "connectedCallback", this).call(this);

        this.$.linkSelector = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"](this.linkSelector);
        this.$.prefetch = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"](this.prefetch); // Remember the current scroll position (for F5/reloads).

        window.addEventListener("beforeunload", this.historyManager.updateHistoryScrollPosition);
        this.updateComplete.then(this.upgrade);
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        window.removeEventListener("beforeunload", this.historyManager.updateHistoryScrollPosition);
      }
    }, {
      key: "initialized",
      get: function get() {
        return this._initialized;
      }
    }, {
      key: "hash",
      get: function get() {
        return this._url.hash;
      },
      set: function set(value) {
        this._setLocation('hash', value);
      }
    }, {
      key: "host",
      get: function get() {
        return this._url.host;
      },
      set: function set(value) {
        this._setLocation('host', value);
      }
    }, {
      key: "hostname",
      get: function get() {
        return this._url.hostname;
      },
      set: function set(value) {
        this._setLocation('hostname', value);
      }
    }, {
      key: "href",
      get: function get() {
        return this._url.href;
      },
      set: function set(value) {
        this._setLocation('href', value);
      }
    }, {
      key: "pathname",
      get: function get() {
        return this._url.pathname;
      },
      set: function set(value) {
        this._setLocation('pathname', value);
      }
    }, {
      key: "port",
      get: function get() {
        return this._url.port;
      },
      set: function set(value) {
        this._setLocation('port', value);
      }
    }, {
      key: "protocol",
      get: function get() {
        return this._url.protocol;
      },
      set: function set(value) {
        this._setLocation('protocol', value);
      }
    }, {
      key: "search",
      get: function get() {
        return this._url.search;
      },
      set: function set(value) {
        this._setLocation('search', value);
      } // Silent read-only

    }, {
      key: "origin",
      get: function get() {
        return this._url.origin;
      },
      set: function set(_) {}
    }, {
      key: "ancestorOrigins",
      get: function get() {
        return window.location.ancestorOrigins;
      },
      set: function set(_) {}
    }, {
      key: "histId",
      get: function get() {
        return this.id || this.tagName;
      }
    }]);

    return HyPushState;
  }(Object(_common__WEBPACK_IMPORTED_MODULE_4__["applyMixins"])(_hydecorp_component__WEBPACK_IMPORTED_MODULE_3__["RxLitElement"], [_event_listeners__WEBPACK_IMPORTED_MODULE_7__["EventListenersMixin"]]));

  __decorate([Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["property"])({
    type: String,
    reflect: true,
    attribute: 'replace-selector'
  })], HyPushState.prototype, "replaceSelector", void 0);

  __decorate([Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["property"])({
    type: String,
    reflect: true,
    attribute: 'link-selector'
  })], HyPushState.prototype, "linkSelector", void 0);

  __decorate([Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["property"])({
    type: String,
    reflect: true,
    attribute: 'script-selector'
  })], HyPushState.prototype, "scriptSelector", void 0);

  __decorate([Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["property"])({
    type: Boolean,
    reflect: true,
    attribute: 'prefetch'
  })], HyPushState.prototype, "prefetch", void 0);

  __decorate([Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["property"])({
    type: Number,
    reflect: true,
    attribute: 'duration'
  })], HyPushState.prototype, "duration", void 0);

  __decorate([Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["property"])({
    type: Boolean,
    reflect: true,
    attribute: 'hashchange'
  })], HyPushState.prototype, "simulateHashChange", void 0);

  __decorate([Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["property"])({
    type: String
  })], HyPushState.prototype, "baseURL", void 0);

  __decorate([Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["property"])()], HyPushState.prototype, "assign", null);

  __decorate([Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["property"])()], HyPushState.prototype, "reload", null);

  __decorate([Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["property"])()], HyPushState.prototype, "replace", null);

  HyPushState = __decorate([Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["customElement"])('hy-push-state')], HyPushState);
  return HyPushState;
}();



/***/ }),

/***/ "./node_modules/@hydecorp/push-state/lib/rewrite-urls.js":
/*!***************************************************************!*\
  !*** ./node_modules/@hydecorp/push-state/lib/rewrite-urls.js ***!
  \***************************************************************/
/*! exports provided: rewriteURLs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rewriteURLs", function() { return rewriteURLs; });
// When fetching documents from an external source,
// relative URLs will be resolved relative to the current `window.location`.
// We can rewrite URL to absolute urls
function rewriteURLs(replaceEls, base) {
  replaceEls.forEach(function (el) {
    el.querySelectorAll("[href]").forEach(rewriteURL("href", base));
    el.querySelectorAll("[src]").forEach(rewriteURL("src", base));
    el.querySelectorAll("img[srcset]").forEach(rewriteURLSrcSet("srcset", base));
    el.querySelectorAll("blockquote[cite]").forEach(rewriteURL("cite", base));
    el.querySelectorAll("del[cite]").forEach(rewriteURL("cite", base));
    el.querySelectorAll("ins[cite]").forEach(rewriteURL("cite", base));
    el.querySelectorAll("q[cite]").forEach(rewriteURL("cite", base));
    el.querySelectorAll("img[longdesc]").forEach(rewriteURL("longdesc", base));
    el.querySelectorAll("frame[longdesc]").forEach(rewriteURL("longdesc", base));
    el.querySelectorAll("iframe[longdesc]").forEach(rewriteURL("longdesc", base));
    el.querySelectorAll("img[usemap]").forEach(rewriteURL("usemap", base));
    el.querySelectorAll("input[usemap]").forEach(rewriteURL("usemap", base));
    el.querySelectorAll("object[usemap]").forEach(rewriteURL("usemap", base));
    el.querySelectorAll("form[action]").forEach(rewriteURL("action", base));
    el.querySelectorAll("button[formaction]").forEach(rewriteURL("formaction", base));
    el.querySelectorAll("input[formaction]").forEach(rewriteURL("formaction", base));
    el.querySelectorAll("video[poster]").forEach(rewriteURL("poster", base));
    el.querySelectorAll("object[data]").forEach(rewriteURL("data", base));
    el.querySelectorAll("object[codebase]").forEach(rewriteURL("codebase", base));
    el.querySelectorAll("object[archive]").forEach(rewriteURLList("archive", base));
    /* el.querySelectorAll("command[icon]").forEach(this.rewriteURL("icon")); */
    // obsolte
  });
}

function rewriteURL(attr, base) {
  return function (el) {
    try {
      el.setAttribute(attr, new URL(el.getAttribute(attr), base).href);
    } catch (e) {// if (process.env.DEBUG) console.warn(`Couldn't rewrite URL in attribute ${attr} on element`, el);
    }
  };
}

function rewriteURLSrcSet(attr, base) {
  return function (el) {
    try {
      el.setAttribute(attr, el.getAttribute(attr).split(/\s*,\s*/).map(function (str) {
        var pair = str.split(/\s+/);
        pair[0] = new URL(pair[0], base).href;
        return pair.join(" ");
      }).join(", "));
    } catch (e) {// if (process.env.DEBUG) console.warn(`Couldn't rewrite URLs in attribute ${attr} on element`, el);
    }
  };
}

function rewriteURLList(attr, base) {
  return function (el) {
    try {
      el.setAttribute(attr, el.getAttribute(attr).split(/[\s,]+/).map(function (str) {
        return new URL(str, base).href;
      }).join(", "));
    } catch (e) {// if (process.env.DEBUG) console.warn(`Couldn't rewrite URLs in attribute ${attr} on element`, el);
    }
  };
}

/***/ }),

/***/ "./node_modules/@hydecorp/push-state/lib/script.js":
/*!*********************************************************!*\
  !*** ./node_modules/@hydecorp/push-state/lib/script.js ***!
  \*********************************************************/
/*! exports provided: ScriptManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScriptManager", function() { return ScriptManager; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/dist/esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/dist/esm5/operators/index.js");
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




function cloneScript(script) {
  var newScript = document.createElement('script');
  Array.from(script.attributes).forEach(function (attr) {
    return newScript.setAttributeNode(attr.cloneNode());
  });
  newScript.innerHTML = script.innerHTML;
  return newScript;
}

var ScriptManager = /*#__PURE__*/function () {
  function ScriptManager(parent) {
    _classCallCheck(this, ScriptManager);

    this.parent = parent;
  }

  _createClass(ScriptManager, [{
    key: "removeScriptTags",
    value: function removeScriptTags(replaceEls) {
      var _this = this;

      var scripts = [];
      replaceEls.forEach(function (el) {
        return el.querySelectorAll(_this.scriptSelector).forEach(function (script) {
          var newScript = cloneScript(script);
          var pair = [newScript, script];
          scripts.push(pair);
        });
      });
      return scripts;
    }
  }, {
    key: "reinsertScriptTags",
    value: function reinsertScriptTags(context) {
      var _this2 = this;

      if (!this.scriptSelector) return Promise.resolve(context);
      var scripts = context.scripts;
      var originalWrite = document.write;
      return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["from"])(scripts).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["concatMap"])(function (script) {
        return _this2.insertScript(script);
      }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["catchError"])(function (error) {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])(_objectSpread(_objectSpread({}, context), {}, {
          error: error
        }));
      }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["finalize"])(function () {
        return document.write = originalWrite;
      }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["mapTo"])(context)).toPromise();
    }
  }, {
    key: "insertScript",
    value: function insertScript(_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          script = _ref2[0],
          ref = _ref2[1];

      document.write = function () {
        var temp = document.createElement("div");

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        temp.innerHTML = args.join();
        Array.from(temp.childNodes).forEach(function (node) {
          return ref.parentNode.insertBefore(node, ref);
        });
      };

      return new Promise(function (resolve, reject) {
        if (script.src !== "") {
          script.addEventListener("load", resolve);
          script.addEventListener("error", reject);
          ref.parentNode.replaceChild(script, ref);
        } else {
          ref.parentNode.replaceChild(script, ref);
          resolve({});
        }
      });
    }
  }, {
    key: "scriptSelector",
    get: function get() {
      return this.parent.scriptSelector;
    }
  }]);

  return ScriptManager;
}();

/***/ }),

/***/ "./node_modules/@hydecorp/push-state/lib/scroll.js":
/*!*********************************************************!*\
  !*** ./node_modules/@hydecorp/push-state/lib/scroll.js ***!
  \*********************************************************/
/*! exports provided: ScrollManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScrollManager", function() { return ScrollManager; });
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common */ "./node_modules/@hydecorp/push-state/lib/common.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var ScrollManager = /*#__PURE__*/function () {
  function ScrollManager(parent) {
    _classCallCheck(this, ScrollManager);

    this.parent = parent;

    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }

  _createClass(ScrollManager, [{
    key: "manageScrollPosition",
    value: function manageScrollPosition(_ref) {
      var cause = _ref.cause,
          hash = _ref.url.hash;

      switch (cause) {
        case _common__WEBPACK_IMPORTED_MODULE_0__["Cause"].Push:
          {
            // FIXME: make configurable
            this.scrollHashIntoView(hash, {
              behavior: "smooth",
              block: "start",
              inline: "nearest"
            });
            break;
          }

        case _common__WEBPACK_IMPORTED_MODULE_0__["Cause"].Pop:
          {
            this.restoreScrollPosition();
            break;
          }

        case _common__WEBPACK_IMPORTED_MODULE_0__["Cause"].Init:
          {
            this.restoreScrollPositionOnReload();
            break;
          }
      }
    }
  }, {
    key: "elementFromHash",
    value: function elementFromHash(hash) {
      return document.getElementById(decodeURIComponent(hash.substr(1)));
    }
  }, {
    key: "scrollHashIntoView",
    value: function scrollHashIntoView(hash, options) {
      if (hash) {
        var el = this.elementFromHash(hash);
        if (el) el.scrollIntoView(options);
      } else {
        window.scroll(window.pageXOffset, 0);
      }
    }
  }, {
    key: "restoreScrollPosition",
    value: function restoreScrollPosition() {
      var histId = this.parent.histId;

      var _ref2 = history.state && history.state[histId] || {},
          scrollTop = _ref2.scrollTop;

      if (scrollTop != null) {
        window.scroll(window.pageXOffset, scrollTop);
      }
    }
  }, {
    key: "restoreScrollPositionOnReload",
    value: function restoreScrollPositionOnReload() {
      var _this = this;

      var histId = this.parent.histId;
      var scrollState = history.state && history.state[histId]; // FIXME: As far as I can tell there is no better way of figuring out if the user has scrolled
      //        and it doesn't work on hash links b/c the scroll position is going to be non-null by definition

      if (scrollState && Object(_common__WEBPACK_IMPORTED_MODULE_0__["getScrollTop"])() === 0) {
        this.restoreScrollPosition();
      } else if (location.hash) {
        requestAnimationFrame(function () {
          return _this.scrollHashIntoView(location.hash, true);
        });
      }
    }
  }]);

  return ScrollManager;
}();
;

/***/ }),

/***/ "./node_modules/@hydecorp/push-state/lib/update.js":
/*!*********************************************************!*\
  !*** ./node_modules/@hydecorp/push-state/lib/update.js ***!
  \*********************************************************/
/*! exports provided: UpdateManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UpdateManager", function() { return UpdateManager; });
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common */ "./node_modules/@hydecorp/push-state/lib/common.js");
/* harmony import */ var _script__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./script */ "./node_modules/@hydecorp/push-state/lib/script.js");
/* harmony import */ var _rewrite_urls__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./rewrite-urls */ "./node_modules/@hydecorp/push-state/lib/rewrite-urls.js");
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




var CANONICAL_SEL = 'link[rel=canonical]';
var META_DESC_SEL = 'meta[name=description]';
;
var UpdateManager = /*#__PURE__*/function () {
  function UpdateManager(parent) {
    _classCallCheck(this, UpdateManager);

    this.parent = parent;
    this.scriptManager = new _script__WEBPACK_IMPORTED_MODULE_1__["ScriptManager"](parent);
  }

  _createClass(UpdateManager, [{
    key: "getReplaceElements",
    // Extracts the elements to be replaced
    value: function getReplaceElements(doc) {
      if (this.replaceSelector) {
        return this.replaceSelector.split(',').map(function (sel) {
          return doc.querySelector(sel);
        });
      } else if (this.el.id) {
        return [doc.getElementById(this.el.id)];
      } else {
        var index = Array.from(document.getElementsByTagName(this.el.tagName)).indexOf(this.el);
        return [doc.getElementsByTagName(this.el.tagName)[index]];
      }
    } // Takes the response string and turns it into document fragments
    // that can be inserted into the DOM.

  }, {
    key: "responseToContent",
    value: function responseToContent(context) {
      try {
        var responseText = context.responseText;
        var doc = new DOMParser().parseFromString(responseText, 'text/html');
        var _doc$title = doc.title,
            title = _doc$title === void 0 ? '' : _doc$title;
        var replaceEls = this.getReplaceElements(doc); // if (replaceEls.some(x => x == null)) {
        //   throw { ...context, replaceElMissing: true };
        // }

        var scripts = this.scriptSelector ? this.scriptManager.removeScriptTags(replaceEls) : [];
        return _objectSpread(_objectSpread({}, context), {}, {
          document: doc,
          title: title,
          replaceEls: replaceEls,
          scripts: scripts
        });
      } catch (e) {
        console.error(e);
      }
    } // Replaces the old elments with the new one, one-by-one.

  }, {
    key: "replaceContentWithSelector",
    value: function replaceContentWithSelector(elements) {
      this.replaceSelector.split(',').map(function (sel) {
        return document.querySelector(sel);
      }).forEach(function (oldElement, i) {
        return oldElement.parentNode.replaceChild(elements[i], oldElement);
      });
    } // When no `relaceIds` are set, replace the entire content of the component (slow).

  }, {
    key: "replaceContentWholesale",
    value: function replaceContentWholesale(_ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          el = _ref2[0];

      this.el.innerHTML = el.innerHTML;
    }
  }, {
    key: "replaceContent",
    value: function replaceContent(replaceEls) {
      if (this.replaceSelector) {
        this.replaceContentWithSelector(replaceEls);
      } else {
        this.replaceContentWholesale(replaceEls);
      }
    }
  }, {
    key: "replaceHead",
    value: function replaceHead(doc) {
      var head = this.el.ownerDocument.head;
      var canonicalEl = head.querySelector(CANONICAL_SEL);
      var cEl = doc.head.querySelector(CANONICAL_SEL);
      if (canonicalEl && cEl) canonicalEl.href = cEl.href;
      var metaDescEl = head.querySelector(META_DESC_SEL);
      var mEl = doc.head.querySelector(META_DESC_SEL);
      if (metaDescEl && mEl) metaDescEl.content = mEl.content;
    }
  }, {
    key: "updateDOM",
    value: function updateDOM(context) {
      try {
        var replaceEls = context.replaceEls,
            _document = context.document;
        if (Object(_common__WEBPACK_IMPORTED_MODULE_0__["isExternal"])(this.parent)) Object(_rewrite_urls__WEBPACK_IMPORTED_MODULE_2__["rewriteURLs"])(replaceEls, this.parent.href);
        this.replaceContent(replaceEls);
        this.replaceHead(_document);
      } catch (error) {
        throw _objectSpread(_objectSpread({}, context), {}, {
          error: error
        });
      }
    }
  }, {
    key: "reinsertScriptTags",
    value: function reinsertScriptTags(context) {
      return this.scriptManager.reinsertScriptTags(context);
    }
  }, {
    key: "el",
    get: function get() {
      return this.parent.el;
    }
  }, {
    key: "replaceSelector",
    get: function get() {
      return this.parent.replaceSelector;
    }
  }, {
    key: "scriptSelector",
    get: function get() {
      return this.parent.scriptSelector;
    }
  }]);

  return UpdateManager;
}();

/***/ })

}]);
//# sourceMappingURL=LEGACY-vendors~push-state-hydejack-9.0.0-rc.js.map