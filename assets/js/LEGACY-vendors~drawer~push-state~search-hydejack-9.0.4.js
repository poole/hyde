/*!
 *  __  __                __                                     __
 * /\ \/\ \              /\ \             __                    /\ \
 * \ \ \_\ \   __  __    \_\ \      __   /\_\      __       ___ \ \ \/'\
 *  \ \  _  \ /\ \/\ \   /'_` \   /'__`\ \/\ \   /'__`\    /'___\\ \ , <
 *   \ \ \ \ \\ \ \_\ \ /\ \L\ \ /\  __/  \ \ \ /\ \L\.\_ /\ \__/ \ \ \\`\
 *    \ \_\ \_\\/`____ \\ \___,_\\ \____\ _\ \ \\ \__/.\_\\ \____\ \ \_\ \_\
 *     \/_/\/_/ `/___/> \\/__,_ / \/____//\ \_\ \\/__/\/_/ \/____/  \/_/\/_/
 *                 /\___/                \ \____/
 *                 \/__/                  \/___/
 *
 * Powered by Hydejack v9.0.4 <https://hydejack.com/>
 */
(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{310:function(t,e,n){"use strict";n.d(e,"e",(function(){return a.a})),n.d(e,"g",(function(){return s.b})),n.d(e,"i",(function(){return s.c})),n.d(e,"a",(function(){return r.b})),n.d(e,"b",(function(){return r.e})),n.d(e,"c",(function(){return r.g})),n.d(e,"h",(function(){return c.b})),n.d(e,"d",(function(){return l.c})),n.d(e,"f",(function(){return f}));var r=n(311);function i(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
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
var o=new(function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t)}var e,n,o;return e=t,(n=[{key:"handleAttributeExpressions",value:function(t,e,n,i){var o=e[0];return"."===o?new r.f(t,e.slice(1),n).parts:"@"===o?[new r.d(t,e.slice(1),i.eventContext)]:"?"===o?[new r.c(t,e.slice(1),n)]:new r.a(t,e,n).parts}},{key:"handleTextExpression",value:function(t){return new r.e(t)}}])&&i(e.prototype,n),o&&i(e,o),t}()),u=n(316),a=n(318),s=n(314),c=(n(319),n(321)),l=(n(317),n(320),n(312));
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
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
"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.2.1");var f=function(t){for(var e=arguments.length,n=new Array(e>1?e-1:0),r=1;r<e;r++)n[r-1]=arguments[r];return new u.b(t,n,"html",o)}},311:function(t,e,n){"use strict";n.d(e,"a",(function(){return O})),n.d(e,"b",(function(){return N})),n.d(e,"e",(function(){return k})),n.d(e,"c",(function(){return S})),n.d(e,"f",(function(){return j})),n.d(e,"g",(function(){return E})),n.d(e,"d",(function(){return A}));var r=n(318),i=n(314),o=n(319),u=n(320),a=n(316),s=n(312);function c(t,e,n){return(c="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,e,n){var r=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=p(t)););return t}(t,e);if(r){var i=Object.getOwnPropertyDescriptor(r,e);return i.get?i.get.call(n):i.value}})(t,e,n||t)}function l(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&f(t,e)}function f(t,e){return(f=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function h(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=p(t);if(e){var i=p(this).constructor;n=Reflect.construct(r,arguments,i)}else n=r.apply(this,arguments);return d(this,n)}}function d(t,e){return!e||"object"!==_(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function p(t){return(p=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function v(t,e){var n;if("undefined"==typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(n=function(t,e){if(!t)return;if("string"==typeof t)return y(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return y(t,e)}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var r=0,i=function(){};return{s:i,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,u=!0,a=!1;return{s:function(){n=t[Symbol.iterator]()},n:function(){var t=n.next();return u=t.done,t},e:function(t){a=!0,o=t},f:function(){try{u||null==n.return||n.return()}finally{if(a)throw o}}}}function y(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function m(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function b(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function g(t,e,n){return e&&b(t.prototype,e),n&&b(t,n),t}function _(t){return(_="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */var w=function(t){return null===t||!("object"===_(t)||"function"==typeof t)},x=function(t){return Array.isArray(t)||!(!t||!t[Symbol.iterator])},O=function(){function t(e,n,r){m(this,t),this.dirty=!0,this.element=e,this.name=n,this.strings=r,this.parts=[];for(var i=0;i<r.length-1;i++)this.parts[i]=this._createPart()}return g(t,[{key:"_createPart",value:function(){return new N(this)}},{key:"_getValue",value:function(){for(var t=this.strings,e=t.length-1,n="",r=0;r<e;r++){n+=t[r];var i=this.parts[r];if(void 0!==i){var o=i.value;if(w(o)||!x(o))n+="string"==typeof o?o:String(o);else{var u,a=v(o);try{for(a.s();!(u=a.n()).done;){var s=u.value;n+="string"==typeof s?s:String(s)}}catch(t){a.e(t)}finally{a.f()}}}}return n+=t[e]}},{key:"commit",value:function(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}]),t}(),N=function(){function t(e){m(this,t),this.value=void 0,this.committer=e}return g(t,[{key:"setValue",value:function(t){t===o.a||w(t)&&t===this.value||(this.value=t,Object(r.b)(t)||(this.committer.dirty=!0))}},{key:"commit",value:function(){for(;Object(r.b)(this.value);){var t=this.value;this.value=o.a,t(this)}this.value!==o.a&&this.committer.commit()}}]),t}(),k=function(){function t(e){m(this,t),this.value=void 0,this.__pendingValue=void 0,this.options=e}return g(t,[{key:"appendInto",value:function(t){this.startNode=t.appendChild(Object(s.c)()),this.endNode=t.appendChild(Object(s.c)())}},{key:"insertAfterNode",value:function(t){this.startNode=t,this.endNode=t.nextSibling}},{key:"appendIntoPart",value:function(t){t.__insert(this.startNode=Object(s.c)()),t.__insert(this.endNode=Object(s.c)())}},{key:"insertAfterPart",value:function(t){t.__insert(this.startNode=Object(s.c)()),this.endNode=t.endNode,t.endNode=this.startNode}},{key:"setValue",value:function(t){this.__pendingValue=t}},{key:"commit",value:function(){if(null!==this.startNode.parentNode){for(;Object(r.b)(this.__pendingValue);){var t=this.__pendingValue;this.__pendingValue=o.a,t(this)}var e=this.__pendingValue;e!==o.a&&(w(e)?e!==this.value&&this.__commitText(e):e instanceof a.b?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):x(e)?this.__commitIterable(e):e===o.b?(this.value=o.b,this.clear()):this.__commitText(e))}}},{key:"__insert",value:function(t){this.endNode.parentNode.insertBefore(t,this.endNode)}},{key:"__commitNode",value:function(t){this.value!==t&&(this.clear(),this.__insert(t),this.value=t)}},{key:"__commitText",value:function(t){var e=this.startNode.nextSibling,n="string"==typeof(t=null==t?"":t)?t:String(t);e===this.endNode.previousSibling&&3===e.nodeType?e.data=n:this.__commitNode(document.createTextNode(n)),this.value=t}},{key:"__commitTemplateResult",value:function(t){var e=this.options.templateFactory(t);if(this.value instanceof u.a&&this.value.template===e)this.value.update(t.values);else{var n=new u.a(e,t.processor,this.options),r=n._clone();n.update(t.values),this.__commitNode(r),this.value=n}}},{key:"__commitIterable",value:function(e){Array.isArray(this.value)||(this.value=[],this.clear());var n,r,i=this.value,o=0,u=v(e);try{for(u.s();!(r=u.n()).done;){var a=r.value;void 0===(n=i[o])&&(n=new t(this.options),i.push(n),0===o?n.appendIntoPart(this):n.insertAfterPart(i[o-1])),n.setValue(a),n.commit(),o++}}catch(t){u.e(t)}finally{u.f()}o<i.length&&(i.length=o,this.clear(n&&n.endNode))}},{key:"clear",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.startNode;Object(i.b)(this.startNode.parentNode,t.nextSibling,this.endNode)}}]),t}(),S=function(){function t(e,n,r){if(m(this,t),this.value=void 0,this.__pendingValue=void 0,2!==r.length||""!==r[0]||""!==r[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=n,this.strings=r}return g(t,[{key:"setValue",value:function(t){this.__pendingValue=t}},{key:"commit",value:function(){for(;Object(r.b)(this.__pendingValue);){var t=this.__pendingValue;this.__pendingValue=o.a,t(this)}if(this.__pendingValue!==o.a){var e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=o.a}}}]),t}(),j=function(t){l(n,t);var e=h(n);function n(t,r,i){var o;return m(this,n),(o=e.call(this,t,r,i)).single=2===i.length&&""===i[0]&&""===i[1],o}return g(n,[{key:"_createPart",value:function(){return new E(this)}},{key:"_getValue",value:function(){return this.single?this.parts[0].value:c(p(n.prototype),"_getValue",this).call(this)}},{key:"commit",value:function(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}]),n}(O),E=function(t){l(n,t);var e=h(n);function n(){return m(this,n),e.apply(this,arguments)}return n}(N),T=!1;!function(){try{var t={get capture(){return T=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}}();var A=function(){function t(e,n,r){var i=this;m(this,t),this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=n,this.eventContext=r,this.__boundHandleEvent=function(t){return i.handleEvent(t)}}return g(t,[{key:"setValue",value:function(t){this.__pendingValue=t}},{key:"commit",value:function(){for(;Object(r.b)(this.__pendingValue);){var t=this.__pendingValue;this.__pendingValue=o.a,t(this)}if(this.__pendingValue!==o.a){var e=this.__pendingValue,n=this.value,i=null==e||null!=n&&(e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive),u=null!=e&&(null==n||i);i&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),u&&(this.__options=V(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=o.a}}},{key:"handleEvent",value:function(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}]),t}(),V=function(t){return t&&(T?{capture:t.capture,passive:t.passive,once:t.once}:t.capture)}},312:function(t,e,n){"use strict";n.d(e,"f",(function(){return r})),n.d(e,"g",(function(){return i})),n.d(e,"b",(function(){return u})),n.d(e,"a",(function(){return a})),n.d(e,"d",(function(){return c})),n.d(e,"c",(function(){return l})),n.d(e,"e",(function(){return f}));
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
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
var r="{{lit-".concat(String(Math.random()).slice(2),"}}"),i="\x3c!--".concat(r,"--\x3e"),o=new RegExp("".concat(r,"|").concat(i)),u="$lit$",a=function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.parts=[],this.element=n;for(var i=[],a=[],c=document.createTreeWalker(n.content,133,null,!1),h=0,d=-1,p=0,v=e.strings,y=e.values.length;p<y;){var m=c.nextNode();if(null!==m){if(d++,1===m.nodeType){if(m.hasAttributes()){for(var b=m.attributes,g=b.length,_=0,w=0;w<g;w++)s(b[w].name,u)&&_++;for(;_-- >0;){var x=v[p],O=f.exec(x)[2],N=O.toLowerCase()+u,k=m.getAttribute(N);m.removeAttribute(N);var S=k.split(o);this.parts.push({type:"attribute",index:d,name:O,strings:S}),p+=S.length-1}}"TEMPLATE"===m.tagName&&(a.push(m),c.currentNode=m.content)}else if(3===m.nodeType){var j=m.data;if(j.indexOf(r)>=0){for(var E=m.parentNode,T=j.split(o),A=T.length-1,V=0;V<A;V++){var P=void 0,C=T[V];if(""===C)P=l();else{var R=f.exec(C);null!==R&&s(R[2],u)&&(C=C.slice(0,R.index)+R[1]+R[2].slice(0,-u.length)+R[3]),P=document.createTextNode(C)}E.insertBefore(P,m),this.parts.push({type:"node",index:++d})}""===T[A]?(E.insertBefore(l(),m),i.push(m)):m.data=T[A],p+=A}}else if(8===m.nodeType)if(m.data===r){var I=m.parentNode;null!==m.previousSibling&&d!==h||(d++,I.insertBefore(l(),m)),h=d,this.parts.push({type:"node",index:d}),null===m.nextSibling?m.data="":(i.push(m),d--),p++}else for(var M=-1;-1!==(M=m.data.indexOf(r,M+1));)this.parts.push({type:"node",index:-1}),p++}else c.currentNode=a.pop()}for(var L=0,H=i;L<H.length;L++){var B=H[L];B.parentNode.removeChild(B)}},s=function(t,e){var n=t.length-e.length;return n>=0&&t.slice(n)===e},c=function(t){return-1!==t.index},l=function(){return document.createComment("")},f=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/},314:function(t,e,n){"use strict";n.d(e,"a",(function(){return r})),n.d(e,"c",(function(){return i})),n.d(e,"b",(function(){return o}));
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
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
var r="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,i=function(t,e){for(var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;e!==n;){var i=e.nextSibling;t.insertBefore(e,r),e=i}},o=function(t,e){for(var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;e!==n;){var r=e.nextSibling;t.removeChild(e),e=r}}},316:function(t,e,n){"use strict";n.d(e,"b",(function(){return v})),n.d(e,"a",(function(){return y}));var r=n(314),i=n(312);function o(t){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function u(t,e,n){return(u="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,e,n){var r=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=l(t)););return t}(t,e);if(r){var i=Object.getOwnPropertyDescriptor(r,e);return i.get?i.get.call(n):i.value}})(t,e,n||t)}function a(t,e){return(a=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function s(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=l(t);if(e){var i=l(this).constructor;n=Reflect.construct(r,arguments,i)}else n=r.apply(this,arguments);return c(this,n)}}function c(t,e){return!e||"object"!==o(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function l(t){return(l=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function f(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function h(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function d(t,e,n){return e&&h(t.prototype,e),n&&h(t,n),t}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */var p=" ".concat(i.f," "),v=function(){function t(e,n,r,i){f(this,t),this.strings=e,this.values=n,this.type=r,this.processor=i}return d(t,[{key:"getHTML",value:function(){for(var t=this.strings.length-1,e="",n=!1,r=0;r<t;r++){var o=this.strings[r],u=o.lastIndexOf("\x3c!--");n=(u>-1||n)&&-1===o.indexOf("--\x3e",u+1);var a=i.e.exec(o);e+=null===a?o+(n?p:i.g):o.substr(0,a.index)+a[1]+a[2]+i.b+a[3]+i.f}return e+=this.strings[t]}},{key:"getTemplateElement",value:function(){var t=document.createElement("template");return t.innerHTML=this.getHTML(),t}}]),t}(),y=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&a(t,e)}(n,t);var e=s(n);function n(){return f(this,n),e.apply(this,arguments)}return d(n,[{key:"getHTML",value:function(){return"<svg>".concat(u(l(n.prototype),"getHTML",this).call(this),"</svg>")}},{key:"getTemplateElement",value:function(){var t=u(l(n.prototype),"getTemplateElement",this).call(this),e=t.content,i=e.firstChild;return e.removeChild(i),Object(r.c)(e,i.firstChild),t}}]),n}(v)},317:function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"a",(function(){return o}));var r=n(312);
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */function i(t){var e=o.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},o.set(t.type,e));var n=e.stringsArray.get(t.strings);if(void 0!==n)return n;var i=t.strings.join(r.f);return void 0===(n=e.keyString.get(i))&&(n=new r.a(t,t.getTemplateElement()),e.keyString.set(i,n)),e.stringsArray.set(t.strings,n),n}var o=new Map},318:function(t,e,n){"use strict";n.d(e,"a",(function(){return i})),n.d(e,"b",(function(){return o}));
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
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
var r=new WeakMap,i=function(t){return function(){var e=t.apply(void 0,arguments);return r.set(e,!0),e}},o=function(t){return"function"==typeof t&&r.has(t)}},319:function(t,e,n){"use strict";n.d(e,"a",(function(){return r})),n.d(e,"b",(function(){return i}));
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
var r={},i={}},320:function(t,e,n){"use strict";n.d(e,"a",(function(){return l}));var r=n(314),i=n(312);function o(t){return function(t){if(Array.isArray(t))return s(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||a(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function u(t,e){var n;if("undefined"==typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(n=a(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var r=0,i=function(){};return{s:i,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,u=!0,s=!1;return{s:function(){n=t[Symbol.iterator]()},n:function(){var t=n.next();return u=t.done,t},e:function(t){s=!0,o=t},f:function(){try{u||null==n.return||n.return()}finally{if(s)throw o}}}}function a(t,e){if(t){if("string"==typeof t)return s(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?s(t,e):void 0}}function s(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function c(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
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
var l=function(){function t(e,n,r){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.__parts=[],this.template=e,this.processor=n,this.options=r}var e,n,a;return e=t,(n=[{key:"update",value:function(t){var e,n=0,r=u(this.__parts);try{for(r.s();!(e=r.n()).done;){var i=e.value;void 0!==i&&i.setValue(t[n]),n++}}catch(t){r.e(t)}finally{r.f()}var o,a=u(this.__parts);try{for(a.s();!(o=a.n()).done;){var s=o.value;void 0!==s&&s.commit()}}catch(t){a.e(t)}finally{a.f()}}},{key:"_clone",value:function(){for(var t,e=r.a?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),n=[],u=this.template.parts,a=document.createTreeWalker(e,133,null,!1),s=0,c=0,l=a.nextNode();s<u.length;)if(t=u[s],Object(i.d)(t)){for(;c<t.index;)c++,"TEMPLATE"===l.nodeName&&(n.push(l),a.currentNode=l.content),null===(l=a.nextNode())&&(a.currentNode=n.pop(),l=a.nextNode());if("node"===t.type){var f=this.processor.handleTextExpression(this.options);f.insertAfterNode(l.previousSibling),this.__parts.push(f)}else{var h;(h=this.__parts).push.apply(h,o(this.processor.handleAttributeExpressions(l,t.name,t.strings,this.options)))}s++}else this.__parts.push(void 0),s++;return r.a&&(document.adoptNode(e),customElements.upgrade(e)),e}}])&&c(e.prototype,n),a&&c(e,a),t}()},321:function(t,e,n){"use strict";n.d(e,"a",(function(){return u})),n.d(e,"b",(function(){return a}));var r=n(314),i=n(311),o=n(317),u=new WeakMap,a=function(t,e,n){var a=u.get(e);void 0===a&&(Object(r.b)(e,e.firstChild),u.set(e,a=new i.e(Object.assign({templateFactory:o.b},n))),a.appendInto(e)),a.setValue(t),a.commit()}}}]);