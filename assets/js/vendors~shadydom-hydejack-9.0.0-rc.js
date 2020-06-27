(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~shadydom"],{

/***/ "./node_modules/@webcomponents/shadycss/entrypoints/scoping-shim.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@webcomponents/shadycss/entrypoints/scoping-shim.js ***!
  \**************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_scoping_shim_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/scoping-shim.js */ "./node_modules/@webcomponents/shadycss/src/scoping-shim.js");
/* harmony import */ var _src_style_settings_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../src/style-settings.js */ "./node_modules/@webcomponents/shadycss/src/style-settings.js");
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/




/** @const {ScopingShim} */

var scopingShim = new _src_scoping_shim_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
var ApplyShim, CustomStyleInterface;

if (window['ShadyCSS']) {
  ApplyShim = window['ShadyCSS']['ApplyShim'];
  CustomStyleInterface = window['ShadyCSS']['CustomStyleInterface'];
}

window.ShadyCSS = {
  ScopingShim: scopingShim,

  /**
   * @param {!HTMLTemplateElement} template
   * @param {string} elementName
   * @param {string=} elementExtends
   */
  prepareTemplate(template, elementName, elementExtends) {
    scopingShim.flushCustomStyles();
    scopingShim.prepareTemplate(template, elementName, elementExtends);
  },

  /**
   * @param {!HTMLTemplateElement} template
   * @param {string} elementName
   */
  prepareTemplateDom(template, elementName) {
    scopingShim.prepareTemplateDom(template, elementName);
  },

  /**
   * @param {!HTMLTemplateElement} template
   * @param {string} elementName
   * @param {string=} elementExtends
   */
  prepareTemplateStyles(template, elementName, elementExtends) {
    scopingShim.flushCustomStyles();
    scopingShim.prepareTemplateStyles(template, elementName, elementExtends);
  },

  /**
   * @param {!HTMLElement} element
   * @param {Object=} properties
   */
  styleSubtree(element, properties) {
    scopingShim.flushCustomStyles();
    scopingShim.styleSubtree(element, properties);
  },

  /**
   * @param {!HTMLElement} element
   */
  styleElement(element) {
    scopingShim.flushCustomStyles();
    scopingShim.styleElement(element);
  },

  /**
   * @param {Object=} properties
   */
  styleDocument(properties) {
    scopingShim.flushCustomStyles();
    scopingShim.styleDocument(properties);
  },

  flushCustomStyles() {
    scopingShim.flushCustomStyles();
  },

  /**
   * @param {Element} element
   * @param {string} property
   * @return {string}
   */
  getComputedStyleValue(element, property) {
    return scopingShim.getComputedStyleValue(element, property);
  },

  nativeCss: _src_style_settings_js__WEBPACK_IMPORTED_MODULE_1__["nativeCssVariables"],
  nativeShadow: _src_style_settings_js__WEBPACK_IMPORTED_MODULE_1__["nativeShadow"],
  cssBuild: _src_style_settings_js__WEBPACK_IMPORTED_MODULE_1__["cssBuild"],
  disableRuntime: _src_style_settings_js__WEBPACK_IMPORTED_MODULE_1__["disableRuntime"]
};

if (ApplyShim) {
  window.ShadyCSS.ApplyShim = ApplyShim;
}

if (CustomStyleInterface) {
  window.ShadyCSS.CustomStyleInterface = CustomStyleInterface;
}

/***/ }),

/***/ "./node_modules/@webcomponents/shadycss/src/apply-shim-utils.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@webcomponents/shadycss/src/apply-shim-utils.js ***!
  \**********************************************************************/
/*! exports provided: invalidate, invalidateTemplate, isValid, templateIsValid, isValidating, templateIsValidating, startValidating, startValidatingTemplate, elementsAreInvalid */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "invalidate", function() { return invalidate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "invalidateTemplate", function() { return invalidateTemplate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValid", function() { return isValid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "templateIsValid", function() { return templateIsValid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidating", function() { return isValidating; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "templateIsValidating", function() { return templateIsValidating; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "startValidating", function() { return startValidating; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "startValidatingTemplate", function() { return startValidatingTemplate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "elementsAreInvalid", function() { return elementsAreInvalid; });
/* harmony import */ var _template_map_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./template-map.js */ "./node_modules/@webcomponents/shadycss/src/template-map.js");
/* harmony import */ var _css_parse_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./css-parse.js */ "./node_modules/@webcomponents/shadycss/src/css-parse.js");
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/



 // eslint-disable-line no-unused-vars

/*
 * Utilities for handling invalidating apply-shim mixins for a given template.
 *
 * The invalidation strategy involves keeping track of the "current" version of a template's mixins, and updating that count when a mixin is invalidated.
 * The template
 */

/** @const {string} */

var CURRENT_VERSION = '_applyShimCurrentVersion';
/** @const {string} */

var NEXT_VERSION = '_applyShimNextVersion';
/** @const {string} */

var VALIDATING_VERSION = '_applyShimValidatingVersion';
/**
 * @const {Promise<void>}
 */

var promise = Promise.resolve();
/**
 * @param {string} elementName
 */

function invalidate(elementName) {
  var template = _template_map_js__WEBPACK_IMPORTED_MODULE_0__["default"][elementName];

  if (template) {
    invalidateTemplate(template);
  }
}
/**
 * This function can be called multiple times to mark a template invalid
 * and signal that the style inside must be regenerated.
 *
 * Use `startValidatingTemplate` to begin an asynchronous validation cycle.
 * During that cycle, call `templateIsValidating` to see if the template must
 * be revalidated
 * @param {HTMLTemplateElement} template
 */

function invalidateTemplate(template) {
  // default the current version to 0
  template[CURRENT_VERSION] = template[CURRENT_VERSION] || 0; // ensure the "validating for" flag exists

  template[VALIDATING_VERSION] = template[VALIDATING_VERSION] || 0; // increment the next version

  template[NEXT_VERSION] = (template[NEXT_VERSION] || 0) + 1;
}
/**
 * @param {string} elementName
 * @return {boolean}
 */

function isValid(elementName) {
  var template = _template_map_js__WEBPACK_IMPORTED_MODULE_0__["default"][elementName];

  if (template) {
    return templateIsValid(template);
  }

  return true;
}
/**
 * @param {HTMLTemplateElement} template
 * @return {boolean}
 */

function templateIsValid(template) {
  return template[CURRENT_VERSION] === template[NEXT_VERSION];
}
/**
 * @param {string} elementName
 * @return {boolean}
 */

function isValidating(elementName) {
  var template = _template_map_js__WEBPACK_IMPORTED_MODULE_0__["default"][elementName];

  if (template) {
    return templateIsValidating(template);
  }

  return false;
}
/**
 * Returns true if the template is currently invalid and `startValidating` has been called since the last invalidation.
 * If false, the template must be validated.
 * @param {HTMLTemplateElement} template
 * @return {boolean}
 */

function templateIsValidating(template) {
  return !templateIsValid(template) && template[VALIDATING_VERSION] === template[NEXT_VERSION];
}
/**
 * the template is marked as `validating` for one microtask so that all instances
 * found in the tree crawl of `applyStyle` will update themselves,
 * but the template will only be updated once.
 * @param {string} elementName
*/

function startValidating(elementName) {
  var template = _template_map_js__WEBPACK_IMPORTED_MODULE_0__["default"][elementName];
  startValidatingTemplate(template);
}
/**
 * Begin an asynchronous invalidation cycle.
 * This should be called after every validation of a template
 *
 * After one microtask, the template will be marked as valid until the next call to `invalidateTemplate`
 * @param {HTMLTemplateElement} template
 */

function startValidatingTemplate(template) {
  // remember that the current "next version" is the reason for this validation cycle
  template[VALIDATING_VERSION] = template[NEXT_VERSION]; // however, there only needs to be one async task to clear the counters

  if (!template._validating) {
    template._validating = true;
    promise.then(function () {
      // sync the current version to let future invalidations cause a refresh cycle
      template[CURRENT_VERSION] = template[NEXT_VERSION];
      template._validating = false;
    });
  }
}
/**
 * @return {boolean}
 */

function elementsAreInvalid() {
  for (var elementName in _template_map_js__WEBPACK_IMPORTED_MODULE_0__["default"]) {
    var template = _template_map_js__WEBPACK_IMPORTED_MODULE_0__["default"][elementName];

    if (!templateIsValid(template)) {
      return true;
    }
  }

  return false;
}

/***/ }),

/***/ "./node_modules/@webcomponents/shadycss/src/common-regex.js":
/*!******************************************************************!*\
  !*** ./node_modules/@webcomponents/shadycss/src/common-regex.js ***!
  \******************************************************************/
/*! exports provided: VAR_ASSIGN, MIXIN_MATCH, VAR_CONSUMED, ANIMATION_MATCH, MEDIA_MATCH, IS_VAR, BRACKETED, HOST_PREFIX, HOST_SUFFIX */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VAR_ASSIGN", function() { return VAR_ASSIGN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MIXIN_MATCH", function() { return MIXIN_MATCH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VAR_CONSUMED", function() { return VAR_CONSUMED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ANIMATION_MATCH", function() { return ANIMATION_MATCH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MEDIA_MATCH", function() { return MEDIA_MATCH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IS_VAR", function() { return IS_VAR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BRACKETED", function() { return BRACKETED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HOST_PREFIX", function() { return HOST_PREFIX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HOST_SUFFIX", function() { return HOST_SUFFIX; });
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
var VAR_ASSIGN = /(?:^|[;\s{]\s*)(--[\w-]*?)\s*:\s*(?:((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};{])+)|\{([^}]*)\}(?:(?=[;\s}])|$))/gi;
var MIXIN_MATCH = /(?:^|\W+)@apply\s*\(?([^);\n]*)\)?/gi;
var VAR_CONSUMED = /(--[\w-]+)\s*([:,;)]|$)/gi;
var ANIMATION_MATCH = /(animation\s*:)|(animation-name\s*:)/;
var MEDIA_MATCH = /@media\s(.*)/;
var IS_VAR = /^--/;
var BRACKETED = /\{[^}]*\}/g;
var HOST_PREFIX = '(?:^|[^.#[:])';
var HOST_SUFFIX = '($|[.:[\\s>+~])';

/***/ }),

/***/ "./node_modules/@webcomponents/shadycss/src/common-utils.js":
/*!******************************************************************!*\
  !*** ./node_modules/@webcomponents/shadycss/src/common-utils.js ***!
  \******************************************************************/
/*! exports provided: updateNativeProperties, getComputedStyleValue, detectMixin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateNativeProperties", function() { return updateNativeProperties; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getComputedStyleValue", function() { return getComputedStyleValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "detectMixin", function() { return detectMixin; });
/* harmony import */ var _common_regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common-regex.js */ "./node_modules/@webcomponents/shadycss/src/common-regex.js");
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/



/**
 * @param {Element} element
 * @param {Object=} properties
 */

function updateNativeProperties(element, properties) {
  // remove previous properties
  for (var p in properties) {
    // NOTE: for bc with shim, don't apply null values.
    if (p === null) {
      element.style.removeProperty(p);
    } else {
      element.style.setProperty(p, properties[p]);
    }
  }
}
/**
 * @param {Element} element
 * @param {string} property
 * @return {string}
 */

function getComputedStyleValue(element, property) {
  /**
   * @const {string}
   */
  var value = window.getComputedStyle(element).getPropertyValue(property);

  if (!value) {
    return '';
  } else {
    return value.trim();
  }
}
/**
 * return true if `cssText` contains a mixin definition or consumption
 * @param {string} cssText
 * @return {boolean}
 */

function detectMixin(cssText) {
  var has = _common_regex_js__WEBPACK_IMPORTED_MODULE_0__["MIXIN_MATCH"].test(cssText) || _common_regex_js__WEBPACK_IMPORTED_MODULE_0__["VAR_ASSIGN"].test(cssText); // reset state of the regexes

  _common_regex_js__WEBPACK_IMPORTED_MODULE_0__["MIXIN_MATCH"].lastIndex = 0;
  _common_regex_js__WEBPACK_IMPORTED_MODULE_0__["VAR_ASSIGN"].lastIndex = 0;
  return has;
}

/***/ }),

/***/ "./node_modules/@webcomponents/shadycss/src/css-parse.js":
/*!***************************************************************!*\
  !*** ./node_modules/@webcomponents/shadycss/src/css-parse.js ***!
  \***************************************************************/
/*! exports provided: StyleNode, parse, stringify, removeCustomPropAssignment, types */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StyleNode", function() { return StyleNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parse", function() { return parse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stringify", function() { return stringify; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeCustomPropAssignment", function() { return removeCustomPropAssignment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "types", function() { return types; });
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

/*
Extremely simple css parser. Intended to be not more than what we need
and definitely not necessarily correct =).
*/

/** @unrestricted */

class StyleNode {
  constructor() {
    /** @type {number} */
    this['start'] = 0;
    /** @type {number} */

    this['end'] = 0;
    /** @type {StyleNode} */

    this['previous'] = null;
    /** @type {StyleNode} */

    this['parent'] = null;
    /** @type {Array<StyleNode>} */

    this['rules'] = null;
    /** @type {string} */

    this['parsedCssText'] = '';
    /** @type {string} */

    this['cssText'] = '';
    /** @type {boolean} */

    this['atRule'] = false;
    /** @type {number} */

    this['type'] = 0;
    /** @type {string} */

    this['keyframesName'] = '';
    /** @type {string} */

    this['selector'] = '';
    /** @type {string} */

    this['parsedSelector'] = '';
  }

}

 // given a string of css, return a simple rule tree

/**
 * @param {string} text
 * @return {StyleNode}
 */

function parse(text) {
  text = clean(text);
  return parseCss(lex(text), text);
} // remove stuff we don't care about that may hinder parsing

/**
 * @param {string} cssText
 * @return {string}
 */

function clean(cssText) {
  return cssText.replace(RX.comments, '').replace(RX.port, '');
} // super simple {...} lexer that returns a node tree

/**
 * @param {string} text
 * @return {!StyleNode}
 */


function lex(text) {
  var root = new StyleNode();
  root['start'] = 0;
  root['end'] = text.length;
  var n = root;

  for (var i = 0, l = text.length; i < l; i++) {
    if (text[i] === OPEN_BRACE) {
      if (!n['rules']) {
        n['rules'] = [];
      }

      var p = n;
      var previous = p['rules'][p['rules'].length - 1] || null;
      n = new StyleNode();
      n['start'] = i + 1;
      n['parent'] = p;
      n['previous'] = previous;
      p['rules'].push(n);
    } else if (text[i] === CLOSE_BRACE) {
      n['end'] = i + 1;
      n = n['parent'] || root;
    }
  }

  return root;
} // add selectors/cssText to node tree

/**
 * @param {StyleNode} node
 * @param {string} text
 * @return {!StyleNode}
 */


function parseCss(node, text) {
  var t = text.substring(node['start'], node['end'] - 1);
  node['parsedCssText'] = node['cssText'] = t.trim();

  if (node['parent']) {
    var ss = node['previous'] ? node['previous']['end'] : node['parent']['start'];
    t = text.substring(ss, node['start'] - 1);
    t = _expandUnicodeEscapes(t);
    t = t.replace(RX.multipleSpaces, ' '); // TODO(sorvell): ad hoc; make selector include only after last ;
    // helps with mixin syntax

    t = t.substring(t.lastIndexOf(';') + 1);
    var s = node['parsedSelector'] = node['selector'] = t.trim();
    node['atRule'] = s.indexOf(AT_START) === 0; // note, support a subset of rule types...

    if (node['atRule']) {
      if (s.indexOf(MEDIA_START) === 0) {
        node['type'] = types.MEDIA_RULE;
      } else if (s.match(RX.keyframesRule)) {
        node['type'] = types.KEYFRAMES_RULE;
        node['keyframesName'] = node['selector'].split(RX.multipleSpaces).pop();
      }
    } else {
      if (s.indexOf(VAR_START) === 0) {
        node['type'] = types.MIXIN_RULE;
      } else {
        node['type'] = types.STYLE_RULE;
      }
    }
  }

  var r$ = node['rules'];

  if (r$) {
    for (var i = 0, l = r$.length, r; i < l && (r = r$[i]); i++) {
      parseCss(r, text);
    }
  }

  return node;
}
/**
 * conversion of sort unicode escapes with spaces like `\33 ` (and longer) into
 * expanded form that doesn't require trailing space `\000033`
 * @param {string} s
 * @return {string}
 */


function _expandUnicodeEscapes(s) {
  return s.replace(/\\([0-9a-f]{1,6})\s/gi, function () {
    var code = arguments[1],
        repeat = 6 - code.length;

    while (repeat--) {
      code = '0' + code;
    }

    return '\\' + code;
  });
}
/**
 * stringify parsed css.
 * @param {StyleNode} node
 * @param {boolean=} preserveProperties
 * @param {string=} text
 * @return {string}
 */


function stringify(node, preserveProperties) {
  var text = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  // calc rule cssText
  var cssText = '';

  if (node['cssText'] || node['rules']) {
    var r$ = node['rules'];

    if (r$ && !_hasMixinRules(r$)) {
      for (var i = 0, l = r$.length, r; i < l && (r = r$[i]); i++) {
        cssText = stringify(r, preserveProperties, cssText);
      }
    } else {
      cssText = preserveProperties ? node['cssText'] : removeCustomProps(node['cssText']);
      cssText = cssText.trim();

      if (cssText) {
        cssText = '  ' + cssText + '\n';
      }
    }
  } // emit rule if there is cssText


  if (cssText) {
    if (node['selector']) {
      text += node['selector'] + ' ' + OPEN_BRACE + '\n';
    }

    text += cssText;

    if (node['selector']) {
      text += CLOSE_BRACE + '\n\n';
    }
  }

  return text;
}
/**
 * @param {Array<StyleNode>} rules
 * @return {boolean}
 */

function _hasMixinRules(rules) {
  var r = rules[0];
  return Boolean(r) && Boolean(r['selector']) && r['selector'].indexOf(VAR_START) === 0;
}
/**
 * @param {string} cssText
 * @return {string}
 */


function removeCustomProps(cssText) {
  cssText = removeCustomPropAssignment(cssText);
  return removeCustomPropApply(cssText);
}
/**
 * @param {string} cssText
 * @return {string}
 */


function removeCustomPropAssignment(cssText) {
  return cssText.replace(RX.customProp, '').replace(RX.mixinProp, '');
}
/**
 * @param {string} cssText
 * @return {string}
 */

function removeCustomPropApply(cssText) {
  return cssText.replace(RX.mixinApply, '').replace(RX.varApply, '');
}
/** @enum {number} */


var types = {
  STYLE_RULE: 1,
  KEYFRAMES_RULE: 7,
  MEDIA_RULE: 4,
  MIXIN_RULE: 1000
};
var OPEN_BRACE = '{';
var CLOSE_BRACE = '}'; // helper regexp's

var RX = {
  comments: /\/\*[^*]*\*+([^/*][^*]*\*+)*\//gim,
  port: /@import[^;]*;/gim,
  customProp: /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?(?:[;\n]|$)/gim,
  mixinProp: /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?{[^}]*?}(?:[;\n]|$)?/gim,
  mixinApply: /@apply\s*\(?[^);]*\)?\s*(?:[;\n]|$)?/gim,
  varApply: /[^;:]*?:[^;]*?var\([^;]*\)(?:[;\n]|$)?/gim,
  keyframesRule: /^@[^\s]*keyframes/,
  multipleSpaces: /\s+/g
};
var VAR_START = '--';
var MEDIA_START = '@media';
var AT_START = '@';

/***/ }),

/***/ "./node_modules/@webcomponents/shadycss/src/custom-style-interface.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@webcomponents/shadycss/src/custom-style-interface.js ***!
  \****************************************************************************/
/*! exports provided: CustomStyleProvider, default, CustomStyleInterfaceInterface */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomStyleProvider", function() { return CustomStyleProvider; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CustomStyleInterface; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomStyleInterfaceInterface", function() { return CustomStyleInterfaceInterface; });
/* harmony import */ var _document_wait_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./document-wait.js */ "./node_modules/@webcomponents/shadycss/src/document-wait.js");
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/



/**
 * @typedef {HTMLStyleElement | {getStyle: function():HTMLStyleElement}}
 */

var CustomStyleProvider;
var SEEN_MARKER = '__seenByShadyCSS';
var CACHED_STYLE = '__shadyCSSCachedStyle';
/** @type {?function(!HTMLStyleElement)} */

var transformFn = null;
/** @type {?function()} */

var validateFn = null;
/**
This interface is provided to add document-level <style> elements to ShadyCSS for processing.
These styles must be processed by ShadyCSS to simulate ShadowRoot upper-bound encapsulation from outside styles
In addition, these styles may also need to be processed for @apply rules and CSS Custom Properties

To add document-level styles to ShadyCSS, one can call `ShadyCSS.addDocumentStyle(styleElement)` or `ShadyCSS.addDocumentStyle({getStyle: () => styleElement})`

In addition, if the process used to discover document-level styles can be synchronously flushed, one should set `ShadyCSS.documentStyleFlush`.
This function will be called when calculating styles.

An example usage of the document-level styling api can be found in `examples/document-style-lib.js`

@unrestricted
*/

class CustomStyleInterface {
  constructor() {
    /** @type {!Array<!CustomStyleProvider>} */
    this['customStyles'] = [];
    this['enqueued'] = false; // NOTE(dfreedm): use quotes here to prevent closure inlining to `function(){}`;

    Object(_document_wait_js__WEBPACK_IMPORTED_MODULE_0__["default"])(() => {
      if (window['ShadyCSS']['flushCustomStyles']) {
        window['ShadyCSS']['flushCustomStyles']();
      }
    });
  }
  /**
   * Queue a validation for new custom styles to batch style recalculations
   */


  enqueueDocumentValidation() {
    if (this['enqueued'] || !validateFn) {
      return;
    }

    this['enqueued'] = true;
    Object(_document_wait_js__WEBPACK_IMPORTED_MODULE_0__["default"])(validateFn);
  }
  /**
   * @param {!HTMLStyleElement} style
   */


  addCustomStyle(style) {
    if (!style[SEEN_MARKER]) {
      style[SEEN_MARKER] = true;
      this['customStyles'].push(style);
      this.enqueueDocumentValidation();
    }
  }
  /**
   * @param {!CustomStyleProvider} customStyle
   * @return {HTMLStyleElement}
   */


  getStyleForCustomStyle(customStyle) {
    if (customStyle[CACHED_STYLE]) {
      return customStyle[CACHED_STYLE];
    }

    var style;

    if (customStyle['getStyle']) {
      style = customStyle['getStyle']();
    } else {
      style = customStyle;
    }

    return style;
  }
  /**
   * @return {!Array<!CustomStyleProvider>}
   */


  processStyles() {
    var cs = this['customStyles'];

    for (var i = 0; i < cs.length; i++) {
      var customStyle = cs[i];

      if (customStyle[CACHED_STYLE]) {
        continue;
      }

      var style = this.getStyleForCustomStyle(customStyle);

      if (style) {
        // HTMLImports polyfill may have cloned the style into the main document,
        // which is referenced with __appliedElement.
        var styleToTransform =
        /** @type {!HTMLStyleElement} */
        style['__appliedElement'] || style;

        if (transformFn) {
          transformFn(styleToTransform);
        }

        customStyle[CACHED_STYLE] = styleToTransform;
      }
    }

    return cs;
  }

}
/* eslint-disable no-self-assign */

CustomStyleInterface.prototype['addCustomStyle'] = CustomStyleInterface.prototype.addCustomStyle;
CustomStyleInterface.prototype['getStyleForCustomStyle'] = CustomStyleInterface.prototype.getStyleForCustomStyle;
CustomStyleInterface.prototype['processStyles'] = CustomStyleInterface.prototype.processStyles;
/* eslint-enable no-self-assign */

Object.defineProperties(CustomStyleInterface.prototype, {
  'transformCallback': {
    /** @return {?function(!HTMLStyleElement)} */
    get() {
      return transformFn;
    },

    /** @param {?function(!HTMLStyleElement)} fn */
    set(fn) {
      transformFn = fn;
    }

  },
  'validateCallback': {
    /** @return {?function()} */
    get() {
      return validateFn;
    },

    /**
     * @param {?function()} fn
     * @this {CustomStyleInterface}
     */
    set(fn) {
      var needsEnqueue = false;

      if (!validateFn) {
        needsEnqueue = true;
      }

      validateFn = fn;

      if (needsEnqueue) {
        this.enqueueDocumentValidation();
      }
    }

  }
});
/** @typedef {{
 * customStyles: !Array<!CustomStyleProvider>,
 * addCustomStyle: function(!CustomStyleProvider),
 * getStyleForCustomStyle: function(!CustomStyleProvider): HTMLStyleElement,
 * findStyles: function(),
 * transformCallback: ?function(!HTMLStyleElement),
 * validateCallback: ?function()
 * }}
 */

var CustomStyleInterfaceInterface = {};

/***/ }),

/***/ "./node_modules/@webcomponents/shadycss/src/document-wait.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@webcomponents/shadycss/src/document-wait.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return documentWait; });
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

/** @type {Promise<void>} */

var readyPromise = null;
/** @type {?function(?function())} */

var whenReady = window['HTMLImports'] && window['HTMLImports']['whenReady'] || null;
/** @type {function()} */

var resolveFn;
/**
 * @param {?function()} callback
 */

function documentWait(callback) {
  requestAnimationFrame(function () {
    if (whenReady) {
      whenReady(callback);
    } else {
      if (!readyPromise) {
        readyPromise = new Promise(resolve => {
          resolveFn = resolve;
        });

        if (document.readyState === 'complete') {
          resolveFn();
        } else {
          document.addEventListener('readystatechange', () => {
            if (document.readyState === 'complete') {
              resolveFn();
            }
          });
        }
      }

      readyPromise.then(function () {
        callback && callback();
      });
    }
  });
}

/***/ }),

/***/ "./node_modules/@webcomponents/shadycss/src/document-watcher.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@webcomponents/shadycss/src/document-watcher.js ***!
  \**********************************************************************/
/*! exports provided: flush, getCurrentScope, getOwnerScope, ensureCorrectScope, ensureCorrectSubtreeScoping */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "flush", function() { return flush; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCurrentScope", function() { return getCurrentScope; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getOwnerScope", function() { return getOwnerScope; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ensureCorrectScope", function() { return ensureCorrectScope; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ensureCorrectSubtreeScoping", function() { return ensureCorrectSubtreeScoping; });
/* harmony import */ var _style_settings_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style-settings.js */ "./node_modules/@webcomponents/shadycss/src/style-settings.js");
/* harmony import */ var _style_transformer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style-transformer.js */ "./node_modules/@webcomponents/shadycss/src/style-transformer.js");
/* harmony import */ var _style_util_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./style-util.js */ "./node_modules/@webcomponents/shadycss/src/style-util.js");
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/





var flush = function flush() {};
/**
 * @param {!Element} element
 * @return {string}
 */

function getClasses(element) {
  if (element.classList && element.classList.value) {
    return element.classList.value;
  } else {
    // NOTE: className is patched to remove scoping classes in ShadyDOM
    // use getAttribute('class') instead, which is unpatched
    return element.getAttribute('class') || '';
  }
}

var scopeRegExp = new RegExp("".concat(_style_transformer_js__WEBPACK_IMPORTED_MODULE_1__["default"].SCOPE_NAME, "\\s*([^\\s]*)"));
/**
 * @param {!Element} element
 * @return {string}
 */

function getCurrentScope(element) {
  var match = getClasses(element).match(scopeRegExp);

  if (match) {
    return match[1];
  } else {
    return '';
  }
}
/**
 * @param {!Node} node
 */

function getOwnerScope(node) {
  var ownerRoot = Object(_style_util_js__WEBPACK_IMPORTED_MODULE_2__["wrap"])(node).getRootNode();

  if (ownerRoot === node || ownerRoot === node.ownerDocument) {
    return '';
  }

  var host =
  /** @type {!ShadowRoot} */
  ownerRoot.host;

  if (!host) {
    // this may actually be a document fragment
    return '';
  }

  return Object(_style_util_js__WEBPACK_IMPORTED_MODULE_2__["getIsExtends"])(host).is;
}
/**
 * @param {!Element} element
 */

function ensureCorrectScope(element) {
  var currentScope = getCurrentScope(element);
  var ownerRoot = Object(_style_util_js__WEBPACK_IMPORTED_MODULE_2__["wrap"])(element).getRootNode();

  if (ownerRoot === element) {
    return;
  }

  if (currentScope && ownerRoot === element.ownerDocument) {
    // node was scoped, but now is in document
    _style_transformer_js__WEBPACK_IMPORTED_MODULE_1__["default"].domRemoveScope(element, currentScope);
  } else if (ownerRoot instanceof ShadowRoot) {
    var ownerScope = getOwnerScope(element);

    if (ownerScope !== currentScope) {
      // node was scoped, but not by its current owner
      _style_transformer_js__WEBPACK_IMPORTED_MODULE_1__["default"].domReplaceScope(element, currentScope, ownerScope);
    }
  }
}
/**
 * @param {!HTMLElement|!HTMLDocument} element
 */

function ensureCorrectSubtreeScoping(element) {
  // find unscoped subtree nodes
  var unscopedNodes = window['ShadyDOM']['nativeMethods']['querySelectorAll'].call(element, ":not(.".concat(_style_transformer_js__WEBPACK_IMPORTED_MODULE_1__["default"].SCOPE_NAME, ")"));

  for (var j = 0; j < unscopedNodes.length; j++) {
    // it's possible, during large batch inserts, that nodes that aren't
    // scoped within the current scope were added.
    // To make sure that any unscoped nodes that were inserted in the current batch are correctly styled,
    // query all unscoped nodes and force their style-scope to be applied.
    // This could happen if a sub-element appended an unscoped node in its shadowroot and this function
    // runs on a parent element of the host of that unscoped node:
    // parent-element -> element -> unscoped node
    // Here unscoped node should have the style-scope element, not parent-element.
    var unscopedNode = unscopedNodes[j];
    var scopeForPreviouslyUnscopedNode = getOwnerScope(unscopedNode);

    if (scopeForPreviouslyUnscopedNode) {
      _style_transformer_js__WEBPACK_IMPORTED_MODULE_1__["default"].element(unscopedNode, scopeForPreviouslyUnscopedNode);
    }
  }
}
/**
 * @param {HTMLElement} el
 * @return {boolean}
 */

function isElementWithBuiltCss(el) {
  if (el.localName === 'style' || el.localName === 'template') {
    return Object(_style_util_js__WEBPACK_IMPORTED_MODULE_2__["elementHasBuiltCss"])(el);
  }

  return false;
}
/**
 * @param {Array<MutationRecord|null>|null} mxns
 */


function handler(mxns) {
  for (var x = 0; x < mxns.length; x++) {
    var mxn = mxns[x];

    if (mxn.target === document.documentElement || mxn.target === document.head) {
      continue;
    }

    for (var i = 0; i < mxn.addedNodes.length; i++) {
      var n = mxn.addedNodes[i];

      if (n.nodeType !== Node.ELEMENT_NODE) {
        continue;
      }

      n =
      /** @type {HTMLElement} */
      n; // eslint-disable-line no-self-assign

      var root = n.getRootNode();
      var currentScope = getCurrentScope(n); // node was scoped, but now is in document
      // If this element has built css, we must not remove scoping as this node
      // will be used as a template or style without re - applying scoping as an optimization

      if (currentScope && root === n.ownerDocument && !isElementWithBuiltCss(n)) {
        _style_transformer_js__WEBPACK_IMPORTED_MODULE_1__["default"].domRemoveScope(n, currentScope);
      } else if (root instanceof ShadowRoot) {
        var newScope = getOwnerScope(n); // rescope current node and subtree if necessary

        if (newScope !== currentScope) {
          _style_transformer_js__WEBPACK_IMPORTED_MODULE_1__["default"].domReplaceScope(n, currentScope, newScope);
        } // make sure all the subtree elements are scoped correctly


        ensureCorrectSubtreeScoping(n);
      }
    }
  }
} // if native Shadow DOM is being used, or ShadyDOM handles dynamic scoiping, do not activate the MutationObserver


if (!_style_settings_js__WEBPACK_IMPORTED_MODULE_0__["nativeShadow"] && !(window['ShadyDOM'] && window['ShadyDOM']['handlesDynamicScoping'])) {
  var observer = new MutationObserver(handler);

  var start = node => {
    observer.observe(node, {
      childList: true,
      subtree: true
    });
  };

  var nativeCustomElements = window['customElements'] && !window['customElements']['polyfillWrapFlushCallback']; // need to start immediately with native custom elements
  // TODO(dfreedm): with polyfilled HTMLImports and native custom elements
  // excessive mutations may be observed; this can be optimized via cooperation
  // with the HTMLImports polyfill.

  if (nativeCustomElements) {
    start(document);
  } else {
    var delayedStart = () => {
      start(document.body);
    }; // use polyfill timing if it's available


    if (window['HTMLImports']) {
      window['HTMLImports']['whenReady'](delayedStart); // otherwise push beyond native imports being ready
      // which requires RAF + readystate interactive.
    } else {
      requestAnimationFrame(function () {
        if (document.readyState === 'loading') {
          var listener = function listener() {
            delayedStart();
            document.removeEventListener('readystatechange', listener);
          };

          document.addEventListener('readystatechange', listener);
        } else {
          delayedStart();
        }
      });
    }
  }

  flush = function flush() {
    handler(observer.takeRecords());
  };
}

/***/ }),

/***/ "./node_modules/@webcomponents/shadycss/src/scoping-shim.js":
/*!******************************************************************!*\
  !*** ./node_modules/@webcomponents/shadycss/src/scoping-shim.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ScopingShim; });
/* harmony import */ var _css_parse_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./css-parse.js */ "./node_modules/@webcomponents/shadycss/src/css-parse.js");
/* harmony import */ var _style_settings_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style-settings.js */ "./node_modules/@webcomponents/shadycss/src/style-settings.js");
/* harmony import */ var _style_transformer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./style-transformer.js */ "./node_modules/@webcomponents/shadycss/src/style-transformer.js");
/* harmony import */ var _style_util_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style-util.js */ "./node_modules/@webcomponents/shadycss/src/style-util.js");
/* harmony import */ var _style_properties_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./style-properties.js */ "./node_modules/@webcomponents/shadycss/src/style-properties.js");
/* harmony import */ var _style_placeholder_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./style-placeholder.js */ "./node_modules/@webcomponents/shadycss/src/style-placeholder.js");
/* harmony import */ var _style_info_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./style-info.js */ "./node_modules/@webcomponents/shadycss/src/style-info.js");
/* harmony import */ var _style_cache_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./style-cache.js */ "./node_modules/@webcomponents/shadycss/src/style-cache.js");
/* harmony import */ var _document_watcher_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./document-watcher.js */ "./node_modules/@webcomponents/shadycss/src/document-watcher.js");
/* harmony import */ var _template_map_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./template-map.js */ "./node_modules/@webcomponents/shadycss/src/template-map.js");
/* harmony import */ var _apply_shim_utils_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./apply-shim-utils.js */ "./node_modules/@webcomponents/shadycss/src/apply-shim-utils.js");
/* harmony import */ var _common_utils_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./common-utils.js */ "./node_modules/@webcomponents/shadycss/src/common-utils.js");
/* harmony import */ var _custom_style_interface_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./custom-style-interface.js */ "./node_modules/@webcomponents/shadycss/src/custom-style-interface.js");
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/














 // eslint-disable-line no-unused-vars

/** @type {!Object<string, string>} */

var adoptedCssTextMap = {};
/**
 * @const {StyleCache}
 */

var styleCache = new _style_cache_js__WEBPACK_IMPORTED_MODULE_7__["default"]();
class ScopingShim {
  constructor() {
    this._scopeCounter = {};
    this._documentOwner =
    /** @type {!HTMLElement} */
    document.documentElement;
    var ast = new _css_parse_js__WEBPACK_IMPORTED_MODULE_0__["StyleNode"]();
    ast['rules'] = [];
    this._documentOwnerStyleInfo = _style_info_js__WEBPACK_IMPORTED_MODULE_6__["default"].set(this._documentOwner, new _style_info_js__WEBPACK_IMPORTED_MODULE_6__["default"](ast));
    this._elementsHaveApplied = false;
    /** @type {?Object} */

    this._applyShim = null;
    /** @type {?CustomStyleInterfaceInterface} */

    this._customStyleInterface = null;
  }

  flush() {
    Object(_document_watcher_js__WEBPACK_IMPORTED_MODULE_8__["flush"])();
  }

  _generateScopeSelector(name) {
    var id = this._scopeCounter[name] = (this._scopeCounter[name] || 0) + 1;
    return "".concat(name, "-").concat(id);
  }

  getStyleAst(style) {
    return _style_util_js__WEBPACK_IMPORTED_MODULE_3__["rulesForStyle"](style);
  }

  styleAstToString(ast) {
    return _style_util_js__WEBPACK_IMPORTED_MODULE_3__["toCssText"](ast);
  }

  _gatherStyles(template) {
    return _style_util_js__WEBPACK_IMPORTED_MODULE_3__["gatherStyleText"](template.content);
  }
  /**
   * Prepare the styling and template for the given element type
   *
   * @param {!HTMLTemplateElement} template
   * @param {string} elementName
   * @param {string=} typeExtension
   */


  prepareTemplate(template, elementName, typeExtension) {
    this.prepareTemplateDom(template, elementName);
    this.prepareTemplateStyles(template, elementName, typeExtension);
  }
  /**
   * Prepare styling for the given element type
   * @param {!HTMLTemplateElement} template
   * @param {string} elementName
   * @param {string=} typeExtension
   */


  prepareTemplateStyles(template, elementName, typeExtension) {
    if (template._prepared || _style_settings_js__WEBPACK_IMPORTED_MODULE_1__["disableRuntime"]) {
      return;
    } // style placeholders are only used when ShadyDOM is active


    if (!_style_settings_js__WEBPACK_IMPORTED_MODULE_1__["nativeShadow"]) {
      Object(_style_placeholder_js__WEBPACK_IMPORTED_MODULE_5__["ensureStylePlaceholder"])(elementName);
    }

    template._prepared = true;
    template.name = elementName;
    template.extends = typeExtension;
    _template_map_js__WEBPACK_IMPORTED_MODULE_9__["default"][elementName] = template;
    var cssBuild = _style_util_js__WEBPACK_IMPORTED_MODULE_3__["getCssBuild"](template);
    var optimalBuild = _style_util_js__WEBPACK_IMPORTED_MODULE_3__["isOptimalCssBuild"](cssBuild);
    var info = {
      is: elementName,
      extends: typeExtension
    };
    var cssText = this._gatherStyles(template) + (adoptedCssTextMap[elementName] || ''); // check if the styling has mixin definitions or uses

    this._ensure();

    if (!optimalBuild) {
      var hasMixins = !cssBuild && Object(_common_utils_js__WEBPACK_IMPORTED_MODULE_11__["detectMixin"])(cssText);
      var ast = Object(_css_parse_js__WEBPACK_IMPORTED_MODULE_0__["parse"])(cssText); // only run the applyshim transforms if there is a mixin involved

      if (hasMixins && _style_settings_js__WEBPACK_IMPORTED_MODULE_1__["nativeCssVariables"] && this._applyShim) {
        this._applyShim['transformRules'](ast, elementName);
      }

      template['_styleAst'] = ast;
    }

    var ownPropertyNames = [];

    if (!_style_settings_js__WEBPACK_IMPORTED_MODULE_1__["nativeCssVariables"]) {
      ownPropertyNames = _style_properties_js__WEBPACK_IMPORTED_MODULE_4__["default"].decorateStyles(template['_styleAst']);
    }

    if (!ownPropertyNames.length || _style_settings_js__WEBPACK_IMPORTED_MODULE_1__["nativeCssVariables"]) {
      var root = _style_settings_js__WEBPACK_IMPORTED_MODULE_1__["nativeShadow"] ? template.content : null;
      var placeholder = Object(_style_placeholder_js__WEBPACK_IMPORTED_MODULE_5__["getStylePlaceholder"])(elementName);

      var style = this._generateStaticStyle(info, template['_styleAst'], root, placeholder, cssBuild, optimalBuild ? cssText : '');

      template._style = style;
    }

    template._ownPropertyNames = ownPropertyNames;
  }
  /**
   * @param {!Array<string>} cssTextArray
   * @param {string} elementName
   */


  prepareAdoptedCssText(cssTextArray, elementName) {
    adoptedCssTextMap[elementName] = cssTextArray.join(' ');
  }
  /**
   * Prepare template for the given element type
   * @param {!HTMLTemplateElement} template
   * @param {string} elementName
   */


  prepareTemplateDom(template, elementName) {
    if (_style_settings_js__WEBPACK_IMPORTED_MODULE_1__["disableRuntime"]) {
      return;
    }

    var cssBuild = _style_util_js__WEBPACK_IMPORTED_MODULE_3__["getCssBuild"](template);

    if (!_style_settings_js__WEBPACK_IMPORTED_MODULE_1__["nativeShadow"] && cssBuild !== 'shady' && !template._domPrepared) {
      template._domPrepared = true;
      _style_transformer_js__WEBPACK_IMPORTED_MODULE_2__["default"].domAddScope(template.content, elementName);
    }
  }
  /**
   * @param {!{is: string, extends: (string|undefined)}} info
   * @param {!StyleNode} rules
   * @param {DocumentFragment} shadowroot
   * @param {Node} placeholder
   * @param {string} cssBuild
   * @param {string=} cssText
   * @return {?HTMLStyleElement}
   */


  _generateStaticStyle(info, rules, shadowroot, placeholder, cssBuild, cssText) {
    cssText = _style_transformer_js__WEBPACK_IMPORTED_MODULE_2__["default"].elementStyles(info, rules, null, cssBuild, cssText);

    if (cssText.length) {
      return _style_util_js__WEBPACK_IMPORTED_MODULE_3__["applyCss"](cssText, info.is, shadowroot, placeholder);
    }

    return null;
  }

  _prepareHost(host) {
    var {
      is,
      typeExtension
    } = _style_util_js__WEBPACK_IMPORTED_MODULE_3__["getIsExtends"](host);
    var placeholder = Object(_style_placeholder_js__WEBPACK_IMPORTED_MODULE_5__["getStylePlaceholder"])(is);
    var template = _template_map_js__WEBPACK_IMPORTED_MODULE_9__["default"][is];

    if (!template) {
      return;
    }

    var ast = template['_styleAst'];
    var ownStylePropertyNames = template._ownPropertyNames;
    var cssBuild = _style_util_js__WEBPACK_IMPORTED_MODULE_3__["getCssBuild"](template);
    var styleInfo = new _style_info_js__WEBPACK_IMPORTED_MODULE_6__["default"](ast, placeholder, ownStylePropertyNames, is, typeExtension, cssBuild);
    _style_info_js__WEBPACK_IMPORTED_MODULE_6__["default"].set(host, styleInfo);
    return styleInfo;
  }
  /**
   * Returns a boolean that indicates if styles need to be reprocessed because
   * the apply shim is now available.
   * @return {boolean}
   */


  _ensureApplyShim() {
    if (!this._applyShim && window.ShadyCSS && window.ShadyCSS.ApplyShim) {
      this._applyShim =
      /** @type {!Object} */
      window.ShadyCSS.ApplyShim;
      this._applyShim['invalidCallback'] = _apply_shim_utils_js__WEBPACK_IMPORTED_MODULE_10__["invalidate"];
      return true;
    }

    return false;
  }

  _ensureCustomStyleInterface() {
    if (this._customStyleInterface) {
      return;
    } else if (window.ShadyCSS && window.ShadyCSS.CustomStyleInterface) {
      this._customStyleInterface =
      /** @type {!CustomStyleInterfaceInterface} */
      window.ShadyCSS.CustomStyleInterface;
      /** @type {function(!HTMLStyleElement)} */

      this._customStyleInterface['transformCallback'] = style => {
        this.transformCustomStyleForDocument(style);
      };

      this._customStyleInterface['validateCallback'] = () => {
        requestAnimationFrame(() => {
          if (this._customStyleInterface['enqueued'] || this._elementsHaveApplied) {
            this.flushCustomStyles();
          }
        });
      };
    }
  }
  /**
   * Returns a boolean that indicates if styles need to be reprocessed because
   * the apply shim is now available.
   * @return {boolean}
   */


  _ensure() {
    var needsApplyShimUpdate = this._ensureApplyShim();

    this._ensureCustomStyleInterface();

    return needsApplyShimUpdate;
  }
  /**
   * Flush and apply custom styles to document
   */


  flushCustomStyles() {
    if (_style_settings_js__WEBPACK_IMPORTED_MODULE_1__["disableRuntime"]) {
      return;
    }

    var needsApplyShimUpdate = this._ensure();

    if (!this._customStyleInterface) {
      return;
    }

    var customStyles = this._customStyleInterface['processStyles'](); // early return if custom-styles don't need validation


    if (!needsApplyShimUpdate && !this._customStyleInterface['enqueued']) {
      return;
    } // bail if custom styles are built optimally


    if (_style_util_js__WEBPACK_IMPORTED_MODULE_3__["isOptimalCssBuild"](this._documentOwnerStyleInfo.cssBuild)) {
      return;
    }

    if (!_style_settings_js__WEBPACK_IMPORTED_MODULE_1__["nativeCssVariables"]) {
      this._reorderCustomStylesRules(customStyles);

      this._updateProperties(this._documentOwner, this._documentOwnerStyleInfo);

      this._applyCustomStyles(customStyles);

      if (this._elementsHaveApplied) {
        // if custom elements have upgraded and there are no native css variables, we must recalculate the whole tree
        this.styleDocument();
      }
    } else if (!this._documentOwnerStyleInfo.cssBuild) {
      this._revalidateCustomStyleApplyShim(customStyles);
    }

    this._customStyleInterface['enqueued'] = false;
  }
  /**
   * Reorder of custom styles for Custom Property shim
   * @param {!Array<!CustomStyleProvider>} customStyles
   */


  _reorderCustomStylesRules(customStyles) {
    var styles = customStyles.map(c => this._customStyleInterface['getStyleForCustomStyle'](c)).filter(s => !!s); // sort styles in document order

    styles.sort((a, b) => {
      // use `b.compare(a)` to be more straightforward
      var position = b.compareDocumentPosition(a);

      if (position & Node.DOCUMENT_POSITION_FOLLOWING) {
        // A is after B, A should be higher sorted
        return 1;
      } else if (position & Node.DOCUMENT_POSITION_PRECEDING) {
        // A is before B, A should be lower sorted
        return -1;
      } else {
        return 0;
      }
    }); // sort ast ordering for document

    this._documentOwnerStyleInfo.styleRules['rules'] = styles.map(s => _style_util_js__WEBPACK_IMPORTED_MODULE_3__["rulesForStyle"](s));
  }
  /**
   * Apply styles for the given element
   *
   * @param {!HTMLElement} host
   * @param {Object=} overrideProps
   */


  styleElement(host, overrideProps) {
    if (_style_settings_js__WEBPACK_IMPORTED_MODULE_1__["disableRuntime"]) {
      if (overrideProps) {
        if (!_style_info_js__WEBPACK_IMPORTED_MODULE_6__["default"].get(host)) {
          _style_info_js__WEBPACK_IMPORTED_MODULE_6__["default"].set(host, new _style_info_js__WEBPACK_IMPORTED_MODULE_6__["default"](null));
        }

        var _styleInfo =
        /** @type {!StyleInfo} */
        _style_info_js__WEBPACK_IMPORTED_MODULE_6__["default"].get(host);

        this._mixOverrideStyleProps(_styleInfo, overrideProps);

        this.styleElementNativeVariables(host, _styleInfo);
      }

      return;
    }

    var styleInfo = _style_info_js__WEBPACK_IMPORTED_MODULE_6__["default"].get(host) || this._prepareHost(host); // if there is no style info at this point, bail


    if (!styleInfo) {
      return;
    } // Only trip the `elementsHaveApplied` flag if a node other that the root document has `applyStyle` called


    if (!this._isRootOwner(host)) {
      this._elementsHaveApplied = true;
    }

    if (overrideProps) {
      this._mixOverrideStyleProps(styleInfo, overrideProps);
    }

    if (!_style_settings_js__WEBPACK_IMPORTED_MODULE_1__["nativeCssVariables"]) {
      this.styleElementShimVariables(host, styleInfo);
    } else {
      this.styleElementNativeVariables(host, styleInfo);
    }
  }
  /**
   * @param {!StyleInfo} styleInfo
   * @param {Object} overrideProps
   */


  _mixOverrideStyleProps(styleInfo, overrideProps) {
    styleInfo.overrideStyleProperties = styleInfo.overrideStyleProperties || {};
    Object.assign(styleInfo.overrideStyleProperties, overrideProps);
  }
  /**
   * @param {!HTMLElement} host
   * @param {!StyleInfo} styleInfo
   */


  styleElementShimVariables(host, styleInfo) {
    this.flush();

    this._updateProperties(host, styleInfo);

    if (styleInfo.ownStylePropertyNames && styleInfo.ownStylePropertyNames.length) {
      this._applyStyleProperties(host, styleInfo);
    }
  }
  /**
   * @param {!HTMLElement} host
   * @param {!StyleInfo} styleInfo
   */


  styleElementNativeVariables(host, styleInfo) {
    var {
      is
    } = _style_util_js__WEBPACK_IMPORTED_MODULE_3__["getIsExtends"](host);

    if (styleInfo.overrideStyleProperties) {
      Object(_common_utils_js__WEBPACK_IMPORTED_MODULE_11__["updateNativeProperties"])(host, styleInfo.overrideStyleProperties);
    }

    var template = _template_map_js__WEBPACK_IMPORTED_MODULE_9__["default"][is]; // bail early if there is no shadowroot for this element

    if (!template && !this._isRootOwner(host)) {
      return;
    } // bail early if the template was built with polymer-css-build


    if (template && _style_util_js__WEBPACK_IMPORTED_MODULE_3__["elementHasBuiltCss"](template)) {
      return;
    }

    if (template && template._style && !_apply_shim_utils_js__WEBPACK_IMPORTED_MODULE_10__["templateIsValid"](template)) {
      // update template
      if (!_apply_shim_utils_js__WEBPACK_IMPORTED_MODULE_10__["templateIsValidating"](template)) {
        this._ensure();

        this._applyShim && this._applyShim['transformRules'](template['_styleAst'], is);
        template._style.textContent = _style_transformer_js__WEBPACK_IMPORTED_MODULE_2__["default"].elementStyles(host, styleInfo.styleRules);
        _apply_shim_utils_js__WEBPACK_IMPORTED_MODULE_10__["startValidatingTemplate"](template);
      } // update instance if native shadowdom


      if (_style_settings_js__WEBPACK_IMPORTED_MODULE_1__["nativeShadow"]) {
        var root = host.shadowRoot;

        if (root) {
          var style = root.querySelector('style');

          if (style) {
            style.textContent = _style_transformer_js__WEBPACK_IMPORTED_MODULE_2__["default"].elementStyles(host, styleInfo.styleRules);
          }
        }
      }

      styleInfo.styleRules = template['_styleAst'];
    }
  }

  _styleOwnerForNode(node) {
    var root = _style_util_js__WEBPACK_IMPORTED_MODULE_3__["wrap"](node).getRootNode();
    var host = root.host;

    if (host) {
      if (_style_info_js__WEBPACK_IMPORTED_MODULE_6__["default"].get(host) || this._prepareHost(host)) {
        return host;
      } else {
        return this._styleOwnerForNode(host);
      }
    }

    return this._documentOwner;
  }

  _isRootOwner(node) {
    return node === this._documentOwner;
  }

  _applyStyleProperties(host, styleInfo) {
    var is = _style_util_js__WEBPACK_IMPORTED_MODULE_3__["getIsExtends"](host).is;
    var cacheEntry = styleCache.fetch(is, styleInfo.styleProperties, styleInfo.ownStylePropertyNames);
    var cachedScopeSelector = cacheEntry && cacheEntry.scopeSelector;
    var cachedStyle = cacheEntry ? cacheEntry.styleElement : null;
    var oldScopeSelector = styleInfo.scopeSelector; // only generate new scope if cached style is not found

    styleInfo.scopeSelector = cachedScopeSelector || this._generateScopeSelector(is);
    var style = _style_properties_js__WEBPACK_IMPORTED_MODULE_4__["default"].applyElementStyle(host, styleInfo.styleProperties, styleInfo.scopeSelector, cachedStyle);

    if (!_style_settings_js__WEBPACK_IMPORTED_MODULE_1__["nativeShadow"]) {
      _style_properties_js__WEBPACK_IMPORTED_MODULE_4__["default"].applyElementScopeSelector(host, styleInfo.scopeSelector, oldScopeSelector);
    }

    if (!cacheEntry) {
      styleCache.store(is, styleInfo.styleProperties, style, styleInfo.scopeSelector);
    }

    return style;
  }

  _updateProperties(host, styleInfo) {
    var owner = this._styleOwnerForNode(host);

    var ownerStyleInfo = _style_info_js__WEBPACK_IMPORTED_MODULE_6__["default"].get(owner);
    var ownerProperties = ownerStyleInfo.styleProperties; // style owner has not updated properties yet
    // go up the chain and force property update,
    // except if the owner is the document

    if (owner !== this._documentOwner && !ownerProperties) {
      this._updateProperties(owner, ownerStyleInfo);

      ownerProperties = ownerStyleInfo.styleProperties;
    }

    var props = Object.create(ownerProperties || null);
    var hostAndRootProps = _style_properties_js__WEBPACK_IMPORTED_MODULE_4__["default"].hostAndRootPropertiesForScope(host, styleInfo.styleRules, styleInfo.cssBuild);
    var propertyData = _style_properties_js__WEBPACK_IMPORTED_MODULE_4__["default"].propertyDataFromStyles(ownerStyleInfo.styleRules, host);
    var propertiesMatchingHost = propertyData.properties;
    Object.assign(props, hostAndRootProps.hostProps, propertiesMatchingHost, hostAndRootProps.rootProps);

    this._mixinOverrideStyles(props, styleInfo.overrideStyleProperties);

    _style_properties_js__WEBPACK_IMPORTED_MODULE_4__["default"].reify(props);
    styleInfo.styleProperties = props;
  }

  _mixinOverrideStyles(props, overrides) {
    for (var p in overrides) {
      var v = overrides[p]; // skip override props if they are not truthy or 0
      // in order to fall back to inherited values

      if (v || v === 0) {
        props[p] = v;
      }
    }
  }
  /**
   * Update styles of the whole document
   *
   * @param {Object=} properties
   */


  styleDocument(properties) {
    this.styleSubtree(this._documentOwner, properties);
  }
  /**
   * Update styles of a subtree
   *
   * @param {!HTMLElement} host
   * @param {Object=} properties
   */


  styleSubtree(host, properties) {
    var wrappedHost = _style_util_js__WEBPACK_IMPORTED_MODULE_3__["wrap"](host);
    var root = wrappedHost.shadowRoot;

    var isRootOwner = this._isRootOwner(host);

    if (root || isRootOwner) {
      this.styleElement(host, properties);
    }

    var descendantRoot = isRootOwner ? wrappedHost : root;

    if (descendantRoot) {
      var descendantHosts = Array.from(descendantRoot.querySelectorAll('*')).filter(x => _style_util_js__WEBPACK_IMPORTED_MODULE_3__["wrap"](x).shadowRoot);

      for (var i = 0; i < descendantHosts.length; i++) {
        this.styleSubtree(descendantHosts[i]);
      }
    }
  }
  /* Custom Style operations */


  _revalidateCustomStyleApplyShim(customStyles) {
    for (var i = 0; i < customStyles.length; i++) {
      var c = customStyles[i];

      var s = this._customStyleInterface['getStyleForCustomStyle'](c);

      if (s) {
        this._revalidateApplyShim(s);
      }
    }
  }

  _applyCustomStyles(customStyles) {
    for (var i = 0; i < customStyles.length; i++) {
      var c = customStyles[i];

      var s = this._customStyleInterface['getStyleForCustomStyle'](c);

      if (s) {
        _style_properties_js__WEBPACK_IMPORTED_MODULE_4__["default"].applyCustomStyle(s, this._documentOwnerStyleInfo.styleProperties);
      }
    }
  }

  transformCustomStyleForDocument(style) {
    var cssBuild = _style_util_js__WEBPACK_IMPORTED_MODULE_3__["getCssBuild"](style);

    if (cssBuild !== this._documentOwnerStyleInfo.cssBuild) {
      this._documentOwnerStyleInfo.cssBuild = cssBuild;
    }

    if (_style_util_js__WEBPACK_IMPORTED_MODULE_3__["isOptimalCssBuild"](cssBuild)) {
      return;
    }

    var ast = _style_util_js__WEBPACK_IMPORTED_MODULE_3__["rulesForStyle"](style);
    _style_util_js__WEBPACK_IMPORTED_MODULE_3__["forEachRule"](ast, rule => {
      if (_style_settings_js__WEBPACK_IMPORTED_MODULE_1__["nativeShadow"]) {
        _style_transformer_js__WEBPACK_IMPORTED_MODULE_2__["default"].normalizeRootSelector(rule);
      } else {
        _style_transformer_js__WEBPACK_IMPORTED_MODULE_2__["default"].documentRule(rule);
      }

      if (_style_settings_js__WEBPACK_IMPORTED_MODULE_1__["nativeCssVariables"] && cssBuild === '') {
        this._ensure();

        this._applyShim && this._applyShim['transformRule'](rule);
      }
    });

    if (_style_settings_js__WEBPACK_IMPORTED_MODULE_1__["nativeCssVariables"]) {
      style.textContent = _style_util_js__WEBPACK_IMPORTED_MODULE_3__["toCssText"](ast);
    } else {
      this._documentOwnerStyleInfo.styleRules['rules'].push(ast);
    }
  }

  _revalidateApplyShim(style) {
    if (_style_settings_js__WEBPACK_IMPORTED_MODULE_1__["nativeCssVariables"] && this._applyShim) {
      var ast = _style_util_js__WEBPACK_IMPORTED_MODULE_3__["rulesForStyle"](style);

      this._ensure();

      this._applyShim['transformRules'](ast);

      style.textContent = _style_util_js__WEBPACK_IMPORTED_MODULE_3__["toCssText"](ast);
    }
  }

  getComputedStyleValue(element, property) {
    var value;

    if (!_style_settings_js__WEBPACK_IMPORTED_MODULE_1__["nativeCssVariables"]) {
      // element is either a style host, or an ancestor of a style host
      var styleInfo = _style_info_js__WEBPACK_IMPORTED_MODULE_6__["default"].get(element) || _style_info_js__WEBPACK_IMPORTED_MODULE_6__["default"].get(this._styleOwnerForNode(element));
      value = styleInfo.styleProperties[property];
    } // fall back to the property value from the computed styling


    value = value || window.getComputedStyle(element).getPropertyValue(property); // trim whitespace that can come after the `:` in css
    // example: padding: 2px -> " 2px"

    return value ? value.trim() : '';
  } // given an element and a classString, replaces
  // the element's class with the provided classString and adds
  // any necessary ShadyCSS static and property based scoping selectors


  setElementClass(element, classString) {
    var root = _style_util_js__WEBPACK_IMPORTED_MODULE_3__["wrap"](element).getRootNode();
    var classes;

    if (classString) {
      var definitelyString = typeof classString === 'string' ? classString : String(classString);
      classes = definitelyString.split(/\s/);
    } else {
      classes = [];
    }

    var scopeName = root.host && root.host.localName; // If no scope, try to discover scope name from existing class.
    // This can occur if, for example, a template stamped element that
    // has been scoped is manipulated when not in a root.

    if (!scopeName) {
      var classAttr = element.getAttribute('class');

      if (classAttr) {
        var k$ = classAttr.split(/\s/);

        for (var i = 0; i < k$.length; i++) {
          if (k$[i] === _style_transformer_js__WEBPACK_IMPORTED_MODULE_2__["default"].SCOPE_NAME) {
            scopeName = k$[i + 1];
            break;
          }
        }
      }
    }

    if (scopeName) {
      classes.push(_style_transformer_js__WEBPACK_IMPORTED_MODULE_2__["default"].SCOPE_NAME, scopeName);
    }

    if (!_style_settings_js__WEBPACK_IMPORTED_MODULE_1__["nativeCssVariables"]) {
      var styleInfo = _style_info_js__WEBPACK_IMPORTED_MODULE_6__["default"].get(element);

      if (styleInfo && styleInfo.scopeSelector) {
        classes.push(_style_properties_js__WEBPACK_IMPORTED_MODULE_4__["default"].XSCOPE_NAME, styleInfo.scopeSelector);
      }
    }

    _style_util_js__WEBPACK_IMPORTED_MODULE_3__["setElementClassRaw"](element, classes.join(' '));
  }

  _styleInfoForNode(node) {
    return _style_info_js__WEBPACK_IMPORTED_MODULE_6__["default"].get(node);
  }
  /**
   * @param {!Element} node
   * @param {string} scope
   */


  scopeNode(node, scope) {
    _style_transformer_js__WEBPACK_IMPORTED_MODULE_2__["default"].element(node, scope);
  }
  /**
   * @param {!Element} node
   * @param {string} scope
   */


  unscopeNode(node, scope) {
    _style_transformer_js__WEBPACK_IMPORTED_MODULE_2__["default"].element(node, scope, true);
  }
  /**
   * @param {!Node} node
   * @return {string}
   */


  scopeForNode(node) {
    return Object(_document_watcher_js__WEBPACK_IMPORTED_MODULE_8__["getOwnerScope"])(node);
  }
  /**
   * @param {!Element} node
   * @return {string}
   */


  currentScopeForNode(node) {
    return Object(_document_watcher_js__WEBPACK_IMPORTED_MODULE_8__["getCurrentScope"])(node);
  }

}
/* exports */

/* eslint-disable no-self-assign */

ScopingShim.prototype['flush'] = ScopingShim.prototype.flush;
ScopingShim.prototype['prepareTemplate'] = ScopingShim.prototype.prepareTemplate;
ScopingShim.prototype['styleElement'] = ScopingShim.prototype.styleElement;
ScopingShim.prototype['styleDocument'] = ScopingShim.prototype.styleDocument;
ScopingShim.prototype['styleSubtree'] = ScopingShim.prototype.styleSubtree;
ScopingShim.prototype['getComputedStyleValue'] = ScopingShim.prototype.getComputedStyleValue;
ScopingShim.prototype['setElementClass'] = ScopingShim.prototype.setElementClass;
ScopingShim.prototype['_styleInfoForNode'] = ScopingShim.prototype._styleInfoForNode;
ScopingShim.prototype['transformCustomStyleForDocument'] = ScopingShim.prototype.transformCustomStyleForDocument;
ScopingShim.prototype['getStyleAst'] = ScopingShim.prototype.getStyleAst;
ScopingShim.prototype['styleAstToString'] = ScopingShim.prototype.styleAstToString;
ScopingShim.prototype['flushCustomStyles'] = ScopingShim.prototype.flushCustomStyles;
ScopingShim.prototype['scopeNode'] = ScopingShim.prototype.scopeNode;
ScopingShim.prototype['unscopeNode'] = ScopingShim.prototype.unscopeNode;
ScopingShim.prototype['scopeForNode'] = ScopingShim.prototype.scopeForNode;
ScopingShim.prototype['currentScopeForNode'] = ScopingShim.prototype.currentScopeForNode;
ScopingShim.prototype['prepareAdoptedCssText'] = ScopingShim.prototype.prepareAdoptedCssText;
/* eslint-enable no-self-assign */

Object.defineProperties(ScopingShim.prototype, {
  'nativeShadow': {
    get() {
      return _style_settings_js__WEBPACK_IMPORTED_MODULE_1__["nativeShadow"];
    }

  },
  'nativeCss': {
    get() {
      return _style_settings_js__WEBPACK_IMPORTED_MODULE_1__["nativeCssVariables"];
    }

  }
});

/***/ }),

/***/ "./node_modules/@webcomponents/shadycss/src/style-cache.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@webcomponents/shadycss/src/style-cache.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return StyleCache; });
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/


class StyleCache {
  constructor() {
    var typeMax = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;
    // map element name -> [{properties, styleElement, scopeSelector}]
    this.cache = {};
    /** @type {number} */

    this.typeMax = typeMax;
  }

  _validate(cacheEntry, properties, ownPropertyNames) {
    for (var idx = 0; idx < ownPropertyNames.length; idx++) {
      var pn = ownPropertyNames[idx];

      if (cacheEntry.properties[pn] !== properties[pn]) {
        return false;
      }
    }

    return true;
  }

  store(tagname, properties, styleElement, scopeSelector) {
    var list = this.cache[tagname] || [];
    list.push({
      properties,
      styleElement,
      scopeSelector
    });

    if (list.length > this.typeMax) {
      list.shift();
    }

    this.cache[tagname] = list;
  }

  fetch(tagname, properties, ownPropertyNames) {
    var list = this.cache[tagname];

    if (!list) {
      return;
    } // reverse list for most-recent lookups


    for (var idx = list.length - 1; idx >= 0; idx--) {
      var entry = list[idx];

      if (this._validate(entry, properties, ownPropertyNames)) {
        return entry;
      }
    }
  }

}

/***/ }),

/***/ "./node_modules/@webcomponents/shadycss/src/style-info.js":
/*!****************************************************************!*\
  !*** ./node_modules/@webcomponents/shadycss/src/style-info.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return StyleInfo; });
/* harmony import */ var _css_parse_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./css-parse.js */ "./node_modules/@webcomponents/shadycss/src/css-parse.js");
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/


 // eslint-disable-line no-unused-vars

/** @const {string} */

var infoKey = '__styleInfo';
class StyleInfo {
  /**
   * @param {Element} node
   * @return {StyleInfo}
   */
  static get(node) {
    if (node) {
      return node[infoKey];
    } else {
      return null;
    }
  }
  /**
   * @param {!Element} node
   * @param {StyleInfo} styleInfo
   * @return {StyleInfo}
   */


  static set(node, styleInfo) {
    node[infoKey] = styleInfo;
    return styleInfo;
  }
  /**
   * @param {StyleNode} ast
   * @param {Node=} placeholder
   * @param {Array<string>=} ownStylePropertyNames
   * @param {string=} elementName
   * @param {string=} typeExtension
   * @param {string=} cssBuild
   */


  constructor(ast, placeholder, ownStylePropertyNames, elementName, typeExtension, cssBuild) {
    /** @type {StyleNode} */
    this.styleRules = ast || null;
    /** @type {Node} */

    this.placeholder = placeholder || null;
    /** @type {!Array<string>} */

    this.ownStylePropertyNames = ownStylePropertyNames || [];
    /** @type {Object} */

    this.overrideStyleProperties = null;
    /** @type {string} */

    this.elementName = elementName || '';
    /** @type {string} */

    this.cssBuild = cssBuild || '';
    /** @type {string} */

    this.typeExtension = typeExtension || '';
    /** @type {Object<string, string>} */

    this.styleProperties = null;
    /** @type {?string} */

    this.scopeSelector = null;
    /** @type {HTMLStyleElement} */

    this.customStyle = null;
  }

  _getStyleRules() {
    return this.styleRules;
  }

}
/* eslint-disable-next-line no-self-assign */

StyleInfo.prototype['_getStyleRules'] = StyleInfo.prototype._getStyleRules;

/***/ }),

/***/ "./node_modules/@webcomponents/shadycss/src/style-placeholder.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@webcomponents/shadycss/src/style-placeholder.js ***!
  \***********************************************************************/
/*! exports provided: getStylePlaceholder, ensureStylePlaceholder */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStylePlaceholder", function() { return getStylePlaceholder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ensureStylePlaceholder", function() { return ensureStylePlaceholder; });
/* harmony import */ var _style_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style-util.js */ "./node_modules/@webcomponents/shadycss/src/style-util.js");
/* harmony import */ var _style_settings_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style-settings.js */ "./node_modules/@webcomponents/shadycss/src/style-settings.js");
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/




/** @type {!Object<string, !Node>} */

var placeholderMap = {};
/**
 * @param {string} elementName
 * @return {Node}
 */

function getStylePlaceholder(elementName) {
  return placeholderMap[elementName] || null;
}
/**
 * @param {string} elementName
 */

function ensureStylePlaceholder(elementName) {
  if (!placeholderMap[elementName]) {
    placeholderMap[elementName] = Object(_style_util_js__WEBPACK_IMPORTED_MODULE_0__["applyStylePlaceHolder"])(elementName);
  }
}
/**
 * @const {CustomElementRegistry}
 */

var ce = window['customElements'];

if (ce && !_style_settings_js__WEBPACK_IMPORTED_MODULE_1__["nativeShadow"] && !_style_settings_js__WEBPACK_IMPORTED_MODULE_1__["disableRuntime"]) {
  /**
   * @const {function(this:CustomElementRegistry, string,function(new:HTMLElement),{extends: string}=)}
   */
  var origDefine = ce['define'];
  /**
   * @param {string} name
   * @param {function(new:HTMLElement)} clazz
   * @param {{extends: string}=} options
   */

  var wrappedDefine = (name, clazz, options) => {
    ensureStylePlaceholder(name);
    origDefine.call(
    /** @type {!CustomElementRegistry} */
    ce, name, clazz, options);
  };

  ce['define'] = wrappedDefine;
}

/***/ }),

/***/ "./node_modules/@webcomponents/shadycss/src/style-properties.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@webcomponents/shadycss/src/style-properties.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_parse_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./css-parse.js */ "./node_modules/@webcomponents/shadycss/src/css-parse.js");
/* harmony import */ var _style_settings_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style-settings.js */ "./node_modules/@webcomponents/shadycss/src/style-settings.js");
/* harmony import */ var _style_transformer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./style-transformer.js */ "./node_modules/@webcomponents/shadycss/src/style-transformer.js");
/* harmony import */ var _style_util_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style-util.js */ "./node_modules/@webcomponents/shadycss/src/style-util.js");
/* harmony import */ var _common_regex_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./common-regex.js */ "./node_modules/@webcomponents/shadycss/src/common-regex.js");
/* harmony import */ var _style_info_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./style-info.js */ "./node_modules/@webcomponents/shadycss/src/style-info.js");
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/


 // eslint-disable-line no-unused-vars





 // TODO: dedupe with shady

/**
 * @param {string} selector
 * @return {boolean}
 * @this {Element}
 */

var matchesSelector = function matchesSelector(selector) {
  var method = this.matches || this.matchesSelector || this.mozMatchesSelector || this.msMatchesSelector || this.oMatchesSelector || this.webkitMatchesSelector;
  return method && method.call(this, selector);
};

var rootSelector = /:host\s*>\s*/;

function checkRoot(hostScope, selector) {
  return Boolean(selector.match(rootSelector)) || hostScope === 'html' && selector.indexOf('html') > -1;
}

var IS_IE = navigator.userAgent.match('Trident');
var XSCOPE_NAME = 'x-scope';

class StyleProperties {
  /** @return {string} */
  get XSCOPE_NAME() {
    return XSCOPE_NAME;
  }
  /**
   * decorates styles with rule info and returns an array of used style property names
   *
   * @param {StyleNode} rules
   * @return {!Array<string>}
   */


  decorateStyles(rules) {
    var self = this,
        props = {},
        keyframes = [],
        ruleIndex = 0;
    _style_util_js__WEBPACK_IMPORTED_MODULE_3__["forEachRule"](rules, function (rule) {
      self.decorateRule(rule); // mark in-order position of ast rule in styles block, used for cache key

      rule.index = ruleIndex++;
      self.collectPropertiesInCssText(rule.propertyInfo.cssText, props);
    }, function onKeyframesRule(rule) {
      keyframes.push(rule);
    }); // Cache all found keyframes rules for later reference:

    rules._keyframes = keyframes; // return this list of property names *consumes* in these styles.

    var names = [];

    for (var i in props) {
      names.push(i);
    }

    return names;
  } // decorate a single rule with property info


  decorateRule(rule) {
    if (rule.propertyInfo) {
      return rule.propertyInfo;
    }

    var info = {},
        properties = {};
    var hasProperties = this.collectProperties(rule, properties);

    if (hasProperties) {
      info.properties = properties; // TODO(sorvell): workaround parser seeing mixins as additional rules

      rule['rules'] = null;
    }

    info.cssText = this.collectCssText(rule);
    rule.propertyInfo = info;
    return info;
  } // collects the custom properties from a rule's cssText


  collectProperties(rule, properties) {
    var info = rule.propertyInfo;

    if (info) {
      if (info.properties) {
        Object.assign(properties, info.properties);
        return true;
      }
    } else {
      var m,
          rx = _common_regex_js__WEBPACK_IMPORTED_MODULE_4__["VAR_ASSIGN"];
      var cssText = rule['parsedCssText'];
      var value;
      var any;

      while (m = rx.exec(cssText)) {
        // note: group 2 is var, 3 is mixin
        value = (m[2] || m[3]).trim(); // value of 'inherit' or 'unset' is equivalent to not setting the property here

        if (value !== 'inherit' || value !== 'unset') {
          properties[m[1].trim()] = value;
        }

        any = true;
      }

      return any;
    }
  } // returns cssText of properties that consume variables/mixins


  collectCssText(rule) {
    return this.collectConsumingCssText(rule['parsedCssText']);
  } // NOTE: we support consumption inside mixin assignment
  // but not production, so strip out {...}


  collectConsumingCssText(cssText) {
    return cssText.replace(_common_regex_js__WEBPACK_IMPORTED_MODULE_4__["BRACKETED"], '').replace(_common_regex_js__WEBPACK_IMPORTED_MODULE_4__["VAR_ASSIGN"], '');
  }

  collectPropertiesInCssText(cssText, props) {
    var m;

    while (m = _common_regex_js__WEBPACK_IMPORTED_MODULE_4__["VAR_CONSUMED"].exec(cssText)) {
      var name = m[1]; // This regex catches all variable names, and following non-whitespace char
      // If next char is not ':', then variable is a consumer

      if (m[2] !== ':') {
        props[name] = true;
      }
    }
  } // turns custom properties into realized values.


  reify(props) {
    // big perf optimization here: reify only *own* properties
    // since this object has __proto__ of the element's scope properties
    var names = Object.getOwnPropertyNames(props);

    for (var i = 0, n; i < names.length; i++) {
      n = names[i];
      props[n] = this.valueForProperty(props[n], props);
    }
  } // given a property value, returns the reified value
  // a property value may be:
  // (1) a literal value like: red or 5px;
  // (2) a variable value like: var(--a), var(--a, red), or var(--a, --b) or
  // var(--a, var(--b));
  // (3) a literal mixin value like { properties }. Each of these properties
  // can have values that are: (a) literal, (b) variables, (c) @apply mixins.


  valueForProperty(property, props) {
    // case (1) default
    // case (3) defines a mixin and we have to reify the internals
    if (property) {
      if (property.indexOf(';') >= 0) {
        property = this.valueForProperties(property, props);
      } else {
        // case (2) variable
        var self = this;

        var fn = function fn(prefix, value, fallback, suffix) {
          if (!value) {
            return prefix + suffix;
          }

          var propertyValue = self.valueForProperty(props[value], props); // if value is "initial", then the variable should be treated as unset

          if (!propertyValue || propertyValue === 'initial') {
            // fallback may be --a or var(--a) or literal
            propertyValue = self.valueForProperty(props[fallback] || fallback, props) || fallback;
          } else if (propertyValue === 'apply-shim-inherit') {
            // CSS build will replace `inherit` with `apply-shim-inherit`
            // for use with native css variables.
            // Since we have full control, we can use `inherit` directly.
            propertyValue = 'inherit';
          }

          return prefix + (propertyValue || '') + suffix;
        };

        property = _style_util_js__WEBPACK_IMPORTED_MODULE_3__["processVariableAndFallback"](property, fn);
      }
    }

    return property && property.trim() || '';
  } // note: we do not yet support mixin within mixin


  valueForProperties(property, props) {
    var parts = property.split(';');

    for (var i = 0, p, m; i < parts.length; i++) {
      if (p = parts[i]) {
        _common_regex_js__WEBPACK_IMPORTED_MODULE_4__["MIXIN_MATCH"].lastIndex = 0;
        m = _common_regex_js__WEBPACK_IMPORTED_MODULE_4__["MIXIN_MATCH"].exec(p);

        if (m) {
          p = this.valueForProperty(props[m[1]], props);
        } else {
          var colon = p.indexOf(':');

          if (colon !== -1) {
            var pp = p.substring(colon);
            pp = pp.trim();
            pp = this.valueForProperty(pp, props) || pp;
            p = p.substring(0, colon) + pp;
          }
        }

        parts[i] = p && p.lastIndexOf(';') === p.length - 1 ? // strip trailing ;
        p.slice(0, -1) : p || '';
      }
    }

    return parts.join(';');
  }

  applyProperties(rule, props) {
    var output = ''; // dynamically added sheets may not be decorated so ensure they are.

    if (!rule.propertyInfo) {
      this.decorateRule(rule);
    }

    if (rule.propertyInfo.cssText) {
      output = this.valueForProperties(rule.propertyInfo.cssText, props);
    }

    rule['cssText'] = output;
  } // Apply keyframe transformations to the cssText of a given rule. The
  // keyframeTransforms object is a map of keyframe names to transformer
  // functions which take in cssText and spit out transformed cssText.


  applyKeyframeTransforms(rule, keyframeTransforms) {
    var input = rule['cssText'];
    var output = rule['cssText'];

    if (rule.hasAnimations == null) {
      // Cache whether or not the rule has any animations to begin with:
      rule.hasAnimations = _common_regex_js__WEBPACK_IMPORTED_MODULE_4__["ANIMATION_MATCH"].test(input);
    } // If there are no animations referenced, we can skip transforms:


    if (rule.hasAnimations) {
      var transform; // If we haven't transformed this rule before, we iterate over all
      // transforms:

      if (rule.keyframeNamesToTransform == null) {
        rule.keyframeNamesToTransform = [];

        for (var keyframe in keyframeTransforms) {
          transform = keyframeTransforms[keyframe];
          output = transform(input); // If the transform actually changed the CSS text, we cache the
          // transform name for future use:

          if (input !== output) {
            input = output;
            rule.keyframeNamesToTransform.push(keyframe);
          }
        }
      } else {
        // If we already have a list of keyframe names that apply to this
        // rule, we apply only those keyframe name transforms:
        for (var i = 0; i < rule.keyframeNamesToTransform.length; ++i) {
          transform = keyframeTransforms[rule.keyframeNamesToTransform[i]];
          input = transform(input);
        }

        output = input;
      }
    }

    rule['cssText'] = output;
  } // Test if the rules in these styles matches the given `element` and if so,
  // collect any custom properties into `props`.

  /**
   * @param {StyleNode} rules
   * @param {Element} element
   */


  propertyDataFromStyles(rules, element) {
    var props = {}; // generates a unique key for these matches

    var o = []; // note: active rules excludes non-matching @media rules

    _style_util_js__WEBPACK_IMPORTED_MODULE_3__["forEachRule"](rules, rule => {
      // TODO(sorvell): we could trim the set of rules at declaration
      // time to only include ones that have properties
      if (!rule.propertyInfo) {
        this.decorateRule(rule);
      } // match element against transformedSelector: selector may contain
      // unwanted uniquification and parsedSelector does not directly match
      // for :host selectors.


      var selectorToMatch = rule.transformedSelector || rule['parsedSelector'];

      if (element && rule.propertyInfo.properties && selectorToMatch) {
        if (matchesSelector.call(element, selectorToMatch)) {
          this.collectProperties(rule, props); // produce numeric key for these matches for lookup

          addToBitMask(rule.index, o);
        }
      }
    }, null, true);
    return {
      properties: props,
      key: o
    };
  }
  /**
   * @param {Element} scope
   * @param {StyleNode} rule
   * @param {string} cssBuild
   * @param {function(Object)} callback
   */


  whenHostOrRootRule(scope, rule, cssBuild, callback) {
    if (!
    /** @type {?} */
    rule.propertyInfo) {
      this.decorateRule(rule);
    }

    if (!
    /** @type {?} */
    rule.propertyInfo.properties) {
      return;
    }

    var {
      is,
      typeExtension
    } = _style_util_js__WEBPACK_IMPORTED_MODULE_3__["getIsExtends"](scope);
    var hostScope = is ? _style_transformer_js__WEBPACK_IMPORTED_MODULE_2__["default"]._calcHostScope(is, typeExtension) : 'html';
    var parsedSelector = rule['parsedSelector'];
    var isRoot = checkRoot(hostScope, parsedSelector);
    var isHost = parsedSelector.indexOf(':host') === 0 && !isRoot; // build info is either in scope (when scope is an element) or in the style
    // when scope is the default scope; note: this allows default scope to have
    // mixed mode built and unbuilt styles.

    if (cssBuild === 'shady') {
      // :root -> x-foo > *.x-foo for elements and html for custom-style
      isRoot = parsedSelector === hostScope + ' > *.' + hostScope || parsedSelector.indexOf('html') !== -1; // :host -> x-foo for elements, but sub-rules have .x-foo in them

      isHost = !isRoot && parsedSelector.indexOf(hostScope) === 0;
    }

    if (!isRoot && !isHost) {
      return;
    }

    var selectorToMatch = hostScope;

    if (isHost) {
      // need to transform :host because `:host` does not work with `matches`
      if (!
      /** @type {?} */
      rule.transformedSelector) {
        // transform :host into a matchable selector
        rule.transformedSelector = _style_transformer_js__WEBPACK_IMPORTED_MODULE_2__["default"]._transformRuleCss(rule, _style_transformer_js__WEBPACK_IMPORTED_MODULE_2__["default"]._transformComplexSelector, _style_transformer_js__WEBPACK_IMPORTED_MODULE_2__["default"]._calcElementScope(is), hostScope);
      }

      selectorToMatch =
      /** @type {?} */
      rule.transformedSelector || hostScope;
    }

    if (isRoot && hostScope === 'html') {
      selectorToMatch =
      /** @type {?} */
      rule.transformedSelector ||
      /** @type {?} */
      rule.parsedSelector;
    }

    callback({
      selector: selectorToMatch,
      isHost: isHost,
      isRoot: isRoot
    });
  }
  /**
   * @param {Element} scope
   * @param {StyleNode} rules
   * @param {string} cssBuild
   * @return {!Object}
   */


  hostAndRootPropertiesForScope(scope, rules, cssBuild) {
    var hostProps = {},
        rootProps = {}; // note: active rules excludes non-matching @media rules

    _style_util_js__WEBPACK_IMPORTED_MODULE_3__["forEachRule"](rules, rule => {
      // if scope is StyleDefaults, use _element for matchesSelector
      this.whenHostOrRootRule(scope, rule, cssBuild, info => {
        var element = scope._element || scope;

        if (matchesSelector.call(element, info.selector)) {
          if (info.isHost) {
            this.collectProperties(rule, hostProps);
          } else {
            this.collectProperties(rule, rootProps);
          }
        }
      });
    }, null, true);
    return {
      rootProps: rootProps,
      hostProps: hostProps
    };
  }
  /**
   * @param {Element} element
   * @param {Object} properties
   * @param {string} scopeSelector
   */


  transformStyles(element, properties, scopeSelector) {
    var self = this;
    var {
      is,
      typeExtension
    } = _style_util_js__WEBPACK_IMPORTED_MODULE_3__["getIsExtends"](element);

    var hostSelector = _style_transformer_js__WEBPACK_IMPORTED_MODULE_2__["default"]._calcHostScope(is, typeExtension);

    var rxHostSelector = element.extends ? '\\' + hostSelector.slice(0, -1) + '\\]' : hostSelector;
    var hostRx = new RegExp(_common_regex_js__WEBPACK_IMPORTED_MODULE_4__["HOST_PREFIX"] + rxHostSelector + _common_regex_js__WEBPACK_IMPORTED_MODULE_4__["HOST_SUFFIX"]);
    var {
      styleRules: rules,
      cssBuild
    } = _style_info_js__WEBPACK_IMPORTED_MODULE_5__["default"].get(element);

    var keyframeTransforms = this._elementKeyframeTransforms(element, rules, scopeSelector);

    return _style_transformer_js__WEBPACK_IMPORTED_MODULE_2__["default"].elementStyles(element, rules, function (rule) {
      self.applyProperties(rule, properties);

      if (!_style_settings_js__WEBPACK_IMPORTED_MODULE_1__["nativeShadow"] && !_style_util_js__WEBPACK_IMPORTED_MODULE_3__["isKeyframesSelector"](rule) && rule['cssText']) {
        // NOTE: keyframe transforms only scope munge animation names, so it
        // is not necessary to apply them in ShadowDOM.
        self.applyKeyframeTransforms(rule, keyframeTransforms);

        self._scopeSelector(rule, hostRx, hostSelector, scopeSelector);
      }
    }, cssBuild);
  }
  /**
   * @param {Element} element
   * @param {StyleNode} rules
   * @param {string} scopeSelector
   * @return {!Object}
   */


  _elementKeyframeTransforms(element, rules, scopeSelector) {
    var keyframesRules = rules._keyframes;
    var keyframeTransforms = {};

    if (!_style_settings_js__WEBPACK_IMPORTED_MODULE_1__["nativeShadow"] && keyframesRules) {
      // For non-ShadowDOM, we transform all known keyframes rules in
      // advance for the current scope. This allows us to catch keyframes
      // rules that appear anywhere in the stylesheet:
      for (var i = 0, keyframesRule = keyframesRules[i]; i < keyframesRules.length; keyframesRule = keyframesRules[++i]) {
        this._scopeKeyframes(keyframesRule, scopeSelector);

        keyframeTransforms[keyframesRule['keyframesName']] = this._keyframesRuleTransformer(keyframesRule);
      }
    }

    return keyframeTransforms;
  } // Generate a factory for transforming a chunk of CSS text to handle a
  // particular scoped keyframes rule.

  /**
   * @param {StyleNode} keyframesRule
   * @return {function(string):string}
   */


  _keyframesRuleTransformer(keyframesRule) {
    return function (cssText) {
      return cssText.replace(
      /** @type {?} */
      keyframesRule.keyframesNameRx,
      /** @type {?} */
      keyframesRule.transformedKeyframesName);
    };
  }
  /**
   * Transforms `@keyframes` names to be unique for the current host.
   * Example: @keyframes foo-anim -> @keyframes foo-anim-x-foo-0
   *
   * @param {StyleNode} rule
   * @param {string} scopeId
   */


  _scopeKeyframes(rule, scopeId) {
    // Animation names are of the form [\w-], so ensure that the name regex does not partially apply
    // to similarly named keyframe names by checking for a word boundary at the beginning and
    // a non-word boundary or `-` at the end.
    rule.keyframesNameRx = new RegExp("\\b".concat(rule['keyframesName'], "(?!\\B|-)"), 'g');
    rule.transformedKeyframesName = rule['keyframesName'] + '-' + scopeId;
    rule.transformedSelector =
    /** @type {?} */
    rule.transformedSelector || rule['selector'];
    rule['selector'] =
    /** @type {?} */
    rule.transformedSelector.replace(rule['keyframesName'], rule.transformedKeyframesName);
  } // Strategy: x scope shim a selector e.g. to scope `.x-foo-42` (via classes):
  // non-host selector: .a.x-foo -> .x-foo-42 .a.x-foo
  // host selector: x-foo.wide -> .x-foo-42.wide
  // note: we use only the scope class (.x-foo-42) and not the hostSelector
  // (x-foo) to scope :host rules; this helps make property host rules
  // have low specificity. They are overrideable by class selectors but,
  // unfortunately, not by type selectors (e.g. overriding via
  // `.special` is ok, but not by `x-foo`).

  /**
   * @param {StyleNode} rule
   * @param {RegExp} hostRx
   * @param {string} hostSelector
   * @param {string} scopeId
   */


  _scopeSelector(rule, hostRx, hostSelector, scopeId) {
    rule.transformedSelector =
    /** @type {?} */
    rule.transformedSelector || rule['selector'];
    var selector = rule.transformedSelector;
    var scope = '.' + scopeId;
    var parts = _style_util_js__WEBPACK_IMPORTED_MODULE_3__["splitSelectorList"](selector);

    for (var i = 0, l = parts.length, p; i < l && (p = parts[i]); i++) {
      parts[i] = p.match(hostRx) ? p.replace(hostSelector, scope) : scope + ' ' + p;
    }

    rule['selector'] = parts.join(',');
  }
  /**
   * @param {Element} element
   * @param {string} selector
   * @param {string} old
   */


  applyElementScopeSelector(element, selector, old) {
    var c = element.getAttribute('class') || '';
    var v = c;

    if (old) {
      v = c.replace(new RegExp('\\s*' + XSCOPE_NAME + '\\s*' + old + '\\s*', 'g'), ' ');
    }

    v += (v ? ' ' : '') + XSCOPE_NAME + ' ' + selector;

    if (c !== v) {
      _style_util_js__WEBPACK_IMPORTED_MODULE_3__["setElementClassRaw"](element, v);
    }
  }
  /**
   * @param {HTMLElement} element
   * @param {Object} properties
   * @param {string} selector
   * @param {HTMLStyleElement} style
   * @return {HTMLStyleElement}
   */


  applyElementStyle(element, properties, selector, style) {
    // calculate cssText to apply
    var cssText = style ? style.textContent || '' : this.transformStyles(element, properties, selector); // if shady and we have a cached style that is not style, decrement

    var styleInfo = _style_info_js__WEBPACK_IMPORTED_MODULE_5__["default"].get(element);
    var s = styleInfo.customStyle;

    if (s && !_style_settings_js__WEBPACK_IMPORTED_MODULE_1__["nativeShadow"] && s !== style) {
      s['_useCount']--;

      if (s['_useCount'] <= 0 && s.parentNode) {
        s.parentNode.removeChild(s);
      }
    } // apply styling always under native or if we generated style
    // or the cached style is not in document(!)


    if (_style_settings_js__WEBPACK_IMPORTED_MODULE_1__["nativeShadow"]) {
      // update existing style only under native
      if (styleInfo.customStyle) {
        styleInfo.customStyle.textContent = cssText;
        style = styleInfo.customStyle; // otherwise, if we have css to apply, do so
      } else if (cssText) {
        // apply css after the scope style of the element to help with
        // style precedence rules.
        style = _style_util_js__WEBPACK_IMPORTED_MODULE_3__["applyCss"](cssText, selector, element.shadowRoot, styleInfo.placeholder);
      }
    } else {
      // shady and no cache hit
      if (!style) {
        // apply css after the scope style of the element to help with
        // style precedence rules.
        if (cssText) {
          style = _style_util_js__WEBPACK_IMPORTED_MODULE_3__["applyCss"](cssText, selector, null, styleInfo.placeholder);
        } // shady and cache hit but not in document

      } else if (!style.parentNode) {
        if (IS_IE && cssText.indexOf('@media') > -1) {
          // @media rules may be stale in IE 10 and 11
          // refresh the text content of the style to revalidate them.
          style.textContent = cssText;
        }

        _style_util_js__WEBPACK_IMPORTED_MODULE_3__["applyStyle"](style, null, styleInfo.placeholder);
      }
    } // ensure this style is our custom style and increment its use count.


    if (style) {
      style['_useCount'] = style['_useCount'] || 0; // increment use count if we changed styles

      if (styleInfo.customStyle != style) {
        style['_useCount']++;
      }

      styleInfo.customStyle = style;
    }

    return style;
  }
  /**
   * @param {Element} style
   * @param {Object} properties
   */


  applyCustomStyle(style, properties) {
    var rules = _style_util_js__WEBPACK_IMPORTED_MODULE_3__["rulesForStyle"](
    /** @type {HTMLStyleElement} */
    style);
    var self = this;
    style.textContent = _style_util_js__WEBPACK_IMPORTED_MODULE_3__["toCssText"](rules, function (
    /** StyleNode */
    rule) {
      var css = rule['cssText'] = rule['parsedCssText'];

      if (
      /** @type {?} */
      rule.propertyInfo &&
      /** @type {?} */
      rule.propertyInfo.cssText) {
        // remove property assignments
        // so next function isn't confused
        // NOTE: we have 3 categories of css:
        // (1) normal properties,
        // (2) custom property assignments (--foo: red;),
        // (3) custom property usage: border: var(--foo); @apply(--foo);
        // In elements, 1 and 3 are separated for efficiency; here they
        // are not and this makes this case unique.
        css = Object(_css_parse_js__WEBPACK_IMPORTED_MODULE_0__["removeCustomPropAssignment"])(
        /** @type {string} */
        css); // replace with reified properties, scenario is same as mixin

        rule['cssText'] = self.valueForProperties(css, properties);
      }
    });
  }

}
/**
 * @param {number} n
 * @param {Array<number>} bits
 */


function addToBitMask(n, bits) {
  var o = parseInt(n / 32, 10);
  var v = 1 << n % 32;
  bits[o] = (bits[o] || 0) | v;
}

/* harmony default export */ __webpack_exports__["default"] = (new StyleProperties());

/***/ }),

/***/ "./node_modules/@webcomponents/shadycss/src/style-settings.js":
/*!********************************************************************!*\
  !*** ./node_modules/@webcomponents/shadycss/src/style-settings.js ***!
  \********************************************************************/
/*! exports provided: nativeShadow, cssBuild, disableRuntime, nativeCssVariables */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nativeShadow", function() { return nativeShadow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cssBuild", function() { return cssBuild; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "disableRuntime", function() { return disableRuntime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nativeCssVariables", function() { return nativeCssVariables; });
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/


var nativeShadow = !(window['ShadyDOM'] && window['ShadyDOM']['inUse']);
var nativeCssVariables_;
/**
 * @param {(ShadyCSSOptions | ShadyCSSInterface)=} settings
 */

function calcCssVariables(settings) {
  if (settings && settings['shimcssproperties']) {
    nativeCssVariables_ = false;
  } else {
    // chrome 49 has semi-working css vars, check if box-shadow works
    // safari 9.1 has a recalc bug: https://bugs.webkit.org/show_bug.cgi?id=155782
    // However, shim css custom properties are only supported with ShadyDOM enabled,
    // so fall back on native if we do not detect ShadyDOM
    // Edge 15: custom properties used in ::before and ::after will also be used in the parent element
    // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/12414257/
    nativeCssVariables_ = nativeShadow || Boolean(!navigator.userAgent.match(/AppleWebKit\/601|Edge\/15/) && window.CSS && CSS.supports && CSS.supports('box-shadow', '0 0 0 var(--foo)'));
  }
}
/** @type {string | undefined} */


var cssBuild;

if (window.ShadyCSS && window.ShadyCSS.cssBuild !== undefined) {
  cssBuild = window.ShadyCSS.cssBuild;
}
/** @type {boolean} */


var disableRuntime = Boolean(window.ShadyCSS && window.ShadyCSS.disableRuntime);

if (window.ShadyCSS && window.ShadyCSS.nativeCss !== undefined) {
  nativeCssVariables_ = window.ShadyCSS.nativeCss;
} else if (window.ShadyCSS) {
  calcCssVariables(window.ShadyCSS); // reset window variable to let ShadyCSS API take its place

  window.ShadyCSS = undefined;
} else {
  calcCssVariables(window['WebComponents'] && window['WebComponents']['flags']);
} // Hack for type error under new type inference which doesn't like that
// nativeCssVariables is updated in a function and assigns the type
// `function(): ?` instead of `boolean`.


var nativeCssVariables =
/** @type {boolean} */
nativeCssVariables_;

/***/ }),

/***/ "./node_modules/@webcomponents/shadycss/src/style-transformer.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@webcomponents/shadycss/src/style-transformer.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_parse_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./css-parse.js */ "./node_modules/@webcomponents/shadycss/src/css-parse.js");
/* harmony import */ var _style_util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style-util.js */ "./node_modules/@webcomponents/shadycss/src/style-util.js");
/* harmony import */ var _style_settings_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./style-settings.js */ "./node_modules/@webcomponents/shadycss/src/style-settings.js");
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/


 // eslint-disable-line no-unused-vars



/* Transforms ShadowDOM styling into ShadyDOM styling

* scoping:

  * elements in scope get scoping selector class="x-foo-scope"
  * selectors re-written as follows:

    div button -> div.x-foo-scope button.x-foo-scope

* :host -> scopeName

* :host(...) -> scopeName...

* ::slotted(...) -> scopeName > ...

* ...:dir(ltr|rtl) -> [dir="ltr|rtl"] ..., ...[dir="ltr|rtl"]

* :host(:dir[rtl]) -> scopeName:dir(rtl) -> [dir="rtl"] scopeName, scopeName[dir="rtl"]

*/

var SCOPE_NAME = 'style-scope';

class StyleTransformer {
  /** @return {string} */
  get SCOPE_NAME() {
    return SCOPE_NAME;
  }
  /**
   * Given a node and scope name, add a scoping class to each node
   * in the tree. This facilitates transforming css into scoped rules.
   * @param {!Node} node
   * @param {string} scope
   * @param {boolean=} shouldRemoveScope
   * @deprecated
   */


  dom(node, scope, shouldRemoveScope) {
    var fn = node => {
      this.element(node, scope || '', shouldRemoveScope);
    };

    this._transformDom(node, fn);
  }
  /**
   * Given a node and scope name, add a scoping class to each node in the tree.
   * @param {!Node} node
   * @param {string} scope
   */


  domAddScope(node, scope) {
    var fn = node => {
      this.element(node, scope || '');
    };

    this._transformDom(node, fn);
  }
  /**
   * @param {!Node} startNode
   * @param {function(!Node)} transformer
   */


  _transformDom(startNode, transformer) {
    if (startNode.nodeType === Node.ELEMENT_NODE) {
      transformer(startNode);
    }

    var c$;

    if (startNode.localName === 'template') {
      var template =
      /** @type {!HTMLTemplateElement} */
      startNode; // In case the template is in svg context, fall back to the node
      // since it won't be an HTMLTemplateElement with a .content property

      c$ = (template.content || template._content || template).childNodes;
    } else {
      c$ =
      /** @type {!ParentNode} */
      startNode.children || startNode.childNodes;
    }

    if (c$) {
      for (var i = 0; i < c$.length; i++) {
        this._transformDom(c$[i], transformer);
      }
    }
  }
  /**
   * @param {?} element
   * @param {?} scope
   * @param {?=} shouldRemoveScope
   */


  element(element, scope, shouldRemoveScope) {
    // note: if using classes, we add both the general 'style-scope' class
    // as well as the specific scope. This enables easy filtering of all
    // `style-scope` elements
    if (scope) {
      // note: svg on IE does not have classList so fallback to class
      if (element.classList) {
        if (shouldRemoveScope) {
          element.classList.remove(SCOPE_NAME);
          element.classList.remove(scope);
        } else {
          element.classList.add(SCOPE_NAME);
          element.classList.add(scope);
        }
      } else if (element.getAttribute) {
        var c = element.getAttribute(CLASS);

        if (shouldRemoveScope) {
          if (c) {
            var newValue = c.replace(SCOPE_NAME, '').replace(scope, '');
            _style_util_js__WEBPACK_IMPORTED_MODULE_1__["setElementClassRaw"](element, newValue);
          }
        } else {
          var _newValue = (c ? c + ' ' : '') + SCOPE_NAME + ' ' + scope;

          _style_util_js__WEBPACK_IMPORTED_MODULE_1__["setElementClassRaw"](element, _newValue);
        }
      }
    }
  }
  /**
   * Given a node, replace the scoping class to each subnode in the tree.
   * @param {!Node} node
   * @param {string} oldScope
   * @param {string} newScope
   */


  domReplaceScope(node, oldScope, newScope) {
    var fn = node => {
      this.element(node, oldScope, true);
      this.element(node, newScope);
    };

    this._transformDom(node, fn);
  }
  /**
   * Given a node, remove the scoping class to each subnode in the tree.
   * @param {!Node} node
   * @param {string} oldScope
   */


  domRemoveScope(node, oldScope) {
    var fn = node => {
      this.element(node, oldScope || '', true);
    };

    this._transformDom(node, fn);
  }
  /**
   * @param {?} element
   * @param {?} styleRules
   * @param {?=} callback
   * @param {string=} cssBuild
   * @param {string=} cssText
   * @return {string}
   */


  elementStyles(element, styleRules, callback) {
    var cssBuild = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
    var cssText = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';

    // no need to shim selectors if settings.useNativeShadow, also
    // a shady css build will already have transformed selectors
    // NOTE: This method may be called as part of static or property shimming.
    // When there is a targeted build it will not be called for static shimming,
    // but when the property shim is used it is called and should opt out of
    // static shimming work when a proper build exists.
    if (cssText === '') {
      if (_style_settings_js__WEBPACK_IMPORTED_MODULE_2__["nativeShadow"] || cssBuild === 'shady') {
        cssText = _style_util_js__WEBPACK_IMPORTED_MODULE_1__["toCssText"](styleRules, callback);
      } else {
        var {
          is,
          typeExtension
        } = _style_util_js__WEBPACK_IMPORTED_MODULE_1__["getIsExtends"](element);
        cssText = this.css(styleRules, is, typeExtension, callback) + '\n\n';
      }
    }

    return cssText.trim();
  } // Given a string of cssText and a scoping string (scope), returns
  // a string of scoped css where each selector is transformed to include
  // a class created from the scope. ShadowDOM selectors are also transformed
  // (e.g. :host) to use the scoping selector.


  css(rules, scope, ext, callback) {
    var hostScope = this._calcHostScope(scope, ext);

    scope = this._calcElementScope(scope);
    var self = this;
    return _style_util_js__WEBPACK_IMPORTED_MODULE_1__["toCssText"](rules, function (
    /** StyleNode */
    rule) {
      if (!
      /** @type {?} */
      rule.isScoped) {
        self.rule(rule, scope, hostScope);
        rule.isScoped = true;
      }

      if (callback) {
        callback(rule, scope, hostScope);
      }
    });
  }

  _calcElementScope(scope) {
    if (scope) {
      return CSS_CLASS_PREFIX + scope;
    } else {
      return '';
    }
  }

  _calcHostScope(scope, ext) {
    return ext ? "[is=".concat(scope, "]") : scope;
  }

  rule(rule, scope, hostScope) {
    this._transformRule(rule, this._transformComplexSelector, scope, hostScope);
  }
  /**
   * transforms a css rule to a scoped rule.
   *
   * @param {StyleNode} rule
   * @param {Function} transformer
   * @param {string=} scope
   * @param {string=} hostScope
   */


  _transformRule(rule, transformer, scope, hostScope) {
    // NOTE: save transformedSelector for subsequent matching of elements
    // against selectors (e.g. when calculating style properties)
    rule['selector'] =
    /** @type {?} */
    rule.transformedSelector = this._transformRuleCss(rule, transformer, scope, hostScope);
  }
  /**
   * @param {StyleNode} rule
   * @param {Function} transformer
   * @param {string=} scope
   * @param {string=} hostScope
   */


  _transformRuleCss(rule, transformer, scope, hostScope) {
    var p$ = _style_util_js__WEBPACK_IMPORTED_MODULE_1__["splitSelectorList"](rule['selector']); // we want to skip transformation of rules that appear in keyframes,
    // because they are keyframe selectors, not element selectors.

    if (!_style_util_js__WEBPACK_IMPORTED_MODULE_1__["isKeyframesSelector"](rule)) {
      for (var i = 0, l = p$.length, p; i < l && (p = p$[i]); i++) {
        p$[i] = transformer.call(this, p, scope, hostScope);
      }
    }

    return p$.filter(part => Boolean(part)).join(COMPLEX_SELECTOR_SEP);
  }
  /**
   * @param {string} selector
   * @return {string}
   */


  _twiddleNthPlus(selector) {
    return selector.replace(NTH, (m, type, inside) => {
      if (inside.indexOf('+') > -1) {
        inside = inside.replace(/\+/g, '___');
      } else if (inside.indexOf('___') > -1) {
        inside = inside.replace(/___/g, '+');
      }

      return ":".concat(type, "(").concat(inside, ")");
    });
  }
  /**
   * Preserve `:matches()` selectors by replacing them with MATCHES_REPLACMENT
   * and returning an array of `:matches()` selectors.
   * Use `_replacesMatchesPseudo` to replace the `:matches()` parts
   *
   * @param {string} selector
   * @return {{selector: string, matches: !Array<string>}}
   */


  _preserveMatchesPseudo(selector) {
    /** @type {!Array<string>} */
    var matches = [];
    var match;

    while (match = selector.match(MATCHES)) {
      var start = match.index;
      var end = _style_util_js__WEBPACK_IMPORTED_MODULE_1__["findMatchingParen"](selector, start);

      if (end === -1) {
        throw new Error("".concat(match.input, " selector missing ')'"));
      }

      var part = selector.slice(start, end + 1);
      selector = selector.replace(part, MATCHES_REPLACEMENT);
      matches.push(part);
    }

    return {
      selector,
      matches
    };
  }
  /**
   * Replace MATCHES_REPLACMENT character with the given set of `:matches()`
   * selectors.
   *
   * @param {string} selector
   * @param {!Array<string>} matches
   * @return {string}
   */


  _replaceMatchesPseudo(selector, matches) {
    var parts = selector.split(MATCHES_REPLACEMENT);
    return matches.reduce((acc, cur, idx) => acc + cur + parts[idx + 1], parts[0]);
  }
  /**
   * @param {string} selector
   * @param {string} scope
   * @param {string=} hostScope
   */


  _transformComplexSelector(selector, scope, hostScope) {
    var stop = false;
    selector = selector.trim(); // Remove spaces inside of selectors like `:nth-of-type` because it confuses SIMPLE_SELECTOR_SEP

    var isNth = NTH.test(selector);

    if (isNth) {
      selector = selector.replace(NTH, (m, type, inner) => ":".concat(type, "(").concat(inner.replace(/\s/g, ''), ")"));
      selector = this._twiddleNthPlus(selector);
    } // Preserve selectors like `:-webkit-any` so that SIMPLE_SELECTOR_SEP does
    // not get confused by spaces inside the pseudo selector


    var isMatches = MATCHES.test(selector);
    /** @type {!Array<string>} */

    var matches;

    if (isMatches) {
      ({
        selector,
        matches
      } = this._preserveMatchesPseudo(selector));
    }

    selector = selector.replace(SLOTTED_START, "".concat(HOST, " $1"));
    selector = selector.replace(SIMPLE_SELECTOR_SEP, (m, c, s) => {
      if (!stop) {
        var info = this._transformCompoundSelector(s, c, scope, hostScope);

        stop = stop || info.stop;
        c = info.combinator;
        s = info.value;
      }

      return c + s;
    }); // replace `:matches()` selectors

    if (isMatches) {
      selector = this._replaceMatchesPseudo(selector, matches);
    }

    if (isNth) {
      selector = this._twiddleNthPlus(selector);
    }

    selector = selector.replace(DIR_PAREN, (m, before, dir, after) => "[dir=\"".concat(dir, "\"] ").concat(before).concat(after, ", ").concat(before, "[dir=\"").concat(dir, "\"]").concat(after));
    return selector;
  }

  _transformCompoundSelector(selector, combinator, scope, hostScope) {
    // replace :host with host scoping class
    var slottedIndex = selector.indexOf(SLOTTED);

    if (selector.indexOf(HOST) >= 0) {
      selector = this._transformHostSelector(selector, hostScope); // replace other selectors with scoping class
    } else if (slottedIndex !== 0) {
      selector = scope ? this._transformSimpleSelector(selector, scope) : selector;
    } // mark ::slotted() scope jump to replace with descendant selector + arg
    // also ignore left-side combinator


    var slotted = false;

    if (slottedIndex >= 0) {
      combinator = '';
      slotted = true;
    } // process scope jumping selectors up to the scope jump and then stop


    var stop;

    if (slotted) {
      stop = true;

      if (slotted) {
        // .zonk ::slotted(.foo) -> .zonk.scope > .foo
        selector = selector.replace(SLOTTED_PAREN, (m, paren) => " > ".concat(paren));
      }
    }

    return {
      value: selector,
      combinator,
      stop
    };
  }

  _transformSimpleSelector(selector, scope) {
    var attributes = selector.split(/(\[.+?\])/);
    var output = [];

    for (var i = 0; i < attributes.length; i++) {
      // Do not attempt to transform any attribute selector content
      if (i % 2 === 1) {
        output.push(attributes[i]);
      } else {
        var part = attributes[i];

        if (!(part === '' && i === attributes.length - 1)) {
          var p$ = part.split(PSEUDO_PREFIX);
          p$[0] += scope;
          output.push(p$.join(PSEUDO_PREFIX));
        }
      }
    }

    return output.join('');
  } // :host(...) -> scopeName...


  _transformHostSelector(selector, hostScope) {
    var m = selector.match(HOST_PAREN);
    var paren = m && m[2].trim() || '';

    if (paren) {
      if (!paren[0].match(SIMPLE_SELECTOR_PREFIX)) {
        // paren starts with a type selector
        var typeSelector = paren.split(SIMPLE_SELECTOR_PREFIX)[0]; // if the type selector is our hostScope then avoid pre-pending it

        if (typeSelector === hostScope) {
          return paren; // otherwise, this selector should not match in this scope so
          // output a bogus selector.
        } else {
          return SELECTOR_NO_MATCH;
        }
      } else {
        // make sure to do a replace here to catch selectors like:
        // `:host(.foo)::before`
        return selector.replace(HOST_PAREN, function (m, host, paren) {
          return hostScope + paren;
        });
      } // if no paren, do a straight :host replacement.
      // TODO(sorvell): this should not strictly be necessary but
      // it's needed to maintain support for `:host[foo]` type selectors
      // which have been improperly used under Shady DOM. This should be
      // deprecated.

    } else {
      return selector.replace(HOST, hostScope);
    }
  }
  /**
   * @param {StyleNode} rule
   */


  documentRule(rule) {
    // reset selector in case this is redone.
    rule['selector'] = rule['parsedSelector'];
    this.normalizeRootSelector(rule);

    this._transformRule(rule, this._transformDocumentSelector);
  }
  /**
   * @param {StyleNode} rule
   */


  normalizeRootSelector(rule) {
    if (rule['selector'] === ROOT) {
      rule['selector'] = 'html';
    }
  }
  /**
   * @param {string} selector
   */


  _transformDocumentSelector(selector) {
    if (selector.match(HOST)) {
      // remove ':host' type selectors in document rules
      return '';
    } else if (selector.match(SLOTTED)) {
      return this._transformComplexSelector(selector, SCOPE_DOC_SELECTOR);
    } else {
      return this._transformSimpleSelector(selector.trim(), SCOPE_DOC_SELECTOR);
    }
  }

}

var NTH = /:(nth[-\w]+)\(([^)]+)\)/;
var SCOPE_DOC_SELECTOR = ":not(.".concat(SCOPE_NAME, ")");
var COMPLEX_SELECTOR_SEP = ',';
var SIMPLE_SELECTOR_SEP = /(^|[\s>+~]+)((?:\[.+?\]|[^\s>+~=[])+)/g;
var SIMPLE_SELECTOR_PREFIX = /[[.:#*]/;
var HOST = ':host';
var ROOT = ':root';
var SLOTTED = '::slotted';
var SLOTTED_START = new RegExp("^(".concat(SLOTTED, ")")); // NOTE: this supports 1 nested () pair for things like
// :host(:not([selected]), more general support requires
// parsing which seems like overkill

var HOST_PAREN = /(:host)(?:\(((?:\([^)(]*\)|[^)(]*)+?)\))/; // similar to HOST_PAREN

var SLOTTED_PAREN = /(?:::slotted)(?:\(((?:\([^)(]*\)|[^)(]*)+?)\))/;
var DIR_PAREN = /(.*):dir\((?:(ltr|rtl))\)(.*)/;
var CSS_CLASS_PREFIX = '.';
var PSEUDO_PREFIX = ':';
var CLASS = 'class';
var SELECTOR_NO_MATCH = 'should_not_match';
var MATCHES = /:(?:matches|any|-(?:webkit|moz)-any)/;
var MATCHES_REPLACEMENT = '\u{e000}';
/* harmony default export */ __webpack_exports__["default"] = (new StyleTransformer());

/***/ }),

/***/ "./node_modules/@webcomponents/shadycss/src/style-util.js":
/*!****************************************************************!*\
  !*** ./node_modules/@webcomponents/shadycss/src/style-util.js ***!
  \****************************************************************/
/*! exports provided: toCssText, rulesForStyle, isKeyframesSelector, forEachRule, applyCss, createScopeStyle, applyStylePlaceHolder, applyStyle, isTargetedBuild, findMatchingParen, processVariableAndFallback, setElementClassRaw, wrap, getIsExtends, gatherStyleText, splitSelectorList, getCssBuild, elementHasBuiltCss, getBuildComment, isOptimalCssBuild */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toCssText", function() { return toCssText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rulesForStyle", function() { return rulesForStyle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isKeyframesSelector", function() { return isKeyframesSelector; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "forEachRule", function() { return forEachRule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "applyCss", function() { return applyCss; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createScopeStyle", function() { return createScopeStyle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "applyStylePlaceHolder", function() { return applyStylePlaceHolder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "applyStyle", function() { return applyStyle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isTargetedBuild", function() { return isTargetedBuild; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findMatchingParen", function() { return findMatchingParen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "processVariableAndFallback", function() { return processVariableAndFallback; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setElementClassRaw", function() { return setElementClassRaw; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrap", function() { return wrap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getIsExtends", function() { return getIsExtends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gatherStyleText", function() { return gatherStyleText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "splitSelectorList", function() { return splitSelectorList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCssBuild", function() { return getCssBuild; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "elementHasBuiltCss", function() { return elementHasBuiltCss; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBuildComment", function() { return getBuildComment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isOptimalCssBuild", function() { return isOptimalCssBuild; });
/* harmony import */ var _style_settings_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style-settings.js */ "./node_modules/@webcomponents/shadycss/src/style-settings.js");
/* harmony import */ var _css_parse_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./css-parse.js */ "./node_modules/@webcomponents/shadycss/src/css-parse.js");
/* harmony import */ var _common_regex_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common-regex.js */ "./node_modules/@webcomponents/shadycss/src/common-regex.js");
/* harmony import */ var _unscoped_style_handler_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./unscoped-style-handler.js */ "./node_modules/@webcomponents/shadycss/src/unscoped-style-handler.js");
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/



 // eslint-disable-line no-unused-vars



/**
 * @param {string|StyleNode} rules
 * @param {function(StyleNode)=} callback
 * @return {string}
 */

function toCssText(rules, callback) {
  if (!rules) {
    return '';
  }

  if (typeof rules === 'string') {
    rules = Object(_css_parse_js__WEBPACK_IMPORTED_MODULE_1__["parse"])(rules);
  }

  if (callback) {
    forEachRule(rules, callback);
  }

  return Object(_css_parse_js__WEBPACK_IMPORTED_MODULE_1__["stringify"])(rules, _style_settings_js__WEBPACK_IMPORTED_MODULE_0__["nativeCssVariables"]);
}
/**
 * @param {HTMLStyleElement} style
 * @return {StyleNode}
 */

function rulesForStyle(style) {
  if (!style['__cssRules'] && style.textContent) {
    style['__cssRules'] = Object(_css_parse_js__WEBPACK_IMPORTED_MODULE_1__["parse"])(style.textContent);
  }

  return style['__cssRules'] || null;
} // Tests if a rule is a keyframes selector, which looks almost exactly
// like a normal selector but is not (it has nothing to do with scoping
// for example).

/**
 * @param {StyleNode} rule
 * @return {boolean}
 */

function isKeyframesSelector(rule) {
  return Boolean(rule['parent']) && rule['parent']['type'] === _css_parse_js__WEBPACK_IMPORTED_MODULE_1__["types"].KEYFRAMES_RULE;
}
/**
 * @param {StyleNode} node
 * @param {Function=} styleRuleCallback
 * @param {Function=} keyframesRuleCallback
 * @param {boolean=} onlyActiveRules
 */

function forEachRule(node, styleRuleCallback, keyframesRuleCallback, onlyActiveRules) {
  if (!node) {
    return;
  }

  var skipRules = false;
  var type = node['type'];

  if (onlyActiveRules) {
    if (type === _css_parse_js__WEBPACK_IMPORTED_MODULE_1__["types"].MEDIA_RULE) {
      var matchMedia = node['selector'].match(_common_regex_js__WEBPACK_IMPORTED_MODULE_2__["MEDIA_MATCH"]);

      if (matchMedia) {
        // if rule is a non matching @media rule, skip subrules
        if (!window.matchMedia(matchMedia[1]).matches) {
          skipRules = true;
        }
      }
    }
  }

  if (type === _css_parse_js__WEBPACK_IMPORTED_MODULE_1__["types"].STYLE_RULE) {
    styleRuleCallback(node);
  } else if (keyframesRuleCallback && type === _css_parse_js__WEBPACK_IMPORTED_MODULE_1__["types"].KEYFRAMES_RULE) {
    keyframesRuleCallback(node);
  } else if (type === _css_parse_js__WEBPACK_IMPORTED_MODULE_1__["types"].MIXIN_RULE) {
    skipRules = true;
  }

  var r$ = node['rules'];

  if (r$ && !skipRules) {
    for (var i = 0, l = r$.length, r; i < l && (r = r$[i]); i++) {
      forEachRule(r, styleRuleCallback, keyframesRuleCallback, onlyActiveRules);
    }
  }
} // add a string of cssText to the document.

/**
 * @param {string} cssText
 * @param {string} moniker
 * @param {Node} target
 * @param {Node} contextNode
 * @return {HTMLStyleElement}
 */

function applyCss(cssText, moniker, target, contextNode) {
  var style = createScopeStyle(cssText, moniker);
  applyStyle(style, target, contextNode);
  return style;
}
/**
 * @param {string} cssText
 * @param {string} moniker
 * @return {!HTMLStyleElement}
 */

function createScopeStyle(cssText, moniker) {
  var style =
  /** @type {HTMLStyleElement} */
  document.createElement('style');

  if (moniker) {
    style.setAttribute('scope', moniker);
  }

  style.textContent = cssText;
  return style;
}
/**
 * Track the position of the last added style for placing placeholders
 * @type {Node}
 */

var lastHeadApplyNode = null; // insert a comment node as a styling position placeholder.

/**
 * @param {string} moniker
 * @return {!Comment}
 */

function applyStylePlaceHolder(moniker) {
  var placeHolder = document.createComment(' Shady DOM styles for ' + moniker + ' ');
  var after = lastHeadApplyNode ? lastHeadApplyNode['nextSibling'] : null;
  var scope = document.head;
  scope.insertBefore(placeHolder, after || scope.firstChild);
  lastHeadApplyNode = placeHolder;
  return placeHolder;
}
/**
 * @param {HTMLStyleElement} style
 * @param {?Node} target
 * @param {?Node} contextNode
 */

function applyStyle(style, target, contextNode) {
  target = target || document.head;
  var after = contextNode && contextNode.nextSibling || target.firstChild;
  target.insertBefore(style, after);

  if (!lastHeadApplyNode) {
    lastHeadApplyNode = style;
  } else {
    // only update lastHeadApplyNode if the new style is inserted after the old lastHeadApplyNode
    var position = style.compareDocumentPosition(lastHeadApplyNode);

    if (position === Node.DOCUMENT_POSITION_PRECEDING) {
      lastHeadApplyNode = style;
    }
  }
}
/**
 * @param {string} buildType
 * @return {boolean}
 */

function isTargetedBuild(buildType) {
  return _style_settings_js__WEBPACK_IMPORTED_MODULE_0__["nativeShadow"] ? buildType === 'shadow' : buildType === 'shady';
}
/**
 * Walk from text[start] matching parens and
 * returns position of the outer end paren
 * @param {string} text
 * @param {number} start
 * @return {number}
 */

function findMatchingParen(text, start) {
  var level = 0;

  for (var i = start, l = text.length; i < l; i++) {
    if (text[i] === '(') {
      level++;
    } else if (text[i] === ')') {
      if (--level === 0) {
        return i;
      }
    }
  }

  return -1;
}
/**
 * @param {string} str
 * @param {function(string, string, string, string)} callback
 */

function processVariableAndFallback(str, callback) {
  // find 'var('
  var start = str.indexOf('var(');

  if (start === -1) {
    // no var?, everything is prefix
    return callback(str, '', '', '');
  } //${prefix}var(${inner})${suffix}


  var end = findMatchingParen(str, start + 3);
  var inner = str.substring(start + 4, end);
  var prefix = str.substring(0, start); // suffix may have other variables

  var suffix = processVariableAndFallback(str.substring(end + 1), callback);
  var comma = inner.indexOf(','); // value and fallback args should be trimmed to match in property lookup

  if (comma === -1) {
    // variable, no fallback
    return callback(prefix, inner.trim(), '', suffix);
  } // var(${value},${fallback})


  var value = inner.substring(0, comma).trim();
  var fallback = inner.substring(comma + 1).trim();
  return callback(prefix, value, fallback, suffix);
}
/**
 * @param {Element} element
 * @param {string} value
 */

function setElementClassRaw(element, value) {
  // use native setAttribute provided by ShadyDOM when setAttribute is patched
  if (_style_settings_js__WEBPACK_IMPORTED_MODULE_0__["nativeShadow"]) {
    element.setAttribute('class', value);
  } else {
    window['ShadyDOM']['nativeMethods']['setAttribute'].call(element, 'class', value);
  }
}
/**
 * @type {function(*):*}
 */

var wrap = window['ShadyDOM'] && window['ShadyDOM']['wrap'] || (node => node);
/**
 * @param {Element | {is: string, extends: string}} element
 * @return {{is: string, typeExtension: string}}
 */

function getIsExtends(element) {
  var localName = element['localName'];
  var is = '',
      typeExtension = '';
  /*
  NOTE: technically, this can be wrong for certain svg elements
  with `-` in the name like `<font-face>`
  */

  if (localName) {
    if (localName.indexOf('-') > -1) {
      is = localName;
    } else {
      typeExtension = localName;
      is = element.getAttribute && element.getAttribute('is') || '';
    }
  } else {
    is =
    /** @type {?} */
    element.is;
    typeExtension =
    /** @type {?} */
    element.extends;
  }

  return {
    is,
    typeExtension
  };
}
/**
 * @param {Element|DocumentFragment} element
 * @return {string}
 */

function gatherStyleText(element) {
  /** @type {!Array<string>} */
  var styleTextParts = [];
  var styles =
  /** @type {!NodeList<!HTMLStyleElement>} */
  element.querySelectorAll('style');

  for (var i = 0; i < styles.length; i++) {
    var style = styles[i];

    if (Object(_unscoped_style_handler_js__WEBPACK_IMPORTED_MODULE_3__["isUnscopedStyle"])(style)) {
      if (!_style_settings_js__WEBPACK_IMPORTED_MODULE_0__["nativeShadow"]) {
        Object(_unscoped_style_handler_js__WEBPACK_IMPORTED_MODULE_3__["processUnscopedStyle"])(style);
        style.parentNode.removeChild(style);
      }
    } else {
      styleTextParts.push(style.textContent);
      style.parentNode.removeChild(style);
    }
  }

  return styleTextParts.join('').trim();
}
/**
 * Split a selector separated by commas into an array in a smart way
 * @param {string} selector
 * @return {!Array<string>}
 */

function splitSelectorList(selector) {
  var parts = [];
  var part = '';

  for (var i = 0; i >= 0 && i < selector.length; i++) {
    // A selector with parentheses will be one complete part
    if (selector[i] === '(') {
      // find the matching paren
      var end = findMatchingParen(selector, i); // push the paren block into the part

      part += selector.slice(i, end + 1); // move the index to after the paren block

      i = end;
    } else if (selector[i] === ',') {
      parts.push(part);
      part = '';
    } else {
      part += selector[i];
    }
  } // catch any pieces after the last comma


  if (part) {
    parts.push(part);
  }

  return parts;
}
var CSS_BUILD_ATTR = 'css-build';
/**
 * Return the polymer-css-build "build type" applied to this element
 *
 * @param {!HTMLElement} element
 * @return {string} Can be "", "shady", or "shadow"
 */

function getCssBuild(element) {
  if (_style_settings_js__WEBPACK_IMPORTED_MODULE_0__["cssBuild"] !== undefined) {
    return (
      /** @type {string} */
      _style_settings_js__WEBPACK_IMPORTED_MODULE_0__["cssBuild"]
    );
  }

  if (element.__cssBuild === undefined) {
    // try attribute first, as it is the common case
    var attrValue = element.getAttribute(CSS_BUILD_ATTR);

    if (attrValue) {
      element.__cssBuild = attrValue;
    } else {
      var buildComment = getBuildComment(element);

      if (buildComment !== '') {
        // remove build comment so it is not needlessly copied into every element instance
        removeBuildComment(element);
      }

      element.__cssBuild = buildComment;
    }
  }

  return element.__cssBuild || '';
}
/**
 * Check if the given element, either a <template> or <style>, has been processed
 * by polymer-css-build.
 *
 * If so, then we can make a number of optimizations:
 * - polymer-css-build will decompose mixins into individual CSS Custom Properties,
 * so the ApplyShim can be skipped entirely.
 * - Under native ShadowDOM, the style text can just be copied into each instance
 * without modification
 * - If the build is "shady" and ShadyDOM is in use, the styling does not need
 * scoping beyond the shimming of CSS Custom Properties
 *
 * @param {!HTMLElement} element
 * @return {boolean}
 */

function elementHasBuiltCss(element) {
  return getCssBuild(element) !== '';
}
/**
 * For templates made with tagged template literals, polymer-css-build will
 * insert a comment of the form `<!--css-build:shadow-->`
 *
 * @param {!HTMLElement} element
 * @return {string}
 */

function getBuildComment(element) {
  var buildComment = element.localName === 'template' ?
  /** @type {!HTMLTemplateElement} */
  element.content.firstChild : element.firstChild;

  if (buildComment instanceof Comment) {
    var commentParts = buildComment.textContent.trim().split(':');

    if (commentParts[0] === CSS_BUILD_ATTR) {
      return commentParts[1];
    }
  }

  return '';
}
/**
 * Check if the css build status is optimal, and do no unneeded work.
 *
 * @param {string=} cssBuild CSS build status
 * @return {boolean} css build is optimal or not
 */

function isOptimalCssBuild() {
  var cssBuild = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  // CSS custom property shim always requires work
  if (cssBuild === '' || !_style_settings_js__WEBPACK_IMPORTED_MODULE_0__["nativeCssVariables"]) {
    return false;
  }

  return _style_settings_js__WEBPACK_IMPORTED_MODULE_0__["nativeShadow"] ? cssBuild === 'shadow' : cssBuild === 'shady';
}
/**
 * @param {!HTMLElement} element
 */

function removeBuildComment(element) {
  var buildComment = element.localName === 'template' ?
  /** @type {!HTMLTemplateElement} */
  element.content.firstChild : element.firstChild;
  buildComment.parentNode.removeChild(buildComment);
}

/***/ }),

/***/ "./node_modules/@webcomponents/shadycss/src/template-map.js":
/*!******************************************************************!*\
  !*** ./node_modules/@webcomponents/shadycss/src/template-map.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

/**
 * @const {!Object<string, !HTMLTemplateElement>}
 */

var templateMap = {};
/* harmony default export */ __webpack_exports__["default"] = (templateMap);

/***/ }),

/***/ "./node_modules/@webcomponents/shadycss/src/unscoped-style-handler.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@webcomponents/shadycss/src/unscoped-style-handler.js ***!
  \****************************************************************************/
/*! exports provided: scopingAttribute, processUnscopedStyle, isUnscopedStyle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scopingAttribute", function() { return scopingAttribute; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "processUnscopedStyle", function() { return processUnscopedStyle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isUnscopedStyle", function() { return isUnscopedStyle; });
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

/** @type {!Set<string>} */

var styleTextSet = new Set();
var scopingAttribute = 'shady-unscoped';
/**
 * Add a specifically-marked style to the document directly, and only one copy of that style.
 *
 * @param {!HTMLStyleElement} style
 * @return {undefined}
 */

function processUnscopedStyle(style) {
  var text = style.textContent;

  if (!styleTextSet.has(text)) {
    styleTextSet.add(text);
    var newStyle = document.createElement('style');
    newStyle.setAttribute('shady-unscoped', '');
    newStyle.textContent = text;
    document.head.appendChild(newStyle);
  }
}
/**
 * Check if a style is supposed to be unscoped
 * @param {!HTMLStyleElement} style
 * @return {boolean} true if the style has the unscoping attribute
 */

function isUnscopedStyle(style) {
  return style.hasAttribute(scopingAttribute);
}

/***/ }),

/***/ "./node_modules/@webcomponents/shadydom/shadydom.min.js":
/*!**************************************************************!*\
  !*** ./node_modules/@webcomponents/shadydom/shadydom.min.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {(function () {
  /*
  Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
  This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
  The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
  The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
  Code distributed by Google as part of the polymer project is also
  subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
  */
  'use strict';

  var n;

  function aa(a) {
    var b = 0;
    return function () {
      return b < a.length ? {
        done: !1,
        value: a[b++]
      } : {
        done: !0
      };
    };
  }

  function ba(a) {
    var b = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
    return b ? b.call(a) : {
      next: aa(a)
    };
  }

  function ca(a) {
    for (var b, c = []; !(b = a.next()).done;) {
      c.push(b.value);
    }

    return c;
  }

  var da = "undefined" != typeof window && window === this ? this : "undefined" != typeof global && null != global ? global : this;

  function p(a, b) {
    return {
      index: a,
      o: [],
      u: b
    };
  }

  function ea(a, b, c, d) {
    var e = 0,
        f = 0,
        g = 0,
        h = 0,
        m = Math.min(b - e, d - f);
    if (0 == e && 0 == f) a: {
      for (g = 0; g < m; g++) {
        if (a[g] !== c[g]) break a;
      }

      g = m;
    }

    if (b == a.length && d == c.length) {
      h = a.length;

      for (var k = c.length, l = 0; l < m - g && fa(a[--h], c[--k]);) {
        l++;
      }

      h = l;
    }

    e += g;
    f += g;
    b -= h;
    d -= h;
    if (0 == b - e && 0 == d - f) return [];

    if (e == b) {
      for (b = p(e, 0); f < d;) {
        b.o.push(c[f++]);
      }

      return [b];
    }

    if (f == d) return [p(e, b - e)];
    m = e;
    g = f;
    d = d - g + 1;
    h = b - m + 1;
    b = Array(d);

    for (k = 0; k < d; k++) {
      b[k] = Array(h), b[k][0] = k;
    }

    for (k = 0; k < h; k++) {
      b[0][k] = k;
    }

    for (k = 1; k < d; k++) {
      for (l = 1; l < h; l++) {
        if (a[m + l - 1] === c[g + k - 1]) b[k][l] = b[k - 1][l - 1];else {
          var q = b[k - 1][l] + 1,
              D = b[k][l - 1] + 1;
          b[k][l] = q < D ? q : D;
        }
      }
    }

    m = b.length - 1;
    g = b[0].length - 1;
    d = b[m][g];

    for (a = []; 0 < m || 0 < g;) {
      0 == m ? (a.push(2), g--) : 0 == g ? (a.push(3), m--) : (h = b[m - 1][g - 1], k = b[m - 1][g], l = b[m][g - 1], q = k < l ? k < h ? k : h : l < h ? l : h, q == h ? (h == d ? a.push(0) : (a.push(1), d = h), m--, g--) : q == k ? (a.push(3), m--, d = k) : (a.push(2), g--, d = l));
    }

    a.reverse();
    b = void 0;
    m = [];

    for (g = 0; g < a.length; g++) {
      switch (a[g]) {
        case 0:
          b && (m.push(b), b = void 0);
          e++;
          f++;
          break;

        case 1:
          b || (b = p(e, 0));
          b.u++;
          e++;
          b.o.push(c[f]);
          f++;
          break;

        case 2:
          b || (b = p(e, 0));
          b.u++;
          e++;
          break;

        case 3:
          b || (b = p(e, 0)), b.o.push(c[f]), f++;
      }
    }

    b && m.push(b);
    return m;
  }

  function fa(a, b) {
    return a === b;
  }

  ;

  function ha() {}

  ha.prototype.toJSON = function () {
    return {};
  };

  function r(a) {
    a.__shady || (a.__shady = new ha());
    return a.__shady;
  }

  function t(a) {
    return a && a.__shady;
  }

  ;
  var u = window.ShadyDOM || {};
  u.T = !(!Element.prototype.attachShadow || !Node.prototype.getRootNode);
  var ia = Object.getOwnPropertyDescriptor(Node.prototype, "firstChild");
  u.c = !!(ia && ia.configurable && ia.get);
  u.F = u.force || !u.T;
  u.g = u.noPatch || !1;
  u.A = u.preferPerformance;
  u.G = "on-demand" === u.g;
  u.L = navigator.userAgent.match("Trident");

  function v(a) {
    return (a = t(a)) && void 0 !== a.firstChild;
  }

  function w(a) {
    return a instanceof ShadowRoot;
  }

  function ja(a) {
    return (a = (a = t(a)) && a.root) && ka(a);
  }

  var x = Element.prototype,
      la = x.matches || x.matchesSelector || x.mozMatchesSelector || x.msMatchesSelector || x.oMatchesSelector || x.webkitMatchesSelector,
      ma = document.createTextNode(""),
      na = 0,
      oa = [];
  new MutationObserver(function () {
    for (; oa.length;) {
      try {
        oa.shift()();
      } catch (a) {
        throw ma.textContent = na++, a;
      }
    }
  }).observe(ma, {
    characterData: !0
  });

  function pa(a) {
    oa.push(a);
    ma.textContent = na++;
  }

  var qa = !!document.contains;

  function ra(a, b) {
    for (; b;) {
      if (b == a) return !0;
      b = b.__shady_parentNode;
    }

    return !1;
  }

  function y(a) {
    for (var b = a.length - 1; 0 <= b; b--) {
      var c = a[b],
          d = c.getAttribute("id") || c.getAttribute("name");
      d && "length" !== d && isNaN(d) && (a[d] = c);
    }

    a.item = function (e) {
      return a[e];
    };

    a.namedItem = function (e) {
      if ("length" !== e && isNaN(e) && a[e]) return a[e];

      for (var f = ba(a), g = f.next(); !g.done; g = f.next()) {
        if (g = g.value, (g.getAttribute("id") || g.getAttribute("name")) == e) return g;
      }

      return null;
    };

    return a;
  }

  function sa(a) {
    var b = [];

    for (a = a.__shady_native_firstChild; a; a = a.__shady_native_nextSibling) {
      b.push(a);
    }

    return b;
  }

  function ta(a) {
    var b = [];

    for (a = a.__shady_firstChild; a; a = a.__shady_nextSibling) {
      b.push(a);
    }

    return b;
  }

  function ua(a, b, c) {
    c.configurable = !0;
    if (c.value) a[b] = c.value;else try {
      Object.defineProperty(a, b, c);
    } catch (d) {}
  }

  function z(a, b, c, d) {
    c = void 0 === c ? "" : c;

    for (var e in b) {
      d && 0 <= d.indexOf(e) || ua(a, c + e, b[e]);
    }
  }

  function va(a, b) {
    for (var c in b) {
      c in a && ua(a, c, b[c]);
    }
  }

  function A(a) {
    var b = {};
    Object.getOwnPropertyNames(a).forEach(function (c) {
      b[c] = Object.getOwnPropertyDescriptor(a, c);
    });
    return b;
  }

  function wa(a, b) {
    for (var c = Object.getOwnPropertyNames(b), d = 0, e; d < c.length; d++) {
      e = c[d], a[e] = b[e];
    }
  }

  ;
  var B = [],
      xa;

  function ya(a) {
    xa || (xa = !0, pa(C));
    B.push(a);
  }

  function C() {
    xa = !1;

    for (var a = !!B.length; B.length;) {
      B.shift()();
    }

    return a;
  }

  C.list = B;
  var za = A({
    get childNodes() {
      return this.__shady_childNodes;
    },

    get firstChild() {
      return this.__shady_firstChild;
    },

    get lastChild() {
      return this.__shady_lastChild;
    },

    get childElementCount() {
      return this.__shady_childElementCount;
    },

    get children() {
      return this.__shady_children;
    },

    get firstElementChild() {
      return this.__shady_firstElementChild;
    },

    get lastElementChild() {
      return this.__shady_lastElementChild;
    },

    get shadowRoot() {
      return this.__shady_shadowRoot;
    }

  }),
      Aa = A({
    get textContent() {
      return this.__shady_textContent;
    },

    set textContent(a) {
      this.__shady_textContent = a;
    },

    get innerHTML() {
      return this.__shady_innerHTML;
    },

    set innerHTML(a) {
      return this.__shady_innerHTML = a;
    }

  }),
      Ba = A({
    get parentElement() {
      return this.__shady_parentElement;
    },

    get parentNode() {
      return this.__shady_parentNode;
    },

    get nextSibling() {
      return this.__shady_nextSibling;
    },

    get previousSibling() {
      return this.__shady_previousSibling;
    },

    get nextElementSibling() {
      return this.__shady_nextElementSibling;
    },

    get previousElementSibling() {
      return this.__shady_previousElementSibling;
    },

    get className() {
      return this.__shady_className;
    },

    set className(a) {
      return this.__shady_className = a;
    }

  });

  function Ca(a) {
    for (var b in a) {
      var c = a[b];
      c && (c.enumerable = !1);
    }
  }

  Ca(za);
  Ca(Aa);
  Ca(Ba);
  var Da = u.c || !0 === u.g,
      Ea = Da ? function () {} : function (a) {
    var b = r(a);
    b.N || (b.N = !0, va(a, Ba));
  },
      Ga = Da ? function () {} : function (a) {
    var b = r(a);
    b.M || (b.M = !0, va(a, za), window.customElements && window.customElements.polyfillWrapFlushCallback && !u.g || va(a, Aa));
  };

  var E = "__eventWrappers" + Date.now(),
      Ha = function () {
    var a = Object.getOwnPropertyDescriptor(Event.prototype, "composed");
    return a ? function (b) {
      return a.get.call(b);
    } : null;
  }(),
      Ia = function () {
    function a() {}

    var b = !1,
        c = {
      get capture() {
        b = !0;
        return !1;
      }

    };
    window.addEventListener("test", a, c);
    window.removeEventListener("test", a, c);
    return b;
  }();

  function Ja(a) {
    if (a && "object" === typeof a) {
      var b = !!a.capture;
      var c = !!a.once;
      var d = !!a.passive;
      var e = a.i;
    } else b = !!a, d = c = !1;

    return {
      K: e,
      capture: b,
      once: c,
      passive: d,
      J: Ia ? a : b
    };
  }

  var Ka = {
    blur: !0,
    focus: !0,
    focusin: !0,
    focusout: !0,
    click: !0,
    dblclick: !0,
    mousedown: !0,
    mouseenter: !0,
    mouseleave: !0,
    mousemove: !0,
    mouseout: !0,
    mouseover: !0,
    mouseup: !0,
    wheel: !0,
    beforeinput: !0,
    input: !0,
    keydown: !0,
    keyup: !0,
    compositionstart: !0,
    compositionupdate: !0,
    compositionend: !0,
    touchstart: !0,
    touchend: !0,
    touchmove: !0,
    touchcancel: !0,
    pointerover: !0,
    pointerenter: !0,
    pointerdown: !0,
    pointermove: !0,
    pointerup: !0,
    pointercancel: !0,
    pointerout: !0,
    pointerleave: !0,
    gotpointercapture: !0,
    lostpointercapture: !0,
    dragstart: !0,
    drag: !0,
    dragenter: !0,
    dragleave: !0,
    dragover: !0,
    drop: !0,
    dragend: !0,
    DOMActivate: !0,
    DOMFocusIn: !0,
    DOMFocusOut: !0,
    keypress: !0
  },
      La = {
    DOMAttrModified: !0,
    DOMAttributeNameChanged: !0,
    DOMCharacterDataModified: !0,
    DOMElementNameChanged: !0,
    DOMNodeInserted: !0,
    DOMNodeInsertedIntoDocument: !0,
    DOMNodeRemoved: !0,
    DOMNodeRemovedFromDocument: !0,
    DOMSubtreeModified: !0
  };

  function Ma(a) {
    return a instanceof Node ? a.__shady_getRootNode() : a;
  }

  function F(a, b) {
    var c = [],
        d = a;

    for (a = Ma(a); d;) {
      c.push(d), d.__shady_assignedSlot ? d = d.__shady_assignedSlot : d.nodeType === Node.DOCUMENT_FRAGMENT_NODE && d.host && (b || d !== a) ? d = d.host : d = d.__shady_parentNode;
    }

    c[c.length - 1] === document && c.push(window);
    return c;
  }

  function Na(a) {
    a.__composedPath || (a.__composedPath = F(a.target, !0));
    return a.__composedPath;
  }

  function Oa(a, b) {
    if (!w) return a;
    a = F(a, !0);

    for (var c = 0, d, e = void 0, f, g = void 0; c < b.length; c++) {
      if (d = b[c], f = Ma(d), f !== e && (g = a.indexOf(f), e = f), !w(f) || -1 < g) return d;
    }
  }

  function Pa(a) {
    function b(c, d) {
      c = new a(c, d);
      c.__composed = d && !!d.composed;
      return c;
    }

    b.__proto__ = a;
    b.prototype = a.prototype;
    return b;
  }

  var Qa = {
    focus: !0,
    blur: !0
  };

  function Ra(a) {
    return a.__target !== a.target || a.__relatedTarget !== a.relatedTarget;
  }

  function Sa(a, b, c) {
    if (c = b.__handlers && b.__handlers[a.type] && b.__handlers[a.type][c]) for (var d = 0, e; (e = c[d]) && (!Ra(a) || a.target !== a.relatedTarget) && (e.call(b, a), !a.__immediatePropagationStopped); d++) {
      ;
    }
  }

  function Ta(a) {
    var b = a.composedPath();
    Object.defineProperty(a, "currentTarget", {
      get: function get() {
        return d;
      },
      configurable: !0
    });

    for (var c = b.length - 1; 0 <= c; c--) {
      var d = b[c];
      Sa(a, d, "capture");
      if (a.B) return;
    }

    Object.defineProperty(a, "eventPhase", {
      get: function get() {
        return Event.AT_TARGET;
      }
    });
    var e;

    for (c = 0; c < b.length; c++) {
      d = b[c];
      var f = t(d);
      f = f && f.root;
      if (0 === c || f && f === e) if (Sa(a, d, "bubble"), d !== window && (e = d.__shady_getRootNode()), a.B) break;
    }
  }

  function Ua(a, b, c, d, e, f) {
    for (var g = 0; g < a.length; g++) {
      var h = a[g],
          m = h.type,
          k = h.capture,
          l = h.once,
          q = h.passive;
      if (b === h.node && c === m && d === k && e === l && f === q) return g;
    }

    return -1;
  }

  function Va(a) {
    C();
    return this.__shady_native_dispatchEvent(a);
  }

  function Wa(a, b, c) {
    var d = Ja(c),
        e = d.capture,
        f = d.once,
        g = d.passive,
        h = d.K;
    d = d.J;

    if (b) {
      var m = typeof b;
      if ("function" === m || "object" === m) if ("object" !== m || b.handleEvent && "function" === typeof b.handleEvent) {
        if (La[a]) return this.__shady_native_addEventListener(a, b, d);
        var k = h || this;

        if (h = b[E]) {
          if (-1 < Ua(h, k, a, e, f, g)) return;
        } else b[E] = [];

        h = function h(l) {
          f && this.__shady_removeEventListener(a, b, c);
          l.__target || Xa(l);

          if (k !== this) {
            var q = Object.getOwnPropertyDescriptor(l, "currentTarget");
            Object.defineProperty(l, "currentTarget", {
              get: function get() {
                return k;
              },
              configurable: !0
            });
          }

          l.__previousCurrentTarget = l.currentTarget;
          if (!w(k) && "slot" !== k.localName || -1 != l.composedPath().indexOf(k)) if (l.composed || -1 < l.composedPath().indexOf(k)) if (Ra(l) && l.target === l.relatedTarget) l.eventPhase === Event.BUBBLING_PHASE && l.stopImmediatePropagation();else if (l.eventPhase === Event.CAPTURING_PHASE || l.bubbles || l.target === k || k instanceof Window) {
            var D = "function" === m ? b.call(k, l) : b.handleEvent && b.handleEvent(l);
            k !== this && (q ? (Object.defineProperty(l, "currentTarget", q), q = null) : delete l.currentTarget);
            return D;
          }
        };

        b[E].push({
          node: k,
          type: a,
          capture: e,
          once: f,
          passive: g,
          V: h
        });
        Qa[a] ? (this.__handlers = this.__handlers || {}, this.__handlers[a] = this.__handlers[a] || {
          capture: [],
          bubble: []
        }, this.__handlers[a][e ? "capture" : "bubble"].push(h)) : this.__shady_native_addEventListener(a, h, d);
      }
    }
  }

  function Ya(a, b, c) {
    if (b) {
      var d = Ja(c);
      c = d.capture;
      var e = d.once,
          f = d.passive,
          g = d.K;
      d = d.J;
      if (La[a]) return this.__shady_native_removeEventListener(a, b, d);
      var h = g || this;
      g = void 0;
      var m = null;

      try {
        m = b[E];
      } catch (k) {}

      m && (e = Ua(m, h, a, c, e, f), -1 < e && (g = m.splice(e, 1)[0].V, m.length || (b[E] = void 0)));

      this.__shady_native_removeEventListener(a, g || b, d);

      g && Qa[a] && this.__handlers && this.__handlers[a] && (a = this.__handlers[a][c ? "capture" : "bubble"], b = a.indexOf(g), -1 < b && a.splice(b, 1));
    }
  }

  function Za() {
    for (var a in Qa) {
      window.__shady_native_addEventListener(a, function (b) {
        b.__target || (Xa(b), Ta(b));
      }, !0);
    }
  }

  var $a = A({
    get composed() {
      void 0 === this.__composed && (Ha ? this.__composed = "focusin" === this.type || "focusout" === this.type || Ha(this) : !1 !== this.isTrusted && (this.__composed = Ka[this.type]));
      return this.__composed || !1;
    },

    composedPath: function composedPath() {
      this.__composedPath || (this.__composedPath = F(this.__target, this.composed));
      return this.__composedPath;
    },

    get target() {
      return Oa(this.currentTarget || this.__previousCurrentTarget, this.composedPath());
    },

    get relatedTarget() {
      if (!this.__relatedTarget) return null;
      this.__relatedTargetComposedPath || (this.__relatedTargetComposedPath = F(this.__relatedTarget, !0));
      return Oa(this.currentTarget || this.__previousCurrentTarget, this.__relatedTargetComposedPath);
    },

    stopPropagation: function stopPropagation() {
      Event.prototype.stopPropagation.call(this);
      this.B = !0;
    },
    stopImmediatePropagation: function stopImmediatePropagation() {
      Event.prototype.stopImmediatePropagation.call(this);
      this.B = this.__immediatePropagationStopped = !0;
    }
  });

  function Xa(a) {
    a.__target = a.target;
    a.__relatedTarget = a.relatedTarget;

    if (u.c) {
      var b = Object.getPrototypeOf(a);

      if (!b.hasOwnProperty("__shady_patchedProto")) {
        var c = Object.create(b);
        c.__shady_sourceProto = b;
        z(c, $a);
        b.__shady_patchedProto = c;
      }

      a.__proto__ = b.__shady_patchedProto;
    } else z(a, $a);
  }

  var ab = Pa(Event),
      bb = Pa(CustomEvent),
      cb = Pa(MouseEvent);

  function db() {
    if (!Ha && Object.getOwnPropertyDescriptor(Event.prototype, "isTrusted")) {
      var a = function a() {
        var b = new MouseEvent("click", {
          bubbles: !0,
          cancelable: !0,
          composed: !0
        });

        this.__shady_dispatchEvent(b);
      };

      Element.prototype.click ? Element.prototype.click = a : HTMLElement.prototype.click && (HTMLElement.prototype.click = a);
    }
  }

  var eb = Object.getOwnPropertyNames(Element.prototype).filter(function (a) {
    return "on" === a.substring(0, 2);
  }),
      fb = Object.getOwnPropertyNames(HTMLElement.prototype).filter(function (a) {
    return "on" === a.substring(0, 2);
  });

  function gb(a) {
    return {
      set: function set(b) {
        var c = r(this),
            d = a.substring(2);
        c.h || (c.h = {});
        c.h[a] && this.removeEventListener(d, c.h[a]);

        this.__shady_addEventListener(d, b);

        c.h[a] = b;
      },
      get: function get() {
        var b = t(this);
        return b && b.h && b.h[a];
      },
      configurable: !0
    };
  }

  ;
  var hb = A({
    dispatchEvent: Va,
    addEventListener: Wa,
    removeEventListener: Ya
  });
  var ib = window.document,
      jb = u.A,
      kb = Object.getOwnPropertyDescriptor(Node.prototype, "isConnected"),
      lb = kb && kb.get;

  function mb(a) {
    for (var b; b = a.__shady_firstChild;) {
      a.__shady_removeChild(b);
    }
  }

  function nb(a) {
    var b = t(a);
    if (b && void 0 !== b.w) for (b = a.__shady_firstChild; b; b = b.__shady_nextSibling) {
      nb(b);
    }
    if (a = t(a)) a.w = void 0;
  }

  function ob(a) {
    var b = a;

    if (a && "slot" === a.localName) {
      var c = t(a);
      (c = c && c.l) && (b = c.length ? c[0] : ob(a.__shady_nextSibling));
    }

    return b;
  }

  function pb(a, b, c) {
    if (a = (a = t(a)) && a.m) {
      if (b) if (b.nodeType === Node.DOCUMENT_FRAGMENT_NODE) for (var d = 0, e = b.childNodes.length; d < e; d++) {
        a.addedNodes.push(b.childNodes[d]);
      } else a.addedNodes.push(b);
      c && a.removedNodes.push(c);
      qb(a);
    }
  }

  var K = A({
    get parentNode() {
      var a = t(this);
      a = a && a.parentNode;
      return void 0 !== a ? a : this.__shady_native_parentNode;
    },

    get firstChild() {
      var a = t(this);
      a = a && a.firstChild;
      return void 0 !== a ? a : this.__shady_native_firstChild;
    },

    get lastChild() {
      var a = t(this);
      a = a && a.lastChild;
      return void 0 !== a ? a : this.__shady_native_lastChild;
    },

    get nextSibling() {
      var a = t(this);
      a = a && a.nextSibling;
      return void 0 !== a ? a : this.__shady_native_nextSibling;
    },

    get previousSibling() {
      var a = t(this);
      a = a && a.previousSibling;
      return void 0 !== a ? a : this.__shady_native_previousSibling;
    },

    get childNodes() {
      if (v(this)) {
        var a = t(this);

        if (!a.childNodes) {
          a.childNodes = [];

          for (var b = this.__shady_firstChild; b; b = b.__shady_nextSibling) {
            a.childNodes.push(b);
          }
        }

        var c = a.childNodes;
      } else c = this.__shady_native_childNodes;

      c.item = function (d) {
        return c[d];
      };

      return c;
    },

    get parentElement() {
      var a = t(this);
      (a = a && a.parentNode) && a.nodeType !== Node.ELEMENT_NODE && (a = null);
      return void 0 !== a ? a : this.__shady_native_parentElement;
    },

    get isConnected() {
      if (lb && lb.call(this)) return !0;
      if (this.nodeType == Node.DOCUMENT_FRAGMENT_NODE) return !1;
      var a = this.ownerDocument;

      if (qa) {
        if (a.__shady_native_contains(this)) return !0;
      } else if (a.documentElement && a.documentElement.__shady_native_contains(this)) return !0;

      for (a = this; a && !(a instanceof Document);) {
        a = a.__shady_parentNode || (w(a) ? a.host : void 0);
      }

      return !!(a && a instanceof Document);
    },

    get textContent() {
      if (v(this)) {
        for (var a = [], b = this.__shady_firstChild; b; b = b.__shady_nextSibling) {
          b.nodeType !== Node.COMMENT_NODE && a.push(b.__shady_textContent);
        }

        return a.join("");
      }

      return this.__shady_native_textContent;
    },

    set textContent(a) {
      if ("undefined" === typeof a || null === a) a = "";

      switch (this.nodeType) {
        case Node.ELEMENT_NODE:
        case Node.DOCUMENT_FRAGMENT_NODE:
          if (!v(this) && u.c) {
            var b = this.__shady_firstChild;
            (b != this.__shady_lastChild || b && b.nodeType != Node.TEXT_NODE) && mb(this);
            this.__shady_native_textContent = a;
          } else mb(this), (0 < a.length || this.nodeType === Node.ELEMENT_NODE) && this.__shady_insertBefore(document.createTextNode(a));

          break;

        default:
          this.nodeValue = a;
      }
    },

    insertBefore: function insertBefore(a, b) {
      if (this.ownerDocument !== ib && a.ownerDocument !== ib) return this.__shady_native_insertBefore(a, b), a;
      if (a === this) throw Error("Failed to execute 'appendChild' on 'Node': The new child element contains the parent.");

      if (b) {
        var c = t(b);
        c = c && c.parentNode;
        if (void 0 !== c && c !== this || void 0 === c && b.__shady_native_parentNode !== this) throw Error("Failed to execute 'insertBefore' on 'Node': The node before which the new node is to be inserted is not a child of this node.");
      }

      if (b === a) return a;
      pb(this, a);
      var d = [],
          e = (c = G(this)) ? c.host.localName : H(this),
          f = a.__shady_parentNode;

      if (f) {
        var g = H(a);
        var h = !!c || !G(a) || jb && void 0 !== this.__noInsertionPoint;

        f.__shady_removeChild(a, h);
      }

      f = !0;
      var m = (!jb || void 0 === a.__noInsertionPoint && void 0 === this.__noInsertionPoint) && !rb(a, e),
          k = c && !a.__noInsertionPoint && (!jb || a.nodeType === Node.DOCUMENT_FRAGMENT_NODE);
      if (k || m) m && (g = g || H(a)), sb(a, function (l) {
        k && "slot" === l.localName && d.push(l);

        if (m) {
          var q = g;
          I() && (q && tb(l, q), (q = I()) && q.scopeNode(l, e));
        }
      });
      d.length && (ub(c), c.f.push.apply(c.f, d instanceof Array ? d : ca(ba(d))), J(c));
      v(this) && (vb(a, this, b), h = t(this), h.root ? (f = !1, ja(this) && J(h.root)) : c && "slot" === this.localName && (f = !1, J(c)));
      f ? (c = w(this) ? this.host : this, b ? (b = ob(b), c.__shady_native_insertBefore(a, b)) : c.__shady_native_appendChild(a)) : a.ownerDocument !== this.ownerDocument && this.ownerDocument.adoptNode(a);
      return a;
    },
    appendChild: function appendChild(a) {
      if (this != a || !w(a)) return this.__shady_insertBefore(a);
    },
    removeChild: function removeChild(a, b) {
      b = void 0 === b ? !1 : b;
      if (this.ownerDocument !== ib) return this.__shady_native_removeChild(a);
      if (a.__shady_parentNode !== this) throw Error("The node to be removed is not a child of this node: " + a);
      pb(this, null, a);
      var c = G(a),
          d = c && wb(c, a),
          e = t(this);

      if (v(this) && (xb(a, this), ja(this))) {
        J(e.root);
        var f = !0;
      }

      if (I() && !b && c && a.nodeType !== Node.TEXT_NODE) {
        var g = H(a);
        sb(a, function (h) {
          tb(h, g);
        });
      }

      nb(a);
      c && ((b = "slot" === this.localName) && (f = !0), (d || b) && J(c));
      f || (f = w(this) ? this.host : this, (!e.root && "slot" !== a.localName || f === a.__shady_native_parentNode) && f.__shady_native_removeChild(a));
      return a;
    },
    replaceChild: function replaceChild(a, b) {
      this.__shady_insertBefore(a, b);

      this.__shady_removeChild(b);

      return a;
    },
    cloneNode: function cloneNode(a) {
      if ("template" == this.localName) return this.__shady_native_cloneNode(a);

      var b = this.__shady_native_cloneNode(!1);

      if (a && b.nodeType !== Node.ATTRIBUTE_NODE) {
        a = this.__shady_firstChild;

        for (var c; a; a = a.__shady_nextSibling) {
          c = a.__shady_cloneNode(!0), b.__shady_appendChild(c);
        }
      }

      return b;
    },
    getRootNode: function getRootNode(a) {
      if (this && this.nodeType) {
        var b = r(this),
            c = b.w;
        void 0 === c && (w(this) ? (c = this, b.w = c) : (c = (c = this.__shady_parentNode) ? c.__shady_getRootNode(a) : this, document.documentElement.__shady_native_contains(this) && (b.w = c)));
        return c;
      }
    },
    contains: function contains(a) {
      return ra(this, a);
    }
  });
  var M = A({
    get assignedSlot() {
      var a = this.__shady_parentNode;
      (a = a && a.__shady_shadowRoot) && L(a);
      return (a = t(this)) && a.assignedSlot || null;
    }

  });

  function yb(a, b, c) {
    var d = [];
    zb(a, b, c, d);
    return d;
  }

  function zb(a, b, c, d) {
    for (a = a.__shady_firstChild; a; a = a.__shady_nextSibling) {
      var e;

      if (e = a.nodeType === Node.ELEMENT_NODE) {
        e = a;
        var f = b,
            g = c,
            h = d,
            m = f(e);
        m && h.push(e);
        g && g(m) ? e = m : (zb(e, f, g, h), e = void 0);
      }

      if (e) break;
    }
  }

  var N = A({
    get firstElementChild() {
      var a = t(this);

      if (a && void 0 !== a.firstChild) {
        for (a = this.__shady_firstChild; a && a.nodeType !== Node.ELEMENT_NODE;) {
          a = a.__shady_nextSibling;
        }

        return a;
      }

      return this.__shady_native_firstElementChild;
    },

    get lastElementChild() {
      var a = t(this);

      if (a && void 0 !== a.lastChild) {
        for (a = this.__shady_lastChild; a && a.nodeType !== Node.ELEMENT_NODE;) {
          a = a.__shady_previousSibling;
        }

        return a;
      }

      return this.__shady_native_lastElementChild;
    },

    get children() {
      return v(this) ? y(Array.prototype.filter.call(ta(this), function (a) {
        return a.nodeType === Node.ELEMENT_NODE;
      })) : this.__shady_native_children;
    },

    get childElementCount() {
      var a = this.__shady_children;
      return a ? a.length : 0;
    }

  }),
      Ab = A({
    querySelector: function querySelector(a) {
      return yb(this, function (b) {
        return la.call(b, a);
      }, function (b) {
        return !!b;
      })[0] || null;
    },
    querySelectorAll: function querySelectorAll(a, b) {
      if (b) {
        b = Array.prototype.slice.call(this.__shady_native_querySelectorAll(a));

        var c = this.__shady_getRootNode();

        return y(b.filter(function (d) {
          return d.__shady_getRootNode() == c;
        }));
      }

      return y(yb(this, function (d) {
        return la.call(d, a);
      }));
    }
  }),
      Bb = u.A && !u.g ? wa({}, N) : N;
  wa(N, Ab);
  var Cb = null;

  function I() {
    Cb || (Cb = window.ShadyCSS && window.ShadyCSS.ScopingShim);
    return Cb || null;
  }

  function Db(a, b, c) {
    var d = I();
    return d && "class" === b ? (d.setElementClass(a, c), !0) : !1;
  }

  function tb(a, b) {
    var c = I();
    c && c.unscopeNode(a, b);
  }

  function rb(a, b) {
    var c = I();
    if (!c) return !0;

    if (a.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      c = !0;

      for (a = a.__shady_firstChild; a; a = a.__shady_nextSibling) {
        c = c && rb(a, b);
      }

      return c;
    }

    return a.nodeType !== Node.ELEMENT_NODE ? !0 : c.currentScopeForNode(a) === b;
  }

  function H(a) {
    if (a.nodeType !== Node.ELEMENT_NODE) return "";
    var b = I();
    return b ? b.currentScopeForNode(a) : "";
  }

  function sb(a, b) {
    if (a) for (a.nodeType === Node.ELEMENT_NODE && b(a), a = a.__shady_firstChild; a; a = a.__shady_nextSibling) {
      a.nodeType === Node.ELEMENT_NODE && sb(a, b);
    }
  }

  ;
  var Eb = window.document;

  function Fb(a, b) {
    if ("slot" === b) a = a.__shady_parentNode, ja(a) && J(t(a).root);else if ("slot" === a.localName && "name" === b && (b = G(a))) {
      if (b.a) {
        O(b);
        var c = a.O,
            d = Gb(a);

        if (d !== c) {
          c = b.b[c];
          var e = c.indexOf(a);
          0 <= e && c.splice(e, 1);
          c = b.b[d] || (b.b[d] = []);
          c.push(a);
          1 < c.length && (b.b[d] = Hb(c));
        }
      }

      J(b);
    }
  }

  var P = A({
    get previousElementSibling() {
      var a = t(this);

      if (a && void 0 !== a.previousSibling) {
        for (a = this.__shady_previousSibling; a && a.nodeType !== Node.ELEMENT_NODE;) {
          a = a.__shady_previousSibling;
        }

        return a;
      }

      return this.__shady_native_previousElementSibling;
    },

    get nextElementSibling() {
      var a = t(this);

      if (a && void 0 !== a.nextSibling) {
        for (a = this.__shady_nextSibling; a && a.nodeType !== Node.ELEMENT_NODE;) {
          a = a.__shady_nextSibling;
        }

        return a;
      }

      return this.__shady_native_nextElementSibling;
    },

    get slot() {
      return this.getAttribute("slot");
    },

    set slot(a) {
      this.__shady_setAttribute("slot", a);
    },

    get className() {
      return this.getAttribute("class") || "";
    },

    set className(a) {
      this.__shady_setAttribute("class", a);
    },

    setAttribute: function setAttribute(a, b) {
      this.ownerDocument !== Eb ? this.__shady_native_setAttribute(a, b) : Db(this, a, b) || (this.__shady_native_setAttribute(a, b), Fb(this, a));
    },
    removeAttribute: function removeAttribute(a) {
      this.ownerDocument !== Eb ? this.__shady_native_removeAttribute(a) : Db(this, a, "") ? "" === this.getAttribute(a) && this.__shady_native_removeAttribute(a) : (this.__shady_native_removeAttribute(a), Fb(this, a));
    }
  });
  u.A || eb.forEach(function (a) {
    P[a] = gb(a);
  });
  var Lb = A({
    attachShadow: function attachShadow(a) {
      if (!this) throw Error("Must provide a host.");
      if (!a) throw Error("Not enough arguments.");

      if (a.shadyUpgradeFragment && !u.L) {
        var b = a.shadyUpgradeFragment;
        b.__proto__ = ShadowRoot.prototype;
        Ib(b, this, a);
        Q(b, b);
        a = b.__noInsertionPoint ? null : b.querySelectorAll("slot");
        b.__noInsertionPoint = void 0;

        if (a && a.length) {
          var c = b;
          ub(c);
          c.f.push.apply(c.f, a instanceof Array ? a : ca(ba(a)));
          J(b);
        }

        b.host.__shady_native_appendChild(b);
      } else b = new Jb(Kb, this, a);

      return this.__CE_shadowRoot = b;
    },

    get shadowRoot() {
      var a = t(this);
      return a && a.U || null;
    }

  });
  wa(P, Lb);
  var Mb = /[&\u00A0"]/g,
      Nb = /[&\u00A0<>]/g;

  function Ob(a) {
    switch (a) {
      case "&":
        return "&amp;";

      case "<":
        return "&lt;";

      case ">":
        return "&gt;";

      case '"':
        return "&quot;";

      case "\u00a0":
        return "&nbsp;";
    }
  }

  function Pb(a) {
    for (var b = {}, c = 0; c < a.length; c++) {
      b[a[c]] = !0;
    }

    return b;
  }

  var Qb = Pb("area base br col command embed hr img input keygen link meta param source track wbr".split(" ")),
      Rb = Pb("style script xmp iframe noembed noframes plaintext noscript".split(" "));

  function Sb(a, b) {
    "template" === a.localName && (a = a.content);

    for (var c = "", d = b ? b(a) : a.childNodes, e = 0, f = d.length, g = void 0; e < f && (g = d[e]); e++) {
      a: {
        var h = g;
        var m = a,
            k = b;

        switch (h.nodeType) {
          case Node.ELEMENT_NODE:
            m = h.localName;

            for (var l = "<" + m, q = h.attributes, D = 0, Fa; Fa = q[D]; D++) {
              l += " " + Fa.name + '="' + Fa.value.replace(Mb, Ob) + '"';
            }

            l += ">";
            h = Qb[m] ? l : l + Sb(h, k) + "</" + m + ">";
            break a;

          case Node.TEXT_NODE:
            h = h.data;
            h = m && Rb[m.localName] ? h : h.replace(Nb, Ob);
            break a;

          case Node.COMMENT_NODE:
            h = "\x3c!--" + h.data + "--\x3e";
            break a;

          default:
            throw window.console.error(h), Error("not implemented");
        }
      }

      c += h;
    }

    return c;
  }

  ;
  var Tb = document.implementation.createHTMLDocument("inert"),
      Ub = A({
    get innerHTML() {
      return v(this) ? Sb("template" === this.localName ? this.content : this, ta) : this.__shady_native_innerHTML;
    },

    set innerHTML(a) {
      if ("template" === this.localName) this.__shady_native_innerHTML = a;else {
        mb(this);
        var b = this.localName || "div";
        b = this.namespaceURI && this.namespaceURI !== Tb.namespaceURI ? Tb.createElementNS(this.namespaceURI, b) : Tb.createElement(b);

        for (u.c ? b.__shady_native_innerHTML = a : b.innerHTML = a; a = b.__shady_firstChild;) {
          this.__shady_insertBefore(a);
        }
      }
    }

  });
  var Vb = A({
    blur: function blur() {
      var a = t(this);
      (a = (a = a && a.root) && a.activeElement) ? a.__shady_blur() : this.__shady_native_blur();
    }
  });
  u.A || fb.forEach(function (a) {
    Vb[a] = gb(a);
  });
  var Wb = A({
    assignedNodes: function assignedNodes(a) {
      if ("slot" === this.localName) {
        var b = this.__shady_getRootNode();

        b && w(b) && L(b);
        return (b = t(this)) ? (a && a.flatten ? b.l : b.assignedNodes) || [] : [];
      }
    },
    addEventListener: function addEventListener(a, b, c) {
      if ("slot" !== this.localName || "slotchange" === a) Wa.call(this, a, b, c);else {
        "object" !== typeof c && (c = {
          capture: !!c
        });
        var d = this.__shady_parentNode;
        if (!d) throw Error("ShadyDOM cannot attach event to slot unless it has a `parentNode`");
        c.i = this;

        d.__shady_addEventListener(a, b, c);
      }
    },
    removeEventListener: function removeEventListener(a, b, c) {
      if ("slot" !== this.localName || "slotchange" === a) Ya.call(this, a, b, c);else {
        "object" !== typeof c && (c = {
          capture: !!c
        });
        var d = this.__shady_parentNode;
        if (!d) throw Error("ShadyDOM cannot attach event to slot unless it has a `parentNode`");
        c.i = this;

        d.__shady_removeEventListener(a, b, c);
      }
    }
  });
  var Xb = A({
    getElementById: function getElementById(a) {
      return "" === a ? null : yb(this, function (b) {
        return b.id == a;
      }, function (b) {
        return !!b;
      })[0] || null;
    }
  });
  var Yb = A({
    get activeElement() {
      var a = u.c ? document.__shady_native_activeElement : document.activeElement;
      if (!a || !a.nodeType) return null;
      var b = !!w(this);
      if (!(this === document || b && this.host !== a && this.host.__shady_native_contains(a))) return null;

      for (b = G(a); b && b !== this;) {
        a = b.host, b = G(a);
      }

      return this === document ? b ? null : a : b === this ? a : null;
    }

  });
  var Zb = window.document,
      $b = A({
    importNode: function importNode(a, b) {
      if (a.ownerDocument !== Zb || "template" === a.localName) return this.__shady_native_importNode(a, b);

      var c = this.__shady_native_importNode(a, !1);

      if (b) for (a = a.__shady_firstChild; a; a = a.__shady_nextSibling) {
        b = this.__shady_importNode(a, !0), c.__shady_appendChild(b);
      }
      return c;
    }
  });
  var ac = A({
    dispatchEvent: Va,
    addEventListener: Wa.bind(window),
    removeEventListener: Ya.bind(window)
  });
  var R = {};
  Object.getOwnPropertyDescriptor(HTMLElement.prototype, "parentElement") && (R.parentElement = K.parentElement);
  Object.getOwnPropertyDescriptor(HTMLElement.prototype, "contains") && (R.contains = K.contains);
  Object.getOwnPropertyDescriptor(HTMLElement.prototype, "children") && (R.children = N.children);
  Object.getOwnPropertyDescriptor(HTMLElement.prototype, "innerHTML") && (R.innerHTML = Ub.innerHTML);
  Object.getOwnPropertyDescriptor(HTMLElement.prototype, "className") && (R.className = P.className);
  var S = {
    EventTarget: [hb],
    Node: [K, window.EventTarget ? null : hb],
    Text: [M],
    Comment: [M],
    CDATASection: [M],
    ProcessingInstruction: [M],
    Element: [P, N, M, !u.c || "innerHTML" in Element.prototype ? Ub : null, window.HTMLSlotElement ? null : Wb],
    HTMLElement: [Vb, R],
    HTMLSlotElement: [Wb],
    DocumentFragment: [Bb, Xb],
    Document: [$b, Bb, Xb, Yb],
    Window: [ac]
  },
      bc = u.c ? null : ["innerHTML", "textContent"];

  function T(a, b, c, d) {
    b.forEach(function (e) {
      return a && e && z(a, e, c, d);
    });
  }

  function cc(a) {
    var b = a ? null : bc,
        c;

    for (c in S) {
      T(window[c] && window[c].prototype, S[c], a, b);
    }
  }

  ["Text", "Comment", "CDATASection", "ProcessingInstruction"].forEach(function (a) {
    var b = window[a],
        c = Object.create(b.prototype);
    c.__shady_protoIsPatched = !0;
    T(c, S.EventTarget);
    T(c, S.Node);
    S[a] && T(c, S[a]);
    b.prototype.__shady_patchedProto = c;
  });

  function dc(a) {
    a.__shady_protoIsPatched = !0;
    T(a, S.EventTarget);
    T(a, S.Node);
    T(a, S.Element);
    T(a, S.HTMLElement);
    T(a, S.HTMLSlotElement);
    return a;
  }

  ;
  var ec = u.G,
      fc = u.c;

  function gc(a, b) {
    if (ec && !a.__shady_protoIsPatched && !w(a)) {
      var c = Object.getPrototypeOf(a),
          d = c.hasOwnProperty("__shady_patchedProto") && c.__shady_patchedProto;

      d || (d = Object.create(c), dc(d), c.__shady_patchedProto = d);
      Object.setPrototypeOf(a, d);
    }

    fc || (1 === b ? Ea(a) : 2 === b && Ga(a));
  }

  function hc(a, b, c, d) {
    gc(a, 1);
    d = d || null;
    var e = r(a),
        f = d ? r(d) : null;
    e.previousSibling = d ? f.previousSibling : b.__shady_lastChild;
    if (f = t(e.previousSibling)) f.nextSibling = a;
    if (f = t(e.nextSibling = d)) f.previousSibling = a;
    e.parentNode = b;
    d ? d === c.firstChild && (c.firstChild = a) : (c.lastChild = a, c.firstChild || (c.firstChild = a));
    c.childNodes = null;
  }

  function vb(a, b, c) {
    gc(b, 2);
    var d = r(b);
    void 0 !== d.firstChild && (d.childNodes = null);
    if (a.nodeType === Node.DOCUMENT_FRAGMENT_NODE) for (a = a.__shady_native_firstChild; a; a = a.__shady_native_nextSibling) {
      hc(a, b, d, c);
    } else hc(a, b, d, c);
  }

  function xb(a, b) {
    var c = r(a);
    b = r(b);
    a === b.firstChild && (b.firstChild = c.nextSibling);
    a === b.lastChild && (b.lastChild = c.previousSibling);
    a = c.previousSibling;
    var d = c.nextSibling;
    a && (r(a).nextSibling = d);
    d && (r(d).previousSibling = a);
    c.parentNode = c.previousSibling = c.nextSibling = void 0;
    void 0 !== b.childNodes && (b.childNodes = null);
  }

  function Q(a, b) {
    var c = r(a);

    if (b || void 0 === c.firstChild) {
      c.childNodes = null;
      var d = c.firstChild = a.__shady_native_firstChild;
      c.lastChild = a.__shady_native_lastChild;
      gc(a, 2);
      c = d;

      for (d = void 0; c; c = c.__shady_native_nextSibling) {
        var e = r(c);
        e.parentNode = b || a;
        e.nextSibling = c.__shady_native_nextSibling;
        e.previousSibling = d || null;
        d = c;
        gc(c, 1);
      }
    }
  }

  ;
  var ic = A({
    addEventListener: function addEventListener(a, b, c) {
      "object" !== typeof c && (c = {
        capture: !!c
      });
      c.i = c.i || this;

      this.host.__shady_addEventListener(a, b, c);
    },
    removeEventListener: function removeEventListener(a, b, c) {
      "object" !== typeof c && (c = {
        capture: !!c
      });
      c.i = c.i || this;

      this.host.__shady_removeEventListener(a, b, c);
    }
  });

  function jc(a, b) {
    z(a, ic, b);
    z(a, Yb, b);
    z(a, Ub, b);
    z(a, N, b);
    u.g && !b ? (z(a, K, b), z(a, Xb, b)) : u.c || (z(a, Ba), z(a, za), z(a, Aa));
  }

  ;
  var Kb = {},
      U = u.deferConnectionCallbacks && "loading" === document.readyState,
      kc;

  function lc(a) {
    var b = [];

    do {
      b.unshift(a);
    } while (a = a.__shady_parentNode);

    return b;
  }

  function Jb(a, b, c) {
    if (a !== Kb) throw new TypeError("Illegal constructor");
    this.a = null;
    Ib(this, b, c);
  }

  function Ib(a, b, c) {
    a.host = b;
    a.mode = c && c.mode;
    Q(a.host);
    b = r(a.host);
    b.root = a;
    b.U = "closed" !== a.mode ? a : null;
    b = r(a);
    b.firstChild = b.lastChild = b.parentNode = b.nextSibling = b.previousSibling = null;
    if (u.preferPerformance) for (; b = a.host.__shady_native_firstChild;) {
      a.host.__shady_native_removeChild(b);
    } else J(a);
  }

  function J(a) {
    a.j || (a.j = !0, ya(function () {
      return L(a);
    }));
  }

  function L(a) {
    var b;

    if (b = a.j) {
      for (var c; a;) {
        a: {
          a.j && (c = a), b = a;
          a = b.host.__shady_getRootNode();
          if (w(a) && (b = t(b.host)) && 0 < b.s) break a;
          a = void 0;
        }
      }

      b = c;
    }

    (c = b) && c._renderSelf();
  }

  Jb.prototype._renderSelf = function () {
    var a = U;
    U = !0;
    this.j = !1;

    if (this.a) {
      O(this);

      for (var b = 0, c; b < this.a.length; b++) {
        c = this.a[b];
        var d = t(c),
            e = d.assignedNodes;
        d.assignedNodes = [];
        d.l = [];
        if (d.I = e) for (d = 0; d < e.length; d++) {
          var f = t(e[d]);
          f.C = f.assignedSlot;
          f.assignedSlot === c && (f.assignedSlot = null);
        }
      }

      for (b = this.host.__shady_firstChild; b; b = b.__shady_nextSibling) {
        mc(this, b);
      }

      for (b = 0; b < this.a.length; b++) {
        c = this.a[b];
        e = t(c);
        if (!e.assignedNodes.length) for (d = c.__shady_firstChild; d; d = d.__shady_nextSibling) {
          mc(this, d, c);
        }
        (d = (d = t(c.__shady_parentNode)) && d.root) && (ka(d) || d.j) && d._renderSelf();
        nc(this, e.l, e.assignedNodes);

        if (d = e.I) {
          for (f = 0; f < d.length; f++) {
            t(d[f]).C = null;
          }

          e.I = null;
          d.length > e.assignedNodes.length && (e.D = !0);
        }

        e.D && (e.D = !1, oc(this, c));
      }

      c = this.a;
      b = [];

      for (e = 0; e < c.length; e++) {
        d = c[e].__shady_parentNode, (f = t(d)) && f.root || !(0 > b.indexOf(d)) || b.push(d);
      }

      for (c = 0; c < b.length; c++) {
        f = b[c];
        e = f === this ? this.host : f;
        d = [];

        for (f = f.__shady_firstChild; f; f = f.__shady_nextSibling) {
          if ("slot" == f.localName) for (var g = t(f).l, h = 0; h < g.length; h++) {
            d.push(g[h]);
          } else d.push(f);
        }

        f = sa(e);
        g = ea(d, d.length, f, f.length);

        for (var m = h = 0, k = void 0; h < g.length && (k = g[h]); h++) {
          for (var l = 0, q = void 0; l < k.o.length && (q = k.o[l]); l++) {
            q.__shady_native_parentNode === e && e.__shady_native_removeChild(q), f.splice(k.index + m, 1);
          }

          m -= k.u;
        }

        m = 0;

        for (k = void 0; m < g.length && (k = g[m]); m++) {
          for (h = f[k.index], l = k.index; l < k.index + k.u; l++) {
            q = d[l], e.__shady_native_insertBefore(q, h), f.splice(l, 0, q);
          }
        }
      }
    }

    if (!u.preferPerformance && !this.H) for (b = this.host.__shady_firstChild; b; b = b.__shady_nextSibling) {
      c = t(b), b.__shady_native_parentNode !== this.host || "slot" !== b.localName && c.assignedSlot || this.host.__shady_native_removeChild(b);
    }
    this.H = !0;
    U = a;
    kc && kc();
  };

  function mc(a, b, c) {
    var d = r(b),
        e = d.C;
    d.C = null;
    c || (c = (a = a.b[b.__shady_slot || "__catchall"]) && a[0]);
    c ? (r(c).assignedNodes.push(b), d.assignedSlot = c) : d.assignedSlot = void 0;
    e !== d.assignedSlot && d.assignedSlot && (r(d.assignedSlot).D = !0);
  }

  function nc(a, b, c) {
    for (var d = 0, e = void 0; d < c.length && (e = c[d]); d++) {
      if ("slot" == e.localName) {
        var f = t(e).assignedNodes;
        f && f.length && nc(a, b, f);
      } else b.push(c[d]);
    }
  }

  function oc(a, b) {
    b.__shady_native_dispatchEvent(new Event("slotchange"));

    b = t(b);
    b.assignedSlot && oc(a, b.assignedSlot);
  }

  function ub(a) {
    a.f = a.f || [];
    a.a = a.a || [];
    a.b = a.b || {};
  }

  function O(a) {
    if (a.f && a.f.length) {
      for (var b = a.f, c, d = 0; d < b.length; d++) {
        var e = b[d];
        Q(e);
        var f = e.__shady_parentNode;
        Q(f);
        f = t(f);
        f.s = (f.s || 0) + 1;
        f = Gb(e);
        a.b[f] ? (c = c || {}, c[f] = !0, a.b[f].push(e)) : a.b[f] = [e];
        a.a.push(e);
      }

      if (c) for (var g in c) {
        a.b[g] = Hb(a.b[g]);
      }
      a.f = [];
    }
  }

  function Gb(a) {
    var b = a.name || a.getAttribute("name") || "__catchall";
    return a.O = b;
  }

  function Hb(a) {
    return a.sort(function (b, c) {
      b = lc(b);

      for (var d = lc(c), e = 0; e < b.length; e++) {
        c = b[e];
        var f = d[e];
        if (c !== f) return b = ta(c.__shady_parentNode), b.indexOf(c) - b.indexOf(f);
      }
    });
  }

  function wb(a, b) {
    if (a.a) {
      O(a);
      var c = a.b,
          d;

      for (d in c) {
        for (var e = c[d], f = 0; f < e.length; f++) {
          var g = e[f];

          if (ra(b, g)) {
            e.splice(f, 1);
            var h = a.a.indexOf(g);
            0 <= h && (a.a.splice(h, 1), (h = t(g.__shady_parentNode)) && h.s && h.s--);
            f--;
            g = t(g);
            if (h = g.l) for (var m = 0; m < h.length; m++) {
              var k = h[m],
                  l = k.__shady_native_parentNode;
              l && l.__shady_native_removeChild(k);
            }
            g.l = [];
            g.assignedNodes = [];
            h = !0;
          }
        }
      }

      return h;
    }
  }

  function ka(a) {
    O(a);
    return !(!a.a || !a.a.length);
  }

  (function (a) {
    a.__proto__ = DocumentFragment.prototype;
    jc(a, "__shady_");
    jc(a);
    Object.defineProperties(a, {
      nodeType: {
        value: Node.DOCUMENT_FRAGMENT_NODE,
        configurable: !0
      },
      nodeName: {
        value: "#document-fragment",
        configurable: !0
      },
      nodeValue: {
        value: null,
        configurable: !0
      }
    });
    ["localName", "namespaceURI", "prefix"].forEach(function (b) {
      Object.defineProperty(a, b, {
        value: void 0,
        configurable: !0
      });
    });
    ["ownerDocument", "baseURI", "isConnected"].forEach(function (b) {
      Object.defineProperty(a, b, {
        get: function get() {
          return this.host[b];
        },
        configurable: !0
      });
    });
  })(Jb.prototype);

  if (window.customElements && window.customElements.define && u.F && !u.preferPerformance) {
    var pc = new Map();

    kc = function kc() {
      var a = [];
      pc.forEach(function (d, e) {
        a.push([e, d]);
      });
      pc.clear();

      for (var b = 0; b < a.length; b++) {
        var c = a[b][0];
        a[b][1] ? c.__shadydom_connectedCallback() : c.__shadydom_disconnectedCallback();
      }
    };

    U && document.addEventListener("readystatechange", function () {
      U = !1;
      kc();
    }, {
      once: !0
    });

    var qc = function qc(a, b, c) {
      var d = 0,
          e = "__isConnected" + d++;
      if (b || c) a.prototype.connectedCallback = a.prototype.__shadydom_connectedCallback = function () {
        U ? pc.set(this, !0) : this[e] || (this[e] = !0, b && b.call(this));
      }, a.prototype.disconnectedCallback = a.prototype.__shadydom_disconnectedCallback = function () {
        U ? this.isConnected || pc.set(this, !1) : this[e] && (this[e] = !1, c && c.call(this));
      };
      return a;
    },
        rc = window.customElements.define,
        sc = function sc(a, b) {
      var c = b.prototype.connectedCallback,
          d = b.prototype.disconnectedCallback;
      rc.call(window.customElements, a, qc(b, c, d));
      b.prototype.connectedCallback = c;
      b.prototype.disconnectedCallback = d;
    };

    window.customElements.define = sc;
    Object.defineProperty(window.CustomElementRegistry.prototype, "define", {
      value: sc,
      configurable: !0
    });
  }

  function G(a) {
    a = a.__shady_getRootNode();
    if (w(a)) return a;
  }

  ;

  function tc() {
    this.a = !1;
    this.addedNodes = [];
    this.removedNodes = [];
    this.v = new Set();
  }

  function qb(a) {
    a.a || (a.a = !0, pa(function () {
      a.flush();
    }));
  }

  tc.prototype.flush = function () {
    if (this.a) {
      this.a = !1;
      var a = this.takeRecords();
      a.length && this.v.forEach(function (b) {
        b(a);
      });
    }
  };

  tc.prototype.takeRecords = function () {
    if (this.addedNodes.length || this.removedNodes.length) {
      var a = [{
        addedNodes: this.addedNodes,
        removedNodes: this.removedNodes
      }];
      this.addedNodes = [];
      this.removedNodes = [];
      return a;
    }

    return [];
  };

  function uc(a, b) {
    var c = r(a);
    c.m || (c.m = new tc());
    c.m.v.add(b);
    var d = c.m;
    return {
      P: b,
      S: d,
      R: a,
      takeRecords: function takeRecords() {
        return d.takeRecords();
      }
    };
  }

  function vc(a) {
    var b = a && a.S;
    b && (b.v.delete(a.P), b.v.size || (r(a.R).m = null));
  }

  function wc(a, b) {
    var c = b.getRootNode();
    return a.map(function (d) {
      var e = c === d.target.getRootNode();

      if (e && d.addedNodes) {
        if (e = [].slice.call(d.addedNodes).filter(function (f) {
          return c === f.getRootNode();
        }), e.length) return d = Object.create(d), Object.defineProperty(d, "addedNodes", {
          value: e,
          configurable: !0
        }), d;
      } else if (e) return d;
    }).filter(function (d) {
      return d;
    });
  }

  ;
  var xc = u.c,
      yc = {
    querySelector: function querySelector(a) {
      return this.__shady_native_querySelector(a);
    },
    querySelectorAll: function querySelectorAll(a) {
      return this.__shady_native_querySelectorAll(a);
    }
  },
      zc = {};

  function Ac(a) {
    zc[a] = function (b) {
      return b["__shady_native_" + a];
    };
  }

  function V(a, b) {
    z(a, b, "__shady_native_");

    for (var c in b) {
      Ac(c);
    }
  }

  function W(a, b) {
    b = void 0 === b ? [] : b;

    for (var c = 0; c < b.length; c++) {
      var d = b[c],
          e = Object.getOwnPropertyDescriptor(a, d);
      e && (Object.defineProperty(a, "__shady_native_" + d, e), e.value ? yc[d] || (yc[d] = e.value) : Ac(d));
    }
  }

  var X = document.createTreeWalker(document, NodeFilter.SHOW_ALL, null, !1),
      Y = document.createTreeWalker(document, NodeFilter.SHOW_ELEMENT, null, !1),
      Bc = document.implementation.createHTMLDocument("inert");

  function Cc(a) {
    for (var b; b = a.__shady_native_firstChild;) {
      a.__shady_native_removeChild(b);
    }
  }

  var Dc = ["firstElementChild", "lastElementChild", "children", "childElementCount"],
      Ec = ["querySelector", "querySelectorAll"];

  function Fc() {
    var a = ["dispatchEvent", "addEventListener", "removeEventListener"];
    window.EventTarget ? W(window.EventTarget.prototype, a) : (W(Node.prototype, a), W(Window.prototype, a));
    xc ? W(Node.prototype, "parentNode firstChild lastChild previousSibling nextSibling childNodes parentElement textContent".split(" ")) : V(Node.prototype, {
      parentNode: {
        get: function get() {
          X.currentNode = this;
          return X.parentNode();
        }
      },
      firstChild: {
        get: function get() {
          X.currentNode = this;
          return X.firstChild();
        }
      },
      lastChild: {
        get: function get() {
          X.currentNode = this;
          return X.lastChild();
        }
      },
      previousSibling: {
        get: function get() {
          X.currentNode = this;
          return X.previousSibling();
        }
      },
      nextSibling: {
        get: function get() {
          X.currentNode = this;
          return X.nextSibling();
        }
      },
      childNodes: {
        get: function get() {
          var b = [];
          X.currentNode = this;

          for (var c = X.firstChild(); c;) {
            b.push(c), c = X.nextSibling();
          }

          return b;
        }
      },
      parentElement: {
        get: function get() {
          Y.currentNode = this;
          return Y.parentNode();
        }
      },
      textContent: {
        get: function get() {
          switch (this.nodeType) {
            case Node.ELEMENT_NODE:
            case Node.DOCUMENT_FRAGMENT_NODE:
              for (var b = document.createTreeWalker(this, NodeFilter.SHOW_TEXT, null, !1), c = "", d; d = b.nextNode();) {
                c += d.nodeValue;
              }

              return c;

            default:
              return this.nodeValue;
          }
        },
        set: function set(b) {
          if ("undefined" === typeof b || null === b) b = "";

          switch (this.nodeType) {
            case Node.ELEMENT_NODE:
            case Node.DOCUMENT_FRAGMENT_NODE:
              Cc(this);
              (0 < b.length || this.nodeType === Node.ELEMENT_NODE) && this.__shady_native_insertBefore(document.createTextNode(b), void 0);
              break;

            default:
              this.nodeValue = b;
          }
        }
      }
    });
    W(Node.prototype, "appendChild insertBefore removeChild replaceChild cloneNode contains".split(" "));
    W(HTMLElement.prototype, ["parentElement", "contains"]);
    a = {
      firstElementChild: {
        get: function get() {
          Y.currentNode = this;
          return Y.firstChild();
        }
      },
      lastElementChild: {
        get: function get() {
          Y.currentNode = this;
          return Y.lastChild();
        }
      },
      children: {
        get: function get() {
          var b = [];
          Y.currentNode = this;

          for (var c = Y.firstChild(); c;) {
            b.push(c), c = Y.nextSibling();
          }

          return y(b);
        }
      },
      childElementCount: {
        get: function get() {
          return this.children ? this.children.length : 0;
        }
      }
    };
    xc ? (W(Element.prototype, Dc), W(Element.prototype, ["previousElementSibling", "nextElementSibling", "innerHTML", "className"]), W(HTMLElement.prototype, ["children", "innerHTML", "className"])) : (V(Element.prototype, a), V(Element.prototype, {
      previousElementSibling: {
        get: function get() {
          Y.currentNode = this;
          return Y.previousSibling();
        }
      },
      nextElementSibling: {
        get: function get() {
          Y.currentNode = this;
          return Y.nextSibling();
        }
      },
      innerHTML: {
        get: function get() {
          return Sb(this, sa);
        },
        set: function set(b) {
          var c = "template" === this.localName ? this.content : this;
          Cc(c);
          var d = this.localName || "div";
          d = this.namespaceURI && this.namespaceURI !== Bc.namespaceURI ? Bc.createElementNS(this.namespaceURI, d) : Bc.createElement(d);
          d.innerHTML = b;

          for (b = "template" === this.localName ? d.content : d; d = b.__shady_native_firstChild;) {
            c.__shady_native_insertBefore(d, void 0);
          }
        }
      },
      className: {
        get: function get() {
          return this.getAttribute("class") || "";
        },
        set: function set(b) {
          this.setAttribute("class", b);
        }
      }
    }));
    W(Element.prototype, "setAttribute getAttribute hasAttribute removeAttribute focus blur".split(" "));
    W(Element.prototype, Ec);
    W(HTMLElement.prototype, ["focus", "blur"]);
    window.HTMLTemplateElement && W(window.HTMLTemplateElement.prototype, ["innerHTML"]);
    xc ? W(DocumentFragment.prototype, Dc) : V(DocumentFragment.prototype, a);
    W(DocumentFragment.prototype, Ec);
    xc ? (W(Document.prototype, Dc), W(Document.prototype, ["activeElement"])) : V(Document.prototype, a);
    W(Document.prototype, ["importNode", "getElementById"]);
    W(Document.prototype, Ec);
  }

  ;

  function Z(a) {
    this.node = a;
  }

  n = Z.prototype;

  n.addEventListener = function (a, b, c) {
    return this.node.__shady_addEventListener(a, b, c);
  };

  n.removeEventListener = function (a, b, c) {
    return this.node.__shady_removeEventListener(a, b, c);
  };

  n.appendChild = function (a) {
    return this.node.__shady_appendChild(a);
  };

  n.insertBefore = function (a, b) {
    return this.node.__shady_insertBefore(a, b);
  };

  n.removeChild = function (a) {
    return this.node.__shady_removeChild(a);
  };

  n.replaceChild = function (a, b) {
    return this.node.__shady_replaceChild(a, b);
  };

  n.cloneNode = function (a) {
    return this.node.__shady_cloneNode(a);
  };

  n.getRootNode = function (a) {
    return this.node.__shady_getRootNode(a);
  };

  n.contains = function (a) {
    return this.node.__shady_contains(a);
  };

  n.dispatchEvent = function (a) {
    return this.node.__shady_dispatchEvent(a);
  };

  n.setAttribute = function (a, b) {
    this.node.__shady_setAttribute(a, b);
  };

  n.getAttribute = function (a) {
    return this.node.__shady_native_getAttribute(a);
  };

  n.removeAttribute = function (a) {
    this.node.__shady_removeAttribute(a);
  };

  n.attachShadow = function (a) {
    return this.node.__shady_attachShadow(a);
  };

  n.focus = function () {
    this.node.__shady_native_focus();
  };

  n.blur = function () {
    this.node.__shady_blur();
  };

  n.importNode = function (a, b) {
    if (this.node.nodeType === Node.DOCUMENT_NODE) return this.node.__shady_importNode(a, b);
  };

  n.getElementById = function (a) {
    if (this.node.nodeType === Node.DOCUMENT_NODE) return this.node.__shady_getElementById(a);
  };

  n.querySelector = function (a) {
    return this.node.__shady_querySelector(a);
  };

  n.querySelectorAll = function (a, b) {
    return this.node.__shady_querySelectorAll(a, b);
  };

  n.assignedNodes = function (a) {
    if ("slot" === this.node.localName) return this.node.__shady_assignedNodes(a);
  };

  da.Object.defineProperties(Z.prototype, {
    activeElement: {
      configurable: !0,
      enumerable: !0,
      get: function get() {
        if (w(this.node) || this.node.nodeType === Node.DOCUMENT_NODE) return this.node.__shady_activeElement;
      }
    },
    _activeElement: {
      configurable: !0,
      enumerable: !0,
      get: function get() {
        return this.activeElement;
      }
    },
    host: {
      configurable: !0,
      enumerable: !0,
      get: function get() {
        if (w(this.node)) return this.node.host;
      }
    },
    parentNode: {
      configurable: !0,
      enumerable: !0,
      get: function get() {
        return this.node.__shady_parentNode;
      }
    },
    firstChild: {
      configurable: !0,
      enumerable: !0,
      get: function get() {
        return this.node.__shady_firstChild;
      }
    },
    lastChild: {
      configurable: !0,
      enumerable: !0,
      get: function get() {
        return this.node.__shady_lastChild;
      }
    },
    nextSibling: {
      configurable: !0,
      enumerable: !0,
      get: function get() {
        return this.node.__shady_nextSibling;
      }
    },
    previousSibling: {
      configurable: !0,
      enumerable: !0,
      get: function get() {
        return this.node.__shady_previousSibling;
      }
    },
    childNodes: {
      configurable: !0,
      enumerable: !0,
      get: function get() {
        return this.node.__shady_childNodes;
      }
    },
    parentElement: {
      configurable: !0,
      enumerable: !0,
      get: function get() {
        return this.node.__shady_parentElement;
      }
    },
    firstElementChild: {
      configurable: !0,
      enumerable: !0,
      get: function get() {
        return this.node.__shady_firstElementChild;
      }
    },
    lastElementChild: {
      configurable: !0,
      enumerable: !0,
      get: function get() {
        return this.node.__shady_lastElementChild;
      }
    },
    nextElementSibling: {
      configurable: !0,
      enumerable: !0,
      get: function get() {
        return this.node.__shady_nextElementSibling;
      }
    },
    previousElementSibling: {
      configurable: !0,
      enumerable: !0,
      get: function get() {
        return this.node.__shady_previousElementSibling;
      }
    },
    children: {
      configurable: !0,
      enumerable: !0,
      get: function get() {
        return this.node.__shady_children;
      }
    },
    childElementCount: {
      configurable: !0,
      enumerable: !0,
      get: function get() {
        return this.node.__shady_childElementCount;
      }
    },
    shadowRoot: {
      configurable: !0,
      enumerable: !0,
      get: function get() {
        return this.node.__shady_shadowRoot;
      }
    },
    assignedSlot: {
      configurable: !0,
      enumerable: !0,
      get: function get() {
        return this.node.__shady_assignedSlot;
      }
    },
    isConnected: {
      configurable: !0,
      enumerable: !0,
      get: function get() {
        return this.node.__shady_isConnected;
      }
    },
    innerHTML: {
      configurable: !0,
      enumerable: !0,
      get: function get() {
        return this.node.__shady_innerHTML;
      },
      set: function set(a) {
        this.node.__shady_innerHTML = a;
      }
    },
    textContent: {
      configurable: !0,
      enumerable: !0,
      get: function get() {
        return this.node.__shady_textContent;
      },
      set: function set(a) {
        this.node.__shady_textContent = a;
      }
    },
    slot: {
      configurable: !0,
      enumerable: !0,
      get: function get() {
        return this.node.__shady_slot;
      },
      set: function set(a) {
        this.node.__shady_slot = a;
      }
    },
    className: {
      configurable: !0,
      enumerable: !0,
      get: function get() {
        return this.node.__shady_className;
      },
      set: function set(a) {
        return this.node.__shady_className = a;
      }
    }
  });

  function Gc(a) {
    Object.defineProperty(Z.prototype, a, {
      get: function get() {
        return this.node["__shady_" + a];
      },
      set: function set(b) {
        this.node["__shady_" + a] = b;
      },
      configurable: !0
    });
  }

  eb.forEach(function (a) {
    return Gc(a);
  });
  fb.forEach(function (a) {
    return Gc(a);
  });
  var Hc = new WeakMap();

  function Ic(a) {
    if (w(a) || a instanceof Z) return a;
    var b = Hc.get(a);
    b || (b = new Z(a), Hc.set(a, b));
    return b;
  }

  ;

  if (u.F) {
    var Jc = u.c ? function (a) {
      return a;
    } : function (a) {
      Ga(a);
      Ea(a);
      return a;
    };
    window.ShadyDOM = {
      inUse: u.F,
      patch: Jc,
      isShadyRoot: w,
      enqueue: ya,
      flush: C,
      flushInitial: function flushInitial(a) {
        !a.H && a.j && L(a);
      },
      settings: u,
      filterMutations: wc,
      observeChildren: uc,
      unobserveChildren: vc,
      deferConnectionCallbacks: u.deferConnectionCallbacks,
      preferPerformance: u.preferPerformance,
      handlesDynamicScoping: !0,
      wrap: u.g ? Ic : Jc,
      wrapIfNeeded: !0 === u.g ? Ic : function (a) {
        return a;
      },
      Wrapper: Z,
      composedPath: Na,
      noPatch: u.g,
      patchOnDemand: u.G,
      nativeMethods: yc,
      nativeTree: zc,
      patchElementProto: dc
    };
    Fc();
    cc("__shady_");
    Object.defineProperty(document, "_activeElement", Yb.activeElement);
    z(Window.prototype, ac, "__shady_");
    u.g ? u.G && z(Element.prototype, Lb) : (cc(), db());
    Za();
    window.Event = ab;
    window.CustomEvent = bb;
    window.MouseEvent = cb;
    window.ShadowRoot = Jb;
  }

  ;
}).call(this);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g; // This works in non-strict mode

g = function () {
  return this;
}();

try {
  // This works if eval is allowed (see CSP)
  g = g || new Function("return this")();
} catch (e) {
  // This works if the window reference is available
  if (typeof window === "object") g = window;
} // g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}


module.exports = g;

/***/ })

}]);
//# sourceMappingURL=vendors~shadydom-hydejack-9.0.0-rc.js.map