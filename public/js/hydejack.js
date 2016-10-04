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


},{"./symbol/observable":83,"./util/root":93,"./util/toSubscriber":95}],46:[function(require,module,exports){
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


},{"./Observable":45,"./SubjectSubscription":49,"./Subscriber":50,"./Subscription":51,"./symbol/rxSubscriber":84,"./util/ObjectUnsubscribedError":85}],49:[function(require,module,exports){
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


},{"./Observer":46,"./Subscription":51,"./symbol/rxSubscriber":84,"./util/isFunction":89}],51:[function(require,module,exports){
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


},{"./util/UnsubscriptionError":86,"./util/errorObject":87,"./util/isArray":88,"./util/isFunction":89,"./util/isObject":90,"./util/tryCatch":96}],52:[function(require,module,exports){
'use strict';

var _Observable = require('../../../Observable');

var _ajax = require('../../../observable/dom/ajax');

_Observable.Observable.ajax = _ajax.ajax;


},{"../../../Observable":45,"../../../observable/dom/ajax":69}],53:[function(require,module,exports){
'use strict';

var _Observable = require('../../Observable');

var _fromEvent = require('../../observable/fromEvent');

_Observable.Observable.fromEvent = _fromEvent.fromEvent;


},{"../../Observable":45,"../../observable/fromEvent":70}],54:[function(require,module,exports){
'use strict';

var _Observable = require('../../Observable');

var _merge = require('../../observable/merge');

_Observable.Observable.merge = _merge.merge;


},{"../../Observable":45,"../../observable/merge":71}],55:[function(require,module,exports){
'use strict';

var _Observable = require('../../Observable');

var _of = require('../../observable/of');

_Observable.Observable.of = _of.of;


},{"../../Observable":45,"../../observable/of":72}],56:[function(require,module,exports){
'use strict';

var _Observable = require('../../Observable');

var _debounce = require('../../operator/debounce');

_Observable.Observable.prototype.debounce = _debounce.debounce;


},{"../../Observable":45,"../../operator/debounce":73}],57:[function(require,module,exports){
'use strict';

var _Observable = require('../../Observable');

var _do2 = require('../../operator/do');

_Observable.Observable.prototype.do = _do2._do;
_Observable.Observable.prototype._do = _do2._do;


},{"../../Observable":45,"../../operator/do":74}],58:[function(require,module,exports){
'use strict';

var _Observable = require('../../Observable');

var _filter = require('../../operator/filter');

_Observable.Observable.prototype.filter = _filter.filter;


},{"../../Observable":45,"../../operator/filter":75}],59:[function(require,module,exports){
'use strict';

var _Observable = require('../../Observable');

var _map = require('../../operator/map');

_Observable.Observable.prototype.map = _map.map;


},{"../../Observable":45,"../../operator/map":76}],60:[function(require,module,exports){
'use strict';

var _Observable = require('../../Observable');

var _mergeAll = require('../../operator/mergeAll');

_Observable.Observable.prototype.mergeAll = _mergeAll.mergeAll;


},{"../../Observable":45,"../../operator/mergeAll":78}],61:[function(require,module,exports){
'use strict';

var _Observable = require('../../Observable');

var _retry = require('../../operator/retry');

_Observable.Observable.prototype.retry = _retry.retry;


},{"../../Observable":45,"../../operator/retry":79}],62:[function(require,module,exports){
'use strict';

var _Observable = require('../../Observable');

var _switch2 = require('../../operator/switch');

_Observable.Observable.prototype.switch = _switch2._switch;
_Observable.Observable.prototype._switch = _switch2._switch;


},{"../../Observable":45,"../../operator/switch":80}],63:[function(require,module,exports){
'use strict';

var _Observable = require('../../Observable');

var _switchMap = require('../../operator/switchMap');

_Observable.Observable.prototype.switchMap = _switchMap.switchMap;


},{"../../Observable":45,"../../operator/switchMap":81}],64:[function(require,module,exports){
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


},{"../Observable":45,"../util/isScheduler":92,"./EmptyObservable":65,"./ScalarObservable":67}],65:[function(require,module,exports){
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


},{"../Observable":45}],66:[function(require,module,exports){
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


},{"../Observable":45,"../Subscription":51,"../util/errorObject":87,"../util/isFunction":89,"../util/tryCatch":96}],67:[function(require,module,exports){
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


},{"../Observable":45}],68:[function(require,module,exports){
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


},{"../../Observable":45,"../../Subscriber":50,"../../operator/map":76,"../../util/errorObject":87,"../../util/root":93,"../../util/tryCatch":96}],69:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ajax = undefined;

var _AjaxObservable = require('./AjaxObservable');

var ajax = exports.ajax = _AjaxObservable.AjaxObservable.create;


},{"./AjaxObservable":68}],70:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fromEvent = undefined;

var _FromEventObservable = require('./FromEventObservable');

var fromEvent = exports.fromEvent = _FromEventObservable.FromEventObservable.create;


},{"./FromEventObservable":66}],71:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.merge = undefined;

var _merge = require('../operator/merge');

var merge = exports.merge = _merge.mergeStatic;


},{"../operator/merge":77}],72:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.of = undefined;

var _ArrayObservable = require('./ArrayObservable');

var of = exports.of = _ArrayObservable.ArrayObservable.of;


},{"./ArrayObservable":64}],73:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.debounce = debounce;

var _OuterSubscriber2 = require('../OuterSubscriber');

var _subscribeToResult = require('../util/subscribeToResult');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Emits a value from the source Observable only after a particular time span
 * determined by another Observable has passed without another source emission.
 *
 * <span class="informal">It's like {@link debounceTime}, but the time span of
 * emission silence is determined by a second Observable.</span>
 *
 * <img src="./img/debounce.png" width="100%">
 *
 * `debounce` delays values emitted by the source Observable, but drops previous
 * pending delayed emissions if a new value arrives on the source Observable.
 * This operator keeps track of the most recent value from the source
 * Observable, and spawns a duration Observable by calling the
 * `durationSelector` function. The value is emitted only when the duration
 * Observable emits a value or completes, and if no other value was emitted on
 * the source Observable since the duration Observable was spawned. If a new
 * value appears before the duration Observable emits, the previous value will
 * be dropped and will not be emitted on the output Observable.
 *
 * Like {@link debounceTime}, this is a rate-limiting operator, and also a
 * delay-like operator since output emissions do not necessarily occur at the
 * same time as they did on the source Observable.
 *
 * @example <caption>Emit the most recent click after a burst of clicks</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.debounce(() => Rx.Observable.interval(1000));
 * result.subscribe(x => console.log(x));
 *
 * @see {@link audit}
 * @see {@link debounceTime}
 * @see {@link delayWhen}
 * @see {@link throttle}
 *
 * @param {function(value: T): Observable|Promise} durationSelector A function
 * that receives a value from the source Observable, for computing the timeout
 * duration for each source value, returned as an Observable or a Promise.
 * @return {Observable} An Observable that delays the emissions of the source
 * Observable by the specified duration Observable returned by
 * `durationSelector`, and may drop some values if they occur too frequently.
 * @method debounce
 * @owner Observable
 */
function debounce(durationSelector) {
    return this.lift(new DebounceOperator(durationSelector));
}

var DebounceOperator = function () {
    function DebounceOperator(durationSelector) {
        _classCallCheck(this, DebounceOperator);

        this.durationSelector = durationSelector;
    }

    _createClass(DebounceOperator, [{
        key: 'call',
        value: function call(subscriber, source) {
            return source._subscribe(new DebounceSubscriber(subscriber, this.durationSelector));
        }
    }]);

    return DebounceOperator;
}();
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */


var DebounceSubscriber = function (_OuterSubscriber) {
    _inherits(DebounceSubscriber, _OuterSubscriber);

    function DebounceSubscriber(destination, durationSelector) {
        _classCallCheck(this, DebounceSubscriber);

        var _this = _possibleConstructorReturn(this, (DebounceSubscriber.__proto__ || Object.getPrototypeOf(DebounceSubscriber)).call(this, destination));

        _this.durationSelector = durationSelector;
        _this.hasValue = false;
        _this.durationSubscription = null;
        return _this;
    }

    _createClass(DebounceSubscriber, [{
        key: '_next',
        value: function _next(value) {
            try {
                var result = this.durationSelector.call(this, value);
                if (result) {
                    this._tryNext(value, result);
                }
            } catch (err) {
                this.destination.error(err);
            }
        }
    }, {
        key: '_complete',
        value: function _complete() {
            this.emitValue();
            this.destination.complete();
        }
    }, {
        key: '_tryNext',
        value: function _tryNext(value, duration) {
            var subscription = this.durationSubscription;
            this.value = value;
            this.hasValue = true;
            if (subscription) {
                subscription.unsubscribe();
                this.remove(subscription);
            }
            subscription = (0, _subscribeToResult.subscribeToResult)(this, duration);
            if (!subscription.closed) {
                this.add(this.durationSubscription = subscription);
            }
        }
    }, {
        key: 'notifyNext',
        value: function notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
            this.emitValue();
        }
    }, {
        key: 'notifyComplete',
        value: function notifyComplete() {
            this.emitValue();
        }
    }, {
        key: 'emitValue',
        value: function emitValue() {
            if (this.hasValue) {
                var value = this.value;
                var subscription = this.durationSubscription;
                if (subscription) {
                    this.durationSubscription = null;
                    subscription.unsubscribe();
                    this.remove(subscription);
                }
                this.value = null;
                this.hasValue = false;
                _get(DebounceSubscriber.prototype.__proto__ || Object.getPrototypeOf(DebounceSubscriber.prototype), '_next', this).call(this, value);
            }
        }
    }]);

    return DebounceSubscriber;
}(_OuterSubscriber2.OuterSubscriber);


},{"../OuterSubscriber":47,"../util/subscribeToResult":94}],74:[function(require,module,exports){
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


},{"../Subscriber":50}],75:[function(require,module,exports){
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


},{"../Subscriber":50}],76:[function(require,module,exports){
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


},{"../Subscriber":50}],77:[function(require,module,exports){
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


},{"../observable/ArrayObservable":64,"../util/isScheduler":92,"./mergeAll":78}],78:[function(require,module,exports){
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


},{"../OuterSubscriber":47,"../util/subscribeToResult":94}],79:[function(require,module,exports){
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


},{"../Subscriber":50}],80:[function(require,module,exports){
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


},{"../OuterSubscriber":47,"../util/subscribeToResult":94}],81:[function(require,module,exports){
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


},{"../OuterSubscriber":47,"../util/subscribeToResult":94}],82:[function(require,module,exports){
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


},{"../util/root":93}],83:[function(require,module,exports){
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


},{"../util/root":93}],84:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.$$rxSubscriber = undefined;

var _root = require('../util/root');

var _Symbol = _root.root.Symbol;
var $$rxSubscriber = exports.$$rxSubscriber = typeof _Symbol === 'function' && typeof _Symbol.for === 'function' ? _Symbol.for('rxSubscriber') : '@@rxSubscriber';


},{"../util/root":93}],85:[function(require,module,exports){
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


},{}],86:[function(require,module,exports){
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


},{}],87:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// typeof any so that it we don't have to cast when comparing a result to the error object
var errorObject = exports.errorObject = { e: {} };


},{}],88:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var isArray = exports.isArray = Array.isArray || function (x) {
  return x && typeof x.length === 'number';
};


},{}],89:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isFunction = isFunction;
function isFunction(x) {
    return typeof x === 'function';
}


},{}],90:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.isObject = isObject;
function isObject(x) {
    return x != null && (typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'object';
}


},{}],91:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isPromise = isPromise;
function isPromise(value) {
    return value && typeof value.subscribe !== 'function' && typeof value.then === 'function';
}


},{}],92:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isScheduler = isScheduler;
function isScheduler(value) {
    return value && typeof value.schedule === 'function';
}


},{}],93:[function(require,module,exports){
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

},{}],94:[function(require,module,exports){
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


},{"../InnerSubscriber":44,"../Observable":45,"../symbol/iterator":82,"../symbol/observable":83,"./isArray":88,"./isPromise":91,"./root":93}],95:[function(require,module,exports){
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


},{"../Subscriber":50,"../symbol/rxSubscriber":84}],96:[function(require,module,exports){
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


},{"./errorObject":87}],97:[function(require,module,exports){
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

},{}],98:[function(require,module,exports){
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

},{"./modernizr":99}],99:[function(require,module,exports){
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

},{}],100:[function(require,module,exports){
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

},{"../lib/has-features":98,"core-js/fn/object/assign":1,"core-js/fn/object/define-property":2,"core-js/fn/object/keys":3,"fg-loadcss/src/loadCSS":43}],101:[function(require,module,exports){
(function (global){
'use strict';

var _loadCSS = require('fg-loadcss/src/loadCSS');

require('./katex');

require('./drawer');

require('./smooth-state');

global.loadCSS = _loadCSS.loadCSS;
require('../lib/cssrelpreload');

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../lib/cssrelpreload":97,"./drawer":100,"./katex":102,"./smooth-state":104,"fg-loadcss/src/loadCSS":43}],102:[function(require,module,exports){
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

},{"../lib/has-features":98,"fg-loadcss/src/loadCSS":43}],103:[function(require,module,exports){
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

},{}],104:[function(require,module,exports){
'use strict';

var _Observable = require('rxjs-es/Observable');

var _Subject = require('rxjs-es/Subject');

require('rxjs-es/add/observable/of');

require('rxjs-es/add/observable/dom/ajax');

require('rxjs-es/add/observable/fromEvent');

require('rxjs-es/add/observable/merge');

require('rxjs-es/add/operator/map');

require('rxjs-es/add/operator/filter');

require('rxjs-es/add/operator/mergeAll');

require('rxjs-es/add/operator/do');

require('rxjs-es/add/operator/switch');

require('rxjs-es/add/operator/switchMap');

require('rxjs-es/add/operator/retry');

require('rxjs-es/add/operator/debounce');

var _smoothStateUtil = require('./smooth-state-util');

window.Observable = _Observable.Observable; /* eslint-disable no-console */

var LINK_SELECTOR = 'a[href]'; // 'a[href^="/"]';
var CONTENT_SELECTOR = 'main';

function makeSmooth() {
  var contentSelector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : CONTENT_SELECTOR;
  var linkSelector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : LINK_SELECTOR;

  var titleElement = document.querySelector('title') || {};

  function fragmentFromString(strHTML) {
    return document.createRange().createContextualFragment(strHTML);
  }

  function beNice(e) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return !e.metaKey && !e.ctrlKey && (0, _smoothStateUtil.shouldLoadAnchor)(e.currentTarget, options.blacklist, options.hrefRegex);
  }

  function bindEvents() {
    var d = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;

    return _Observable.Observable.of(d.querySelectorAll(linkSelector)).map(function (link) {
      return _Observable.Observable.fromEvent(link, 'click');
    }).mergeAll().filter(beNice).do(function (e) {
      return e.preventDefault();
    }).map(function (e) {
      return e.currentTarget.href;
    });
  }

  function hrefToRquestData(_ref) {
    var href = _ref.href;
    var isPush = _ref.isPush;

    return {
      isPush: isPush,
      requestData: {
        method: 'GET',
        url: href,
        responseType: 'text'
      }
    };
  }

  function makeRequest(_ref2) {
    var requestData = _ref2.requestData;
    var isPush = _ref2.isPush;

    return _Observable.Observable.ajax(requestData).retry(3).map(function (ajaxResponse) {
      return {
        ajaxResponse: ajaxResponse,
        isPush: isPush
      };
    });
    // TODO: catch and show error msg
    // .catch(() => Observable.empty())
  }

  function ajaxResponseToCache(_ref3) {
    var isPush = _ref3.isPush;
    var ajaxResponse = _ref3.ajaxResponse;

    var documentFragment = fragmentFromString(ajaxResponse.response);
    var title = (documentFragment.querySelector('title') || {}).textContent;
    var url = ajaxResponse.request.url;

    // TODO: abort if content_selector not present
    var content = documentFragment.querySelector(contentSelector);

    return { title: title, url: url, content: content, isPush: isPush };
  }

  function updateDOMContent(_ref4) {
    var title = _ref4.title;
    var content = _ref4.content;
    var url = _ref4.url;
    var isPush = _ref4.isPush;

    // update content
    var main = document.querySelector(contentSelector);
    main.parentNode.replaceChild(content, main); // TODO: Don't add all at once!?
    // main.innerHTML = content.innerHTML; // TODO: could this be faster?

    // update title
    titleElement.textContent = title;

    // push new frame to history if not a popstate
    if (isPush) window.history.pushState({}, title, url);
    if (isPush) document.body.scrollTop = 0;
  }

  // Observable<Observable<ClickEvents>>
  var clickClick$ = new _Subject.Subject();

  var pushstate$ = clickClick$.switch().map(function (href) {
    return {
      isPush: true,
      href: href
    };
  });

  var popstate$ = _Observable.Observable.fromEvent(window, 'popstate').filter(function (_ref5) {
    var state = _ref5.state;
    return state != null;
  }).map(function () {
    return {
      isPush: false,
      href: window.location.href
    };
  });

  _Observable.Observable.merge(pushstate$, popstate$).map(hrefToRquestData).do(function () {
    return document.body.classList.add('is-loading');
  }).switchMap(makeRequest).map(ajaxResponseToCache).do(updateDOMContent).do(function () {
    return document.body.classList.remove('is-loading');
  })
  // TODO: catch
  .subscribe(function () {
    clickClick$.next(bindEvents()); // TODO: possible without subject?
  });

  // TODO: startwith instead?
  clickClick$.next(bindEvents());
}

// TODO: options
makeSmooth();

},{"./smooth-state-util":103,"rxjs-es/Observable":45,"rxjs-es/Subject":48,"rxjs-es/add/observable/dom/ajax":52,"rxjs-es/add/observable/fromEvent":53,"rxjs-es/add/observable/merge":54,"rxjs-es/add/observable/of":55,"rxjs-es/add/operator/debounce":56,"rxjs-es/add/operator/do":57,"rxjs-es/add/operator/filter":58,"rxjs-es/add/operator/map":59,"rxjs-es/add/operator/mergeAll":60,"rxjs-es/add/operator/retry":61,"rxjs-es/add/operator/switch":62,"rxjs-es/add/operator/switchMap":63}]},{},[101])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9mbi9vYmplY3QvYXNzaWduLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2ZuL29iamVjdC9rZXlzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fYS1mdW5jdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2FuLW9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2FycmF5LWluY2x1ZGVzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fY29mLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fY29yZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2N0eC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2RlZmluZWQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19kZXNjcmlwdG9ycy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2RvbS1jcmVhdGUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19lbnVtLWJ1Zy1rZXlzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fZXhwb3J0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fZmFpbHMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19nbG9iYWwuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19oYXMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19oaWRlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faWU4LWRvbS1kZWZpbmUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faXMtb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWFzc2lnbi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1kcC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1nb3BzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWtleXMtaW50ZXJuYWwuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19vYmplY3Qta2V5cy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1waWUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19vYmplY3Qtc2FwLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fcHJvcGVydHktZGVzYy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3JlZGVmaW5lLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fc2hhcmVkLWtleS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3NoYXJlZC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3RvLWluZGV4LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fdG8taW50ZWdlci5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3RvLWlvYmplY3QuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL190by1sZW5ndGguanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL190by1vYmplY3QuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL190by1wcmltaXRpdmUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL191aWQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYub2JqZWN0LmRlZmluZS1wcm9wZXJ0eS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm9iamVjdC5rZXlzLmpzIiwibm9kZV9tb2R1bGVzL2ZnLWxvYWRjc3Mvc3JjL2xvYWRDU1MuanMiLCJub2RlX21vZHVsZXMvcnhqcy1lcy9Jbm5lclN1YnNjcmliZXIuanMiLCJub2RlX21vZHVsZXMvcnhqcy1lcy9PYnNlcnZhYmxlLmpzIiwibm9kZV9tb2R1bGVzL3J4anMtZXMvT2JzZXJ2ZXIuanMiLCJub2RlX21vZHVsZXMvcnhqcy1lcy9PdXRlclN1YnNjcmliZXIuanMiLCJub2RlX21vZHVsZXMvcnhqcy1lcy9TdWJqZWN0LmpzIiwibm9kZV9tb2R1bGVzL3J4anMtZXMvU3ViamVjdFN1YnNjcmlwdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzLWVzL1N1YnNjcmliZXIuanMiLCJub2RlX21vZHVsZXMvcnhqcy1lcy9TdWJzY3JpcHRpb24uanMiLCJub2RlX21vZHVsZXMvcnhqcy1lcy9hZGQvb2JzZXJ2YWJsZS9kb20vYWpheC5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzLWVzL2FkZC9vYnNlcnZhYmxlL2Zyb21FdmVudC5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzLWVzL2FkZC9vYnNlcnZhYmxlL21lcmdlLmpzIiwibm9kZV9tb2R1bGVzL3J4anMtZXMvYWRkL29ic2VydmFibGUvb2YuanMiLCJub2RlX21vZHVsZXMvcnhqcy1lcy9hZGQvb3BlcmF0b3IvZGVib3VuY2UuanMiLCJub2RlX21vZHVsZXMvcnhqcy1lcy9hZGQvb3BlcmF0b3IvZG8uanMiLCJub2RlX21vZHVsZXMvcnhqcy1lcy9hZGQvb3BlcmF0b3IvZmlsdGVyLmpzIiwibm9kZV9tb2R1bGVzL3J4anMtZXMvYWRkL29wZXJhdG9yL21hcC5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzLWVzL2FkZC9vcGVyYXRvci9tZXJnZUFsbC5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzLWVzL2FkZC9vcGVyYXRvci9yZXRyeS5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzLWVzL2FkZC9vcGVyYXRvci9zd2l0Y2guanMiLCJub2RlX21vZHVsZXMvcnhqcy1lcy9hZGQvb3BlcmF0b3Ivc3dpdGNoTWFwLmpzIiwibm9kZV9tb2R1bGVzL3J4anMtZXMvb2JzZXJ2YWJsZS9BcnJheU9ic2VydmFibGUuanMiLCJub2RlX21vZHVsZXMvcnhqcy1lcy9vYnNlcnZhYmxlL0VtcHR5T2JzZXJ2YWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzLWVzL29ic2VydmFibGUvRnJvbUV2ZW50T2JzZXJ2YWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzLWVzL29ic2VydmFibGUvU2NhbGFyT2JzZXJ2YWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzLWVzL29ic2VydmFibGUvZG9tL0FqYXhPYnNlcnZhYmxlLmpzIiwibm9kZV9tb2R1bGVzL3J4anMtZXMvb2JzZXJ2YWJsZS9kb20vYWpheC5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzLWVzL29ic2VydmFibGUvZnJvbUV2ZW50LmpzIiwibm9kZV9tb2R1bGVzL3J4anMtZXMvb2JzZXJ2YWJsZS9tZXJnZS5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzLWVzL29ic2VydmFibGUvb2YuanMiLCJub2RlX21vZHVsZXMvcnhqcy1lcy9vcGVyYXRvci9kZWJvdW5jZS5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzLWVzL29wZXJhdG9yL2RvLmpzIiwibm9kZV9tb2R1bGVzL3J4anMtZXMvb3BlcmF0b3IvZmlsdGVyLmpzIiwibm9kZV9tb2R1bGVzL3J4anMtZXMvb3BlcmF0b3IvbWFwLmpzIiwibm9kZV9tb2R1bGVzL3J4anMtZXMvb3BlcmF0b3IvbWVyZ2UuanMiLCJub2RlX21vZHVsZXMvcnhqcy1lcy9vcGVyYXRvci9tZXJnZUFsbC5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzLWVzL29wZXJhdG9yL3JldHJ5LmpzIiwibm9kZV9tb2R1bGVzL3J4anMtZXMvb3BlcmF0b3Ivc3dpdGNoLmpzIiwibm9kZV9tb2R1bGVzL3J4anMtZXMvb3BlcmF0b3Ivc3dpdGNoTWFwLmpzIiwibm9kZV9tb2R1bGVzL3J4anMtZXMvc3ltYm9sL2l0ZXJhdG9yLmpzIiwibm9kZV9tb2R1bGVzL3J4anMtZXMvc3ltYm9sL29ic2VydmFibGUuanMiLCJub2RlX21vZHVsZXMvcnhqcy1lcy9zeW1ib2wvcnhTdWJzY3JpYmVyLmpzIiwibm9kZV9tb2R1bGVzL3J4anMtZXMvdXRpbC9PYmplY3RVbnN1YnNjcmliZWRFcnJvci5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzLWVzL3V0aWwvVW5zdWJzY3JpcHRpb25FcnJvci5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzLWVzL3V0aWwvZXJyb3JPYmplY3QuanMiLCJub2RlX21vZHVsZXMvcnhqcy1lcy91dGlsL2lzQXJyYXkuanMiLCJub2RlX21vZHVsZXMvcnhqcy1lcy91dGlsL2lzRnVuY3Rpb24uanMiLCJub2RlX21vZHVsZXMvcnhqcy1lcy91dGlsL2lzT2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL3J4anMtZXMvdXRpbC9pc1Byb21pc2UuanMiLCJub2RlX21vZHVsZXMvcnhqcy1lcy91dGlsL2lzU2NoZWR1bGVyLmpzIiwibm9kZV9tb2R1bGVzL3J4anMtZXMvdXRpbC9yb290LmpzIiwibm9kZV9tb2R1bGVzL3J4anMtZXMvdXRpbC9zdWJzY3JpYmVUb1Jlc3VsdC5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzLWVzL3V0aWwvdG9TdWJzY3JpYmVyLmpzIiwibm9kZV9tb2R1bGVzL3J4anMtZXMvdXRpbC90cnlDYXRjaC5qcyIsInB1YmxpYy9qcy9saWIvY3NzcmVscHJlbG9hZC5qcyIsInB1YmxpYy9qcy9saWIvaGFzLWZlYXR1cmVzLmpzIiwicHVibGljL2pzL2xpYi9tb2Rlcm5penIuanMiLCJwdWJsaWMvanMvc3JjL2RyYXdlci5qcyIsInB1YmxpYy9qcy9zcmMvaW5kZXguanMiLCJwdWJsaWMvanMvc3JjL2thdGV4LmpzIiwicHVibGljL2pzL3NyYy9zbW9vdGgtc3RhdGUtdXRpbC5qcyIsInB1YmxpYy9qcy9zcmMvc21vb3RoLXN0YXRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUcsS0FBSCxTQUFHLEtBQUg7QUFBQSxXQUFlLFNBQVMsSUFBeEI7QUFBQSxHQURRLEVBRWYsR0FGZSxDQUVYO0FBQUEsV0FBTztBQUNWLGNBQVEsS0FERTtBQUVWLFlBQU0sT0FBTyxRQUFQLENBQWdCO0FBRlosS0FBUDtBQUFBLEdBRlcsQ0FBbEI7O0FBT0EseUJBQVcsS0FBWCxDQUFpQixVQUFqQixFQUE2QixTQUE3QixFQUNHLEdBREgsQ0FDTyxnQkFEUCxFQUVHLEVBRkgsQ0FFTTtBQUFBLFdBQU0sU0FBUyxJQUFULENBQWMsU0FBZCxDQUF3QixHQUF4QixDQUE0QixZQUE1QixDQUFOO0FBQUEsR0FGTixFQUdHLFNBSEgsQ0FHYSxXQUhiLEVBSUcsR0FKSCxDQUlPLG1CQUpQLEVBS0csRUFMSCxDQUtNLGdCQUxOLEVBTUcsRUFOSCxDQU1NO0FBQUEsV0FBTSxTQUFTLElBQVQsQ0FBYyxTQUFkLENBQXdCLE1BQXhCLENBQStCLFlBQS9CLENBQU47QUFBQSxHQU5OO0FBT0U7QUFQRixHQVFHLFNBUkgsQ0FRYSxZQUFNO0FBQ2YsZ0JBQVksSUFBWixDQUFpQixZQUFqQixFQURlLENBQ2lCO0FBQ2pDLEdBVkg7O0FBWUE7QUFDQSxjQUFZLElBQVosQ0FBaUIsWUFBakI7QUFDRDs7QUFFRDtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24nKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdC5hc3NpZ247IiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmRlZmluZS1wcm9wZXJ0eScpO1xudmFyICRPYmplY3QgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBkZXNjKXtcbiAgcmV0dXJuICRPYmplY3QuZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgZGVzYyk7XG59OyIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5rZXlzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3Qua2V5czsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYodHlwZW9mIGl0ICE9ICdmdW5jdGlvbicpdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYSBmdW5jdGlvbiEnKTtcbiAgcmV0dXJuIGl0O1xufTsiLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICBpZighaXNPYmplY3QoaXQpKXRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGFuIG9iamVjdCEnKTtcbiAgcmV0dXJuIGl0O1xufTsiLCIvLyBmYWxzZSAtPiBBcnJheSNpbmRleE9mXG4vLyB0cnVlICAtPiBBcnJheSNpbmNsdWRlc1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKVxuICAsIHRvTGVuZ3RoICA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpXG4gICwgdG9JbmRleCAgID0gcmVxdWlyZSgnLi9fdG8taW5kZXgnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oSVNfSU5DTFVERVMpe1xuICByZXR1cm4gZnVuY3Rpb24oJHRoaXMsIGVsLCBmcm9tSW5kZXgpe1xuICAgIHZhciBPICAgICAgPSB0b0lPYmplY3QoJHRoaXMpXG4gICAgICAsIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKVxuICAgICAgLCBpbmRleCAgPSB0b0luZGV4KGZyb21JbmRleCwgbGVuZ3RoKVxuICAgICAgLCB2YWx1ZTtcbiAgICAvLyBBcnJheSNpbmNsdWRlcyB1c2VzIFNhbWVWYWx1ZVplcm8gZXF1YWxpdHkgYWxnb3JpdGhtXG4gICAgaWYoSVNfSU5DTFVERVMgJiYgZWwgIT0gZWwpd2hpbGUobGVuZ3RoID4gaW5kZXgpe1xuICAgICAgdmFsdWUgPSBPW2luZGV4KytdO1xuICAgICAgaWYodmFsdWUgIT0gdmFsdWUpcmV0dXJuIHRydWU7XG4gICAgLy8gQXJyYXkjdG9JbmRleCBpZ25vcmVzIGhvbGVzLCBBcnJheSNpbmNsdWRlcyAtIG5vdFxuICAgIH0gZWxzZSBmb3IoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKWlmKElTX0lOQ0xVREVTIHx8IGluZGV4IGluIE8pe1xuICAgICAgaWYoT1tpbmRleF0gPT09IGVsKXJldHVybiBJU19JTkNMVURFUyB8fCBpbmRleCB8fCAwO1xuICAgIH0gcmV0dXJuICFJU19JTkNMVURFUyAmJiAtMTtcbiAgfTtcbn07IiwidmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChpdCkuc2xpY2UoOCwgLTEpO1xufTsiLCJ2YXIgY29yZSA9IG1vZHVsZS5leHBvcnRzID0ge3ZlcnNpb246ICcyLjQuMCd9O1xuaWYodHlwZW9mIF9fZSA9PSAnbnVtYmVyJylfX2UgPSBjb3JlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmIiwiLy8gb3B0aW9uYWwgLyBzaW1wbGUgY29udGV4dCBiaW5kaW5nXG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihmbiwgdGhhdCwgbGVuZ3RoKXtcbiAgYUZ1bmN0aW9uKGZuKTtcbiAgaWYodGhhdCA9PT0gdW5kZWZpbmVkKXJldHVybiBmbjtcbiAgc3dpdGNoKGxlbmd0aCl7XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24oYSl7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhKTtcbiAgICB9O1xuICAgIGNhc2UgMjogcmV0dXJuIGZ1bmN0aW9uKGEsIGIpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYik7XG4gICAgfTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbihhLCBiLCBjKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIsIGMpO1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uKC8qIC4uLmFyZ3MgKi8pe1xuICAgIHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICB9O1xufTsiLCIvLyA3LjIuMSBSZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGFyZ3VtZW50KVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKGl0ID09IHVuZGVmaW5lZCl0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjYWxsIG1ldGhvZCBvbiAgXCIgKyBpdCk7XG4gIHJldHVybiBpdDtcbn07IiwiLy8gVGhhbmsncyBJRTggZm9yIGhpcyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbigpe1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAnYScsIHtnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiA3OyB9fSkuYSAhPSA3O1xufSk7IiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0JylcbiAgLCBkb2N1bWVudCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLmRvY3VtZW50XG4gIC8vIGluIG9sZCBJRSB0eXBlb2YgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBpcyAnb2JqZWN0J1xuICAsIGlzID0gaXNPYmplY3QoZG9jdW1lbnQpICYmIGlzT2JqZWN0KGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpcyA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaXQpIDoge307XG59OyIsIi8vIElFIDgtIGRvbid0IGVudW0gYnVnIGtleXNcbm1vZHVsZS5leHBvcnRzID0gKFxuICAnY29uc3RydWN0b3IsaGFzT3duUHJvcGVydHksaXNQcm90b3R5cGVPZixwcm9wZXJ0eUlzRW51bWVyYWJsZSx0b0xvY2FsZVN0cmluZyx0b1N0cmluZyx2YWx1ZU9mJ1xuKS5zcGxpdCgnLCcpOyIsInZhciBnbG9iYWwgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIGNvcmUgICAgICA9IHJlcXVpcmUoJy4vX2NvcmUnKVxuICAsIGhpZGUgICAgICA9IHJlcXVpcmUoJy4vX2hpZGUnKVxuICAsIHJlZGVmaW5lICA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lJylcbiAgLCBjdHggICAgICAgPSByZXF1aXJlKCcuL19jdHgnKVxuICAsIFBST1RPVFlQRSA9ICdwcm90b3R5cGUnO1xuXG52YXIgJGV4cG9ydCA9IGZ1bmN0aW9uKHR5cGUsIG5hbWUsIHNvdXJjZSl7XG4gIHZhciBJU19GT1JDRUQgPSB0eXBlICYgJGV4cG9ydC5GXG4gICAgLCBJU19HTE9CQUwgPSB0eXBlICYgJGV4cG9ydC5HXG4gICAgLCBJU19TVEFUSUMgPSB0eXBlICYgJGV4cG9ydC5TXG4gICAgLCBJU19QUk9UTyAgPSB0eXBlICYgJGV4cG9ydC5QXG4gICAgLCBJU19CSU5EICAgPSB0eXBlICYgJGV4cG9ydC5CXG4gICAgLCB0YXJnZXQgICAgPSBJU19HTE9CQUwgPyBnbG9iYWwgOiBJU19TVEFUSUMgPyBnbG9iYWxbbmFtZV0gfHwgKGdsb2JhbFtuYW1lXSA9IHt9KSA6IChnbG9iYWxbbmFtZV0gfHwge30pW1BST1RPVFlQRV1cbiAgICAsIGV4cG9ydHMgICA9IElTX0dMT0JBTCA/IGNvcmUgOiBjb3JlW25hbWVdIHx8IChjb3JlW25hbWVdID0ge30pXG4gICAgLCBleHBQcm90byAgPSBleHBvcnRzW1BST1RPVFlQRV0gfHwgKGV4cG9ydHNbUFJPVE9UWVBFXSA9IHt9KVxuICAgICwga2V5LCBvd24sIG91dCwgZXhwO1xuICBpZihJU19HTE9CQUwpc291cmNlID0gbmFtZTtcbiAgZm9yKGtleSBpbiBzb3VyY2Upe1xuICAgIC8vIGNvbnRhaW5zIGluIG5hdGl2ZVxuICAgIG93biA9ICFJU19GT1JDRUQgJiYgdGFyZ2V0ICYmIHRhcmdldFtrZXldICE9PSB1bmRlZmluZWQ7XG4gICAgLy8gZXhwb3J0IG5hdGl2ZSBvciBwYXNzZWRcbiAgICBvdXQgPSAob3duID8gdGFyZ2V0IDogc291cmNlKVtrZXldO1xuICAgIC8vIGJpbmQgdGltZXJzIHRvIGdsb2JhbCBmb3IgY2FsbCBmcm9tIGV4cG9ydCBjb250ZXh0XG4gICAgZXhwID0gSVNfQklORCAmJiBvd24gPyBjdHgob3V0LCBnbG9iYWwpIDogSVNfUFJPVE8gJiYgdHlwZW9mIG91dCA9PSAnZnVuY3Rpb24nID8gY3R4KEZ1bmN0aW9uLmNhbGwsIG91dCkgOiBvdXQ7XG4gICAgLy8gZXh0ZW5kIGdsb2JhbFxuICAgIGlmKHRhcmdldClyZWRlZmluZSh0YXJnZXQsIGtleSwgb3V0LCB0eXBlICYgJGV4cG9ydC5VKTtcbiAgICAvLyBleHBvcnRcbiAgICBpZihleHBvcnRzW2tleV0gIT0gb3V0KWhpZGUoZXhwb3J0cywga2V5LCBleHApO1xuICAgIGlmKElTX1BST1RPICYmIGV4cFByb3RvW2tleV0gIT0gb3V0KWV4cFByb3RvW2tleV0gPSBvdXQ7XG4gIH1cbn07XG5nbG9iYWwuY29yZSA9IGNvcmU7XG4vLyB0eXBlIGJpdG1hcFxuJGV4cG9ydC5GID0gMTsgICAvLyBmb3JjZWRcbiRleHBvcnQuRyA9IDI7ICAgLy8gZ2xvYmFsXG4kZXhwb3J0LlMgPSA0OyAgIC8vIHN0YXRpY1xuJGV4cG9ydC5QID0gODsgICAvLyBwcm90b1xuJGV4cG9ydC5CID0gMTY7ICAvLyBiaW5kXG4kZXhwb3J0LlcgPSAzMjsgIC8vIHdyYXBcbiRleHBvcnQuVSA9IDY0OyAgLy8gc2FmZVxuJGV4cG9ydC5SID0gMTI4OyAvLyByZWFsIHByb3RvIG1ldGhvZCBmb3IgYGxpYnJhcnlgIFxubW9kdWxlLmV4cG9ydHMgPSAkZXhwb3J0OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZXhlYyl7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZXhlYygpO1xuICB9IGNhdGNoKGUpe1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59OyIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy84NiNpc3N1ZWNvbW1lbnQtMTE1NzU5MDI4XG52YXIgZ2xvYmFsID0gbW9kdWxlLmV4cG9ydHMgPSB0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnICYmIHdpbmRvdy5NYXRoID09IE1hdGhcbiAgPyB3aW5kb3cgOiB0eXBlb2Ygc2VsZiAhPSAndW5kZWZpbmVkJyAmJiBzZWxmLk1hdGggPT0gTWF0aCA/IHNlbGYgOiBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuaWYodHlwZW9mIF9fZyA9PSAnbnVtYmVyJylfX2cgPSBnbG9iYWw7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWYiLCJ2YXIgaGFzT3duUHJvcGVydHkgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQsIGtleSl7XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGl0LCBrZXkpO1xufTsiLCJ2YXIgZFAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpXG4gICwgY3JlYXRlRGVzYyA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IGZ1bmN0aW9uKG9iamVjdCwga2V5LCB2YWx1ZSl7XG4gIHJldHVybiBkUC5mKG9iamVjdCwga2V5LCBjcmVhdGVEZXNjKDEsIHZhbHVlKSk7XG59IDogZnVuY3Rpb24ob2JqZWN0LCBrZXksIHZhbHVlKXtcbiAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgcmV0dXJuIG9iamVjdDtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSAmJiAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbigpe1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKSgnZGl2JyksICdhJywge2dldDogZnVuY3Rpb24oKXsgcmV0dXJuIDc7IH19KS5hICE9IDc7XG59KTsiLCIvLyBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIGFuZCBub24tZW51bWVyYWJsZSBvbGQgVjggc3RyaW5nc1xudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QoJ3onKS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgwKSA/IE9iamVjdCA6IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGNvZihpdCkgPT0gJ1N0cmluZycgPyBpdC5zcGxpdCgnJykgOiBPYmplY3QoaXQpO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PT0gJ29iamVjdCcgPyBpdCAhPT0gbnVsbCA6IHR5cGVvZiBpdCA9PT0gJ2Z1bmN0aW9uJztcbn07IiwiJ3VzZSBzdHJpY3QnO1xuLy8gMTkuMS4yLjEgT2JqZWN0LmFzc2lnbih0YXJnZXQsIHNvdXJjZSwgLi4uKVxudmFyIGdldEtleXMgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKVxuICAsIGdPUFMgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcHMnKVxuICAsIHBJRSAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LXBpZScpXG4gICwgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKVxuICAsIElPYmplY3QgID0gcmVxdWlyZSgnLi9faW9iamVjdCcpXG4gICwgJGFzc2lnbiAgPSBPYmplY3QuYXNzaWduO1xuXG4vLyBzaG91bGQgd29yayB3aXRoIHN5bWJvbHMgYW5kIHNob3VsZCBoYXZlIGRldGVybWluaXN0aWMgcHJvcGVydHkgb3JkZXIgKFY4IGJ1Zylcbm1vZHVsZS5leHBvcnRzID0gISRhc3NpZ24gfHwgcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbigpe1xuICB2YXIgQSA9IHt9XG4gICAgLCBCID0ge31cbiAgICAsIFMgPSBTeW1ib2woKVxuICAgICwgSyA9ICdhYmNkZWZnaGlqa2xtbm9wcXJzdCc7XG4gIEFbU10gPSA3O1xuICBLLnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uKGspeyBCW2tdID0gazsgfSk7XG4gIHJldHVybiAkYXNzaWduKHt9LCBBKVtTXSAhPSA3IHx8IE9iamVjdC5rZXlzKCRhc3NpZ24oe30sIEIpKS5qb2luKCcnKSAhPSBLO1xufSkgPyBmdW5jdGlvbiBhc3NpZ24odGFyZ2V0LCBzb3VyY2UpeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gIHZhciBUICAgICA9IHRvT2JqZWN0KHRhcmdldClcbiAgICAsIGFMZW4gID0gYXJndW1lbnRzLmxlbmd0aFxuICAgICwgaW5kZXggPSAxXG4gICAgLCBnZXRTeW1ib2xzID0gZ09QUy5mXG4gICAgLCBpc0VudW0gICAgID0gcElFLmY7XG4gIHdoaWxlKGFMZW4gPiBpbmRleCl7XG4gICAgdmFyIFMgICAgICA9IElPYmplY3QoYXJndW1lbnRzW2luZGV4KytdKVxuICAgICAgLCBrZXlzICAgPSBnZXRTeW1ib2xzID8gZ2V0S2V5cyhTKS5jb25jYXQoZ2V0U3ltYm9scyhTKSkgOiBnZXRLZXlzKFMpXG4gICAgICAsIGxlbmd0aCA9IGtleXMubGVuZ3RoXG4gICAgICAsIGogICAgICA9IDBcbiAgICAgICwga2V5O1xuICAgIHdoaWxlKGxlbmd0aCA+IGopaWYoaXNFbnVtLmNhbGwoUywga2V5ID0ga2V5c1tqKytdKSlUW2tleV0gPSBTW2tleV07XG4gIH0gcmV0dXJuIFQ7XG59IDogJGFzc2lnbjsiLCJ2YXIgYW5PYmplY3QgICAgICAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi9faWU4LWRvbS1kZWZpbmUnKVxuICAsIHRvUHJpbWl0aXZlICAgID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJylcbiAgLCBkUCAgICAgICAgICAgICA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcblxuZXhwb3J0cy5mID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpe1xuICBhbk9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBhbk9iamVjdChBdHRyaWJ1dGVzKTtcbiAgaWYoSUU4X0RPTV9ERUZJTkUpdHJ5IHtcbiAgICByZXR1cm4gZFAoTywgUCwgQXR0cmlidXRlcyk7XG4gIH0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cbiAgaWYoJ2dldCcgaW4gQXR0cmlidXRlcyB8fCAnc2V0JyBpbiBBdHRyaWJ1dGVzKXRocm93IFR5cGVFcnJvcignQWNjZXNzb3JzIG5vdCBzdXBwb3J0ZWQhJyk7XG4gIGlmKCd2YWx1ZScgaW4gQXR0cmlidXRlcylPW1BdID0gQXR0cmlidXRlcy52YWx1ZTtcbiAgcmV0dXJuIE87XG59OyIsImV4cG9ydHMuZiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7IiwidmFyIGhhcyAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hhcycpXG4gICwgdG9JT2JqZWN0ICAgID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpXG4gICwgYXJyYXlJbmRleE9mID0gcmVxdWlyZSgnLi9fYXJyYXktaW5jbHVkZXMnKShmYWxzZSlcbiAgLCBJRV9QUk9UTyAgICAgPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqZWN0LCBuYW1lcyl7XG4gIHZhciBPICAgICAgPSB0b0lPYmplY3Qob2JqZWN0KVxuICAgICwgaSAgICAgID0gMFxuICAgICwgcmVzdWx0ID0gW11cbiAgICAsIGtleTtcbiAgZm9yKGtleSBpbiBPKWlmKGtleSAhPSBJRV9QUk9UTyloYXMoTywga2V5KSAmJiByZXN1bHQucHVzaChrZXkpO1xuICAvLyBEb24ndCBlbnVtIGJ1ZyAmIGhpZGRlbiBrZXlzXG4gIHdoaWxlKG5hbWVzLmxlbmd0aCA+IGkpaWYoaGFzKE8sIGtleSA9IG5hbWVzW2krK10pKXtcbiAgICB+YXJyYXlJbmRleE9mKHJlc3VsdCwga2V5KSB8fCByZXN1bHQucHVzaChrZXkpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59OyIsIi8vIDE5LjEuMi4xNCAvIDE1LjIuMy4xNCBPYmplY3Qua2V5cyhPKVxudmFyICRrZXlzICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMtaW50ZXJuYWwnKVxuICAsIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi9fZW51bS1idWcta2V5cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5rZXlzIHx8IGZ1bmN0aW9uIGtleXMoTyl7XG4gIHJldHVybiAka2V5cyhPLCBlbnVtQnVnS2V5cyk7XG59OyIsImV4cG9ydHMuZiA9IHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlOyIsIi8vIG1vc3QgT2JqZWN0IG1ldGhvZHMgYnkgRVM2IHNob3VsZCBhY2NlcHQgcHJpbWl0aXZlc1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIGNvcmUgICAgPSByZXF1aXJlKCcuL19jb3JlJylcbiAgLCBmYWlscyAgID0gcmVxdWlyZSgnLi9fZmFpbHMnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oS0VZLCBleGVjKXtcbiAgdmFyIGZuICA9IChjb3JlLk9iamVjdCB8fCB7fSlbS0VZXSB8fCBPYmplY3RbS0VZXVxuICAgICwgZXhwID0ge307XG4gIGV4cFtLRVldID0gZXhlYyhmbik7XG4gICRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogZmFpbHMoZnVuY3Rpb24oKXsgZm4oMSk7IH0pLCAnT2JqZWN0JywgZXhwKTtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihiaXRtYXAsIHZhbHVlKXtcbiAgcmV0dXJuIHtcbiAgICBlbnVtZXJhYmxlICA6ICEoYml0bWFwICYgMSksXG4gICAgY29uZmlndXJhYmxlOiAhKGJpdG1hcCAmIDIpLFxuICAgIHdyaXRhYmxlICAgIDogIShiaXRtYXAgJiA0KSxcbiAgICB2YWx1ZSAgICAgICA6IHZhbHVlXG4gIH07XG59OyIsInZhciBnbG9iYWwgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIGhpZGUgICAgICA9IHJlcXVpcmUoJy4vX2hpZGUnKVxuICAsIGhhcyAgICAgICA9IHJlcXVpcmUoJy4vX2hhcycpXG4gICwgU1JDICAgICAgID0gcmVxdWlyZSgnLi9fdWlkJykoJ3NyYycpXG4gICwgVE9fU1RSSU5HID0gJ3RvU3RyaW5nJ1xuICAsICR0b1N0cmluZyA9IEZ1bmN0aW9uW1RPX1NUUklOR11cbiAgLCBUUEwgICAgICAgPSAoJycgKyAkdG9TdHJpbmcpLnNwbGl0KFRPX1NUUklORyk7XG5cbnJlcXVpcmUoJy4vX2NvcmUnKS5pbnNwZWN0U291cmNlID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gJHRvU3RyaW5nLmNhbGwoaXQpO1xufTtcblxuKG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oTywga2V5LCB2YWwsIHNhZmUpe1xuICB2YXIgaXNGdW5jdGlvbiA9IHR5cGVvZiB2YWwgPT0gJ2Z1bmN0aW9uJztcbiAgaWYoaXNGdW5jdGlvbiloYXModmFsLCAnbmFtZScpIHx8IGhpZGUodmFsLCAnbmFtZScsIGtleSk7XG4gIGlmKE9ba2V5XSA9PT0gdmFsKXJldHVybjtcbiAgaWYoaXNGdW5jdGlvbiloYXModmFsLCBTUkMpIHx8IGhpZGUodmFsLCBTUkMsIE9ba2V5XSA/ICcnICsgT1trZXldIDogVFBMLmpvaW4oU3RyaW5nKGtleSkpKTtcbiAgaWYoTyA9PT0gZ2xvYmFsKXtcbiAgICBPW2tleV0gPSB2YWw7XG4gIH0gZWxzZSB7XG4gICAgaWYoIXNhZmUpe1xuICAgICAgZGVsZXRlIE9ba2V5XTtcbiAgICAgIGhpZGUoTywga2V5LCB2YWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZihPW2tleV0pT1trZXldID0gdmFsO1xuICAgICAgZWxzZSBoaWRlKE8sIGtleSwgdmFsKTtcbiAgICB9XG4gIH1cbi8vIGFkZCBmYWtlIEZ1bmN0aW9uI3RvU3RyaW5nIGZvciBjb3JyZWN0IHdvcmsgd3JhcHBlZCBtZXRob2RzIC8gY29uc3RydWN0b3JzIHdpdGggbWV0aG9kcyBsaWtlIExvRGFzaCBpc05hdGl2ZVxufSkoRnVuY3Rpb24ucHJvdG90eXBlLCBUT19TVFJJTkcsIGZ1bmN0aW9uIHRvU3RyaW5nKCl7XG4gIHJldHVybiB0eXBlb2YgdGhpcyA9PSAnZnVuY3Rpb24nICYmIHRoaXNbU1JDXSB8fCAkdG9TdHJpbmcuY2FsbCh0aGlzKTtcbn0pOyIsInZhciBzaGFyZWQgPSByZXF1aXJlKCcuL19zaGFyZWQnKSgna2V5cycpXG4gICwgdWlkICAgID0gcmVxdWlyZSgnLi9fdWlkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGtleSl7XG4gIHJldHVybiBzaGFyZWRba2V5XSB8fCAoc2hhcmVkW2tleV0gPSB1aWQoa2V5KSk7XG59OyIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIFNIQVJFRCA9ICdfX2NvcmUtanNfc2hhcmVkX18nXG4gICwgc3RvcmUgID0gZ2xvYmFsW1NIQVJFRF0gfHwgKGdsb2JhbFtTSEFSRURdID0ge30pO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xuICByZXR1cm4gc3RvcmVba2V5XSB8fCAoc3RvcmVba2V5XSA9IHt9KTtcbn07IiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKVxuICAsIG1heCAgICAgICA9IE1hdGgubWF4XG4gICwgbWluICAgICAgID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGluZGV4LCBsZW5ndGgpe1xuICBpbmRleCA9IHRvSW50ZWdlcihpbmRleCk7XG4gIHJldHVybiBpbmRleCA8IDAgPyBtYXgoaW5kZXggKyBsZW5ndGgsIDApIDogbWluKGluZGV4LCBsZW5ndGgpO1xufTsiLCIvLyA3LjEuNCBUb0ludGVnZXJcbnZhciBjZWlsICA9IE1hdGguY2VpbFxuICAsIGZsb29yID0gTWF0aC5mbG9vcjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXNOYU4oaXQgPSAraXQpID8gMCA6IChpdCA+IDAgPyBmbG9vciA6IGNlaWwpKGl0KTtcbn07IiwiLy8gdG8gaW5kZXhlZCBvYmplY3QsIHRvT2JqZWN0IHdpdGggZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBzdHJpbmdzXG52YXIgSU9iamVjdCA9IHJlcXVpcmUoJy4vX2lvYmplY3QnKVxuICAsIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIElPYmplY3QoZGVmaW5lZChpdCkpO1xufTsiLCIvLyA3LjEuMTUgVG9MZW5ndGhcbnZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJylcbiAgLCBtaW4gICAgICAgPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXQgPiAwID8gbWluKHRvSW50ZWdlcihpdCksIDB4MWZmZmZmZmZmZmZmZmYpIDogMDsgLy8gcG93KDIsIDUzKSAtIDEgPT0gOTAwNzE5OTI1NDc0MDk5MVxufTsiLCIvLyA3LjEuMTMgVG9PYmplY3QoYXJndW1lbnQpXG52YXIgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07IiwiLy8gNy4xLjEgVG9QcmltaXRpdmUoaW5wdXQgWywgUHJlZmVycmVkVHlwZV0pXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbi8vIGluc3RlYWQgb2YgdGhlIEVTNiBzcGVjIHZlcnNpb24sIHdlIGRpZG4ndCBpbXBsZW1lbnQgQEB0b1ByaW1pdGl2ZSBjYXNlXG4vLyBhbmQgdGhlIHNlY29uZCBhcmd1bWVudCAtIGZsYWcgLSBwcmVmZXJyZWQgdHlwZSBpcyBhIHN0cmluZ1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwgUyl7XG4gIGlmKCFpc09iamVjdChpdCkpcmV0dXJuIGl0O1xuICB2YXIgZm4sIHZhbDtcbiAgaWYoUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSlyZXR1cm4gdmFsO1xuICBpZih0eXBlb2YgKGZuID0gaXQudmFsdWVPZikgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKXJldHVybiB2YWw7XG4gIGlmKCFTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKXJldHVybiB2YWw7XG4gIHRocm93IFR5cGVFcnJvcihcIkNhbid0IGNvbnZlcnQgb2JqZWN0IHRvIHByaW1pdGl2ZSB2YWx1ZVwiKTtcbn07IiwidmFyIGlkID0gMFxuICAsIHB4ID0gTWF0aC5yYW5kb20oKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oa2V5KXtcbiAgcmV0dXJuICdTeW1ib2woJy5jb25jYXQoa2V5ID09PSB1bmRlZmluZWQgPyAnJyA6IGtleSwgJylfJywgKCsraWQgKyBweCkudG9TdHJpbmcoMzYpKTtcbn07IiwiLy8gMTkuMS4zLjEgT2JqZWN0LmFzc2lnbih0YXJnZXQsIHNvdXJjZSlcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GLCAnT2JqZWN0Jywge2Fzc2lnbjogcmVxdWlyZSgnLi9fb2JqZWN0LWFzc2lnbicpfSk7IiwidmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbi8vIDE5LjEuMi40IC8gMTUuMi4zLjYgT2JqZWN0LmRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFyZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpLCAnT2JqZWN0Jywge2RlZmluZVByb3BlcnR5OiByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mfSk7IiwiLy8gMTkuMS4yLjE0IE9iamVjdC5rZXlzKE8pXG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKVxuICAsICRrZXlzICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKTtcblxucmVxdWlyZSgnLi9fb2JqZWN0LXNhcCcpKCdrZXlzJywgZnVuY3Rpb24oKXtcbiAgcmV0dXJuIGZ1bmN0aW9uIGtleXMoaXQpe1xuICAgIHJldHVybiAka2V5cyh0b09iamVjdChpdCkpO1xuICB9O1xufSk7IiwiLyohIGxvYWRDU1M6IGxvYWQgYSBDU1MgZmlsZSBhc3luY2hyb25vdXNseS4gW2NdMjAxNiBAc2NvdHRqZWhsLCBGaWxhbWVudCBHcm91cCwgSW5jLiBMaWNlbnNlZCBNSVQgKi9cbihmdW5jdGlvbih3KXtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cdC8qIGV4cG9ydGVkIGxvYWRDU1MgKi9cblx0dmFyIGxvYWRDU1MgPSBmdW5jdGlvbiggaHJlZiwgYmVmb3JlLCBtZWRpYSApe1xuXHRcdC8vIEFyZ3VtZW50cyBleHBsYWluZWQ6XG5cdFx0Ly8gYGhyZWZgIFtSRVFVSVJFRF0gaXMgdGhlIFVSTCBmb3IgeW91ciBDU1MgZmlsZS5cblx0XHQvLyBgYmVmb3JlYCBbT1BUSU9OQUxdIGlzIHRoZSBlbGVtZW50IHRoZSBzY3JpcHQgc2hvdWxkIHVzZSBhcyBhIHJlZmVyZW5jZSBmb3IgaW5qZWN0aW5nIG91ciBzdHlsZXNoZWV0IDxsaW5rPiBiZWZvcmVcblx0XHRcdC8vIEJ5IGRlZmF1bHQsIGxvYWRDU1MgYXR0ZW1wdHMgdG8gaW5qZWN0IHRoZSBsaW5rIGFmdGVyIHRoZSBsYXN0IHN0eWxlc2hlZXQgb3Igc2NyaXB0IGluIHRoZSBET00uIEhvd2V2ZXIsIHlvdSBtaWdodCBkZXNpcmUgYSBtb3JlIHNwZWNpZmljIGxvY2F0aW9uIGluIHlvdXIgZG9jdW1lbnQuXG5cdFx0Ly8gYG1lZGlhYCBbT1BUSU9OQUxdIGlzIHRoZSBtZWRpYSB0eXBlIG9yIHF1ZXJ5IG9mIHRoZSBzdHlsZXNoZWV0LiBCeSBkZWZhdWx0IGl0IHdpbGwgYmUgJ2FsbCdcblx0XHR2YXIgZG9jID0gdy5kb2N1bWVudDtcblx0XHR2YXIgc3MgPSBkb2MuY3JlYXRlRWxlbWVudCggXCJsaW5rXCIgKTtcblx0XHR2YXIgcmVmO1xuXHRcdGlmKCBiZWZvcmUgKXtcblx0XHRcdHJlZiA9IGJlZm9yZTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHR2YXIgcmVmcyA9ICggZG9jLmJvZHkgfHwgZG9jLmdldEVsZW1lbnRzQnlUYWdOYW1lKCBcImhlYWRcIiApWyAwIF0gKS5jaGlsZE5vZGVzO1xuXHRcdFx0cmVmID0gcmVmc1sgcmVmcy5sZW5ndGggLSAxXTtcblx0XHR9XG5cblx0XHR2YXIgc2hlZXRzID0gZG9jLnN0eWxlU2hlZXRzO1xuXHRcdHNzLnJlbCA9IFwic3R5bGVzaGVldFwiO1xuXHRcdHNzLmhyZWYgPSBocmVmO1xuXHRcdC8vIHRlbXBvcmFyaWx5IHNldCBtZWRpYSB0byBzb21ldGhpbmcgaW5hcHBsaWNhYmxlIHRvIGVuc3VyZSBpdCdsbCBmZXRjaCB3aXRob3V0IGJsb2NraW5nIHJlbmRlclxuXHRcdHNzLm1lZGlhID0gXCJvbmx5IHhcIjtcblxuXHRcdC8vIHdhaXQgdW50aWwgYm9keSBpcyBkZWZpbmVkIGJlZm9yZSBpbmplY3RpbmcgbGluay4gVGhpcyBlbnN1cmVzIGEgbm9uLWJsb2NraW5nIGxvYWQgaW4gSUUxMS5cblx0XHRmdW5jdGlvbiByZWFkeSggY2IgKXtcblx0XHRcdGlmKCBkb2MuYm9keSApe1xuXHRcdFx0XHRyZXR1cm4gY2IoKTtcblx0XHRcdH1cblx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0XHRcdFx0cmVhZHkoIGNiICk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0Ly8gSW5qZWN0IGxpbmtcblx0XHRcdC8vIE5vdGU6IHRoZSB0ZXJuYXJ5IHByZXNlcnZlcyB0aGUgZXhpc3RpbmcgYmVoYXZpb3Igb2YgXCJiZWZvcmVcIiBhcmd1bWVudCwgYnV0IHdlIGNvdWxkIGNob29zZSB0byBjaGFuZ2UgdGhlIGFyZ3VtZW50IHRvIFwiYWZ0ZXJcIiBpbiBhIGxhdGVyIHJlbGVhc2UgYW5kIHN0YW5kYXJkaXplIG9uIHJlZi5uZXh0U2libGluZyBmb3IgYWxsIHJlZnNcblx0XHRcdC8vIE5vdGU6IGBpbnNlcnRCZWZvcmVgIGlzIHVzZWQgaW5zdGVhZCBvZiBgYXBwZW5kQ2hpbGRgLCBmb3Igc2FmZXR5IHJlOiBodHRwOi8vd3d3LnBhdWxpcmlzaC5jb20vMjAxMS9zdXJlZmlyZS1kb20tZWxlbWVudC1pbnNlcnRpb24vXG5cdFx0cmVhZHkoIGZ1bmN0aW9uKCl7XG5cdFx0XHRyZWYucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoIHNzLCAoIGJlZm9yZSA/IHJlZiA6IHJlZi5uZXh0U2libGluZyApICk7XG5cdFx0fSk7XG5cdFx0Ly8gQSBtZXRob2QgKGV4cG9zZWQgb24gcmV0dXJuIG9iamVjdCBmb3IgZXh0ZXJuYWwgdXNlKSB0aGF0IG1pbWljcyBvbmxvYWQgYnkgcG9sbGluZyB1bnRpbCBkb2N1bWVudC5zdHlsZVNoZWV0cyB1bnRpbCBpdCBpbmNsdWRlcyB0aGUgbmV3IHNoZWV0LlxuXHRcdHZhciBvbmxvYWRjc3NkZWZpbmVkID0gZnVuY3Rpb24oIGNiICl7XG5cdFx0XHR2YXIgcmVzb2x2ZWRIcmVmID0gc3MuaHJlZjtcblx0XHRcdHZhciBpID0gc2hlZXRzLmxlbmd0aDtcblx0XHRcdHdoaWxlKCBpLS0gKXtcblx0XHRcdFx0aWYoIHNoZWV0c1sgaSBdLmhyZWYgPT09IHJlc29sdmVkSHJlZiApe1xuXHRcdFx0XHRcdHJldHVybiBjYigpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRvbmxvYWRjc3NkZWZpbmVkKCBjYiApO1xuXHRcdFx0fSk7XG5cdFx0fTtcblxuXHRcdGZ1bmN0aW9uIGxvYWRDQigpe1xuXHRcdFx0aWYoIHNzLmFkZEV2ZW50TGlzdGVuZXIgKXtcblx0XHRcdFx0c3MucmVtb3ZlRXZlbnRMaXN0ZW5lciggXCJsb2FkXCIsIGxvYWRDQiApO1xuXHRcdFx0fVxuXHRcdFx0c3MubWVkaWEgPSBtZWRpYSB8fCBcImFsbFwiO1xuXHRcdH1cblxuXHRcdC8vIG9uY2UgbG9hZGVkLCBzZXQgbGluaydzIG1lZGlhIGJhY2sgdG8gYGFsbGAgc28gdGhhdCB0aGUgc3R5bGVzaGVldCBhcHBsaWVzIG9uY2UgaXQgbG9hZHNcblx0XHRpZiggc3MuYWRkRXZlbnRMaXN0ZW5lciApe1xuXHRcdFx0c3MuYWRkRXZlbnRMaXN0ZW5lciggXCJsb2FkXCIsIGxvYWRDQik7XG5cdFx0fVxuXHRcdHNzLm9ubG9hZGNzc2RlZmluZWQgPSBvbmxvYWRjc3NkZWZpbmVkO1xuXHRcdG9ubG9hZGNzc2RlZmluZWQoIGxvYWRDQiApO1xuXHRcdHJldHVybiBzcztcblx0fTtcblx0Ly8gY29tbW9uanNcblx0aWYoIHR5cGVvZiBleHBvcnRzICE9PSBcInVuZGVmaW5lZFwiICl7XG5cdFx0ZXhwb3J0cy5sb2FkQ1NTID0gbG9hZENTUztcblx0fVxuXHRlbHNlIHtcblx0XHR3LmxvYWRDU1MgPSBsb2FkQ1NTO1xuXHR9XG59KCB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdGhpcyApKTtcbiIsImltcG9ydCB7IFN1YnNjcmliZXIgfSBmcm9tICcuL1N1YnNjcmliZXInO1xuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbmV4cG9ydCBjbGFzcyBJbm5lclN1YnNjcmliZXIgZXh0ZW5kcyBTdWJzY3JpYmVyIHtcbiAgICBjb25zdHJ1Y3RvcihwYXJlbnQsIG91dGVyVmFsdWUsIG91dGVySW5kZXgpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG4gICAgICAgIHRoaXMub3V0ZXJWYWx1ZSA9IG91dGVyVmFsdWU7XG4gICAgICAgIHRoaXMub3V0ZXJJbmRleCA9IG91dGVySW5kZXg7XG4gICAgICAgIHRoaXMuaW5kZXggPSAwO1xuICAgIH1cbiAgICBfbmV4dCh2YWx1ZSkge1xuICAgICAgICB0aGlzLnBhcmVudC5ub3RpZnlOZXh0KHRoaXMub3V0ZXJWYWx1ZSwgdmFsdWUsIHRoaXMub3V0ZXJJbmRleCwgdGhpcy5pbmRleCsrLCB0aGlzKTtcbiAgICB9XG4gICAgX2Vycm9yKGVycm9yKSB7XG4gICAgICAgIHRoaXMucGFyZW50Lm5vdGlmeUVycm9yKGVycm9yLCB0aGlzKTtcbiAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgICBfY29tcGxldGUoKSB7XG4gICAgICAgIHRoaXMucGFyZW50Lm5vdGlmeUNvbXBsZXRlKHRoaXMpO1xuICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9SW5uZXJTdWJzY3JpYmVyLmpzLm1hcCIsImltcG9ydCB7IHJvb3QgfSBmcm9tICcuL3V0aWwvcm9vdCc7XG5pbXBvcnQgeyB0b1N1YnNjcmliZXIgfSBmcm9tICcuL3V0aWwvdG9TdWJzY3JpYmVyJztcbmltcG9ydCB7ICQkb2JzZXJ2YWJsZSB9IGZyb20gJy4vc3ltYm9sL29ic2VydmFibGUnO1xuLyoqXG4gKiBBIHJlcHJlc2VudGF0aW9uIG9mIGFueSBzZXQgb2YgdmFsdWVzIG92ZXIgYW55IGFtb3VudCBvZiB0aW1lLiBUaGlzIHRoZSBtb3N0IGJhc2ljIGJ1aWxkaW5nIGJsb2NrXG4gKiBvZiBSeEpTLlxuICpcbiAqIEBjbGFzcyBPYnNlcnZhYmxlPFQ+XG4gKi9cbmV4cG9ydCBjbGFzcyBPYnNlcnZhYmxlIHtcbiAgICAvKipcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBzdWJzY3JpYmUgdGhlIGZ1bmN0aW9uIHRoYXQgaXMgIGNhbGxlZCB3aGVuIHRoZSBPYnNlcnZhYmxlIGlzXG4gICAgICogaW5pdGlhbGx5IHN1YnNjcmliZWQgdG8uIFRoaXMgZnVuY3Rpb24gaXMgZ2l2ZW4gYSBTdWJzY3JpYmVyLCB0byB3aGljaCBuZXcgdmFsdWVzXG4gICAgICogY2FuIGJlIGBuZXh0YGVkLCBvciBhbiBgZXJyb3JgIG1ldGhvZCBjYW4gYmUgY2FsbGVkIHRvIHJhaXNlIGFuIGVycm9yLCBvclxuICAgICAqIGBjb21wbGV0ZWAgY2FuIGJlIGNhbGxlZCB0byBub3RpZnkgb2YgYSBzdWNjZXNzZnVsIGNvbXBsZXRpb24uXG4gICAgICovXG4gICAgY29uc3RydWN0b3Ioc3Vic2NyaWJlKSB7XG4gICAgICAgIHRoaXMuX2lzU2NhbGFyID0gZmFsc2U7XG4gICAgICAgIGlmIChzdWJzY3JpYmUpIHtcbiAgICAgICAgICAgIHRoaXMuX3N1YnNjcmliZSA9IHN1YnNjcmliZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IE9ic2VydmFibGUsIHdpdGggdGhpcyBPYnNlcnZhYmxlIGFzIHRoZSBzb3VyY2UsIGFuZCB0aGUgcGFzc2VkXG4gICAgICogb3BlcmF0b3IgZGVmaW5lZCBhcyB0aGUgbmV3IG9ic2VydmFibGUncyBvcGVyYXRvci5cbiAgICAgKiBAbWV0aG9kIGxpZnRcbiAgICAgKiBAcGFyYW0ge09wZXJhdG9yfSBvcGVyYXRvciB0aGUgb3BlcmF0b3IgZGVmaW5pbmcgdGhlIG9wZXJhdGlvbiB0byB0YWtlIG9uIHRoZSBvYnNlcnZhYmxlXG4gICAgICogQHJldHVybiB7T2JzZXJ2YWJsZX0gYSBuZXcgb2JzZXJ2YWJsZSB3aXRoIHRoZSBPcGVyYXRvciBhcHBsaWVkXG4gICAgICovXG4gICAgbGlmdChvcGVyYXRvcikge1xuICAgICAgICBjb25zdCBvYnNlcnZhYmxlID0gbmV3IE9ic2VydmFibGUoKTtcbiAgICAgICAgb2JzZXJ2YWJsZS5zb3VyY2UgPSB0aGlzO1xuICAgICAgICBvYnNlcnZhYmxlLm9wZXJhdG9yID0gb3BlcmF0b3I7XG4gICAgICAgIHJldHVybiBvYnNlcnZhYmxlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZWdpc3RlcnMgaGFuZGxlcnMgZm9yIGhhbmRsaW5nIGVtaXR0ZWQgdmFsdWVzLCBlcnJvciBhbmQgY29tcGxldGlvbnMgZnJvbSB0aGUgb2JzZXJ2YWJsZSwgYW5kXG4gICAgICogIGV4ZWN1dGVzIHRoZSBvYnNlcnZhYmxlJ3Mgc3Vic2NyaWJlciBmdW5jdGlvbiwgd2hpY2ggd2lsbCB0YWtlIGFjdGlvbiB0byBzZXQgdXAgdGhlIHVuZGVybHlpbmcgZGF0YSBzdHJlYW1cbiAgICAgKiBAbWV0aG9kIHN1YnNjcmliZVxuICAgICAqIEBwYXJhbSB7UGFydGlhbE9ic2VydmVyfEZ1bmN0aW9ufSBvYnNlcnZlck9yTmV4dCAob3B0aW9uYWwpIGVpdGhlciBhbiBvYnNlcnZlciBkZWZpbmluZyBhbGwgZnVuY3Rpb25zIHRvIGJlIGNhbGxlZCxcbiAgICAgKiAgb3IgdGhlIGZpcnN0IG9mIHRocmVlIHBvc3NpYmxlIGhhbmRsZXJzLCB3aGljaCBpcyB0aGUgaGFuZGxlciBmb3IgZWFjaCB2YWx1ZSBlbWl0dGVkIGZyb20gdGhlIG9ic2VydmFibGUuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZXJyb3IgKG9wdGlvbmFsKSBhIGhhbmRsZXIgZm9yIGEgdGVybWluYWwgZXZlbnQgcmVzdWx0aW5nIGZyb20gYW4gZXJyb3IuIElmIG5vIGVycm9yIGhhbmRsZXIgaXMgcHJvdmlkZWQsXG4gICAgICogIHRoZSBlcnJvciB3aWxsIGJlIHRocm93biBhcyB1bmhhbmRsZWRcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjb21wbGV0ZSAob3B0aW9uYWwpIGEgaGFuZGxlciBmb3IgYSB0ZXJtaW5hbCBldmVudCByZXN1bHRpbmcgZnJvbSBzdWNjZXNzZnVsIGNvbXBsZXRpb24uXG4gICAgICogQHJldHVybiB7SVN1YnNjcmlwdGlvbn0gYSBzdWJzY3JpcHRpb24gcmVmZXJlbmNlIHRvIHRoZSByZWdpc3RlcmVkIGhhbmRsZXJzXG4gICAgICovXG4gICAgc3Vic2NyaWJlKG9ic2VydmVyT3JOZXh0LCBlcnJvciwgY29tcGxldGUpIHtcbiAgICAgICAgY29uc3QgeyBvcGVyYXRvciB9ID0gdGhpcztcbiAgICAgICAgY29uc3Qgc2luayA9IHRvU3Vic2NyaWJlcihvYnNlcnZlck9yTmV4dCwgZXJyb3IsIGNvbXBsZXRlKTtcbiAgICAgICAgaWYgKG9wZXJhdG9yKSB7XG4gICAgICAgICAgICBvcGVyYXRvci5jYWxsKHNpbmssIHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc2luay5hZGQodGhpcy5fc3Vic2NyaWJlKHNpbmspKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2luay5zeW5jRXJyb3JUaHJvd2FibGUpIHtcbiAgICAgICAgICAgIHNpbmsuc3luY0Vycm9yVGhyb3dhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAoc2luay5zeW5jRXJyb3JUaHJvd24pIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBzaW5rLnN5bmNFcnJvclZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzaW5rO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIGZvckVhY2hcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBuZXh0IGEgaGFuZGxlciBmb3IgZWFjaCB2YWx1ZSBlbWl0dGVkIGJ5IHRoZSBvYnNlcnZhYmxlXG4gICAgICogQHBhcmFtIHtQcm9taXNlQ29uc3RydWN0b3J9IFtQcm9taXNlQ3Rvcl0gYSBjb25zdHJ1Y3RvciBmdW5jdGlvbiB1c2VkIHRvIGluc3RhbnRpYXRlIHRoZSBQcm9taXNlXG4gICAgICogQHJldHVybiB7UHJvbWlzZX0gYSBwcm9taXNlIHRoYXQgZWl0aGVyIHJlc29sdmVzIG9uIG9ic2VydmFibGUgY29tcGxldGlvbiBvclxuICAgICAqICByZWplY3RzIHdpdGggdGhlIGhhbmRsZWQgZXJyb3JcbiAgICAgKi9cbiAgICBmb3JFYWNoKG5leHQsIFByb21pc2VDdG9yKSB7XG4gICAgICAgIGlmICghUHJvbWlzZUN0b3IpIHtcbiAgICAgICAgICAgIGlmIChyb290LlJ4ICYmIHJvb3QuUnguY29uZmlnICYmIHJvb3QuUnguY29uZmlnLlByb21pc2UpIHtcbiAgICAgICAgICAgICAgICBQcm9taXNlQ3RvciA9IHJvb3QuUnguY29uZmlnLlByb21pc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChyb290LlByb21pc2UpIHtcbiAgICAgICAgICAgICAgICBQcm9taXNlQ3RvciA9IHJvb3QuUHJvbWlzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIVByb21pc2VDdG9yKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIFByb21pc2UgaW1wbCBmb3VuZCcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZUN0b3IoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc3Vic2NyaXB0aW9uID0gdGhpcy5zdWJzY3JpYmUoKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAvLyBpZiB0aGVyZSBpcyBhIHN1YnNjcmlwdGlvbiwgdGhlbiB3ZSBjYW4gc3VybWlzZVxuICAgICAgICAgICAgICAgICAgICAvLyB0aGUgbmV4dCBoYW5kbGluZyBpcyBhc3luY2hyb25vdXMuIEFueSBlcnJvcnMgdGhyb3duXG4gICAgICAgICAgICAgICAgICAgIC8vIG5lZWQgdG8gYmUgcmVqZWN0ZWQgZXhwbGljaXRseSBhbmQgdW5zdWJzY3JpYmUgbXVzdCBiZVxuICAgICAgICAgICAgICAgICAgICAvLyBjYWxsZWQgbWFudWFsbHlcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHQodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIHRoZXJlIGlzIE5PIHN1YnNjcmlwdGlvbiwgdGhlbiB3ZSdyZSBnZXR0aW5nIGEgbmV4dGVkXG4gICAgICAgICAgICAgICAgICAgIC8vIHZhbHVlIHN5bmNocm9ub3VzbHkgZHVyaW5nIHN1YnNjcmlwdGlvbi4gV2UgY2FuIGp1c3QgY2FsbCBpdC5cbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgaXQgZXJyb3JzLCBPYnNlcnZhYmxlJ3MgYHN1YnNjcmliZWAgd2lsbCBlbnN1cmUgdGhlXG4gICAgICAgICAgICAgICAgICAgIC8vIHVuc3Vic2NyaXB0aW9uIGxvZ2ljIGlzIGNhbGxlZCwgdGhlbiBzeW5jaHJvbm91c2x5IHJldGhyb3cgdGhlIGVycm9yLlxuICAgICAgICAgICAgICAgICAgICAvLyBBZnRlciB0aGF0LCBQcm9taXNlIHdpbGwgdHJhcCB0aGUgZXJyb3IgYW5kIHNlbmQgaXRcbiAgICAgICAgICAgICAgICAgICAgLy8gZG93biB0aGUgcmVqZWN0aW9uIHBhdGguXG4gICAgICAgICAgICAgICAgICAgIG5leHQodmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIHJlamVjdCwgcmVzb2x2ZSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBfc3Vic2NyaWJlKHN1YnNjcmliZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc291cmNlLnN1YnNjcmliZShzdWJzY3JpYmVyKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQW4gaW50ZXJvcCBwb2ludCBkZWZpbmVkIGJ5IHRoZSBlczctb2JzZXJ2YWJsZSBzcGVjIGh0dHBzOi8vZ2l0aHViLmNvbS96ZW5wYXJzaW5nL2VzLW9ic2VydmFibGVcbiAgICAgKiBAbWV0aG9kIFN5bWJvbC5vYnNlcnZhYmxlXG4gICAgICogQHJldHVybiB7T2JzZXJ2YWJsZX0gdGhpcyBpbnN0YW5jZSBvZiB0aGUgb2JzZXJ2YWJsZVxuICAgICAqL1xuICAgIFskJG9ic2VydmFibGVdKCkge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG4vLyBIQUNLOiBTaW5jZSBUeXBlU2NyaXB0IGluaGVyaXRzIHN0YXRpYyBwcm9wZXJ0aWVzIHRvbywgd2UgaGF2ZSB0b1xuLy8gZmlnaHQgYWdhaW5zdCBUeXBlU2NyaXB0IGhlcmUgc28gU3ViamVjdCBjYW4gaGF2ZSBhIGRpZmZlcmVudCBzdGF0aWMgY3JlYXRlIHNpZ25hdHVyZVxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IGNvbGQgT2JzZXJ2YWJsZSBieSBjYWxsaW5nIHRoZSBPYnNlcnZhYmxlIGNvbnN0cnVjdG9yXG4gKiBAc3RhdGljIHRydWVcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKiBAbWV0aG9kIGNyZWF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gc3Vic2NyaWJlPyB0aGUgc3Vic2NyaWJlciBmdW5jdGlvbiB0byBiZSBwYXNzZWQgdG8gdGhlIE9ic2VydmFibGUgY29uc3RydWN0b3JcbiAqIEByZXR1cm4ge09ic2VydmFibGV9IGEgbmV3IGNvbGQgb2JzZXJ2YWJsZVxuICovXG5PYnNlcnZhYmxlLmNyZWF0ZSA9IChzdWJzY3JpYmUpID0+IHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoc3Vic2NyaWJlKTtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1PYnNlcnZhYmxlLmpzLm1hcCIsImV4cG9ydCBjb25zdCBlbXB0eSA9IHtcbiAgICBjbG9zZWQ6IHRydWUsXG4gICAgbmV4dCh2YWx1ZSkgeyB9LFxuICAgIGVycm9yKGVycikgeyB0aHJvdyBlcnI7IH0sXG4gICAgY29tcGxldGUoKSB7IH1cbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1PYnNlcnZlci5qcy5tYXAiLCJpbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi9TdWJzY3JpYmVyJztcbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBpZ25vcmVcbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICovXG5leHBvcnQgY2xhc3MgT3V0ZXJTdWJzY3JpYmVyIGV4dGVuZHMgU3Vic2NyaWJlciB7XG4gICAgbm90aWZ5TmV4dChvdXRlclZhbHVlLCBpbm5lclZhbHVlLCBvdXRlckluZGV4LCBpbm5lckluZGV4LCBpbm5lclN1Yikge1xuICAgICAgICB0aGlzLmRlc3RpbmF0aW9uLm5leHQoaW5uZXJWYWx1ZSk7XG4gICAgfVxuICAgIG5vdGlmeUVycm9yKGVycm9yLCBpbm5lclN1Yikge1xuICAgICAgICB0aGlzLmRlc3RpbmF0aW9uLmVycm9yKGVycm9yKTtcbiAgICB9XG4gICAgbm90aWZ5Q29tcGxldGUoaW5uZXJTdWIpIHtcbiAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5jb21wbGV0ZSgpO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPU91dGVyU3Vic2NyaWJlci5qcy5tYXAiLCJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IFN1YnNjcmliZXIgfSBmcm9tICcuL1N1YnNjcmliZXInO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAnLi9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3IgfSBmcm9tICcuL3V0aWwvT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3InO1xuaW1wb3J0IHsgU3ViamVjdFN1YnNjcmlwdGlvbiB9IGZyb20gJy4vU3ViamVjdFN1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyAkJHJ4U3Vic2NyaWJlciB9IGZyb20gJy4vc3ltYm9sL3J4U3Vic2NyaWJlcic7XG4vKipcbiAqIEBjbGFzcyBTdWJqZWN0U3Vic2NyaWJlcjxUPlxuICovXG5leHBvcnQgY2xhc3MgU3ViamVjdFN1YnNjcmliZXIgZXh0ZW5kcyBTdWJzY3JpYmVyIHtcbiAgICBjb25zdHJ1Y3RvcihkZXN0aW5hdGlvbikge1xuICAgICAgICBzdXBlcihkZXN0aW5hdGlvbik7XG4gICAgICAgIHRoaXMuZGVzdGluYXRpb24gPSBkZXN0aW5hdGlvbjtcbiAgICB9XG59XG4vKipcbiAqIEBjbGFzcyBTdWJqZWN0PFQ+XG4gKi9cbmV4cG9ydCBjbGFzcyBTdWJqZWN0IGV4dGVuZHMgT2JzZXJ2YWJsZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMub2JzZXJ2ZXJzID0gW107XG4gICAgICAgIHRoaXMuY2xvc2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNTdG9wcGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaGFzRXJyb3IgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50aHJvd25FcnJvciA9IG51bGw7XG4gICAgfVxuICAgIFskJHJ4U3Vic2NyaWJlcl0oKSB7XG4gICAgICAgIHJldHVybiBuZXcgU3ViamVjdFN1YnNjcmliZXIodGhpcyk7XG4gICAgfVxuICAgIGxpZnQob3BlcmF0b3IpIHtcbiAgICAgICAgY29uc3Qgc3ViamVjdCA9IG5ldyBBbm9ueW1vdXNTdWJqZWN0KHRoaXMsIHRoaXMpO1xuICAgICAgICBzdWJqZWN0Lm9wZXJhdG9yID0gb3BlcmF0b3I7XG4gICAgICAgIHJldHVybiBzdWJqZWN0O1xuICAgIH1cbiAgICBuZXh0KHZhbHVlKSB7XG4gICAgICAgIGlmICh0aGlzLmNsb3NlZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IE9iamVjdFVuc3Vic2NyaWJlZEVycm9yKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLmlzU3RvcHBlZCkge1xuICAgICAgICAgICAgY29uc3QgeyBvYnNlcnZlcnMgfSA9IHRoaXM7XG4gICAgICAgICAgICBjb25zdCBsZW4gPSBvYnNlcnZlcnMubGVuZ3RoO1xuICAgICAgICAgICAgY29uc3QgY29weSA9IG9ic2VydmVycy5zbGljZSgpO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgICAgIGNvcHlbaV0ubmV4dCh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZXJyb3IoZXJyKSB7XG4gICAgICAgIGlmICh0aGlzLmNsb3NlZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IE9iamVjdFVuc3Vic2NyaWJlZEVycm9yKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5oYXNFcnJvciA9IHRydWU7XG4gICAgICAgIHRoaXMudGhyb3duRXJyb3IgPSBlcnI7XG4gICAgICAgIHRoaXMuaXNTdG9wcGVkID0gdHJ1ZTtcbiAgICAgICAgY29uc3QgeyBvYnNlcnZlcnMgfSA9IHRoaXM7XG4gICAgICAgIGNvbnN0IGxlbiA9IG9ic2VydmVycy5sZW5ndGg7XG4gICAgICAgIGNvbnN0IGNvcHkgPSBvYnNlcnZlcnMuc2xpY2UoKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgY29weVtpXS5lcnJvcihlcnIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub2JzZXJ2ZXJzLmxlbmd0aCA9IDA7XG4gICAgfVxuICAgIGNvbXBsZXRlKCkge1xuICAgICAgICBpZiAodGhpcy5jbG9zZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBPYmplY3RVbnN1YnNjcmliZWRFcnJvcigpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaXNTdG9wcGVkID0gdHJ1ZTtcbiAgICAgICAgY29uc3QgeyBvYnNlcnZlcnMgfSA9IHRoaXM7XG4gICAgICAgIGNvbnN0IGxlbiA9IG9ic2VydmVycy5sZW5ndGg7XG4gICAgICAgIGNvbnN0IGNvcHkgPSBvYnNlcnZlcnMuc2xpY2UoKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgY29weVtpXS5jb21wbGV0ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub2JzZXJ2ZXJzLmxlbmd0aCA9IDA7XG4gICAgfVxuICAgIHVuc3Vic2NyaWJlKCkge1xuICAgICAgICB0aGlzLmlzU3RvcHBlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuY2xvc2VkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5vYnNlcnZlcnMgPSBudWxsO1xuICAgIH1cbiAgICBfc3Vic2NyaWJlKHN1YnNjcmliZXIpIHtcbiAgICAgICAgaWYgKHRoaXMuY2xvc2VkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3IoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmhhc0Vycm9yKSB7XG4gICAgICAgICAgICBzdWJzY3JpYmVyLmVycm9yKHRoaXMudGhyb3duRXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuIFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmlzU3RvcHBlZCkge1xuICAgICAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgcmV0dXJuIFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMub2JzZXJ2ZXJzLnB1c2goc3Vic2NyaWJlcik7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFN1YmplY3RTdWJzY3JpcHRpb24odGhpcywgc3Vic2NyaWJlcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXNPYnNlcnZhYmxlKCkge1xuICAgICAgICBjb25zdCBvYnNlcnZhYmxlID0gbmV3IE9ic2VydmFibGUoKTtcbiAgICAgICAgb2JzZXJ2YWJsZS5zb3VyY2UgPSB0aGlzO1xuICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZTtcbiAgICB9XG59XG5TdWJqZWN0LmNyZWF0ZSA9IChkZXN0aW5hdGlvbiwgc291cmNlKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBBbm9ueW1vdXNTdWJqZWN0KGRlc3RpbmF0aW9uLCBzb3VyY2UpO1xufTtcbi8qKlxuICogQGNsYXNzIEFub255bW91c1N1YmplY3Q8VD5cbiAqL1xuZXhwb3J0IGNsYXNzIEFub255bW91c1N1YmplY3QgZXh0ZW5kcyBTdWJqZWN0IHtcbiAgICBjb25zdHJ1Y3RvcihkZXN0aW5hdGlvbiwgc291cmNlKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuZGVzdGluYXRpb24gPSBkZXN0aW5hdGlvbjtcbiAgICAgICAgdGhpcy5zb3VyY2UgPSBzb3VyY2U7XG4gICAgfVxuICAgIG5leHQodmFsdWUpIHtcbiAgICAgICAgY29uc3QgeyBkZXN0aW5hdGlvbiB9ID0gdGhpcztcbiAgICAgICAgaWYgKGRlc3RpbmF0aW9uICYmIGRlc3RpbmF0aW9uLm5leHQpIHtcbiAgICAgICAgICAgIGRlc3RpbmF0aW9uLm5leHQodmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVycm9yKGVycikge1xuICAgICAgICBjb25zdCB7IGRlc3RpbmF0aW9uIH0gPSB0aGlzO1xuICAgICAgICBpZiAoZGVzdGluYXRpb24gJiYgZGVzdGluYXRpb24uZXJyb3IpIHtcbiAgICAgICAgICAgIHRoaXMuZGVzdGluYXRpb24uZXJyb3IoZXJyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb21wbGV0ZSgpIHtcbiAgICAgICAgY29uc3QgeyBkZXN0aW5hdGlvbiB9ID0gdGhpcztcbiAgICAgICAgaWYgKGRlc3RpbmF0aW9uICYmIGRlc3RpbmF0aW9uLmNvbXBsZXRlKSB7XG4gICAgICAgICAgICB0aGlzLmRlc3RpbmF0aW9uLmNvbXBsZXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX3N1YnNjcmliZShzdWJzY3JpYmVyKSB7XG4gICAgICAgIGNvbnN0IHsgc291cmNlIH0gPSB0aGlzO1xuICAgICAgICBpZiAoc291cmNlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zb3VyY2Uuc3Vic2NyaWJlKHN1YnNjcmliZXIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICAgICAgfVxuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVN1YmplY3QuanMubWFwIiwiaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAnLi9TdWJzY3JpcHRpb24nO1xuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbmV4cG9ydCBjbGFzcyBTdWJqZWN0U3Vic2NyaXB0aW9uIGV4dGVuZHMgU3Vic2NyaXB0aW9uIHtcbiAgICBjb25zdHJ1Y3RvcihzdWJqZWN0LCBzdWJzY3JpYmVyKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuc3ViamVjdCA9IHN1YmplY3Q7XG4gICAgICAgIHRoaXMuc3Vic2NyaWJlciA9IHN1YnNjcmliZXI7XG4gICAgICAgIHRoaXMuY2xvc2VkID0gZmFsc2U7XG4gICAgfVxuICAgIHVuc3Vic2NyaWJlKCkge1xuICAgICAgICBpZiAodGhpcy5jbG9zZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNsb3NlZCA9IHRydWU7XG4gICAgICAgIGNvbnN0IHN1YmplY3QgPSB0aGlzLnN1YmplY3Q7XG4gICAgICAgIGNvbnN0IG9ic2VydmVycyA9IHN1YmplY3Qub2JzZXJ2ZXJzO1xuICAgICAgICB0aGlzLnN1YmplY3QgPSBudWxsO1xuICAgICAgICBpZiAoIW9ic2VydmVycyB8fCBvYnNlcnZlcnMubGVuZ3RoID09PSAwIHx8IHN1YmplY3QuaXNTdG9wcGVkIHx8IHN1YmplY3QuY2xvc2VkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc3Vic2NyaWJlckluZGV4ID0gb2JzZXJ2ZXJzLmluZGV4T2YodGhpcy5zdWJzY3JpYmVyKTtcbiAgICAgICAgaWYgKHN1YnNjcmliZXJJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgIG9ic2VydmVycy5zcGxpY2Uoc3Vic2NyaWJlckluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVN1YmplY3RTdWJzY3JpcHRpb24uanMubWFwIiwiaW1wb3J0IHsgaXNGdW5jdGlvbiB9IGZyb20gJy4vdXRpbC9pc0Z1bmN0aW9uJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJy4vU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IGVtcHR5IGFzIGVtcHR5T2JzZXJ2ZXIgfSBmcm9tICcuL09ic2VydmVyJztcbmltcG9ydCB7ICQkcnhTdWJzY3JpYmVyIH0gZnJvbSAnLi9zeW1ib2wvcnhTdWJzY3JpYmVyJztcbi8qKlxuICogSW1wbGVtZW50cyB0aGUge0BsaW5rIE9ic2VydmVyfSBpbnRlcmZhY2UgYW5kIGV4dGVuZHMgdGhlXG4gKiB7QGxpbmsgU3Vic2NyaXB0aW9ufSBjbGFzcy4gV2hpbGUgdGhlIHtAbGluayBPYnNlcnZlcn0gaXMgdGhlIHB1YmxpYyBBUEkgZm9yXG4gKiBjb25zdW1pbmcgdGhlIHZhbHVlcyBvZiBhbiB7QGxpbmsgT2JzZXJ2YWJsZX0sIGFsbCBPYnNlcnZlcnMgZ2V0IGNvbnZlcnRlZCB0b1xuICogYSBTdWJzY3JpYmVyLCBpbiBvcmRlciB0byBwcm92aWRlIFN1YnNjcmlwdGlvbi1saWtlIGNhcGFiaWxpdGllcyBzdWNoIGFzXG4gKiBgdW5zdWJzY3JpYmVgLiBTdWJzY3JpYmVyIGlzIGEgY29tbW9uIHR5cGUgaW4gUnhKUywgYW5kIGNydWNpYWwgZm9yXG4gKiBpbXBsZW1lbnRpbmcgb3BlcmF0b3JzLCBidXQgaXQgaXMgcmFyZWx5IHVzZWQgYXMgYSBwdWJsaWMgQVBJLlxuICpcbiAqIEBjbGFzcyBTdWJzY3JpYmVyPFQ+XG4gKi9cbmV4cG9ydCBjbGFzcyBTdWJzY3JpYmVyIGV4dGVuZHMgU3Vic2NyaXB0aW9uIHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge09ic2VydmVyfGZ1bmN0aW9uKHZhbHVlOiBUKTogdm9pZH0gW2Rlc3RpbmF0aW9uT3JOZXh0XSBBIHBhcnRpYWxseVxuICAgICAqIGRlZmluZWQgT2JzZXJ2ZXIgb3IgYSBgbmV4dGAgY2FsbGJhY2sgZnVuY3Rpb24uXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbihlOiA/YW55KTogdm9pZH0gW2Vycm9yXSBUaGUgYGVycm9yYCBjYWxsYmFjayBvZiBhblxuICAgICAqIE9ic2VydmVyLlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oKTogdm9pZH0gW2NvbXBsZXRlXSBUaGUgYGNvbXBsZXRlYCBjYWxsYmFjayBvZiBhblxuICAgICAqIE9ic2VydmVyLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGRlc3RpbmF0aW9uT3JOZXh0LCBlcnJvciwgY29tcGxldGUpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5zeW5jRXJyb3JWYWx1ZSA9IG51bGw7XG4gICAgICAgIHRoaXMuc3luY0Vycm9yVGhyb3duID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc3luY0Vycm9yVGhyb3dhYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNTdG9wcGVkID0gZmFsc2U7XG4gICAgICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHRoaXMuZGVzdGluYXRpb24gPSBlbXB0eU9ic2VydmVyO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIGlmICghZGVzdGluYXRpb25Pck5leHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZXN0aW5hdGlvbiA9IGVtcHR5T2JzZXJ2ZXI7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGRlc3RpbmF0aW9uT3JOZXh0ID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGVzdGluYXRpb25Pck5leHQgaW5zdGFuY2VvZiBTdWJzY3JpYmVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlc3RpbmF0aW9uID0gZGVzdGluYXRpb25Pck5leHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlc3RpbmF0aW9uLmFkZCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3luY0Vycm9yVGhyb3dhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVzdGluYXRpb24gPSBuZXcgU2FmZVN1YnNjcmliZXIodGhpcywgZGVzdGluYXRpb25Pck5leHQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhpcy5zeW5jRXJyb3JUaHJvd2FibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuZGVzdGluYXRpb24gPSBuZXcgU2FmZVN1YnNjcmliZXIodGhpcywgZGVzdGluYXRpb25Pck5leHQsIGVycm9yLCBjb21wbGV0ZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgWyQkcnhTdWJzY3JpYmVyXSgpIHsgcmV0dXJuIHRoaXM7IH1cbiAgICAvKipcbiAgICAgKiBBIHN0YXRpYyBmYWN0b3J5IGZvciBhIFN1YnNjcmliZXIsIGdpdmVuIGEgKHBvdGVudGlhbGx5IHBhcnRpYWwpIGRlZmluaXRpb25cbiAgICAgKiBvZiBhbiBPYnNlcnZlci5cbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKHg6ID9UKTogdm9pZH0gW25leHRdIFRoZSBgbmV4dGAgY2FsbGJhY2sgb2YgYW4gT2JzZXJ2ZXIuXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbihlOiA/YW55KTogdm9pZH0gW2Vycm9yXSBUaGUgYGVycm9yYCBjYWxsYmFjayBvZiBhblxuICAgICAqIE9ic2VydmVyLlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oKTogdm9pZH0gW2NvbXBsZXRlXSBUaGUgYGNvbXBsZXRlYCBjYWxsYmFjayBvZiBhblxuICAgICAqIE9ic2VydmVyLlxuICAgICAqIEByZXR1cm4ge1N1YnNjcmliZXI8VD59IEEgU3Vic2NyaWJlciB3cmFwcGluZyB0aGUgKHBhcnRpYWxseSBkZWZpbmVkKVxuICAgICAqIE9ic2VydmVyIHJlcHJlc2VudGVkIGJ5IHRoZSBnaXZlbiBhcmd1bWVudHMuXG4gICAgICovXG4gICAgc3RhdGljIGNyZWF0ZShuZXh0LCBlcnJvciwgY29tcGxldGUpIHtcbiAgICAgICAgY29uc3Qgc3Vic2NyaWJlciA9IG5ldyBTdWJzY3JpYmVyKG5leHQsIGVycm9yLCBjb21wbGV0ZSk7XG4gICAgICAgIHN1YnNjcmliZXIuc3luY0Vycm9yVGhyb3dhYmxlID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBzdWJzY3JpYmVyO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUge0BsaW5rIE9ic2VydmVyfSBjYWxsYmFjayB0byByZWNlaXZlIG5vdGlmaWNhdGlvbnMgb2YgdHlwZSBgbmV4dGAgZnJvbVxuICAgICAqIHRoZSBPYnNlcnZhYmxlLCB3aXRoIGEgdmFsdWUuIFRoZSBPYnNlcnZhYmxlIG1heSBjYWxsIHRoaXMgbWV0aG9kIDAgb3IgbW9yZVxuICAgICAqIHRpbWVzLlxuICAgICAqIEBwYXJhbSB7VH0gW3ZhbHVlXSBUaGUgYG5leHRgIHZhbHVlLlxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgbmV4dCh2YWx1ZSkge1xuICAgICAgICBpZiAoIXRoaXMuaXNTdG9wcGVkKSB7XG4gICAgICAgICAgICB0aGlzLl9uZXh0KHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUge0BsaW5rIE9ic2VydmVyfSBjYWxsYmFjayB0byByZWNlaXZlIG5vdGlmaWNhdGlvbnMgb2YgdHlwZSBgZXJyb3JgIGZyb21cbiAgICAgKiB0aGUgT2JzZXJ2YWJsZSwgd2l0aCBhbiBhdHRhY2hlZCB7QGxpbmsgRXJyb3J9LiBOb3RpZmllcyB0aGUgT2JzZXJ2ZXIgdGhhdFxuICAgICAqIHRoZSBPYnNlcnZhYmxlIGhhcyBleHBlcmllbmNlZCBhbiBlcnJvciBjb25kaXRpb24uXG4gICAgICogQHBhcmFtIHthbnl9IFtlcnJdIFRoZSBgZXJyb3JgIGV4Y2VwdGlvbi5cbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIGVycm9yKGVycikge1xuICAgICAgICBpZiAoIXRoaXMuaXNTdG9wcGVkKSB7XG4gICAgICAgICAgICB0aGlzLmlzU3RvcHBlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLl9lcnJvcihlcnIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSB7QGxpbmsgT2JzZXJ2ZXJ9IGNhbGxiYWNrIHRvIHJlY2VpdmUgYSB2YWx1ZWxlc3Mgbm90aWZpY2F0aW9uIG9mIHR5cGVcbiAgICAgKiBgY29tcGxldGVgIGZyb20gdGhlIE9ic2VydmFibGUuIE5vdGlmaWVzIHRoZSBPYnNlcnZlciB0aGF0IHRoZSBPYnNlcnZhYmxlXG4gICAgICogaGFzIGZpbmlzaGVkIHNlbmRpbmcgcHVzaC1iYXNlZCBub3RpZmljYXRpb25zLlxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgY29tcGxldGUoKSB7XG4gICAgICAgIGlmICghdGhpcy5pc1N0b3BwZWQpIHtcbiAgICAgICAgICAgIHRoaXMuaXNTdG9wcGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuX2NvbXBsZXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdW5zdWJzY3JpYmUoKSB7XG4gICAgICAgIGlmICh0aGlzLmNsb3NlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaXNTdG9wcGVkID0gdHJ1ZTtcbiAgICAgICAgc3VwZXIudW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgX25leHQodmFsdWUpIHtcbiAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5uZXh0KHZhbHVlKTtcbiAgICB9XG4gICAgX2Vycm9yKGVycikge1xuICAgICAgICB0aGlzLmRlc3RpbmF0aW9uLmVycm9yKGVycik7XG4gICAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgX2NvbXBsZXRlKCkge1xuICAgICAgICB0aGlzLmRlc3RpbmF0aW9uLmNvbXBsZXRlKCk7XG4gICAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICB9XG59XG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAaWdub3JlXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqL1xuY2xhc3MgU2FmZVN1YnNjcmliZXIgZXh0ZW5kcyBTdWJzY3JpYmVyIHtcbiAgICBjb25zdHJ1Y3RvcihfcGFyZW50LCBvYnNlcnZlck9yTmV4dCwgZXJyb3IsIGNvbXBsZXRlKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX3BhcmVudCA9IF9wYXJlbnQ7XG4gICAgICAgIGxldCBuZXh0O1xuICAgICAgICBsZXQgY29udGV4dCA9IHRoaXM7XG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKG9ic2VydmVyT3JOZXh0KSkge1xuICAgICAgICAgICAgbmV4dCA9IG9ic2VydmVyT3JOZXh0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG9ic2VydmVyT3JOZXh0KSB7XG4gICAgICAgICAgICBjb250ZXh0ID0gb2JzZXJ2ZXJPck5leHQ7XG4gICAgICAgICAgICBuZXh0ID0gb2JzZXJ2ZXJPck5leHQubmV4dDtcbiAgICAgICAgICAgIGVycm9yID0gb2JzZXJ2ZXJPck5leHQuZXJyb3I7XG4gICAgICAgICAgICBjb21wbGV0ZSA9IG9ic2VydmVyT3JOZXh0LmNvbXBsZXRlO1xuICAgICAgICAgICAgaWYgKGlzRnVuY3Rpb24oY29udGV4dC51bnN1YnNjcmliZSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZChjb250ZXh0LnVuc3Vic2NyaWJlLmJpbmQoY29udGV4dCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29udGV4dC51bnN1YnNjcmliZSA9IHRoaXMudW5zdWJzY3JpYmUuYmluZCh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jb250ZXh0ID0gY29udGV4dDtcbiAgICAgICAgdGhpcy5fbmV4dCA9IG5leHQ7XG4gICAgICAgIHRoaXMuX2Vycm9yID0gZXJyb3I7XG4gICAgICAgIHRoaXMuX2NvbXBsZXRlID0gY29tcGxldGU7XG4gICAgfVxuICAgIG5leHQodmFsdWUpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzU3RvcHBlZCAmJiB0aGlzLl9uZXh0KSB7XG4gICAgICAgICAgICBjb25zdCB7IF9wYXJlbnQgfSA9IHRoaXM7XG4gICAgICAgICAgICBpZiAoIV9wYXJlbnQuc3luY0Vycm9yVGhyb3dhYmxlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fX3RyeU9yVW5zdWIodGhpcy5fbmV4dCwgdmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5fX3RyeU9yU2V0RXJyb3IoX3BhcmVudCwgdGhpcy5fbmV4dCwgdmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGVycm9yKGVycikge1xuICAgICAgICBpZiAoIXRoaXMuaXNTdG9wcGVkKSB7XG4gICAgICAgICAgICBjb25zdCB7IF9wYXJlbnQgfSA9IHRoaXM7XG4gICAgICAgICAgICBpZiAodGhpcy5fZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBpZiAoIV9wYXJlbnQuc3luY0Vycm9yVGhyb3dhYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX190cnlPclVuc3ViKHRoaXMuX2Vycm9yLCBlcnIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9fdHJ5T3JTZXRFcnJvcihfcGFyZW50LCB0aGlzLl9lcnJvciwgZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCFfcGFyZW50LnN5bmNFcnJvclRocm93YWJsZSkge1xuICAgICAgICAgICAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBfcGFyZW50LnN5bmNFcnJvclZhbHVlID0gZXJyO1xuICAgICAgICAgICAgICAgIF9wYXJlbnQuc3luY0Vycm9yVGhyb3duID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29tcGxldGUoKSB7XG4gICAgICAgIGlmICghdGhpcy5pc1N0b3BwZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgX3BhcmVudCB9ID0gdGhpcztcbiAgICAgICAgICAgIGlmICh0aGlzLl9jb21wbGV0ZSkge1xuICAgICAgICAgICAgICAgIGlmICghX3BhcmVudC5zeW5jRXJyb3JUaHJvd2FibGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fX3RyeU9yVW5zdWIodGhpcy5fY29tcGxldGUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9fdHJ5T3JTZXRFcnJvcihfcGFyZW50LCB0aGlzLl9jb21wbGV0ZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgX190cnlPclVuc3ViKGZuLCB2YWx1ZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZm4uY2FsbCh0aGlzLl9jb250ZXh0LCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9fdHJ5T3JTZXRFcnJvcihwYXJlbnQsIGZuLCB2YWx1ZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZm4uY2FsbCh0aGlzLl9jb250ZXh0LCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgcGFyZW50LnN5bmNFcnJvclZhbHVlID0gZXJyO1xuICAgICAgICAgICAgcGFyZW50LnN5bmNFcnJvclRocm93biA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIF91bnN1YnNjcmliZSgpIHtcbiAgICAgICAgY29uc3QgeyBfcGFyZW50IH0gPSB0aGlzO1xuICAgICAgICB0aGlzLl9jb250ZXh0ID0gbnVsbDtcbiAgICAgICAgdGhpcy5fcGFyZW50ID0gbnVsbDtcbiAgICAgICAgX3BhcmVudC51bnN1YnNjcmliZSgpO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVN1YnNjcmliZXIuanMubWFwIiwiaW1wb3J0IHsgaXNBcnJheSB9IGZyb20gJy4vdXRpbC9pc0FycmF5JztcbmltcG9ydCB7IGlzT2JqZWN0IH0gZnJvbSAnLi91dGlsL2lzT2JqZWN0JztcbmltcG9ydCB7IGlzRnVuY3Rpb24gfSBmcm9tICcuL3V0aWwvaXNGdW5jdGlvbic7XG5pbXBvcnQgeyB0cnlDYXRjaCB9IGZyb20gJy4vdXRpbC90cnlDYXRjaCc7XG5pbXBvcnQgeyBlcnJvck9iamVjdCB9IGZyb20gJy4vdXRpbC9lcnJvck9iamVjdCc7XG5pbXBvcnQgeyBVbnN1YnNjcmlwdGlvbkVycm9yIH0gZnJvbSAnLi91dGlsL1Vuc3Vic2NyaXB0aW9uRXJyb3InO1xuLyoqXG4gKiBSZXByZXNlbnRzIGEgZGlzcG9zYWJsZSByZXNvdXJjZSwgc3VjaCBhcyB0aGUgZXhlY3V0aW9uIG9mIGFuIE9ic2VydmFibGUuIEFcbiAqIFN1YnNjcmlwdGlvbiBoYXMgb25lIGltcG9ydGFudCBtZXRob2QsIGB1bnN1YnNjcmliZWAsIHRoYXQgdGFrZXMgbm8gYXJndW1lbnRcbiAqIGFuZCBqdXN0IGRpc3Bvc2VzIHRoZSByZXNvdXJjZSBoZWxkIGJ5IHRoZSBzdWJzY3JpcHRpb24uXG4gKlxuICogQWRkaXRpb25hbGx5LCBzdWJzY3JpcHRpb25zIG1heSBiZSBncm91cGVkIHRvZ2V0aGVyIHRocm91Z2ggdGhlIGBhZGQoKWBcbiAqIG1ldGhvZCwgd2hpY2ggd2lsbCBhdHRhY2ggYSBjaGlsZCBTdWJzY3JpcHRpb24gdG8gdGhlIGN1cnJlbnQgU3Vic2NyaXB0aW9uLlxuICogV2hlbiBhIFN1YnNjcmlwdGlvbiBpcyB1bnN1YnNjcmliZWQsIGFsbCBpdHMgY2hpbGRyZW4gKGFuZCBpdHMgZ3JhbmRjaGlsZHJlbilcbiAqIHdpbGwgYmUgdW5zdWJzY3JpYmVkIGFzIHdlbGwuXG4gKlxuICogQGNsYXNzIFN1YnNjcmlwdGlvblxuICovXG5leHBvcnQgY2xhc3MgU3Vic2NyaXB0aW9uIHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKCk6IHZvaWR9IFt1bnN1YnNjcmliZV0gQSBmdW5jdGlvbiBkZXNjcmliaW5nIGhvdyB0b1xuICAgICAqIHBlcmZvcm0gdGhlIGRpc3Bvc2FsIG9mIHJlc291cmNlcyB3aGVuIHRoZSBgdW5zdWJzY3JpYmVgIG1ldGhvZCBpcyBjYWxsZWQuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IodW5zdWJzY3JpYmUpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEEgZmxhZyB0byBpbmRpY2F0ZSB3aGV0aGVyIHRoaXMgU3Vic2NyaXB0aW9uIGhhcyBhbHJlYWR5IGJlZW4gdW5zdWJzY3JpYmVkLlxuICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuY2xvc2VkID0gZmFsc2U7XG4gICAgICAgIGlmICh1bnN1YnNjcmliZSkge1xuICAgICAgICAgICAgdGhpcy5fdW5zdWJzY3JpYmUgPSB1bnN1YnNjcmliZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBEaXNwb3NlcyB0aGUgcmVzb3VyY2VzIGhlbGQgYnkgdGhlIHN1YnNjcmlwdGlvbi4gTWF5LCBmb3IgaW5zdGFuY2UsIGNhbmNlbFxuICAgICAqIGFuIG9uZ29pbmcgT2JzZXJ2YWJsZSBleGVjdXRpb24gb3IgY2FuY2VsIGFueSBvdGhlciB0eXBlIG9mIHdvcmsgdGhhdFxuICAgICAqIHN0YXJ0ZWQgd2hlbiB0aGUgU3Vic2NyaXB0aW9uIHdhcyBjcmVhdGVkLlxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgdW5zdWJzY3JpYmUoKSB7XG4gICAgICAgIGxldCBoYXNFcnJvcnMgPSBmYWxzZTtcbiAgICAgICAgbGV0IGVycm9ycztcbiAgICAgICAgaWYgKHRoaXMuY2xvc2VkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jbG9zZWQgPSB0cnVlO1xuICAgICAgICBjb25zdCB7IF91bnN1YnNjcmliZSwgX3N1YnNjcmlwdGlvbnMgfSA9IHRoaXM7XG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMgPSBudWxsO1xuICAgICAgICBpZiAoaXNGdW5jdGlvbihfdW5zdWJzY3JpYmUpKSB7XG4gICAgICAgICAgICBsZXQgdHJpYWwgPSB0cnlDYXRjaChfdW5zdWJzY3JpYmUpLmNhbGwodGhpcyk7XG4gICAgICAgICAgICBpZiAodHJpYWwgPT09IGVycm9yT2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgaGFzRXJyb3JzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAoZXJyb3JzID0gZXJyb3JzIHx8IFtdKS5wdXNoKGVycm9yT2JqZWN0LmUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChpc0FycmF5KF9zdWJzY3JpcHRpb25zKSkge1xuICAgICAgICAgICAgbGV0IGluZGV4ID0gLTE7XG4gICAgICAgICAgICBjb25zdCBsZW4gPSBfc3Vic2NyaXB0aW9ucy5sZW5ndGg7XG4gICAgICAgICAgICB3aGlsZSAoKytpbmRleCA8IGxlbikge1xuICAgICAgICAgICAgICAgIGNvbnN0IHN1YiA9IF9zdWJzY3JpcHRpb25zW2luZGV4XTtcbiAgICAgICAgICAgICAgICBpZiAoaXNPYmplY3Qoc3ViKSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdHJpYWwgPSB0cnlDYXRjaChzdWIudW5zdWJzY3JpYmUpLmNhbGwoc3ViKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRyaWFsID09PSBlcnJvck9iamVjdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaGFzRXJyb3JzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9ycyA9IGVycm9ycyB8fCBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBlcnIgPSBlcnJvck9iamVjdC5lO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVyciBpbnN0YW5jZW9mIFVuc3Vic2NyaXB0aW9uRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcnMgPSBlcnJvcnMuY29uY2F0KGVyci5lcnJvcnMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JzLnB1c2goZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoaGFzRXJyb3JzKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVW5zdWJzY3JpcHRpb25FcnJvcihlcnJvcnMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZHMgYSB0ZWFyIGRvd24gdG8gYmUgY2FsbGVkIGR1cmluZyB0aGUgdW5zdWJzY3JpYmUoKSBvZiB0aGlzXG4gICAgICogU3Vic2NyaXB0aW9uLlxuICAgICAqXG4gICAgICogSWYgdGhlIHRlYXIgZG93biBiZWluZyBhZGRlZCBpcyBhIHN1YnNjcmlwdGlvbiB0aGF0IGlzIGFscmVhZHlcbiAgICAgKiB1bnN1YnNjcmliZWQsIGlzIHRoZSBzYW1lIHJlZmVyZW5jZSBgYWRkYCBpcyBiZWluZyBjYWxsZWQgb24sIG9yIGlzXG4gICAgICogYFN1YnNjcmlwdGlvbi5FTVBUWWAsIGl0IHdpbGwgbm90IGJlIGFkZGVkLlxuICAgICAqXG4gICAgICogSWYgdGhpcyBzdWJzY3JpcHRpb24gaXMgYWxyZWFkeSBpbiBhbiBgY2xvc2VkYCBzdGF0ZSwgdGhlIHBhc3NlZFxuICAgICAqIHRlYXIgZG93biBsb2dpYyB3aWxsIGJlIGV4ZWN1dGVkIGltbWVkaWF0ZWx5LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtUZWFyZG93bkxvZ2ljfSB0ZWFyZG93biBUaGUgYWRkaXRpb25hbCBsb2dpYyB0byBleGVjdXRlIG9uXG4gICAgICogdGVhcmRvd24uXG4gICAgICogQHJldHVybiB7U3Vic2NyaXB0aW9ufSBSZXR1cm5zIHRoZSBTdWJzY3JpcHRpb24gdXNlZCBvciBjcmVhdGVkIHRvIGJlXG4gICAgICogYWRkZWQgdG8gdGhlIGlubmVyIHN1YnNjcmlwdGlvbnMgbGlzdC4gVGhpcyBTdWJzY3JpcHRpb24gY2FuIGJlIHVzZWQgd2l0aFxuICAgICAqIGByZW1vdmUoKWAgdG8gcmVtb3ZlIHRoZSBwYXNzZWQgdGVhcmRvd24gbG9naWMgZnJvbSB0aGUgaW5uZXIgc3Vic2NyaXB0aW9uc1xuICAgICAqIGxpc3QuXG4gICAgICovXG4gICAgYWRkKHRlYXJkb3duKSB7XG4gICAgICAgIGlmICghdGVhcmRvd24gfHwgKHRlYXJkb3duID09PSBTdWJzY3JpcHRpb24uRU1QVFkpKSB7XG4gICAgICAgICAgICByZXR1cm4gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0ZWFyZG93biA9PT0gdGhpcykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHN1YiA9IHRlYXJkb3duO1xuICAgICAgICBzd2l0Y2ggKHR5cGVvZiB0ZWFyZG93bikge1xuICAgICAgICAgICAgY2FzZSAnZnVuY3Rpb24nOlxuICAgICAgICAgICAgICAgIHN1YiA9IG5ldyBTdWJzY3JpcHRpb24odGVhcmRvd24pO1xuICAgICAgICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgICAgICAgICBpZiAoc3ViLmNsb3NlZCB8fCB0eXBlb2Ygc3ViLnVuc3Vic2NyaWJlICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmNsb3NlZCkge1xuICAgICAgICAgICAgICAgICAgICBzdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICh0aGlzLl9zdWJzY3JpcHRpb25zIHx8ICh0aGlzLl9zdWJzY3JpcHRpb25zID0gW10pKS5wdXNoKHN1Yik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3VucmVjb2duaXplZCB0ZWFyZG93biAnICsgdGVhcmRvd24gKyAnIGFkZGVkIHRvIFN1YnNjcmlwdGlvbi4nKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3ViO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGEgU3Vic2NyaXB0aW9uIGZyb20gdGhlIGludGVybmFsIGxpc3Qgb2Ygc3Vic2NyaXB0aW9ucyB0aGF0IHdpbGxcbiAgICAgKiB1bnN1YnNjcmliZSBkdXJpbmcgdGhlIHVuc3Vic2NyaWJlIHByb2Nlc3Mgb2YgdGhpcyBTdWJzY3JpcHRpb24uXG4gICAgICogQHBhcmFtIHtTdWJzY3JpcHRpb259IHN1YnNjcmlwdGlvbiBUaGUgc3Vic2NyaXB0aW9uIHRvIHJlbW92ZS5cbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIHJlbW92ZShzdWJzY3JpcHRpb24pIHtcbiAgICAgICAgLy8gSEFDSzogVGhpcyBtaWdodCBiZSByZWR1bmRhbnQgYmVjYXVzZSBvZiB0aGUgbG9naWMgaW4gYGFkZCgpYFxuICAgICAgICBpZiAoc3Vic2NyaXB0aW9uID09IG51bGwgfHwgKHN1YnNjcmlwdGlvbiA9PT0gdGhpcykgfHwgKHN1YnNjcmlwdGlvbiA9PT0gU3Vic2NyaXB0aW9uLkVNUFRZKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHN1YnNjcmlwdGlvbnMgPSB0aGlzLl9zdWJzY3JpcHRpb25zO1xuICAgICAgICBpZiAoc3Vic2NyaXB0aW9ucykge1xuICAgICAgICAgICAgY29uc3Qgc3Vic2NyaXB0aW9uSW5kZXggPSBzdWJzY3JpcHRpb25zLmluZGV4T2Yoc3Vic2NyaXB0aW9uKTtcbiAgICAgICAgICAgIGlmIChzdWJzY3JpcHRpb25JbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICBzdWJzY3JpcHRpb25zLnNwbGljZShzdWJzY3JpcHRpb25JbmRleCwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5TdWJzY3JpcHRpb24uRU1QVFkgPSAoZnVuY3Rpb24gKGVtcHR5KSB7XG4gICAgZW1wdHkuY2xvc2VkID0gdHJ1ZTtcbiAgICByZXR1cm4gZW1wdHk7XG59KG5ldyBTdWJzY3JpcHRpb24oKSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9U3Vic2NyaXB0aW9uLmpzLm1hcCIsImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi8uLi8uLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IGFqYXggYXMgc3RhdGljQWpheCB9IGZyb20gJy4uLy4uLy4uL29ic2VydmFibGUvZG9tL2FqYXgnO1xuT2JzZXJ2YWJsZS5hamF4ID0gc3RhdGljQWpheDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFqYXguanMubWFwIiwiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uLy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgZnJvbUV2ZW50IGFzIHN0YXRpY0Zyb21FdmVudCB9IGZyb20gJy4uLy4uL29ic2VydmFibGUvZnJvbUV2ZW50Jztcbk9ic2VydmFibGUuZnJvbUV2ZW50ID0gc3RhdGljRnJvbUV2ZW50O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZnJvbUV2ZW50LmpzLm1hcCIsImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi8uLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IG1lcmdlIGFzIG1lcmdlU3RhdGljIH0gZnJvbSAnLi4vLi4vb2JzZXJ2YWJsZS9tZXJnZSc7XG5PYnNlcnZhYmxlLm1lcmdlID0gbWVyZ2VTdGF0aWM7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tZXJnZS5qcy5tYXAiLCJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBvZiBhcyBzdGF0aWNPZiB9IGZyb20gJy4uLy4uL29ic2VydmFibGUvb2YnO1xuT2JzZXJ2YWJsZS5vZiA9IHN0YXRpY09mO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9b2YuanMubWFwIiwiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uLy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgZGVib3VuY2UgfSBmcm9tICcuLi8uLi9vcGVyYXRvci9kZWJvdW5jZSc7XG5PYnNlcnZhYmxlLnByb3RvdHlwZS5kZWJvdW5jZSA9IGRlYm91bmNlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGVib3VuY2UuanMubWFwIiwiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uLy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgX2RvIH0gZnJvbSAnLi4vLi4vb3BlcmF0b3IvZG8nO1xuT2JzZXJ2YWJsZS5wcm90b3R5cGUuZG8gPSBfZG87XG5PYnNlcnZhYmxlLnByb3RvdHlwZS5fZG8gPSBfZG87XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kby5qcy5tYXAiLCJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICcuLi8uLi9vcGVyYXRvci9maWx0ZXInO1xuT2JzZXJ2YWJsZS5wcm90b3R5cGUuZmlsdGVyID0gZmlsdGVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZmlsdGVyLmpzLm1hcCIsImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi8uLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJy4uLy4uL29wZXJhdG9yL21hcCc7XG5PYnNlcnZhYmxlLnByb3RvdHlwZS5tYXAgPSBtYXA7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXAuanMubWFwIiwiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uLy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgbWVyZ2VBbGwgfSBmcm9tICcuLi8uLi9vcGVyYXRvci9tZXJnZUFsbCc7XG5PYnNlcnZhYmxlLnByb3RvdHlwZS5tZXJnZUFsbCA9IG1lcmdlQWxsO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWVyZ2VBbGwuanMubWFwIiwiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uLy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgcmV0cnkgfSBmcm9tICcuLi8uLi9vcGVyYXRvci9yZXRyeSc7XG5PYnNlcnZhYmxlLnByb3RvdHlwZS5yZXRyeSA9IHJldHJ5O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cmV0cnkuanMubWFwIiwiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uLy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgX3N3aXRjaCB9IGZyb20gJy4uLy4uL29wZXJhdG9yL3N3aXRjaCc7XG5PYnNlcnZhYmxlLnByb3RvdHlwZS5zd2l0Y2ggPSBfc3dpdGNoO1xuT2JzZXJ2YWJsZS5wcm90b3R5cGUuX3N3aXRjaCA9IF9zd2l0Y2g7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zd2l0Y2guanMubWFwIiwiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uLy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgc3dpdGNoTWFwIH0gZnJvbSAnLi4vLi4vb3BlcmF0b3Ivc3dpdGNoTWFwJztcbk9ic2VydmFibGUucHJvdG90eXBlLnN3aXRjaE1hcCA9IHN3aXRjaE1hcDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXN3aXRjaE1hcC5qcy5tYXAiLCJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBTY2FsYXJPYnNlcnZhYmxlIH0gZnJvbSAnLi9TY2FsYXJPYnNlcnZhYmxlJztcbmltcG9ydCB7IEVtcHR5T2JzZXJ2YWJsZSB9IGZyb20gJy4vRW1wdHlPYnNlcnZhYmxlJztcbmltcG9ydCB7IGlzU2NoZWR1bGVyIH0gZnJvbSAnLi4vdXRpbC9pc1NjaGVkdWxlcic7XG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqIEBoaWRlIHRydWVcbiAqL1xuZXhwb3J0IGNsYXNzIEFycmF5T2JzZXJ2YWJsZSBleHRlbmRzIE9ic2VydmFibGUge1xuICAgIGNvbnN0cnVjdG9yKGFycmF5LCBzY2hlZHVsZXIpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5hcnJheSA9IGFycmF5O1xuICAgICAgICB0aGlzLnNjaGVkdWxlciA9IHNjaGVkdWxlcjtcbiAgICAgICAgaWYgKCFzY2hlZHVsZXIgJiYgYXJyYXkubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICB0aGlzLl9pc1NjYWxhciA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gYXJyYXlbMF07XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIGNyZWF0ZShhcnJheSwgc2NoZWR1bGVyKSB7XG4gICAgICAgIHJldHVybiBuZXcgQXJyYXlPYnNlcnZhYmxlKGFycmF5LCBzY2hlZHVsZXIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIE9ic2VydmFibGUgdGhhdCBlbWl0cyBzb21lIHZhbHVlcyB5b3Ugc3BlY2lmeSBhcyBhcmd1bWVudHMsXG4gICAgICogaW1tZWRpYXRlbHkgb25lIGFmdGVyIHRoZSBvdGhlciwgYW5kIHRoZW4gZW1pdHMgYSBjb21wbGV0ZSBub3RpZmljYXRpb24uXG4gICAgICpcbiAgICAgKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+RW1pdHMgdGhlIGFyZ3VtZW50cyB5b3UgcHJvdmlkZSwgdGhlbiBjb21wbGV0ZXMuXG4gICAgICogPC9zcGFuPlxuICAgICAqXG4gICAgICogPGltZyBzcmM9XCIuL2ltZy9vZi5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAgICAgKlxuICAgICAqIFRoaXMgc3RhdGljIG9wZXJhdG9yIGlzIHVzZWZ1bCBmb3IgY3JlYXRpbmcgYSBzaW1wbGUgT2JzZXJ2YWJsZSB0aGF0IG9ubHlcbiAgICAgKiBlbWl0cyB0aGUgYXJndW1lbnRzIGdpdmVuLCBhbmQgdGhlIGNvbXBsZXRlIG5vdGlmaWNhdGlvbiB0aGVyZWFmdGVyLiBJdCBjYW5cbiAgICAgKiBiZSB1c2VkIGZvciBjb21wb3Npbmcgd2l0aCBvdGhlciBPYnNlcnZhYmxlcywgc3VjaCBhcyB3aXRoIHtAbGluayBjb25jYXR9LlxuICAgICAqIEJ5IGRlZmF1bHQsIGl0IHVzZXMgYSBgbnVsbGAgU2NoZWR1bGVyLCB3aGljaCBtZWFucyB0aGUgYG5leHRgXG4gICAgICogbm90aWZpY2F0aW9ucyBhcmUgc2VudCBzeW5jaHJvbm91c2x5LCBhbHRob3VnaCB3aXRoIGEgZGlmZmVyZW50IFNjaGVkdWxlclxuICAgICAqIGl0IGlzIHBvc3NpYmxlIHRvIGRldGVybWluZSB3aGVuIHRob3NlIG5vdGlmaWNhdGlvbnMgd2lsbCBiZSBkZWxpdmVyZWQuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZSA8Y2FwdGlvbj5FbWl0IDEwLCAyMCwgMzAsIHRoZW4gJ2EnLCAnYicsICdjJywgdGhlbiBzdGFydCB0aWNraW5nIGV2ZXJ5IHNlY29uZC48L2NhcHRpb24+XG4gICAgICogdmFyIG51bWJlcnMgPSBSeC5PYnNlcnZhYmxlLm9mKDEwLCAyMCwgMzApO1xuICAgICAqIHZhciBsZXR0ZXJzID0gUnguT2JzZXJ2YWJsZS5vZignYScsICdiJywgJ2MnKTtcbiAgICAgKiB2YXIgaW50ZXJ2YWwgPSBSeC5PYnNlcnZhYmxlLmludGVydmFsKDEwMDApO1xuICAgICAqIHZhciByZXN1bHQgPSBudW1iZXJzLmNvbmNhdChsZXR0ZXJzKS5jb25jYXQoaW50ZXJ2YWwpO1xuICAgICAqIHJlc3VsdC5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gICAgICpcbiAgICAgKiBAc2VlIHtAbGluayBjcmVhdGV9XG4gICAgICogQHNlZSB7QGxpbmsgZW1wdHl9XG4gICAgICogQHNlZSB7QGxpbmsgbmV2ZXJ9XG4gICAgICogQHNlZSB7QGxpbmsgdGhyb3d9XG4gICAgICpcbiAgICAgKiBAcGFyYW0gey4uLlR9IHZhbHVlcyBBcmd1bWVudHMgdGhhdCByZXByZXNlbnQgYG5leHRgIHZhbHVlcyB0byBiZSBlbWl0dGVkLlxuICAgICAqIEBwYXJhbSB7U2NoZWR1bGVyfSBbc2NoZWR1bGVyXSBBIHtAbGluayBTY2hlZHVsZXJ9IHRvIHVzZSBmb3Igc2NoZWR1bGluZ1xuICAgICAqIHRoZSBlbWlzc2lvbnMgb2YgdGhlIGBuZXh0YCBub3RpZmljYXRpb25zLlxuICAgICAqIEByZXR1cm4ge09ic2VydmFibGU8VD59IEFuIE9ic2VydmFibGUgdGhhdCBlbWl0cyBlYWNoIGdpdmVuIGlucHV0IHZhbHVlLlxuICAgICAqIEBzdGF0aWMgdHJ1ZVxuICAgICAqIEBuYW1lIG9mXG4gICAgICogQG93bmVyIE9ic2VydmFibGVcbiAgICAgKi9cbiAgICBzdGF0aWMgb2YoLi4uYXJyYXkpIHtcbiAgICAgICAgbGV0IHNjaGVkdWxlciA9IGFycmF5W2FycmF5Lmxlbmd0aCAtIDFdO1xuICAgICAgICBpZiAoaXNTY2hlZHVsZXIoc2NoZWR1bGVyKSkge1xuICAgICAgICAgICAgYXJyYXkucG9wKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzY2hlZHVsZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGxlbiA9IGFycmF5Lmxlbmd0aDtcbiAgICAgICAgaWYgKGxlbiA+IDEpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgQXJyYXlPYnNlcnZhYmxlKGFycmF5LCBzY2hlZHVsZXIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGxlbiA9PT0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBTY2FsYXJPYnNlcnZhYmxlKGFycmF5WzBdLCBzY2hlZHVsZXIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbXB0eU9ic2VydmFibGUoc2NoZWR1bGVyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgZGlzcGF0Y2goc3RhdGUpIHtcbiAgICAgICAgY29uc3QgeyBhcnJheSwgaW5kZXgsIGNvdW50LCBzdWJzY3JpYmVyIH0gPSBzdGF0ZTtcbiAgICAgICAgaWYgKGluZGV4ID49IGNvdW50KSB7XG4gICAgICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc3Vic2NyaWJlci5uZXh0KGFycmF5W2luZGV4XSk7XG4gICAgICAgIGlmIChzdWJzY3JpYmVyLmNsb3NlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHN0YXRlLmluZGV4ID0gaW5kZXggKyAxO1xuICAgICAgICB0aGlzLnNjaGVkdWxlKHN0YXRlKTtcbiAgICB9XG4gICAgX3N1YnNjcmliZShzdWJzY3JpYmVyKSB7XG4gICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgIGNvbnN0IGFycmF5ID0gdGhpcy5hcnJheTtcbiAgICAgICAgY29uc3QgY291bnQgPSBhcnJheS5sZW5ndGg7XG4gICAgICAgIGNvbnN0IHNjaGVkdWxlciA9IHRoaXMuc2NoZWR1bGVyO1xuICAgICAgICBpZiAoc2NoZWR1bGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gc2NoZWR1bGVyLnNjaGVkdWxlKEFycmF5T2JzZXJ2YWJsZS5kaXNwYXRjaCwgMCwge1xuICAgICAgICAgICAgICAgIGFycmF5LCBpbmRleCwgY291bnQsIHN1YnNjcmliZXJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudCAmJiAhc3Vic2NyaWJlci5jbG9zZWQ7IGkrKykge1xuICAgICAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dChhcnJheVtpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1BcnJheU9ic2VydmFibGUuanMubWFwIiwiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKiBAaGlkZSB0cnVlXG4gKi9cbmV4cG9ydCBjbGFzcyBFbXB0eU9ic2VydmFibGUgZXh0ZW5kcyBPYnNlcnZhYmxlIHtcbiAgICBjb25zdHJ1Y3RvcihzY2hlZHVsZXIpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZXIgPSBzY2hlZHVsZXI7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIG5vIGl0ZW1zIHRvIHRoZSBPYnNlcnZlciBhbmQgaW1tZWRpYXRlbHlcbiAgICAgKiBlbWl0cyBhIGNvbXBsZXRlIG5vdGlmaWNhdGlvbi5cbiAgICAgKlxuICAgICAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5KdXN0IGVtaXRzICdjb21wbGV0ZScsIGFuZCBub3RoaW5nIGVsc2UuXG4gICAgICogPC9zcGFuPlxuICAgICAqXG4gICAgICogPGltZyBzcmM9XCIuL2ltZy9lbXB0eS5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAgICAgKlxuICAgICAqIFRoaXMgc3RhdGljIG9wZXJhdG9yIGlzIHVzZWZ1bCBmb3IgY3JlYXRpbmcgYSBzaW1wbGUgT2JzZXJ2YWJsZSB0aGF0IG9ubHlcbiAgICAgKiBlbWl0cyB0aGUgY29tcGxldGUgbm90aWZpY2F0aW9uLiBJdCBjYW4gYmUgdXNlZCBmb3IgY29tcG9zaW5nIHdpdGggb3RoZXJcbiAgICAgKiBPYnNlcnZhYmxlcywgc3VjaCBhcyBpbiBhIHtAbGluayBtZXJnZU1hcH0uXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZSA8Y2FwdGlvbj5FbWl0IHRoZSBudW1iZXIgNywgdGhlbiBjb21wbGV0ZS48L2NhcHRpb24+XG4gICAgICogdmFyIHJlc3VsdCA9IFJ4Lk9ic2VydmFibGUuZW1wdHkoKS5zdGFydFdpdGgoNyk7XG4gICAgICogcmVzdWx0LnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAgICAgKlxuICAgICAqIEBleGFtcGxlIDxjYXB0aW9uPk1hcCBhbmQgZmxhdHRlbiBvbmx5IG9kZCBudW1iZXJzIHRvIHRoZSBzZXF1ZW5jZSAnYScsICdiJywgJ2MnPC9jYXB0aW9uPlxuICAgICAqIHZhciBpbnRlcnZhbCA9IFJ4Lk9ic2VydmFibGUuaW50ZXJ2YWwoMTAwMCk7XG4gICAgICogdmFyIHJlc3VsdCA9IGludGVydmFsLm1lcmdlTWFwKHggPT5cbiAgICAgKiAgIHggJSAyID09PSAxID8gUnguT2JzZXJ2YWJsZS5vZignYScsICdiJywgJ2MnKSA6IFJ4Lk9ic2VydmFibGUuZW1wdHkoKVxuICAgICAqICk7XG4gICAgICogcmVzdWx0LnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAgICAgKlxuICAgICAqIEBzZWUge0BsaW5rIGNyZWF0ZX1cbiAgICAgKiBAc2VlIHtAbGluayBuZXZlcn1cbiAgICAgKiBAc2VlIHtAbGluayBvZn1cbiAgICAgKiBAc2VlIHtAbGluayB0aHJvd31cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U2NoZWR1bGVyfSBbc2NoZWR1bGVyXSBBIHtAbGluayBTY2hlZHVsZXJ9IHRvIHVzZSBmb3Igc2NoZWR1bGluZ1xuICAgICAqIHRoZSBlbWlzc2lvbiBvZiB0aGUgY29tcGxldGUgbm90aWZpY2F0aW9uLlxuICAgICAqIEByZXR1cm4ge09ic2VydmFibGV9IEFuIFwiZW1wdHlcIiBPYnNlcnZhYmxlOiBlbWl0cyBvbmx5IHRoZSBjb21wbGV0ZVxuICAgICAqIG5vdGlmaWNhdGlvbi5cbiAgICAgKiBAc3RhdGljIHRydWVcbiAgICAgKiBAbmFtZSBlbXB0eVxuICAgICAqIEBvd25lciBPYnNlcnZhYmxlXG4gICAgICovXG4gICAgc3RhdGljIGNyZWF0ZShzY2hlZHVsZXIpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBFbXB0eU9ic2VydmFibGUoc2NoZWR1bGVyKTtcbiAgICB9XG4gICAgc3RhdGljIGRpc3BhdGNoKGFyZykge1xuICAgICAgICBjb25zdCB7IHN1YnNjcmliZXIgfSA9IGFyZztcbiAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgIH1cbiAgICBfc3Vic2NyaWJlKHN1YnNjcmliZXIpIHtcbiAgICAgICAgY29uc3Qgc2NoZWR1bGVyID0gdGhpcy5zY2hlZHVsZXI7XG4gICAgICAgIGlmIChzY2hlZHVsZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBzY2hlZHVsZXIuc2NoZWR1bGUoRW1wdHlPYnNlcnZhYmxlLmRpc3BhdGNoLCAwLCB7IHN1YnNjcmliZXIgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1FbXB0eU9ic2VydmFibGUuanMubWFwIiwiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgdHJ5Q2F0Y2ggfSBmcm9tICcuLi91dGlsL3RyeUNhdGNoJztcbmltcG9ydCB7IGlzRnVuY3Rpb24gfSBmcm9tICcuLi91dGlsL2lzRnVuY3Rpb24nO1xuaW1wb3J0IHsgZXJyb3JPYmplY3QgfSBmcm9tICcuLi91dGlsL2Vycm9yT2JqZWN0JztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJy4uL1N1YnNjcmlwdGlvbic7XG5mdW5jdGlvbiBpc05vZGVTdHlsZUV2ZW50RW1taXR0ZXIoc291cmNlT2JqKSB7XG4gICAgcmV0dXJuICEhc291cmNlT2JqICYmIHR5cGVvZiBzb3VyY2VPYmouYWRkTGlzdGVuZXIgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIHNvdXJjZU9iai5yZW1vdmVMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJztcbn1cbmZ1bmN0aW9uIGlzSlF1ZXJ5U3R5bGVFdmVudEVtaXR0ZXIoc291cmNlT2JqKSB7XG4gICAgcmV0dXJuICEhc291cmNlT2JqICYmIHR5cGVvZiBzb3VyY2VPYmoub24gPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIHNvdXJjZU9iai5vZmYgPT09ICdmdW5jdGlvbic7XG59XG5mdW5jdGlvbiBpc05vZGVMaXN0KHNvdXJjZU9iaikge1xuICAgIHJldHVybiAhIXNvdXJjZU9iaiAmJiBzb3VyY2VPYmoudG9TdHJpbmcoKSA9PT0gJ1tvYmplY3QgTm9kZUxpc3RdJztcbn1cbmZ1bmN0aW9uIGlzSFRNTENvbGxlY3Rpb24oc291cmNlT2JqKSB7XG4gICAgcmV0dXJuICEhc291cmNlT2JqICYmIHNvdXJjZU9iai50b1N0cmluZygpID09PSAnW29iamVjdCBIVE1MQ29sbGVjdGlvbl0nO1xufVxuZnVuY3Rpb24gaXNFdmVudFRhcmdldChzb3VyY2VPYmopIHtcbiAgICByZXR1cm4gISFzb3VyY2VPYmogJiYgdHlwZW9mIHNvdXJjZU9iai5hZGRFdmVudExpc3RlbmVyID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBzb3VyY2VPYmoucmVtb3ZlRXZlbnRMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJztcbn1cbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICogQGhpZGUgdHJ1ZVxuICovXG5leHBvcnQgY2xhc3MgRnJvbUV2ZW50T2JzZXJ2YWJsZSBleHRlbmRzIE9ic2VydmFibGUge1xuICAgIGNvbnN0cnVjdG9yKHNvdXJjZU9iaiwgZXZlbnROYW1lLCBzZWxlY3Rvciwgb3B0aW9ucykge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnNvdXJjZU9iaiA9IHNvdXJjZU9iajtcbiAgICAgICAgdGhpcy5ldmVudE5hbWUgPSBldmVudE5hbWU7XG4gICAgICAgIHRoaXMuc2VsZWN0b3IgPSBzZWxlY3RvcjtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICB9XG4gICAgLyogdHNsaW50OmVuYWJsZTptYXgtbGluZS1sZW5ndGggKi9cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIE9ic2VydmFibGUgdGhhdCBlbWl0cyBldmVudHMgb2YgYSBzcGVjaWZpYyB0eXBlIGNvbWluZyBmcm9tIHRoZVxuICAgICAqIGdpdmVuIGV2ZW50IHRhcmdldC5cbiAgICAgKlxuICAgICAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5DcmVhdGVzIGFuIE9ic2VydmFibGUgZnJvbSBET00gZXZlbnRzLCBvciBOb2RlXG4gICAgICogRXZlbnRFbWl0dGVyIGV2ZW50cyBvciBvdGhlcnMuPC9zcGFuPlxuICAgICAqXG4gICAgICogPGltZyBzcmM9XCIuL2ltZy9mcm9tRXZlbnQucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gICAgICpcbiAgICAgKiBDcmVhdGVzIGFuIE9ic2VydmFibGUgYnkgYXR0YWNoaW5nIGFuIGV2ZW50IGxpc3RlbmVyIHRvIGFuIFwiZXZlbnQgdGFyZ2V0XCIsXG4gICAgICogd2hpY2ggbWF5IGJlIGFuIG9iamVjdCB3aXRoIGBhZGRFdmVudExpc3RlbmVyYCBhbmQgYHJlbW92ZUV2ZW50TGlzdGVuZXJgLFxuICAgICAqIGEgTm9kZS5qcyBFdmVudEVtaXR0ZXIsIGEgalF1ZXJ5IHN0eWxlIEV2ZW50RW1pdHRlciwgYSBOb2RlTGlzdCBmcm9tIHRoZVxuICAgICAqIERPTSwgb3IgYW4gSFRNTENvbGxlY3Rpb24gZnJvbSB0aGUgRE9NLiBUaGUgZXZlbnQgaGFuZGxlciBpcyBhdHRhY2hlZCB3aGVuXG4gICAgICogdGhlIG91dHB1dCBPYnNlcnZhYmxlIGlzIHN1YnNjcmliZWQsIGFuZCByZW1vdmVkIHdoZW4gdGhlIFN1YnNjcmlwdGlvbiBpc1xuICAgICAqIHVuc3Vic2NyaWJlZC5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlIDxjYXB0aW9uPkVtaXRzIGNsaWNrcyBoYXBwZW5pbmcgb24gdGhlIERPTSBkb2N1bWVudDwvY2FwdGlvbj5cbiAgICAgKiB2YXIgY2xpY2tzID0gUnguT2JzZXJ2YWJsZS5mcm9tRXZlbnQoZG9jdW1lbnQsICdjbGljaycpO1xuICAgICAqIGNsaWNrcy5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gICAgICpcbiAgICAgKiBAc2VlIHtAbGluayBmcm9tfVxuICAgICAqIEBzZWUge0BsaW5rIGZyb21FdmVudFBhdHRlcm59XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0V2ZW50VGFyZ2V0TGlrZX0gdGFyZ2V0IFRoZSBET01FbGVtZW50LCBldmVudCB0YXJnZXQsIE5vZGUuanNcbiAgICAgKiBFdmVudEVtaXR0ZXIsIE5vZGVMaXN0IG9yIEhUTUxDb2xsZWN0aW9uIHRvIGF0dGFjaCB0aGUgZXZlbnQgaGFuZGxlciB0by5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnROYW1lIFRoZSBldmVudCBuYW1lIG9mIGludGVyZXN0LCBiZWluZyBlbWl0dGVkIGJ5IHRoZVxuICAgICAqIGB0YXJnZXRgLlxuICAgICAqIEBwYXJtIHtFdmVudExpc3RlbmVyT3B0aW9uc30gW29wdGlvbnNdIE9wdGlvbnMgdG8gcGFzcyB0aHJvdWdoIHRvIGFkZEV2ZW50TGlzdGVuZXJcbiAgICAgKiBAcGFyYW0ge1NlbGVjdG9yTWV0aG9kU2lnbmF0dXJlPFQ+fSBbc2VsZWN0b3JdIEFuIG9wdGlvbmFsIGZ1bmN0aW9uIHRvXG4gICAgICogcG9zdC1wcm9jZXNzIHJlc3VsdHMuIEl0IHRha2VzIHRoZSBhcmd1bWVudHMgZnJvbSB0aGUgZXZlbnQgaGFuZGxlciBhbmRcbiAgICAgKiBzaG91bGQgcmV0dXJuIGEgc2luZ2xlIHZhbHVlLlxuICAgICAqIEByZXR1cm4ge09ic2VydmFibGU8VD59XG4gICAgICogQHN0YXRpYyB0cnVlXG4gICAgICogQG5hbWUgZnJvbUV2ZW50XG4gICAgICogQG93bmVyIE9ic2VydmFibGVcbiAgICAgKi9cbiAgICBzdGF0aWMgY3JlYXRlKHRhcmdldCwgZXZlbnROYW1lLCBvcHRpb25zLCBzZWxlY3Rvcikge1xuICAgICAgICBpZiAoaXNGdW5jdGlvbihvcHRpb25zKSkge1xuICAgICAgICAgICAgc2VsZWN0b3IgPSBvcHRpb25zO1xuICAgICAgICAgICAgb3B0aW9ucyA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IEZyb21FdmVudE9ic2VydmFibGUodGFyZ2V0LCBldmVudE5hbWUsIHNlbGVjdG9yLCBvcHRpb25zKTtcbiAgICB9XG4gICAgc3RhdGljIHNldHVwU3Vic2NyaXB0aW9uKHNvdXJjZU9iaiwgZXZlbnROYW1lLCBoYW5kbGVyLCBzdWJzY3JpYmVyLCBvcHRpb25zKSB7XG4gICAgICAgIGxldCB1bnN1YnNjcmliZTtcbiAgICAgICAgaWYgKGlzTm9kZUxpc3Qoc291cmNlT2JqKSB8fCBpc0hUTUxDb2xsZWN0aW9uKHNvdXJjZU9iaikpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBzb3VyY2VPYmoubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICBGcm9tRXZlbnRPYnNlcnZhYmxlLnNldHVwU3Vic2NyaXB0aW9uKHNvdXJjZU9ialtpXSwgZXZlbnROYW1lLCBoYW5kbGVyLCBzdWJzY3JpYmVyLCBvcHRpb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpc0V2ZW50VGFyZ2V0KHNvdXJjZU9iaikpIHtcbiAgICAgICAgICAgIGNvbnN0IHNvdXJjZSA9IHNvdXJjZU9iajtcbiAgICAgICAgICAgIHNvdXJjZU9iai5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgaGFuZGxlciwgb3B0aW9ucyk7XG4gICAgICAgICAgICB1bnN1YnNjcmliZSA9ICgpID0+IHNvdXJjZS5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgaGFuZGxlcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaXNKUXVlcnlTdHlsZUV2ZW50RW1pdHRlcihzb3VyY2VPYmopKSB7XG4gICAgICAgICAgICBjb25zdCBzb3VyY2UgPSBzb3VyY2VPYmo7XG4gICAgICAgICAgICBzb3VyY2VPYmoub24oZXZlbnROYW1lLCBoYW5kbGVyKTtcbiAgICAgICAgICAgIHVuc3Vic2NyaWJlID0gKCkgPT4gc291cmNlLm9mZihldmVudE5hbWUsIGhhbmRsZXIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGlzTm9kZVN0eWxlRXZlbnRFbW1pdHRlcihzb3VyY2VPYmopKSB7XG4gICAgICAgICAgICBjb25zdCBzb3VyY2UgPSBzb3VyY2VPYmo7XG4gICAgICAgICAgICBzb3VyY2VPYmouYWRkTGlzdGVuZXIoZXZlbnROYW1lLCBoYW5kbGVyKTtcbiAgICAgICAgICAgIHVuc3Vic2NyaWJlID0gKCkgPT4gc291cmNlLnJlbW92ZUxpc3RlbmVyKGV2ZW50TmFtZSwgaGFuZGxlcik7XG4gICAgICAgIH1cbiAgICAgICAgc3Vic2NyaWJlci5hZGQobmV3IFN1YnNjcmlwdGlvbih1bnN1YnNjcmliZSkpO1xuICAgIH1cbiAgICBfc3Vic2NyaWJlKHN1YnNjcmliZXIpIHtcbiAgICAgICAgY29uc3Qgc291cmNlT2JqID0gdGhpcy5zb3VyY2VPYmo7XG4gICAgICAgIGNvbnN0IGV2ZW50TmFtZSA9IHRoaXMuZXZlbnROYW1lO1xuICAgICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuICAgICAgICBjb25zdCBzZWxlY3RvciA9IHRoaXMuc2VsZWN0b3I7XG4gICAgICAgIGxldCBoYW5kbGVyID0gc2VsZWN0b3IgPyAoLi4uYXJncykgPT4ge1xuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHRyeUNhdGNoKHNlbGVjdG9yKSguLi5hcmdzKTtcbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IGVycm9yT2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgc3Vic2NyaWJlci5lcnJvcihlcnJvck9iamVjdC5lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dChyZXN1bHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IDogKGUpID0+IHN1YnNjcmliZXIubmV4dChlKTtcbiAgICAgICAgRnJvbUV2ZW50T2JzZXJ2YWJsZS5zZXR1cFN1YnNjcmlwdGlvbihzb3VyY2VPYmosIGV2ZW50TmFtZSwgaGFuZGxlciwgc3Vic2NyaWJlciwgb3B0aW9ucyk7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9RnJvbUV2ZW50T2JzZXJ2YWJsZS5qcy5tYXAiLCJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqIEBoaWRlIHRydWVcbiAqL1xuZXhwb3J0IGNsYXNzIFNjYWxhck9ic2VydmFibGUgZXh0ZW5kcyBPYnNlcnZhYmxlIHtcbiAgICBjb25zdHJ1Y3Rvcih2YWx1ZSwgc2NoZWR1bGVyKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZXIgPSBzY2hlZHVsZXI7XG4gICAgICAgIHRoaXMuX2lzU2NhbGFyID0gdHJ1ZTtcbiAgICAgICAgaWYgKHNjaGVkdWxlcikge1xuICAgICAgICAgICAgdGhpcy5faXNTY2FsYXIgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgY3JlYXRlKHZhbHVlLCBzY2hlZHVsZXIpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTY2FsYXJPYnNlcnZhYmxlKHZhbHVlLCBzY2hlZHVsZXIpO1xuICAgIH1cbiAgICBzdGF0aWMgZGlzcGF0Y2goc3RhdGUpIHtcbiAgICAgICAgY29uc3QgeyBkb25lLCB2YWx1ZSwgc3Vic2NyaWJlciB9ID0gc3RhdGU7XG4gICAgICAgIGlmIChkb25lKSB7XG4gICAgICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc3Vic2NyaWJlci5uZXh0KHZhbHVlKTtcbiAgICAgICAgaWYgKHN1YnNjcmliZXIuY2xvc2VkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc3RhdGUuZG9uZSA9IHRydWU7XG4gICAgICAgIHRoaXMuc2NoZWR1bGUoc3RhdGUpO1xuICAgIH1cbiAgICBfc3Vic2NyaWJlKHN1YnNjcmliZXIpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLnZhbHVlO1xuICAgICAgICBjb25zdCBzY2hlZHVsZXIgPSB0aGlzLnNjaGVkdWxlcjtcbiAgICAgICAgaWYgKHNjaGVkdWxlcikge1xuICAgICAgICAgICAgcmV0dXJuIHNjaGVkdWxlci5zY2hlZHVsZShTY2FsYXJPYnNlcnZhYmxlLmRpc3BhdGNoLCAwLCB7XG4gICAgICAgICAgICAgICAgZG9uZTogZmFsc2UsIHZhbHVlLCBzdWJzY3JpYmVyXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dCh2YWx1ZSk7XG4gICAgICAgICAgICBpZiAoIXN1YnNjcmliZXIuY2xvc2VkKSB7XG4gICAgICAgICAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9U2NhbGFyT2JzZXJ2YWJsZS5qcy5tYXAiLCJpbXBvcnQgeyByb290IH0gZnJvbSAnLi4vLi4vdXRpbC9yb290JztcbmltcG9ydCB7IHRyeUNhdGNoIH0gZnJvbSAnLi4vLi4vdXRpbC90cnlDYXRjaCc7XG5pbXBvcnQgeyBlcnJvck9iamVjdCB9IGZyb20gJy4uLy4uL3V0aWwvZXJyb3JPYmplY3QnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uLy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4uLy4uL1N1YnNjcmliZXInO1xuaW1wb3J0IHsgTWFwT3BlcmF0b3IgfSBmcm9tICcuLi8uLi9vcGVyYXRvci9tYXAnO1xuZnVuY3Rpb24gZ2V0Q09SU1JlcXVlc3QoKSB7XG4gICAgaWYgKHJvb3QuWE1MSHR0cFJlcXVlc3QpIHtcbiAgICAgICAgY29uc3QgeGhyID0gbmV3IHJvb3QuWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgaWYgKCd3aXRoQ3JlZGVudGlhbHMnIGluIHhocikge1xuICAgICAgICAgICAgeGhyLndpdGhDcmVkZW50aWFscyA9ICEhdGhpcy53aXRoQ3JlZGVudGlhbHM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHhocjtcbiAgICB9XG4gICAgZWxzZSBpZiAoISFyb290LlhEb21haW5SZXF1ZXN0KSB7XG4gICAgICAgIHJldHVybiBuZXcgcm9vdC5YRG9tYWluUmVxdWVzdCgpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDT1JTIGlzIG5vdCBzdXBwb3J0ZWQgYnkgeW91ciBicm93c2VyJyk7XG4gICAgfVxufVxuZnVuY3Rpb24gZ2V0WE1MSHR0cFJlcXVlc3QoKSB7XG4gICAgaWYgKHJvb3QuWE1MSHR0cFJlcXVlc3QpIHtcbiAgICAgICAgcmV0dXJuIG5ldyByb290LlhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBsZXQgcHJvZ0lkO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcHJvZ0lkcyA9IFsnTXN4bWwyLlhNTEhUVFAnLCAnTWljcm9zb2Z0LlhNTEhUVFAnLCAnTXN4bWwyLlhNTEhUVFAuNC4wJ107XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHByb2dJZCA9IHByb2dJZHNbaV07XG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXcgcm9vdC5BY3RpdmVYT2JqZWN0KHByb2dJZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5ldyByb290LkFjdGl2ZVhPYmplY3QocHJvZ0lkKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdYTUxIdHRwUmVxdWVzdCBpcyBub3Qgc3VwcG9ydGVkIGJ5IHlvdXIgYnJvd3NlcicpO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGFqYXhHZXQodXJsLCBoZWFkZXJzID0gbnVsbCkge1xuICAgIHJldHVybiBuZXcgQWpheE9ic2VydmFibGUoeyBtZXRob2Q6ICdHRVQnLCB1cmwsIGhlYWRlcnMgfSk7XG59XG47XG5leHBvcnQgZnVuY3Rpb24gYWpheFBvc3QodXJsLCBib2R5LCBoZWFkZXJzKSB7XG4gICAgcmV0dXJuIG5ldyBBamF4T2JzZXJ2YWJsZSh7IG1ldGhvZDogJ1BPU1QnLCB1cmwsIGJvZHksIGhlYWRlcnMgfSk7XG59XG47XG5leHBvcnQgZnVuY3Rpb24gYWpheERlbGV0ZSh1cmwsIGhlYWRlcnMpIHtcbiAgICByZXR1cm4gbmV3IEFqYXhPYnNlcnZhYmxlKHsgbWV0aG9kOiAnREVMRVRFJywgdXJsLCBoZWFkZXJzIH0pO1xufVxuO1xuZXhwb3J0IGZ1bmN0aW9uIGFqYXhQdXQodXJsLCBib2R5LCBoZWFkZXJzKSB7XG4gICAgcmV0dXJuIG5ldyBBamF4T2JzZXJ2YWJsZSh7IG1ldGhvZDogJ1BVVCcsIHVybCwgYm9keSwgaGVhZGVycyB9KTtcbn1cbjtcbmV4cG9ydCBmdW5jdGlvbiBhamF4R2V0SlNPTih1cmwsIGhlYWRlcnMpIHtcbiAgICByZXR1cm4gbmV3IEFqYXhPYnNlcnZhYmxlKHsgbWV0aG9kOiAnR0VUJywgdXJsLCByZXNwb25zZVR5cGU6ICdqc29uJywgaGVhZGVycyB9KVxuICAgICAgICAubGlmdChuZXcgTWFwT3BlcmF0b3IoKHgsIGluZGV4KSA9PiB4LnJlc3BvbnNlLCBudWxsKSk7XG59XG47XG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqIEBoaWRlIHRydWVcbiAqL1xuZXhwb3J0IGNsYXNzIEFqYXhPYnNlcnZhYmxlIGV4dGVuZHMgT2JzZXJ2YWJsZSB7XG4gICAgY29uc3RydWN0b3IodXJsT3JSZXF1ZXN0KSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIGNvbnN0IHJlcXVlc3QgPSB7XG4gICAgICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgICAgIGNyZWF0ZVhIUjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNyb3NzRG9tYWluID8gZ2V0Q09SU1JlcXVlc3QuY2FsbCh0aGlzKSA6IGdldFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY3Jvc3NEb21haW46IGZhbHNlLFxuICAgICAgICAgICAgd2l0aENyZWRlbnRpYWxzOiBmYWxzZSxcbiAgICAgICAgICAgIGhlYWRlcnM6IHt9LFxuICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgIHJlc3BvbnNlVHlwZTogJ2pzb24nLFxuICAgICAgICAgICAgdGltZW91dDogMFxuICAgICAgICB9O1xuICAgICAgICBpZiAodHlwZW9mIHVybE9yUmVxdWVzdCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHJlcXVlc3QudXJsID0gdXJsT3JSZXF1ZXN0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZm9yIChjb25zdCBwcm9wIGluIHVybE9yUmVxdWVzdCkge1xuICAgICAgICAgICAgICAgIGlmICh1cmxPclJlcXVlc3QuaGFzT3duUHJvcGVydHkocHJvcCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdFtwcm9wXSA9IHVybE9yUmVxdWVzdFtwcm9wXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICB9XG4gICAgX3N1YnNjcmliZShzdWJzY3JpYmVyKSB7XG4gICAgICAgIHJldHVybiBuZXcgQWpheFN1YnNjcmliZXIoc3Vic2NyaWJlciwgdGhpcy5yZXF1ZXN0KTtcbiAgICB9XG59XG4vKipcbiAqIENyZWF0ZXMgYW4gb2JzZXJ2YWJsZSBmb3IgYW4gQWpheCByZXF1ZXN0IHdpdGggZWl0aGVyIGEgcmVxdWVzdCBvYmplY3Qgd2l0aFxuICogdXJsLCBoZWFkZXJzLCBldGMgb3IgYSBzdHJpbmcgZm9yIGEgVVJMLlxuICpcbiAqIEBleGFtcGxlXG4gKiBzb3VyY2UgPSBSeC5PYnNlcnZhYmxlLmFqYXgoJy9wcm9kdWN0cycpO1xuICogc291cmNlID0gUnguT2JzZXJ2YWJsZS5hamF4KHsgdXJsOiAncHJvZHVjdHMnLCBtZXRob2Q6ICdHRVQnIH0pO1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfE9iamVjdH0gcmVxdWVzdCBDYW4gYmUgb25lIG9mIHRoZSBmb2xsb3dpbmc6XG4gKiAgIEEgc3RyaW5nIG9mIHRoZSBVUkwgdG8gbWFrZSB0aGUgQWpheCBjYWxsLlxuICogICBBbiBvYmplY3Qgd2l0aCB0aGUgZm9sbG93aW5nIHByb3BlcnRpZXNcbiAqICAgLSB1cmw6IFVSTCBvZiB0aGUgcmVxdWVzdFxuICogICAtIGJvZHk6IFRoZSBib2R5IG9mIHRoZSByZXF1ZXN0XG4gKiAgIC0gbWV0aG9kOiBNZXRob2Qgb2YgdGhlIHJlcXVlc3QsIHN1Y2ggYXMgR0VULCBQT1NULCBQVVQsIFBBVENILCBERUxFVEVcbiAqICAgLSBhc3luYzogV2hldGhlciB0aGUgcmVxdWVzdCBpcyBhc3luY1xuICogICAtIGhlYWRlcnM6IE9wdGlvbmFsIGhlYWRlcnNcbiAqICAgLSBjcm9zc0RvbWFpbjogdHJ1ZSBpZiBhIGNyb3NzIGRvbWFpbiByZXF1ZXN0LCBlbHNlIGZhbHNlXG4gKiAgIC0gY3JlYXRlWEhSOiBhIGZ1bmN0aW9uIHRvIG92ZXJyaWRlIGlmIHlvdSBuZWVkIHRvIHVzZSBhbiBhbHRlcm5hdGVcbiAqICAgWE1MSHR0cFJlcXVlc3QgaW1wbGVtZW50YXRpb24uXG4gKiAgIC0gcmVzdWx0U2VsZWN0b3I6IGEgZnVuY3Rpb24gdG8gdXNlIHRvIGFsdGVyIHRoZSBvdXRwdXQgdmFsdWUgdHlwZSBvZlxuICogICB0aGUgT2JzZXJ2YWJsZS4gR2V0cyB7QGxpbmsgQWpheFJlc3BvbnNlfSBhcyBhbiBhcmd1bWVudC5cbiAqIEByZXR1cm4ge09ic2VydmFibGV9IEFuIG9ic2VydmFibGUgc2VxdWVuY2UgY29udGFpbmluZyB0aGUgWE1MSHR0cFJlcXVlc3QuXG4gKiBAc3RhdGljIHRydWVcbiAqIEBuYW1lIGFqYXhcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4qL1xuQWpheE9ic2VydmFibGUuY3JlYXRlID0gKCgpID0+IHtcbiAgICBjb25zdCBjcmVhdGUgPSAodXJsT3JSZXF1ZXN0KSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgQWpheE9ic2VydmFibGUodXJsT3JSZXF1ZXN0KTtcbiAgICB9O1xuICAgIGNyZWF0ZS5nZXQgPSBhamF4R2V0O1xuICAgIGNyZWF0ZS5wb3N0ID0gYWpheFBvc3Q7XG4gICAgY3JlYXRlLmRlbGV0ZSA9IGFqYXhEZWxldGU7XG4gICAgY3JlYXRlLnB1dCA9IGFqYXhQdXQ7XG4gICAgY3JlYXRlLmdldEpTT04gPSBhamF4R2V0SlNPTjtcbiAgICByZXR1cm4gY3JlYXRlO1xufSkoKTtcbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBpZ25vcmVcbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICovXG5leHBvcnQgY2xhc3MgQWpheFN1YnNjcmliZXIgZXh0ZW5kcyBTdWJzY3JpYmVyIHtcbiAgICBjb25zdHJ1Y3RvcihkZXN0aW5hdGlvbiwgcmVxdWVzdCkge1xuICAgICAgICBzdXBlcihkZXN0aW5hdGlvbik7XG4gICAgICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgICAgIHRoaXMuZG9uZSA9IGZhbHNlO1xuICAgICAgICBjb25zdCBoZWFkZXJzID0gcmVxdWVzdC5oZWFkZXJzID0gcmVxdWVzdC5oZWFkZXJzIHx8IHt9O1xuICAgICAgICAvLyBmb3JjZSBDT1JTIGlmIHJlcXVlc3RlZFxuICAgICAgICBpZiAoIXJlcXVlc3QuY3Jvc3NEb21haW4gJiYgIWhlYWRlcnNbJ1gtUmVxdWVzdGVkLVdpdGgnXSkge1xuICAgICAgICAgICAgaGVhZGVyc1snWC1SZXF1ZXN0ZWQtV2l0aCddID0gJ1hNTEh0dHBSZXF1ZXN0JztcbiAgICAgICAgfVxuICAgICAgICAvLyBlbnN1cmUgY29udGVudCB0eXBlIGlzIHNldFxuICAgICAgICBpZiAoISgnQ29udGVudC1UeXBlJyBpbiBoZWFkZXJzKSAmJiAhKHJvb3QuRm9ybURhdGEgJiYgcmVxdWVzdC5ib2R5IGluc3RhbmNlb2Ygcm9vdC5Gb3JtRGF0YSkgJiYgdHlwZW9mIHJlcXVlc3QuYm9keSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddID0gJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDsgY2hhcnNldD1VVEYtOCc7XG4gICAgICAgIH1cbiAgICAgICAgLy8gcHJvcGVybHkgc2VyaWFsaXplIGJvZHlcbiAgICAgICAgcmVxdWVzdC5ib2R5ID0gdGhpcy5zZXJpYWxpemVCb2R5KHJlcXVlc3QuYm9keSwgcmVxdWVzdC5oZWFkZXJzWydDb250ZW50LVR5cGUnXSk7XG4gICAgICAgIHRoaXMuc2VuZCgpO1xuICAgIH1cbiAgICBuZXh0KGUpIHtcbiAgICAgICAgdGhpcy5kb25lID0gdHJ1ZTtcbiAgICAgICAgY29uc3QgeyB4aHIsIHJlcXVlc3QsIGRlc3RpbmF0aW9uIH0gPSB0aGlzO1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IG5ldyBBamF4UmVzcG9uc2UoZSwgeGhyLCByZXF1ZXN0KTtcbiAgICAgICAgZGVzdGluYXRpb24ubmV4dChyZXNwb25zZSk7XG4gICAgfVxuICAgIHNlbmQoKSB7XG4gICAgICAgIGNvbnN0IHsgcmVxdWVzdCwgcmVxdWVzdDogeyB1c2VyLCBtZXRob2QsIHVybCwgYXN5bmMsIHBhc3N3b3JkLCBoZWFkZXJzLCBib2R5IH0gfSA9IHRoaXM7XG4gICAgICAgIGNvbnN0IGNyZWF0ZVhIUiA9IHJlcXVlc3QuY3JlYXRlWEhSO1xuICAgICAgICBjb25zdCB4aHIgPSB0cnlDYXRjaChjcmVhdGVYSFIpLmNhbGwocmVxdWVzdCk7XG4gICAgICAgIGlmICh4aHIgPT09IGVycm9yT2JqZWN0KSB7XG4gICAgICAgICAgICB0aGlzLmVycm9yKGVycm9yT2JqZWN0LmUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy54aHIgPSB4aHI7XG4gICAgICAgICAgICAvLyBvcGVuIFhIUiBmaXJzdFxuICAgICAgICAgICAgbGV0IHJlc3VsdDtcbiAgICAgICAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gdHJ5Q2F0Y2goeGhyLm9wZW4pLmNhbGwoeGhyLCBtZXRob2QsIHVybCwgYXN5bmMsIHVzZXIsIHBhc3N3b3JkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRyeUNhdGNoKHhoci5vcGVuKS5jYWxsKHhociwgbWV0aG9kLCB1cmwsIGFzeW5jKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IGVycm9yT2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvcihlcnJvck9iamVjdC5lKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHRpbWVvdXQgYW5kIHJlc3BvbnNlVHlwZSBjYW4gYmUgc2V0IG9uY2UgdGhlIFhIUiBpcyBvcGVuXG4gICAgICAgICAgICB4aHIudGltZW91dCA9IHJlcXVlc3QudGltZW91dDtcbiAgICAgICAgICAgIHhoci5yZXNwb25zZVR5cGUgPSByZXF1ZXN0LnJlc3BvbnNlVHlwZTtcbiAgICAgICAgICAgIC8vIHNldCBoZWFkZXJzXG4gICAgICAgICAgICB0aGlzLnNldEhlYWRlcnMoeGhyLCBoZWFkZXJzKTtcbiAgICAgICAgICAgIC8vIG5vdyBzZXQgdXAgdGhlIGV2ZW50c1xuICAgICAgICAgICAgdGhpcy5zZXR1cEV2ZW50cyh4aHIsIHJlcXVlc3QpO1xuICAgICAgICAgICAgLy8gZmluYWxseSBzZW5kIHRoZSByZXF1ZXN0XG4gICAgICAgICAgICBpZiAoYm9keSkge1xuICAgICAgICAgICAgICAgIHhoci5zZW5kKGJvZHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgeGhyLnNlbmQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geGhyO1xuICAgIH1cbiAgICBzZXJpYWxpemVCb2R5KGJvZHksIGNvbnRlbnRUeXBlKSB7XG4gICAgICAgIGlmICghYm9keSB8fCB0eXBlb2YgYm9keSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHJldHVybiBib2R5O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHJvb3QuRm9ybURhdGEgJiYgYm9keSBpbnN0YW5jZW9mIHJvb3QuRm9ybURhdGEpIHtcbiAgICAgICAgICAgIHJldHVybiBib2R5O1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb250ZW50VHlwZSkge1xuICAgICAgICAgICAgY29uc3Qgc3BsaXRJbmRleCA9IGNvbnRlbnRUeXBlLmluZGV4T2YoJzsnKTtcbiAgICAgICAgICAgIGlmIChzcGxpdEluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIGNvbnRlbnRUeXBlID0gY29udGVudFR5cGUuc3Vic3RyaW5nKDAsIHNwbGl0SW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHN3aXRjaCAoY29udGVudFR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKGJvZHkpLm1hcChrZXkgPT4gYCR7ZW5jb2RlVVJJKGtleSl9PSR7ZW5jb2RlVVJJKGJvZHlba2V5XSl9YCkuam9pbignJicpO1xuICAgICAgICAgICAgY2FzZSAnYXBwbGljYXRpb24vanNvbic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGJvZHkpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gYm9keTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzZXRIZWFkZXJzKHhociwgaGVhZGVycykge1xuICAgICAgICBmb3IgKGxldCBrZXkgaW4gaGVhZGVycykge1xuICAgICAgICAgICAgaWYgKGhlYWRlcnMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKGtleSwgaGVhZGVyc1trZXldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBzZXR1cEV2ZW50cyh4aHIsIHJlcXVlc3QpIHtcbiAgICAgICAgY29uc3QgcHJvZ3Jlc3NTdWJzY3JpYmVyID0gcmVxdWVzdC5wcm9ncmVzc1N1YnNjcmliZXI7XG4gICAgICAgIHhoci5vbnRpbWVvdXQgPSBmdW5jdGlvbiB4aHJUaW1lb3V0KGUpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgc3Vic2NyaWJlciwgcHJvZ3Jlc3NTdWJzY3JpYmVyLCByZXF1ZXN0IH0gPSB4aHJUaW1lb3V0O1xuICAgICAgICAgICAgaWYgKHByb2dyZXNzU3Vic2NyaWJlcikge1xuICAgICAgICAgICAgICAgIHByb2dyZXNzU3Vic2NyaWJlci5lcnJvcihlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN1YnNjcmliZXIuZXJyb3IobmV3IEFqYXhUaW1lb3V0RXJyb3IodGhpcywgcmVxdWVzdCkpOyAvL1RPRE86IE1ha2UgYmV0dGVyZXIuXG4gICAgICAgIH07XG4gICAgICAgIHhoci5vbnRpbWVvdXQucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgICAgIHhoci5vbnRpbWVvdXQuc3Vic2NyaWJlciA9IHRoaXM7XG4gICAgICAgIHhoci5vbnRpbWVvdXQucHJvZ3Jlc3NTdWJzY3JpYmVyID0gcHJvZ3Jlc3NTdWJzY3JpYmVyO1xuICAgICAgICBpZiAoeGhyLnVwbG9hZCAmJiAnd2l0aENyZWRlbnRpYWxzJyBpbiB4aHIgJiYgcm9vdC5YRG9tYWluUmVxdWVzdCkge1xuICAgICAgICAgICAgaWYgKHByb2dyZXNzU3Vic2NyaWJlcikge1xuICAgICAgICAgICAgICAgIHhoci5vbnByb2dyZXNzID0gZnVuY3Rpb24geGhyUHJvZ3Jlc3MoZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB7IHByb2dyZXNzU3Vic2NyaWJlciB9ID0geGhyUHJvZ3Jlc3M7XG4gICAgICAgICAgICAgICAgICAgIHByb2dyZXNzU3Vic2NyaWJlci5uZXh0KGUpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgeGhyLm9ucHJvZ3Jlc3MucHJvZ3Jlc3NTdWJzY3JpYmVyID0gcHJvZ3Jlc3NTdWJzY3JpYmVyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgeGhyLm9uZXJyb3IgPSBmdW5jdGlvbiB4aHJFcnJvcihlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBwcm9ncmVzc1N1YnNjcmliZXIsIHN1YnNjcmliZXIsIHJlcXVlc3QgfSA9IHhockVycm9yO1xuICAgICAgICAgICAgICAgIGlmIChwcm9ncmVzc1N1YnNjcmliZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3NTdWJzY3JpYmVyLmVycm9yKGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLmVycm9yKG5ldyBBamF4RXJyb3IoJ2FqYXggZXJyb3InLCB0aGlzLCByZXF1ZXN0KSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgeGhyLm9uZXJyb3IucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgICAgICAgICB4aHIub25lcnJvci5zdWJzY3JpYmVyID0gdGhpcztcbiAgICAgICAgICAgIHhoci5vbmVycm9yLnByb2dyZXNzU3Vic2NyaWJlciA9IHByb2dyZXNzU3Vic2NyaWJlcjtcbiAgICAgICAgfVxuICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24geGhyUmVhZHlTdGF0ZUNoYW5nZShlKSB7XG4gICAgICAgICAgICBjb25zdCB7IHN1YnNjcmliZXIsIHByb2dyZXNzU3Vic2NyaWJlciwgcmVxdWVzdCB9ID0geGhyUmVhZHlTdGF0ZUNoYW5nZTtcbiAgICAgICAgICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgPT09IDQpIHtcbiAgICAgICAgICAgICAgICAvLyBub3JtYWxpemUgSUU5IGJ1ZyAoaHR0cDovL2J1Z3MuanF1ZXJ5LmNvbS90aWNrZXQvMTQ1MClcbiAgICAgICAgICAgICAgICBsZXQgc3RhdHVzID0gdGhpcy5zdGF0dXMgPT09IDEyMjMgPyAyMDQgOiB0aGlzLnN0YXR1cztcbiAgICAgICAgICAgICAgICBsZXQgcmVzcG9uc2UgPSAodGhpcy5yZXNwb25zZVR5cGUgPT09ICd0ZXh0JyA/ICh0aGlzLnJlc3BvbnNlIHx8IHRoaXMucmVzcG9uc2VUZXh0KSA6IHRoaXMucmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIC8vIGZpeCBzdGF0dXMgY29kZSB3aGVuIGl0IGlzIDAgKDAgc3RhdHVzIGlzIHVuZG9jdW1lbnRlZCkuXG4gICAgICAgICAgICAgICAgLy8gT2NjdXJzIHdoZW4gYWNjZXNzaW5nIGZpbGUgcmVzb3VyY2VzIG9yIG9uIEFuZHJvaWQgNC4xIHN0b2NrIGJyb3dzZXJcbiAgICAgICAgICAgICAgICAvLyB3aGlsZSByZXRyaWV2aW5nIGZpbGVzIGZyb20gYXBwbGljYXRpb24gY2FjaGUuXG4gICAgICAgICAgICAgICAgaWYgKHN0YXR1cyA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXMgPSByZXNwb25zZSA/IDIwMCA6IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICgyMDAgPD0gc3RhdHVzICYmIHN0YXR1cyA8IDMwMCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocHJvZ3Jlc3NTdWJzY3JpYmVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9ncmVzc1N1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLm5leHQoZSk7XG4gICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9ncmVzc1N1YnNjcmliZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2dyZXNzU3Vic2NyaWJlci5lcnJvcihlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLmVycm9yKG5ldyBBamF4RXJyb3IoJ2FqYXggZXJyb3IgJyArIHN0YXR1cywgdGhpcywgcmVxdWVzdCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZS5zdWJzY3JpYmVyID0gdGhpcztcbiAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZS5wcm9ncmVzc1N1YnNjcmliZXIgPSBwcm9ncmVzc1N1YnNjcmliZXI7XG4gICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgfVxuICAgIHVuc3Vic2NyaWJlKCkge1xuICAgICAgICBjb25zdCB7IGRvbmUsIHhociB9ID0gdGhpcztcbiAgICAgICAgaWYgKCFkb25lICYmIHhociAmJiB4aHIucmVhZHlTdGF0ZSAhPT0gNCkge1xuICAgICAgICAgICAgeGhyLmFib3J0KCk7XG4gICAgICAgIH1cbiAgICAgICAgc3VwZXIudW5zdWJzY3JpYmUoKTtcbiAgICB9XG59XG4vKipcbiAqIEEgbm9ybWFsaXplZCBBSkFYIHJlc3BvbnNlLlxuICpcbiAqIEBzZWUge0BsaW5rIGFqYXh9XG4gKlxuICogQGNsYXNzIEFqYXhSZXNwb25zZVxuICovXG5leHBvcnQgY2xhc3MgQWpheFJlc3BvbnNlIHtcbiAgICBjb25zdHJ1Y3RvcihvcmlnaW5hbEV2ZW50LCB4aHIsIHJlcXVlc3QpIHtcbiAgICAgICAgdGhpcy5vcmlnaW5hbEV2ZW50ID0gb3JpZ2luYWxFdmVudDtcbiAgICAgICAgdGhpcy54aHIgPSB4aHI7XG4gICAgICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgICAgIHRoaXMuc3RhdHVzID0geGhyLnN0YXR1cztcbiAgICAgICAgdGhpcy5yZXNwb25zZVR5cGUgPSB4aHIucmVzcG9uc2VUeXBlIHx8IHJlcXVlc3QucmVzcG9uc2VUeXBlO1xuICAgICAgICBzd2l0Y2ggKHRoaXMucmVzcG9uc2VUeXBlKSB7XG4gICAgICAgICAgICBjYXNlICdqc29uJzpcbiAgICAgICAgICAgICAgICBpZiAoJ3Jlc3BvbnNlJyBpbiB4aHIpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9JRSBkb2VzIG5vdCBzdXBwb3J0IGpzb24gYXMgcmVzcG9uc2VUeXBlLCBwYXJzZSBpdCBpbnRlcm5hbGx5XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzcG9uc2UgPSB4aHIucmVzcG9uc2VUeXBlID8geGhyLnJlc3BvbnNlIDogSlNPTi5wYXJzZSh4aHIucmVzcG9uc2UgfHwgeGhyLnJlc3BvbnNlVGV4dCB8fCAnbnVsbCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNwb25zZSA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCB8fCAnbnVsbCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3htbCc6XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNwb25zZSA9IHhoci5yZXNwb25zZVhNTDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3RleHQnOlxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3BvbnNlID0gKCdyZXNwb25zZScgaW4geGhyKSA/IHhoci5yZXNwb25zZSA6IHhoci5yZXNwb25zZVRleHQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG59XG4vKipcbiAqIEEgbm9ybWFsaXplZCBBSkFYIGVycm9yLlxuICpcbiAqIEBzZWUge0BsaW5rIGFqYXh9XG4gKlxuICogQGNsYXNzIEFqYXhFcnJvclxuICovXG5leHBvcnQgY2xhc3MgQWpheEVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UsIHhociwgcmVxdWVzdCkge1xuICAgICAgICBzdXBlcihtZXNzYWdlKTtcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICAgICAgdGhpcy54aHIgPSB4aHI7XG4gICAgICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgICAgIHRoaXMuc3RhdHVzID0geGhyLnN0YXR1cztcbiAgICB9XG59XG4vKipcbiAqIEBzZWUge0BsaW5rIGFqYXh9XG4gKlxuICogQGNsYXNzIEFqYXhUaW1lb3V0RXJyb3JcbiAqL1xuZXhwb3J0IGNsYXNzIEFqYXhUaW1lb3V0RXJyb3IgZXh0ZW5kcyBBamF4RXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKHhociwgcmVxdWVzdCkge1xuICAgICAgICBzdXBlcignYWpheCB0aW1lb3V0JywgeGhyLCByZXF1ZXN0KTtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1BamF4T2JzZXJ2YWJsZS5qcy5tYXAiLCJpbXBvcnQgeyBBamF4T2JzZXJ2YWJsZSB9IGZyb20gJy4vQWpheE9ic2VydmFibGUnO1xuZXhwb3J0IGNvbnN0IGFqYXggPSBBamF4T2JzZXJ2YWJsZS5jcmVhdGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hamF4LmpzLm1hcCIsImltcG9ydCB7IEZyb21FdmVudE9ic2VydmFibGUgfSBmcm9tICcuL0Zyb21FdmVudE9ic2VydmFibGUnO1xuZXhwb3J0IGNvbnN0IGZyb21FdmVudCA9IEZyb21FdmVudE9ic2VydmFibGUuY3JlYXRlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZnJvbUV2ZW50LmpzLm1hcCIsImltcG9ydCB7IG1lcmdlU3RhdGljIH0gZnJvbSAnLi4vb3BlcmF0b3IvbWVyZ2UnO1xuZXhwb3J0IGNvbnN0IG1lcmdlID0gbWVyZ2VTdGF0aWM7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tZXJnZS5qcy5tYXAiLCJpbXBvcnQgeyBBcnJheU9ic2VydmFibGUgfSBmcm9tICcuL0FycmF5T2JzZXJ2YWJsZSc7XG5leHBvcnQgY29uc3Qgb2YgPSBBcnJheU9ic2VydmFibGUub2Y7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1vZi5qcy5tYXAiLCJpbXBvcnQgeyBPdXRlclN1YnNjcmliZXIgfSBmcm9tICcuLi9PdXRlclN1YnNjcmliZXInO1xuaW1wb3J0IHsgc3Vic2NyaWJlVG9SZXN1bHQgfSBmcm9tICcuLi91dGlsL3N1YnNjcmliZVRvUmVzdWx0Jztcbi8qKlxuICogRW1pdHMgYSB2YWx1ZSBmcm9tIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSBvbmx5IGFmdGVyIGEgcGFydGljdWxhciB0aW1lIHNwYW5cbiAqIGRldGVybWluZWQgYnkgYW5vdGhlciBPYnNlcnZhYmxlIGhhcyBwYXNzZWQgd2l0aG91dCBhbm90aGVyIHNvdXJjZSBlbWlzc2lvbi5cbiAqXG4gKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+SXQncyBsaWtlIHtAbGluayBkZWJvdW5jZVRpbWV9LCBidXQgdGhlIHRpbWUgc3BhbiBvZlxuICogZW1pc3Npb24gc2lsZW5jZSBpcyBkZXRlcm1pbmVkIGJ5IGEgc2Vjb25kIE9ic2VydmFibGUuPC9zcGFuPlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvZGVib3VuY2UucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gKlxuICogYGRlYm91bmNlYCBkZWxheXMgdmFsdWVzIGVtaXR0ZWQgYnkgdGhlIHNvdXJjZSBPYnNlcnZhYmxlLCBidXQgZHJvcHMgcHJldmlvdXNcbiAqIHBlbmRpbmcgZGVsYXllZCBlbWlzc2lvbnMgaWYgYSBuZXcgdmFsdWUgYXJyaXZlcyBvbiB0aGUgc291cmNlIE9ic2VydmFibGUuXG4gKiBUaGlzIG9wZXJhdG9yIGtlZXBzIHRyYWNrIG9mIHRoZSBtb3N0IHJlY2VudCB2YWx1ZSBmcm9tIHRoZSBzb3VyY2VcbiAqIE9ic2VydmFibGUsIGFuZCBzcGF3bnMgYSBkdXJhdGlvbiBPYnNlcnZhYmxlIGJ5IGNhbGxpbmcgdGhlXG4gKiBgZHVyYXRpb25TZWxlY3RvcmAgZnVuY3Rpb24uIFRoZSB2YWx1ZSBpcyBlbWl0dGVkIG9ubHkgd2hlbiB0aGUgZHVyYXRpb25cbiAqIE9ic2VydmFibGUgZW1pdHMgYSB2YWx1ZSBvciBjb21wbGV0ZXMsIGFuZCBpZiBubyBvdGhlciB2YWx1ZSB3YXMgZW1pdHRlZCBvblxuICogdGhlIHNvdXJjZSBPYnNlcnZhYmxlIHNpbmNlIHRoZSBkdXJhdGlvbiBPYnNlcnZhYmxlIHdhcyBzcGF3bmVkLiBJZiBhIG5ld1xuICogdmFsdWUgYXBwZWFycyBiZWZvcmUgdGhlIGR1cmF0aW9uIE9ic2VydmFibGUgZW1pdHMsIHRoZSBwcmV2aW91cyB2YWx1ZSB3aWxsXG4gKiBiZSBkcm9wcGVkIGFuZCB3aWxsIG5vdCBiZSBlbWl0dGVkIG9uIHRoZSBvdXRwdXQgT2JzZXJ2YWJsZS5cbiAqXG4gKiBMaWtlIHtAbGluayBkZWJvdW5jZVRpbWV9LCB0aGlzIGlzIGEgcmF0ZS1saW1pdGluZyBvcGVyYXRvciwgYW5kIGFsc28gYVxuICogZGVsYXktbGlrZSBvcGVyYXRvciBzaW5jZSBvdXRwdXQgZW1pc3Npb25zIGRvIG5vdCBuZWNlc3NhcmlseSBvY2N1ciBhdCB0aGVcbiAqIHNhbWUgdGltZSBhcyB0aGV5IGRpZCBvbiB0aGUgc291cmNlIE9ic2VydmFibGUuXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+RW1pdCB0aGUgbW9zdCByZWNlbnQgY2xpY2sgYWZ0ZXIgYSBidXJzdCBvZiBjbGlja3M8L2NhcHRpb24+XG4gKiB2YXIgY2xpY2tzID0gUnguT2JzZXJ2YWJsZS5mcm9tRXZlbnQoZG9jdW1lbnQsICdjbGljaycpO1xuICogdmFyIHJlc3VsdCA9IGNsaWNrcy5kZWJvdW5jZSgoKSA9PiBSeC5PYnNlcnZhYmxlLmludGVydmFsKDEwMDApKTtcbiAqIHJlc3VsdC5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gKlxuICogQHNlZSB7QGxpbmsgYXVkaXR9XG4gKiBAc2VlIHtAbGluayBkZWJvdW5jZVRpbWV9XG4gKiBAc2VlIHtAbGluayBkZWxheVdoZW59XG4gKiBAc2VlIHtAbGluayB0aHJvdHRsZX1cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKHZhbHVlOiBUKTogT2JzZXJ2YWJsZXxQcm9taXNlfSBkdXJhdGlvblNlbGVjdG9yIEEgZnVuY3Rpb25cbiAqIHRoYXQgcmVjZWl2ZXMgYSB2YWx1ZSBmcm9tIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSwgZm9yIGNvbXB1dGluZyB0aGUgdGltZW91dFxuICogZHVyYXRpb24gZm9yIGVhY2ggc291cmNlIHZhbHVlLCByZXR1cm5lZCBhcyBhbiBPYnNlcnZhYmxlIG9yIGEgUHJvbWlzZS5cbiAqIEByZXR1cm4ge09ic2VydmFibGV9IEFuIE9ic2VydmFibGUgdGhhdCBkZWxheXMgdGhlIGVtaXNzaW9ucyBvZiB0aGUgc291cmNlXG4gKiBPYnNlcnZhYmxlIGJ5IHRoZSBzcGVjaWZpZWQgZHVyYXRpb24gT2JzZXJ2YWJsZSByZXR1cm5lZCBieVxuICogYGR1cmF0aW9uU2VsZWN0b3JgLCBhbmQgbWF5IGRyb3Agc29tZSB2YWx1ZXMgaWYgdGhleSBvY2N1ciB0b28gZnJlcXVlbnRseS5cbiAqIEBtZXRob2QgZGVib3VuY2VcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWJvdW5jZShkdXJhdGlvblNlbGVjdG9yKSB7XG4gICAgcmV0dXJuIHRoaXMubGlmdChuZXcgRGVib3VuY2VPcGVyYXRvcihkdXJhdGlvblNlbGVjdG9yKSk7XG59XG5jbGFzcyBEZWJvdW5jZU9wZXJhdG9yIHtcbiAgICBjb25zdHJ1Y3RvcihkdXJhdGlvblNlbGVjdG9yKSB7XG4gICAgICAgIHRoaXMuZHVyYXRpb25TZWxlY3RvciA9IGR1cmF0aW9uU2VsZWN0b3I7XG4gICAgfVxuICAgIGNhbGwoc3Vic2NyaWJlciwgc291cmNlKSB7XG4gICAgICAgIHJldHVybiBzb3VyY2UuX3N1YnNjcmliZShuZXcgRGVib3VuY2VTdWJzY3JpYmVyKHN1YnNjcmliZXIsIHRoaXMuZHVyYXRpb25TZWxlY3RvcikpO1xuICAgIH1cbn1cbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBpZ25vcmVcbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICovXG5jbGFzcyBEZWJvdW5jZVN1YnNjcmliZXIgZXh0ZW5kcyBPdXRlclN1YnNjcmliZXIge1xuICAgIGNvbnN0cnVjdG9yKGRlc3RpbmF0aW9uLCBkdXJhdGlvblNlbGVjdG9yKSB7XG4gICAgICAgIHN1cGVyKGRlc3RpbmF0aW9uKTtcbiAgICAgICAgdGhpcy5kdXJhdGlvblNlbGVjdG9yID0gZHVyYXRpb25TZWxlY3RvcjtcbiAgICAgICAgdGhpcy5oYXNWYWx1ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmR1cmF0aW9uU3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgICB9XG4gICAgX25leHQodmFsdWUpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuZHVyYXRpb25TZWxlY3Rvci5jYWxsKHRoaXMsIHZhbHVlKTtcbiAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl90cnlOZXh0KHZhbHVlLCByZXN1bHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHRoaXMuZGVzdGluYXRpb24uZXJyb3IoZXJyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBfY29tcGxldGUoKSB7XG4gICAgICAgIHRoaXMuZW1pdFZhbHVlKCk7XG4gICAgICAgIHRoaXMuZGVzdGluYXRpb24uY29tcGxldGUoKTtcbiAgICB9XG4gICAgX3RyeU5leHQodmFsdWUsIGR1cmF0aW9uKSB7XG4gICAgICAgIGxldCBzdWJzY3JpcHRpb24gPSB0aGlzLmR1cmF0aW9uU3Vic2NyaXB0aW9uO1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMuaGFzVmFsdWUgPSB0cnVlO1xuICAgICAgICBpZiAoc3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlKHN1YnNjcmlwdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgc3Vic2NyaXB0aW9uID0gc3Vic2NyaWJlVG9SZXN1bHQodGhpcywgZHVyYXRpb24pO1xuICAgICAgICBpZiAoIXN1YnNjcmlwdGlvbi5jbG9zZWQpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkKHRoaXMuZHVyYXRpb25TdWJzY3JpcHRpb24gPSBzdWJzY3JpcHRpb24pO1xuICAgICAgICB9XG4gICAgfVxuICAgIG5vdGlmeU5leHQob3V0ZXJWYWx1ZSwgaW5uZXJWYWx1ZSwgb3V0ZXJJbmRleCwgaW5uZXJJbmRleCwgaW5uZXJTdWIpIHtcbiAgICAgICAgdGhpcy5lbWl0VmFsdWUoKTtcbiAgICB9XG4gICAgbm90aWZ5Q29tcGxldGUoKSB7XG4gICAgICAgIHRoaXMuZW1pdFZhbHVlKCk7XG4gICAgfVxuICAgIGVtaXRWYWx1ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuaGFzVmFsdWUpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy52YWx1ZTtcbiAgICAgICAgICAgIGNvbnN0IHN1YnNjcmlwdGlvbiA9IHRoaXMuZHVyYXRpb25TdWJzY3JpcHRpb247XG4gICAgICAgICAgICBpZiAoc3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kdXJhdGlvblN1YnNjcmlwdGlvbiA9IG51bGw7XG4gICAgICAgICAgICAgICAgc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmUoc3Vic2NyaXB0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5oYXNWYWx1ZSA9IGZhbHNlO1xuICAgICAgICAgICAgc3VwZXIuX25leHQodmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGVib3VuY2UuanMubWFwIiwiaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuLyoqXG4gKiBQZXJmb3JtIGEgc2lkZSBlZmZlY3QgZm9yIGV2ZXJ5IGVtaXNzaW9uIG9uIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSwgYnV0IHJldHVyblxuICogYW4gT2JzZXJ2YWJsZSB0aGF0IGlzIGlkZW50aWNhbCB0byB0aGUgc291cmNlLlxuICpcbiAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5JbnRlcmNlcHRzIGVhY2ggZW1pc3Npb24gb24gdGhlIHNvdXJjZSBhbmQgcnVucyBhXG4gKiBmdW5jdGlvbiwgYnV0IHJldHVybnMgYW4gb3V0cHV0IHdoaWNoIGlzIGlkZW50aWNhbCB0byB0aGUgc291cmNlLjwvc3Bhbj5cbiAqXG4gKiA8aW1nIHNyYz1cIi4vaW1nL2RvLnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIFJldHVybnMgYSBtaXJyb3JlZCBPYnNlcnZhYmxlIG9mIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSwgYnV0IG1vZGlmaWVkIHNvIHRoYXRcbiAqIHRoZSBwcm92aWRlZCBPYnNlcnZlciBpcyBjYWxsZWQgdG8gcGVyZm9ybSBhIHNpZGUgZWZmZWN0IGZvciBldmVyeSB2YWx1ZSxcbiAqIGVycm9yLCBhbmQgY29tcGxldGlvbiBlbWl0dGVkIGJ5IHRoZSBzb3VyY2UuIEFueSBlcnJvcnMgdGhhdCBhcmUgdGhyb3duIGluXG4gKiB0aGUgYWZvcmVtZW50aW9uZWQgT2JzZXJ2ZXIgb3IgaGFuZGxlcnMgYXJlIHNhZmVseSBzZW50IGRvd24gdGhlIGVycm9yIHBhdGhcbiAqIG9mIHRoZSBvdXRwdXQgT2JzZXJ2YWJsZS5cbiAqXG4gKiBUaGlzIG9wZXJhdG9yIGlzIHVzZWZ1bCBmb3IgZGVidWdnaW5nIHlvdXIgT2JzZXJ2YWJsZXMgZm9yIHRoZSBjb3JyZWN0IHZhbHVlc1xuICogb3IgcGVyZm9ybWluZyBvdGhlciBzaWRlIGVmZmVjdHMuXG4gKlxuICogTm90ZTogdGhpcyBpcyBkaWZmZXJlbnQgdG8gYSBgc3Vic2NyaWJlYCBvbiB0aGUgT2JzZXJ2YWJsZS4gSWYgdGhlIE9ic2VydmFibGVcbiAqIHJldHVybmVkIGJ5IGBkb2AgaXMgbm90IHN1YnNjcmliZWQsIHRoZSBzaWRlIGVmZmVjdHMgc3BlY2lmaWVkIGJ5IHRoZVxuICogT2JzZXJ2ZXIgd2lsbCBuZXZlciBoYXBwZW4uIGBkb2AgdGhlcmVmb3JlIHNpbXBseSBzcGllcyBvbiBleGlzdGluZ1xuICogZXhlY3V0aW9uLCBpdCBkb2VzIG5vdCB0cmlnZ2VyIGFuIGV4ZWN1dGlvbiB0byBoYXBwZW4gbGlrZSBgc3Vic2NyaWJlYCBkb2VzLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPk1hcCBldmVyeSBldmVyeSBjbGljayB0byB0aGUgY2xpZW50WCBwb3NpdGlvbiBvZiB0aGF0IGNsaWNrLCB3aGlsZSBhbHNvIGxvZ2dpbmcgdGhlIGNsaWNrIGV2ZW50PC9jYXB0aW9uPlxuICogdmFyIGNsaWNrcyA9IFJ4Lk9ic2VydmFibGUuZnJvbUV2ZW50KGRvY3VtZW50LCAnY2xpY2snKTtcbiAqIHZhciBwb3NpdGlvbnMgPSBjbGlja3NcbiAqICAgLmRvKGV2ID0+IGNvbnNvbGUubG9nKGV2KSlcbiAqICAgLm1hcChldiA9PiBldi5jbGllbnRYKTtcbiAqIHBvc2l0aW9ucy5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gKlxuICogQHNlZSB7QGxpbmsgbWFwfVxuICogQHNlZSB7QGxpbmsgc3Vic2NyaWJlfVxuICpcbiAqIEBwYXJhbSB7T2JzZXJ2ZXJ8ZnVuY3Rpb259IFtuZXh0T3JPYnNlcnZlcl0gQSBub3JtYWwgT2JzZXJ2ZXIgb2JqZWN0IG9yIGFcbiAqIGNhbGxiYWNrIGZvciBgbmV4dGAuXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBbZXJyb3JdIENhbGxiYWNrIGZvciBlcnJvcnMgaW4gdGhlIHNvdXJjZS5cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IFtjb21wbGV0ZV0gQ2FsbGJhY2sgZm9yIHRoZSBjb21wbGV0aW9uIG9mIHRoZSBzb3VyY2UuXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSBBbiBPYnNlcnZhYmxlIGlkZW50aWNhbCB0byB0aGUgc291cmNlLCBidXQgcnVucyB0aGVcbiAqIHNwZWNpZmllZCBPYnNlcnZlciBvciBjYWxsYmFjayhzKSBmb3IgZWFjaCBpdGVtLlxuICogQG1ldGhvZCBkb1xuICogQG5hbWUgZG9cbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfZG8obmV4dE9yT2JzZXJ2ZXIsIGVycm9yLCBjb21wbGV0ZSkge1xuICAgIHJldHVybiB0aGlzLmxpZnQobmV3IERvT3BlcmF0b3IobmV4dE9yT2JzZXJ2ZXIsIGVycm9yLCBjb21wbGV0ZSkpO1xufVxuY2xhc3MgRG9PcGVyYXRvciB7XG4gICAgY29uc3RydWN0b3IobmV4dE9yT2JzZXJ2ZXIsIGVycm9yLCBjb21wbGV0ZSkge1xuICAgICAgICB0aGlzLm5leHRPck9ic2VydmVyID0gbmV4dE9yT2JzZXJ2ZXI7XG4gICAgICAgIHRoaXMuZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgdGhpcy5jb21wbGV0ZSA9IGNvbXBsZXRlO1xuICAgIH1cbiAgICBjYWxsKHN1YnNjcmliZXIsIHNvdXJjZSkge1xuICAgICAgICByZXR1cm4gc291cmNlLl9zdWJzY3JpYmUobmV3IERvU3Vic2NyaWJlcihzdWJzY3JpYmVyLCB0aGlzLm5leHRPck9ic2VydmVyLCB0aGlzLmVycm9yLCB0aGlzLmNvbXBsZXRlKSk7XG4gICAgfVxufVxuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbmNsYXNzIERvU3Vic2NyaWJlciBleHRlbmRzIFN1YnNjcmliZXIge1xuICAgIGNvbnN0cnVjdG9yKGRlc3RpbmF0aW9uLCBuZXh0T3JPYnNlcnZlciwgZXJyb3IsIGNvbXBsZXRlKSB7XG4gICAgICAgIHN1cGVyKGRlc3RpbmF0aW9uKTtcbiAgICAgICAgY29uc3Qgc2FmZVN1YnNjcmliZXIgPSBuZXcgU3Vic2NyaWJlcihuZXh0T3JPYnNlcnZlciwgZXJyb3IsIGNvbXBsZXRlKTtcbiAgICAgICAgc2FmZVN1YnNjcmliZXIuc3luY0Vycm9yVGhyb3dhYmxlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5hZGQoc2FmZVN1YnNjcmliZXIpO1xuICAgICAgICB0aGlzLnNhZmVTdWJzY3JpYmVyID0gc2FmZVN1YnNjcmliZXI7XG4gICAgfVxuICAgIF9uZXh0KHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IHsgc2FmZVN1YnNjcmliZXIgfSA9IHRoaXM7XG4gICAgICAgIHNhZmVTdWJzY3JpYmVyLm5leHQodmFsdWUpO1xuICAgICAgICBpZiAoc2FmZVN1YnNjcmliZXIuc3luY0Vycm9yVGhyb3duKSB7XG4gICAgICAgICAgICB0aGlzLmRlc3RpbmF0aW9uLmVycm9yKHNhZmVTdWJzY3JpYmVyLnN5bmNFcnJvclZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZGVzdGluYXRpb24ubmV4dCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX2Vycm9yKGVycikge1xuICAgICAgICBjb25zdCB7IHNhZmVTdWJzY3JpYmVyIH0gPSB0aGlzO1xuICAgICAgICBzYWZlU3Vic2NyaWJlci5lcnJvcihlcnIpO1xuICAgICAgICBpZiAoc2FmZVN1YnNjcmliZXIuc3luY0Vycm9yVGhyb3duKSB7XG4gICAgICAgICAgICB0aGlzLmRlc3RpbmF0aW9uLmVycm9yKHNhZmVTdWJzY3JpYmVyLnN5bmNFcnJvclZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZGVzdGluYXRpb24uZXJyb3IoZXJyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBfY29tcGxldGUoKSB7XG4gICAgICAgIGNvbnN0IHsgc2FmZVN1YnNjcmliZXIgfSA9IHRoaXM7XG4gICAgICAgIHNhZmVTdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIGlmIChzYWZlU3Vic2NyaWJlci5zeW5jRXJyb3JUaHJvd24pIHtcbiAgICAgICAgICAgIHRoaXMuZGVzdGluYXRpb24uZXJyb3Ioc2FmZVN1YnNjcmliZXIuc3luY0Vycm9yVmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5jb21wbGV0ZSgpO1xuICAgICAgICB9XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZG8uanMubWFwIiwiaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuLyoqXG4gKiBGaWx0ZXIgaXRlbXMgZW1pdHRlZCBieSB0aGUgc291cmNlIE9ic2VydmFibGUgYnkgb25seSBlbWl0dGluZyB0aG9zZSB0aGF0XG4gKiBzYXRpc2Z5IGEgc3BlY2lmaWVkIHByZWRpY2F0ZS5cbiAqXG4gKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+TGlrZVxuICogW0FycmF5LnByb3RvdHlwZS5maWx0ZXIoKV0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvQXJyYXkvZmlsdGVyKSxcbiAqIGl0IG9ubHkgZW1pdHMgYSB2YWx1ZSBmcm9tIHRoZSBzb3VyY2UgaWYgaXQgcGFzc2VzIGEgY3JpdGVyaW9uIGZ1bmN0aW9uLjwvc3Bhbj5cbiAqXG4gKiA8aW1nIHNyYz1cIi4vaW1nL2ZpbHRlci5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAqXG4gKiBTaW1pbGFyIHRvIHRoZSB3ZWxsLWtub3duIGBBcnJheS5wcm90b3R5cGUuZmlsdGVyYCBtZXRob2QsIHRoaXMgb3BlcmF0b3JcbiAqIHRha2VzIHZhbHVlcyBmcm9tIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSwgcGFzc2VzIHRoZW0gdGhyb3VnaCBhIGBwcmVkaWNhdGVgXG4gKiBmdW5jdGlvbiBhbmQgb25seSBlbWl0cyB0aG9zZSB2YWx1ZXMgdGhhdCB5aWVsZGVkIGB0cnVlYC5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5FbWl0IG9ubHkgY2xpY2sgZXZlbnRzIHdob3NlIHRhcmdldCB3YXMgYSBESVYgZWxlbWVudDwvY2FwdGlvbj5cbiAqIHZhciBjbGlja3MgPSBSeC5PYnNlcnZhYmxlLmZyb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJyk7XG4gKiB2YXIgY2xpY2tzT25EaXZzID0gY2xpY2tzLmZpbHRlcihldiA9PiBldi50YXJnZXQudGFnTmFtZSA9PT0gJ0RJVicpO1xuICogY2xpY2tzT25EaXZzLnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAqXG4gKiBAc2VlIHtAbGluayBkaXN0aW5jdH1cbiAqIEBzZWUge0BsaW5rIGRpc3RpbmN0S2V5fVxuICogQHNlZSB7QGxpbmsgZGlzdGluY3RVbnRpbENoYW5nZWR9XG4gKiBAc2VlIHtAbGluayBkaXN0aW5jdFVudGlsS2V5Q2hhbmdlZH1cbiAqIEBzZWUge0BsaW5rIGlnbm9yZUVsZW1lbnRzfVxuICogQHNlZSB7QGxpbmsgcGFydGl0aW9ufVxuICogQHNlZSB7QGxpbmsgc2tpcH1cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKHZhbHVlOiBULCBpbmRleDogbnVtYmVyKTogYm9vbGVhbn0gcHJlZGljYXRlIEEgZnVuY3Rpb24gdGhhdFxuICogZXZhbHVhdGVzIGVhY2ggdmFsdWUgZW1pdHRlZCBieSB0aGUgc291cmNlIE9ic2VydmFibGUuIElmIGl0IHJldHVybnMgYHRydWVgLFxuICogdGhlIHZhbHVlIGlzIGVtaXR0ZWQsIGlmIGBmYWxzZWAgdGhlIHZhbHVlIGlzIG5vdCBwYXNzZWQgdG8gdGhlIG91dHB1dFxuICogT2JzZXJ2YWJsZS4gVGhlIGBpbmRleGAgcGFyYW1ldGVyIGlzIHRoZSBudW1iZXIgYGlgIGZvciB0aGUgaS10aCBzb3VyY2VcbiAqIGVtaXNzaW9uIHRoYXQgaGFzIGhhcHBlbmVkIHNpbmNlIHRoZSBzdWJzY3JpcHRpb24sIHN0YXJ0aW5nIGZyb20gdGhlIG51bWJlclxuICogYDBgLlxuICogQHBhcmFtIHthbnl9IFt0aGlzQXJnXSBBbiBvcHRpb25hbCBhcmd1bWVudCB0byBkZXRlcm1pbmUgdGhlIHZhbHVlIG9mIGB0aGlzYFxuICogaW4gdGhlIGBwcmVkaWNhdGVgIGZ1bmN0aW9uLlxuICogQHJldHVybiB7T2JzZXJ2YWJsZX0gQW4gT2JzZXJ2YWJsZSBvZiB2YWx1ZXMgZnJvbSB0aGUgc291cmNlIHRoYXQgd2VyZVxuICogYWxsb3dlZCBieSB0aGUgYHByZWRpY2F0ZWAgZnVuY3Rpb24uXG4gKiBAbWV0aG9kIGZpbHRlclxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZpbHRlcihwcmVkaWNhdGUsIHRoaXNBcmcpIHtcbiAgICByZXR1cm4gdGhpcy5saWZ0KG5ldyBGaWx0ZXJPcGVyYXRvcihwcmVkaWNhdGUsIHRoaXNBcmcpKTtcbn1cbmNsYXNzIEZpbHRlck9wZXJhdG9yIHtcbiAgICBjb25zdHJ1Y3RvcihwcmVkaWNhdGUsIHRoaXNBcmcpIHtcbiAgICAgICAgdGhpcy5wcmVkaWNhdGUgPSBwcmVkaWNhdGU7XG4gICAgICAgIHRoaXMudGhpc0FyZyA9IHRoaXNBcmc7XG4gICAgfVxuICAgIGNhbGwoc3Vic2NyaWJlciwgc291cmNlKSB7XG4gICAgICAgIHJldHVybiBzb3VyY2UuX3N1YnNjcmliZShuZXcgRmlsdGVyU3Vic2NyaWJlcihzdWJzY3JpYmVyLCB0aGlzLnByZWRpY2F0ZSwgdGhpcy50aGlzQXJnKSk7XG4gICAgfVxufVxuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbmNsYXNzIEZpbHRlclN1YnNjcmliZXIgZXh0ZW5kcyBTdWJzY3JpYmVyIHtcbiAgICBjb25zdHJ1Y3RvcihkZXN0aW5hdGlvbiwgcHJlZGljYXRlLCB0aGlzQXJnKSB7XG4gICAgICAgIHN1cGVyKGRlc3RpbmF0aW9uKTtcbiAgICAgICAgdGhpcy5wcmVkaWNhdGUgPSBwcmVkaWNhdGU7XG4gICAgICAgIHRoaXMudGhpc0FyZyA9IHRoaXNBcmc7XG4gICAgICAgIHRoaXMuY291bnQgPSAwO1xuICAgICAgICB0aGlzLnByZWRpY2F0ZSA9IHByZWRpY2F0ZTtcbiAgICB9XG4gICAgLy8gdGhlIHRyeSBjYXRjaCBibG9jayBiZWxvdyBpcyBsZWZ0IHNwZWNpZmljYWxseSBmb3JcbiAgICAvLyBvcHRpbWl6YXRpb24gYW5kIHBlcmYgcmVhc29ucy4gYSB0cnlDYXRjaGVyIGlzIG5vdCBuZWNlc3NhcnkgaGVyZS5cbiAgICBfbmV4dCh2YWx1ZSkge1xuICAgICAgICBsZXQgcmVzdWx0O1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5wcmVkaWNhdGUuY2FsbCh0aGlzLnRoaXNBcmcsIHZhbHVlLCB0aGlzLmNvdW50KyspO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHRoaXMuZGVzdGluYXRpb24uZXJyb3IoZXJyKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICB0aGlzLmRlc3RpbmF0aW9uLm5leHQodmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZmlsdGVyLmpzLm1hcCIsImltcG9ydCB7IFN1YnNjcmliZXIgfSBmcm9tICcuLi9TdWJzY3JpYmVyJztcbi8qKlxuICogQXBwbGllcyBhIGdpdmVuIGBwcm9qZWN0YCBmdW5jdGlvbiB0byBlYWNoIHZhbHVlIGVtaXR0ZWQgYnkgdGhlIHNvdXJjZVxuICogT2JzZXJ2YWJsZSwgYW5kIGVtaXRzIHRoZSByZXN1bHRpbmcgdmFsdWVzIGFzIGFuIE9ic2VydmFibGUuXG4gKlxuICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPkxpa2UgW0FycmF5LnByb3RvdHlwZS5tYXAoKV0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvQXJyYXkvbWFwKSxcbiAqIGl0IHBhc3NlcyBlYWNoIHNvdXJjZSB2YWx1ZSB0aHJvdWdoIGEgdHJhbnNmb3JtYXRpb24gZnVuY3Rpb24gdG8gZ2V0XG4gKiBjb3JyZXNwb25kaW5nIG91dHB1dCB2YWx1ZXMuPC9zcGFuPlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvbWFwLnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIFNpbWlsYXIgdG8gdGhlIHdlbGwga25vd24gYEFycmF5LnByb3RvdHlwZS5tYXBgIGZ1bmN0aW9uLCB0aGlzIG9wZXJhdG9yXG4gKiBhcHBsaWVzIGEgcHJvamVjdGlvbiB0byBlYWNoIHZhbHVlIGFuZCBlbWl0cyB0aGF0IHByb2plY3Rpb24gaW4gdGhlIG91dHB1dFxuICogT2JzZXJ2YWJsZS5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5NYXAgZXZlcnkgZXZlcnkgY2xpY2sgdG8gdGhlIGNsaWVudFggcG9zaXRpb24gb2YgdGhhdCBjbGljazwvY2FwdGlvbj5cbiAqIHZhciBjbGlja3MgPSBSeC5PYnNlcnZhYmxlLmZyb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJyk7XG4gKiB2YXIgcG9zaXRpb25zID0gY2xpY2tzLm1hcChldiA9PiBldi5jbGllbnRYKTtcbiAqIHBvc2l0aW9ucy5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gKlxuICogQHNlZSB7QGxpbmsgbWFwVG99XG4gKiBAc2VlIHtAbGluayBwbHVja31cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKHZhbHVlOiBULCBpbmRleDogbnVtYmVyKTogUn0gcHJvamVjdCBUaGUgZnVuY3Rpb24gdG8gYXBwbHlcbiAqIHRvIGVhY2ggYHZhbHVlYCBlbWl0dGVkIGJ5IHRoZSBzb3VyY2UgT2JzZXJ2YWJsZS4gVGhlIGBpbmRleGAgcGFyYW1ldGVyIGlzXG4gKiB0aGUgbnVtYmVyIGBpYCBmb3IgdGhlIGktdGggZW1pc3Npb24gdGhhdCBoYXMgaGFwcGVuZWQgc2luY2UgdGhlXG4gKiBzdWJzY3JpcHRpb24sIHN0YXJ0aW5nIGZyb20gdGhlIG51bWJlciBgMGAuXG4gKiBAcGFyYW0ge2FueX0gW3RoaXNBcmddIEFuIG9wdGlvbmFsIGFyZ3VtZW50IHRvIGRlZmluZSB3aGF0IGB0aGlzYCBpcyBpbiB0aGVcbiAqIGBwcm9qZWN0YCBmdW5jdGlvbi5cbiAqIEByZXR1cm4ge09ic2VydmFibGU8Uj59IEFuIE9ic2VydmFibGUgdGhhdCBlbWl0cyB0aGUgdmFsdWVzIGZyb20gdGhlIHNvdXJjZVxuICogT2JzZXJ2YWJsZSB0cmFuc2Zvcm1lZCBieSB0aGUgZ2l2ZW4gYHByb2plY3RgIGZ1bmN0aW9uLlxuICogQG1ldGhvZCBtYXBcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtYXAocHJvamVjdCwgdGhpc0FyZykge1xuICAgIGlmICh0eXBlb2YgcHJvamVjdCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdhcmd1bWVudCBpcyBub3QgYSBmdW5jdGlvbi4gQXJlIHlvdSBsb29raW5nIGZvciBgbWFwVG8oKWA/Jyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmxpZnQobmV3IE1hcE9wZXJhdG9yKHByb2plY3QsIHRoaXNBcmcpKTtcbn1cbmV4cG9ydCBjbGFzcyBNYXBPcGVyYXRvciB7XG4gICAgY29uc3RydWN0b3IocHJvamVjdCwgdGhpc0FyZykge1xuICAgICAgICB0aGlzLnByb2plY3QgPSBwcm9qZWN0O1xuICAgICAgICB0aGlzLnRoaXNBcmcgPSB0aGlzQXJnO1xuICAgIH1cbiAgICBjYWxsKHN1YnNjcmliZXIsIHNvdXJjZSkge1xuICAgICAgICByZXR1cm4gc291cmNlLl9zdWJzY3JpYmUobmV3IE1hcFN1YnNjcmliZXIoc3Vic2NyaWJlciwgdGhpcy5wcm9qZWN0LCB0aGlzLnRoaXNBcmcpKTtcbiAgICB9XG59XG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAaWdub3JlXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqL1xuY2xhc3MgTWFwU3Vic2NyaWJlciBleHRlbmRzIFN1YnNjcmliZXIge1xuICAgIGNvbnN0cnVjdG9yKGRlc3RpbmF0aW9uLCBwcm9qZWN0LCB0aGlzQXJnKSB7XG4gICAgICAgIHN1cGVyKGRlc3RpbmF0aW9uKTtcbiAgICAgICAgdGhpcy5wcm9qZWN0ID0gcHJvamVjdDtcbiAgICAgICAgdGhpcy5jb3VudCA9IDA7XG4gICAgICAgIHRoaXMudGhpc0FyZyA9IHRoaXNBcmcgfHwgdGhpcztcbiAgICB9XG4gICAgLy8gTk9URTogVGhpcyBsb29rcyB1bm9wdGltaXplZCwgYnV0IGl0J3MgYWN0dWFsbHkgcHVycG9zZWZ1bGx5IE5PVFxuICAgIC8vIHVzaW5nIHRyeS9jYXRjaCBvcHRpbWl6YXRpb25zLlxuICAgIF9uZXh0KHZhbHVlKSB7XG4gICAgICAgIGxldCByZXN1bHQ7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXN1bHQgPSB0aGlzLnByb2plY3QuY2FsbCh0aGlzLnRoaXNBcmcsIHZhbHVlLCB0aGlzLmNvdW50KyspO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHRoaXMuZGVzdGluYXRpb24uZXJyb3IoZXJyKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRlc3RpbmF0aW9uLm5leHQocmVzdWx0KTtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXAuanMubWFwIiwiaW1wb3J0IHsgQXJyYXlPYnNlcnZhYmxlIH0gZnJvbSAnLi4vb2JzZXJ2YWJsZS9BcnJheU9ic2VydmFibGUnO1xuaW1wb3J0IHsgTWVyZ2VBbGxPcGVyYXRvciB9IGZyb20gJy4vbWVyZ2VBbGwnO1xuaW1wb3J0IHsgaXNTY2hlZHVsZXIgfSBmcm9tICcuLi91dGlsL2lzU2NoZWR1bGVyJztcbi8qKlxuICogQ3JlYXRlcyBhbiBvdXRwdXQgT2JzZXJ2YWJsZSB3aGljaCBjb25jdXJyZW50bHkgZW1pdHMgYWxsIHZhbHVlcyBmcm9tIGV2ZXJ5XG4gKiBnaXZlbiBpbnB1dCBPYnNlcnZhYmxlLlxuICpcbiAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5GbGF0dGVucyBtdWx0aXBsZSBPYnNlcnZhYmxlcyB0b2dldGhlciBieSBibGVuZGluZ1xuICogdGhlaXIgdmFsdWVzIGludG8gb25lIE9ic2VydmFibGUuPC9zcGFuPlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvbWVyZ2UucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gKlxuICogYG1lcmdlYCBzdWJzY3JpYmVzIHRvIGVhY2ggZ2l2ZW4gaW5wdXQgT2JzZXJ2YWJsZSAoZWl0aGVyIHRoZSBzb3VyY2Ugb3IgYW5cbiAqIE9ic2VydmFibGUgZ2l2ZW4gYXMgYXJndW1lbnQpLCBhbmQgc2ltcGx5IGZvcndhcmRzICh3aXRob3V0IGRvaW5nIGFueVxuICogdHJhbnNmb3JtYXRpb24pIGFsbCB0aGUgdmFsdWVzIGZyb20gYWxsIHRoZSBpbnB1dCBPYnNlcnZhYmxlcyB0byB0aGUgb3V0cHV0XG4gKiBPYnNlcnZhYmxlLiBUaGUgb3V0cHV0IE9ic2VydmFibGUgb25seSBjb21wbGV0ZXMgb25jZSBhbGwgaW5wdXQgT2JzZXJ2YWJsZXNcbiAqIGhhdmUgY29tcGxldGVkLiBBbnkgZXJyb3IgZGVsaXZlcmVkIGJ5IGFuIGlucHV0IE9ic2VydmFibGUgd2lsbCBiZSBpbW1lZGlhdGVseVxuICogZW1pdHRlZCBvbiB0aGUgb3V0cHV0IE9ic2VydmFibGUuXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+TWVyZ2UgdG9nZXRoZXIgdHdvIE9ic2VydmFibGVzOiAxcyBpbnRlcnZhbCBhbmQgY2xpY2tzPC9jYXB0aW9uPlxuICogdmFyIGNsaWNrcyA9IFJ4Lk9ic2VydmFibGUuZnJvbUV2ZW50KGRvY3VtZW50LCAnY2xpY2snKTtcbiAqIHZhciB0aW1lciA9IFJ4Lk9ic2VydmFibGUuaW50ZXJ2YWwoMTAwMCk7XG4gKiB2YXIgY2xpY2tzT3JUaW1lciA9IGNsaWNrcy5tZXJnZSh0aW1lcik7XG4gKiBjbGlja3NPclRpbWVyLnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5NZXJnZSB0b2dldGhlciAzIE9ic2VydmFibGVzLCBidXQgb25seSAyIHJ1biBjb25jdXJyZW50bHk8L2NhcHRpb24+XG4gKiB2YXIgdGltZXIxID0gUnguT2JzZXJ2YWJsZS5pbnRlcnZhbCgxMDAwKS50YWtlKDEwKTtcbiAqIHZhciB0aW1lcjIgPSBSeC5PYnNlcnZhYmxlLmludGVydmFsKDIwMDApLnRha2UoNik7XG4gKiB2YXIgdGltZXIzID0gUnguT2JzZXJ2YWJsZS5pbnRlcnZhbCg1MDApLnRha2UoMTApO1xuICogdmFyIGNvbmN1cnJlbnQgPSAyOyAvLyB0aGUgYXJndW1lbnRcbiAqIHZhciBtZXJnZWQgPSB0aW1lcjEubWVyZ2UodGltZXIyLCB0aW1lcjMsIGNvbmN1cnJlbnQpO1xuICogbWVyZ2VkLnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAqXG4gKiBAc2VlIHtAbGluayBtZXJnZUFsbH1cbiAqIEBzZWUge0BsaW5rIG1lcmdlTWFwfVxuICogQHNlZSB7QGxpbmsgbWVyZ2VNYXBUb31cbiAqIEBzZWUge0BsaW5rIG1lcmdlU2Nhbn1cbiAqXG4gKiBAcGFyYW0ge09ic2VydmFibGV9IG90aGVyIEFuIGlucHV0IE9ic2VydmFibGUgdG8gbWVyZ2Ugd2l0aCB0aGUgc291cmNlXG4gKiBPYnNlcnZhYmxlLiBNb3JlIHRoYW4gb25lIGlucHV0IE9ic2VydmFibGVzIG1heSBiZSBnaXZlbiBhcyBhcmd1bWVudC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbY29uY3VycmVudD1OdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFldIE1heGltdW0gbnVtYmVyIG9mIGlucHV0XG4gKiBPYnNlcnZhYmxlcyBiZWluZyBzdWJzY3JpYmVkIHRvIGNvbmN1cnJlbnRseS5cbiAqIEBwYXJhbSB7U2NoZWR1bGVyfSBbc2NoZWR1bGVyPW51bGxdIFRoZSBTY2hlZHVsZXIgdG8gdXNlIGZvciBtYW5hZ2luZ1xuICogY29uY3VycmVuY3kgb2YgaW5wdXQgT2JzZXJ2YWJsZXMuXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSBhbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgaXRlbXMgdGhhdCBhcmUgdGhlIHJlc3VsdCBvZlxuICogZXZlcnkgaW5wdXQgT2JzZXJ2YWJsZS5cbiAqIEBtZXRob2QgbWVyZ2VcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZSguLi5vYnNlcnZhYmxlcykge1xuICAgIG9ic2VydmFibGVzLnVuc2hpZnQodGhpcyk7XG4gICAgcmV0dXJuIG1lcmdlU3RhdGljLmFwcGx5KHRoaXMsIG9ic2VydmFibGVzKTtcbn1cbi8qIHRzbGludDplbmFibGU6bWF4LWxpbmUtbGVuZ3RoICovXG4vKipcbiAqIENyZWF0ZXMgYW4gb3V0cHV0IE9ic2VydmFibGUgd2hpY2ggY29uY3VycmVudGx5IGVtaXRzIGFsbCB2YWx1ZXMgZnJvbSBldmVyeVxuICogZ2l2ZW4gaW5wdXQgT2JzZXJ2YWJsZS5cbiAqXG4gKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+RmxhdHRlbnMgbXVsdGlwbGUgT2JzZXJ2YWJsZXMgdG9nZXRoZXIgYnkgYmxlbmRpbmdcbiAqIHRoZWlyIHZhbHVlcyBpbnRvIG9uZSBPYnNlcnZhYmxlLjwvc3Bhbj5cbiAqXG4gKiA8aW1nIHNyYz1cIi4vaW1nL21lcmdlLnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIGBtZXJnZWAgc3Vic2NyaWJlcyB0byBlYWNoIGdpdmVuIGlucHV0IE9ic2VydmFibGUgKGFzIGFyZ3VtZW50cyksIGFuZCBzaW1wbHlcbiAqIGZvcndhcmRzICh3aXRob3V0IGRvaW5nIGFueSB0cmFuc2Zvcm1hdGlvbikgYWxsIHRoZSB2YWx1ZXMgZnJvbSBhbGwgdGhlIGlucHV0XG4gKiBPYnNlcnZhYmxlcyB0byB0aGUgb3V0cHV0IE9ic2VydmFibGUuIFRoZSBvdXRwdXQgT2JzZXJ2YWJsZSBvbmx5IGNvbXBsZXRlc1xuICogb25jZSBhbGwgaW5wdXQgT2JzZXJ2YWJsZXMgaGF2ZSBjb21wbGV0ZWQuIEFueSBlcnJvciBkZWxpdmVyZWQgYnkgYW4gaW5wdXRcbiAqIE9ic2VydmFibGUgd2lsbCBiZSBpbW1lZGlhdGVseSBlbWl0dGVkIG9uIHRoZSBvdXRwdXQgT2JzZXJ2YWJsZS5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5NZXJnZSB0b2dldGhlciB0d28gT2JzZXJ2YWJsZXM6IDFzIGludGVydmFsIGFuZCBjbGlja3M8L2NhcHRpb24+XG4gKiB2YXIgY2xpY2tzID0gUnguT2JzZXJ2YWJsZS5mcm9tRXZlbnQoZG9jdW1lbnQsICdjbGljaycpO1xuICogdmFyIHRpbWVyID0gUnguT2JzZXJ2YWJsZS5pbnRlcnZhbCgxMDAwKTtcbiAqIHZhciBjbGlja3NPclRpbWVyID0gUnguT2JzZXJ2YWJsZS5tZXJnZShjbGlja3MsIHRpbWVyKTtcbiAqIGNsaWNrc09yVGltZXIuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPk1lcmdlIHRvZ2V0aGVyIDMgT2JzZXJ2YWJsZXMsIGJ1dCBvbmx5IDIgcnVuIGNvbmN1cnJlbnRseTwvY2FwdGlvbj5cbiAqIHZhciB0aW1lcjEgPSBSeC5PYnNlcnZhYmxlLmludGVydmFsKDEwMDApLnRha2UoMTApO1xuICogdmFyIHRpbWVyMiA9IFJ4Lk9ic2VydmFibGUuaW50ZXJ2YWwoMjAwMCkudGFrZSg2KTtcbiAqIHZhciB0aW1lcjMgPSBSeC5PYnNlcnZhYmxlLmludGVydmFsKDUwMCkudGFrZSgxMCk7XG4gKiB2YXIgY29uY3VycmVudCA9IDI7IC8vIHRoZSBhcmd1bWVudFxuICogdmFyIG1lcmdlZCA9IFJ4Lk9ic2VydmFibGUubWVyZ2UodGltZXIxLCB0aW1lcjIsIHRpbWVyMywgY29uY3VycmVudCk7XG4gKiBtZXJnZWQuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICpcbiAqIEBzZWUge0BsaW5rIG1lcmdlQWxsfVxuICogQHNlZSB7QGxpbmsgbWVyZ2VNYXB9XG4gKiBAc2VlIHtAbGluayBtZXJnZU1hcFRvfVxuICogQHNlZSB7QGxpbmsgbWVyZ2VTY2FufVxuICpcbiAqIEBwYXJhbSB7T2JzZXJ2YWJsZX0gaW5wdXQxIEFuIGlucHV0IE9ic2VydmFibGUgdG8gbWVyZ2Ugd2l0aCBvdGhlcnMuXG4gKiBAcGFyYW0ge09ic2VydmFibGV9IGlucHV0MiBBbiBpbnB1dCBPYnNlcnZhYmxlIHRvIG1lcmdlIHdpdGggb3RoZXJzLlxuICogQHBhcmFtIHtudW1iZXJ9IFtjb25jdXJyZW50PU51bWJlci5QT1NJVElWRV9JTkZJTklUWV0gTWF4aW11bSBudW1iZXIgb2YgaW5wdXRcbiAqIE9ic2VydmFibGVzIGJlaW5nIHN1YnNjcmliZWQgdG8gY29uY3VycmVudGx5LlxuICogQHBhcmFtIHtTY2hlZHVsZXJ9IFtzY2hlZHVsZXI9bnVsbF0gVGhlIFNjaGVkdWxlciB0byB1c2UgZm9yIG1hbmFnaW5nXG4gKiBjb25jdXJyZW5jeSBvZiBpbnB1dCBPYnNlcnZhYmxlcy5cbiAqIEByZXR1cm4ge09ic2VydmFibGV9IGFuIE9ic2VydmFibGUgdGhhdCBlbWl0cyBpdGVtcyB0aGF0IGFyZSB0aGUgcmVzdWx0IG9mXG4gKiBldmVyeSBpbnB1dCBPYnNlcnZhYmxlLlxuICogQHN0YXRpYyB0cnVlXG4gKiBAbmFtZSBtZXJnZVxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlU3RhdGljKC4uLm9ic2VydmFibGVzKSB7XG4gICAgbGV0IGNvbmN1cnJlbnQgPSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFk7XG4gICAgbGV0IHNjaGVkdWxlciA9IG51bGw7XG4gICAgbGV0IGxhc3QgPSBvYnNlcnZhYmxlc1tvYnNlcnZhYmxlcy5sZW5ndGggLSAxXTtcbiAgICBpZiAoaXNTY2hlZHVsZXIobGFzdCkpIHtcbiAgICAgICAgc2NoZWR1bGVyID0gb2JzZXJ2YWJsZXMucG9wKCk7XG4gICAgICAgIGlmIChvYnNlcnZhYmxlcy5sZW5ndGggPiAxICYmIHR5cGVvZiBvYnNlcnZhYmxlc1tvYnNlcnZhYmxlcy5sZW5ndGggLSAxXSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIGNvbmN1cnJlbnQgPSBvYnNlcnZhYmxlcy5wb3AoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgbGFzdCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgY29uY3VycmVudCA9IG9ic2VydmFibGVzLnBvcCgpO1xuICAgIH1cbiAgICBpZiAob2JzZXJ2YWJsZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHJldHVybiBvYnNlcnZhYmxlc1swXTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBBcnJheU9ic2VydmFibGUob2JzZXJ2YWJsZXMsIHNjaGVkdWxlcikubGlmdChuZXcgTWVyZ2VBbGxPcGVyYXRvcihjb25jdXJyZW50KSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tZXJnZS5qcy5tYXAiLCJpbXBvcnQgeyBPdXRlclN1YnNjcmliZXIgfSBmcm9tICcuLi9PdXRlclN1YnNjcmliZXInO1xuaW1wb3J0IHsgc3Vic2NyaWJlVG9SZXN1bHQgfSBmcm9tICcuLi91dGlsL3N1YnNjcmliZVRvUmVzdWx0Jztcbi8qKlxuICogQ29udmVydHMgYSBoaWdoZXItb3JkZXIgT2JzZXJ2YWJsZSBpbnRvIGEgZmlyc3Qtb3JkZXIgT2JzZXJ2YWJsZSB3aGljaFxuICogY29uY3VycmVudGx5IGRlbGl2ZXJzIGFsbCB2YWx1ZXMgdGhhdCBhcmUgZW1pdHRlZCBvbiB0aGUgaW5uZXIgT2JzZXJ2YWJsZXMuXG4gKlxuICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPkZsYXR0ZW5zIGFuIE9ic2VydmFibGUtb2YtT2JzZXJ2YWJsZXMuPC9zcGFuPlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvbWVyZ2VBbGwucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gKlxuICogYG1lcmdlQWxsYCBzdWJzY3JpYmVzIHRvIGFuIE9ic2VydmFibGUgdGhhdCBlbWl0cyBPYnNlcnZhYmxlcywgYWxzbyBrbm93biBhc1xuICogYSBoaWdoZXItb3JkZXIgT2JzZXJ2YWJsZS4gRWFjaCB0aW1lIGl0IG9ic2VydmVzIG9uZSBvZiB0aGVzZSBlbWl0dGVkIGlubmVyXG4gKiBPYnNlcnZhYmxlcywgaXQgc3Vic2NyaWJlcyB0byB0aGF0IGFuZCBkZWxpdmVycyBhbGwgdGhlIHZhbHVlcyBmcm9tIHRoZVxuICogaW5uZXIgT2JzZXJ2YWJsZSBvbiB0aGUgb3V0cHV0IE9ic2VydmFibGUuIFRoZSBvdXRwdXQgT2JzZXJ2YWJsZSBvbmx5XG4gKiBjb21wbGV0ZXMgb25jZSBhbGwgaW5uZXIgT2JzZXJ2YWJsZXMgaGF2ZSBjb21wbGV0ZWQuIEFueSBlcnJvciBkZWxpdmVyZWQgYnlcbiAqIGEgaW5uZXIgT2JzZXJ2YWJsZSB3aWxsIGJlIGltbWVkaWF0ZWx5IGVtaXR0ZWQgb24gdGhlIG91dHB1dCBPYnNlcnZhYmxlLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPlNwYXduIGEgbmV3IGludGVydmFsIE9ic2VydmFibGUgZm9yIGVhY2ggY2xpY2sgZXZlbnQsIGFuZCBibGVuZCB0aGVpciBvdXRwdXRzIGFzIG9uZSBPYnNlcnZhYmxlPC9jYXB0aW9uPlxuICogdmFyIGNsaWNrcyA9IFJ4Lk9ic2VydmFibGUuZnJvbUV2ZW50KGRvY3VtZW50LCAnY2xpY2snKTtcbiAqIHZhciBoaWdoZXJPcmRlciA9IGNsaWNrcy5tYXAoKGV2KSA9PiBSeC5PYnNlcnZhYmxlLmludGVydmFsKDEwMDApKTtcbiAqIHZhciBmaXJzdE9yZGVyID0gaGlnaGVyT3JkZXIubWVyZ2VBbGwoKTtcbiAqIGZpcnN0T3JkZXIuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNvdW50IGZyb20gMCB0byA5IGV2ZXJ5IHNlY29uZCBmb3IgZWFjaCBjbGljaywgYnV0IG9ubHkgYWxsb3cgMiBjb25jdXJyZW50IHRpbWVyczwvY2FwdGlvbj5cbiAqIHZhciBjbGlja3MgPSBSeC5PYnNlcnZhYmxlLmZyb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJyk7XG4gKiB2YXIgaGlnaGVyT3JkZXIgPSBjbGlja3MubWFwKChldikgPT4gUnguT2JzZXJ2YWJsZS5pbnRlcnZhbCgxMDAwKS50YWtlKDEwKSk7XG4gKiB2YXIgZmlyc3RPcmRlciA9IGhpZ2hlck9yZGVyLm1lcmdlQWxsKDIpO1xuICogZmlyc3RPcmRlci5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gKlxuICogQHNlZSB7QGxpbmsgY29tYmluZUFsbH1cbiAqIEBzZWUge0BsaW5rIGNvbmNhdEFsbH1cbiAqIEBzZWUge0BsaW5rIGV4aGF1c3R9XG4gKiBAc2VlIHtAbGluayBtZXJnZX1cbiAqIEBzZWUge0BsaW5rIG1lcmdlTWFwfVxuICogQHNlZSB7QGxpbmsgbWVyZ2VNYXBUb31cbiAqIEBzZWUge0BsaW5rIG1lcmdlU2Nhbn1cbiAqIEBzZWUge0BsaW5rIHN3aXRjaH1cbiAqIEBzZWUge0BsaW5rIHppcEFsbH1cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gW2NvbmN1cnJlbnQ9TnVtYmVyLlBPU0lUSVZFX0lORklOSVRZXSBNYXhpbXVtIG51bWJlciBvZiBpbm5lclxuICogT2JzZXJ2YWJsZXMgYmVpbmcgc3Vic2NyaWJlZCB0byBjb25jdXJyZW50bHkuXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSBBbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgdmFsdWVzIGNvbWluZyBmcm9tIGFsbCB0aGVcbiAqIGlubmVyIE9ic2VydmFibGVzIGVtaXR0ZWQgYnkgdGhlIHNvdXJjZSBPYnNlcnZhYmxlLlxuICogQG1ldGhvZCBtZXJnZUFsbFxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlQWxsKGNvbmN1cnJlbnQgPSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFkpIHtcbiAgICByZXR1cm4gdGhpcy5saWZ0KG5ldyBNZXJnZUFsbE9wZXJhdG9yKGNvbmN1cnJlbnQpKTtcbn1cbmV4cG9ydCBjbGFzcyBNZXJnZUFsbE9wZXJhdG9yIHtcbiAgICBjb25zdHJ1Y3Rvcihjb25jdXJyZW50KSB7XG4gICAgICAgIHRoaXMuY29uY3VycmVudCA9IGNvbmN1cnJlbnQ7XG4gICAgfVxuICAgIGNhbGwob2JzZXJ2ZXIsIHNvdXJjZSkge1xuICAgICAgICByZXR1cm4gc291cmNlLl9zdWJzY3JpYmUobmV3IE1lcmdlQWxsU3Vic2NyaWJlcihvYnNlcnZlciwgdGhpcy5jb25jdXJyZW50KSk7XG4gICAgfVxufVxuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbmV4cG9ydCBjbGFzcyBNZXJnZUFsbFN1YnNjcmliZXIgZXh0ZW5kcyBPdXRlclN1YnNjcmliZXIge1xuICAgIGNvbnN0cnVjdG9yKGRlc3RpbmF0aW9uLCBjb25jdXJyZW50KSB7XG4gICAgICAgIHN1cGVyKGRlc3RpbmF0aW9uKTtcbiAgICAgICAgdGhpcy5jb25jdXJyZW50ID0gY29uY3VycmVudDtcbiAgICAgICAgdGhpcy5oYXNDb21wbGV0ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5idWZmZXIgPSBbXTtcbiAgICAgICAgdGhpcy5hY3RpdmUgPSAwO1xuICAgIH1cbiAgICBfbmV4dChvYnNlcnZhYmxlKSB7XG4gICAgICAgIGlmICh0aGlzLmFjdGl2ZSA8IHRoaXMuY29uY3VycmVudCkge1xuICAgICAgICAgICAgdGhpcy5hY3RpdmUrKztcbiAgICAgICAgICAgIHRoaXMuYWRkKHN1YnNjcmliZVRvUmVzdWx0KHRoaXMsIG9ic2VydmFibGUpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYnVmZmVyLnB1c2gob2JzZXJ2YWJsZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX2NvbXBsZXRlKCkge1xuICAgICAgICB0aGlzLmhhc0NvbXBsZXRlZCA9IHRydWU7XG4gICAgICAgIGlmICh0aGlzLmFjdGl2ZSA9PT0gMCAmJiB0aGlzLmJ1ZmZlci5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuZGVzdGluYXRpb24uY29tcGxldGUoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBub3RpZnlDb21wbGV0ZShpbm5lclN1Yikge1xuICAgICAgICBjb25zdCBidWZmZXIgPSB0aGlzLmJ1ZmZlcjtcbiAgICAgICAgdGhpcy5yZW1vdmUoaW5uZXJTdWIpO1xuICAgICAgICB0aGlzLmFjdGl2ZS0tO1xuICAgICAgICBpZiAoYnVmZmVyLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuX25leHQoYnVmZmVyLnNoaWZ0KCkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuYWN0aXZlID09PSAwICYmIHRoaXMuaGFzQ29tcGxldGVkKSB7XG4gICAgICAgICAgICB0aGlzLmRlc3RpbmF0aW9uLmNvbXBsZXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tZXJnZUFsbC5qcy5tYXAiLCJpbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi4vU3Vic2NyaWJlcic7XG4vKipcbiAqIFJldHVybnMgYW4gT2JzZXJ2YWJsZSB0aGF0IG1pcnJvcnMgdGhlIHNvdXJjZSBPYnNlcnZhYmxlLCByZXN1YnNjcmliaW5nIHRvIGl0IGlmIGl0IGNhbGxzIGBlcnJvcmAgYW5kIHRoZVxuICogcHJlZGljYXRlIHJldHVybnMgdHJ1ZSBmb3IgdGhhdCBzcGVjaWZpYyBleGNlcHRpb24gYW5kIHJldHJ5IGNvdW50LlxuICogSWYgdGhlIHNvdXJjZSBPYnNlcnZhYmxlIGNhbGxzIGBlcnJvcmAsIHRoaXMgbWV0aG9kIHdpbGwgcmVzdWJzY3JpYmUgdG8gdGhlIHNvdXJjZSBPYnNlcnZhYmxlIGZvciBhIG1heGltdW0gb2ZcbiAqIGNvdW50IHJlc3Vic2NyaXB0aW9ucyAoZ2l2ZW4gYXMgYSBudW1iZXIgcGFyYW1ldGVyKSByYXRoZXIgdGhhbiBwcm9wYWdhdGluZyB0aGUgYGVycm9yYCBjYWxsLlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvcmV0cnkucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gKlxuICogQW55IGFuZCBhbGwgaXRlbXMgZW1pdHRlZCBieSB0aGUgc291cmNlIE9ic2VydmFibGUgd2lsbCBiZSBlbWl0dGVkIGJ5IHRoZSByZXN1bHRpbmcgT2JzZXJ2YWJsZSwgZXZlbiB0aG9zZSBlbWl0dGVkXG4gKiBkdXJpbmcgZmFpbGVkIHN1YnNjcmlwdGlvbnMuIEZvciBleGFtcGxlLCBpZiBhbiBPYnNlcnZhYmxlIGZhaWxzIGF0IGZpcnN0IGJ1dCBlbWl0cyBbMSwgMl0gdGhlbiBzdWNjZWVkcyB0aGUgc2Vjb25kXG4gKiB0aW1lIGFuZCBlbWl0czogWzEsIDIsIDMsIDQsIDVdIHRoZW4gdGhlIGNvbXBsZXRlIHN0cmVhbSBvZiBlbWlzc2lvbnMgYW5kIG5vdGlmaWNhdGlvbnNcbiAqIHdvdWxkIGJlOiBbMSwgMiwgMSwgMiwgMywgNCwgNSwgYGNvbXBsZXRlYF0uXG4gKiBAcGFyYW0ge251bWJlcn0gbnVtYmVyIG9mIHJldHJ5IGF0dGVtcHRzIGJlZm9yZSBmYWlsaW5nLlxuICogQHJldHVybiB7T2JzZXJ2YWJsZX0gdGhlIHNvdXJjZSBPYnNlcnZhYmxlIG1vZGlmaWVkIHdpdGggdGhlIHJldHJ5IGxvZ2ljLlxuICogQG1ldGhvZCByZXRyeVxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJldHJ5KGNvdW50ID0gLTEpIHtcbiAgICByZXR1cm4gdGhpcy5saWZ0KG5ldyBSZXRyeU9wZXJhdG9yKGNvdW50LCB0aGlzKSk7XG59XG5jbGFzcyBSZXRyeU9wZXJhdG9yIHtcbiAgICBjb25zdHJ1Y3Rvcihjb3VudCwgc291cmNlKSB7XG4gICAgICAgIHRoaXMuY291bnQgPSBjb3VudDtcbiAgICAgICAgdGhpcy5zb3VyY2UgPSBzb3VyY2U7XG4gICAgfVxuICAgIGNhbGwoc3Vic2NyaWJlciwgc291cmNlKSB7XG4gICAgICAgIHJldHVybiBzb3VyY2UuX3N1YnNjcmliZShuZXcgUmV0cnlTdWJzY3JpYmVyKHN1YnNjcmliZXIsIHRoaXMuY291bnQsIHRoaXMuc291cmNlKSk7XG4gICAgfVxufVxuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbmNsYXNzIFJldHJ5U3Vic2NyaWJlciBleHRlbmRzIFN1YnNjcmliZXIge1xuICAgIGNvbnN0cnVjdG9yKGRlc3RpbmF0aW9uLCBjb3VudCwgc291cmNlKSB7XG4gICAgICAgIHN1cGVyKGRlc3RpbmF0aW9uKTtcbiAgICAgICAgdGhpcy5jb3VudCA9IGNvdW50O1xuICAgICAgICB0aGlzLnNvdXJjZSA9IHNvdXJjZTtcbiAgICB9XG4gICAgZXJyb3IoZXJyKSB7XG4gICAgICAgIGlmICghdGhpcy5pc1N0b3BwZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgc291cmNlLCBjb3VudCB9ID0gdGhpcztcbiAgICAgICAgICAgIGlmIChjb3VudCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzdXBlci5lcnJvcihlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY291bnQgPiAtMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY291bnQgPSBjb3VudCAtIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB0aGlzLmlzU3RvcHBlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5jbG9zZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHNvdXJjZS5zdWJzY3JpYmUodGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1yZXRyeS5qcy5tYXAiLCJpbXBvcnQgeyBPdXRlclN1YnNjcmliZXIgfSBmcm9tICcuLi9PdXRlclN1YnNjcmliZXInO1xuaW1wb3J0IHsgc3Vic2NyaWJlVG9SZXN1bHQgfSBmcm9tICcuLi91dGlsL3N1YnNjcmliZVRvUmVzdWx0Jztcbi8qKlxuICogQ29udmVydHMgYSBoaWdoZXItb3JkZXIgT2JzZXJ2YWJsZSBpbnRvIGEgZmlyc3Qtb3JkZXIgT2JzZXJ2YWJsZSBieVxuICogc3Vic2NyaWJpbmcgdG8gb25seSB0aGUgbW9zdCByZWNlbnRseSBlbWl0dGVkIG9mIHRob3NlIGlubmVyIE9ic2VydmFibGVzLlxuICpcbiAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5GbGF0dGVucyBhbiBPYnNlcnZhYmxlLW9mLU9ic2VydmFibGVzIGJ5IGRyb3BwaW5nIHRoZVxuICogcHJldmlvdXMgaW5uZXIgT2JzZXJ2YWJsZSBvbmNlIGEgbmV3IG9uZSBhcHBlYXJzLjwvc3Bhbj5cbiAqXG4gKiA8aW1nIHNyYz1cIi4vaW1nL3N3aXRjaC5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAqXG4gKiBgc3dpdGNoYCBzdWJzY3JpYmVzIHRvIGFuIE9ic2VydmFibGUgdGhhdCBlbWl0cyBPYnNlcnZhYmxlcywgYWxzbyBrbm93biBhcyBhXG4gKiBoaWdoZXItb3JkZXIgT2JzZXJ2YWJsZS4gRWFjaCB0aW1lIGl0IG9ic2VydmVzIG9uZSBvZiB0aGVzZSBlbWl0dGVkIGlubmVyXG4gKiBPYnNlcnZhYmxlcywgdGhlIG91dHB1dCBPYnNlcnZhYmxlIHN1YnNjcmliZXMgdG8gdGhlIGlubmVyIE9ic2VydmFibGUgYW5kXG4gKiBiZWdpbnMgZW1pdHRpbmcgdGhlIGl0ZW1zIGVtaXR0ZWQgYnkgdGhhdC4gU28gZmFyLCBpdCBiZWhhdmVzXG4gKiBsaWtlIHtAbGluayBtZXJnZUFsbH0uIEhvd2V2ZXIsIHdoZW4gYSBuZXcgaW5uZXIgT2JzZXJ2YWJsZSBpcyBlbWl0dGVkLFxuICogYHN3aXRjaGAgdW5zdWJzY3JpYmVzIGZyb20gdGhlIGVhcmxpZXItZW1pdHRlZCBpbm5lciBPYnNlcnZhYmxlIGFuZFxuICogc3Vic2NyaWJlcyB0byB0aGUgbmV3IGlubmVyIE9ic2VydmFibGUgYW5kIGJlZ2lucyBlbWl0dGluZyBpdGVtcyBmcm9tIGl0LiBJdFxuICogY29udGludWVzIHRvIGJlaGF2ZSBsaWtlIHRoaXMgZm9yIHN1YnNlcXVlbnQgaW5uZXIgT2JzZXJ2YWJsZXMuXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+UmVydW4gYW4gaW50ZXJ2YWwgT2JzZXJ2YWJsZSBvbiBldmVyeSBjbGljayBldmVudDwvY2FwdGlvbj5cbiAqIHZhciBjbGlja3MgPSBSeC5PYnNlcnZhYmxlLmZyb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJyk7XG4gKiAvLyBFYWNoIGNsaWNrIGV2ZW50IGlzIG1hcHBlZCB0byBhbiBPYnNlcnZhYmxlIHRoYXQgdGlja3MgZXZlcnkgc2Vjb25kXG4gKiB2YXIgaGlnaGVyT3JkZXIgPSBjbGlja3MubWFwKChldikgPT4gUnguT2JzZXJ2YWJsZS5pbnRlcnZhbCgxMDAwKSk7XG4gKiB2YXIgc3dpdGNoZWQgPSBoaWdoZXJPcmRlci5zd2l0Y2goKTtcbiAqIC8vIFRoZSBvdXRjb21lIGlzIHRoYXQgYHN3aXRjaGVkYCBpcyBlc3NlbnRpYWxseSBhIHRpbWVyIHRoYXQgcmVzdGFydHNcbiAqIC8vIG9uIGV2ZXJ5IGNsaWNrLiBUaGUgaW50ZXJ2YWwgT2JzZXJ2YWJsZXMgZnJvbSBvbGRlciBjbGlja3MgZG8gbm90IG1lcmdlXG4gKiAvLyB3aXRoIHRoZSBjdXJyZW50IGludGVydmFsIE9ic2VydmFibGUuXG4gKiBzd2l0Y2hlZC5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gKlxuICogQHNlZSB7QGxpbmsgY29tYmluZUFsbH1cbiAqIEBzZWUge0BsaW5rIGNvbmNhdEFsbH1cbiAqIEBzZWUge0BsaW5rIGV4aGF1c3R9XG4gKiBAc2VlIHtAbGluayBtZXJnZUFsbH1cbiAqIEBzZWUge0BsaW5rIHN3aXRjaE1hcH1cbiAqIEBzZWUge0BsaW5rIHN3aXRjaE1hcFRvfVxuICogQHNlZSB7QGxpbmsgemlwQWxsfVxuICpcbiAqIEByZXR1cm4ge09ic2VydmFibGU8VD59IEFuIE9ic2VydmFibGUgdGhhdCBlbWl0cyB0aGUgaXRlbXMgZW1pdHRlZCBieSB0aGVcbiAqIE9ic2VydmFibGUgbW9zdCByZWNlbnRseSBlbWl0dGVkIGJ5IHRoZSBzb3VyY2UgT2JzZXJ2YWJsZS5cbiAqIEBtZXRob2Qgc3dpdGNoXG4gKiBAbmFtZSBzd2l0Y2hcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfc3dpdGNoKCkge1xuICAgIHJldHVybiB0aGlzLmxpZnQobmV3IFN3aXRjaE9wZXJhdG9yKCkpO1xufVxuY2xhc3MgU3dpdGNoT3BlcmF0b3Ige1xuICAgIGNhbGwoc3Vic2NyaWJlciwgc291cmNlKSB7XG4gICAgICAgIHJldHVybiBzb3VyY2UuX3N1YnNjcmliZShuZXcgU3dpdGNoU3Vic2NyaWJlcihzdWJzY3JpYmVyKSk7XG4gICAgfVxufVxuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbmNsYXNzIFN3aXRjaFN1YnNjcmliZXIgZXh0ZW5kcyBPdXRlclN1YnNjcmliZXIge1xuICAgIGNvbnN0cnVjdG9yKGRlc3RpbmF0aW9uKSB7XG4gICAgICAgIHN1cGVyKGRlc3RpbmF0aW9uKTtcbiAgICAgICAgdGhpcy5hY3RpdmUgPSAwO1xuICAgICAgICB0aGlzLmhhc0NvbXBsZXRlZCA9IGZhbHNlO1xuICAgIH1cbiAgICBfbmV4dCh2YWx1ZSkge1xuICAgICAgICB0aGlzLnVuc3Vic2NyaWJlSW5uZXIoKTtcbiAgICAgICAgdGhpcy5hY3RpdmUrKztcbiAgICAgICAgdGhpcy5hZGQodGhpcy5pbm5lclN1YnNjcmlwdGlvbiA9IHN1YnNjcmliZVRvUmVzdWx0KHRoaXMsIHZhbHVlKSk7XG4gICAgfVxuICAgIF9jb21wbGV0ZSgpIHtcbiAgICAgICAgdGhpcy5oYXNDb21wbGV0ZWQgPSB0cnVlO1xuICAgICAgICBpZiAodGhpcy5hY3RpdmUgPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuZGVzdGluYXRpb24uY29tcGxldGUoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB1bnN1YnNjcmliZUlubmVyKCkge1xuICAgICAgICB0aGlzLmFjdGl2ZSA9IHRoaXMuYWN0aXZlID4gMCA/IHRoaXMuYWN0aXZlIC0gMSA6IDA7XG4gICAgICAgIGNvbnN0IGlubmVyU3Vic2NyaXB0aW9uID0gdGhpcy5pbm5lclN1YnNjcmlwdGlvbjtcbiAgICAgICAgaWYgKGlubmVyU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICBpbm5lclN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgdGhpcy5yZW1vdmUoaW5uZXJTdWJzY3JpcHRpb24pO1xuICAgICAgICB9XG4gICAgfVxuICAgIG5vdGlmeU5leHQob3V0ZXJWYWx1ZSwgaW5uZXJWYWx1ZSwgb3V0ZXJJbmRleCwgaW5uZXJJbmRleCwgaW5uZXJTdWIpIHtcbiAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5uZXh0KGlubmVyVmFsdWUpO1xuICAgIH1cbiAgICBub3RpZnlFcnJvcihlcnIpIHtcbiAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5lcnJvcihlcnIpO1xuICAgIH1cbiAgICBub3RpZnlDb21wbGV0ZSgpIHtcbiAgICAgICAgdGhpcy51bnN1YnNjcmliZUlubmVyKCk7XG4gICAgICAgIGlmICh0aGlzLmhhc0NvbXBsZXRlZCAmJiB0aGlzLmFjdGl2ZSA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5jb21wbGV0ZSgpO1xuICAgICAgICB9XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c3dpdGNoLmpzLm1hcCIsImltcG9ydCB7IE91dGVyU3Vic2NyaWJlciB9IGZyb20gJy4uL091dGVyU3Vic2NyaWJlcic7XG5pbXBvcnQgeyBzdWJzY3JpYmVUb1Jlc3VsdCB9IGZyb20gJy4uL3V0aWwvc3Vic2NyaWJlVG9SZXN1bHQnO1xuLyoqXG4gKiBQcm9qZWN0cyBlYWNoIHNvdXJjZSB2YWx1ZSB0byBhbiBPYnNlcnZhYmxlIHdoaWNoIGlzIG1lcmdlZCBpbiB0aGUgb3V0cHV0XG4gKiBPYnNlcnZhYmxlLCBlbWl0dGluZyB2YWx1ZXMgb25seSBmcm9tIHRoZSBtb3N0IHJlY2VudGx5IHByb2plY3RlZCBPYnNlcnZhYmxlLlxuICpcbiAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5NYXBzIGVhY2ggdmFsdWUgdG8gYW4gT2JzZXJ2YWJsZSwgdGhlbiBmbGF0dGVucyBhbGwgb2ZcbiAqIHRoZXNlIGlubmVyIE9ic2VydmFibGVzIHVzaW5nIHtAbGluayBzd2l0Y2h9Ljwvc3Bhbj5cbiAqXG4gKiA8aW1nIHNyYz1cIi4vaW1nL3N3aXRjaE1hcC5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAqXG4gKiBSZXR1cm5zIGFuIE9ic2VydmFibGUgdGhhdCBlbWl0cyBpdGVtcyBiYXNlZCBvbiBhcHBseWluZyBhIGZ1bmN0aW9uIHRoYXQgeW91XG4gKiBzdXBwbHkgdG8gZWFjaCBpdGVtIGVtaXR0ZWQgYnkgdGhlIHNvdXJjZSBPYnNlcnZhYmxlLCB3aGVyZSB0aGF0IGZ1bmN0aW9uXG4gKiByZXR1cm5zIGFuIChzby1jYWxsZWQgXCJpbm5lclwiKSBPYnNlcnZhYmxlLiBFYWNoIHRpbWUgaXQgb2JzZXJ2ZXMgb25lIG9mIHRoZXNlXG4gKiBpbm5lciBPYnNlcnZhYmxlcywgdGhlIG91dHB1dCBPYnNlcnZhYmxlIGJlZ2lucyBlbWl0dGluZyB0aGUgaXRlbXMgZW1pdHRlZCBieVxuICogdGhhdCBpbm5lciBPYnNlcnZhYmxlLiBXaGVuIGEgbmV3IGlubmVyIE9ic2VydmFibGUgaXMgZW1pdHRlZCwgYHN3aXRjaE1hcGBcbiAqIHN0b3BzIGVtaXR0aW5nIGl0ZW1zIGZyb20gdGhlIGVhcmxpZXItZW1pdHRlZCBpbm5lciBPYnNlcnZhYmxlIGFuZCBiZWdpbnNcbiAqIGVtaXR0aW5nIGl0ZW1zIGZyb20gdGhlIG5ldyBvbmUuIEl0IGNvbnRpbnVlcyB0byBiZWhhdmUgbGlrZSB0aGlzIGZvclxuICogc3Vic2VxdWVudCBpbm5lciBPYnNlcnZhYmxlcy5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5SZXJ1biBhbiBpbnRlcnZhbCBPYnNlcnZhYmxlIG9uIGV2ZXJ5IGNsaWNrIGV2ZW50PC9jYXB0aW9uPlxuICogdmFyIGNsaWNrcyA9IFJ4Lk9ic2VydmFibGUuZnJvbUV2ZW50KGRvY3VtZW50LCAnY2xpY2snKTtcbiAqIHZhciByZXN1bHQgPSBjbGlja3Muc3dpdGNoTWFwKChldikgPT4gUnguT2JzZXJ2YWJsZS5pbnRlcnZhbCgxMDAwKSk7XG4gKiByZXN1bHQuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICpcbiAqIEBzZWUge0BsaW5rIGNvbmNhdE1hcH1cbiAqIEBzZWUge0BsaW5rIGV4aGF1c3RNYXB9XG4gKiBAc2VlIHtAbGluayBtZXJnZU1hcH1cbiAqIEBzZWUge0BsaW5rIHN3aXRjaH1cbiAqIEBzZWUge0BsaW5rIHN3aXRjaE1hcFRvfVxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb24odmFsdWU6IFQsID9pbmRleDogbnVtYmVyKTogT2JzZXJ2YWJsZX0gcHJvamVjdCBBIGZ1bmN0aW9uXG4gKiB0aGF0LCB3aGVuIGFwcGxpZWQgdG8gYW4gaXRlbSBlbWl0dGVkIGJ5IHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSwgcmV0dXJucyBhblxuICogT2JzZXJ2YWJsZS5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24ob3V0ZXJWYWx1ZTogVCwgaW5uZXJWYWx1ZTogSSwgb3V0ZXJJbmRleDogbnVtYmVyLCBpbm5lckluZGV4OiBudW1iZXIpOiBhbnl9IFtyZXN1bHRTZWxlY3Rvcl1cbiAqIEEgZnVuY3Rpb24gdG8gcHJvZHVjZSB0aGUgdmFsdWUgb24gdGhlIG91dHB1dCBPYnNlcnZhYmxlIGJhc2VkIG9uIHRoZSB2YWx1ZXNcbiAqIGFuZCB0aGUgaW5kaWNlcyBvZiB0aGUgc291cmNlIChvdXRlcikgZW1pc3Npb24gYW5kIHRoZSBpbm5lciBPYnNlcnZhYmxlXG4gKiBlbWlzc2lvbi4gVGhlIGFyZ3VtZW50cyBwYXNzZWQgdG8gdGhpcyBmdW5jdGlvbiBhcmU6XG4gKiAtIGBvdXRlclZhbHVlYDogdGhlIHZhbHVlIHRoYXQgY2FtZSBmcm9tIHRoZSBzb3VyY2VcbiAqIC0gYGlubmVyVmFsdWVgOiB0aGUgdmFsdWUgdGhhdCBjYW1lIGZyb20gdGhlIHByb2plY3RlZCBPYnNlcnZhYmxlXG4gKiAtIGBvdXRlckluZGV4YDogdGhlIFwiaW5kZXhcIiBvZiB0aGUgdmFsdWUgdGhhdCBjYW1lIGZyb20gdGhlIHNvdXJjZVxuICogLSBgaW5uZXJJbmRleGA6IHRoZSBcImluZGV4XCIgb2YgdGhlIHZhbHVlIGZyb20gdGhlIHByb2plY3RlZCBPYnNlcnZhYmxlXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSBBbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgdGhlIHJlc3VsdCBvZiBhcHBseWluZyB0aGVcbiAqIHByb2plY3Rpb24gZnVuY3Rpb24gKGFuZCB0aGUgb3B0aW9uYWwgYHJlc3VsdFNlbGVjdG9yYCkgdG8gZWFjaCBpdGVtIGVtaXR0ZWRcbiAqIGJ5IHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSBhbmQgdGFraW5nIG9ubHkgdGhlIHZhbHVlcyBmcm9tIHRoZSBtb3N0IHJlY2VudGx5XG4gKiBwcm9qZWN0ZWQgaW5uZXIgT2JzZXJ2YWJsZS5cbiAqIEBtZXRob2Qgc3dpdGNoTWFwXG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gc3dpdGNoTWFwKHByb2plY3QsIHJlc3VsdFNlbGVjdG9yKSB7XG4gICAgcmV0dXJuIHRoaXMubGlmdChuZXcgU3dpdGNoTWFwT3BlcmF0b3IocHJvamVjdCwgcmVzdWx0U2VsZWN0b3IpKTtcbn1cbmNsYXNzIFN3aXRjaE1hcE9wZXJhdG9yIHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9qZWN0LCByZXN1bHRTZWxlY3Rvcikge1xuICAgICAgICB0aGlzLnByb2plY3QgPSBwcm9qZWN0O1xuICAgICAgICB0aGlzLnJlc3VsdFNlbGVjdG9yID0gcmVzdWx0U2VsZWN0b3I7XG4gICAgfVxuICAgIGNhbGwoc3Vic2NyaWJlciwgc291cmNlKSB7XG4gICAgICAgIHJldHVybiBzb3VyY2UuX3N1YnNjcmliZShuZXcgU3dpdGNoTWFwU3Vic2NyaWJlcihzdWJzY3JpYmVyLCB0aGlzLnByb2plY3QsIHRoaXMucmVzdWx0U2VsZWN0b3IpKTtcbiAgICB9XG59XG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAaWdub3JlXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqL1xuY2xhc3MgU3dpdGNoTWFwU3Vic2NyaWJlciBleHRlbmRzIE91dGVyU3Vic2NyaWJlciB7XG4gICAgY29uc3RydWN0b3IoZGVzdGluYXRpb24sIHByb2plY3QsIHJlc3VsdFNlbGVjdG9yKSB7XG4gICAgICAgIHN1cGVyKGRlc3RpbmF0aW9uKTtcbiAgICAgICAgdGhpcy5wcm9qZWN0ID0gcHJvamVjdDtcbiAgICAgICAgdGhpcy5yZXN1bHRTZWxlY3RvciA9IHJlc3VsdFNlbGVjdG9yO1xuICAgICAgICB0aGlzLmluZGV4ID0gMDtcbiAgICB9XG4gICAgX25leHQodmFsdWUpIHtcbiAgICAgICAgbGV0IHJlc3VsdDtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmluZGV4Kys7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXN1bHQgPSB0aGlzLnByb2plY3QodmFsdWUsIGluZGV4KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHRoaXMuZGVzdGluYXRpb24uZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2lubmVyU3ViKHJlc3VsdCwgdmFsdWUsIGluZGV4KTtcbiAgICB9XG4gICAgX2lubmVyU3ViKHJlc3VsdCwgdmFsdWUsIGluZGV4KSB7XG4gICAgICAgIGNvbnN0IGlubmVyU3Vic2NyaXB0aW9uID0gdGhpcy5pbm5lclN1YnNjcmlwdGlvbjtcbiAgICAgICAgaWYgKGlubmVyU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICBpbm5lclN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYWRkKHRoaXMuaW5uZXJTdWJzY3JpcHRpb24gPSBzdWJzY3JpYmVUb1Jlc3VsdCh0aGlzLCByZXN1bHQsIHZhbHVlLCBpbmRleCkpO1xuICAgIH1cbiAgICBfY29tcGxldGUoKSB7XG4gICAgICAgIGNvbnN0IHsgaW5uZXJTdWJzY3JpcHRpb24gfSA9IHRoaXM7XG4gICAgICAgIGlmICghaW5uZXJTdWJzY3JpcHRpb24gfHwgaW5uZXJTdWJzY3JpcHRpb24uY2xvc2VkKSB7XG4gICAgICAgICAgICBzdXBlci5fY29tcGxldGUoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBfdW5zdWJzY3JpYmUoKSB7XG4gICAgICAgIHRoaXMuaW5uZXJTdWJzY3JpcHRpb24gPSBudWxsO1xuICAgIH1cbiAgICBub3RpZnlDb21wbGV0ZShpbm5lclN1Yikge1xuICAgICAgICB0aGlzLnJlbW92ZShpbm5lclN1Yik7XG4gICAgICAgIHRoaXMuaW5uZXJTdWJzY3JpcHRpb24gPSBudWxsO1xuICAgICAgICBpZiAodGhpcy5pc1N0b3BwZWQpIHtcbiAgICAgICAgICAgIHN1cGVyLl9jb21wbGV0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIG5vdGlmeU5leHQob3V0ZXJWYWx1ZSwgaW5uZXJWYWx1ZSwgb3V0ZXJJbmRleCwgaW5uZXJJbmRleCwgaW5uZXJTdWIpIHtcbiAgICAgICAgaWYgKHRoaXMucmVzdWx0U2VsZWN0b3IpIHtcbiAgICAgICAgICAgIHRoaXMuX3RyeU5vdGlmeU5leHQob3V0ZXJWYWx1ZSwgaW5uZXJWYWx1ZSwgb3V0ZXJJbmRleCwgaW5uZXJJbmRleCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmRlc3RpbmF0aW9uLm5leHQoaW5uZXJWYWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX3RyeU5vdGlmeU5leHQob3V0ZXJWYWx1ZSwgaW5uZXJWYWx1ZSwgb3V0ZXJJbmRleCwgaW5uZXJJbmRleCkge1xuICAgICAgICBsZXQgcmVzdWx0O1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5yZXN1bHRTZWxlY3RvcihvdXRlclZhbHVlLCBpbm5lclZhbHVlLCBvdXRlckluZGV4LCBpbm5lckluZGV4KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICB0aGlzLmRlc3RpbmF0aW9uLmVycm9yKGVycik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5uZXh0KHJlc3VsdCk7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c3dpdGNoTWFwLmpzLm1hcCIsImltcG9ydCB7IHJvb3QgfSBmcm9tICcuLi91dGlsL3Jvb3QnO1xuZXhwb3J0IGxldCAkJGl0ZXJhdG9yO1xuY29uc3QgU3ltYm9sID0gcm9vdC5TeW1ib2w7XG5pZiAodHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGlmIChTeW1ib2wuaXRlcmF0b3IpIHtcbiAgICAgICAgJCRpdGVyYXRvciA9IFN5bWJvbC5pdGVyYXRvcjtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIFN5bWJvbC5mb3IgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgJCRpdGVyYXRvciA9IFN5bWJvbC5mb3IoJ2l0ZXJhdG9yJyk7XG4gICAgfVxufVxuZWxzZSB7XG4gICAgaWYgKHJvb3QuU2V0ICYmIHR5cGVvZiBuZXcgcm9vdC5TZXQoKVsnQEBpdGVyYXRvciddID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIC8vIEJ1ZyBmb3IgbW96aWxsYSB2ZXJzaW9uXG4gICAgICAgICQkaXRlcmF0b3IgPSAnQEBpdGVyYXRvcic7XG4gICAgfVxuICAgIGVsc2UgaWYgKHJvb3QuTWFwKSB7XG4gICAgICAgIC8vIGVzNi1zaGltIHNwZWNpZmljIGxvZ2ljXG4gICAgICAgIGxldCBrZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMocm9vdC5NYXAucHJvdG90eXBlKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBsZXQga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgICAgIGlmIChrZXkgIT09ICdlbnRyaWVzJyAmJiBrZXkgIT09ICdzaXplJyAmJiByb290Lk1hcC5wcm90b3R5cGVba2V5XSA9PT0gcm9vdC5NYXAucHJvdG90eXBlWydlbnRyaWVzJ10pIHtcbiAgICAgICAgICAgICAgICAkJGl0ZXJhdG9yID0ga2V5O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICAkJGl0ZXJhdG9yID0gJ0BAaXRlcmF0b3InO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWl0ZXJhdG9yLmpzLm1hcCIsImltcG9ydCB7IHJvb3QgfSBmcm9tICcuLi91dGlsL3Jvb3QnO1xuZXhwb3J0IGZ1bmN0aW9uIGdldFN5bWJvbE9ic2VydmFibGUoY29udGV4dCkge1xuICAgIGxldCAkJG9ic2VydmFibGU7XG4gICAgbGV0IFN5bWJvbCA9IGNvbnRleHQuU3ltYm9sO1xuICAgIGlmICh0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGlmIChTeW1ib2wub2JzZXJ2YWJsZSkge1xuICAgICAgICAgICAgJCRvYnNlcnZhYmxlID0gU3ltYm9sLm9ic2VydmFibGU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAkJG9ic2VydmFibGUgPSBTeW1ib2woJ29ic2VydmFibGUnKTtcbiAgICAgICAgICAgIFN5bWJvbC5vYnNlcnZhYmxlID0gJCRvYnNlcnZhYmxlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICAkJG9ic2VydmFibGUgPSAnQEBvYnNlcnZhYmxlJztcbiAgICB9XG4gICAgcmV0dXJuICQkb2JzZXJ2YWJsZTtcbn1cbmV4cG9ydCBjb25zdCAkJG9ic2VydmFibGUgPSBnZXRTeW1ib2xPYnNlcnZhYmxlKHJvb3QpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9b2JzZXJ2YWJsZS5qcy5tYXAiLCJpbXBvcnQgeyByb290IH0gZnJvbSAnLi4vdXRpbC9yb290JztcbmNvbnN0IFN5bWJvbCA9IHJvb3QuU3ltYm9sO1xuZXhwb3J0IGNvbnN0ICQkcnhTdWJzY3JpYmVyID0gKHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIFN5bWJvbC5mb3IgPT09ICdmdW5jdGlvbicpID9cbiAgICBTeW1ib2wuZm9yKCdyeFN1YnNjcmliZXInKSA6ICdAQHJ4U3Vic2NyaWJlcic7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1yeFN1YnNjcmliZXIuanMubWFwIiwiLyoqXG4gKiBBbiBlcnJvciB0aHJvd24gd2hlbiBhbiBhY3Rpb24gaXMgaW52YWxpZCBiZWNhdXNlIHRoZSBvYmplY3QgaGFzIGJlZW5cbiAqIHVuc3Vic2NyaWJlZC5cbiAqXG4gKiBAc2VlIHtAbGluayBTdWJqZWN0fVxuICogQHNlZSB7QGxpbmsgQmVoYXZpb3JTdWJqZWN0fVxuICpcbiAqIEBjbGFzcyBPYmplY3RVbnN1YnNjcmliZWRFcnJvclxuICovXG5leHBvcnQgY2xhc3MgT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIGNvbnN0IGVyciA9IHN1cGVyKCdvYmplY3QgdW5zdWJzY3JpYmVkJyk7XG4gICAgICAgIHRoaXMubmFtZSA9IGVyci5uYW1lID0gJ09iamVjdFVuc3Vic2NyaWJlZEVycm9yJztcbiAgICAgICAgdGhpcy5zdGFjayA9IGVyci5zdGFjaztcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gZXJyLm1lc3NhZ2U7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9T2JqZWN0VW5zdWJzY3JpYmVkRXJyb3IuanMubWFwIiwiLyoqXG4gKiBBbiBlcnJvciB0aHJvd24gd2hlbiBvbmUgb3IgbW9yZSBlcnJvcnMgaGF2ZSBvY2N1cnJlZCBkdXJpbmcgdGhlXG4gKiBgdW5zdWJzY3JpYmVgIG9mIGEge0BsaW5rIFN1YnNjcmlwdGlvbn0uXG4gKi9cbmV4cG9ydCBjbGFzcyBVbnN1YnNjcmlwdGlvbkVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKGVycm9ycykge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmVycm9ycyA9IGVycm9ycztcbiAgICAgICAgY29uc3QgZXJyID0gRXJyb3IuY2FsbCh0aGlzLCBlcnJvcnMgP1xuICAgICAgICAgICAgYCR7ZXJyb3JzLmxlbmd0aH0gZXJyb3JzIG9jY3VycmVkIGR1cmluZyB1bnN1YnNjcmlwdGlvbjpcbiAgJHtlcnJvcnMubWFwKChlcnIsIGkpID0+IGAke2kgKyAxfSkgJHtlcnIudG9TdHJpbmcoKX1gKS5qb2luKCdcXG4gICcpfWAgOiAnJyk7XG4gICAgICAgIHRoaXMubmFtZSA9IGVyci5uYW1lID0gJ1Vuc3Vic2NyaXB0aW9uRXJyb3InO1xuICAgICAgICB0aGlzLnN0YWNrID0gZXJyLnN0YWNrO1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBlcnIubWVzc2FnZTtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1VbnN1YnNjcmlwdGlvbkVycm9yLmpzLm1hcCIsIi8vIHR5cGVvZiBhbnkgc28gdGhhdCBpdCB3ZSBkb24ndCBoYXZlIHRvIGNhc3Qgd2hlbiBjb21wYXJpbmcgYSByZXN1bHQgdG8gdGhlIGVycm9yIG9iamVjdFxuZXhwb3J0IHZhciBlcnJvck9iamVjdCA9IHsgZToge30gfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWVycm9yT2JqZWN0LmpzLm1hcCIsImV4cG9ydCBjb25zdCBpc0FycmF5ID0gQXJyYXkuaXNBcnJheSB8fCAoKHgpID0+IHggJiYgdHlwZW9mIHgubGVuZ3RoID09PSAnbnVtYmVyJyk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pc0FycmF5LmpzLm1hcCIsImV4cG9ydCBmdW5jdGlvbiBpc0Z1bmN0aW9uKHgpIHtcbiAgICByZXR1cm4gdHlwZW9mIHggPT09ICdmdW5jdGlvbic7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pc0Z1bmN0aW9uLmpzLm1hcCIsImV4cG9ydCBmdW5jdGlvbiBpc09iamVjdCh4KSB7XG4gICAgcmV0dXJuIHggIT0gbnVsbCAmJiB0eXBlb2YgeCA9PT0gJ29iamVjdCc7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pc09iamVjdC5qcy5tYXAiLCJleHBvcnQgZnVuY3Rpb24gaXNQcm9taXNlKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlICYmIHR5cGVvZiB2YWx1ZS5zdWJzY3JpYmUgIT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIHZhbHVlLnRoZW4gPT09ICdmdW5jdGlvbic7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pc1Byb21pc2UuanMubWFwIiwiZXhwb3J0IGZ1bmN0aW9uIGlzU2NoZWR1bGVyKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlICYmIHR5cGVvZiB2YWx1ZS5zY2hlZHVsZSA9PT0gJ2Z1bmN0aW9uJztcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlzU2NoZWR1bGVyLmpzLm1hcCIsImxldCBvYmplY3RUeXBlcyA9IHtcbiAgICAnYm9vbGVhbic6IGZhbHNlLFxuICAgICdmdW5jdGlvbic6IHRydWUsXG4gICAgJ29iamVjdCc6IHRydWUsXG4gICAgJ251bWJlcic6IGZhbHNlLFxuICAgICdzdHJpbmcnOiBmYWxzZSxcbiAgICAndW5kZWZpbmVkJzogZmFsc2Vcbn07XG5leHBvcnQgbGV0IHJvb3QgPSAob2JqZWN0VHlwZXNbdHlwZW9mIHNlbGZdICYmIHNlbGYpIHx8IChvYmplY3RUeXBlc1t0eXBlb2Ygd2luZG93XSAmJiB3aW5kb3cpO1xubGV0IGZyZWVHbG9iYWwgPSBvYmplY3RUeXBlc1t0eXBlb2YgZ2xvYmFsXSAmJiBnbG9iYWw7XG5pZiAoZnJlZUdsb2JhbCAmJiAoZnJlZUdsb2JhbC5nbG9iYWwgPT09IGZyZWVHbG9iYWwgfHwgZnJlZUdsb2JhbC53aW5kb3cgPT09IGZyZWVHbG9iYWwpKSB7XG4gICAgcm9vdCA9IGZyZWVHbG9iYWw7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1yb290LmpzLm1hcCIsImltcG9ydCB7IHJvb3QgfSBmcm9tICcuL3Jvb3QnO1xuaW1wb3J0IHsgaXNBcnJheSB9IGZyb20gJy4vaXNBcnJheSc7XG5pbXBvcnQgeyBpc1Byb21pc2UgfSBmcm9tICcuL2lzUHJvbWlzZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyAkJGl0ZXJhdG9yIH0gZnJvbSAnLi4vc3ltYm9sL2l0ZXJhdG9yJztcbmltcG9ydCB7IElubmVyU3Vic2NyaWJlciB9IGZyb20gJy4uL0lubmVyU3Vic2NyaWJlcic7XG5pbXBvcnQgeyAkJG9ic2VydmFibGUgfSBmcm9tICcuLi9zeW1ib2wvb2JzZXJ2YWJsZSc7XG5leHBvcnQgZnVuY3Rpb24gc3Vic2NyaWJlVG9SZXN1bHQob3V0ZXJTdWJzY3JpYmVyLCByZXN1bHQsIG91dGVyVmFsdWUsIG91dGVySW5kZXgpIHtcbiAgICBsZXQgZGVzdGluYXRpb24gPSBuZXcgSW5uZXJTdWJzY3JpYmVyKG91dGVyU3Vic2NyaWJlciwgb3V0ZXJWYWx1ZSwgb3V0ZXJJbmRleCk7XG4gICAgaWYgKGRlc3RpbmF0aW9uLmNsb3NlZCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIE9ic2VydmFibGUpIHtcbiAgICAgICAgaWYgKHJlc3VsdC5faXNTY2FsYXIpIHtcbiAgICAgICAgICAgIGRlc3RpbmF0aW9uLm5leHQocmVzdWx0LnZhbHVlKTtcbiAgICAgICAgICAgIGRlc3RpbmF0aW9uLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQuc3Vic2NyaWJlKGRlc3RpbmF0aW9uKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoaXNBcnJheShyZXN1bHQpKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSByZXN1bHQubGVuZ3RoOyBpIDwgbGVuICYmICFkZXN0aW5hdGlvbi5jbG9zZWQ7IGkrKykge1xuICAgICAgICAgICAgZGVzdGluYXRpb24ubmV4dChyZXN1bHRbaV0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZGVzdGluYXRpb24uY2xvc2VkKSB7XG4gICAgICAgICAgICBkZXN0aW5hdGlvbi5jb21wbGV0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzUHJvbWlzZShyZXN1bHQpKSB7XG4gICAgICAgIHJlc3VsdC50aGVuKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgaWYgKCFkZXN0aW5hdGlvbi5jbG9zZWQpIHtcbiAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbi5uZXh0KHZhbHVlKTtcbiAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbi5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAoZXJyKSA9PiBkZXN0aW5hdGlvbi5lcnJvcihlcnIpKVxuICAgICAgICAgICAgLnRoZW4obnVsbCwgKGVycikgPT4ge1xuICAgICAgICAgICAgLy8gRXNjYXBpbmcgdGhlIFByb21pc2UgdHJhcDogZ2xvYmFsbHkgdGhyb3cgdW5oYW5kbGVkIGVycm9yc1xuICAgICAgICAgICAgcm9vdC5zZXRUaW1lb3V0KCgpID0+IHsgdGhyb3cgZXJyOyB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBkZXN0aW5hdGlvbjtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIHJlc3VsdFskJGl0ZXJhdG9yXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBjb25zdCBpdGVyYXRvciA9IHJlc3VsdFskJGl0ZXJhdG9yXSgpO1xuICAgICAgICBkbyB7XG4gICAgICAgICAgICBsZXQgaXRlbSA9IGl0ZXJhdG9yLm5leHQoKTtcbiAgICAgICAgICAgIGlmIChpdGVtLmRvbmUpIHtcbiAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbi5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVzdGluYXRpb24ubmV4dChpdGVtLnZhbHVlKTtcbiAgICAgICAgICAgIGlmIChkZXN0aW5hdGlvbi5jbG9zZWQpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSB3aGlsZSAodHJ1ZSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiByZXN1bHRbJCRvYnNlcnZhYmxlXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBjb25zdCBvYnMgPSByZXN1bHRbJCRvYnNlcnZhYmxlXSgpO1xuICAgICAgICBpZiAodHlwZW9mIG9icy5zdWJzY3JpYmUgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGRlc3RpbmF0aW9uLmVycm9yKG5ldyBFcnJvcignaW52YWxpZCBvYnNlcnZhYmxlJykpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG9icy5zdWJzY3JpYmUobmV3IElubmVyU3Vic2NyaWJlcihvdXRlclN1YnNjcmliZXIsIG91dGVyVmFsdWUsIG91dGVySW5kZXgpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZGVzdGluYXRpb24uZXJyb3IobmV3IFR5cGVFcnJvcigndW5rbm93biB0eXBlIHJldHVybmVkJykpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXN1YnNjcmliZVRvUmVzdWx0LmpzLm1hcCIsImltcG9ydCB7IFN1YnNjcmliZXIgfSBmcm9tICcuLi9TdWJzY3JpYmVyJztcbmltcG9ydCB7ICQkcnhTdWJzY3JpYmVyIH0gZnJvbSAnLi4vc3ltYm9sL3J4U3Vic2NyaWJlcic7XG5leHBvcnQgZnVuY3Rpb24gdG9TdWJzY3JpYmVyKG5leHRPck9ic2VydmVyLCBlcnJvciwgY29tcGxldGUpIHtcbiAgICBpZiAobmV4dE9yT2JzZXJ2ZXIpIHtcbiAgICAgICAgaWYgKG5leHRPck9ic2VydmVyIGluc3RhbmNlb2YgU3Vic2NyaWJlcikge1xuICAgICAgICAgICAgcmV0dXJuIG5leHRPck9ic2VydmVyO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuZXh0T3JPYnNlcnZlclskJHJ4U3Vic2NyaWJlcl0pIHtcbiAgICAgICAgICAgIHJldHVybiBuZXh0T3JPYnNlcnZlclskJHJ4U3Vic2NyaWJlcl0oKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoIW5leHRPck9ic2VydmVyICYmICFlcnJvciAmJiAhY29tcGxldGUpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTdWJzY3JpYmVyKCk7XG4gICAgfVxuICAgIHJldHVybiBuZXcgU3Vic2NyaWJlcihuZXh0T3JPYnNlcnZlciwgZXJyb3IsIGNvbXBsZXRlKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRvU3Vic2NyaWJlci5qcy5tYXAiLCJpbXBvcnQgeyBlcnJvck9iamVjdCB9IGZyb20gJy4vZXJyb3JPYmplY3QnO1xubGV0IHRyeUNhdGNoVGFyZ2V0O1xuZnVuY3Rpb24gdHJ5Q2F0Y2hlcigpIHtcbiAgICB0cnkge1xuICAgICAgICByZXR1cm4gdHJ5Q2F0Y2hUYXJnZXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgZXJyb3JPYmplY3QuZSA9IGU7XG4gICAgICAgIHJldHVybiBlcnJvck9iamVjdDtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gdHJ5Q2F0Y2goZm4pIHtcbiAgICB0cnlDYXRjaFRhcmdldCA9IGZuO1xuICAgIHJldHVybiB0cnlDYXRjaGVyO1xufVxuO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dHJ5Q2F0Y2guanMubWFwIiwiLyohIENTUyByZWw9cHJlbG9hZCBwb2x5ZmlsbC4gRGVwZW5kcyBvbiBsb2FkQ1NTIGZ1bmN0aW9uLiBbY10yMDE2IEBzY290dGplaGwsIEZpbGFtZW50IEdyb3VwLCBJbmMuIExpY2Vuc2VkIE1JVCAgKi9cbihmdW5jdGlvbiggdyApe1xuICAvLyByZWw9cHJlbG9hZCBzdXBwb3J0IHRlc3RcbiAgaWYoICF3LmxvYWRDU1MgKXtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIHJwID0gbG9hZENTUy5yZWxwcmVsb2FkID0ge307XG4gIHJwLnN1cHBvcnQgPSBmdW5jdGlvbigpe1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImxpbmtcIiApLnJlbExpc3Quc3VwcG9ydHMoIFwicHJlbG9hZFwiICk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfTtcblxuICAvLyBsb29wIHByZWxvYWQgbGlua3MgYW5kIGZldGNoIHVzaW5nIGxvYWRDU1NcbiAgcnAucG9seSA9IGZ1bmN0aW9uKCl7XG4gICAgdmFyIGxpbmtzID0gdy5kb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSggXCJsaW5rXCIgKTtcbiAgICBmb3IoIHZhciBpID0gMDsgaSA8IGxpbmtzLmxlbmd0aDsgaSsrICl7XG4gICAgICB2YXIgbGluayA9IGxpbmtzWyBpIF07XG4gICAgICBpZiggbGluay5yZWwgPT09IFwicHJlbG9hZFwiICYmIGxpbmsuZ2V0QXR0cmlidXRlKCBcImFzXCIgKSA9PT0gXCJzdHlsZVwiICl7XG4gICAgICAgIHcubG9hZENTUyggbGluay5ocmVmLCBsaW5rICk7XG4gICAgICAgIGxpbmsucmVsID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLy8gaWYgbGlua1tyZWw9cHJlbG9hZF0gaXMgbm90IHN1cHBvcnRlZCwgd2UgbXVzdCBmZXRjaCB0aGUgQ1NTIG1hbnVhbGx5IHVzaW5nIGxvYWRDU1NcbiAgaWYoICFycC5zdXBwb3J0KCkgKXtcbiAgICBycC5wb2x5KCk7XG4gICAgdmFyIHJ1biA9IHcuc2V0SW50ZXJ2YWwoIHJwLnBvbHksIDMwMCApO1xuICAgIGlmKCB3LmFkZEV2ZW50TGlzdGVuZXIgKXtcbiAgICAgIHcuYWRkRXZlbnRMaXN0ZW5lciggXCJsb2FkXCIsIGZ1bmN0aW9uKCl7XG4gICAgICAgIHcuY2xlYXJJbnRlcnZhbCggcnVuICk7XG4gICAgICB9ICk7XG4gICAgfVxuICAgIGlmKCB3LmF0dGFjaEV2ZW50ICl7XG4gICAgICB3LmF0dGFjaEV2ZW50KCBcIm9ubG9hZFwiLCBmdW5jdGlvbigpe1xuICAgICAgICB3LmNsZWFySW50ZXJ2YWwoIHJ1biApO1xuICAgICAgfSApXG4gICAgfVxuICB9XG59KCB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdGhpcyApKTtcbiIsImltcG9ydCAnLi9tb2Rlcm5penInO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBoYXNGZWF0dXJlcyhmZWF0dXJlcykge1xuICB2YXIgYWNjID0gdHJ1ZTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBmZWF0dXJlcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBmZWF0dXJlID0gZmVhdHVyZXNbaV07XG4gICAgdmFyIGhhc0ZlYXR1cmUgPSBNb2Rlcm5penJbZmVhdHVyZV07XG4gICAgLy8gaWYgKCFoYXNGZWF0dXJlKSBjb25zb2xlLndhcm4oJ0ZlYXR1cmUgXCInICsgZmVhdHVyZSArICdcIiBtaXNzaW5nIScpO1xuICAgIGFjYyA9IGFjYyAmJiBoYXNGZWF0dXJlO1xuICB9XG4gIHJldHVybiBhY2M7XG59XG4iLCIvKiEgbW9kZXJuaXpyIDMuMy4xIChDdXN0b20gQnVpbGQpIHwgTUlUICpcbiAqIGh0dHBzOi8vbW9kZXJuaXpyLmNvbS9kb3dubG9hZC8/LWNsYXNzbGlzdC1jc3Nwb2ludGVyZXZlbnRzLWNzc3JlbXVuaXQtY3NzdHJhbnNmb3Jtcy1ldmVudGxpc3RlbmVyLWh0bWxpbXBvcnRzLW1hdGNobWVkaWEtb3BhY2l0eS1xdWVyeXNlbGVjdG9yLXJlcXVlc3RhbmltYXRpb25mcmFtZS10ZW1wbGF0ZS10b3VjaGV2ZW50cyAhKi9cbiFmdW5jdGlvbihlLHQsbil7ZnVuY3Rpb24gcihlLHQpe3JldHVybiB0eXBlb2YgZT09PXR9ZnVuY3Rpb24gbygpe3ZhciBlLHQsbixvLGkscyxhO2Zvcih2YXIgZiBpbiBfKWlmKF8uaGFzT3duUHJvcGVydHkoZikpe2lmKGU9W10sdD1fW2ZdLHQubmFtZSYmKGUucHVzaCh0Lm5hbWUudG9Mb3dlckNhc2UoKSksdC5vcHRpb25zJiZ0Lm9wdGlvbnMuYWxpYXNlcyYmdC5vcHRpb25zLmFsaWFzZXMubGVuZ3RoKSlmb3Iobj0wO248dC5vcHRpb25zLmFsaWFzZXMubGVuZ3RoO24rKyllLnB1c2godC5vcHRpb25zLmFsaWFzZXNbbl0udG9Mb3dlckNhc2UoKSk7Zm9yKG89cih0LmZuLFwiZnVuY3Rpb25cIik/dC5mbigpOnQuZm4saT0wO2k8ZS5sZW5ndGg7aSsrKXM9ZVtpXSxhPXMuc3BsaXQoXCIuXCIpLDE9PT1hLmxlbmd0aD9Nb2Rlcm5penJbYVswXV09bzooIU1vZGVybml6clthWzBdXXx8TW9kZXJuaXpyW2FbMF1daW5zdGFuY2VvZiBCb29sZWFufHwoTW9kZXJuaXpyW2FbMF1dPW5ldyBCb29sZWFuKE1vZGVybml6clthWzBdXSkpLE1vZGVybml6clthWzBdXVthWzFdXT1vKSxULnB1c2goKG8/XCJcIjpcIm5vLVwiKSthLmpvaW4oXCItXCIpKX19ZnVuY3Rpb24gaSgpe3JldHVyblwiZnVuY3Rpb25cIiE9dHlwZW9mIHQuY3JlYXRlRWxlbWVudD90LmNyZWF0ZUVsZW1lbnQoYXJndW1lbnRzWzBdKTpiP3QuY3JlYXRlRWxlbWVudE5TLmNhbGwodCxcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsYXJndW1lbnRzWzBdKTp0LmNyZWF0ZUVsZW1lbnQuYXBwbHkodCxhcmd1bWVudHMpfWZ1bmN0aW9uIHMoZSl7dmFyIHQ9eC5jbGFzc05hbWUsbj1Nb2Rlcm5penIuX2NvbmZpZy5jbGFzc1ByZWZpeHx8XCJcIjtpZihiJiYodD10LmJhc2VWYWwpLE1vZGVybml6ci5fY29uZmlnLmVuYWJsZUpTQ2xhc3Mpe3ZhciByPW5ldyBSZWdFeHAoXCIoXnxcXFxccylcIituK1wibm8tanMoXFxcXHN8JClcIik7dD10LnJlcGxhY2UocixcIiQxXCIrbitcImpzJDJcIil9TW9kZXJuaXpyLl9jb25maWcuZW5hYmxlQ2xhc3NlcyYmKHQrPVwiIFwiK24rZS5qb2luKFwiIFwiK24pLGI/eC5jbGFzc05hbWUuYmFzZVZhbD10OnguY2xhc3NOYW1lPXQpfWZ1bmN0aW9uIGEoZSx0KXtpZihcIm9iamVjdFwiPT10eXBlb2YgZSlmb3IodmFyIG4gaW4gZSlTKGUsbikmJmEobixlW25dKTtlbHNle2U9ZS50b0xvd2VyQ2FzZSgpO3ZhciByPWUuc3BsaXQoXCIuXCIpLG89TW9kZXJuaXpyW3JbMF1dO2lmKDI9PXIubGVuZ3RoJiYobz1vW3JbMV1dKSxcInVuZGVmaW5lZFwiIT10eXBlb2YgbylyZXR1cm4gTW9kZXJuaXpyO3Q9XCJmdW5jdGlvblwiPT10eXBlb2YgdD90KCk6dCwxPT1yLmxlbmd0aD9Nb2Rlcm5penJbclswXV09dDooIU1vZGVybml6cltyWzBdXXx8TW9kZXJuaXpyW3JbMF1daW5zdGFuY2VvZiBCb29sZWFufHwoTW9kZXJuaXpyW3JbMF1dPW5ldyBCb29sZWFuKE1vZGVybml6cltyWzBdXSkpLE1vZGVybml6cltyWzBdXVtyWzFdXT10KSxzKFsodCYmMCE9dD9cIlwiOlwibm8tXCIpK3Iuam9pbihcIi1cIildKSxNb2Rlcm5penIuX3RyaWdnZXIoZSx0KX1yZXR1cm4gTW9kZXJuaXpyfWZ1bmN0aW9uIGYoZSl7cmV0dXJuIGUucmVwbGFjZSgvKFthLXpdKS0oW2Etel0pL2csZnVuY3Rpb24oZSx0LG4pe3JldHVybiB0K24udG9VcHBlckNhc2UoKX0pLnJlcGxhY2UoL14tLyxcIlwiKX1mdW5jdGlvbiB1KCl7dmFyIGU9dC5ib2R5O3JldHVybiBlfHwoZT1pKGI/XCJzdmdcIjpcImJvZHlcIiksZS5mYWtlPSEwKSxlfWZ1bmN0aW9uIGwoZSxuLHIsbyl7dmFyIHMsYSxmLGwsYz1cIm1vZGVybml6clwiLGQ9aShcImRpdlwiKSxwPXUoKTtpZihwYXJzZUludChyLDEwKSlmb3IoO3ItLTspZj1pKFwiZGl2XCIpLGYuaWQ9bz9vW3JdOmMrKHIrMSksZC5hcHBlbmRDaGlsZChmKTtyZXR1cm4gcz1pKFwic3R5bGVcIikscy50eXBlPVwidGV4dC9jc3NcIixzLmlkPVwic1wiK2MsKHAuZmFrZT9wOmQpLmFwcGVuZENoaWxkKHMpLHAuYXBwZW5kQ2hpbGQoZCkscy5zdHlsZVNoZWV0P3Muc3R5bGVTaGVldC5jc3NUZXh0PWU6cy5hcHBlbmRDaGlsZCh0LmNyZWF0ZVRleHROb2RlKGUpKSxkLmlkPWMscC5mYWtlJiYocC5zdHlsZS5iYWNrZ3JvdW5kPVwiXCIscC5zdHlsZS5vdmVyZmxvdz1cImhpZGRlblwiLGw9eC5zdHlsZS5vdmVyZmxvdyx4LnN0eWxlLm92ZXJmbG93PVwiaGlkZGVuXCIseC5hcHBlbmRDaGlsZChwKSksYT1uKGQsZSkscC5mYWtlPyhwLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQocCkseC5zdHlsZS5vdmVyZmxvdz1sLHgub2Zmc2V0SGVpZ2h0KTpkLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZCksISFhfWZ1bmN0aW9uIGMoZSx0KXtyZXR1cm4hIX4oXCJcIitlKS5pbmRleE9mKHQpfWZ1bmN0aW9uIGQoZSx0KXtyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gZS5hcHBseSh0LGFyZ3VtZW50cyl9fWZ1bmN0aW9uIHAoZSx0LG4pe3ZhciBvO2Zvcih2YXIgaSBpbiBlKWlmKGVbaV1pbiB0KXJldHVybiBuPT09ITE/ZVtpXToobz10W2VbaV1dLHIobyxcImZ1bmN0aW9uXCIpP2QobyxufHx0KTpvKTtyZXR1cm4hMX1mdW5jdGlvbiBtKGUpe3JldHVybiBlLnJlcGxhY2UoLyhbQS1aXSkvZyxmdW5jdGlvbihlLHQpe3JldHVyblwiLVwiK3QudG9Mb3dlckNhc2UoKX0pLnJlcGxhY2UoL15tcy0vLFwiLW1zLVwiKX1mdW5jdGlvbiB2KHQscil7dmFyIG89dC5sZW5ndGg7aWYoXCJDU1NcImluIGUmJlwic3VwcG9ydHNcImluIGUuQ1NTKXtmb3IoO28tLTspaWYoZS5DU1Muc3VwcG9ydHMobSh0W29dKSxyKSlyZXR1cm4hMDtyZXR1cm4hMX1pZihcIkNTU1N1cHBvcnRzUnVsZVwiaW4gZSl7Zm9yKHZhciBpPVtdO28tLTspaS5wdXNoKFwiKFwiK20odFtvXSkrXCI6XCIrcitcIilcIik7cmV0dXJuIGk9aS5qb2luKFwiIG9yIFwiKSxsKFwiQHN1cHBvcnRzIChcIitpK1wiKSB7ICNtb2Rlcm5penIgeyBwb3NpdGlvbjogYWJzb2x1dGU7IH0gfVwiLGZ1bmN0aW9uKGUpe3JldHVyblwiYWJzb2x1dGVcIj09Z2V0Q29tcHV0ZWRTdHlsZShlLG51bGwpLnBvc2l0aW9ufSl9cmV0dXJuIG59ZnVuY3Rpb24gaChlLHQsbyxzKXtmdW5jdGlvbiBhKCl7bCYmKGRlbGV0ZSBMLnN0eWxlLGRlbGV0ZSBMLm1vZEVsZW0pfWlmKHM9cihzLFwidW5kZWZpbmVkXCIpPyExOnMsIXIobyxcInVuZGVmaW5lZFwiKSl7dmFyIHU9dihlLG8pO2lmKCFyKHUsXCJ1bmRlZmluZWRcIikpcmV0dXJuIHV9Zm9yKHZhciBsLGQscCxtLGgseT1bXCJtb2Rlcm5penJcIixcInRzcGFuXCIsXCJzYW1wXCJdOyFMLnN0eWxlJiZ5Lmxlbmd0aDspbD0hMCxMLm1vZEVsZW09aSh5LnNoaWZ0KCkpLEwuc3R5bGU9TC5tb2RFbGVtLnN0eWxlO2ZvcihwPWUubGVuZ3RoLGQ9MDtwPmQ7ZCsrKWlmKG09ZVtkXSxoPUwuc3R5bGVbbV0sYyhtLFwiLVwiKSYmKG09ZihtKSksTC5zdHlsZVttXSE9PW4pe2lmKHN8fHIobyxcInVuZGVmaW5lZFwiKSlyZXR1cm4gYSgpLFwicGZ4XCI9PXQ/bTohMDt0cnl7TC5zdHlsZVttXT1vfWNhdGNoKGcpe31pZihMLnN0eWxlW21dIT1oKXJldHVybiBhKCksXCJwZnhcIj09dD9tOiEwfXJldHVybiBhKCksITF9ZnVuY3Rpb24geShlLHQsbixvLGkpe3ZhciBzPWUuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkrZS5zbGljZSgxKSxhPShlK1wiIFwiK1Auam9pbihzK1wiIFwiKStzKS5zcGxpdChcIiBcIik7cmV0dXJuIHIodCxcInN0cmluZ1wiKXx8cih0LFwidW5kZWZpbmVkXCIpP2goYSx0LG8saSk6KGE9KGUrXCIgXCIrcS5qb2luKHMrXCIgXCIpK3MpLnNwbGl0KFwiIFwiKSxwKGEsdCxuKSl9ZnVuY3Rpb24gZyhlLHQscil7cmV0dXJuIHkoZSxuLG4sdCxyKX12YXIgXz1bXSxDPXtfdmVyc2lvbjpcIjMuMy4xXCIsX2NvbmZpZzp7Y2xhc3NQcmVmaXg6XCJcIixlbmFibGVDbGFzc2VzOiEwLGVuYWJsZUpTQ2xhc3M6ITAsdXNlUHJlZml4ZXM6ITB9LF9xOltdLG9uOmZ1bmN0aW9uKGUsdCl7dmFyIG49dGhpcztzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7dChuW2VdKX0sMCl9LGFkZFRlc3Q6ZnVuY3Rpb24oZSx0LG4pe18ucHVzaCh7bmFtZTplLGZuOnQsb3B0aW9uczpufSl9LGFkZEFzeW5jVGVzdDpmdW5jdGlvbihlKXtfLnB1c2goe25hbWU6bnVsbCxmbjplfSl9fSxNb2Rlcm5penI9ZnVuY3Rpb24oKXt9O01vZGVybml6ci5wcm90b3R5cGU9QyxNb2Rlcm5penI9bmV3IE1vZGVybml6cixNb2Rlcm5penIuYWRkVGVzdChcImV2ZW50bGlzdGVuZXJcIixcImFkZEV2ZW50TGlzdGVuZXJcImluIGUpLE1vZGVybml6ci5hZGRUZXN0KFwicXVlcnlzZWxlY3RvclwiLFwicXVlcnlTZWxlY3RvclwiaW4gdCYmXCJxdWVyeVNlbGVjdG9yQWxsXCJpbiB0KTt2YXIgVD1bXSx3PUMuX2NvbmZpZy51c2VQcmVmaXhlcz9cIiAtd2Via2l0LSAtbW96LSAtby0gLW1zLSBcIi5zcGxpdChcIiBcIik6W1wiXCIsXCJcIl07Qy5fcHJlZml4ZXM9dzt2YXIgeD10LmRvY3VtZW50RWxlbWVudDtNb2Rlcm5penIuYWRkVGVzdChcImNsYXNzbGlzdFwiLFwiY2xhc3NMaXN0XCJpbiB4KTt2YXIgUzshZnVuY3Rpb24oKXt2YXIgZT17fS5oYXNPd25Qcm9wZXJ0eTtTPXIoZSxcInVuZGVmaW5lZFwiKXx8cihlLmNhbGwsXCJ1bmRlZmluZWRcIik/ZnVuY3Rpb24oZSx0KXtyZXR1cm4gdCBpbiBlJiZyKGUuY29uc3RydWN0b3IucHJvdG90eXBlW3RdLFwidW5kZWZpbmVkXCIpfTpmdW5jdGlvbih0LG4pe3JldHVybiBlLmNhbGwodCxuKX19KCk7dmFyIGI9XCJzdmdcIj09PXgubm9kZU5hbWUudG9Mb3dlckNhc2UoKTtNb2Rlcm5penIuYWRkVGVzdChcIm9wYWNpdHlcIixmdW5jdGlvbigpe3ZhciBlPWkoXCJhXCIpLnN0eWxlO3JldHVybiBlLmNzc1RleHQ9dy5qb2luKFwib3BhY2l0eTouNTU7XCIpLC9eMC41NSQvLnRlc3QoZS5vcGFjaXR5KX0pLE1vZGVybml6ci5hZGRUZXN0KFwiY3NzcG9pbnRlcmV2ZW50c1wiLGZ1bmN0aW9uKCl7dmFyIGU9aShcImFcIikuc3R5bGU7cmV0dXJuIGUuY3NzVGV4dD1cInBvaW50ZXItZXZlbnRzOmF1dG9cIixcImF1dG9cIj09PWUucG9pbnRlckV2ZW50c30pLE1vZGVybml6ci5hZGRUZXN0KFwiY3NzcmVtdW5pdFwiLGZ1bmN0aW9uKCl7dmFyIGU9aShcImFcIikuc3R5bGU7dHJ5e2UuZm9udFNpemU9XCIzcmVtXCJ9Y2F0Y2godCl7fXJldHVybi9yZW0vLnRlc3QoZS5mb250U2l6ZSl9KSxNb2Rlcm5penIuYWRkVGVzdChcInRlbXBsYXRlXCIsXCJjb250ZW50XCJpbiBpKFwidGVtcGxhdGVcIikpLEMuX2w9e30sQy5vbj1mdW5jdGlvbihlLHQpe3RoaXMuX2xbZV18fCh0aGlzLl9sW2VdPVtdKSx0aGlzLl9sW2VdLnB1c2godCksTW9kZXJuaXpyLmhhc093blByb3BlcnR5KGUpJiZzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7TW9kZXJuaXpyLl90cmlnZ2VyKGUsTW9kZXJuaXpyW2VdKX0sMCl9LEMuX3RyaWdnZXI9ZnVuY3Rpb24oZSx0KXtpZih0aGlzLl9sW2VdKXt2YXIgbj10aGlzLl9sW2VdO3NldFRpbWVvdXQoZnVuY3Rpb24oKXt2YXIgZSxyO2ZvcihlPTA7ZTxuLmxlbmd0aDtlKyspKHI9bltlXSkodCl9LDApLGRlbGV0ZSB0aGlzLl9sW2VdfX0sTW9kZXJuaXpyLl9xLnB1c2goZnVuY3Rpb24oKXtDLmFkZFRlc3Q9YX0pLGEoXCJodG1saW1wb3J0c1wiLFwiaW1wb3J0XCJpbiBpKFwibGlua1wiKSk7dmFyIHo9Qy50ZXN0U3R5bGVzPWw7TW9kZXJuaXpyLmFkZFRlc3QoXCJ0b3VjaGV2ZW50c1wiLGZ1bmN0aW9uKCl7dmFyIG47aWYoXCJvbnRvdWNoc3RhcnRcImluIGV8fGUuRG9jdW1lbnRUb3VjaCYmdCBpbnN0YW5jZW9mIERvY3VtZW50VG91Y2gpbj0hMDtlbHNle3ZhciByPVtcIkBtZWRpYSAoXCIsdy5qb2luKFwidG91Y2gtZW5hYmxlZCksKFwiKSxcImhlYXJ0elwiLFwiKVwiLFwieyNtb2Rlcm5penJ7dG9wOjlweDtwb3NpdGlvbjphYnNvbHV0ZX19XCJdLmpvaW4oXCJcIik7eihyLGZ1bmN0aW9uKGUpe249OT09PWUub2Zmc2V0VG9wfSl9cmV0dXJuIG59KTt2YXIgRT1cIk1veiBPIG1zIFdlYmtpdFwiLFA9Qy5fY29uZmlnLnVzZVByZWZpeGVzP0Uuc3BsaXQoXCIgXCIpOltdO0MuX2Nzc29tUHJlZml4ZXM9UDt2YXIgaj1mdW5jdGlvbih0KXt2YXIgcixvPXcubGVuZ3RoLGk9ZS5DU1NSdWxlO2lmKFwidW5kZWZpbmVkXCI9PXR5cGVvZiBpKXJldHVybiBuO2lmKCF0KXJldHVybiExO2lmKHQ9dC5yZXBsYWNlKC9eQC8sXCJcIikscj10LnJlcGxhY2UoLy0vZyxcIl9cIikudG9VcHBlckNhc2UoKStcIl9SVUxFXCIsciBpbiBpKXJldHVyblwiQFwiK3Q7Zm9yKHZhciBzPTA7bz5zO3MrKyl7dmFyIGE9d1tzXSxmPWEudG9VcHBlckNhc2UoKStcIl9cIityO2lmKGYgaW4gaSlyZXR1cm5cIkAtXCIrYS50b0xvd2VyQ2FzZSgpK1wiLVwiK3R9cmV0dXJuITF9O0MuYXRSdWxlPWo7dmFyIHE9Qy5fY29uZmlnLnVzZVByZWZpeGVzP0UudG9Mb3dlckNhc2UoKS5zcGxpdChcIiBcIik6W107Qy5fZG9tUHJlZml4ZXM9cTt2YXIgQT17ZWxlbTppKFwibW9kZXJuaXpyXCIpfTtNb2Rlcm5penIuX3EucHVzaChmdW5jdGlvbigpe2RlbGV0ZSBBLmVsZW19KTt2YXIgTD17c3R5bGU6QS5lbGVtLnN0eWxlfTtNb2Rlcm5penIuX3EudW5zaGlmdChmdW5jdGlvbigpe2RlbGV0ZSBMLnN0eWxlfSksQy50ZXN0QWxsUHJvcHM9eTt2YXIgTj1DLnByZWZpeGVkPWZ1bmN0aW9uKGUsdCxuKXtyZXR1cm4gMD09PWUuaW5kZXhPZihcIkBcIik/aihlKTooLTEhPWUuaW5kZXhPZihcIi1cIikmJihlPWYoZSkpLHQ/eShlLHQsbik6eShlLFwicGZ4XCIpKX07TW9kZXJuaXpyLmFkZFRlc3QoXCJyZXF1ZXN0YW5pbWF0aW9uZnJhbWVcIiwhIU4oXCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWVcIixlKSx7YWxpYXNlczpbXCJyYWZcIl19KSxNb2Rlcm5penIuYWRkVGVzdChcIm1hdGNobWVkaWFcIiwhIU4oXCJtYXRjaE1lZGlhXCIsZSkpLEMudGVzdEFsbFByb3BzPWcsTW9kZXJuaXpyLmFkZFRlc3QoXCJjc3N0cmFuc2Zvcm1zXCIsZnVuY3Rpb24oKXtyZXR1cm4tMT09PW5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIkFuZHJvaWQgMi5cIikmJmcoXCJ0cmFuc2Zvcm1cIixcInNjYWxlKDEpXCIsITApfSksbygpLGRlbGV0ZSBDLmFkZFRlc3QsZGVsZXRlIEMuYWRkQXN5bmNUZXN0O2Zvcih2YXIgTz0wO088TW9kZXJuaXpyLl9xLmxlbmd0aDtPKyspTW9kZXJuaXpyLl9xW09dKCk7ZS5Nb2Rlcm5penI9TW9kZXJuaXpyfSh3aW5kb3csZG9jdW1lbnQpO1xuIiwiaW1wb3J0ICdjb3JlLWpzL2ZuL29iamVjdC9hc3NpZ24nO1xuaW1wb3J0ICdjb3JlLWpzL2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHknO1xuaW1wb3J0ICdjb3JlLWpzL2ZuL29iamVjdC9rZXlzJztcbmltcG9ydCB7IGxvYWRDU1MgfSBmcm9tICdmZy1sb2FkY3NzL3NyYy9sb2FkQ1NTJztcblxuaW1wb3J0IGhhc0ZlYXR1cmVzIGZyb20gJy4uL2xpYi9oYXMtZmVhdHVyZXMnO1xuXG5jb25zdCBNRURJQV9RVUVSWSA9ICcobWluLXdpZHRoOiA0OGVtKSc7XG5cbmZ1bmN0aW9uIGhhc1NoYWRvd0RPTVYwKCkge1xuICByZXR1cm4gJ2NyZWF0ZVNoYWRvd1Jvb3QnIGluIGRvY3VtZW50LmJvZHk7XG59XG5cbmZ1bmN0aW9uIGhhc1NoYWRvd0RPTVYxKCkge1xuICByZXR1cm4gJ2F0dGFjaFNoYWRvdycgaW4gZG9jdW1lbnQuYm9keTtcbn1cblxuZnVuY3Rpb24gaGFzU2hhZG93RE9NKCkge1xuICByZXR1cm4gaGFzU2hhZG93RE9NVjAoKSB8fCBoYXNTaGFkb3dET01WMSgpO1xufVxuXG5mdW5jdGlvbiBoYXNDdXN0b21FbGVtZW50c1YwKCkge1xuICByZXR1cm4gJ3JlZ2lzdGVyRWxlbWVudCcgaW4gZG9jdW1lbnQ7XG59XG5cbmZ1bmN0aW9uIGhhc0N1c3RvbUVsZW1lbnRzVjEoKSB7XG4gIHJldHVybiAnY3VzdG9tRWxlbWVudHMnIGluIHdpbmRvdztcbn1cblxuZnVuY3Rpb24gaGFzQ3VzdG9tRWxlbWVudHMoKSB7XG4gIHJldHVybiBoYXNDdXN0b21FbGVtZW50c1YwKCkgfHwgaGFzQ3VzdG9tRWxlbWVudHNWMSgpO1xufVxuXG5mdW5jdGlvbiBpbXBvcnRDdXN0b21FbGVtZW50KCkge1xuICBjb25zdCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xuICBsaW5rLnJlbCA9ICdpbXBvcnQnO1xuICBsaW5rLmhyZWYgPSAnaHR0cHM6Ly91bnBrZy5jb20veS1kcmF3ZXJAMi4wLjYvZGlzdC93ZWJjb21wb25lbnQveS1kcmF3ZXIuaHRtbCc7XG5cbiAgY29uc3QgcmVmID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2xpbmsnKVswXTtcbiAgcmVmLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGxpbmssIHJlZik7XG59XG5cbmlmIChoYXNGZWF0dXJlcyhbJ2V2ZW50bGlzdGVuZXInLFxuICAgICAgICAgICAgICAgICAncXVlcnlzZWxlY3RvcicsXG4gICAgICAgICAgICAgICAgICdtYXRjaG1lZGlhJyxcbiAgICAgICAgICAgICAgICAgJ3JlcXVlc3RhbmltYXRpb25mcmFtZScsXG4gICAgICAgICAgICAgICAgICdjbGFzc2xpc3QnLFxuICAgICAgICAgICAgICAgICAnb3BhY2l0eScsXG4gICAgICAgICAgICAgICAgICdjc3N0cmFuc2Zvcm1zJyxcbiAgICAgICAgICAgICAgICAgJ2Nzc3BvaW50ZXJldmVudHMnLFxuICAgICAgICAgICAgICAgICAnY3NzcmVtdW5pdCcsXG4gICAgICAgICAgICAgICBdKSkge1xuICB3aW5kb3cuZHJhd2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcigneS1kcmF3ZXInKTtcbiAgd2luZG93LmlzRGVza3RvcCA9IHdpbmRvdy5tYXRjaE1lZGlhKE1FRElBX1FVRVJZKS5tYXRjaGVzO1xuXG4gIGlmIChoYXNTaGFkb3dET00oKSkge1xuICAgIGlmICh3aW5kb3cuaXNEZXNrdG9wKSB3aW5kb3cuZHJhd2VyLnNldEF0dHJpYnV0ZSgnb3BlbmVkJywgJycpO1xuICAgIGlmICh3aW5kb3cuaXNEZXNrdG9wKSB3aW5kb3cuZHJhd2VyLnNldEF0dHJpYnV0ZSgncGVyc2lzdGVudCcsICcnKTtcblxuICAgIGlmIChoYXNGZWF0dXJlcyhbJ3RlbXBsYXRlJywgJ2h0bWxpbXBvcnRzJ10pICYmIGhhc0N1c3RvbUVsZW1lbnRzKCkpIHtcbiAgICAgIGltcG9ydEN1c3RvbUVsZW1lbnQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbG9hZEpTRGVmZXJyZWQoJ2h0dHBzOi8vdW5wa2cuY29tL3dlYmNvbXBvbmVudHMuanNAMC43LjIyL3dlYmNvbXBvbmVudHMtbGl0ZS5taW4uanMnKTtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdXZWJDb21wb25lbnRzUmVhZHknLCBpbXBvcnRDdXN0b21FbGVtZW50KTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgcmVmID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3N0eWxlJylbMF07XG4gICAgbG9hZENTUygnaHR0cHM6Ly91bnBrZy5jb20veS1kcmF3ZXJAMi4wLjYvZGlzdC9kcmF3ZXIuY3NzJywgcmVmKTtcbiAgICBsb2FkSlNEZWZlcnJlZCgnaHR0cHM6Ly91bnBrZy5jb20veS1kcmF3ZXJAMi4wLjYvZGlzdC92YW5pbGxhL2luZGV4LmpzJywgKCkgPT4ge1xuICAgICAgLyogZ2xvYmFsIHkgKi9cbiAgICAgIGNvbnN0IFlEcmF3ZXIgPSB5LmRyYXdlci52YW5pbGxhLmRlZmF1bHQ7XG5cbiAgICAgIHdpbmRvdy5kcmF3ZXIgPSBuZXcgWURyYXdlcih3aW5kb3cuZHJhd2VyLCB7XG4gICAgICAgIG9wZW5lZDogd2luZG93LmlzRGVza3RvcCxcbiAgICAgICAgcGVyc2lzdGVudDogd2luZG93LmlzRGVza3RvcCxcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsICgpID0+IHtcbiAgICBjb25zdCBoYXNDaGFuZ2VkID0gd2luZG93LmlzRGVza3RvcCAhPT0gd2luZG93Lm1hdGNoTWVkaWEoTUVESUFfUVVFUlkpLm1hdGNoZXM7XG4gICAgaWYgKHdpbmRvdy5kcmF3ZXIgJiYgaGFzQ2hhbmdlZCkge1xuICAgICAgd2luZG93LmlzRGVza3RvcCA9ICF3aW5kb3cuaXNEZXNrdG9wO1xuICAgICAgd2luZG93LmRyYXdlci5wZXJzaXN0ZW50ID0gd2luZG93LmlzRGVza3RvcDtcbiAgICAgIHdpbmRvdy5kcmF3ZXIuanVtcFRvKHdpbmRvdy5pc0Rlc2t0b3ApO1xuICAgIH1cbiAgfSk7XG5cbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ19tZW51JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgIGlmICh3aW5kb3cuZHJhd2VyICYmICF3aW5kb3cuaXNEZXNrdG9wKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB3aW5kb3cuZHJhd2VyLnRvZ2dsZSgpO1xuICAgIH1cbiAgfSk7XG59XG4iLCJpbXBvcnQgeyBsb2FkQ1NTIH0gZnJvbSAnZmctbG9hZGNzcy9zcmMvbG9hZENTUyc7XG5cbmltcG9ydCAnLi9rYXRleCc7XG5pbXBvcnQgJy4vZHJhd2VyJztcbmltcG9ydCAnLi9zbW9vdGgtc3RhdGUnO1xuXG5nbG9iYWwubG9hZENTUyA9IGxvYWRDU1M7XG5yZXF1aXJlKCcuLi9saWIvY3NzcmVscHJlbG9hZCcpO1xuIiwiLy8gZXNsaW50LWdsb2JhbHMga2F0ZXhcbmltcG9ydCB7IGxvYWRDU1MgfSBmcm9tICdmZy1sb2FkY3NzL3NyYy9sb2FkQ1NTJztcblxuaW1wb3J0IGhhc0ZlYXR1cmVzIGZyb20gJy4uL2xpYi9oYXMtZmVhdHVyZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc2RmKCkge1xuICAvKiBnbG9iYWwga2F0ZXggKi9cbiAgaWYgKCF3aW5kb3cua2F0ZXgpIHJldHVybjtcblxuICBjb25zdCBtYXRoQmxvY2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnc2NyaXB0W3R5cGVePVwibWF0aC90ZXhcIl0nKTtcblxuICAvLyBrcmFtZG93biBnZW5lcmF0ZXMgc2NyaXB0IHRhZ3Mgd2l0aCB0eXBlIFwibWF0aC90ZXhcIlxuICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgbWF0aEJsb2Nrcykge1xuICAgIGNvbnN0IGVsID0gZWxlbWVudDtcblxuICAgIGNvbnN0IHRleCA9IGVsLnRleHRDb250ZW50XG4gICAgICAucmVwbGFjZSgnJSA8IVtDREFUQVsnLCAnJylcbiAgICAgIC5yZXBsYWNlKCclXV0+JywgJycpO1xuXG4gICAgLy8gcmVwbGFjZSB0aGUgc2NyaXB0IHRhZyB3aXRoIEthVGVYXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHByZXZpZXcgPSBlbC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuXG4gICAgICBlbC5vdXRlckhUTUwgPSBrYXRleC5yZW5kZXJUb1N0cmluZyh0ZXgsIHtcbiAgICAgICAgZGlzcGxheU1vZGU6IGVsLnR5cGUgPT09ICdtYXRoL3RleDsgbW9kZT1kaXNwbGF5JyxcbiAgICAgIH0pO1xuXG4gICAgICAvLyBoaWRlIHRoZSBwcmV2aWV3IG9ubHkgd2hlbiBzdWNjZXNzZnVsXG4gICAgICBwcmV2aWV3LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICBwcmV2aWV3LnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGUpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcbiAgICB9XG4gIH1cbn1cblxuLy8gS2FUZVggc3VwcG9ydFxuaWYgKGhhc0ZlYXR1cmVzKFsncXVlcnlzZWxlY3RvcicsXG4gICAgICAgICAgICAgICAgICdjbGFzc2xpc3QnLFxuICAgICAgICAgICAgICAgXSkpIHtcbiAgLy8gZW5hYmxlIG1hdGggYmxvY2tzIHVzaW5nIEthVGVYXG4gIGxvYWRDU1MoJ2h0dHBzOi8vdW5wa2cuY29tL2thdGV4QDAuNi4wL2Rpc3Qva2F0ZXgubWluLmNzcycpO1xuICBsb2FkSlNEZWZlcnJlZCgnaHR0cHM6Ly91bnBrZy5jb20va2F0ZXhAMC42LjAvZGlzdC9rYXRleC5taW4uanMnLCBhc2RmKTtcbn1cbiIsIi8qKlxuICogQ2hlY2tzIHRvIHNlZSBpZiB0aGUgdXJsIGlzIGV4dGVybmFsXG4gKlxuICogQHBhcmFtICAge3N0cmluZ30gICAgdXJsIC0gdXJsIGJlaW5nIGV2YWx1YXRlZFxuICogQHNlZSAgICAgaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy82MjM4MzUxL2Zhc3Rlc3Qtd2F5LXRvLWRldGVjdC1leHRlcm5hbC11cmxzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0V4dGVybmFsKHVybCkge1xuICBjb25zdCBtYXRjaCA9IHVybC5tYXRjaCgvXihbXjpcXC8/I10rOik/KD86XFwvXFwvKFteXFwvPyNdKikpPyhbXj8jXSspPyhcXD9bXiNdKik/KCMuKik/Lyk7XG5cbiAgaWYgKHR5cGVvZiBtYXRjaFsxXSA9PT0gJ3N0cmluZycgJiZcbiAgICAgIG1hdGNoWzFdLmxlbmd0aCA+IDAgJiZcbiAgICAgIG1hdGNoWzFdLnRvTG93ZXJDYXNlKCkgIT09IHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbFxuICAgICkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgY29uc3QgcG9ydCA9IHsgaHR0cDogODAsIGh0dHBzOiA0NDMgfVt3aW5kb3cubG9jYXRpb24ucHJvdG9jb2xdO1xuXG4gIGlmICh0eXBlb2YgbWF0Y2hbMl0gPT09ICdzdHJpbmcnICYmXG4gICAgbWF0Y2hbMl0ubGVuZ3RoID4gMCAmJlxuICAgIG1hdGNoWzJdLnJlcGxhY2UobmV3IFJlZ0V4cChgOigke3BvcnR9KT8kYCksICcnKSAhPT0gd2luZG93LmxvY2F0aW9uLmhvc3QpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBTdHJpcHMgdGhlIGhhc2ggZnJvbSBhIHVybCBhbmQgcmV0dXJucyB0aGUgbmV3IGhyZWZcbiAqXG4gKiBAcGFyYW0gICB7c3RyaW5nfSAgICBocmVmIC0gdXJsIGJlaW5nIGV2YWx1YXRlZFxuICovXG5leHBvcnQgZnVuY3Rpb24gc3RyaXBIYXNoKGhyZWYpIHtcbiAgcmV0dXJuIGhyZWYucmVwbGFjZSgvIy4qLywgJycpO1xufVxuXG4vKipcbiAqIENoZWNrcyB0byBzZWUgaWYgdGhlIHVybCBpcyBhbiBpbnRlcm5hbCBoYXNoXG4gKlxuICogQHBhcmFtICAge3N0cmluZ30gICAgaHJlZiAtIHVybCBiZWluZyBldmFsdWF0ZWRcbiAqIEBwYXJhbSAgIHtzdHJpbmd9ICAgIHByZXYgLSBwcmV2aW91cyB1cmwgKG9wdGlvbmFsKVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNIYXNoKGhyZWYsIHByZXYpIHtcbiAgY29uc3QgcCA9IHByZXYgfHwgd2luZG93LmxvY2F0aW9uLmhyZWY7XG5cbiAgY29uc3QgaGFzSGFzaCA9IGhyZWYuaW5kZXhPZignIycpID4gLTE7XG4gIGNvbnN0IHNhbWVQYXRoID0gc3RyaXBIYXNoKGhyZWYpID09PSBzdHJpcEhhc2gocCk7XG5cbiAgcmV0dXJuIChoYXNIYXNoICYmIHNhbWVQYXRoKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgdG8gc2VlIGlmIHdlIHNob3VsZCBiZSBsb2FkaW5nIHRoaXMgVVJMXG4gKlxuICogQHBhcmFtICAge3N0cmluZ30gICAgdXJsIC0gdXJsIGJlaW5nIGV2YWx1YXRlZFxuICogQHBhcmFtICAge3N0cmluZ30gICAgYmxhY2tsaXN0IC0ganF1ZXJ5IHNlbGVjdG9yXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzaG91bGRMb2FkQW5jaG9yKGFuY2hvciwgYmxhY2tsaXN0LCBocmVmUmVnZXgpIHtcbiAgY29uc3QgaHJlZiA9IGFuY2hvci5ocmVmO1xuICAvLyBVUkwgd2lsbCBvbmx5IGJlIGxvYWRlZCBpZiBpdCdzIG5vdCBhbiBleHRlcm5hbCBsaW5rLCBoYXNoLCBvclxuICAvLyBibGFja2xpc3RlZFxuICByZXR1cm4gKFxuICAgICFpc0V4dGVybmFsKGhyZWYpICYmXG4gICAgIWlzSGFzaChocmVmKSAmJlxuICAgICFhbmNob3IubWF0Y2hlcyhibGFja2xpc3QpICYmXG4gICAgYW5jaG9yLnRhcmdldCA9PT0gJycgJiYgKFxuICAgICAgdHlwZW9mIGhyZWZSZWdleCA9PT0gJ3VuZGVmaW5lZCcgfHxcbiAgICAgIGhyZWZSZWdleCA9PT0gJycgfHxcbiAgICAgIGhyZWYuc2VhcmNoKGhyZWZSZWdleCkgIT09IC0xXG4gICAgKVxuICApO1xufVxuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xuXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy1lcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzLWVzL1N1YmplY3QnO1xuXG5pbXBvcnQgJ3J4anMtZXMvYWRkL29ic2VydmFibGUvb2YnO1xuaW1wb3J0ICdyeGpzLWVzL2FkZC9vYnNlcnZhYmxlL2RvbS9hamF4JztcbmltcG9ydCAncnhqcy1lcy9hZGQvb2JzZXJ2YWJsZS9mcm9tRXZlbnQnO1xuaW1wb3J0ICdyeGpzLWVzL2FkZC9vYnNlcnZhYmxlL21lcmdlJztcblxuaW1wb3J0ICdyeGpzLWVzL2FkZC9vcGVyYXRvci9tYXAnO1xuaW1wb3J0ICdyeGpzLWVzL2FkZC9vcGVyYXRvci9maWx0ZXInO1xuaW1wb3J0ICdyeGpzLWVzL2FkZC9vcGVyYXRvci9tZXJnZUFsbCc7XG5pbXBvcnQgJ3J4anMtZXMvYWRkL29wZXJhdG9yL2RvJztcbmltcG9ydCAncnhqcy1lcy9hZGQvb3BlcmF0b3Ivc3dpdGNoJztcbmltcG9ydCAncnhqcy1lcy9hZGQvb3BlcmF0b3Ivc3dpdGNoTWFwJztcbmltcG9ydCAncnhqcy1lcy9hZGQvb3BlcmF0b3IvcmV0cnknO1xuaW1wb3J0ICdyeGpzLWVzL2FkZC9vcGVyYXRvci9kZWJvdW5jZSc7XG5cbmltcG9ydCB7IHNob3VsZExvYWRBbmNob3IgfSBmcm9tICcuL3Ntb290aC1zdGF0ZS11dGlsJztcblxud2luZG93Lk9ic2VydmFibGUgPSBPYnNlcnZhYmxlO1xuXG5jb25zdCBMSU5LX1NFTEVDVE9SID0gJ2FbaHJlZl0nOyAvLyAnYVtocmVmXj1cIi9cIl0nO1xuY29uc3QgQ09OVEVOVF9TRUxFQ1RPUiA9ICdtYWluJztcblxuZnVuY3Rpb24gbWFrZVNtb290aChjb250ZW50U2VsZWN0b3IgPSBDT05URU5UX1NFTEVDVE9SLCBsaW5rU2VsZWN0b3IgPSBMSU5LX1NFTEVDVE9SKSB7XG4gIGNvbnN0IHRpdGxlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3RpdGxlJykgfHwge307XG5cbiAgZnVuY3Rpb24gZnJhZ21lbnRGcm9tU3RyaW5nKHN0ckhUTUwpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKS5jcmVhdGVDb250ZXh0dWFsRnJhZ21lbnQoc3RySFRNTCk7XG4gIH1cblxuICBmdW5jdGlvbiBiZU5pY2UoZSwgb3B0aW9ucyA9IHt9KSB7XG4gICAgcmV0dXJuIChcbiAgICAgICFlLm1ldGFLZXkgJiZcbiAgICAgICFlLmN0cmxLZXkgJiZcbiAgICAgIHNob3VsZExvYWRBbmNob3IoZS5jdXJyZW50VGFyZ2V0LCBvcHRpb25zLmJsYWNrbGlzdCwgb3B0aW9ucy5ocmVmUmVnZXgpXG4gICAgKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGJpbmRFdmVudHMoZCA9IGRvY3VtZW50KSB7XG4gICAgcmV0dXJuIE9ic2VydmFibGUub2YoZC5xdWVyeVNlbGVjdG9yQWxsKGxpbmtTZWxlY3RvcikpXG4gICAgICAubWFwKGxpbmsgPT4gT2JzZXJ2YWJsZS5mcm9tRXZlbnQobGluaywgJ2NsaWNrJykpXG4gICAgICAubWVyZ2VBbGwoKVxuICAgICAgLmZpbHRlcihiZU5pY2UpXG4gICAgICAuZG8oZSA9PiBlLnByZXZlbnREZWZhdWx0KCkpXG4gICAgICAubWFwKGUgPT4gZS5jdXJyZW50VGFyZ2V0LmhyZWYpO1xuICB9XG5cbiAgZnVuY3Rpb24gaHJlZlRvUnF1ZXN0RGF0YSh7IGhyZWYsIGlzUHVzaCB9KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlzUHVzaCxcbiAgICAgIHJlcXVlc3REYXRhOiB7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIHVybDogaHJlZixcbiAgICAgICAgcmVzcG9uc2VUeXBlOiAndGV4dCcsXG4gICAgICB9LFxuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBtYWtlUmVxdWVzdCh7IHJlcXVlc3REYXRhLCBpc1B1c2ggfSkge1xuICAgIHJldHVybiBPYnNlcnZhYmxlXG4gICAgICAuYWpheChyZXF1ZXN0RGF0YSlcbiAgICAgIC5yZXRyeSgzKVxuICAgICAgLm1hcChhamF4UmVzcG9uc2UgPT4gKHtcbiAgICAgICAgYWpheFJlc3BvbnNlLFxuICAgICAgICBpc1B1c2gsXG4gICAgICB9KSk7XG4gICAgICAvLyBUT0RPOiBjYXRjaCBhbmQgc2hvdyBlcnJvciBtc2dcbiAgICAgIC8vIC5jYXRjaCgoKSA9PiBPYnNlcnZhYmxlLmVtcHR5KCkpXG4gIH1cblxuICBmdW5jdGlvbiBhamF4UmVzcG9uc2VUb0NhY2hlKHsgaXNQdXNoLCBhamF4UmVzcG9uc2UgfSkge1xuICAgIGNvbnN0IGRvY3VtZW50RnJhZ21lbnQgPSBmcmFnbWVudEZyb21TdHJpbmcoYWpheFJlc3BvbnNlLnJlc3BvbnNlKTtcbiAgICBjb25zdCB0aXRsZSA9IChkb2N1bWVudEZyYWdtZW50LnF1ZXJ5U2VsZWN0b3IoJ3RpdGxlJykgfHwge30pLnRleHRDb250ZW50O1xuICAgIGNvbnN0IHVybCA9IGFqYXhSZXNwb25zZS5yZXF1ZXN0LnVybDtcblxuICAgIC8vIFRPRE86IGFib3J0IGlmIGNvbnRlbnRfc2VsZWN0b3Igbm90IHByZXNlbnRcbiAgICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnRGcmFnbWVudC5xdWVyeVNlbGVjdG9yKGNvbnRlbnRTZWxlY3Rvcik7XG5cbiAgICByZXR1cm4geyB0aXRsZSwgdXJsLCBjb250ZW50LCBpc1B1c2ggfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZURPTUNvbnRlbnQoeyB0aXRsZSwgY29udGVudCwgdXJsLCBpc1B1c2ggfSkge1xuICAgIC8vIHVwZGF0ZSBjb250ZW50XG4gICAgY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoY29udGVudFNlbGVjdG9yKTtcbiAgICBtYWluLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKGNvbnRlbnQsIG1haW4pOyAvLyBUT0RPOiBEb24ndCBhZGQgYWxsIGF0IG9uY2UhP1xuICAgIC8vIG1haW4uaW5uZXJIVE1MID0gY29udGVudC5pbm5lckhUTUw7IC8vIFRPRE86IGNvdWxkIHRoaXMgYmUgZmFzdGVyP1xuXG4gICAgLy8gdXBkYXRlIHRpdGxlXG4gICAgdGl0bGVFbGVtZW50LnRleHRDb250ZW50ID0gdGl0bGU7XG5cbiAgICAvLyBwdXNoIG5ldyBmcmFtZSB0byBoaXN0b3J5IGlmIG5vdCBhIHBvcHN0YXRlXG4gICAgaWYgKGlzUHVzaCkgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKHt9LCB0aXRsZSwgdXJsKTtcbiAgICBpZiAoaXNQdXNoKSBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCA9IDA7XG4gIH1cblxuICAvLyBPYnNlcnZhYmxlPE9ic2VydmFibGU8Q2xpY2tFdmVudHM+PlxuICBjb25zdCBjbGlja0NsaWNrJCA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgY29uc3QgcHVzaHN0YXRlJCA9IGNsaWNrQ2xpY2skXG4gICAgLnN3aXRjaCgpXG4gICAgLm1hcChocmVmID0+ICh7XG4gICAgICBpc1B1c2g6IHRydWUsXG4gICAgICBocmVmLFxuICAgIH0pKTtcblxuICBjb25zdCBwb3BzdGF0ZSQgPSBPYnNlcnZhYmxlLmZyb21FdmVudCh3aW5kb3csICdwb3BzdGF0ZScpXG4gICAgLmZpbHRlcigoeyBzdGF0ZSB9KSA9PiBzdGF0ZSAhPSBudWxsKVxuICAgIC5tYXAoKCkgPT4gKHtcbiAgICAgIGlzUHVzaDogZmFsc2UsXG4gICAgICBocmVmOiB3aW5kb3cubG9jYXRpb24uaHJlZixcbiAgICB9KSk7XG5cbiAgT2JzZXJ2YWJsZS5tZXJnZShwdXNoc3RhdGUkLCBwb3BzdGF0ZSQpXG4gICAgLm1hcChocmVmVG9ScXVlc3REYXRhKVxuICAgIC5kbygoKSA9PiBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ2lzLWxvYWRpbmcnKSlcbiAgICAuc3dpdGNoTWFwKG1ha2VSZXF1ZXN0KVxuICAgIC5tYXAoYWpheFJlc3BvbnNlVG9DYWNoZSlcbiAgICAuZG8odXBkYXRlRE9NQ29udGVudClcbiAgICAuZG8oKCkgPT4gZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdpcy1sb2FkaW5nJykpXG4gICAgLy8gVE9ETzogY2F0Y2hcbiAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGNsaWNrQ2xpY2skLm5leHQoYmluZEV2ZW50cygpKTsgLy8gVE9ETzogcG9zc2libGUgd2l0aG91dCBzdWJqZWN0P1xuICAgIH0pO1xuXG4gIC8vIFRPRE86IHN0YXJ0d2l0aCBpbnN0ZWFkP1xuICBjbGlja0NsaWNrJC5uZXh0KGJpbmRFdmVudHMoKSk7XG59XG5cbi8vIFRPRE86IG9wdGlvbnNcbm1ha2VTbW9vdGgoKTtcbiJdfQ==
