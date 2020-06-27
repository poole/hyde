(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["webcomponents"],{

/***/ "./_js/src/polyfills/webcomponents.js":
/*!********************************************!*\
  !*** ./_js/src/polyfills/webcomponents.js ***!
  \********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webcomponents_webcomponents_platform__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @webcomponents/webcomponents-platform */ "./node_modules/@webcomponents/webcomponents-platform/webcomponents-platform.js");
/* harmony import */ var _webcomponents_webcomponents_platform__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_webcomponents_webcomponents_platform__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _webcomponents_url__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @webcomponents/url */ "./node_modules/@webcomponents/url/url.js");
/* harmony import */ var _webcomponents_url__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_webcomponents_url__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _webcomponents_template__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @webcomponents/template */ "./node_modules/@webcomponents/template/template.js");
/* harmony import */ var _webcomponents_template__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_webcomponents_template__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _webcomponents_custom_elements__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @webcomponents/custom-elements */ "./node_modules/@webcomponents/custom-elements/custom-elements.min.js");
/* harmony import */ var _webcomponents_custom_elements__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_webcomponents_custom_elements__WEBPACK_IMPORTED_MODULE_3__);




var _window = window,
    customElements = _window.customElements;
var shouldFlush = false;
/** @type {?function()} */

var flusher = null;

if (customElements['polyfillWrapFlushCallback']) {
  customElements['polyfillWrapFlushCallback'](function (flush) {
    flusher = flush;

    if (shouldFlush) {
      flush();
    }
  });
}

function flushAndFire() {
  if (window.HTMLTemplateElement.bootstrap) {
    window.HTMLTemplateElement.bootstrap(window.document);
  }

  flusher && flusher();
  shouldFlush = true;
  document.dispatchEvent(new CustomEvent('WebComponentsReady', {
    bubbles: true
  }));
}

if (document.readyState !== 'complete') {
  // this script may come between DCL and load, so listen for both, and cancel load listener if DCL fires
  window.addEventListener('load', flushAndFire);
  window.addEventListener('DOMContentLoaded', function () {
    window.removeEventListener('load', flushAndFire);
    flushAndFire();
  });
} else {
  flushAndFire();
}

/***/ })

}]);
//# sourceMappingURL=LEGACY-webcomponents-hydejack-9.0.0-rc.js.map