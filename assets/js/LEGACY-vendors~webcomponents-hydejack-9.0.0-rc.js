(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~webcomponents"],{

/***/ "./node_modules/@webcomponents/custom-elements/custom-elements.min.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@webcomponents/custom-elements/custom-elements.min.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function () {
  /*
  
   Copyright (c) 2020 The Polymer Project Authors. All rights reserved.
   This code may only be used under the BSD style license found at
   http://polymer.github.io/LICENSE.txt The complete set of authors may be found
   at http://polymer.github.io/AUTHORS.txt The complete set of contributors may
   be found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by
   Google as part of the polymer project is also subject to an additional IP
   rights grant found at http://polymer.github.io/PATENTS.txt
  */
  'use strict';
  /*
  Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
  This code may only be used under the BSD style license found at
  http://polymer.github.io/LICENSE.txt The complete set of authors may be found
  at http://polymer.github.io/AUTHORS.txt The complete set of contributors may
  be found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by
  Google as part of the polymer project is also subject to an additional IP
  rights grant found at http://polymer.github.io/PATENTS.txt
  */

  var n = window.Document.prototype.createElement,
      p = window.Document.prototype.createElementNS,
      aa = window.Document.prototype.importNode,
      ba = window.Document.prototype.prepend,
      ca = window.Document.prototype.append,
      da = window.DocumentFragment.prototype.prepend,
      ea = window.DocumentFragment.prototype.append,
      q = window.Node.prototype.cloneNode,
      r = window.Node.prototype.appendChild,
      t = window.Node.prototype.insertBefore,
      u = window.Node.prototype.removeChild,
      v = window.Node.prototype.replaceChild,
      w = Object.getOwnPropertyDescriptor(window.Node.prototype, "textContent"),
      y = window.Element.prototype.attachShadow,
      z = Object.getOwnPropertyDescriptor(window.Element.prototype, "innerHTML"),
      A = window.Element.prototype.getAttribute,
      B = window.Element.prototype.setAttribute,
      C = window.Element.prototype.removeAttribute,
      D = window.Element.prototype.getAttributeNS,
      E = window.Element.prototype.setAttributeNS,
      F = window.Element.prototype.removeAttributeNS,
      G = window.Element.prototype.insertAdjacentElement,
      H = window.Element.prototype.insertAdjacentHTML,
      fa = window.Element.prototype.prepend,
      ha = window.Element.prototype.append,
      ia = window.Element.prototype.before,
      ja = window.Element.prototype.after,
      ka = window.Element.prototype.replaceWith,
      la = window.Element.prototype.remove,
      ma = window.HTMLElement,
      I = Object.getOwnPropertyDescriptor(window.HTMLElement.prototype, "innerHTML"),
      na = window.HTMLElement.prototype.insertAdjacentElement,
      oa = window.HTMLElement.prototype.insertAdjacentHTML;
  var pa = new Set();
  "annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph".split(" ").forEach(function (a) {
    return pa.add(a);
  });

  function qa(a) {
    var b = pa.has(a);
    a = /^[a-z][.0-9_a-z]*-[-.0-9_a-z]*$/.test(a);
    return !b && a;
  }

  var ra = document.contains ? document.contains.bind(document) : document.documentElement.contains.bind(document.documentElement);

  function J(a) {
    var b = a.isConnected;
    if (void 0 !== b) return b;
    if (ra(a)) return !0;

    for (; a && !(a.__CE_isImportDocument || a instanceof Document);) {
      a = a.parentNode || (window.ShadowRoot && a instanceof ShadowRoot ? a.host : void 0);
    }

    return !(!a || !(a.__CE_isImportDocument || a instanceof Document));
  }

  function K(a) {
    var b = a.children;
    if (b) return Array.prototype.slice.call(b);
    b = [];

    for (a = a.firstChild; a; a = a.nextSibling) {
      a.nodeType === Node.ELEMENT_NODE && b.push(a);
    }

    return b;
  }

  function L(a, b) {
    for (; b && b !== a && !b.nextSibling;) {
      b = b.parentNode;
    }

    return b && b !== a ? b.nextSibling : null;
  }

  function M(a, b, c) {
    for (var f = a; f;) {
      if (f.nodeType === Node.ELEMENT_NODE) {
        var d = f;
        b(d);
        var e = d.localName;

        if ("link" === e && "import" === d.getAttribute("rel")) {
          f = d.import;
          void 0 === c && (c = new Set());
          if (f instanceof Node && !c.has(f)) for (c.add(f), f = f.firstChild; f; f = f.nextSibling) {
            M(f, b, c);
          }
          f = L(a, d);
          continue;
        } else if ("template" === e) {
          f = L(a, d);
          continue;
        }

        if (d = d.__CE_shadowRoot) for (d = d.firstChild; d; d = d.nextSibling) {
          M(d, b, c);
        }
      }

      f = f.firstChild ? f.firstChild : L(a, f);
    }
  }

  ;

  function N() {
    var a = !(null === O || void 0 === O || !O.noDocumentConstructionObserver),
        b = !(null === O || void 0 === O || !O.shadyDomFastWalk);
    this.h = [];
    this.a = [];
    this.f = !1;
    this.shadyDomFastWalk = b;
    this.C = !a;
  }

  function P(a, b, c, f) {
    var d = window.ShadyDom;

    if (a.shadyDomFastWalk && d && d.inUse) {
      if (b.nodeType === Node.ELEMENT_NODE && c(b), b.querySelectorAll) for (a = d.nativeMethods.querySelectorAll.call(b, "*"), b = 0; b < a.length; b++) {
        c(a[b]);
      }
    } else M(b, c, f);
  }

  function sa(a, b) {
    a.f = !0;
    a.h.push(b);
  }

  function ta(a, b) {
    a.f = !0;
    a.a.push(b);
  }

  function Q(a, b) {
    a.f && P(a, b, function (c) {
      return R(a, c);
    });
  }

  function R(a, b) {
    if (a.f && !b.__CE_patched) {
      b.__CE_patched = !0;

      for (var c = 0; c < a.h.length; c++) {
        a.h[c](b);
      }

      for (c = 0; c < a.a.length; c++) {
        a.a[c](b);
      }
    }
  }

  function S(a, b) {
    var c = [];
    P(a, b, function (d) {
      return c.push(d);
    });

    for (b = 0; b < c.length; b++) {
      var f = c[b];
      1 === f.__CE_state ? a.connectedCallback(f) : T(a, f);
    }
  }

  function U(a, b) {
    var c = [];
    P(a, b, function (d) {
      return c.push(d);
    });

    for (b = 0; b < c.length; b++) {
      var f = c[b];
      1 === f.__CE_state && a.disconnectedCallback(f);
    }
  }

  function V(a, b, c) {
    c = void 0 === c ? {} : c;

    var f = c.D,
        d = c.upgrade || function (g) {
      return T(a, g);
    },
        e = [];

    P(a, b, function (g) {
      a.f && R(a, g);

      if ("link" === g.localName && "import" === g.getAttribute("rel")) {
        var h = g.import;
        h instanceof Node && (h.__CE_isImportDocument = !0, h.__CE_registry = document.__CE_registry);
        h && "complete" === h.readyState ? h.__CE_documentLoadHandled = !0 : g.addEventListener("load", function () {
          var k = g.import;

          if (!k.__CE_documentLoadHandled) {
            k.__CE_documentLoadHandled = !0;
            var l = new Set();
            f && (f.forEach(function (m) {
              return l.add(m);
            }), l.delete(k));
            V(a, k, {
              D: l,
              upgrade: d
            });
          }
        });
      } else e.push(g);
    }, f);

    for (b = 0; b < e.length; b++) {
      d(e[b]);
    }
  }

  function T(a, b) {
    try {
      var c = b.ownerDocument,
          f = c.__CE_registry;
      var d = f && (c.defaultView || c.__CE_isImportDocument) ? W(f, b.localName) : void 0;

      if (d && void 0 === b.__CE_state) {
        d.constructionStack.push(b);

        try {
          try {
            if (new d.constructorFunction() !== b) throw Error("The custom element constructor did not produce the element being upgraded.");
          } finally {
            d.constructionStack.pop();
          }
        } catch (k) {
          throw b.__CE_state = 2, k;
        }

        b.__CE_state = 1;
        b.__CE_definition = d;

        if (d.attributeChangedCallback && b.hasAttributes()) {
          var e = d.observedAttributes;

          for (d = 0; d < e.length; d++) {
            var g = e[d],
                h = b.getAttribute(g);
            null !== h && a.attributeChangedCallback(b, g, null, h, null);
          }
        }

        J(b) && a.connectedCallback(b);
      }
    } catch (k) {
      X(k);
    }
  }

  N.prototype.connectedCallback = function (a) {
    var b = a.__CE_definition;
    if (b.connectedCallback) try {
      b.connectedCallback.call(a);
    } catch (c) {
      X(c);
    }
  };

  N.prototype.disconnectedCallback = function (a) {
    var b = a.__CE_definition;
    if (b.disconnectedCallback) try {
      b.disconnectedCallback.call(a);
    } catch (c) {
      X(c);
    }
  };

  N.prototype.attributeChangedCallback = function (a, b, c, f, d) {
    var e = a.__CE_definition;
    if (e.attributeChangedCallback && -1 < e.observedAttributes.indexOf(b)) try {
      e.attributeChangedCallback.call(a, b, c, f, d);
    } catch (g) {
      X(g);
    }
  };

  function ua(a, b, c, f) {
    var d = b.__CE_registry;
    if (d && (null === f || "http://www.w3.org/1999/xhtml" === f) && (d = W(d, c))) try {
      var e = new d.constructorFunction();
      if (void 0 === e.__CE_state || void 0 === e.__CE_definition) throw Error("Failed to construct '" + c + "': The returned value was not constructed with the HTMLElement constructor.");
      if ("http://www.w3.org/1999/xhtml" !== e.namespaceURI) throw Error("Failed to construct '" + c + "': The constructed element's namespace must be the HTML namespace.");
      if (e.hasAttributes()) throw Error("Failed to construct '" + c + "': The constructed element must not have any attributes.");
      if (null !== e.firstChild) throw Error("Failed to construct '" + c + "': The constructed element must not have any children.");
      if (null !== e.parentNode) throw Error("Failed to construct '" + c + "': The constructed element must not have a parent node.");
      if (e.ownerDocument !== b) throw Error("Failed to construct '" + c + "': The constructed element's owner document is incorrect.");
      if (e.localName !== c) throw Error("Failed to construct '" + c + "': The constructed element's local name is incorrect.");
      return e;
    } catch (g) {
      return X(g), b = null === f ? n.call(b, c) : p.call(b, f, c), Object.setPrototypeOf(b, HTMLUnknownElement.prototype), b.__CE_state = 2, b.__CE_definition = void 0, R(a, b), b;
    }
    b = null === f ? n.call(b, c) : p.call(b, f, c);
    R(a, b);
    return b;
  }

  function X(a) {
    var b = a.message,
        c = a.sourceURL || a.fileName || "",
        f = a.line || a.lineNumber || 0,
        d = a.column || a.columnNumber || 0,
        e = void 0;
    void 0 === ErrorEvent.prototype.initErrorEvent ? e = new ErrorEvent("error", {
      cancelable: !0,
      message: b,
      filename: c,
      lineno: f,
      colno: d,
      error: a
    }) : (e = document.createEvent("ErrorEvent"), e.initErrorEvent("error", !1, !0, b, c, f), e.preventDefault = function () {
      Object.defineProperty(this, "defaultPrevented", {
        configurable: !0,
        get: function get() {
          return !0;
        }
      });
    });
    void 0 === e.error && Object.defineProperty(e, "error", {
      configurable: !0,
      enumerable: !0,
      get: function get() {
        return a;
      }
    });
    window.dispatchEvent(e);
    e.defaultPrevented || console.error(a);
  }

  ;

  function va() {
    var a = this;
    this.a = void 0;
    this.w = new Promise(function (b) {
      a.g = b;
    });
  }

  va.prototype.resolve = function (a) {
    if (this.a) throw Error("Already resolved.");
    this.a = a;
    this.g(a);
  };

  function wa(a) {
    var b = document;
    this.g = void 0;
    this.b = a;
    this.a = b;
    V(this.b, this.a);
    "loading" === this.a.readyState && (this.g = new MutationObserver(this.A.bind(this)), this.g.observe(this.a, {
      childList: !0,
      subtree: !0
    }));
  }

  function xa(a) {
    a.g && a.g.disconnect();
  }

  wa.prototype.A = function (a) {
    var b = this.a.readyState;
    "interactive" !== b && "complete" !== b || xa(this);

    for (b = 0; b < a.length; b++) {
      for (var c = a[b].addedNodes, f = 0; f < c.length; f++) {
        V(this.b, c[f]);
      }
    }
  };

  function Y(a) {
    this.j = new Map();
    this.l = new Map();
    this.u = new Map();
    this.o = !1;
    this.s = new Map();

    this.i = function (b) {
      return b();
    };

    this.c = !1;
    this.m = [];
    this.b = a;
    this.v = a.C ? new wa(a) : void 0;
  }

  Y.prototype.B = function (a, b) {
    var c = this;
    if (!(b instanceof Function)) throw new TypeError("Custom element constructor getters must be functions.");
    ya(this, a);
    this.j.set(a, b);
    this.m.push(a);
    this.c || (this.c = !0, this.i(function () {
      return za(c);
    }));
  };

  Y.prototype.define = function (a, b) {
    var c = this;
    if (!(b instanceof Function)) throw new TypeError("Custom element constructors must be functions.");
    ya(this, a);
    Aa(this, a, b);
    this.m.push(a);
    this.c || (this.c = !0, this.i(function () {
      return za(c);
    }));
  };

  function ya(a, b) {
    if (!qa(b)) throw new SyntaxError("The element name '" + b + "' is not valid.");
    if (W(a, b)) throw Error("A custom element with name '" + (b + "' has already been defined."));
    if (a.o) throw Error("A custom element is already being defined.");
  }

  function Aa(a, b, c) {
    a.o = !0;
    var f;

    try {
      var d = c.prototype;
      if (!(d instanceof Object)) throw new TypeError("The custom element constructor's prototype is not an object.");

      var e = function e(m) {
        var x = d[m];
        if (void 0 !== x && !(x instanceof Function)) throw Error("The '" + m + "' callback must be a function.");
        return x;
      };

      var g = e("connectedCallback");
      var h = e("disconnectedCallback");
      var k = e("adoptedCallback");
      var l = (f = e("attributeChangedCallback")) && c.observedAttributes || [];
    } catch (m) {
      throw m;
    } finally {
      a.o = !1;
    }

    c = {
      localName: b,
      constructorFunction: c,
      connectedCallback: g,
      disconnectedCallback: h,
      adoptedCallback: k,
      attributeChangedCallback: f,
      observedAttributes: l,
      constructionStack: []
    };
    a.l.set(b, c);
    a.u.set(c.constructorFunction, c);
    return c;
  }

  Y.prototype.upgrade = function (a) {
    V(this.b, a);
  };

  function za(a) {
    if (!1 !== a.c) {
      a.c = !1;

      for (var b = [], c = a.m, f = new Map(), d = 0; d < c.length; d++) {
        f.set(c[d], []);
      }

      V(a.b, document, {
        upgrade: function upgrade(k) {
          if (void 0 === k.__CE_state) {
            var l = k.localName,
                m = f.get(l);
            m ? m.push(k) : a.l.has(l) && b.push(k);
          }
        }
      });

      for (d = 0; d < b.length; d++) {
        T(a.b, b[d]);
      }

      for (d = 0; d < c.length; d++) {
        for (var e = c[d], g = f.get(e), h = 0; h < g.length; h++) {
          T(a.b, g[h]);
        }

        (e = a.s.get(e)) && e.resolve(void 0);
      }

      c.length = 0;
    }
  }

  Y.prototype.get = function (a) {
    if (a = W(this, a)) return a.constructorFunction;
  };

  Y.prototype.whenDefined = function (a) {
    if (!qa(a)) return Promise.reject(new SyntaxError("'" + a + "' is not a valid custom element name."));
    var b = this.s.get(a);
    if (b) return b.w;
    b = new va();
    this.s.set(a, b);
    var c = this.l.has(a) || this.j.has(a);
    a = -1 === this.m.indexOf(a);
    c && a && b.resolve(void 0);
    return b.w;
  };

  Y.prototype.polyfillWrapFlushCallback = function (a) {
    this.v && xa(this.v);
    var b = this.i;

    this.i = function (c) {
      return a(function () {
        return b(c);
      });
    };
  };

  function W(a, b) {
    var c = a.l.get(b);
    if (c) return c;

    if (c = a.j.get(b)) {
      a.j.delete(b);

      try {
        return Aa(a, b, c());
      } catch (f) {
        X(f);
      }
    }
  }

  window.CustomElementRegistry = Y;
  Y.prototype.define = Y.prototype.define;
  Y.prototype.upgrade = Y.prototype.upgrade;
  Y.prototype.get = Y.prototype.get;
  Y.prototype.whenDefined = Y.prototype.whenDefined;
  Y.prototype.polyfillDefineLazy = Y.prototype.B;
  Y.prototype.polyfillWrapFlushCallback = Y.prototype.polyfillWrapFlushCallback;

  function Z(a, b, c) {
    function f(d) {
      return function (e) {
        for (var g = [], h = 0; h < arguments.length; ++h) {
          g[h] = arguments[h];
        }

        h = [];

        for (var k = [], l = 0; l < g.length; l++) {
          var m = g[l];
          m instanceof Element && J(m) && k.push(m);
          if (m instanceof DocumentFragment) for (m = m.firstChild; m; m = m.nextSibling) {
            h.push(m);
          } else h.push(m);
        }

        d.apply(this, g);

        for (g = 0; g < k.length; g++) {
          U(a, k[g]);
        }

        if (J(this)) for (g = 0; g < h.length; g++) {
          k = h[g], k instanceof Element && S(a, k);
        }
      };
    }

    void 0 !== c.prepend && (b.prepend = f(c.prepend));
    void 0 !== c.append && (b.append = f(c.append));
  }

  ;

  function Ba(a) {
    Document.prototype.createElement = function (b) {
      return ua(a, this, b, null);
    };

    Document.prototype.importNode = function (b, c) {
      b = aa.call(this, b, !!c);
      this.__CE_registry ? V(a, b) : Q(a, b);
      return b;
    };

    Document.prototype.createElementNS = function (b, c) {
      return ua(a, this, c, b);
    };

    Z(a, Document.prototype, {
      prepend: ba,
      append: ca
    });
  }

  ;

  function Ca(a) {
    function b(f) {
      return function (d) {
        for (var e = [], g = 0; g < arguments.length; ++g) {
          e[g] = arguments[g];
        }

        g = [];

        for (var h = [], k = 0; k < e.length; k++) {
          var l = e[k];
          l instanceof Element && J(l) && h.push(l);
          if (l instanceof DocumentFragment) for (l = l.firstChild; l; l = l.nextSibling) {
            g.push(l);
          } else g.push(l);
        }

        f.apply(this, e);

        for (e = 0; e < h.length; e++) {
          U(a, h[e]);
        }

        if (J(this)) for (e = 0; e < g.length; e++) {
          h = g[e], h instanceof Element && S(a, h);
        }
      };
    }

    var c = Element.prototype;
    void 0 !== ia && (c.before = b(ia));
    void 0 !== ja && (c.after = b(ja));
    void 0 !== ka && (c.replaceWith = function (f) {
      for (var d = [], e = 0; e < arguments.length; ++e) {
        d[e] = arguments[e];
      }

      e = [];

      for (var g = [], h = 0; h < d.length; h++) {
        var k = d[h];
        k instanceof Element && J(k) && g.push(k);
        if (k instanceof DocumentFragment) for (k = k.firstChild; k; k = k.nextSibling) {
          e.push(k);
        } else e.push(k);
      }

      h = J(this);
      ka.apply(this, d);

      for (d = 0; d < g.length; d++) {
        U(a, g[d]);
      }

      if (h) for (U(a, this), d = 0; d < e.length; d++) {
        g = e[d], g instanceof Element && S(a, g);
      }
    });
    void 0 !== la && (c.remove = function () {
      var f = J(this);
      la.call(this);
      f && U(a, this);
    });
  }

  ;

  function Da(a) {
    function b(d, e) {
      Object.defineProperty(d, "innerHTML", {
        enumerable: e.enumerable,
        configurable: !0,
        get: e.get,
        set: function set(g) {
          var h = this,
              k = void 0;
          J(this) && (k = [], P(a, this, function (x) {
            x !== h && k.push(x);
          }));
          e.set.call(this, g);
          if (k) for (var l = 0; l < k.length; l++) {
            var m = k[l];
            1 === m.__CE_state && a.disconnectedCallback(m);
          }
          this.ownerDocument.__CE_registry ? V(a, this) : Q(a, this);
          return g;
        }
      });
    }

    function c(d, e) {
      d.insertAdjacentElement = function (g, h) {
        var k = J(h);
        g = e.call(this, g, h);
        k && U(a, h);
        J(g) && S(a, h);
        return g;
      };
    }

    function f(d, e) {
      function g(h, k) {
        for (var l = []; h !== k; h = h.nextSibling) {
          l.push(h);
        }

        for (k = 0; k < l.length; k++) {
          V(a, l[k]);
        }
      }

      d.insertAdjacentHTML = function (h, k) {
        h = h.toLowerCase();

        if ("beforebegin" === h) {
          var l = this.previousSibling;
          e.call(this, h, k);
          g(l || this.parentNode.firstChild, this);
        } else if ("afterbegin" === h) l = this.firstChild, e.call(this, h, k), g(this.firstChild, l);else if ("beforeend" === h) l = this.lastChild, e.call(this, h, k), g(l || this.firstChild, null);else if ("afterend" === h) l = this.nextSibling, e.call(this, h, k), g(this.nextSibling, l);else throw new SyntaxError("The value provided (" + String(h) + ") is not one of 'beforebegin', 'afterbegin', 'beforeend', or 'afterend'.");
      };
    }

    y && (Element.prototype.attachShadow = function (d) {
      d = y.call(this, d);

      if (a.f && !d.__CE_patched) {
        d.__CE_patched = !0;

        for (var e = 0; e < a.h.length; e++) {
          a.h[e](d);
        }
      }

      return this.__CE_shadowRoot = d;
    });
    z && z.get ? b(Element.prototype, z) : I && I.get ? b(HTMLElement.prototype, I) : ta(a, function (d) {
      b(d, {
        enumerable: !0,
        configurable: !0,
        get: function get() {
          return q.call(this, !0).innerHTML;
        },
        set: function set(e) {
          var g = "template" === this.localName,
              h = g ? this.content : this,
              k = p.call(document, this.namespaceURI, this.localName);

          for (k.innerHTML = e; 0 < h.childNodes.length;) {
            u.call(h, h.childNodes[0]);
          }

          for (e = g ? k.content : k; 0 < e.childNodes.length;) {
            r.call(h, e.childNodes[0]);
          }
        }
      });
    });

    Element.prototype.setAttribute = function (d, e) {
      if (1 !== this.__CE_state) return B.call(this, d, e);
      var g = A.call(this, d);
      B.call(this, d, e);
      e = A.call(this, d);
      a.attributeChangedCallback(this, d, g, e, null);
    };

    Element.prototype.setAttributeNS = function (d, e, g) {
      if (1 !== this.__CE_state) return E.call(this, d, e, g);
      var h = D.call(this, d, e);
      E.call(this, d, e, g);
      g = D.call(this, d, e);
      a.attributeChangedCallback(this, e, h, g, d);
    };

    Element.prototype.removeAttribute = function (d) {
      if (1 !== this.__CE_state) return C.call(this, d);
      var e = A.call(this, d);
      C.call(this, d);
      null !== e && a.attributeChangedCallback(this, d, e, null, null);
    };

    Element.prototype.removeAttributeNS = function (d, e) {
      if (1 !== this.__CE_state) return F.call(this, d, e);
      var g = D.call(this, d, e);
      F.call(this, d, e);
      var h = D.call(this, d, e);
      g !== h && a.attributeChangedCallback(this, e, g, h, d);
    };

    na ? c(HTMLElement.prototype, na) : G && c(Element.prototype, G);
    oa ? f(HTMLElement.prototype, oa) : H && f(Element.prototype, H);
    Z(a, Element.prototype, {
      prepend: fa,
      append: ha
    });
    Ca(a);
  }

  ;
  var Ea = {};

  function Fa(a) {
    function b() {
      var c = this.constructor;

      var f = document.__CE_registry.u.get(c);

      if (!f) throw Error("Failed to construct a custom element: The constructor was not registered with `customElements`.");
      var d = f.constructionStack;
      if (0 === d.length) return d = n.call(document, f.localName), Object.setPrototypeOf(d, c.prototype), d.__CE_state = 1, d.__CE_definition = f, R(a, d), d;
      var e = d.length - 1,
          g = d[e];
      if (g === Ea) throw Error("Failed to construct '" + f.localName + "': This element was already constructed.");
      d[e] = Ea;
      Object.setPrototypeOf(g, c.prototype);
      R(a, g);
      return g;
    }

    b.prototype = ma.prototype;
    Object.defineProperty(HTMLElement.prototype, "constructor", {
      writable: !0,
      configurable: !0,
      enumerable: !1,
      value: b
    });
    window.HTMLElement = b;
  }

  ;

  function Ga(a) {
    function b(c, f) {
      Object.defineProperty(c, "textContent", {
        enumerable: f.enumerable,
        configurable: !0,
        get: f.get,
        set: function set(d) {
          if (this.nodeType === Node.TEXT_NODE) f.set.call(this, d);else {
            var e = void 0;

            if (this.firstChild) {
              var g = this.childNodes,
                  h = g.length;

              if (0 < h && J(this)) {
                e = Array(h);

                for (var k = 0; k < h; k++) {
                  e[k] = g[k];
                }
              }
            }

            f.set.call(this, d);
            if (e) for (d = 0; d < e.length; d++) {
              U(a, e[d]);
            }
          }
        }
      });
    }

    Node.prototype.insertBefore = function (c, f) {
      if (c instanceof DocumentFragment) {
        var d = K(c);
        c = t.call(this, c, f);
        if (J(this)) for (f = 0; f < d.length; f++) {
          S(a, d[f]);
        }
        return c;
      }

      d = c instanceof Element && J(c);
      f = t.call(this, c, f);
      d && U(a, c);
      J(this) && S(a, c);
      return f;
    };

    Node.prototype.appendChild = function (c) {
      if (c instanceof DocumentFragment) {
        var f = K(c);
        c = r.call(this, c);
        if (J(this)) for (var d = 0; d < f.length; d++) {
          S(a, f[d]);
        }
        return c;
      }

      f = c instanceof Element && J(c);
      d = r.call(this, c);
      f && U(a, c);
      J(this) && S(a, c);
      return d;
    };

    Node.prototype.cloneNode = function (c) {
      c = q.call(this, !!c);
      this.ownerDocument.__CE_registry ? V(a, c) : Q(a, c);
      return c;
    };

    Node.prototype.removeChild = function (c) {
      var f = c instanceof Element && J(c),
          d = u.call(this, c);
      f && U(a, c);
      return d;
    };

    Node.prototype.replaceChild = function (c, f) {
      if (c instanceof DocumentFragment) {
        var d = K(c);
        c = v.call(this, c, f);
        if (J(this)) for (U(a, f), f = 0; f < d.length; f++) {
          S(a, d[f]);
        }
        return c;
      }

      d = c instanceof Element && J(c);
      var e = v.call(this, c, f),
          g = J(this);
      g && U(a, f);
      d && U(a, c);
      g && S(a, c);
      return e;
    };

    w && w.get ? b(Node.prototype, w) : sa(a, function (c) {
      b(c, {
        enumerable: !0,
        configurable: !0,
        get: function get() {
          for (var f = [], d = this.firstChild; d; d = d.nextSibling) {
            d.nodeType !== Node.COMMENT_NODE && f.push(d.textContent);
          }

          return f.join("");
        },
        set: function set(f) {
          for (; this.firstChild;) {
            u.call(this, this.firstChild);
          }

          null != f && "" !== f && r.call(this, document.createTextNode(f));
        }
      });
    });
  }

  ;
  var O = window.customElements;

  function Ha() {
    var a = new N();
    Fa(a);
    Ba(a);
    Z(a, DocumentFragment.prototype, {
      prepend: da,
      append: ea
    });
    Ga(a);
    Da(a);
    a = new Y(a);
    document.__CE_registry = a;
    Object.defineProperty(window, "customElements", {
      configurable: !0,
      enumerable: !0,
      value: a
    });
  }

  O && !O.forcePolyfill && "function" == typeof O.define && "function" == typeof O.get || Ha();
  window.__CE_installPolyfill = Ha;
}).call(self);

/***/ }),

/***/ "./node_modules/@webcomponents/template/template.js":
/*!**********************************************************!*\
  !*** ./node_modules/@webcomponents/template/template.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */
// minimal template polyfill
(function () {
  'use strict';

  var needsTemplate = typeof HTMLTemplateElement === 'undefined';
  var brokenDocFragment = !(document.createDocumentFragment().cloneNode() instanceof DocumentFragment);
  var needsDocFrag = false; // NOTE: Replace DocumentFragment to work around IE11 bug that
  // causes children of a document fragment modified while
  // there is a mutation observer to not have a parentNode, or
  // have a broken parentNode (!?!)

  if (/Trident/.test(navigator.userAgent)) {
    (function () {
      needsDocFrag = true;
      var origCloneNode = Node.prototype.cloneNode;

      Node.prototype.cloneNode = function cloneNode(deep) {
        var newDom = origCloneNode.call(this, deep);

        if (this instanceof DocumentFragment) {
          newDom.__proto__ = DocumentFragment.prototype;
        }

        return newDom;
      }; // IE's DocumentFragment querySelector code doesn't work when
      // called on an element instance


      DocumentFragment.prototype.querySelectorAll = HTMLElement.prototype.querySelectorAll;
      DocumentFragment.prototype.querySelector = HTMLElement.prototype.querySelector;
      Object.defineProperties(DocumentFragment.prototype, {
        'nodeType': {
          get: function get() {
            return Node.DOCUMENT_FRAGMENT_NODE;
          },
          configurable: true
        },
        'localName': {
          get: function get() {
            return undefined;
          },
          configurable: true
        },
        'nodeName': {
          get: function get() {
            return '#document-fragment';
          },
          configurable: true
        }
      });
      var origInsertBefore = Node.prototype.insertBefore;

      function insertBefore(newNode, refNode) {
        if (newNode instanceof DocumentFragment) {
          var child;

          while (child = newNode.firstChild) {
            origInsertBefore.call(this, child, refNode);
          }
        } else {
          origInsertBefore.call(this, newNode, refNode);
        }

        return newNode;
      }

      Node.prototype.insertBefore = insertBefore;
      var origAppendChild = Node.prototype.appendChild;

      Node.prototype.appendChild = function appendChild(child) {
        if (child instanceof DocumentFragment) {
          insertBefore.call(this, child, null);
        } else {
          origAppendChild.call(this, child);
        }

        return child;
      };

      var origRemoveChild = Node.prototype.removeChild;
      var origReplaceChild = Node.prototype.replaceChild;

      Node.prototype.replaceChild = function replaceChild(newChild, oldChild) {
        if (newChild instanceof DocumentFragment) {
          insertBefore.call(this, newChild, oldChild);
          origRemoveChild.call(this, oldChild);
        } else {
          origReplaceChild.call(this, newChild, oldChild);
        }

        return oldChild;
      };

      Document.prototype.createDocumentFragment = function createDocumentFragment() {
        var frag = this.createElement('df');
        frag.__proto__ = DocumentFragment.prototype;
        return frag;
      };

      var origImportNode = Document.prototype.importNode;

      Document.prototype.importNode = function importNode(impNode, deep) {
        deep = deep || false;
        var newNode = origImportNode.call(this, impNode, deep);

        if (impNode instanceof DocumentFragment) {
          newNode.__proto__ = DocumentFragment.prototype;
        }

        return newNode;
      };
    })();
  } // NOTE: we rely on this cloneNode not causing element upgrade.
  // This means this polyfill must load before the CE polyfill and
  // this would need to be re-worked if a browser supports native CE
  // but not <template>.


  var capturedCloneNode = Node.prototype.cloneNode;
  var capturedCreateElement = Document.prototype.createElement;
  var capturedImportNode = Document.prototype.importNode;
  var capturedRemoveChild = Node.prototype.removeChild;
  var capturedAppendChild = Node.prototype.appendChild;
  var capturedReplaceChild = Node.prototype.replaceChild;
  var capturedParseFromString = DOMParser.prototype.parseFromString;
  var capturedHTMLElementInnerHTML = Object.getOwnPropertyDescriptor(window.HTMLElement.prototype, 'innerHTML') || {
    /**
     * @this {!HTMLElement}
     * @return {string}
     */
    get: function get() {
      return this.innerHTML;
    },

    /**
     * @this {!HTMLElement}
     * @param {string}
     */
    set: function set(text) {
      this.innerHTML = text;
    }
  };
  var capturedChildNodes = Object.getOwnPropertyDescriptor(window.Node.prototype, 'childNodes') || {
    /**
     * @this {!Node}
     * @return {!NodeList}
     */
    get: function get() {
      return this.childNodes;
    }
  };
  var elementQuerySelectorAll = Element.prototype.querySelectorAll;
  var docQuerySelectorAll = Document.prototype.querySelectorAll;
  var fragQuerySelectorAll = DocumentFragment.prototype.querySelectorAll;
  var scriptSelector = 'script:not([type]),script[type="application/javascript"],script[type="text/javascript"]';

  function QSA(node, selector) {
    // IE 11 throws a SyntaxError with `scriptSelector` if the node has no children due to the `:not([type])` syntax
    if (!node.childNodes.length) {
      return [];
    }

    switch (node.nodeType) {
      case Node.DOCUMENT_NODE:
        return docQuerySelectorAll.call(node, selector);

      case Node.DOCUMENT_FRAGMENT_NODE:
        return fragQuerySelectorAll.call(node, selector);

      default:
        return elementQuerySelectorAll.call(node, selector);
    }
  } // returns true if nested templates cannot be cloned (they cannot be on
  // some impl's like Safari 8 and Edge)
  // OR if cloning a document fragment does not result in a document fragment


  var needsCloning = function () {
    if (!needsTemplate) {
      var t = document.createElement('template');
      var t2 = document.createElement('template');
      t2.content.appendChild(document.createElement('div'));
      t.content.appendChild(t2);
      var clone = t.cloneNode(true);
      return clone.content.childNodes.length === 0 || clone.content.firstChild.content.childNodes.length === 0 || brokenDocFragment;
    }
  }();

  var TEMPLATE_TAG = 'template';

  var PolyfilledHTMLTemplateElement = function PolyfilledHTMLTemplateElement() {};

  if (needsTemplate) {
    var contentDoc = document.implementation.createHTMLDocument('template');
    var canDecorate = true;
    var templateStyle = document.createElement('style');
    templateStyle.textContent = TEMPLATE_TAG + '{display:none;}';
    var head = document.head;
    head.insertBefore(templateStyle, head.firstElementChild);
    /**
      Provides a minimal shim for the <template> element.
    */

    PolyfilledHTMLTemplateElement.prototype = Object.create(HTMLElement.prototype); // if elements do not have `innerHTML` on instances, then
    // templates can be patched by swizzling their prototypes.

    var canProtoPatch = !document.createElement('div').hasOwnProperty('innerHTML');
    /**
      The `decorate` method moves element children to the template's `content`.
      NOTE: there is no support for dynamically adding elements to templates.
    */

    PolyfilledHTMLTemplateElement.decorate = function (template) {
      // if the template is decorated or not in HTML namespace, return fast
      if (template.content || template.namespaceURI !== document.documentElement.namespaceURI) {
        return;
      }

      template.content = contentDoc.createDocumentFragment();
      var child;

      while (child = template.firstChild) {
        capturedAppendChild.call(template.content, child);
      } // NOTE: prefer prototype patching for performance and
      // because on some browsers (IE11), re-defining `innerHTML`
      // can result in intermittent errors.


      if (canProtoPatch) {
        template.__proto__ = PolyfilledHTMLTemplateElement.prototype;
      } else {
        template.cloneNode = function (deep) {
          return PolyfilledHTMLTemplateElement._cloneNode(this, deep);
        }; // add innerHTML to template, if possible
        // Note: this throws on Safari 7


        if (canDecorate) {
          try {
            defineInnerHTML(template);
            defineOuterHTML(template);
          } catch (err) {
            canDecorate = false;
          }
        }
      } // bootstrap recursively


      PolyfilledHTMLTemplateElement.bootstrap(template.content);
    }; // Taken from https://github.com/jquery/jquery/blob/73d7e6259c63ac45f42c6593da8c2796c6ce9281/src/manipulation/wrapMap.js


    var topLevelWrappingMap = {
      'option': ['select'],
      'thead': ['table'],
      'col': ['colgroup', 'table'],
      'tr': ['tbody', 'table'],
      'th': ['tr', 'tbody', 'table'],
      'td': ['tr', 'tbody', 'table']
    };

    var getTagName = function getTagName(text) {
      // Taken from https://github.com/jquery/jquery/blob/73d7e6259c63ac45f42c6593da8c2796c6ce9281/src/manipulation/var/rtagName.js
      return (/<([a-z][^/\0>\x20\t\r\n\f]+)/i.exec(text) || ['', ''])[1].toLowerCase();
    };

    var defineInnerHTML = function defineInnerHTML(obj) {
      Object.defineProperty(obj, 'innerHTML', {
        get: function get() {
          return getInnerHTML(this);
        },
        set: function set(text) {
          // For IE11, wrap the text in the correct (table) context
          var wrap = topLevelWrappingMap[getTagName(text)];

          if (wrap) {
            for (var i = 0; i < wrap.length; i++) {
              text = '<' + wrap[i] + '>' + text + '</' + wrap[i] + '>';
            }
          }

          contentDoc.body.innerHTML = text;
          PolyfilledHTMLTemplateElement.bootstrap(contentDoc);

          while (this.content.firstChild) {
            capturedRemoveChild.call(this.content, this.content.firstChild);
          }

          var body = contentDoc.body; // If we had wrapped, get back to the original node

          if (wrap) {
            for (var j = 0; j < wrap.length; j++) {
              body = body.lastChild;
            }
          }

          while (body.firstChild) {
            capturedAppendChild.call(this.content, body.firstChild);
          }
        },
        configurable: true
      });
    };

    var defineOuterHTML = function defineOuterHTML(obj) {
      Object.defineProperty(obj, 'outerHTML', {
        get: function get() {
          return '<' + TEMPLATE_TAG + '>' + this.innerHTML + '</' + TEMPLATE_TAG + '>';
        },
        set: function set(innerHTML) {
          if (this.parentNode) {
            contentDoc.body.innerHTML = innerHTML;
            var docFrag = this.ownerDocument.createDocumentFragment();

            while (contentDoc.body.firstChild) {
              capturedAppendChild.call(docFrag, contentDoc.body.firstChild);
            }

            capturedReplaceChild.call(this.parentNode, docFrag, this);
          } else {
            throw new Error("Failed to set the 'outerHTML' property on 'Element': This element has no parent node.");
          }
        },
        configurable: true
      });
    };

    defineInnerHTML(PolyfilledHTMLTemplateElement.prototype);
    defineOuterHTML(PolyfilledHTMLTemplateElement.prototype);
    /**
      The `bootstrap` method is called automatically and "fixes" all
      <template> elements in the document referenced by the `doc` argument.
    */

    PolyfilledHTMLTemplateElement.bootstrap = function bootstrap(doc) {
      var templates = QSA(doc, TEMPLATE_TAG);

      for (var i = 0, l = templates.length, t; i < l && (t = templates[i]); i++) {
        PolyfilledHTMLTemplateElement.decorate(t);
      }
    }; // auto-bootstrapping for main document


    document.addEventListener('DOMContentLoaded', function () {
      PolyfilledHTMLTemplateElement.bootstrap(document);
    }); // Patch document.createElement to ensure newly created templates have content

    Document.prototype.createElement = function createElement() {
      var el = capturedCreateElement.apply(this, arguments);

      if (el.localName === 'template') {
        PolyfilledHTMLTemplateElement.decorate(el);
      }

      return el;
    };

    DOMParser.prototype.parseFromString = function () {
      var el = capturedParseFromString.apply(this, arguments);
      PolyfilledHTMLTemplateElement.bootstrap(el);
      return el;
    };

    Object.defineProperty(HTMLElement.prototype, 'innerHTML', {
      get: function get() {
        return getInnerHTML(this);
      },
      set: function set(text) {
        capturedHTMLElementInnerHTML.set.call(this, text);
        PolyfilledHTMLTemplateElement.bootstrap(this);
      },
      configurable: true,
      enumerable: true
    }); // http://www.whatwg.org/specs/web-apps/current-work/multipage/the-end.html#escapingString

    var escapeAttrRegExp = /[&\u00A0"]/g;
    var escapeDataRegExp = /[&\u00A0<>]/g;

    var escapeReplace = function escapeReplace(c) {
      switch (c) {
        case '&':
          return '&amp;';

        case '<':
          return '&lt;';

        case '>':
          return '&gt;';

        case '"':
          return '&quot;';

        case "\xA0":
          return '&nbsp;';
      }
    };

    var escapeAttr = function escapeAttr(s) {
      return s.replace(escapeAttrRegExp, escapeReplace);
    };

    var escapeData = function escapeData(s) {
      return s.replace(escapeDataRegExp, escapeReplace);
    };

    var makeSet = function makeSet(arr) {
      var set = {};

      for (var i = 0; i < arr.length; i++) {
        set[arr[i]] = true;
      }

      return set;
    }; // http://www.whatwg.org/specs/web-apps/current-work/#void-elements


    var voidElements = makeSet(['area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr']);
    var plaintextParents = makeSet(['style', 'script', 'xmp', 'iframe', 'noembed', 'noframes', 'plaintext', 'noscript']);
    /**
     * @param {Node} node
     * @param {Node} parentNode
     * @param {Function=} callback
     */

    var getOuterHTML = function getOuterHTML(node, parentNode, callback) {
      switch (node.nodeType) {
        case Node.ELEMENT_NODE:
          {
            var tagName = node.localName;
            var s = '<' + tagName;
            var attrs = node.attributes;

            for (var i = 0, attr; attr = attrs[i]; i++) {
              s += ' ' + attr.name + '="' + escapeAttr(attr.value) + '"';
            }

            s += '>';

            if (voidElements[tagName]) {
              return s;
            }

            return s + getInnerHTML(node, callback) + '</' + tagName + '>';
          }

        case Node.TEXT_NODE:
          {
            var data =
            /** @type {Text} */
            node.data;

            if (parentNode && plaintextParents[parentNode.localName]) {
              return data;
            }

            return escapeData(data);
          }

        case Node.COMMENT_NODE:
          {
            return '<!--' +
            /** @type {Comment} */
            node.data + '-->';
          }

        default:
          {
            window.console.error(node);
            throw new Error('not implemented');
          }
      }
    };
    /**
     * @param {Node} node
     * @param {Function=} callback
     */


    var getInnerHTML = function getInnerHTML(node, callback) {
      if (node.localName === 'template') {
        node =
        /** @type {HTMLTemplateElement} */
        node.content;
      }

      var s = '';
      var c$ = callback ? callback(node) : capturedChildNodes.get.call(node);

      for (var i = 0, l = c$.length, child; i < l && (child = c$[i]); i++) {
        s += getOuterHTML(child, node, callback);
      }

      return s;
    };
  } // make cloning/importing work!


  if (needsTemplate || needsCloning) {
    PolyfilledHTMLTemplateElement._cloneNode = function _cloneNode(template, deep) {
      var clone = capturedCloneNode.call(template, false); // NOTE: decorate doesn't auto-fix children because they are already
      // decorated so they need special clone fixup.

      if (this.decorate) {
        this.decorate(clone);
      }

      if (deep) {
        // NOTE: use native clone node to make sure CE's wrapped
        // cloneNode does not cause elements to upgrade.
        capturedAppendChild.call(clone.content, capturedCloneNode.call(template.content, true)); // now ensure nested templates are cloned correctly.

        fixClonedDom(clone.content, template.content);
      }

      return clone;
    }; // Given a source and cloned subtree, find <template>'s in the cloned
    // subtree and replace them with cloned <template>'s from source.
    // We must do this because only the source templates have proper .content.


    var fixClonedDom = function fixClonedDom(clone, source) {
      // do nothing if cloned node is not an element
      if (!source.querySelectorAll) return; // these two lists should be coincident

      var s$ = QSA(source, TEMPLATE_TAG);

      if (s$.length === 0) {
        return;
      }

      var t$ = QSA(clone, TEMPLATE_TAG);

      for (var i = 0, l = t$.length, t, s; i < l; i++) {
        s = s$[i];
        t = t$[i];

        if (PolyfilledHTMLTemplateElement && PolyfilledHTMLTemplateElement.decorate) {
          PolyfilledHTMLTemplateElement.decorate(s);
        }

        capturedReplaceChild.call(t.parentNode, cloneNode.call(s, true), t);
      }
    }; // make sure scripts inside of a cloned template are executable


    var fixClonedScripts = function fixClonedScripts(fragment) {
      var scripts = QSA(fragment, scriptSelector);

      for (var ns, s, i = 0; i < scripts.length; i++) {
        s = scripts[i];
        ns = capturedCreateElement.call(document, 'script');
        ns.textContent = s.textContent;
        var attrs = s.attributes;

        for (var ai = 0, a; ai < attrs.length; ai++) {
          a = attrs[ai];
          ns.setAttribute(a.name, a.value);
        }

        capturedReplaceChild.call(s.parentNode, ns, s);
      }
    }; // override all cloning to fix the cloned subtree to contain properly
    // cloned templates.


    var cloneNode = Node.prototype.cloneNode = function cloneNode(deep) {
      var dom; // workaround for Edge bug cloning documentFragments
      // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/8619646/

      if (!needsDocFrag && brokenDocFragment && this instanceof DocumentFragment) {
        if (!deep) {
          return this.ownerDocument.createDocumentFragment();
        } else {
          dom = importNode.call(this.ownerDocument, this, true);
        }
      } else if (this.nodeType === Node.ELEMENT_NODE && this.localName === TEMPLATE_TAG && this.namespaceURI == document.documentElement.namespaceURI) {
        dom = PolyfilledHTMLTemplateElement._cloneNode(this, deep);
      } else {
        dom = capturedCloneNode.call(this, deep);
      } // template.content is cloned iff `deep`.


      if (deep) {
        fixClonedDom(dom, this);
      }

      return dom;
    }; // NOTE: we are cloning instead of importing <template>'s.
    // However, the ownerDocument of the cloned template will be correct!
    // This is because the native import node creates the right document owned
    // subtree and `fixClonedDom` inserts cloned templates into this subtree,
    // thus updating the owner doc.


    var importNode = Document.prototype.importNode = function importNode(element, deep) {
      deep = deep || false;

      if (element.localName === TEMPLATE_TAG) {
        return PolyfilledHTMLTemplateElement._cloneNode(element, deep);
      } else {
        var dom = capturedImportNode.call(this, element, deep);

        if (deep) {
          fixClonedDom(dom, element);
          fixClonedScripts(dom);
        }

        return dom;
      }
    };
  }

  if (needsTemplate) {
    window.HTMLTemplateElement = PolyfilledHTMLTemplateElement;
  }
})();

/***/ }),

/***/ "./node_modules/@webcomponents/url/url.js":
/*!************************************************!*\
  !*** ./node_modules/@webcomponents/url/url.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Any copyright is dedicated to the Public Domain.
 * http://creativecommons.org/publicdomain/zero/1.0/ */

/** @type {boolean|undefined} */
Window.prototype.forceJURL = false;

(function (scope) {
  'use strict'; // feature detect for URL constructor

  var hasWorkingUrl = false;

  if (!scope.forceJURL) {
    try {
      var u = new URL('b', 'http://a');
      u.pathname = 'c%20d';
      hasWorkingUrl = u.href === 'http://a/c%20d';
    } catch (e) {}
  }

  if (hasWorkingUrl) return;
  var relative = Object.create(null);
  relative['ftp'] = 21;
  relative['file'] = 0;
  relative['gopher'] = 70;
  relative['http'] = 80;
  relative['https'] = 443;
  relative['ws'] = 80;
  relative['wss'] = 443;
  var relativePathDotMapping = Object.create(null);
  relativePathDotMapping['%2e'] = '.';
  relativePathDotMapping['.%2e'] = '..';
  relativePathDotMapping['%2e.'] = '..';
  relativePathDotMapping['%2e%2e'] = '..';

  function isRelativeScheme(scheme) {
    return relative[scheme] !== undefined;
  }

  function invalid() {
    clear.call(this);
    this._isInvalid = true;
  }

  function IDNAToASCII(h) {
    if ('' == h) {
      invalid.call(this);
    } // XXX


    return h.toLowerCase();
  }

  function percentEscape(c) {
    var unicode = c.charCodeAt(0);

    if (unicode > 0x20 && unicode < 0x7F && // " # < > ? `
    [0x22, 0x23, 0x3C, 0x3E, 0x3F, 0x60].indexOf(unicode) == -1) {
      return c;
    }

    return encodeURIComponent(c);
  }

  function percentEscapeQuery(c) {
    // XXX This actually needs to encode c using encoding and then
    // convert the bytes one-by-one.
    var unicode = c.charCodeAt(0);

    if (unicode > 0x20 && unicode < 0x7F && // " # < > ` (do not escape '?')
    [0x22, 0x23, 0x3C, 0x3E, 0x60].indexOf(unicode) == -1) {
      return c;
    }

    return encodeURIComponent(c);
  }

  var EOF = undefined,
      ALPHA = /[a-zA-Z]/,
      ALPHANUMERIC = /[a-zA-Z0-9\+\-\.]/;
  /**
   * @param {!string} input
   * @param {?string=} stateOverride
   * @param {(URL|string)=} base
   */

  function parse(input, stateOverride, base) {
    function err(message) {
      errors.push(message);
    }

    var state = stateOverride || 'scheme start',
        cursor = 0,
        buffer = '',
        seenAt = false,
        seenBracket = false,
        errors = [];

    loop: while ((input[cursor - 1] != EOF || cursor == 0) && !this._isInvalid) {
      var c = input[cursor];

      switch (state) {
        case 'scheme start':
          if (c && ALPHA.test(c)) {
            buffer += c.toLowerCase(); // ASCII-safe

            state = 'scheme';
          } else if (!stateOverride) {
            buffer = '';
            state = 'no scheme';
            continue;
          } else {
            err('Invalid scheme.');
            break loop;
          }

          break;

        case 'scheme':
          if (c && ALPHANUMERIC.test(c)) {
            buffer += c.toLowerCase(); // ASCII-safe
          } else if (':' == c) {
            this._scheme = buffer;
            buffer = '';

            if (stateOverride) {
              break loop;
            }

            if (isRelativeScheme(this._scheme)) {
              this._isRelative = true;
            }

            if ('file' == this._scheme) {
              state = 'relative';
            } else if (this._isRelative && base && base._scheme == this._scheme) {
              state = 'relative or authority';
            } else if (this._isRelative) {
              state = 'authority first slash';
            } else {
              state = 'scheme data';
            }
          } else if (!stateOverride) {
            buffer = '';
            cursor = 0;
            state = 'no scheme';
            continue;
          } else if (EOF == c) {
            break loop;
          } else {
            err('Code point not allowed in scheme: ' + c);
            break loop;
          }

          break;

        case 'scheme data':
          if ('?' == c) {
            this._query = '?';
            state = 'query';
          } else if ('#' == c) {
            this._fragment = '#';
            state = 'fragment';
          } else {
            // XXX error handling
            if (EOF != c && '\t' != c && '\n' != c && '\r' != c) {
              this._schemeData += percentEscape(c);
            }
          }

          break;

        case 'no scheme':
          if (!base || !isRelativeScheme(base._scheme)) {
            err('Missing scheme.');
            invalid.call(this);
          } else {
            state = 'relative';
            continue;
          }

          break;

        case 'relative or authority':
          if ('/' == c && '/' == input[cursor + 1]) {
            state = 'authority ignore slashes';
          } else {
            err('Expected /, got: ' + c);
            state = 'relative';
            continue;
          }

          break;

        case 'relative':
          this._isRelative = true;
          if ('file' != this._scheme) this._scheme = base._scheme;

          if (EOF == c) {
            this._host = base._host;
            this._port = base._port;
            this._path = base._path.slice();
            this._query = base._query;
            this._username = base._username;
            this._password = base._password;
            break loop;
          } else if ('/' == c || '\\' == c) {
            if ('\\' == c) err('\\ is an invalid code point.');
            state = 'relative slash';
          } else if ('?' == c) {
            this._host = base._host;
            this._port = base._port;
            this._path = base._path.slice();
            this._query = '?';
            this._username = base._username;
            this._password = base._password;
            state = 'query';
          } else if ('#' == c) {
            this._host = base._host;
            this._port = base._port;
            this._path = base._path.slice();
            this._query = base._query;
            this._fragment = '#';
            this._username = base._username;
            this._password = base._password;
            state = 'fragment';
          } else {
            var nextC = input[cursor + 1];
            var nextNextC = input[cursor + 2];

            if ('file' != this._scheme || !ALPHA.test(c) || nextC != ':' && nextC != '|' || EOF != nextNextC && '/' != nextNextC && '\\' != nextNextC && '?' != nextNextC && '#' != nextNextC) {
              this._host = base._host;
              this._port = base._port;
              this._username = base._username;
              this._password = base._password;
              this._path = base._path.slice();

              this._path.pop();
            }

            state = 'relative path';
            continue;
          }

          break;

        case 'relative slash':
          if ('/' == c || '\\' == c) {
            if ('\\' == c) {
              err('\\ is an invalid code point.');
            }

            if ('file' == this._scheme) {
              state = 'file host';
            } else {
              state = 'authority ignore slashes';
            }
          } else {
            if ('file' != this._scheme) {
              this._host = base._host;
              this._port = base._port;
              this._username = base._username;
              this._password = base._password;
            }

            state = 'relative path';
            continue;
          }

          break;

        case 'authority first slash':
          if ('/' == c) {
            state = 'authority second slash';
          } else {
            err("Expected '/', got: " + c);
            state = 'authority ignore slashes';
            continue;
          }

          break;

        case 'authority second slash':
          state = 'authority ignore slashes';

          if ('/' != c) {
            err("Expected '/', got: " + c);
            continue;
          }

          break;

        case 'authority ignore slashes':
          if ('/' != c && '\\' != c) {
            state = 'authority';
            continue;
          } else {
            err('Expected authority, got: ' + c);
          }

          break;

        case 'authority':
          if ('@' == c) {
            if (seenAt) {
              err('@ already seen.');
              buffer += '%40';
            }

            seenAt = true;

            for (var i = 0; i < buffer.length; i++) {
              var cp = buffer[i];

              if ('\t' == cp || '\n' == cp || '\r' == cp) {
                err('Invalid whitespace in authority.');
                continue;
              } // XXX check URL code points


              if (':' == cp && null === this._password) {
                this._password = '';
                continue;
              }

              var tempC = percentEscape(cp);
              null !== this._password ? this._password += tempC : this._username += tempC;
            }

            buffer = '';
          } else if (EOF == c || '/' == c || '\\' == c || '?' == c || '#' == c) {
            cursor -= buffer.length;
            buffer = '';
            state = 'host';
            continue;
          } else {
            buffer += c;
          }

          break;

        case 'file host':
          if (EOF == c || '/' == c || '\\' == c || '?' == c || '#' == c) {
            if (buffer.length == 2 && ALPHA.test(buffer[0]) && (buffer[1] == ':' || buffer[1] == '|')) {
              state = 'relative path';
            } else if (buffer.length == 0) {
              state = 'relative path start';
            } else {
              this._host = IDNAToASCII.call(this, buffer);
              buffer = '';
              state = 'relative path start';
            }

            continue;
          } else if ('\t' == c || '\n' == c || '\r' == c) {
            err('Invalid whitespace in file host.');
          } else {
            buffer += c;
          }

          break;

        case 'host':
        case 'hostname':
          if (':' == c && !seenBracket) {
            // XXX host parsing
            this._host = IDNAToASCII.call(this, buffer);
            buffer = '';
            state = 'port';

            if ('hostname' == stateOverride) {
              break loop;
            }
          } else if (EOF == c || '/' == c || '\\' == c || '?' == c || '#' == c) {
            this._host = IDNAToASCII.call(this, buffer);
            buffer = '';
            state = 'relative path start';

            if (stateOverride) {
              break loop;
            }

            continue;
          } else if ('\t' != c && '\n' != c && '\r' != c) {
            if ('[' == c) {
              seenBracket = true;
            } else if (']' == c) {
              seenBracket = false;
            }

            buffer += c;
          } else {
            err('Invalid code point in host/hostname: ' + c);
          }

          break;

        case 'port':
          if (/[0-9]/.test(c)) {
            buffer += c;
          } else if (EOF == c || '/' == c || '\\' == c || '?' == c || '#' == c || stateOverride) {
            if ('' != buffer) {
              var temp = parseInt(buffer, 10);

              if (temp != relative[this._scheme]) {
                this._port = temp + '';
              }

              buffer = '';
            }

            if (stateOverride) {
              break loop;
            }

            state = 'relative path start';
            continue;
          } else if ('\t' == c || '\n' == c || '\r' == c) {
            err('Invalid code point in port: ' + c);
          } else {
            invalid.call(this);
          }

          break;

        case 'relative path start':
          if ('\\' == c) err("'\\' not allowed in path.");
          state = 'relative path';

          if ('/' != c && '\\' != c) {
            continue;
          }

          break;

        case 'relative path':
          if (EOF == c || '/' == c || '\\' == c || !stateOverride && ('?' == c || '#' == c)) {
            if ('\\' == c) {
              err('\\ not allowed in relative path.');
            }

            var tmp;

            if (tmp = relativePathDotMapping[buffer.toLowerCase()]) {
              buffer = tmp;
            }

            if ('..' == buffer) {
              this._path.pop();

              if ('/' != c && '\\' != c) {
                this._path.push('');
              }
            } else if ('.' == buffer && '/' != c && '\\' != c) {
              this._path.push('');
            } else if ('.' != buffer) {
              if ('file' == this._scheme && this._path.length == 0 && buffer.length == 2 && ALPHA.test(buffer[0]) && buffer[1] == '|') {
                buffer = buffer[0] + ':';
              }

              this._path.push(buffer);
            }

            buffer = '';

            if ('?' == c) {
              this._query = '?';
              state = 'query';
            } else if ('#' == c) {
              this._fragment = '#';
              state = 'fragment';
            }
          } else if ('\t' != c && '\n' != c && '\r' != c) {
            buffer += percentEscape(c);
          }

          break;

        case 'query':
          if (!stateOverride && '#' == c) {
            this._fragment = '#';
            state = 'fragment';
          } else if (EOF != c && '\t' != c && '\n' != c && '\r' != c) {
            this._query += percentEscapeQuery(c);
          }

          break;

        case 'fragment':
          if (EOF != c && '\t' != c && '\n' != c && '\r' != c) {
            this._fragment += c;
          }

          break;
      }

      cursor++;
    }
  }

  function clear() {
    this._scheme = '';
    this._schemeData = '';
    this._username = '';
    this._password = null;
    this._host = '';
    this._port = '';
    this._path = [];
    this._query = '';
    this._fragment = '';
    this._isInvalid = false;
    this._isRelative = false;
  } // Does not process domain names or IP addresses.
  // Does not handle encoding for the query parameter.

  /**
   * @constructor
   * @extends {URL}
   * @param {!string} url
   * @param {(URL|string)=} base
   */


  function jURL(url, base
  /* , encoding */
  ) {
    if (base !== undefined && !(base instanceof jURL)) base = new jURL(String(base));
    this._url = '' + url;
    clear.call(this);

    var input = this._url.replace(/^[ \t\r\n\f]+|[ \t\r\n\f]+$/g, ''); // encoding = encoding || 'utf-8'


    parse.call(this, input, null, base);
  }

  jURL.prototype = {
    toString: function toString() {
      return this.href;
    },

    get href() {
      if (this._isInvalid) return this._url;
      var authority = '';

      if ('' != this._username || null != this._password) {
        authority = this._username + (null != this._password ? ':' + this._password : '') + '@';
      }

      return this.protocol + (this._isRelative ? '//' + authority + this.host : '') + this.pathname + this._query + this._fragment;
    },

    set href(href) {
      clear.call(this);
      parse.call(this, href);
    },

    get protocol() {
      return this._scheme + ':';
    },

    set protocol(protocol) {
      if (this._isInvalid) return;
      parse.call(this, protocol + ':', 'scheme start');
    },

    get host() {
      return this._isInvalid ? '' : this._port ? this._host + ':' + this._port : this._host;
    },

    set host(host) {
      if (this._isInvalid || !this._isRelative) return;
      parse.call(this, host, 'host');
    },

    get hostname() {
      return this._host;
    },

    set hostname(hostname) {
      if (this._isInvalid || !this._isRelative) return;
      parse.call(this, hostname, 'hostname');
    },

    get port() {
      return this._port;
    },

    set port(port) {
      if (this._isInvalid || !this._isRelative) return;
      parse.call(this, port, 'port');
    },

    get pathname() {
      return this._isInvalid ? '' : this._isRelative ? '/' + this._path.join('/') : this._schemeData;
    },

    set pathname(pathname) {
      if (this._isInvalid || !this._isRelative) return;
      this._path = [];
      parse.call(this, pathname, 'relative path start');
    },

    get search() {
      return this._isInvalid || !this._query || '?' == this._query ? '' : this._query;
    },

    set search(search) {
      if (this._isInvalid || !this._isRelative) return;
      this._query = '?';
      if ('?' == search[0]) search = search.slice(1);
      parse.call(this, search, 'query');
    },

    get hash() {
      return this._isInvalid || !this._fragment || '#' == this._fragment ? '' : this._fragment;
    },

    set hash(hash) {
      if (this._isInvalid) return;

      if (!hash) {
        this._fragment = '';
        return;
      }

      this._fragment = '#';
      if ('#' == hash[0]) hash = hash.slice(1);
      parse.call(this, hash, 'fragment');
    },

    get origin() {
      var host;

      if (this._isInvalid || !this._scheme) {
        return '';
      } // javascript: Gecko returns String(""), WebKit/Blink String("null")
      // Gecko throws error for "data://"
      // data: Gecko returns "", Blink returns "data://", WebKit returns "null"
      // Gecko returns String("") for file: mailto:
      // WebKit/Blink returns String("SCHEME://") for file: mailto:


      switch (this._scheme) {
        case 'data':
        case 'file':
        case 'javascript':
        case 'mailto':
          return 'null';
      }

      host = this.host;

      if (!host) {
        return '';
      }

      return this._scheme + '://' + host;
    }

  }; // Copy over the static methods

  var OriginalURL = scope.URL;

  if (OriginalURL) {
    jURL['createObjectURL'] = function (blob) {
      // IE extension allows a second optional options argument.
      // http://msdn.microsoft.com/en-us/library/ie/hh772302(v=vs.85).aspx
      return OriginalURL.createObjectURL.apply(OriginalURL, arguments);
    };

    jURL['revokeObjectURL'] = function (url) {
      OriginalURL.revokeObjectURL(url);
    };
  }

  scope.URL = jURL;
})(window);

/***/ }),

/***/ "./node_modules/@webcomponents/webcomponents-platform/webcomponents-platform.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/@webcomponents/webcomponents-platform/webcomponents-platform.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */
(function () {
  'use strict'; // defaultPrevented is broken in IE.
  // https://connect.microsoft.com/IE/feedback/details/790389/event-defaultprevented-returns-false-after-preventdefault-was-called

  var workingDefaultPrevented = function () {
    var e = document.createEvent('Event');
    e.initEvent('foo', true, true);
    e.preventDefault();
    return e.defaultPrevented;
  }();

  if (!workingDefaultPrevented) {
    var origPreventDefault = Event.prototype.preventDefault;

    Event.prototype.preventDefault = function () {
      if (!this.cancelable) {
        return;
      }

      origPreventDefault.call(this);
      Object.defineProperty(this, 'defaultPrevented', {
        get: function get() {
          return true;
        },
        configurable: true
      });
    };
  }

  var isIE = /Trident/.test(navigator.userAgent); // Event constructor shim

  if (!window.Event || isIE && typeof window.Event !== 'function') {
    var origEvent = window.Event;
    /**
     * @param {!string} inType
     * @param {?(EventInit)=} params
     */

    window.Event = function (inType, params) {
      params = params || {};
      var e = document.createEvent('Event');
      e.initEvent(inType, Boolean(params.bubbles), Boolean(params.cancelable));
      return e;
    };

    if (origEvent) {
      for (var i in origEvent) {
        window.Event[i] = origEvent[i];
      }

      window.Event.prototype = origEvent.prototype;
    }
  } // CustomEvent constructor shim


  if (!window.CustomEvent || isIE && typeof window.CustomEvent !== 'function') {
    /**
     * @template T
     * @param {!string} inType
     * @param {?(CustomEventInit<T>)=} params
     */
    window.CustomEvent = function (inType, params) {
      params = params || {};
      var e =
      /** @type {!CustomEvent} */
      document.createEvent('CustomEvent');
      e.initCustomEvent(inType, Boolean(params.bubbles), Boolean(params.cancelable), params.detail);
      return e;
    };

    window.CustomEvent.prototype = window.Event.prototype;
  }

  if (!window.MouseEvent || isIE && typeof window.MouseEvent !== 'function') {
    var origMouseEvent = window.MouseEvent;
    /**
     *
     * @param {!string} inType
     * @param {?(MouseEventInit)=} params
     */

    window.MouseEvent = function (inType, params) {
      params = params || {};
      var e = document.createEvent('MouseEvent');
      e.initMouseEvent(inType, Boolean(params.bubbles), Boolean(params.cancelable), params.view || window, params.detail, params.screenX, params.screenY, params.clientX, params.clientY, params.ctrlKey, params.altKey, params.shiftKey, params.metaKey, params.button, params.relatedTarget);
      return e;
    };

    if (origMouseEvent) {
      for (var i in origMouseEvent) {
        window.MouseEvent[i] = origMouseEvent[i];
      }
    }

    window.MouseEvent.prototype = origMouseEvent.prototype;
  } // ES6 stuff


  if (!Array.from) {
    Array.from = function (object) {
      return [].slice.call(
      /** @type {IArrayLike} */
      object);
    };
  }

  if (!Object.assign) {
    var assign = function assign(target, source) {
      var n$ = Object.getOwnPropertyNames(source);

      for (var i = 0, p; i < n$.length; i++) {
        p = n$[i];
        target[p] = source[p];
      }
    };

    Object.assign = function (target, sources) {
      var args = [].slice.call(arguments, 1);

      for (var i = 0, s; i < args.length; i++) {
        s = args[i];

        if (s) {
          assign(target, s);
        }
      }

      return target;
    };
  }
})();

/***/ })

}]);
//# sourceMappingURL=LEGACY-vendors~webcomponents-hydejack-9.0.0-rc.js.map