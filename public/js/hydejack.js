(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
require('../../modules/es6.object.assign');
module.exports = require('../../modules/_core').Object.assign;
},{"../../modules/_core":8,"../../modules/es6.object.assign":40}],2:[function(require,module,exports){
require('../../modules/es6.object.define-property');
var $Object = require('../../modules/_core').Object;
module.exports = function defineProperty(it, key, desc){
  return $Object.defineProperty(it, key, desc);
};
},{"../../modules/_core":8,"../../modules/es6.object.define-property":41}],3:[function(require,module,exports){
require('../../modules/es6.object.keys');
module.exports = require('../../modules/_core').Object.keys;
},{"../../modules/_core":8,"../../modules/es6.object.keys":42}],4:[function(require,module,exports){
module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};
},{}],5:[function(require,module,exports){
var isObject = require('./_is-object');
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};
},{"./_is-object":21}],6:[function(require,module,exports){
// false -> Array#indexOf
// true  -> Array#includes
var toIObject = require('./_to-iobject')
  , toLength  = require('./_to-length')
  , toIndex   = require('./_to-index');
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};
},{"./_to-index":33,"./_to-iobject":35,"./_to-length":36}],7:[function(require,module,exports){
var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};
},{}],8:[function(require,module,exports){
var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
},{}],9:[function(require,module,exports){
// optional / simple context binding
var aFunction = require('./_a-function');
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};
},{"./_a-function":4}],10:[function(require,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};
},{}],11:[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./_fails":15}],12:[function(require,module,exports){
var isObject = require('./_is-object')
  , document = require('./_global').document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};
},{"./_global":16,"./_is-object":21}],13:[function(require,module,exports){
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');
},{}],14:[function(require,module,exports){
var global    = require('./_global')
  , core      = require('./_core')
  , hide      = require('./_hide')
  , redefine  = require('./_redefine')
  , ctx       = require('./_ctx')
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE]
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE] || (exports[PROTOTYPE] = {})
    , key, own, out, exp;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if(target)redefine(target, key, out, type & $export.U);
    // export
    if(exports[key] != out)hide(exports, key, exp);
    if(IS_PROTO && expProto[key] != out)expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;
},{"./_core":8,"./_ctx":9,"./_global":16,"./_hide":18,"./_redefine":30}],15:[function(require,module,exports){
module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};
},{}],16:[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
},{}],17:[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};
},{}],18:[function(require,module,exports){
var dP         = require('./_object-dp')
  , createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};
},{"./_descriptors":11,"./_object-dp":23,"./_property-desc":29}],19:[function(require,module,exports){
module.exports = !require('./_descriptors') && !require('./_fails')(function(){
  return Object.defineProperty(require('./_dom-create')('div'), 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./_descriptors":11,"./_dom-create":12,"./_fails":15}],20:[function(require,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./_cof');
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};
},{"./_cof":7}],21:[function(require,module,exports){
module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};
},{}],22:[function(require,module,exports){
'use strict';
// 19.1.2.1 Object.assign(target, source, ...)
var getKeys  = require('./_object-keys')
  , gOPS     = require('./_object-gops')
  , pIE      = require('./_object-pie')
  , toObject = require('./_to-object')
  , IObject  = require('./_iobject')
  , $assign  = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || require('./_fails')(function(){
  var A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = toObject(target)
    , aLen  = arguments.length
    , index = 1
    , getSymbols = gOPS.f
    , isEnum     = pIE.f;
  while(aLen > index){
    var S      = IObject(arguments[index++])
      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  } return T;
} : $assign;
},{"./_fails":15,"./_iobject":20,"./_object-gops":24,"./_object-keys":26,"./_object-pie":27,"./_to-object":37}],23:[function(require,module,exports){
var anObject       = require('./_an-object')
  , IE8_DOM_DEFINE = require('./_ie8-dom-define')
  , toPrimitive    = require('./_to-primitive')
  , dP             = Object.defineProperty;

exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};
},{"./_an-object":5,"./_descriptors":11,"./_ie8-dom-define":19,"./_to-primitive":38}],24:[function(require,module,exports){
exports.f = Object.getOwnPropertySymbols;
},{}],25:[function(require,module,exports){
var has          = require('./_has')
  , toIObject    = require('./_to-iobject')
  , arrayIndexOf = require('./_array-includes')(false)
  , IE_PROTO     = require('./_shared-key')('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};
},{"./_array-includes":6,"./_has":17,"./_shared-key":31,"./_to-iobject":35}],26:[function(require,module,exports){
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = require('./_object-keys-internal')
  , enumBugKeys = require('./_enum-bug-keys');

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};
},{"./_enum-bug-keys":13,"./_object-keys-internal":25}],27:[function(require,module,exports){
exports.f = {}.propertyIsEnumerable;
},{}],28:[function(require,module,exports){
// most Object methods by ES6 should accept primitives
var $export = require('./_export')
  , core    = require('./_core')
  , fails   = require('./_fails');
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};
},{"./_core":8,"./_export":14,"./_fails":15}],29:[function(require,module,exports){
module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};
},{}],30:[function(require,module,exports){
var global    = require('./_global')
  , hide      = require('./_hide')
  , has       = require('./_has')
  , SRC       = require('./_uid')('src')
  , TO_STRING = 'toString'
  , $toString = Function[TO_STRING]
  , TPL       = ('' + $toString).split(TO_STRING);

require('./_core').inspectSource = function(it){
  return $toString.call(it);
};

(module.exports = function(O, key, val, safe){
  var isFunction = typeof val == 'function';
  if(isFunction)has(val, 'name') || hide(val, 'name', key);
  if(O[key] === val)return;
  if(isFunction)has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if(O === global){
    O[key] = val;
  } else {
    if(!safe){
      delete O[key];
      hide(O, key, val);
    } else {
      if(O[key])O[key] = val;
      else hide(O, key, val);
    }
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString(){
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});
},{"./_core":8,"./_global":16,"./_has":17,"./_hide":18,"./_uid":39}],31:[function(require,module,exports){
var shared = require('./_shared')('keys')
  , uid    = require('./_uid');
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};
},{"./_shared":32,"./_uid":39}],32:[function(require,module,exports){
var global = require('./_global')
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};
},{"./_global":16}],33:[function(require,module,exports){
var toInteger = require('./_to-integer')
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};
},{"./_to-integer":34}],34:[function(require,module,exports){
// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};
},{}],35:[function(require,module,exports){
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./_iobject')
  , defined = require('./_defined');
module.exports = function(it){
  return IObject(defined(it));
};
},{"./_defined":10,"./_iobject":20}],36:[function(require,module,exports){
// 7.1.15 ToLength
var toInteger = require('./_to-integer')
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};
},{"./_to-integer":34}],37:[function(require,module,exports){
// 7.1.13 ToObject(argument)
var defined = require('./_defined');
module.exports = function(it){
  return Object(defined(it));
};
},{"./_defined":10}],38:[function(require,module,exports){
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = require('./_is-object');
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};
},{"./_is-object":21}],39:[function(require,module,exports){
var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};
},{}],40:[function(require,module,exports){
// 19.1.3.1 Object.assign(target, source)
var $export = require('./_export');

$export($export.S + $export.F, 'Object', {assign: require('./_object-assign')});
},{"./_export":14,"./_object-assign":22}],41:[function(require,module,exports){
var $export = require('./_export');
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !require('./_descriptors'), 'Object', {defineProperty: require('./_object-dp').f});
},{"./_descriptors":11,"./_export":14,"./_object-dp":23}],42:[function(require,module,exports){
// 19.1.2.14 Object.keys(O)
var toObject = require('./_to-object')
  , $keys    = require('./_object-keys');

require('./_object-sap')('keys', function(){
  return function keys(it){
    return $keys(toObject(it));
  };
});
},{"./_object-keys":26,"./_object-sap":28,"./_to-object":37}],43:[function(require,module,exports){
(function (global){
/*! loadCSS: load a CSS file asynchronously. [c]2016 @scottjehl, Filament Group, Inc. Licensed MIT */
(function(w){
	"use strict";
	/* exported loadCSS */
	var loadCSS = function( href, before, media ){
		// Arguments explained:
		// `href` [REQUIRED] is the URL for your CSS file.
		// `before` [OPTIONAL] is the element the script should use as a reference for injecting our stylesheet <link> before
			// By default, loadCSS attempts to inject the link after the last stylesheet or script in the DOM. However, you might desire a more specific location in your document.
		// `media` [OPTIONAL] is the media type or query of the stylesheet. By default it will be 'all'
		var doc = w.document;
		var ss = doc.createElement( "link" );
		var ref;
		if( before ){
			ref = before;
		}
		else {
			var refs = ( doc.body || doc.getElementsByTagName( "head" )[ 0 ] ).childNodes;
			ref = refs[ refs.length - 1];
		}

		var sheets = doc.styleSheets;
		ss.rel = "stylesheet";
		ss.href = href;
		// temporarily set media to something inapplicable to ensure it'll fetch without blocking render
		ss.media = "only x";

		// wait until body is defined before injecting link. This ensures a non-blocking load in IE11.
		function ready( cb ){
			if( doc.body ){
				return cb();
			}
			setTimeout(function(){
				ready( cb );
			});
		}
		// Inject link
			// Note: the ternary preserves the existing behavior of "before" argument, but we could choose to change the argument to "after" in a later release and standardize on ref.nextSibling for all refs
			// Note: `insertBefore` is used instead of `appendChild`, for safety re: http://www.paulirish.com/2011/surefire-dom-element-insertion/
		ready( function(){
			ref.parentNode.insertBefore( ss, ( before ? ref : ref.nextSibling ) );
		});
		// A method (exposed on return object for external use) that mimics onload by polling until document.styleSheets until it includes the new sheet.
		var onloadcssdefined = function( cb ){
			var resolvedHref = ss.href;
			var i = sheets.length;
			while( i-- ){
				if( sheets[ i ].href === resolvedHref ){
					return cb();
				}
			}
			setTimeout(function() {
				onloadcssdefined( cb );
			});
		};

		function loadCB(){
			if( ss.addEventListener ){
				ss.removeEventListener( "load", loadCB );
			}
			ss.media = media || "all";
		}

		// once loaded, set link's media back to `all` so that the stylesheet applies once it loads
		if( ss.addEventListener ){
			ss.addEventListener( "load", loadCB);
		}
		ss.onloadcssdefined = onloadcssdefined;
		onloadcssdefined( loadCB );
		return ss;
	};
	// commonjs
	if( typeof exports !== "undefined" ){
		exports.loadCSS = loadCSS;
	}
	else {
		w.loadCSS = loadCSS;
	}
}( typeof global !== "undefined" ? global : this ));

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],44:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.InnerSubscriber = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Subscriber2 = require('./Subscriber');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var InnerSubscriber = exports.InnerSubscriber = function (_Subscriber) {
    _inherits(InnerSubscriber, _Subscriber);

    function InnerSubscriber(parent, outerValue, outerIndex) {
        _classCallCheck(this, InnerSubscriber);

        var _this = _possibleConstructorReturn(this, (InnerSubscriber.__proto__ || Object.getPrototypeOf(InnerSubscriber)).call(this));

        _this.parent = parent;
        _this.outerValue = outerValue;
        _this.outerIndex = outerIndex;
        _this.index = 0;
        return _this;
    }

    _createClass(InnerSubscriber, [{
        key: '_next',
        value: function _next(value) {
            this.parent.notifyNext(this.outerValue, value, this.outerIndex, this.index++, this);
        }
    }, {
        key: '_error',
        value: function _error(error) {
            this.parent.notifyError(error, this);
            this.unsubscribe();
        }
    }, {
        key: '_complete',
        value: function _complete() {
            this.parent.notifyComplete(this);
            this.unsubscribe();
        }
    }]);

    return InnerSubscriber;
}(_Subscriber2.Subscriber);


},{"./Subscriber":50}],45:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Observable = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _root = require('./util/root');

var _toSubscriber = require('./util/toSubscriber');

var _observable = require('./symbol/observable');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * A representation of any set of values over any amount of time. This the most basic building block
 * of RxJS.
 *
 * @class Observable<T>
 */
var Observable = exports.Observable = function () {
    /**
     * @constructor
     * @param {Function} subscribe the function that is  called when the Observable is
     * initially subscribed to. This function is given a Subscriber, to which new values
     * can be `next`ed, or an `error` method can be called to raise an error, or
     * `complete` can be called to notify of a successful completion.
     */
    function Observable(subscribe) {
        _classCallCheck(this, Observable);

        this._isScalar = false;
        if (subscribe) {
            this._subscribe = subscribe;
        }
    }
    /**
     * Creates a new Observable, with this Observable as the source, and the passed
     * operator defined as the new observable's operator.
     * @method lift
     * @param {Operator} operator the operator defining the operation to take on the observable
     * @return {Observable} a new observable with the Operator applied
     */


    _createClass(Observable, [{
        key: 'lift',
        value: function lift(operator) {
            var observable = new Observable();
            observable.source = this;
            observable.operator = operator;
            return observable;
        }
        /**
         * Registers handlers for handling emitted values, error and completions from the observable, and
         *  executes the observable's subscriber function, which will take action to set up the underlying data stream
         * @method subscribe
         * @param {PartialObserver|Function} observerOrNext (optional) either an observer defining all functions to be called,
         *  or the first of three possible handlers, which is the handler for each value emitted from the observable.
         * @param {Function} error (optional) a handler for a terminal event resulting from an error. If no error handler is provided,
         *  the error will be thrown as unhandled
         * @param {Function} complete (optional) a handler for a terminal event resulting from successful completion.
         * @return {ISubscription} a subscription reference to the registered handlers
         */

    }, {
        key: 'subscribe',
        value: function subscribe(observerOrNext, error, complete) {
            var operator = this.operator;

            var sink = (0, _toSubscriber.toSubscriber)(observerOrNext, error, complete);
            if (operator) {
                operator.call(sink, this);
            } else {
                sink.add(this._subscribe(sink));
            }
            if (sink.syncErrorThrowable) {
                sink.syncErrorThrowable = false;
                if (sink.syncErrorThrown) {
                    throw sink.syncErrorValue;
                }
            }
            return sink;
        }
        /**
         * @method forEach
         * @param {Function} next a handler for each value emitted by the observable
         * @param {PromiseConstructor} [PromiseCtor] a constructor function used to instantiate the Promise
         * @return {Promise} a promise that either resolves on observable completion or
         *  rejects with the handled error
         */

    }, {
        key: 'forEach',
        value: function forEach(next, PromiseCtor) {
            var _this = this;

            if (!PromiseCtor) {
                if (_root.root.Rx && _root.root.Rx.config && _root.root.Rx.config.Promise) {
                    PromiseCtor = _root.root.Rx.config.Promise;
                } else if (_root.root.Promise) {
                    PromiseCtor = _root.root.Promise;
                }
            }
            if (!PromiseCtor) {
                throw new Error('no Promise impl found');
            }
            return new PromiseCtor(function (resolve, reject) {
                var subscription = _this.subscribe(function (value) {
                    if (subscription) {
                        // if there is a subscription, then we can surmise
                        // the next handling is asynchronous. Any errors thrown
                        // need to be rejected explicitly and unsubscribe must be
                        // called manually
                        try {
                            next(value);
                        } catch (err) {
                            reject(err);
                            subscription.unsubscribe();
                        }
                    } else {
                        // if there is NO subscription, then we're getting a nexted
                        // value synchronously during subscription. We can just call it.
                        // If it errors, Observable's `subscribe` will ensure the
                        // unsubscription logic is called, then synchronously rethrow the error.
                        // After that, Promise will trap the error and send it
                        // down the rejection path.
                        next(value);
                    }
                }, reject, resolve);
            });
        }
    }, {
        key: '_subscribe',
        value: function _subscribe(subscriber) {
            return this.source.subscribe(subscriber);
        }
        /**
         * An interop point defined by the es7-observable spec https://github.com/zenparsing/es-observable
         * @method Symbol.observable
         * @return {Observable} this instance of the observable
         */

    }, {
        key: _observable.$$observable,
        value: function value() {
            return this;
        }
    }]);

    return Observable;
}();
// HACK: Since TypeScript inherits static properties too, we have to
// fight against TypeScript here so Subject can have a different static create signature
/**
 * Creates a new cold Observable by calling the Observable constructor
 * @static true
 * @owner Observable
 * @method create
 * @param {Function} subscribe? the subscriber function to be passed to the Observable constructor
 * @return {Observable} a new cold observable
 */


Observable.create = function (subscribe) {
    return new Observable(subscribe);
};


},{"./symbol/observable":85,"./util/root":95,"./util/toSubscriber":97}],46:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var empty = exports.empty = {
    closed: true,
    next: function next(value) {},
    error: function error(err) {
        throw err;
    },
    complete: function complete() {}
};


},{}],47:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.OuterSubscriber = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Subscriber2 = require('./Subscriber');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var OuterSubscriber = exports.OuterSubscriber = function (_Subscriber) {
    _inherits(OuterSubscriber, _Subscriber);

    function OuterSubscriber() {
        _classCallCheck(this, OuterSubscriber);

        return _possibleConstructorReturn(this, (OuterSubscriber.__proto__ || Object.getPrototypeOf(OuterSubscriber)).apply(this, arguments));
    }

    _createClass(OuterSubscriber, [{
        key: 'notifyNext',
        value: function notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
            this.destination.next(innerValue);
        }
    }, {
        key: 'notifyError',
        value: function notifyError(error, innerSub) {
            this.destination.error(error);
        }
    }, {
        key: 'notifyComplete',
        value: function notifyComplete(innerSub) {
            this.destination.complete();
        }
    }]);

    return OuterSubscriber;
}(_Subscriber2.Subscriber);


},{"./Subscriber":50}],48:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AnonymousSubject = exports.Subject = exports.SubjectSubscriber = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Observable2 = require('./Observable');

var _Subscriber2 = require('./Subscriber');

var _Subscription = require('./Subscription');

var _ObjectUnsubscribedError = require('./util/ObjectUnsubscribedError');

var _SubjectSubscription = require('./SubjectSubscription');

var _rxSubscriber = require('./symbol/rxSubscriber');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @class SubjectSubscriber<T>
 */
var SubjectSubscriber = exports.SubjectSubscriber = function (_Subscriber) {
    _inherits(SubjectSubscriber, _Subscriber);

    function SubjectSubscriber(destination) {
        _classCallCheck(this, SubjectSubscriber);

        var _this = _possibleConstructorReturn(this, (SubjectSubscriber.__proto__ || Object.getPrototypeOf(SubjectSubscriber)).call(this, destination));

        _this.destination = destination;
        return _this;
    }

    return SubjectSubscriber;
}(_Subscriber2.Subscriber);
/**
 * @class Subject<T>
 */


var Subject = exports.Subject = function (_Observable) {
    _inherits(Subject, _Observable);

    function Subject() {
        _classCallCheck(this, Subject);

        var _this2 = _possibleConstructorReturn(this, (Subject.__proto__ || Object.getPrototypeOf(Subject)).call(this));

        _this2.observers = [];
        _this2.closed = false;
        _this2.isStopped = false;
        _this2.hasError = false;
        _this2.thrownError = null;
        return _this2;
    }

    _createClass(Subject, [{
        key: _rxSubscriber.$$rxSubscriber,
        value: function value() {
            return new SubjectSubscriber(this);
        }
    }, {
        key: 'lift',
        value: function lift(operator) {
            var subject = new AnonymousSubject(this, this);
            subject.operator = operator;
            return subject;
        }
    }, {
        key: 'next',
        value: function next(value) {
            if (this.closed) {
                throw new _ObjectUnsubscribedError.ObjectUnsubscribedError();
            }
            if (!this.isStopped) {
                var observers = this.observers;

                var len = observers.length;
                var copy = observers.slice();
                for (var i = 0; i < len; i++) {
                    copy[i].next(value);
                }
            }
        }
    }, {
        key: 'error',
        value: function error(err) {
            if (this.closed) {
                throw new _ObjectUnsubscribedError.ObjectUnsubscribedError();
            }
            this.hasError = true;
            this.thrownError = err;
            this.isStopped = true;
            var observers = this.observers;

            var len = observers.length;
            var copy = observers.slice();
            for (var i = 0; i < len; i++) {
                copy[i].error(err);
            }
            this.observers.length = 0;
        }
    }, {
        key: 'complete',
        value: function complete() {
            if (this.closed) {
                throw new _ObjectUnsubscribedError.ObjectUnsubscribedError();
            }
            this.isStopped = true;
            var observers = this.observers;

            var len = observers.length;
            var copy = observers.slice();
            for (var i = 0; i < len; i++) {
                copy[i].complete();
            }
            this.observers.length = 0;
        }
    }, {
        key: 'unsubscribe',
        value: function unsubscribe() {
            this.isStopped = true;
            this.closed = true;
            this.observers = null;
        }
    }, {
        key: '_subscribe',
        value: function _subscribe(subscriber) {
            if (this.closed) {
                throw new _ObjectUnsubscribedError.ObjectUnsubscribedError();
            } else if (this.hasError) {
                subscriber.error(this.thrownError);
                return _Subscription.Subscription.EMPTY;
            } else if (this.isStopped) {
                subscriber.complete();
                return _Subscription.Subscription.EMPTY;
            } else {
                this.observers.push(subscriber);
                return new _SubjectSubscription.SubjectSubscription(this, subscriber);
            }
        }
    }, {
        key: 'asObservable',
        value: function asObservable() {
            var observable = new _Observable2.Observable();
            observable.source = this;
            return observable;
        }
    }]);

    return Subject;
}(_Observable2.Observable);

Subject.create = function (destination, source) {
    return new AnonymousSubject(destination, source);
};
/**
 * @class AnonymousSubject<T>
 */

var AnonymousSubject = exports.AnonymousSubject = function (_Subject) {
    _inherits(AnonymousSubject, _Subject);

    function AnonymousSubject(destination, source) {
        _classCallCheck(this, AnonymousSubject);

        var _this3 = _possibleConstructorReturn(this, (AnonymousSubject.__proto__ || Object.getPrototypeOf(AnonymousSubject)).call(this));

        _this3.destination = destination;
        _this3.source = source;
        return _this3;
    }

    _createClass(AnonymousSubject, [{
        key: 'next',
        value: function next(value) {
            var destination = this.destination;

            if (destination && destination.next) {
                destination.next(value);
            }
        }
    }, {
        key: 'error',
        value: function error(err) {
            var destination = this.destination;

            if (destination && destination.error) {
                this.destination.error(err);
            }
        }
    }, {
        key: 'complete',
        value: function complete() {
            var destination = this.destination;

            if (destination && destination.complete) {
                this.destination.complete();
            }
        }
    }, {
        key: '_subscribe',
        value: function _subscribe(subscriber) {
            var source = this.source;

            if (source) {
                return this.source.subscribe(subscriber);
            } else {
                return _Subscription.Subscription.EMPTY;
            }
        }
    }]);

    return AnonymousSubject;
}(Subject);


},{"./Observable":45,"./SubjectSubscription":49,"./Subscriber":50,"./Subscription":51,"./symbol/rxSubscriber":86,"./util/ObjectUnsubscribedError":87}],49:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SubjectSubscription = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Subscription2 = require('./Subscription');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SubjectSubscription = exports.SubjectSubscription = function (_Subscription) {
    _inherits(SubjectSubscription, _Subscription);

    function SubjectSubscription(subject, subscriber) {
        _classCallCheck(this, SubjectSubscription);

        var _this = _possibleConstructorReturn(this, (SubjectSubscription.__proto__ || Object.getPrototypeOf(SubjectSubscription)).call(this));

        _this.subject = subject;
        _this.subscriber = subscriber;
        _this.closed = false;
        return _this;
    }

    _createClass(SubjectSubscription, [{
        key: 'unsubscribe',
        value: function unsubscribe() {
            if (this.closed) {
                return;
            }
            this.closed = true;
            var subject = this.subject;
            var observers = subject.observers;
            this.subject = null;
            if (!observers || observers.length === 0 || subject.isStopped || subject.closed) {
                return;
            }
            var subscriberIndex = observers.indexOf(this.subscriber);
            if (subscriberIndex !== -1) {
                observers.splice(subscriberIndex, 1);
            }
        }
    }]);

    return SubjectSubscription;
}(_Subscription2.Subscription);


},{"./Subscription":51}],50:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Subscriber = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _isFunction = require('./util/isFunction');

var _Subscription2 = require('./Subscription');

var _Observer = require('./Observer');

var _rxSubscriber = require('./symbol/rxSubscriber');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Implements the {@link Observer} interface and extends the
 * {@link Subscription} class. While the {@link Observer} is the public API for
 * consuming the values of an {@link Observable}, all Observers get converted to
 * a Subscriber, in order to provide Subscription-like capabilities such as
 * `unsubscribe`. Subscriber is a common type in RxJS, and crucial for
 * implementing operators, but it is rarely used as a public API.
 *
 * @class Subscriber<T>
 */
var Subscriber = exports.Subscriber = function (_Subscription) {
    _inherits(Subscriber, _Subscription);

    /**
     * @param {Observer|function(value: T): void} [destinationOrNext] A partially
     * defined Observer or a `next` callback function.
     * @param {function(e: ?any): void} [error] The `error` callback of an
     * Observer.
     * @param {function(): void} [complete] The `complete` callback of an
     * Observer.
     */
    function Subscriber(destinationOrNext, error, complete) {
        _classCallCheck(this, Subscriber);

        var _this = _possibleConstructorReturn(this, (Subscriber.__proto__ || Object.getPrototypeOf(Subscriber)).call(this));

        _this.syncErrorValue = null;
        _this.syncErrorThrown = false;
        _this.syncErrorThrowable = false;
        _this.isStopped = false;
        switch (arguments.length) {
            case 0:
                _this.destination = _Observer.empty;
                break;
            case 1:
                if (!destinationOrNext) {
                    _this.destination = _Observer.empty;
                    break;
                }
                if ((typeof destinationOrNext === 'undefined' ? 'undefined' : _typeof(destinationOrNext)) === 'object') {
                    if (destinationOrNext instanceof Subscriber) {
                        _this.destination = destinationOrNext;
                        _this.destination.add(_this);
                    } else {
                        _this.syncErrorThrowable = true;
                        _this.destination = new SafeSubscriber(_this, destinationOrNext);
                    }
                    break;
                }
            default:
                _this.syncErrorThrowable = true;
                _this.destination = new SafeSubscriber(_this, destinationOrNext, error, complete);
                break;
        }
        return _this;
    }

    _createClass(Subscriber, [{
        key: _rxSubscriber.$$rxSubscriber,
        value: function value() {
            return this;
        }
        /**
         * A static factory for a Subscriber, given a (potentially partial) definition
         * of an Observer.
         * @param {function(x: ?T): void} [next] The `next` callback of an Observer.
         * @param {function(e: ?any): void} [error] The `error` callback of an
         * Observer.
         * @param {function(): void} [complete] The `complete` callback of an
         * Observer.
         * @return {Subscriber<T>} A Subscriber wrapping the (partially defined)
         * Observer represented by the given arguments.
         */

    }, {
        key: 'next',

        /**
         * The {@link Observer} callback to receive notifications of type `next` from
         * the Observable, with a value. The Observable may call this method 0 or more
         * times.
         * @param {T} [value] The `next` value.
         * @return {void}
         */
        value: function next(value) {
            if (!this.isStopped) {
                this._next(value);
            }
        }
        /**
         * The {@link Observer} callback to receive notifications of type `error` from
         * the Observable, with an attached {@link Error}. Notifies the Observer that
         * the Observable has experienced an error condition.
         * @param {any} [err] The `error` exception.
         * @return {void}
         */

    }, {
        key: 'error',
        value: function error(err) {
            if (!this.isStopped) {
                this.isStopped = true;
                this._error(err);
            }
        }
        /**
         * The {@link Observer} callback to receive a valueless notification of type
         * `complete` from the Observable. Notifies the Observer that the Observable
         * has finished sending push-based notifications.
         * @return {void}
         */

    }, {
        key: 'complete',
        value: function complete() {
            if (!this.isStopped) {
                this.isStopped = true;
                this._complete();
            }
        }
    }, {
        key: 'unsubscribe',
        value: function unsubscribe() {
            if (this.closed) {
                return;
            }
            this.isStopped = true;
            _get(Subscriber.prototype.__proto__ || Object.getPrototypeOf(Subscriber.prototype), 'unsubscribe', this).call(this);
        }
    }, {
        key: '_next',
        value: function _next(value) {
            this.destination.next(value);
        }
    }, {
        key: '_error',
        value: function _error(err) {
            this.destination.error(err);
            this.unsubscribe();
        }
    }, {
        key: '_complete',
        value: function _complete() {
            this.destination.complete();
            this.unsubscribe();
        }
    }], [{
        key: 'create',
        value: function create(next, error, complete) {
            var subscriber = new Subscriber(next, error, complete);
            subscriber.syncErrorThrowable = false;
            return subscriber;
        }
    }]);

    return Subscriber;
}(_Subscription2.Subscription);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */


var SafeSubscriber = function (_Subscriber) {
    _inherits(SafeSubscriber, _Subscriber);

    function SafeSubscriber(_parent, observerOrNext, error, complete) {
        _classCallCheck(this, SafeSubscriber);

        var _this2 = _possibleConstructorReturn(this, (SafeSubscriber.__proto__ || Object.getPrototypeOf(SafeSubscriber)).call(this));

        _this2._parent = _parent;
        var next = void 0;
        var context = _this2;
        if ((0, _isFunction.isFunction)(observerOrNext)) {
            next = observerOrNext;
        } else if (observerOrNext) {
            context = observerOrNext;
            next = observerOrNext.next;
            error = observerOrNext.error;
            complete = observerOrNext.complete;
            if ((0, _isFunction.isFunction)(context.unsubscribe)) {
                _this2.add(context.unsubscribe.bind(context));
            }
            context.unsubscribe = _this2.unsubscribe.bind(_this2);
        }
        _this2._context = context;
        _this2._next = next;
        _this2._error = error;
        _this2._complete = complete;
        return _this2;
    }

    _createClass(SafeSubscriber, [{
        key: 'next',
        value: function next(value) {
            if (!this.isStopped && this._next) {
                var _parent = this._parent;

                if (!_parent.syncErrorThrowable) {
                    this.__tryOrUnsub(this._next, value);
                } else if (this.__tryOrSetError(_parent, this._next, value)) {
                    this.unsubscribe();
                }
            }
        }
    }, {
        key: 'error',
        value: function error(err) {
            if (!this.isStopped) {
                var _parent = this._parent;

                if (this._error) {
                    if (!_parent.syncErrorThrowable) {
                        this.__tryOrUnsub(this._error, err);
                        this.unsubscribe();
                    } else {
                        this.__tryOrSetError(_parent, this._error, err);
                        this.unsubscribe();
                    }
                } else if (!_parent.syncErrorThrowable) {
                    this.unsubscribe();
                    throw err;
                } else {
                    _parent.syncErrorValue = err;
                    _parent.syncErrorThrown = true;
                    this.unsubscribe();
                }
            }
        }
    }, {
        key: 'complete',
        value: function complete() {
            if (!this.isStopped) {
                var _parent = this._parent;

                if (this._complete) {
                    if (!_parent.syncErrorThrowable) {
                        this.__tryOrUnsub(this._complete);
                        this.unsubscribe();
                    } else {
                        this.__tryOrSetError(_parent, this._complete);
                        this.unsubscribe();
                    }
                } else {
                    this.unsubscribe();
                }
            }
        }
    }, {
        key: '__tryOrUnsub',
        value: function __tryOrUnsub(fn, value) {
            try {
                fn.call(this._context, value);
            } catch (err) {
                this.unsubscribe();
                throw err;
            }
        }
    }, {
        key: '__tryOrSetError',
        value: function __tryOrSetError(parent, fn, value) {
            try {
                fn.call(this._context, value);
            } catch (err) {
                parent.syncErrorValue = err;
                parent.syncErrorThrown = true;
                return true;
            }
            return false;
        }
    }, {
        key: '_unsubscribe',
        value: function _unsubscribe() {
            var _parent = this._parent;

            this._context = null;
            this._parent = null;
            _parent.unsubscribe();
        }
    }]);

    return SafeSubscriber;
}(Subscriber);


},{"./Observer":46,"./Subscription":51,"./symbol/rxSubscriber":86,"./util/isFunction":91}],51:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Subscription = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _isArray = require('./util/isArray');

var _isObject = require('./util/isObject');

var _isFunction = require('./util/isFunction');

var _tryCatch = require('./util/tryCatch');

var _errorObject = require('./util/errorObject');

var _UnsubscriptionError = require('./util/UnsubscriptionError');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Represents a disposable resource, such as the execution of an Observable. A
 * Subscription has one important method, `unsubscribe`, that takes no argument
 * and just disposes the resource held by the subscription.
 *
 * Additionally, subscriptions may be grouped together through the `add()`
 * method, which will attach a child Subscription to the current Subscription.
 * When a Subscription is unsubscribed, all its children (and its grandchildren)
 * will be unsubscribed as well.
 *
 * @class Subscription
 */
var Subscription = exports.Subscription = function () {
    /**
     * @param {function(): void} [unsubscribe] A function describing how to
     * perform the disposal of resources when the `unsubscribe` method is called.
     */
    function Subscription(unsubscribe) {
        _classCallCheck(this, Subscription);

        /**
         * A flag to indicate whether this Subscription has already been unsubscribed.
         * @type {boolean}
         */
        this.closed = false;
        if (unsubscribe) {
            this._unsubscribe = unsubscribe;
        }
    }
    /**
     * Disposes the resources held by the subscription. May, for instance, cancel
     * an ongoing Observable execution or cancel any other type of work that
     * started when the Subscription was created.
     * @return {void}
     */


    _createClass(Subscription, [{
        key: 'unsubscribe',
        value: function unsubscribe() {
            var hasErrors = false;
            var errors = void 0;
            if (this.closed) {
                return;
            }
            this.closed = true;
            var _unsubscribe = this._unsubscribe;
            var _subscriptions = this._subscriptions;

            this._subscriptions = null;
            if ((0, _isFunction.isFunction)(_unsubscribe)) {
                var trial = (0, _tryCatch.tryCatch)(_unsubscribe).call(this);
                if (trial === _errorObject.errorObject) {
                    hasErrors = true;
                    (errors = errors || []).push(_errorObject.errorObject.e);
                }
            }
            if ((0, _isArray.isArray)(_subscriptions)) {
                var index = -1;
                var len = _subscriptions.length;
                while (++index < len) {
                    var sub = _subscriptions[index];
                    if ((0, _isObject.isObject)(sub)) {
                        var _trial = (0, _tryCatch.tryCatch)(sub.unsubscribe).call(sub);
                        if (_trial === _errorObject.errorObject) {
                            hasErrors = true;
                            errors = errors || [];
                            var err = _errorObject.errorObject.e;
                            if (err instanceof _UnsubscriptionError.UnsubscriptionError) {
                                errors = errors.concat(err.errors);
                            } else {
                                errors.push(err);
                            }
                        }
                    }
                }
            }
            if (hasErrors) {
                throw new _UnsubscriptionError.UnsubscriptionError(errors);
            }
        }
        /**
         * Adds a tear down to be called during the unsubscribe() of this
         * Subscription.
         *
         * If the tear down being added is a subscription that is already
         * unsubscribed, is the same reference `add` is being called on, or is
         * `Subscription.EMPTY`, it will not be added.
         *
         * If this subscription is already in an `closed` state, the passed
         * tear down logic will be executed immediately.
         *
         * @param {TeardownLogic} teardown The additional logic to execute on
         * teardown.
         * @return {Subscription} Returns the Subscription used or created to be
         * added to the inner subscriptions list. This Subscription can be used with
         * `remove()` to remove the passed teardown logic from the inner subscriptions
         * list.
         */

    }, {
        key: 'add',
        value: function add(teardown) {
            if (!teardown || teardown === Subscription.EMPTY) {
                return Subscription.EMPTY;
            }
            if (teardown === this) {
                return this;
            }
            var sub = teardown;
            switch (typeof teardown === 'undefined' ? 'undefined' : _typeof(teardown)) {
                case 'function':
                    sub = new Subscription(teardown);
                case 'object':
                    if (sub.closed || typeof sub.unsubscribe !== 'function') {
                        break;
                    } else if (this.closed) {
                        sub.unsubscribe();
                    } else {
                        (this._subscriptions || (this._subscriptions = [])).push(sub);
                    }
                    break;
                default:
                    throw new Error('unrecognized teardown ' + teardown + ' added to Subscription.');
            }
            return sub;
        }
        /**
         * Removes a Subscription from the internal list of subscriptions that will
         * unsubscribe during the unsubscribe process of this Subscription.
         * @param {Subscription} subscription The subscription to remove.
         * @return {void}
         */

    }, {
        key: 'remove',
        value: function remove(subscription) {
            // HACK: This might be redundant because of the logic in `add()`
            if (subscription == null || subscription === this || subscription === Subscription.EMPTY) {
                return;
            }
            var subscriptions = this._subscriptions;
            if (subscriptions) {
                var subscriptionIndex = subscriptions.indexOf(subscription);
                if (subscriptionIndex !== -1) {
                    subscriptions.splice(subscriptionIndex, 1);
                }
            }
        }
    }]);

    return Subscription;
}();

Subscription.EMPTY = function (empty) {
    empty.closed = true;
    return empty;
}(new Subscription());


},{"./util/UnsubscriptionError":88,"./util/errorObject":89,"./util/isArray":90,"./util/isFunction":91,"./util/isObject":92,"./util/tryCatch":98}],52:[function(require,module,exports){
'use strict';

var _Observable = require('../../../Observable');

var _ajax = require('../../../observable/dom/ajax');

_Observable.Observable.ajax = _ajax.ajax;


},{"../../../Observable":45,"../../../observable/dom/ajax":70}],53:[function(require,module,exports){
'use strict';

var _Observable = require('../../Observable');

var _empty = require('../../observable/empty');

_Observable.Observable.empty = _empty.empty;


},{"../../Observable":45,"../../observable/empty":71}],54:[function(require,module,exports){
'use strict';

var _Observable = require('../../Observable');

var _fromEvent = require('../../observable/fromEvent');

_Observable.Observable.fromEvent = _fromEvent.fromEvent;


},{"../../Observable":45,"../../observable/fromEvent":72}],55:[function(require,module,exports){
'use strict';

var _Observable = require('../../Observable');

var _merge = require('../../observable/merge');

_Observable.Observable.merge = _merge.merge;


},{"../../Observable":45,"../../observable/merge":73}],56:[function(require,module,exports){
'use strict';

var _Observable = require('../../Observable');

var _of = require('../../observable/of');

_Observable.Observable.of = _of.of;


},{"../../Observable":45,"../../observable/of":74}],57:[function(require,module,exports){
'use strict';

var _Observable = require('../../Observable');

var _catch2 = require('../../operator/catch');

_Observable.Observable.prototype.catch = _catch2._catch;
_Observable.Observable.prototype._catch = _catch2._catch;


},{"../../Observable":45,"../../operator/catch":75}],58:[function(require,module,exports){
'use strict';

var _Observable = require('../../Observable');

var _do2 = require('../../operator/do');

_Observable.Observable.prototype.do = _do2._do;
_Observable.Observable.prototype._do = _do2._do;


},{"../../Observable":45,"../../operator/do":76}],59:[function(require,module,exports){
'use strict';

var _Observable = require('../../Observable');

var _filter = require('../../operator/filter');

_Observable.Observable.prototype.filter = _filter.filter;


},{"../../Observable":45,"../../operator/filter":77}],60:[function(require,module,exports){
'use strict';

var _Observable = require('../../Observable');

var _map = require('../../operator/map');

_Observable.Observable.prototype.map = _map.map;


},{"../../Observable":45,"../../operator/map":78}],61:[function(require,module,exports){
'use strict';

var _Observable = require('../../Observable');

var _mergeAll = require('../../operator/mergeAll');

_Observable.Observable.prototype.mergeAll = _mergeAll.mergeAll;


},{"../../Observable":45,"../../operator/mergeAll":80}],62:[function(require,module,exports){
'use strict';

var _Observable = require('../../Observable');

var _retry = require('../../operator/retry');

_Observable.Observable.prototype.retry = _retry.retry;


},{"../../Observable":45,"../../operator/retry":81}],63:[function(require,module,exports){
'use strict';

var _Observable = require('../../Observable');

var _switch2 = require('../../operator/switch');

_Observable.Observable.prototype.switch = _switch2._switch;
_Observable.Observable.prototype._switch = _switch2._switch;


},{"../../Observable":45,"../../operator/switch":82}],64:[function(require,module,exports){
'use strict';

var _Observable = require('../../Observable');

var _switchMap = require('../../operator/switchMap');

_Observable.Observable.prototype.switchMap = _switchMap.switchMap;


},{"../../Observable":45,"../../operator/switchMap":83}],65:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ArrayObservable = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Observable2 = require('../Observable');

var _ScalarObservable = require('./ScalarObservable');

var _EmptyObservable = require('./EmptyObservable');

var _isScheduler = require('../util/isScheduler');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var ArrayObservable = exports.ArrayObservable = function (_Observable) {
    _inherits(ArrayObservable, _Observable);

    function ArrayObservable(array, scheduler) {
        _classCallCheck(this, ArrayObservable);

        var _this = _possibleConstructorReturn(this, (ArrayObservable.__proto__ || Object.getPrototypeOf(ArrayObservable)).call(this));

        _this.array = array;
        _this.scheduler = scheduler;
        if (!scheduler && array.length === 1) {
            _this._isScalar = true;
            _this.value = array[0];
        }
        return _this;
    }

    _createClass(ArrayObservable, [{
        key: '_subscribe',
        value: function _subscribe(subscriber) {
            var index = 0;
            var array = this.array;
            var count = array.length;
            var scheduler = this.scheduler;
            if (scheduler) {
                return scheduler.schedule(ArrayObservable.dispatch, 0, {
                    array: array, index: index, count: count, subscriber: subscriber
                });
            } else {
                for (var i = 0; i < count && !subscriber.closed; i++) {
                    subscriber.next(array[i]);
                }
                subscriber.complete();
            }
        }
    }], [{
        key: 'create',
        value: function create(array, scheduler) {
            return new ArrayObservable(array, scheduler);
        }
        /**
         * Creates an Observable that emits some values you specify as arguments,
         * immediately one after the other, and then emits a complete notification.
         *
         * <span class="informal">Emits the arguments you provide, then completes.
         * </span>
         *
         * <img src="./img/of.png" width="100%">
         *
         * This static operator is useful for creating a simple Observable that only
         * emits the arguments given, and the complete notification thereafter. It can
         * be used for composing with other Observables, such as with {@link concat}.
         * By default, it uses a `null` Scheduler, which means the `next`
         * notifications are sent synchronously, although with a different Scheduler
         * it is possible to determine when those notifications will be delivered.
         *
         * @example <caption>Emit 10, 20, 30, then 'a', 'b', 'c', then start ticking every second.</caption>
         * var numbers = Rx.Observable.of(10, 20, 30);
         * var letters = Rx.Observable.of('a', 'b', 'c');
         * var interval = Rx.Observable.interval(1000);
         * var result = numbers.concat(letters).concat(interval);
         * result.subscribe(x => console.log(x));
         *
         * @see {@link create}
         * @see {@link empty}
         * @see {@link never}
         * @see {@link throw}
         *
         * @param {...T} values Arguments that represent `next` values to be emitted.
         * @param {Scheduler} [scheduler] A {@link Scheduler} to use for scheduling
         * the emissions of the `next` notifications.
         * @return {Observable<T>} An Observable that emits each given input value.
         * @static true
         * @name of
         * @owner Observable
         */

    }, {
        key: 'of',
        value: function of() {
            for (var _len = arguments.length, array = Array(_len), _key = 0; _key < _len; _key++) {
                array[_key] = arguments[_key];
            }

            var scheduler = array[array.length - 1];
            if ((0, _isScheduler.isScheduler)(scheduler)) {
                array.pop();
            } else {
                scheduler = null;
            }
            var len = array.length;
            if (len > 1) {
                return new ArrayObservable(array, scheduler);
            } else if (len === 1) {
                return new _ScalarObservable.ScalarObservable(array[0], scheduler);
            } else {
                return new _EmptyObservable.EmptyObservable(scheduler);
            }
        }
    }, {
        key: 'dispatch',
        value: function dispatch(state) {
            var array = state.array;
            var index = state.index;
            var count = state.count;
            var subscriber = state.subscriber;

            if (index >= count) {
                subscriber.complete();
                return;
            }
            subscriber.next(array[index]);
            if (subscriber.closed) {
                return;
            }
            state.index = index + 1;
            this.schedule(state);
        }
    }]);

    return ArrayObservable;
}(_Observable2.Observable);


},{"../Observable":45,"../util/isScheduler":94,"./EmptyObservable":66,"./ScalarObservable":68}],66:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.EmptyObservable = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Observable2 = require('../Observable');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var EmptyObservable = exports.EmptyObservable = function (_Observable) {
    _inherits(EmptyObservable, _Observable);

    function EmptyObservable(scheduler) {
        _classCallCheck(this, EmptyObservable);

        var _this = _possibleConstructorReturn(this, (EmptyObservable.__proto__ || Object.getPrototypeOf(EmptyObservable)).call(this));

        _this.scheduler = scheduler;
        return _this;
    }
    /**
     * Creates an Observable that emits no items to the Observer and immediately
     * emits a complete notification.
     *
     * <span class="informal">Just emits 'complete', and nothing else.
     * </span>
     *
     * <img src="./img/empty.png" width="100%">
     *
     * This static operator is useful for creating a simple Observable that only
     * emits the complete notification. It can be used for composing with other
     * Observables, such as in a {@link mergeMap}.
     *
     * @example <caption>Emit the number 7, then complete.</caption>
     * var result = Rx.Observable.empty().startWith(7);
     * result.subscribe(x => console.log(x));
     *
     * @example <caption>Map and flatten only odd numbers to the sequence 'a', 'b', 'c'</caption>
     * var interval = Rx.Observable.interval(1000);
     * var result = interval.mergeMap(x =>
     *   x % 2 === 1 ? Rx.Observable.of('a', 'b', 'c') : Rx.Observable.empty()
     * );
     * result.subscribe(x => console.log(x));
     *
     * @see {@link create}
     * @see {@link never}
     * @see {@link of}
     * @see {@link throw}
     *
     * @param {Scheduler} [scheduler] A {@link Scheduler} to use for scheduling
     * the emission of the complete notification.
     * @return {Observable} An "empty" Observable: emits only the complete
     * notification.
     * @static true
     * @name empty
     * @owner Observable
     */


    _createClass(EmptyObservable, [{
        key: '_subscribe',
        value: function _subscribe(subscriber) {
            var scheduler = this.scheduler;
            if (scheduler) {
                return scheduler.schedule(EmptyObservable.dispatch, 0, { subscriber: subscriber });
            } else {
                subscriber.complete();
            }
        }
    }], [{
        key: 'create',
        value: function create(scheduler) {
            return new EmptyObservable(scheduler);
        }
    }, {
        key: 'dispatch',
        value: function dispatch(arg) {
            var subscriber = arg.subscriber;

            subscriber.complete();
        }
    }]);

    return EmptyObservable;
}(_Observable2.Observable);


},{"../Observable":45}],67:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FromEventObservable = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Observable2 = require('../Observable');

var _tryCatch = require('../util/tryCatch');

var _isFunction = require('../util/isFunction');

var _errorObject = require('../util/errorObject');

var _Subscription = require('../Subscription');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function isNodeStyleEventEmmitter(sourceObj) {
    return !!sourceObj && typeof sourceObj.addListener === 'function' && typeof sourceObj.removeListener === 'function';
}
function isJQueryStyleEventEmitter(sourceObj) {
    return !!sourceObj && typeof sourceObj.on === 'function' && typeof sourceObj.off === 'function';
}
function isNodeList(sourceObj) {
    return !!sourceObj && sourceObj.toString() === '[object NodeList]';
}
function isHTMLCollection(sourceObj) {
    return !!sourceObj && sourceObj.toString() === '[object HTMLCollection]';
}
function isEventTarget(sourceObj) {
    return !!sourceObj && typeof sourceObj.addEventListener === 'function' && typeof sourceObj.removeEventListener === 'function';
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */

var FromEventObservable = exports.FromEventObservable = function (_Observable) {
    _inherits(FromEventObservable, _Observable);

    function FromEventObservable(sourceObj, eventName, selector, options) {
        _classCallCheck(this, FromEventObservable);

        var _this = _possibleConstructorReturn(this, (FromEventObservable.__proto__ || Object.getPrototypeOf(FromEventObservable)).call(this));

        _this.sourceObj = sourceObj;
        _this.eventName = eventName;
        _this.selector = selector;
        _this.options = options;
        return _this;
    }
    /* tslint:enable:max-line-length */
    /**
     * Creates an Observable that emits events of a specific type coming from the
     * given event target.
     *
     * <span class="informal">Creates an Observable from DOM events, or Node
     * EventEmitter events or others.</span>
     *
     * <img src="./img/fromEvent.png" width="100%">
     *
     * Creates an Observable by attaching an event listener to an "event target",
     * which may be an object with `addEventListener` and `removeEventListener`,
     * a Node.js EventEmitter, a jQuery style EventEmitter, a NodeList from the
     * DOM, or an HTMLCollection from the DOM. The event handler is attached when
     * the output Observable is subscribed, and removed when the Subscription is
     * unsubscribed.
     *
     * @example <caption>Emits clicks happening on the DOM document</caption>
     * var clicks = Rx.Observable.fromEvent(document, 'click');
     * clicks.subscribe(x => console.log(x));
     *
     * @see {@link from}
     * @see {@link fromEventPattern}
     *
     * @param {EventTargetLike} target The DOMElement, event target, Node.js
     * EventEmitter, NodeList or HTMLCollection to attach the event handler to.
     * @param {string} eventName The event name of interest, being emitted by the
     * `target`.
     * @parm {EventListenerOptions} [options] Options to pass through to addEventListener
     * @param {SelectorMethodSignature<T>} [selector] An optional function to
     * post-process results. It takes the arguments from the event handler and
     * should return a single value.
     * @return {Observable<T>}
     * @static true
     * @name fromEvent
     * @owner Observable
     */


    _createClass(FromEventObservable, [{
        key: '_subscribe',
        value: function _subscribe(subscriber) {
            var sourceObj = this.sourceObj;
            var eventName = this.eventName;
            var options = this.options;
            var selector = this.selector;
            var handler = selector ? function () {
                var result = (0, _tryCatch.tryCatch)(selector).apply(undefined, arguments);
                if (result === _errorObject.errorObject) {
                    subscriber.error(_errorObject.errorObject.e);
                } else {
                    subscriber.next(result);
                }
            } : function (e) {
                return subscriber.next(e);
            };
            FromEventObservable.setupSubscription(sourceObj, eventName, handler, subscriber, options);
        }
    }], [{
        key: 'create',
        value: function create(target, eventName, options, selector) {
            if ((0, _isFunction.isFunction)(options)) {
                selector = options;
                options = undefined;
            }
            return new FromEventObservable(target, eventName, selector, options);
        }
    }, {
        key: 'setupSubscription',
        value: function setupSubscription(sourceObj, eventName, handler, subscriber, options) {
            var unsubscribe = void 0;
            if (isNodeList(sourceObj) || isHTMLCollection(sourceObj)) {
                for (var i = 0, len = sourceObj.length; i < len; i++) {
                    FromEventObservable.setupSubscription(sourceObj[i], eventName, handler, subscriber, options);
                }
            } else if (isEventTarget(sourceObj)) {
                (function () {
                    var source = sourceObj;
                    sourceObj.addEventListener(eventName, handler, options);
                    unsubscribe = function unsubscribe() {
                        return source.removeEventListener(eventName, handler);
                    };
                })();
            } else if (isJQueryStyleEventEmitter(sourceObj)) {
                (function () {
                    var source = sourceObj;
                    sourceObj.on(eventName, handler);
                    unsubscribe = function unsubscribe() {
                        return source.off(eventName, handler);
                    };
                })();
            } else if (isNodeStyleEventEmmitter(sourceObj)) {
                (function () {
                    var source = sourceObj;
                    sourceObj.addListener(eventName, handler);
                    unsubscribe = function unsubscribe() {
                        return source.removeListener(eventName, handler);
                    };
                })();
            }
            subscriber.add(new _Subscription.Subscription(unsubscribe));
        }
    }]);

    return FromEventObservable;
}(_Observable2.Observable);


},{"../Observable":45,"../Subscription":51,"../util/errorObject":89,"../util/isFunction":91,"../util/tryCatch":98}],68:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ScalarObservable = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Observable2 = require('../Observable');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var ScalarObservable = exports.ScalarObservable = function (_Observable) {
    _inherits(ScalarObservable, _Observable);

    function ScalarObservable(value, scheduler) {
        _classCallCheck(this, ScalarObservable);

        var _this = _possibleConstructorReturn(this, (ScalarObservable.__proto__ || Object.getPrototypeOf(ScalarObservable)).call(this));

        _this.value = value;
        _this.scheduler = scheduler;
        _this._isScalar = true;
        if (scheduler) {
            _this._isScalar = false;
        }
        return _this;
    }

    _createClass(ScalarObservable, [{
        key: '_subscribe',
        value: function _subscribe(subscriber) {
            var value = this.value;
            var scheduler = this.scheduler;
            if (scheduler) {
                return scheduler.schedule(ScalarObservable.dispatch, 0, {
                    done: false, value: value, subscriber: subscriber
                });
            } else {
                subscriber.next(value);
                if (!subscriber.closed) {
                    subscriber.complete();
                }
            }
        }
    }], [{
        key: 'create',
        value: function create(value, scheduler) {
            return new ScalarObservable(value, scheduler);
        }
    }, {
        key: 'dispatch',
        value: function dispatch(state) {
            var done = state.done;
            var value = state.value;
            var subscriber = state.subscriber;

            if (done) {
                subscriber.complete();
                return;
            }
            subscriber.next(value);
            if (subscriber.closed) {
                return;
            }
            state.done = true;
            this.schedule(state);
        }
    }]);

    return ScalarObservable;
}(_Observable2.Observable);


},{"../Observable":45}],69:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AjaxTimeoutError = exports.AjaxError = exports.AjaxResponse = exports.AjaxSubscriber = exports.AjaxObservable = undefined;

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.ajaxGet = ajaxGet;
exports.ajaxPost = ajaxPost;
exports.ajaxDelete = ajaxDelete;
exports.ajaxPut = ajaxPut;
exports.ajaxGetJSON = ajaxGetJSON;

var _root = require('../../util/root');

var _tryCatch = require('../../util/tryCatch');

var _errorObject = require('../../util/errorObject');

var _Observable2 = require('../../Observable');

var _Subscriber2 = require('../../Subscriber');

var _map = require('../../operator/map');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function getCORSRequest() {
    if (_root.root.XMLHttpRequest) {
        var xhr = new _root.root.XMLHttpRequest();
        if ('withCredentials' in xhr) {
            xhr.withCredentials = !!this.withCredentials;
        }
        return xhr;
    } else if (!!_root.root.XDomainRequest) {
        return new _root.root.XDomainRequest();
    } else {
        throw new Error('CORS is not supported by your browser');
    }
}
function getXMLHttpRequest() {
    if (_root.root.XMLHttpRequest) {
        return new _root.root.XMLHttpRequest();
    } else {
        var progId = void 0;
        try {
            var progIds = ['Msxml2.XMLHTTP', 'Microsoft.XMLHTTP', 'Msxml2.XMLHTTP.4.0'];
            for (var i = 0; i < 3; i++) {
                try {
                    progId = progIds[i];
                    if (new _root.root.ActiveXObject(progId)) {
                        break;
                    }
                } catch (e) {}
            }
            return new _root.root.ActiveXObject(progId);
        } catch (e) {
            throw new Error('XMLHttpRequest is not supported by your browser');
        }
    }
}
function ajaxGet(url) {
    var headers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    return new AjaxObservable({ method: 'GET', url: url, headers: headers });
}
;
function ajaxPost(url, body, headers) {
    return new AjaxObservable({ method: 'POST', url: url, body: body, headers: headers });
}
;
function ajaxDelete(url, headers) {
    return new AjaxObservable({ method: 'DELETE', url: url, headers: headers });
}
;
function ajaxPut(url, body, headers) {
    return new AjaxObservable({ method: 'PUT', url: url, body: body, headers: headers });
}
;
function ajaxGetJSON(url, headers) {
    return new AjaxObservable({ method: 'GET', url: url, responseType: 'json', headers: headers }).lift(new _map.MapOperator(function (x, index) {
        return x.response;
    }, null));
}
;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */

var AjaxObservable = exports.AjaxObservable = function (_Observable) {
    _inherits(AjaxObservable, _Observable);

    function AjaxObservable(urlOrRequest) {
        _classCallCheck(this, AjaxObservable);

        var _this = _possibleConstructorReturn(this, (AjaxObservable.__proto__ || Object.getPrototypeOf(AjaxObservable)).call(this));

        var request = {
            async: true,
            createXHR: function createXHR() {
                return this.crossDomain ? getCORSRequest.call(this) : getXMLHttpRequest();
            },
            crossDomain: false,
            withCredentials: false,
            headers: {},
            method: 'GET',
            responseType: 'json',
            timeout: 0
        };
        if (typeof urlOrRequest === 'string') {
            request.url = urlOrRequest;
        } else {
            for (var prop in urlOrRequest) {
                if (urlOrRequest.hasOwnProperty(prop)) {
                    request[prop] = urlOrRequest[prop];
                }
            }
        }
        _this.request = request;
        return _this;
    }

    _createClass(AjaxObservable, [{
        key: '_subscribe',
        value: function _subscribe(subscriber) {
            return new AjaxSubscriber(subscriber, this.request);
        }
    }]);

    return AjaxObservable;
}(_Observable2.Observable);
/**
 * Creates an observable for an Ajax request with either a request object with
 * url, headers, etc or a string for a URL.
 *
 * @example
 * source = Rx.Observable.ajax('/products');
 * source = Rx.Observable.ajax({ url: 'products', method: 'GET' });
 *
 * @param {string|Object} request Can be one of the following:
 *   A string of the URL to make the Ajax call.
 *   An object with the following properties
 *   - url: URL of the request
 *   - body: The body of the request
 *   - method: Method of the request, such as GET, POST, PUT, PATCH, DELETE
 *   - async: Whether the request is async
 *   - headers: Optional headers
 *   - crossDomain: true if a cross domain request, else false
 *   - createXHR: a function to override if you need to use an alternate
 *   XMLHttpRequest implementation.
 *   - resultSelector: a function to use to alter the output value type of
 *   the Observable. Gets {@link AjaxResponse} as an argument.
 * @return {Observable} An observable sequence containing the XMLHttpRequest.
 * @static true
 * @name ajax
 * @owner Observable
*/


AjaxObservable.create = function () {
    var create = function create(urlOrRequest) {
        return new AjaxObservable(urlOrRequest);
    };
    create.get = ajaxGet;
    create.post = ajaxPost;
    create.delete = ajaxDelete;
    create.put = ajaxPut;
    create.getJSON = ajaxGetJSON;
    return create;
}();
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */

var AjaxSubscriber = exports.AjaxSubscriber = function (_Subscriber) {
    _inherits(AjaxSubscriber, _Subscriber);

    function AjaxSubscriber(destination, request) {
        _classCallCheck(this, AjaxSubscriber);

        var _this2 = _possibleConstructorReturn(this, (AjaxSubscriber.__proto__ || Object.getPrototypeOf(AjaxSubscriber)).call(this, destination));

        _this2.request = request;
        _this2.done = false;
        var headers = request.headers = request.headers || {};
        // force CORS if requested
        if (!request.crossDomain && !headers['X-Requested-With']) {
            headers['X-Requested-With'] = 'XMLHttpRequest';
        }
        // ensure content type is set
        if (!('Content-Type' in headers) && !(_root.root.FormData && request.body instanceof _root.root.FormData) && typeof request.body !== 'undefined') {
            headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        }
        // properly serialize body
        request.body = _this2.serializeBody(request.body, request.headers['Content-Type']);
        _this2.send();
        return _this2;
    }

    _createClass(AjaxSubscriber, [{
        key: 'next',
        value: function next(e) {
            this.done = true;
            var xhr = this.xhr;
            var request = this.request;
            var destination = this.destination;

            var response = new AjaxResponse(e, xhr, request);
            destination.next(response);
        }
    }, {
        key: 'send',
        value: function send() {
            var request = this.request;
            var _request = this.request;
            var user = _request.user;
            var method = _request.method;
            var url = _request.url;
            var async = _request.async;
            var password = _request.password;
            var headers = _request.headers;
            var body = _request.body;

            var createXHR = request.createXHR;
            var xhr = (0, _tryCatch.tryCatch)(createXHR).call(request);
            if (xhr === _errorObject.errorObject) {
                this.error(_errorObject.errorObject.e);
            } else {
                this.xhr = xhr;
                // open XHR first
                var result = void 0;
                if (user) {
                    result = (0, _tryCatch.tryCatch)(xhr.open).call(xhr, method, url, async, user, password);
                } else {
                    result = (0, _tryCatch.tryCatch)(xhr.open).call(xhr, method, url, async);
                }
                if (result === _errorObject.errorObject) {
                    this.error(_errorObject.errorObject.e);
                    return null;
                }
                // timeout and responseType can be set once the XHR is open
                xhr.timeout = request.timeout;
                xhr.responseType = request.responseType;
                // set headers
                this.setHeaders(xhr, headers);
                // now set up the events
                this.setupEvents(xhr, request);
                // finally send the request
                if (body) {
                    xhr.send(body);
                } else {
                    xhr.send();
                }
            }
            return xhr;
        }
    }, {
        key: 'serializeBody',
        value: function serializeBody(body, contentType) {
            if (!body || typeof body === 'string') {
                return body;
            } else if (_root.root.FormData && body instanceof _root.root.FormData) {
                return body;
            }
            if (contentType) {
                var splitIndex = contentType.indexOf(';');
                if (splitIndex !== -1) {
                    contentType = contentType.substring(0, splitIndex);
                }
            }
            switch (contentType) {
                case 'application/x-www-form-urlencoded':
                    return Object.keys(body).map(function (key) {
                        return encodeURI(key) + '=' + encodeURI(body[key]);
                    }).join('&');
                case 'application/json':
                    return JSON.stringify(body);
                default:
                    return body;
            }
        }
    }, {
        key: 'setHeaders',
        value: function setHeaders(xhr, headers) {
            for (var key in headers) {
                if (headers.hasOwnProperty(key)) {
                    xhr.setRequestHeader(key, headers[key]);
                }
            }
        }
    }, {
        key: 'setupEvents',
        value: function setupEvents(xhr, request) {
            var progressSubscriber = request.progressSubscriber;
            xhr.ontimeout = function xhrTimeout(e) {
                var subscriber = xhrTimeout.subscriber;
                var progressSubscriber = xhrTimeout.progressSubscriber;
                var request = xhrTimeout.request;

                if (progressSubscriber) {
                    progressSubscriber.error(e);
                }
                subscriber.error(new AjaxTimeoutError(this, request)); //TODO: Make betterer.
            };
            xhr.ontimeout.request = request;
            xhr.ontimeout.subscriber = this;
            xhr.ontimeout.progressSubscriber = progressSubscriber;
            if (xhr.upload && 'withCredentials' in xhr && _root.root.XDomainRequest) {
                if (progressSubscriber) {
                    xhr.onprogress = function xhrProgress(e) {
                        var progressSubscriber = xhrProgress.progressSubscriber;

                        progressSubscriber.next(e);
                    };
                    xhr.onprogress.progressSubscriber = progressSubscriber;
                }
                xhr.onerror = function xhrError(e) {
                    var progressSubscriber = xhrError.progressSubscriber;
                    var subscriber = xhrError.subscriber;
                    var request = xhrError.request;

                    if (progressSubscriber) {
                        progressSubscriber.error(e);
                    }
                    subscriber.error(new AjaxError('ajax error', this, request));
                };
                xhr.onerror.request = request;
                xhr.onerror.subscriber = this;
                xhr.onerror.progressSubscriber = progressSubscriber;
            }
            xhr.onreadystatechange = function xhrReadyStateChange(e) {
                var subscriber = xhrReadyStateChange.subscriber;
                var progressSubscriber = xhrReadyStateChange.progressSubscriber;
                var request = xhrReadyStateChange.request;

                if (this.readyState === 4) {
                    // normalize IE9 bug (http://bugs.jquery.com/ticket/1450)
                    var status = this.status === 1223 ? 204 : this.status;
                    var response = this.responseType === 'text' ? this.response || this.responseText : this.response;
                    // fix status code when it is 0 (0 status is undocumented).
                    // Occurs when accessing file resources or on Android 4.1 stock browser
                    // while retrieving files from application cache.
                    if (status === 0) {
                        status = response ? 200 : 0;
                    }
                    if (200 <= status && status < 300) {
                        if (progressSubscriber) {
                            progressSubscriber.complete();
                        }
                        subscriber.next(e);
                        subscriber.complete();
                    } else {
                        if (progressSubscriber) {
                            progressSubscriber.error(e);
                        }
                        subscriber.error(new AjaxError('ajax error ' + status, this, request));
                    }
                }
            };
            xhr.onreadystatechange.subscriber = this;
            xhr.onreadystatechange.progressSubscriber = progressSubscriber;
            xhr.onreadystatechange.request = request;
        }
    }, {
        key: 'unsubscribe',
        value: function unsubscribe() {
            var done = this.done;
            var xhr = this.xhr;

            if (!done && xhr && xhr.readyState !== 4) {
                xhr.abort();
            }
            _get(AjaxSubscriber.prototype.__proto__ || Object.getPrototypeOf(AjaxSubscriber.prototype), 'unsubscribe', this).call(this);
        }
    }]);

    return AjaxSubscriber;
}(_Subscriber2.Subscriber);
/**
 * A normalized AJAX response.
 *
 * @see {@link ajax}
 *
 * @class AjaxResponse
 */


var AjaxResponse = exports.AjaxResponse = function AjaxResponse(originalEvent, xhr, request) {
    _classCallCheck(this, AjaxResponse);

    this.originalEvent = originalEvent;
    this.xhr = xhr;
    this.request = request;
    this.status = xhr.status;
    this.responseType = xhr.responseType || request.responseType;
    switch (this.responseType) {
        case 'json':
            if ('response' in xhr) {
                //IE does not support json as responseType, parse it internally
                this.response = xhr.responseType ? xhr.response : JSON.parse(xhr.response || xhr.responseText || 'null');
            } else {
                this.response = JSON.parse(xhr.responseText || 'null');
            }
            break;
        case 'xml':
            this.response = xhr.responseXML;
            break;
        case 'text':
        default:
            this.response = 'response' in xhr ? xhr.response : xhr.responseText;
            break;
    }
};
/**
 * A normalized AJAX error.
 *
 * @see {@link ajax}
 *
 * @class AjaxError
 */


var AjaxError = exports.AjaxError = function (_Error) {
    _inherits(AjaxError, _Error);

    function AjaxError(message, xhr, request) {
        _classCallCheck(this, AjaxError);

        var _this3 = _possibleConstructorReturn(this, (AjaxError.__proto__ || Object.getPrototypeOf(AjaxError)).call(this, message));

        _this3.message = message;
        _this3.xhr = xhr;
        _this3.request = request;
        _this3.status = xhr.status;
        return _this3;
    }

    return AjaxError;
}(Error);
/**
 * @see {@link ajax}
 *
 * @class AjaxTimeoutError
 */


var AjaxTimeoutError = exports.AjaxTimeoutError = function (_AjaxError) {
    _inherits(AjaxTimeoutError, _AjaxError);

    function AjaxTimeoutError(xhr, request) {
        _classCallCheck(this, AjaxTimeoutError);

        return _possibleConstructorReturn(this, (AjaxTimeoutError.__proto__ || Object.getPrototypeOf(AjaxTimeoutError)).call(this, 'ajax timeout', xhr, request));
    }

    return AjaxTimeoutError;
}(AjaxError);


},{"../../Observable":45,"../../Subscriber":50,"../../operator/map":78,"../../util/errorObject":89,"../../util/root":95,"../../util/tryCatch":98}],70:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ajax = undefined;

var _AjaxObservable = require('./AjaxObservable');

var ajax = exports.ajax = _AjaxObservable.AjaxObservable.create;


},{"./AjaxObservable":69}],71:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.empty = undefined;

var _EmptyObservable = require('./EmptyObservable');

var empty = exports.empty = _EmptyObservable.EmptyObservable.create;


},{"./EmptyObservable":66}],72:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fromEvent = undefined;

var _FromEventObservable = require('./FromEventObservable');

var fromEvent = exports.fromEvent = _FromEventObservable.FromEventObservable.create;


},{"./FromEventObservable":67}],73:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.merge = undefined;

var _merge = require('../operator/merge');

var merge = exports.merge = _merge.mergeStatic;


},{"../operator/merge":79}],74:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.of = undefined;

var _ArrayObservable = require('./ArrayObservable');

var of = exports.of = _ArrayObservable.ArrayObservable.of;


},{"./ArrayObservable":65}],75:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports._catch = _catch;

var _OuterSubscriber2 = require('../OuterSubscriber');

var _subscribeToResult = require('../util/subscribeToResult');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Catches errors on the observable to be handled by returning a new observable or throwing an error.
 * @param {function} selector a function that takes as arguments `err`, which is the error, and `caught`, which
 *  is the source observable, in case you'd like to "retry" that observable by returning it again. Whatever observable
 *  is returned by the `selector` will be used to continue the observable chain.
 * @return {Observable} an observable that originates from either the source or the observable returned by the
 *  catch `selector` function.
 * @method catch
 * @owner Observable
 */
function _catch(selector) {
    var operator = new CatchOperator(selector);
    var caught = this.lift(operator);
    return operator.caught = caught;
}

var CatchOperator = function () {
    function CatchOperator(selector) {
        _classCallCheck(this, CatchOperator);

        this.selector = selector;
    }

    _createClass(CatchOperator, [{
        key: 'call',
        value: function call(subscriber, source) {
            return source._subscribe(new CatchSubscriber(subscriber, this.selector, this.caught));
        }
    }]);

    return CatchOperator;
}();
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */


var CatchSubscriber = function (_OuterSubscriber) {
    _inherits(CatchSubscriber, _OuterSubscriber);

    function CatchSubscriber(destination, selector, caught) {
        _classCallCheck(this, CatchSubscriber);

        var _this = _possibleConstructorReturn(this, (CatchSubscriber.__proto__ || Object.getPrototypeOf(CatchSubscriber)).call(this, destination));

        _this.selector = selector;
        _this.caught = caught;
        return _this;
    }
    // NOTE: overriding `error` instead of `_error` because we don't want
    // to have this flag this subscriber as `isStopped`.


    _createClass(CatchSubscriber, [{
        key: 'error',
        value: function error(err) {
            if (!this.isStopped) {
                var result = void 0;
                try {
                    result = this.selector(err, this.caught);
                } catch (err) {
                    this.destination.error(err);
                    return;
                }
                this.unsubscribe();
                this.destination.remove(this);
                (0, _subscribeToResult.subscribeToResult)(this, result);
            }
        }
    }]);

    return CatchSubscriber;
}(_OuterSubscriber2.OuterSubscriber);


},{"../OuterSubscriber":47,"../util/subscribeToResult":96}],76:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports._do = _do;

var _Subscriber2 = require('../Subscriber');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Perform a side effect for every emission on the source Observable, but return
 * an Observable that is identical to the source.
 *
 * <span class="informal">Intercepts each emission on the source and runs a
 * function, but returns an output which is identical to the source.</span>
 *
 * <img src="./img/do.png" width="100%">
 *
 * Returns a mirrored Observable of the source Observable, but modified so that
 * the provided Observer is called to perform a side effect for every value,
 * error, and completion emitted by the source. Any errors that are thrown in
 * the aforementioned Observer or handlers are safely sent down the error path
 * of the output Observable.
 *
 * This operator is useful for debugging your Observables for the correct values
 * or performing other side effects.
 *
 * Note: this is different to a `subscribe` on the Observable. If the Observable
 * returned by `do` is not subscribed, the side effects specified by the
 * Observer will never happen. `do` therefore simply spies on existing
 * execution, it does not trigger an execution to happen like `subscribe` does.
 *
 * @example <caption>Map every every click to the clientX position of that click, while also logging the click event</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var positions = clicks
 *   .do(ev => console.log(ev))
 *   .map(ev => ev.clientX);
 * positions.subscribe(x => console.log(x));
 *
 * @see {@link map}
 * @see {@link subscribe}
 *
 * @param {Observer|function} [nextOrObserver] A normal Observer object or a
 * callback for `next`.
 * @param {function} [error] Callback for errors in the source.
 * @param {function} [complete] Callback for the completion of the source.
 * @return {Observable} An Observable identical to the source, but runs the
 * specified Observer or callback(s) for each item.
 * @method do
 * @name do
 * @owner Observable
 */
function _do(nextOrObserver, error, complete) {
    return this.lift(new DoOperator(nextOrObserver, error, complete));
}

var DoOperator = function () {
    function DoOperator(nextOrObserver, error, complete) {
        _classCallCheck(this, DoOperator);

        this.nextOrObserver = nextOrObserver;
        this.error = error;
        this.complete = complete;
    }

    _createClass(DoOperator, [{
        key: 'call',
        value: function call(subscriber, source) {
            return source._subscribe(new DoSubscriber(subscriber, this.nextOrObserver, this.error, this.complete));
        }
    }]);

    return DoOperator;
}();
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */


var DoSubscriber = function (_Subscriber) {
    _inherits(DoSubscriber, _Subscriber);

    function DoSubscriber(destination, nextOrObserver, error, complete) {
        _classCallCheck(this, DoSubscriber);

        var _this = _possibleConstructorReturn(this, (DoSubscriber.__proto__ || Object.getPrototypeOf(DoSubscriber)).call(this, destination));

        var safeSubscriber = new _Subscriber2.Subscriber(nextOrObserver, error, complete);
        safeSubscriber.syncErrorThrowable = true;
        _this.add(safeSubscriber);
        _this.safeSubscriber = safeSubscriber;
        return _this;
    }

    _createClass(DoSubscriber, [{
        key: '_next',
        value: function _next(value) {
            var safeSubscriber = this.safeSubscriber;

            safeSubscriber.next(value);
            if (safeSubscriber.syncErrorThrown) {
                this.destination.error(safeSubscriber.syncErrorValue);
            } else {
                this.destination.next(value);
            }
        }
    }, {
        key: '_error',
        value: function _error(err) {
            var safeSubscriber = this.safeSubscriber;

            safeSubscriber.error(err);
            if (safeSubscriber.syncErrorThrown) {
                this.destination.error(safeSubscriber.syncErrorValue);
            } else {
                this.destination.error(err);
            }
        }
    }, {
        key: '_complete',
        value: function _complete() {
            var safeSubscriber = this.safeSubscriber;

            safeSubscriber.complete();
            if (safeSubscriber.syncErrorThrown) {
                this.destination.error(safeSubscriber.syncErrorValue);
            } else {
                this.destination.complete();
            }
        }
    }]);

    return DoSubscriber;
}(_Subscriber2.Subscriber);


},{"../Subscriber":50}],77:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.filter = filter;

var _Subscriber2 = require('../Subscriber');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Filter items emitted by the source Observable by only emitting those that
 * satisfy a specified predicate.
 *
 * <span class="informal">Like
 * [Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter),
 * it only emits a value from the source if it passes a criterion function.</span>
 *
 * <img src="./img/filter.png" width="100%">
 *
 * Similar to the well-known `Array.prototype.filter` method, this operator
 * takes values from the source Observable, passes them through a `predicate`
 * function and only emits those values that yielded `true`.
 *
 * @example <caption>Emit only click events whose target was a DIV element</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var clicksOnDivs = clicks.filter(ev => ev.target.tagName === 'DIV');
 * clicksOnDivs.subscribe(x => console.log(x));
 *
 * @see {@link distinct}
 * @see {@link distinctKey}
 * @see {@link distinctUntilChanged}
 * @see {@link distinctUntilKeyChanged}
 * @see {@link ignoreElements}
 * @see {@link partition}
 * @see {@link skip}
 *
 * @param {function(value: T, index: number): boolean} predicate A function that
 * evaluates each value emitted by the source Observable. If it returns `true`,
 * the value is emitted, if `false` the value is not passed to the output
 * Observable. The `index` parameter is the number `i` for the i-th source
 * emission that has happened since the subscription, starting from the number
 * `0`.
 * @param {any} [thisArg] An optional argument to determine the value of `this`
 * in the `predicate` function.
 * @return {Observable} An Observable of values from the source that were
 * allowed by the `predicate` function.
 * @method filter
 * @owner Observable
 */
function filter(predicate, thisArg) {
    return this.lift(new FilterOperator(predicate, thisArg));
}

var FilterOperator = function () {
    function FilterOperator(predicate, thisArg) {
        _classCallCheck(this, FilterOperator);

        this.predicate = predicate;
        this.thisArg = thisArg;
    }

    _createClass(FilterOperator, [{
        key: 'call',
        value: function call(subscriber, source) {
            return source._subscribe(new FilterSubscriber(subscriber, this.predicate, this.thisArg));
        }
    }]);

    return FilterOperator;
}();
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */


var FilterSubscriber = function (_Subscriber) {
    _inherits(FilterSubscriber, _Subscriber);

    function FilterSubscriber(destination, predicate, thisArg) {
        _classCallCheck(this, FilterSubscriber);

        var _this = _possibleConstructorReturn(this, (FilterSubscriber.__proto__ || Object.getPrototypeOf(FilterSubscriber)).call(this, destination));

        _this.predicate = predicate;
        _this.thisArg = thisArg;
        _this.count = 0;
        _this.predicate = predicate;
        return _this;
    }
    // the try catch block below is left specifically for
    // optimization and perf reasons. a tryCatcher is not necessary here.


    _createClass(FilterSubscriber, [{
        key: '_next',
        value: function _next(value) {
            var result = void 0;
            try {
                result = this.predicate.call(this.thisArg, value, this.count++);
            } catch (err) {
                this.destination.error(err);
                return;
            }
            if (result) {
                this.destination.next(value);
            }
        }
    }]);

    return FilterSubscriber;
}(_Subscriber2.Subscriber);


},{"../Subscriber":50}],78:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MapOperator = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.map = map;

var _Subscriber2 = require('../Subscriber');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Applies a given `project` function to each value emitted by the source
 * Observable, and emits the resulting values as an Observable.
 *
 * <span class="informal">Like [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map),
 * it passes each source value through a transformation function to get
 * corresponding output values.</span>
 *
 * <img src="./img/map.png" width="100%">
 *
 * Similar to the well known `Array.prototype.map` function, this operator
 * applies a projection to each value and emits that projection in the output
 * Observable.
 *
 * @example <caption>Map every every click to the clientX position of that click</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var positions = clicks.map(ev => ev.clientX);
 * positions.subscribe(x => console.log(x));
 *
 * @see {@link mapTo}
 * @see {@link pluck}
 *
 * @param {function(value: T, index: number): R} project The function to apply
 * to each `value` emitted by the source Observable. The `index` parameter is
 * the number `i` for the i-th emission that has happened since the
 * subscription, starting from the number `0`.
 * @param {any} [thisArg] An optional argument to define what `this` is in the
 * `project` function.
 * @return {Observable<R>} An Observable that emits the values from the source
 * Observable transformed by the given `project` function.
 * @method map
 * @owner Observable
 */
function map(project, thisArg) {
    if (typeof project !== 'function') {
        throw new TypeError('argument is not a function. Are you looking for `mapTo()`?');
    }
    return this.lift(new MapOperator(project, thisArg));
}

var MapOperator = exports.MapOperator = function () {
    function MapOperator(project, thisArg) {
        _classCallCheck(this, MapOperator);

        this.project = project;
        this.thisArg = thisArg;
    }

    _createClass(MapOperator, [{
        key: 'call',
        value: function call(subscriber, source) {
            return source._subscribe(new MapSubscriber(subscriber, this.project, this.thisArg));
        }
    }]);

    return MapOperator;
}();
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */


var MapSubscriber = function (_Subscriber) {
    _inherits(MapSubscriber, _Subscriber);

    function MapSubscriber(destination, project, thisArg) {
        _classCallCheck(this, MapSubscriber);

        var _this = _possibleConstructorReturn(this, (MapSubscriber.__proto__ || Object.getPrototypeOf(MapSubscriber)).call(this, destination));

        _this.project = project;
        _this.count = 0;
        _this.thisArg = thisArg || _this;
        return _this;
    }
    // NOTE: This looks unoptimized, but it's actually purposefully NOT
    // using try/catch optimizations.


    _createClass(MapSubscriber, [{
        key: '_next',
        value: function _next(value) {
            var result = void 0;
            try {
                result = this.project.call(this.thisArg, value, this.count++);
            } catch (err) {
                this.destination.error(err);
                return;
            }
            this.destination.next(result);
        }
    }]);

    return MapSubscriber;
}(_Subscriber2.Subscriber);


},{"../Subscriber":50}],79:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.merge = merge;
exports.mergeStatic = mergeStatic;

var _ArrayObservable = require('../observable/ArrayObservable');

var _mergeAll = require('./mergeAll');

var _isScheduler = require('../util/isScheduler');

/**
 * Creates an output Observable which concurrently emits all values from every
 * given input Observable.
 *
 * <span class="informal">Flattens multiple Observables together by blending
 * their values into one Observable.</span>
 *
 * <img src="./img/merge.png" width="100%">
 *
 * `merge` subscribes to each given input Observable (either the source or an
 * Observable given as argument), and simply forwards (without doing any
 * transformation) all the values from all the input Observables to the output
 * Observable. The output Observable only completes once all input Observables
 * have completed. Any error delivered by an input Observable will be immediately
 * emitted on the output Observable.
 *
 * @example <caption>Merge together two Observables: 1s interval and clicks</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var timer = Rx.Observable.interval(1000);
 * var clicksOrTimer = clicks.merge(timer);
 * clicksOrTimer.subscribe(x => console.log(x));
 *
 * @example <caption>Merge together 3 Observables, but only 2 run concurrently</caption>
 * var timer1 = Rx.Observable.interval(1000).take(10);
 * var timer2 = Rx.Observable.interval(2000).take(6);
 * var timer3 = Rx.Observable.interval(500).take(10);
 * var concurrent = 2; // the argument
 * var merged = timer1.merge(timer2, timer3, concurrent);
 * merged.subscribe(x => console.log(x));
 *
 * @see {@link mergeAll}
 * @see {@link mergeMap}
 * @see {@link mergeMapTo}
 * @see {@link mergeScan}
 *
 * @param {Observable} other An input Observable to merge with the source
 * Observable. More than one input Observables may be given as argument.
 * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of input
 * Observables being subscribed to concurrently.
 * @param {Scheduler} [scheduler=null] The Scheduler to use for managing
 * concurrency of input Observables.
 * @return {Observable} an Observable that emits items that are the result of
 * every input Observable.
 * @method merge
 * @owner Observable
 */
function merge() {
    for (var _len = arguments.length, observables = Array(_len), _key = 0; _key < _len; _key++) {
        observables[_key] = arguments[_key];
    }

    observables.unshift(this);
    return mergeStatic.apply(this, observables);
}
/* tslint:enable:max-line-length */
/**
 * Creates an output Observable which concurrently emits all values from every
 * given input Observable.
 *
 * <span class="informal">Flattens multiple Observables together by blending
 * their values into one Observable.</span>
 *
 * <img src="./img/merge.png" width="100%">
 *
 * `merge` subscribes to each given input Observable (as arguments), and simply
 * forwards (without doing any transformation) all the values from all the input
 * Observables to the output Observable. The output Observable only completes
 * once all input Observables have completed. Any error delivered by an input
 * Observable will be immediately emitted on the output Observable.
 *
 * @example <caption>Merge together two Observables: 1s interval and clicks</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var timer = Rx.Observable.interval(1000);
 * var clicksOrTimer = Rx.Observable.merge(clicks, timer);
 * clicksOrTimer.subscribe(x => console.log(x));
 *
 * @example <caption>Merge together 3 Observables, but only 2 run concurrently</caption>
 * var timer1 = Rx.Observable.interval(1000).take(10);
 * var timer2 = Rx.Observable.interval(2000).take(6);
 * var timer3 = Rx.Observable.interval(500).take(10);
 * var concurrent = 2; // the argument
 * var merged = Rx.Observable.merge(timer1, timer2, timer3, concurrent);
 * merged.subscribe(x => console.log(x));
 *
 * @see {@link mergeAll}
 * @see {@link mergeMap}
 * @see {@link mergeMapTo}
 * @see {@link mergeScan}
 *
 * @param {Observable} input1 An input Observable to merge with others.
 * @param {Observable} input2 An input Observable to merge with others.
 * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of input
 * Observables being subscribed to concurrently.
 * @param {Scheduler} [scheduler=null] The Scheduler to use for managing
 * concurrency of input Observables.
 * @return {Observable} an Observable that emits items that are the result of
 * every input Observable.
 * @static true
 * @name merge
 * @owner Observable
 */
function mergeStatic() {
    var concurrent = Number.POSITIVE_INFINITY;
    var scheduler = null;

    for (var _len2 = arguments.length, observables = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        observables[_key2] = arguments[_key2];
    }

    var last = observables[observables.length - 1];
    if ((0, _isScheduler.isScheduler)(last)) {
        scheduler = observables.pop();
        if (observables.length > 1 && typeof observables[observables.length - 1] === 'number') {
            concurrent = observables.pop();
        }
    } else if (typeof last === 'number') {
        concurrent = observables.pop();
    }
    if (observables.length === 1) {
        return observables[0];
    }
    return new _ArrayObservable.ArrayObservable(observables, scheduler).lift(new _mergeAll.MergeAllOperator(concurrent));
}


},{"../observable/ArrayObservable":65,"../util/isScheduler":94,"./mergeAll":80}],80:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MergeAllSubscriber = exports.MergeAllOperator = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.mergeAll = mergeAll;

var _OuterSubscriber2 = require('../OuterSubscriber');

var _subscribeToResult = require('../util/subscribeToResult');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Converts a higher-order Observable into a first-order Observable which
 * concurrently delivers all values that are emitted on the inner Observables.
 *
 * <span class="informal">Flattens an Observable-of-Observables.</span>
 *
 * <img src="./img/mergeAll.png" width="100%">
 *
 * `mergeAll` subscribes to an Observable that emits Observables, also known as
 * a higher-order Observable. Each time it observes one of these emitted inner
 * Observables, it subscribes to that and delivers all the values from the
 * inner Observable on the output Observable. The output Observable only
 * completes once all inner Observables have completed. Any error delivered by
 * a inner Observable will be immediately emitted on the output Observable.
 *
 * @example <caption>Spawn a new interval Observable for each click event, and blend their outputs as one Observable</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var higherOrder = clicks.map((ev) => Rx.Observable.interval(1000));
 * var firstOrder = higherOrder.mergeAll();
 * firstOrder.subscribe(x => console.log(x));
 *
 * @example <caption>Count from 0 to 9 every second for each click, but only allow 2 concurrent timers</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var higherOrder = clicks.map((ev) => Rx.Observable.interval(1000).take(10));
 * var firstOrder = higherOrder.mergeAll(2);
 * firstOrder.subscribe(x => console.log(x));
 *
 * @see {@link combineAll}
 * @see {@link concatAll}
 * @see {@link exhaust}
 * @see {@link merge}
 * @see {@link mergeMap}
 * @see {@link mergeMapTo}
 * @see {@link mergeScan}
 * @see {@link switch}
 * @see {@link zipAll}
 *
 * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of inner
 * Observables being subscribed to concurrently.
 * @return {Observable} An Observable that emits values coming from all the
 * inner Observables emitted by the source Observable.
 * @method mergeAll
 * @owner Observable
 */
function mergeAll() {
    var concurrent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Number.POSITIVE_INFINITY;

    return this.lift(new MergeAllOperator(concurrent));
}

var MergeAllOperator = exports.MergeAllOperator = function () {
    function MergeAllOperator(concurrent) {
        _classCallCheck(this, MergeAllOperator);

        this.concurrent = concurrent;
    }

    _createClass(MergeAllOperator, [{
        key: 'call',
        value: function call(observer, source) {
            return source._subscribe(new MergeAllSubscriber(observer, this.concurrent));
        }
    }]);

    return MergeAllOperator;
}();
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */


var MergeAllSubscriber = exports.MergeAllSubscriber = function (_OuterSubscriber) {
    _inherits(MergeAllSubscriber, _OuterSubscriber);

    function MergeAllSubscriber(destination, concurrent) {
        _classCallCheck(this, MergeAllSubscriber);

        var _this = _possibleConstructorReturn(this, (MergeAllSubscriber.__proto__ || Object.getPrototypeOf(MergeAllSubscriber)).call(this, destination));

        _this.concurrent = concurrent;
        _this.hasCompleted = false;
        _this.buffer = [];
        _this.active = 0;
        return _this;
    }

    _createClass(MergeAllSubscriber, [{
        key: '_next',
        value: function _next(observable) {
            if (this.active < this.concurrent) {
                this.active++;
                this.add((0, _subscribeToResult.subscribeToResult)(this, observable));
            } else {
                this.buffer.push(observable);
            }
        }
    }, {
        key: '_complete',
        value: function _complete() {
            this.hasCompleted = true;
            if (this.active === 0 && this.buffer.length === 0) {
                this.destination.complete();
            }
        }
    }, {
        key: 'notifyComplete',
        value: function notifyComplete(innerSub) {
            var buffer = this.buffer;
            this.remove(innerSub);
            this.active--;
            if (buffer.length > 0) {
                this._next(buffer.shift());
            } else if (this.active === 0 && this.hasCompleted) {
                this.destination.complete();
            }
        }
    }]);

    return MergeAllSubscriber;
}(_OuterSubscriber2.OuterSubscriber);


},{"../OuterSubscriber":47,"../util/subscribeToResult":96}],81:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.retry = retry;

var _Subscriber2 = require('../Subscriber');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Returns an Observable that mirrors the source Observable, resubscribing to it if it calls `error` and the
 * predicate returns true for that specific exception and retry count.
 * If the source Observable calls `error`, this method will resubscribe to the source Observable for a maximum of
 * count resubscriptions (given as a number parameter) rather than propagating the `error` call.
 *
 * <img src="./img/retry.png" width="100%">
 *
 * Any and all items emitted by the source Observable will be emitted by the resulting Observable, even those emitted
 * during failed subscriptions. For example, if an Observable fails at first but emits [1, 2] then succeeds the second
 * time and emits: [1, 2, 3, 4, 5] then the complete stream of emissions and notifications
 * would be: [1, 2, 1, 2, 3, 4, 5, `complete`].
 * @param {number} number of retry attempts before failing.
 * @return {Observable} the source Observable modified with the retry logic.
 * @method retry
 * @owner Observable
 */
function retry() {
    var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;

    return this.lift(new RetryOperator(count, this));
}

var RetryOperator = function () {
    function RetryOperator(count, source) {
        _classCallCheck(this, RetryOperator);

        this.count = count;
        this.source = source;
    }

    _createClass(RetryOperator, [{
        key: 'call',
        value: function call(subscriber, source) {
            return source._subscribe(new RetrySubscriber(subscriber, this.count, this.source));
        }
    }]);

    return RetryOperator;
}();
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */


var RetrySubscriber = function (_Subscriber) {
    _inherits(RetrySubscriber, _Subscriber);

    function RetrySubscriber(destination, count, source) {
        _classCallCheck(this, RetrySubscriber);

        var _this = _possibleConstructorReturn(this, (RetrySubscriber.__proto__ || Object.getPrototypeOf(RetrySubscriber)).call(this, destination));

        _this.count = count;
        _this.source = source;
        return _this;
    }

    _createClass(RetrySubscriber, [{
        key: 'error',
        value: function error(err) {
            if (!this.isStopped) {
                var source = this.source;
                var count = this.count;

                if (count === 0) {
                    return _get(RetrySubscriber.prototype.__proto__ || Object.getPrototypeOf(RetrySubscriber.prototype), 'error', this).call(this, err);
                } else if (count > -1) {
                    this.count = count - 1;
                }
                this.unsubscribe();
                this.isStopped = false;
                this.closed = false;
                source.subscribe(this);
            }
        }
    }]);

    return RetrySubscriber;
}(_Subscriber2.Subscriber);


},{"../Subscriber":50}],82:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports._switch = _switch;

var _OuterSubscriber2 = require('../OuterSubscriber');

var _subscribeToResult = require('../util/subscribeToResult');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Converts a higher-order Observable into a first-order Observable by
 * subscribing to only the most recently emitted of those inner Observables.
 *
 * <span class="informal">Flattens an Observable-of-Observables by dropping the
 * previous inner Observable once a new one appears.</span>
 *
 * <img src="./img/switch.png" width="100%">
 *
 * `switch` subscribes to an Observable that emits Observables, also known as a
 * higher-order Observable. Each time it observes one of these emitted inner
 * Observables, the output Observable subscribes to the inner Observable and
 * begins emitting the items emitted by that. So far, it behaves
 * like {@link mergeAll}. However, when a new inner Observable is emitted,
 * `switch` unsubscribes from the earlier-emitted inner Observable and
 * subscribes to the new inner Observable and begins emitting items from it. It
 * continues to behave like this for subsequent inner Observables.
 *
 * @example <caption>Rerun an interval Observable on every click event</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * // Each click event is mapped to an Observable that ticks every second
 * var higherOrder = clicks.map((ev) => Rx.Observable.interval(1000));
 * var switched = higherOrder.switch();
 * // The outcome is that `switched` is essentially a timer that restarts
 * // on every click. The interval Observables from older clicks do not merge
 * // with the current interval Observable.
 * switched.subscribe(x => console.log(x));
 *
 * @see {@link combineAll}
 * @see {@link concatAll}
 * @see {@link exhaust}
 * @see {@link mergeAll}
 * @see {@link switchMap}
 * @see {@link switchMapTo}
 * @see {@link zipAll}
 *
 * @return {Observable<T>} An Observable that emits the items emitted by the
 * Observable most recently emitted by the source Observable.
 * @method switch
 * @name switch
 * @owner Observable
 */
function _switch() {
    return this.lift(new SwitchOperator());
}

var SwitchOperator = function () {
    function SwitchOperator() {
        _classCallCheck(this, SwitchOperator);
    }

    _createClass(SwitchOperator, [{
        key: 'call',
        value: function call(subscriber, source) {
            return source._subscribe(new SwitchSubscriber(subscriber));
        }
    }]);

    return SwitchOperator;
}();
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */


var SwitchSubscriber = function (_OuterSubscriber) {
    _inherits(SwitchSubscriber, _OuterSubscriber);

    function SwitchSubscriber(destination) {
        _classCallCheck(this, SwitchSubscriber);

        var _this = _possibleConstructorReturn(this, (SwitchSubscriber.__proto__ || Object.getPrototypeOf(SwitchSubscriber)).call(this, destination));

        _this.active = 0;
        _this.hasCompleted = false;
        return _this;
    }

    _createClass(SwitchSubscriber, [{
        key: '_next',
        value: function _next(value) {
            this.unsubscribeInner();
            this.active++;
            this.add(this.innerSubscription = (0, _subscribeToResult.subscribeToResult)(this, value));
        }
    }, {
        key: '_complete',
        value: function _complete() {
            this.hasCompleted = true;
            if (this.active === 0) {
                this.destination.complete();
            }
        }
    }, {
        key: 'unsubscribeInner',
        value: function unsubscribeInner() {
            this.active = this.active > 0 ? this.active - 1 : 0;
            var innerSubscription = this.innerSubscription;
            if (innerSubscription) {
                innerSubscription.unsubscribe();
                this.remove(innerSubscription);
            }
        }
    }, {
        key: 'notifyNext',
        value: function notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
            this.destination.next(innerValue);
        }
    }, {
        key: 'notifyError',
        value: function notifyError(err) {
            this.destination.error(err);
        }
    }, {
        key: 'notifyComplete',
        value: function notifyComplete() {
            this.unsubscribeInner();
            if (this.hasCompleted && this.active === 0) {
                this.destination.complete();
            }
        }
    }]);

    return SwitchSubscriber;
}(_OuterSubscriber2.OuterSubscriber);


},{"../OuterSubscriber":47,"../util/subscribeToResult":96}],83:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.switchMap = switchMap;

var _OuterSubscriber2 = require('../OuterSubscriber');

var _subscribeToResult = require('../util/subscribeToResult');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Projects each source value to an Observable which is merged in the output
 * Observable, emitting values only from the most recently projected Observable.
 *
 * <span class="informal">Maps each value to an Observable, then flattens all of
 * these inner Observables using {@link switch}.</span>
 *
 * <img src="./img/switchMap.png" width="100%">
 *
 * Returns an Observable that emits items based on applying a function that you
 * supply to each item emitted by the source Observable, where that function
 * returns an (so-called "inner") Observable. Each time it observes one of these
 * inner Observables, the output Observable begins emitting the items emitted by
 * that inner Observable. When a new inner Observable is emitted, `switchMap`
 * stops emitting items from the earlier-emitted inner Observable and begins
 * emitting items from the new one. It continues to behave like this for
 * subsequent inner Observables.
 *
 * @example <caption>Rerun an interval Observable on every click event</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.switchMap((ev) => Rx.Observable.interval(1000));
 * result.subscribe(x => console.log(x));
 *
 * @see {@link concatMap}
 * @see {@link exhaustMap}
 * @see {@link mergeMap}
 * @see {@link switch}
 * @see {@link switchMapTo}
 *
 * @param {function(value: T, ?index: number): Observable} project A function
 * that, when applied to an item emitted by the source Observable, returns an
 * Observable.
 * @param {function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any} [resultSelector]
 * A function to produce the value on the output Observable based on the values
 * and the indices of the source (outer) emission and the inner Observable
 * emission. The arguments passed to this function are:
 * - `outerValue`: the value that came from the source
 * - `innerValue`: the value that came from the projected Observable
 * - `outerIndex`: the "index" of the value that came from the source
 * - `innerIndex`: the "index" of the value from the projected Observable
 * @return {Observable} An Observable that emits the result of applying the
 * projection function (and the optional `resultSelector`) to each item emitted
 * by the source Observable and taking only the values from the most recently
 * projected inner Observable.
 * @method switchMap
 * @owner Observable
 */
function switchMap(project, resultSelector) {
    return this.lift(new SwitchMapOperator(project, resultSelector));
}

var SwitchMapOperator = function () {
    function SwitchMapOperator(project, resultSelector) {
        _classCallCheck(this, SwitchMapOperator);

        this.project = project;
        this.resultSelector = resultSelector;
    }

    _createClass(SwitchMapOperator, [{
        key: 'call',
        value: function call(subscriber, source) {
            return source._subscribe(new SwitchMapSubscriber(subscriber, this.project, this.resultSelector));
        }
    }]);

    return SwitchMapOperator;
}();
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */


var SwitchMapSubscriber = function (_OuterSubscriber) {
    _inherits(SwitchMapSubscriber, _OuterSubscriber);

    function SwitchMapSubscriber(destination, project, resultSelector) {
        _classCallCheck(this, SwitchMapSubscriber);

        var _this = _possibleConstructorReturn(this, (SwitchMapSubscriber.__proto__ || Object.getPrototypeOf(SwitchMapSubscriber)).call(this, destination));

        _this.project = project;
        _this.resultSelector = resultSelector;
        _this.index = 0;
        return _this;
    }

    _createClass(SwitchMapSubscriber, [{
        key: '_next',
        value: function _next(value) {
            var result = void 0;
            var index = this.index++;
            try {
                result = this.project(value, index);
            } catch (error) {
                this.destination.error(error);
                return;
            }
            this._innerSub(result, value, index);
        }
    }, {
        key: '_innerSub',
        value: function _innerSub(result, value, index) {
            var innerSubscription = this.innerSubscription;
            if (innerSubscription) {
                innerSubscription.unsubscribe();
            }
            this.add(this.innerSubscription = (0, _subscribeToResult.subscribeToResult)(this, result, value, index));
        }
    }, {
        key: '_complete',
        value: function _complete() {
            var innerSubscription = this.innerSubscription;

            if (!innerSubscription || innerSubscription.closed) {
                _get(SwitchMapSubscriber.prototype.__proto__ || Object.getPrototypeOf(SwitchMapSubscriber.prototype), '_complete', this).call(this);
            }
        }
    }, {
        key: '_unsubscribe',
        value: function _unsubscribe() {
            this.innerSubscription = null;
        }
    }, {
        key: 'notifyComplete',
        value: function notifyComplete(innerSub) {
            this.remove(innerSub);
            this.innerSubscription = null;
            if (this.isStopped) {
                _get(SwitchMapSubscriber.prototype.__proto__ || Object.getPrototypeOf(SwitchMapSubscriber.prototype), '_complete', this).call(this);
            }
        }
    }, {
        key: 'notifyNext',
        value: function notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
            if (this.resultSelector) {
                this._tryNotifyNext(outerValue, innerValue, outerIndex, innerIndex);
            } else {
                this.destination.next(innerValue);
            }
        }
    }, {
        key: '_tryNotifyNext',
        value: function _tryNotifyNext(outerValue, innerValue, outerIndex, innerIndex) {
            var result = void 0;
            try {
                result = this.resultSelector(outerValue, innerValue, outerIndex, innerIndex);
            } catch (err) {
                this.destination.error(err);
                return;
            }
            this.destination.next(result);
        }
    }]);

    return SwitchMapSubscriber;
}(_OuterSubscriber2.OuterSubscriber);


},{"../OuterSubscriber":47,"../util/subscribeToResult":96}],84:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.$$iterator = undefined;

var _root = require('../util/root');

var $$iterator = exports.$$iterator = void 0;
var _Symbol = _root.root.Symbol;
if (typeof _Symbol === 'function') {
    if (_Symbol.iterator) {
        exports.$$iterator = $$iterator = _Symbol.iterator;
    } else if (typeof _Symbol.for === 'function') {
        exports.$$iterator = $$iterator = _Symbol.for('iterator');
    }
} else {
    if (_root.root.Set && typeof new _root.root.Set()['@@iterator'] === 'function') {
        // Bug for mozilla version
        exports.$$iterator = $$iterator = '@@iterator';
    } else if (_root.root.Map) {
        // es6-shim specific logic
        var keys = Object.getOwnPropertyNames(_root.root.Map.prototype);
        for (var i = 0; i < keys.length; ++i) {
            var key = keys[i];
            if (key !== 'entries' && key !== 'size' && _root.root.Map.prototype[key] === _root.root.Map.prototype['entries']) {
                exports.$$iterator = $$iterator = key;
                break;
            }
        }
    } else {
        exports.$$iterator = $$iterator = '@@iterator';
    }
}


},{"../util/root":95}],85:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.$$observable = undefined;
exports.getSymbolObservable = getSymbolObservable;

var _root = require('../util/root');

function getSymbolObservable(context) {
    var $$observable = void 0;
    var _Symbol = context.Symbol;
    if (typeof _Symbol === 'function') {
        if (_Symbol.observable) {
            $$observable = _Symbol.observable;
        } else {
            $$observable = _Symbol('observable');
            _Symbol.observable = $$observable;
        }
    } else {
        $$observable = '@@observable';
    }
    return $$observable;
}
var $$observable = exports.$$observable = getSymbolObservable(_root.root);


},{"../util/root":95}],86:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.$$rxSubscriber = undefined;

var _root = require('../util/root');

var _Symbol = _root.root.Symbol;
var $$rxSubscriber = exports.$$rxSubscriber = typeof _Symbol === 'function' && typeof _Symbol.for === 'function' ? _Symbol.for('rxSubscriber') : '@@rxSubscriber';


},{"../util/root":95}],87:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * An error thrown when an action is invalid because the object has been
 * unsubscribed.
 *
 * @see {@link Subject}
 * @see {@link BehaviorSubject}
 *
 * @class ObjectUnsubscribedError
 */
var ObjectUnsubscribedError = exports.ObjectUnsubscribedError = function (_Error) {
    _inherits(ObjectUnsubscribedError, _Error);

    function ObjectUnsubscribedError() {
        var _this;

        _classCallCheck(this, ObjectUnsubscribedError);

        var err = (_this = _possibleConstructorReturn(this, (ObjectUnsubscribedError.__proto__ || Object.getPrototypeOf(ObjectUnsubscribedError)).call(this, 'object unsubscribed')), _this);
        _this.name = err.name = 'ObjectUnsubscribedError';
        _this.stack = err.stack;
        _this.message = err.message;
        return _this;
    }

    return ObjectUnsubscribedError;
}(Error);


},{}],88:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * An error thrown when one or more errors have occurred during the
 * `unsubscribe` of a {@link Subscription}.
 */
var UnsubscriptionError = exports.UnsubscriptionError = function (_Error) {
    _inherits(UnsubscriptionError, _Error);

    function UnsubscriptionError(errors) {
        _classCallCheck(this, UnsubscriptionError);

        var _this = _possibleConstructorReturn(this, (UnsubscriptionError.__proto__ || Object.getPrototypeOf(UnsubscriptionError)).call(this));

        _this.errors = errors;
        var err = Error.call(_this, errors ? errors.length + ' errors occurred during unsubscription:\n  ' + errors.map(function (err, i) {
            return i + 1 + ') ' + err.toString();
        }).join('\n  ') : '');
        _this.name = err.name = 'UnsubscriptionError';
        _this.stack = err.stack;
        _this.message = err.message;
        return _this;
    }

    return UnsubscriptionError;
}(Error);


},{}],89:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// typeof any so that it we don't have to cast when comparing a result to the error object
var errorObject = exports.errorObject = { e: {} };


},{}],90:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var isArray = exports.isArray = Array.isArray || function (x) {
  return x && typeof x.length === 'number';
};


},{}],91:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isFunction = isFunction;
function isFunction(x) {
    return typeof x === 'function';
}


},{}],92:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.isObject = isObject;
function isObject(x) {
    return x != null && (typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'object';
}


},{}],93:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isPromise = isPromise;
function isPromise(value) {
    return value && typeof value.subscribe !== 'function' && typeof value.then === 'function';
}


},{}],94:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isScheduler = isScheduler;
function isScheduler(value) {
    return value && typeof value.schedule === 'function';
}


},{}],95:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var objectTypes = {
    'boolean': false,
    'function': true,
    'object': true,
    'number': false,
    'string': false,
    'undefined': false
};
var root = exports.root = objectTypes[typeof self === 'undefined' ? 'undefined' : _typeof(self)] && self || objectTypes[typeof window === 'undefined' ? 'undefined' : _typeof(window)] && window;
var freeGlobal = objectTypes[typeof global === 'undefined' ? 'undefined' : _typeof(global)] && global;
if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal)) {
    exports.root = root = freeGlobal;
}


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],96:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.subscribeToResult = subscribeToResult;

var _root = require('./root');

var _isArray = require('./isArray');

var _isPromise = require('./isPromise');

var _Observable = require('../Observable');

var _iterator = require('../symbol/iterator');

var _InnerSubscriber = require('../InnerSubscriber');

var _observable = require('../symbol/observable');

function subscribeToResult(outerSubscriber, result, outerValue, outerIndex) {
    var destination = new _InnerSubscriber.InnerSubscriber(outerSubscriber, outerValue, outerIndex);
    if (destination.closed) {
        return null;
    }
    if (result instanceof _Observable.Observable) {
        if (result._isScalar) {
            destination.next(result.value);
            destination.complete();
            return null;
        } else {
            return result.subscribe(destination);
        }
    }
    if ((0, _isArray.isArray)(result)) {
        for (var i = 0, len = result.length; i < len && !destination.closed; i++) {
            destination.next(result[i]);
        }
        if (!destination.closed) {
            destination.complete();
        }
    } else if ((0, _isPromise.isPromise)(result)) {
        result.then(function (value) {
            if (!destination.closed) {
                destination.next(value);
                destination.complete();
            }
        }, function (err) {
            return destination.error(err);
        }).then(null, function (err) {
            // Escaping the Promise trap: globally throw unhandled errors
            _root.root.setTimeout(function () {
                throw err;
            });
        });
        return destination;
    } else if (typeof result[_iterator.$$iterator] === 'function') {
        var iterator = result[_iterator.$$iterator]();
        do {
            var item = iterator.next();
            if (item.done) {
                destination.complete();
                break;
            }
            destination.next(item.value);
            if (destination.closed) {
                break;
            }
        } while (true);
    } else if (typeof result[_observable.$$observable] === 'function') {
        var obs = result[_observable.$$observable]();
        if (typeof obs.subscribe !== 'function') {
            destination.error(new Error('invalid observable'));
        } else {
            return obs.subscribe(new _InnerSubscriber.InnerSubscriber(outerSubscriber, outerValue, outerIndex));
        }
    } else {
        destination.error(new TypeError('unknown type returned'));
    }
    return null;
}


},{"../InnerSubscriber":44,"../Observable":45,"../symbol/iterator":84,"../symbol/observable":85,"./isArray":90,"./isPromise":93,"./root":95}],97:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.toSubscriber = toSubscriber;

var _Subscriber = require('../Subscriber');

var _rxSubscriber = require('../symbol/rxSubscriber');

function toSubscriber(nextOrObserver, error, complete) {
    if (nextOrObserver) {
        if (nextOrObserver instanceof _Subscriber.Subscriber) {
            return nextOrObserver;
        }
        if (nextOrObserver[_rxSubscriber.$$rxSubscriber]) {
            return nextOrObserver[_rxSubscriber.$$rxSubscriber]();
        }
    }
    if (!nextOrObserver && !error && !complete) {
        return new _Subscriber.Subscriber();
    }
    return new _Subscriber.Subscriber(nextOrObserver, error, complete);
}


},{"../Subscriber":50,"../symbol/rxSubscriber":86}],98:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.tryCatch = tryCatch;

var _errorObject = require('./errorObject');

var tryCatchTarget = void 0;
function tryCatcher() {
    try {
        return tryCatchTarget.apply(this, arguments);
    } catch (e) {
        _errorObject.errorObject.e = e;
        return _errorObject.errorObject;
    }
}
function tryCatch(fn) {
    tryCatchTarget = fn;
    return tryCatcher;
}
;


},{"./errorObject":89}],99:[function(require,module,exports){
(function (global){
"use strict";

/*! CSS rel=preload polyfill. Depends on loadCSS function. [c]2016 @scottjehl, Filament Group, Inc. Licensed MIT  */
(function (w) {
  // rel=preload support test
  if (!w.loadCSS) {
    return;
  }
  var rp = loadCSS.relpreload = {};
  rp.support = function () {
    try {
      return w.document.createElement("link").relList.supports("preload");
    } catch (e) {
      return false;
    }
  };

  // loop preload links and fetch using loadCSS
  rp.poly = function () {
    var links = w.document.getElementsByTagName("link");
    for (var i = 0; i < links.length; i++) {
      var link = links[i];
      if (link.rel === "preload" && link.getAttribute("as") === "style") {
        w.loadCSS(link.href, link);
        link.rel = null;
      }
    }
  };

  // if link[rel=preload] is not supported, we must fetch the CSS manually using loadCSS
  if (!rp.support()) {
    rp.poly();
    var run = w.setInterval(rp.poly, 300);
    if (w.addEventListener) {
      w.addEventListener("load", function () {
        w.clearInterval(run);
      });
    }
    if (w.attachEvent) {
      w.attachEvent("onload", function () {
        w.clearInterval(run);
      });
    }
  }
})(typeof global !== "undefined" ? global : undefined);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],100:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hasFeatures;

require('./modernizr');

function hasFeatures(features) {
  var acc = true;
  for (var i = 0; i < features.length; i++) {
    var feature = features[i];
    var hasFeature = Modernizr[feature];
    // if (!hasFeature) console.warn('Feature "' + feature + '" missing!');
    acc = acc && hasFeature;
  }
  return acc;
}

},{"./modernizr":101}],101:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*! modernizr 3.3.1 (Custom Build) | MIT *
 * https://modernizr.com/download/?-classlist-csspointerevents-cssremunit-csstransforms-eventlistener-htmlimports-matchmedia-opacity-queryselector-requestanimationframe-template-touchevents !*/
!function (e, t, n) {
  function r(e, t) {
    return (typeof e === "undefined" ? "undefined" : _typeof(e)) === t;
  }function o() {
    var e, t, n, o, i, s, a;for (var f in _) {
      if (_.hasOwnProperty(f)) {
        if (e = [], t = _[f], t.name && (e.push(t.name.toLowerCase()), t.options && t.options.aliases && t.options.aliases.length)) for (n = 0; n < t.options.aliases.length; n++) {
          e.push(t.options.aliases[n].toLowerCase());
        }for (o = r(t.fn, "function") ? t.fn() : t.fn, i = 0; i < e.length; i++) {
          s = e[i], a = s.split("."), 1 === a.length ? Modernizr[a[0]] = o : (!Modernizr[a[0]] || Modernizr[a[0]] instanceof Boolean || (Modernizr[a[0]] = new Boolean(Modernizr[a[0]])), Modernizr[a[0]][a[1]] = o), T.push((o ? "" : "no-") + a.join("-"));
        }
      }
    }
  }function i() {
    return "function" != typeof t.createElement ? t.createElement(arguments[0]) : b ? t.createElementNS.call(t, "http://www.w3.org/2000/svg", arguments[0]) : t.createElement.apply(t, arguments);
  }function s(e) {
    var t = x.className,
        n = Modernizr._config.classPrefix || "";if (b && (t = t.baseVal), Modernizr._config.enableJSClass) {
      var r = new RegExp("(^|\\s)" + n + "no-js(\\s|$)");t = t.replace(r, "$1" + n + "js$2");
    }Modernizr._config.enableClasses && (t += " " + n + e.join(" " + n), b ? x.className.baseVal = t : x.className = t);
  }function a(e, t) {
    if ("object" == (typeof e === "undefined" ? "undefined" : _typeof(e))) for (var n in e) {
      S(e, n) && a(n, e[n]);
    } else {
      e = e.toLowerCase();var r = e.split("."),
          o = Modernizr[r[0]];if (2 == r.length && (o = o[r[1]]), "undefined" != typeof o) return Modernizr;t = "function" == typeof t ? t() : t, 1 == r.length ? Modernizr[r[0]] = t : (!Modernizr[r[0]] || Modernizr[r[0]] instanceof Boolean || (Modernizr[r[0]] = new Boolean(Modernizr[r[0]])), Modernizr[r[0]][r[1]] = t), s([(t && 0 != t ? "" : "no-") + r.join("-")]), Modernizr._trigger(e, t);
    }return Modernizr;
  }function f(e) {
    return e.replace(/([a-z])-([a-z])/g, function (e, t, n) {
      return t + n.toUpperCase();
    }).replace(/^-/, "");
  }function u() {
    var e = t.body;return e || (e = i(b ? "svg" : "body"), e.fake = !0), e;
  }function l(e, n, r, o) {
    var s,
        a,
        f,
        l,
        c = "modernizr",
        d = i("div"),
        p = u();if (parseInt(r, 10)) for (; r--;) {
      f = i("div"), f.id = o ? o[r] : c + (r + 1), d.appendChild(f);
    }return s = i("style"), s.type = "text/css", s.id = "s" + c, (p.fake ? p : d).appendChild(s), p.appendChild(d), s.styleSheet ? s.styleSheet.cssText = e : s.appendChild(t.createTextNode(e)), d.id = c, p.fake && (p.style.background = "", p.style.overflow = "hidden", l = x.style.overflow, x.style.overflow = "hidden", x.appendChild(p)), a = n(d, e), p.fake ? (p.parentNode.removeChild(p), x.style.overflow = l, x.offsetHeight) : d.parentNode.removeChild(d), !!a;
  }function c(e, t) {
    return !!~("" + e).indexOf(t);
  }function d(e, t) {
    return function () {
      return e.apply(t, arguments);
    };
  }function p(e, t, n) {
    var o;for (var i in e) {
      if (e[i] in t) return n === !1 ? e[i] : (o = t[e[i]], r(o, "function") ? d(o, n || t) : o);
    }return !1;
  }function m(e) {
    return e.replace(/([A-Z])/g, function (e, t) {
      return "-" + t.toLowerCase();
    }).replace(/^ms-/, "-ms-");
  }function v(t, r) {
    var o = t.length;if ("CSS" in e && "supports" in e.CSS) {
      for (; o--;) {
        if (e.CSS.supports(m(t[o]), r)) return !0;
      }return !1;
    }if ("CSSSupportsRule" in e) {
      for (var i = []; o--;) {
        i.push("(" + m(t[o]) + ":" + r + ")");
      }return i = i.join(" or "), l("@supports (" + i + ") { #modernizr { position: absolute; } }", function (e) {
        return "absolute" == getComputedStyle(e, null).position;
      });
    }return n;
  }function h(e, t, o, s) {
    function a() {
      l && (delete L.style, delete L.modElem);
    }if (s = r(s, "undefined") ? !1 : s, !r(o, "undefined")) {
      var u = v(e, o);if (!r(u, "undefined")) return u;
    }for (var l, d, p, m, h, y = ["modernizr", "tspan", "samp"]; !L.style && y.length;) {
      l = !0, L.modElem = i(y.shift()), L.style = L.modElem.style;
    }for (p = e.length, d = 0; p > d; d++) {
      if (m = e[d], h = L.style[m], c(m, "-") && (m = f(m)), L.style[m] !== n) {
        if (s || r(o, "undefined")) return a(), "pfx" == t ? m : !0;try {
          L.style[m] = o;
        } catch (g) {}if (L.style[m] != h) return a(), "pfx" == t ? m : !0;
      }
    }return a(), !1;
  }function y(e, t, n, o, i) {
    var s = e.charAt(0).toUpperCase() + e.slice(1),
        a = (e + " " + P.join(s + " ") + s).split(" ");return r(t, "string") || r(t, "undefined") ? h(a, t, o, i) : (a = (e + " " + q.join(s + " ") + s).split(" "), p(a, t, n));
  }function g(e, t, r) {
    return y(e, n, n, t, r);
  }var _ = [],
      C = { _version: "3.3.1", _config: { classPrefix: "", enableClasses: !0, enableJSClass: !0, usePrefixes: !0 }, _q: [], on: function on(e, t) {
      var n = this;setTimeout(function () {
        t(n[e]);
      }, 0);
    }, addTest: function addTest(e, t, n) {
      _.push({ name: e, fn: t, options: n });
    }, addAsyncTest: function addAsyncTest(e) {
      _.push({ name: null, fn: e });
    } },
      Modernizr = function Modernizr() {};Modernizr.prototype = C, Modernizr = new Modernizr(), Modernizr.addTest("eventlistener", "addEventListener" in e), Modernizr.addTest("queryselector", "querySelector" in t && "querySelectorAll" in t);var T = [],
      w = C._config.usePrefixes ? " -webkit- -moz- -o- -ms- ".split(" ") : ["", ""];C._prefixes = w;var x = t.documentElement;Modernizr.addTest("classlist", "classList" in x);var S;!function () {
    var e = {}.hasOwnProperty;S = r(e, "undefined") || r(e.call, "undefined") ? function (e, t) {
      return t in e && r(e.constructor.prototype[t], "undefined");
    } : function (t, n) {
      return e.call(t, n);
    };
  }();var b = "svg" === x.nodeName.toLowerCase();Modernizr.addTest("opacity", function () {
    var e = i("a").style;return e.cssText = w.join("opacity:.55;"), /^0.55$/.test(e.opacity);
  }), Modernizr.addTest("csspointerevents", function () {
    var e = i("a").style;return e.cssText = "pointer-events:auto", "auto" === e.pointerEvents;
  }), Modernizr.addTest("cssremunit", function () {
    var e = i("a").style;try {
      e.fontSize = "3rem";
    } catch (t) {}return (/rem/.test(e.fontSize)
    );
  }), Modernizr.addTest("template", "content" in i("template")), C._l = {}, C.on = function (e, t) {
    this._l[e] || (this._l[e] = []), this._l[e].push(t), Modernizr.hasOwnProperty(e) && setTimeout(function () {
      Modernizr._trigger(e, Modernizr[e]);
    }, 0);
  }, C._trigger = function (e, t) {
    if (this._l[e]) {
      var n = this._l[e];setTimeout(function () {
        var e, r;for (e = 0; e < n.length; e++) {
          (r = n[e])(t);
        }
      }, 0), delete this._l[e];
    }
  }, Modernizr._q.push(function () {
    C.addTest = a;
  }), a("htmlimports", "import" in i("link"));var z = C.testStyles = l;Modernizr.addTest("touchevents", function () {
    var n;if ("ontouchstart" in e || e.DocumentTouch && t instanceof DocumentTouch) n = !0;else {
      var r = ["@media (", w.join("touch-enabled),("), "heartz", ")", "{#modernizr{top:9px;position:absolute}}"].join("");z(r, function (e) {
        n = 9 === e.offsetTop;
      });
    }return n;
  });var E = "Moz O ms Webkit",
      P = C._config.usePrefixes ? E.split(" ") : [];C._cssomPrefixes = P;var j = function j(t) {
    var r,
        o = w.length,
        i = e.CSSRule;if ("undefined" == typeof i) return n;if (!t) return !1;if (t = t.replace(/^@/, ""), r = t.replace(/-/g, "_").toUpperCase() + "_RULE", r in i) return "@" + t;for (var s = 0; o > s; s++) {
      var a = w[s],
          f = a.toUpperCase() + "_" + r;if (f in i) return "@-" + a.toLowerCase() + "-" + t;
    }return !1;
  };C.atRule = j;var q = C._config.usePrefixes ? E.toLowerCase().split(" ") : [];C._domPrefixes = q;var A = { elem: i("modernizr") };Modernizr._q.push(function () {
    delete A.elem;
  });var L = { style: A.elem.style };Modernizr._q.unshift(function () {
    delete L.style;
  }), C.testAllProps = y;var N = C.prefixed = function (e, t, n) {
    return 0 === e.indexOf("@") ? j(e) : (-1 != e.indexOf("-") && (e = f(e)), t ? y(e, t, n) : y(e, "pfx"));
  };Modernizr.addTest("requestanimationframe", !!N("requestAnimationFrame", e), { aliases: ["raf"] }), Modernizr.addTest("matchmedia", !!N("matchMedia", e)), C.testAllProps = g, Modernizr.addTest("csstransforms", function () {
    return -1 === navigator.userAgent.indexOf("Android 2.") && g("transform", "scale(1)", !0);
  }), o(), delete C.addTest, delete C.addAsyncTest;for (var O = 0; O < Modernizr._q.length; O++) {
    Modernizr._q[O]();
  }e.Modernizr = Modernizr;
}(window, document);

},{}],102:[function(require,module,exports){
'use strict';

require('core-js/fn/object/assign');

require('core-js/fn/object/define-property');

require('core-js/fn/object/keys');

var _loadCSS = require('fg-loadcss/src/loadCSS');

var _hasFeatures = require('../lib/has-features');

var _hasFeatures2 = _interopRequireDefault(_hasFeatures);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MEDIA_QUERY = '(min-width: 48em)';

function hasShadowDOMV0() {
  return 'createShadowRoot' in document.body;
}

function hasShadowDOMV1() {
  return 'attachShadow' in document.body;
}

function hasShadowDOM() {
  return hasShadowDOMV0() || hasShadowDOMV1();
}

function hasCustomElementsV0() {
  return 'registerElement' in document;
}

function hasCustomElementsV1() {
  return 'customElements' in window;
}

function hasCustomElements() {
  return hasCustomElementsV0() || hasCustomElementsV1();
}

function importCustomElement() {
  var link = document.createElement('link');
  link.rel = 'import';
  link.href = 'https://unpkg.com/y-drawer@2.0.6/dist/webcomponent/y-drawer.html';

  var ref = document.getElementsByTagName('link')[0];
  ref.parentNode.insertBefore(link, ref);
}

if ((0, _hasFeatures2.default)(['eventlistener', 'queryselector', 'matchmedia', 'requestanimationframe', 'classlist', 'opacity', 'csstransforms', 'csspointerevents', 'cssremunit'])) {
  window.drawer = document.querySelector('y-drawer');
  window.isDesktop = window.matchMedia(MEDIA_QUERY).matches;

  if (hasShadowDOM()) {
    if (window.isDesktop) window.drawer.setAttribute('opened', '');
    if (window.isDesktop) window.drawer.setAttribute('persistent', '');

    if ((0, _hasFeatures2.default)(['template', 'htmlimports']) && hasCustomElements()) {
      importCustomElement();
    } else {
      loadJSDeferred('https://unpkg.com/webcomponents.js@0.7.22/webcomponents-lite.min.js');
      window.addEventListener('WebComponentsReady', importCustomElement);
    }
  } else {
    var ref = document.getElementsByTagName('style')[0];
    (0, _loadCSS.loadCSS)('https://unpkg.com/y-drawer@2.0.6/dist/drawer.css', ref);
    loadJSDeferred('https://unpkg.com/y-drawer@2.0.6/dist/vanilla/index.js', function () {
      /* global y */
      var YDrawer = y.drawer.vanilla.default;

      window.drawer = new YDrawer(window.drawer, {
        opened: window.isDesktop,
        persistent: window.isDesktop
      });
    });
  }

  window.addEventListener('resize', function () {
    var hasChanged = window.isDesktop !== window.matchMedia(MEDIA_QUERY).matches;
    if (window.drawer && hasChanged) {
      window.isDesktop = !window.isDesktop;
      window.drawer.persistent = window.isDesktop;
      window.drawer.jumpTo(window.isDesktop);
    }
  });

  document.getElementById('_menu').addEventListener('click', function (e) {
    if (window.drawer && !window.isDesktop) {
      e.preventDefault();
      window.drawer.toggle();
    }
  });
}

},{"../lib/has-features":100,"core-js/fn/object/assign":1,"core-js/fn/object/define-property":2,"core-js/fn/object/keys":3,"fg-loadcss/src/loadCSS":43}],103:[function(require,module,exports){
(function (global){
'use strict';

var _loadCSS = require('fg-loadcss/src/loadCSS');

require('./katex');

require('./drawer');

require('./smooth-state');

global.loadCSS = _loadCSS.loadCSS;
require('../lib/cssrelpreload');

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../lib/cssrelpreload":99,"./drawer":102,"./katex":104,"./smooth-state":107,"fg-loadcss/src/loadCSS":43}],104:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = asdf;

var _loadCSS = require('fg-loadcss/src/loadCSS');

var _hasFeatures = require('../lib/has-features');

var _hasFeatures2 = _interopRequireDefault(_hasFeatures);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-globals katex
function asdf() {
  /* global katex */
  if (!window.katex) return;

  var mathBlocks = document.querySelectorAll('script[type^="math/tex"]');

  // kramdown generates script tags with type "math/tex"
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = mathBlocks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var element = _step.value;

      var el = element;

      var tex = el.textContent.replace('% <![CDATA[', '').replace('%]]>', '');

      // replace the script tag with KaTeX
      try {
        var preview = el.previousElementSibling;

        el.outerHTML = katex.renderToString(tex, {
          displayMode: el.type === 'math/tex; mode=display'
        });

        // hide the preview only when successful
        preview.style.display = 'none';
        preview.style.visibility = 'hidden';
      } catch (e) {
        console.error(e); // eslint-disable-line no-console
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}

// KaTeX support
if ((0, _hasFeatures2.default)(['queryselector', 'classlist'])) {
  // enable math blocks using KaTeX
  (0, _loadCSS.loadCSS)('https://unpkg.com/katex@0.6.0/dist/katex.min.css');
  loadJSDeferred('https://unpkg.com/katex@0.6.0/dist/katex.min.js', asdf);
}

},{"../lib/has-features":100,"fg-loadcss/src/loadCSS":43}],105:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable class-methods-use-this */

var _Observable = require('rxjs-es/Observable');

var _Subject = require('rxjs-es/Subject');

require('rxjs-es/add/observable/empty');

require('rxjs-es/add/observable/fromEvent');

require('rxjs-es/add/observable/merge');

require('rxjs-es/add/observable/of');

require('rxjs-es/add/observable/dom/ajax');

require('rxjs-es/add/operator/catch');

require('rxjs-es/add/operator/do');

require('rxjs-es/add/operator/filter');

require('rxjs-es/add/operator/map');

require('rxjs-es/add/operator/mergeAll');

require('rxjs-es/add/operator/retry');

require('rxjs-es/add/operator/switch');

require('rxjs-es/add/operator/switchMap');

var _smoothStateUtil = require('./smooth-state-util');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// window.Observable = Observable;

var LINK_SELECTOR = 'a[href]'; // 'a[href^="/"]';
var CONTENT_SELECTOR = 'main';
var LOADING_CLASS = 'is-loading';

// requirements
// object.assign, queryslector, el.match

var SmoothState = function () {
  _createClass(SmoothState, null, [{
    key: 'fragmentFromString',
    value: function fragmentFromString(strHTML) {
      return document.createRange().createContextualFragment(strHTML);
    }
  }]);

  function SmoothState(el, options) {
    var _this = this;

    _classCallCheck(this, SmoothState);

    this.options = Object.assign({
      contentSelector: CONTENT_SELECTOR,
      linkSelector: LINK_SELECTOR,
      loadingClass: LOADING_CLASS
    }, options);

    // TODO: improve API
    if (el.querySelector(this.options.contentSelector) == null) {
      throw Error('el needs to contain content');
    }
    this.el = el;

    this.bindCallbacks();

    // cache title element
    this.titleElement = document.querySelector('title') || {};

    var click$$ = new _Subject.Subject();

    var pushstate$ = click$$.switch().map(function (href) {
      return {
        push: true,
        href: href
      };
    });

    var popstate$ = _Observable.Observable.fromEvent(window, 'popstate').filter(function (_ref) {
      var state = _ref.state;
      return state != null;
    }).map(function () {
      return {
        push: false,
        href: window.location.href
      };
    });

    _Observable.Observable.merge(pushstate$, popstate$).do(this.onBefore).map(this.hrefToRquestData).switchMap(this.makeRequest).map(this.ajaxResponseToContent).subscribe(function (hairball) {
      _this.updateDOM(hairball);
      click$$.next(_this.bindEvents());
      _this.onAfter();
    });

    // let's get the party started
    click$$.next(this.bindEvents());
  }

  _createClass(SmoothState, [{
    key: 'bindCallbacks',
    value: function bindCallbacks() {
      this.beNice = this.beNice.bind(this);
      this.hrefToRquestData = this.hrefToRquestData.bind(this);
      this.makeRequest = this.makeRequest.bind(this);
      this.ajaxResponseToContent = this.ajaxResponseToContent.bind(this);
      this.updateDOM = this.updateDOM.bind(this);
      this.onBefore = this.onBefore.bind(this);
      this.onAfter = this.onAfter.bind(this);
    }
  }, {
    key: 'onBefore',
    value: function onBefore() {
      document.body.classList.add(this.options.loadingClass);
      this.el.dispatchEvent(new Event('beforesmoothstate'));
    }
  }, {
    key: 'onAfter',
    value: function onAfter() {
      document.body.classList.remove(this.options.loadingClass);
      this.el.dispatchEvent(new Event('aftermoothstate'));
    }
  }, {
    key: 'onError',
    value: function onError() {
      document.body.classList.remove(this.options.loadingClass);
      // if (this.options.onError) this.options.onError(e);
    }
  }, {
    key: 'beNice',
    value: function beNice(e) {
      return !e.metaKey && !e.ctrlKey && (0, _smoothStateUtil.shouldLoadAnchor)(e.currentTarget, this.options.blacklist, this.options.hrefRegex);
    }
  }, {
    key: 'bindEvents',
    value: function bindEvents() {
      var d = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;

      return _Observable.Observable.of(d.querySelectorAll(this.options.linkSelector)).map(function (link) {
        return _Observable.Observable.fromEvent(link, 'click');
      }).mergeAll().filter(this.beNice).do(function (e) {
        return e.preventDefault();
      }).map(function (e) {
        return e.currentTarget.href;
      });
    }
  }, {
    key: 'hrefToRquestData',
    value: function hrefToRquestData(hairball) {
      return Object.assign(hairball, {
        requestData: {
          method: 'GET',
          url: hairball.href,
          responseType: 'text'
        }
      });
    }
  }, {
    key: 'makeRequest',
    value: function makeRequest(hairball) {
      var _this2 = this;

      return _Observable.Observable.ajax(hairball.requestData).retry(3).map(function (ajaxResponse) {
        return Object.assign(hairball, { ajaxResponse: ajaxResponse });
      }).catch(function (e) {
        _this2.onError(e);
        return _Observable.Observable.empty();
      });
    }
  }, {
    key: 'ajaxResponseToContent',
    value: function ajaxResponseToContent(hairball) {
      var documentFragment = SmoothState.fragmentFromString(hairball.ajaxResponse.response);
      var title = (documentFragment.querySelector('title') || {}).textContent;
      var url = hairball.ajaxResponse.request.url;

      // TODO: abort if content_selector not present
      var content = documentFragment.querySelectorAll(this.options.contentSelector);

      return Object.assign(hairball, { title: title, url: url, content: content });
    }
  }, {
    key: 'updateDOM',
    value: function updateDOM(_ref2) {
      var title = _ref2.title;
      var content = _ref2.content;
      var url = _ref2.url;
      var push = _ref2.push;

      // replace content
      var oldContent = this.el.querySelectorAll(this.options.contentSelector);

      if (content.length === oldContent.length) {
        // TODO: warn
      }

      Array.from(oldContent).forEach(function (oldElement, i) {
        oldElement.parentNode.replaceChild(content[i], oldElement);
      });

      // update title separately
      // TODO: update meta description?
      this.titleElement.textContent = title;

      // push new frame to history if not a popstate
      if (push) {
        window.history.pushState({}, title, url);
        window.scrollTo(window.pageXOffset, 0);
      }
    }
  }]);

  return SmoothState;
}();

exports.default = SmoothState;

},{"./smooth-state-util":106,"rxjs-es/Observable":45,"rxjs-es/Subject":48,"rxjs-es/add/observable/dom/ajax":52,"rxjs-es/add/observable/empty":53,"rxjs-es/add/observable/fromEvent":54,"rxjs-es/add/observable/merge":55,"rxjs-es/add/observable/of":56,"rxjs-es/add/operator/catch":57,"rxjs-es/add/operator/do":58,"rxjs-es/add/operator/filter":59,"rxjs-es/add/operator/map":60,"rxjs-es/add/operator/mergeAll":61,"rxjs-es/add/operator/retry":62,"rxjs-es/add/operator/switch":63,"rxjs-es/add/operator/switchMap":64}],106:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isExternal = isExternal;
exports.stripHash = stripHash;
exports.isHash = isHash;
exports.shouldLoadAnchor = shouldLoadAnchor;
/**
 * Checks to see if the url is external
 *
 * @param   {string}    url - url being evaluated
 * @see     http://stackoverflow.com/questions/6238351/fastest-way-to-detect-external-urls
 */
function isExternal(url) {
  var match = url.match(/^([^:\/?#]+:)?(?:\/\/([^\/?#]*))?([^?#]+)?(\?[^#]*)?(#.*)?/);

  if (typeof match[1] === 'string' && match[1].length > 0 && match[1].toLowerCase() !== window.location.protocol) {
    return true;
  }

  var port = { http: 80, https: 443 }[window.location.protocol];

  if (typeof match[2] === 'string' && match[2].length > 0 && match[2].replace(new RegExp(':(' + port + ')?$'), '') !== window.location.host) {
    return true;
  }

  return false;
}

/**
 * Strips the hash from a url and returns the new href
 *
 * @param   {string}    href - url being evaluated
 */
function stripHash(href) {
  return href.replace(/#.*/, '');
}

/**
 * Checks to see if the url is an internal hash
 *
 * @param   {string}    href - url being evaluated
 * @param   {string}    prev - previous url (optional)
 */
function isHash(href, prev) {
  var p = prev || window.location.href;

  var hasHash = href.indexOf('#') > -1;
  var samePath = stripHash(href) === stripHash(p);

  return hasHash && samePath;
}

/**
 * Checks to see if we should be loading this URL
 *
 * @param   {string}    url - url being evaluated
 * @param   {string}    blacklist - jquery selector
 */
function shouldLoadAnchor(anchor, blacklist, hrefRegex) {
  var href = anchor.href;
  // URL will only be loaded if it's not an external link, hash, or
  // blacklisted
  return !isExternal(href) && !isHash(href) && !anchor.matches(blacklist) && anchor.target === '' && (typeof hrefRegex === 'undefined' || hrefRegex === '' || href.search(hrefRegex) !== -1);
}

},{}],107:[function(require,module,exports){
'use strict';

var _smoothStateLib = require('./smooth-state-lib');

var _smoothStateLib2 = _interopRequireDefault(_smoothStateLib);

var _katex = require('./katex');

var _katex2 = _interopRequireDefault(_katex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var smoothState = document.querySelector('#_smooth-state');

window.smoothState = new _smoothStateLib2.default(smoothState, {
  // replaceIds: ['_main', '_asidebar'],
  contentSelector: 'main, header > div'
});

smoothState.addEventListener('beforesmoothstate', function () {
  if (!window.isDesktop && window.drawer.opened) {
    window.drawer.close();
  }
});

smoothState.addEventListener('aftersmoothstate', function () {
  // send google analytics pageview
  if (window.ga) window.ga('send', 'pageview');

  // upgrade math blocks
  (0, _katex2.default)();
});

},{"./katex":104,"./smooth-state-lib":105}]},{},[103])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9mbi9vYmplY3QvYXNzaWduLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2ZuL29iamVjdC9rZXlzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fYS1mdW5jdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2FuLW9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2FycmF5LWluY2x1ZGVzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fY29mLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fY29yZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2N0eC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2RlZmluZWQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19kZXNjcmlwdG9ycy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2RvbS1jcmVhdGUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19lbnVtLWJ1Zy1rZXlzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fZXhwb3J0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fZmFpbHMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19nbG9iYWwuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19oYXMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19oaWRlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faWU4LWRvbS1kZWZpbmUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faXMtb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWFzc2lnbi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1kcC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1nb3BzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWtleXMtaW50ZXJuYWwuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19vYmplY3Qta2V5cy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1waWUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19vYmplY3Qtc2FwLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fcHJvcGVydHktZGVzYy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3JlZGVmaW5lLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fc2hhcmVkLWtleS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3NoYXJlZC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3RvLWluZGV4LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fdG8taW50ZWdlci5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3RvLWlvYmplY3QuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL190by1sZW5ndGguanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL190by1vYmplY3QuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL190by1wcmltaXRpdmUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL191aWQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYub2JqZWN0LmRlZmluZS1wcm9wZXJ0eS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm9iamVjdC5rZXlzLmpzIiwibm9kZV9tb2R1bGVzL2ZnLWxvYWRjc3Mvc3JjL2xvYWRDU1MuanMiLCJub2RlX21vZHVsZXMvcnhqcy1lcy9Jbm5lclN1YnNjcmliZXIuanMiLCJub2RlX21vZHVsZXMvcnhqcy1lcy9PYnNlcnZhYmxlLmpzIiwibm9kZV9tb2R1bGVzL3J4anMtZXMvT2JzZXJ2ZXIuanMiLCJub2RlX21vZHVsZXMvcnhqcy1lcy9PdXRlclN1YnNjcmliZXIuanMiLCJub2RlX21vZHVsZXMvcnhqcy1lcy9TdWJqZWN0LmpzIiwibm9kZV9tb2R1bGVzL3J4anMtZXMvU3ViamVjdFN1YnNjcmlwdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzLWVzL1N1YnNjcmliZXIuanMiLCJub2RlX21vZHVsZXMvcnhqcy1lcy9TdWJzY3JpcHRpb24uanMiLCJub2RlX21vZHVsZXMvcnhqcy1lcy9hZGQvb2JzZXJ2YWJsZS9kb20vYWpheC5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzLWVzL2FkZC9vYnNlcnZhYmxlL2VtcHR5LmpzIiwibm9kZV9tb2R1bGVzL3J4anMtZXMvYWRkL29ic2VydmFibGUvZnJvbUV2ZW50LmpzIiwibm9kZV9tb2R1bGVzL3J4anMtZXMvYWRkL29ic2VydmFibGUvbWVyZ2UuanMiLCJub2RlX21vZHVsZXMvcnhqcy1lcy9hZGQvb2JzZXJ2YWJsZS9vZi5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzLWVzL2FkZC9vcGVyYXRvci9jYXRjaC5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzLWVzL2FkZC9vcGVyYXRvci9kby5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzLWVzL2FkZC9vcGVyYXRvci9maWx0ZXIuanMiLCJub2RlX21vZHVsZXMvcnhqcy1lcy9hZGQvb3BlcmF0b3IvbWFwLmpzIiwibm9kZV9tb2R1bGVzL3J4anMtZXMvYWRkL29wZXJhdG9yL21lcmdlQWxsLmpzIiwibm9kZV9tb2R1bGVzL3J4anMtZXMvYWRkL29wZXJhdG9yL3JldHJ5LmpzIiwibm9kZV9tb2R1bGVzL3J4anMtZXMvYWRkL29wZXJhdG9yL3N3aXRjaC5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzLWVzL2FkZC9vcGVyYXRvci9zd2l0Y2hNYXAuanMiLCJub2RlX21vZHVsZXMvcnhqcy1lcy9vYnNlcnZhYmxlL0FycmF5T2JzZXJ2YWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzLWVzL29ic2VydmFibGUvRW1wdHlPYnNlcnZhYmxlLmpzIiwibm9kZV9tb2R1bGVzL3J4anMtZXMvb2JzZXJ2YWJsZS9Gcm9tRXZlbnRPYnNlcnZhYmxlLmpzIiwibm9kZV9tb2R1bGVzL3J4anMtZXMvb2JzZXJ2YWJsZS9TY2FsYXJPYnNlcnZhYmxlLmpzIiwibm9kZV9tb2R1bGVzL3J4anMtZXMvb2JzZXJ2YWJsZS9kb20vQWpheE9ic2VydmFibGUuanMiLCJub2RlX21vZHVsZXMvcnhqcy1lcy9vYnNlcnZhYmxlL2RvbS9hamF4LmpzIiwibm9kZV9tb2R1bGVzL3J4anMtZXMvb2JzZXJ2YWJsZS9lbXB0eS5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzLWVzL29ic2VydmFibGUvZnJvbUV2ZW50LmpzIiwibm9kZV9tb2R1bGVzL3J4anMtZXMvb2JzZXJ2YWJsZS9tZXJnZS5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzLWVzL29ic2VydmFibGUvb2YuanMiLCJub2RlX21vZHVsZXMvcnhqcy1lcy9vcGVyYXRvci9jYXRjaC5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzLWVzL29wZXJhdG9yL2RvLmpzIiwibm9kZV9tb2R1bGVzL3J4anMtZXMvb3BlcmF0b3IvZmlsdGVyLmpzIiwibm9kZV9tb2R1bGVzL3J4anMtZXMvb3BlcmF0b3IvbWFwLmpzIiwibm9kZV9tb2R1bGVzL3J4anMtZXMvb3BlcmF0b3IvbWVyZ2UuanMiLCJub2RlX21vZHVsZXMvcnhqcy1lcy9vcGVyYXRvci9tZXJnZUFsbC5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzLWVzL29wZXJhdG9yL3JldHJ5LmpzIiwibm9kZV9tb2R1bGVzL3J4anMtZXMvb3BlcmF0b3Ivc3dpdGNoLmpzIiwibm9kZV9tb2R1bGVzL3J4anMtZXMvb3BlcmF0b3Ivc3dpdGNoTWFwLmpzIiwibm9kZV9tb2R1bGVzL3J4anMtZXMvc3ltYm9sL2l0ZXJhdG9yLmpzIiwibm9kZV9tb2R1bGVzL3J4anMtZXMvc3ltYm9sL29ic2VydmFibGUuanMiLCJub2RlX21vZHVsZXMvcnhqcy1lcy9zeW1ib2wvcnhTdWJzY3JpYmVyLmpzIiwibm9kZV9tb2R1bGVzL3J4anMtZXMvdXRpbC9PYmplY3RVbnN1YnNjcmliZWRFcnJvci5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzLWVzL3V0aWwvVW5zdWJzY3JpcHRpb25FcnJvci5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzLWVzL3V0aWwvZXJyb3JPYmplY3QuanMiLCJub2RlX21vZHVsZXMvcnhqcy1lcy91dGlsL2lzQXJyYXkuanMiLCJub2RlX21vZHVsZXMvcnhqcy1lcy91dGlsL2lzRnVuY3Rpb24uanMiLCJub2RlX21vZHVsZXMvcnhqcy1lcy91dGlsL2lzT2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL3J4anMtZXMvdXRpbC9pc1Byb21pc2UuanMiLCJub2RlX21vZHVsZXMvcnhqcy1lcy91dGlsL2lzU2NoZWR1bGVyLmpzIiwibm9kZV9tb2R1bGVzL3J4anMtZXMvdXRpbC9yb290LmpzIiwibm9kZV9tb2R1bGVzL3J4anMtZXMvdXRpbC9zdWJzY3JpYmVUb1Jlc3VsdC5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzLWVzL3V0aWwvdG9TdWJzY3JpYmVyLmpzIiwibm9kZV9tb2R1bGVzL3J4anMtZXMvdXRpbC90cnlDYXRjaC5qcyIsInB1YmxpYy9qcy9saWIvY3NzcmVscHJlbG9hZC5qcyIsInB1YmxpYy9qcy9saWIvaGFzLWZlYXR1cmVzLmpzIiwicHVibGljL2pzL2xpYi9tb2Rlcm5penIuanMiLCJwdWJsaWMvanMvc3JjL2RyYXdlci5qcyIsInB1YmxpYy9qcy9zcmMvaW5kZXguanMiLCJwdWJsaWMvanMvc3JjL2thdGV4LmpzIiwicHVibGljL2pzL3NyYy9zbW9vdGgtc3RhdGUtbGliLmpzIiwicHVibGljL2pzL3NyYy9zbW9vdGgtc3RhdGUtdXRpbC5qcyIsInB1YmxpYy9qcy9zcmMvc21vb3RoLXN0YXRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDL0VBOzs7Ozs7OztBQUNBOzs7OztJQUthLGUsV0FBQSxlOzs7QUFDVCw2QkFBWSxNQUFaLEVBQW9CLFVBQXBCLEVBQWdDLFVBQWhDLEVBQTRDO0FBQUE7O0FBQUE7O0FBRXhDLGNBQUssTUFBTCxHQUFjLE1BQWQ7QUFDQSxjQUFLLFVBQUwsR0FBa0IsVUFBbEI7QUFDQSxjQUFLLFVBQUwsR0FBa0Is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QXJDOztBQUVBLFNBQVEsV0FBVyxRQUFuQjtBQUNEOztBQUVEOzs7Ozs7QUFNTyxTQUFTLGdCQUFULENBQTBCLE1BQTFCLEVBQWtDLFNBQWxDLEVBQTZDLFNBQTdDLEVBQXdEO0FBQzdELE1BQU0sT0FBTyxPQUFPLElBQXBCO0FBQ0E7QUFDQTtBQUNBLFNBQ0UsQ0FBQyxXQUFXLElBQVgsQ0FBRCxJQUNBLENBQUMsT0FBTyxJQUFQLENBREQsSUFFQSxDQUFDLE9BQU8sT0FBUCxDQUFlLFNBQWYsQ0FGRCxJQUdBLE9BQU8sTUFBUCxLQUFrQixFQUhsQixLQUlFLE9BQU8sU0FBUCxLQUFxQixXQUFyQixJQUNBLGNBQWMsRUFEZCxJQUVBLEtBQUssTUFBTCxDQUFZLFNBQVosTUFBMkIsQ0FBQyxDQU45QixDQURGO0FBVUQ7Ozs7O0FDdkVEOzs7O0FBRUE7Ozs7OztBQUVBLElBQU0sY0FBYyxTQUFTLGFBQVQsQ0FBdUIsZ0JBQXZCLENBQXBCOztBQUVBLE9BQU8sV0FBUCxHQUFxQiw2QkFBZ0IsV0FBaEIsRUFBNkI7QUFDaEQ7QUFDQSxtQkFBaUI7QUFGK0IsQ0FBN0IsQ0FBckI7O0FBS0EsWUFBWSxnQkFBWixDQUE2QixtQkFBN0IsRUFBa0QsWUFBTTtBQUN0RCxNQUFJLENBQUMsT0FBTyxTQUFSLElBQXFCLE9BQU8sTUFBUCxDQUFjLE1BQXZDLEVBQStDO0FBQzdDLFdBQU8sTUFBUCxDQUFjLEtBQWQ7QUFDRDtBQUNGLENBSkQ7O0FBTUEsWUFBWSxnQkFBWixDQUE2QixrQkFBN0IsRUFBaUQsWUFBTTtBQUNwRDtBQUNELE1BQUksT0FBTyxFQUFYLEVBQWUsT0FBTyxFQUFQLENBQVUsTUFBVixFQUFrQixVQUFsQjs7QUFFZjtBQUNBO0FBQ0QsQ0FORCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3QuYXNzaWduOyIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydHknKTtcbnZhciAkT2JqZWN0ID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdDtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgZGVzYyl7XG4gIHJldHVybiAkT2JqZWN0LmRlZmluZVByb3BlcnR5KGl0LCBrZXksIGRlc2MpO1xufTsiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3Qua2V5cycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0LmtleXM7IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKHR5cGVvZiBpdCAhPSAnZnVuY3Rpb24nKXRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGEgZnVuY3Rpb24hJyk7XG4gIHJldHVybiBpdDtcbn07IiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoIWlzT2JqZWN0KGl0KSl0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhbiBvYmplY3QhJyk7XG4gIHJldHVybiBpdDtcbn07IiwiLy8gZmFsc2UgLT4gQXJyYXkjaW5kZXhPZlxuLy8gdHJ1ZSAgLT4gQXJyYXkjaW5jbHVkZXNcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0JylcbiAgLCB0b0xlbmd0aCAgPSByZXF1aXJlKCcuL190by1sZW5ndGgnKVxuICAsIHRvSW5kZXggICA9IHJlcXVpcmUoJy4vX3RvLWluZGV4Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKElTX0lOQ0xVREVTKXtcbiAgcmV0dXJuIGZ1bmN0aW9uKCR0aGlzLCBlbCwgZnJvbUluZGV4KXtcbiAgICB2YXIgTyAgICAgID0gdG9JT2JqZWN0KCR0aGlzKVxuICAgICAgLCBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aClcbiAgICAgICwgaW5kZXggID0gdG9JbmRleChmcm9tSW5kZXgsIGxlbmd0aClcbiAgICAgICwgdmFsdWU7XG4gICAgLy8gQXJyYXkjaW5jbHVkZXMgdXNlcyBTYW1lVmFsdWVaZXJvIGVxdWFsaXR5IGFsZ29yaXRobVxuICAgIGlmKElTX0lOQ0xVREVTICYmIGVsICE9IGVsKXdoaWxlKGxlbmd0aCA+IGluZGV4KXtcbiAgICAgIHZhbHVlID0gT1tpbmRleCsrXTtcbiAgICAgIGlmKHZhbHVlICE9IHZhbHVlKXJldHVybiB0cnVlO1xuICAgIC8vIEFycmF5I3RvSW5kZXggaWdub3JlcyBob2xlcywgQXJyYXkjaW5jbHVkZXMgLSBub3RcbiAgICB9IGVsc2UgZm9yKDtsZW5ndGggPiBpbmRleDsgaW5kZXgrKylpZihJU19JTkNMVURFUyB8fCBpbmRleCBpbiBPKXtcbiAgICAgIGlmKE9baW5kZXhdID09PSBlbClyZXR1cm4gSVNfSU5DTFVERVMgfHwgaW5kZXggfHwgMDtcbiAgICB9IHJldHVybiAhSVNfSU5DTFVERVMgJiYgLTE7XG4gIH07XG59OyIsInZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwoaXQpLnNsaWNlKDgsIC0xKTtcbn07IiwidmFyIGNvcmUgPSBtb2R1bGUuZXhwb3J0cyA9IHt2ZXJzaW9uOiAnMi40LjAnfTtcbmlmKHR5cGVvZiBfX2UgPT0gJ251bWJlcicpX19lID0gY29yZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZiIsIi8vIG9wdGlvbmFsIC8gc2ltcGxlIGNvbnRleHQgYmluZGluZ1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZm4sIHRoYXQsIGxlbmd0aCl7XG4gIGFGdW5jdGlvbihmbik7XG4gIGlmKHRoYXQgPT09IHVuZGVmaW5lZClyZXR1cm4gZm47XG4gIHN3aXRjaChsZW5ndGgpe1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmN0aW9uKGEpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSk7XG4gICAgfTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jdGlvbihhLCBiKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIpO1xuICAgIH07XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24oYSwgYiwgYyl7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiLCBjKTtcbiAgICB9O1xuICB9XG4gIHJldHVybiBmdW5jdGlvbigvKiAuLi5hcmdzICovKXtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgfTtcbn07IiwiLy8gNy4yLjEgUmVxdWlyZU9iamVjdENvZXJjaWJsZShhcmd1bWVudClcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICBpZihpdCA9PSB1bmRlZmluZWQpdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY2FsbCBtZXRob2Qgb24gIFwiICsgaXQpO1xuICByZXR1cm4gaXQ7XG59OyIsIi8vIFRoYW5rJ3MgSUU4IGZvciBoaXMgZnVubnkgZGVmaW5lUHJvcGVydHlcbm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ2EnLCB7Z2V0OiBmdW5jdGlvbigpeyByZXR1cm4gNzsgfX0pLmEgIT0gNztcbn0pOyIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpXG4gICwgZG9jdW1lbnQgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5kb2N1bWVudFxuICAvLyBpbiBvbGQgSUUgdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgaXMgJ29iamVjdCdcbiAgLCBpcyA9IGlzT2JqZWN0KGRvY3VtZW50KSAmJiBpc09iamVjdChkb2N1bWVudC5jcmVhdGVFbGVtZW50KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXMgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGl0KSA6IHt9O1xufTsiLCIvLyBJRSA4LSBkb24ndCBlbnVtIGJ1ZyBrZXlzXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgJ2NvbnN0cnVjdG9yLGhhc093blByb3BlcnR5LGlzUHJvdG90eXBlT2YscHJvcGVydHlJc0VudW1lcmFibGUsdG9Mb2NhbGVTdHJpbmcsdG9TdHJpbmcsdmFsdWVPZidcbikuc3BsaXQoJywnKTsiLCJ2YXIgZ2xvYmFsICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBjb3JlICAgICAgPSByZXF1aXJlKCcuL19jb3JlJylcbiAgLCBoaWRlICAgICAgPSByZXF1aXJlKCcuL19oaWRlJylcbiAgLCByZWRlZmluZSAgPSByZXF1aXJlKCcuL19yZWRlZmluZScpXG4gICwgY3R4ICAgICAgID0gcmVxdWlyZSgnLi9fY3R4JylcbiAgLCBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcblxudmFyICRleHBvcnQgPSBmdW5jdGlvbih0eXBlLCBuYW1lLCBzb3VyY2Upe1xuICB2YXIgSVNfRk9SQ0VEID0gdHlwZSAmICRleHBvcnQuRlxuICAgICwgSVNfR0xPQkFMID0gdHlwZSAmICRleHBvcnQuR1xuICAgICwgSVNfU1RBVElDID0gdHlwZSAmICRleHBvcnQuU1xuICAgICwgSVNfUFJPVE8gID0gdHlwZSAmICRleHBvcnQuUFxuICAgICwgSVNfQklORCAgID0gdHlwZSAmICRleHBvcnQuQlxuICAgICwgdGFyZ2V0ICAgID0gSVNfR0xPQkFMID8gZ2xvYmFsIDogSVNfU1RBVElDID8gZ2xvYmFsW25hbWVdIHx8IChnbG9iYWxbbmFtZV0gPSB7fSkgOiAoZ2xvYmFsW25hbWVdIHx8IHt9KVtQUk9UT1RZUEVdXG4gICAgLCBleHBvcnRzICAgPSBJU19HTE9CQUwgPyBjb3JlIDogY29yZVtuYW1lXSB8fCAoY29yZVtuYW1lXSA9IHt9KVxuICAgICwgZXhwUHJvdG8gID0gZXhwb3J0c1tQUk9UT1RZUEVdIHx8IChleHBvcnRzW1BST1RPVFlQRV0gPSB7fSlcbiAgICAsIGtleSwgb3duLCBvdXQsIGV4cDtcbiAgaWYoSVNfR0xPQkFMKXNvdXJjZSA9IG5hbWU7XG4gIGZvcihrZXkgaW4gc291cmNlKXtcbiAgICAvLyBjb250YWlucyBpbiBuYXRpdmVcbiAgICBvd24gPSAhSVNfRk9SQ0VEICYmIHRhcmdldCAmJiB0YXJnZXRba2V5XSAhPT0gdW5kZWZpbmVkO1xuICAgIC8vIGV4cG9ydCBuYXRpdmUgb3IgcGFzc2VkXG4gICAgb3V0ID0gKG93biA/IHRhcmdldCA6IHNvdXJjZSlba2V5XTtcbiAgICAvLyBiaW5kIHRpbWVycyB0byBnbG9iYWwgZm9yIGNhbGwgZnJvbSBleHBvcnQgY29udGV4dFxuICAgIGV4cCA9IElTX0JJTkQgJiYgb3duID8gY3R4KG91dCwgZ2xvYmFsKSA6IElTX1BST1RPICYmIHR5cGVvZiBvdXQgPT0gJ2Z1bmN0aW9uJyA/IGN0eChGdW5jdGlvbi5jYWxsLCBvdXQpIDogb3V0O1xuICAgIC8vIGV4dGVuZCBnbG9iYWxcbiAgICBpZih0YXJnZXQpcmVkZWZpbmUodGFyZ2V0LCBrZXksIG91dCwgdHlwZSAmICRleHBvcnQuVSk7XG4gICAgLy8gZXhwb3J0XG4gICAgaWYoZXhwb3J0c1trZXldICE9IG91dCloaWRlKGV4cG9ydHMsIGtleSwgZXhwKTtcbiAgICBpZihJU19QUk9UTyAmJiBleHBQcm90b1trZXldICE9IG91dClleHBQcm90b1trZXldID0gb3V0O1xuICB9XG59O1xuZ2xvYmFsLmNvcmUgPSBjb3JlO1xuLy8gdHlwZSBiaXRtYXBcbiRleHBvcnQuRiA9IDE7ICAgLy8gZm9yY2VkXG4kZXhwb3J0LkcgPSAyOyAgIC8vIGdsb2JhbFxuJGV4cG9ydC5TID0gNDsgICAvLyBzdGF0aWNcbiRleHBvcnQuUCA9IDg7ICAgLy8gcHJvdG9cbiRleHBvcnQuQiA9IDE2OyAgLy8gYmluZFxuJGV4cG9ydC5XID0gMzI7ICAvLyB3cmFwXG4kZXhwb3J0LlUgPSA2NDsgIC8vIHNhZmVcbiRleHBvcnQuUiA9IDEyODsgLy8gcmVhbCBwcm90byBtZXRob2QgZm9yIGBsaWJyYXJ5YCBcbm1vZHVsZS5leHBvcnRzID0gJGV4cG9ydDsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGV4ZWMpe1xuICB0cnkge1xuICAgIHJldHVybiAhIWV4ZWMoKTtcbiAgfSBjYXRjaChlKXtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTsiLCIvLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvODYjaXNzdWVjb21tZW50LTExNTc1OTAyOFxudmFyIGdsb2JhbCA9IG1vZHVsZS5leHBvcnRzID0gdHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuTWF0aCA9PSBNYXRoXG4gID8gd2luZG93IDogdHlwZW9mIHNlbGYgIT0gJ3VuZGVmaW5lZCcgJiYgc2VsZi5NYXRoID09IE1hdGggPyBzZWxmIDogRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbmlmKHR5cGVvZiBfX2cgPT0gJ251bWJlcicpX19nID0gZ2xvYmFsOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmIiwidmFyIGhhc093blByb3BlcnR5ID0ge30uaGFzT3duUHJvcGVydHk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0LCBrZXkpe1xuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChpdCwga2V5KTtcbn07IiwidmFyIGRQICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKVxuICAsIGNyZWF0ZURlc2MgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBmdW5jdGlvbihvYmplY3QsIGtleSwgdmFsdWUpe1xuICByZXR1cm4gZFAuZihvYmplY3QsIGtleSwgY3JlYXRlRGVzYygxLCB2YWx1ZSkpO1xufSA6IGZ1bmN0aW9uKG9iamVjdCwga2V5LCB2YWx1ZSl7XG4gIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIHJldHVybiBvYmplY3Q7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgJiYgIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyZXF1aXJlKCcuL19kb20tY3JlYXRlJykoJ2RpdicpLCAnYScsIHtnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiA3OyB9fSkuYSAhPSA3O1xufSk7IiwiLy8gZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBhbmQgbm9uLWVudW1lcmFibGUgb2xkIFY4IHN0cmluZ3NcbnZhciBjb2YgPSByZXF1aXJlKCcuL19jb2YnKTtcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0KCd6JykucHJvcGVydHlJc0VudW1lcmFibGUoMCkgPyBPYmplY3QgOiBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBjb2YoaXQpID09ICdTdHJpbmcnID8gaXQuc3BsaXQoJycpIDogT2JqZWN0KGl0KTtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiB0eXBlb2YgaXQgPT09ICdvYmplY3QnID8gaXQgIT09IG51bGwgOiB0eXBlb2YgaXQgPT09ICdmdW5jdGlvbic7XG59OyIsIid1c2Ugc3RyaWN0Jztcbi8vIDE5LjEuMi4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UsIC4uLilcbnZhciBnZXRLZXlzICA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJylcbiAgLCBnT1BTICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BzJylcbiAgLCBwSUUgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1waWUnKVxuICAsIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0JylcbiAgLCBJT2JqZWN0ICA9IHJlcXVpcmUoJy4vX2lvYmplY3QnKVxuICAsICRhc3NpZ24gID0gT2JqZWN0LmFzc2lnbjtcblxuLy8gc2hvdWxkIHdvcmsgd2l0aCBzeW1ib2xzIGFuZCBzaG91bGQgaGF2ZSBkZXRlcm1pbmlzdGljIHByb3BlcnR5IG9yZGVyIChWOCBidWcpXG5tb2R1bGUuZXhwb3J0cyA9ICEkYXNzaWduIHx8IHJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgdmFyIEEgPSB7fVxuICAgICwgQiA9IHt9XG4gICAgLCBTID0gU3ltYm9sKClcbiAgICAsIEsgPSAnYWJjZGVmZ2hpamtsbW5vcHFyc3QnO1xuICBBW1NdID0gNztcbiAgSy5zcGxpdCgnJykuZm9yRWFjaChmdW5jdGlvbihrKXsgQltrXSA9IGs7IH0pO1xuICByZXR1cm4gJGFzc2lnbih7fSwgQSlbU10gIT0gNyB8fCBPYmplY3Qua2V5cygkYXNzaWduKHt9LCBCKSkuam9pbignJykgIT0gSztcbn0pID8gZnVuY3Rpb24gYXNzaWduKHRhcmdldCwgc291cmNlKXsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICB2YXIgVCAgICAgPSB0b09iamVjdCh0YXJnZXQpXG4gICAgLCBhTGVuICA9IGFyZ3VtZW50cy5sZW5ndGhcbiAgICAsIGluZGV4ID0gMVxuICAgICwgZ2V0U3ltYm9scyA9IGdPUFMuZlxuICAgICwgaXNFbnVtICAgICA9IHBJRS5mO1xuICB3aGlsZShhTGVuID4gaW5kZXgpe1xuICAgIHZhciBTICAgICAgPSBJT2JqZWN0KGFyZ3VtZW50c1tpbmRleCsrXSlcbiAgICAgICwga2V5cyAgID0gZ2V0U3ltYm9scyA/IGdldEtleXMoUykuY29uY2F0KGdldFN5bWJvbHMoUykpIDogZ2V0S2V5cyhTKVxuICAgICAgLCBsZW5ndGggPSBrZXlzLmxlbmd0aFxuICAgICAgLCBqICAgICAgPSAwXG4gICAgICAsIGtleTtcbiAgICB3aGlsZShsZW5ndGggPiBqKWlmKGlzRW51bS5jYWxsKFMsIGtleSA9IGtleXNbaisrXSkpVFtrZXldID0gU1trZXldO1xuICB9IHJldHVybiBUO1xufSA6ICRhc3NpZ247IiwidmFyIGFuT2JqZWN0ICAgICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4vX2llOC1kb20tZGVmaW5lJylcbiAgLCB0b1ByaW1pdGl2ZSAgICA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpXG4gICwgZFAgICAgICAgICAgICAgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG5cbmV4cG9ydHMuZiA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBPYmplY3QuZGVmaW5lUHJvcGVydHkgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKXtcbiAgYW5PYmplY3QoTyk7XG4gIFAgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcbiAgYW5PYmplY3QoQXR0cmlidXRlcyk7XG4gIGlmKElFOF9ET01fREVGSU5FKXRyeSB7XG4gICAgcmV0dXJuIGRQKE8sIFAsIEF0dHJpYnV0ZXMpO1xuICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG4gIGlmKCdnZXQnIGluIEF0dHJpYnV0ZXMgfHwgJ3NldCcgaW4gQXR0cmlidXRlcyl0aHJvdyBUeXBlRXJyb3IoJ0FjY2Vzc29ycyBub3Qgc3VwcG9ydGVkIScpO1xuICBpZigndmFsdWUnIGluIEF0dHJpYnV0ZXMpT1tQXSA9IEF0dHJpYnV0ZXMudmFsdWU7XG4gIHJldHVybiBPO1xufTsiLCJleHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzOyIsInZhciBoYXMgICAgICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIHRvSU9iamVjdCAgICA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKVxuICAsIGFycmF5SW5kZXhPZiA9IHJlcXVpcmUoJy4vX2FycmF5LWluY2x1ZGVzJykoZmFsc2UpXG4gICwgSUVfUFJPVE8gICAgID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iamVjdCwgbmFtZXMpe1xuICB2YXIgTyAgICAgID0gdG9JT2JqZWN0KG9iamVjdClcbiAgICAsIGkgICAgICA9IDBcbiAgICAsIHJlc3VsdCA9IFtdXG4gICAgLCBrZXk7XG4gIGZvcihrZXkgaW4gTylpZihrZXkgIT0gSUVfUFJPVE8paGFzKE8sIGtleSkgJiYgcmVzdWx0LnB1c2goa2V5KTtcbiAgLy8gRG9uJ3QgZW51bSBidWcgJiBoaWRkZW4ga2V5c1xuICB3aGlsZShuYW1lcy5sZW5ndGggPiBpKWlmKGhhcyhPLCBrZXkgPSBuYW1lc1tpKytdKSl7XG4gICAgfmFycmF5SW5kZXhPZihyZXN1bHQsIGtleSkgfHwgcmVzdWx0LnB1c2goa2V5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTsiLCIvLyAxOS4xLjIuMTQgLyAxNS4yLjMuMTQgT2JqZWN0LmtleXMoTylcbnZhciAka2V5cyAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzLWludGVybmFsJylcbiAgLCBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiBrZXlzKE8pe1xuICByZXR1cm4gJGtleXMoTywgZW51bUJ1Z0tleXMpO1xufTsiLCJleHBvcnRzLmYgPSB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZTsiLCIvLyBtb3N0IE9iamVjdCBtZXRob2RzIGJ5IEVTNiBzaG91bGQgYWNjZXB0IHByaW1pdGl2ZXNcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCBjb3JlICAgID0gcmVxdWlyZSgnLi9fY29yZScpXG4gICwgZmFpbHMgICA9IHJlcXVpcmUoJy4vX2ZhaWxzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKEtFWSwgZXhlYyl7XG4gIHZhciBmbiAgPSAoY29yZS5PYmplY3QgfHwge30pW0tFWV0gfHwgT2JqZWN0W0tFWV1cbiAgICAsIGV4cCA9IHt9O1xuICBleHBbS0VZXSA9IGV4ZWMoZm4pO1xuICAkZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqIGZhaWxzKGZ1bmN0aW9uKCl7IGZuKDEpOyB9KSwgJ09iamVjdCcsIGV4cCk7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYml0bWFwLCB2YWx1ZSl7XG4gIHJldHVybiB7XG4gICAgZW51bWVyYWJsZSAgOiAhKGJpdG1hcCAmIDEpLFxuICAgIGNvbmZpZ3VyYWJsZTogIShiaXRtYXAgJiAyKSxcbiAgICB3cml0YWJsZSAgICA6ICEoYml0bWFwICYgNCksXG4gICAgdmFsdWUgICAgICAgOiB2YWx1ZVxuICB9O1xufTsiLCJ2YXIgZ2xvYmFsICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBoaWRlICAgICAgPSByZXF1aXJlKCcuL19oaWRlJylcbiAgLCBoYXMgICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIFNSQyAgICAgICA9IHJlcXVpcmUoJy4vX3VpZCcpKCdzcmMnKVxuICAsIFRPX1NUUklORyA9ICd0b1N0cmluZydcbiAgLCAkdG9TdHJpbmcgPSBGdW5jdGlvbltUT19TVFJJTkddXG4gICwgVFBMICAgICAgID0gKCcnICsgJHRvU3RyaW5nKS5zcGxpdChUT19TVFJJTkcpO1xuXG5yZXF1aXJlKCcuL19jb3JlJykuaW5zcGVjdFNvdXJjZSA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuICR0b1N0cmluZy5jYWxsKGl0KTtcbn07XG5cbihtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKE8sIGtleSwgdmFsLCBzYWZlKXtcbiAgdmFyIGlzRnVuY3Rpb24gPSB0eXBlb2YgdmFsID09ICdmdW5jdGlvbic7XG4gIGlmKGlzRnVuY3Rpb24paGFzKHZhbCwgJ25hbWUnKSB8fCBoaWRlKHZhbCwgJ25hbWUnLCBrZXkpO1xuICBpZihPW2tleV0gPT09IHZhbClyZXR1cm47XG4gIGlmKGlzRnVuY3Rpb24paGFzKHZhbCwgU1JDKSB8fCBoaWRlKHZhbCwgU1JDLCBPW2tleV0gPyAnJyArIE9ba2V5XSA6IFRQTC5qb2luKFN0cmluZyhrZXkpKSk7XG4gIGlmKE8gPT09IGdsb2JhbCl7XG4gICAgT1trZXldID0gdmFsO1xuICB9IGVsc2Uge1xuICAgIGlmKCFzYWZlKXtcbiAgICAgIGRlbGV0ZSBPW2tleV07XG4gICAgICBoaWRlKE8sIGtleSwgdmFsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYoT1trZXldKU9ba2V5XSA9IHZhbDtcbiAgICAgIGVsc2UgaGlkZShPLCBrZXksIHZhbCk7XG4gICAgfVxuICB9XG4vLyBhZGQgZmFrZSBGdW5jdGlvbiN0b1N0cmluZyBmb3IgY29ycmVjdCB3b3JrIHdyYXBwZWQgbWV0aG9kcyAvIGNvbnN0cnVjdG9ycyB3aXRoIG1ldGhvZHMgbGlrZSBMb0Rhc2ggaXNOYXRpdmVcbn0pKEZ1bmN0aW9uLnByb3RvdHlwZSwgVE9fU1RSSU5HLCBmdW5jdGlvbiB0b1N0cmluZygpe1xuICByZXR1cm4gdHlwZW9mIHRoaXMgPT0gJ2Z1bmN0aW9uJyAmJiB0aGlzW1NSQ10gfHwgJHRvU3RyaW5nLmNhbGwodGhpcyk7XG59KTsiLCJ2YXIgc2hhcmVkID0gcmVxdWlyZSgnLi9fc2hhcmVkJykoJ2tleXMnKVxuICAsIHVpZCAgICA9IHJlcXVpcmUoJy4vX3VpZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xuICByZXR1cm4gc2hhcmVkW2tleV0gfHwgKHNoYXJlZFtrZXldID0gdWlkKGtleSkpO1xufTsiLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBTSEFSRUQgPSAnX19jb3JlLWpzX3NoYXJlZF9fJ1xuICAsIHN0b3JlICA9IGdsb2JhbFtTSEFSRURdIHx8IChnbG9iYWxbU0hBUkVEXSA9IHt9KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oa2V5KXtcbiAgcmV0dXJuIHN0b3JlW2tleV0gfHwgKHN0b3JlW2tleV0gPSB7fSk7XG59OyIsInZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJylcbiAgLCBtYXggICAgICAgPSBNYXRoLm1heFxuICAsIG1pbiAgICAgICA9IE1hdGgubWluO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpbmRleCwgbGVuZ3RoKXtcbiAgaW5kZXggPSB0b0ludGVnZXIoaW5kZXgpO1xuICByZXR1cm4gaW5kZXggPCAwID8gbWF4KGluZGV4ICsgbGVuZ3RoLCAwKSA6IG1pbihpbmRleCwgbGVuZ3RoKTtcbn07IiwiLy8gNy4xLjQgVG9JbnRlZ2VyXG52YXIgY2VpbCAgPSBNYXRoLmNlaWxcbiAgLCBmbG9vciA9IE1hdGguZmxvb3I7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGlzTmFOKGl0ID0gK2l0KSA/IDAgOiAoaXQgPiAwID8gZmxvb3IgOiBjZWlsKShpdCk7XG59OyIsIi8vIHRvIGluZGV4ZWQgb2JqZWN0LCB0b09iamVjdCB3aXRoIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgc3RyaW5nc1xudmFyIElPYmplY3QgPSByZXF1aXJlKCcuL19pb2JqZWN0JylcbiAgLCBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBJT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07IiwiLy8gNy4xLjE1IFRvTGVuZ3RoXG52YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpXG4gICwgbWluICAgICAgID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGl0ID4gMCA/IG1pbih0b0ludGVnZXIoaXQpLCAweDFmZmZmZmZmZmZmZmZmKSA6IDA7IC8vIHBvdygyLCA1MykgLSAxID09IDkwMDcxOTkyNTQ3NDA5OTFcbn07IiwiLy8gNy4xLjEzIFRvT2JqZWN0KGFyZ3VtZW50KVxudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIE9iamVjdChkZWZpbmVkKGl0KSk7XG59OyIsIi8vIDcuMS4xIFRvUHJpbWl0aXZlKGlucHV0IFssIFByZWZlcnJlZFR5cGVdKVxudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG4vLyBpbnN0ZWFkIG9mIHRoZSBFUzYgc3BlYyB2ZXJzaW9uLCB3ZSBkaWRuJ3QgaW1wbGVtZW50IEBAdG9QcmltaXRpdmUgY2FzZVxuLy8gYW5kIHRoZSBzZWNvbmQgYXJndW1lbnQgLSBmbGFnIC0gcHJlZmVycmVkIHR5cGUgaXMgYSBzdHJpbmdcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQsIFMpe1xuICBpZighaXNPYmplY3QoaXQpKXJldHVybiBpdDtcbiAgdmFyIGZuLCB2YWw7XG4gIGlmKFMgJiYgdHlwZW9mIChmbiA9IGl0LnRvU3RyaW5nKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpcmV0dXJuIHZhbDtcbiAgaWYodHlwZW9mIChmbiA9IGl0LnZhbHVlT2YpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSlyZXR1cm4gdmFsO1xuICBpZighUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSlyZXR1cm4gdmFsO1xuICB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjb252ZXJ0IG9iamVjdCB0byBwcmltaXRpdmUgdmFsdWVcIik7XG59OyIsInZhciBpZCA9IDBcbiAgLCBweCA9IE1hdGgucmFuZG9tKCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGtleSl7XG4gIHJldHVybiAnU3ltYm9sKCcuY29uY2F0KGtleSA9PT0gdW5kZWZpbmVkID8gJycgOiBrZXksICcpXycsICgrK2lkICsgcHgpLnRvU3RyaW5nKDM2KSk7XG59OyIsIi8vIDE5LjEuMy4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiwgJ09iamVjdCcsIHthc3NpZ246IHJlcXVpcmUoJy4vX29iamVjdC1hc3NpZ24nKX0pOyIsInZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG4vLyAxOS4xLjIuNCAvIDE1LjIuMy42IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKVxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSwgJ09iamVjdCcsIHtkZWZpbmVQcm9wZXJ0eTogcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZn0pOyIsIi8vIDE5LjEuMi4xNCBPYmplY3Qua2V5cyhPKVxudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0JylcbiAgLCAka2V5cyAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJyk7XG5cbnJlcXVpcmUoJy4vX29iamVjdC1zYXAnKSgna2V5cycsIGZ1bmN0aW9uKCl7XG4gIHJldHVybiBmdW5jdGlvbiBrZXlzKGl0KXtcbiAgICByZXR1cm4gJGtleXModG9PYmplY3QoaXQpKTtcbiAgfTtcbn0pOyIsIi8qISBsb2FkQ1NTOiBsb2FkIGEgQ1NTIGZpbGUgYXN5bmNocm9ub3VzbHkuIFtjXTIwMTYgQHNjb3R0amVobCwgRmlsYW1lbnQgR3JvdXAsIEluYy4gTGljZW5zZWQgTUlUICovXG4oZnVuY3Rpb24odyl7XG5cdFwidXNlIHN0cmljdFwiO1xuXHQvKiBleHBvcnRlZCBsb2FkQ1NTICovXG5cdHZhciBsb2FkQ1NTID0gZnVuY3Rpb24oIGhyZWYsIGJlZm9yZSwgbWVkaWEgKXtcblx0XHQvLyBBcmd1bWVudHMgZXhwbGFpbmVkOlxuXHRcdC8vIGBocmVmYCBbUkVRVUlSRURdIGlzIHRoZSBVUkwgZm9yIHlvdXIgQ1NTIGZpbGUuXG5cdFx0Ly8gYGJlZm9yZWAgW09QVElPTkFMXSBpcyB0aGUgZWxlbWVudCB0aGUgc2NyaXB0IHNob3VsZCB1c2UgYXMgYSByZWZlcmVuY2UgZm9yIGluamVjdGluZyBvdXIgc3R5bGVzaGVldCA8bGluaz4gYmVmb3JlXG5cdFx0XHQvLyBCeSBkZWZhdWx0LCBsb2FkQ1NTIGF0dGVtcHRzIHRvIGluamVjdCB0aGUgbGluayBhZnRlciB0aGUgbGFzdCBzdHlsZXNoZWV0IG9yIHNjcmlwdCBpbiB0aGUgRE9NLiBIb3dldmVyLCB5b3UgbWlnaHQgZGVzaXJlIGEgbW9yZSBzcGVjaWZpYyBsb2NhdGlvbiBpbiB5b3VyIGRvY3VtZW50LlxuXHRcdC8vIGBtZWRpYWAgW09QVElPTkFMXSBpcyB0aGUgbWVkaWEgdHlwZSBvciBxdWVyeSBvZiB0aGUgc3R5bGVzaGVldC4gQnkgZGVmYXVsdCBpdCB3aWxsIGJlICdhbGwnXG5cdFx0dmFyIGRvYyA9IHcuZG9jdW1lbnQ7XG5cdFx0dmFyIHNzID0gZG9jLmNyZWF0ZUVsZW1lbnQoIFwibGlua1wiICk7XG5cdFx0dmFyIHJlZjtcblx0XHRpZiggYmVmb3JlICl7XG5cdFx0XHRyZWYgPSBiZWZvcmU7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0dmFyIHJlZnMgPSAoIGRvYy5ib2R5IHx8IGRvYy5nZXRFbGVtZW50c0J5VGFnTmFtZSggXCJoZWFkXCIgKVsgMCBdICkuY2hpbGROb2Rlcztcblx0XHRcdHJlZiA9IHJlZnNbIHJlZnMubGVuZ3RoIC0gMV07XG5cdFx0fVxuXG5cdFx0dmFyIHNoZWV0cyA9IGRvYy5zdHlsZVNoZWV0cztcblx0XHRzcy5yZWwgPSBcInN0eWxlc2hlZXRcIjtcblx0XHRzcy5ocmVmID0gaHJlZjtcblx0XHQvLyB0ZW1wb3JhcmlseSBzZXQgbWVkaWEgdG8gc29tZXRoaW5nIGluYXBwbGljYWJsZSB0byBlbnN1cmUgaXQnbGwgZmV0Y2ggd2l0aG91dCBibG9ja2luZyByZW5kZXJcblx0XHRzcy5tZWRpYSA9IFwib25seSB4XCI7XG5cblx0XHQvLyB3YWl0IHVudGlsIGJvZHkgaXMgZGVmaW5lZCBiZWZvcmUgaW5qZWN0aW5nIGxpbmsuIFRoaXMgZW5zdXJlcyBhIG5vbi1ibG9ja2luZyBsb2FkIGluIElFMTEuXG5cdFx0ZnVuY3Rpb24gcmVhZHkoIGNiICl7XG5cdFx0XHRpZiggZG9jLmJvZHkgKXtcblx0XHRcdFx0cmV0dXJuIGNiKCk7XG5cdFx0XHR9XG5cdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cdFx0XHRcdHJlYWR5KCBjYiApO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdC8vIEluamVjdCBsaW5rXG5cdFx0XHQvLyBOb3RlOiB0aGUgdGVybmFyeSBwcmVzZXJ2ZXMgdGhlIGV4aXN0aW5nIGJlaGF2aW9yIG9mIFwiYmVmb3JlXCIgYXJndW1lbnQsIGJ1dCB3ZSBjb3VsZCBjaG9vc2UgdG8gY2hhbmdlIHRoZSBhcmd1bWVudCB0byBcImFmdGVyXCIgaW4gYSBsYXRlciByZWxlYXNlIGFuZCBzdGFuZGFyZGl6ZSBvbiByZWYubmV4dFNpYmxpbmcgZm9yIGFsbCByZWZzXG5cdFx0XHQvLyBOb3RlOiBgaW5zZXJ0QmVmb3JlYCBpcyB1c2VkIGluc3RlYWQgb2YgYGFwcGVuZENoaWxkYCwgZm9yIHNhZmV0eSByZTogaHR0cDovL3d3dy5wYXVsaXJpc2guY29tLzIwMTEvc3VyZWZpcmUtZG9tLWVsZW1lbnQtaW5zZXJ0aW9uL1xuXHRcdHJlYWR5KCBmdW5jdGlvbigpe1xuXHRcdFx0cmVmLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKCBzcywgKCBiZWZvcmUgPyByZWYgOiByZWYubmV4dFNpYmxpbmcgKSApO1xuXHRcdH0pO1xuXHRcdC8vIEEgbWV0aG9kIChleHBvc2VkIG9uIHJldHVybiBvYmplY3QgZm9yIGV4dGVybmFsIHVzZSkgdGhhdCBtaW1pY3Mgb25sb2FkIGJ5IHBvbGxpbmcgdW50aWwgZG9jdW1lbnQuc3R5bGVTaGVldHMgdW50aWwgaXQgaW5jbHVkZXMgdGhlIG5ldyBzaGVldC5cblx0XHR2YXIgb25sb2FkY3NzZGVmaW5lZCA9IGZ1bmN0aW9uKCBjYiApe1xuXHRcdFx0dmFyIHJlc29sdmVkSHJlZiA9IHNzLmhyZWY7XG5cdFx0XHR2YXIgaSA9IHNoZWV0cy5sZW5ndGg7XG5cdFx0XHR3aGlsZSggaS0tICl7XG5cdFx0XHRcdGlmKCBzaGVldHNbIGkgXS5ocmVmID09PSByZXNvbHZlZEhyZWYgKXtcblx0XHRcdFx0XHRyZXR1cm4gY2IoKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdFx0b25sb2FkY3NzZGVmaW5lZCggY2IgKTtcblx0XHRcdH0pO1xuXHRcdH07XG5cblx0XHRmdW5jdGlvbiBsb2FkQ0IoKXtcblx0XHRcdGlmKCBzcy5hZGRFdmVudExpc3RlbmVyICl7XG5cdFx0XHRcdHNzLnJlbW92ZUV2ZW50TGlzdGVuZXIoIFwibG9hZFwiLCBsb2FkQ0IgKTtcblx0XHRcdH1cblx0XHRcdHNzLm1lZGlhID0gbWVkaWEgfHwgXCJhbGxcIjtcblx0XHR9XG5cblx0XHQvLyBvbmNlIGxvYWRlZCwgc2V0IGxpbmsncyBtZWRpYSBiYWNrIHRvIGBhbGxgIHNvIHRoYXQgdGhlIHN0eWxlc2hlZXQgYXBwbGllcyBvbmNlIGl0IGxvYWRzXG5cdFx0aWYoIHNzLmFkZEV2ZW50TGlzdGVuZXIgKXtcblx0XHRcdHNzLmFkZEV2ZW50TGlzdGVuZXIoIFwibG9hZFwiLCBsb2FkQ0IpO1xuXHRcdH1cblx0XHRzcy5vbmxvYWRjc3NkZWZpbmVkID0gb25sb2FkY3NzZGVmaW5lZDtcblx0XHRvbmxvYWRjc3NkZWZpbmVkKCBsb2FkQ0IgKTtcblx0XHRyZXR1cm4gc3M7XG5cdH07XG5cdC8vIGNvbW1vbmpzXG5cdGlmKCB0eXBlb2YgZXhwb3J0cyAhPT0gXCJ1bmRlZmluZWRcIiApe1xuXHRcdGV4cG9ydHMubG9hZENTUyA9IGxvYWRDU1M7XG5cdH1cblx0ZWxzZSB7XG5cdFx0dy5sb2FkQ1NTID0gbG9hZENTUztcblx0fVxufSggdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHRoaXMgKSk7XG4iLCJpbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi9TdWJzY3JpYmVyJztcbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBpZ25vcmVcbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICovXG5leHBvcnQgY2xhc3MgSW5uZXJTdWJzY3JpYmVyIGV4dGVuZHMgU3Vic2NyaWJlciB7XG4gICAgY29uc3RydWN0b3IocGFyZW50LCBvdXRlclZhbHVlLCBvdXRlckluZGV4KSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMucGFyZW50ID0gcGFyZW50O1xuICAgICAgICB0aGlzLm91dGVyVmFsdWUgPSBvdXRlclZhbHVlO1xuICAgICAgICB0aGlzLm91dGVySW5kZXggPSBvdXRlckluZGV4O1xuICAgICAgICB0aGlzLmluZGV4ID0gMDtcbiAgICB9XG4gICAgX25leHQodmFsdWUpIHtcbiAgICAgICAgdGhpcy5wYXJlbnQubm90aWZ5TmV4dCh0aGlzLm91dGVyVmFsdWUsIHZhbHVlLCB0aGlzLm91dGVySW5kZXgsIHRoaXMuaW5kZXgrKywgdGhpcyk7XG4gICAgfVxuICAgIF9lcnJvcihlcnJvcikge1xuICAgICAgICB0aGlzLnBhcmVudC5ub3RpZnlFcnJvcihlcnJvciwgdGhpcyk7XG4gICAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgX2NvbXBsZXRlKCkge1xuICAgICAgICB0aGlzLnBhcmVudC5ub3RpZnlDb21wbGV0ZSh0aGlzKTtcbiAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUlubmVyU3Vic2NyaWJlci5qcy5tYXAiLCJpbXBvcnQgeyByb290IH0gZnJvbSAnLi91dGlsL3Jvb3QnO1xuaW1wb3J0IHsgdG9TdWJzY3JpYmVyIH0gZnJvbSAnLi91dGlsL3RvU3Vic2NyaWJlcic7XG5pbXBvcnQgeyAkJG9ic2VydmFibGUgfSBmcm9tICcuL3N5bWJvbC9vYnNlcnZhYmxlJztcbi8qKlxuICogQSByZXByZXNlbnRhdGlvbiBvZiBhbnkgc2V0IG9mIHZhbHVlcyBvdmVyIGFueSBhbW91bnQgb2YgdGltZS4gVGhpcyB0aGUgbW9zdCBiYXNpYyBidWlsZGluZyBibG9ja1xuICogb2YgUnhKUy5cbiAqXG4gKiBAY2xhc3MgT2JzZXJ2YWJsZTxUPlxuICovXG5leHBvcnQgY2xhc3MgT2JzZXJ2YWJsZSB7XG4gICAgLyoqXG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gc3Vic2NyaWJlIHRoZSBmdW5jdGlvbiB0aGF0IGlzICBjYWxsZWQgd2hlbiB0aGUgT2JzZXJ2YWJsZSBpc1xuICAgICAqIGluaXRpYWxseSBzdWJzY3JpYmVkIHRvLiBUaGlzIGZ1bmN0aW9uIGlzIGdpdmVuIGEgU3Vic2NyaWJlciwgdG8gd2hpY2ggbmV3IHZhbHVlc1xuICAgICAqIGNhbiBiZSBgbmV4dGBlZCwgb3IgYW4gYGVycm9yYCBtZXRob2QgY2FuIGJlIGNhbGxlZCB0byByYWlzZSBhbiBlcnJvciwgb3JcbiAgICAgKiBgY29tcGxldGVgIGNhbiBiZSBjYWxsZWQgdG8gbm90aWZ5IG9mIGEgc3VjY2Vzc2Z1bCBjb21wbGV0aW9uLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHN1YnNjcmliZSkge1xuICAgICAgICB0aGlzLl9pc1NjYWxhciA9IGZhbHNlO1xuICAgICAgICBpZiAoc3Vic2NyaWJlKSB7XG4gICAgICAgICAgICB0aGlzLl9zdWJzY3JpYmUgPSBzdWJzY3JpYmU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBPYnNlcnZhYmxlLCB3aXRoIHRoaXMgT2JzZXJ2YWJsZSBhcyB0aGUgc291cmNlLCBhbmQgdGhlIHBhc3NlZFxuICAgICAqIG9wZXJhdG9yIGRlZmluZWQgYXMgdGhlIG5ldyBvYnNlcnZhYmxlJ3Mgb3BlcmF0b3IuXG4gICAgICogQG1ldGhvZCBsaWZ0XG4gICAgICogQHBhcmFtIHtPcGVyYXRvcn0gb3BlcmF0b3IgdGhlIG9wZXJhdG9yIGRlZmluaW5nIHRoZSBvcGVyYXRpb24gdG8gdGFrZSBvbiB0aGUgb2JzZXJ2YWJsZVxuICAgICAqIEByZXR1cm4ge09ic2VydmFibGV9IGEgbmV3IG9ic2VydmFibGUgd2l0aCB0aGUgT3BlcmF0b3IgYXBwbGllZFxuICAgICAqL1xuICAgIGxpZnQob3BlcmF0b3IpIHtcbiAgICAgICAgY29uc3Qgb2JzZXJ2YWJsZSA9IG5ldyBPYnNlcnZhYmxlKCk7XG4gICAgICAgIG9ic2VydmFibGUuc291cmNlID0gdGhpcztcbiAgICAgICAgb2JzZXJ2YWJsZS5vcGVyYXRvciA9IG9wZXJhdG9yO1xuICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVnaXN0ZXJzIGhhbmRsZXJzIGZvciBoYW5kbGluZyBlbWl0dGVkIHZhbHVlcywgZXJyb3IgYW5kIGNvbXBsZXRpb25zIGZyb20gdGhlIG9ic2VydmFibGUsIGFuZFxuICAgICAqICBleGVjdXRlcyB0aGUgb2JzZXJ2YWJsZSdzIHN1YnNjcmliZXIgZnVuY3Rpb24sIHdoaWNoIHdpbGwgdGFrZSBhY3Rpb24gdG8gc2V0IHVwIHRoZSB1bmRlcmx5aW5nIGRhdGEgc3RyZWFtXG4gICAgICogQG1ldGhvZCBzdWJzY3JpYmVcbiAgICAgKiBAcGFyYW0ge1BhcnRpYWxPYnNlcnZlcnxGdW5jdGlvbn0gb2JzZXJ2ZXJPck5leHQgKG9wdGlvbmFsKSBlaXRoZXIgYW4gb2JzZXJ2ZXIgZGVmaW5pbmcgYWxsIGZ1bmN0aW9ucyB0byBiZSBjYWxsZWQsXG4gICAgICogIG9yIHRoZSBmaXJzdCBvZiB0aHJlZSBwb3NzaWJsZSBoYW5kbGVycywgd2hpY2ggaXMgdGhlIGhhbmRsZXIgZm9yIGVhY2ggdmFsdWUgZW1pdHRlZCBmcm9tIHRoZSBvYnNlcnZhYmxlLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGVycm9yIChvcHRpb25hbCkgYSBoYW5kbGVyIGZvciBhIHRlcm1pbmFsIGV2ZW50IHJlc3VsdGluZyBmcm9tIGFuIGVycm9yLiBJZiBubyBlcnJvciBoYW5kbGVyIGlzIHByb3ZpZGVkLFxuICAgICAqICB0aGUgZXJyb3Igd2lsbCBiZSB0aHJvd24gYXMgdW5oYW5kbGVkXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY29tcGxldGUgKG9wdGlvbmFsKSBhIGhhbmRsZXIgZm9yIGEgdGVybWluYWwgZXZlbnQgcmVzdWx0aW5nIGZyb20gc3VjY2Vzc2Z1bCBjb21wbGV0aW9uLlxuICAgICAqIEByZXR1cm4ge0lTdWJzY3JpcHRpb259IGEgc3Vic2NyaXB0aW9uIHJlZmVyZW5jZSB0byB0aGUgcmVnaXN0ZXJlZCBoYW5kbGVyc1xuICAgICAqL1xuICAgIHN1YnNjcmliZShvYnNlcnZlck9yTmV4dCwgZXJyb3IsIGNvbXBsZXRlKSB7XG4gICAgICAgIGNvbnN0IHsgb3BlcmF0b3IgfSA9IHRoaXM7XG4gICAgICAgIGNvbnN0IHNpbmsgPSB0b1N1YnNjcmliZXIob2JzZXJ2ZXJPck5leHQsIGVycm9yLCBjb21wbGV0ZSk7XG4gICAgICAgIGlmIChvcGVyYXRvcikge1xuICAgICAgICAgICAgb3BlcmF0b3IuY2FsbChzaW5rLCB0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHNpbmsuYWRkKHRoaXMuX3N1YnNjcmliZShzaW5rKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNpbmsuc3luY0Vycm9yVGhyb3dhYmxlKSB7XG4gICAgICAgICAgICBzaW5rLnN5bmNFcnJvclRocm93YWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKHNpbmsuc3luY0Vycm9yVGhyb3duKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgc2luay5zeW5jRXJyb3JWYWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2luaztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBmb3JFYWNoXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gbmV4dCBhIGhhbmRsZXIgZm9yIGVhY2ggdmFsdWUgZW1pdHRlZCBieSB0aGUgb2JzZXJ2YWJsZVxuICAgICAqIEBwYXJhbSB7UHJvbWlzZUNvbnN0cnVjdG9yfSBbUHJvbWlzZUN0b3JdIGEgY29uc3RydWN0b3IgZnVuY3Rpb24gdXNlZCB0byBpbnN0YW50aWF0ZSB0aGUgUHJvbWlzZVxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9IGEgcHJvbWlzZSB0aGF0IGVpdGhlciByZXNvbHZlcyBvbiBvYnNlcnZhYmxlIGNvbXBsZXRpb24gb3JcbiAgICAgKiAgcmVqZWN0cyB3aXRoIHRoZSBoYW5kbGVkIGVycm9yXG4gICAgICovXG4gICAgZm9yRWFjaChuZXh0LCBQcm9taXNlQ3Rvcikge1xuICAgICAgICBpZiAoIVByb21pc2VDdG9yKSB7XG4gICAgICAgICAgICBpZiAocm9vdC5SeCAmJiByb290LlJ4LmNvbmZpZyAmJiByb290LlJ4LmNvbmZpZy5Qcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgUHJvbWlzZUN0b3IgPSByb290LlJ4LmNvbmZpZy5Qcm9taXNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAocm9vdC5Qcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgUHJvbWlzZUN0b3IgPSByb290LlByb21pc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFQcm9taXNlQ3Rvcikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdubyBQcm9taXNlIGltcGwgZm91bmQnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2VDdG9yKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHN1YnNjcmlwdGlvbiA9IHRoaXMuc3Vic2NyaWJlKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChzdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgdGhlcmUgaXMgYSBzdWJzY3JpcHRpb24sIHRoZW4gd2UgY2FuIHN1cm1pc2VcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhlIG5leHQgaGFuZGxpbmcgaXMgYXN5bmNocm9ub3VzLiBBbnkgZXJyb3JzIHRocm93blxuICAgICAgICAgICAgICAgICAgICAvLyBuZWVkIHRvIGJlIHJlamVjdGVkIGV4cGxpY2l0bHkgYW5kIHVuc3Vic2NyaWJlIG11c3QgYmVcbiAgICAgICAgICAgICAgICAgICAgLy8gY2FsbGVkIG1hbnVhbGx5XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0KHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBpZiB0aGVyZSBpcyBOTyBzdWJzY3JpcHRpb24sIHRoZW4gd2UncmUgZ2V0dGluZyBhIG5leHRlZFxuICAgICAgICAgICAgICAgICAgICAvLyB2YWx1ZSBzeW5jaHJvbm91c2x5IGR1cmluZyBzdWJzY3JpcHRpb24uIFdlIGNhbiBqdXN0IGNhbGwgaXQuXG4gICAgICAgICAgICAgICAgICAgIC8vIElmIGl0IGVycm9ycywgT2JzZXJ2YWJsZSdzIGBzdWJzY3JpYmVgIHdpbGwgZW5zdXJlIHRoZVxuICAgICAgICAgICAgICAgICAgICAvLyB1bnN1YnNjcmlwdGlvbiBsb2dpYyBpcyBjYWxsZWQsIHRoZW4gc3luY2hyb25vdXNseSByZXRocm93IHRoZSBlcnJvci5cbiAgICAgICAgICAgICAgICAgICAgLy8gQWZ0ZXIgdGhhdCwgUHJvbWlzZSB3aWxsIHRyYXAgdGhlIGVycm9yIGFuZCBzZW5kIGl0XG4gICAgICAgICAgICAgICAgICAgIC8vIGRvd24gdGhlIHJlamVjdGlvbiBwYXRoLlxuICAgICAgICAgICAgICAgICAgICBuZXh0KHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCByZWplY3QsIHJlc29sdmUpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgX3N1YnNjcmliZShzdWJzY3JpYmVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNvdXJjZS5zdWJzY3JpYmUoc3Vic2NyaWJlcik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFuIGludGVyb3AgcG9pbnQgZGVmaW5lZCBieSB0aGUgZXM3LW9ic2VydmFibGUgc3BlYyBodHRwczovL2dpdGh1Yi5jb20vemVucGFyc2luZy9lcy1vYnNlcnZhYmxlXG4gICAgICogQG1ldGhvZCBTeW1ib2wub2JzZXJ2YWJsZVxuICAgICAqIEByZXR1cm4ge09ic2VydmFibGV9IHRoaXMgaW5zdGFuY2Ugb2YgdGhlIG9ic2VydmFibGVcbiAgICAgKi9cbiAgICBbJCRvYnNlcnZhYmxlXSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufVxuLy8gSEFDSzogU2luY2UgVHlwZVNjcmlwdCBpbmhlcml0cyBzdGF0aWMgcHJvcGVydGllcyB0b28sIHdlIGhhdmUgdG9cbi8vIGZpZ2h0IGFnYWluc3QgVHlwZVNjcmlwdCBoZXJlIHNvIFN1YmplY3QgY2FuIGhhdmUgYSBkaWZmZXJlbnQgc3RhdGljIGNyZWF0ZSBzaWduYXR1cmVcbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBjb2xkIE9ic2VydmFibGUgYnkgY2FsbGluZyB0aGUgT2JzZXJ2YWJsZSBjb25zdHJ1Y3RvclxuICogQHN0YXRpYyB0cnVlXG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICogQG1ldGhvZCBjcmVhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHN1YnNjcmliZT8gdGhlIHN1YnNjcmliZXIgZnVuY3Rpb24gdG8gYmUgcGFzc2VkIHRvIHRoZSBPYnNlcnZhYmxlIGNvbnN0cnVjdG9yXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSBhIG5ldyBjb2xkIG9ic2VydmFibGVcbiAqL1xuT2JzZXJ2YWJsZS5jcmVhdGUgPSAoc3Vic2NyaWJlKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKHN1YnNjcmliZSk7XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9T2JzZXJ2YWJsZS5qcy5tYXAiLCJleHBvcnQgY29uc3QgZW1wdHkgPSB7XG4gICAgY2xvc2VkOiB0cnVlLFxuICAgIG5leHQodmFsdWUpIHsgfSxcbiAgICBlcnJvcihlcnIpIHsgdGhyb3cgZXJyOyB9LFxuICAgIGNvbXBsZXRlKCkgeyB9XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9T2JzZXJ2ZXIuanMubWFwIiwiaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4vU3Vic2NyaWJlcic7XG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAaWdub3JlXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqL1xuZXhwb3J0IGNsYXNzIE91dGVyU3Vic2NyaWJlciBleHRlbmRzIFN1YnNjcmliZXIge1xuICAgIG5vdGlmeU5leHQob3V0ZXJWYWx1ZSwgaW5uZXJWYWx1ZSwgb3V0ZXJJbmRleCwgaW5uZXJJbmRleCwgaW5uZXJTdWIpIHtcbiAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5uZXh0KGlubmVyVmFsdWUpO1xuICAgIH1cbiAgICBub3RpZnlFcnJvcihlcnJvciwgaW5uZXJTdWIpIHtcbiAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5lcnJvcihlcnJvcik7XG4gICAgfVxuICAgIG5vdGlmeUNvbXBsZXRlKGlubmVyU3ViKSB7XG4gICAgICAgIHRoaXMuZGVzdGluYXRpb24uY29tcGxldGUoKTtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1PdXRlclN1YnNjcmliZXIuanMubWFwIiwiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi9TdWJzY3JpYmVyJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJy4vU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IE9iamVjdFVuc3Vic2NyaWJlZEVycm9yIH0gZnJvbSAnLi91dGlsL09iamVjdFVuc3Vic2NyaWJlZEVycm9yJztcbmltcG9ydCB7IFN1YmplY3RTdWJzY3JpcHRpb24gfSBmcm9tICcuL1N1YmplY3RTdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgJCRyeFN1YnNjcmliZXIgfSBmcm9tICcuL3N5bWJvbC9yeFN1YnNjcmliZXInO1xuLyoqXG4gKiBAY2xhc3MgU3ViamVjdFN1YnNjcmliZXI8VD5cbiAqL1xuZXhwb3J0IGNsYXNzIFN1YmplY3RTdWJzY3JpYmVyIGV4dGVuZHMgU3Vic2NyaWJlciB7XG4gICAgY29uc3RydWN0b3IoZGVzdGluYXRpb24pIHtcbiAgICAgICAgc3VwZXIoZGVzdGluYXRpb24pO1xuICAgICAgICB0aGlzLmRlc3RpbmF0aW9uID0gZGVzdGluYXRpb247XG4gICAgfVxufVxuLyoqXG4gKiBAY2xhc3MgU3ViamVjdDxUPlxuICovXG5leHBvcnQgY2xhc3MgU3ViamVjdCBleHRlbmRzIE9ic2VydmFibGUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLm9ic2VydmVycyA9IFtdO1xuICAgICAgICB0aGlzLmNsb3NlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzU3RvcHBlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmhhc0Vycm9yID0gZmFsc2U7XG4gICAgICAgIHRoaXMudGhyb3duRXJyb3IgPSBudWxsO1xuICAgIH1cbiAgICBbJCRyeFN1YnNjcmliZXJdKCkge1xuICAgICAgICByZXR1cm4gbmV3IFN1YmplY3RTdWJzY3JpYmVyKHRoaXMpO1xuICAgIH1cbiAgICBsaWZ0KG9wZXJhdG9yKSB7XG4gICAgICAgIGNvbnN0IHN1YmplY3QgPSBuZXcgQW5vbnltb3VzU3ViamVjdCh0aGlzLCB0aGlzKTtcbiAgICAgICAgc3ViamVjdC5vcGVyYXRvciA9IG9wZXJhdG9yO1xuICAgICAgICByZXR1cm4gc3ViamVjdDtcbiAgICB9XG4gICAgbmV4dCh2YWx1ZSkge1xuICAgICAgICBpZiAodGhpcy5jbG9zZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBPYmplY3RVbnN1YnNjcmliZWRFcnJvcigpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5pc1N0b3BwZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgb2JzZXJ2ZXJzIH0gPSB0aGlzO1xuICAgICAgICAgICAgY29uc3QgbGVuID0gb2JzZXJ2ZXJzLmxlbmd0aDtcbiAgICAgICAgICAgIGNvbnN0IGNvcHkgPSBvYnNlcnZlcnMuc2xpY2UoKTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb3B5W2ldLm5leHQodmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGVycm9yKGVycikge1xuICAgICAgICBpZiAodGhpcy5jbG9zZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBPYmplY3RVbnN1YnNjcmliZWRFcnJvcigpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaGFzRXJyb3IgPSB0cnVlO1xuICAgICAgICB0aGlzLnRocm93bkVycm9yID0gZXJyO1xuICAgICAgICB0aGlzLmlzU3RvcHBlZCA9IHRydWU7XG4gICAgICAgIGNvbnN0IHsgb2JzZXJ2ZXJzIH0gPSB0aGlzO1xuICAgICAgICBjb25zdCBsZW4gPSBvYnNlcnZlcnMubGVuZ3RoO1xuICAgICAgICBjb25zdCBjb3B5ID0gb2JzZXJ2ZXJzLnNsaWNlKCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGNvcHlbaV0uZXJyb3IoZXJyKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9ic2VydmVycy5sZW5ndGggPSAwO1xuICAgIH1cbiAgICBjb21wbGV0ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuY2xvc2VkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3IoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmlzU3RvcHBlZCA9IHRydWU7XG4gICAgICAgIGNvbnN0IHsgb2JzZXJ2ZXJzIH0gPSB0aGlzO1xuICAgICAgICBjb25zdCBsZW4gPSBvYnNlcnZlcnMubGVuZ3RoO1xuICAgICAgICBjb25zdCBjb3B5ID0gb2JzZXJ2ZXJzLnNsaWNlKCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGNvcHlbaV0uY29tcGxldGUoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9ic2VydmVycy5sZW5ndGggPSAwO1xuICAgIH1cbiAgICB1bnN1YnNjcmliZSgpIHtcbiAgICAgICAgdGhpcy5pc1N0b3BwZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLmNsb3NlZCA9IHRydWU7XG4gICAgICAgIHRoaXMub2JzZXJ2ZXJzID0gbnVsbDtcbiAgICB9XG4gICAgX3N1YnNjcmliZShzdWJzY3JpYmVyKSB7XG4gICAgICAgIGlmICh0aGlzLmNsb3NlZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IE9iamVjdFVuc3Vic2NyaWJlZEVycm9yKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5oYXNFcnJvcikge1xuICAgICAgICAgICAgc3Vic2NyaWJlci5lcnJvcih0aGlzLnRocm93bkVycm9yKTtcbiAgICAgICAgICAgIHJldHVybiBTdWJzY3JpcHRpb24uRU1QVFk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5pc1N0b3BwZWQpIHtcbiAgICAgICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgIHJldHVybiBTdWJzY3JpcHRpb24uRU1QVFk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm9ic2VydmVycy5wdXNoKHN1YnNjcmliZXIpO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBTdWJqZWN0U3Vic2NyaXB0aW9uKHRoaXMsIHN1YnNjcmliZXIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFzT2JzZXJ2YWJsZSgpIHtcbiAgICAgICAgY29uc3Qgb2JzZXJ2YWJsZSA9IG5ldyBPYnNlcnZhYmxlKCk7XG4gICAgICAgIG9ic2VydmFibGUuc291cmNlID0gdGhpcztcbiAgICAgICAgcmV0dXJuIG9ic2VydmFibGU7XG4gICAgfVxufVxuU3ViamVjdC5jcmVhdGUgPSAoZGVzdGluYXRpb24sIHNvdXJjZSkgPT4ge1xuICAgIHJldHVybiBuZXcgQW5vbnltb3VzU3ViamVjdChkZXN0aW5hdGlvbiwgc291cmNlKTtcbn07XG4vKipcbiAqIEBjbGFzcyBBbm9ueW1vdXNTdWJqZWN0PFQ+XG4gKi9cbmV4cG9ydCBjbGFzcyBBbm9ueW1vdXNTdWJqZWN0IGV4dGVuZHMgU3ViamVjdCB7XG4gICAgY29uc3RydWN0b3IoZGVzdGluYXRpb24sIHNvdXJjZSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmRlc3RpbmF0aW9uID0gZGVzdGluYXRpb247XG4gICAgICAgIHRoaXMuc291cmNlID0gc291cmNlO1xuICAgIH1cbiAgICBuZXh0KHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IHsgZGVzdGluYXRpb24gfSA9IHRoaXM7XG4gICAgICAgIGlmIChkZXN0aW5hdGlvbiAmJiBkZXN0aW5hdGlvbi5uZXh0KSB7XG4gICAgICAgICAgICBkZXN0aW5hdGlvbi5uZXh0KHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlcnJvcihlcnIpIHtcbiAgICAgICAgY29uc3QgeyBkZXN0aW5hdGlvbiB9ID0gdGhpcztcbiAgICAgICAgaWYgKGRlc3RpbmF0aW9uICYmIGRlc3RpbmF0aW9uLmVycm9yKSB7XG4gICAgICAgICAgICB0aGlzLmRlc3RpbmF0aW9uLmVycm9yKGVycik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29tcGxldGUoKSB7XG4gICAgICAgIGNvbnN0IHsgZGVzdGluYXRpb24gfSA9IHRoaXM7XG4gICAgICAgIGlmIChkZXN0aW5hdGlvbiAmJiBkZXN0aW5hdGlvbi5jb21wbGV0ZSkge1xuICAgICAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5jb21wbGV0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9zdWJzY3JpYmUoc3Vic2NyaWJlcikge1xuICAgICAgICBjb25zdCB7IHNvdXJjZSB9ID0gdGhpcztcbiAgICAgICAgaWYgKHNvdXJjZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc291cmNlLnN1YnNjcmliZShzdWJzY3JpYmVyKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBTdWJzY3JpcHRpb24uRU1QVFk7XG4gICAgICAgIH1cbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1TdWJqZWN0LmpzLm1hcCIsImltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJy4vU3Vic2NyaXB0aW9uJztcbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBpZ25vcmVcbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICovXG5leHBvcnQgY2xhc3MgU3ViamVjdFN1YnNjcmlwdGlvbiBleHRlbmRzIFN1YnNjcmlwdGlvbiB7XG4gICAgY29uc3RydWN0b3Ioc3ViamVjdCwgc3Vic2NyaWJlcikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnN1YmplY3QgPSBzdWJqZWN0O1xuICAgICAgICB0aGlzLnN1YnNjcmliZXIgPSBzdWJzY3JpYmVyO1xuICAgICAgICB0aGlzLmNsb3NlZCA9IGZhbHNlO1xuICAgIH1cbiAgICB1bnN1YnNjcmliZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuY2xvc2VkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jbG9zZWQgPSB0cnVlO1xuICAgICAgICBjb25zdCBzdWJqZWN0ID0gdGhpcy5zdWJqZWN0O1xuICAgICAgICBjb25zdCBvYnNlcnZlcnMgPSBzdWJqZWN0Lm9ic2VydmVycztcbiAgICAgICAgdGhpcy5zdWJqZWN0ID0gbnVsbDtcbiAgICAgICAgaWYgKCFvYnNlcnZlcnMgfHwgb2JzZXJ2ZXJzLmxlbmd0aCA9PT0gMCB8fCBzdWJqZWN0LmlzU3RvcHBlZCB8fCBzdWJqZWN0LmNsb3NlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHN1YnNjcmliZXJJbmRleCA9IG9ic2VydmVycy5pbmRleE9mKHRoaXMuc3Vic2NyaWJlcik7XG4gICAgICAgIGlmIChzdWJzY3JpYmVySW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICBvYnNlcnZlcnMuc3BsaWNlKHN1YnNjcmliZXJJbmRleCwgMSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1TdWJqZWN0U3Vic2NyaXB0aW9uLmpzLm1hcCIsImltcG9ydCB7IGlzRnVuY3Rpb24gfSBmcm9tICcuL3V0aWwvaXNGdW5jdGlvbic7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICcuL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBlbXB0eSBhcyBlbXB0eU9ic2VydmVyIH0gZnJvbSAnLi9PYnNlcnZlcic7XG5pbXBvcnQgeyAkJHJ4U3Vic2NyaWJlciB9IGZyb20gJy4vc3ltYm9sL3J4U3Vic2NyaWJlcic7XG4vKipcbiAqIEltcGxlbWVudHMgdGhlIHtAbGluayBPYnNlcnZlcn0gaW50ZXJmYWNlIGFuZCBleHRlbmRzIHRoZVxuICoge0BsaW5rIFN1YnNjcmlwdGlvbn0gY2xhc3MuIFdoaWxlIHRoZSB7QGxpbmsgT2JzZXJ2ZXJ9IGlzIHRoZSBwdWJsaWMgQVBJIGZvclxuICogY29uc3VtaW5nIHRoZSB2YWx1ZXMgb2YgYW4ge0BsaW5rIE9ic2VydmFibGV9LCBhbGwgT2JzZXJ2ZXJzIGdldCBjb252ZXJ0ZWQgdG9cbiAqIGEgU3Vic2NyaWJlciwgaW4gb3JkZXIgdG8gcHJvdmlkZSBTdWJzY3JpcHRpb24tbGlrZSBjYXBhYmlsaXRpZXMgc3VjaCBhc1xuICogYHVuc3Vic2NyaWJlYC4gU3Vic2NyaWJlciBpcyBhIGNvbW1vbiB0eXBlIGluIFJ4SlMsIGFuZCBjcnVjaWFsIGZvclxuICogaW1wbGVtZW50aW5nIG9wZXJhdG9ycywgYnV0IGl0IGlzIHJhcmVseSB1c2VkIGFzIGEgcHVibGljIEFQSS5cbiAqXG4gKiBAY2xhc3MgU3Vic2NyaWJlcjxUPlxuICovXG5leHBvcnQgY2xhc3MgU3Vic2NyaWJlciBleHRlbmRzIFN1YnNjcmlwdGlvbiB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtPYnNlcnZlcnxmdW5jdGlvbih2YWx1ZTogVCk6IHZvaWR9IFtkZXN0aW5hdGlvbk9yTmV4dF0gQSBwYXJ0aWFsbHlcbiAgICAgKiBkZWZpbmVkIE9ic2VydmVyIG9yIGEgYG5leHRgIGNhbGxiYWNrIGZ1bmN0aW9uLlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oZTogP2FueSk6IHZvaWR9IFtlcnJvcl0gVGhlIGBlcnJvcmAgY2FsbGJhY2sgb2YgYW5cbiAgICAgKiBPYnNlcnZlci5cbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKCk6IHZvaWR9IFtjb21wbGV0ZV0gVGhlIGBjb21wbGV0ZWAgY2FsbGJhY2sgb2YgYW5cbiAgICAgKiBPYnNlcnZlci5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihkZXN0aW5hdGlvbk9yTmV4dCwgZXJyb3IsIGNvbXBsZXRlKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuc3luY0Vycm9yVmFsdWUgPSBudWxsO1xuICAgICAgICB0aGlzLnN5bmNFcnJvclRocm93biA9IGZhbHNlO1xuICAgICAgICB0aGlzLnN5bmNFcnJvclRocm93YWJsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzU3RvcHBlZCA9IGZhbHNlO1xuICAgICAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICB0aGlzLmRlc3RpbmF0aW9uID0gZW1wdHlPYnNlcnZlcjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICBpZiAoIWRlc3RpbmF0aW9uT3JOZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVzdGluYXRpb24gPSBlbXB0eU9ic2VydmVyO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBkZXN0aW5hdGlvbk9yTmV4dCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRlc3RpbmF0aW9uT3JOZXh0IGluc3RhbmNlb2YgU3Vic2NyaWJlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZXN0aW5hdGlvbiA9IGRlc3RpbmF0aW9uT3JOZXh0O1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5hZGQodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN5bmNFcnJvclRocm93YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlc3RpbmF0aW9uID0gbmV3IFNhZmVTdWJzY3JpYmVyKHRoaXMsIGRlc3RpbmF0aW9uT3JOZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRoaXMuc3luY0Vycm9yVGhyb3dhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmRlc3RpbmF0aW9uID0gbmV3IFNhZmVTdWJzY3JpYmVyKHRoaXMsIGRlc3RpbmF0aW9uT3JOZXh0LCBlcnJvciwgY29tcGxldGUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIFskJHJ4U3Vic2NyaWJlcl0oKSB7IHJldHVybiB0aGlzOyB9XG4gICAgLyoqXG4gICAgICogQSBzdGF0aWMgZmFjdG9yeSBmb3IgYSBTdWJzY3JpYmVyLCBnaXZlbiBhIChwb3RlbnRpYWxseSBwYXJ0aWFsKSBkZWZpbml0aW9uXG4gICAgICogb2YgYW4gT2JzZXJ2ZXIuXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbih4OiA/VCk6IHZvaWR9IFtuZXh0XSBUaGUgYG5leHRgIGNhbGxiYWNrIG9mIGFuIE9ic2VydmVyLlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oZTogP2FueSk6IHZvaWR9IFtlcnJvcl0gVGhlIGBlcnJvcmAgY2FsbGJhY2sgb2YgYW5cbiAgICAgKiBPYnNlcnZlci5cbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKCk6IHZvaWR9IFtjb21wbGV0ZV0gVGhlIGBjb21wbGV0ZWAgY2FsbGJhY2sgb2YgYW5cbiAgICAgKiBPYnNlcnZlci5cbiAgICAgKiBAcmV0dXJuIHtTdWJzY3JpYmVyPFQ+fSBBIFN1YnNjcmliZXIgd3JhcHBpbmcgdGhlIChwYXJ0aWFsbHkgZGVmaW5lZClcbiAgICAgKiBPYnNlcnZlciByZXByZXNlbnRlZCBieSB0aGUgZ2l2ZW4gYXJndW1lbnRzLlxuICAgICAqL1xuICAgIHN0YXRpYyBjcmVhdGUobmV4dCwgZXJyb3IsIGNvbXBsZXRlKSB7XG4gICAgICAgIGNvbnN0IHN1YnNjcmliZXIgPSBuZXcgU3Vic2NyaWJlcihuZXh0LCBlcnJvciwgY29tcGxldGUpO1xuICAgICAgICBzdWJzY3JpYmVyLnN5bmNFcnJvclRocm93YWJsZSA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gc3Vic2NyaWJlcjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIHtAbGluayBPYnNlcnZlcn0gY2FsbGJhY2sgdG8gcmVjZWl2ZSBub3RpZmljYXRpb25zIG9mIHR5cGUgYG5leHRgIGZyb21cbiAgICAgKiB0aGUgT2JzZXJ2YWJsZSwgd2l0aCBhIHZhbHVlLiBUaGUgT2JzZXJ2YWJsZSBtYXkgY2FsbCB0aGlzIG1ldGhvZCAwIG9yIG1vcmVcbiAgICAgKiB0aW1lcy5cbiAgICAgKiBAcGFyYW0ge1R9IFt2YWx1ZV0gVGhlIGBuZXh0YCB2YWx1ZS5cbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIG5leHQodmFsdWUpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzU3RvcHBlZCkge1xuICAgICAgICAgICAgdGhpcy5fbmV4dCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIHtAbGluayBPYnNlcnZlcn0gY2FsbGJhY2sgdG8gcmVjZWl2ZSBub3RpZmljYXRpb25zIG9mIHR5cGUgYGVycm9yYCBmcm9tXG4gICAgICogdGhlIE9ic2VydmFibGUsIHdpdGggYW4gYXR0YWNoZWQge0BsaW5rIEVycm9yfS4gTm90aWZpZXMgdGhlIE9ic2VydmVyIHRoYXRcbiAgICAgKiB0aGUgT2JzZXJ2YWJsZSBoYXMgZXhwZXJpZW5jZWQgYW4gZXJyb3IgY29uZGl0aW9uLlxuICAgICAqIEBwYXJhbSB7YW55fSBbZXJyXSBUaGUgYGVycm9yYCBleGNlcHRpb24uXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICBlcnJvcihlcnIpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzU3RvcHBlZCkge1xuICAgICAgICAgICAgdGhpcy5pc1N0b3BwZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5fZXJyb3IoZXJyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUge0BsaW5rIE9ic2VydmVyfSBjYWxsYmFjayB0byByZWNlaXZlIGEgdmFsdWVsZXNzIG5vdGlmaWNhdGlvbiBvZiB0eXBlXG4gICAgICogYGNvbXBsZXRlYCBmcm9tIHRoZSBPYnNlcnZhYmxlLiBOb3RpZmllcyB0aGUgT2JzZXJ2ZXIgdGhhdCB0aGUgT2JzZXJ2YWJsZVxuICAgICAqIGhhcyBmaW5pc2hlZCBzZW5kaW5nIHB1c2gtYmFzZWQgbm90aWZpY2F0aW9ucy5cbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIGNvbXBsZXRlKCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNTdG9wcGVkKSB7XG4gICAgICAgICAgICB0aGlzLmlzU3RvcHBlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLl9jb21wbGV0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHVuc3Vic2NyaWJlKCkge1xuICAgICAgICBpZiAodGhpcy5jbG9zZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmlzU3RvcHBlZCA9IHRydWU7XG4gICAgICAgIHN1cGVyLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICAgIF9uZXh0KHZhbHVlKSB7XG4gICAgICAgIHRoaXMuZGVzdGluYXRpb24ubmV4dCh2YWx1ZSk7XG4gICAgfVxuICAgIF9lcnJvcihlcnIpIHtcbiAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5lcnJvcihlcnIpO1xuICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICAgIF9jb21wbGV0ZSgpIHtcbiAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5jb21wbGV0ZSgpO1xuICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxufVxuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbmNsYXNzIFNhZmVTdWJzY3JpYmVyIGV4dGVuZHMgU3Vic2NyaWJlciB7XG4gICAgY29uc3RydWN0b3IoX3BhcmVudCwgb2JzZXJ2ZXJPck5leHQsIGVycm9yLCBjb21wbGV0ZSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl9wYXJlbnQgPSBfcGFyZW50O1xuICAgICAgICBsZXQgbmV4dDtcbiAgICAgICAgbGV0IGNvbnRleHQgPSB0aGlzO1xuICAgICAgICBpZiAoaXNGdW5jdGlvbihvYnNlcnZlck9yTmV4dCkpIHtcbiAgICAgICAgICAgIG5leHQgPSBvYnNlcnZlck9yTmV4dDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChvYnNlcnZlck9yTmV4dCkge1xuICAgICAgICAgICAgY29udGV4dCA9IG9ic2VydmVyT3JOZXh0O1xuICAgICAgICAgICAgbmV4dCA9IG9ic2VydmVyT3JOZXh0Lm5leHQ7XG4gICAgICAgICAgICBlcnJvciA9IG9ic2VydmVyT3JOZXh0LmVycm9yO1xuICAgICAgICAgICAgY29tcGxldGUgPSBvYnNlcnZlck9yTmV4dC5jb21wbGV0ZTtcbiAgICAgICAgICAgIGlmIChpc0Z1bmN0aW9uKGNvbnRleHQudW5zdWJzY3JpYmUpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGQoY29udGV4dC51bnN1YnNjcmliZS5iaW5kKGNvbnRleHQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnRleHQudW5zdWJzY3JpYmUgPSB0aGlzLnVuc3Vic2NyaWJlLmJpbmQodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fY29udGV4dCA9IGNvbnRleHQ7XG4gICAgICAgIHRoaXMuX25leHQgPSBuZXh0O1xuICAgICAgICB0aGlzLl9lcnJvciA9IGVycm9yO1xuICAgICAgICB0aGlzLl9jb21wbGV0ZSA9IGNvbXBsZXRlO1xuICAgIH1cbiAgICBuZXh0KHZhbHVlKSB7XG4gICAgICAgIGlmICghdGhpcy5pc1N0b3BwZWQgJiYgdGhpcy5fbmV4dCkge1xuICAgICAgICAgICAgY29uc3QgeyBfcGFyZW50IH0gPSB0aGlzO1xuICAgICAgICAgICAgaWYgKCFfcGFyZW50LnN5bmNFcnJvclRocm93YWJsZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX190cnlPclVuc3ViKHRoaXMuX25leHQsIHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuX190cnlPclNldEVycm9yKF9wYXJlbnQsIHRoaXMuX25leHQsIHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBlcnJvcihlcnIpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzU3RvcHBlZCkge1xuICAgICAgICAgICAgY29uc3QgeyBfcGFyZW50IH0gPSB0aGlzO1xuICAgICAgICAgICAgaWYgKHRoaXMuX2Vycm9yKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFfcGFyZW50LnN5bmNFcnJvclRocm93YWJsZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9fdHJ5T3JVbnN1Yih0aGlzLl9lcnJvciwgZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fX3RyeU9yU2V0RXJyb3IoX3BhcmVudCwgdGhpcy5fZXJyb3IsIGVycik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICghX3BhcmVudC5zeW5jRXJyb3JUaHJvd2FibGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgX3BhcmVudC5zeW5jRXJyb3JWYWx1ZSA9IGVycjtcbiAgICAgICAgICAgICAgICBfcGFyZW50LnN5bmNFcnJvclRocm93biA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGNvbXBsZXRlKCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNTdG9wcGVkKSB7XG4gICAgICAgICAgICBjb25zdCB7IF9wYXJlbnQgfSA9IHRoaXM7XG4gICAgICAgICAgICBpZiAodGhpcy5fY29tcGxldGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoIV9wYXJlbnQuc3luY0Vycm9yVGhyb3dhYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX190cnlPclVuc3ViKHRoaXMuX2NvbXBsZXRlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fX3RyeU9yU2V0RXJyb3IoX3BhcmVudCwgdGhpcy5fY29tcGxldGUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIF9fdHJ5T3JVbnN1YihmbiwgdmFsdWUpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZuLmNhbGwodGhpcy5fY29udGV4dCwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBfX3RyeU9yU2V0RXJyb3IocGFyZW50LCBmbiwgdmFsdWUpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZuLmNhbGwodGhpcy5fY29udGV4dCwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHBhcmVudC5zeW5jRXJyb3JWYWx1ZSA9IGVycjtcbiAgICAgICAgICAgIHBhcmVudC5zeW5jRXJyb3JUaHJvd24gPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBfdW5zdWJzY3JpYmUoKSB7XG4gICAgICAgIGNvbnN0IHsgX3BhcmVudCB9ID0gdGhpcztcbiAgICAgICAgdGhpcy5fY29udGV4dCA9IG51bGw7XG4gICAgICAgIHRoaXMuX3BhcmVudCA9IG51bGw7XG4gICAgICAgIF9wYXJlbnQudW5zdWJzY3JpYmUoKTtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1TdWJzY3JpYmVyLmpzLm1hcCIsImltcG9ydCB7IGlzQXJyYXkgfSBmcm9tICcuL3V0aWwvaXNBcnJheSc7XG5pbXBvcnQgeyBpc09iamVjdCB9IGZyb20gJy4vdXRpbC9pc09iamVjdCc7XG5pbXBvcnQgeyBpc0Z1bmN0aW9uIH0gZnJvbSAnLi91dGlsL2lzRnVuY3Rpb24nO1xuaW1wb3J0IHsgdHJ5Q2F0Y2ggfSBmcm9tICcuL3V0aWwvdHJ5Q2F0Y2gnO1xuaW1wb3J0IHsgZXJyb3JPYmplY3QgfSBmcm9tICcuL3V0aWwvZXJyb3JPYmplY3QnO1xuaW1wb3J0IHsgVW5zdWJzY3JpcHRpb25FcnJvciB9IGZyb20gJy4vdXRpbC9VbnN1YnNjcmlwdGlvbkVycm9yJztcbi8qKlxuICogUmVwcmVzZW50cyBhIGRpc3Bvc2FibGUgcmVzb3VyY2UsIHN1Y2ggYXMgdGhlIGV4ZWN1dGlvbiBvZiBhbiBPYnNlcnZhYmxlLiBBXG4gKiBTdWJzY3JpcHRpb24gaGFzIG9uZSBpbXBvcnRhbnQgbWV0aG9kLCBgdW5zdWJzY3JpYmVgLCB0aGF0IHRha2VzIG5vIGFyZ3VtZW50XG4gKiBhbmQganVzdCBkaXNwb3NlcyB0aGUgcmVzb3VyY2UgaGVsZCBieSB0aGUgc3Vic2NyaXB0aW9uLlxuICpcbiAqIEFkZGl0aW9uYWxseSwgc3Vic2NyaXB0aW9ucyBtYXkgYmUgZ3JvdXBlZCB0b2dldGhlciB0aHJvdWdoIHRoZSBgYWRkKClgXG4gKiBtZXRob2QsIHdoaWNoIHdpbGwgYXR0YWNoIGEgY2hpbGQgU3Vic2NyaXB0aW9uIHRvIHRoZSBjdXJyZW50IFN1YnNjcmlwdGlvbi5cbiAqIFdoZW4gYSBTdWJzY3JpcHRpb24gaXMgdW5zdWJzY3JpYmVkLCBhbGwgaXRzIGNoaWxkcmVuIChhbmQgaXRzIGdyYW5kY2hpbGRyZW4pXG4gKiB3aWxsIGJlIHVuc3Vic2NyaWJlZCBhcyB3ZWxsLlxuICpcbiAqIEBjbGFzcyBTdWJzY3JpcHRpb25cbiAqL1xuZXhwb3J0IGNsYXNzIFN1YnNjcmlwdGlvbiB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbigpOiB2b2lkfSBbdW5zdWJzY3JpYmVdIEEgZnVuY3Rpb24gZGVzY3JpYmluZyBob3cgdG9cbiAgICAgKiBwZXJmb3JtIHRoZSBkaXNwb3NhbCBvZiByZXNvdXJjZXMgd2hlbiB0aGUgYHVuc3Vic2NyaWJlYCBtZXRob2QgaXMgY2FsbGVkLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHVuc3Vic2NyaWJlKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBIGZsYWcgdG8gaW5kaWNhdGUgd2hldGhlciB0aGlzIFN1YnNjcmlwdGlvbiBoYXMgYWxyZWFkeSBiZWVuIHVuc3Vic2NyaWJlZC5cbiAgICAgICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmNsb3NlZCA9IGZhbHNlO1xuICAgICAgICBpZiAodW5zdWJzY3JpYmUpIHtcbiAgICAgICAgICAgIHRoaXMuX3Vuc3Vic2NyaWJlID0gdW5zdWJzY3JpYmU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogRGlzcG9zZXMgdGhlIHJlc291cmNlcyBoZWxkIGJ5IHRoZSBzdWJzY3JpcHRpb24uIE1heSwgZm9yIGluc3RhbmNlLCBjYW5jZWxcbiAgICAgKiBhbiBvbmdvaW5nIE9ic2VydmFibGUgZXhlY3V0aW9uIG9yIGNhbmNlbCBhbnkgb3RoZXIgdHlwZSBvZiB3b3JrIHRoYXRcbiAgICAgKiBzdGFydGVkIHdoZW4gdGhlIFN1YnNjcmlwdGlvbiB3YXMgY3JlYXRlZC5cbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIHVuc3Vic2NyaWJlKCkge1xuICAgICAgICBsZXQgaGFzRXJyb3JzID0gZmFsc2U7XG4gICAgICAgIGxldCBlcnJvcnM7XG4gICAgICAgIGlmICh0aGlzLmNsb3NlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2xvc2VkID0gdHJ1ZTtcbiAgICAgICAgY29uc3QgeyBfdW5zdWJzY3JpYmUsIF9zdWJzY3JpcHRpb25zIH0gPSB0aGlzO1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb25zID0gbnVsbDtcbiAgICAgICAgaWYgKGlzRnVuY3Rpb24oX3Vuc3Vic2NyaWJlKSkge1xuICAgICAgICAgICAgbGV0IHRyaWFsID0gdHJ5Q2F0Y2goX3Vuc3Vic2NyaWJlKS5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgaWYgKHRyaWFsID09PSBlcnJvck9iamVjdCkge1xuICAgICAgICAgICAgICAgIGhhc0Vycm9ycyA9IHRydWU7XG4gICAgICAgICAgICAgICAgKGVycm9ycyA9IGVycm9ycyB8fCBbXSkucHVzaChlcnJvck9iamVjdC5lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNBcnJheShfc3Vic2NyaXB0aW9ucykpIHtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IC0xO1xuICAgICAgICAgICAgY29uc3QgbGVuID0gX3N1YnNjcmlwdGlvbnMubGVuZ3RoO1xuICAgICAgICAgICAgd2hpbGUgKCsraW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzdWIgPSBfc3Vic2NyaXB0aW9uc1tpbmRleF07XG4gICAgICAgICAgICAgICAgaWYgKGlzT2JqZWN0KHN1YikpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRyaWFsID0gdHJ5Q2F0Y2goc3ViLnVuc3Vic2NyaWJlKS5jYWxsKHN1Yik7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0cmlhbCA9PT0gZXJyb3JPYmplY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhc0Vycm9ycyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvcnMgPSBlcnJvcnMgfHwgW107XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZXJyID0gZXJyb3JPYmplY3QuZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnIgaW5zdGFuY2VvZiBVbnN1YnNjcmlwdGlvbkVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JzID0gZXJyb3JzLmNvbmNhdChlcnIuZXJyb3JzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9ycy5wdXNoKGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGhhc0Vycm9ycykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFVuc3Vic2NyaXB0aW9uRXJyb3IoZXJyb3JzKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgdGVhciBkb3duIHRvIGJlIGNhbGxlZCBkdXJpbmcgdGhlIHVuc3Vic2NyaWJlKCkgb2YgdGhpc1xuICAgICAqIFN1YnNjcmlwdGlvbi5cbiAgICAgKlxuICAgICAqIElmIHRoZSB0ZWFyIGRvd24gYmVpbmcgYWRkZWQgaXMgYSBzdWJzY3JpcHRpb24gdGhhdCBpcyBhbHJlYWR5XG4gICAgICogdW5zdWJzY3JpYmVkLCBpcyB0aGUgc2FtZSByZWZlcmVuY2UgYGFkZGAgaXMgYmVpbmcgY2FsbGVkIG9uLCBvciBpc1xuICAgICAqIGBTdWJzY3JpcHRpb24uRU1QVFlgLCBpdCB3aWxsIG5vdCBiZSBhZGRlZC5cbiAgICAgKlxuICAgICAqIElmIHRoaXMgc3Vic2NyaXB0aW9uIGlzIGFscmVhZHkgaW4gYW4gYGNsb3NlZGAgc3RhdGUsIHRoZSBwYXNzZWRcbiAgICAgKiB0ZWFyIGRvd24gbG9naWMgd2lsbCBiZSBleGVjdXRlZCBpbW1lZGlhdGVseS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7VGVhcmRvd25Mb2dpY30gdGVhcmRvd24gVGhlIGFkZGl0aW9uYWwgbG9naWMgdG8gZXhlY3V0ZSBvblxuICAgICAqIHRlYXJkb3duLlxuICAgICAqIEByZXR1cm4ge1N1YnNjcmlwdGlvbn0gUmV0dXJucyB0aGUgU3Vic2NyaXB0aW9uIHVzZWQgb3IgY3JlYXRlZCB0byBiZVxuICAgICAqIGFkZGVkIHRvIHRoZSBpbm5lciBzdWJzY3JpcHRpb25zIGxpc3QuIFRoaXMgU3Vic2NyaXB0aW9uIGNhbiBiZSB1c2VkIHdpdGhcbiAgICAgKiBgcmVtb3ZlKClgIHRvIHJlbW92ZSB0aGUgcGFzc2VkIHRlYXJkb3duIGxvZ2ljIGZyb20gdGhlIGlubmVyIHN1YnNjcmlwdGlvbnNcbiAgICAgKiBsaXN0LlxuICAgICAqL1xuICAgIGFkZCh0ZWFyZG93bikge1xuICAgICAgICBpZiAoIXRlYXJkb3duIHx8ICh0ZWFyZG93biA9PT0gU3Vic2NyaXB0aW9uLkVNUFRZKSkge1xuICAgICAgICAgICAgcmV0dXJuIFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGVhcmRvd24gPT09IHRoaXMpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIGxldCBzdWIgPSB0ZWFyZG93bjtcbiAgICAgICAgc3dpdGNoICh0eXBlb2YgdGVhcmRvd24pIHtcbiAgICAgICAgICAgIGNhc2UgJ2Z1bmN0aW9uJzpcbiAgICAgICAgICAgICAgICBzdWIgPSBuZXcgU3Vic2NyaXB0aW9uKHRlYXJkb3duKTtcbiAgICAgICAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgICAgICAgICAgaWYgKHN1Yi5jbG9zZWQgfHwgdHlwZW9mIHN1Yi51bnN1YnNjcmliZSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5jbG9zZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgc3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAodGhpcy5fc3Vic2NyaXB0aW9ucyB8fCAodGhpcy5fc3Vic2NyaXB0aW9ucyA9IFtdKSkucHVzaChzdWIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bnJlY29nbml6ZWQgdGVhcmRvd24gJyArIHRlYXJkb3duICsgJyBhZGRlZCB0byBTdWJzY3JpcHRpb24uJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN1YjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhIFN1YnNjcmlwdGlvbiBmcm9tIHRoZSBpbnRlcm5hbCBsaXN0IG9mIHN1YnNjcmlwdGlvbnMgdGhhdCB3aWxsXG4gICAgICogdW5zdWJzY3JpYmUgZHVyaW5nIHRoZSB1bnN1YnNjcmliZSBwcm9jZXNzIG9mIHRoaXMgU3Vic2NyaXB0aW9uLlxuICAgICAqIEBwYXJhbSB7U3Vic2NyaXB0aW9ufSBzdWJzY3JpcHRpb24gVGhlIHN1YnNjcmlwdGlvbiB0byByZW1vdmUuXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICByZW1vdmUoc3Vic2NyaXB0aW9uKSB7XG4gICAgICAgIC8vIEhBQ0s6IFRoaXMgbWlnaHQgYmUgcmVkdW5kYW50IGJlY2F1c2Ugb2YgdGhlIGxvZ2ljIGluIGBhZGQoKWBcbiAgICAgICAgaWYgKHN1YnNjcmlwdGlvbiA9PSBudWxsIHx8IChzdWJzY3JpcHRpb24gPT09IHRoaXMpIHx8IChzdWJzY3JpcHRpb24gPT09IFN1YnNjcmlwdGlvbi5FTVBUWSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzdWJzY3JpcHRpb25zID0gdGhpcy5fc3Vic2NyaXB0aW9ucztcbiAgICAgICAgaWYgKHN1YnNjcmlwdGlvbnMpIHtcbiAgICAgICAgICAgIGNvbnN0IHN1YnNjcmlwdGlvbkluZGV4ID0gc3Vic2NyaXB0aW9ucy5pbmRleE9mKHN1YnNjcmlwdGlvbik7XG4gICAgICAgICAgICBpZiAoc3Vic2NyaXB0aW9uSW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgc3Vic2NyaXB0aW9ucy5zcGxpY2Uoc3Vic2NyaXB0aW9uSW5kZXgsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuU3Vic2NyaXB0aW9uLkVNUFRZID0gKGZ1bmN0aW9uIChlbXB0eSkge1xuICAgIGVtcHR5LmNsb3NlZCA9IHRydWU7XG4gICAgcmV0dXJuIGVtcHR5O1xufShuZXcgU3Vic2NyaXB0aW9uKCkpKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVN1YnNjcmlwdGlvbi5qcy5tYXAiLCJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vLi4vLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBhamF4IGFzIHN0YXRpY0FqYXggfSBmcm9tICcuLi8uLi8uLi9vYnNlcnZhYmxlL2RvbS9hamF4Jztcbk9ic2VydmFibGUuYWpheCA9IHN0YXRpY0FqYXg7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hamF4LmpzLm1hcCIsImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi8uLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IGVtcHR5IGFzIHN0YXRpY0VtcHR5IH0gZnJvbSAnLi4vLi4vb2JzZXJ2YWJsZS9lbXB0eSc7XG5PYnNlcnZhYmxlLmVtcHR5ID0gc3RhdGljRW1wdHk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1lbXB0eS5qcy5tYXAiLCJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBmcm9tRXZlbnQgYXMgc3RhdGljRnJvbUV2ZW50IH0gZnJvbSAnLi4vLi4vb2JzZXJ2YWJsZS9mcm9tRXZlbnQnO1xuT2JzZXJ2YWJsZS5mcm9tRXZlbnQgPSBzdGF0aWNGcm9tRXZlbnQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1mcm9tRXZlbnQuanMubWFwIiwiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uLy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgbWVyZ2UgYXMgbWVyZ2VTdGF0aWMgfSBmcm9tICcuLi8uLi9vYnNlcnZhYmxlL21lcmdlJztcbk9ic2VydmFibGUubWVyZ2UgPSBtZXJnZVN0YXRpYztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1lcmdlLmpzLm1hcCIsImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi8uLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IG9mIGFzIHN0YXRpY09mIH0gZnJvbSAnLi4vLi4vb2JzZXJ2YWJsZS9vZic7XG5PYnNlcnZhYmxlLm9mID0gc3RhdGljT2Y7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1vZi5qcy5tYXAiLCJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBfY2F0Y2ggfSBmcm9tICcuLi8uLi9vcGVyYXRvci9jYXRjaCc7XG5PYnNlcnZhYmxlLnByb3RvdHlwZS5jYXRjaCA9IF9jYXRjaDtcbk9ic2VydmFibGUucHJvdG90eXBlLl9jYXRjaCA9IF9jYXRjaDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNhdGNoLmpzLm1hcCIsImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi8uLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IF9kbyB9IGZyb20gJy4uLy4uL29wZXJhdG9yL2RvJztcbk9ic2VydmFibGUucHJvdG90eXBlLmRvID0gX2RvO1xuT2JzZXJ2YWJsZS5wcm90b3R5cGUuX2RvID0gX2RvO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZG8uanMubWFwIiwiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uLy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAnLi4vLi4vb3BlcmF0b3IvZmlsdGVyJztcbk9ic2VydmFibGUucHJvdG90eXBlLmZpbHRlciA9IGZpbHRlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWZpbHRlci5qcy5tYXAiLCJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICcuLi8uLi9vcGVyYXRvci9tYXAnO1xuT2JzZXJ2YWJsZS5wcm90b3R5cGUubWFwID0gbWFwO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwLmpzLm1hcCIsImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi8uLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IG1lcmdlQWxsIH0gZnJvbSAnLi4vLi4vb3BlcmF0b3IvbWVyZ2VBbGwnO1xuT2JzZXJ2YWJsZS5wcm90b3R5cGUubWVyZ2VBbGwgPSBtZXJnZUFsbDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1lcmdlQWxsLmpzLm1hcCIsImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi8uLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IHJldHJ5IH0gZnJvbSAnLi4vLi4vb3BlcmF0b3IvcmV0cnknO1xuT2JzZXJ2YWJsZS5wcm90b3R5cGUucmV0cnkgPSByZXRyeTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJldHJ5LmpzLm1hcCIsImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi8uLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IF9zd2l0Y2ggfSBmcm9tICcuLi8uLi9vcGVyYXRvci9zd2l0Y2gnO1xuT2JzZXJ2YWJsZS5wcm90b3R5cGUuc3dpdGNoID0gX3N3aXRjaDtcbk9ic2VydmFibGUucHJvdG90eXBlLl9zd2l0Y2ggPSBfc3dpdGNoO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c3dpdGNoLmpzLm1hcCIsImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi8uLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IHN3aXRjaE1hcCB9IGZyb20gJy4uLy4uL29wZXJhdG9yL3N3aXRjaE1hcCc7XG5PYnNlcnZhYmxlLnByb3RvdHlwZS5zd2l0Y2hNYXAgPSBzd2l0Y2hNYXA7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zd2l0Y2hNYXAuanMubWFwIiwiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgU2NhbGFyT2JzZXJ2YWJsZSB9IGZyb20gJy4vU2NhbGFyT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBFbXB0eU9ic2VydmFibGUgfSBmcm9tICcuL0VtcHR5T2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBpc1NjaGVkdWxlciB9IGZyb20gJy4uL3V0aWwvaXNTY2hlZHVsZXInO1xuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKiBAaGlkZSB0cnVlXG4gKi9cbmV4cG9ydCBjbGFzcyBBcnJheU9ic2VydmFibGUgZXh0ZW5kcyBPYnNlcnZhYmxlIHtcbiAgICBjb25zdHJ1Y3RvcihhcnJheSwgc2NoZWR1bGVyKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZXIgPSBzY2hlZHVsZXI7XG4gICAgICAgIGlmICghc2NoZWR1bGVyICYmIGFycmF5Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgdGhpcy5faXNTY2FsYXIgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IGFycmF5WzBdO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyBjcmVhdGUoYXJyYXksIHNjaGVkdWxlcikge1xuICAgICAgICByZXR1cm4gbmV3IEFycmF5T2JzZXJ2YWJsZShhcnJheSwgc2NoZWR1bGVyKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgc29tZSB2YWx1ZXMgeW91IHNwZWNpZnkgYXMgYXJndW1lbnRzLFxuICAgICAqIGltbWVkaWF0ZWx5IG9uZSBhZnRlciB0aGUgb3RoZXIsIGFuZCB0aGVuIGVtaXRzIGEgY29tcGxldGUgbm90aWZpY2F0aW9uLlxuICAgICAqXG4gICAgICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPkVtaXRzIHRoZSBhcmd1bWVudHMgeW91IHByb3ZpZGUsIHRoZW4gY29tcGxldGVzLlxuICAgICAqIDwvc3Bhbj5cbiAgICAgKlxuICAgICAqIDxpbWcgc3JjPVwiLi9pbWcvb2YucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gICAgICpcbiAgICAgKiBUaGlzIHN0YXRpYyBvcGVyYXRvciBpcyB1c2VmdWwgZm9yIGNyZWF0aW5nIGEgc2ltcGxlIE9ic2VydmFibGUgdGhhdCBvbmx5XG4gICAgICogZW1pdHMgdGhlIGFyZ3VtZW50cyBnaXZlbiwgYW5kIHRoZSBjb21wbGV0ZSBub3RpZmljYXRpb24gdGhlcmVhZnRlci4gSXQgY2FuXG4gICAgICogYmUgdXNlZCBmb3IgY29tcG9zaW5nIHdpdGggb3RoZXIgT2JzZXJ2YWJsZXMsIHN1Y2ggYXMgd2l0aCB7QGxpbmsgY29uY2F0fS5cbiAgICAgKiBCeSBkZWZhdWx0LCBpdCB1c2VzIGEgYG51bGxgIFNjaGVkdWxlciwgd2hpY2ggbWVhbnMgdGhlIGBuZXh0YFxuICAgICAqIG5vdGlmaWNhdGlvbnMgYXJlIHNlbnQgc3luY2hyb25vdXNseSwgYWx0aG91Z2ggd2l0aCBhIGRpZmZlcmVudCBTY2hlZHVsZXJcbiAgICAgKiBpdCBpcyBwb3NzaWJsZSB0byBkZXRlcm1pbmUgd2hlbiB0aG9zZSBub3RpZmljYXRpb25zIHdpbGwgYmUgZGVsaXZlcmVkLlxuICAgICAqXG4gICAgICogQGV4YW1wbGUgPGNhcHRpb24+RW1pdCAxMCwgMjAsIDMwLCB0aGVuICdhJywgJ2InLCAnYycsIHRoZW4gc3RhcnQgdGlja2luZyBldmVyeSBzZWNvbmQuPC9jYXB0aW9uPlxuICAgICAqIHZhciBudW1iZXJzID0gUnguT2JzZXJ2YWJsZS5vZigxMCwgMjAsIDMwKTtcbiAgICAgKiB2YXIgbGV0dGVycyA9IFJ4Lk9ic2VydmFibGUub2YoJ2EnLCAnYicsICdjJyk7XG4gICAgICogdmFyIGludGVydmFsID0gUnguT2JzZXJ2YWJsZS5pbnRlcnZhbCgxMDAwKTtcbiAgICAgKiB2YXIgcmVzdWx0ID0gbnVtYmVycy5jb25jYXQobGV0dGVycykuY29uY2F0KGludGVydmFsKTtcbiAgICAgKiByZXN1bHQuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICAgICAqXG4gICAgICogQHNlZSB7QGxpbmsgY3JlYXRlfVxuICAgICAqIEBzZWUge0BsaW5rIGVtcHR5fVxuICAgICAqIEBzZWUge0BsaW5rIG5ldmVyfVxuICAgICAqIEBzZWUge0BsaW5rIHRocm93fVxuICAgICAqXG4gICAgICogQHBhcmFtIHsuLi5UfSB2YWx1ZXMgQXJndW1lbnRzIHRoYXQgcmVwcmVzZW50IGBuZXh0YCB2YWx1ZXMgdG8gYmUgZW1pdHRlZC5cbiAgICAgKiBAcGFyYW0ge1NjaGVkdWxlcn0gW3NjaGVkdWxlcl0gQSB7QGxpbmsgU2NoZWR1bGVyfSB0byB1c2UgZm9yIHNjaGVkdWxpbmdcbiAgICAgKiB0aGUgZW1pc3Npb25zIG9mIHRoZSBgbmV4dGAgbm90aWZpY2F0aW9ucy5cbiAgICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFQ+fSBBbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgZWFjaCBnaXZlbiBpbnB1dCB2YWx1ZS5cbiAgICAgKiBAc3RhdGljIHRydWVcbiAgICAgKiBAbmFtZSBvZlxuICAgICAqIEBvd25lciBPYnNlcnZhYmxlXG4gICAgICovXG4gICAgc3RhdGljIG9mKC4uLmFycmF5KSB7XG4gICAgICAgIGxldCBzY2hlZHVsZXIgPSBhcnJheVthcnJheS5sZW5ndGggLSAxXTtcbiAgICAgICAgaWYgKGlzU2NoZWR1bGVyKHNjaGVkdWxlcikpIHtcbiAgICAgICAgICAgIGFycmF5LnBvcCgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc2NoZWR1bGVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBsZW4gPSBhcnJheS5sZW5ndGg7XG4gICAgICAgIGlmIChsZW4gPiAxKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEFycmF5T2JzZXJ2YWJsZShhcnJheSwgc2NoZWR1bGVyKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChsZW4gPT09IDEpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgU2NhbGFyT2JzZXJ2YWJsZShhcnJheVswXSwgc2NoZWR1bGVyKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRW1wdHlPYnNlcnZhYmxlKHNjaGVkdWxlcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIGRpc3BhdGNoKHN0YXRlKSB7XG4gICAgICAgIGNvbnN0IHsgYXJyYXksIGluZGV4LCBjb3VudCwgc3Vic2NyaWJlciB9ID0gc3RhdGU7XG4gICAgICAgIGlmIChpbmRleCA+PSBjb3VudCkge1xuICAgICAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHN1YnNjcmliZXIubmV4dChhcnJheVtpbmRleF0pO1xuICAgICAgICBpZiAoc3Vic2NyaWJlci5jbG9zZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzdGF0ZS5pbmRleCA9IGluZGV4ICsgMTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZShzdGF0ZSk7XG4gICAgfVxuICAgIF9zdWJzY3JpYmUoc3Vic2NyaWJlcikge1xuICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICBjb25zdCBhcnJheSA9IHRoaXMuYXJyYXk7XG4gICAgICAgIGNvbnN0IGNvdW50ID0gYXJyYXkubGVuZ3RoO1xuICAgICAgICBjb25zdCBzY2hlZHVsZXIgPSB0aGlzLnNjaGVkdWxlcjtcbiAgICAgICAgaWYgKHNjaGVkdWxlcikge1xuICAgICAgICAgICAgcmV0dXJuIHNjaGVkdWxlci5zY2hlZHVsZShBcnJheU9ic2VydmFibGUuZGlzcGF0Y2gsIDAsIHtcbiAgICAgICAgICAgICAgICBhcnJheSwgaW5kZXgsIGNvdW50LCBzdWJzY3JpYmVyXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQgJiYgIXN1YnNjcmliZXIuY2xvc2VkOyBpKyspIHtcbiAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLm5leHQoYXJyYXlbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICB9XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9QXJyYXlPYnNlcnZhYmxlLmpzLm1hcCIsImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICogQGhpZGUgdHJ1ZVxuICovXG5leHBvcnQgY2xhc3MgRW1wdHlPYnNlcnZhYmxlIGV4dGVuZHMgT2JzZXJ2YWJsZSB7XG4gICAgY29uc3RydWN0b3Ioc2NoZWR1bGVyKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVyID0gc2NoZWR1bGVyO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIE9ic2VydmFibGUgdGhhdCBlbWl0cyBubyBpdGVtcyB0byB0aGUgT2JzZXJ2ZXIgYW5kIGltbWVkaWF0ZWx5XG4gICAgICogZW1pdHMgYSBjb21wbGV0ZSBub3RpZmljYXRpb24uXG4gICAgICpcbiAgICAgKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+SnVzdCBlbWl0cyAnY29tcGxldGUnLCBhbmQgbm90aGluZyBlbHNlLlxuICAgICAqIDwvc3Bhbj5cbiAgICAgKlxuICAgICAqIDxpbWcgc3JjPVwiLi9pbWcvZW1wdHkucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gICAgICpcbiAgICAgKiBUaGlzIHN0YXRpYyBvcGVyYXRvciBpcyB1c2VmdWwgZm9yIGNyZWF0aW5nIGEgc2ltcGxlIE9ic2VydmFibGUgdGhhdCBvbmx5XG4gICAgICogZW1pdHMgdGhlIGNvbXBsZXRlIG5vdGlmaWNhdGlvbi4gSXQgY2FuIGJlIHVzZWQgZm9yIGNvbXBvc2luZyB3aXRoIG90aGVyXG4gICAgICogT2JzZXJ2YWJsZXMsIHN1Y2ggYXMgaW4gYSB7QGxpbmsgbWVyZ2VNYXB9LlxuICAgICAqXG4gICAgICogQGV4YW1wbGUgPGNhcHRpb24+RW1pdCB0aGUgbnVtYmVyIDcsIHRoZW4gY29tcGxldGUuPC9jYXB0aW9uPlxuICAgICAqIHZhciByZXN1bHQgPSBSeC5PYnNlcnZhYmxlLmVtcHR5KCkuc3RhcnRXaXRoKDcpO1xuICAgICAqIHJlc3VsdC5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gICAgICpcbiAgICAgKiBAZXhhbXBsZSA8Y2FwdGlvbj5NYXAgYW5kIGZsYXR0ZW4gb25seSBvZGQgbnVtYmVycyB0byB0aGUgc2VxdWVuY2UgJ2EnLCAnYicsICdjJzwvY2FwdGlvbj5cbiAgICAgKiB2YXIgaW50ZXJ2YWwgPSBSeC5PYnNlcnZhYmxlLmludGVydmFsKDEwMDApO1xuICAgICAqIHZhciByZXN1bHQgPSBpbnRlcnZhbC5tZXJnZU1hcCh4ID0+XG4gICAgICogICB4ICUgMiA9PT0gMSA/IFJ4Lk9ic2VydmFibGUub2YoJ2EnLCAnYicsICdjJykgOiBSeC5PYnNlcnZhYmxlLmVtcHR5KClcbiAgICAgKiApO1xuICAgICAqIHJlc3VsdC5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gICAgICpcbiAgICAgKiBAc2VlIHtAbGluayBjcmVhdGV9XG4gICAgICogQHNlZSB7QGxpbmsgbmV2ZXJ9XG4gICAgICogQHNlZSB7QGxpbmsgb2Z9XG4gICAgICogQHNlZSB7QGxpbmsgdGhyb3d9XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1NjaGVkdWxlcn0gW3NjaGVkdWxlcl0gQSB7QGxpbmsgU2NoZWR1bGVyfSB0byB1c2UgZm9yIHNjaGVkdWxpbmdcbiAgICAgKiB0aGUgZW1pc3Npb24gb2YgdGhlIGNvbXBsZXRlIG5vdGlmaWNhdGlvbi5cbiAgICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSBBbiBcImVtcHR5XCIgT2JzZXJ2YWJsZTogZW1pdHMgb25seSB0aGUgY29tcGxldGVcbiAgICAgKiBub3RpZmljYXRpb24uXG4gICAgICogQHN0YXRpYyB0cnVlXG4gICAgICogQG5hbWUgZW1wdHlcbiAgICAgKiBAb3duZXIgT2JzZXJ2YWJsZVxuICAgICAqL1xuICAgIHN0YXRpYyBjcmVhdGUoc2NoZWR1bGVyKSB7XG4gICAgICAgIHJldHVybiBuZXcgRW1wdHlPYnNlcnZhYmxlKHNjaGVkdWxlcik7XG4gICAgfVxuICAgIHN0YXRpYyBkaXNwYXRjaChhcmcpIHtcbiAgICAgICAgY29uc3QgeyBzdWJzY3JpYmVyIH0gPSBhcmc7XG4gICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICB9XG4gICAgX3N1YnNjcmliZShzdWJzY3JpYmVyKSB7XG4gICAgICAgIGNvbnN0IHNjaGVkdWxlciA9IHRoaXMuc2NoZWR1bGVyO1xuICAgICAgICBpZiAoc2NoZWR1bGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gc2NoZWR1bGVyLnNjaGVkdWxlKEVtcHR5T2JzZXJ2YWJsZS5kaXNwYXRjaCwgMCwgeyBzdWJzY3JpYmVyIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICB9XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9RW1wdHlPYnNlcnZhYmxlLmpzLm1hcCIsImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IHRyeUNhdGNoIH0gZnJvbSAnLi4vdXRpbC90cnlDYXRjaCc7XG5pbXBvcnQgeyBpc0Z1bmN0aW9uIH0gZnJvbSAnLi4vdXRpbC9pc0Z1bmN0aW9uJztcbmltcG9ydCB7IGVycm9yT2JqZWN0IH0gZnJvbSAnLi4vdXRpbC9lcnJvck9iamVjdCc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICcuLi9TdWJzY3JpcHRpb24nO1xuZnVuY3Rpb24gaXNOb2RlU3R5bGVFdmVudEVtbWl0dGVyKHNvdXJjZU9iaikge1xuICAgIHJldHVybiAhIXNvdXJjZU9iaiAmJiB0eXBlb2Ygc291cmNlT2JqLmFkZExpc3RlbmVyID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBzb3VyY2VPYmoucmVtb3ZlTGlzdGVuZXIgPT09ICdmdW5jdGlvbic7XG59XG5mdW5jdGlvbiBpc0pRdWVyeVN0eWxlRXZlbnRFbWl0dGVyKHNvdXJjZU9iaikge1xuICAgIHJldHVybiAhIXNvdXJjZU9iaiAmJiB0eXBlb2Ygc291cmNlT2JqLm9uID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBzb3VyY2VPYmoub2ZmID09PSAnZnVuY3Rpb24nO1xufVxuZnVuY3Rpb24gaXNOb2RlTGlzdChzb3VyY2VPYmopIHtcbiAgICByZXR1cm4gISFzb3VyY2VPYmogJiYgc291cmNlT2JqLnRvU3RyaW5nKCkgPT09ICdbb2JqZWN0IE5vZGVMaXN0XSc7XG59XG5mdW5jdGlvbiBpc0hUTUxDb2xsZWN0aW9uKHNvdXJjZU9iaikge1xuICAgIHJldHVybiAhIXNvdXJjZU9iaiAmJiBzb3VyY2VPYmoudG9TdHJpbmcoKSA9PT0gJ1tvYmplY3QgSFRNTENvbGxlY3Rpb25dJztcbn1cbmZ1bmN0aW9uIGlzRXZlbnRUYXJnZXQoc291cmNlT2JqKSB7XG4gICAgcmV0dXJuICEhc291cmNlT2JqICYmIHR5cGVvZiBzb3VyY2VPYmouYWRkRXZlbnRMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2Ygc291cmNlT2JqLnJlbW92ZUV2ZW50TGlzdGVuZXIgPT09ICdmdW5jdGlvbic7XG59XG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqIEBoaWRlIHRydWVcbiAqL1xuZXhwb3J0IGNsYXNzIEZyb21FdmVudE9ic2VydmFibGUgZXh0ZW5kcyBPYnNlcnZhYmxlIHtcbiAgICBjb25zdHJ1Y3Rvcihzb3VyY2VPYmosIGV2ZW50TmFtZSwgc2VsZWN0b3IsIG9wdGlvbnMpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5zb3VyY2VPYmogPSBzb3VyY2VPYmo7XG4gICAgICAgIHRoaXMuZXZlbnROYW1lID0gZXZlbnROYW1lO1xuICAgICAgICB0aGlzLnNlbGVjdG9yID0gc2VsZWN0b3I7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgfVxuICAgIC8qIHRzbGludDplbmFibGU6bWF4LWxpbmUtbGVuZ3RoICovXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgZXZlbnRzIG9mIGEgc3BlY2lmaWMgdHlwZSBjb21pbmcgZnJvbSB0aGVcbiAgICAgKiBnaXZlbiBldmVudCB0YXJnZXQuXG4gICAgICpcbiAgICAgKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+Q3JlYXRlcyBhbiBPYnNlcnZhYmxlIGZyb20gRE9NIGV2ZW50cywgb3IgTm9kZVxuICAgICAqIEV2ZW50RW1pdHRlciBldmVudHMgb3Igb3RoZXJzLjwvc3Bhbj5cbiAgICAgKlxuICAgICAqIDxpbWcgc3JjPVwiLi9pbWcvZnJvbUV2ZW50LnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICAgICAqXG4gICAgICogQ3JlYXRlcyBhbiBPYnNlcnZhYmxlIGJ5IGF0dGFjaGluZyBhbiBldmVudCBsaXN0ZW5lciB0byBhbiBcImV2ZW50IHRhcmdldFwiLFxuICAgICAqIHdoaWNoIG1heSBiZSBhbiBvYmplY3Qgd2l0aCBgYWRkRXZlbnRMaXN0ZW5lcmAgYW5kIGByZW1vdmVFdmVudExpc3RlbmVyYCxcbiAgICAgKiBhIE5vZGUuanMgRXZlbnRFbWl0dGVyLCBhIGpRdWVyeSBzdHlsZSBFdmVudEVtaXR0ZXIsIGEgTm9kZUxpc3QgZnJvbSB0aGVcbiAgICAgKiBET00sIG9yIGFuIEhUTUxDb2xsZWN0aW9uIGZyb20gdGhlIERPTS4gVGhlIGV2ZW50IGhhbmRsZXIgaXMgYXR0YWNoZWQgd2hlblxuICAgICAqIHRoZSBvdXRwdXQgT2JzZXJ2YWJsZSBpcyBzdWJzY3JpYmVkLCBhbmQgcmVtb3ZlZCB3aGVuIHRoZSBTdWJzY3JpcHRpb24gaXNcbiAgICAgKiB1bnN1YnNjcmliZWQuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZSA8Y2FwdGlvbj5FbWl0cyBjbGlja3MgaGFwcGVuaW5nIG9uIHRoZSBET00gZG9jdW1lbnQ8L2NhcHRpb24+XG4gICAgICogdmFyIGNsaWNrcyA9IFJ4Lk9ic2VydmFibGUuZnJvbUV2ZW50KGRvY3VtZW50LCAnY2xpY2snKTtcbiAgICAgKiBjbGlja3Muc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICAgICAqXG4gICAgICogQHNlZSB7QGxpbmsgZnJvbX1cbiAgICAgKiBAc2VlIHtAbGluayBmcm9tRXZlbnRQYXR0ZXJufVxuICAgICAqXG4gICAgICogQHBhcmFtIHtFdmVudFRhcmdldExpa2V9IHRhcmdldCBUaGUgRE9NRWxlbWVudCwgZXZlbnQgdGFyZ2V0LCBOb2RlLmpzXG4gICAgICogRXZlbnRFbWl0dGVyLCBOb2RlTGlzdCBvciBIVE1MQ29sbGVjdGlvbiB0byBhdHRhY2ggdGhlIGV2ZW50IGhhbmRsZXIgdG8uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50TmFtZSBUaGUgZXZlbnQgbmFtZSBvZiBpbnRlcmVzdCwgYmVpbmcgZW1pdHRlZCBieSB0aGVcbiAgICAgKiBgdGFyZ2V0YC5cbiAgICAgKiBAcGFybSB7RXZlbnRMaXN0ZW5lck9wdGlvbnN9IFtvcHRpb25zXSBPcHRpb25zIHRvIHBhc3MgdGhyb3VnaCB0byBhZGRFdmVudExpc3RlbmVyXG4gICAgICogQHBhcmFtIHtTZWxlY3Rvck1ldGhvZFNpZ25hdHVyZTxUPn0gW3NlbGVjdG9yXSBBbiBvcHRpb25hbCBmdW5jdGlvbiB0b1xuICAgICAqIHBvc3QtcHJvY2VzcyByZXN1bHRzLiBJdCB0YWtlcyB0aGUgYXJndW1lbnRzIGZyb20gdGhlIGV2ZW50IGhhbmRsZXIgYW5kXG4gICAgICogc2hvdWxkIHJldHVybiBhIHNpbmdsZSB2YWx1ZS5cbiAgICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFQ+fVxuICAgICAqIEBzdGF0aWMgdHJ1ZVxuICAgICAqIEBuYW1lIGZyb21FdmVudFxuICAgICAqIEBvd25lciBPYnNlcnZhYmxlXG4gICAgICovXG4gICAgc3RhdGljIGNyZWF0ZSh0YXJnZXQsIGV2ZW50TmFtZSwgb3B0aW9ucywgc2VsZWN0b3IpIHtcbiAgICAgICAgaWYgKGlzRnVuY3Rpb24ob3B0aW9ucykpIHtcbiAgICAgICAgICAgIHNlbGVjdG9yID0gb3B0aW9ucztcbiAgICAgICAgICAgIG9wdGlvbnMgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBGcm9tRXZlbnRPYnNlcnZhYmxlKHRhcmdldCwgZXZlbnROYW1lLCBzZWxlY3Rvciwgb3B0aW9ucyk7XG4gICAgfVxuICAgIHN0YXRpYyBzZXR1cFN1YnNjcmlwdGlvbihzb3VyY2VPYmosIGV2ZW50TmFtZSwgaGFuZGxlciwgc3Vic2NyaWJlciwgb3B0aW9ucykge1xuICAgICAgICBsZXQgdW5zdWJzY3JpYmU7XG4gICAgICAgIGlmIChpc05vZGVMaXN0KHNvdXJjZU9iaikgfHwgaXNIVE1MQ29sbGVjdGlvbihzb3VyY2VPYmopKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gc291cmNlT2JqLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgRnJvbUV2ZW50T2JzZXJ2YWJsZS5zZXR1cFN1YnNjcmlwdGlvbihzb3VyY2VPYmpbaV0sIGV2ZW50TmFtZSwgaGFuZGxlciwgc3Vic2NyaWJlciwgb3B0aW9ucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaXNFdmVudFRhcmdldChzb3VyY2VPYmopKSB7XG4gICAgICAgICAgICBjb25zdCBzb3VyY2UgPSBzb3VyY2VPYmo7XG4gICAgICAgICAgICBzb3VyY2VPYmouYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGhhbmRsZXIsIG9wdGlvbnMpO1xuICAgICAgICAgICAgdW5zdWJzY3JpYmUgPSAoKSA9PiBzb3VyY2UucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGhhbmRsZXIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGlzSlF1ZXJ5U3R5bGVFdmVudEVtaXR0ZXIoc291cmNlT2JqKSkge1xuICAgICAgICAgICAgY29uc3Qgc291cmNlID0gc291cmNlT2JqO1xuICAgICAgICAgICAgc291cmNlT2JqLm9uKGV2ZW50TmFtZSwgaGFuZGxlcik7XG4gICAgICAgICAgICB1bnN1YnNjcmliZSA9ICgpID0+IHNvdXJjZS5vZmYoZXZlbnROYW1lLCBoYW5kbGVyKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpc05vZGVTdHlsZUV2ZW50RW1taXR0ZXIoc291cmNlT2JqKSkge1xuICAgICAgICAgICAgY29uc3Qgc291cmNlID0gc291cmNlT2JqO1xuICAgICAgICAgICAgc291cmNlT2JqLmFkZExpc3RlbmVyKGV2ZW50TmFtZSwgaGFuZGxlcik7XG4gICAgICAgICAgICB1bnN1YnNjcmliZSA9ICgpID0+IHNvdXJjZS5yZW1vdmVMaXN0ZW5lcihldmVudE5hbWUsIGhhbmRsZXIpO1xuICAgICAgICB9XG4gICAgICAgIHN1YnNjcmliZXIuYWRkKG5ldyBTdWJzY3JpcHRpb24odW5zdWJzY3JpYmUpKTtcbiAgICB9XG4gICAgX3N1YnNjcmliZShzdWJzY3JpYmVyKSB7XG4gICAgICAgIGNvbnN0IHNvdXJjZU9iaiA9IHRoaXMuc291cmNlT2JqO1xuICAgICAgICBjb25zdCBldmVudE5hbWUgPSB0aGlzLmV2ZW50TmFtZTtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbiAgICAgICAgY29uc3Qgc2VsZWN0b3IgPSB0aGlzLnNlbGVjdG9yO1xuICAgICAgICBsZXQgaGFuZGxlciA9IHNlbGVjdG9yID8gKC4uLmFyZ3MpID0+IHtcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSB0cnlDYXRjaChzZWxlY3RvcikoLi4uYXJncyk7XG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSBlcnJvck9iamVjdCkge1xuICAgICAgICAgICAgICAgIHN1YnNjcmliZXIuZXJyb3IoZXJyb3JPYmplY3QuZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLm5leHQocmVzdWx0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSA6IChlKSA9PiBzdWJzY3JpYmVyLm5leHQoZSk7XG4gICAgICAgIEZyb21FdmVudE9ic2VydmFibGUuc2V0dXBTdWJzY3JpcHRpb24oc291cmNlT2JqLCBldmVudE5hbWUsIGhhbmRsZXIsIHN1YnNjcmliZXIsIG9wdGlvbnMpO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUZyb21FdmVudE9ic2VydmFibGUuanMubWFwIiwiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKiBAaGlkZSB0cnVlXG4gKi9cbmV4cG9ydCBjbGFzcyBTY2FsYXJPYnNlcnZhYmxlIGV4dGVuZHMgT2JzZXJ2YWJsZSB7XG4gICAgY29uc3RydWN0b3IodmFsdWUsIHNjaGVkdWxlcikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVyID0gc2NoZWR1bGVyO1xuICAgICAgICB0aGlzLl9pc1NjYWxhciA9IHRydWU7XG4gICAgICAgIGlmIChzY2hlZHVsZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX2lzU2NhbGFyID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIGNyZWF0ZSh2YWx1ZSwgc2NoZWR1bGVyKSB7XG4gICAgICAgIHJldHVybiBuZXcgU2NhbGFyT2JzZXJ2YWJsZSh2YWx1ZSwgc2NoZWR1bGVyKTtcbiAgICB9XG4gICAgc3RhdGljIGRpc3BhdGNoKHN0YXRlKSB7XG4gICAgICAgIGNvbnN0IHsgZG9uZSwgdmFsdWUsIHN1YnNjcmliZXIgfSA9IHN0YXRlO1xuICAgICAgICBpZiAoZG9uZSkge1xuICAgICAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHN1YnNjcmliZXIubmV4dCh2YWx1ZSk7XG4gICAgICAgIGlmIChzdWJzY3JpYmVyLmNsb3NlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHN0YXRlLmRvbmUgPSB0cnVlO1xuICAgICAgICB0aGlzLnNjaGVkdWxlKHN0YXRlKTtcbiAgICB9XG4gICAgX3N1YnNjcmliZShzdWJzY3JpYmVyKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy52YWx1ZTtcbiAgICAgICAgY29uc3Qgc2NoZWR1bGVyID0gdGhpcy5zY2hlZHVsZXI7XG4gICAgICAgIGlmIChzY2hlZHVsZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBzY2hlZHVsZXIuc2NoZWR1bGUoU2NhbGFyT2JzZXJ2YWJsZS5kaXNwYXRjaCwgMCwge1xuICAgICAgICAgICAgICAgIGRvbmU6IGZhbHNlLCB2YWx1ZSwgc3Vic2NyaWJlclxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzdWJzY3JpYmVyLm5leHQodmFsdWUpO1xuICAgICAgICAgICAgaWYgKCFzdWJzY3JpYmVyLmNsb3NlZCkge1xuICAgICAgICAgICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVNjYWxhck9ic2VydmFibGUuanMubWFwIiwiaW1wb3J0IHsgcm9vdCB9IGZyb20gJy4uLy4uL3V0aWwvcm9vdCc7XG5pbXBvcnQgeyB0cnlDYXRjaCB9IGZyb20gJy4uLy4uL3V0aWwvdHJ5Q2F0Y2gnO1xuaW1wb3J0IHsgZXJyb3JPYmplY3QgfSBmcm9tICcuLi8uLi91dGlsL2Vycm9yT2JqZWN0JztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi8uLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IFN1YnNjcmliZXIgfSBmcm9tICcuLi8uLi9TdWJzY3JpYmVyJztcbmltcG9ydCB7IE1hcE9wZXJhdG9yIH0gZnJvbSAnLi4vLi4vb3BlcmF0b3IvbWFwJztcbmZ1bmN0aW9uIGdldENPUlNSZXF1ZXN0KCkge1xuICAgIGlmIChyb290LlhNTEh0dHBSZXF1ZXN0KSB7XG4gICAgICAgIGNvbnN0IHhociA9IG5ldyByb290LlhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIGlmICgnd2l0aENyZWRlbnRpYWxzJyBpbiB4aHIpIHtcbiAgICAgICAgICAgIHhoci53aXRoQ3JlZGVudGlhbHMgPSAhIXRoaXMud2l0aENyZWRlbnRpYWxzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB4aHI7XG4gICAgfVxuICAgIGVsc2UgaWYgKCEhcm9vdC5YRG9tYWluUmVxdWVzdCkge1xuICAgICAgICByZXR1cm4gbmV3IHJvb3QuWERvbWFpblJlcXVlc3QoKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQ09SUyBpcyBub3Qgc3VwcG9ydGVkIGJ5IHlvdXIgYnJvd3NlcicpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGdldFhNTEh0dHBSZXF1ZXN0KCkge1xuICAgIGlmIChyb290LlhNTEh0dHBSZXF1ZXN0KSB7XG4gICAgICAgIHJldHVybiBuZXcgcm9vdC5YTUxIdHRwUmVxdWVzdCgpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgbGV0IHByb2dJZDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHByb2dJZHMgPSBbJ01zeG1sMi5YTUxIVFRQJywgJ01pY3Jvc29mdC5YTUxIVFRQJywgJ01zeG1sMi5YTUxIVFRQLjQuMCddO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBwcm9nSWQgPSBwcm9nSWRzW2ldO1xuICAgICAgICAgICAgICAgICAgICBpZiAobmV3IHJvb3QuQWN0aXZlWE9iamVjdChwcm9nSWQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBuZXcgcm9vdC5BY3RpdmVYT2JqZWN0KHByb2dJZCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignWE1MSHR0cFJlcXVlc3QgaXMgbm90IHN1cHBvcnRlZCBieSB5b3VyIGJyb3dzZXInKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBhamF4R2V0KHVybCwgaGVhZGVycyA9IG51bGwpIHtcbiAgICByZXR1cm4gbmV3IEFqYXhPYnNlcnZhYmxlKHsgbWV0aG9kOiAnR0VUJywgdXJsLCBoZWFkZXJzIH0pO1xufVxuO1xuZXhwb3J0IGZ1bmN0aW9uIGFqYXhQb3N0KHVybCwgYm9keSwgaGVhZGVycykge1xuICAgIHJldHVybiBuZXcgQWpheE9ic2VydmFibGUoeyBtZXRob2Q6ICdQT1NUJywgdXJsLCBib2R5LCBoZWFkZXJzIH0pO1xufVxuO1xuZXhwb3J0IGZ1bmN0aW9uIGFqYXhEZWxldGUodXJsLCBoZWFkZXJzKSB7XG4gICAgcmV0dXJuIG5ldyBBamF4T2JzZXJ2YWJsZSh7IG1ldGhvZDogJ0RFTEVURScsIHVybCwgaGVhZGVycyB9KTtcbn1cbjtcbmV4cG9ydCBmdW5jdGlvbiBhamF4UHV0KHVybCwgYm9keSwgaGVhZGVycykge1xuICAgIHJldHVybiBuZXcgQWpheE9ic2VydmFibGUoeyBtZXRob2Q6ICdQVVQnLCB1cmwsIGJvZHksIGhlYWRlcnMgfSk7XG59XG47XG5leHBvcnQgZnVuY3Rpb24gYWpheEdldEpTT04odXJsLCBoZWFkZXJzKSB7XG4gICAgcmV0dXJuIG5ldyBBamF4T2JzZXJ2YWJsZSh7IG1ldGhvZDogJ0dFVCcsIHVybCwgcmVzcG9uc2VUeXBlOiAnanNvbicsIGhlYWRlcnMgfSlcbiAgICAgICAgLmxpZnQobmV3IE1hcE9wZXJhdG9yKCh4LCBpbmRleCkgPT4geC5yZXNwb25zZSwgbnVsbCkpO1xufVxuO1xuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKiBAaGlkZSB0cnVlXG4gKi9cbmV4cG9ydCBjbGFzcyBBamF4T2JzZXJ2YWJsZSBleHRlbmRzIE9ic2VydmFibGUge1xuICAgIGNvbnN0cnVjdG9yKHVybE9yUmVxdWVzdCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBjb25zdCByZXF1ZXN0ID0ge1xuICAgICAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgICAgICBjcmVhdGVYSFI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jcm9zc0RvbWFpbiA/IGdldENPUlNSZXF1ZXN0LmNhbGwodGhpcykgOiBnZXRYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNyb3NzRG9tYWluOiBmYWxzZSxcbiAgICAgICAgICAgIHdpdGhDcmVkZW50aWFsczogZmFsc2UsXG4gICAgICAgICAgICBoZWFkZXJzOiB7fSxcbiAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgICByZXNwb25zZVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgIHRpbWVvdXQ6IDBcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHR5cGVvZiB1cmxPclJlcXVlc3QgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICByZXF1ZXN0LnVybCA9IHVybE9yUmVxdWVzdDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgcHJvcCBpbiB1cmxPclJlcXVlc3QpIHtcbiAgICAgICAgICAgICAgICBpZiAodXJsT3JSZXF1ZXN0Lmhhc093blByb3BlcnR5KHByb3ApKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3RbcHJvcF0gPSB1cmxPclJlcXVlc3RbcHJvcF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgfVxuICAgIF9zdWJzY3JpYmUoc3Vic2NyaWJlcikge1xuICAgICAgICByZXR1cm4gbmV3IEFqYXhTdWJzY3JpYmVyKHN1YnNjcmliZXIsIHRoaXMucmVxdWVzdCk7XG4gICAgfVxufVxuLyoqXG4gKiBDcmVhdGVzIGFuIG9ic2VydmFibGUgZm9yIGFuIEFqYXggcmVxdWVzdCB3aXRoIGVpdGhlciBhIHJlcXVlc3Qgb2JqZWN0IHdpdGhcbiAqIHVybCwgaGVhZGVycywgZXRjIG9yIGEgc3RyaW5nIGZvciBhIFVSTC5cbiAqXG4gKiBAZXhhbXBsZVxuICogc291cmNlID0gUnguT2JzZXJ2YWJsZS5hamF4KCcvcHJvZHVjdHMnKTtcbiAqIHNvdXJjZSA9IFJ4Lk9ic2VydmFibGUuYWpheCh7IHVybDogJ3Byb2R1Y3RzJywgbWV0aG9kOiAnR0VUJyB9KTtcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ3xPYmplY3R9IHJlcXVlc3QgQ2FuIGJlIG9uZSBvZiB0aGUgZm9sbG93aW5nOlxuICogICBBIHN0cmluZyBvZiB0aGUgVVJMIHRvIG1ha2UgdGhlIEFqYXggY2FsbC5cbiAqICAgQW4gb2JqZWN0IHdpdGggdGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzXG4gKiAgIC0gdXJsOiBVUkwgb2YgdGhlIHJlcXVlc3RcbiAqICAgLSBib2R5OiBUaGUgYm9keSBvZiB0aGUgcmVxdWVzdFxuICogICAtIG1ldGhvZDogTWV0aG9kIG9mIHRoZSByZXF1ZXN0LCBzdWNoIGFzIEdFVCwgUE9TVCwgUFVULCBQQVRDSCwgREVMRVRFXG4gKiAgIC0gYXN5bmM6IFdoZXRoZXIgdGhlIHJlcXVlc3QgaXMgYXN5bmNcbiAqICAgLSBoZWFkZXJzOiBPcHRpb25hbCBoZWFkZXJzXG4gKiAgIC0gY3Jvc3NEb21haW46IHRydWUgaWYgYSBjcm9zcyBkb21haW4gcmVxdWVzdCwgZWxzZSBmYWxzZVxuICogICAtIGNyZWF0ZVhIUjogYSBmdW5jdGlvbiB0byBvdmVycmlkZSBpZiB5b3UgbmVlZCB0byB1c2UgYW4gYWx0ZXJuYXRlXG4gKiAgIFhNTEh0dHBSZXF1ZXN0IGltcGxlbWVudGF0aW9uLlxuICogICAtIHJlc3VsdFNlbGVjdG9yOiBhIGZ1bmN0aW9uIHRvIHVzZSB0byBhbHRlciB0aGUgb3V0cHV0IHZhbHVlIHR5cGUgb2ZcbiAqICAgdGhlIE9ic2VydmFibGUuIEdldHMge0BsaW5rIEFqYXhSZXNwb25zZX0gYXMgYW4gYXJndW1lbnQuXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSBBbiBvYnNlcnZhYmxlIHNlcXVlbmNlIGNvbnRhaW5pbmcgdGhlIFhNTEh0dHBSZXF1ZXN0LlxuICogQHN0YXRpYyB0cnVlXG4gKiBAbmFtZSBhamF4XG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuKi9cbkFqYXhPYnNlcnZhYmxlLmNyZWF0ZSA9ICgoKSA9PiB7XG4gICAgY29uc3QgY3JlYXRlID0gKHVybE9yUmVxdWVzdCkgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IEFqYXhPYnNlcnZhYmxlKHVybE9yUmVxdWVzdCk7XG4gICAgfTtcbiAgICBjcmVhdGUuZ2V0ID0gYWpheEdldDtcbiAgICBjcmVhdGUucG9zdCA9IGFqYXhQb3N0O1xuICAgIGNyZWF0ZS5kZWxldGUgPSBhamF4RGVsZXRlO1xuICAgIGNyZWF0ZS5wdXQgPSBhamF4UHV0O1xuICAgIGNyZWF0ZS5nZXRKU09OID0gYWpheEdldEpTT047XG4gICAgcmV0dXJuIGNyZWF0ZTtcbn0pKCk7XG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAaWdub3JlXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqL1xuZXhwb3J0IGNsYXNzIEFqYXhTdWJzY3JpYmVyIGV4dGVuZHMgU3Vic2NyaWJlciB7XG4gICAgY29uc3RydWN0b3IoZGVzdGluYXRpb24sIHJlcXVlc3QpIHtcbiAgICAgICAgc3VwZXIoZGVzdGluYXRpb24pO1xuICAgICAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgICAgICB0aGlzLmRvbmUgPSBmYWxzZTtcbiAgICAgICAgY29uc3QgaGVhZGVycyA9IHJlcXVlc3QuaGVhZGVycyA9IHJlcXVlc3QuaGVhZGVycyB8fCB7fTtcbiAgICAgICAgLy8gZm9yY2UgQ09SUyBpZiByZXF1ZXN0ZWRcbiAgICAgICAgaWYgKCFyZXF1ZXN0LmNyb3NzRG9tYWluICYmICFoZWFkZXJzWydYLVJlcXVlc3RlZC1XaXRoJ10pIHtcbiAgICAgICAgICAgIGhlYWRlcnNbJ1gtUmVxdWVzdGVkLVdpdGgnXSA9ICdYTUxIdHRwUmVxdWVzdCc7XG4gICAgICAgIH1cbiAgICAgICAgLy8gZW5zdXJlIGNvbnRlbnQgdHlwZSBpcyBzZXRcbiAgICAgICAgaWYgKCEoJ0NvbnRlbnQtVHlwZScgaW4gaGVhZGVycykgJiYgIShyb290LkZvcm1EYXRhICYmIHJlcXVlc3QuYm9keSBpbnN0YW5jZW9mIHJvb3QuRm9ybURhdGEpICYmIHR5cGVvZiByZXF1ZXN0LmJvZHkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBoZWFkZXJzWydDb250ZW50LVR5cGUnXSA9ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7IGNoYXJzZXQ9VVRGLTgnO1xuICAgICAgICB9XG4gICAgICAgIC8vIHByb3Blcmx5IHNlcmlhbGl6ZSBib2R5XG4gICAgICAgIHJlcXVlc3QuYm9keSA9IHRoaXMuc2VyaWFsaXplQm9keShyZXF1ZXN0LmJvZHksIHJlcXVlc3QuaGVhZGVyc1snQ29udGVudC1UeXBlJ10pO1xuICAgICAgICB0aGlzLnNlbmQoKTtcbiAgICB9XG4gICAgbmV4dChlKSB7XG4gICAgICAgIHRoaXMuZG9uZSA9IHRydWU7XG4gICAgICAgIGNvbnN0IHsgeGhyLCByZXF1ZXN0LCBkZXN0aW5hdGlvbiB9ID0gdGhpcztcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBuZXcgQWpheFJlc3BvbnNlKGUsIHhociwgcmVxdWVzdCk7XG4gICAgICAgIGRlc3RpbmF0aW9uLm5leHQocmVzcG9uc2UpO1xuICAgIH1cbiAgICBzZW5kKCkge1xuICAgICAgICBjb25zdCB7IHJlcXVlc3QsIHJlcXVlc3Q6IHsgdXNlciwgbWV0aG9kLCB1cmwsIGFzeW5jLCBwYXNzd29yZCwgaGVhZGVycywgYm9keSB9IH0gPSB0aGlzO1xuICAgICAgICBjb25zdCBjcmVhdGVYSFIgPSByZXF1ZXN0LmNyZWF0ZVhIUjtcbiAgICAgICAgY29uc3QgeGhyID0gdHJ5Q2F0Y2goY3JlYXRlWEhSKS5jYWxsKHJlcXVlc3QpO1xuICAgICAgICBpZiAoeGhyID09PSBlcnJvck9iamVjdCkge1xuICAgICAgICAgICAgdGhpcy5lcnJvcihlcnJvck9iamVjdC5lKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMueGhyID0geGhyO1xuICAgICAgICAgICAgLy8gb3BlbiBYSFIgZmlyc3RcbiAgICAgICAgICAgIGxldCByZXN1bHQ7XG4gICAgICAgICAgICBpZiAodXNlcikge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRyeUNhdGNoKHhoci5vcGVuKS5jYWxsKHhociwgbWV0aG9kLCB1cmwsIGFzeW5jLCB1c2VyLCBwYXNzd29yZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB0cnlDYXRjaCh4aHIub3BlbikuY2FsbCh4aHIsIG1ldGhvZCwgdXJsLCBhc3luYyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSBlcnJvck9iamVjdCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3IoZXJyb3JPYmplY3QuZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyB0aW1lb3V0IGFuZCByZXNwb25zZVR5cGUgY2FuIGJlIHNldCBvbmNlIHRoZSBYSFIgaXMgb3BlblxuICAgICAgICAgICAgeGhyLnRpbWVvdXQgPSByZXF1ZXN0LnRpbWVvdXQ7XG4gICAgICAgICAgICB4aHIucmVzcG9uc2VUeXBlID0gcmVxdWVzdC5yZXNwb25zZVR5cGU7XG4gICAgICAgICAgICAvLyBzZXQgaGVhZGVyc1xuICAgICAgICAgICAgdGhpcy5zZXRIZWFkZXJzKHhociwgaGVhZGVycyk7XG4gICAgICAgICAgICAvLyBub3cgc2V0IHVwIHRoZSBldmVudHNcbiAgICAgICAgICAgIHRoaXMuc2V0dXBFdmVudHMoeGhyLCByZXF1ZXN0KTtcbiAgICAgICAgICAgIC8vIGZpbmFsbHkgc2VuZCB0aGUgcmVxdWVzdFxuICAgICAgICAgICAgaWYgKGJvZHkpIHtcbiAgICAgICAgICAgICAgICB4aHIuc2VuZChib2R5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHhoci5zZW5kKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHhocjtcbiAgICB9XG4gICAgc2VyaWFsaXplQm9keShib2R5LCBjb250ZW50VHlwZSkge1xuICAgICAgICBpZiAoIWJvZHkgfHwgdHlwZW9mIGJvZHkgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICByZXR1cm4gYm9keTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChyb290LkZvcm1EYXRhICYmIGJvZHkgaW5zdGFuY2VvZiByb290LkZvcm1EYXRhKSB7XG4gICAgICAgICAgICByZXR1cm4gYm9keTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29udGVudFR5cGUpIHtcbiAgICAgICAgICAgIGNvbnN0IHNwbGl0SW5kZXggPSBjb250ZW50VHlwZS5pbmRleE9mKCc7Jyk7XG4gICAgICAgICAgICBpZiAoc3BsaXRJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICBjb250ZW50VHlwZSA9IGNvbnRlbnRUeXBlLnN1YnN0cmluZygwLCBzcGxpdEluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzd2l0Y2ggKGNvbnRlbnRUeXBlKSB7XG4gICAgICAgICAgICBjYXNlICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnOlxuICAgICAgICAgICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhib2R5KS5tYXAoa2V5ID0+IGAke2VuY29kZVVSSShrZXkpfT0ke2VuY29kZVVSSShib2R5W2tleV0pfWApLmpvaW4oJyYnKTtcbiAgICAgICAgICAgIGNhc2UgJ2FwcGxpY2F0aW9uL2pzb24nOlxuICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShib2R5KTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJvZHk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2V0SGVhZGVycyh4aHIsIGhlYWRlcnMpIHtcbiAgICAgICAgZm9yIChsZXQga2V5IGluIGhlYWRlcnMpIHtcbiAgICAgICAgICAgIGlmIChoZWFkZXJzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihrZXksIGhlYWRlcnNba2V5XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2V0dXBFdmVudHMoeGhyLCByZXF1ZXN0KSB7XG4gICAgICAgIGNvbnN0IHByb2dyZXNzU3Vic2NyaWJlciA9IHJlcXVlc3QucHJvZ3Jlc3NTdWJzY3JpYmVyO1xuICAgICAgICB4aHIub250aW1lb3V0ID0gZnVuY3Rpb24geGhyVGltZW91dChlKSB7XG4gICAgICAgICAgICBjb25zdCB7IHN1YnNjcmliZXIsIHByb2dyZXNzU3Vic2NyaWJlciwgcmVxdWVzdCB9ID0geGhyVGltZW91dDtcbiAgICAgICAgICAgIGlmIChwcm9ncmVzc1N1YnNjcmliZXIpIHtcbiAgICAgICAgICAgICAgICBwcm9ncmVzc1N1YnNjcmliZXIuZXJyb3IoZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdWJzY3JpYmVyLmVycm9yKG5ldyBBamF4VGltZW91dEVycm9yKHRoaXMsIHJlcXVlc3QpKTsgLy9UT0RPOiBNYWtlIGJldHRlcmVyLlxuICAgICAgICB9O1xuICAgICAgICB4aHIub250aW1lb3V0LnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgICAgICB4aHIub250aW1lb3V0LnN1YnNjcmliZXIgPSB0aGlzO1xuICAgICAgICB4aHIub250aW1lb3V0LnByb2dyZXNzU3Vic2NyaWJlciA9IHByb2dyZXNzU3Vic2NyaWJlcjtcbiAgICAgICAgaWYgKHhoci51cGxvYWQgJiYgJ3dpdGhDcmVkZW50aWFscycgaW4geGhyICYmIHJvb3QuWERvbWFpblJlcXVlc3QpIHtcbiAgICAgICAgICAgIGlmIChwcm9ncmVzc1N1YnNjcmliZXIpIHtcbiAgICAgICAgICAgICAgICB4aHIub25wcm9ncmVzcyA9IGZ1bmN0aW9uIHhoclByb2dyZXNzKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBwcm9ncmVzc1N1YnNjcmliZXIgfSA9IHhoclByb2dyZXNzO1xuICAgICAgICAgICAgICAgICAgICBwcm9ncmVzc1N1YnNjcmliZXIubmV4dChlKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHhoci5vbnByb2dyZXNzLnByb2dyZXNzU3Vic2NyaWJlciA9IHByb2dyZXNzU3Vic2NyaWJlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHhoci5vbmVycm9yID0gZnVuY3Rpb24geGhyRXJyb3IoZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgcHJvZ3Jlc3NTdWJzY3JpYmVyLCBzdWJzY3JpYmVyLCByZXF1ZXN0IH0gPSB4aHJFcnJvcjtcbiAgICAgICAgICAgICAgICBpZiAocHJvZ3Jlc3NTdWJzY3JpYmVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHByb2dyZXNzU3Vic2NyaWJlci5lcnJvcihlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc3Vic2NyaWJlci5lcnJvcihuZXcgQWpheEVycm9yKCdhamF4IGVycm9yJywgdGhpcywgcmVxdWVzdCkpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHhoci5vbmVycm9yLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgICAgICAgICAgeGhyLm9uZXJyb3Iuc3Vic2NyaWJlciA9IHRoaXM7XG4gICAgICAgICAgICB4aHIub25lcnJvci5wcm9ncmVzc1N1YnNjcmliZXIgPSBwcm9ncmVzc1N1YnNjcmliZXI7XG4gICAgICAgIH1cbiAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uIHhoclJlYWR5U3RhdGVDaGFuZ2UoZSkge1xuICAgICAgICAgICAgY29uc3QgeyBzdWJzY3JpYmVyLCBwcm9ncmVzc1N1YnNjcmliZXIsIHJlcXVlc3QgfSA9IHhoclJlYWR5U3RhdGVDaGFuZ2U7XG4gICAgICAgICAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09PSA0KSB7XG4gICAgICAgICAgICAgICAgLy8gbm9ybWFsaXplIElFOSBidWcgKGh0dHA6Ly9idWdzLmpxdWVyeS5jb20vdGlja2V0LzE0NTApXG4gICAgICAgICAgICAgICAgbGV0IHN0YXR1cyA9IHRoaXMuc3RhdHVzID09PSAxMjIzID8gMjA0IDogdGhpcy5zdGF0dXM7XG4gICAgICAgICAgICAgICAgbGV0IHJlc3BvbnNlID0gKHRoaXMucmVzcG9uc2VUeXBlID09PSAndGV4dCcgPyAodGhpcy5yZXNwb25zZSB8fCB0aGlzLnJlc3BvbnNlVGV4dCkgOiB0aGlzLnJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAvLyBmaXggc3RhdHVzIGNvZGUgd2hlbiBpdCBpcyAwICgwIHN0YXR1cyBpcyB1bmRvY3VtZW50ZWQpLlxuICAgICAgICAgICAgICAgIC8vIE9jY3VycyB3aGVuIGFjY2Vzc2luZyBmaWxlIHJlc291cmNlcyBvciBvbiBBbmRyb2lkIDQuMSBzdG9jayBicm93c2VyXG4gICAgICAgICAgICAgICAgLy8gd2hpbGUgcmV0cmlldmluZyBmaWxlcyBmcm9tIGFwcGxpY2F0aW9uIGNhY2hlLlxuICAgICAgICAgICAgICAgIGlmIChzdGF0dXMgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzID0gcmVzcG9uc2UgPyAyMDAgOiAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoMjAwIDw9IHN0YXR1cyAmJiBzdGF0dXMgPCAzMDApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb2dyZXNzU3Vic2NyaWJlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3NTdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KGUpO1xuICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAocHJvZ3Jlc3NTdWJzY3JpYmVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9ncmVzc1N1YnNjcmliZXIuZXJyb3IoZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlci5lcnJvcihuZXcgQWpheEVycm9yKCdhamF4IGVycm9yICcgKyBzdGF0dXMsIHRoaXMsIHJlcXVlc3QpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2Uuc3Vic2NyaWJlciA9IHRoaXM7XG4gICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UucHJvZ3Jlc3NTdWJzY3JpYmVyID0gcHJvZ3Jlc3NTdWJzY3JpYmVyO1xuICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIH1cbiAgICB1bnN1YnNjcmliZSgpIHtcbiAgICAgICAgY29uc3QgeyBkb25lLCB4aHIgfSA9IHRoaXM7XG4gICAgICAgIGlmICghZG9uZSAmJiB4aHIgJiYgeGhyLnJlYWR5U3RhdGUgIT09IDQpIHtcbiAgICAgICAgICAgIHhoci5hYm9ydCgpO1xuICAgICAgICB9XG4gICAgICAgIHN1cGVyLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxufVxuLyoqXG4gKiBBIG5vcm1hbGl6ZWQgQUpBWCByZXNwb25zZS5cbiAqXG4gKiBAc2VlIHtAbGluayBhamF4fVxuICpcbiAqIEBjbGFzcyBBamF4UmVzcG9uc2VcbiAqL1xuZXhwb3J0IGNsYXNzIEFqYXhSZXNwb25zZSB7XG4gICAgY29uc3RydWN0b3Iob3JpZ2luYWxFdmVudCwgeGhyLCByZXF1ZXN0KSB7XG4gICAgICAgIHRoaXMub3JpZ2luYWxFdmVudCA9IG9yaWdpbmFsRXZlbnQ7XG4gICAgICAgIHRoaXMueGhyID0geGhyO1xuICAgICAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgICAgICB0aGlzLnN0YXR1cyA9IHhoci5zdGF0dXM7XG4gICAgICAgIHRoaXMucmVzcG9uc2VUeXBlID0geGhyLnJlc3BvbnNlVHlwZSB8fCByZXF1ZXN0LnJlc3BvbnNlVHlwZTtcbiAgICAgICAgc3dpdGNoICh0aGlzLnJlc3BvbnNlVHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnanNvbic6XG4gICAgICAgICAgICAgICAgaWYgKCdyZXNwb25zZScgaW4geGhyKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vSUUgZG9lcyBub3Qgc3VwcG9ydCBqc29uIGFzIHJlc3BvbnNlVHlwZSwgcGFyc2UgaXQgaW50ZXJuYWxseVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc3BvbnNlID0geGhyLnJlc3BvbnNlVHlwZSA/IHhoci5yZXNwb25zZSA6IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlIHx8IHhoci5yZXNwb25zZVRleHQgfHwgJ251bGwnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzcG9uc2UgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQgfHwgJ251bGwnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICd4bWwnOlxuICAgICAgICAgICAgICAgIHRoaXMucmVzcG9uc2UgPSB4aHIucmVzcG9uc2VYTUw7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICd0ZXh0JzpcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNwb25zZSA9ICgncmVzcG9uc2UnIGluIHhocikgPyB4aHIucmVzcG9uc2UgOiB4aHIucmVzcG9uc2VUZXh0O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxufVxuLyoqXG4gKiBBIG5vcm1hbGl6ZWQgQUpBWCBlcnJvci5cbiAqXG4gKiBAc2VlIHtAbGluayBhamF4fVxuICpcbiAqIEBjbGFzcyBBamF4RXJyb3JcbiAqL1xuZXhwb3J0IGNsYXNzIEFqYXhFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlLCB4aHIsIHJlcXVlc3QpIHtcbiAgICAgICAgc3VwZXIobWVzc2FnZSk7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgICAgIHRoaXMueGhyID0geGhyO1xuICAgICAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgICAgICB0aGlzLnN0YXR1cyA9IHhoci5zdGF0dXM7XG4gICAgfVxufVxuLyoqXG4gKiBAc2VlIHtAbGluayBhamF4fVxuICpcbiAqIEBjbGFzcyBBamF4VGltZW91dEVycm9yXG4gKi9cbmV4cG9ydCBjbGFzcyBBamF4VGltZW91dEVycm9yIGV4dGVuZHMgQWpheEVycm9yIHtcbiAgICBjb25zdHJ1Y3Rvcih4aHIsIHJlcXVlc3QpIHtcbiAgICAgICAgc3VwZXIoJ2FqYXggdGltZW91dCcsIHhociwgcmVxdWVzdCk7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9QWpheE9ic2VydmFibGUuanMubWFwIiwiaW1wb3J0IHsgQWpheE9ic2VydmFibGUgfSBmcm9tICcuL0FqYXhPYnNlcnZhYmxlJztcbmV4cG9ydCBjb25zdCBhamF4ID0gQWpheE9ic2VydmFibGUuY3JlYXRlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YWpheC5qcy5tYXAiLCJpbXBvcnQgeyBFbXB0eU9ic2VydmFibGUgfSBmcm9tICcuL0VtcHR5T2JzZXJ2YWJsZSc7XG5leHBvcnQgY29uc3QgZW1wdHkgPSBFbXB0eU9ic2VydmFibGUuY3JlYXRlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZW1wdHkuanMubWFwIiwiaW1wb3J0IHsgRnJvbUV2ZW50T2JzZXJ2YWJsZSB9IGZyb20gJy4vRnJvbUV2ZW50T2JzZXJ2YWJsZSc7XG5leHBvcnQgY29uc3QgZnJvbUV2ZW50ID0gRnJvbUV2ZW50T2JzZXJ2YWJsZS5jcmVhdGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1mcm9tRXZlbnQuanMubWFwIiwiaW1wb3J0IHsgbWVyZ2VTdGF0aWMgfSBmcm9tICcuLi9vcGVyYXRvci9tZXJnZSc7XG5leHBvcnQgY29uc3QgbWVyZ2UgPSBtZXJnZVN0YXRpYztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1lcmdlLmpzLm1hcCIsImltcG9ydCB7IEFycmF5T2JzZXJ2YWJsZSB9IGZyb20gJy4vQXJyYXlPYnNlcnZhYmxlJztcbmV4cG9ydCBjb25zdCBvZiA9IEFycmF5T2JzZXJ2YWJsZS5vZjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW9mLmpzLm1hcCIsImltcG9ydCB7IE91dGVyU3Vic2NyaWJlciB9IGZyb20gJy4uL091dGVyU3Vic2NyaWJlcic7XG5pbXBvcnQgeyBzdWJzY3JpYmVUb1Jlc3VsdCB9IGZyb20gJy4uL3V0aWwvc3Vic2NyaWJlVG9SZXN1bHQnO1xuLyoqXG4gKiBDYXRjaGVzIGVycm9ycyBvbiB0aGUgb2JzZXJ2YWJsZSB0byBiZSBoYW5kbGVkIGJ5IHJldHVybmluZyBhIG5ldyBvYnNlcnZhYmxlIG9yIHRocm93aW5nIGFuIGVycm9yLlxuICogQHBhcmFtIHtmdW5jdGlvbn0gc2VsZWN0b3IgYSBmdW5jdGlvbiB0aGF0IHRha2VzIGFzIGFyZ3VtZW50cyBgZXJyYCwgd2hpY2ggaXMgdGhlIGVycm9yLCBhbmQgYGNhdWdodGAsIHdoaWNoXG4gKiAgaXMgdGhlIHNvdXJjZSBvYnNlcnZhYmxlLCBpbiBjYXNlIHlvdSdkIGxpa2UgdG8gXCJyZXRyeVwiIHRoYXQgb2JzZXJ2YWJsZSBieSByZXR1cm5pbmcgaXQgYWdhaW4uIFdoYXRldmVyIG9ic2VydmFibGVcbiAqICBpcyByZXR1cm5lZCBieSB0aGUgYHNlbGVjdG9yYCB3aWxsIGJlIHVzZWQgdG8gY29udGludWUgdGhlIG9ic2VydmFibGUgY2hhaW4uXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSBhbiBvYnNlcnZhYmxlIHRoYXQgb3JpZ2luYXRlcyBmcm9tIGVpdGhlciB0aGUgc291cmNlIG9yIHRoZSBvYnNlcnZhYmxlIHJldHVybmVkIGJ5IHRoZVxuICogIGNhdGNoIGBzZWxlY3RvcmAgZnVuY3Rpb24uXG4gKiBAbWV0aG9kIGNhdGNoXG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gX2NhdGNoKHNlbGVjdG9yKSB7XG4gICAgY29uc3Qgb3BlcmF0b3IgPSBuZXcgQ2F0Y2hPcGVyYXRvcihzZWxlY3Rvcik7XG4gICAgY29uc3QgY2F1Z2h0ID0gdGhpcy5saWZ0KG9wZXJhdG9yKTtcbiAgICByZXR1cm4gKG9wZXJhdG9yLmNhdWdodCA9IGNhdWdodCk7XG59XG5jbGFzcyBDYXRjaE9wZXJhdG9yIHtcbiAgICBjb25zdHJ1Y3RvcihzZWxlY3Rvcikge1xuICAgICAgICB0aGlzLnNlbGVjdG9yID0gc2VsZWN0b3I7XG4gICAgfVxuICAgIGNhbGwoc3Vic2NyaWJlciwgc291cmNlKSB7XG4gICAgICAgIHJldHVybiBzb3VyY2UuX3N1YnNjcmliZShuZXcgQ2F0Y2hTdWJzY3JpYmVyKHN1YnNjcmliZXIsIHRoaXMuc2VsZWN0b3IsIHRoaXMuY2F1Z2h0KSk7XG4gICAgfVxufVxuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbmNsYXNzIENhdGNoU3Vic2NyaWJlciBleHRlbmRzIE91dGVyU3Vic2NyaWJlciB7XG4gICAgY29uc3RydWN0b3IoZGVzdGluYXRpb24sIHNlbGVjdG9yLCBjYXVnaHQpIHtcbiAgICAgICAgc3VwZXIoZGVzdGluYXRpb24pO1xuICAgICAgICB0aGlzLnNlbGVjdG9yID0gc2VsZWN0b3I7XG4gICAgICAgIHRoaXMuY2F1Z2h0ID0gY2F1Z2h0O1xuICAgIH1cbiAgICAvLyBOT1RFOiBvdmVycmlkaW5nIGBlcnJvcmAgaW5zdGVhZCBvZiBgX2Vycm9yYCBiZWNhdXNlIHdlIGRvbid0IHdhbnRcbiAgICAvLyB0byBoYXZlIHRoaXMgZmxhZyB0aGlzIHN1YnNjcmliZXIgYXMgYGlzU3RvcHBlZGAuXG4gICAgZXJyb3IoZXJyKSB7XG4gICAgICAgIGlmICghdGhpcy5pc1N0b3BwZWQpIHtcbiAgICAgICAgICAgIGxldCByZXN1bHQ7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuc2VsZWN0b3IoZXJyLCB0aGlzLmNhdWdodCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIHRoaXMuZGVzdGluYXRpb24ucmVtb3ZlKHRoaXMpO1xuICAgICAgICAgICAgc3Vic2NyaWJlVG9SZXN1bHQodGhpcywgcmVzdWx0KTtcbiAgICAgICAgfVxuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNhdGNoLmpzLm1hcCIsImltcG9ydCB7IFN1YnNjcmliZXIgfSBmcm9tICcuLi9TdWJzY3JpYmVyJztcbi8qKlxuICogUGVyZm9ybSBhIHNpZGUgZWZmZWN0IGZvciBldmVyeSBlbWlzc2lvbiBvbiB0aGUgc291cmNlIE9ic2VydmFibGUsIGJ1dCByZXR1cm5cbiAqIGFuIE9ic2VydmFibGUgdGhhdCBpcyBpZGVudGljYWwgdG8gdGhlIHNvdXJjZS5cbiAqXG4gKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+SW50ZXJjZXB0cyBlYWNoIGVtaXNzaW9uIG9uIHRoZSBzb3VyY2UgYW5kIHJ1bnMgYVxuICogZnVuY3Rpb24sIGJ1dCByZXR1cm5zIGFuIG91dHB1dCB3aGljaCBpcyBpZGVudGljYWwgdG8gdGhlIHNvdXJjZS48L3NwYW4+XG4gKlxuICogPGltZyBzcmM9XCIuL2ltZy9kby5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAqXG4gKiBSZXR1cm5zIGEgbWlycm9yZWQgT2JzZXJ2YWJsZSBvZiB0aGUgc291cmNlIE9ic2VydmFibGUsIGJ1dCBtb2RpZmllZCBzbyB0aGF0XG4gKiB0aGUgcHJvdmlkZWQgT2JzZXJ2ZXIgaXMgY2FsbGVkIHRvIHBlcmZvcm0gYSBzaWRlIGVmZmVjdCBmb3IgZXZlcnkgdmFsdWUsXG4gKiBlcnJvciwgYW5kIGNvbXBsZXRpb24gZW1pdHRlZCBieSB0aGUgc291cmNlLiBBbnkgZXJyb3JzIHRoYXQgYXJlIHRocm93biBpblxuICogdGhlIGFmb3JlbWVudGlvbmVkIE9ic2VydmVyIG9yIGhhbmRsZXJzIGFyZSBzYWZlbHkgc2VudCBkb3duIHRoZSBlcnJvciBwYXRoXG4gKiBvZiB0aGUgb3V0cHV0IE9ic2VydmFibGUuXG4gKlxuICogVGhpcyBvcGVyYXRvciBpcyB1c2VmdWwgZm9yIGRlYnVnZ2luZyB5b3VyIE9ic2VydmFibGVzIGZvciB0aGUgY29ycmVjdCB2YWx1ZXNcbiAqIG9yIHBlcmZvcm1pbmcgb3RoZXIgc2lkZSBlZmZlY3RzLlxuICpcbiAqIE5vdGU6IHRoaXMgaXMgZGlmZmVyZW50IHRvIGEgYHN1YnNjcmliZWAgb24gdGhlIE9ic2VydmFibGUuIElmIHRoZSBPYnNlcnZhYmxlXG4gKiByZXR1cm5lZCBieSBgZG9gIGlzIG5vdCBzdWJzY3JpYmVkLCB0aGUgc2lkZSBlZmZlY3RzIHNwZWNpZmllZCBieSB0aGVcbiAqIE9ic2VydmVyIHdpbGwgbmV2ZXIgaGFwcGVuLiBgZG9gIHRoZXJlZm9yZSBzaW1wbHkgc3BpZXMgb24gZXhpc3RpbmdcbiAqIGV4ZWN1dGlvbiwgaXQgZG9lcyBub3QgdHJpZ2dlciBhbiBleGVjdXRpb24gdG8gaGFwcGVuIGxpa2UgYHN1YnNjcmliZWAgZG9lcy5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5NYXAgZXZlcnkgZXZlcnkgY2xpY2sgdG8gdGhlIGNsaWVudFggcG9zaXRpb24gb2YgdGhhdCBjbGljaywgd2hpbGUgYWxzbyBsb2dnaW5nIHRoZSBjbGljayBldmVudDwvY2FwdGlvbj5cbiAqIHZhciBjbGlja3MgPSBSeC5PYnNlcnZhYmxlLmZyb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJyk7XG4gKiB2YXIgcG9zaXRpb25zID0gY2xpY2tzXG4gKiAgIC5kbyhldiA9PiBjb25zb2xlLmxvZyhldikpXG4gKiAgIC5tYXAoZXYgPT4gZXYuY2xpZW50WCk7XG4gKiBwb3NpdGlvbnMuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICpcbiAqIEBzZWUge0BsaW5rIG1hcH1cbiAqIEBzZWUge0BsaW5rIHN1YnNjcmliZX1cbiAqXG4gKiBAcGFyYW0ge09ic2VydmVyfGZ1bmN0aW9ufSBbbmV4dE9yT2JzZXJ2ZXJdIEEgbm9ybWFsIE9ic2VydmVyIG9iamVjdCBvciBhXG4gKiBjYWxsYmFjayBmb3IgYG5leHRgLlxuICogQHBhcmFtIHtmdW5jdGlvbn0gW2Vycm9yXSBDYWxsYmFjayBmb3IgZXJyb3JzIGluIHRoZSBzb3VyY2UuXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBbY29tcGxldGVdIENhbGxiYWNrIGZvciB0aGUgY29tcGxldGlvbiBvZiB0aGUgc291cmNlLlxuICogQHJldHVybiB7T2JzZXJ2YWJsZX0gQW4gT2JzZXJ2YWJsZSBpZGVudGljYWwgdG8gdGhlIHNvdXJjZSwgYnV0IHJ1bnMgdGhlXG4gKiBzcGVjaWZpZWQgT2JzZXJ2ZXIgb3IgY2FsbGJhY2socykgZm9yIGVhY2ggaXRlbS5cbiAqIEBtZXRob2QgZG9cbiAqIEBuYW1lIGRvXG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gX2RvKG5leHRPck9ic2VydmVyLCBlcnJvciwgY29tcGxldGUpIHtcbiAgICByZXR1cm4gdGhpcy5saWZ0KG5ldyBEb09wZXJhdG9yKG5leHRPck9ic2VydmVyLCBlcnJvciwgY29tcGxldGUpKTtcbn1cbmNsYXNzIERvT3BlcmF0b3Ige1xuICAgIGNvbnN0cnVjdG9yKG5leHRPck9ic2VydmVyLCBlcnJvciwgY29tcGxldGUpIHtcbiAgICAgICAgdGhpcy5uZXh0T3JPYnNlcnZlciA9IG5leHRPck9ic2VydmVyO1xuICAgICAgICB0aGlzLmVycm9yID0gZXJyb3I7XG4gICAgICAgIHRoaXMuY29tcGxldGUgPSBjb21wbGV0ZTtcbiAgICB9XG4gICAgY2FsbChzdWJzY3JpYmVyLCBzb3VyY2UpIHtcbiAgICAgICAgcmV0dXJuIHNvdXJjZS5fc3Vic2NyaWJlKG5ldyBEb1N1YnNjcmliZXIoc3Vic2NyaWJlciwgdGhpcy5uZXh0T3JPYnNlcnZlciwgdGhpcy5lcnJvciwgdGhpcy5jb21wbGV0ZSkpO1xuICAgIH1cbn1cbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBpZ25vcmVcbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICovXG5jbGFzcyBEb1N1YnNjcmliZXIgZXh0ZW5kcyBTdWJzY3JpYmVyIHtcbiAgICBjb25zdHJ1Y3RvcihkZXN0aW5hdGlvbiwgbmV4dE9yT2JzZXJ2ZXIsIGVycm9yLCBjb21wbGV0ZSkge1xuICAgICAgICBzdXBlcihkZXN0aW5hdGlvbik7XG4gICAgICAgIGNvbnN0IHNhZmVTdWJzY3JpYmVyID0gbmV3IFN1YnNjcmliZXIobmV4dE9yT2JzZXJ2ZXIsIGVycm9yLCBjb21wbGV0ZSk7XG4gICAgICAgIHNhZmVTdWJzY3JpYmVyLnN5bmNFcnJvclRocm93YWJsZSA9IHRydWU7XG4gICAgICAgIHRoaXMuYWRkKHNhZmVTdWJzY3JpYmVyKTtcbiAgICAgICAgdGhpcy5zYWZlU3Vic2NyaWJlciA9IHNhZmVTdWJzY3JpYmVyO1xuICAgIH1cbiAgICBfbmV4dCh2YWx1ZSkge1xuICAgICAgICBjb25zdCB7IHNhZmVTdWJzY3JpYmVyIH0gPSB0aGlzO1xuICAgICAgICBzYWZlU3Vic2NyaWJlci5uZXh0KHZhbHVlKTtcbiAgICAgICAgaWYgKHNhZmVTdWJzY3JpYmVyLnN5bmNFcnJvclRocm93bikge1xuICAgICAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5lcnJvcihzYWZlU3Vic2NyaWJlci5zeW5jRXJyb3JWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmRlc3RpbmF0aW9uLm5leHQodmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9lcnJvcihlcnIpIHtcbiAgICAgICAgY29uc3QgeyBzYWZlU3Vic2NyaWJlciB9ID0gdGhpcztcbiAgICAgICAgc2FmZVN1YnNjcmliZXIuZXJyb3IoZXJyKTtcbiAgICAgICAgaWYgKHNhZmVTdWJzY3JpYmVyLnN5bmNFcnJvclRocm93bikge1xuICAgICAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5lcnJvcihzYWZlU3Vic2NyaWJlci5zeW5jRXJyb3JWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmRlc3RpbmF0aW9uLmVycm9yKGVycik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX2NvbXBsZXRlKCkge1xuICAgICAgICBjb25zdCB7IHNhZmVTdWJzY3JpYmVyIH0gPSB0aGlzO1xuICAgICAgICBzYWZlU3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICBpZiAoc2FmZVN1YnNjcmliZXIuc3luY0Vycm9yVGhyb3duKSB7XG4gICAgICAgICAgICB0aGlzLmRlc3RpbmF0aW9uLmVycm9yKHNhZmVTdWJzY3JpYmVyLnN5bmNFcnJvclZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZGVzdGluYXRpb24uY29tcGxldGUoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRvLmpzLm1hcCIsImltcG9ydCB7IFN1YnNjcmliZXIgfSBmcm9tICcuLi9TdWJzY3JpYmVyJztcbi8qKlxuICogRmlsdGVyIGl0ZW1zIGVtaXR0ZWQgYnkgdGhlIHNvdXJjZSBPYnNlcnZhYmxlIGJ5IG9ubHkgZW1pdHRpbmcgdGhvc2UgdGhhdFxuICogc2F0aXNmeSBhIHNwZWNpZmllZCBwcmVkaWNhdGUuXG4gKlxuICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPkxpa2VcbiAqIFtBcnJheS5wcm90b3R5cGUuZmlsdGVyKCldKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0FycmF5L2ZpbHRlciksXG4gKiBpdCBvbmx5IGVtaXRzIGEgdmFsdWUgZnJvbSB0aGUgc291cmNlIGlmIGl0IHBhc3NlcyBhIGNyaXRlcmlvbiBmdW5jdGlvbi48L3NwYW4+XG4gKlxuICogPGltZyBzcmM9XCIuL2ltZy9maWx0ZXIucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gKlxuICogU2ltaWxhciB0byB0aGUgd2VsbC1rbm93biBgQXJyYXkucHJvdG90eXBlLmZpbHRlcmAgbWV0aG9kLCB0aGlzIG9wZXJhdG9yXG4gKiB0YWtlcyB2YWx1ZXMgZnJvbSB0aGUgc291cmNlIE9ic2VydmFibGUsIHBhc3NlcyB0aGVtIHRocm91Z2ggYSBgcHJlZGljYXRlYFxuICogZnVuY3Rpb24gYW5kIG9ubHkgZW1pdHMgdGhvc2UgdmFsdWVzIHRoYXQgeWllbGRlZCBgdHJ1ZWAuXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+RW1pdCBvbmx5IGNsaWNrIGV2ZW50cyB3aG9zZSB0YXJnZXQgd2FzIGEgRElWIGVsZW1lbnQ8L2NhcHRpb24+XG4gKiB2YXIgY2xpY2tzID0gUnguT2JzZXJ2YWJsZS5mcm9tRXZlbnQoZG9jdW1lbnQsICdjbGljaycpO1xuICogdmFyIGNsaWNrc09uRGl2cyA9IGNsaWNrcy5maWx0ZXIoZXYgPT4gZXYudGFyZ2V0LnRhZ05hbWUgPT09ICdESVYnKTtcbiAqIGNsaWNrc09uRGl2cy5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gKlxuICogQHNlZSB7QGxpbmsgZGlzdGluY3R9XG4gKiBAc2VlIHtAbGluayBkaXN0aW5jdEtleX1cbiAqIEBzZWUge0BsaW5rIGRpc3RpbmN0VW50aWxDaGFuZ2VkfVxuICogQHNlZSB7QGxpbmsgZGlzdGluY3RVbnRpbEtleUNoYW5nZWR9XG4gKiBAc2VlIHtAbGluayBpZ25vcmVFbGVtZW50c31cbiAqIEBzZWUge0BsaW5rIHBhcnRpdGlvbn1cbiAqIEBzZWUge0BsaW5rIHNraXB9XG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbih2YWx1ZTogVCwgaW5kZXg6IG51bWJlcik6IGJvb2xlYW59IHByZWRpY2F0ZSBBIGZ1bmN0aW9uIHRoYXRcbiAqIGV2YWx1YXRlcyBlYWNoIHZhbHVlIGVtaXR0ZWQgYnkgdGhlIHNvdXJjZSBPYnNlcnZhYmxlLiBJZiBpdCByZXR1cm5zIGB0cnVlYCxcbiAqIHRoZSB2YWx1ZSBpcyBlbWl0dGVkLCBpZiBgZmFsc2VgIHRoZSB2YWx1ZSBpcyBub3QgcGFzc2VkIHRvIHRoZSBvdXRwdXRcbiAqIE9ic2VydmFibGUuIFRoZSBgaW5kZXhgIHBhcmFtZXRlciBpcyB0aGUgbnVtYmVyIGBpYCBmb3IgdGhlIGktdGggc291cmNlXG4gKiBlbWlzc2lvbiB0aGF0IGhhcyBoYXBwZW5lZCBzaW5jZSB0aGUgc3Vic2NyaXB0aW9uLCBzdGFydGluZyBmcm9tIHRoZSBudW1iZXJcbiAqIGAwYC5cbiAqIEBwYXJhbSB7YW55fSBbdGhpc0FyZ10gQW4gb3B0aW9uYWwgYXJndW1lbnQgdG8gZGV0ZXJtaW5lIHRoZSB2YWx1ZSBvZiBgdGhpc2BcbiAqIGluIHRoZSBgcHJlZGljYXRlYCBmdW5jdGlvbi5cbiAqIEByZXR1cm4ge09ic2VydmFibGV9IEFuIE9ic2VydmFibGUgb2YgdmFsdWVzIGZyb20gdGhlIHNvdXJjZSB0aGF0IHdlcmVcbiAqIGFsbG93ZWQgYnkgdGhlIGBwcmVkaWNhdGVgIGZ1bmN0aW9uLlxuICogQG1ldGhvZCBmaWx0ZXJcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmaWx0ZXIocHJlZGljYXRlLCB0aGlzQXJnKSB7XG4gICAgcmV0dXJuIHRoaXMubGlmdChuZXcgRmlsdGVyT3BlcmF0b3IocHJlZGljYXRlLCB0aGlzQXJnKSk7XG59XG5jbGFzcyBGaWx0ZXJPcGVyYXRvciB7XG4gICAgY29uc3RydWN0b3IocHJlZGljYXRlLCB0aGlzQXJnKSB7XG4gICAgICAgIHRoaXMucHJlZGljYXRlID0gcHJlZGljYXRlO1xuICAgICAgICB0aGlzLnRoaXNBcmcgPSB0aGlzQXJnO1xuICAgIH1cbiAgICBjYWxsKHN1YnNjcmliZXIsIHNvdXJjZSkge1xuICAgICAgICByZXR1cm4gc291cmNlLl9zdWJzY3JpYmUobmV3IEZpbHRlclN1YnNjcmliZXIoc3Vic2NyaWJlciwgdGhpcy5wcmVkaWNhdGUsIHRoaXMudGhpc0FyZykpO1xuICAgIH1cbn1cbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBpZ25vcmVcbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICovXG5jbGFzcyBGaWx0ZXJTdWJzY3JpYmVyIGV4dGVuZHMgU3Vic2NyaWJlciB7XG4gICAgY29uc3RydWN0b3IoZGVzdGluYXRpb24sIHByZWRpY2F0ZSwgdGhpc0FyZykge1xuICAgICAgICBzdXBlcihkZXN0aW5hdGlvbik7XG4gICAgICAgIHRoaXMucHJlZGljYXRlID0gcHJlZGljYXRlO1xuICAgICAgICB0aGlzLnRoaXNBcmcgPSB0aGlzQXJnO1xuICAgICAgICB0aGlzLmNvdW50ID0gMDtcbiAgICAgICAgdGhpcy5wcmVkaWNhdGUgPSBwcmVkaWNhdGU7XG4gICAgfVxuICAgIC8vIHRoZSB0cnkgY2F0Y2ggYmxvY2sgYmVsb3cgaXMgbGVmdCBzcGVjaWZpY2FsbHkgZm9yXG4gICAgLy8gb3B0aW1pemF0aW9uIGFuZCBwZXJmIHJlYXNvbnMuIGEgdHJ5Q2F0Y2hlciBpcyBub3QgbmVjZXNzYXJ5IGhlcmUuXG4gICAgX25leHQodmFsdWUpIHtcbiAgICAgICAgbGV0IHJlc3VsdDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMucHJlZGljYXRlLmNhbGwodGhpcy50aGlzQXJnLCB2YWx1ZSwgdGhpcy5jb3VudCsrKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICB0aGlzLmRlc3RpbmF0aW9uLmVycm9yKGVycik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5uZXh0KHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWZpbHRlci5qcy5tYXAiLCJpbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi4vU3Vic2NyaWJlcic7XG4vKipcbiAqIEFwcGxpZXMgYSBnaXZlbiBgcHJvamVjdGAgZnVuY3Rpb24gdG8gZWFjaCB2YWx1ZSBlbWl0dGVkIGJ5IHRoZSBzb3VyY2VcbiAqIE9ic2VydmFibGUsIGFuZCBlbWl0cyB0aGUgcmVzdWx0aW5nIHZhbHVlcyBhcyBhbiBPYnNlcnZhYmxlLlxuICpcbiAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5MaWtlIFtBcnJheS5wcm90b3R5cGUubWFwKCldKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0FycmF5L21hcCksXG4gKiBpdCBwYXNzZXMgZWFjaCBzb3VyY2UgdmFsdWUgdGhyb3VnaCBhIHRyYW5zZm9ybWF0aW9uIGZ1bmN0aW9uIHRvIGdldFxuICogY29ycmVzcG9uZGluZyBvdXRwdXQgdmFsdWVzLjwvc3Bhbj5cbiAqXG4gKiA8aW1nIHNyYz1cIi4vaW1nL21hcC5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAqXG4gKiBTaW1pbGFyIHRvIHRoZSB3ZWxsIGtub3duIGBBcnJheS5wcm90b3R5cGUubWFwYCBmdW5jdGlvbiwgdGhpcyBvcGVyYXRvclxuICogYXBwbGllcyBhIHByb2plY3Rpb24gdG8gZWFjaCB2YWx1ZSBhbmQgZW1pdHMgdGhhdCBwcm9qZWN0aW9uIGluIHRoZSBvdXRwdXRcbiAqIE9ic2VydmFibGUuXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+TWFwIGV2ZXJ5IGV2ZXJ5IGNsaWNrIHRvIHRoZSBjbGllbnRYIHBvc2l0aW9uIG9mIHRoYXQgY2xpY2s8L2NhcHRpb24+XG4gKiB2YXIgY2xpY2tzID0gUnguT2JzZXJ2YWJsZS5mcm9tRXZlbnQoZG9jdW1lbnQsICdjbGljaycpO1xuICogdmFyIHBvc2l0aW9ucyA9IGNsaWNrcy5tYXAoZXYgPT4gZXYuY2xpZW50WCk7XG4gKiBwb3NpdGlvbnMuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICpcbiAqIEBzZWUge0BsaW5rIG1hcFRvfVxuICogQHNlZSB7QGxpbmsgcGx1Y2t9XG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbih2YWx1ZTogVCwgaW5kZXg6IG51bWJlcik6IFJ9IHByb2plY3QgVGhlIGZ1bmN0aW9uIHRvIGFwcGx5XG4gKiB0byBlYWNoIGB2YWx1ZWAgZW1pdHRlZCBieSB0aGUgc291cmNlIE9ic2VydmFibGUuIFRoZSBgaW5kZXhgIHBhcmFtZXRlciBpc1xuICogdGhlIG51bWJlciBgaWAgZm9yIHRoZSBpLXRoIGVtaXNzaW9uIHRoYXQgaGFzIGhhcHBlbmVkIHNpbmNlIHRoZVxuICogc3Vic2NyaXB0aW9uLCBzdGFydGluZyBmcm9tIHRoZSBudW1iZXIgYDBgLlxuICogQHBhcmFtIHthbnl9IFt0aGlzQXJnXSBBbiBvcHRpb25hbCBhcmd1bWVudCB0byBkZWZpbmUgd2hhdCBgdGhpc2AgaXMgaW4gdGhlXG4gKiBgcHJvamVjdGAgZnVuY3Rpb24uXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFI+fSBBbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgdGhlIHZhbHVlcyBmcm9tIHRoZSBzb3VyY2VcbiAqIE9ic2VydmFibGUgdHJhbnNmb3JtZWQgYnkgdGhlIGdpdmVuIGBwcm9qZWN0YCBmdW5jdGlvbi5cbiAqIEBtZXRob2QgbWFwXG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gbWFwKHByb2plY3QsIHRoaXNBcmcpIHtcbiAgICBpZiAodHlwZW9mIHByb2plY3QgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignYXJndW1lbnQgaXMgbm90IGEgZnVuY3Rpb24uIEFyZSB5b3UgbG9va2luZyBmb3IgYG1hcFRvKClgPycpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5saWZ0KG5ldyBNYXBPcGVyYXRvcihwcm9qZWN0LCB0aGlzQXJnKSk7XG59XG5leHBvcnQgY2xhc3MgTWFwT3BlcmF0b3Ige1xuICAgIGNvbnN0cnVjdG9yKHByb2plY3QsIHRoaXNBcmcpIHtcbiAgICAgICAgdGhpcy5wcm9qZWN0ID0gcHJvamVjdDtcbiAgICAgICAgdGhpcy50aGlzQXJnID0gdGhpc0FyZztcbiAgICB9XG4gICAgY2FsbChzdWJzY3JpYmVyLCBzb3VyY2UpIHtcbiAgICAgICAgcmV0dXJuIHNvdXJjZS5fc3Vic2NyaWJlKG5ldyBNYXBTdWJzY3JpYmVyKHN1YnNjcmliZXIsIHRoaXMucHJvamVjdCwgdGhpcy50aGlzQXJnKSk7XG4gICAgfVxufVxuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbmNsYXNzIE1hcFN1YnNjcmliZXIgZXh0ZW5kcyBTdWJzY3JpYmVyIHtcbiAgICBjb25zdHJ1Y3RvcihkZXN0aW5hdGlvbiwgcHJvamVjdCwgdGhpc0FyZykge1xuICAgICAgICBzdXBlcihkZXN0aW5hdGlvbik7XG4gICAgICAgIHRoaXMucHJvamVjdCA9IHByb2plY3Q7XG4gICAgICAgIHRoaXMuY291bnQgPSAwO1xuICAgICAgICB0aGlzLnRoaXNBcmcgPSB0aGlzQXJnIHx8IHRoaXM7XG4gICAgfVxuICAgIC8vIE5PVEU6IFRoaXMgbG9va3MgdW5vcHRpbWl6ZWQsIGJ1dCBpdCdzIGFjdHVhbGx5IHB1cnBvc2VmdWxseSBOT1RcbiAgICAvLyB1c2luZyB0cnkvY2F0Y2ggb3B0aW1pemF0aW9ucy5cbiAgICBfbmV4dCh2YWx1ZSkge1xuICAgICAgICBsZXQgcmVzdWx0O1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5wcm9qZWN0LmNhbGwodGhpcy50aGlzQXJnLCB2YWx1ZSwgdGhpcy5jb3VudCsrKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICB0aGlzLmRlc3RpbmF0aW9uLmVycm9yKGVycik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5uZXh0KHJlc3VsdCk7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwLmpzLm1hcCIsImltcG9ydCB7IEFycmF5T2JzZXJ2YWJsZSB9IGZyb20gJy4uL29ic2VydmFibGUvQXJyYXlPYnNlcnZhYmxlJztcbmltcG9ydCB7IE1lcmdlQWxsT3BlcmF0b3IgfSBmcm9tICcuL21lcmdlQWxsJztcbmltcG9ydCB7IGlzU2NoZWR1bGVyIH0gZnJvbSAnLi4vdXRpbC9pc1NjaGVkdWxlcic7XG4vKipcbiAqIENyZWF0ZXMgYW4gb3V0cHV0IE9ic2VydmFibGUgd2hpY2ggY29uY3VycmVudGx5IGVtaXRzIGFsbCB2YWx1ZXMgZnJvbSBldmVyeVxuICogZ2l2ZW4gaW5wdXQgT2JzZXJ2YWJsZS5cbiAqXG4gKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+RmxhdHRlbnMgbXVsdGlwbGUgT2JzZXJ2YWJsZXMgdG9nZXRoZXIgYnkgYmxlbmRpbmdcbiAqIHRoZWlyIHZhbHVlcyBpbnRvIG9uZSBPYnNlcnZhYmxlLjwvc3Bhbj5cbiAqXG4gKiA8aW1nIHNyYz1cIi4vaW1nL21lcmdlLnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIGBtZXJnZWAgc3Vic2NyaWJlcyB0byBlYWNoIGdpdmVuIGlucHV0IE9ic2VydmFibGUgKGVpdGhlciB0aGUgc291cmNlIG9yIGFuXG4gKiBPYnNlcnZhYmxlIGdpdmVuIGFzIGFyZ3VtZW50KSwgYW5kIHNpbXBseSBmb3J3YXJkcyAod2l0aG91dCBkb2luZyBhbnlcbiAqIHRyYW5zZm9ybWF0aW9uKSBhbGwgdGhlIHZhbHVlcyBmcm9tIGFsbCB0aGUgaW5wdXQgT2JzZXJ2YWJsZXMgdG8gdGhlIG91dHB1dFxuICogT2JzZXJ2YWJsZS4gVGhlIG91dHB1dCBPYnNlcnZhYmxlIG9ubHkgY29tcGxldGVzIG9uY2UgYWxsIGlucHV0IE9ic2VydmFibGVzXG4gKiBoYXZlIGNvbXBsZXRlZC4gQW55IGVycm9yIGRlbGl2ZXJlZCBieSBhbiBpbnB1dCBPYnNlcnZhYmxlIHdpbGwgYmUgaW1tZWRpYXRlbHlcbiAqIGVtaXR0ZWQgb24gdGhlIG91dHB1dCBPYnNlcnZhYmxlLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPk1lcmdlIHRvZ2V0aGVyIHR3byBPYnNlcnZhYmxlczogMXMgaW50ZXJ2YWwgYW5kIGNsaWNrczwvY2FwdGlvbj5cbiAqIHZhciBjbGlja3MgPSBSeC5PYnNlcnZhYmxlLmZyb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJyk7XG4gKiB2YXIgdGltZXIgPSBSeC5PYnNlcnZhYmxlLmludGVydmFsKDEwMDApO1xuICogdmFyIGNsaWNrc09yVGltZXIgPSBjbGlja3MubWVyZ2UodGltZXIpO1xuICogY2xpY2tzT3JUaW1lci5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+TWVyZ2UgdG9nZXRoZXIgMyBPYnNlcnZhYmxlcywgYnV0IG9ubHkgMiBydW4gY29uY3VycmVudGx5PC9jYXB0aW9uPlxuICogdmFyIHRpbWVyMSA9IFJ4Lk9ic2VydmFibGUuaW50ZXJ2YWwoMTAwMCkudGFrZSgxMCk7XG4gKiB2YXIgdGltZXIyID0gUnguT2JzZXJ2YWJsZS5pbnRlcnZhbCgyMDAwKS50YWtlKDYpO1xuICogdmFyIHRpbWVyMyA9IFJ4Lk9ic2VydmFibGUuaW50ZXJ2YWwoNTAwKS50YWtlKDEwKTtcbiAqIHZhciBjb25jdXJyZW50ID0gMjsgLy8gdGhlIGFyZ3VtZW50XG4gKiB2YXIgbWVyZ2VkID0gdGltZXIxLm1lcmdlKHRpbWVyMiwgdGltZXIzLCBjb25jdXJyZW50KTtcbiAqIG1lcmdlZC5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gKlxuICogQHNlZSB7QGxpbmsgbWVyZ2VBbGx9XG4gKiBAc2VlIHtAbGluayBtZXJnZU1hcH1cbiAqIEBzZWUge0BsaW5rIG1lcmdlTWFwVG99XG4gKiBAc2VlIHtAbGluayBtZXJnZVNjYW59XG4gKlxuICogQHBhcmFtIHtPYnNlcnZhYmxlfSBvdGhlciBBbiBpbnB1dCBPYnNlcnZhYmxlIHRvIG1lcmdlIHdpdGggdGhlIHNvdXJjZVxuICogT2JzZXJ2YWJsZS4gTW9yZSB0aGFuIG9uZSBpbnB1dCBPYnNlcnZhYmxlcyBtYXkgYmUgZ2l2ZW4gYXMgYXJndW1lbnQuXG4gKiBAcGFyYW0ge251bWJlcn0gW2NvbmN1cnJlbnQ9TnVtYmVyLlBPU0lUSVZFX0lORklOSVRZXSBNYXhpbXVtIG51bWJlciBvZiBpbnB1dFxuICogT2JzZXJ2YWJsZXMgYmVpbmcgc3Vic2NyaWJlZCB0byBjb25jdXJyZW50bHkuXG4gKiBAcGFyYW0ge1NjaGVkdWxlcn0gW3NjaGVkdWxlcj1udWxsXSBUaGUgU2NoZWR1bGVyIHRvIHVzZSBmb3IgbWFuYWdpbmdcbiAqIGNvbmN1cnJlbmN5IG9mIGlucHV0IE9ic2VydmFibGVzLlxuICogQHJldHVybiB7T2JzZXJ2YWJsZX0gYW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIGl0ZW1zIHRoYXQgYXJlIHRoZSByZXN1bHQgb2ZcbiAqIGV2ZXJ5IGlucHV0IE9ic2VydmFibGUuXG4gKiBAbWV0aG9kIG1lcmdlXG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2UoLi4ub2JzZXJ2YWJsZXMpIHtcbiAgICBvYnNlcnZhYmxlcy51bnNoaWZ0KHRoaXMpO1xuICAgIHJldHVybiBtZXJnZVN0YXRpYy5hcHBseSh0aGlzLCBvYnNlcnZhYmxlcyk7XG59XG4vKiB0c2xpbnQ6ZW5hYmxlOm1heC1saW5lLWxlbmd0aCAqL1xuLyoqXG4gKiBDcmVhdGVzIGFuIG91dHB1dCBPYnNlcnZhYmxlIHdoaWNoIGNvbmN1cnJlbnRseSBlbWl0cyBhbGwgdmFsdWVzIGZyb20gZXZlcnlcbiAqIGdpdmVuIGlucHV0IE9ic2VydmFibGUuXG4gKlxuICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPkZsYXR0ZW5zIG11bHRpcGxlIE9ic2VydmFibGVzIHRvZ2V0aGVyIGJ5IGJsZW5kaW5nXG4gKiB0aGVpciB2YWx1ZXMgaW50byBvbmUgT2JzZXJ2YWJsZS48L3NwYW4+XG4gKlxuICogPGltZyBzcmM9XCIuL2ltZy9tZXJnZS5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAqXG4gKiBgbWVyZ2VgIHN1YnNjcmliZXMgdG8gZWFjaCBnaXZlbiBpbnB1dCBPYnNlcnZhYmxlIChhcyBhcmd1bWVudHMpLCBhbmQgc2ltcGx5XG4gKiBmb3J3YXJkcyAod2l0aG91dCBkb2luZyBhbnkgdHJhbnNmb3JtYXRpb24pIGFsbCB0aGUgdmFsdWVzIGZyb20gYWxsIHRoZSBpbnB1dFxuICogT2JzZXJ2YWJsZXMgdG8gdGhlIG91dHB1dCBPYnNlcnZhYmxlLiBUaGUgb3V0cHV0IE9ic2VydmFibGUgb25seSBjb21wbGV0ZXNcbiAqIG9uY2UgYWxsIGlucHV0IE9ic2VydmFibGVzIGhhdmUgY29tcGxldGVkLiBBbnkgZXJyb3IgZGVsaXZlcmVkIGJ5IGFuIGlucHV0XG4gKiBPYnNlcnZhYmxlIHdpbGwgYmUgaW1tZWRpYXRlbHkgZW1pdHRlZCBvbiB0aGUgb3V0cHV0IE9ic2VydmFibGUuXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+TWVyZ2UgdG9nZXRoZXIgdHdvIE9ic2VydmFibGVzOiAxcyBpbnRlcnZhbCBhbmQgY2xpY2tzPC9jYXB0aW9uPlxuICogdmFyIGNsaWNrcyA9IFJ4Lk9ic2VydmFibGUuZnJvbUV2ZW50KGRvY3VtZW50LCAnY2xpY2snKTtcbiAqIHZhciB0aW1lciA9IFJ4Lk9ic2VydmFibGUuaW50ZXJ2YWwoMTAwMCk7XG4gKiB2YXIgY2xpY2tzT3JUaW1lciA9IFJ4Lk9ic2VydmFibGUubWVyZ2UoY2xpY2tzLCB0aW1lcik7XG4gKiBjbGlja3NPclRpbWVyLnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5NZXJnZSB0b2dldGhlciAzIE9ic2VydmFibGVzLCBidXQgb25seSAyIHJ1biBjb25jdXJyZW50bHk8L2NhcHRpb24+XG4gKiB2YXIgdGltZXIxID0gUnguT2JzZXJ2YWJsZS5pbnRlcnZhbCgxMDAwKS50YWtlKDEwKTtcbiAqIHZhciB0aW1lcjIgPSBSeC5PYnNlcnZhYmxlLmludGVydmFsKDIwMDApLnRha2UoNik7XG4gKiB2YXIgdGltZXIzID0gUnguT2JzZXJ2YWJsZS5pbnRlcnZhbCg1MDApLnRha2UoMTApO1xuICogdmFyIGNvbmN1cnJlbnQgPSAyOyAvLyB0aGUgYXJndW1lbnRcbiAqIHZhciBtZXJnZWQgPSBSeC5PYnNlcnZhYmxlLm1lcmdlKHRpbWVyMSwgdGltZXIyLCB0aW1lcjMsIGNvbmN1cnJlbnQpO1xuICogbWVyZ2VkLnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAqXG4gKiBAc2VlIHtAbGluayBtZXJnZUFsbH1cbiAqIEBzZWUge0BsaW5rIG1lcmdlTWFwfVxuICogQHNlZSB7QGxpbmsgbWVyZ2VNYXBUb31cbiAqIEBzZWUge0BsaW5rIG1lcmdlU2Nhbn1cbiAqXG4gKiBAcGFyYW0ge09ic2VydmFibGV9IGlucHV0MSBBbiBpbnB1dCBPYnNlcnZhYmxlIHRvIG1lcmdlIHdpdGggb3RoZXJzLlxuICogQHBhcmFtIHtPYnNlcnZhYmxlfSBpbnB1dDIgQW4gaW5wdXQgT2JzZXJ2YWJsZSB0byBtZXJnZSB3aXRoIG90aGVycy5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbY29uY3VycmVudD1OdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFldIE1heGltdW0gbnVtYmVyIG9mIGlucHV0XG4gKiBPYnNlcnZhYmxlcyBiZWluZyBzdWJzY3JpYmVkIHRvIGNvbmN1cnJlbnRseS5cbiAqIEBwYXJhbSB7U2NoZWR1bGVyfSBbc2NoZWR1bGVyPW51bGxdIFRoZSBTY2hlZHVsZXIgdG8gdXNlIGZvciBtYW5hZ2luZ1xuICogY29uY3VycmVuY3kgb2YgaW5wdXQgT2JzZXJ2YWJsZXMuXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSBhbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgaXRlbXMgdGhhdCBhcmUgdGhlIHJlc3VsdCBvZlxuICogZXZlcnkgaW5wdXQgT2JzZXJ2YWJsZS5cbiAqIEBzdGF0aWMgdHJ1ZVxuICogQG5hbWUgbWVyZ2VcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZVN0YXRpYyguLi5vYnNlcnZhYmxlcykge1xuICAgIGxldCBjb25jdXJyZW50ID0gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZO1xuICAgIGxldCBzY2hlZHVsZXIgPSBudWxsO1xuICAgIGxldCBsYXN0ID0gb2JzZXJ2YWJsZXNbb2JzZXJ2YWJsZXMubGVuZ3RoIC0gMV07XG4gICAgaWYgKGlzU2NoZWR1bGVyKGxhc3QpKSB7XG4gICAgICAgIHNjaGVkdWxlciA9IG9ic2VydmFibGVzLnBvcCgpO1xuICAgICAgICBpZiAob2JzZXJ2YWJsZXMubGVuZ3RoID4gMSAmJiB0eXBlb2Ygb2JzZXJ2YWJsZXNbb2JzZXJ2YWJsZXMubGVuZ3RoIC0gMV0gPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICBjb25jdXJyZW50ID0gb2JzZXJ2YWJsZXMucG9wKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGxhc3QgPT09ICdudW1iZXInKSB7XG4gICAgICAgIGNvbmN1cnJlbnQgPSBvYnNlcnZhYmxlcy5wb3AoKTtcbiAgICB9XG4gICAgaWYgKG9ic2VydmFibGVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZXNbMF07XG4gICAgfVxuICAgIHJldHVybiBuZXcgQXJyYXlPYnNlcnZhYmxlKG9ic2VydmFibGVzLCBzY2hlZHVsZXIpLmxpZnQobmV3IE1lcmdlQWxsT3BlcmF0b3IoY29uY3VycmVudCkpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWVyZ2UuanMubWFwIiwiaW1wb3J0IHsgT3V0ZXJTdWJzY3JpYmVyIH0gZnJvbSAnLi4vT3V0ZXJTdWJzY3JpYmVyJztcbmltcG9ydCB7IHN1YnNjcmliZVRvUmVzdWx0IH0gZnJvbSAnLi4vdXRpbC9zdWJzY3JpYmVUb1Jlc3VsdCc7XG4vKipcbiAqIENvbnZlcnRzIGEgaGlnaGVyLW9yZGVyIE9ic2VydmFibGUgaW50byBhIGZpcnN0LW9yZGVyIE9ic2VydmFibGUgd2hpY2hcbiAqIGNvbmN1cnJlbnRseSBkZWxpdmVycyBhbGwgdmFsdWVzIHRoYXQgYXJlIGVtaXR0ZWQgb24gdGhlIGlubmVyIE9ic2VydmFibGVzLlxuICpcbiAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5GbGF0dGVucyBhbiBPYnNlcnZhYmxlLW9mLU9ic2VydmFibGVzLjwvc3Bhbj5cbiAqXG4gKiA8aW1nIHNyYz1cIi4vaW1nL21lcmdlQWxsLnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIGBtZXJnZUFsbGAgc3Vic2NyaWJlcyB0byBhbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgT2JzZXJ2YWJsZXMsIGFsc28ga25vd24gYXNcbiAqIGEgaGlnaGVyLW9yZGVyIE9ic2VydmFibGUuIEVhY2ggdGltZSBpdCBvYnNlcnZlcyBvbmUgb2YgdGhlc2UgZW1pdHRlZCBpbm5lclxuICogT2JzZXJ2YWJsZXMsIGl0IHN1YnNjcmliZXMgdG8gdGhhdCBhbmQgZGVsaXZlcnMgYWxsIHRoZSB2YWx1ZXMgZnJvbSB0aGVcbiAqIGlubmVyIE9ic2VydmFibGUgb24gdGhlIG91dHB1dCBPYnNlcnZhYmxlLiBUaGUgb3V0cHV0IE9ic2VydmFibGUgb25seVxuICogY29tcGxldGVzIG9uY2UgYWxsIGlubmVyIE9ic2VydmFibGVzIGhhdmUgY29tcGxldGVkLiBBbnkgZXJyb3IgZGVsaXZlcmVkIGJ5XG4gKiBhIGlubmVyIE9ic2VydmFibGUgd2lsbCBiZSBpbW1lZGlhdGVseSBlbWl0dGVkIG9uIHRoZSBvdXRwdXQgT2JzZXJ2YWJsZS5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5TcGF3biBhIG5ldyBpbnRlcnZhbCBPYnNlcnZhYmxlIGZvciBlYWNoIGNsaWNrIGV2ZW50LCBhbmQgYmxlbmQgdGhlaXIgb3V0cHV0cyBhcyBvbmUgT2JzZXJ2YWJsZTwvY2FwdGlvbj5cbiAqIHZhciBjbGlja3MgPSBSeC5PYnNlcnZhYmxlLmZyb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJyk7XG4gKiB2YXIgaGlnaGVyT3JkZXIgPSBjbGlja3MubWFwKChldikgPT4gUnguT2JzZXJ2YWJsZS5pbnRlcnZhbCgxMDAwKSk7XG4gKiB2YXIgZmlyc3RPcmRlciA9IGhpZ2hlck9yZGVyLm1lcmdlQWxsKCk7XG4gKiBmaXJzdE9yZGVyLnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5Db3VudCBmcm9tIDAgdG8gOSBldmVyeSBzZWNvbmQgZm9yIGVhY2ggY2xpY2ssIGJ1dCBvbmx5IGFsbG93IDIgY29uY3VycmVudCB0aW1lcnM8L2NhcHRpb24+XG4gKiB2YXIgY2xpY2tzID0gUnguT2JzZXJ2YWJsZS5mcm9tRXZlbnQoZG9jdW1lbnQsICdjbGljaycpO1xuICogdmFyIGhpZ2hlck9yZGVyID0gY2xpY2tzLm1hcCgoZXYpID0+IFJ4Lk9ic2VydmFibGUuaW50ZXJ2YWwoMTAwMCkudGFrZSgxMCkpO1xuICogdmFyIGZpcnN0T3JkZXIgPSBoaWdoZXJPcmRlci5tZXJnZUFsbCgyKTtcbiAqIGZpcnN0T3JkZXIuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICpcbiAqIEBzZWUge0BsaW5rIGNvbWJpbmVBbGx9XG4gKiBAc2VlIHtAbGluayBjb25jYXRBbGx9XG4gKiBAc2VlIHtAbGluayBleGhhdXN0fVxuICogQHNlZSB7QGxpbmsgbWVyZ2V9XG4gKiBAc2VlIHtAbGluayBtZXJnZU1hcH1cbiAqIEBzZWUge0BsaW5rIG1lcmdlTWFwVG99XG4gKiBAc2VlIHtAbGluayBtZXJnZVNjYW59XG4gKiBAc2VlIHtAbGluayBzd2l0Y2h9XG4gKiBAc2VlIHtAbGluayB6aXBBbGx9XG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IFtjb25jdXJyZW50PU51bWJlci5QT1NJVElWRV9JTkZJTklUWV0gTWF4aW11bSBudW1iZXIgb2YgaW5uZXJcbiAqIE9ic2VydmFibGVzIGJlaW5nIHN1YnNjcmliZWQgdG8gY29uY3VycmVudGx5LlxuICogQHJldHVybiB7T2JzZXJ2YWJsZX0gQW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIHZhbHVlcyBjb21pbmcgZnJvbSBhbGwgdGhlXG4gKiBpbm5lciBPYnNlcnZhYmxlcyBlbWl0dGVkIGJ5IHRoZSBzb3VyY2UgT2JzZXJ2YWJsZS5cbiAqIEBtZXRob2QgbWVyZ2VBbGxcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZUFsbChjb25jdXJyZW50ID0gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZKSB7XG4gICAgcmV0dXJuIHRoaXMubGlmdChuZXcgTWVyZ2VBbGxPcGVyYXRvcihjb25jdXJyZW50KSk7XG59XG5leHBvcnQgY2xhc3MgTWVyZ2VBbGxPcGVyYXRvciB7XG4gICAgY29uc3RydWN0b3IoY29uY3VycmVudCkge1xuICAgICAgICB0aGlzLmNvbmN1cnJlbnQgPSBjb25jdXJyZW50O1xuICAgIH1cbiAgICBjYWxsKG9ic2VydmVyLCBzb3VyY2UpIHtcbiAgICAgICAgcmV0dXJuIHNvdXJjZS5fc3Vic2NyaWJlKG5ldyBNZXJnZUFsbFN1YnNjcmliZXIob2JzZXJ2ZXIsIHRoaXMuY29uY3VycmVudCkpO1xuICAgIH1cbn1cbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBpZ25vcmVcbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICovXG5leHBvcnQgY2xhc3MgTWVyZ2VBbGxTdWJzY3JpYmVyIGV4dGVuZHMgT3V0ZXJTdWJzY3JpYmVyIHtcbiAgICBjb25zdHJ1Y3RvcihkZXN0aW5hdGlvbiwgY29uY3VycmVudCkge1xuICAgICAgICBzdXBlcihkZXN0aW5hdGlvbik7XG4gICAgICAgIHRoaXMuY29uY3VycmVudCA9IGNvbmN1cnJlbnQ7XG4gICAgICAgIHRoaXMuaGFzQ29tcGxldGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuYnVmZmVyID0gW107XG4gICAgICAgIHRoaXMuYWN0aXZlID0gMDtcbiAgICB9XG4gICAgX25leHQob2JzZXJ2YWJsZSkge1xuICAgICAgICBpZiAodGhpcy5hY3RpdmUgPCB0aGlzLmNvbmN1cnJlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlKys7XG4gICAgICAgICAgICB0aGlzLmFkZChzdWJzY3JpYmVUb1Jlc3VsdCh0aGlzLCBvYnNlcnZhYmxlKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmJ1ZmZlci5wdXNoKG9ic2VydmFibGUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9jb21wbGV0ZSgpIHtcbiAgICAgICAgdGhpcy5oYXNDb21wbGV0ZWQgPSB0cnVlO1xuICAgICAgICBpZiAodGhpcy5hY3RpdmUgPT09IDAgJiYgdGhpcy5idWZmZXIubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmRlc3RpbmF0aW9uLmNvbXBsZXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbm90aWZ5Q29tcGxldGUoaW5uZXJTdWIpIHtcbiAgICAgICAgY29uc3QgYnVmZmVyID0gdGhpcy5idWZmZXI7XG4gICAgICAgIHRoaXMucmVtb3ZlKGlubmVyU3ViKTtcbiAgICAgICAgdGhpcy5hY3RpdmUtLTtcbiAgICAgICAgaWYgKGJ1ZmZlci5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLl9uZXh0KGJ1ZmZlci5zaGlmdCgpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmFjdGl2ZSA9PT0gMCAmJiB0aGlzLmhhc0NvbXBsZXRlZCkge1xuICAgICAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5jb21wbGV0ZSgpO1xuICAgICAgICB9XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWVyZ2VBbGwuanMubWFwIiwiaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuLyoqXG4gKiBSZXR1cm5zIGFuIE9ic2VydmFibGUgdGhhdCBtaXJyb3JzIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSwgcmVzdWJzY3JpYmluZyB0byBpdCBpZiBpdCBjYWxscyBgZXJyb3JgIGFuZCB0aGVcbiAqIHByZWRpY2F0ZSByZXR1cm5zIHRydWUgZm9yIHRoYXQgc3BlY2lmaWMgZXhjZXB0aW9uIGFuZCByZXRyeSBjb3VudC5cbiAqIElmIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSBjYWxscyBgZXJyb3JgLCB0aGlzIG1ldGhvZCB3aWxsIHJlc3Vic2NyaWJlIHRvIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSBmb3IgYSBtYXhpbXVtIG9mXG4gKiBjb3VudCByZXN1YnNjcmlwdGlvbnMgKGdpdmVuIGFzIGEgbnVtYmVyIHBhcmFtZXRlcikgcmF0aGVyIHRoYW4gcHJvcGFnYXRpbmcgdGhlIGBlcnJvcmAgY2FsbC5cbiAqXG4gKiA8aW1nIHNyYz1cIi4vaW1nL3JldHJ5LnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIEFueSBhbmQgYWxsIGl0ZW1zIGVtaXR0ZWQgYnkgdGhlIHNvdXJjZSBPYnNlcnZhYmxlIHdpbGwgYmUgZW1pdHRlZCBieSB0aGUgcmVzdWx0aW5nIE9ic2VydmFibGUsIGV2ZW4gdGhvc2UgZW1pdHRlZFxuICogZHVyaW5nIGZhaWxlZCBzdWJzY3JpcHRpb25zLiBGb3IgZXhhbXBsZSwgaWYgYW4gT2JzZXJ2YWJsZSBmYWlscyBhdCBmaXJzdCBidXQgZW1pdHMgWzEsIDJdIHRoZW4gc3VjY2VlZHMgdGhlIHNlY29uZFxuICogdGltZSBhbmQgZW1pdHM6IFsxLCAyLCAzLCA0LCA1XSB0aGVuIHRoZSBjb21wbGV0ZSBzdHJlYW0gb2YgZW1pc3Npb25zIGFuZCBub3RpZmljYXRpb25zXG4gKiB3b3VsZCBiZTogWzEsIDIsIDEsIDIsIDMsIDQsIDUsIGBjb21wbGV0ZWBdLlxuICogQHBhcmFtIHtudW1iZXJ9IG51bWJlciBvZiByZXRyeSBhdHRlbXB0cyBiZWZvcmUgZmFpbGluZy5cbiAqIEByZXR1cm4ge09ic2VydmFibGV9IHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSBtb2RpZmllZCB3aXRoIHRoZSByZXRyeSBsb2dpYy5cbiAqIEBtZXRob2QgcmV0cnlcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZXRyeShjb3VudCA9IC0xKSB7XG4gICAgcmV0dXJuIHRoaXMubGlmdChuZXcgUmV0cnlPcGVyYXRvcihjb3VudCwgdGhpcykpO1xufVxuY2xhc3MgUmV0cnlPcGVyYXRvciB7XG4gICAgY29uc3RydWN0b3IoY291bnQsIHNvdXJjZSkge1xuICAgICAgICB0aGlzLmNvdW50ID0gY291bnQ7XG4gICAgICAgIHRoaXMuc291cmNlID0gc291cmNlO1xuICAgIH1cbiAgICBjYWxsKHN1YnNjcmliZXIsIHNvdXJjZSkge1xuICAgICAgICByZXR1cm4gc291cmNlLl9zdWJzY3JpYmUobmV3IFJldHJ5U3Vic2NyaWJlcihzdWJzY3JpYmVyLCB0aGlzLmNvdW50LCB0aGlzLnNvdXJjZSkpO1xuICAgIH1cbn1cbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBpZ25vcmVcbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICovXG5jbGFzcyBSZXRyeVN1YnNjcmliZXIgZXh0ZW5kcyBTdWJzY3JpYmVyIHtcbiAgICBjb25zdHJ1Y3RvcihkZXN0aW5hdGlvbiwgY291bnQsIHNvdXJjZSkge1xuICAgICAgICBzdXBlcihkZXN0aW5hdGlvbik7XG4gICAgICAgIHRoaXMuY291bnQgPSBjb3VudDtcbiAgICAgICAgdGhpcy5zb3VyY2UgPSBzb3VyY2U7XG4gICAgfVxuICAgIGVycm9yKGVycikge1xuICAgICAgICBpZiAoIXRoaXMuaXNTdG9wcGVkKSB7XG4gICAgICAgICAgICBjb25zdCB7IHNvdXJjZSwgY291bnQgfSA9IHRoaXM7XG4gICAgICAgICAgICBpZiAoY291bnQgPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3VwZXIuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNvdW50ID4gLTEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvdW50ID0gY291bnQgLSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgdGhpcy5pc1N0b3BwZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuY2xvc2VkID0gZmFsc2U7XG4gICAgICAgICAgICBzb3VyY2Uuc3Vic2NyaWJlKHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cmV0cnkuanMubWFwIiwiaW1wb3J0IHsgT3V0ZXJTdWJzY3JpYmVyIH0gZnJvbSAnLi4vT3V0ZXJTdWJzY3JpYmVyJztcbmltcG9ydCB7IHN1YnNjcmliZVRvUmVzdWx0IH0gZnJvbSAnLi4vdXRpbC9zdWJzY3JpYmVUb1Jlc3VsdCc7XG4vKipcbiAqIENvbnZlcnRzIGEgaGlnaGVyLW9yZGVyIE9ic2VydmFibGUgaW50byBhIGZpcnN0LW9yZGVyIE9ic2VydmFibGUgYnlcbiAqIHN1YnNjcmliaW5nIHRvIG9ubHkgdGhlIG1vc3QgcmVjZW50bHkgZW1pdHRlZCBvZiB0aG9zZSBpbm5lciBPYnNlcnZhYmxlcy5cbiAqXG4gKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+RmxhdHRlbnMgYW4gT2JzZXJ2YWJsZS1vZi1PYnNlcnZhYmxlcyBieSBkcm9wcGluZyB0aGVcbiAqIHByZXZpb3VzIGlubmVyIE9ic2VydmFibGUgb25jZSBhIG5ldyBvbmUgYXBwZWFycy48L3NwYW4+XG4gKlxuICogPGltZyBzcmM9XCIuL2ltZy9zd2l0Y2gucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gKlxuICogYHN3aXRjaGAgc3Vic2NyaWJlcyB0byBhbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgT2JzZXJ2YWJsZXMsIGFsc28ga25vd24gYXMgYVxuICogaGlnaGVyLW9yZGVyIE9ic2VydmFibGUuIEVhY2ggdGltZSBpdCBvYnNlcnZlcyBvbmUgb2YgdGhlc2UgZW1pdHRlZCBpbm5lclxuICogT2JzZXJ2YWJsZXMsIHRoZSBvdXRwdXQgT2JzZXJ2YWJsZSBzdWJzY3JpYmVzIHRvIHRoZSBpbm5lciBPYnNlcnZhYmxlIGFuZFxuICogYmVnaW5zIGVtaXR0aW5nIHRoZSBpdGVtcyBlbWl0dGVkIGJ5IHRoYXQuIFNvIGZhciwgaXQgYmVoYXZlc1xuICogbGlrZSB7QGxpbmsgbWVyZ2VBbGx9LiBIb3dldmVyLCB3aGVuIGEgbmV3IGlubmVyIE9ic2VydmFibGUgaXMgZW1pdHRlZCxcbiAqIGBzd2l0Y2hgIHVuc3Vic2NyaWJlcyBmcm9tIHRoZSBlYXJsaWVyLWVtaXR0ZWQgaW5uZXIgT2JzZXJ2YWJsZSBhbmRcbiAqIHN1YnNjcmliZXMgdG8gdGhlIG5ldyBpbm5lciBPYnNlcnZhYmxlIGFuZCBiZWdpbnMgZW1pdHRpbmcgaXRlbXMgZnJvbSBpdC4gSXRcbiAqIGNvbnRpbnVlcyB0byBiZWhhdmUgbGlrZSB0aGlzIGZvciBzdWJzZXF1ZW50IGlubmVyIE9ic2VydmFibGVzLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPlJlcnVuIGFuIGludGVydmFsIE9ic2VydmFibGUgb24gZXZlcnkgY2xpY2sgZXZlbnQ8L2NhcHRpb24+XG4gKiB2YXIgY2xpY2tzID0gUnguT2JzZXJ2YWJsZS5mcm9tRXZlbnQoZG9jdW1lbnQsICdjbGljaycpO1xuICogLy8gRWFjaCBjbGljayBldmVudCBpcyBtYXBwZWQgdG8gYW4gT2JzZXJ2YWJsZSB0aGF0IHRpY2tzIGV2ZXJ5IHNlY29uZFxuICogdmFyIGhpZ2hlck9yZGVyID0gY2xpY2tzLm1hcCgoZXYpID0+IFJ4Lk9ic2VydmFibGUuaW50ZXJ2YWwoMTAwMCkpO1xuICogdmFyIHN3aXRjaGVkID0gaGlnaGVyT3JkZXIuc3dpdGNoKCk7XG4gKiAvLyBUaGUgb3V0Y29tZSBpcyB0aGF0IGBzd2l0Y2hlZGAgaXMgZXNzZW50aWFsbHkgYSB0aW1lciB0aGF0IHJlc3RhcnRzXG4gKiAvLyBvbiBldmVyeSBjbGljay4gVGhlIGludGVydmFsIE9ic2VydmFibGVzIGZyb20gb2xkZXIgY2xpY2tzIGRvIG5vdCBtZXJnZVxuICogLy8gd2l0aCB0aGUgY3VycmVudCBpbnRlcnZhbCBPYnNlcnZhYmxlLlxuICogc3dpdGNoZWQuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICpcbiAqIEBzZWUge0BsaW5rIGNvbWJpbmVBbGx9XG4gKiBAc2VlIHtAbGluayBjb25jYXRBbGx9XG4gKiBAc2VlIHtAbGluayBleGhhdXN0fVxuICogQHNlZSB7QGxpbmsgbWVyZ2VBbGx9XG4gKiBAc2VlIHtAbGluayBzd2l0Y2hNYXB9XG4gKiBAc2VlIHtAbGluayBzd2l0Y2hNYXBUb31cbiAqIEBzZWUge0BsaW5rIHppcEFsbH1cbiAqXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFQ+fSBBbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgdGhlIGl0ZW1zIGVtaXR0ZWQgYnkgdGhlXG4gKiBPYnNlcnZhYmxlIG1vc3QgcmVjZW50bHkgZW1pdHRlZCBieSB0aGUgc291cmNlIE9ic2VydmFibGUuXG4gKiBAbWV0aG9kIHN3aXRjaFxuICogQG5hbWUgc3dpdGNoXG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gX3N3aXRjaCgpIHtcbiAgICByZXR1cm4gdGhpcy5saWZ0KG5ldyBTd2l0Y2hPcGVyYXRvcigpKTtcbn1cbmNsYXNzIFN3aXRjaE9wZXJhdG9yIHtcbiAgICBjYWxsKHN1YnNjcmliZXIsIHNvdXJjZSkge1xuICAgICAgICByZXR1cm4gc291cmNlLl9zdWJzY3JpYmUobmV3IFN3aXRjaFN1YnNjcmliZXIoc3Vic2NyaWJlcikpO1xuICAgIH1cbn1cbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBpZ25vcmVcbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICovXG5jbGFzcyBTd2l0Y2hTdWJzY3JpYmVyIGV4dGVuZHMgT3V0ZXJTdWJzY3JpYmVyIHtcbiAgICBjb25zdHJ1Y3RvcihkZXN0aW5hdGlvbikge1xuICAgICAgICBzdXBlcihkZXN0aW5hdGlvbik7XG4gICAgICAgIHRoaXMuYWN0aXZlID0gMDtcbiAgICAgICAgdGhpcy5oYXNDb21wbGV0ZWQgPSBmYWxzZTtcbiAgICB9XG4gICAgX25leHQodmFsdWUpIHtcbiAgICAgICAgdGhpcy51bnN1YnNjcmliZUlubmVyKCk7XG4gICAgICAgIHRoaXMuYWN0aXZlKys7XG4gICAgICAgIHRoaXMuYWRkKHRoaXMuaW5uZXJTdWJzY3JpcHRpb24gPSBzdWJzY3JpYmVUb1Jlc3VsdCh0aGlzLCB2YWx1ZSkpO1xuICAgIH1cbiAgICBfY29tcGxldGUoKSB7XG4gICAgICAgIHRoaXMuaGFzQ29tcGxldGVkID0gdHJ1ZTtcbiAgICAgICAgaWYgKHRoaXMuYWN0aXZlID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmRlc3RpbmF0aW9uLmNvbXBsZXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdW5zdWJzY3JpYmVJbm5lcigpIHtcbiAgICAgICAgdGhpcy5hY3RpdmUgPSB0aGlzLmFjdGl2ZSA+IDAgPyB0aGlzLmFjdGl2ZSAtIDEgOiAwO1xuICAgICAgICBjb25zdCBpbm5lclN1YnNjcmlwdGlvbiA9IHRoaXMuaW5uZXJTdWJzY3JpcHRpb247XG4gICAgICAgIGlmIChpbm5lclN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgaW5uZXJTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlKGlubmVyU3Vic2NyaXB0aW9uKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBub3RpZnlOZXh0KG91dGVyVmFsdWUsIGlubmVyVmFsdWUsIG91dGVySW5kZXgsIGlubmVySW5kZXgsIGlubmVyU3ViKSB7XG4gICAgICAgIHRoaXMuZGVzdGluYXRpb24ubmV4dChpbm5lclZhbHVlKTtcbiAgICB9XG4gICAgbm90aWZ5RXJyb3IoZXJyKSB7XG4gICAgICAgIHRoaXMuZGVzdGluYXRpb24uZXJyb3IoZXJyKTtcbiAgICB9XG4gICAgbm90aWZ5Q29tcGxldGUoKSB7XG4gICAgICAgIHRoaXMudW5zdWJzY3JpYmVJbm5lcigpO1xuICAgICAgICBpZiAodGhpcy5oYXNDb21wbGV0ZWQgJiYgdGhpcy5hY3RpdmUgPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuZGVzdGluYXRpb24uY29tcGxldGUoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXN3aXRjaC5qcy5tYXAiLCJpbXBvcnQgeyBPdXRlclN1YnNjcmliZXIgfSBmcm9tICcuLi9PdXRlclN1YnNjcmliZXInO1xuaW1wb3J0IHsgc3Vic2NyaWJlVG9SZXN1bHQgfSBmcm9tICcuLi91dGlsL3N1YnNjcmliZVRvUmVzdWx0Jztcbi8qKlxuICogUHJvamVjdHMgZWFjaCBzb3VyY2UgdmFsdWUgdG8gYW4gT2JzZXJ2YWJsZSB3aGljaCBpcyBtZXJnZWQgaW4gdGhlIG91dHB1dFxuICogT2JzZXJ2YWJsZSwgZW1pdHRpbmcgdmFsdWVzIG9ubHkgZnJvbSB0aGUgbW9zdCByZWNlbnRseSBwcm9qZWN0ZWQgT2JzZXJ2YWJsZS5cbiAqXG4gKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+TWFwcyBlYWNoIHZhbHVlIHRvIGFuIE9ic2VydmFibGUsIHRoZW4gZmxhdHRlbnMgYWxsIG9mXG4gKiB0aGVzZSBpbm5lciBPYnNlcnZhYmxlcyB1c2luZyB7QGxpbmsgc3dpdGNofS48L3NwYW4+XG4gKlxuICogPGltZyBzcmM9XCIuL2ltZy9zd2l0Y2hNYXAucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gKlxuICogUmV0dXJucyBhbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgaXRlbXMgYmFzZWQgb24gYXBwbHlpbmcgYSBmdW5jdGlvbiB0aGF0IHlvdVxuICogc3VwcGx5IHRvIGVhY2ggaXRlbSBlbWl0dGVkIGJ5IHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSwgd2hlcmUgdGhhdCBmdW5jdGlvblxuICogcmV0dXJucyBhbiAoc28tY2FsbGVkIFwiaW5uZXJcIikgT2JzZXJ2YWJsZS4gRWFjaCB0aW1lIGl0IG9ic2VydmVzIG9uZSBvZiB0aGVzZVxuICogaW5uZXIgT2JzZXJ2YWJsZXMsIHRoZSBvdXRwdXQgT2JzZXJ2YWJsZSBiZWdpbnMgZW1pdHRpbmcgdGhlIGl0ZW1zIGVtaXR0ZWQgYnlcbiAqIHRoYXQgaW5uZXIgT2JzZXJ2YWJsZS4gV2hlbiBhIG5ldyBpbm5lciBPYnNlcnZhYmxlIGlzIGVtaXR0ZWQsIGBzd2l0Y2hNYXBgXG4gKiBzdG9wcyBlbWl0dGluZyBpdGVtcyBmcm9tIHRoZSBlYXJsaWVyLWVtaXR0ZWQgaW5uZXIgT2JzZXJ2YWJsZSBhbmQgYmVnaW5zXG4gKiBlbWl0dGluZyBpdGVtcyBmcm9tIHRoZSBuZXcgb25lLiBJdCBjb250aW51ZXMgdG8gYmVoYXZlIGxpa2UgdGhpcyBmb3JcbiAqIHN1YnNlcXVlbnQgaW5uZXIgT2JzZXJ2YWJsZXMuXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+UmVydW4gYW4gaW50ZXJ2YWwgT2JzZXJ2YWJsZSBvbiBldmVyeSBjbGljayBldmVudDwvY2FwdGlvbj5cbiAqIHZhciBjbGlja3MgPSBSeC5PYnNlcnZhYmxlLmZyb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJyk7XG4gKiB2YXIgcmVzdWx0ID0gY2xpY2tzLnN3aXRjaE1hcCgoZXYpID0+IFJ4Lk9ic2VydmFibGUuaW50ZXJ2YWwoMTAwMCkpO1xuICogcmVzdWx0LnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAqXG4gKiBAc2VlIHtAbGluayBjb25jYXRNYXB9XG4gKiBAc2VlIHtAbGluayBleGhhdXN0TWFwfVxuICogQHNlZSB7QGxpbmsgbWVyZ2VNYXB9XG4gKiBAc2VlIHtAbGluayBzd2l0Y2h9XG4gKiBAc2VlIHtAbGluayBzd2l0Y2hNYXBUb31cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKHZhbHVlOiBULCA/aW5kZXg6IG51bWJlcik6IE9ic2VydmFibGV9IHByb2plY3QgQSBmdW5jdGlvblxuICogdGhhdCwgd2hlbiBhcHBsaWVkIHRvIGFuIGl0ZW0gZW1pdHRlZCBieSB0aGUgc291cmNlIE9ic2VydmFibGUsIHJldHVybnMgYW5cbiAqIE9ic2VydmFibGUuXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKG91dGVyVmFsdWU6IFQsIGlubmVyVmFsdWU6IEksIG91dGVySW5kZXg6IG51bWJlciwgaW5uZXJJbmRleDogbnVtYmVyKTogYW55fSBbcmVzdWx0U2VsZWN0b3JdXG4gKiBBIGZ1bmN0aW9uIHRvIHByb2R1Y2UgdGhlIHZhbHVlIG9uIHRoZSBvdXRwdXQgT2JzZXJ2YWJsZSBiYXNlZCBvbiB0aGUgdmFsdWVzXG4gKiBhbmQgdGhlIGluZGljZXMgb2YgdGhlIHNvdXJjZSAob3V0ZXIpIGVtaXNzaW9uIGFuZCB0aGUgaW5uZXIgT2JzZXJ2YWJsZVxuICogZW1pc3Npb24uIFRoZSBhcmd1bWVudHMgcGFzc2VkIHRvIHRoaXMgZnVuY3Rpb24gYXJlOlxuICogLSBgb3V0ZXJWYWx1ZWA6IHRoZSB2YWx1ZSB0aGF0IGNhbWUgZnJvbSB0aGUgc291cmNlXG4gKiAtIGBpbm5lclZhbHVlYDogdGhlIHZhbHVlIHRoYXQgY2FtZSBmcm9tIHRoZSBwcm9qZWN0ZWQgT2JzZXJ2YWJsZVxuICogLSBgb3V0ZXJJbmRleGA6IHRoZSBcImluZGV4XCIgb2YgdGhlIHZhbHVlIHRoYXQgY2FtZSBmcm9tIHRoZSBzb3VyY2VcbiAqIC0gYGlubmVySW5kZXhgOiB0aGUgXCJpbmRleFwiIG9mIHRoZSB2YWx1ZSBmcm9tIHRoZSBwcm9qZWN0ZWQgT2JzZXJ2YWJsZVxuICogQHJldHVybiB7T2JzZXJ2YWJsZX0gQW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIHRoZSByZXN1bHQgb2YgYXBwbHlpbmcgdGhlXG4gKiBwcm9qZWN0aW9uIGZ1bmN0aW9uIChhbmQgdGhlIG9wdGlvbmFsIGByZXN1bHRTZWxlY3RvcmApIHRvIGVhY2ggaXRlbSBlbWl0dGVkXG4gKiBieSB0aGUgc291cmNlIE9ic2VydmFibGUgYW5kIHRha2luZyBvbmx5IHRoZSB2YWx1ZXMgZnJvbSB0aGUgbW9zdCByZWNlbnRseVxuICogcHJvamVjdGVkIGlubmVyIE9ic2VydmFibGUuXG4gKiBAbWV0aG9kIHN3aXRjaE1hcFxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN3aXRjaE1hcChwcm9qZWN0LCByZXN1bHRTZWxlY3Rvcikge1xuICAgIHJldHVybiB0aGlzLmxpZnQobmV3IFN3aXRjaE1hcE9wZXJhdG9yKHByb2plY3QsIHJlc3VsdFNlbGVjdG9yKSk7XG59XG5jbGFzcyBTd2l0Y2hNYXBPcGVyYXRvciB7XG4gICAgY29uc3RydWN0b3IocHJvamVjdCwgcmVzdWx0U2VsZWN0b3IpIHtcbiAgICAgICAgdGhpcy5wcm9qZWN0ID0gcHJvamVjdDtcbiAgICAgICAgdGhpcy5yZXN1bHRTZWxlY3RvciA9IHJlc3VsdFNlbGVjdG9yO1xuICAgIH1cbiAgICBjYWxsKHN1YnNjcmliZXIsIHNvdXJjZSkge1xuICAgICAgICByZXR1cm4gc291cmNlLl9zdWJzY3JpYmUobmV3IFN3aXRjaE1hcFN1YnNjcmliZXIoc3Vic2NyaWJlciwgdGhpcy5wcm9qZWN0LCB0aGlzLnJlc3VsdFNlbGVjdG9yKSk7XG4gICAgfVxufVxuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbmNsYXNzIFN3aXRjaE1hcFN1YnNjcmliZXIgZXh0ZW5kcyBPdXRlclN1YnNjcmliZXIge1xuICAgIGNvbnN0cnVjdG9yKGRlc3RpbmF0aW9uLCBwcm9qZWN0LCByZXN1bHRTZWxlY3Rvcikge1xuICAgICAgICBzdXBlcihkZXN0aW5hdGlvbik7XG4gICAgICAgIHRoaXMucHJvamVjdCA9IHByb2plY3Q7XG4gICAgICAgIHRoaXMucmVzdWx0U2VsZWN0b3IgPSByZXN1bHRTZWxlY3RvcjtcbiAgICAgICAgdGhpcy5pbmRleCA9IDA7XG4gICAgfVxuICAgIF9uZXh0KHZhbHVlKSB7XG4gICAgICAgIGxldCByZXN1bHQ7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5pbmRleCsrO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5wcm9qZWN0KHZhbHVlLCBpbmRleCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICB0aGlzLmRlc3RpbmF0aW9uLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9pbm5lclN1YihyZXN1bHQsIHZhbHVlLCBpbmRleCk7XG4gICAgfVxuICAgIF9pbm5lclN1YihyZXN1bHQsIHZhbHVlLCBpbmRleCkge1xuICAgICAgICBjb25zdCBpbm5lclN1YnNjcmlwdGlvbiA9IHRoaXMuaW5uZXJTdWJzY3JpcHRpb247XG4gICAgICAgIGlmIChpbm5lclN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgaW5uZXJTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmFkZCh0aGlzLmlubmVyU3Vic2NyaXB0aW9uID0gc3Vic2NyaWJlVG9SZXN1bHQodGhpcywgcmVzdWx0LCB2YWx1ZSwgaW5kZXgpKTtcbiAgICB9XG4gICAgX2NvbXBsZXRlKCkge1xuICAgICAgICBjb25zdCB7IGlubmVyU3Vic2NyaXB0aW9uIH0gPSB0aGlzO1xuICAgICAgICBpZiAoIWlubmVyU3Vic2NyaXB0aW9uIHx8IGlubmVyU3Vic2NyaXB0aW9uLmNsb3NlZCkge1xuICAgICAgICAgICAgc3VwZXIuX2NvbXBsZXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX3Vuc3Vic2NyaWJlKCkge1xuICAgICAgICB0aGlzLmlubmVyU3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgICB9XG4gICAgbm90aWZ5Q29tcGxldGUoaW5uZXJTdWIpIHtcbiAgICAgICAgdGhpcy5yZW1vdmUoaW5uZXJTdWIpO1xuICAgICAgICB0aGlzLmlubmVyU3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgICAgICAgaWYgKHRoaXMuaXNTdG9wcGVkKSB7XG4gICAgICAgICAgICBzdXBlci5fY29tcGxldGUoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBub3RpZnlOZXh0KG91dGVyVmFsdWUsIGlubmVyVmFsdWUsIG91dGVySW5kZXgsIGlubmVySW5kZXgsIGlubmVyU3ViKSB7XG4gICAgICAgIGlmICh0aGlzLnJlc3VsdFNlbGVjdG9yKSB7XG4gICAgICAgICAgICB0aGlzLl90cnlOb3RpZnlOZXh0KG91dGVyVmFsdWUsIGlubmVyVmFsdWUsIG91dGVySW5kZXgsIGlubmVySW5kZXgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5uZXh0KGlubmVyVmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIF90cnlOb3RpZnlOZXh0KG91dGVyVmFsdWUsIGlubmVyVmFsdWUsIG91dGVySW5kZXgsIGlubmVySW5kZXgpIHtcbiAgICAgICAgbGV0IHJlc3VsdDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMucmVzdWx0U2VsZWN0b3Iob3V0ZXJWYWx1ZSwgaW5uZXJWYWx1ZSwgb3V0ZXJJbmRleCwgaW5uZXJJbmRleCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5lcnJvcihlcnIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGVzdGluYXRpb24ubmV4dChyZXN1bHQpO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXN3aXRjaE1hcC5qcy5tYXAiLCJpbXBvcnQgeyByb290IH0gZnJvbSAnLi4vdXRpbC9yb290JztcbmV4cG9ydCBsZXQgJCRpdGVyYXRvcjtcbmNvbnN0IFN5bWJvbCA9IHJvb3QuU3ltYm9sO1xuaWYgKHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicpIHtcbiAgICBpZiAoU3ltYm9sLml0ZXJhdG9yKSB7XG4gICAgICAgICQkaXRlcmF0b3IgPSBTeW1ib2wuaXRlcmF0b3I7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBTeW1ib2wuZm9yID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICQkaXRlcmF0b3IgPSBTeW1ib2wuZm9yKCdpdGVyYXRvcicpO1xuICAgIH1cbn1cbmVsc2Uge1xuICAgIGlmIChyb290LlNldCAmJiB0eXBlb2YgbmV3IHJvb3QuU2V0KClbJ0BAaXRlcmF0b3InXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAvLyBCdWcgZm9yIG1vemlsbGEgdmVyc2lvblxuICAgICAgICAkJGl0ZXJhdG9yID0gJ0BAaXRlcmF0b3InO1xuICAgIH1cbiAgICBlbHNlIGlmIChyb290Lk1hcCkge1xuICAgICAgICAvLyBlczYtc2hpbSBzcGVjaWZpYyBsb2dpY1xuICAgICAgICBsZXQga2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHJvb3QuTWFwLnByb3RvdHlwZSk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgbGV0IGtleSA9IGtleXNbaV07XG4gICAgICAgICAgICBpZiAoa2V5ICE9PSAnZW50cmllcycgJiYga2V5ICE9PSAnc2l6ZScgJiYgcm9vdC5NYXAucHJvdG90eXBlW2tleV0gPT09IHJvb3QuTWFwLnByb3RvdHlwZVsnZW50cmllcyddKSB7XG4gICAgICAgICAgICAgICAgJCRpdGVyYXRvciA9IGtleTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgJCRpdGVyYXRvciA9ICdAQGl0ZXJhdG9yJztcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pdGVyYXRvci5qcy5tYXAiLCJpbXBvcnQgeyByb290IH0gZnJvbSAnLi4vdXRpbC9yb290JztcbmV4cG9ydCBmdW5jdGlvbiBnZXRTeW1ib2xPYnNlcnZhYmxlKGNvbnRleHQpIHtcbiAgICBsZXQgJCRvYnNlcnZhYmxlO1xuICAgIGxldCBTeW1ib2wgPSBjb250ZXh0LlN5bWJvbDtcbiAgICBpZiAodHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBpZiAoU3ltYm9sLm9ic2VydmFibGUpIHtcbiAgICAgICAgICAgICQkb2JzZXJ2YWJsZSA9IFN5bWJvbC5vYnNlcnZhYmxlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgJCRvYnNlcnZhYmxlID0gU3ltYm9sKCdvYnNlcnZhYmxlJyk7XG4gICAgICAgICAgICBTeW1ib2wub2JzZXJ2YWJsZSA9ICQkb2JzZXJ2YWJsZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgJCRvYnNlcnZhYmxlID0gJ0BAb2JzZXJ2YWJsZSc7XG4gICAgfVxuICAgIHJldHVybiAkJG9ic2VydmFibGU7XG59XG5leHBvcnQgY29uc3QgJCRvYnNlcnZhYmxlID0gZ2V0U3ltYm9sT2JzZXJ2YWJsZShyb290KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW9ic2VydmFibGUuanMubWFwIiwiaW1wb3J0IHsgcm9vdCB9IGZyb20gJy4uL3V0aWwvcm9vdCc7XG5jb25zdCBTeW1ib2wgPSByb290LlN5bWJvbDtcbmV4cG9ydCBjb25zdCAkJHJ4U3Vic2NyaWJlciA9ICh0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBTeW1ib2wuZm9yID09PSAnZnVuY3Rpb24nKSA/XG4gICAgU3ltYm9sLmZvcigncnhTdWJzY3JpYmVyJykgOiAnQEByeFN1YnNjcmliZXInO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cnhTdWJzY3JpYmVyLmpzLm1hcCIsIi8qKlxuICogQW4gZXJyb3IgdGhyb3duIHdoZW4gYW4gYWN0aW9uIGlzIGludmFsaWQgYmVjYXVzZSB0aGUgb2JqZWN0IGhhcyBiZWVuXG4gKiB1bnN1YnNjcmliZWQuXG4gKlxuICogQHNlZSB7QGxpbmsgU3ViamVjdH1cbiAqIEBzZWUge0BsaW5rIEJlaGF2aW9yU3ViamVjdH1cbiAqXG4gKiBAY2xhc3MgT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3JcbiAqL1xuZXhwb3J0IGNsYXNzIE9iamVjdFVuc3Vic2NyaWJlZEVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBjb25zdCBlcnIgPSBzdXBlcignb2JqZWN0IHVuc3Vic2NyaWJlZCcpO1xuICAgICAgICB0aGlzLm5hbWUgPSBlcnIubmFtZSA9ICdPYmplY3RVbnN1YnNjcmliZWRFcnJvcic7XG4gICAgICAgIHRoaXMuc3RhY2sgPSBlcnIuc3RhY2s7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9IGVyci5tZXNzYWdlO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPU9iamVjdFVuc3Vic2NyaWJlZEVycm9yLmpzLm1hcCIsIi8qKlxuICogQW4gZXJyb3IgdGhyb3duIHdoZW4gb25lIG9yIG1vcmUgZXJyb3JzIGhhdmUgb2NjdXJyZWQgZHVyaW5nIHRoZVxuICogYHVuc3Vic2NyaWJlYCBvZiBhIHtAbGluayBTdWJzY3JpcHRpb259LlxuICovXG5leHBvcnQgY2xhc3MgVW5zdWJzY3JpcHRpb25FcnJvciBleHRlbmRzIEVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihlcnJvcnMpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5lcnJvcnMgPSBlcnJvcnM7XG4gICAgICAgIGNvbnN0IGVyciA9IEVycm9yLmNhbGwodGhpcywgZXJyb3JzID9cbiAgICAgICAgICAgIGAke2Vycm9ycy5sZW5ndGh9IGVycm9ycyBvY2N1cnJlZCBkdXJpbmcgdW5zdWJzY3JpcHRpb246XG4gICR7ZXJyb3JzLm1hcCgoZXJyLCBpKSA9PiBgJHtpICsgMX0pICR7ZXJyLnRvU3RyaW5nKCl9YCkuam9pbignXFxuICAnKX1gIDogJycpO1xuICAgICAgICB0aGlzLm5hbWUgPSBlcnIubmFtZSA9ICdVbnN1YnNjcmlwdGlvbkVycm9yJztcbiAgICAgICAgdGhpcy5zdGFjayA9IGVyci5zdGFjaztcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gZXJyLm1lc3NhZ2U7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9VW5zdWJzY3JpcHRpb25FcnJvci5qcy5tYXAiLCIvLyB0eXBlb2YgYW55IHNvIHRoYXQgaXQgd2UgZG9uJ3QgaGF2ZSB0byBjYXN0IHdoZW4gY29tcGFyaW5nIGEgcmVzdWx0IHRvIHRoZSBlcnJvciBvYmplY3RcbmV4cG9ydCB2YXIgZXJyb3JPYmplY3QgPSB7IGU6IHt9IH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1lcnJvck9iamVjdC5qcy5tYXAiLCJleHBvcnQgY29uc3QgaXNBcnJheSA9IEFycmF5LmlzQXJyYXkgfHwgKCh4KSA9PiB4ICYmIHR5cGVvZiB4Lmxlbmd0aCA9PT0gJ251bWJlcicpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aXNBcnJheS5qcy5tYXAiLCJleHBvcnQgZnVuY3Rpb24gaXNGdW5jdGlvbih4KSB7XG4gICAgcmV0dXJuIHR5cGVvZiB4ID09PSAnZnVuY3Rpb24nO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aXNGdW5jdGlvbi5qcy5tYXAiLCJleHBvcnQgZnVuY3Rpb24gaXNPYmplY3QoeCkge1xuICAgIHJldHVybiB4ICE9IG51bGwgJiYgdHlwZW9mIHggPT09ICdvYmplY3QnO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aXNPYmplY3QuanMubWFwIiwiZXhwb3J0IGZ1bmN0aW9uIGlzUHJvbWlzZSh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSAmJiB0eXBlb2YgdmFsdWUuc3Vic2NyaWJlICE9PSAnZnVuY3Rpb24nICYmIHR5cGVvZiB2YWx1ZS50aGVuID09PSAnZnVuY3Rpb24nO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aXNQcm9taXNlLmpzLm1hcCIsImV4cG9ydCBmdW5jdGlvbiBpc1NjaGVkdWxlcih2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSAmJiB0eXBlb2YgdmFsdWUuc2NoZWR1bGUgPT09ICdmdW5jdGlvbic7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pc1NjaGVkdWxlci5qcy5tYXAiLCJsZXQgb2JqZWN0VHlwZXMgPSB7XG4gICAgJ2Jvb2xlYW4nOiBmYWxzZSxcbiAgICAnZnVuY3Rpb24nOiB0cnVlLFxuICAgICdvYmplY3QnOiB0cnVlLFxuICAgICdudW1iZXInOiBmYWxzZSxcbiAgICAnc3RyaW5nJzogZmFsc2UsXG4gICAgJ3VuZGVmaW5lZCc6IGZhbHNlXG59O1xuZXhwb3J0IGxldCByb290ID0gKG9iamVjdFR5cGVzW3R5cGVvZiBzZWxmXSAmJiBzZWxmKSB8fCAob2JqZWN0VHlwZXNbdHlwZW9mIHdpbmRvd10gJiYgd2luZG93KTtcbmxldCBmcmVlR2xvYmFsID0gb2JqZWN0VHlwZXNbdHlwZW9mIGdsb2JhbF0gJiYgZ2xvYmFsO1xuaWYgKGZyZWVHbG9iYWwgJiYgKGZyZWVHbG9iYWwuZ2xvYmFsID09PSBmcmVlR2xvYmFsIHx8IGZyZWVHbG9iYWwud2luZG93ID09PSBmcmVlR2xvYmFsKSkge1xuICAgIHJvb3QgPSBmcmVlR2xvYmFsO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cm9vdC5qcy5tYXAiLCJpbXBvcnQgeyByb290IH0gZnJvbSAnLi9yb290JztcbmltcG9ydCB7IGlzQXJyYXkgfSBmcm9tICcuL2lzQXJyYXknO1xuaW1wb3J0IHsgaXNQcm9taXNlIH0gZnJvbSAnLi9pc1Byb21pc2UnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgJCRpdGVyYXRvciB9IGZyb20gJy4uL3N5bWJvbC9pdGVyYXRvcic7XG5pbXBvcnQgeyBJbm5lclN1YnNjcmliZXIgfSBmcm9tICcuLi9Jbm5lclN1YnNjcmliZXInO1xuaW1wb3J0IHsgJCRvYnNlcnZhYmxlIH0gZnJvbSAnLi4vc3ltYm9sL29ic2VydmFibGUnO1xuZXhwb3J0IGZ1bmN0aW9uIHN1YnNjcmliZVRvUmVzdWx0KG91dGVyU3Vic2NyaWJlciwgcmVzdWx0LCBvdXRlclZhbHVlLCBvdXRlckluZGV4KSB7XG4gICAgbGV0IGRlc3RpbmF0aW9uID0gbmV3IElubmVyU3Vic2NyaWJlcihvdXRlclN1YnNjcmliZXIsIG91dGVyVmFsdWUsIG91dGVySW5kZXgpO1xuICAgIGlmIChkZXN0aW5hdGlvbi5jbG9zZWQpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGlmIChyZXN1bHQgaW5zdGFuY2VvZiBPYnNlcnZhYmxlKSB7XG4gICAgICAgIGlmIChyZXN1bHQuX2lzU2NhbGFyKSB7XG4gICAgICAgICAgICBkZXN0aW5hdGlvbi5uZXh0KHJlc3VsdC52YWx1ZSk7XG4gICAgICAgICAgICBkZXN0aW5hdGlvbi5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0LnN1YnNjcmliZShkZXN0aW5hdGlvbik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKGlzQXJyYXkocmVzdWx0KSkge1xuICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gcmVzdWx0Lmxlbmd0aDsgaSA8IGxlbiAmJiAhZGVzdGluYXRpb24uY2xvc2VkOyBpKyspIHtcbiAgICAgICAgICAgIGRlc3RpbmF0aW9uLm5leHQocmVzdWx0W2ldKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWRlc3RpbmF0aW9uLmNsb3NlZCkge1xuICAgICAgICAgICAgZGVzdGluYXRpb24uY29tcGxldGUoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChpc1Byb21pc2UocmVzdWx0KSkge1xuICAgICAgICByZXN1bHQudGhlbigodmFsdWUpID0+IHtcbiAgICAgICAgICAgIGlmICghZGVzdGluYXRpb24uY2xvc2VkKSB7XG4gICAgICAgICAgICAgICAgZGVzdGluYXRpb24ubmV4dCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgZGVzdGluYXRpb24uY29tcGxldGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgKGVycikgPT4gZGVzdGluYXRpb24uZXJyb3IoZXJyKSlcbiAgICAgICAgICAgIC50aGVuKG51bGwsIChlcnIpID0+IHtcbiAgICAgICAgICAgIC8vIEVzY2FwaW5nIHRoZSBQcm9taXNlIHRyYXA6IGdsb2JhbGx5IHRocm93IHVuaGFuZGxlZCBlcnJvcnNcbiAgICAgICAgICAgIHJvb3Quc2V0VGltZW91dCgoKSA9PiB7IHRocm93IGVycjsgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZGVzdGluYXRpb247XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiByZXN1bHRbJCRpdGVyYXRvcl0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgY29uc3QgaXRlcmF0b3IgPSByZXN1bHRbJCRpdGVyYXRvcl0oKTtcbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSBpdGVyYXRvci5uZXh0KCk7XG4gICAgICAgICAgICBpZiAoaXRlbS5kb25lKSB7XG4gICAgICAgICAgICAgICAgZGVzdGluYXRpb24uY29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlc3RpbmF0aW9uLm5leHQoaXRlbS52YWx1ZSk7XG4gICAgICAgICAgICBpZiAoZGVzdGluYXRpb24uY2xvc2VkKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gd2hpbGUgKHRydWUpO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgcmVzdWx0WyQkb2JzZXJ2YWJsZV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgY29uc3Qgb2JzID0gcmVzdWx0WyQkb2JzZXJ2YWJsZV0oKTtcbiAgICAgICAgaWYgKHR5cGVvZiBvYnMuc3Vic2NyaWJlICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBkZXN0aW5hdGlvbi5lcnJvcihuZXcgRXJyb3IoJ2ludmFsaWQgb2JzZXJ2YWJsZScpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBvYnMuc3Vic2NyaWJlKG5ldyBJbm5lclN1YnNjcmliZXIob3V0ZXJTdWJzY3JpYmVyLCBvdXRlclZhbHVlLCBvdXRlckluZGV4KSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGRlc3RpbmF0aW9uLmVycm9yKG5ldyBUeXBlRXJyb3IoJ3Vua25vd24gdHlwZSByZXR1cm5lZCcpKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zdWJzY3JpYmVUb1Jlc3VsdC5qcy5tYXAiLCJpbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi4vU3Vic2NyaWJlcic7XG5pbXBvcnQgeyAkJHJ4U3Vic2NyaWJlciB9IGZyb20gJy4uL3N5bWJvbC9yeFN1YnNjcmliZXInO1xuZXhwb3J0IGZ1bmN0aW9uIHRvU3Vic2NyaWJlcihuZXh0T3JPYnNlcnZlciwgZXJyb3IsIGNvbXBsZXRlKSB7XG4gICAgaWYgKG5leHRPck9ic2VydmVyKSB7XG4gICAgICAgIGlmIChuZXh0T3JPYnNlcnZlciBpbnN0YW5jZW9mIFN1YnNjcmliZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXh0T3JPYnNlcnZlcjtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmV4dE9yT2JzZXJ2ZXJbJCRyeFN1YnNjcmliZXJdKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV4dE9yT2JzZXJ2ZXJbJCRyeFN1YnNjcmliZXJdKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFuZXh0T3JPYnNlcnZlciAmJiAhZXJyb3IgJiYgIWNvbXBsZXRlKSB7XG4gICAgICAgIHJldHVybiBuZXcgU3Vic2NyaWJlcigpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IFN1YnNjcmliZXIobmV4dE9yT2JzZXJ2ZXIsIGVycm9yLCBjb21wbGV0ZSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD10b1N1YnNjcmliZXIuanMubWFwIiwiaW1wb3J0IHsgZXJyb3JPYmplY3QgfSBmcm9tICcuL2Vycm9yT2JqZWN0JztcbmxldCB0cnlDYXRjaFRhcmdldDtcbmZ1bmN0aW9uIHRyeUNhdGNoZXIoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIHRyeUNhdGNoVGFyZ2V0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICAgIGVycm9yT2JqZWN0LmUgPSBlO1xuICAgICAgICByZXR1cm4gZXJyb3JPYmplY3Q7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIHRyeUNhdGNoKGZuKSB7XG4gICAgdHJ5Q2F0Y2hUYXJnZXQgPSBmbjtcbiAgICByZXR1cm4gdHJ5Q2F0Y2hlcjtcbn1cbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRyeUNhdGNoLmpzLm1hcCIsIi8qISBDU1MgcmVsPXByZWxvYWQgcG9seWZpbGwuIERlcGVuZHMgb24gbG9hZENTUyBmdW5jdGlvbi4gW2NdMjAxNiBAc2NvdHRqZWhsLCBGaWxhbWVudCBHcm91cCwgSW5jLiBMaWNlbnNlZCBNSVQgICovXG4oZnVuY3Rpb24oIHcgKXtcbiAgLy8gcmVsPXByZWxvYWQgc3VwcG9ydCB0ZXN0XG4gIGlmKCAhdy5sb2FkQ1NTICl7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBycCA9IGxvYWRDU1MucmVscHJlbG9hZCA9IHt9O1xuICBycC5zdXBwb3J0ID0gZnVuY3Rpb24oKXtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHcuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJsaW5rXCIgKS5yZWxMaXN0LnN1cHBvcnRzKCBcInByZWxvYWRcIiApO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH07XG5cbiAgLy8gbG9vcCBwcmVsb2FkIGxpbmtzIGFuZCBmZXRjaCB1c2luZyBsb2FkQ1NTXG4gIHJwLnBvbHkgPSBmdW5jdGlvbigpe1xuICAgIHZhciBsaW5rcyA9IHcuZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoIFwibGlua1wiICk7XG4gICAgZm9yKCB2YXIgaSA9IDA7IGkgPCBsaW5rcy5sZW5ndGg7IGkrKyApe1xuICAgICAgdmFyIGxpbmsgPSBsaW5rc1sgaSBdO1xuICAgICAgaWYoIGxpbmsucmVsID09PSBcInByZWxvYWRcIiAmJiBsaW5rLmdldEF0dHJpYnV0ZSggXCJhc1wiICkgPT09IFwic3R5bGVcIiApe1xuICAgICAgICB3LmxvYWRDU1MoIGxpbmsuaHJlZiwgbGluayApO1xuICAgICAgICBsaW5rLnJlbCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIC8vIGlmIGxpbmtbcmVsPXByZWxvYWRdIGlzIG5vdCBzdXBwb3J0ZWQsIHdlIG11c3QgZmV0Y2ggdGhlIENTUyBtYW51YWxseSB1c2luZyBsb2FkQ1NTXG4gIGlmKCAhcnAuc3VwcG9ydCgpICl7XG4gICAgcnAucG9seSgpO1xuICAgIHZhciBydW4gPSB3LnNldEludGVydmFsKCBycC5wb2x5LCAzMDAgKTtcbiAgICBpZiggdy5hZGRFdmVudExpc3RlbmVyICl7XG4gICAgICB3LmFkZEV2ZW50TGlzdGVuZXIoIFwibG9hZFwiLCBmdW5jdGlvbigpe1xuICAgICAgICB3LmNsZWFySW50ZXJ2YWwoIHJ1biApO1xuICAgICAgfSApO1xuICAgIH1cbiAgICBpZiggdy5hdHRhY2hFdmVudCApe1xuICAgICAgdy5hdHRhY2hFdmVudCggXCJvbmxvYWRcIiwgZnVuY3Rpb24oKXtcbiAgICAgICAgdy5jbGVhckludGVydmFsKCBydW4gKTtcbiAgICAgIH0gKVxuICAgIH1cbiAgfVxufSggdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHRoaXMgKSk7XG4iLCJpbXBvcnQgJy4vbW9kZXJuaXpyJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaGFzRmVhdHVyZXMoZmVhdHVyZXMpIHtcbiAgdmFyIGFjYyA9IHRydWU7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgZmVhdHVyZXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgZmVhdHVyZSA9IGZlYXR1cmVzW2ldO1xuICAgIHZhciBoYXNGZWF0dXJlID0gTW9kZXJuaXpyW2ZlYXR1cmVdO1xuICAgIC8vIGlmICghaGFzRmVhdHVyZSkgY29uc29sZS53YXJuKCdGZWF0dXJlIFwiJyArIGZlYXR1cmUgKyAnXCIgbWlzc2luZyEnKTtcbiAgICBhY2MgPSBhY2MgJiYgaGFzRmVhdHVyZTtcbiAgfVxuICByZXR1cm4gYWNjO1xufVxuIiwiLyohIG1vZGVybml6ciAzLjMuMSAoQ3VzdG9tIEJ1aWxkKSB8IE1JVCAqXG4gKiBodHRwczovL21vZGVybml6ci5jb20vZG93bmxvYWQvPy1jbGFzc2xpc3QtY3NzcG9pbnRlcmV2ZW50cy1jc3NyZW11bml0LWNzc3RyYW5zZm9ybXMtZXZlbnRsaXN0ZW5lci1odG1saW1wb3J0cy1tYXRjaG1lZGlhLW9wYWNpdHktcXVlcnlzZWxlY3Rvci1yZXF1ZXN0YW5pbWF0aW9uZnJhbWUtdGVtcGxhdGUtdG91Y2hldmVudHMgISovXG4hZnVuY3Rpb24oZSx0LG4pe2Z1bmN0aW9uIHIoZSx0KXtyZXR1cm4gdHlwZW9mIGU9PT10fWZ1bmN0aW9uIG8oKXt2YXIgZSx0LG4sbyxpLHMsYTtmb3IodmFyIGYgaW4gXylpZihfLmhhc093blByb3BlcnR5KGYpKXtpZihlPVtdLHQ9X1tmXSx0Lm5hbWUmJihlLnB1c2godC5uYW1lLnRvTG93ZXJDYXNlKCkpLHQub3B0aW9ucyYmdC5vcHRpb25zLmFsaWFzZXMmJnQub3B0aW9ucy5hbGlhc2VzLmxlbmd0aCkpZm9yKG49MDtuPHQub3B0aW9ucy5hbGlhc2VzLmxlbmd0aDtuKyspZS5wdXNoKHQub3B0aW9ucy5hbGlhc2VzW25dLnRvTG93ZXJDYXNlKCkpO2ZvcihvPXIodC5mbixcImZ1bmN0aW9uXCIpP3QuZm4oKTp0LmZuLGk9MDtpPGUubGVuZ3RoO2krKylzPWVbaV0sYT1zLnNwbGl0KFwiLlwiKSwxPT09YS5sZW5ndGg/TW9kZXJuaXpyW2FbMF1dPW86KCFNb2Rlcm5penJbYVswXV18fE1vZGVybml6clthWzBdXWluc3RhbmNlb2YgQm9vbGVhbnx8KE1vZGVybml6clthWzBdXT1uZXcgQm9vbGVhbihNb2Rlcm5penJbYVswXV0pKSxNb2Rlcm5penJbYVswXV1bYVsxXV09byksVC5wdXNoKChvP1wiXCI6XCJuby1cIikrYS5qb2luKFwiLVwiKSl9fWZ1bmN0aW9uIGkoKXtyZXR1cm5cImZ1bmN0aW9uXCIhPXR5cGVvZiB0LmNyZWF0ZUVsZW1lbnQ/dC5jcmVhdGVFbGVtZW50KGFyZ3VtZW50c1swXSk6Yj90LmNyZWF0ZUVsZW1lbnROUy5jYWxsKHQsXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLGFyZ3VtZW50c1swXSk6dC5jcmVhdGVFbGVtZW50LmFwcGx5KHQsYXJndW1lbnRzKX1mdW5jdGlvbiBzKGUpe3ZhciB0PXguY2xhc3NOYW1lLG49TW9kZXJuaXpyLl9jb25maWcuY2xhc3NQcmVmaXh8fFwiXCI7aWYoYiYmKHQ9dC5iYXNlVmFsKSxNb2Rlcm5penIuX2NvbmZpZy5lbmFibGVKU0NsYXNzKXt2YXIgcj1uZXcgUmVnRXhwKFwiKF58XFxcXHMpXCIrbitcIm5vLWpzKFxcXFxzfCQpXCIpO3Q9dC5yZXBsYWNlKHIsXCIkMVwiK24rXCJqcyQyXCIpfU1vZGVybml6ci5fY29uZmlnLmVuYWJsZUNsYXNzZXMmJih0Kz1cIiBcIituK2Uuam9pbihcIiBcIituKSxiP3guY2xhc3NOYW1lLmJhc2VWYWw9dDp4LmNsYXNzTmFtZT10KX1mdW5jdGlvbiBhKGUsdCl7aWYoXCJvYmplY3RcIj09dHlwZW9mIGUpZm9yKHZhciBuIGluIGUpUyhlLG4pJiZhKG4sZVtuXSk7ZWxzZXtlPWUudG9Mb3dlckNhc2UoKTt2YXIgcj1lLnNwbGl0KFwiLlwiKSxvPU1vZGVybml6cltyWzBdXTtpZigyPT1yLmxlbmd0aCYmKG89b1tyWzFdXSksXCJ1bmRlZmluZWRcIiE9dHlwZW9mIG8pcmV0dXJuIE1vZGVybml6cjt0PVwiZnVuY3Rpb25cIj09dHlwZW9mIHQ/dCgpOnQsMT09ci5sZW5ndGg/TW9kZXJuaXpyW3JbMF1dPXQ6KCFNb2Rlcm5penJbclswXV18fE1vZGVybml6cltyWzBdXWluc3RhbmNlb2YgQm9vbGVhbnx8KE1vZGVybml6cltyWzBdXT1uZXcgQm9vbGVhbihNb2Rlcm5penJbclswXV0pKSxNb2Rlcm5penJbclswXV1bclsxXV09dCkscyhbKHQmJjAhPXQ/XCJcIjpcIm5vLVwiKStyLmpvaW4oXCItXCIpXSksTW9kZXJuaXpyLl90cmlnZ2VyKGUsdCl9cmV0dXJuIE1vZGVybml6cn1mdW5jdGlvbiBmKGUpe3JldHVybiBlLnJlcGxhY2UoLyhbYS16XSktKFthLXpdKS9nLGZ1bmN0aW9uKGUsdCxuKXtyZXR1cm4gdCtuLnRvVXBwZXJDYXNlKCl9KS5yZXBsYWNlKC9eLS8sXCJcIil9ZnVuY3Rpb24gdSgpe3ZhciBlPXQuYm9keTtyZXR1cm4gZXx8KGU9aShiP1wic3ZnXCI6XCJib2R5XCIpLGUuZmFrZT0hMCksZX1mdW5jdGlvbiBsKGUsbixyLG8pe3ZhciBzLGEsZixsLGM9XCJtb2Rlcm5penJcIixkPWkoXCJkaXZcIikscD11KCk7aWYocGFyc2VJbnQociwxMCkpZm9yKDtyLS07KWY9aShcImRpdlwiKSxmLmlkPW8/b1tyXTpjKyhyKzEpLGQuYXBwZW5kQ2hpbGQoZik7cmV0dXJuIHM9aShcInN0eWxlXCIpLHMudHlwZT1cInRleHQvY3NzXCIscy5pZD1cInNcIitjLChwLmZha2U/cDpkKS5hcHBlbmRDaGlsZChzKSxwLmFwcGVuZENoaWxkKGQpLHMuc3R5bGVTaGVldD9zLnN0eWxlU2hlZXQuY3NzVGV4dD1lOnMuYXBwZW5kQ2hpbGQodC5jcmVhdGVUZXh0Tm9kZShlKSksZC5pZD1jLHAuZmFrZSYmKHAuc3R5bGUuYmFja2dyb3VuZD1cIlwiLHAuc3R5bGUub3ZlcmZsb3c9XCJoaWRkZW5cIixsPXguc3R5bGUub3ZlcmZsb3cseC5zdHlsZS5vdmVyZmxvdz1cImhpZGRlblwiLHguYXBwZW5kQ2hpbGQocCkpLGE9bihkLGUpLHAuZmFrZT8ocC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHApLHguc3R5bGUub3ZlcmZsb3c9bCx4Lm9mZnNldEhlaWdodCk6ZC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGQpLCEhYX1mdW5jdGlvbiBjKGUsdCl7cmV0dXJuISF+KFwiXCIrZSkuaW5kZXhPZih0KX1mdW5jdGlvbiBkKGUsdCl7cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIGUuYXBwbHkodCxhcmd1bWVudHMpfX1mdW5jdGlvbiBwKGUsdCxuKXt2YXIgbztmb3IodmFyIGkgaW4gZSlpZihlW2ldaW4gdClyZXR1cm4gbj09PSExP2VbaV06KG89dFtlW2ldXSxyKG8sXCJmdW5jdGlvblwiKT9kKG8sbnx8dCk6byk7cmV0dXJuITF9ZnVuY3Rpb24gbShlKXtyZXR1cm4gZS5yZXBsYWNlKC8oW0EtWl0pL2csZnVuY3Rpb24oZSx0KXtyZXR1cm5cIi1cIit0LnRvTG93ZXJDYXNlKCl9KS5yZXBsYWNlKC9ebXMtLyxcIi1tcy1cIil9ZnVuY3Rpb24gdih0LHIpe3ZhciBvPXQubGVuZ3RoO2lmKFwiQ1NTXCJpbiBlJiZcInN1cHBvcnRzXCJpbiBlLkNTUyl7Zm9yKDtvLS07KWlmKGUuQ1NTLnN1cHBvcnRzKG0odFtvXSkscikpcmV0dXJuITA7cmV0dXJuITF9aWYoXCJDU1NTdXBwb3J0c1J1bGVcImluIGUpe2Zvcih2YXIgaT1bXTtvLS07KWkucHVzaChcIihcIittKHRbb10pK1wiOlwiK3IrXCIpXCIpO3JldHVybiBpPWkuam9pbihcIiBvciBcIiksbChcIkBzdXBwb3J0cyAoXCIraStcIikgeyAjbW9kZXJuaXpyIHsgcG9zaXRpb246IGFic29sdXRlOyB9IH1cIixmdW5jdGlvbihlKXtyZXR1cm5cImFic29sdXRlXCI9PWdldENvbXB1dGVkU3R5bGUoZSxudWxsKS5wb3NpdGlvbn0pfXJldHVybiBufWZ1bmN0aW9uIGgoZSx0LG8scyl7ZnVuY3Rpb24gYSgpe2wmJihkZWxldGUgTC5zdHlsZSxkZWxldGUgTC5tb2RFbGVtKX1pZihzPXIocyxcInVuZGVmaW5lZFwiKT8hMTpzLCFyKG8sXCJ1bmRlZmluZWRcIikpe3ZhciB1PXYoZSxvKTtpZighcih1LFwidW5kZWZpbmVkXCIpKXJldHVybiB1fWZvcih2YXIgbCxkLHAsbSxoLHk9W1wibW9kZXJuaXpyXCIsXCJ0c3BhblwiLFwic2FtcFwiXTshTC5zdHlsZSYmeS5sZW5ndGg7KWw9ITAsTC5tb2RFbGVtPWkoeS5zaGlmdCgpKSxMLnN0eWxlPUwubW9kRWxlbS5zdHlsZTtmb3IocD1lLmxlbmd0aCxkPTA7cD5kO2QrKylpZihtPWVbZF0saD1MLnN0eWxlW21dLGMobSxcIi1cIikmJihtPWYobSkpLEwuc3R5bGVbbV0hPT1uKXtpZihzfHxyKG8sXCJ1bmRlZmluZWRcIikpcmV0dXJuIGEoKSxcInBmeFwiPT10P206ITA7dHJ5e0wuc3R5bGVbbV09b31jYXRjaChnKXt9aWYoTC5zdHlsZVttXSE9aClyZXR1cm4gYSgpLFwicGZ4XCI9PXQ/bTohMH1yZXR1cm4gYSgpLCExfWZ1bmN0aW9uIHkoZSx0LG4sbyxpKXt2YXIgcz1lLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpK2Uuc2xpY2UoMSksYT0oZStcIiBcIitQLmpvaW4ocytcIiBcIikrcykuc3BsaXQoXCIgXCIpO3JldHVybiByKHQsXCJzdHJpbmdcIil8fHIodCxcInVuZGVmaW5lZFwiKT9oKGEsdCxvLGkpOihhPShlK1wiIFwiK3Euam9pbihzK1wiIFwiKStzKS5zcGxpdChcIiBcIikscChhLHQsbikpfWZ1bmN0aW9uIGcoZSx0LHIpe3JldHVybiB5KGUsbixuLHQscil9dmFyIF89W10sQz17X3ZlcnNpb246XCIzLjMuMVwiLF9jb25maWc6e2NsYXNzUHJlZml4OlwiXCIsZW5hYmxlQ2xhc3NlczohMCxlbmFibGVKU0NsYXNzOiEwLHVzZVByZWZpeGVzOiEwfSxfcTpbXSxvbjpmdW5jdGlvbihlLHQpe3ZhciBuPXRoaXM7c2V0VGltZW91dChmdW5jdGlvbigpe3QobltlXSl9LDApfSxhZGRUZXN0OmZ1bmN0aW9uKGUsdCxuKXtfLnB1c2goe25hbWU6ZSxmbjp0LG9wdGlvbnM6bn0pfSxhZGRBc3luY1Rlc3Q6ZnVuY3Rpb24oZSl7Xy5wdXNoKHtuYW1lOm51bGwsZm46ZX0pfX0sTW9kZXJuaXpyPWZ1bmN0aW9uKCl7fTtNb2Rlcm5penIucHJvdG90eXBlPUMsTW9kZXJuaXpyPW5ldyBNb2Rlcm5penIsTW9kZXJuaXpyLmFkZFRlc3QoXCJldmVudGxpc3RlbmVyXCIsXCJhZGRFdmVudExpc3RlbmVyXCJpbiBlKSxNb2Rlcm5penIuYWRkVGVzdChcInF1ZXJ5c2VsZWN0b3JcIixcInF1ZXJ5U2VsZWN0b3JcImluIHQmJlwicXVlcnlTZWxlY3RvckFsbFwiaW4gdCk7dmFyIFQ9W10sdz1DLl9jb25maWcudXNlUHJlZml4ZXM/XCIgLXdlYmtpdC0gLW1vei0gLW8tIC1tcy0gXCIuc3BsaXQoXCIgXCIpOltcIlwiLFwiXCJdO0MuX3ByZWZpeGVzPXc7dmFyIHg9dC5kb2N1bWVudEVsZW1lbnQ7TW9kZXJuaXpyLmFkZFRlc3QoXCJjbGFzc2xpc3RcIixcImNsYXNzTGlzdFwiaW4geCk7dmFyIFM7IWZ1bmN0aW9uKCl7dmFyIGU9e30uaGFzT3duUHJvcGVydHk7Uz1yKGUsXCJ1bmRlZmluZWRcIil8fHIoZS5jYWxsLFwidW5kZWZpbmVkXCIpP2Z1bmN0aW9uKGUsdCl7cmV0dXJuIHQgaW4gZSYmcihlLmNvbnN0cnVjdG9yLnByb3RvdHlwZVt0XSxcInVuZGVmaW5lZFwiKX06ZnVuY3Rpb24odCxuKXtyZXR1cm4gZS5jYWxsKHQsbil9fSgpO3ZhciBiPVwic3ZnXCI9PT14Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7TW9kZXJuaXpyLmFkZFRlc3QoXCJvcGFjaXR5XCIsZnVuY3Rpb24oKXt2YXIgZT1pKFwiYVwiKS5zdHlsZTtyZXR1cm4gZS5jc3NUZXh0PXcuam9pbihcIm9wYWNpdHk6LjU1O1wiKSwvXjAuNTUkLy50ZXN0KGUub3BhY2l0eSl9KSxNb2Rlcm5penIuYWRkVGVzdChcImNzc3BvaW50ZXJldmVudHNcIixmdW5jdGlvbigpe3ZhciBlPWkoXCJhXCIpLnN0eWxlO3JldHVybiBlLmNzc1RleHQ9XCJwb2ludGVyLWV2ZW50czphdXRvXCIsXCJhdXRvXCI9PT1lLnBvaW50ZXJFdmVudHN9KSxNb2Rlcm5penIuYWRkVGVzdChcImNzc3JlbXVuaXRcIixmdW5jdGlvbigpe3ZhciBlPWkoXCJhXCIpLnN0eWxlO3RyeXtlLmZvbnRTaXplPVwiM3JlbVwifWNhdGNoKHQpe31yZXR1cm4vcmVtLy50ZXN0KGUuZm9udFNpemUpfSksTW9kZXJuaXpyLmFkZFRlc3QoXCJ0ZW1wbGF0ZVwiLFwiY29udGVudFwiaW4gaShcInRlbXBsYXRlXCIpKSxDLl9sPXt9LEMub249ZnVuY3Rpb24oZSx0KXt0aGlzLl9sW2VdfHwodGhpcy5fbFtlXT1bXSksdGhpcy5fbFtlXS5wdXNoKHQpLE1vZGVybml6ci5oYXNPd25Qcm9wZXJ0eShlKSYmc2V0VGltZW91dChmdW5jdGlvbigpe01vZGVybml6ci5fdHJpZ2dlcihlLE1vZGVybml6cltlXSl9LDApfSxDLl90cmlnZ2VyPWZ1bmN0aW9uKGUsdCl7aWYodGhpcy5fbFtlXSl7dmFyIG49dGhpcy5fbFtlXTtzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7dmFyIGUscjtmb3IoZT0wO2U8bi5sZW5ndGg7ZSsrKShyPW5bZV0pKHQpfSwwKSxkZWxldGUgdGhpcy5fbFtlXX19LE1vZGVybml6ci5fcS5wdXNoKGZ1bmN0aW9uKCl7Qy5hZGRUZXN0PWF9KSxhKFwiaHRtbGltcG9ydHNcIixcImltcG9ydFwiaW4gaShcImxpbmtcIikpO3ZhciB6PUMudGVzdFN0eWxlcz1sO01vZGVybml6ci5hZGRUZXN0KFwidG91Y2hldmVudHNcIixmdW5jdGlvbigpe3ZhciBuO2lmKFwib250b3VjaHN0YXJ0XCJpbiBlfHxlLkRvY3VtZW50VG91Y2gmJnQgaW5zdGFuY2VvZiBEb2N1bWVudFRvdWNoKW49ITA7ZWxzZXt2YXIgcj1bXCJAbWVkaWEgKFwiLHcuam9pbihcInRvdWNoLWVuYWJsZWQpLChcIiksXCJoZWFydHpcIixcIilcIixcInsjbW9kZXJuaXpye3RvcDo5cHg7cG9zaXRpb246YWJzb2x1dGV9fVwiXS5qb2luKFwiXCIpO3oocixmdW5jdGlvbihlKXtuPTk9PT1lLm9mZnNldFRvcH0pfXJldHVybiBufSk7dmFyIEU9XCJNb3ogTyBtcyBXZWJraXRcIixQPUMuX2NvbmZpZy51c2VQcmVmaXhlcz9FLnNwbGl0KFwiIFwiKTpbXTtDLl9jc3NvbVByZWZpeGVzPVA7dmFyIGo9ZnVuY3Rpb24odCl7dmFyIHIsbz13Lmxlbmd0aCxpPWUuQ1NTUnVsZTtpZihcInVuZGVmaW5lZFwiPT10eXBlb2YgaSlyZXR1cm4gbjtpZighdClyZXR1cm4hMTtpZih0PXQucmVwbGFjZSgvXkAvLFwiXCIpLHI9dC5yZXBsYWNlKC8tL2csXCJfXCIpLnRvVXBwZXJDYXNlKCkrXCJfUlVMRVwiLHIgaW4gaSlyZXR1cm5cIkBcIit0O2Zvcih2YXIgcz0wO28+cztzKyspe3ZhciBhPXdbc10sZj1hLnRvVXBwZXJDYXNlKCkrXCJfXCIrcjtpZihmIGluIGkpcmV0dXJuXCJALVwiK2EudG9Mb3dlckNhc2UoKStcIi1cIit0fXJldHVybiExfTtDLmF0UnVsZT1qO3ZhciBxPUMuX2NvbmZpZy51c2VQcmVmaXhlcz9FLnRvTG93ZXJDYXNlKCkuc3BsaXQoXCIgXCIpOltdO0MuX2RvbVByZWZpeGVzPXE7dmFyIEE9e2VsZW06aShcIm1vZGVybml6clwiKX07TW9kZXJuaXpyLl9xLnB1c2goZnVuY3Rpb24oKXtkZWxldGUgQS5lbGVtfSk7dmFyIEw9e3N0eWxlOkEuZWxlbS5zdHlsZX07TW9kZXJuaXpyLl9xLnVuc2hpZnQoZnVuY3Rpb24oKXtkZWxldGUgTC5zdHlsZX0pLEMudGVzdEFsbFByb3BzPXk7dmFyIE49Qy5wcmVmaXhlZD1mdW5jdGlvbihlLHQsbil7cmV0dXJuIDA9PT1lLmluZGV4T2YoXCJAXCIpP2ooZSk6KC0xIT1lLmluZGV4T2YoXCItXCIpJiYoZT1mKGUpKSx0P3koZSx0LG4pOnkoZSxcInBmeFwiKSl9O01vZGVybml6ci5hZGRUZXN0KFwicmVxdWVzdGFuaW1hdGlvbmZyYW1lXCIsISFOKFwicmVxdWVzdEFuaW1hdGlvbkZyYW1lXCIsZSkse2FsaWFzZXM6W1wicmFmXCJdfSksTW9kZXJuaXpyLmFkZFRlc3QoXCJtYXRjaG1lZGlhXCIsISFOKFwibWF0Y2hNZWRpYVwiLGUpKSxDLnRlc3RBbGxQcm9wcz1nLE1vZGVybml6ci5hZGRUZXN0KFwiY3NzdHJhbnNmb3Jtc1wiLGZ1bmN0aW9uKCl7cmV0dXJuLTE9PT1uYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJBbmRyb2lkIDIuXCIpJiZnKFwidHJhbnNmb3JtXCIsXCJzY2FsZSgxKVwiLCEwKX0pLG8oKSxkZWxldGUgQy5hZGRUZXN0LGRlbGV0ZSBDLmFkZEFzeW5jVGVzdDtmb3IodmFyIE89MDtPPE1vZGVybml6ci5fcS5sZW5ndGg7TysrKU1vZGVybml6ci5fcVtPXSgpO2UuTW9kZXJuaXpyPU1vZGVybml6cn0od2luZG93LGRvY3VtZW50KTtcbiIsImltcG9ydCAnY29yZS1qcy9mbi9vYmplY3QvYXNzaWduJztcbmltcG9ydCAnY29yZS1qcy9mbi9vYmplY3QvZGVmaW5lLXByb3BlcnR5JztcbmltcG9ydCAnY29yZS1qcy9mbi9vYmplY3Qva2V5cyc7XG5pbXBvcnQgeyBsb2FkQ1NTIH0gZnJvbSAnZmctbG9hZGNzcy9zcmMvbG9hZENTUyc7XG5cbmltcG9ydCBoYXNGZWF0dXJlcyBmcm9tICcuLi9saWIvaGFzLWZlYXR1cmVzJztcblxuY29uc3QgTUVESUFfUVVFUlkgPSAnKG1pbi13aWR0aDogNDhlbSknO1xuXG5mdW5jdGlvbiBoYXNTaGFkb3dET01WMCgpIHtcbiAgcmV0dXJuICdjcmVhdGVTaGFkb3dSb290JyBpbiBkb2N1bWVudC5ib2R5O1xufVxuXG5mdW5jdGlvbiBoYXNTaGFkb3dET01WMSgpIHtcbiAgcmV0dXJuICdhdHRhY2hTaGFkb3cnIGluIGRvY3VtZW50LmJvZHk7XG59XG5cbmZ1bmN0aW9uIGhhc1NoYWRvd0RPTSgpIHtcbiAgcmV0dXJuIGhhc1NoYWRvd0RPTVYwKCkgfHwgaGFzU2hhZG93RE9NVjEoKTtcbn1cblxuZnVuY3Rpb24gaGFzQ3VzdG9tRWxlbWVudHNWMCgpIHtcbiAgcmV0dXJuICdyZWdpc3RlckVsZW1lbnQnIGluIGRvY3VtZW50O1xufVxuXG5mdW5jdGlvbiBoYXNDdXN0b21FbGVtZW50c1YxKCkge1xuICByZXR1cm4gJ2N1c3RvbUVsZW1lbnRzJyBpbiB3aW5kb3c7XG59XG5cbmZ1bmN0aW9uIGhhc0N1c3RvbUVsZW1lbnRzKCkge1xuICByZXR1cm4gaGFzQ3VzdG9tRWxlbWVudHNWMCgpIHx8IGhhc0N1c3RvbUVsZW1lbnRzVjEoKTtcbn1cblxuZnVuY3Rpb24gaW1wb3J0Q3VzdG9tRWxlbWVudCgpIHtcbiAgY29uc3QgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcbiAgbGluay5yZWwgPSAnaW1wb3J0JztcbiAgbGluay5ocmVmID0gJ2h0dHBzOi8vdW5wa2cuY29tL3ktZHJhd2VyQDIuMC42L2Rpc3Qvd2ViY29tcG9uZW50L3ktZHJhd2VyLmh0bWwnO1xuXG4gIGNvbnN0IHJlZiA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdsaW5rJylbMF07XG4gIHJlZi5wYXJlbnROb2RlLmluc2VydEJlZm9yZShsaW5rLCByZWYpO1xufVxuXG5pZiAoaGFzRmVhdHVyZXMoWydldmVudGxpc3RlbmVyJyxcbiAgICAgICAgICAgICAgICAgJ3F1ZXJ5c2VsZWN0b3InLFxuICAgICAgICAgICAgICAgICAnbWF0Y2htZWRpYScsXG4gICAgICAgICAgICAgICAgICdyZXF1ZXN0YW5pbWF0aW9uZnJhbWUnLFxuICAgICAgICAgICAgICAgICAnY2xhc3NsaXN0JyxcbiAgICAgICAgICAgICAgICAgJ29wYWNpdHknLFxuICAgICAgICAgICAgICAgICAnY3NzdHJhbnNmb3JtcycsXG4gICAgICAgICAgICAgICAgICdjc3Nwb2ludGVyZXZlbnRzJyxcbiAgICAgICAgICAgICAgICAgJ2Nzc3JlbXVuaXQnLFxuICAgICAgICAgICAgICAgXSkpIHtcbiAgd2luZG93LmRyYXdlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3ktZHJhd2VyJyk7XG4gIHdpbmRvdy5pc0Rlc2t0b3AgPSB3aW5kb3cubWF0Y2hNZWRpYShNRURJQV9RVUVSWSkubWF0Y2hlcztcblxuICBpZiAoaGFzU2hhZG93RE9NKCkpIHtcbiAgICBpZiAod2luZG93LmlzRGVza3RvcCkgd2luZG93LmRyYXdlci5zZXRBdHRyaWJ1dGUoJ29wZW5lZCcsICcnKTtcbiAgICBpZiAod2luZG93LmlzRGVza3RvcCkgd2luZG93LmRyYXdlci5zZXRBdHRyaWJ1dGUoJ3BlcnNpc3RlbnQnLCAnJyk7XG5cbiAgICBpZiAoaGFzRmVhdHVyZXMoWyd0ZW1wbGF0ZScsICdodG1saW1wb3J0cyddKSAmJiBoYXNDdXN0b21FbGVtZW50cygpKSB7XG4gICAgICBpbXBvcnRDdXN0b21FbGVtZW50KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvYWRKU0RlZmVycmVkKCdodHRwczovL3VucGtnLmNvbS93ZWJjb21wb25lbnRzLmpzQDAuNy4yMi93ZWJjb21wb25lbnRzLWxpdGUubWluLmpzJyk7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignV2ViQ29tcG9uZW50c1JlYWR5JywgaW1wb3J0Q3VzdG9tRWxlbWVudCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGNvbnN0IHJlZiA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzdHlsZScpWzBdO1xuICAgIGxvYWRDU1MoJ2h0dHBzOi8vdW5wa2cuY29tL3ktZHJhd2VyQDIuMC42L2Rpc3QvZHJhd2VyLmNzcycsIHJlZik7XG4gICAgbG9hZEpTRGVmZXJyZWQoJ2h0dHBzOi8vdW5wa2cuY29tL3ktZHJhd2VyQDIuMC42L2Rpc3QvdmFuaWxsYS9pbmRleC5qcycsICgpID0+IHtcbiAgICAgIC8qIGdsb2JhbCB5ICovXG4gICAgICBjb25zdCBZRHJhd2VyID0geS5kcmF3ZXIudmFuaWxsYS5kZWZhdWx0O1xuXG4gICAgICB3aW5kb3cuZHJhd2VyID0gbmV3IFlEcmF3ZXIod2luZG93LmRyYXdlciwge1xuICAgICAgICBvcGVuZWQ6IHdpbmRvdy5pc0Rlc2t0b3AsXG4gICAgICAgIHBlcnNpc3RlbnQ6IHdpbmRvdy5pc0Rlc2t0b3AsXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoKSA9PiB7XG4gICAgY29uc3QgaGFzQ2hhbmdlZCA9IHdpbmRvdy5pc0Rlc2t0b3AgIT09IHdpbmRvdy5tYXRjaE1lZGlhKE1FRElBX1FVRVJZKS5tYXRjaGVzO1xuICAgIGlmICh3aW5kb3cuZHJhd2VyICYmIGhhc0NoYW5nZWQpIHtcbiAgICAgIHdpbmRvdy5pc0Rlc2t0b3AgPSAhd2luZG93LmlzRGVza3RvcDtcbiAgICAgIHdpbmRvdy5kcmF3ZXIucGVyc2lzdGVudCA9IHdpbmRvdy5pc0Rlc2t0b3A7XG4gICAgICB3aW5kb3cuZHJhd2VyLmp1bXBUbyh3aW5kb3cuaXNEZXNrdG9wKTtcbiAgICB9XG4gIH0pO1xuXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdfbWVudScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICBpZiAod2luZG93LmRyYXdlciAmJiAhd2luZG93LmlzRGVza3RvcCkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgd2luZG93LmRyYXdlci50b2dnbGUoKTtcbiAgICB9XG4gIH0pO1xufVxuIiwiaW1wb3J0IHsgbG9hZENTUyB9IGZyb20gJ2ZnLWxvYWRjc3Mvc3JjL2xvYWRDU1MnO1xuXG5pbXBvcnQgJy4va2F0ZXgnO1xuaW1wb3J0ICcuL2RyYXdlcic7XG5pbXBvcnQgJy4vc21vb3RoLXN0YXRlJztcblxuZ2xvYmFsLmxvYWRDU1MgPSBsb2FkQ1NTO1xucmVxdWlyZSgnLi4vbGliL2Nzc3JlbHByZWxvYWQnKTtcbiIsIi8vIGVzbGludC1nbG9iYWxzIGthdGV4XG5pbXBvcnQgeyBsb2FkQ1NTIH0gZnJvbSAnZmctbG9hZGNzcy9zcmMvbG9hZENTUyc7XG5cbmltcG9ydCBoYXNGZWF0dXJlcyBmcm9tICcuLi9saWIvaGFzLWZlYXR1cmVzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXNkZigpIHtcbiAgLyogZ2xvYmFsIGthdGV4ICovXG4gIGlmICghd2luZG93LmthdGV4KSByZXR1cm47XG5cbiAgY29uc3QgbWF0aEJsb2NrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3NjcmlwdFt0eXBlXj1cIm1hdGgvdGV4XCJdJyk7XG5cbiAgLy8ga3JhbWRvd24gZ2VuZXJhdGVzIHNjcmlwdCB0YWdzIHdpdGggdHlwZSBcIm1hdGgvdGV4XCJcbiAgZm9yIChjb25zdCBlbGVtZW50IG9mIG1hdGhCbG9ja3MpIHtcbiAgICBjb25zdCBlbCA9IGVsZW1lbnQ7XG5cbiAgICBjb25zdCB0ZXggPSBlbC50ZXh0Q29udGVudFxuICAgICAgLnJlcGxhY2UoJyUgPCFbQ0RBVEFbJywgJycpXG4gICAgICAucmVwbGFjZSgnJV1dPicsICcnKTtcblxuICAgIC8vIHJlcGxhY2UgdGhlIHNjcmlwdCB0YWcgd2l0aCBLYVRlWFxuICAgIHRyeSB7XG4gICAgICBjb25zdCBwcmV2aWV3ID0gZWwucHJldmlvdXNFbGVtZW50U2libGluZztcblxuICAgICAgZWwub3V0ZXJIVE1MID0ga2F0ZXgucmVuZGVyVG9TdHJpbmcodGV4LCB7XG4gICAgICAgIGRpc3BsYXlNb2RlOiBlbC50eXBlID09PSAnbWF0aC90ZXg7IG1vZGU9ZGlzcGxheScsXG4gICAgICB9KTtcblxuICAgICAgLy8gaGlkZSB0aGUgcHJldmlldyBvbmx5IHdoZW4gc3VjY2Vzc2Z1bFxuICAgICAgcHJldmlldy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgcHJldmlldy5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5lcnJvcihlKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG4gICAgfVxuICB9XG59XG5cbi8vIEthVGVYIHN1cHBvcnRcbmlmIChoYXNGZWF0dXJlcyhbJ3F1ZXJ5c2VsZWN0b3InLFxuICAgICAgICAgICAgICAgICAnY2xhc3NsaXN0JyxcbiAgICAgICAgICAgICAgIF0pKSB7XG4gIC8vIGVuYWJsZSBtYXRoIGJsb2NrcyB1c2luZyBLYVRlWFxuICBsb2FkQ1NTKCdodHRwczovL3VucGtnLmNvbS9rYXRleEAwLjYuMC9kaXN0L2thdGV4Lm1pbi5jc3MnKTtcbiAgbG9hZEpTRGVmZXJyZWQoJ2h0dHBzOi8vdW5wa2cuY29tL2thdGV4QDAuNi4wL2Rpc3Qva2F0ZXgubWluLmpzJywgYXNkZik7XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjbGFzcy1tZXRob2RzLXVzZS10aGlzICovXG5cbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzLWVzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMtZXMvU3ViamVjdCc7XG5cbmltcG9ydCAncnhqcy1lcy9hZGQvb2JzZXJ2YWJsZS9lbXB0eSc7XG5pbXBvcnQgJ3J4anMtZXMvYWRkL29ic2VydmFibGUvZnJvbUV2ZW50JztcbmltcG9ydCAncnhqcy1lcy9hZGQvb2JzZXJ2YWJsZS9tZXJnZSc7XG5pbXBvcnQgJ3J4anMtZXMvYWRkL29ic2VydmFibGUvb2YnO1xuXG5pbXBvcnQgJ3J4anMtZXMvYWRkL29ic2VydmFibGUvZG9tL2FqYXgnO1xuXG5pbXBvcnQgJ3J4anMtZXMvYWRkL29wZXJhdG9yL2NhdGNoJztcbmltcG9ydCAncnhqcy1lcy9hZGQvb3BlcmF0b3IvZG8nO1xuaW1wb3J0ICdyeGpzLWVzL2FkZC9vcGVyYXRvci9maWx0ZXInO1xuaW1wb3J0ICdyeGpzLWVzL2FkZC9vcGVyYXRvci9tYXAnO1xuaW1wb3J0ICdyeGpzLWVzL2FkZC9vcGVyYXRvci9tZXJnZUFsbCc7XG5pbXBvcnQgJ3J4anMtZXMvYWRkL29wZXJhdG9yL3JldHJ5JztcbmltcG9ydCAncnhqcy1lcy9hZGQvb3BlcmF0b3Ivc3dpdGNoJztcbmltcG9ydCAncnhqcy1lcy9hZGQvb3BlcmF0b3Ivc3dpdGNoTWFwJztcblxuaW1wb3J0IHsgc2hvdWxkTG9hZEFuY2hvciB9IGZyb20gJy4vc21vb3RoLXN0YXRlLXV0aWwnO1xuXG4vLyB3aW5kb3cuT2JzZXJ2YWJsZSA9IE9ic2VydmFibGU7XG5cbmNvbnN0IExJTktfU0VMRUNUT1IgPSAnYVtocmVmXSc7IC8vICdhW2hyZWZePVwiL1wiXSc7XG5jb25zdCBDT05URU5UX1NFTEVDVE9SID0gJ21haW4nO1xuY29uc3QgTE9BRElOR19DTEFTUyA9ICdpcy1sb2FkaW5nJztcblxuLy8gcmVxdWlyZW1lbnRzXG4vLyBvYmplY3QuYXNzaWduLCBxdWVyeXNsZWN0b3IsIGVsLm1hdGNoXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNtb290aFN0YXRlIHtcbiAgc3RhdGljIGZyYWdtZW50RnJvbVN0cmluZyhzdHJIVE1MKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVJhbmdlKCkuY3JlYXRlQ29udGV4dHVhbEZyYWdtZW50KHN0ckhUTUwpO1xuICB9XG5cbiAgY29uc3RydWN0b3IoZWwsIG9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgIGNvbnRlbnRTZWxlY3RvcjogQ09OVEVOVF9TRUxFQ1RPUixcbiAgICAgIGxpbmtTZWxlY3RvcjogTElOS19TRUxFQ1RPUixcbiAgICAgIGxvYWRpbmdDbGFzczogTE9BRElOR19DTEFTUyxcbiAgICB9LCBvcHRpb25zKTtcblxuICAgIC8vIFRPRE86IGltcHJvdmUgQVBJXG4gICAgaWYgKGVsLnF1ZXJ5U2VsZWN0b3IodGhpcy5vcHRpb25zLmNvbnRlbnRTZWxlY3RvcikgPT0gbnVsbCkge1xuICAgICAgdGhyb3cgRXJyb3IoJ2VsIG5lZWRzIHRvIGNvbnRhaW4gY29udGVudCcpO1xuICAgIH1cbiAgICB0aGlzLmVsID0gZWw7XG5cbiAgICB0aGlzLmJpbmRDYWxsYmFja3MoKTtcblxuICAgIC8vIGNhY2hlIHRpdGxlIGVsZW1lbnRcbiAgICB0aGlzLnRpdGxlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3RpdGxlJykgfHwge307XG5cbiAgICBjb25zdCBjbGljayQkID0gbmV3IFN1YmplY3QoKTtcblxuICAgIGNvbnN0IHB1c2hzdGF0ZSQgPSBjbGljayQkXG4gICAgICAuc3dpdGNoKClcbiAgICAgIC5tYXAoaHJlZiA9PiAoe1xuICAgICAgICBwdXNoOiB0cnVlLFxuICAgICAgICBocmVmLFxuICAgICAgfSkpO1xuXG4gICAgY29uc3QgcG9wc3RhdGUkID0gT2JzZXJ2YWJsZS5mcm9tRXZlbnQod2luZG93LCAncG9wc3RhdGUnKVxuICAgICAgLmZpbHRlcigoeyBzdGF0ZSB9KSA9PiBzdGF0ZSAhPSBudWxsKVxuICAgICAgLm1hcCgoKSA9PiAoe1xuICAgICAgICBwdXNoOiBmYWxzZSxcbiAgICAgICAgaHJlZjogd2luZG93LmxvY2F0aW9uLmhyZWYsXG4gICAgICB9KSk7XG5cbiAgICBPYnNlcnZhYmxlLm1lcmdlKHB1c2hzdGF0ZSQsIHBvcHN0YXRlJClcbiAgICAgIC5kbyh0aGlzLm9uQmVmb3JlKVxuICAgICAgLm1hcCh0aGlzLmhyZWZUb1JxdWVzdERhdGEpXG4gICAgICAuc3dpdGNoTWFwKHRoaXMubWFrZVJlcXVlc3QpXG4gICAgICAubWFwKHRoaXMuYWpheFJlc3BvbnNlVG9Db250ZW50KVxuICAgICAgLnN1YnNjcmliZSgoaGFpcmJhbGwpID0+IHtcbiAgICAgICAgdGhpcy51cGRhdGVET00oaGFpcmJhbGwpO1xuICAgICAgICBjbGljayQkLm5leHQodGhpcy5iaW5kRXZlbnRzKCkpO1xuICAgICAgICB0aGlzLm9uQWZ0ZXIoKTtcbiAgICAgIH0pO1xuXG4gICAgLy8gbGV0J3MgZ2V0IHRoZSBwYXJ0eSBzdGFydGVkXG4gICAgY2xpY2skJC5uZXh0KHRoaXMuYmluZEV2ZW50cygpKTtcbiAgfVxuXG4gIGJpbmRDYWxsYmFja3MoKSB7XG4gICAgdGhpcy5iZU5pY2UgPSB0aGlzLmJlTmljZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaHJlZlRvUnF1ZXN0RGF0YSA9IHRoaXMuaHJlZlRvUnF1ZXN0RGF0YS5iaW5kKHRoaXMpO1xuICAgIHRoaXMubWFrZVJlcXVlc3QgPSB0aGlzLm1ha2VSZXF1ZXN0LmJpbmQodGhpcyk7XG4gICAgdGhpcy5hamF4UmVzcG9uc2VUb0NvbnRlbnQgPSB0aGlzLmFqYXhSZXNwb25zZVRvQ29udGVudC5iaW5kKHRoaXMpO1xuICAgIHRoaXMudXBkYXRlRE9NID0gdGhpcy51cGRhdGVET00uYmluZCh0aGlzKTtcbiAgICB0aGlzLm9uQmVmb3JlID0gdGhpcy5vbkJlZm9yZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMub25BZnRlciA9IHRoaXMub25BZnRlci5iaW5kKHRoaXMpO1xuICB9XG5cbiAgb25CZWZvcmUoKSB7XG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKHRoaXMub3B0aW9ucy5sb2FkaW5nQ2xhc3MpO1xuICAgIHRoaXMuZWwuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2JlZm9yZXNtb290aHN0YXRlJykpO1xuICB9XG5cbiAgb25BZnRlcigpIHtcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5vcHRpb25zLmxvYWRpbmdDbGFzcyk7XG4gICAgdGhpcy5lbC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnYWZ0ZXJtb290aHN0YXRlJykpO1xuICB9XG5cbiAgb25FcnJvcigpIHtcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5vcHRpb25zLmxvYWRpbmdDbGFzcyk7XG4gICAgLy8gaWYgKHRoaXMub3B0aW9ucy5vbkVycm9yKSB0aGlzLm9wdGlvbnMub25FcnJvcihlKTtcbiAgfVxuXG4gIGJlTmljZShlKSB7XG4gICAgcmV0dXJuIChcbiAgICAgICFlLm1ldGFLZXkgJiZcbiAgICAgICFlLmN0cmxLZXkgJiZcbiAgICAgIHNob3VsZExvYWRBbmNob3IoZS5jdXJyZW50VGFyZ2V0LCB0aGlzLm9wdGlvbnMuYmxhY2tsaXN0LCB0aGlzLm9wdGlvbnMuaHJlZlJlZ2V4KVxuICAgICk7XG4gIH1cblxuICBiaW5kRXZlbnRzKGQgPSBkb2N1bWVudCkge1xuICAgIHJldHVybiBPYnNlcnZhYmxlLm9mKGQucXVlcnlTZWxlY3RvckFsbCh0aGlzLm9wdGlvbnMubGlua1NlbGVjdG9yKSlcbiAgICAgIC5tYXAobGluayA9PiBPYnNlcnZhYmxlLmZyb21FdmVudChsaW5rLCAnY2xpY2snKSlcbiAgICAgIC5tZXJnZUFsbCgpXG4gICAgICAuZmlsdGVyKHRoaXMuYmVOaWNlKVxuICAgICAgLmRvKGUgPT4gZS5wcmV2ZW50RGVmYXVsdCgpKVxuICAgICAgLm1hcChlID0+IGUuY3VycmVudFRhcmdldC5ocmVmKTtcbiAgfVxuXG4gIGhyZWZUb1JxdWVzdERhdGEoaGFpcmJhbGwpIHtcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihoYWlyYmFsbCwge1xuICAgICAgcmVxdWVzdERhdGE6IHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgdXJsOiBoYWlyYmFsbC5ocmVmLFxuICAgICAgICByZXNwb25zZVR5cGU6ICd0ZXh0JyxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICBtYWtlUmVxdWVzdChoYWlyYmFsbCkge1xuICAgIHJldHVybiBPYnNlcnZhYmxlXG4gICAgICAuYWpheChoYWlyYmFsbC5yZXF1ZXN0RGF0YSlcbiAgICAgIC5yZXRyeSgzKVxuICAgICAgLm1hcChhamF4UmVzcG9uc2UgPT4gT2JqZWN0LmFzc2lnbihoYWlyYmFsbCwgeyBhamF4UmVzcG9uc2UgfSkpXG4gICAgICAuY2F0Y2goKGUpID0+IHtcbiAgICAgICAgdGhpcy5vbkVycm9yKGUpO1xuICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5lbXB0eSgpO1xuICAgICAgfSk7XG4gIH1cblxuICBhamF4UmVzcG9uc2VUb0NvbnRlbnQoaGFpcmJhbGwpIHtcbiAgICBjb25zdCBkb2N1bWVudEZyYWdtZW50ID0gU21vb3RoU3RhdGUuZnJhZ21lbnRGcm9tU3RyaW5nKGhhaXJiYWxsLmFqYXhSZXNwb25zZS5yZXNwb25zZSk7XG4gICAgY29uc3QgdGl0bGUgPSAoZG9jdW1lbnRGcmFnbWVudC5xdWVyeVNlbGVjdG9yKCd0aXRsZScpIHx8IHt9KS50ZXh0Q29udGVudDtcbiAgICBjb25zdCB1cmwgPSBoYWlyYmFsbC5hamF4UmVzcG9uc2UucmVxdWVzdC51cmw7XG5cbiAgICAvLyBUT0RPOiBhYm9ydCBpZiBjb250ZW50X3NlbGVjdG9yIG5vdCBwcmVzZW50XG4gICAgY29uc3QgY29udGVudCA9IGRvY3VtZW50RnJhZ21lbnQucXVlcnlTZWxlY3RvckFsbCh0aGlzLm9wdGlvbnMuY29udGVudFNlbGVjdG9yKTtcblxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKGhhaXJiYWxsLCB7IHRpdGxlLCB1cmwsIGNvbnRlbnQgfSk7XG4gIH1cblxuICB1cGRhdGVET00oeyB0aXRsZSwgY29udGVudCwgdXJsLCBwdXNoIH0pIHtcbiAgICAvLyByZXBsYWNlIGNvbnRlbnRcbiAgICBjb25zdCBvbGRDb250ZW50ID0gdGhpcy5lbC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMub3B0aW9ucy5jb250ZW50U2VsZWN0b3IpO1xuXG4gICAgaWYgKGNvbnRlbnQubGVuZ3RoID09PSBvbGRDb250ZW50Lmxlbmd0aCkge1xuICAgICAgLy8gVE9ETzogd2FyblxuICAgIH1cblxuICAgIEFycmF5LmZyb20ob2xkQ29udGVudCkuZm9yRWFjaCgob2xkRWxlbWVudCwgaSkgPT4ge1xuICAgICAgb2xkRWxlbWVudC5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChjb250ZW50W2ldLCBvbGRFbGVtZW50KTtcbiAgICB9KTtcblxuICAgIC8vIHVwZGF0ZSB0aXRsZSBzZXBhcmF0ZWx5XG4gICAgLy8gVE9ETzogdXBkYXRlIG1ldGEgZGVzY3JpcHRpb24/XG4gICAgdGhpcy50aXRsZUVsZW1lbnQudGV4dENvbnRlbnQgPSB0aXRsZTtcblxuICAgIC8vIHB1c2ggbmV3IGZyYW1lIHRvIGhpc3RvcnkgaWYgbm90IGEgcG9wc3RhdGVcbiAgICBpZiAocHVzaCkge1xuICAgICAgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKHt9LCB0aXRsZSwgdXJsKTtcbiAgICAgIHdpbmRvdy5zY3JvbGxUbyh3aW5kb3cucGFnZVhPZmZzZXQsIDApO1xuICAgIH1cbiAgfVxufVxuIiwiLyoqXG4gKiBDaGVja3MgdG8gc2VlIGlmIHRoZSB1cmwgaXMgZXh0ZXJuYWxcbiAqXG4gKiBAcGFyYW0gICB7c3RyaW5nfSAgICB1cmwgLSB1cmwgYmVpbmcgZXZhbHVhdGVkXG4gKiBAc2VlICAgICBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzYyMzgzNTEvZmFzdGVzdC13YXktdG8tZGV0ZWN0LWV4dGVybmFsLXVybHNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzRXh0ZXJuYWwodXJsKSB7XG4gIGNvbnN0IG1hdGNoID0gdXJsLm1hdGNoKC9eKFteOlxcLz8jXSs6KT8oPzpcXC9cXC8oW15cXC8/I10qKSk/KFtePyNdKyk/KFxcP1teI10qKT8oIy4qKT8vKTtcblxuICBpZiAodHlwZW9mIG1hdGNoWzFdID09PSAnc3RyaW5nJyAmJlxuICAgICAgbWF0Y2hbMV0ubGVuZ3RoID4gMCAmJlxuICAgICAgbWF0Y2hbMV0udG9Mb3dlckNhc2UoKSAhPT0gd2luZG93LmxvY2F0aW9uLnByb3RvY29sXG4gICAgKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBjb25zdCBwb3J0ID0geyBodHRwOiA4MCwgaHR0cHM6IDQ0MyB9W3dpbmRvdy5sb2NhdGlvbi5wcm90b2NvbF07XG5cbiAgaWYgKHR5cGVvZiBtYXRjaFsyXSA9PT0gJ3N0cmluZycgJiZcbiAgICBtYXRjaFsyXS5sZW5ndGggPiAwICYmXG4gICAgbWF0Y2hbMl0ucmVwbGFjZShuZXcgUmVnRXhwKGA6KCR7cG9ydH0pPyRgKSwgJycpICE9PSB3aW5kb3cubG9jYXRpb24uaG9zdCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIFN0cmlwcyB0aGUgaGFzaCBmcm9tIGEgdXJsIGFuZCByZXR1cm5zIHRoZSBuZXcgaHJlZlxuICpcbiAqIEBwYXJhbSAgIHtzdHJpbmd9ICAgIGhyZWYgLSB1cmwgYmVpbmcgZXZhbHVhdGVkXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdHJpcEhhc2goaHJlZikge1xuICByZXR1cm4gaHJlZi5yZXBsYWNlKC8jLiovLCAnJyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIHRvIHNlZSBpZiB0aGUgdXJsIGlzIGFuIGludGVybmFsIGhhc2hcbiAqXG4gKiBAcGFyYW0gICB7c3RyaW5nfSAgICBocmVmIC0gdXJsIGJlaW5nIGV2YWx1YXRlZFxuICogQHBhcmFtICAge3N0cmluZ30gICAgcHJldiAtIHByZXZpb3VzIHVybCAob3B0aW9uYWwpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0hhc2goaHJlZiwgcHJldikge1xuICBjb25zdCBwID0gcHJldiB8fCB3aW5kb3cubG9jYXRpb24uaHJlZjtcblxuICBjb25zdCBoYXNIYXNoID0gaHJlZi5pbmRleE9mKCcjJykgPiAtMTtcbiAgY29uc3Qgc2FtZVBhdGggPSBzdHJpcEhhc2goaHJlZikgPT09IHN0cmlwSGFzaChwKTtcblxuICByZXR1cm4gKGhhc0hhc2ggJiYgc2FtZVBhdGgpO1xufVxuXG4vKipcbiAqIENoZWNrcyB0byBzZWUgaWYgd2Ugc2hvdWxkIGJlIGxvYWRpbmcgdGhpcyBVUkxcbiAqXG4gKiBAcGFyYW0gICB7c3RyaW5nfSAgICB1cmwgLSB1cmwgYmVpbmcgZXZhbHVhdGVkXG4gKiBAcGFyYW0gICB7c3RyaW5nfSAgICBibGFja2xpc3QgLSBqcXVlcnkgc2VsZWN0b3JcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNob3VsZExvYWRBbmNob3IoYW5jaG9yLCBibGFja2xpc3QsIGhyZWZSZWdleCkge1xuICBjb25zdCBocmVmID0gYW5jaG9yLmhyZWY7XG4gIC8vIFVSTCB3aWxsIG9ubHkgYmUgbG9hZGVkIGlmIGl0J3Mgbm90IGFuIGV4dGVybmFsIGxpbmssIGhhc2gsIG9yXG4gIC8vIGJsYWNrbGlzdGVkXG4gIHJldHVybiAoXG4gICAgIWlzRXh0ZXJuYWwoaHJlZikgJiZcbiAgICAhaXNIYXNoKGhyZWYpICYmXG4gICAgIWFuY2hvci5tYXRjaGVzKGJsYWNrbGlzdCkgJiZcbiAgICBhbmNob3IudGFyZ2V0ID09PSAnJyAmJiAoXG4gICAgICB0eXBlb2YgaHJlZlJlZ2V4ID09PSAndW5kZWZpbmVkJyB8fFxuICAgICAgaHJlZlJlZ2V4ID09PSAnJyB8fFxuICAgICAgaHJlZi5zZWFyY2goaHJlZlJlZ2V4KSAhPT0gLTFcbiAgICApXG4gICk7XG59XG4iLCJpbXBvcnQgU21vb3RoU3RhdGUgZnJvbSAnLi9zbW9vdGgtc3RhdGUtbGliJztcblxuaW1wb3J0IHVwZ3JhZGVLYXRleCBmcm9tICcuL2thdGV4JztcblxuY29uc3Qgc21vb3RoU3RhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjX3Ntb290aC1zdGF0ZScpO1xuXG53aW5kb3cuc21vb3RoU3RhdGUgPSBuZXcgU21vb3RoU3RhdGUoc21vb3RoU3RhdGUsIHtcbiAgLy8gcmVwbGFjZUlkczogWydfbWFpbicsICdfYXNpZGViYXInXSxcbiAgY29udGVudFNlbGVjdG9yOiAnbWFpbiwgaGVhZGVyID4gZGl2Jyxcbn0pO1xuXG5zbW9vdGhTdGF0ZS5hZGRFdmVudExpc3RlbmVyKCdiZWZvcmVzbW9vdGhzdGF0ZScsICgpID0+IHtcbiAgaWYgKCF3aW5kb3cuaXNEZXNrdG9wICYmIHdpbmRvdy5kcmF3ZXIub3BlbmVkKSB7XG4gICAgd2luZG93LmRyYXdlci5jbG9zZSgpO1xuICB9XG59KTtcblxuc21vb3RoU3RhdGUuYWRkRXZlbnRMaXN0ZW5lcignYWZ0ZXJzbW9vdGhzdGF0ZScsICgpID0+IHtcbiAgIC8vIHNlbmQgZ29vZ2xlIGFuYWx5dGljcyBwYWdldmlld1xuICBpZiAod2luZG93LmdhKSB3aW5kb3cuZ2EoJ3NlbmQnLCAncGFnZXZpZXcnKTtcblxuICAvLyB1cGdyYWRlIG1hdGggYmxvY2tzXG4gIHVwZ3JhZGVLYXRleCgpO1xufSk7XG4iXX0=
