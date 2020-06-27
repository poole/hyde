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
  var {
    protocol,
    host
  } = _ref;
  var location = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window.location;
  return protocol !== location.protocol || host !== location.host;
}
function isHash(_ref2) {
  var {
    hash,
    origin,
    pathname
  } = _ref2;
  var location = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window.location;
  return hash !== "" && origin === location.origin && pathname === location.pathname;
}
function shouldLoadAnchor(anchor) {
  return anchor && anchor.target === "";
}
function isPushEvent(_ref3, location) {
  var {
    url,
    anchor,
    event: {
      metaKey,
      ctrlKey
    }
  } = _ref3;
  return !metaKey && !ctrlKey && shouldLoadAnchor(anchor) && !isExternal(url, location);
}
function isHintEvent(_ref4, location) {
  var {
    url,
    anchor
  } = _ref4;
  return shouldLoadAnchor(anchor) && !isExternal(url, location) && !isHash(url, location);
}
function isHashChange(_ref5) {
  var {
    cause,
    url: {
      pathname,
      hash
    },
    oldURL: {
      pathname: prevPathname
    }
  } = _ref5;
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




var flat = x => Array.prototype.concat.apply([], x);

var combineRecords = records => ({
  addedNodes: new Set(flat(records.map(r => Array.from(r.addedNodes)))),
  removedNodes: new Set(flat(records.map(r => Array.from(r.removedNodes))))
});

class EventListenersMixin {
  // LINKS 2
  setupEventListeners() {
    var pushEvent$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["fromEvent"])(this.el, "click").pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(event => {
      var anchor = Object(_common__WEBPACK_IMPORTED_MODULE_1__["matchesAncestors"])(event.target, this.linkSelector);

      if (anchor instanceof HTMLAnchorElement) {
        return [event, anchor];
      }
    }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["filter"])(x => !!x));

    var matchOrQuery = (el, selector) => {
      if (el.matches(selector)) {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])(el);
      } else {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["from"])(el.querySelectorAll(selector));
      }
    };

    var addEventListeners = link => {
      return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["merge"])(Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["fromEvent"])(link, "mouseenter", {
        passive: true
      }), Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["fromEvent"])(link, "touchstart", {
        passive: true
      }), Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["fromEvent"])(link, "focus", {
        passive: true
      })).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(event => [event, link]));
    };

    var hintEvent$ = this.$.linkSelector.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["switchMap"])(linkSelector => {
      var links = new Map();

      var addLink = link => {
        if (!links.has(link)) {
          links.set(link, addEventListeners(link));
        }
      };

      var removeLink = link => {
        links.delete(link);
      };

      return Object(_common__WEBPACK_IMPORTED_MODULE_1__["createMutationObservable"])(this.el, {
        childList: true,
        subtree: true
      }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["startWith"])({
        addedNodes: [this.el],
        removedNodes: []
      }), Object(_common__WEBPACK_IMPORTED_MODULE_1__["bufferDebounceTime"])(500), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(combineRecords), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["switchMap"])((_ref) => {
        var {
          addedNodes,
          removedNodes
        } = _ref;
        Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["from"])(removedNodes).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["filter"])(el => el instanceof Element), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["flatMap"])(el => matchOrQuery(el, linkSelector)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])(removeLink)).subscribe();
        Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["from"])(addedNodes).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["filter"])(el => el instanceof Element), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["flatMap"])(el => matchOrQuery(el, linkSelector)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])(addLink)).subscribe();
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["from"])(links.values()).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["mergeAll"])());
      }), Object(_common__WEBPACK_IMPORTED_MODULE_1__["subscribeWhen"])(this.$.prefetch));
    }));
    return {
      hintEvent$,
      pushEvent$
    };
  }

}

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

var timeout = t => new Promise(r => setTimeout(r, t));

class EventManager {
  constructor(parent) {
    this.parent = parent;
  }

  onStart(context) {
    this.parent.animPromise = timeout(this.parent.duration);

    var transitionUntil = promise => {
      this.parent.animPromise = Promise.all([this.parent.animPromise, promise]);
    };

    this.parent.fireEvent('start', {
      detail: _objectSpread(_objectSpread({}, context), {}, {
        transitionUntil
      })
    });
  }

  emitDOMError(context) {
    var {
      replaceElMissing,
      url
    } = context;

    if (replaceElMissing) {
      if (true) {
        console.warn("Couldn't find one or more element in the document at '".concat(location, "'. Opening the link directly."));
      } // To open the link directly, we first pop one entry off the browser history.
      // We have to do this because (some) browsers won't handle the back button correctly otherwise.
      // We then wait for a short time and change the document's location.
      // TODO: If we didn't call `pushState` optimistically we wouldn't have to do this.


      window.history.back();
      setTimeout(() => document.location.assign(url), 100); // If it's a different error, throw the generic `error` event.
    } else {
      if (true) console.error(context);
      this.parent.fireEvent('error', {
        detail: context
      });
    }
  }

  emitNetworkError(context) {
    if (true) console.error(context);
    this.parent.fireEvent('networkerror', {
      detail: context
    });
  }

  emitError(context) {
    if (true) console.error(context);
    this.parent.fireEvent('error', {
      detail: context
    });
  }

  emitReady(context) {
    this.parent.fireEvent('ready', {
      detail: context
    });
  }

  emitAfter(context) {
    this.parent.fadePromise = timeout(this.parent.duration);

    var transitionUntil = promise => {
      this.parent.fadePromise = Promise.all([this.parent.fadePromise, promise]);
    };

    this.parent.fireEvent('after', {
      detail: _objectSpread(_objectSpread({}, context), {}, {
        transitionUntil
      })
    });
  }

  emitProgress(context) {
    this.parent.fireEvent('progress', {
      detail: context
    });
  }

  emitLoad(context) {
    this.parent.fireEvent('load', {
      detail: context
    });
  }

}
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
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




;
class FetchManager {
  constructor(parent) {
    this.parent = parent;
  }

  fetchPage(context) {
    return Object(_common__WEBPACK_IMPORTED_MODULE_2__["fetchRx"])(context.url.href, {
      method: "GET",
      mode: 'cors',
      headers: {
        Accept: "text/html"
      }
    }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])(response => response.text()), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(responseText => _objectSpread(_objectSpread({}, context), {}, {
      responseText
    })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["catchError"])(error => Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])(_objectSpread(_objectSpread({}, context), {}, {
      error,
      responseText: null
    }))));
  }

  selectPrefetch(_ref, latestPrefetch, prefetch$) {
    var {
      href
    } = _ref;
    return href === latestPrefetch.url.href // && latestPrefetch.error == null
    ? Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])(latestPrefetch) : prefetch$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["take"])(1));
  } // Returns an observable that emits exactly one notice, which contains the response.
  // It will not emit until an (optional) page transition animation completes.


  getResponse(prefetch$, context, latestPrefetch) {
    return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["zip"])(this.selectPrefetch(context.url, latestPrefetch, prefetch$), this.parent.animPromise).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])((_ref2) => {
      var [prefetch] = _ref2;
      return _objectSpread(_objectSpread({}, prefetch), context);
    }));
  }

}
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

 // @ts-ignore

window.HashChangeEvent = window.HashChangeEvent || function HashChangeEvent(type) {
  var {
    oldURL = '',
    newURL = ''
  } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
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

class HistoryManager {
  constructor(parent) {
    this.updateHistoryScrollPosition = () => {
      if (Object(_common__WEBPACK_IMPORTED_MODULE_0__["isExternal"])(this.parent)) return;
      var state = this.assignScrollPosition(history.state || {});
      history.replaceState(state, document.title);
    };

    this.parent = parent;
  }

  updateHistoryState(_ref) {
    var {
      cause,
      replace,
      url,
      oldURL
    } = _ref;
    if (Object(_common__WEBPACK_IMPORTED_MODULE_0__["isExternal"])(this.parent)) return;

    switch (cause) {
      case _common__WEBPACK_IMPORTED_MODULE_0__["Cause"].Init:
      case _common__WEBPACK_IMPORTED_MODULE_0__["Cause"].Push:
        {
          var {
            histId
          } = this.parent;

          if (replace || url.href === location.href) {
            var state = _objectSpread(_objectSpread({}, history.state), {}, {
              [histId]: {}
            });

            history.replaceState(state, document.title, url.href);
          } else {
            history.pushState({
              [histId]: {}
            }, document.title, url.href);
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

  updateTitle(_ref2) {
    var {
      cause,
      title
    } = _ref2;
    document.title = title;

    if (!Object(_common__WEBPACK_IMPORTED_MODULE_0__["isExternal"])(this.parent) && cause === _common__WEBPACK_IMPORTED_MODULE_0__["Cause"].Push) {
      history.replaceState(history.state, title);
    }
  }

  assignScrollPosition(state) {
    var {
      histId
    } = this.parent;
    return _objectSpread(_objectSpread({}, state), {}, {
      [histId]: _objectSpread(_objectSpread({}, state[histId]), {}, {
        scrollTop: Object(_common__WEBPACK_IMPORTED_MODULE_0__["getScrollTop"])(),
        scrollHeight: Object(_common__WEBPACK_IMPORTED_MODULE_0__["getScrollHeight"])()
      })
    });
  }

}
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
(() => {
  var HyPushState = class HyPushState extends Object(_common__WEBPACK_IMPORTED_MODULE_4__["applyMixins"])(_hydecorp_component__WEBPACK_IMPORTED_MODULE_3__["RxLitElement"], [_event_listeners__WEBPACK_IMPORTED_MODULE_7__["EventListenersMixin"]]) {
    constructor() {
      super(...arguments);
      this.el = this;
      this.linkSelector = "a[href]:not([data-no-push])";
      this.prefetch = false;
      this.duration = 0; // @property({ type: Boolean, reflect: true, attribute: 'simulate-load' }) simulateLoad: boolean = false;

      this.simulateHashChange = false;
      this.baseURL = window.location.href;
      this._initialized = Object(_hydecorp_component__WEBPACK_IMPORTED_MODULE_3__["createResolvablePromise"])();
      this.$ = {};
      this.fadePromise = Promise.resolve(null);
      this.scrollManager = new _scroll__WEBPACK_IMPORTED_MODULE_10__["ScrollManager"](this);
      this.historyManager = new _history__WEBPACK_IMPORTED_MODULE_9__["HistoryManager"](this);
      this.fetchManager = new _fetch__WEBPACK_IMPORTED_MODULE_5__["FetchManager"](this);
      this.updateManager = new _update__WEBPACK_IMPORTED_MODULE_6__["UpdateManager"](this);
      this.eventManager = new _event__WEBPACK_IMPORTED_MODULE_8__["EventManager"](this);
      this._url = new URL(this.baseURL);
      this.reload$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"](); // Methods

      this.cacheNr = 0;

      this.upgrade = () => {
        var {
          pushEvent$,
          hintEvent$
        } = this.setupEventListeners();
        var deferred = {};
        var push$ = pushEvent$.pipe( // takeUntil(this.subjects.disconnect),
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])((_ref) => {
          var [event, anchor] = _ref;
          return {
            cause: _common__WEBPACK_IMPORTED_MODULE_4__["Cause"].Push,
            url: new URL(anchor.href, this.href),
            anchor,
            event,
            cacheNr: this.cacheNr
          };
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["filter"])(x => Object(_common__WEBPACK_IMPORTED_MODULE_4__["isPushEvent"])(x, this)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])((_ref2) => {
          var {
            event
          } = _ref2;
          event.preventDefault();
          this.historyManager.updateHistoryScrollPosition();
        }));
        var pop$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["fromEvent"])(window, "popstate").pipe( // takeUntil(this.subjects.disconnect),
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["filter"])(() => window.history.state && window.history.state[this.histId]), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(event => ({
          cause: _common__WEBPACK_IMPORTED_MODULE_4__["Cause"].Pop,
          url: new URL(window.location.href),
          cacheNr: this.cacheNr,
          event
        })));
        var reload$ = this.reload$; // .pipe(takeUntil(this.subjects.disconnect));

        var merged$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["merge"])(push$, pop$, reload$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["startWith"])({
          url: new URL(window.location.href)
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["pairwise"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])((_ref3) => {
          var [old, current] = _ref3;
          return Object.assign(current, {
            oldURL: old.url
          });
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["share"])());
        var page$ = merged$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["filter"])(p => !Object(_common__WEBPACK_IMPORTED_MODULE_4__["isHashChange"])(p)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["share"])());
        var hash$ = merged$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["filter"])(p => Object(_common__WEBPACK_IMPORTED_MODULE_4__["isHashChange"])(p)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["filter"])(() => history.state && history.state[this.histId]), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["observeOn"])(rxjs__WEBPACK_IMPORTED_MODULE_1__["animationFrameScheduler"]), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])(context => {
          this.historyManager.updateHistoryState(context);
          this.scrollManager.manageScrollPosition(context);
        }));
        var pauser$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["defer"])(() => Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["merge"])(page$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["mapTo"])(true)), deferred.response$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["mapTo"])(false)))).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["startWith"])(false));
        var hint$ = hintEvent$.pipe( // takeUntil(this.subjects.disconnect),
        Object(_common__WEBPACK_IMPORTED_MODULE_4__["filterWhen"])(pauser$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(x => !x))), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])((_ref4) => {
          var [event, anchor] = _ref4;
          return {
            cause: _common__WEBPACK_IMPORTED_MODULE_4__["Cause"].Hint,
            url: new URL(anchor.href, this.href),
            anchor,
            event,
            cacheNr: this.cacheNr
          };
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["filter"])(x => Object(_common__WEBPACK_IMPORTED_MODULE_4__["isHintEvent"])(x, this)));
        var prefetchResponse$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["merge"])(hint$, page$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["distinctUntilChanged"])((x, y) => this.compareContext(x, y)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["switchMap"])(x => this.fetchManager.fetchPage(x)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["startWith"])({
          url: {}
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["share"])());
        var response$ = deferred.response$ = page$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])(context => {
          this.eventManager.onStart(context);
          this.historyManager.updateHistoryState(context);
          this._url = context.url;
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["withLatestFrom"])(prefetchResponse$), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["switchMap"])(args => this.fetchManager.getResponse(prefetchResponse$, ...args)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["share"])());
        var responseOk$ = response$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["filter"])((_ref5) => {
          var {
            error
          } = _ref5;
          return !error;
        }));
        var responseError$ = response$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["filter"])((_ref6) => {
          var {
            error
          } = _ref6;
          return !!error;
        }));
        var main$ = responseOk$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(context => this.updateManager.responseToContent(context)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])(context => this.eventManager.emitReady(context)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["observeOn"])(rxjs__WEBPACK_IMPORTED_MODULE_1__["animationFrameScheduler"]), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])(context => {
          this.updateManager.updateDOM(context);
          this.historyManager.updateTitle(context);
          this.eventManager.emitAfter(context);
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["startWith"])({
          cause: _common__WEBPACK_IMPORTED_MODULE_4__["Cause"].Init,
          url: this._url,
          scripts: []
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["observeOn"])(rxjs__WEBPACK_IMPORTED_MODULE_1__["animationFrameScheduler"]), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])(context => this.scrollManager.manageScrollPosition(context)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])({
          error: e => this.eventManager.emitDOMError(e)
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])((_, c) => c), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["switchMap"])(x => this.updateManager.reinsertScriptTags(x)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])({
          error: e => this.eventManager.emitError(e)
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])((_, c) => c), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["switchMap"])(() => this.fadePromise), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])(context => this.eventManager.emitLoad(context)));
        var error$ = responseError$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])(e => this.eventManager.emitNetworkError(e)));
        var progress$ = page$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["switchMap"])(context => Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["defer"])(() => this.animPromise).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["takeUntil"])(response$), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["mapTo"])(context))), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])(context => this.eventManager.emitProgress(context))); // Subscriptions

        main$.subscribe();
        hash$.subscribe();
        error$.subscribe();
        progress$.subscribe();

        this._initialized.resolve(this);

        this.fireEvent('init');
      };
    }

    createRenderRoot() {
      return this;
    }

    get initialized() {
      return this._initialized;
    }

    _setLocation(key, value) {
      var u = new URL(this._url.href);
      u[key] = value;
      this.assign(u.href);
    } // Implement Location


    get hash() {
      return this._url.hash;
    }

    get host() {
      return this._url.host;
    }

    get hostname() {
      return this._url.hostname;
    }

    get href() {
      return this._url.href;
    }

    get pathname() {
      return this._url.pathname;
    }

    get port() {
      return this._url.port;
    }

    get protocol() {
      return this._url.protocol;
    }

    get search() {
      return this._url.search;
    }

    get origin() {
      return this._url.origin;
    }

    get ancestorOrigins() {
      return window.location.ancestorOrigins;
    }

    set hash(value) {
      this._setLocation('hash', value);
    }

    set host(value) {
      this._setLocation('host', value);
    }

    set hostname(value) {
      this._setLocation('hostname', value);
    }

    set href(value) {
      this._setLocation('href', value);
    }

    set pathname(value) {
      this._setLocation('pathname', value);
    }

    set port(value) {
      this._setLocation('port', value);
    }

    set protocol(value) {
      this._setLocation('protocol', value);
    }

    set search(value) {
      this._setLocation('search', value);
    } // Silent read-only


    set origin(_) {}

    set ancestorOrigins(_) {}

    get histId() {
      return this.id || this.tagName;
    }

    assign(url) {
      this.reload$.next({
        cause: _common__WEBPACK_IMPORTED_MODULE_4__["Cause"].Push,
        url: new URL(url, this.href),
        cacheNr: ++this.cacheNr
      });
    }

    reload() {
      this.reload$.next({
        cause: _common__WEBPACK_IMPORTED_MODULE_4__["Cause"].Push,
        url: new URL(this.href),
        cacheNr: ++this.cacheNr,
        replace: true
      });
    }

    replace(url) {
      this.reload$.next({
        cause: _common__WEBPACK_IMPORTED_MODULE_4__["Cause"].Push,
        url: new URL(url, this.href),
        cacheNr: ++this.cacheNr,
        replace: true
      });
    }

    compareContext(p, q) {
      return p.url.href === q.url.href && p.error === q.error && p.cacheNr === q.cacheNr;
    }

    connectedCallback() {
      super.connectedCallback();
      this.$.linkSelector = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"](this.linkSelector);
      this.$.prefetch = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"](this.prefetch); // Remember the current scroll position (for F5/reloads).

      window.addEventListener("beforeunload", this.historyManager.updateHistoryScrollPosition);
      this.updateComplete.then(this.upgrade);
    }

    disconnectedCallback() {
      window.removeEventListener("beforeunload", this.historyManager.updateHistoryScrollPosition);
    }

  };

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
})();



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
  replaceEls.forEach(el => {
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
  return el => {
    try {
      el.setAttribute(attr, new URL(el.getAttribute(attr), base).href);
    } catch (e) {// if (process.env.DEBUG) console.warn(`Couldn't rewrite URL in attribute ${attr} on element`, el);
    }
  };
}

function rewriteURLSrcSet(attr, base) {
  return el => {
    try {
      el.setAttribute(attr, el.getAttribute(attr).split(/\s*,\s*/).map(str => {
        var pair = str.split(/\s+/);
        pair[0] = new URL(pair[0], base).href;
        return pair.join(" ");
      }).join(", "));
    } catch (e) {// if (process.env.DEBUG) console.warn(`Couldn't rewrite URLs in attribute ${attr} on element`, el);
    }
  };
}

function rewriteURLList(attr, base) {
  return el => {
    try {
      el.setAttribute(attr, el.getAttribute(attr).split(/[\s,]+/).map(str => new URL(str, base).href).join(", "));
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
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




function cloneScript(script) {
  var newScript = document.createElement('script');
  Array.from(script.attributes).forEach(attr => newScript.setAttributeNode(attr.cloneNode()));
  newScript.innerHTML = script.innerHTML;
  return newScript;
}

class ScriptManager {
  constructor(parent) {
    this.parent = parent;
  }

  get scriptSelector() {
    return this.parent.scriptSelector;
  }

  removeScriptTags(replaceEls) {
    var scripts = [];
    replaceEls.forEach(el => {
      return el.querySelectorAll(this.scriptSelector).forEach(script => {
        var newScript = cloneScript(script);
        var pair = [newScript, script];
        scripts.push(pair);
      });
    });
    return scripts;
  }

  reinsertScriptTags(context) {
    if (!this.scriptSelector) return Promise.resolve(context);
    var {
      scripts
    } = context;
    var originalWrite = document.write;
    return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["from"])(scripts).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["concatMap"])(script => this.insertScript(script)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["catchError"])(error => Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])(_objectSpread(_objectSpread({}, context), {}, {
      error
    }))), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["finalize"])(() => document.write = originalWrite), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["mapTo"])(context)).toPromise();
  }

  insertScript(_ref) {
    var [script, ref] = _ref;

    document.write = function () {
      var temp = document.createElement("div");

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      temp.innerHTML = args.join();
      Array.from(temp.childNodes).forEach(node => ref.parentNode.insertBefore(node, ref));
    };

    return new Promise((resolve, reject) => {
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

}

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

class ScrollManager {
  constructor(parent) {
    this.parent = parent;

    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }

  manageScrollPosition(_ref) {
    var {
      cause,
      url: {
        hash
      }
    } = _ref;

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

  elementFromHash(hash) {
    return document.getElementById(decodeURIComponent(hash.substr(1)));
  }

  scrollHashIntoView(hash, options) {
    if (hash) {
      var el = this.elementFromHash(hash);
      if (el) el.scrollIntoView(options);
    } else {
      window.scroll(window.pageXOffset, 0);
    }
  }

  restoreScrollPosition() {
    var {
      histId
    } = this.parent;
    var {
      scrollTop
    } = history.state && history.state[histId] || {};

    if (scrollTop != null) {
      window.scroll(window.pageXOffset, scrollTop);
    }
  }

  restoreScrollPositionOnReload() {
    var {
      histId
    } = this.parent;
    var scrollState = history.state && history.state[histId]; // FIXME: As far as I can tell there is no better way of figuring out if the user has scrolled
    //        and it doesn't work on hash links b/c the scroll position is going to be non-null by definition

    if (scrollState && Object(_common__WEBPACK_IMPORTED_MODULE_0__["getScrollTop"])() === 0) {
      this.restoreScrollPosition();
    } else if (location.hash) {
      requestAnimationFrame(() => this.scrollHashIntoView(location.hash, true));
    }
  }

}
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
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var CANONICAL_SEL = 'link[rel=canonical]';
var META_DESC_SEL = 'meta[name=description]';
;
class UpdateManager {
  constructor(parent) {
    this.parent = parent;
    this.scriptManager = new _script__WEBPACK_IMPORTED_MODULE_1__["ScriptManager"](parent);
  }

  get el() {
    return this.parent.el;
  }

  get replaceSelector() {
    return this.parent.replaceSelector;
  }

  get scriptSelector() {
    return this.parent.scriptSelector;
  } // Extracts the elements to be replaced


  getReplaceElements(doc) {
    if (this.replaceSelector) {
      return this.replaceSelector.split(',').map(sel => doc.querySelector(sel));
    } else if (this.el.id) {
      return [doc.getElementById(this.el.id)];
    } else {
      var index = Array.from(document.getElementsByTagName(this.el.tagName)).indexOf(this.el);
      return [doc.getElementsByTagName(this.el.tagName)[index]];
    }
  } // Takes the response string and turns it into document fragments
  // that can be inserted into the DOM.


  responseToContent(context) {
    try {
      var {
        responseText
      } = context;
      var doc = new DOMParser().parseFromString(responseText, 'text/html');
      var {
        title = ''
      } = doc;
      var replaceEls = this.getReplaceElements(doc); // if (replaceEls.some(x => x == null)) {
      //   throw { ...context, replaceElMissing: true };
      // }

      var scripts = this.scriptSelector ? this.scriptManager.removeScriptTags(replaceEls) : [];
      return _objectSpread(_objectSpread({}, context), {}, {
        document: doc,
        title,
        replaceEls,
        scripts
      });
    } catch (e) {
      console.error(e);
    }
  } // Replaces the old elments with the new one, one-by-one.


  replaceContentWithSelector(elements) {
    this.replaceSelector.split(',').map(sel => document.querySelector(sel)).forEach((oldElement, i) => oldElement.parentNode.replaceChild(elements[i], oldElement));
  } // When no `relaceIds` are set, replace the entire content of the component (slow).


  replaceContentWholesale(_ref) {
    var [el] = _ref;
    this.el.innerHTML = el.innerHTML;
  }

  replaceContent(replaceEls) {
    if (this.replaceSelector) {
      this.replaceContentWithSelector(replaceEls);
    } else {
      this.replaceContentWholesale(replaceEls);
    }
  }

  replaceHead(doc) {
    var {
      head
    } = this.el.ownerDocument;
    var canonicalEl = head.querySelector(CANONICAL_SEL);
    var cEl = doc.head.querySelector(CANONICAL_SEL);
    if (canonicalEl && cEl) canonicalEl.href = cEl.href;
    var metaDescEl = head.querySelector(META_DESC_SEL);
    var mEl = doc.head.querySelector(META_DESC_SEL);
    if (metaDescEl && mEl) metaDescEl.content = mEl.content;
  }

  updateDOM(context) {
    try {
      var {
        replaceEls,
        document: _document
      } = context;
      if (Object(_common__WEBPACK_IMPORTED_MODULE_0__["isExternal"])(this.parent)) Object(_rewrite_urls__WEBPACK_IMPORTED_MODULE_2__["rewriteURLs"])(replaceEls, this.parent.href);
      this.replaceContent(replaceEls);
      this.replaceHead(_document);
    } catch (error) {
      throw _objectSpread(_objectSpread({}, context), {}, {
        error
      });
    }
  }

  reinsertScriptTags(context) {
    return this.scriptManager.reinsertScriptTags(context);
  }

}

/***/ })

}]);
//# sourceMappingURL=vendors~push-state-hydejack-9.0.0-rc.js.map