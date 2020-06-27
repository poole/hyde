(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~resize-observer"],{

/***/ "./node_modules/@juggle/resize-observer/lib/DOMRectReadOnly.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@juggle/resize-observer/lib/DOMRectReadOnly.js ***!
  \*********************************************************************/
/*! exports provided: DOMRectReadOnly */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DOMRectReadOnly", function() { return DOMRectReadOnly; });
var DOMRectReadOnly = function () {
  function DOMRectReadOnly(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.top = this.y;
    this.left = this.x;
    this.bottom = this.top + this.height;
    this.right = this.left + this.width;
    return Object.freeze(this);
  }

  DOMRectReadOnly.prototype.toJSON = function () {
    var _a = this,
        x = _a.x,
        y = _a.y,
        top = _a.top,
        right = _a.right,
        bottom = _a.bottom,
        left = _a.left,
        width = _a.width,
        height = _a.height;

    return {
      x: x,
      y: y,
      top: top,
      right: right,
      bottom: bottom,
      left: left,
      width: width,
      height: height
    };
  };

  DOMRectReadOnly.fromRect = function (rectangle) {
    return new DOMRectReadOnly(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
  };

  return DOMRectReadOnly;
}();



/***/ }),

/***/ "./node_modules/@juggle/resize-observer/lib/ResizeObservation.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@juggle/resize-observer/lib/ResizeObservation.js ***!
  \***********************************************************************/
/*! exports provided: ResizeObservation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResizeObservation", function() { return ResizeObservation; });
/* harmony import */ var _ResizeObserverBoxOptions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ResizeObserverBoxOptions */ "./node_modules/@juggle/resize-observer/lib/ResizeObserverBoxOptions.js");
/* harmony import */ var _algorithms_calculateBoxSize__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./algorithms/calculateBoxSize */ "./node_modules/@juggle/resize-observer/lib/algorithms/calculateBoxSize.js");
/* harmony import */ var _utils_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/element */ "./node_modules/@juggle/resize-observer/lib/utils/element.js");




var skipNotifyOnElement = function skipNotifyOnElement(target) {
  return !Object(_utils_element__WEBPACK_IMPORTED_MODULE_2__["isSVG"])(target) && !Object(_utils_element__WEBPACK_IMPORTED_MODULE_2__["isReplacedElement"])(target) && getComputedStyle(target).display === 'inline';
};

var ResizeObservation = function () {
  function ResizeObservation(target, observedBox) {
    this.target = target;
    this.observedBox = observedBox || _ResizeObserverBoxOptions__WEBPACK_IMPORTED_MODULE_0__["ResizeObserverBoxOptions"].CONTENT_BOX;
    this.lastReportedSize = {
      inlineSize: 0,
      blockSize: 0
    };
  }

  ResizeObservation.prototype.isActive = function () {
    var size = Object(_algorithms_calculateBoxSize__WEBPACK_IMPORTED_MODULE_1__["calculateBoxSize"])(this.target, this.observedBox, true);

    if (skipNotifyOnElement(this.target)) {
      this.lastReportedSize = size;
    }

    if (this.lastReportedSize.inlineSize !== size.inlineSize || this.lastReportedSize.blockSize !== size.blockSize) {
      return true;
    }

    return false;
  };

  return ResizeObservation;
}();



/***/ }),

/***/ "./node_modules/@juggle/resize-observer/lib/ResizeObserver.js":
/*!********************************************************************!*\
  !*** ./node_modules/@juggle/resize-observer/lib/ResizeObserver.js ***!
  \********************************************************************/
/*! exports provided: ResizeObserver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResizeObserver", function() { return ResizeObserver; });
/* harmony import */ var _ResizeObserverController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ResizeObserverController */ "./node_modules/@juggle/resize-observer/lib/ResizeObserverController.js");
/* harmony import */ var _utils_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/element */ "./node_modules/@juggle/resize-observer/lib/utils/element.js");



var ResizeObserver = function () {
  function ResizeObserver(callback) {
    if (arguments.length === 0) {
      throw new TypeError("Failed to construct 'ResizeObserver': 1 argument required, but only 0 present.");
    }

    if (typeof callback !== 'function') {
      throw new TypeError("Failed to construct 'ResizeObserver': The callback provided as parameter 1 is not a function.");
    }

    _ResizeObserverController__WEBPACK_IMPORTED_MODULE_0__["ResizeObserverController"].connect(this, callback);
  }

  ResizeObserver.prototype.observe = function (target, options) {
    if (arguments.length === 0) {
      throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': 1 argument required, but only 0 present.");
    }

    if (!Object(_utils_element__WEBPACK_IMPORTED_MODULE_1__["isElement"])(target)) {
      throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': parameter 1 is not of type 'Element");
    }

    _ResizeObserverController__WEBPACK_IMPORTED_MODULE_0__["ResizeObserverController"].observe(this, target, options);
  };

  ResizeObserver.prototype.unobserve = function (target) {
    if (arguments.length === 0) {
      throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': 1 argument required, but only 0 present.");
    }

    if (!Object(_utils_element__WEBPACK_IMPORTED_MODULE_1__["isElement"])(target)) {
      throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': parameter 1 is not of type 'Element");
    }

    _ResizeObserverController__WEBPACK_IMPORTED_MODULE_0__["ResizeObserverController"].unobserve(this, target);
  };

  ResizeObserver.prototype.disconnect = function () {
    _ResizeObserverController__WEBPACK_IMPORTED_MODULE_0__["ResizeObserverController"].disconnect(this);
  };

  ResizeObserver.toString = function () {
    return 'function ResizeObserver () { [polyfill code] }';
  };

  return ResizeObserver;
}();



/***/ }),

/***/ "./node_modules/@juggle/resize-observer/lib/ResizeObserverBoxOptions.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@juggle/resize-observer/lib/ResizeObserverBoxOptions.js ***!
  \******************************************************************************/
/*! exports provided: ResizeObserverBoxOptions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResizeObserverBoxOptions", function() { return ResizeObserverBoxOptions; });
var ResizeObserverBoxOptions;

(function (ResizeObserverBoxOptions) {
  ResizeObserverBoxOptions["BORDER_BOX"] = "border-box";
  ResizeObserverBoxOptions["CONTENT_BOX"] = "content-box";
  ResizeObserverBoxOptions["DEVICE_PIXEL_CONTENT_BOX"] = "device-pixel-content-box";
})(ResizeObserverBoxOptions || (ResizeObserverBoxOptions = {}));



/***/ }),

/***/ "./node_modules/@juggle/resize-observer/lib/ResizeObserverController.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@juggle/resize-observer/lib/ResizeObserverController.js ***!
  \******************************************************************************/
/*! exports provided: ResizeObserverController */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResizeObserverController", function() { return ResizeObserverController; });
/* harmony import */ var _utils_scheduler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/scheduler */ "./node_modules/@juggle/resize-observer/lib/utils/scheduler.js");
/* harmony import */ var _ResizeObservation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ResizeObservation */ "./node_modules/@juggle/resize-observer/lib/ResizeObservation.js");
/* harmony import */ var _ResizeObserverDetail__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ResizeObserverDetail */ "./node_modules/@juggle/resize-observer/lib/ResizeObserverDetail.js");
/* harmony import */ var _utils_resizeObservers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/resizeObservers */ "./node_modules/@juggle/resize-observer/lib/utils/resizeObservers.js");




var observerMap = new WeakMap();

var getObservationIndex = function getObservationIndex(observationTargets, target) {
  for (var i = 0; i < observationTargets.length; i += 1) {
    if (observationTargets[i].target === target) {
      return i;
    }
  }

  return -1;
};

var ResizeObserverController = function () {
  function ResizeObserverController() {}

  ResizeObserverController.connect = function (resizeObserver, callback) {
    var detail = new _ResizeObserverDetail__WEBPACK_IMPORTED_MODULE_2__["ResizeObserverDetail"](resizeObserver, callback);
    observerMap.set(resizeObserver, detail);
  };

  ResizeObserverController.observe = function (resizeObserver, target, options) {
    var detail = observerMap.get(resizeObserver);
    var firstObservation = detail.observationTargets.length === 0;

    if (getObservationIndex(detail.observationTargets, target) < 0) {
      firstObservation && _utils_resizeObservers__WEBPACK_IMPORTED_MODULE_3__["resizeObservers"].push(detail);
      detail.observationTargets.push(new _ResizeObservation__WEBPACK_IMPORTED_MODULE_1__["ResizeObservation"](target, options && options.box));
      Object(_utils_scheduler__WEBPACK_IMPORTED_MODULE_0__["updateCount"])(1);
      _utils_scheduler__WEBPACK_IMPORTED_MODULE_0__["scheduler"].schedule();
    }
  };

  ResizeObserverController.unobserve = function (resizeObserver, target) {
    var detail = observerMap.get(resizeObserver);
    var index = getObservationIndex(detail.observationTargets, target);
    var lastObservation = detail.observationTargets.length === 1;

    if (index >= 0) {
      lastObservation && _utils_resizeObservers__WEBPACK_IMPORTED_MODULE_3__["resizeObservers"].splice(_utils_resizeObservers__WEBPACK_IMPORTED_MODULE_3__["resizeObservers"].indexOf(detail), 1);
      detail.observationTargets.splice(index, 1);
      Object(_utils_scheduler__WEBPACK_IMPORTED_MODULE_0__["updateCount"])(-1);
    }
  };

  ResizeObserverController.disconnect = function (resizeObserver) {
    var _this = this;

    var detail = observerMap.get(resizeObserver);
    detail.observationTargets.slice().forEach(function (ot) {
      return _this.unobserve(resizeObserver, ot.target);
    });
    detail.activeTargets.splice(0, detail.activeTargets.length);
  };

  return ResizeObserverController;
}();



/***/ }),

/***/ "./node_modules/@juggle/resize-observer/lib/ResizeObserverDetail.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@juggle/resize-observer/lib/ResizeObserverDetail.js ***!
  \**************************************************************************/
/*! exports provided: ResizeObserverDetail */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResizeObserverDetail", function() { return ResizeObserverDetail; });
var ResizeObserverDetail = function () {
  function ResizeObserverDetail(resizeObserver, callback) {
    this.activeTargets = [];
    this.skippedTargets = [];
    this.observationTargets = [];
    this.observer = resizeObserver;
    this.callback = callback;
  }

  return ResizeObserverDetail;
}();



/***/ }),

/***/ "./node_modules/@juggle/resize-observer/lib/ResizeObserverEntry.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@juggle/resize-observer/lib/ResizeObserverEntry.js ***!
  \*************************************************************************/
/*! exports provided: ResizeObserverEntry */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResizeObserverEntry", function() { return ResizeObserverEntry; });
/* harmony import */ var _algorithms_calculateBoxSize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./algorithms/calculateBoxSize */ "./node_modules/@juggle/resize-observer/lib/algorithms/calculateBoxSize.js");


var ResizeObserverEntry = function () {
  function ResizeObserverEntry(target) {
    var boxes = Object(_algorithms_calculateBoxSize__WEBPACK_IMPORTED_MODULE_0__["calculateBoxSizes"])(target);
    this.target = target;
    this.contentRect = boxes.contentRect;
    this.borderBoxSize = [boxes.borderBoxSize];
    this.contentBoxSize = [boxes.contentBoxSize];
    this.devicePixelContentBoxSize = [boxes.devicePixelContentBoxSize];
  }

  return ResizeObserverEntry;
}();



/***/ }),

/***/ "./node_modules/@juggle/resize-observer/lib/algorithms/broadcastActiveObservations.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/@juggle/resize-observer/lib/algorithms/broadcastActiveObservations.js ***!
  \********************************************************************************************/
/*! exports provided: broadcastActiveObservations */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "broadcastActiveObservations", function() { return broadcastActiveObservations; });
/* harmony import */ var _utils_resizeObservers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/resizeObservers */ "./node_modules/@juggle/resize-observer/lib/utils/resizeObservers.js");
/* harmony import */ var _ResizeObserverEntry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ResizeObserverEntry */ "./node_modules/@juggle/resize-observer/lib/ResizeObserverEntry.js");
/* harmony import */ var _calculateDepthForNode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./calculateDepthForNode */ "./node_modules/@juggle/resize-observer/lib/algorithms/calculateDepthForNode.js");
/* harmony import */ var _calculateBoxSize__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./calculateBoxSize */ "./node_modules/@juggle/resize-observer/lib/algorithms/calculateBoxSize.js");





var broadcastActiveObservations = function broadcastActiveObservations() {
  var shallowestDepth = Infinity;
  var callbacks = [];
  _utils_resizeObservers__WEBPACK_IMPORTED_MODULE_0__["resizeObservers"].forEach(function processObserver(ro) {
    if (ro.activeTargets.length === 0) {
      return;
    }

    var entries = [];
    ro.activeTargets.forEach(function processTarget(ot) {
      var entry = new _ResizeObserverEntry__WEBPACK_IMPORTED_MODULE_1__["ResizeObserverEntry"](ot.target);
      var targetDepth = Object(_calculateDepthForNode__WEBPACK_IMPORTED_MODULE_2__["calculateDepthForNode"])(ot.target);
      entries.push(entry);
      ot.lastReportedSize = Object(_calculateBoxSize__WEBPACK_IMPORTED_MODULE_3__["calculateBoxSize"])(ot.target, ot.observedBox);

      if (targetDepth < shallowestDepth) {
        shallowestDepth = targetDepth;
      }
    });
    callbacks.push(function resizeObserverCallback() {
      ro.callback.call(ro.observer, entries, ro.observer);
    });
    ro.activeTargets.splice(0, ro.activeTargets.length);
  });

  for (var _i = 0, callbacks_1 = callbacks; _i < callbacks_1.length; _i++) {
    var callback = callbacks_1[_i];
    callback();
  }

  return shallowestDepth;
};



/***/ }),

/***/ "./node_modules/@juggle/resize-observer/lib/algorithms/calculateBoxSize.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@juggle/resize-observer/lib/algorithms/calculateBoxSize.js ***!
  \*********************************************************************************/
/*! exports provided: calculateBoxSize, calculateBoxSizes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calculateBoxSize", function() { return calculateBoxSize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calculateBoxSizes", function() { return calculateBoxSizes; });
/* harmony import */ var _ResizeObserverBoxOptions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ResizeObserverBoxOptions */ "./node_modules/@juggle/resize-observer/lib/ResizeObserverBoxOptions.js");
/* harmony import */ var _DOMRectReadOnly__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../DOMRectReadOnly */ "./node_modules/@juggle/resize-observer/lib/DOMRectReadOnly.js");
/* harmony import */ var _utils_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/element */ "./node_modules/@juggle/resize-observer/lib/utils/element.js");
/* harmony import */ var _utils_global__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/global */ "./node_modules/@juggle/resize-observer/lib/utils/global.js");




var cache = new WeakMap();
var scrollRegexp = /auto|scroll/;
var verticalRegexp = /^tb|vertical/;
var IE = /msie|trident/i.test(_utils_global__WEBPACK_IMPORTED_MODULE_3__["global"].navigator && _utils_global__WEBPACK_IMPORTED_MODULE_3__["global"].navigator.userAgent);

var parseDimension = function parseDimension(pixel) {
  return parseFloat(pixel || '0');
};

var size = function size(inlineSize, blockSize, switchSizes) {
  if (inlineSize === void 0) {
    inlineSize = 0;
  }

  if (blockSize === void 0) {
    blockSize = 0;
  }

  if (switchSizes === void 0) {
    switchSizes = false;
  }

  return Object.freeze({
    inlineSize: (switchSizes ? blockSize : inlineSize) || 0,
    blockSize: (switchSizes ? inlineSize : blockSize) || 0
  });
};

var zeroBoxes = Object.freeze({
  devicePixelContentBoxSize: size(),
  borderBoxSize: size(),
  contentBoxSize: size(),
  contentRect: new _DOMRectReadOnly__WEBPACK_IMPORTED_MODULE_1__["DOMRectReadOnly"](0, 0, 0, 0)
});

var calculateBoxSizes = function calculateBoxSizes(target, forceRecalculation) {
  if (forceRecalculation === void 0) {
    forceRecalculation = false;
  }

  if (cache.has(target) && !forceRecalculation) {
    return cache.get(target);
  }

  if (Object(_utils_element__WEBPACK_IMPORTED_MODULE_2__["isHidden"])(target)) {
    cache.set(target, zeroBoxes);
    return zeroBoxes;
  }

  var cs = getComputedStyle(target);
  var svg = Object(_utils_element__WEBPACK_IMPORTED_MODULE_2__["isSVG"])(target) && target.ownerSVGElement && target.getBBox();
  var removePadding = !IE && cs.boxSizing === 'border-box';
  var switchSizes = verticalRegexp.test(cs.writingMode || '');
  var canScrollVertically = !svg && scrollRegexp.test(cs.overflowY || '');
  var canScrollHorizontally = !svg && scrollRegexp.test(cs.overflowX || '');
  var paddingTop = svg ? 0 : parseDimension(cs.paddingTop);
  var paddingRight = svg ? 0 : parseDimension(cs.paddingRight);
  var paddingBottom = svg ? 0 : parseDimension(cs.paddingBottom);
  var paddingLeft = svg ? 0 : parseDimension(cs.paddingLeft);
  var borderTop = svg ? 0 : parseDimension(cs.borderTopWidth);
  var borderRight = svg ? 0 : parseDimension(cs.borderRightWidth);
  var borderBottom = svg ? 0 : parseDimension(cs.borderBottomWidth);
  var borderLeft = svg ? 0 : parseDimension(cs.borderLeftWidth);
  var horizontalPadding = paddingLeft + paddingRight;
  var verticalPadding = paddingTop + paddingBottom;
  var horizontalBorderArea = borderLeft + borderRight;
  var verticalBorderArea = borderTop + borderBottom;
  var horizontalScrollbarThickness = !canScrollHorizontally ? 0 : target.offsetHeight - verticalBorderArea - target.clientHeight;
  var verticalScrollbarThickness = !canScrollVertically ? 0 : target.offsetWidth - horizontalBorderArea - target.clientWidth;
  var widthReduction = removePadding ? horizontalPadding + horizontalBorderArea : 0;
  var heightReduction = removePadding ? verticalPadding + verticalBorderArea : 0;
  var contentWidth = svg ? svg.width : parseDimension(cs.width) - widthReduction - verticalScrollbarThickness;
  var contentHeight = svg ? svg.height : parseDimension(cs.height) - heightReduction - horizontalScrollbarThickness;
  var borderBoxWidth = contentWidth + horizontalPadding + verticalScrollbarThickness + horizontalBorderArea;
  var borderBoxHeight = contentHeight + verticalPadding + horizontalScrollbarThickness + verticalBorderArea;
  var boxes = Object.freeze({
    devicePixelContentBoxSize: size(Math.round(contentWidth * devicePixelRatio), Math.round(contentHeight * devicePixelRatio), switchSizes),
    borderBoxSize: size(borderBoxWidth, borderBoxHeight, switchSizes),
    contentBoxSize: size(contentWidth, contentHeight, switchSizes),
    contentRect: new _DOMRectReadOnly__WEBPACK_IMPORTED_MODULE_1__["DOMRectReadOnly"](paddingLeft, paddingTop, contentWidth, contentHeight)
  });
  cache.set(target, boxes);
  return boxes;
};

var calculateBoxSize = function calculateBoxSize(target, observedBox, forceRecalculation) {
  var _a = calculateBoxSizes(target, forceRecalculation),
      borderBoxSize = _a.borderBoxSize,
      contentBoxSize = _a.contentBoxSize,
      devicePixelContentBoxSize = _a.devicePixelContentBoxSize;

  switch (observedBox) {
    case _ResizeObserverBoxOptions__WEBPACK_IMPORTED_MODULE_0__["ResizeObserverBoxOptions"].DEVICE_PIXEL_CONTENT_BOX:
      return devicePixelContentBoxSize;

    case _ResizeObserverBoxOptions__WEBPACK_IMPORTED_MODULE_0__["ResizeObserverBoxOptions"].BORDER_BOX:
      return borderBoxSize;

    default:
      return contentBoxSize;
  }
};



/***/ }),

/***/ "./node_modules/@juggle/resize-observer/lib/algorithms/calculateDepthForNode.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/@juggle/resize-observer/lib/algorithms/calculateDepthForNode.js ***!
  \**************************************************************************************/
/*! exports provided: calculateDepthForNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calculateDepthForNode", function() { return calculateDepthForNode; });
/* harmony import */ var _utils_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/element */ "./node_modules/@juggle/resize-observer/lib/utils/element.js");


var calculateDepthForNode = function calculateDepthForNode(node) {
  if (Object(_utils_element__WEBPACK_IMPORTED_MODULE_0__["isHidden"])(node)) {
    return Infinity;
  }

  var depth = 0;
  var parent = node.parentNode;

  while (parent) {
    depth += 1;
    parent = parent.parentNode;
  }

  return depth;
};



/***/ }),

/***/ "./node_modules/@juggle/resize-observer/lib/algorithms/deliverResizeLoopError.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/@juggle/resize-observer/lib/algorithms/deliverResizeLoopError.js ***!
  \***************************************************************************************/
/*! exports provided: deliverResizeLoopError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deliverResizeLoopError", function() { return deliverResizeLoopError; });
var msg = 'ResizeObserver loop completed with undelivered notifications.';

var deliverResizeLoopError = function deliverResizeLoopError() {
  var event;

  if (typeof ErrorEvent === 'function') {
    event = new ErrorEvent('error', {
      message: msg
    });
  } else {
    event = document.createEvent('Event');
    event.initEvent('error', false, false);
    event.message = msg;
  }

  window.dispatchEvent(event);
};



/***/ }),

/***/ "./node_modules/@juggle/resize-observer/lib/algorithms/gatherActiveObservationsAtDepth.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/@juggle/resize-observer/lib/algorithms/gatherActiveObservationsAtDepth.js ***!
  \************************************************************************************************/
/*! exports provided: gatherActiveObservationsAtDepth */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gatherActiveObservationsAtDepth", function() { return gatherActiveObservationsAtDepth; });
/* harmony import */ var _utils_resizeObservers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/resizeObservers */ "./node_modules/@juggle/resize-observer/lib/utils/resizeObservers.js");
/* harmony import */ var _calculateDepthForNode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./calculateDepthForNode */ "./node_modules/@juggle/resize-observer/lib/algorithms/calculateDepthForNode.js");



var gatherActiveObservationsAtDepth = function gatherActiveObservationsAtDepth(depth) {
  _utils_resizeObservers__WEBPACK_IMPORTED_MODULE_0__["resizeObservers"].forEach(function processObserver(ro) {
    ro.activeTargets.splice(0, ro.activeTargets.length);
    ro.skippedTargets.splice(0, ro.skippedTargets.length);
    ro.observationTargets.forEach(function processTarget(ot) {
      if (ot.isActive()) {
        if (Object(_calculateDepthForNode__WEBPACK_IMPORTED_MODULE_1__["calculateDepthForNode"])(ot.target) > depth) {
          ro.activeTargets.push(ot);
        } else {
          ro.skippedTargets.push(ot);
        }
      }
    });
  });
};



/***/ }),

/***/ "./node_modules/@juggle/resize-observer/lib/algorithms/hasActiveObservations.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/@juggle/resize-observer/lib/algorithms/hasActiveObservations.js ***!
  \**************************************************************************************/
/*! exports provided: hasActiveObservations */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasActiveObservations", function() { return hasActiveObservations; });
/* harmony import */ var _utils_resizeObservers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/resizeObservers */ "./node_modules/@juggle/resize-observer/lib/utils/resizeObservers.js");


var hasActiveObservations = function hasActiveObservations() {
  return _utils_resizeObservers__WEBPACK_IMPORTED_MODULE_0__["resizeObservers"].some(function (ro) {
    return ro.activeTargets.length > 0;
  });
};



/***/ }),

/***/ "./node_modules/@juggle/resize-observer/lib/algorithms/hasSkippedObservations.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/@juggle/resize-observer/lib/algorithms/hasSkippedObservations.js ***!
  \***************************************************************************************/
/*! exports provided: hasSkippedObservations */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasSkippedObservations", function() { return hasSkippedObservations; });
/* harmony import */ var _utils_resizeObservers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/resizeObservers */ "./node_modules/@juggle/resize-observer/lib/utils/resizeObservers.js");


var hasSkippedObservations = function hasSkippedObservations() {
  return _utils_resizeObservers__WEBPACK_IMPORTED_MODULE_0__["resizeObservers"].some(function (ro) {
    return ro.skippedTargets.length > 0;
  });
};



/***/ }),

/***/ "./node_modules/@juggle/resize-observer/lib/exports/resize-observer.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@juggle/resize-observer/lib/exports/resize-observer.js ***!
  \*****************************************************************************/
/*! exports provided: ResizeObserver, ResizeObserverEntry */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ResizeObserver__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ResizeObserver */ "./node_modules/@juggle/resize-observer/lib/ResizeObserver.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ResizeObserver", function() { return _ResizeObserver__WEBPACK_IMPORTED_MODULE_0__["ResizeObserver"]; });

/* harmony import */ var _ResizeObserverEntry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ResizeObserverEntry */ "./node_modules/@juggle/resize-observer/lib/ResizeObserverEntry.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ResizeObserverEntry", function() { return _ResizeObserverEntry__WEBPACK_IMPORTED_MODULE_1__["ResizeObserverEntry"]; });




/***/ }),

/***/ "./node_modules/@juggle/resize-observer/lib/utils/element.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@juggle/resize-observer/lib/utils/element.js ***!
  \*******************************************************************/
/*! exports provided: isSVG, isHidden, isElement, isReplacedElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isSVG", function() { return isSVG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isHidden", function() { return isHidden; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isElement", function() { return isElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isReplacedElement", function() { return isReplacedElement; });
var isSVG = function isSVG(target) {
  return target instanceof SVGElement && 'getBBox' in target;
};

var isHidden = function isHidden(target) {
  if (isSVG(target)) {
    var _a = target.getBBox(),
        width = _a.width,
        height = _a.height;

    return !width && !height;
  }

  var _b = target,
      offsetWidth = _b.offsetWidth,
      offsetHeight = _b.offsetHeight;
  return !(offsetWidth || offsetHeight || target.getClientRects().length);
};

var isElement = function isElement(obj) {
  var _a, _b;

  var scope = (_b = (_a = obj) === null || _a === void 0 ? void 0 : _a.ownerDocument) === null || _b === void 0 ? void 0 : _b.defaultView;
  return !!(scope && obj instanceof scope.Element);
};

var isReplacedElement = function isReplacedElement(target) {
  switch (target.tagName) {
    case 'INPUT':
      if (target.type !== 'image') {
        break;
      }

    case 'VIDEO':
    case 'AUDIO':
    case 'EMBED':
    case 'OBJECT':
    case 'CANVAS':
    case 'IFRAME':
    case 'IMG':
      return true;
  }

  return false;
};



/***/ }),

/***/ "./node_modules/@juggle/resize-observer/lib/utils/global.js":
/*!******************************************************************!*\
  !*** ./node_modules/@juggle/resize-observer/lib/utils/global.js ***!
  \******************************************************************/
/*! exports provided: global */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "global", function() { return global; });
var global = typeof window !== 'undefined' ? window : {};

/***/ }),

/***/ "./node_modules/@juggle/resize-observer/lib/utils/process.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@juggle/resize-observer/lib/utils/process.js ***!
  \*******************************************************************/
/*! exports provided: process */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "process", function() { return process; });
/* harmony import */ var _algorithms_hasActiveObservations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../algorithms/hasActiveObservations */ "./node_modules/@juggle/resize-observer/lib/algorithms/hasActiveObservations.js");
/* harmony import */ var _algorithms_hasSkippedObservations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../algorithms/hasSkippedObservations */ "./node_modules/@juggle/resize-observer/lib/algorithms/hasSkippedObservations.js");
/* harmony import */ var _algorithms_deliverResizeLoopError__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../algorithms/deliverResizeLoopError */ "./node_modules/@juggle/resize-observer/lib/algorithms/deliverResizeLoopError.js");
/* harmony import */ var _algorithms_broadcastActiveObservations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../algorithms/broadcastActiveObservations */ "./node_modules/@juggle/resize-observer/lib/algorithms/broadcastActiveObservations.js");
/* harmony import */ var _algorithms_gatherActiveObservationsAtDepth__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../algorithms/gatherActiveObservationsAtDepth */ "./node_modules/@juggle/resize-observer/lib/algorithms/gatherActiveObservationsAtDepth.js");






var process = function process() {
  var depth = 0;
  Object(_algorithms_gatherActiveObservationsAtDepth__WEBPACK_IMPORTED_MODULE_4__["gatherActiveObservationsAtDepth"])(depth);

  while (Object(_algorithms_hasActiveObservations__WEBPACK_IMPORTED_MODULE_0__["hasActiveObservations"])()) {
    depth = Object(_algorithms_broadcastActiveObservations__WEBPACK_IMPORTED_MODULE_3__["broadcastActiveObservations"])();
    Object(_algorithms_gatherActiveObservationsAtDepth__WEBPACK_IMPORTED_MODULE_4__["gatherActiveObservationsAtDepth"])(depth);
  }

  if (Object(_algorithms_hasSkippedObservations__WEBPACK_IMPORTED_MODULE_1__["hasSkippedObservations"])()) {
    Object(_algorithms_deliverResizeLoopError__WEBPACK_IMPORTED_MODULE_2__["deliverResizeLoopError"])();
  }

  return depth > 0;
};



/***/ }),

/***/ "./node_modules/@juggle/resize-observer/lib/utils/queueMicroTask.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@juggle/resize-observer/lib/utils/queueMicroTask.js ***!
  \**************************************************************************/
/*! exports provided: queueMicroTask */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "queueMicroTask", function() { return queueMicroTask; });
var trigger;
var callbacks = [];

var notify = function notify() {
  return callbacks.splice(0).forEach(function (cb) {
    return cb();
  });
};

var queueMicroTask = function queueMicroTask(callback) {
  if (!trigger) {
    var toggle_1 = 0;
    var el_1 = document.createTextNode('');
    var config = {
      characterData: true
    };
    new MutationObserver(function () {
      return notify();
    }).observe(el_1, config);

    trigger = function trigger() {
      el_1.textContent = "" + (toggle_1 ? toggle_1-- : toggle_1++);
    };
  }

  callbacks.push(callback);
  trigger();
};



/***/ }),

/***/ "./node_modules/@juggle/resize-observer/lib/utils/queueResizeObserver.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@juggle/resize-observer/lib/utils/queueResizeObserver.js ***!
  \*******************************************************************************/
/*! exports provided: queueResizeObserver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "queueResizeObserver", function() { return queueResizeObserver; });
/* harmony import */ var _queueMicroTask__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./queueMicroTask */ "./node_modules/@juggle/resize-observer/lib/utils/queueMicroTask.js");


var queueResizeObserver = function queueResizeObserver(cb) {
  Object(_queueMicroTask__WEBPACK_IMPORTED_MODULE_0__["queueMicroTask"])(function ResizeObserver() {
    requestAnimationFrame(cb);
  });
};



/***/ }),

/***/ "./node_modules/@juggle/resize-observer/lib/utils/resizeObservers.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@juggle/resize-observer/lib/utils/resizeObservers.js ***!
  \***************************************************************************/
/*! exports provided: resizeObservers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resizeObservers", function() { return resizeObservers; });
var resizeObservers = [];


/***/ }),

/***/ "./node_modules/@juggle/resize-observer/lib/utils/scheduler.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@juggle/resize-observer/lib/utils/scheduler.js ***!
  \*********************************************************************/
/*! exports provided: scheduler, updateCount */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scheduler", function() { return scheduler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateCount", function() { return updateCount; });
/* harmony import */ var _process__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./process */ "./node_modules/@juggle/resize-observer/lib/utils/process.js");
/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./global */ "./node_modules/@juggle/resize-observer/lib/utils/global.js");
/* harmony import */ var _queueResizeObserver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./queueResizeObserver */ "./node_modules/@juggle/resize-observer/lib/utils/queueResizeObserver.js");



var watching = 0;

var isWatching = function isWatching() {
  return !!watching;
};

var CATCH_PERIOD = 250;
var observerConfig = {
  attributes: true,
  characterData: true,
  childList: true,
  subtree: true
};
var events = ['resize', 'load', 'transitionend', 'animationend', 'animationstart', 'animationiteration', 'keyup', 'keydown', 'mouseup', 'mousedown', 'mouseover', 'mouseout', 'blur', 'focus'];

var time = function time(timeout) {
  if (timeout === void 0) {
    timeout = 0;
  }

  return Date.now() + timeout;
};

var scheduled = false;

var Scheduler = function () {
  function Scheduler() {
    var _this = this;

    this.stopped = true;

    this.listener = function () {
      return _this.schedule();
    };
  }

  Scheduler.prototype.run = function (timeout) {
    var _this = this;

    if (timeout === void 0) {
      timeout = CATCH_PERIOD;
    }

    if (scheduled) {
      return;
    }

    scheduled = true;
    var until = time(timeout);
    Object(_queueResizeObserver__WEBPACK_IMPORTED_MODULE_2__["queueResizeObserver"])(function () {
      var elementsHaveResized = false;

      try {
        elementsHaveResized = Object(_process__WEBPACK_IMPORTED_MODULE_0__["process"])();
      } finally {
        scheduled = false;
        timeout = until - time();

        if (!isWatching()) {
          return;
        }

        if (elementsHaveResized) {
          _this.run(1000);
        } else if (timeout > 0) {
          _this.run(timeout);
        } else {
          _this.start();
        }
      }
    });
  };

  Scheduler.prototype.schedule = function () {
    this.stop();
    this.run();
  };

  Scheduler.prototype.observe = function () {
    var _this = this;

    var cb = function cb() {
      return _this.observer && _this.observer.observe(document.body, observerConfig);
    };

    document.body ? cb() : _global__WEBPACK_IMPORTED_MODULE_1__["global"].addEventListener('DOMContentLoaded', cb);
  };

  Scheduler.prototype.start = function () {
    var _this = this;

    if (this.stopped) {
      this.stopped = false;
      this.observer = new MutationObserver(this.listener);
      this.observe();
      events.forEach(function (name) {
        return _global__WEBPACK_IMPORTED_MODULE_1__["global"].addEventListener(name, _this.listener, true);
      });
    }
  };

  Scheduler.prototype.stop = function () {
    var _this = this;

    if (!this.stopped) {
      this.observer && this.observer.disconnect();
      events.forEach(function (name) {
        return _global__WEBPACK_IMPORTED_MODULE_1__["global"].removeEventListener(name, _this.listener, true);
      });
      this.stopped = true;
    }
  };

  return Scheduler;
}();

var scheduler = new Scheduler();

var updateCount = function updateCount(n) {
  !watching && n > 0 && scheduler.start();
  watching += n;
  !watching && scheduler.stop();
};



/***/ })

}]);
//# sourceMappingURL=vendors~resize-observer-hydejack-9.0.0-rc.js.map