module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "01f9":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__("2d00");
var $export = __webpack_require__("5ca1");
var redefine = __webpack_require__("2aba");
var hide = __webpack_require__("32e9");
var Iterators = __webpack_require__("84f2");
var $iterCreate = __webpack_require__("41a0");
var setToStringTag = __webpack_require__("7f20");
var getPrototypeOf = __webpack_require__("38fd");
var ITERATOR = __webpack_require__("2b4c")('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),

/***/ "02f4":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("4588");
var defined = __webpack_require__("be13");
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),

/***/ "0340":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "0390":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var at = __webpack_require__("02f4")(true);

 // `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? at(S, index).length : 1);
};


/***/ }),

/***/ "0437":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Legend_vue_vue_type_style_index_0_id_a303e9de_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("0340");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Legend_vue_vue_type_style_index_0_id_a303e9de_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Legend_vue_vue_type_style_index_0_id_a303e9de_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "0a49":
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__("9b43");
var IObject = __webpack_require__("626a");
var toObject = __webpack_require__("4bf8");
var toLength = __webpack_require__("9def");
var asc = __webpack_require__("cd1c");
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),

/***/ "0bfb":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__("cb7c");
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ "0d58":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__("ce10");
var enumBugKeys = __webpack_require__("e11e");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "0d96":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SkyLine_vue_vue_type_style_index_0_id_4e9af41b_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("ef4c");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SkyLine_vue_vue_type_style_index_0_id_4e9af41b_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SkyLine_vue_vue_type_style_index_0_id_4e9af41b_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "0e80":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Flood_vue_vue_type_style_index_0_id_7f0e7ef4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("d3a2");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Flood_vue_vue_type_style_index_0_id_7f0e7ef4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Flood_vue_vue_type_style_index_0_id_7f0e7ef4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "1169":
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__("2d95");
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),

/***/ "11e9":
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__("52a7");
var createDesc = __webpack_require__("4630");
var toIObject = __webpack_require__("6821");
var toPrimitive = __webpack_require__("6a99");
var has = __webpack_require__("69a8");
var IE8_DOM_DEFINE = __webpack_require__("c69a");
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__("9e1e") ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),

/***/ "1340":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Compare_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("f614");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Compare_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Compare_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "1495":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc");
var anObject = __webpack_require__("cb7c");
var getKeys = __webpack_require__("0d58");

module.exports = __webpack_require__("9e1e") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ "15ca":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Excavate_vue_vue_type_style_index_0_id_124f769a_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("fc33");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Excavate_vue_vue_type_style_index_0_id_124f769a_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Excavate_vue_vue_type_style_index_0_id_124f769a_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "1991":
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__("9b43");
var invoke = __webpack_require__("31f4");
var html = __webpack_require__("fab2");
var cel = __webpack_require__("230e");
var global = __webpack_require__("7726");
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__("2d95")(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),

/***/ "1fa8":
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__("cb7c");
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),

/***/ "214f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__("b0c5");
var redefine = __webpack_require__("2aba");
var hide = __webpack_require__("32e9");
var fails = __webpack_require__("79e5");
var defined = __webpack_require__("be13");
var wks = __webpack_require__("2b4c");
var regexpExec = __webpack_require__("520a");

var SPECIES = wks('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = (function () {
  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length === 2 && result[0] === 'a' && result[1] === 'b';
})();

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;
    re.exec = function () { execCalled = true; return null; };
    if (KEY === 'split') {
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
    }
    re[SYMBOL]('');
    return !execCalled;
  }) : undefined;

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var fns = exec(
      defined,
      SYMBOL,
      ''[KEY],
      function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
        if (regexp.exec === regexpExec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
          }
          return { done: true, value: nativeMethod.call(str, regexp, arg2) };
        }
        return { done: false };
      }
    );
    var strfn = fns[0];
    var rxfn = fns[1];

    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};


/***/ }),

/***/ "230e":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var document = __webpack_require__("7726").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "2397":
/***/ (function(module, exports, __webpack_require__) {

// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $export = __webpack_require__("5ca1");
var create = __webpack_require__("2aeb");
var aFunction = __webpack_require__("d8e8");
var anObject = __webpack_require__("cb7c");
var isObject = __webpack_require__("d3f4");
var fails = __webpack_require__("79e5");
var bind = __webpack_require__("f0c1");
var rConstruct = (__webpack_require__("7726").Reflect || {}).construct;

// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function () {
  function F() { /* empty */ }
  return !(rConstruct(function () { /* empty */ }, [], F) instanceof F);
});
var ARGS_BUG = !fails(function () {
  rConstruct(function () { /* empty */ });
});

$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
  construct: function construct(Target, args /* , newTarget */) {
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0: return new Target();
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = create(isObject(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});


/***/ }),

/***/ "23c6":
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__("2d95");
var TAG = __webpack_require__("2b4c")('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),

/***/ "2621":
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "2780":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "27ee":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("23c6");
var ITERATOR = __webpack_require__("2b4c")('iterator');
var Iterators = __webpack_require__("84f2");
module.exports = __webpack_require__("8378").getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),

/***/ "28a5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isRegExp = __webpack_require__("aae3");
var anObject = __webpack_require__("cb7c");
var speciesConstructor = __webpack_require__("ebd6");
var advanceStringIndex = __webpack_require__("0390");
var toLength = __webpack_require__("9def");
var callRegExpExec = __webpack_require__("5f1b");
var regexpExec = __webpack_require__("520a");
var fails = __webpack_require__("79e5");
var $min = Math.min;
var $push = [].push;
var $SPLIT = 'split';
var LENGTH = 'length';
var LAST_INDEX = 'lastIndex';
var MAX_UINT32 = 0xffffffff;

// babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
var SUPPORTS_Y = !fails(function () { RegExp(MAX_UINT32, 'y'); });

// @@split logic
__webpack_require__("214f")('split', 2, function (defined, SPLIT, $split, maybeCallNative) {
  var internalSplit;
  if (
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return [];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) return $split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? MAX_UINT32 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;
      while (match = regexpExec.call(separatorCopy, string)) {
        lastIndex = separatorCopy[LAST_INDEX];
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }
        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : $split.call(this, separator, limit);
    };
  } else {
    internalSplit = $split;
  }

  return [
    // `String.prototype.split` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = defined(this);
      var splitter = separator == undefined ? undefined : separator[SPLIT];
      return splitter !== undefined
        ? splitter.call(separator, O, limit)
        : internalSplit.call(String(O), separator, limit);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function (regexp, limit) {
      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== $split);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var C = speciesConstructor(rx, RegExp);

      var unicodeMatching = rx.unicode;
      var flags = (rx.ignoreCase ? 'i' : '') +
                  (rx.multiline ? 'm' : '') +
                  (rx.unicode ? 'u' : '') +
                  (SUPPORTS_Y ? 'y' : 'g');

      // ^(? + rx + ) is needed, in combination with some S slicing, to
      // simulate the 'y' flag.
      var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];
      while (q < S.length) {
        splitter.lastIndex = SUPPORTS_Y ? q : 0;
        var z = callRegExpExec(splitter, SUPPORTS_Y ? S : S.slice(q));
        var e;
        if (
          z === null ||
          (e = $min(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
        ) {
          q = advanceStringIndex(S, q, unicodeMatching);
        } else {
          A.push(S.slice(p, q));
          if (A.length === lim) return A;
          for (var i = 1; i <= z.length - 1; i++) {
            A.push(z[i]);
            if (A.length === lim) return A;
          }
          q = p = e;
        }
      }
      A.push(S.slice(p));
      return A;
    }
  ];
});


/***/ }),

/***/ "2aba":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var hide = __webpack_require__("32e9");
var has = __webpack_require__("69a8");
var SRC = __webpack_require__("ca5a")('src');
var $toString = __webpack_require__("fa5b");
var TO_STRING = 'toString';
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__("8378").inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),

/***/ "2aeb":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__("cb7c");
var dPs = __webpack_require__("1495");
var enumBugKeys = __webpack_require__("e11e");
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__("230e")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__("fab2").appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ "2b4c":
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__("5537")('wks');
var uid = __webpack_require__("ca5a");
var Symbol = __webpack_require__("7726").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "2d00":
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "2d95":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "2f21":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__("79e5");

module.exports = function (method, arg) {
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call
    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
  });
};


/***/ }),

/***/ "2fdb":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.7 String.prototype.includes(searchString, position = 0)

var $export = __webpack_require__("5ca1");
var context = __webpack_require__("d2c8");
var INCLUDES = 'includes';

$export($export.P + $export.F * __webpack_require__("5147")(INCLUDES), 'String', {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "31f4":
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),

/***/ "32e9":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc");
var createDesc = __webpack_require__("4630");
module.exports = __webpack_require__("9e1e") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "33a4":
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__("84f2");
var ITERATOR = __webpack_require__("2b4c")('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),

/***/ "3846":
/***/ (function(module, exports, __webpack_require__) {

// 21.2.5.3 get RegExp.prototype.flags()
if (__webpack_require__("9e1e") && /./g.flags != 'g') __webpack_require__("86cc").f(RegExp.prototype, 'flags', {
  configurable: true,
  get: __webpack_require__("0bfb")
});


/***/ }),

/***/ "38fd":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__("69a8");
var toObject = __webpack_require__("4bf8");
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ "41a0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__("2aeb");
var descriptor = __webpack_require__("4630");
var setToStringTag = __webpack_require__("7f20");
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__("32e9")(IteratorPrototype, __webpack_require__("2b4c")('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ "456d":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__("4bf8");
var $keys = __webpack_require__("0d58");

__webpack_require__("5eda")('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),

/***/ "4588":
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "4630":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "473a":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "4a59":
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__("9b43");
var call = __webpack_require__("1fa8");
var isArrayIter = __webpack_require__("33a4");
var anObject = __webpack_require__("cb7c");
var toLength = __webpack_require__("9def");
var getIterFn = __webpack_require__("27ee");
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),

/***/ "4bf8":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__("be13");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "5147":
/***/ (function(module, exports, __webpack_require__) {

var MATCH = __webpack_require__("2b4c")('match');
module.exports = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};


/***/ }),

/***/ "520a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var regexpFlags = __webpack_require__("0bfb");

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var LAST_INDEX = 'lastIndex';

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/,
      re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
})();

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + re.source + '$(?!\\s)', regexpFlags.call(re));
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];

    match = nativeExec.call(re, str);

    if (UPDATES_LAST_INDEX_WRONG && match) {
      re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      // eslint-disable-next-line no-loop-func
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),

/***/ "52a7":
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),

/***/ "551c":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__("2d00");
var global = __webpack_require__("7726");
var ctx = __webpack_require__("9b43");
var classof = __webpack_require__("23c6");
var $export = __webpack_require__("5ca1");
var isObject = __webpack_require__("d3f4");
var aFunction = __webpack_require__("d8e8");
var anInstance = __webpack_require__("f605");
var forOf = __webpack_require__("4a59");
var speciesConstructor = __webpack_require__("ebd6");
var task = __webpack_require__("1991").set;
var microtask = __webpack_require__("8079")();
var newPromiseCapabilityModule = __webpack_require__("a5b8");
var perform = __webpack_require__("9c80");
var userAgent = __webpack_require__("a25f");
var promiseResolve = __webpack_require__("bcaa");
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__("2b4c")('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function')
      && promise.then(empty) instanceof FakePromise
      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // we can't detect it synchronously, so just check versions
      && v8.indexOf('6.6') !== 0
      && userAgent.indexOf('Chrome/66') === -1;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__("dcbc")($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__("7f20")($Promise, PROMISE);
__webpack_require__("7a56")(PROMISE);
Wrapper = __webpack_require__("8378")[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__("5cc5")(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),

/***/ "5537":
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__("8378");
var global = __webpack_require__("7726");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__("2d00") ? 'pure' : 'global',
  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "55dd":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__("5ca1");
var aFunction = __webpack_require__("d8e8");
var toObject = __webpack_require__("4bf8");
var fails = __webpack_require__("79e5");
var $sort = [].sort;
var test = [1, 2, 3];

$export($export.P + $export.F * (fails(function () {
  // IE8-
  test.sort(undefined);
}) || !fails(function () {
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !__webpack_require__("2f21")($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn) {
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});


/***/ }),

/***/ "5680":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_WebGlobe_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("2780");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_WebGlobe_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_WebGlobe_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "5ca1":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var core = __webpack_require__("8378");
var hide = __webpack_require__("32e9");
var redefine = __webpack_require__("2aba");
var ctx = __webpack_require__("9b43");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
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


/***/ }),

/***/ "5cc5":
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__("2b4c")('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),

/***/ "5dbc":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var setPrototypeOf = __webpack_require__("8b97").set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};


/***/ }),

/***/ "5eda":
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__("5ca1");
var core = __webpack_require__("8378");
var fails = __webpack_require__("79e5");
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),

/***/ "5f1b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var classof = __webpack_require__("23c6");
var builtinExec = RegExp.prototype.exec;

 // `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw new TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }
  if (classof(R) !== 'RegExp') {
    throw new TypeError('RegExp#exec called on incompatible receiver');
  }
  return builtinExec.call(R, S);
};


/***/ }),

/***/ "613b":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("5537")('keys');
var uid = __webpack_require__("ca5a");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "626a":
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__("2d95");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "6762":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/Array.prototype.includes
var $export = __webpack_require__("5ca1");
var $includes = __webpack_require__("c366")(true);

$export($export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

__webpack_require__("9c6c")('includes');


/***/ }),

/***/ "6821":
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__("626a");
var defined = __webpack_require__("be13");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "69a8":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "6a99":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__("d3f4");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "6b54":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__("3846");
var anObject = __webpack_require__("cb7c");
var $flags = __webpack_require__("0bfb");
var DESCRIPTORS = __webpack_require__("9e1e");
var TO_STRING = 'toString';
var $toString = /./[TO_STRING];

var define = function (fn) {
  __webpack_require__("2aba")(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if (__webpack_require__("79e5")(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
  define(function toString() {
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}


/***/ }),

/***/ "6ca1":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FloodNoSlot_vue_vue_type_style_index_0_id_70b9094e_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("473a");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FloodNoSlot_vue_vue_type_style_index_0_id_70b9094e_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FloodNoSlot_vue_vue_type_style_index_0_id_70b9094e_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "7037":
/***/ (function(module, exports) {

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return typeof obj;
    };

    module.exports["default"] = module.exports, module.exports.__esModule = true;
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };

    module.exports["default"] = module.exports, module.exports.__esModule = true;
  }

  return _typeof(obj);
}

module.exports = _typeof;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "7333":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var DESCRIPTORS = __webpack_require__("9e1e");
var getKeys = __webpack_require__("0d58");
var gOPS = __webpack_require__("2621");
var pIE = __webpack_require__("52a7");
var toObject = __webpack_require__("4bf8");
var IObject = __webpack_require__("626a");
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__("79e5")(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || isEnum.call(S, key)) T[key] = S[key];
    }
  } return T;
} : $assign;


/***/ }),

/***/ "7514":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = __webpack_require__("5ca1");
var $find = __webpack_require__("0a49")(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__("9c6c")(KEY);


/***/ }),

/***/ "7726":
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "77f1":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("4588");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "79e5":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "7a56":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("7726");
var dP = __webpack_require__("86cc");
var DESCRIPTORS = __webpack_require__("9e1e");
var SPECIES = __webpack_require__("2b4c")('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),

/***/ "7f20":
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__("86cc").f;
var has = __webpack_require__("69a8");
var TAG = __webpack_require__("2b4c")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ "8079":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var macrotask = __webpack_require__("1991").set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__("2d95")(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise.resolve(undefined);
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),

/***/ "8269":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var core_js_modules_es7_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("8e6e");
/* harmony import */ var core_js_modules_es7_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es7_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es7_array_includes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("6762");
/* harmony import */ var core_js_modules_es7_array_includes__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es7_array_includes__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es6_string_includes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("2fdb");
/* harmony import */ var core_js_modules_es6_string_includes__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_string_includes__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es6_array_iterator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("cadf");
/* harmony import */ var core_js_modules_es6_array_iterator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_array_iterator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es6_object_keys__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("456d");
/* harmony import */ var core_js_modules_es6_object_keys__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_object_keys__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var E_Documents_Work_package_source_WebClient_Vue_cesium_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("ade3");
/* harmony import */ var core_js_modules_es6_promise__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("551c");
/* harmony import */ var core_js_modules_es6_promise__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_promise__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("ac6a");
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_7__);









function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { Object(E_Documents_Work_package_source_WebClient_Vue_cesium_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
    return {
      globalLoad: false
    };
  },
  methods: {
    /**
     * @description 发送更新事件  this.$emit(`update:${prop}`, data);
     * @see https://cn.vuejs.org/v2/guide/components-custom-events.html#sync-修饰符
     * @param {*} prop 更新属性
     * @param {*} data 更新数据
     */
    $_updateSyncedPropsFabric: function $_updateSyncedPropsFabric(prop, data) {
      var _this = this;

      return function () {
        _this.propsIsUpdating[prop] = true;
        var info = typeof data === "function" ? data() : data;
        return _this.$emit("update:".concat(prop), info);
      };
    },

    /**
     * @description 绑定地图的各种事件，并在事件回调更新各种事件消息对应的事件属性。
     * 前提是 该属性this.$listeners[`update:${prop}`] 存在
     */
    $_bindPropsUpdateEvents: function $_bindPropsUpdateEvents() {
      var _this2 = this;

      var syncedProps = [{
        events: ["moveend"],
        prop: "center",
        getter: this.map.getCenter.bind(this.map)
      }, {
        events: ["zoomend"],
        prop: "zoom",
        getter: this.map.getZoom.bind(this.map)
      }, {
        events: ["rotate"],
        prop: "bearing",
        getter: this.map.getBearing.bind(this.map)
      }, {
        events: ["pitch"],
        prop: "pitch",
        getter: this.map.getPitch.bind(this.map)
      } // TODO: make 'bounds' synced prop
      // { events: ['moveend', 'zoomend', 'rotate', 'pitch'], prop: 'bounds', getter: this.map.getBounds.bind(this.map) }
      ];
      syncedProps.forEach(function (_ref) {
        var events = _ref.events,
            prop = _ref.prop,
            getter = _ref.getter;
        events.forEach(function (event) {
          if (_this2.$listeners["update:".concat(prop)]) {
            _this2.map.on(event, _this2.$_updateSyncedPropsFabric(prop, getter));
          }
        });
      });
    },
    $_loadScript: function $_loadScript() {
      var self = this;

      if (!global.Cesium
      /*  && !self.globalLoad */
      ) {
          var $scriptMain = document.createElement("script");
          var $scriptPlugin = document.createElement("script");
          global.document.body.appendChild($scriptMain);
          global.document.body.appendChild($scriptPlugin);
          $scriptMain.src = this.libPath || "http://develop.smaryun.com:8899/static/libs/cdn/cesium/Cesium.js";
          return new Promise(function (resolve) {
            $scriptMain.onload = function () {
              if (global.Cesium) {
                $scriptPlugin.src = self.pluginPath || "http://develop.smaryun.com:8899/static/libs/cdn/zondyclient/webclient-cesium-plugin.min.js";

                $scriptPlugin.onload = function () {
                  if (global.Cesium) {
                    self.globalLoad = true;
                    resolve(global.Cesium);
                  } else {
                    reject(new Error("[\u7F51\u7EDC\u8BF7\u6C42\u5F02\u6B65\u52A0\u8F7D\u9519\u8BEF]: " + "请检查pluginPath或者网络状态!"));
                  }
                };
              } else {
                reject(new Error("[\u7F51\u7EDC\u8BF7\u6C42\u5F02\u6B65\u52A0\u8F7D\u9519\u8BEF]: " + "请检查libPath或者网络状态!"));
              }
            };
          });
        } else {
        return new Promise(function (resolve) {
          resolve(global.Cesium);
        });
      }
    },

    /**
     * @description 在mounted组件里面调用该方法里面的Promise，主要是绑定map以及绑定各种属性以及行为
     */
    $_loadMap: function $_loadMap() {
      var _this3 = this;

      return this.cesiumPromise.then(function (cesium) {
        _this3.cesium = cesium.default ? cesium.default : cesium;
        return new Promise(function (resolve) {
          if (_this3.accessToken) _this3.mapbox.accessToken = _this3.accessToken;
          var webGlobe = new Cesium.WebSceneControl(_this3.$refs.container, _objectSpread(_objectSpread({}, _this3._props), {}, {
            style: _this3.mapStyle
          }));
          resolve(webGlobe);
        });
      });
    },

    /**
     * @description 本质上是把mapbox的map的事件通过vue的emit方式封装发送
     * @param {*} events
     */
    $_bindMapEvents: function $_bindMapEvents(events) {
      var _this4 = this;

      Object.keys(this.$listeners).forEach(function (eventName) {
        if (events.includes(eventName)) {
          _this4.map.on(eventName, _this4.$_emitMapEvent);
        }
      });
    },
    $_unbindEvents: function $_unbindEvents(events) {
      var _this5 = this;

      events.forEach(function (eventName) {
        _this5.map.off(eventName, _this5.$_emitMapEvent);
      });
    }
  }
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("c8ba")))

/***/ }),

/***/ "8378":
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.12' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "8495":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Popup_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("8f59");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Popup_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Popup_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "84f2":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "86cc":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("cb7c");
var IE8_DOM_DEFINE = __webpack_require__("c69a");
var toPrimitive = __webpack_require__("6a99");
var dP = Object.defineProperty;

exports.f = __webpack_require__("9e1e") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "8b97":
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__("d3f4");
var anObject = __webpack_require__("cb7c");
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__("9b43")(Function.call, __webpack_require__("11e9").f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),

/***/ "8e6e":
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export = __webpack_require__("5ca1");
var ownKeys = __webpack_require__("990b");
var toIObject = __webpack_require__("6821");
var gOPD = __webpack_require__("11e9");
var createProperty = __webpack_require__("f1ae");

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIObject(object);
    var getDesc = gOPD.f;
    var keys = ownKeys(O);
    var result = {};
    var i = 0;
    var key, desc;
    while (keys.length > i) {
      desc = getDesc(O, key = keys[i++]);
      if (desc !== undefined) createProperty(result, key, desc);
    }
    return result;
  }
});


/***/ }),

/***/ "8f59":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "9093":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__("ce10");
var hiddenKeys = __webpack_require__("e11e").concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),

/***/ "96cf":
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : undefined
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}


/***/ }),

/***/ "990b":
/***/ (function(module, exports, __webpack_require__) {

// all object keys, includes non-enumerable and symbols
var gOPN = __webpack_require__("9093");
var gOPS = __webpack_require__("2621");
var anObject = __webpack_require__("cb7c");
var Reflect = __webpack_require__("7726").Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
  var keys = gOPN.f(anObject(it));
  var getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};


/***/ }),

/***/ "9b43":
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__("d8e8");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "9c6c":
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__("2b4c")('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__("32e9")(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ "9c80":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),

/***/ "9def":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__("4588");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "9e1e":
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__("79e5")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "a018":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "a25f":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';


/***/ }),

/***/ "a481":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__("cb7c");
var toObject = __webpack_require__("4bf8");
var toLength = __webpack_require__("9def");
var toInteger = __webpack_require__("4588");
var advanceStringIndex = __webpack_require__("0390");
var regExpExec = __webpack_require__("5f1b");
var max = Math.max;
var min = Math.min;
var floor = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
__webpack_require__("214f")('replace', 2, function (defined, REPLACE, $replace, maybeCallNative) {
  return [
    // `String.prototype.replace` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = defined(this);
      var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
      return fn !== undefined
        ? fn.call(searchValue, O, replaceValue)
        : $replace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      var res = maybeCallNative($replace, regexp, this, replaceValue);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);
      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;
        results.push(result);
        if (!global) break;
        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }
      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];
        var matched = String(result[0]);
        var position = max(min(toInteger(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];

    // https://tc39.github.io/ecma262/#sec-getsubstitution
  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return $replace.call(replacement, symbols, function (match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return str.slice(0, position);
        case "'": return str.slice(tailPos);
        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  }
});


/***/ }),

/***/ "a5b8":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__("d8e8");

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),

/***/ "a9f5":
/***/ (function(module, exports, __webpack_require__) {

(function(t,e){ true?module.exports=e():undefined})("undefined"!==typeof self?self:this,(function(){return function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s="112a")}({"008a":function(t,e,n){var r=n("f6b4");t.exports=function(t){return Object(r(t))}},"064e":function(t,e,n){var r=n("69b3"),o=n("db6b"),i=n("94b3"),c=Object.defineProperty;e.f=n("149f")?Object.defineProperty:function(t,e,n){if(r(t),e=i(e,!0),r(n),o)try{return c(t,e,n)}catch(a){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(t[e]=n.value),t}},"06a2":function(t,e,n){"use strict";var r=n("fc81")(!0);n("492d")(String,"String",(function(t){this._t=String(t),this._i=0}),(function(){var t,e=this._t,n=this._i;return n>=e.length?{value:void 0,done:!0}:(t=r(e,n),this._i+=t.length,{value:t,done:!1})}))},"09b9":function(t,e,n){var r=n("224c"),o=n("f6b4");t.exports=function(t){return r(o(t))}},"0b53":function(t,e,n){"use strict";var r=n("e7ad"),o=n("e042"),i=n("149f"),c=n("e46b"),a=n("bf16"),u=n("f71f").KEY,f=n("238a"),s=n("6798"),l=n("399f"),d=n("ec45"),p=n("cb3d"),h=n("a08d"),v=n("4d34"),b=n("f091"),y=n("2346"),m=n("69b3"),g=n("fb68"),x=n("008a"),w=n("09b9"),S=n("94b3"),C=n("cc33"),k=n("e005"),O=n("9370"),P=n("dcb7"),_=n("2f77"),j=n("064e"),E=n("80a9"),T=P.f,A=j.f,M=O.f,L=r.Symbol,N=r.JSON,F=N&&N.stringify,R="prototype",I=p("_hidden"),V=p("toPrimitive"),U={}.propertyIsEnumerable,D=s("symbol-registry"),B=s("symbols"),$=s("op-symbols"),G=Object[R],H="function"==typeof L&&!!_.f,z=r.QObject,J=!z||!z[R]||!z[R].findChild,W=i&&f((function(){return 7!=k(A({},"a",{get:function(){return A(this,"a",{value:7}).a}})).a}))?function(t,e,n){var r=T(G,e);r&&delete G[e],A(t,e,n),r&&t!==G&&A(G,e,r)}:A,q=function(t){var e=B[t]=k(L[R]);return e._k=t,e},K=H&&"symbol"==typeof L.iterator?function(t){return"symbol"==typeof t}:function(t){return t instanceof L},X=function(t,e,n){return t===G&&X($,e,n),m(t),e=S(e,!0),m(n),o(B,e)?(n.enumerable?(o(t,I)&&t[I][e]&&(t[I][e]=!1),n=k(n,{enumerable:C(0,!1)})):(o(t,I)||A(t,I,C(1,{})),t[I][e]=!0),W(t,e,n)):A(t,e,n)},Y=function(t,e){m(t);var n,r=b(e=w(e)),o=0,i=r.length;while(i>o)X(t,n=r[o++],e[n]);return t},Q=function(t,e){return void 0===e?k(t):Y(k(t),e)},Z=function(t){var e=U.call(this,t=S(t,!0));return!(this===G&&o(B,t)&&!o($,t))&&(!(e||!o(this,t)||!o(B,t)||o(this,I)&&this[I][t])||e)},tt=function(t,e){if(t=w(t),e=S(e,!0),t!==G||!o(B,e)||o($,e)){var n=T(t,e);return!n||!o(B,e)||o(t,I)&&t[I][e]||(n.enumerable=!0),n}},et=function(t){var e,n=M(w(t)),r=[],i=0;while(n.length>i)o(B,e=n[i++])||e==I||e==u||r.push(e);return r},nt=function(t){var e,n=t===G,r=M(n?$:w(t)),i=[],c=0;while(r.length>c)!o(B,e=r[c++])||n&&!o(G,e)||i.push(B[e]);return i};H||(L=function(){if(this instanceof L)throw TypeError("Symbol is not a constructor!");var t=d(arguments.length>0?arguments[0]:void 0),e=function(n){this===G&&e.call($,n),o(this,I)&&o(this[I],t)&&(this[I][t]=!1),W(this,t,C(1,n))};return i&&J&&W(G,t,{configurable:!0,set:e}),q(t)},a(L[R],"toString",(function(){return this._k})),P.f=tt,j.f=X,n("2ea2").f=O.f=et,n("4f18").f=Z,_.f=nt,i&&!n("550e")&&a(G,"propertyIsEnumerable",Z,!0),h.f=function(t){return q(p(t))}),c(c.G+c.W+c.F*!H,{Symbol:L});for(var rt="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),ot=0;rt.length>ot;)p(rt[ot++]);for(var it=E(p.store),ct=0;it.length>ct;)v(it[ct++]);c(c.S+c.F*!H,"Symbol",{for:function(t){return o(D,t+="")?D[t]:D[t]=L(t)},keyFor:function(t){if(!K(t))throw TypeError(t+" is not a symbol!");for(var e in D)if(D[e]===t)return e},useSetter:function(){J=!0},useSimple:function(){J=!1}}),c(c.S+c.F*!H,"Object",{create:Q,defineProperty:X,defineProperties:Y,getOwnPropertyDescriptor:tt,getOwnPropertyNames:et,getOwnPropertySymbols:nt});var at=f((function(){_.f(1)}));c(c.S+c.F*at,"Object",{getOwnPropertySymbols:function(t){return _.f(x(t))}}),N&&c(c.S+c.F*(!H||f((function(){var t=L();return"[null]"!=F([t])||"{}"!=F({a:t})||"{}"!=F(Object(t))}))),"JSON",{stringify:function(t){var e,n,r=[t],o=1;while(arguments.length>o)r.push(arguments[o++]);if(n=e=r[1],(g(e)||void 0!==t)&&!K(t))return y(e)||(e=function(t,e){if("function"==typeof n&&(e=n.call(this,t,e)),!K(e))return e}),r[1]=e,F.apply(N,r)}}),L[R][V]||n("86d4")(L[R],V,L[R].valueOf),l(L,"Symbol"),l(Math,"Math",!0),l(r.JSON,"JSON",!0)},"0dc8":function(t,e,n){var r=n("064e"),o=n("69b3"),i=n("80a9");t.exports=n("149f")?Object.defineProperties:function(t,e){o(t);var n,c=i(e),a=c.length,u=0;while(a>u)r.f(t,n=c[u++],e[n]);return t}},"0e8b":function(t,e,n){var r=n("cb3d")("unscopables"),o=Array.prototype;void 0==o[r]&&n("86d4")(o,r,{}),t.exports=function(t){o[r][t]=!0}},"112a":function(t,e,n){"use strict";var r;(n.r(e),"undefined"!==typeof window)&&(n("e67d"),(r=window.document.currentScript)&&(r=r.src.match(/(.+\/)[^/]+\.js(\?.*)?$/))&&(n.p=r[1]));n("cc57");var o,i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{directives:[{name:"clickoutside",rawName:"v-clickoutside",value:t.closePanel,expression:"closePanel"}],ref:"colorPicker",staticClass:"m-colorPicker",on:{click:function(t){t.stopPropagation()}}},[n("div",{staticClass:"colorBtn",class:{disabled:t.disabled},style:"background-color: "+t.showColor,on:{click:t.openPanel}}),n("div",{staticClass:"box",class:{open:t.openStatus}},[n("div",{staticClass:"hd"},[n("div",{staticClass:"colorView",style:"background-color: "+t.showPanelColor}),n("div",{staticClass:"defaultColor",on:{click:t.handleDefaultColor,mouseover:function(e){t.hoveColor=t.defaultColor},mouseout:function(e){t.hoveColor=null}}},[t._v("默认颜色")])]),n("div",{staticClass:"bd"},[n("h3",[t._v("主题颜色")]),n("ul",{staticClass:"tColor"},t._l(t.tColor,(function(e,r){return n("li",{key:r,style:{backgroundColor:e},on:{mouseover:function(n){t.hoveColor=e},mouseout:function(e){t.hoveColor=null},click:function(n){return t.updataValue(e)}}})})),0),n("ul",{staticClass:"bColor"},t._l(t.colorPanel,(function(e,r){return n("li",{key:r},[n("ul",t._l(e,(function(e,r){return n("li",{key:r,style:{backgroundColor:e},on:{mouseover:function(n){t.hoveColor=e},mouseout:function(e){t.hoveColor=null},click:function(n){return t.updataValue(e)}}})})),0)])})),0),n("h3",[t._v("标准颜色")]),n("ul",{staticClass:"tColor"},t._l(t.bColor,(function(e,r){return n("li",{key:r,style:{backgroundColor:e},on:{mouseover:function(n){t.hoveColor=e},mouseout:function(e){t.hoveColor=null},click:function(n){return t.updataValue(e)}}})})),0),n("h3",{on:{click:t.triggerHtml5Color}},[t._v("更多颜色...")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.html5Color,expression:"html5Color"}],ref:"html5Color",attrs:{type:"color"},domProps:{value:t.html5Color},on:{change:function(e){return t.updataValue(t.html5Color)},input:function(e){e.target.composing||(t.html5Color=e.target.value)}}})])])])},c=[],a=(n("6d57"),n("309f"),n("0b53"),n("06a2"),n("ec25"),n("2b45"),[]),u="@@clickoutsideContext",f=0;function s(t,e,n){return function(){var r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};!(n&&n.context&&r.target&&o.target)||t.contains(r.target)||t.contains(o.target)||t===r.target||n.context.popperElm&&(n.context.popperElm.contains(r.target)||n.context.popperElm.contains(o.target))||(e.expression&&t[u].methodName&&n.context[t[u].methodName]?n.context[t[u].methodName]():t[u].bindingFn&&t[u].bindingFn())}}document.addEventListener("mousedown",(function(t){return o=t})),document.addEventListener("mouseup",(function(t){a.forEach((function(e){return e[u].documentHandler(t,o)}))}));var l={bind:function(t,e,n){a.push(t);var r=f++;t[u]={id:r,documentHandler:s(t,e,n),methodName:e.expression,bindingFn:e.value}},update:function(t,e,n){t[u].documentHandler=s(t,e,n),t[u].methodName=e.expression,t[u].bindingFn=e.value},unbind:function(t){for(var e=a.length,n=0;n<e;n++)if(a[n][u].id===t[u].id){a.splice(n,1);break}delete t[u]}};function d(t,e){var n;if("undefined"===typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(n=p(t))||e&&t&&"number"===typeof t.length){n&&(t=n);var r=0,o=function(){};return{s:o,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,c=!0,a=!1;return{s:function(){n=t[Symbol.iterator]()},n:function(){var t=n.next();return c=t.done,t},e:function(t){a=!0,i=t},f:function(){try{c||null==n.return||n.return()}finally{if(a)throw i}}}}function p(t,e){if(t){if("string"===typeof t)return h(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?h(t,e):void 0}}function h(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}var v={name:"colorPicker",directives:{clickoutside:l},props:{value:{type:String,required:!0},defaultColor:{type:String,default:"#000000"},disabled:{type:Boolean,default:!1}},data:function(){return{openStatus:!1,hoveColor:null,tColor:["#000000","#ffffff","#eeece1","#1e497b","#4e81bb","#e2534d","#9aba60","#8165a0","#47acc5","#f9974c"],colorConfig:[["#7f7f7f","#f2f2f2"],["#0d0d0d","#808080"],["#1c1a10","#ddd8c3"],["#0e243d","#c6d9f0"],["#233f5e","#dae5f0"],["#632623","#f2dbdb"],["#4d602c","#eaf1de"],["#3f3150","#e6e0ec"],["#1e5867","#d9eef3"],["#99490f","#fee9da"]],bColor:["#c21401","#ff1e02","#ffc12a","#ffff3a","#90cf5b","#00af57","#00afee","#0071be","#00215f","#72349d"],html5Color:this.value}},computed:{showPanelColor:function(){return this.hoveColor?this.hoveColor:this.showColor},showColor:function(){return this.value?this.value:this.defaultColor},colorPanel:function(){var t,e=[],n=d(this.colorConfig);try{for(n.s();!(t=n.n()).done;){var r=t.value;e.push(this.gradient(r[1],r[0],5))}}catch(o){n.e(o)}finally{n.f()}return e}},methods:{openPanel:function(){this.openStatus=!this.disabled},closePanel:function(){this.openStatus=!1},triggerHtml5Color:function(){this.$refs.html5Color.click()},updataValue:function(t){this.$emit("input",t),this.$emit("change",t),this.openStatus=!1},handleDefaultColor:function(){this.updataValue(this.defaultColor)},parseColor:function(t){if(4!==t.length)return t;t="#"+t[1]+t[1]+t[2]+t[2]+t[3]+t[3]},rgbToHex:function(t,e,n){var r=(t<<16|e<<8|n).toString(16);return"#"+new Array(Math.abs(r.length-7)).join("0")+r},hexToRgb:function(t){t=this.parseColor(t);for(var e=[],n=1;n<7;n+=2)e.push(parseInt("0x"+t.slice(n,n+2)));return e},gradient:function(t,e,n){for(var r=this.hexToRgb(t),o=this.hexToRgb(e),i=(o[0]-r[0])/n,c=(o[1]-r[1])/n,a=(o[2]-r[2])/n,u=[],f=0;f<n;f++)u.push(this.rgbToHex(parseInt(i*f+r[0]),parseInt(c*f+r[1]),parseInt(a*f+r[2])));return u}}},b=v;n("e137");function y(t,e,n,r,o,i,c,a){var u,f="function"===typeof t?t.options:t;if(e&&(f.render=e,f.staticRenderFns=n,f._compiled=!0),r&&(f.functional=!0),i&&(f._scopeId="data-v-"+i),c?(u=function(t){t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,t||"undefined"===typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),o&&o.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(c)},f._ssrRegister=u):o&&(u=a?function(){o.call(this,(f.functional?this.parent:this).$root.$options.shadowRoot)}:o),u)if(f.functional){f._injectStyles=u;var s=f.render;f.render=function(t,e){return u.call(e),s(t,e)}}else{var l=f.beforeCreate;f.beforeCreate=l?[].concat(l,u):[u]}return{exports:t,options:f}}var m=y(b,i,c,!1,null,"29accc04",null),g=m.exports;g.install=function(t){t.component(g.name,g)};var x=g,w=[x],S=function t(e){t.installed||w.map((function(t){return e.component(t.name,t)}))};"undefined"!==typeof window&&window.Vue&&S(window.Vue);var C={install:S,colorPicker:x};e["default"]=C},"149f":function(t,e,n){t.exports=!n("238a")((function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a}))},"190b":function(t,e,n){n("149f")&&"g"!=/./g.flags&&n("064e").f(RegExp.prototype,"flags",{configurable:!0,get:n("f1fe")})},"1b07":function(t,e,n){var r=n("ca06");"string"===typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);var o=n("85cb").default;o("34f6f920",r,!0,{sourceMap:!1,shadowMode:!1})},"224c":function(t,e,n){var r=n("75c4");t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==r(t)?t.split(""):Object(t)}},2285:function(t,e,n){var r=n("da6d"),o=n("cb3d")("iterator"),i=Array.prototype;t.exports=function(t){return void 0!==t&&(r.Array===t||i[o]===t)}},2346:function(t,e,n){var r=n("75c4");t.exports=Array.isArray||function(t){return"Array"==r(t)}},"238a":function(t,e){t.exports=function(t){try{return!!t()}catch(e){return!0}}},"2b45":function(t,e,n){"use strict";n("190b");var r=n("69b3"),o=n("f1fe"),i=n("149f"),c="toString",a=/./[c],u=function(t){n("bf16")(RegExp.prototype,c,t,!0)};n("238a")((function(){return"/a/b"!=a.call({source:"a",flags:"b"})}))?u((function(){var t=r(this);return"/".concat(t.source,"/","flags"in t?t.flags:!i&&t instanceof RegExp?o.call(t):void 0)})):a.name!=c&&u((function(){return a.call(this)}))},"2ea2":function(t,e,n){var r=n("c2f7"),o=n("ceac").concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return r(t,o)}},"2f77":function(t,e){e.f=Object.getOwnPropertySymbols},"309f":function(t,e,n){n("4d34")("asyncIterator")},"32b9":function(t,e,n){"use strict";var r=n("e005"),o=n("cc33"),i=n("399f"),c={};n("86d4")(c,n("cb3d")("iterator"),(function(){return this})),t.exports=function(t,e,n){t.prototype=r(c,{next:o(1,n)}),i(t,e+" Iterator")}},"399f":function(t,e,n){var r=n("064e").f,o=n("e042"),i=n("cb3d")("toStringTag");t.exports=function(t,e,n){t&&!o(t=n?t:t.prototype,i)&&r(t,i,{configurable:!0,value:e})}},"475d":function(t,e){t.exports=function(t,e){return{value:e,done:!!t}}},"492d":function(t,e,n){"use strict";var r=n("550e"),o=n("e46b"),i=n("bf16"),c=n("86d4"),a=n("da6d"),u=n("32b9"),f=n("399f"),s=n("58cf"),l=n("cb3d")("iterator"),d=!([].keys&&"next"in[].keys()),p="@@iterator",h="keys",v="values",b=function(){return this};t.exports=function(t,e,n,y,m,g,x){u(n,e,y);var w,S,C,k=function(t){if(!d&&t in j)return j[t];switch(t){case h:return function(){return new n(this,t)};case v:return function(){return new n(this,t)}}return function(){return new n(this,t)}},O=e+" Iterator",P=m==v,_=!1,j=t.prototype,E=j[l]||j[p]||m&&j[m],T=E||k(m),A=m?P?k("entries"):T:void 0,M="Array"==e&&j.entries||E;if(M&&(C=s(M.call(new t)),C!==Object.prototype&&C.next&&(f(C,O,!0),r||"function"==typeof C[l]||c(C,l,b))),P&&E&&E.name!==v&&(_=!0,T=function(){return E.call(this)}),r&&!x||!d&&!_&&j[l]||c(j,l,T),a[e]=T,a[O]=b,m)if(w={values:P?T:k(v),keys:g?T:k(h),entries:A},x)for(S in w)S in j||i(j,S,w[S]);else o(o.P+o.F*(d||_),e,w);return w}},"4ce5":function(t,e,n){var r=n("5daa");t.exports=function(t,e,n){if(r(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,o){return t.call(e,n,r,o)}}return function(){return t.apply(e,arguments)}}},"4d34":function(t,e,n){var r=n("e7ad"),o=n("7ddc"),i=n("550e"),c=n("a08d"),a=n("064e").f;t.exports=function(t){var e=o.Symbol||(o.Symbol=i?{}:r.Symbol||{});"_"==t.charAt(0)||t in e||a(e,t,{value:c.f(t)})}},"4f18":function(t,e){e.f={}.propertyIsEnumerable},"550e":function(t,e){t.exports=!1},"56f2":function(t,e,n){var r=n("6798")("keys"),o=n("ec45");t.exports=function(t){return r[t]||(r[t]=o(t))}},"58cf":function(t,e,n){var r=n("e042"),o=n("008a"),i=n("56f2")("IE_PROTO"),c=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=o(t),r(t,i)?t[i]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?c:null}},"5daa":function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},6798:function(t,e,n){var r=n("7ddc"),o=n("e7ad"),i="__core-js_shared__",c=o[i]||(o[i]={});(t.exports=function(t,e){return c[t]||(c[t]=void 0!==e?e:{})})("versions",[]).push({version:r.version,mode:n("550e")?"pure":"global",copyright:"© 2019 Denis Pushkarev (zloirock.ru)"})},"690e":function(t,e){function n(t,e){var n=t[1]||"",o=t[3];if(!o)return n;if(e&&"function"===typeof btoa){var i=r(o),c=o.sources.map((function(t){return"/*# sourceURL="+o.sourceRoot+t+" */"}));return[n].concat(c).concat([i]).join("\n")}return[n].join("\n")}function r(t){var e=btoa(unescape(encodeURIComponent(JSON.stringify(t)))),n="sourceMappingURL=data:application/json;charset=utf-8;base64,"+e;return"/*# "+n+" */"}t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var r=n(e,t);return e[2]?"@media "+e[2]+"{"+r+"}":r})).join("")},e.i=function(t,n){"string"===typeof t&&(t=[[null,t,""]]);for(var r={},o=0;o<this.length;o++){var i=this[o][0];"number"===typeof i&&(r[i]=!0)}for(o=0;o<t.length;o++){var c=t[o];"number"===typeof c[0]&&r[c[0]]||(n&&!c[2]?c[2]=n:n&&(c[2]="("+c[2]+") and ("+n+")"),e.push(c))}},e}},"69b3":function(t,e,n){var r=n("fb68");t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},"6d57":function(t,e,n){for(var r=n("e44b"),o=n("80a9"),i=n("bf16"),c=n("e7ad"),a=n("86d4"),u=n("da6d"),f=n("cb3d"),s=f("iterator"),l=f("toStringTag"),d=u.Array,p={CSSRuleList:!0,CSSStyleDeclaration:!1,CSSValueList:!1,ClientRectList:!1,DOMRectList:!1,DOMStringList:!1,DOMTokenList:!0,DataTransferItemList:!1,FileList:!1,HTMLAllCollection:!1,HTMLCollection:!1,HTMLFormElement:!1,HTMLSelectElement:!1,MediaList:!0,MimeTypeArray:!1,NamedNodeMap:!1,NodeList:!0,PaintRequestList:!1,Plugin:!1,PluginArray:!1,SVGLengthList:!1,SVGNumberList:!1,SVGPathSegList:!1,SVGPointList:!1,SVGStringList:!1,SVGTransformList:!1,SourceBufferList:!1,StyleSheetList:!0,TextTrackCueList:!1,TextTrackList:!1,TouchList:!1},h=o(p),v=0;v<h.length;v++){var b,y=h[v],m=p[y],g=c[y],x=g&&g.prototype;if(x&&(x[s]||a(x,s,d),x[l]||a(x,l,y),u[y]=d,m))for(b in r)x[b]||i(x,b,r[b],!0)}},"75c4":function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},"7ddc":function(t,e){var n=t.exports={version:"2.6.11"};"number"==typeof __e&&(__e=n)},"7e23":function(t,e,n){var r=n("75c4"),o=n("cb3d")("toStringTag"),i="Arguments"==r(function(){return arguments}()),c=function(t,e){try{return t[e]}catch(n){}};t.exports=function(t){var e,n,a;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(n=c(e=Object(t),o))?n:i?r(e):"Object"==(a=r(e))&&"function"==typeof e.callee?"Arguments":a}},"80a9":function(t,e,n){var r=n("c2f7"),o=n("ceac");t.exports=Object.keys||function(t){return r(t,o)}},"85cb":function(t,e,n){"use strict";function r(t,e){for(var n=[],r={},o=0;o<e.length;o++){var i=e[o],c=i[0],a=i[1],u=i[2],f=i[3],s={id:t+":"+o,css:a,media:u,sourceMap:f};r[c]?r[c].parts.push(s):n.push(r[c]={id:c,parts:[s]})}return n}n.r(e),n.d(e,"default",(function(){return h}));var o="undefined"!==typeof document;if("undefined"!==typeof DEBUG&&DEBUG&&!o)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var i={},c=o&&(document.head||document.getElementsByTagName("head")[0]),a=null,u=0,f=!1,s=function(){},l=null,d="data-vue-ssr-id",p="undefined"!==typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());function h(t,e,n,o){f=n,l=o||{};var c=r(t,e);return v(c),function(e){for(var n=[],o=0;o<c.length;o++){var a=c[o],u=i[a.id];u.refs--,n.push(u)}e?(c=r(t,e),v(c)):c=[];for(o=0;o<n.length;o++){u=n[o];if(0===u.refs){for(var f=0;f<u.parts.length;f++)u.parts[f]();delete i[u.id]}}}}function v(t){for(var e=0;e<t.length;e++){var n=t[e],r=i[n.id];if(r){r.refs++;for(var o=0;o<r.parts.length;o++)r.parts[o](n.parts[o]);for(;o<n.parts.length;o++)r.parts.push(y(n.parts[o]));r.parts.length>n.parts.length&&(r.parts.length=n.parts.length)}else{var c=[];for(o=0;o<n.parts.length;o++)c.push(y(n.parts[o]));i[n.id]={id:n.id,refs:1,parts:c}}}}function b(){var t=document.createElement("style");return t.type="text/css",c.appendChild(t),t}function y(t){var e,n,r=document.querySelector("style["+d+'~="'+t.id+'"]');if(r){if(f)return s;r.parentNode.removeChild(r)}if(p){var o=u++;r=a||(a=b()),e=g.bind(null,r,o,!1),n=g.bind(null,r,o,!0)}else r=b(),e=x.bind(null,r),n=function(){r.parentNode.removeChild(r)};return e(t),function(r){if(r){if(r.css===t.css&&r.media===t.media&&r.sourceMap===t.sourceMap)return;e(t=r)}else n()}}var m=function(){var t=[];return function(e,n){return t[e]=n,t.filter(Boolean).join("\n")}}();function g(t,e,n,r){var o=n?"":r.css;if(t.styleSheet)t.styleSheet.cssText=m(e,o);else{var i=document.createTextNode(o),c=t.childNodes;c[e]&&t.removeChild(c[e]),c.length?t.insertBefore(i,c[e]):t.appendChild(i)}}function x(t,e){var n=e.css,r=e.media,o=e.sourceMap;if(r&&t.setAttribute("media",r),l.ssrId&&t.setAttribute(d,e.id),o&&(n+="\n/*# sourceURL="+o.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */"),t.styleSheet)t.styleSheet.cssText=n;else{while(t.firstChild)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}},"86d4":function(t,e,n){var r=n("064e"),o=n("cc33");t.exports=n("149f")?function(t,e,n){return r.f(t,e,o(1,n))}:function(t,e,n){return t[e]=n,t}},"8df1":function(t,e,n){var r=n("e7ad").document;t.exports=r&&r.documentElement},9370:function(t,e,n){var r=n("09b9"),o=n("2ea2").f,i={}.toString,c="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],a=function(t){try{return o(t)}catch(e){return c.slice()}};t.exports.f=function(t){return c&&"[object Window]"==i.call(t)?a(t):o(r(t))}},"94b3":function(t,e,n){var r=n("fb68");t.exports=function(t,e){if(!r(t))return t;var n,o;if(e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;if("function"==typeof(n=t.valueOf)&&!r(o=n.call(t)))return o;if(!e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;throw TypeError("Can't convert object to primitive value")}},a08d:function(t,e,n){e.f=n("cb3d")},b3a6:function(t,e,n){var r=n("09b9"),o=n("eafa"),i=n("f58a");t.exports=function(t){return function(e,n,c){var a,u=r(e),f=o(u.length),s=i(c,f);if(t&&n!=n){while(f>s)if(a=u[s++],a!=a)return!0}else for(;f>s;s++)if((t||s in u)&&u[s]===n)return t||s||0;return!t&&-1}}},bf16:function(t,e,n){var r=n("e7ad"),o=n("86d4"),i=n("e042"),c=n("ec45")("src"),a=n("d07e"),u="toString",f=(""+a).split(u);n("7ddc").inspectSource=function(t){return a.call(t)},(t.exports=function(t,e,n,a){var u="function"==typeof n;u&&(i(n,"name")||o(n,"name",e)),t[e]!==n&&(u&&(i(n,c)||o(n,c,t[e]?""+t[e]:f.join(String(e)))),t===r?t[e]=n:a?t[e]?t[e]=n:o(t,e,n):(delete t[e],o(t,e,n)))})(Function.prototype,u,(function(){return"function"==typeof this&&this[c]||a.call(this)}))},bfe7:function(t,e,n){var r=n("fb68"),o=n("e7ad").document,i=r(o)&&r(o.createElement);t.exports=function(t){return i?o.createElement(t):{}}},c2f7:function(t,e,n){var r=n("e042"),o=n("09b9"),i=n("b3a6")(!1),c=n("56f2")("IE_PROTO");t.exports=function(t,e){var n,a=o(t),u=0,f=[];for(n in a)n!=c&&r(a,n)&&f.push(n);while(e.length>u)r(a,n=e[u++])&&(~i(f,n)||f.push(n));return f}},ca06:function(t,e,n){e=t.exports=n("690e")(!1),e.push([t.i,".m-colorPicker[data-v-29accc04]{position:relative;text-align:left;font-size:14px;display:inline-block;outline:none}.m-colorPicker li[data-v-29accc04],.m-colorPicker ol[data-v-29accc04],.m-colorPicker ul[data-v-29accc04]{list-style:none;margin:0;padding:0}.m-colorPicker .colorBtn[data-v-29accc04]{width:15px;height:15px}.m-colorPicker .colorBtn.disabled[data-v-29accc04]{cursor:no-drop}.m-colorPicker .box[data-v-29accc04]{position:absolute;width:190px;background:#fff;border:1px solid #ddd;visibility:hidden;border-radius:2px;margin-top:2px;padding:10px;padding-bottom:5px;-webkit-box-shadow:0 0 5px rgba(0,0,0,.15);box-shadow:0 0 5px rgba(0,0,0,.15);opacity:0;-webkit-transition:all .3s ease;transition:all .3s ease;-webkit-box-sizing:content-box;box-sizing:content-box}.m-colorPicker .box h3[data-v-29accc04]{margin:0;font-size:14px;font-weight:400;margin-top:10px;margin-bottom:5px;line-height:1;color:#333}.m-colorPicker .box input[data-v-29accc04]{visibility:hidden;position:absolute;left:0;bottom:0}.m-colorPicker .box.open[data-v-29accc04]{visibility:visible;opacity:1;z-index:1}.m-colorPicker .hd[data-v-29accc04]{overflow:hidden;line-height:29px}.m-colorPicker .hd .colorView[data-v-29accc04]{width:100px;height:30px;float:left;-webkit-transition:background-color .3s ease;transition:background-color .3s ease}.m-colorPicker .hd .defaultColor[data-v-29accc04]{width:80px;float:right;text-align:center;border:1px solid #ddd;cursor:pointer;color:#333}.m-colorPicker .tColor li[data-v-29accc04]{width:15px;height:15px;display:inline-block;margin:0 2px;-webkit-transition:all .3s ease;transition:all .3s ease}.m-colorPicker .tColor li[data-v-29accc04]:hover{-webkit-box-shadow:0 0 5px rgba(0,0,0,.4);box-shadow:0 0 5px rgba(0,0,0,.4);-webkit-transform:scale(1.3);transform:scale(1.3)}.m-colorPicker .bColor li[data-v-29accc04]{width:15px;display:inline-block;margin:0 2px}.m-colorPicker .bColor li li[data-v-29accc04]{display:block;width:15px;height:15px;-webkit-transition:all .3s ease;transition:all .3s ease;margin:0}.m-colorPicker .bColor li li[data-v-29accc04]:hover{-webkit-box-shadow:0 0 5px rgba(0,0,0,.4);box-shadow:0 0 5px rgba(0,0,0,.4);-webkit-transform:scale(1.3);transform:scale(1.3)}",""])},cb3d:function(t,e,n){var r=n("6798")("wks"),o=n("ec45"),i=n("e7ad").Symbol,c="function"==typeof i,a=t.exports=function(t){return r[t]||(r[t]=c&&i[t]||(c?i:o)("Symbol."+t))};a.store=r},cc33:function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},cc57:function(t,e,n){var r=n("064e").f,o=Function.prototype,i=/^\s*function ([^ (]*)/,c="name";c in o||n("149f")&&r(o,c,{configurable:!0,get:function(){try{return(""+this).match(i)[1]}catch(t){return""}}})},ceac:function(t,e){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},d07e:function(t,e,n){t.exports=n("6798")("native-function-to-string",Function.toString)},d0bc:function(t,e,n){var r=n("69b3");t.exports=function(t,e,n,o){try{return o?e(r(n)[0],n[1]):e(n)}catch(c){var i=t["return"];throw void 0!==i&&r(i.call(t)),c}}},d0c5:function(t,e,n){var r=n("cb3d")("iterator"),o=!1;try{var i=[7][r]();i["return"]=function(){o=!0},Array.from(i,(function(){throw 2}))}catch(c){}t.exports=function(t,e){if(!e&&!o)return!1;var n=!1;try{var i=[7],a=i[r]();a.next=function(){return{done:n=!0}},i[r]=function(){return a},t(i)}catch(c){}return n}},da6d:function(t,e){t.exports={}},db6b:function(t,e,n){t.exports=!n("149f")&&!n("238a")((function(){return 7!=Object.defineProperty(n("bfe7")("div"),"a",{get:function(){return 7}}).a}))},dcb7:function(t,e,n){var r=n("4f18"),o=n("cc33"),i=n("09b9"),c=n("94b3"),a=n("e042"),u=n("db6b"),f=Object.getOwnPropertyDescriptor;e.f=n("149f")?f:function(t,e){if(t=i(t),e=c(e,!0),u)try{return f(t,e)}catch(n){}if(a(t,e))return o(!r.f.call(t,e),t[e])}},e005:function(t,e,n){var r=n("69b3"),o=n("0dc8"),i=n("ceac"),c=n("56f2")("IE_PROTO"),a=function(){},u="prototype",f=function(){var t,e=n("bfe7")("iframe"),r=i.length,o="<",c=">";e.style.display="none",n("8df1").appendChild(e),e.src="javascript:",t=e.contentWindow.document,t.open(),t.write(o+"script"+c+"document.F=Object"+o+"/script"+c),t.close(),f=t.F;while(r--)delete f[u][i[r]];return f()};t.exports=Object.create||function(t,e){var n;return null!==t?(a[u]=r(t),n=new a,a[u]=null,n[c]=t):n=f(),void 0===e?n:o(n,e)}},e042:function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},e137:function(t,e,n){"use strict";var r=n("1b07"),o=n.n(r);o.a},e44b:function(t,e,n){"use strict";var r=n("0e8b"),o=n("475d"),i=n("da6d"),c=n("09b9");t.exports=n("492d")(Array,"Array",(function(t,e){this._t=c(t),this._i=0,this._k=e}),(function(){var t=this._t,e=this._k,n=this._i++;return!t||n>=t.length?(this._t=void 0,o(1)):o(0,"keys"==e?n:"values"==e?t[n]:[n,t[n]])}),"values"),i.Arguments=i.Array,r("keys"),r("values"),r("entries")},e46b:function(t,e,n){var r=n("e7ad"),o=n("7ddc"),i=n("86d4"),c=n("bf16"),a=n("4ce5"),u="prototype",f=function(t,e,n){var s,l,d,p,h=t&f.F,v=t&f.G,b=t&f.S,y=t&f.P,m=t&f.B,g=v?r:b?r[e]||(r[e]={}):(r[e]||{})[u],x=v?o:o[e]||(o[e]={}),w=x[u]||(x[u]={});for(s in v&&(n=e),n)l=!h&&g&&void 0!==g[s],d=(l?g:n)[s],p=m&&l?a(d,r):y&&"function"==typeof d?a(Function.call,d):d,g&&c(g,s,d,t&f.U),x[s]!=d&&i(x,s,p),y&&w[s]!=d&&(w[s]=d)};r.core=o,f.F=1,f.G=2,f.S=4,f.P=8,f.B=16,f.W=32,f.U=64,f.R=128,t.exports=f},e67d:function(t,e){(function(t){var e="currentScript",n=t.getElementsByTagName("script");e in t||Object.defineProperty(t,e,{get:function(){try{throw new Error}catch(r){var t,e=(/.*at [^\(]*\((.*):.+:.+\)$/gi.exec(r.stack)||[!1])[1];for(t in n)if(n[t].src==e||"interactive"==n[t].readyState)return n[t];return null}}})})(document)},e7ad:function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},eafa:function(t,e,n){var r=n("ee21"),o=Math.min;t.exports=function(t){return t>0?o(r(t),9007199254740991):0}},ebc3:function(t,e,n){"use strict";var r=n("064e"),o=n("cc33");t.exports=function(t,e,n){e in t?r.f(t,e,o(0,n)):t[e]=n}},ec25:function(t,e,n){"use strict";var r=n("4ce5"),o=n("e46b"),i=n("008a"),c=n("d0bc"),a=n("2285"),u=n("eafa"),f=n("ebc3"),s=n("f878");o(o.S+o.F*!n("d0c5")((function(t){Array.from(t)})),"Array",{from:function(t){var e,n,o,l,d=i(t),p="function"==typeof this?this:Array,h=arguments.length,v=h>1?arguments[1]:void 0,b=void 0!==v,y=0,m=s(d);if(b&&(v=r(v,h>2?arguments[2]:void 0,2)),void 0==m||p==Array&&a(m))for(e=u(d.length),n=new p(e);e>y;y++)f(n,y,b?v(d[y],y):d[y]);else for(l=m.call(d),n=new p;!(o=l.next()).done;y++)f(n,y,b?c(l,v,[o.value,y],!0):o.value);return n.length=y,n}})},ec45:function(t,e){var n=0,r=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++n+r).toString(36))}},ee21:function(t,e){var n=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:n)(t)}},f091:function(t,e,n){var r=n("80a9"),o=n("2f77"),i=n("4f18");t.exports=function(t){var e=r(t),n=o.f;if(n){var c,a=n(t),u=i.f,f=0;while(a.length>f)u.call(t,c=a[f++])&&e.push(c)}return e}},f1fe:function(t,e,n){"use strict";var r=n("69b3");t.exports=function(){var t=r(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}},f58a:function(t,e,n){var r=n("ee21"),o=Math.max,i=Math.min;t.exports=function(t,e){return t=r(t),t<0?o(t+e,0):i(t,e)}},f6b4:function(t,e){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},f71f:function(t,e,n){var r=n("ec45")("meta"),o=n("fb68"),i=n("e042"),c=n("064e").f,a=0,u=Object.isExtensible||function(){return!0},f=!n("238a")((function(){return u(Object.preventExtensions({}))})),s=function(t){c(t,r,{value:{i:"O"+ ++a,w:{}}})},l=function(t,e){if(!o(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!i(t,r)){if(!u(t))return"F";if(!e)return"E";s(t)}return t[r].i},d=function(t,e){if(!i(t,r)){if(!u(t))return!0;if(!e)return!1;s(t)}return t[r].w},p=function(t){return f&&h.NEED&&u(t)&&!i(t,r)&&s(t),t},h=t.exports={KEY:r,NEED:!1,fastKey:l,getWeak:d,onFreeze:p}},f878:function(t,e,n){var r=n("7e23"),o=n("cb3d")("iterator"),i=n("da6d");t.exports=n("7ddc").getIteratorMethod=function(t){if(void 0!=t)return t[o]||t["@@iterator"]||i[r(t)]}},fb68:function(t,e){t.exports=function(t){return"object"===typeof t?null!==t:"function"===typeof t}},fc81:function(t,e,n){var r=n("ee21"),o=n("f6b4");t.exports=function(t){return function(e,n){var i,c,a=String(o(e)),u=r(n),f=a.length;return u<0||u>=f?t?"":void 0:(i=a.charCodeAt(u),i<55296||i>56319||u+1===f||(c=a.charCodeAt(u+1))<56320||c>57343?t?a.charAt(u):i:t?a.slice(u,u+2):c-56320+(i-55296<<10)+65536)}}}})}));
//# sourceMappingURL=vcolorpicker.umd.min.js.map

/***/ }),

/***/ "aa77":
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__("5ca1");
var defined = __webpack_require__("be13");
var fails = __webpack_require__("79e5");
var spaces = __webpack_require__("fdef");
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;


/***/ }),

/***/ "aae3":
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__("d3f4");
var cof = __webpack_require__("2d95");
var MATCH = __webpack_require__("2b4c")('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};


/***/ }),

/***/ "ac6a":
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__("cadf");
var getKeys = __webpack_require__("0d58");
var redefine = __webpack_require__("2aba");
var global = __webpack_require__("7726");
var hide = __webpack_require__("32e9");
var Iterators = __webpack_require__("84f2");
var wks = __webpack_require__("2b4c");
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),

/***/ "ade3":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _defineProperty; });
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

/***/ }),

/***/ "b0c5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var regexpExec = __webpack_require__("520a");
__webpack_require__("5ca1")({
  target: 'RegExp',
  proto: true,
  forced: regexpExec !== /./.exec
}, {
  exec: regexpExec
});


/***/ }),

/***/ "bcaa":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("cb7c");
var isObject = __webpack_require__("d3f4");
var newPromiseCapability = __webpack_require__("a5b8");

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),

/***/ "be13":
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "c366":
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__("6821");
var toLength = __webpack_require__("9def");
var toAbsoluteIndex = __webpack_require__("77f1");
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ "c5f6":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("7726");
var has = __webpack_require__("69a8");
var cof = __webpack_require__("2d95");
var inheritIfRequired = __webpack_require__("5dbc");
var toPrimitive = __webpack_require__("6a99");
var fails = __webpack_require__("79e5");
var gOPN = __webpack_require__("9093").f;
var gOPD = __webpack_require__("11e9").f;
var dP = __webpack_require__("86cc").f;
var $trim = __webpack_require__("aa77").trim;
var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = cof(__webpack_require__("2aeb")(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default: return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function () { proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = __webpack_require__("9e1e") ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(Base, key = keys[j]) && !has($Number, key)) {
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  __webpack_require__("2aba")(global, NUMBER, $Number);
}


/***/ }),

/***/ "c69a":
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__("9e1e") && !__webpack_require__("79e5")(function () {
  return Object.defineProperty(__webpack_require__("230e")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "c8ba":
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "ca5a":
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "cadf":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__("9c6c");
var step = __webpack_require__("d53b");
var Iterators = __webpack_require__("84f2");
var toIObject = __webpack_require__("6821");

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__("01f9")(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "cb7c":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "cd1c":
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__("e853");

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),

/***/ "ce10":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("69a8");
var toIObject = __webpack_require__("6821");
var arrayIndexOf = __webpack_require__("c366")(false);
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "ce105":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StateControl_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("eb4c");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StateControl_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StateControl_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "d2c8":
/***/ (function(module, exports, __webpack_require__) {

// helper for String#{startsWith, endsWith, includes}
var isRegExp = __webpack_require__("aae3");
var defined = __webpack_require__("be13");

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};


/***/ }),

/***/ "d3a2":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "d3f4":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "d53b":
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ "d8e8":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "db98":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "dcbc":
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__("2aba");
module.exports = function (target, src, safe) {
  for (var key in src) redefine(target, key, src[key], safe);
  return target;
};


/***/ }),

/***/ "e11e":
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "e1b4":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Sightline_vue_vue_type_style_index_0_id_56b74dc2_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("db98");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Sightline_vue_vue_type_style_index_0_id_56b74dc2_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Sightline_vue_vue_type_style_index_0_id_56b74dc2_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "e347":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Viewshed_vue_vue_type_style_index_0_id_531ad44f_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("a018");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Viewshed_vue_vue_type_style_index_0_id_531ad44f_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Viewshed_vue_vue_type_style_index_0_id_531ad44f_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "e853":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var isArray = __webpack_require__("1169");
var SPECIES = __webpack_require__("2b4c")('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),

/***/ "eb4c":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "ebd6":
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__("cb7c");
var aFunction = __webpack_require__("d8e8");
var SPECIES = __webpack_require__("2b4c")('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),

/***/ "ef4c":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "f0c1":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aFunction = __webpack_require__("d8e8");
var isObject = __webpack_require__("d3f4");
var invoke = __webpack_require__("31f4");
var arraySlice = [].slice;
var factories = {};

var construct = function (F, len, args) {
  if (!(len in factories)) {
    for (var n = [], i = 0; i < len; i++) n[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction(this);
  var partArgs = arraySlice.call(arguments, 1);
  var bound = function (/* args... */) {
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if (isObject(fn.prototype)) bound.prototype = fn.prototype;
  return bound;
};


/***/ }),

/***/ "f1ae":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__("86cc");
var createDesc = __webpack_require__("4630");

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),

/***/ "f28b":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "f605":
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),

/***/ "f614":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "f6fd":
/***/ (function(module, exports) {

// document.currentScript polyfill by Adam Miller

// MIT license

(function(document){
  var currentScript = "currentScript",
      scripts = document.getElementsByTagName('script'); // Live NodeList collection

  // If browser needs currentScript polyfill, add get currentScript() to the document object
  if (!(currentScript in document)) {
    Object.defineProperty(document, currentScript, {
      get: function(){

        // IE 6-10 supports script readyState
        // IE 10+ support stack trace
        try { throw new Error(); }
        catch (err) {

          // Find the second match for the "at" string to get file src url from stack.
          // Specifically works with the format of stack traces in IE.
          var i, res = ((/.*at [^\(]*\((.*):.+:.+\)$/ig).exec(err.stack) || [false])[1];

          // For all scripts on the page, if src matches or if ready state is interactive, return the script tag
          for(i in scripts){
            if(scripts[i].src == res || scripts[i].readyState == "interactive"){
              return scripts[i];
            }
          }

          // If no match, return null
          return null;
        }
      }
    });
  }
})(document);


/***/ }),

/***/ "f751":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__("5ca1");

$export($export.S + $export.F, 'Object', { assign: __webpack_require__("7333") });


/***/ }),

/***/ "fa5b":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("5537")('native-function-to-string', Function.toString);


/***/ }),

/***/ "fab2":
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__("7726").document;
module.exports = document && document.documentElement;


/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "MapgisWebScene", function() { return /* reexport */ WebGlobe; });
__webpack_require__.d(__webpack_exports__, "Mapgis3dStatebar", function() { return /* reexport */ StateControl; });
__webpack_require__.d(__webpack_exports__, "Mapgis3dLink", function() { return /* reexport */ Link; });
__webpack_require__.d(__webpack_exports__, "Mapgis3dDraw", function() { return /* reexport */ Draw; });
__webpack_require__.d(__webpack_exports__, "Mapgis3dMeasure", function() { return /* reexport */ Measure; });
__webpack_require__.d(__webpack_exports__, "Mapgis3dCompare", function() { return /* reexport */ Compare; });
__webpack_require__.d(__webpack_exports__, "Mapgis3dArcgisLegend", function() { return /* reexport */ Legend; });
__webpack_require__.d(__webpack_exports__, "Mapgis3dImageryLayer", function() { return /* reexport */ ImageryLayer; });
__webpack_require__.d(__webpack_exports__, "Mapgis3dIgsDocLayer", function() { return /* reexport */ IgsDocLayer; });
__webpack_require__.d(__webpack_exports__, "Mapgis3dIgsTileLayer", function() { return /* reexport */ IgsTileLayer; });
__webpack_require__.d(__webpack_exports__, "Mapgis3dRasterLayer", function() { return /* reexport */ BaseRasterLayer; });
__webpack_require__.d(__webpack_exports__, "Mapgis3dRasterTileLayer", function() { return /* reexport */ RasterTileLayer; });
__webpack_require__.d(__webpack_exports__, "Mapgis3dOgcWmtsLayer", function() { return /* reexport */ OGCWMTSLayer; });
__webpack_require__.d(__webpack_exports__, "Mapgis3dOgcWmsLayer", function() { return /* reexport */ OGCWMSLayer; });
__webpack_require__.d(__webpack_exports__, "Mapgis3dIgsVectorLayer", function() { return /* reexport */ IgsVectorLayer; });
__webpack_require__.d(__webpack_exports__, "Mapgis3dArcgisTileLayer", function() { return /* reexport */ ArcGISTileLayer; });
__webpack_require__.d(__webpack_exports__, "Mapgis3dArcgisMapLayer", function() { return /* reexport */ ArcGISMapLayer; });
__webpack_require__.d(__webpack_exports__, "Mapgis3dVectortileLayer", function() { return /* reexport */ VectorTileLayer; });
__webpack_require__.d(__webpack_exports__, "Mapgis3dFileM3d", function() { return /* reexport */ M3dFile; });
__webpack_require__.d(__webpack_exports__, "Mapgis3dIgsM3d", function() { return /* reexport */ M3d; });
__webpack_require__.d(__webpack_exports__, "Mapgis3dTileset", function() { return /* reexport */ _3dTileset; });
__webpack_require__.d(__webpack_exports__, "Mapgis3dPopup", function() { return /* reexport */ Popup; });
__webpack_require__.d(__webpack_exports__, "Mapgis3dIGSTerrainProvider", function() { return /* reexport */ IgsTerrainProvider; });
__webpack_require__.d(__webpack_exports__, "Mapgis3dTerrainProvider", function() { return /* reexport */ TerrainProvider; });
__webpack_require__.d(__webpack_exports__, "Mapgis3dGeoJsonDataSource", function() { return /* reexport */ GeoJsonDataSource; });
__webpack_require__.d(__webpack_exports__, "Mapgis3dCzmlDataSource", function() { return /* reexport */ CzmlDataSource; });
__webpack_require__.d(__webpack_exports__, "Mapgis3dViewshed", function() { return /* reexport */ Viewshed; });
__webpack_require__.d(__webpack_exports__, "Mapgis3dSightline", function() { return /* reexport */ Sightline; });
__webpack_require__.d(__webpack_exports__, "Mapgis3dSkyline", function() { return /* reexport */ SkyLine; });
__webpack_require__.d(__webpack_exports__, "Mapgis3dExcavate", function() { return /* reexport */ Excavate; });
__webpack_require__.d(__webpack_exports__, "Mapgis3dFlood", function() { return /* reexport */ Flood; });
__webpack_require__.d(__webpack_exports__, "Mapgis3dFloodNoSlot", function() { return /* reexport */ FloodNoSlot; });
__webpack_require__.d(__webpack_exports__, "colorPicker", function() { return /* reexport */ vcolorpicker_umd_min_default.a; });

// NAMESPACE OBJECT: ./src/cdn/cdn_component.js
var cdn_component_namespaceObject = {};
__webpack_require__.r(cdn_component_namespaceObject);
__webpack_require__.d(cdn_component_namespaceObject, "MapgisWebScene", function() { return WebGlobe; });
__webpack_require__.d(cdn_component_namespaceObject, "Mapgis3dStatebar", function() { return StateControl; });
__webpack_require__.d(cdn_component_namespaceObject, "Mapgis3dLink", function() { return Link; });
__webpack_require__.d(cdn_component_namespaceObject, "Mapgis3dDraw", function() { return Draw; });
__webpack_require__.d(cdn_component_namespaceObject, "Mapgis3dMeasure", function() { return Measure; });
__webpack_require__.d(cdn_component_namespaceObject, "Mapgis3dCompare", function() { return Compare; });
__webpack_require__.d(cdn_component_namespaceObject, "Mapgis3dArcgisLegend", function() { return Legend; });
__webpack_require__.d(cdn_component_namespaceObject, "Mapgis3dImageryLayer", function() { return ImageryLayer; });
__webpack_require__.d(cdn_component_namespaceObject, "Mapgis3dIgsDocLayer", function() { return IgsDocLayer; });
__webpack_require__.d(cdn_component_namespaceObject, "Mapgis3dIgsTileLayer", function() { return IgsTileLayer; });
__webpack_require__.d(cdn_component_namespaceObject, "Mapgis3dRasterLayer", function() { return BaseRasterLayer; });
__webpack_require__.d(cdn_component_namespaceObject, "Mapgis3dRasterTileLayer", function() { return RasterTileLayer; });
__webpack_require__.d(cdn_component_namespaceObject, "Mapgis3dOgcWmtsLayer", function() { return OGCWMTSLayer; });
__webpack_require__.d(cdn_component_namespaceObject, "Mapgis3dOgcWmsLayer", function() { return OGCWMSLayer; });
__webpack_require__.d(cdn_component_namespaceObject, "Mapgis3dIgsVectorLayer", function() { return IgsVectorLayer; });
__webpack_require__.d(cdn_component_namespaceObject, "Mapgis3dArcgisTileLayer", function() { return ArcGISTileLayer; });
__webpack_require__.d(cdn_component_namespaceObject, "Mapgis3dArcgisMapLayer", function() { return ArcGISMapLayer; });
__webpack_require__.d(cdn_component_namespaceObject, "Mapgis3dVectortileLayer", function() { return VectorTileLayer; });
__webpack_require__.d(cdn_component_namespaceObject, "Mapgis3dFileM3d", function() { return M3dFile; });
__webpack_require__.d(cdn_component_namespaceObject, "Mapgis3dIgsM3d", function() { return M3d; });
__webpack_require__.d(cdn_component_namespaceObject, "Mapgis3dTileset", function() { return _3dTileset; });
__webpack_require__.d(cdn_component_namespaceObject, "Mapgis3dPopup", function() { return Popup; });
__webpack_require__.d(cdn_component_namespaceObject, "Mapgis3dIGSTerrainProvider", function() { return IgsTerrainProvider; });
__webpack_require__.d(cdn_component_namespaceObject, "Mapgis3dTerrainProvider", function() { return TerrainProvider; });
__webpack_require__.d(cdn_component_namespaceObject, "Mapgis3dGeoJsonDataSource", function() { return GeoJsonDataSource; });
__webpack_require__.d(cdn_component_namespaceObject, "Mapgis3dCzmlDataSource", function() { return CzmlDataSource; });
__webpack_require__.d(cdn_component_namespaceObject, "Mapgis3dViewshed", function() { return Viewshed; });
__webpack_require__.d(cdn_component_namespaceObject, "Mapgis3dSightline", function() { return Sightline; });
__webpack_require__.d(cdn_component_namespaceObject, "Mapgis3dSkyline", function() { return SkyLine; });
__webpack_require__.d(cdn_component_namespaceObject, "Mapgis3dExcavate", function() { return Excavate; });
__webpack_require__.d(cdn_component_namespaceObject, "Mapgis3dFlood", function() { return Flood; });
__webpack_require__.d(cdn_component_namespaceObject, "Mapgis3dFloodNoSlot", function() { return FloodNoSlot; });
__webpack_require__.d(cdn_component_namespaceObject, "colorPicker", function() { return vcolorpicker_umd_min_default.a; });

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  if (true) {
    __webpack_require__("f6fd")
  }

  var setPublicPath_i
  if ((setPublicPath_i = window.document.currentScript) && (setPublicPath_i = setPublicPath_i.src.match(/(.+\/)[^/]+\.js(\?.*)?$/))) {
    __webpack_require__.p = setPublicPath_i[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4746d4ad-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/WebGlobe/WebGlobe.vue?vue&type=template&id=0e1b64be&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"cesium-map-wrapper"},[_vm._m(0),(_vm.initialized)?_vm._t("default"):_vm._e()],2)}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{ref:"container",attrs:{"id":_vm.container}})}]


// CONCATENATED MODULE: ./src/components/WebGlobe/WebGlobe.vue?vue&type=template&id=0e1b64be&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es7.object.get-own-property-descriptors.js
var es7_object_get_own_property_descriptors = __webpack_require__("8e6e");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom.iterable.js
var web_dom_iterable = __webpack_require__("ac6a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.iterator.js
var es6_array_iterator = __webpack_require__("cadf");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.keys.js
var es6_object_keys = __webpack_require__("456d");

// EXTERNAL MODULE: ./node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__("96cf");

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.number.constructor.js
var es6_number_constructor = __webpack_require__("c5f6");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__("ade3");

// EXTERNAL MODULE: ./node_modules/@mapgis/cesium/dist/Widgets/widgets.css
var widgets = __webpack_require__("f28b");

// EXTERNAL MODULE: ./src/components/WebGlobe/mixins/withPrivateMethods.js
var withPrivateMethods = __webpack_require__("8269");

// CONCATENATED MODULE: ./src/lib/withEvents.js






function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { Object(defineProperty["a" /* default */])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/* harmony default export */ var withEvents = ({
  methods: {
    /**
     * Emit Vue event with additional data
     *
     * @param {string} name EventName
     * @param {Object} [data={}] Additional data
     */
    $_emitEvent: function $_emitEvent(name) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.$emit(name, _objectSpread({
        map: this.map,
        component: this
      }, data));
    },

    /**
     * Emit Vue event with Mapbox event as additional data
     *
     * @param {Object} event
     */
    $_emitMapEvent: function $_emitMapEvent(event) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.$_emitEvent(event.type, _objectSpread({
        cesiumEvent: event
      }, data));
    }
  }
});
// CONCATENATED MODULE: ./src/components/WebGlobe/events.js
/* eslint-disable key-spacing */
/* harmony default export */ var events = ({
  /**
   *@description viewer.scene.camera
   */
  moveStart: {
    name: "moveStart"
  },
  moveEnd: {
    name: "moveEnd"
  },

  /**
   *@description ScreenSpaceEventType
   */
  leftDown: {
    name: "leftDown"
  },
  rightDown: {
    name: "rightDown"
  }
});
// CONCATENATED MODULE: ./src/components/WebGlobe/util.js
function util_flyTo(globeView, webGlobe) {
  webGlobe.viewer.camera.flyTo(globeView);
}
function util_flyToEx(globeView, webGlobe) {
  var destination = globeView.destination,
      orientation = globeView.orientation;
  var x = destination.x,
      y = destination.y,
      z = destination.z;
  var heading = orientation.heading,
      pitch = orientation.pitch;
  var center,
      range = 1.0;

  if (x > 180 || x < -180 || y > 180 || y < -180) {
    center = new Cesium.Cartesian3(x, y, z);
  } else {
    center = new Cesium.Cartesian3.fromDegrees(x, y, z);
  }

  webGlobe.viewer.camera.flyToEx({
    target: center,
    offset: new Cesium.HeadingPitchRange(heading, pitch, range)
  });
}
function dirname(path) {
  if (typeof path !== "string") path = path + "";
  if (path.length === 0) return ".";
  var code = path.charCodeAt(0);
  var hasRoot = code === 47;
  /* / */

  var end = -1;
  var matchedSlash = true;

  for (var i = path.length - 1; i >= 1; --i) {
    code = path.charCodeAt(i);

    if (code === 47
    /* / */
    ) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
      // We saw the first non-path separator
      matchedSlash = false;
    }
  }

  if (end === -1) return hasRoot ? "/" : ".";

  if (hasRoot && end === 1) {
    // return '//';
    // Backwards-compat fix:
    return "/";
  }

  return path.slice(0, end);
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.reflect.construct.js
var es6_reflect_construct = __webpack_require__("2397");

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/inherits.js

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/typeof.js
var helpers_typeof = __webpack_require__("7037");
var typeof_default = /*#__PURE__*/__webpack_require__.n(helpers_typeof);

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js


function _possibleConstructorReturn(self, call) {
  if (call && (typeof_default()(call) === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.find.js
var es6_array_find = __webpack_require__("7514");

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/createClass.js
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
// CONCATENATED MODULE: ./src/components/WebGlobe/manager.js













function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function manager_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function manager_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { manager_ownKeys(Object(source), true).forEach(function (key) { Object(defineProperty["a" /* default */])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { manager_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function initManager() {
  window.CesiumZondy = window.CesiumZondy || {};
  window.CesiumZondy.TerrainManager = window.CesiumZondy.TerrainManager || {
    default: []
  };
  window.CesiumZondy.LabelManager = window.CesiumZondy.LabelManager || {
    default: []
  };
  window.CesiumZondy.M3DFileManager = window.CesiumZondy.M3DFileManager || {
    default: []
  };
  window.CesiumZondy.GlobesManager = window.CesiumZondy.GlobesManager || new manager_BaseManager();
  window.CesiumZondy.Tileset3DManager = window.CesiumZondy.Tileset3DManager || new manager_BaseManager();
  window.CesiumZondy.EntityManager = window.CesiumZondy.EntityManager || new manager_EntityManager();
  window.CesiumZondy.GeojsonManager = window.CesiumZondy.GeojsonManager || new manager_GeojsonManager();
  window.CesiumZondy.PopupManager = window.CesiumZondy.PopupManager || new manager_PopupManager();
  window.CesiumZondy.OGCWMTSManager = window.CesiumZondy.OGCWMTSManager || new manager_OGCWMTSManager();
  window.CesiumZondy.FloodAnalyseManager = window.CesiumZondy.FloodAnalyseManager || new manager_FloodAnalyseManager();
  window.CesiumZondy.OGCWMSManager = window.CesiumZondy.OGCWMSManager || new manager_OGCWMSManager();
  window.CesiumZondy.DragEditManager = window.CesiumZondy.DragEditManager || new manager_DragEditManager();
  window.CesiumZondy.VectorTileManager = window.CesiumZondy.VectorTileManager || new manager_VectorTileManager();
  window.CesiumZondy.AdvancedAnalysisManager = window.CesiumZondy.AdvancedAnalysisManager || new manager_AdvancedAnalysisManager();
  window.CesiumZondy.DrawToolManager = window.CesiumZondy.DrawToolManager || new manager_DrawToolManager();
  window.CesiumZondy.MeasureToolManager = window.CesiumZondy.MeasureToolManager || new manager_MeasureToolManager();
  window.CesiumZondy.EventHandlerManager = window.CesiumZondy.EventHandlerManager || new manager_EventHandlerManager();
  window.CesiumZondy.IgsTerrainManager = window.CesiumZondy.IgsTerrainManager || new manager_EventHandlerManager();
  window.CesiumZondy.M3DIgsManager = window.CesiumZondy.M3DIgsManager || new manager_EventHandlerManager();
  window.CesiumZondy.ArcgisManager = window.CesiumZondy.ArcgisManager || new manager_EventHandlerManager();
  window.CesiumZondy.IgsDocLayerManager = window.CesiumZondy.IgsDocLayerManager || new manager_IgsDocLayerManager();
  window.CesiumZondy.IgsTilecLayerManager = window.CesiumZondy.IgsTilecLayerManager || new manager_IgsTilecLayerManager();
  window.CesiumZondy.IgsserverManager = window.CesiumZondy.IgsserverManager || new manager_EventHandlerManager();
  window.CesiumZondy.ExcavateAnalysisManager = window.CesiumZondy.ExcavateAnalysisManager || new manager_ExcavateAnalysisManager(); //在window.CesiumZondy下添加取得WebGlobe对象的方法

  window.CesiumZondy.getWebGlobe = function (vueKey) {
    if (!vueKey) {
      vueKey = "default";
    }

    var GlobesManager = window.CesiumZondy.GlobesManager,
        webGlobeObj;
    webGlobeObj = GlobesManager[vueKey][0].source;
    return webGlobeObj;
  };
  /**
   * 通过轮询的方式取得webGlobeObj
   * @param callback 回调函数
   * @param vueKey vueKey，唯一标识webscene组件
   * */


  window.CesiumZondy.getWebGlobeByInterval = function (callback, vueKey) {
    if (!vueKey) {
      vueKey = "default";
    }

    var GlobesManager = window.CesiumZondy.GlobesManager,
        webGlobeObj;
    var interval = setInterval(function () {
      if (GlobesManager.hasOwnProperty(vueKey) && GlobesManager[vueKey].length > 0) {
        clearInterval(interval);
        webGlobeObj = GlobesManager[vueKey][0].source;
        callback(webGlobeObj);
      }
    }, 50);
  };
}
var manager_BaseManager = /*#__PURE__*/function () {
  function BaseManager(vueKey) {
    _classCallCheck(this, BaseManager);

    this.default = [];
    this.vueKey = vueKey || "default";
  }

  _createClass(BaseManager, [{
    key: "addSource",
    value: function addSource(vueKey, vueIndex, source, options) {
      vueKey = vueKey ? vueKey : this.vueKey;
      vueIndex = vueIndex ? vueIndex : this.vueIndex;
      vueIndex = "".concat(vueIndex);

      if (!this[vueKey]) {
        this[vueKey] = [];
      }

      this[vueKey].push({
        parent: vueKey,
        key: vueIndex,
        source: source,
        options: options
      });
    }
  }, {
    key: "deleteSource",
    value: function deleteSource(vueKey, vueIndex) {
      var index = -1;
      vueIndex = "".concat(vueIndex);

      if (this[vueKey] instanceof Array) {
        this[vueKey].find(function (s, i) {
          var result = false;

          if (s && s.key === vueIndex) {
            index = i;
            result = true;
          }

          return result;
        });

        if (index >= 0) {
          this[vueKey].splice(index, 1);
        }
      }
    }
  }, {
    key: "findSource",
    value: function findSource(vueKey, vueIndex) {
      vueKey = vueKey ? vueKey : this.vueKey;
      vueIndex = vueIndex ? vueIndex : this.vueIndex;
      vueIndex = "".concat(vueIndex);
      var index = -1;
      var findSource = undefined;
      if (!this[vueKey]) return findSource;
      var find = this[vueKey].find(function (s, i) {
        var result = false;

        if (s && s.key === vueIndex) {
          index = i;
          result = true;
        }

        return result;
      });

      if (find) {
        findSource = manager_objectSpread(manager_objectSpread({}, find), {}, {
          index: index
        });
      }

      return findSource;
    }
  }, {
    key: "findAllSource",
    value: function findAllSource(vueKey) {
      vueKey = vueKey ? vueKey : this.vueKey;
      return this[vueKey];
    }
  }, {
    key: "flatAllSource",
    value: function flatAllSource() {
      var _this = this;

      var flat = [];
      Object.keys(this).forEach(function (k) {
        if (k !== "vueKey") {
          flat = flat.concat(_this[k]);
        }
      });
      return flat;
    }
  }]);

  return BaseManager;
}();
var manager_RasterManager = /*#__PURE__*/function (_BaseManager) {
  _inherits(RasterManager, _BaseManager);

  var _super = _createSuper(RasterManager);

  function RasterManager() {
    _classCallCheck(this, RasterManager);

    return _super.apply(this, arguments);
  }

  return RasterManager;
}(manager_BaseManager);
var manager_GeojsonManager = /*#__PURE__*/function (_BaseManager2) {
  _inherits(GeojsonManager, _BaseManager2);

  var _super2 = _createSuper(GeojsonManager);

  function GeojsonManager() {
    _classCallCheck(this, GeojsonManager);

    return _super2.apply(this, arguments);
  }

  return GeojsonManager;
}(manager_BaseManager);
var manager_EntityManager = /*#__PURE__*/function (_BaseManager3) {
  _inherits(EntityManager, _BaseManager3);

  var _super3 = _createSuper(EntityManager);

  function EntityManager() {
    _classCallCheck(this, EntityManager);

    return _super3.apply(this, arguments);
  }

  return EntityManager;
}(manager_BaseManager);
var manager_DragEditManager = /*#__PURE__*/function (_BaseManager4) {
  _inherits(DragEditManager, _BaseManager4);

  var _super4 = _createSuper(DragEditManager);

  function DragEditManager() {
    _classCallCheck(this, DragEditManager);

    return _super4.apply(this, arguments);
  }

  return DragEditManager;
}(manager_BaseManager);
var manager_PopupManager = /*#__PURE__*/function (_BaseManager5) {
  _inherits(PopupManager, _BaseManager5);

  var _super5 = _createSuper(PopupManager);

  function PopupManager() {
    _classCallCheck(this, PopupManager);

    return _super5.apply(this, arguments);
  }

  return PopupManager;
}(manager_BaseManager);
var manager_OGCWMTSManager = /*#__PURE__*/function (_BaseManager6) {
  _inherits(OGCWMTSManager, _BaseManager6);

  var _super6 = _createSuper(OGCWMTSManager);

  function OGCWMTSManager() {
    _classCallCheck(this, OGCWMTSManager);

    return _super6.apply(this, arguments);
  }

  return OGCWMTSManager;
}(manager_BaseManager);
var manager_OGCWMSManager = /*#__PURE__*/function (_BaseManager7) {
  _inherits(OGCWMSManager, _BaseManager7);

  var _super7 = _createSuper(OGCWMSManager);

  function OGCWMSManager() {
    _classCallCheck(this, OGCWMSManager);

    return _super7.apply(this, arguments);
  }

  return OGCWMSManager;
}(manager_BaseManager);
var manager_VectorTileManager = /*#__PURE__*/function (_BaseManager8) {
  _inherits(VectorTileManager, _BaseManager8);

  var _super8 = _createSuper(VectorTileManager);

  function VectorTileManager() {
    _classCallCheck(this, VectorTileManager);

    return _super8.apply(this, arguments);
  }

  return VectorTileManager;
}(manager_BaseManager);
var manager_AdvancedAnalysisManager = /*#__PURE__*/function (_BaseManager9) {
  _inherits(AdvancedAnalysisManager, _BaseManager9);

  var _super9 = _createSuper(AdvancedAnalysisManager);

  function AdvancedAnalysisManager() {
    _classCallCheck(this, AdvancedAnalysisManager);

    return _super9.apply(this, arguments);
  }

  return AdvancedAnalysisManager;
}(manager_BaseManager);
var manager_DrawToolManager = /*#__PURE__*/function (_BaseManager10) {
  _inherits(DrawToolManager, _BaseManager10);

  var _super10 = _createSuper(DrawToolManager);

  function DrawToolManager() {
    _classCallCheck(this, DrawToolManager);

    return _super10.apply(this, arguments);
  }

  return DrawToolManager;
}(manager_BaseManager);
var manager_MeasureToolManager = /*#__PURE__*/function (_BaseManager11) {
  _inherits(MeasureToolManager, _BaseManager11);

  var _super11 = _createSuper(MeasureToolManager);

  function MeasureToolManager() {
    _classCallCheck(this, MeasureToolManager);

    return _super11.apply(this, arguments);
  }

  return MeasureToolManager;
}(manager_BaseManager);
var manager_EventHandlerManager = /*#__PURE__*/function (_BaseManager12) {
  _inherits(EventHandlerManager, _BaseManager12);

  var _super12 = _createSuper(EventHandlerManager);

  function EventHandlerManager() {
    _classCallCheck(this, EventHandlerManager);

    return _super12.apply(this, arguments);
  }

  return EventHandlerManager;
}(manager_BaseManager);
var manager_IgsTerrainManager = /*#__PURE__*/function (_BaseManager13) {
  _inherits(IgsTerrainManager, _BaseManager13);

  var _super13 = _createSuper(IgsTerrainManager);

  function IgsTerrainManager() {
    _classCallCheck(this, IgsTerrainManager);

    return _super13.apply(this, arguments);
  }

  return IgsTerrainManager;
}(manager_BaseManager);
var manager_M3DIgsManager = /*#__PURE__*/function (_BaseManager14) {
  _inherits(M3DIgsManager, _BaseManager14);

  var _super14 = _createSuper(M3DIgsManager);

  function M3DIgsManager() {
    _classCallCheck(this, M3DIgsManager);

    return _super14.apply(this, arguments);
  }

  return M3DIgsManager;
}(manager_BaseManager);
var manager_ArcgisManager = /*#__PURE__*/function (_BaseManager15) {
  _inherits(ArcgisManager, _BaseManager15);

  var _super15 = _createSuper(ArcgisManager);

  function ArcgisManager() {
    _classCallCheck(this, ArcgisManager);

    return _super15.apply(this, arguments);
  }

  return ArcgisManager;
}(manager_BaseManager);
var manager_IgsDocLayerManager = /*#__PURE__*/function (_BaseManager16) {
  _inherits(IgsDocLayerManager, _BaseManager16);

  var _super16 = _createSuper(IgsDocLayerManager);

  function IgsDocLayerManager() {
    _classCallCheck(this, IgsDocLayerManager);

    return _super16.apply(this, arguments);
  }

  return IgsDocLayerManager;
}(manager_BaseManager);
var manager_IgsTilecLayerManager = /*#__PURE__*/function (_BaseManager17) {
  _inherits(IgsTilecLayerManager, _BaseManager17);

  var _super17 = _createSuper(IgsTilecLayerManager);

  function IgsTilecLayerManager() {
    _classCallCheck(this, IgsTilecLayerManager);

    return _super17.apply(this, arguments);
  }

  return IgsTilecLayerManager;
}(manager_BaseManager);
var manager_IgsserverManager = /*#__PURE__*/function (_BaseManager18) {
  _inherits(IgsserverManager, _BaseManager18);

  var _super18 = _createSuper(IgsserverManager);

  function IgsserverManager() {
    _classCallCheck(this, IgsserverManager);

    return _super18.apply(this, arguments);
  }

  return IgsserverManager;
}(manager_BaseManager);
var manager_ExcavateAnalysisManager = /*#__PURE__*/function (_BaseManager19) {
  _inherits(ExcavateAnalysisManager, _BaseManager19);

  var _super19 = _createSuper(ExcavateAnalysisManager);

  function ExcavateAnalysisManager() {
    _classCallCheck(this, ExcavateAnalysisManager);

    return _super19.apply(this, arguments);
  }

  return ExcavateAnalysisManager;
}(manager_BaseManager);
var manager_FloodAnalyseManager = /*#__PURE__*/function (_BaseManager20) {
  _inherits(FloodAnalyseManager, _BaseManager20);

  var _super20 = _createSuper(FloodAnalyseManager);

  function FloodAnalyseManager() {
    _classCallCheck(this, FloodAnalyseManager);

    return _super20.apply(this, arguments);
  }

  return FloodAnalyseManager;
}(manager_BaseManager);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.split.js
var es6_regexp_split = __webpack_require__("28a5");

// CONCATENATED MODULE: ./src/components/WebGlobe/options.js


/* harmony default export */ var WebGlobe_options = ({
  /**
   * @type String
   * @description 该key的主要作用市用来记录Cesium的Source,primitive,
   * entity的内存中的引用数组的引用，从而避免vue对cesium的内存劫持
   */
  vueKey: {
    typs: String,
    default: "default"
  },

  /**
   * @type String
   * @description 该key的主要作用市用来记录Cesium的Source,primitive,
   * entity的内存中的引用数组的下标，从而避免vue对cesium的内存劫持
   */
  vueIndex: {
    typs: [String, Number],
    default: function _default() {
      return (Math.random() * 1000000).toFixed(0);
    }
  },
  container: {
    type: [String, HTMLElement],
    default: function _default() {
      return "cesium-".concat(("" + Math.random()).split(".")[1]);
    }
  },
  keyEventEnable: {
    type: Boolean,
    default: true
  },

  /**
   * @description 初始视图模式默认为三维球视图 '2D'表示二维视图 'COLUMBUS_VIEW' 表示三维平面视图
   */
  viewerMode: {
    type: String,
    default: "3D"
  },

  /**
   * @description 是否显示默认的属性信息框
   */
  showInfo: {
    type: Boolean,
    default: false
  },

  /**
   * @description 默认动画控制不显示
   */
  animation: {
    type: Boolean,
    default: false
  },

  /**
   * @description 默认时间轴控制不显示
   */
  timeline: {
    type: Boolean,
    default: false
  },

  /**
   * @description 默认图层选择器不显示
   */
  baseLayerPicker: {
    type: Boolean,
    default: false
  },

  /**
   * @description 默认全屏控件不显示
   */
  fullscreenButton: {
    type: Boolean,
    default: false
  },

  /**
   * @description 默认VR控件不显示
   */
  vrButton: {
    type: Boolean,
    default: false
  },
  contextOptions: {
    type: Object,
    default: function _default() {
      return {
        webgl: {
          preserveDrawingBuffer: true
        }
      };
    }
  },
  cameraView: {
    type: Object,
    default: function _default() {
      return {
        /* destination: {
          x: -5087907.392038159,
          y: 14207074.175879652,
          z: 3655215.2541255946
        },
        orientation: {
          heading: 6.1827568973283045,
          pitch: -1.2409374391413084,
          roll: 0.0003114284469649675
        } */
      };
    }
  }
});
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/WebGlobe/WebGlobe.vue?vue&type=script&lang=js&









function WebGlobevue_type_script_lang_js_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function WebGlobevue_type_script_lang_js_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { WebGlobevue_type_script_lang_js_ownKeys(Object(source), true).forEach(function (key) { Object(defineProperty["a" /* default */])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { WebGlobevue_type_script_lang_js_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

//
//
//
//
//
//
//







/* harmony default export */ var WebGlobevue_type_script_lang_js_ = ({
  name: "mapgis-web-scene",
  mixins: [withEvents, withPrivateMethods["a" /* default */]],
  props: WebGlobevue_type_script_lang_js_objectSpread({
    libPath: {
      type: String
    },
    pluginPath: {
      type: String
    },
    height: {
      type: Number
    }
  }, WebGlobe_options),
  provide: function provide() {
    var self = this;
    return {
      get Cesium() {
        return self.Cesium;
      },

      get CesiumZondy() {
        return self.CesiumZondy;
      },

      get webGlobe() {
        return self.webGlobe;
      }

    };
  },
  data: function data() {
    return {
      initialized: false
    };
  },
  watch: {
    height: {
      handler: function handler() {
        //解决分屏时，cesium无限拉长的问题，要给一个固定高度
        var vm = this;
        window.CesiumZondy.getWebGlobeByInterval(function (webGlobe) {
          vm.$nextTick(function () {
            webGlobe.viewer.container.style.height = this.height + "px";
          });
        }, this.vueKey);
      }
    }
  },
  methods: {
    loadScript: function () {
      var _loadScript = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.$_loadScript();

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function loadScript() {
        return _loadScript.apply(this, arguments);
      }

      return loadScript;
    }(),
    flyTo: function flyTo(globeView) {
      util_flyTo(globeView, this.webGlobe);
    },
    flyToEx: function flyToEx(globeView) {
      util_flyToEx(globeView, this.webGlobe);
    }
  },
  created: function created() {
    initManager();
    this.webGlobe = null;
    this.propsIsUpdating = {};
    window.webGlobe = window.webGlobe || null;
    /*     const eventNames = Object.keys(mapEvents);
    this.$_bindMapEvents(eventNames);
    this.$_registerAsyncActions(map);
    this.$_bindPropsUpdateEvents(); */

    this.initialized = false; // const cesiumLib = import("@mapgis/cesium");
    // Cesium.buildModuleUrl.setBaseUrl('./cesium/');

    /* console.log("cesium created", this.cesium);
    this.cesiumPromise = this.cesium
      ? Promise.resolve(this.cesium)
      : this.loadScript(); */
  },
  mounted: function mounted() {
    var _this = this;

    var vueKey = this.vueKey,
        vueIndex = this.vueIndex;
    var cameraView = this.cameraView;
    this.$_loadScript().then(function (Cesium) {
      _this.Cesium = Cesium;
      _this.CesiumZondy = window.CesiumZondy;
      var container = _this.$refs.container;
      var webGlobe = new Cesium.WebSceneControl(container, WebGlobevue_type_script_lang_js_objectSpread({}, _this._props)); //解决分屏时，cesium无限拉长的问题，要给一个固定高度

      if (_this.height) {
        _this.$nextTick(function () {
          webGlobe.viewer.container.style.height = this.height + "px";
        });
      }

      _this.webGlobe = webGlobe;
      webGlobe.vueKey = vueKey;

      if (cameraView) {
        webGlobe.viewer.scene.camera.setView(cameraView);
      }

      window.CesiumZondy.GlobesManager.addSource(vueKey, vueIndex, webGlobe, {
        ScreenSpaceEventHandler: undefined
      });
      window.webGlobe = window.webGlobe || webGlobe; // window.webGlobe = webGlobe;

      /*     const eventNames = Object.keys(mapEvents);
      this.$_bindMapEvents(eventNames);
      this.$_registerAsyncActions(map);
      this.$_bindPropsUpdateEvents(); */

      _this.initialized = true; // 这里禁止吧cesium示例化后的webGlobe传上去，此处会发生vue劫持操作，导致内存溢出

      _this.$emit("load", {
        component: _this,
        Cesium: Cesium,
        CesiumZondy: window.CesiumZondy
      });

      if (_this.container) {
        var dom = document.getElementById(_this.container);

        if (dom) {
          dom.style.height = "100%";
        }
      }
    });
  },
  beforeDestroy: function beforeDestroy() {
    var _this2 = this;

    this.$nextTick(function () {
      if (_this2.webGlobe) {
        var vueKey = _this2.vueKey,
            vueIndex = _this2.vueIndex;
        window.CesiumZondy.GlobesManager.deleteSource(vueKey, vueIndex);

        _this2.webGlobe.viewer.scene.primitives.removeAll();

        _this2.webGlobe.viewer.scene.primitives.destroy();

        _this2.webGlobe.viewer.entities.removeAll();

        _this2.webGlobe.viewer.destroy(); // this.webGlobe = null;
        // this.viewer = null;


        _this2.initialized = false;
      }
    });
  }
});
// CONCATENATED MODULE: ./src/components/WebGlobe/WebGlobe.vue?vue&type=script&lang=js&
 /* harmony default export */ var WebGlobe_WebGlobevue_type_script_lang_js_ = (WebGlobevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/WebGlobe/WebGlobe.vue?vue&type=style&index=0&lang=css&
var WebGlobevue_type_style_index_0_lang_css_ = __webpack_require__("5680");

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./src/components/WebGlobe/WebGlobe.vue






/* normalize component */

var component = normalizeComponent(
  WebGlobe_WebGlobevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var WebGlobe = (component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4746d4ad-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/UI/Controls/State/StateControl.vue?vue&type=template&id=794f2bd8&
var StateControlvue_type_template_id_794f2bd8_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"mapgis-web-scene-statebar"},[_c('span',[_vm._v("\n    经度:"+_vm._s(_vm.longitude)+"°，纬度:"+_vm._s(_vm.latitude)+"°， 海拔高度:"+_vm._s(_vm.height)+"米，相机视角高度:"+_vm._s(_vm.cameraHeight)+"米\n  ")]),(_vm.showHpr)?_c('span'):_vm._e(),(_vm.showSelectTileInfo)?_c('span'):_vm._e(),(_vm.showViewLevelInfo)?_c('span'):_vm._e()])}
var StateControlvue_type_template_id_794f2bd8_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/UI/Controls/State/StateControl.vue?vue&type=template&id=794f2bd8&

// CONCATENATED MODULE: ./src/components/Base/Vue/VueOptions.js

/* harmony default export */ var VueOptions = ({
  /**
   * @type String
   * @description 该key的主要作用是用来记录Cesium的WebGlobal的
   * 内存中的引用数组的引用，从而避免vue对cesium的内存劫持
   */
  vueKey: {
    typs: String,
    default: "default"
  },

  /**
   * @type String
   * @description 该key的主要作用是用来记录Cesium的Source,primitive,
   * entity的内存中的引用数组的下标，从而避免vue对cesium的内存劫持
   */
  vueIndex: {
    typs: [String, Number],
    default: function _default() {
      return (Math.random() * 100000000).toFixed(0);
    }
  }
});
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/UI/Controls/State/StateControl.vue?vue&type=script&lang=js&






function StateControlvue_type_script_lang_js_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function StateControlvue_type_script_lang_js_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { StateControlvue_type_script_lang_js_ownKeys(Object(source), true).forEach(function (key) { Object(defineProperty["a" /* default */])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { StateControlvue_type_script_lang_js_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var StateControlvue_type_script_lang_js_ = ({
  name: "mapgis-3d-statebar",
  mixins: [],
  inject: ["Cesium", "webGlobe"],
  props: StateControlvue_type_script_lang_js_objectSpread(StateControlvue_type_script_lang_js_objectSpread({}, VueOptions), {}, {
    showHpr: {
      type: Boolean,
      default: false
    },
    showSelectTileInfo: {
      type: Boolean,
      default: false
    },
    showViewLevelInfo: {
      type: Boolean,
      default: false
    }
  }),
  computed: {},
  data: function data() {
    return {
      initial: true,
      control: undefined,
      viewLevel: 0,
      longitude: 0,
      latitude: 0,
      cameraHeight: 0,
      height: 0,
      selectedTile: undefined
    };
  },
  created: function created() {},
  mounted: function mounted() {
    this.mount();
  },
  destroyed: function destroyed() {
    this.unmount();
  },
  methods: {
    mount: function mount() {
      this.showPosition();
    },
    unmount: function unmount() {
      var webGlobe = this.webGlobe,
          vueKey = this.vueKey,
          vueIndex = this.vueIndex;
      var find = window.CesiumZondy.EventHandlerManager.findSource(vueKey, vueIndex);

      if (find) {
        find.source.destroy && find.source.destroy();
      }

      window.CesiumZondy.EventHandlerManager.deleteSource(vueKey, vueIndex);
    },
    showPosition: function showPosition() {
      var vm = this;
      var Cesium = this.Cesium,
          webGlobe = this.webGlobe,
          vueIndex = this.vueIndex,
          vueKey = this.vueKey;
      var viewer = webGlobe.viewer;

      if (vueKey && vueIndex) {
        var screenSpaceMouseEventHandler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
        screenSpaceMouseEventHandler.setInputAction(function (movement) {
          // vm.updateViewLevel();
          // vm.selectTile(movement.endPosition);
          // vm.selectedTile = vm.selectTile(movement.endPosition);
          vm.updateShowInfo(movement.endPosition);
          lastScreenPos = movement.endPosition;
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
        screenSpaceMouseEventHandler.setInputAction(function () {
          // vm.updateViewLevel();
          // vm.selectTile(lastScreenPos);
          // vm.selectedTile = vm.selectTile(lastScreenPos);
          vm.updateShowInfo(lastScreenPos);
        }, Cesium.ScreenSpaceEventType.WHEEL);
        window.CesiumZondy.EventHandlerManager.addSource(vueKey, vueIndex, screenSpaceMouseEventHandler);
      }

      var lastScreenPos;
      viewer.scene.globe.tileLoadProgressEvent.addEventListener(function () {
        vm.updateViewLevel();
      });
      viewer.camera.changed.addEventListener(function () {
        vm.updateViewLevel();
      });
    },
    selectTile: function selectTile(e) {
      var Cesium = this.Cesium,
          webGlobe = this.webGlobe;
      var selectedTileTmp;
      var viewer = webGlobe.viewer;
      var ellipsoid = viewer.scene.globe.ellipsoid;
      var cartesian = viewer.scene.camera.pickEllipsoid(e, ellipsoid);

      if (Cesium.defined(cartesian)) {
        var cartographic = ellipsoid.cartesianToCartographic(cartesian);
        var tilesRendered = viewer.scene.globe._surface.tileProvider._tilesToRenderByTextureCount;

        for (var textureCount = 0; !selectedTileTmp && textureCount < tilesRendered.length; textureCount += 1) {
          var tilesRenderedByTextureCount = tilesRendered[textureCount];

          if (Cesium.defined(tilesRenderedByTextureCount)) {
            for (var tileIndex = 0; !selectedTileTmp && tileIndex < tilesRenderedByTextureCount.length; tileIndex += 1) {
              var tile = tilesRenderedByTextureCount[tileIndex];

              if (Cesium.Rectangle.contains(tile.rectangle, cartographic)) {
                selectedTileTmp = tile;
              }
            }
          }
        }
      }

      return selectedTileTmp;
    },
    updateViewLevel: function updateViewLevel() {
      var Cesium = this.Cesium,
          webGlobe = this.webGlobe;
      var viewer = webGlobe.viewer;
      var tilesToRender = viewer.scene.globe._surface.tileProvider._tilesToRenderByTextureCount;

      for (var i = 0; i < tilesToRender.length; i += 1) {
        if (tilesToRender[i]) {
          for (var tileIndex = 0; tileIndex < tilesToRender[i].length; tileIndex += 1) {
            if (Cesium.Rectangle.contains(tilesToRender[i][tileIndex].rectangle, viewer.camera.positionCartographic)) {
              this.viewLevel = tilesToRender[i][tileIndex]._level;
            }
          }
        }
      }
    },
    updateShowInfo: function updateShowInfo(screenPos) {
      var viewLevel = this.viewLevel,
          height = this.height,
          Cesium = this.Cesium,
          webGlobe = this.webGlobe,
          showHpr = this.showHpr,
          showSelectTileInfo = this.showSelectTileInfo,
          showViewLevelInfo = this.showViewLevelInfo;
      var vm = this;
      var viewer = webGlobe.viewer;
      var cartesian = viewer.getCartesian3Position(screenPos, cartesian);
      var ellipsoid = viewer.scene.globe.ellipsoid;
      var camera = viewer.camera;
      var longlatHeight = "";

      if (cartesian) {
        var cartographic = ellipsoid.cartesianToCartographic(cartesian);
        this.longitude = Cesium.Math.toDegrees(cartographic.longitude).toFixed(4);
        this.latitude = Cesium.Math.toDegrees(cartographic.latitude).toFixed(4);
        this.cameraHeight = Math.ceil(camera.positionCartographic.height).toFixed(0);
        this.height = Math.max(viewer.scene.globe.getHeight(cartographic), cartographic.height).toFixed(0);
      }
      /* let strHpr = "";
      if (showHpr) {
        strHpr = ` heading：${Cesium.Math.toDegrees(camera.heading).toFixed(
          1
        )} pitch：${Cesium.Math.toDegrees(camera.pitch).toFixed(
          1
        )} roll：${Cesium.Math.toDegrees(camera.roll).toFixed(1)}`;
      }
      let selectTileInfo = "";
      if (showSelectTileInfo && selectedTile) {
        selectTileInfo = `，瓦片X:${selectedTile.x}，瓦片Y:${selectedTile.y}，瓦片级别:${selectedTile.level}，`;
      }
      if (height === undefined || height < -7000) {
        height = 0;
      }
      let level = "";
      if (showViewLevelInfo) {
        level = `当前地图级别:${viewLevel}`;
      }
      const iHtml = longlatHeight + strHpr + selectTileInfo + level;
      document.getElementById(elementId).innerHTML = iHtml; */

    }
  }
});
// CONCATENATED MODULE: ./src/components/UI/Controls/State/StateControl.vue?vue&type=script&lang=js&
 /* harmony default export */ var State_StateControlvue_type_script_lang_js_ = (StateControlvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/UI/Controls/State/StateControl.vue?vue&type=style&index=0&lang=css&
var StateControlvue_type_style_index_0_lang_css_ = __webpack_require__("ce105");

// CONCATENATED MODULE: ./src/components/UI/Controls/State/StateControl.vue






/* normalize component */

var StateControl_component = normalizeComponent(
  State_StateControlvue_type_script_lang_js_,
  StateControlvue_type_template_id_794f2bd8_render,
  StateControlvue_type_template_id_794f2bd8_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var StateControl = (StateControl_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4746d4ad-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/UI/Controls/Link/Link.vue?vue&type=template&id=11785fba&
var Linkvue_type_template_id_11785fba_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span')}
var Linkvue_type_template_id_11785fba_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/UI/Controls/Link/Link.vue?vue&type=template&id=11785fba&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es7.array.includes.js
var es7_array_includes = __webpack_require__("6762");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.string.includes.js
var es6_string_includes = __webpack_require__("2fdb");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.to-string.js
var es6_regexp_to_string = __webpack_require__("6b54");

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/typeof.js
function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}
// CONCATENATED MODULE: ./src/components/Utils/deepequal.js






/**
 * @description 两个对象深比较
 */
function deepEqual(a, b) {
  if (Array.isArray(a)) {
    if (!Array.isArray(b) || a.length !== b.length) {
      return false;
    }

    for (var i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i])) {
        return false;
      }
    }

    return true;
  }

  if (_typeof(a) === "object" && a !== null && b !== null) {
    if (!(_typeof(b) === "object")) {
      return false;
    }

    var keys = Object.keys(a);

    if (keys.length !== Object.keys(b).length) {
      return false;
    }

    for (var key in a) {
      if (!deepEqual(a[key], b[key])) {
        return false;
      }
    }

    return true;
  }

  return a === b;
}

function getType(obj) {
  if (Object.prototype.toString.call(obj) === "[object Object]") {
    return "Object";
  } else if (Object.prototype.toString.call(obj) === "[object Array]") {
    return "Array";
  } else {
    return "nomal";
  }
}

function deepCopy(obj) {
  if (getType(obj) === "nomal") {
    return obj;
  } else {
    // tslint:disable-next-line: prefer-const
    var newObj = getType(obj) === "Object" ? {} : [];

    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        newObj[key] = deepCopy(obj[key]);
      }
    }

    return newObj;
  }
}
/* harmony default export */ var deepequal = (deepEqual);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/UI/Controls/Link/Link.vue?vue&type=script&lang=js&




//
//
//
//

/* harmony default export */ var Linkvue_type_script_lang_js_ = ({
  name: "mapgis-3d-link",
  inject: ["Cesium", "CesiumZondy", "webGlobe"],
  props: {
    enable: {
      type: Boolean,
      default: false
    },
    includes: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    excludes: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    vueKey: {
      type: String,
      default: "default"
    },
    vueIndex: {
      type: Number,
      default: function _default() {
        return Number((Math.random() * 100000000).toFixed(0));
      }
    },
    interval: {
      type: Number,
      default: 60
    }
  },
  model: {
    prop: "view",
    event: "change"
  },
  data: function data() {
    return {
      time: 0
    };
  },
  watch: {
    enable: function enable(news) {
      if (news) {
        this.addHandler();
      } else {
        this.deleteHandler();
      }
    }
  },
  mounted: function mounted() {
    if (this.enable) {
      this.addHandler();
    }
  },
  destroyed: function destroyed() {
    this.deleteHandler();
  },
  methods: {
    getInstanceOptions: function getInstanceOptions() {
      var instanceOptions;
      var vueKey = this.vueKey,
          CesiumZondy = this.CesiumZondy;
      CesiumZondy = CesiumZondy || window.CesiumZondy;

      if (vueKey !== "default") {
        instanceOptions = CesiumZondy.GlobesManager[vueKey][0].options;
      }

      return instanceOptions;
    },
    checkValid: function checkValid(viewer, camera, parent) {
      var includes = this.includes,
          excludes = this.excludes;

      if (includes.length === 0 && excludes.length === 0) {
        this.setView(viewer, camera);
      } else if (includes && excludes && includes.length > 0 && excludes.length >= 0 && includes.indexOf(parent) >= 0) {
        this.setView(viewer, camera);
      } else if (includes && excludes && includes.length === 0 && excludes.length > 0 && excludes.indexOf(parent) < 0) {
        this.setView(viewer, camera);
      }
    },
    updateView: function updateView(camera) {
      var interval = this.interval; // 一秒60帧，每秒更新一次，减少无效更新

      if (++this.time % interval === 0) {
        var view3d = {
          destination: deepCopy(camera.position),
          orientation: {
            direction: deepCopy(camera._direction),
            up: deepCopy(camera.up),
            heading: deepCopy(camera.heading),
            pitch: deepCopy(camera.pitch),
            roll: deepCopy(camera.roll)
          }
        };
        var rect = camera.computeViewRectangle();
        var rect2d = {
          west: 0,
          east: 0,
          north: 0,
          south: 0
        };
        rect2d.west = Cesium.Math.toDegrees(rect.west);
        rect2d.east = Cesium.Math.toDegrees(rect.east);
        rect2d.north = Cesium.Math.toDegrees(rect.north);
        rect2d.south = Cesium.Math.toDegrees(rect.south);
        this.$emit("change", {
          "3d": view3d,
          "2d": rect2d
        });
      }

      if (this.time > 1000000) this.time = 0;
    },
    setView: function setView(viewer, camera) {
      var view3d = {
        destination: deepCopy(camera.position),
        orientation: {
          direction: deepCopy(camera._direction),
          up: deepCopy(camera.up),
          heading: deepCopy(camera.heading),
          pitch: deepCopy(camera.pitch),
          roll: deepCopy(camera.roll)
        }
      };
      viewer.camera.setView(view3d);
    },
    addHandler: function addHandler() {
      var CesiumZondy = this.CesiumZondy,
          includes = this.includes,
          excludes = this.excludes;
      CesiumZondy = CesiumZondy || window.CesiumZondy;
      var sources = CesiumZondy.GlobesManager.flatAllSource();
      var vm = this;

      var _loop = function _loop(i) {
        var s = sources[i];

        if (includes && includes.length > 0 && includes.indexOf(s.parent) < 0) {
          return "continue";
        }

        if ((!includes || includes.length == 0) && excludes && excludes.length > 0 && excludes.indexOf(s.parent) >= 0) {
          return "continue";
        }

        s.options.ScreenSpaceEventHandler = new Cesium.ScreenSpaceEventHandler(s.source.viewer.scene.canvas);
        s.options.ScreenSpaceEventHandler.setInputAction(function (movement) {
          vm.updateView(s.source.viewer.camera);
          var _camerca = s.source.viewer.camera;
          sources.forEach(function (other, j) {
            if (i != j) {
              vm.checkValid(other.source.viewer, _camerca, other.parent);
            }
          });
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
        s.options.ScreenSpaceEventHandler.setInputAction(function (movement) {
          vm.updateView(s.source.viewer.camera);
          var _camerca = s.source.viewer.camera;
          sources.forEach(function (other, j) {
            if (i != j) {
              vm.checkValid(other.source.viewer, _camerca, other.parent);
            }
          });
        }, Cesium.ScreenSpaceEventType.WHEEL);
      };

      for (var i = 0; i < sources.length; i++) {
        var _ret = _loop(i);

        if (_ret === "continue") continue;
      }
    },
    deleteHandler: function deleteHandler() {
      var CesiumZondy = this.CesiumZondy;
      CesiumZondy = CesiumZondy || window.CesiumZondy;
      /* 这段代码要结合WebGlobe里面的如下代码才能明白
      window.CesiumZondy.GlobesManager.addSource(vueKey, vueIndex, webGlobe, {
        ScreenSpaceEventHandler: undefined,
      }); */

      var instance = this.getInstanceOptions();

      if (instance) {
        var handler = instance.ScreenSpaceEventHandler;

        if (handler) {
          handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
          handler.removeInputAction(Cesium.ScreenSpaceEventType.WHEEL);
          handler.destroy();
        }
      }

      var sources = CesiumZondy.GlobesManager.flatAllSource();
      sources.forEach(function (s, i) {
        if (s.options.ScreenSpaceEventHandler) {
          s.options.ScreenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
          s.options.ScreenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.WHEEL);
          s.options.ScreenSpaceEventHandler.setInputAction(function (movement) {}, Cesium.ScreenSpaceEventType.MOUSE_MOVE); // s.options.ScreenSpaceEventHandler.destroy();
        }
      });
    }
  }
});
// CONCATENATED MODULE: ./src/components/UI/Controls/Link/Link.vue?vue&type=script&lang=js&
 /* harmony default export */ var Link_Linkvue_type_script_lang_js_ = (Linkvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/UI/Controls/Link/Link.vue





/* normalize component */

var Link_component = normalizeComponent(
  Link_Linkvue_type_script_lang_js_,
  Linkvue_type_template_id_11785fba_render,
  Linkvue_type_template_id_11785fba_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Link = (Link_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4746d4ad-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/UI/Controls/Draw/Draw.vue?vue&type=template&id=7c93d0b4&
var Drawvue_type_template_id_7c93d0b4_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_vm._t("toolbar"),(_vm.initial)?_vm._t("default"):_vm._e()],2)}
var Drawvue_type_template_id_7c93d0b4_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/UI/Controls/Draw/Draw.vue?vue&type=template&id=7c93d0b4&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/UI/Controls/Draw/Draw.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
//
//
//
var drawEvents = {
  // es6
  drawCreate: "draw.create",
  // brower
  drawcreate: "draw.create"
};
/* harmony default export */ var Drawvue_type_script_lang_js_ = ({
  name: "mapgis-3d-draw",
  mixins: [],
  inject: ["Cesium", "CesiumZondy", "webGlobe"],
  props: {
    infinite: {
      type: Boolean,
      default: false
    },
    vueKey: {
      type: String,
      default: ""
    },
    vueIndex: {
      type: Number,
      default: function _default() {
        return Number((Math.random() * 100000000).toFixed(0));
      }
    }
  },
  data: function data() {
    return {
      initial: false,
      drawOption: ""
    };
  },
  created: function created() {},
  mounted: function mounted() {
    this.mount();
  },
  destroyed: function destroyed() {
    this.unmount();
  },
  watch: {},
  methods: {
    mount: function mount() {
      var vm = this;
      var vueKey = this.vueKey,
          vueIndex = this.vueIndex; //轮询，知道webGlobe有值，才会显示slot，这是为了保证draw组件不在webscene组件里面也能正常使用

      var interval = setInterval(function () {
        var webGlobe = vm.getWebGlobe();

        if (webGlobe) {
          clearInterval(interval);
          vm.initial = true;
          vm.$emit("load", vm);
          window.CesiumZondy.DrawToolManager.addSource(vueKey, vueIndex, []);
        }
      }, 50);
    },
    unmount: function unmount() {
      var vueKey = this.vueKey,
          vueIndex = this.vueIndex,
          CesiumZondy = this.CesiumZondy;

      if (!CesiumZondy) {
        CesiumZondy = window.CesiumZondy;
      }

      var find = CesiumZondy.DrawToolManager.findSource(vueKey, vueIndex); //清空实体，删除Draw组件

      if (find) {
        this.removeEntities(true);
        CesiumZondy.DrawToolManager.deleteSource(vueKey, vueIndex);
      } //清空drawElement


      if (window.drawElement) {
        window.drawElement.stopDrawing();
      }

      delete window.drawElement; //抛出unload事件

      this.$emit("unload", this);
    },
    removeEntities: function removeEntities(unmount) {
      //移除所有实体
      this.getWebGlobe();

      if (!unmount) {
        if (this.drawOption.length > 0) {
          this[this.drawOption]();
        }
      }
    },
    getWebGlobe: function getWebGlobe() {
      var webGlobeDraw;
      var webGlobe = this.webGlobe,
          CesiumZondy = this.CesiumZondy,
          Cesium = this.Cesium,
          vueKey = this.vueKey,
          vueIndex = this.vueIndex;

      if (!CesiumZondy) {
        CesiumZondy = window.CesiumZondy;
      }

      if (!Cesium) {
        Cesium = window.Cesium;
      } //当webGlobe存在，则表示在web-scene组建中，使用注入的webGlobe


      if (this.vueKey.length === 0) {
        webGlobeDraw = webGlobe;
      } else {
        //当webGlobe不存在，则表示要通过vueKey获取
        var GlobesManager = CesiumZondy.GlobesManager;

        if (GlobesManager.hasOwnProperty(this.vueKey) && GlobesManager[this.vueKey].length > 0 && GlobesManager[this.vueKey][0].hasOwnProperty("source")) {
          webGlobeDraw = GlobesManager[this.vueKey][0].source;
        }
      } //取得webGlobe后，清空当前绘制


      if (webGlobeDraw) {
        var drawEntities = window.CesiumZondy.DrawToolManager.findSource(vueKey, vueIndex);

        if (drawEntities) {
          drawEntities = drawEntities.source;

          for (var i = 0; i < drawEntities.length; i++) {
            webGlobeDraw.viewer.scene.primitives.remove(drawEntities[i]);
            webGlobeDraw.viewer.entities.remove(drawEntities[i]);
          }

          drawEntities.source = [];
        }

        if (window.drawElement) {
          window.drawElement.stopDrawing();
        }
      }

      return webGlobeDraw;
    },
    getDrawElement: function getDrawElement(webGlobe) {
      if (window.drawElement) {
        window.drawElement.stopDrawing();
      }

      window.drawElement = new Cesium.DrawElement(webGlobe.viewer);
      return window.drawElement;
    },
    enableDrawPoint: function enableDrawPoint() {
      this.drawOption = "enableDrawPoint";
      var webGlobeDraw = this.getWebGlobe();
      var vm = this;
      var CesiumZondy = this.CesiumZondy,
          Cesium = this.Cesium,
          vueKey = this.vueKey,
          vueIndex = this.vueIndex;

      if (!CesiumZondy) {
        CesiumZondy = window.CesiumZondy;
      }

      if (!Cesium) {
        Cesium = window.Cesium;
      }

      var entityController = new CesiumZondy.Manager.EntityController({
        viewer: webGlobeDraw.viewer
      });
      var drawElement = this.getDrawElement(webGlobeDraw);
      drawElement.startDrawingMarker({
        addDefaultMark: false,
        callback: function callback(position) {
          var cartographic = Cesium.Cartographic.fromCartesian(position);
          var lng = Cesium.Math.toDegrees(cartographic.longitude);
          var lat = Cesium.Math.toDegrees(cartographic.latitude);
          var height = cartographic.height; //模型高度
          //添加点：经度、纬度、高程、名称、像素大小、颜色、外边线颜色、边线宽度

          var drawEntity = entityController.appendPoint(lng, lat, height, '点', 10, new Cesium.Color(255 / 255, 0 / 255, 0 / 255, 1), new Cesium.Color(255 / 255, 255 / 255, 0 / 255, 1), 2);
          var drawEntities = window.CesiumZondy.DrawToolManager.findSource(vueKey, vueIndex).source;
          drawEntities.push(drawEntity);

          if (!vm.infinite) {
            drawElement.stopDrawing();
          }

          vm.$emit('drawCreate', position, [lng, lat, height], webGlobeDraw);
          vm.$emit('drawcreate', position, [lng, lat, height], webGlobeDraw);
        }
      });
    },
    enableDrawLine: function enableDrawLine() {
      this.drawOption = "enableDrawLine";
      var webGlobeDraw = this.getWebGlobe();
      var Cesium = this.Cesium,
          vueKey = this.vueKey,
          vueIndex = this.vueIndex;

      if (!Cesium) {
        Cesium = window.Cesium;
      }

      var vm = this;
      var drawElement = this.getDrawElement(webGlobeDraw);
      drawElement.startDrawingPolyline({
        callback: function callback(positions) {
          positions.splice(positions.length - 1, 1);
          var degreeArr = [];

          for (var i = 0; i < positions.length; i++) {
            var cartographic = Cesium.Cartographic.fromCartesian(positions[i]);
            var lng = Cesium.Math.toDegrees(cartographic.longitude);
            var lat = Cesium.Math.toDegrees(cartographic.latitude);
            var height = cartographic.height;
            degreeArr.push([lng, lat, height]);
          }

          var polyline = new Cesium.DrawElement.PolylinePrimitive({
            id: "polyline",
            positions: positions,
            width: 1,
            geodesic: true
          });
          var drawEntity = webGlobeDraw.viewer.scene.primitives.add(polyline);
          var drawEntities = window.CesiumZondy.DrawToolManager.findSource(vueKey, vueIndex).source;
          drawEntities.push(drawEntity);

          if (!vm.infinite) {
            drawElement.stopDrawing();
          }

          vm.$emit('drawCreate', positions, degreeArr, webGlobeDraw);
          vm.$emit('drawcreate', positions, degreeArr, webGlobeDraw);
        }
      });
    },
    enableDrawPolygon: function enableDrawPolygon() {
      this.drawOption = "enableDrawPolygon";
      var webGlobeDraw = this.getWebGlobe();
      var Cesium = this.Cesium,
          vueKey = this.vueKey,
          vueIndex = this.vueIndex;

      if (!Cesium) {
        Cesium = window.Cesium;
      }

      var vm = this;
      var drawElement = this.getDrawElement(webGlobeDraw);
      drawElement.startDrawingPolygon({
        callback: function callback(positions) {
          var degreeArr = [];

          for (var i = 0; i < positions.length; i++) {
            var cartographic = Cesium.Cartographic.fromCartesian(positions[i]);
            var lng = Cesium.Math.toDegrees(cartographic.longitude);
            var lat = Cesium.Math.toDegrees(cartographic.latitude);
            var height = cartographic.height;
            degreeArr.push([lng, lat, height]);
          }

          var polygon = new Cesium.DrawElement.PolygonPrimitive({
            positions: positions,
            material: Cesium.Material.fromType('Color', {
              color: new Cesium.Color(1.0, 0.0, 0.0, 1.0)
            })
          });
          var drawEntity = webGlobeDraw.viewer.scene.primitives.add(polygon);
          var drawEntities = window.CesiumZondy.DrawToolManager.findSource(vueKey, vueIndex).source;
          drawEntities.push(drawEntity);

          if (!vm.infinite) {
            drawElement.stopDrawing();
          }

          vm.$emit('drawCreate', positions, degreeArr, webGlobeDraw);
          vm.$emit('drawcreate', positions, degreeArr, webGlobeDraw);
        }
      });
    },
    enableDrawRectangle: function enableDrawRectangle() {
      this.drawOption = "enableDrawRectangle";
      var webGlobeDraw = this.getWebGlobe();
      var Cesium = this.Cesium,
          vueKey = this.vueKey,
          vueIndex = this.vueIndex;

      if (!Cesium) {
        Cesium = window.Cesium;
      }

      var vm = this;
      var drawElement = this.getDrawElement(webGlobeDraw);
      drawElement.startDrawingExtent({
        callback: function callback(positions) {
          var drawEntity = webGlobeDraw.viewer.entities.add({
            rectangle: {
              coordinates: positions,
              material: Cesium.Color.RED.withAlpha(0.5)
            }
          });
          var drawEntities = window.CesiumZondy.DrawToolManager.findSource(vueKey, vueIndex).source;
          drawEntities.push(drawEntity);
          var radianPoints = [positions.west, positions.north, positions.east, positions.south];
          var Cartesian3Points = Cesium.Cartesian3.fromRadiansArray(radianPoints, webGlobeDraw.ellipsoid);
          var degreeArr = [];

          for (var i = 0; i < Cartesian3Points.length; i++) {
            var cartographic = Cesium.Cartographic.fromCartesian(Cartesian3Points[i]);
            var lng = Cesium.Math.toDegrees(cartographic.longitude);
            var lat = Cesium.Math.toDegrees(cartographic.latitude);
            var height = positions.height;
            degreeArr.push([lng, lat, height]);
          }

          if (!vm.infinite) {
            drawElement.stopDrawing();
          }

          vm.$emit('drawCreate', Cartesian3Points, degreeArr, webGlobeDraw);
          vm.$emit('drawcreate', Cartesian3Points, degreeArr, webGlobeDraw);
        }
      });
    }
  }
});
// CONCATENATED MODULE: ./src/components/UI/Controls/Draw/Draw.vue?vue&type=script&lang=js&
 /* harmony default export */ var Draw_Drawvue_type_script_lang_js_ = (Drawvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/UI/Controls/Draw/Draw.vue





/* normalize component */

var Draw_component = normalizeComponent(
  Draw_Drawvue_type_script_lang_js_,
  Drawvue_type_template_id_7c93d0b4_render,
  Drawvue_type_template_id_7c93d0b4_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Draw = (Draw_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4746d4ad-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/UI/Controls/Measure/Measure.vue?vue&type=template&id=1a5b55c3&
var Measurevue_type_template_id_1a5b55c3_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.initial)?_vm._t("default"):_vm._e()],2)}
var Measurevue_type_template_id_1a5b55c3_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/UI/Controls/Measure/Measure.vue?vue&type=template&id=1a5b55c3&

// CONCATENATED MODULE: ./src/components/UI/Controls/ServiceLayer.js

/* harmony default export */ var ServiceLayer = ({
  inject: ["Cesium", "CesiumZondy", "webGlobe"],
  props: {
    vueKey: {
      type: String,
      default: "default"
    },
    vueIndex: {
      type: Number,
      default: function _default() {
        return Number((Math.random() * 100000000).toFixed(0));
      }
    }
  },
  data: function data() {
    return {
      //此组件初始化前，要等待加载完毕的组件的manager名称
      waitManagerName: undefined
    };
  },
  methods: {
    /*
     * 初始化函数，如果组件需要的对象（webGlobe，M3D模型对象等）初始化完毕，才初始化组件
     * @param callback 回调函数
     * **/
    $_init: function $_init(callback) {
      var vm = this;
      var interval = setInterval(function () {
        var Obj = vm.$_getObject();

        if (Obj) {
          clearInterval(interval);
          callback();
        }
      }, 50);
    },

    /*
     * 根据veuKey取得webGlobe对象
     * @param deleteFunc Function 删除前一次绘制的函数
     * @param NewManagerName String 如果指定了NewManagerName，则使用NewManagerName
     * **/
    $_getObject: function $_getObject(NewManagerName, deleteFunc) {
      var source,
          MName = this.waitManagerName;

      if (NewManagerName) {
        MName = NewManagerName;
      } //如果是GlobesManager，则直接通过vueKey来寻找


      if (MName === "GlobesManager") {
        var webGlobe = this.webGlobe;

        if (this.vueKey === "default") {
          // 使用注入的webGlobe
          // codemirror使用的时候不能支持多屏，也无法获取.CesiumZondy.GlobesManager对象
          source = webGlobe;
        } else {
          var GlobesManager = window.CesiumZondy.GlobesManager;

          if (GlobesManager[this.vueKey]) {
            source = GlobesManager[this.vueKey][0].source;
          }
        }
      } else {
        //如果是其他的Manager，则通过vueKey和vueIndex来寻找
        source = window.CesiumZondy[MName].findSource(this.vueKey, this.vueIndex);
      }

      if (deleteFunc) {
        deleteFunc(source);
      }

      return source;
    },

    /*
     * 删除Manager
     * @param managerName String 要被删除的manager
     * @param callback Function 回调函数
     * **/
    $_deleteManger: function $_deleteManger(managerName, callback) {
      var vueKey = this.vueKey,
          vueIndex = this.vueIndex;
      var manager = window.CesiumZondy[managerName].findSource(vueKey, vueIndex);

      if (manager) {
        callback(manager);
        window.CesiumZondy.MeasureToolManager.deleteSource(vueKey, vueIndex);
      }
    }
  }
});
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/UI/Controls/Measure/Measure.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//

/* harmony default export */ var Measurevue_type_script_lang_js_ = ({
  name: "mapgis-3d-measure",
  mixins: [ServiceLayer],
  props: {
    styles: {
      type: Object,
      default: function _default() {
        return {
          lineColor: "black"
        };
      }
    }
  },
  data: function data() {
    return {
      measure: undefined,
      initial: false,
      measureStyles: {},
      waitManagerName: "GlobesManager"
    };
  },
  watch: {
    styles: {
      handler: function handler() {
        this.initStyles();
      },
      deep: true
    }
  },
  mounted: function mounted() {
    var vm = this;
    this.$_init(function () {
      vm.initStyles();
      vm.initial = true;
      vm.$emit("load", vm);
    });
  },
  destroyed: function destroyed() {
    this.deleteMeasure();
    vm.$emit("unload");
  },
  methods: {
    initStyles: function initStyles() {
      this.measureStyles.lineColor = Cesium.Color.fromCssColorString(this.styles.lineColor, this.measureStyles.lineColor);
    },
    measureCallBack: function measureCallBack(result) {
      if (result instanceof Array) {
        for (var i = 0; i < result.length; i++) {
          result[i] = result[i] / 1000;
        }
      }

      this.$emit("measured", result);
    },
    enableMeasureLength: function enableMeasureLength() {
      this.$_enableMeasure("MeasureLengthTool");
    },
    enableMeasureArea: function enableMeasureArea() {
      this.$_enableMeasure("MeasureAreaTool");
    },
    enableMeasureTriangle: function enableMeasureTriangle() {
      this.$_enableMeasure("TriangulationTool");
    },
    enableMeasureSlope: function enableMeasureSlope() {
      this.$_enableMeasure("MeasureSlopeTool");
    },
    $_enableMeasure: function $_enableMeasure(MeasureName) {
      var vueKey = this.vueKey,
          vueIndex = this.vueIndex;
      var webGlobe = this.$_getObject(this.waitManagerName, this.deleteMeasure);
      var measure = new Cesium[MeasureName](webGlobe.viewer, {
        lineColor: this.measureStyles.lineColor,
        callBack: this.measureCallBack
      });
      window.CesiumZondy.MeasureToolManager.addSource(vueKey, vueIndex, measure);
      measure.startTool();
    },
    deleteMeasure: function deleteMeasure() {
      this.$_deleteManger("MeasureToolManager", function (manager) {
        if (manager.source) {
          manager.source.stopTool();
        }
      });
    }
  }
});
// CONCATENATED MODULE: ./src/components/UI/Controls/Measure/Measure.vue?vue&type=script&lang=js&
 /* harmony default export */ var Measure_Measurevue_type_script_lang_js_ = (Measurevue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/UI/Controls/Measure/Measure.vue





/* normalize component */

var Measure_component = normalizeComponent(
  Measure_Measurevue_type_script_lang_js_,
  Measurevue_type_template_id_1a5b55c3_render,
  Measurevue_type_template_id_1a5b55c3_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Measure = (Measure_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4746d4ad-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/UI/Controls/Compare/cdn/Compare.vue?vue&type=template&id=4585fe1e&
var Comparevue_type_template_id_4585fe1e_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c("div")}
var Comparevue_type_template_id_4585fe1e_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/UI/Controls/Compare/cdn/Compare.vue?vue&type=template&id=4585fe1e&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/UI/Controls/Compare/cdn/Compare.vue?vue&type=script&lang=js&



//
//
/* harmony default export */ var Comparevue_type_script_lang_js_ = ({
  name: "mapgis-3d-compare",
  inject: ["Cesium", "webGlobe", "CesiumZondy"],
  props: {
    beforeLayers: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    afterLayers: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    vueKey: {
      type: String,
      default: "default"
    }
  },
  data: function data() {
    return {
      container: null
    };
  },
  watch: {
    beforeLayers: {
      handler: function handler(val) {
        this.initCompare();
      },
      deep: true
    },
    afterLayers: {
      handler: function handler(val) {
        this.initCompare();
      },
      deep: true
    },
    vueKey: function vueKey() {
      this.polling();
    }
  },
  mounted: function mounted() {
    this.polling();
  },
  methods: {
    polling: function polling() {
      var _this = this;

      var vueKey = this.vueKey,
          CesiumZondy = this.CesiumZondy,
          webGlobe = this.webGlobe;

      if (vueKey === 'default') {
        console.log('cdn', this.vueKey);
        this.initCompare(webGlobe);
      } else {
        var timer = setInterval(function () {
          if (CesiumZondy.GlobesManager.hasOwnProperty(_this.vueKey)) {
            clearInterval(timer);

            _this.initCompare();
          }
        }, 50);
      }
    },
    initCompare: function initCompare(webGlobe) {
      var CesiumZondy = this.CesiumZondy,
          vueKey = this.vueKey;
      webGlobe = webGlobe || CesiumZondy.GlobesManager[vueKey][0].source;
      var slider = document.createElement("div");
      slider.className = "slider";
      this.container = webGlobe.elementID.parentNode;
      this.container.appendChild(slider);
      var layers = webGlobe.layers._layers;

      if (this.beforeLayers.length && this.afterLayers.length) {
        for (var i = 1; i < layers.length; i++) {
          layers[i].show = true;

          if (this.beforeLayers.includes(layers[i].id)) {
            layers[i].splitDirection = Cesium.ImagerySplitDirection.LEFT;
          } else if (this.afterLayers.includes(layers[i].id)) {
            layers[i].splitDirection = Cesium.ImagerySplitDirection.RIGHT;
          } else {
            layers[i].show = false;
          }
        }
      } else {
        layers[layers.length - 2].splitDirection = Cesium.ImagerySplitDirection.LEFT;
        layers[layers.length - 1].splitDirection = Cesium.ImagerySplitDirection.RIGHT;
      } // let slider = this.slider;


      webGlobe.scene.imagerySplitPosition = slider.offsetLeft / slider.parentElement.offsetWidth;
      var handler = new Cesium.ScreenSpaceEventHandler(slider);
      var moveActive = false;

      function move(movement) {
        if (!moveActive) {
          return;
        }

        var relativeOffset = movement.endPosition.x;
        var splitPosition = (slider.offsetLeft + relativeOffset) / slider.parentElement.offsetWidth;
        slider.style.left = 100.0 * splitPosition + "%";
        webGlobe.scene.imagerySplitPosition = splitPosition;
      } //鼠标左键按下事件


      handler.setInputAction(function () {
        moveActive = true;
      }, Cesium.ScreenSpaceEventType.LEFT_DOWN); //鼠标左键抬起事件

      handler.setInputAction(function () {
        moveActive = false;
      }, Cesium.ScreenSpaceEventType.LEFT_UP); //滑动事件的开始

      handler.setInputAction(function () {
        moveActive = true;
      }, Cesium.ScreenSpaceEventType.PINCH_START); //滑动事件的结束

      handler.setInputAction(function () {
        moveActive = false;
      }, Cesium.ScreenSpaceEventType.PINCH_END); //鼠标移动事件

      handler.setInputAction(move, Cesium.ScreenSpaceEventType.MOUSE_MOVE); //滑动事件

      handler.setInputAction(move, Cesium.ScreenSpaceEventType.PINCH_MOVE);
    }
  },
  destroyed: function destroyed() {
    var webGlobe = this.webGlobe,
        CesiumZondy = this.CesiumZondy,
        vueKey = this.vueKey;
    var globe = webGlobe || CesiumZondy.GlobesManager[vueKey][0].source;
    var layers = globe.layers._layers;
    layers.forEach(function (layer) {
      layer.show = true;
      layer.splitDirection = Cesium.ImagerySplitDirection.NONE;
    });
    var slider = document.getElementsByClassName("slider");
    this.container.removeChild(slider[0]);
  }
});
// CONCATENATED MODULE: ./src/components/UI/Controls/Compare/cdn/Compare.vue?vue&type=script&lang=js&
 /* harmony default export */ var cdn_Comparevue_type_script_lang_js_ = (Comparevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/UI/Controls/Compare/cdn/Compare.vue?vue&type=style&index=0&lang=css&
var Comparevue_type_style_index_0_lang_css_ = __webpack_require__("1340");

// CONCATENATED MODULE: ./src/components/UI/Controls/Compare/cdn/Compare.vue






/* normalize component */

var Compare_component = normalizeComponent(
  cdn_Comparevue_type_script_lang_js_,
  Comparevue_type_template_id_4585fe1e_render,
  Comparevue_type_template_id_4585fe1e_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Compare = (Compare_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4746d4ad-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/UI/Controls/Legend/Legend.vue?vue&type=template&id=a303e9de&scoped=true&
var Legendvue_type_template_id_a303e9de_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"mapgis-legend"},[_c('a-select',{staticStyle:{"width":"100%"},attrs:{"default-value":"全部"},on:{"change":_vm.handleChange}},[_c('a-select-option',{attrs:{"value":"全部"}},[_vm._v(" 全部 ")]),_vm._l((_vm.layers),function(layer,index){return _c('a-select-option',{key:index,attrs:{"value":index}},[_vm._v(_vm._s(layer.layerName)+"\n        ")])})],2),_c('div',{staticClass:"legend-area"},_vm._l((_vm.legends),function(legend,index){return _c('li',{key:index},[_c('img',{attrs:{"src":'data:image/png;base64,' + legend.imageData}}),_c('span',[_vm._v(_vm._s(legend.label))])])}),0)],1)}
var Legendvue_type_template_id_a303e9de_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/UI/Controls/Legend/Legend.vue?vue&type=template&id=a303e9de&scoped=true&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.replace.js
var es6_regexp_replace = __webpack_require__("a481");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/UI/Controls/Legend/Legend.vue?vue&type=script&lang=js&




//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var Legendvue_type_script_lang_js_ = ({
  name: "mapgis-3d-arcgis-legend",
  inject: ["Cesium", "webGlobe", "CesiumZondy"],
  data: function data() {
    return {
      layers: [],
      legends: [],
      allLegends: []
    };
  },
  mounted: function mounted() {
    this.getLegendUrl();
  },
  methods: {
    getLegendInfo: function getLegendInfo(url) {
      var _this = this;

      var legendUrl = url.replace(/(?<=MapServer).*/i, "/legend?f=pjson");
      fetch(legendUrl).then(function (res) {
        return res.json();
      }).then(function (res) {
        _this.layers = _this.layers.concat(res.layers);
        res.layers.forEach(function (layer) {
          _this.allLegends = _this.allLegends.concat(layer.legend);
        });
        _this.legends = _this.allLegends;
      }).catch(function (err) {
        console.log(err);
      });
    },
    getLegendUrl: function getLegendUrl() {
      var _this2 = this;

      var CesiumZondy = this.CesiumZondy;
      var layers = [];
      Object.keys(CesiumZondy.ArcgisManager).forEach(function (key) {
        if (key !== "vueKey") {
          layers = layers.concat(CesiumZondy.ArcgisManager[key]);
        }
      });
      layers.forEach(function (layer) {
        var url = layer.source._imageryProvider.url;

        if (/\/arcgis\/rest\/services/i.test(url)) {
          _this2.getLegendInfo(url);
        }
      });
    },
    handleChange: function handleChange(value) {
      if (value === "全部") {
        this.legends = this.allLegends;
      } else {
        this.legends = this.layers[value].legend;
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/UI/Controls/Legend/Legend.vue?vue&type=script&lang=js&
 /* harmony default export */ var Legend_Legendvue_type_script_lang_js_ = (Legendvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/UI/Controls/Legend/Legend.vue?vue&type=style&index=0&id=a303e9de&scoped=true&lang=css&
var Legendvue_type_style_index_0_id_a303e9de_scoped_true_lang_css_ = __webpack_require__("0437");

// CONCATENATED MODULE: ./src/components/UI/Controls/Legend/Legend.vue






/* normalize component */

var Legend_component = normalizeComponent(
  Legend_Legendvue_type_script_lang_js_,
  Legendvue_type_template_id_a303e9de_scoped_true_render,
  Legendvue_type_template_id_a303e9de_scoped_true_staticRenderFns,
  false,
  null,
  "a303e9de",
  null
  
)

/* harmony default export */ var Legend = (Legend_component.exports);
// CONCATENATED MODULE: ./src/components/Provider/ImageProvider/ImageryOptions.js

/* harmony default export */ var ImageryOptions = ({
  imageryProvider: {
    type: Object,
    required: true
  },
  rectangle: Object,
  alpha: {
    type: Number | Function,
    default: 1.0
  },
  brightness: {
    type: Number | Function,
    default: 1.0
  },
  contrast: {
    type: Number | Function,
    default: 1.0
  },
  hue: {
    type: Number | Function,
    default: 0.0
  },
  saturation: {
    type: Number | Function,
    default: 1.0
  },
  gamma: {
    type: Number | Function,
    default: 1.0
  },
  splitDirection: Number,
  minificationFilter: Number,
  magnificationFilter: Number,
  show: {
    type: Boolean,
    default: true
  },
  maximumAnisotropy: Number,
  minimumTerrainLevel: Number,
  maximumTerrainLevel: Number,
  cutoutRectangle: Object,
  colorToAlpha: Object,
  colorToAlphaThreshold: {
    type: Number,
    default: 0.004
  }
});
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Provider/ImageProvider/ImageryLayer.vue?vue&type=script&lang=js&








function ImageryLayervue_type_script_lang_js_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function ImageryLayervue_type_script_lang_js_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ImageryLayervue_type_script_lang_js_ownKeys(Object(source), true).forEach(function (key) { Object(defineProperty["a" /* default */])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ImageryLayervue_type_script_lang_js_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }


/* harmony default export */ var ImageryLayervue_type_script_lang_js_ = ({
  name: 'cesium-layer-imagery',
  mixins: [],
  inject: ["Cesium", "webGlobe"],
  props: ImageryLayervue_type_script_lang_js_objectSpread({}, ImageryOptions),
  methods: {
    /**
     * ImageryLayer 初始化方式较为特殊，这儿覆盖重写 createCesiumObject 方法。
     */
    createCesiumObject: function () {
      var _createCesiumObject = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var $props;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                $props = this.$props;
                return _context.abrupt("return", new Cesium.ImageryLayer(provider || {}, $props));

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function createCesiumObject() {
        return _createCesiumObject.apply(this, arguments);
      }

      return createCesiumObject;
    }(),
    mount: function () {
      var _mount = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var webGlobe, imageryLayer, viewer;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                webGlobe = this.webGlobe, imageryLayer = this.imageryLayer;
                viewer = webGlobe.viewer;
                viewer.imageryLayers.add(imageryLayer);
                return _context2.abrupt("return", !this.viewer.isDestroyed() && viewer.imageryLayers.contains(imageryLayer));

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function mount() {
        return _mount.apply(this, arguments);
      }

      return mount;
    }(),
    unmount: function () {
      var _unmount = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var webGlobe, imageryLayer, viewer;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                webGlobe = this.webGlobe, imageryLayer = this.imageryLayer;
                viewer = webGlobe.viewer;
                return _context3.abrupt("return", !viewer.isDestroyed() && viewer.imageryLayers.remove(imageryLayer));

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function unmount() {
        return _unmount.apply(this, arguments);
      }

      return unmount;
    }()
    /* async refresh () {
      return this.unmount().then(() => {
        return this.createCesiumObject().then(cesiumObject => {
          this.originInstance = cesiumObject
          return this.mount()
        })
      })
    },
    setProvider (provider) {
      if (provider !== this._provider) {
        this._provider = provider
        provider && this.refresh()
        const listener = this.$listeners['update:imageryProvider']
        if (listener) this.$emit('update:imageryProvider', provider)
      }
    }, */

  },
  created: function created() {
    var _this = this;

    this._provider = undefined;
    Object.defineProperties(this, {
      imageryLayer: {
        enumerable: true,
        get: function get() {
          return _this.originInstance;
        }
      },
      provider: {
        enumerable: true,
        get: function get() {
          return _this.imageryProvider || _this._provider;
        }
      }
    });
  }
});
// CONCATENATED MODULE: ./src/components/Provider/ImageProvider/ImageryLayer.vue?vue&type=script&lang=js&
 /* harmony default export */ var ImageProvider_ImageryLayervue_type_script_lang_js_ = (ImageryLayervue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/Provider/ImageProvider/ImageryLayer.vue
var ImageryLayer_render, ImageryLayer_staticRenderFns




/* normalize component */

var ImageryLayer_component = normalizeComponent(
  ImageProvider_ImageryLayervue_type_script_lang_js_,
  ImageryLayer_render,
  ImageryLayer_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var ImageryLayer = (ImageryLayer_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4746d4ad-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Layer/IGServer/IgsDocLayer.vue?vue&type=template&id=d35fb720&
var IgsDocLayervue_type_template_id_d35fb720_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span')}
var IgsDocLayervue_type_template_id_d35fb720_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Layer/IGServer/IgsDocLayer.vue?vue&type=template&id=d35fb720&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.sort.js
var es6_array_sort = __webpack_require__("55dd");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.assign.js
var es6_object_assign = __webpack_require__("f751");

// CONCATENATED MODULE: ./src/components/Layer/ServiceLayer.js












function ServiceLayer_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function ServiceLayer_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ServiceLayer_ownKeys(Object(source), true).forEach(function (key) { Object(defineProperty["a" /* default */])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ServiceLayer_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/* harmony default export */ var Layer_ServiceLayer = ({
  inject: ["webGlobe"],
  props: {
    baseUrl: {
      type: String,
      default: null
    },
    domain: {
      type: String,
      default: null
    },
    protocol: {
      type: String,
      default: "http://"
    },
    ip: {
      type: String,
      default: null
    },
    port: {
      type: String,
      default: null
    },
    serverName: {
      type: String,
      default: null
    },
    layerStyle: {
      type: Object,
      default: function _default() {
        return {
          visible: true,
          opacity: 1
        };
      }
    },
    id: {
      type: String,
      default: ""
    },
    token: {
      type: Object
    },
    options: {
      type: Object,
      default: function _default() {
        return {
          proxy: undefined,
          tilingScheme: undefined,
          rectangle: undefined,
          tileDiscardPolicy: undefined,
          tileHeight: 256,
          tileWidth: 256,
          enablePickFeatures: undefined,
          minimumLevel: 0,
          maximumLevel: 20,
          credit: undefined
        };
      }
    },
    vueKey: {
      type: String,
      default: "default"
    },
    vueIndex: {
      type: Number,
      default: function _default() {
        return Number((Math.random() * 100000000).toFixed(0));
      }
    }
  },
  data: function data() {
    return {
      //layerStyle，用于监听layerStyle的属性变化
      layerStyleCopy: {},
      //确定serviceLayer要使用的manager名字
      managerName: undefined,
      //确定serviceLayer要使用的provider的名字
      providerName: undefined,

      /*
      * this.$props.options里面的参数类型检测设置，类型名称全小写，
      * 检测类型有number，boolean，string，object，array
      * checkType: {
        visible: "boolean",//确定visible为boolean
        opacity: "number",//确定opacity为number
        vueKey: "string",//确定vueKey为string
        parameters: "object"//确定parameters为object
        }
      **/
      checkType: undefined,
      layerId: undefined
    };
  },
  watch: {
    layerStyle: {
      handler: function handler() {
        var vueKey = this.vueKey,
            vueIndex = this.vueIndex;
        var layer = window.CesiumZondy[this.managerName].findSource(vueKey, vueIndex);

        if (this.layerStyleCopy.visible !== this.layerStyle.visible) {
          layer.source.show = this.layerStyle.visible;
        }

        if (this.layerStyleCopy.opacity !== this.layerStyle.opacity) {
          layer.source.alpha = this.layerStyle.opacity;
        }

        if (this.layerStyleCopy.zIndex !== this.layerStyle.zIndex) {
          this.$_moveLayer();
        }

        this.layerStyleCopy = ServiceLayer_objectSpread({}, this.layerStyle);
      },
      deep: true
    },
    options: {
      handler: function handler() {
        this.unmount();
        this.mount();
      },
      deep: true
    },
    id: {
      handler: function handler() {
        var vueIndex = this.vueIndex,
            vueKey = this.vueKey;
        var layer = window.CesiumZondy[this.managerName].findSource(vueKey, vueIndex);
        layer.source.id = this.id;
      }
    }
  },
  methods: {
    /*
     * 通用的mount函数，建议使用时在自己的mount函数里面调用此函数，并在mounted生命周期调用
     * 使用前请优先处理好自己组建里非通用参数，然后传入$_mount
     * 例如：
     * mount(){
     *   //...处理自己的provider要用的参数，请参考Cesium文档里的Provider
     *   //在线文档：http://develop.smaryun.com:8899/docs/other/mapgis-cesium/index.html
     *   //最新文档：\\192.168.82.44\MapGIS 10 开发环境\WebClient\package的develop里面
     *   let options = {
     *     opt1: "",
     *     opt2: ""
     *   }
     *   this.$_mount(options);
     * }
     *
     * @param addOpt 需要额外添加的参数
     * @param CesiumZondyLayer 该参数存在时，会替provier处的Cesium[this.providerName]方法，请参考webclient-javascript里的各种Cesium的layer
     * **/
    $_mount: function $_mount(addOpt, CesiumZondyLayer) {
      //类型检测
      this.$_check();
      var opt = {},
          options = {}; //取得除options、layerStyle和id之外的必要参数

      var $props = this.$props,
          vueIndex = this.vueIndex,
          vueKey = this.vueKey;
      Object.keys($props).forEach(function (key) {
        if (key !== "options" && key !== "layerStyle" && key !== "id") {
          opt[key] = $props[key];
        }
      }); //组合参数

      options = ServiceLayer_objectSpread(ServiceLayer_objectSpread(ServiceLayer_objectSpread({}, this.options), opt), addOpt);

      if (this.token) {
        if (this.providerName === "MapGIS2DDocMapProvider") {
          if (options.hasOwnProperty("extensions") && options.extensions.length > 0) {
            options.extensions.push({
              key: this.token.key,
              value: this.token.value
            });
          } else {
            options.extensions = [{
              key: this.token.key,
              value: this.token.value
            }];
          }
        } else {
          options.baseUrl += "?" + this.token.key + "=" + this.token.value;
        }
      } //设置Headers


      var checkHeaders = this.$_checkValue(this.options, "headers", ""),
          urlSource;

      if (checkHeaders === "null") {
        urlSource = new Cesium.Resource({
          url: options.baseUrl,
          headers: options.headers
        });
      } else {
        urlSource = options.baseUrl;
      }

      options.url = urlSource; //取得webGlobe对象，防止当页面有多个webGlobe只会取得

      var webGlobeObj = this.$_getWebGlobe(); //根据对应的providerName设置provider

      var layerStyle = this.layerStyle;
      var _options = options,
          saturation = _options.saturation,
          hue = _options.hue;
      var visible = layerStyle.visible,
          opacity = layerStyle.opacity,
          zIndex = layerStyle.zIndex;
      var imageryLayers = webGlobeObj.viewer.imageryLayers;
      var provider;

      if (CesiumZondyLayer) {
        provider = new CesiumZondyLayer(options);
      } else {
        provider = new Cesium[this.providerName](options);
      } //初始化imageryLayers.addImageryProvider需要的index


      var providerZIndex;

      if (zIndex < 0) {
        throw new Error("zIndex不能为负数");
      } else if (!zIndex) {
        //如果没有设置layerStyle.zIndex，则layer的zIndex统一设置为0，并且按照初始化的顺序向上叠放
        providerZIndex = 0;
      } else {
        //确定zIndex不能重复
        this.$_checkZIndex(imageryLayers); //如果有layerStyle.zIndex，则layer的zIndex为layerStyle.zIndex

        providerZIndex = zIndex;
      } //不管有没有设置zIndex先同意往上面叠放


      var imageryLayer = imageryLayers.addImageryProvider(provider, imageryLayers._layers.length); //如果有zIndex，则保证zIndex大于0的layer始终在zIndex为0的layer上面，并按照zIndex从大到小排序
      //如果没有zIndex，则按初始化顺序向上叠放，如果在此layer的下方含有zIndex大于0的layer，则layer向下一层，直到下方没有包含zIndex大于0的layer
      //只会根据imageryLayers排序，不会影响其他图层

      this.$_initLayerIndex();

      if (saturation !== undefined) {
        imageryLayer.saturation = saturation;
      }

      if (hue !== undefined) {
        imageryLayer.hue = hue;
      } //设置图层是否可见


      if (typeof visible === "boolean") {
        imageryLayer.show = visible;
      } //设置涂层的透明度


      if (typeof opacity === "number") {
        imageryLayer.alpha = opacity;
      } //得到layerStyle的副本，供watch使用


      this.layerStyleCopy = Object.assign({}, layerStyle); //设置图层id，分屏，卷帘使用

      if (this.id.length === 0) {
        imageryLayer.id = vueIndex;
      } else {
        imageryLayer.id = this.id;
      } //保存layerId，方便找到zIndex


      this.layerId = imageryLayer.id;
      var manageOptions = {
        zIndex: providerZIndex,
        id: imageryLayer.id
      }; //如果providerZIndex为0，表示初始化地图时，没有设置zIndex，因此会按照初始化的顺序向上叠放
      //如果之后给了zIndex，然后又删除了或者置空，则layer放最后一个包含zIndex的layer的下面，并按照zeroIndex排序

      if (providerZIndex === 0) {
        var maxZeroIndex = this.$_getMaxZeroIndex();
        manageOptions.zeroIndex = maxZeroIndex + 1;
      } //将图层加入对应的manager


      window.CesiumZondy[this.managerName].addSource(vueKey, vueIndex, imageryLayer, manageOptions); //抛出load事件

      this.$emit("load", imageryLayer, this);
    },
    $_unmount: function $_unmount() {
      var webGlobeObj = this.$_getWebGlobe();
      var vueKey = this.vueKey,
          vueIndex = this.vueIndex;
      var viewer = webGlobeObj.viewer;
      var imageryLayers = viewer.imageryLayers;
      var find = window.CesiumZondy[this.managerName].findSource(vueKey, vueIndex);
      imageryLayers.remove(find.source, true);
      window.CesiumZondy[this.managerName].deleteSource(vueKey, vueIndex);
      this.$emit("unload", this);
    },
    $_checkZIndex: function $_checkZIndex(imageryLayers) {
      var layers = this.$_getLayers();
      var _layers = imageryLayers._layers;

      for (var i = 0; i < _layers.length; i++) {
        for (var j = 0; j < layers.length; j++) {
          if (layers[j].options && layers[j].options.id === _layers[i].id) {
            if (layers[j].options.zIndex && layers[j].options.zIndex === this.layerStyle.zIndex) {
              throw new Error("该zIndex值：" + layers[j].options.zIndex + "已被使用，请重新赋值");
            }
          }
        }
      }
    },
    $_getMaxZeroIndex: function $_getMaxZeroIndex() {
      var layers = this.$_getLayers();
      var zeroIndex = 0;

      for (var i = 0; i < layers.length; i++) {
        if (layers[i].hasOwnProperty("options") && layers[i].options && layers[i].options.hasOwnProperty("zeroIndex")) {
          zeroIndex = layers[i].options.zeroIndex > zeroIndex ? layers[i].options.zeroIndex : zeroIndex;
        }
      }

      return zeroIndex;
    },
    $_getCurrentLayer: function $_getCurrentLayer(imageryLayers) {
      var currentLayer, index;
      var _layers = imageryLayers._layers;

      for (var i = 0; i < _layers.length; i++) {
        if (_layers[i].id === this.layerId) {
          currentLayer = _layers[i];
          index = i;
          break;
        }
      }

      return {
        currentLayer: currentLayer,
        index: index
      };
    },
    $_getLayers: function $_getLayers() {
      var Layers = [],
          vm = this; //遍历window.CesiumZondy下所有的Manager

      Object.keys(window.CesiumZondy).forEach(function (key) {
        if (key.indexOf("Manager") > -1 && key !== "GlobesManager") {
          //取出含有与webScene组件相同vueKey的Manager对象
          if (window.CesiumZondy[key].hasOwnProperty("vueKey")) {
            if (window.CesiumZondy[key].hasOwnProperty(vm.vueKey)) {
              var layerManagers = window.CesiumZondy[key][vm.vueKey];

              for (var i = 0; i < layerManagers.length; i++) {
                //确保拥有options并且options里面含有zIndex
                if (layerManagers[i].hasOwnProperty("options") && layerManagers[i].options && layerManagers[i].options.hasOwnProperty("zIndex") && layerManagers[i].options.zIndex !== undefined && layerManagers[i].options.zIndex !== null) {
                  Layers.push(layerManagers[i]);
                }
              }
            }
          }
        }
      }); //对数组进行排序

      Layers.sort(function (a, b) {
        if (a.options && b.options) {
          return a.options.zIndex - b.options.zIndex;
        }

        return 0;
      });
      return Layers;
    },
    $_getCurrentLayerManage: function $_getCurrentLayerManage() {
      var layers = this.$_getLayers();
      var layer;

      for (var i = 0; i < layers.length; i++) {
        if (layers[i].options.id === this.layerId) {
          layer = layers[i];
          break;
        }
      }

      return layer;
    },
    $_getLayerIndex: function $_getLayerIndex(Layers) {
      var layerIndex; //根据this.layerStyleCopy.zIndex，从当前的Layers数组中，图层所在index

      for (var i = 0; i < Layers.length; i++) {
        if (Layers[i].options.zIndex === this.layerStyleCopy.zIndex) {
          layerIndex = i;
          break;
        }
      }

      return layerIndex;
    },
    $_getWebGlobe: function $_getWebGlobe() {
      var webGlobeObj;
      var vueKey = this.vueKey,
          webGlobe = this.webGlobe; //如果this.vueKey，则从GlobesManager中取得webGlobeObj

      if (vueKey) {
        if (vueKey === "default") {
          webGlobeObj = webGlobe;
        } else {
          var GlobesManager = window.CesiumZondy.GlobesManager;
          webGlobeObj = GlobesManager[this.vueKey][0].source;
        }
      } else {
        //否则取this.webGlobe
        webGlobeObj = webGlobe;
      }

      return webGlobeObj;
    },

    /*
     * 当zIndex改变时，调用此方法，在watch中使用
     * **/
    $_moveLayer: function $_moveLayer() {
      var layerStyle = this.layerStyle,
          layerStyleCopy = this.layerStyleCopy;
      var zIndex = layerStyle.zIndex;
      var zIndexCopy = layerStyleCopy.zIndex;

      if (zIndex < 0) {
        throw new Error("zIndex不能为负数");
      } //取得webGlobe对象


      var webGlobeObj = this.$_getWebGlobe();
      var viewer = webGlobeObj.viewer;
      var imageryLayers = viewer.imageryLayers;
      var _layers = imageryLayers._layers;
      var currentLayer = this.$_getCurrentLayer(imageryLayers).currentLayer;
      var index = this.$_getCurrentLayer(imageryLayers).index; //确定zIndex不能重复

      this.$_checkZIndex(imageryLayers); //如果当前未被设置zIndex的layer有了zIndex，则一直上升，直到zIndex小于上一个layer的zIndex

      if (!zIndexCopy && zIndex > 0) {
        for (var i = index + 1; i < _layers.length; i++) {
          var nextIndex = this.$_getIndexById(_layers[i].id);

          if (nextIndex === 0) {
            imageryLayers.raise(currentLayer);
          } else if (this.layerStyle.zIndex > nextIndex) {
            imageryLayers.raise(currentLayer);
          }
        }

        this.$_updateLayerManager("zIndex", this.layerStyle.zIndex);
      } else if (zIndexCopy && !zIndex) {
        //如果当前的zIndex被删除或为undefined或null或0，则将zIndex变为0
        var currentLayerManage = this.$_getCurrentLayerManage();
        currentLayerManage.options.zIndex = 0; //如果当前的zIndex被删除或为undefined或null或0，则将layer放到所有含有zIndex的layer的最下方，并按照zeroIndex的值排序

        var current = this.$_getCurrentLayer(imageryLayers);
        var _currentLayer = current.currentLayer;
        var currentIndex = current.index;

        for (var _i = currentIndex - 1; _i > 0; _i--) {
          //如果下面一层还有zIndex，则向下降一层
          if (this.$_getIndexById(_layers[_i].id)) {
            imageryLayers.lower(_currentLayer);
          } else if (this.$_getIndexById(_layers[_i].id, "zeroIndex")) {
            //如果没有zIndex，而有zeroIndex，则根据zeroIndex排序
            //先查看是否含有zeroIndex
            var currentZeroIndex = this.$_getIndexById(this.layerId, "zeroIndex");
            var nextZeroIndex = this.$_getIndexById(_layers[_i].id, "zeroIndex"); //如果没有，则更新layer的zeroIndex，并停止下降

            if (!currentZeroIndex) {
              var maxZeroIndex = this.$_getMaxZeroIndex();
              this.$_updateLayerManager("zeroIndex", maxZeroIndex + 1);
              break;
            } else {
              //如果有ZeroIndex，则按照值排序
              if (currentZeroIndex < nextZeroIndex) {
                imageryLayers.lower(_currentLayer);
              }
            }
          }
        } //当下面没有layer时，zeroIndex设为1


        if (currentIndex - 1 === 0) {
          this.$_updateLayerManager("zeroIndex", 1);
        }
      } else {
        //正常的zIndex排序
        var _nextIndex = index + 1;

        var prevIndex = index - 1;

        if (_nextIndex <= _layers.length - 1) {
          if (this.layerStyle.zIndex > this.$_getIndexById(_layers[_nextIndex].id)) {
            for (var _i2 = _nextIndex; _i2 < _layers.length; _i2++) {
              var _nextIndex2 = this.$_getIndexById(_layers[_i2].id);

              if (this.layerStyle.zIndex > _nextIndex2) {
                imageryLayers.raise(currentLayer);
              }
            }
          }
        } else if (prevIndex > 0) {
          var pIndex = this.$_getIndexById(_layers[prevIndex].id);

          if (pIndex > 0 && this.layerStyle.zIndex < pIndex) {
            for (var _i3 = prevIndex; _i3 > 0; _i3--) {
              var _prevIndex = this.$_getIndexById(_layers[_i3].id);

              if (this.layerStyle.zIndex < _prevIndex) {
                imageryLayers.lower(currentLayer);
              }
            }
          }
        }

        this.$_updateLayerManager("zIndex", this.layerStyle.zIndex);
      }
    },
    $_updateLayerManager: function $_updateLayerManager(key, value) {
      var layers = this.$_getLayers();

      for (var i = 0; i < layers.length; i++) {
        if (this.layerId === layers[i].options.id) {
          layers[i].options[key] = value;
          break;
        }
      }
    },

    /*
     * 根据zIndex初始化图层顺序
     * 会在$_mount使用
     * **/
    $_initLayerIndex: function $_initLayerIndex() {
      var webGlobeObj = this.$_getWebGlobe();
      var viewer = webGlobeObj.viewer;
      var imageryLayers = viewer.imageryLayers;
      var _layers = imageryLayers._layers;
      var length = _layers.length;
      var currentLayer = _layers[length - 1];

      if (this.layerStyle.zIndex) {
        for (var i = length - 2; i > 0; i--) {
          if (this.layerStyle.zIndex < this.$_getIndexById(_layers[i].id)) {
            imageryLayers.lower(currentLayer);
          }
        }
      } else {
        for (var _i4 = length - 2; _i4 > 0; _i4--) {
          if (this.$_getIndexById(_layers[_i4].id) > 0) {
            imageryLayers.lower(currentLayer);
          }
        }
      }
    },
    $_getIndexById: function $_getIndexById(id, indexName) {
      var index = !indexName ? "zIndex" : indexName;
      var layers = this.$_getLayers();
      var zIndex;

      for (var i = 0; i < layers.length; i++) {
        if (layers[i].hasOwnProperty("options") && layers[i].options && layers[i].options.hasOwnProperty("id") && layers[i].options.id && layers[i].options.id === id) {
          zIndex = layers[i].options[index];
          break;
        }
      }

      return zIndex;
    },

    /*检查属性是否存在或者类型是否正确，优先检查是否为空
     * author 杨琨
     * param param obj 需要被检查的对象
     * param param name 要检查的属性名
     * param param type 要检查的属性的类型
     * return "null" 或者 "wrongType"
     * */
    $_checkValue: function $_checkValue(obj, name, type) {
      var flag = ""; //这里要确保type为String，因为遍历Object对象后传入的type可能为其他类型，这里只要String类型

      if (typeof type === "string") {
        //处理多个类型的情况
        var typeArr = type.split("|");

        for (var i = 0; i < typeArr.length; i++) {
          typeArr[i] = typeArr[i].replace(/\s*/g, "");

          if (obj.hasOwnProperty(name)) {
            //优先判断是否为空
            if (obj[name] === null || obj[name] === undefined) {
              flag = "null";
            } else if (_typeof(obj[name]) === "object") {
              //判断是数组还是Object
              if (typeArr[i] === "array") {
                flag = !(obj[name] instanceof Array) ? "wrongType" : "";
              } else if (typeArr[i] !== "object") {
                flag = "wrongType";
              }
            } else if (!(_typeof(obj[name]) === typeArr[i])) {
              //判断其他类型
              flag = "wrongType";
            }
          } else {
            flag = "null";
          }
        }
      }

      return flag;
    },
    $_check: function $_check() {
      //只判断options和layerStyle里的对象类型
      var opt = ServiceLayer_objectSpread(ServiceLayer_objectSpread({}, this.options), this.layerStyle);

      this.$_checkProps(opt, this.checkType);
    },

    /*检查对象里面的属性是否是需要的类型，如果不是则抛出错误
     * author 杨琨
     * param param checkObj 需要被检查的对象
     * param param checkType 属性类型集合
     * */
    $_checkProps: function $_checkProps(checkObj, checkType) {
      var vm = this;

      if (checkObj && checkType) {
        Object.keys(checkObj).forEach(function (key) {
          var result;

          if (checkType.hasOwnProperty(key) && typeof key === "string") {
            result = vm.$_checkValue(checkObj, key, checkType[key]);

            if (result === "wrongType") {
              throw new Error(key + "的类型错误，应为" + checkType[key] + "类型");
            }
          }
        });
      }
    },

    /*
     * 初始化url，有三种方式，url、domain、ip
     * @param service 要调用的服务名称
     * **/
    $_initUrl: function $_initUrl(service) {
      var _url; //优先判断url方式


      if (this.baseUrl) {
        _url = this.baseUrl;
      } else if (this.domain) {
        //其次domain方式
        if (!this.serverName) {
          throw new Error("请输入地图文档名称");
        }

        _url = this.domain + service + this.serverName;
      } else {
        //最后ip方式
        if (this.ip && this.port) {
          if (this.serverName) {
            _url = this.protocol + this.ip + ":" + this.port + service + this.serverName;
          } else {
            throw new Error("请输入地图文档名称");
          }
        } else {
          throw new Error("请输入url地址信息");
        }
      }

      return _url;
    },

    /*
     * 设置tilingScheme
     * @param service 要调用的服务名称
     * **/
    $_setTilingScheme: function $_setTilingScheme(tileMatrixSetName) {
      var tilingScheme;

      if (tileMatrixSetName === "EPSG:4326" || tileMatrixSetName === "EPSG:4490" || tileMatrixSetName === "EPSG:4610" || tileMatrixSetName === "EPSG:4214") {
        tilingScheme = new Cesium.GeographicTilingScheme();
      } else if (tileMatrixSetName === "EPSG:3857") {
        tilingScheme = new Cesium.WebMercatorTilingScheme();
      } else {
        tilingScheme = new Cesium.GeographicTilingScheme();
      }

      return tilingScheme;
    }
  }
});
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Layer/IGServer/IgsDocLayer.vue?vue&type=script&lang=js&
//
//
//

/* harmony default export */ var IgsDocLayervue_type_script_lang_js_ = ({
  name: "mapgis-3d-igs-doc-layer",
  mixins: [Layer_ServiceLayer],
  props: {
    layers: {
      type: String,
      default: null
    },
    srs: {
      type: String,
      default: "EPSG:4326"
    }
  },
  watch: {
    layers: {
      handler: function handler() {
        this.unmount();
        this.mount();
      }
    }
  },
  data: function data() {
    return {
      managerName: "IgsDocLayerManager",
      providerName: "MapGIS2DDocMapProvider",
      checkType: {
        tileWidth: "number",
        tileHeight: "number",
        minimumLevel: "number",
        maximumLevel: "number"
      }
    };
  },
  mounted: function mounted() {
    this.mount();
  },
  methods: {
    mount: function mount() {
      //处理独有参数
      var tilingScheme = this.$_setTilingScheme(this.srs),
          extensions = [];

      if (this.srs === "EPSG:4326" || this.srs === "EPSG:4490" || this.srs === "EPSG:4610" || this.srs === "EPSG:4214") {
        extensions = [{
          key: 'proj',
          value: 'WGS1984_度'
        }];
      } else if (this.srs === "EPSG:3857") {
        extensions = [{
          key: 'proj',
          value: 'Web墨卡托_WGS1984'
        }];
      }

      var baseUrl = this.$_initUrl("/igs/rest/mrms/docs/");
      this.$_mount({
        baseUrl: baseUrl,
        tilingScheme: tilingScheme,
        extensions: extensions
      });
    },
    unmount: function unmount() {
      this.$_unmount();
    }
  },
  destroyed: function destroyed() {
    this.unmount();
  }
});
// CONCATENATED MODULE: ./src/components/Layer/IGServer/IgsDocLayer.vue?vue&type=script&lang=js&
 /* harmony default export */ var IGServer_IgsDocLayervue_type_script_lang_js_ = (IgsDocLayervue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/Layer/IGServer/IgsDocLayer.vue





/* normalize component */

var IgsDocLayer_component = normalizeComponent(
  IGServer_IgsDocLayervue_type_script_lang_js_,
  IgsDocLayervue_type_template_id_d35fb720_render,
  IgsDocLayervue_type_template_id_d35fb720_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var IgsDocLayer = (IgsDocLayer_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4746d4ad-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Layer/IGServer/IgsTileLayer.vue?vue&type=template&id=3c7cfdb2&
var IgsTileLayervue_type_template_id_3c7cfdb2_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span')}
var IgsTileLayervue_type_template_id_3c7cfdb2_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Layer/IGServer/IgsTileLayer.vue?vue&type=template&id=3c7cfdb2&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Layer/IGServer/IgsTileLayer.vue?vue&type=script&lang=js&
//
//
//
//

/* harmony default export */ var IgsTileLayervue_type_script_lang_js_ = ({
  name: "mapgis-3d-igs-tile-layer",
  mixins: [Layer_ServiceLayer],
  props: {
    tilingScheme: {
      type: String,
      default: "EPSG:4326"
    }
  },
  data: function data() {
    return {
      managerName: "IgsTilecLayerManager",
      providerName: "MapGISMapProvider",
      checkType: {
        tileWidth: "number",
        tileHeight: "number",
        minimumLevel: "number",
        maximumLevel: "number"
      }
    };
  },
  mounted: function mounted() {
    this.mount();
  },
  methods: {
    mount: function mount() {
      //处理独有参数
      var url = this.$_initUrl("/igs/rest/mrms/tile");
      url += "/{level}/{row}/{col}";
      var tilingScheme = this.$_setTilingScheme(this.tilingScheme);
      this.$_mount({
        baseUrl: url,
        srs: this.tilingScheme,
        tilingScheme: tilingScheme
      });
    },
    unmount: function unmount() {
      this.$_unmount();
    }
  },
  destroyed: function destroyed() {
    this.unmount();
  }
});
// CONCATENATED MODULE: ./src/components/Layer/IGServer/IgsTileLayer.vue?vue&type=script&lang=js&
 /* harmony default export */ var IGServer_IgsTileLayervue_type_script_lang_js_ = (IgsTileLayervue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/Layer/IGServer/IgsTileLayer.vue





/* normalize component */

var IgsTileLayer_component = normalizeComponent(
  IGServer_IgsTileLayervue_type_script_lang_js_,
  IgsTileLayervue_type_template_id_3c7cfdb2_render,
  IgsTileLayervue_type_template_id_3c7cfdb2_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var IgsTileLayer = (IgsTileLayer_component.exports);
// CONCATENATED MODULE: ./src/components/Layer/RasterOptions.js


/* harmony default export */ var RasterOptions = ({
  url: {
    type: String,
    default: null
  },
  layerIndex: {
    type: Number
  },
  domain: {
    type: String,
    default: null
  },
  protocol: {
    type: String,
    default: location.protocol.split(":")[0] || "http"
  },
  ip: {
    type: String,
    default: "localhost"
  },
  port: {
    type: String,
    default: "6163"
  },
  colNum: {
    type: Number,
    default: 2
  },
  rowNum: {
    type: Number,
    default: 1
  },

  /**
   * @description 用来描述igserver发布的瓦片错级的问题,常用于自定义切图
   */
  offset: {
    type: Number,
    default: 0
  },
  show: {
    type: Boolean,
    default: true
  },
  alpha: {
    type: Number,
    default: 1.0
  },
  proxy: {
    type: String,
    default: undefined
  },

  /**
   * @example
   * new Cesium.GeographicTilingScheme({
        rectangle:new Cesium.Rectangle.fromDegrees(-180, -90, 180, 90),
        ellipsoid: Cesium.Ellipsoid.WGS84,
        numberOfLevelZeroTilesX: 2,
        numberOfLevelZeroTilesY: 1,
      })
   */
  tilingScheme: {
    type: Object,
    default: undefined
  },

  /**
   * @example new Cesium.Rectangle.fromDegrees(-180, -90, 180, 90)
   */
  rectangle: {
    type: Object,
    default: undefined
  },
  tileDiscardPolicy: {},
  tileHeight: {
    type: Number,
    default: 256
  },
  tileWidth: {
    type: Number,
    default: 256
  },
  enablePickFeatures: {},
  minimumLevel: {
    type: Number,
    default: 0
  },
  maximumLevel: {
    type: Number,
    default: 20
  },
  credit: {}
});
// CONCATENATED MODULE: ./src/components/Layer/RasterLayer.js






function RasterLayer_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function RasterLayer_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { RasterLayer_ownKeys(Object(source), true).forEach(function (key) { Object(defineProperty["a" /* default */])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { RasterLayer_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }


/* harmony default export */ var RasterLayer = ({
  props: RasterLayer_objectSpread({}, RasterOptions),
  inject: ["Cesium", "webGlobe"],
  created: function created() {
    this.imageryLayer = this.createCesiumObject();
    this.mount();
    this.watchProp();
  },
  destroyed: function destroyed() {
    this.unmount();
  },
  methods: {
    createCesiumObject: function createCesiumObject() {
      var $props = this.$props,
          provider = this.provider;
      return new Cesium.ImageryLayer(provider || {}, $props);
    },
    watchProp: function watchProp() {
      var show = this.show,
          alpha = this.alpha;

      if (show) {
        this.$watch("show", function (next) {
          if (this.initial) return;
          this.imageryLayer.show = next;
        });
      }

      if (alpha) {
        this.$watch("alpha", function (next) {
          if (this.initial) return;
          this.imageryLayer.alpha = next;
        });
      }
    },
    mount: function mount() {
      var webGlobe = this.webGlobe,
          imageryLayer = this.imageryLayer,
          layerIndex = this.layerIndex;
      var viewer = webGlobe.viewer;
      viewer.imageryLayers.add(imageryLayer, layerIndex);
      return !viewer.isDestroyed() && viewer.imageryLayers.contains(imageryLayer);
    },
    unmount: function unmount() {
      var webGlobe = this.webGlobe,
          imageryLayer = this.imageryLayer;
      var viewer = webGlobe.viewer;
      return !viewer.isDestroyed() && viewer.imageryLayers.remove(imageryLayer);
    }
  },
  render: function render(createElement) {
    return createElement("span");
  }
});
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Layer/RasterTile/BaseRasterLayer.vue?vue&type=script&lang=js&






function BaseRasterLayervue_type_script_lang_js_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function BaseRasterLayervue_type_script_lang_js_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { BaseRasterLayervue_type_script_lang_js_ownKeys(Object(source), true).forEach(function (key) { Object(defineProperty["a" /* default */])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { BaseRasterLayervue_type_script_lang_js_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }


/* harmony default export */ var BaseRasterLayervue_type_script_lang_js_ = ({
  name: "mapgis-3d-raster-layer",
  mixins: [RasterLayer],
  props: {
    baseUrl: {
      type: String,
      default: null
    }
  },
  methods: {
    createCesiumObject: function createCesiumObject() {
      var $props = this.$props,
          baseUrl = this.baseUrl;
      var opt = $props;

      if (baseUrl) {
        opt = BaseRasterLayervue_type_script_lang_js_objectSpread(BaseRasterLayervue_type_script_lang_js_objectSpread({}, $props), {}, {
          url: baseUrl
        });
      }

      var provider = new Cesium.UrlTemplateImageryProvider(opt);
      return new Cesium.ImageryLayer(provider);
    }
  }
});
// CONCATENATED MODULE: ./src/components/Layer/RasterTile/BaseRasterLayer.vue?vue&type=script&lang=js&
 /* harmony default export */ var RasterTile_BaseRasterLayervue_type_script_lang_js_ = (BaseRasterLayervue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/Layer/RasterTile/BaseRasterLayer.vue
var BaseRasterLayer_render, BaseRasterLayer_staticRenderFns




/* normalize component */

var BaseRasterLayer_component = normalizeComponent(
  RasterTile_BaseRasterLayervue_type_script_lang_js_,
  BaseRasterLayer_render,
  BaseRasterLayer_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var BaseRasterLayer = (BaseRasterLayer_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4746d4ad-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Layer/RasterTile/RasterTileLayer.vue?vue&type=template&id=89d40534&
var RasterTileLayervue_type_template_id_89d40534_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span')}
var RasterTileLayervue_type_template_id_89d40534_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Layer/RasterTile/RasterTileLayer.vue?vue&type=template&id=89d40534&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Layer/RasterTile/RasterTileLayer.vue?vue&type=script&lang=js&






function RasterTileLayervue_type_script_lang_js_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function RasterTileLayervue_type_script_lang_js_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { RasterTileLayervue_type_script_lang_js_ownKeys(Object(source), true).forEach(function (key) { Object(defineProperty["a" /* default */])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { RasterTileLayervue_type_script_lang_js_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

//
//
//

/* harmony default export */ var RasterTileLayervue_type_script_lang_js_ = ({
  name: "mapgis-3d-rastertile-layer",
  inject: ["Cesium", "webGlobe", "CesiumZondy"],
  mixins: [Layer_ServiceLayer],
  props: {
    crs: {
      type: String,
      defalut: "EPSG:4326"
    }
  },
  data: function data() {
    return {
      //监测props
      checkType: {
        visible: "boolean",
        opacity: "number",
        zIndex: "number",
        rectangle: "object",
        tilingScheme: "object",
        ellipsoid: "object",
        tileWidth: "number",
        tileHeight: "number",
        maximumLevel: "number",
        credit: "object|String",
        vueKey: "string",
        vueIndex: "string | Number"
      },
      managerName: "RasterManager",
      providerName: "UrlTemplateImageryProvider"
    };
  },
  created: function created() {},
  mounted: function mounted() {
    this.mount();
  },
  destroyed: function destroyed() {
    this.unmount();
  },
  methods: {
    createCesiumObject: function createCesiumObject() {
      var $props = this.$props;
      var provider = new Cesium.UrlTemplateImageryProvider($props);
      return new Cesium.ImageryLayer(provider);
    },
    mount: function mount() {
      var crs = this.crs,
          baseUrl = this.baseUrl; //先处理相关参数：

      var options = {}; //如果crs存在，则生成tilingScheme对象

      if (crs) {
        options.tilingScheme = this.$_setTilingScheme(crs);
      }

      var allOptions = RasterTileLayervue_type_script_lang_js_objectSpread(RasterTileLayervue_type_script_lang_js_objectSpread({}, options), {}, {
        baseUrl: baseUrl
      });

      this.$_mount(allOptions);
    },
    unmount: function unmount() {
      this.$_unmount();
    }
  }
});
// CONCATENATED MODULE: ./src/components/Layer/RasterTile/RasterTileLayer.vue?vue&type=script&lang=js&
 /* harmony default export */ var RasterTile_RasterTileLayervue_type_script_lang_js_ = (RasterTileLayervue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/Layer/RasterTile/RasterTileLayer.vue





/* normalize component */

var RasterTileLayer_component = normalizeComponent(
  RasterTile_RasterTileLayervue_type_script_lang_js_,
  RasterTileLayervue_type_template_id_89d40534_render,
  RasterTileLayervue_type_template_id_89d40534_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var RasterTileLayer = (RasterTileLayer_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4746d4ad-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Layer/OGC/OGCWMTSLayer.vue?vue&type=template&id=43c7e936&
var OGCWMTSLayervue_type_template_id_43c7e936_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span')}
var OGCWMTSLayervue_type_template_id_43c7e936_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Layer/OGC/OGCWMTSLayer.vue?vue&type=template&id=43c7e936&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Layer/OGC/OGCWMTSLayer.vue?vue&type=script&lang=js&
//
//
//
//

/* harmony default export */ var OGCWMTSLayervue_type_script_lang_js_ = ({
  name: "mapgis-3d-ogc-wmts-layer",
  inject: ["Cesium", "webGlobe"],
  mixins: [Layer_ServiceLayer],
  props: {
    wmtsLayer: {
      type: String,
      required: true
    },
    tileMatrixSet: {
      type: String,
      required: true
    },
    wmtsStyle: {
      type: String,
      default: "default"
    },
    tilingScheme: {
      type: String,
      required: true
    },
    format: {
      type: String,
      default: 'image/png'
    }
  },
  data: function data() {
    return {
      //监测props
      checkType: {
        visible: "boolean",
        opacity: "number",
        zIndex: "number",
        tileMatrixLabels: "array",
        clock: "object",
        times: "object",
        dimensions: "object",
        tileWidth: "number",
        tileHeight: "number",
        tilingScheme: "object",
        rectangle: "object",
        minimumLevel: "number",
        maximumLevel: "number",
        ellipsoid: "object",
        credit: "object|string",
        subdomains: "string|array",
        startLevel: "number",
        vueKey: "string",
        vueIndex: "number"
      },
      managerName: "OGCWMTSManager",
      providerName: "WebMapTileServiceImageryProvider"
    };
  },
  mounted: function mounted() {
    this.mount();
  },
  destroyed: function destroyed() {
    this.unmount();
  },
  watch: {
    wmtsLayer: {
      handler: function handler() {
        this.unmount();
        this.mount();
      }
    },
    tileMatrixSet: {
      handler: function handler() {
        this.unmount();
        this.mount();
      }
    },
    tilingScheme: {
      handler: function handler() {
        this.unmount();
        this.mount();
      }
    },
    wmtsStyle: {
      handler: function handler() {
        this.unmount();
        this.mount();
      }
    }
  },
  methods: {
    mount: function mount() {
      var options = {}; //处理独有参数
      //设置wmts服务的style

      options.style = this.wmtsStyle; //如果tilingScheme存在，则生成tilingScheme对象

      if (this.tilingScheme) {
        options.tilingScheme = this.$_setTilingScheme(this.tilingScheme);
      } //处理天地图的wmts


      var checkTileMatrixLabels = this.$_checkValue(this.options, "tileMatrixLabels", "");

      if (checkTileMatrixLabels === "null" && this.tilingScheme === "EPSG:4326") {
        if (this.baseUrl.indexOf("tianditu") > -1) {
          options.tileMatrixLabels = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"];
        }
      } //将wmtsLayer转为layer


      options.layer = this.wmtsLayer; //将tileMatrixSet转为tileMatrixSetID

      options.tileMatrixSetID = this.tileMatrixSet;
      this.$_mount(options);
    },
    unmount: function unmount() {
      this.$_unmount();
    }
  }
});
// CONCATENATED MODULE: ./src/components/Layer/OGC/OGCWMTSLayer.vue?vue&type=script&lang=js&
 /* harmony default export */ var OGC_OGCWMTSLayervue_type_script_lang_js_ = (OGCWMTSLayervue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/Layer/OGC/OGCWMTSLayer.vue





/* normalize component */

var OGCWMTSLayer_component = normalizeComponent(
  OGC_OGCWMTSLayervue_type_script_lang_js_,
  OGCWMTSLayervue_type_template_id_43c7e936_render,
  OGCWMTSLayervue_type_template_id_43c7e936_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var OGCWMTSLayer = (OGCWMTSLayer_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4746d4ad-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Layer/OGC/OGCWMSLayer.vue?vue&type=template&id=4e15c22c&
var OGCWMSLayervue_type_template_id_4e15c22c_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span')}
var OGCWMSLayervue_type_template_id_4e15c22c_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Layer/OGC/OGCWMSLayer.vue?vue&type=template&id=4e15c22c&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Layer/OGC/OGCWMSLayer.vue?vue&type=script&lang=js&
//
//
//
//

/* harmony default export */ var OGCWMSLayervue_type_script_lang_js_ = ({
  name: "mapgis-3d-ogc-wms-layer",
  inject: ["Cesium", "webGlobe"],
  mixins: [Layer_ServiceLayer],
  props: {
    layers: {
      type: String,
      required: true
    },
    styles: {
      type: String
    },
    // crs: { type: String },
    srs: {
      type: String
    }
  },
  data: function data() {
    return {
      //监测props
      checkType: {
        visible: "boolean",
        opacity: "number",
        zIndex: "number",
        parameters: "object",
        getFeatureInfoParameters: "object",
        enablePickFeatures: "object",
        getFeatureInfoFormats: "array",
        rectangle: "object",
        tilingScheme: "object",
        ellipsoid: "object",
        tileWidth: "number",
        tileHeight: "number",
        minimumLevel: "number",
        maximumLevel: "number",
        credit: "object|String",
        subdomains: "string|array",
        clock: "object",
        times: "object",
        proxy: "object",
        vueKey: "string",
        vueIndex: "string|number"
      },
      managerName: "OGCWMSManager",
      providerName: "WebMapServiceImageryProvider"
    };
  },
  mounted: function mounted() {
    this.mount();
  },
  destroyed: function destroyed() {
    this.unmount();
  },
  watch: {
    layers: {
      handler: function handler() {
        this.unmount();
        this.mount();
      }
    },
    styles: {
      handler: function handler() {
        this.unmount();
        this.mount();
      }
    },
    srs: {
      handler: function handler() {
        this.unmount();
        this.mount();
      }
    } // crs: {
    //   handler: function() {
    //     this.unmount();
    //     this.mount();
    //   }
    // }

  },
  methods: {
    mount: function mount() {
      var srs = this.srs;
      var opt = {}; //处理独有参数
      //如果srs或crs存在，则生成tilingScheme对象，动态投影会用到

      if (srs) {
        opt.tilingScheme = this.$_setTilingScheme(srs);
      }

      this.$_mount(opt);
    },
    unmount: function unmount() {
      this.$_unmount();
    }
  }
});
// CONCATENATED MODULE: ./src/components/Layer/OGC/OGCWMSLayer.vue?vue&type=script&lang=js&
 /* harmony default export */ var OGC_OGCWMSLayervue_type_script_lang_js_ = (OGCWMSLayervue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/Layer/OGC/OGCWMSLayer.vue





/* normalize component */

var OGCWMSLayer_component = normalizeComponent(
  OGC_OGCWMSLayervue_type_script_lang_js_,
  OGCWMSLayervue_type_template_id_4e15c22c_render,
  OGCWMSLayervue_type_template_id_4e15c22c_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var OGCWMSLayer = (OGCWMSLayer_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4746d4ad-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Layer/IGServer/IgsVectorLayer.vue?vue&type=template&id=25399809&
var IgsVectorLayervue_type_template_id_25399809_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span')}
var IgsVectorLayervue_type_template_id_25399809_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Layer/IGServer/IgsVectorLayer.vue?vue&type=template&id=25399809&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Layer/IGServer/IgsVectorLayer.vue?vue&type=script&lang=js&

//
//
//

/* harmony default export */ var IgsVectorLayervue_type_script_lang_js_ = ({
  name: "mapgis-3d-igs-vector-layer",
  mixins: [Layer_ServiceLayer],
  props: {
    gdbps: {
      type: [Array, String],
      require: true
    }
  },
  data: function data() {
    return {
      managerName: "IgsserverManager",
      providerName: "MapGIS2DDocMapProvider",
      checkType: {
        tileWidth: "number",
        tileHeight: "number",
        minimumLevel: "number",
        maximumLevel: "number"
      }
    };
  },
  mounted: function mounted() {
    this.mount();
  },
  destroyed: function destroyed() {
    this.unmount();
  },
  watch: {
    gdbps: {
      handler: function handler() {
        this.unmount();
        this.mount();
      }
    }
  },
  methods: {
    initUrl: function initUrl(service) {
      var _url; //优先判断url方式


      if (this.baseUrl) {
        _url = this.baseUrl;
      } else if (this.domain) {
        _url = this.domain + service;
      } else {
        //最后ip方式
        if (this.ip && this.port) {
          _url = this.protocol + this.ip + ":" + this.port + service;
        } else {
          throw new Error("请输入url地址信息");
        }
      }

      return _url;
    },
    mount: function mount() {
      //处理独有参数
      var baseUrl = this.initUrl("/igs/rest/mrms/layers");
      var gdbps = this.gdbps;

      if (typeof gdbps === "string") {
        gdbps = gdbps.split(",");
      }

      this.$_mount({
        baseUrl: baseUrl,
        gdbps: gdbps
      });
    },
    unmount: function unmount() {
      this.$_unmount();
    }
  }
});
// CONCATENATED MODULE: ./src/components/Layer/IGServer/IgsVectorLayer.vue?vue&type=script&lang=js&
 /* harmony default export */ var IGServer_IgsVectorLayervue_type_script_lang_js_ = (IgsVectorLayervue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/Layer/IGServer/IgsVectorLayer.vue





/* normalize component */

var IgsVectorLayer_component = normalizeComponent(
  IGServer_IgsVectorLayervue_type_script_lang_js_,
  IgsVectorLayervue_type_template_id_25399809_render,
  IgsVectorLayervue_type_template_id_25399809_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var IgsVectorLayer = (IgsVectorLayer_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4746d4ad-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Layer/ArcGISServer/ArcGISTileLayer.vue?vue&type=template&id=fb601eea&scoped=true&
var ArcGISTileLayervue_type_template_id_fb601eea_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span')}
var ArcGISTileLayervue_type_template_id_fb601eea_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Layer/ArcGISServer/ArcGISTileLayer.vue?vue&type=template&id=fb601eea&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Layer/ArcGISServer/ArcGISTileLayer.vue?vue&type=script&lang=js&
//
//
//

/* harmony default export */ var ArcGISTileLayervue_type_script_lang_js_ = ({
  name: "mapgis-3d-arcgis-tile-layer",
  data: function data() {
    return {
      //监测props
      checkType: {
        visible: "boolean",
        opacity: "number",
        zIndex: "number",
        vueKey: "string",
        vueIndex: "string | Number"
      },
      managerName: "ArcgisManager",
      providerName: "ArcGisMapServerImageryProvider"
    };
  },
  inject: ["Cesium", "CesiumZondy"],
  mixins: [Layer_ServiceLayer],
  created: function created() {},
  mounted: function mounted() {
    this.mount();
  },
  destroyed: function destroyed() {
    this.unmount();
  },
  methods: {
    mount: function mount() {
      this.$_mount();
    },
    unmount: function unmount() {
      this.$_unmount();
    }
  }
});
// CONCATENATED MODULE: ./src/components/Layer/ArcGISServer/ArcGISTileLayer.vue?vue&type=script&lang=js&
 /* harmony default export */ var ArcGISServer_ArcGISTileLayervue_type_script_lang_js_ = (ArcGISTileLayervue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/Layer/ArcGISServer/ArcGISTileLayer.vue





/* normalize component */

var ArcGISTileLayer_component = normalizeComponent(
  ArcGISServer_ArcGISTileLayervue_type_script_lang_js_,
  ArcGISTileLayervue_type_template_id_fb601eea_scoped_true_render,
  ArcGISTileLayervue_type_template_id_fb601eea_scoped_true_staticRenderFns,
  false,
  null,
  "fb601eea",
  null
  
)

/* harmony default export */ var ArcGISTileLayer = (ArcGISTileLayer_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4746d4ad-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Layer/ArcGISServer/ArcGISMapLayer.vue?vue&type=template&id=a2b1ecda&scoped=true&
var ArcGISMapLayervue_type_template_id_a2b1ecda_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span')}
var ArcGISMapLayervue_type_template_id_a2b1ecda_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Layer/ArcGISServer/ArcGISMapLayer.vue?vue&type=template&id=a2b1ecda&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Layer/ArcGISServer/ArcGISMapLayer.vue?vue&type=script&lang=js&







function ArcGISMapLayervue_type_script_lang_js_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function ArcGISMapLayervue_type_script_lang_js_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ArcGISMapLayervue_type_script_lang_js_ownKeys(Object(source), true).forEach(function (key) { Object(defineProperty["a" /* default */])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ArcGISMapLayervue_type_script_lang_js_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

//
//
//
//

/* harmony default export */ var ArcGISMapLayervue_type_script_lang_js_ = ({
  name: "mapgis-3d-arcgis-map-layer",
  props: {
    srs: {
      type: String,
      defalut: "EPSG:4326"
    },
    layers: {
      type: String
    }
  },
  data: function data() {
    return {
      //监测props
      checkType: {
        visible: "boolean",
        opacity: "number",
        zIndex: "number",
        rectangle: "object",
        tilingScheme: "object",
        ellipsoid: "object",
        tileWidth: "number",
        tileHeight: "number",
        maximumLevel: "number",
        credit: "object|String",
        vueKey: "string",
        vueIndex: "string | Number"
      },
      managerName: "ArcgisManager",
      providerName: "ArcGisMapServerImageryProvider"
    };
  },
  inject: ["Cesium", "webGlobe", "CesiumZondy"],
  mixins: [Layer_ServiceLayer],
  created: function created() {},
  mounted: function mounted() {
    this.mount();
  },
  destroyed: function destroyed() {
    this.unmount();
  },
  watch: {
    srs: {
      handler: function handler() {
        this.unmount();
        this.mount();
      }
    },
    layers: {
      handler: function handler() {
        this.unmount();
        this.mount();
      }
    }
  },
  methods: {
    initUrl: function initUrl() {
      if (this.baseUrl) {
        var url = this.baseUrl;

        var _url = url + "/export";

        return _url;
      }
    },
    mount: function mount() {
      //先处理相关参数：
      var options = {};
      var layers = this.layers;

      if (layers) {
        if (layers.indexOf("show") >= 0) {
          layers = this.layers.replace("show:", "");
        }
      }

      var baseUrl = this.initUrl(); //tilingScheme，则生成tilingScheme对象

      if (this.srs) {
        options.tilingScheme = this.$_setTilingScheme(this.srs);
      }

      ;

      var allOptions = ArcGISMapLayervue_type_script_lang_js_objectSpread(ArcGISMapLayervue_type_script_lang_js_objectSpread({}, options), {}, {
        layers: layers,
        baseUrl: baseUrl
      });

      this.$_mount(allOptions);
    },
    unmount: function unmount() {
      this.$_unmount();
    }
  }
});
// CONCATENATED MODULE: ./src/components/Layer/ArcGISServer/ArcGISMapLayer.vue?vue&type=script&lang=js&
 /* harmony default export */ var ArcGISServer_ArcGISMapLayervue_type_script_lang_js_ = (ArcGISMapLayervue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/Layer/ArcGISServer/ArcGISMapLayer.vue





/* normalize component */

var ArcGISMapLayer_component = normalizeComponent(
  ArcGISServer_ArcGISMapLayervue_type_script_lang_js_,
  ArcGISMapLayervue_type_template_id_a2b1ecda_scoped_true_render,
  ArcGISMapLayervue_type_template_id_a2b1ecda_scoped_true_staticRenderFns,
  false,
  null,
  "a2b1ecda",
  null
  
)

/* harmony default export */ var ArcGISMapLayer = (ArcGISMapLayer_component.exports);
// CONCATENATED MODULE: ./src/components/Layer/VectorTile/VectorTileOptions.js

/* harmony default export */ var VectorTileOptions = ({
  /**
   * @type String
   * @description 该key的主要作用市用来记录Cesium的Source,primitive,
   * entity的内存中的引用数组的引用，从而避免vue对cesium的内存劫持
   */
  vueKey: {
    type: String,
    default: "default"
  },

  /**
   * @type String
   * @description 该key的主要作用市用来记录Cesium的Source,primitive,
   * entity的内存中的引用数组的下标，从而避免vue对cesium的内存劫持
   */
  vueIndex: {
    type: [String, Number],
    default: (Math.random() * 10000).toFixed(0)
  },

  /**
   * @type Cesium.Resource.headers
   * @example headers: { "szvsud-license-key": '3AE2IROq5nGn5K/+zQlUxSoHoNdjCoS1l5567rK5SKjHfRbQIvhtbInd7S9X6bFl' },
   */
  headers: {},

  /**
   * @description 地图服务ip
   */
  ip: {
    type: String
  },

  /**
   * @description 地图服务port
   */
  port: {
    type: Number
  },

  /**
   * @description 地图名
   */
  layerName: {
    type: String
  },

  /**
   * @description 样式json文件路径或者MVT-JSON对象，当为url时等于styleUrl；
   * 当为vectortilejson等于vectortilejson
   */
  mvtStyle: {
    type: [String, Object]
  },

  /**
   * @description 样式json文件路径,有styleUrl就可以直接读取styleUrl里的信息;不然就是加载中地发布的矢量瓦片，使用ip，port和layerName先拼接styleUrl路径再进行查询。
   */
  styleUrl: {
    type: String
  },

  /**
   * @description 矢量瓦片json对象,直接取json对象，不需要再去请求。
   */
  vectortilejson: {
    type: Object
  },

  /**
   * @type String | Cesium.TilingScheme
   * @description 矢量瓦片瓦片切分规则：经纬度还是墨卡托
   */
  tilingScheme: {
    type: [String, Object]
  },

  /**
   * @description 第三方需要的token，比如mapbox
   */
  token: {
    type: String
  },

  /**
   * @description 是否可见
   */
  show: {
    type: Boolean,
    default: true
  }
});
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Layer/VectorTile/VectorTileLayer.vue?vue&type=script&lang=js&







function VectorTileLayervue_type_script_lang_js_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function VectorTileLayervue_type_script_lang_js_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { VectorTileLayervue_type_script_lang_js_ownKeys(Object(source), true).forEach(function (key) { Object(defineProperty["a" /* default */])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { VectorTileLayervue_type_script_lang_js_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }


/* harmony default export */ var VectorTileLayervue_type_script_lang_js_ = ({
  name: "mapgis-3d-vectortile-layer",
  props: VectorTileLayervue_type_script_lang_js_objectSpread({}, VectorTileOptions),
  inject: ["Cesium", "webGlobe", "CesiumZondy"],
  created: function created() {},
  mounted: function mounted() {
    this.mount();
    this.watchProp();
  },
  destroyed: function destroyed() {
    this.unmount();
  },
  methods: {
    createCesiumObject: function createCesiumObject() {
      var $props = this.$props,
          webGlobe = this.webGlobe,
          CesiumZondy = this.CesiumZondy;
      var tilingScheme = $props.tilingScheme;
      var viewer = webGlobe.viewer;
      var tileScheme;

      if (typeof tilingScheme === 'string') {
        tileScheme = this.checkTiling(tilingScheme);
      } else {
        tileScheme = tilingScheme;
      }

      var opt = VectorTileLayervue_type_script_lang_js_objectSpread(VectorTileLayervue_type_script_lang_js_objectSpread({}, $props), {}, {
        tilingScheme: tileScheme
      });

      return new CesiumZondy.Overlayer.VectorTileLayer(viewer, opt);
    },
    checkTiling: function checkTiling(tileMatrixSetName) {
      var tilingScheme;

      if (tileMatrixSetName === "EPSG:4326" || tileMatrixSetName === "EPSG:4490" || tileMatrixSetName === "EPSG:4610" || tileMatrixSetName === "EPSG:4214") {
        tilingScheme = new Cesium.GeographicTilingScheme();
      } else if (tileMatrixSetName === "EPSG:3857") {
        tilingScheme = new Cesium.WebMercatorTilingScheme();
      } else {
        tilingScheme = new Cesium.GeographicTilingScheme();
      }

      return tilingScheme;
    },
    watchProp: function watchProp() {
      var CesiumZondy = this.CesiumZondy,
          webGlobe = this.webGlobe,
          vueKey = this.vueKey,
          vueIndex = this.vueIndex,
          show = this.show,
          mvtStyle = this.mvtStyle,
          vectortilejson = this.vectortilejson;
      var viewer = webGlobe.viewer;
      var find = CesiumZondy.VectorTileManager.findSource(vueKey, vueIndex);

      if (show) {
        this.$watch("show", function (next) {
          if (this.initial) return;

          if (find) {
            !viewer.isDestroyed() && find.source.setVisible(next);
          }
        });
      }

      if (mvtStyle) {
        this.$watch("mvtStyle", {
          handler: function handler(nextStyle) {
            if (_typeof(nextStyle) === "object") {
              !viewer.isDestroyed() && this.$vectortile.updateStyle(nextStyle);
            }
          },
          deep: true
        });
      }

      if (vectortilejson) {
        this.$watch("vectortilejson", {
          handler: function handler(nextStyle) {
            if (_typeof(nextStyle) === "object") {
              !viewer.isDestroyed() && this.$vectortile.updateStyle(nextStyle);
            }
          },
          deep: true
        });
      }
    },
    updateStyle: function updateStyle(style) {
      this.$vectortile.updateStyle(style);
    },
    mount: function mount() {
      var webGlobe = this.webGlobe,
          vueIndex = this.vueIndex,
          vueKey = this.vueKey,
          CesiumZondy = this.CesiumZondy;
      var viewer = webGlobe.viewer;
      if (viewer.isDestroyed()) return;
      this.$emit("load", this);
      var vectortile = this.createCesiumObject();
      this.$vectortile = vectortile;

      if (vueKey && vueIndex) {
        CesiumZondy.VectorTileManager.addSource(vueKey, vueIndex, vectortile);
      }
    },
    unmount: function unmount() {
      var webGlobe = this.webGlobe,
          vueKey = this.vueKey,
          vueIndex = this.vueIndex,
          CesiumZondy = this.CesiumZondy;
      var viewer = webGlobe.viewer;
      var find = CesiumZondy.VectorTileManager.findSource(vueKey, vueIndex);

      if (find) {
        !viewer.isDestroyed() && find.source.destroy();
      }

      CesiumZondy.VectorTileManager.deleteSource(vueKey, vueIndex);
    }
  },
  render: function render(createElement) {
    return createElement("span");
  }
});
// CONCATENATED MODULE: ./src/components/Layer/VectorTile/VectorTileLayer.vue?vue&type=script&lang=js&
 /* harmony default export */ var VectorTile_VectorTileLayervue_type_script_lang_js_ = (VectorTileLayervue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/Layer/VectorTile/VectorTileLayer.vue
var VectorTileLayer_render, VectorTileLayer_staticRenderFns




/* normalize component */

var VectorTileLayer_component = normalizeComponent(
  VectorTile_VectorTileLayervue_type_script_lang_js_,
  VectorTileLayer_render,
  VectorTileLayer_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var VectorTileLayer = (VectorTileLayer_component.exports);
// CONCATENATED MODULE: ./src/components/M3D/3DTilesetOptions.js

/* harmony default export */ var _3DTilesetOptions = ({
  /**
   * @type String
   * @description 该key的主要作用市用来记录Cesium的Source,primitive,
   * entity的内存中的引用数组的引用，从而避免vue对cesium的内存劫持
   */
  vueKey: {
    type: String,
    default: "default"
  },

  /**
   * @type String
   * @description 该key的主要作用市用来记录Cesium的Source,primitive,
   * entity的内存中的引用数组的下标，从而避免vue对cesium的内存劫持
   */
  vueIndex: {
    type: [String, Number],
    default: (Math.random() * 10000).toFixed(0)
  },

  /**
   * @type Cesium.Resource.headers
   * @example headers: { "szvsud-license-key": '3AE2IROq5nGn5K/+zQlUxSoHoNdjCoS1l5567rK5SKjHfRbQIvhtbInd7S9X6bFl' },
   */
  headers: {},
  url: {
    type: String,
    required: true
  },
  show: {
    type: Boolean,
    default: true
  },
  autoReset: {
    type: Boolean,
    default: true
  },

  /**
   * @type Cesium.Matrix4
   * @default Matrix4.IDENTITY
   */

  /* modelMatrix: { type: Object, default: undefined }, */

  /**
   * @type Cesium.ShadowMode
   * @default ShadowMode.ENABLED
   */

  /* shadows: { type: Object, default: undefined }, */
  maximumScreenSpaceError: {
    type: Number,
    default: 16
  },
  maximumMemoryUsage: {
    type: Number,
    default: 512
  },
  cullWithChildrenBounds: {
    type: Boolean,
    default: true
  },
  cullRequestsWhileMoving: {
    type: Boolean,
    default: true
  },
  cullRequestsWhileMovingMultiplier: {
    type: Number,
    default: 60.0
  },
  preloadWhenHidden: {
    type: Boolean,
    default: false
  },
  preloadFlightDestinations: {
    type: Boolean,
    default: true
  },
  preferLeaves: {
    type: Boolean,
    default: false
  },
  dynamicScreenSpaceError: {
    type: Boolean,
    default: false
  },
  dynamicScreenSpaceErrorDensity: {
    type: Number,
    default: 0.00278
  },
  dynamicScreenSpaceErrorFactor: {
    type: Number,
    default: 4.0
  },
  dynamicScreenSpaceErrorHeightFalloff: {
    type: Number,
    default: 0.25
  },
  progressiveResolutionHeightFraction: {
    type: Number,
    default: 0.3
  },
  foveatedScreenSpaceError: {
    type: Boolean,
    default: true
  },
  foveatedConeSize: {
    type: Number,
    default: 0.1
  },
  foveatedMinimumScreenSpaceErrorRelaxation: {
    type: Number,
    default: 0.0
  },

  /**
   * @type Cesium3DTileset~foveatedInterpolationCallback
   * @default Cesium.Math.lerp
   */

  /* foveatedInterpolationCallback: { type: Function, default: undefined }, */
  foveatedTimeDelay: {
    type: Number,
    default: 0.2
  },
  skipLevelOfDetail: {
    type: Boolean,
    default: false
  },
  baseScreenSpaceError: {
    type: Number,
    default: 1024
  },
  skipScreenSpaceErrorFactor: {
    type: Number,
    default: 16
  },
  skipLevels: {
    type: Number,
    default: 1
  },
  immediatelyLoadDesiredLevelOfDetail: {
    type: Boolean,
    default: false
  },
  loadSiblings: {
    type: Boolean,
    default: false
  },

  /**
   * @type Cesium.ClippingPlaneCollection
   */

  /* clippingPlanes: { type: Object, default: undefined }, */

  /**
   * @type Cesium.ClassificationType
   */

  /* classificationType: { type: Object, default: undefined }, */

  /**
   * @type Cesium.Ellipsoid
   * @default Ellipsoid.WGS84
   */

  /* ellipsoid: { type: Object, default: undefined }, */

  /* pointCloudShading: { type: Object, default: undefined }, */

  /**
   * @type Cartesian2
   * @default new Cartesian2(1.0, 1.0)
   */

  /* imageBasedLightingFactor: { type: Object, default: undefined }, */

  /**
   * @type Cartesian3
   */

  /* lightColor: { type: Object, default: undefined }, */
  luminanceAtZenith: {
    type: Number,
    default: 0.2
  },

  /**
   * @type Array.<Cartesian3>
   */

  /* sphericalHarmonicCoefficients: { type: Array, default: undefined }, */
  specularEnvironmentMaps: {
    type: String,
    default: ""
  },
  debugHeatmapTilePropertyName: {
    type: String,
    default: ""
  },
  debugFreezeFrame: {
    type: Boolean,
    default: false
  },
  debugColorizeTiles: {
    type: Boolean,
    default: false
  },
  debugWireframe: {
    type: Boolean,
    default: false
  },
  debugShowBoundingVolume: {
    type: Boolean,
    default: false
  },
  debugShowContentBoundingVolume: {
    type: Boolean,
    default: false
  },
  debugShowViewerRequestVolume: {
    type: Boolean,
    default: false
  },
  debugShowGeometricError: {
    type: Boolean,
    default: false
  },
  debugShowRenderingStatistics: {
    type: Boolean,
    default: false
  },
  debugShowMemoryUsage: {
    type: Boolean,
    default: false
  },
  debugShowUrl: {
    type: Boolean,
    default: false
  }
});
// CONCATENATED MODULE: ./src/components/M3D/3DTileset.js






function _3DTileset_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _3DTileset_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { _3DTileset_ownKeys(Object(source), true).forEach(function (key) { Object(defineProperty["a" /* default */])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { _3DTileset_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }


/* harmony default export */ var _3DTileset = ({
  props: _3DTileset_objectSpread({}, _3DTilesetOptions),
  inject: ["Cesium", "webGlobe"],
  created: function created() {},
  mounted: function mounted() {
    this.mount(); // this.watchProp();
  },
  destroyed: function destroyed() {
    this.unmount();
  },
  methods: {
    createCesiumObject: function createCesiumObject() {
      var $props = this.$props;
      return new Cesium.Cesium3DTileset($props);
    },
    watchProp: function watchProp() {
      var show = this.show;

      if (show) {
        this.$watch("show", function (next) {
          if (this.initial) return; // this.tileset.show = next;
        });
      }
    },
    mount: function mount() {
      var webGlobe = this.webGlobe,
          autoReset = this.autoReset,
          vueIndex = this.vueIndex,
          vueKey = this.vueKey;
      var viewer = webGlobe.viewer;
      if (viewer.isDestroyed()) return;
      this.$emit("load", this);
      var tileset = this.createCesiumObject();

      if (vueKey && vueIndex) {
        window.CesiumZondy.Tileset3DManager.addSource(vueKey, vueIndex, tileset);
      }

      viewer.scene.primitives.add(tileset);
      tileset.readyPromise.then(function (primitives) {
        // viewer.scene.primitives.add(primitives);
        if (autoReset) {
          viewer.zoomTo(primitives, new Cesium.HeadingPitchRange(0.0, -0.5, primitives.boundingSphere.radius * 2.0));
        }
      }).otherwise(function (error) {
        console.error("3dtileset", error);
      });
    },
    unmount: function unmount() {
      var webGlobe = this.webGlobe,
          vueKey = this.vueKey,
          vueIndex = this.vueIndex;
      var viewer = webGlobe.viewer;
      var find = window.CesiumZondy.Tileset3DManager.findSource(vueKey, vueIndex);

      if (find) {
        !viewer.isDestroyed() && viewer.scene.primitives.remove(find.source);
        find.source.destroy && find.source.destroy();
      }

      window.CesiumZondy.Tileset3DManager.deleteSource(vueKey, vueIndex);
    }
  },
  render: function render(createElement) {
    return createElement("span");
  }
});
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/M3D/M3dFile.vue?vue&type=script&lang=js&







function M3dFilevue_type_script_lang_js_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function M3dFilevue_type_script_lang_js_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { M3dFilevue_type_script_lang_js_ownKeys(Object(source), true).forEach(function (key) { Object(defineProperty["a" /* default */])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { M3dFilevue_type_script_lang_js_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }


/* harmony default export */ var M3dFilevue_type_script_lang_js_ = ({
  name: "mapgis-3d-file-m3d",
  mixins: [_3DTileset],
  props: {
    layerRenderIndex: {
      type: Number,
      default: 0
    },
    layerIndex: {
      type: Number,
      default: 0
    },
    gdbpUrl: {
      type: String,
      default: ""
    },
    show: {
      type: Boolean,
      default: true
    },
    igserver: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    createCesiumObject: function createCesiumObject() {
      var $props = this.$props,
          url = this.url;

      var options = M3dFilevue_type_script_lang_js_objectSpread(M3dFilevue_type_script_lang_js_objectSpread({}, $props), {}, {
        igserver: false,
        url: url
      });

      var tileset = new Cesium.MapGISM3DSet(options);
      return tileset;
    },
    mount: function mount() {
      var webGlobe = this.webGlobe,
          tileset = this.tileset,
          autoReset = this.autoReset;
      var viewer = webGlobe.viewer;
      if (viewer.isDestroyed()) return;
      tileset.readyPromise.then(function (primitives) {
        viewer.scene.primitives.add(primitives);
        var boundingSphere = primitives.boundingSphere;

        if (autoReset) {
          viewer.camera.viewBoundingSphere(boundingSphere, new Cesium.HeadingPitchRange(0.0, -0.5, boundingSphere.radius));
        }

        viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
        var cartographic = Cesium.Cartographic.fromCartesian(primitives.boundingSphere.center);
        var surface = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0.0);
        var offset = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0.0);
        var translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3());
        primitives.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
        if (autoReset) webGlobe.zoomToM3dLayer(primitives);
      }).otherwise(function (error) {
        console.error("3dtileset", error);
      });
    },
    unmount: function unmount() {
      var webGlobe = this.webGlobe,
          tileset = this.tileset;
      var viewer = webGlobe.viewer;
      return !viewer.isDestroyed() && viewer.scene.primitives.remove(tileset);
    }
  }
});
// CONCATENATED MODULE: ./src/components/M3D/M3dFile.vue?vue&type=script&lang=js&
 /* harmony default export */ var M3D_M3dFilevue_type_script_lang_js_ = (M3dFilevue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/M3D/M3dFile.vue
var M3dFile_render, M3dFile_staticRenderFns




/* normalize component */

var M3dFile_component = normalizeComponent(
  M3D_M3dFilevue_type_script_lang_js_,
  M3dFile_render,
  M3dFile_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var M3dFile = (M3dFile_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/M3D/M3d.vue?vue&type=script&lang=js&






function M3dvue_type_script_lang_js_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function M3dvue_type_script_lang_js_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { M3dvue_type_script_lang_js_ownKeys(Object(source), true).forEach(function (key) { Object(defineProperty["a" /* default */])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { M3dvue_type_script_lang_js_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }


/* harmony default export */ var M3dvue_type_script_lang_js_ = ({
  name: "mapgis-3d-igs-m3d",
  inject: ["Cesium", "CesiumZondy", "webGlobe"],
  props: M3dvue_type_script_lang_js_objectSpread({}, _3DTilesetOptions),
  created: function created() {},
  mounted: function mounted() {
    this.mount();
    this.watchProp();
  },
  destroyed: function destroyed() {
    this.unmount();
  },
  methods: {
    createCesiumObject: function createCesiumObject() {
      var CesiumZondy = this.CesiumZondy,
          webGlobe = this.webGlobe;
      var m3dLayer = new CesiumZondy.Layer.M3DLayer({
        viewer: webGlobe.viewer
      });
      return m3dLayer;
    },
    watchProp: function watchProp() {
      var show = this.show;

      if (show) {
        this.$watch("show", function (next) {
          if (this.initial) return;
          this.changeShow(next);
        });
      }
    },
    onM3dLoaded: function onM3dLoaded(e) {},
    mount: function mount() {
      var vm = this;
      var webGlobe = this.webGlobe,
          vueIndex = this.vueIndex,
          vueKey = this.vueKey,
          $props = this.$props;
      var viewer = webGlobe.viewer;
      if (viewer.isDestroyed()) return;
      this.$emit("load", {
        component: this
      });
      var m3dLayer = this.createCesiumObject();
      var m3ds = m3dLayer.append("".concat(this.url), M3dvue_type_script_lang_js_objectSpread(M3dvue_type_script_lang_js_objectSpread({}, $props), {}, {
        loaded: function loaded() {
          if (vueKey && vueIndex) {
            CesiumZondy.M3DIgsManager.addSource(vueKey, vueIndex, m3ds);
            !vm.show && m3ds && m3ds.forEach(function (m3d) {
              return m3d.show = vm.show;
            });
          }
        }
      }));
    },
    unmount: function unmount() {
      var webGlobe = this.webGlobe,
          CesiumZondy = this.CesiumZondy,
          vueKey = this.vueKey,
          vueIndex = this.vueIndex;
      var viewer = webGlobe.viewer;
      var find = CesiumZondy.M3DIgsManager.findSource(vueKey, vueIndex);

      if (find) {
        var m3ds = find.source;
        !viewer.isDestroyed() && m3ds && m3ds.forEach(function (l) {
          l.destroy();
        });
      }

      this.$emit("unload", {
        component: this
      });
      CesiumZondy.M3DIgsManager.deleteSource(vueKey, vueIndex);
    },
    changeShow: function changeShow(show) {
      var find = CesiumZondy.M3DIgsManager.findSource(vueKey, vueIndex);

      if (find) {
        var m3ds = find.source;
        m3ds && m3ds.forEach(function (m3d) {
          m3d.show = show;
          console.log(m3d.show);
        });
      }
    }
  },
  render: function render(h) {
    return h("span", {
      class: "mapgis-3d-igs-m3d",
      ref: "m3d"
    });
  }
});
// CONCATENATED MODULE: ./src/components/M3D/M3d.vue?vue&type=script&lang=js&
 /* harmony default export */ var M3D_M3dvue_type_script_lang_js_ = (M3dvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/M3D/M3d.vue
var M3d_render, M3d_staticRenderFns




/* normalize component */

var M3d_component = normalizeComponent(
  M3D_M3dvue_type_script_lang_js_,
  M3d_render,
  M3d_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var M3d = (M3d_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/M3D/3dTileset.vue?vue&type=script&lang=js&






function _3dTilesetvue_type_script_lang_js_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _3dTilesetvue_type_script_lang_js_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { _3dTilesetvue_type_script_lang_js_ownKeys(Object(source), true).forEach(function (key) { Object(defineProperty["a" /* default */])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { _3dTilesetvue_type_script_lang_js_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }


/* harmony default export */ var _3dTilesetvue_type_script_lang_js_ = ({
  name: "mapgis-3d-tileset",
  mixins: [_3DTileset],
  methods: {
    createCesiumObject: function createCesiumObject() {
      var $props = this.$props,
          url = this.url;
      var headers = $props.headers;
      var urlSource = undefined;

      if (headers) {
        urlSource = new Cesium.Resource({
          url: url,
          headers: headers
        });
      } else {
        urlSource = url;
      }

      var options = _3dTilesetvue_type_script_lang_js_objectSpread(_3dTilesetvue_type_script_lang_js_objectSpread({}, $props), {}, {
        url: urlSource
      });

      var tileset = new Cesium.Cesium3DTileset(options);
      return tileset;
    }
  }
});
// CONCATENATED MODULE: ./src/components/M3D/3dTileset.vue?vue&type=script&lang=js&
 /* harmony default export */ var M3D_3dTilesetvue_type_script_lang_js_ = (_3dTilesetvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/M3D/3dTileset.vue
var _3dTileset_render, _3dTileset_staticRenderFns




/* normalize component */

var _3dTileset_component = normalizeComponent(
  M3D_3dTilesetvue_type_script_lang_js_,
  _3dTileset_render,
  _3dTileset_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var _3dTileset = (_3dTileset_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4746d4ad-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/UI/Popup/Popup.vue?vue&type=template&id=679a388f&
var Popupvue_type_template_id_679a388f_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticStyle:{"display":"none"}},[_vm._t("default")],2)}
var Popupvue_type_template_id_679a388f_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/UI/Popup/Popup.vue?vue&type=template&id=679a388f&

// CONCATENATED MODULE: ./src/components/UI/Popup/PopupOptions.js

/* harmony default export */ var PopupOptions = ({
  /**
   * @type String
   * @description 该key的主要作用市用来记录Cesium的Source,primitive,
   * entity的内存中的引用数组的引用，从而避免vue对cesium的内存劫持
   */
  vueKey: {
    typs: String,
    default: "default"
  },

  /**
   * @type String
   * @description 该key的主要作用市用来记录Cesium的Source,primitive,
   * entity的内存中的引用数组的下标，从而避免vue对cesium的内存劫持
   */
  vueIndex: {
    typs: [String, Number],
    default: function _default() {
      return (Math.random() * 100000000).toFixed(0);
    }
  },

  /**
   * @param {Entity} [position.entity]  实体,内部获取坐标点cartesian, 输入此参数可忽略下面的，cartesian，longitude,latitude
   * @param {Cartesian3} [position.cartesian] 笛卡尔积坐标点cartesian, 输入此参数可忽略下面的longitude,latitude
   * @param {Number} [position.longitude] 经度, 先判断cartesian是否存在，存在忽略此参数
   * @param {Number} [position.latitude] 纬度, 先判断cartesian是否存在，存在忽略此参数
   * @param {Number}  [position.height] 高度, 可选 默认0
   */
  position: {
    type: Object,
    required: true
  },

  /**
   * @param {String} [options.popupId] 本次popup对应的唯一id,不传随机生成
   * @param {String} [options.popupContentId] 本次popup对应的唯一内容id
   * @param {Boolean} [options.postRender=true] 是否实时渲染
   * @param {Boolean} [options.showClose=true]  是否显示关闭按钮
   */
  options: {
    type: Object,
    default: function _default() {
      return {
        postRender: true
      };
    }
  },

  /**
   * @param {String} container 外部传入的div的字符串描述方式，一般是文字或者echarts的div;
   */
  container: {
    type: String,
    default: "<div>空</div>"
  },

  /**
   *  @param {Boolean} visible(v-model) 对话框是否可见
   */
  visible: {
    type: Boolean,
    default: true
  },

  /**
   * @param {Boolean} destroyOnClose 关闭时销毁 Modal 里的子元素
   */
  destroyOnClose: {
    type: Boolean,
    default: false
  },

  /**
   * @param {Boolean} forceRender 强制渲染poup显示的Dom元素
   */
  forceRender: {
    type: Boolean,
    default: false
  }
});
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/UI/Popup/Popup.vue?vue&type=script&lang=js&






function Popupvue_type_script_lang_js_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function Popupvue_type_script_lang_js_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { Popupvue_type_script_lang_js_ownKeys(Object(source), true).forEach(function (key) { Object(defineProperty["a" /* default */])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { Popupvue_type_script_lang_js_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

//
//
//
//
//

/* harmony default export */ var Popupvue_type_script_lang_js_ = ({
  name: "mapgis-3d-popup",
  props: Popupvue_type_script_lang_js_objectSpread({}, PopupOptions),
  model: {
    prop: "visible",
    event: "change"
  },
  inject: ["Cesium", "CesiumZondy", "webGlobe"],
  watch: {
    position: {
      deep: true,
      handler: function handler() {
        this.update();
      }
    },
    visible: {
      deep: true,
      handler: function handler() {
        this.update();
      }
    }
  },
  updated: function updated() {
    if (this.forceRender) {
      this.update();
    }
  },
  mounted: function mounted() {
    this.update();
  },
  destroyed: function destroyed() {
    this.unmount();
  },
  methods: {
    getWebGlobe: function getWebGlobe() {
      var webGlobe = this.webGlobe,
          vueKey = this.vueKey,
          CesiumZondy = this.CesiumZondy;
      CesiumZondy = CesiumZondy || window.CesiumZondy;
      var _CesiumZondy = CesiumZondy,
          GlobesManager = _CesiumZondy.GlobesManager;
      var instance = webGlobe;

      if (vueKey !== "default") {
        instance = GlobesManager[vueKey][0].source;
      }

      return instance;
    },
    createCesiumObject: function createCesiumObject() {
      var vm = this;
      var CesiumZondy = this.CesiumZondy,
          position = this.position,
          options = this.options,
          container = this.container,
          destroyOnClose = this.destroyOnClose;
      CesiumZondy = CesiumZondy || window.CesiumZondy;

      if (this.$slots.default) {
        if (this.$slots.default[0].elm) {
          container = this.$slots.default[0].elm.innerHTML;
        } else if (this.$slots.default[0].context.$children[0].$el) {
          container = this.$slots.default[0].context.$children[0].$el.innerHTML;
        }
      }

      options = Popupvue_type_script_lang_js_objectSpread(Popupvue_type_script_lang_js_objectSpread({}, options), {}, {
        callback: {
          onShow: function onShow() {
            vm.$emit("change", true);
          },
          onHide: function onHide() {
            vm.$emit("change", false);

            if (vm.destroyOnClose) {// 这里其实是无效的，本质上是通过update来实现的
              // vm.unmount();
            }
          }
        }
      });
      var webGlobe = this.getWebGlobe();
      return new CesiumZondy.Overlayer.PopupLayer(webGlobe.viewer, position, options, container);
    },
    mount: function mount() {
      var webGlobe = this.webGlobe,
          vueKey = this.vueKey,
          vueIndex = this.vueIndex;
      webGlobe = webGlobe || this.getWebGlobe();
      var viewer = webGlobe.viewer;
      var popup;
      var find = window.CesiumZondy.PopupManager.findSource(vueKey, vueIndex);

      if (find) {
        popup = find.source;
      }

      return !viewer.isDestroyed() && popup && popup.show();
    },
    unmount: function unmount() {
      var webGlobe = this.webGlobe,
          vueKey = this.vueKey,
          vueIndex = this.vueIndex;
      webGlobe = webGlobe || this.getWebGlobe();
      var viewer = webGlobe.viewer;
      CesiumZondy = CesiumZondy || window.CesiumZondy;
      var popup;
      var find = window.CesiumZondy.PopupManager.findSource(vueKey, vueIndex);

      if (find) {
        popup = find.source;
      }

      if (popup) {
        popup.remove();
        popup = undefined;
      }

      return !viewer.isDestroyed();
    },
    update: function update() {
      var CesiumZondy = this.CesiumZondy,
          vueIndex = this.vueIndex,
          vueKey = this.vueKey;
      CesiumZondy = CesiumZondy || window.CesiumZondy;
      var popup;
      var find = CesiumZondy.PopupManager.findSource(vueKey, vueIndex);

      if (find) {
        popup = find.source;
      }

      if (popup && popup.remove) {
        popup.remove();
        popup = undefined;
        CesiumZondy.PopupManager.deleteSource(vueKey, vueIndex);
      }

      if (this.visible) {
        popup = this.createCesiumObject();
        this.$emit("load", {
          popup: popup
        });

        if (vueKey && (vueIndex || vueIndex === 0)) {
          CesiumZondy.PopupManager.addSource(vueKey, vueIndex, popup);
        }

        this.mount();
      }
    },
    removeAll: function removeAll() {
      var popups = window.CesiumZondy.PopupManager.findAllSource();
      popups.forEach(function (p) {
        var popup = p.source;
        popup && popup.remove();
      });
    }
  }
});
// CONCATENATED MODULE: ./src/components/UI/Popup/Popup.vue?vue&type=script&lang=js&
 /* harmony default export */ var Popup_Popupvue_type_script_lang_js_ = (Popupvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/UI/Popup/Popup.vue?vue&type=style&index=0&lang=css&
var Popupvue_type_style_index_0_lang_css_ = __webpack_require__("8495");

// CONCATENATED MODULE: ./src/components/UI/Popup/Popup.vue






/* normalize component */

var Popup_component = normalizeComponent(
  Popup_Popupvue_type_script_lang_js_,
  Popupvue_type_template_id_679a388f_render,
  Popupvue_type_template_id_679a388f_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Popup = (Popup_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Provider/TerrainProvider/IgsTerrainProvider.vue?vue&type=script&lang=js&






function IgsTerrainProvidervue_type_script_lang_js_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function IgsTerrainProvidervue_type_script_lang_js_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { IgsTerrainProvidervue_type_script_lang_js_ownKeys(Object(source), true).forEach(function (key) { Object(defineProperty["a" /* default */])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { IgsTerrainProvidervue_type_script_lang_js_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }


/* harmony default export */ var IgsTerrainProvidervue_type_script_lang_js_ = ({
  name: "mapgis-3d-igs-terrain",
  inject: ["Cesium", "CesiumZondy", "webGlobe"],
  props: IgsTerrainProvidervue_type_script_lang_js_objectSpread({
    show: {
      type: Boolean,
      default: true
    },
    url: {
      type: String
    }
  }, VueOptions),
  created: function created() {},
  mounted: function mounted() {
    this.mount();
    this.watchProp();
  },
  destroyed: function destroyed() {
    this.unmount();
  },
  methods: {
    createCesiumObject: function createCesiumObject() {
      var $props = this.$props,
          url = this.url,
          CesiumZondy = this.CesiumZondy,
          webGlobe = this.webGlobe;
      var terrianlayer = new CesiumZondy.Layer.TerrainLayer({
        viewer: webGlobe.viewer
      });
      return terrianlayer;
    },
    watchProp: function watchProp() {},
    mount: function mount() {
      var webGlobe = this.webGlobe,
          vueIndex = this.vueIndex,
          vueKey = this.vueKey,
          $props = this.$props;
      var viewer = webGlobe.viewer;
      if (viewer.isDestroyed()) return;
      this.$emit("load", this);
      var terrianlayer = this.createCesiumObject();
      var terrainLayers = terrianlayer.append("".concat(this.url), IgsTerrainProvidervue_type_script_lang_js_objectSpread({}, $props));

      if (vueKey && vueIndex) {
        window.CesiumZondy.IgsTerrainManager.addSource(vueKey, vueIndex, terrainLayers);
      }
    },
    unmount: function unmount() {
      var webGlobe = this.webGlobe,
          vueKey = this.vueKey,
          vueIndex = this.vueIndex;
      var viewer = webGlobe.viewer;
      var find = window.CesiumZondy.IgsTerrainManager.findSource(vueKey, vueIndex);

      if (find) {
        var terrains = find.source;
        !viewer.isDestroyed() && terrains && terrains.forEach(function (l) {
          l.destroy();
        });
      }

      window.CesiumZondy.IgsTerrainManager.deleteSource(vueKey, vueIndex);
    }
  },
  render: function render(h) {
    return h("span", {
      class: "mapgis-3d-igs-terrain",
      ref: "m3d"
    });
  }
});
// CONCATENATED MODULE: ./src/components/Provider/TerrainProvider/IgsTerrainProvider.vue?vue&type=script&lang=js&
 /* harmony default export */ var TerrainProvider_IgsTerrainProvidervue_type_script_lang_js_ = (IgsTerrainProvidervue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/Provider/TerrainProvider/IgsTerrainProvider.vue
var IgsTerrainProvider_render, IgsTerrainProvider_staticRenderFns




/* normalize component */

var IgsTerrainProvider_component = normalizeComponent(
  TerrainProvider_IgsTerrainProvidervue_type_script_lang_js_,
  IgsTerrainProvider_render,
  IgsTerrainProvider_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var IgsTerrainProvider = (IgsTerrainProvider_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4746d4ad-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Provider/TerrainProvider/TerrainProvider.vue?vue&type=template&id=3de371e3&
var TerrainProvidervue_type_template_id_3de371e3_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span')}
var TerrainProvidervue_type_template_id_3de371e3_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Provider/TerrainProvider/TerrainProvider.vue?vue&type=template&id=3de371e3&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Provider/TerrainProvider/TerrainProvider.vue?vue&type=script&lang=js&






function TerrainProvidervue_type_script_lang_js_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function TerrainProvidervue_type_script_lang_js_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { TerrainProvidervue_type_script_lang_js_ownKeys(Object(source), true).forEach(function (key) { Object(defineProperty["a" /* default */])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { TerrainProvidervue_type_script_lang_js_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

//
//
//
//

/* harmony default export */ var TerrainProvidervue_type_script_lang_js_ = ({
  name: "mapgis-3d-terrain-provider",
  inject: ["Cesium", "webGlobe"],
  props: TerrainProvidervue_type_script_lang_js_objectSpread({
    layer: Object,
    url: {
      type: [String, Object],
      required: true
    },
    options: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  }, VueOptions),
  data: function data() {
    return {};
  },
  created: function created() {},
  mounted: function mounted() {
    {}
    this.mount();
  },
  destroyed: function destroyed() {
    this.unmount();
  },
  watch: {},
  methods: {
    createCesiumObject: function createCesiumObject() {
      var url = this.url,
          options = this.options;
      return new Cesium.CesiumTerrainProvider(TerrainProvidervue_type_script_lang_js_objectSpread(TerrainProvidervue_type_script_lang_js_objectSpread({}, options), {}, {
        url: url
      }));
    },
    mount: function mount() {
      var webGlobe = this.webGlobe,
          options = this.options,
          layer = this.layer,
          vueIndex = this.vueIndex,
          vueKey = this.vueKey;
      var viewer = webGlobe.viewer;
      var dataSources = viewer.dataSources;
      window.Zondy = window.Zondy || window.CesiumZondy;
      var provider = this.createCesiumObject();
      webGlobe.viewer.terrainProvider = provider;

      if (vueKey && vueIndex) {
        window.CesiumZondy.Tileset3DManager.addSource(vueKey, vueIndex, provider);
      }

      this.$emit("load", this.layer, this);
    },
    unmount: function unmount() {
      var webGlobe = this.webGlobe,
          vueKey = this.vueKey,
          vueIndex = this.vueIndex;
      webGlobe.deleteTerrain();
      var find = window.CesiumZondy.Tileset3DManager.findSource(vueKey, vueIndex);
      window.CesiumZondy.Tileset3DManager.deleteSource(vueKey, vueIndex);
      this.$emit("unload", this.layer, this);
    }
  }
});
// CONCATENATED MODULE: ./src/components/Provider/TerrainProvider/TerrainProvider.vue?vue&type=script&lang=js&
 /* harmony default export */ var TerrainProvider_TerrainProvidervue_type_script_lang_js_ = (TerrainProvidervue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/Provider/TerrainProvider/TerrainProvider.vue





/* normalize component */

var TerrainProvider_component = normalizeComponent(
  TerrainProvider_TerrainProvidervue_type_script_lang_js_,
  TerrainProvidervue_type_template_id_3de371e3_render,
  TerrainProvidervue_type_template_id_3de371e3_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var TerrainProvider = (TerrainProvider_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4746d4ad-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/DataSource/Geojson/GeoJsonDataSource.vue?vue&type=template&id=65249ca3&
var GeoJsonDataSourcevue_type_template_id_65249ca3_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span')}
var GeoJsonDataSourcevue_type_template_id_65249ca3_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/DataSource/Geojson/GeoJsonDataSource.vue?vue&type=template&id=65249ca3&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/DataSource/Geojson/GeoJsonDataSource.vue?vue&type=script&lang=js&








function GeoJsonDataSourcevue_type_script_lang_js_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function GeoJsonDataSourcevue_type_script_lang_js_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { GeoJsonDataSourcevue_type_script_lang_js_ownKeys(Object(source), true).forEach(function (key) { Object(defineProperty["a" /* default */])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { GeoJsonDataSourcevue_type_script_lang_js_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

//
//
//
//

/* harmony default export */ var GeoJsonDataSourcevue_type_script_lang_js_ = ({
  name: "mapgis-3d-geojson-datasource",
  inject: ["Cesium", "CesiumZondy", "webGlobe"],
  props: GeoJsonDataSourcevue_type_script_lang_js_objectSpread(GeoJsonDataSourcevue_type_script_lang_js_objectSpread({}, VueOptions), {}, {
    baseUrl: {
      type: [String, Object],
      required: true
    },
    options: {
      type: Object,
      default: function _default() {
        return {
          markerSize: 48,
          strokeWidth: 2,
          clampToGround: true
        };
      }
    }
  }),
  mounted: function mounted() {
    this.mount();
  },
  destroyed: function destroyed() {
    this.unmount();
  },
  methods: {
    createCesiumObject: function () {
      var _createCesiumObject = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var baseUrl, options;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                baseUrl = this.baseUrl, options = this.options;
                return _context.abrupt("return", new Cesium.GeoJsonDataSource.load(baseUrl, options));

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function createCesiumObject() {
        return _createCesiumObject.apply(this, arguments);
      }

      return createCesiumObject;
    }(),
    mount: function mount() {
      var webGlobe = this.webGlobe,
          CesiumZondy = this.CesiumZondy,
          vueKey = this.vueKey,
          vueIndex = this.vueIndex;
      var viewer = webGlobe.viewer;
      var vm = this;
      var promise = this.createCesiumObject();
      promise.then(function (dataSource) {
        // viewer.zoomTo(dataSource);
        viewer.dataSources.add(dataSource);
        vm.$emit("load", {
          component: this
        });
        CesiumZondy.GeojsonManager.addSource(vueKey, vueIndex, dataSource, {});
      });
    },
    unmount: function unmount() {
      var webGlobe = this.webGlobe,
          CesiumZondy = this.CesiumZondy,
          vueKey = this.vueKey,
          vueIndex = this.vueIndex;
      var viewer = webGlobe.viewer;
      var dataSources = viewer.dataSources;
      var find = CesiumZondy.GeojsonManager.findSource(vueKey, vueIndex);

      if (find) {
        if (dataSources) {
          dataSources.remove(find.source, true);
        }
      }

      CesiumZondy.GeojsonManager.deleteSource(vueKey, vueIndex);
      this.$emit("unload", this);
    }
  }
});
// CONCATENATED MODULE: ./src/components/DataSource/Geojson/GeoJsonDataSource.vue?vue&type=script&lang=js&
 /* harmony default export */ var Geojson_GeoJsonDataSourcevue_type_script_lang_js_ = (GeoJsonDataSourcevue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/DataSource/Geojson/GeoJsonDataSource.vue





/* normalize component */

var GeoJsonDataSource_component = normalizeComponent(
  Geojson_GeoJsonDataSourcevue_type_script_lang_js_,
  GeoJsonDataSourcevue_type_template_id_65249ca3_render,
  GeoJsonDataSourcevue_type_template_id_65249ca3_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var GeoJsonDataSource = (GeoJsonDataSource_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4746d4ad-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/DataSource/Czml/CzmlDataSource.vue?vue&type=template&id=3bb3c582&
var CzmlDataSourcevue_type_template_id_3bb3c582_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span')}
var CzmlDataSourcevue_type_template_id_3bb3c582_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/DataSource/Czml/CzmlDataSource.vue?vue&type=template&id=3bb3c582&

// CONCATENATED MODULE: ./src/components/Base/Cesium/CesiumEvents.js
/**
 * @const {Array} Cesium 事件集合。
 */
var Events = {
  'vc-viewer': ['selectedEntityChanged', 'trackedEntityChanged'],
  'viewer-property-events': [{
    // viewer.imageryLayers
    name: 'imageryLayers',
    events: ['layerAdded', 'layerMoved', 'layerRemoved', 'layerShownOrHidden']
  }, {
    // viewer.dataSources
    name: 'dataSources',
    events: ['dataSourceAdded', 'dataSourceMoved', 'dataSourceRemoved']
  }, {
    // viewer.entities
    name: 'entities',
    events: ['collectionChanged']
  }, {
    // viewer.scene
    name: 'scene',
    events: ['morphComplete', 'morphStart', 'postRender', 'postUpdate', 'preRender', 'preUpdate', 'renderError', 'terrainProviderChanged']
  }, {
    // viewer.camera
    name: 'camera',
    events: ['changed', 'moveEnd', 'moveStart']
  }, {
    // viewer.clock
    name: 'clock',
    events: ['onStop', 'onTick']
  }, {
    // viewer.terrainProvider
    name: 'terrainProvider',
    events: ['errorEvent']
  }],
  'viewer-mouse-events': ['LEFT_CLICK', 'LEFT_DOUBLE_CLICK', 'LEFT_DOWN', 'LEFT_UP', 'MIDDLE_CLICK', 'MIDDLE_DOWN', 'MIDDLE_UP', 'MOUSE_MOVE', 'PINCH_END', 'PINCH_MOVE', 'PINCH_START', 'RIGHT_CLICK', 'RIGHT_DOWN', 'RIGHT_UP', 'WHEEL'],
  'vc-primitive-3dtileset': ['allTilesLoaded', 'initialTilesLoaded', 'loadProgress', 'tileFailed', 'tileLoad', 'tileUnload', 'tileVisible'],
  'imagery-layer-events': ['errorEvent'],
  'entity-events': ['definitionChanged'],
  'datasource-events': ['changedEvent', 'errorEvent', 'loadingEvent'],
  'datasource-property-events': [{
    name: 'clock',
    events: ['definitionChanged']
  }, {
    name: 'clustering',
    events: ['clusterEvent']
  }, {
    name: 'entities',
    events: ['collectionChanged']
  }]
};
// CONCATENATED MODULE: ./src/components/Utils/util.js





var checkType = function checkType(val) {
  return Object.prototype.toString.call(val).slice(8, -1);
};
var toKebabCase = function toKebabCase(str) {
  return str.replace(/[A-Z]/g, function (letter) {
    return "-".concat(letter.toLowerCase());
  }).replace(/^-/, '');
};
/**
 * 通过 class 名获取 Dom 元素。
 * @param {Array<Element>} htmlCollection Dom元素集合。
 * @param {String} className class 名称。
 */

var getDocumentByClassName = function getDocumentByClassName(htmlCollection, className) {
  var temp;
  var BreakException = {};

  try {
    Array.prototype.slice.call(htmlCollection).forEach(function (element) {
      if (element.className === className) {
        temp = element;
        throw BreakException;
      }
    });
  } catch (e) {
    if (e !== BreakException) throw e;
  }

  return temp;
};
/**
 * 判断传入的对象是否是方法。
 * @param {*} value
 * @returns {Boolean}
 */

function isFunction(value) {
  return typeof value === 'function';
}
/**
 * 验证是否是经纬度。
 * @param {Number} longitude
 * @param {Number} latitude
 * @returns {Boolean}
 */

function lnglatValidator(longitude, latitude) {
  // 经度，整数部分为0-180小数部分为0到6位
  var longreg = /^(-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,15})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,15}|180)$/;

  if (!longreg.test(longitude)) {
    return false;
  } // 纬度,整数部分为0-90小数部分为0到6位


  var latreg = /^(-|\+)?([0-8]?\d{1}\.\d{0,15}|90\.0{0,15}|[0-8]?\d{1}|90)$/;

  if (!latreg.test(latitude)) {
    return false;
  }

  return true;
}
/**
 * 普通对象 {x: number, y: number } 转换为 Cesium.Cartesian2 对象
 * @param {Object} val
 * @returns {Object}
 */

function makeCartesian2(val) {
  return val && new Cesium.Cartesian2(val.x, val.y);
}
/**
 * 普通对象 {x: number, y: number, z: number } 转换为 Cesium.Cartesian3 对象
 * @param {Object} val
 * @returns {Object}
 */

function makeCartesian3(val) {
  if (val && Object.prototype.hasOwnProperty.call(val, 'x')) {
    return new Cesium.Cartesian3(val.x, val.y, val.z);
  } else if (val && Object.prototype.hasOwnProperty.call(val, 'lng')) {
    return Cesium.Cartesian3.fromDegrees(val.lng, val.lat, val.height);
  }

  return val;
}
/**
 * 普通数组 [lng, lat, height, ……，lng, lat, height] 转换为 Cesium.Cartesian3 数组
 * @param {Array} val
 * @returns {Array<Cartesian3>}
 */

function makeCartesian3Array(vals) {
  if (vals && vals instanceof Array && vals[0] instanceof Cesium.Cartesian3) {
    return vals;
  }

  var coordinates = [];
  vals.forEach(function (item) {
    coordinates.push(item.lng);
    coordinates.push(item.lat);
    coordinates.push(item.height);
  });
  return coordinates.length >= 3 ? Cesium.Cartesian3.fromDegreesArrayHeights(coordinates) : vals;
}
/**
 * 普通数组 [lng, lat, ……，lng, lat] 转换为 Cesium.Cartesian2 数组
 * @param {Array} vals
 * @returns {Array<Cartesian2>}
 */

function makeCartesian2Array(vals) {
  var cartesian2Array = [];
  vals.forEach(function (item) {
    cartesian2Array.push(new Cesium.Cartesian2(item.x, item.y));
  });
  return cartesian2Array;
}
/**
 *
 * @param {Object} val
 */

function makeQuaternion(val) {
  return val.x ? new Cesium.Quaternion(val.x, val.y, val.z, val.w) : val;
}
/**
 * 解析 HierarchyJson
 * @param {Object} val
 */

function parsePolygonHierarchyJson(val) {
  val.forEach(function (element) {
    element.positions = makeCartesian3Array(element.positions);

    if (element.holes) {
      parsePolygonHierarchyJson(element.holes);
    }
  });
}
/**
 * 普通数组或对象转 Cesium.PolygonHierarchy 对象。
 * @param {Object|Array} val
 */


function makePolygonHierarchy(val) {
  if (val instanceof Array && val.length >= 3) {
    return new Cesium.PolygonHierarchy(makeCartesian3Array(val));
  }

  if (Cesium.defined(val.positions)) {
    val.positions = makeCartesian3Array(val.positions);
    parsePolygonHierarchyJson(val.holes);
  }

  return val;
}
/**
 * 普通对象 {near: number, nearValue: number, far: number, farValue: number} 转 Cesium.NearFarScalar 对象。
 * @param {Object} val
 * @returns {NearFarScalar}
 */

function makeNearFarScalar(val) {
  return val && new Cesium.NearFarScalar(val.near, val.nearValue, val.far, val.farValue);
}
/**
 * 普通对象 {near: number, far: number} 转 Cesium.DistanceDisplayCondition 对象。
 * @param {Object} val
 * @returns {DistanceDisplayCondition}
 */

function makeDistanceDisplayCondition(val) {
  return val && new Cesium.DistanceDisplayCondition(val.near, val.far);
}
/**
 * 普通对象或数组 [r, g, b, a] 或字符串转 Cesium.Color 对象。
 * @param {String|Array|Object} val
 * @returns {Color}
 */

function makeColor(val) {
  if (val instanceof Cesium.Color) {
    return val;
  } else if (val instanceof Array) {
    return new Cesium.Color(val[0], val[1], val[2], val[3]);
  } else if (typeof val === 'string') {
    return Cesium.Color.fromCssColorString(val);
  }

  return val;
}
/**
 * 普通对象或数组 [r, g, b, a] 或字符串转 Material
 * @param {String|Array|Object} val
 */

function makeMaterial(val) {
  if (val instanceof Array || typeof val === 'string' && !/(.*)\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$/.test(val)) {
    return makeColor(val);
  } // else if (val && val.hasOwnProperty('fabric')) {
  //   return new Cesium.Material({
  //     fabric: {
  //       type: 'Color',
  //       uniforms: {
  //         color: new Cesium.Color(1.0, 1.0, 0.0, 1.0)
  //       }
  //     }
  //   })
  // }


  return val;
}
/**
 * 普通对象 {west: number, south: number, east: number, north: number} 转 Cesium.Rectangle 对象。
 * @param {Object} val
 * @returns {Rectangle}
 */

function makeRectangle(val) {
  // Entiy 的 rectangle 属性不能调用这个方法
  if (val instanceof Cesium.RectangleGraphics) {
    return val;
  }

  return val && Cesium.Rectangle.fromDegrees(val.west, val.south, val.east, val.north);
}
/**
 * 普通对象 {x: number, y: number, width: number, height: number} 转 Cesium.BoundingRectangle 对象。
 * @param {Object} val
 * @returns {BoundingRectangle}
 */

function makeBoundingRectangle(val) {
  return val && new Cesium.BoundingRectangle(val.x, val.y, val.width, val.height);
}
/**
 * 普通对象 {normal: number, distance: number} 转 Cesium.Plane 对象。
 * @param {Object} val
 * @returns {Plane}
 */

function makePlane(val) {
  // Entiy 和 PlaneGraphics 都有个 plane 属性 要区别一下
  if (val instanceof Cesium.PlaneGraphics) {
    return val;
  }

  if (val) {
    Cesium.Cartesian3.normalize(makeCartesian3(val.normal), val.normal);
    return new Cesium.Plane(val.normal, val.distance);
  }

  return val;
}
/**
 * 普通对象转平移、旋转、缩放变换对象。
 * @param {*} val
 */

function makeTranslationRotationScale(val) {
  return val && new Cesium.TranslationRotationScale(makeCartesian3(val.translation), makeQuaternion(val.rotation), makeCartesian3(val.scale));
}
function makeOptions(val) {
  var cmpName = this.$options.name;

  switch (cmpName) {
    case 'vc-datasource-geojson':
      var result = {};
      Object.assign(result, val);
      result && result.markerColor && (result.markerColor = makeColor(result.markerColor));
      result && result.stroke && (result.stroke = makeColor(result.stroke));
      result && result.fill && (result.fill = makeColor(result.fill));
      return result;
  }

  return val;
}
function util_dirname(path) {
  if (typeof path !== 'string') path = path + '';
  if (path.length === 0) return '.';
  var code = path.charCodeAt(0);
  var hasRoot = code === 47;
  /* / */

  var end = -1;
  var matchedSlash = true;

  for (var i = path.length - 1; i >= 1; --i) {
    code = path.charCodeAt(i);

    if (code === 47
    /* / */
    ) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
      // We saw the first non-path separator
      matchedSlash = false;
    }
  }

  if (end === -1) return hasRoot ? '/' : '.';

  if (hasRoot && end === 1) {
    // return '//';
    // Backwards-compat fix:
    return '/';
  }

  return path.slice(0, end);
}
function Platform() {
  var ua = navigator.userAgent;
  var isWindowsPhone = /(?:Windows Phone)/.test(ua);
  var isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone;
  var isAndroid = /(?:Android)/.test(ua);
  var isFireFox = /(?:Firefox)/.test(ua);
  var isChrome = /(?:Chrome|CriOS)/.test(ua);
  var isTablet = /(?:iPad|PlayBook)/.test(ua) || isAndroid && !/(?:Mobile)/.test(ua) || isFireFox && /(?:Tablet)/.test(ua);
  var isPhone = /(?:iPhone)/.test(ua) && !isTablet;
  var isPc = !isPhone && !isAndroid && !isSymbian;
  return {
    isTablet: isTablet,
    isPhone: isPhone,
    isAndroid: isAndroid,
    isPc: isPc,
    isChrome: isChrome
  };
}
function captureScreenshot(viewer) {
  var showSplitter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var _Cesium = Cesium,
      when = _Cesium.when;
  var deferred = when.defer();
  var scene = viewer.scene;
  var removeCallback = scene.postRender.addEventListener(function () {
    removeCallback();

    try {
      var cesiumCanvas = viewer.scene.canvas; // If we're using the splitter, draw the split position as a vertical white line.

      var canvas = cesiumCanvas; // if (showSplitter) {
      //   canvas = document.createElement('canvas')
      //   canvas.width = cesiumCanvas.width
      //   canvas.height = cesiumCanvas.height
      //   const context = canvas.getContext('2d')
      //   context.drawImage(cesiumCanvas, 0, 0)
      //   const x = viewer.splitPosition * cesiumCanvas.width
      //   context.strokeStyle = this.terria.baseMapContrastColor
      //   context.beginPath()
      //   context.moveTo(x, 0)
      //   context.lineTo(x, cesiumCanvas.height)
      //   context.stroke()
      // }

      deferred.resolve(canvas.toDataURL('image/png'));
    } catch (e) {
      deferred.reject(e);
    }
  }, this);
  scene.render(viewer.clock.currentTime);
  return deferred.promise;
}
function getAllAttribution(viewer) {
  var credits = viewer.scene.frameState.creditDisplay._currentFrameCredits.screenCredits.values.concat(viewer.scene.frameState.creditDisplay._currentFrameCredits.lightboxCredits.values);

  return credits.map(function (credit) {
    return credit.html;
  });
}
// CONCATENATED MODULE: ./src/components/Utils/log.js
/**
 * 输出正常信息到控制台。
 * @param  {...any} args
 */
function log() {
  var _console;

  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  (_console = console).log.apply(_console, ['[VUE_CESIUM]'].concat(args));
}
/**
 * 输出警告信息到控制台。
 * @param {*} msg
 * @param  {...any} args
 */

function warn(msg) {
  var _console2;

  for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }

  (_console2 = console).warn.apply(_console2, ["[VUE_CESIUM] WARNING: ".concat(msg)].concat(args));
}
/**
 * 输出错误信息到控制台。
 * @param {*} msg
 * @param  {...any} args
 */

function error(msg) {
  var _console3;

  for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    args[_key3 - 1] = arguments[_key3];
  }

  (_console3 = console).error.apply(_console3, ["[VUE_CESIUM] ERROR: ".concat(msg)].concat(args));
}
// CONCATENATED MODULE: ./src/components/Base/Cesium/CesiumBindEvent.js




/**
 * 将 Cesium 对象事件注册为 Vue 组件事件。
 * @param {Object} instance Cesium 对象。
 * @param {Array} eventList 该 Cesium 的事件数组。
 * @param {Boolean} flag true 注册事件，false 注销事件。
 */

/* harmony default export */ var CesiumBindEvent = (function (instance, eventList) {
  var _this = this;

  var flag = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var ev = eventList || Events[toKebabCase(this.$options.name)];
  ev && ev.forEach(function (eventName) {
    if (instance[eventName]) {
      var listener = _this.$listeners[eventName];
      var methodName = flag ? 'addEventListener' : 'removeEventListener';
      listener && instance[eventName][methodName](listener.fns);
    } else if (Object({"NODE_ENV":"production","BASE_URL":"/"}).VUECESIUM_DEBUG) {
      warn('Add event linstener of ' + eventName + ' failed, try to upgrade Cesium to latest version.');
    }
  });
});
// CONCATENATED MODULE: ./src/components/DataSource/BaseDatasource.js






var methods = {
  mount: function () {
    var _mount = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var _this = this;

      var webGlobe, datasource, viewer, dataSources;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              webGlobe = this.webGlobe, datasource = this.datasource;
              viewer = webGlobe.viewer;
              dataSources = viewer.dataSources;
              CesiumBindEvent.call(this, datasource, Events["datasource-events"], true);
              Events["datasource-property-events"].forEach(function (eventName) {
                datasource[eventName.name] && CesiumBindEvent.call(_this, datasource[eventName.name], eventName.events, true);
              });
              return _context.abrupt("return", dataSources && dataSources.add(datasource));

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function mount() {
      return _mount.apply(this, arguments);
    }

    return mount;
  }(),
  unmount: function () {
    var _unmount = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var _this2 = this;

      var dataSources, datasource;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              dataSources = this.dataSources, datasource = this.datasource;
              CesiumBindEvent.call(this, datasource, Events["datasource-events"], false);
              Events["datasource-property-events"].forEach(function (eventName) {
                datasource[eventName.name] && CesiumBindEvent.call(_this2, datasource[eventName.name], eventName.events, false);
              });
              return _context2.abrupt("return", dataSources && dataSources.remove(datasource));

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function unmount() {
      return _unmount.apply(this, arguments);
    }

    return unmount;
  }()
};
/* harmony default export */ var BaseDatasource = ({
  inject: ["Cesium", "webGlobe"],
  methods: methods,
  props: {
    /**
     * @type String
     * @description 该key的主要作用市用来记录Cesium的Source,primitive,
     * entity的内存中的引用数组的引用，从而避免vue对cesium的内存劫持
     */
    vueKey: {
      typs: String,
      default: "default"
    },

    /**
     * @type String
     * @description 该key的主要作用市用来记录Cesium的Source,primitive,
     * entity的内存中的引用数组的下标，从而避免vue对cesium的内存劫持
     */
    vueIndex: {
      typs: [String, Number],
      default: (Math.random() * 10000).toFixed(0)
    },
    url: {
      type: String,
      required: true
    },
    options: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  created: function created() {
    this.datasource = this.createCesiumObject();
  },
  mounted: function mounted() {
    this.mount();
  },
  destroyed: function destroyed() {
    this.unmount();
  }
});
// CONCATENATED MODULE: ./src/components/DataSource/Czml/CzmlOptions.js
/* harmony default export */ var CzmlOptions = ({
  url: {
    type: String,
    default: null,
    required: true
  }
});
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/DataSource/Czml/CzmlDataSource.vue?vue&type=script&lang=js&








function CzmlDataSourcevue_type_script_lang_js_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function CzmlDataSourcevue_type_script_lang_js_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { CzmlDataSourcevue_type_script_lang_js_ownKeys(Object(source), true).forEach(function (key) { Object(defineProperty["a" /* default */])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { CzmlDataSourcevue_type_script_lang_js_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

//
//
//
//


/* harmony default export */ var CzmlDataSourcevue_type_script_lang_js_ = ({
  name: 'mapgis-3d-czml-datasource',
  mixins: [BaseDatasource],
  props: CzmlDataSourcevue_type_script_lang_js_objectSpread({}, CzmlOptions),
  methods: {
    createCesiumObject: function () {
      var _createCesiumObject = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var $props, url;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                $props = this.$props, url = this.url;
                return _context.abrupt("return", new Cesium.CzmlDataSource.load(url));

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function createCesiumObject() {
        return _createCesiumObject.apply(this, arguments);
      }

      return createCesiumObject;
    }()
  }
});
// CONCATENATED MODULE: ./src/components/DataSource/Czml/CzmlDataSource.vue?vue&type=script&lang=js&
 /* harmony default export */ var Czml_CzmlDataSourcevue_type_script_lang_js_ = (CzmlDataSourcevue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/DataSource/Czml/CzmlDataSource.vue





/* normalize component */

var CzmlDataSource_component = normalizeComponent(
  Czml_CzmlDataSourcevue_type_script_lang_js_,
  CzmlDataSourcevue_type_template_id_3bb3c582_render,
  CzmlDataSourcevue_type_template_id_3bb3c582_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var CzmlDataSource = (CzmlDataSource_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4746d4ad-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Analysis/Viewshed.vue?vue&type=template&id=531ad44f&scoped=true&
var Viewshedvue_type_template_id_531ad44f_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:[
        'edit-wrapper-vshed',
        { right: _vm.position === 'right', left: _vm.position === 'left' } ]},[_c('div',{staticClass:"card-title",style:({
            background: 'rgb(38, 151, 204)',
            padding: '5px',
            color: 'white',
        })},[_vm._v("\n        可视域分析\n    ")]),_c('a-card',{staticClass:"box-card-vshed attr-table"},[_c('div',{staticClass:"starting"},[_vm._v("\n            起始点:\n            "),_c('div',{staticClass:"inputs"},[_c('a-input',{attrs:{"disabled":!_vm.form.startLon},model:{value:(_vm.form.startLon),callback:function ($$v) {_vm.$set(_vm.form, "startLon", $$v)},expression:"form.startLon"}},[_c('span',{attrs:{"slot":"prefix"},slot:"prefix"},[_vm._v("经度:")])]),_c('a-slider',{staticClass:"input",attrs:{"step":0.0001,"max":_vm.startLonMax,"min":_vm.startLonMin,"disabled":!_vm.form.startLon,"value":parseFloat(_vm.form.startLon)},on:{"change":function($event){return _vm.setInput($event, 'startLon')}}})],1),_c('div',{staticClass:"inputs"},[_c('a-input',{attrs:{"disabled":!_vm.form.startLat},model:{value:(_vm.form.startLat),callback:function ($$v) {_vm.$set(_vm.form, "startLat", $$v)},expression:"form.startLat"}},[_c('span',{attrs:{"slot":"prefix"},slot:"prefix"},[_vm._v("纬度:")])]),_c('a-slider',{staticClass:"input",attrs:{"step":0.0001,"max":_vm.startLatMax,"min":_vm.startLatMin,"disabled":!_vm.form.startLat,"value":parseFloat(_vm.form.startLat)},on:{"change":function($event){return _vm.setInput($event, 'startLat')}}})],1),_c('div',{staticClass:"inputs"},[_c('a-input',{attrs:{"disabled":!_vm.form.startAlt},model:{value:(_vm.form.startAlt),callback:function ($$v) {_vm.$set(_vm.form, "startAlt", $$v)},expression:"form.startAlt"}},[_c('span',{attrs:{"slot":"prefix"},slot:"prefix"},[_vm._v("高度:")])]),_c('a-slider',{staticClass:"input",attrs:{"step":10,"max":_vm.startAltMax,"min":_vm.startAltMin,"disabled":!_vm.form.startAlt,"value":parseFloat(_vm.form.startAlt)},on:{"change":function($event){return _vm.setInput($event, 'startAlt')}}})],1)]),_c('div',{staticClass:"ending"},[_vm._v("\n            结束点:\n            "),_c('div',{staticClass:"inputs"},[_c('a-input',{attrs:{"disabled":!_vm.form.endLon},model:{value:(_vm.form.endLon),callback:function ($$v) {_vm.$set(_vm.form, "endLon", $$v)},expression:"form.endLon"}},[_c('span',{attrs:{"slot":"prefix"},slot:"prefix"},[_vm._v("经度:")])]),_c('a-slider',{staticClass:"input",attrs:{"step":0.0001,"max":_vm.endLonMax,"min":_vm.endLonMin,"disabled":!_vm.form.endLon,"value":parseFloat(_vm.form.endLon)},on:{"change":function($event){return _vm.setInput($event, 'endLon')}}})],1),_c('div',{staticClass:"inputs"},[_c('a-input',{attrs:{"disabled":!_vm.form.endLat},model:{value:(_vm.form.endLat),callback:function ($$v) {_vm.$set(_vm.form, "endLat", $$v)},expression:"form.endLat"}},[_c('span',{attrs:{"slot":"prefix"},slot:"prefix"},[_vm._v("纬度:")])]),_c('a-slider',{staticClass:"input",attrs:{"step":0.0001,"max":_vm.endLatMax,"min":_vm.endLatMin,"disabled":!_vm.form.endLat,"value":parseFloat(_vm.form.endLat)},on:{"change":function($event){return _vm.setInput($event, 'endLat')}}})],1),_c('div',{staticClass:"inputs"},[_c('a-input',{attrs:{"disabled":!_vm.form.endAlt},model:{value:(_vm.form.endAlt),callback:function ($$v) {_vm.$set(_vm.form, "endAlt", $$v)},expression:"form.endAlt"}},[_c('span',{attrs:{"slot":"prefix"},slot:"prefix"},[_vm._v("高度:")])]),_c('a-slider',{staticClass:"input",attrs:{"step":10,"max":_vm.endAltMax,"min":_vm.endAltMin,"disabled":!_vm.form.endAlt,"value":parseFloat(_vm.form.endAlt)},on:{"change":function($event){return _vm.setInput($event, 'endAlt')}}})],1)]),_c('a-button',{staticClass:"content",attrs:{"type":"primary"},on:{"click":_vm.startViewshed}},[_vm._v("点击绘制")]),_c('a-button',{staticClass:"content-clear",attrs:{"type":"primary"},on:{"click":_vm.clearViewshed}},[_vm._v("清除")])],1)],1)}
var Viewshedvue_type_template_id_531ad44f_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Analysis/Viewshed.vue?vue&type=template&id=531ad44f&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Analysis/Viewshed.vue?vue&type=script&lang=js&


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var Viewshedvue_type_script_lang_js_ = ({
  name: "mapgis-3d-viewshed",
  props: {
    index: {
      type: Number,
      default: 0
    },
    position: {
      type: String,
      default: "right"
    }
  },
  inject: ["Cesium", "CesiumZondy", "webGlobe"],
  data: function data() {
    return {
      //定义鼠标事件类
      viewshedAn: false,
      viewshed3daction: false,
      viewshed3ding: false,
      startLonMin: 0,
      startLatMin: 0,
      startAltMin: 0,
      endLonMin: 0,
      endLatMin: 0,
      endAltMin: 0,
      startLonMax: 0,
      startLatMax: 0,
      startAltMax: 0,
      endLonMax: 0,
      endLatMax: 0,
      endAltMax: 0,
      form: {
        startLon: 0,
        startLat: 0,
        startAlt: 0,
        endLon: 0,
        endLat: 0,
        endAlt: 0
      }
    };
  },
  watch: {
    form: {
      deep: true,
      handler: function handler(val) {
        var find = this.findSource();
        var vshed3d = window.viewshed3d[this.index][find.index];

        if (vshed3d !== null && typeof vshed3d !== "undefined") {
          if (val.startLon && val.startLat && val.startAlt) {
            vshed3d.viewPosition = Cesium.Cartesian3.fromDegrees(val.startLon, val.startLat, val.startAlt);
          }

          if (val.endLon && val.endLat && val.endAlt) {
            vshed3d.targetPosition = Cesium.Cartesian3.fromDegrees(val.endLon, val.endLat, val.endAlt);
          }
        }
      }
    }
  },
  methods: {
    setInput: function setInput(event, data) {
      this.form[data] = event;
    },
    findSource: function findSource() {
      var vm = this;
      var index = -1;
      var find = window.viewshed3d[this.index].find(function (s, i) {
        var result = false;
        var layer = vm.layer;

        if (s instanceof Cesium.ViewshedAnalysis) {
          index = i;
          result = true;
        }

        return result;
      });
      return {
        index: index,
        value: find
      };
    },
    startViewshed: function startViewshed() {
      var that = this;
      var viewer = that.webGlobe.viewer;
      viewer.scene.globe.depthTestAgainstTerrain = true;

      function left(movement) {
        var find = that.findSource();
        var vshed3d = window.viewshed3d[that.index][find.index];
        that.webGlobe.viewer.scene.globe.enableTransparent = false;

        if (that.viewshedAn) {
          // 可视域分析
          if (that.viewshed3daction) {
            //获取鼠标位置
            var cartesian = viewer.getCartesian3Position(movement.position, cartesian);

            if (cartesian !== undefined && !that.viewshed3ding) {
              cartesian.z += 3.6;
              var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
              var lng = Cesium.Math.toDegrees(cartographic.longitude);
              var lat = Cesium.Math.toDegrees(cartographic.latitude); //模型高度

              var height = cartographic.height;
              that.form.startLon = lng;
              that.form.startLat = lat;
              that.form.startAlt = height; //设置观察点坐标

              vshed3d.viewPosition = cartesian; //添加可视域分析结果显示

              viewer.scene.VisualAnalysisManager.add(vshed3d);
              that.viewshed3ding = true;
              that.startLonMin = that.form.startLon - 0.001;
              that.startLatMin = that.form.startLat - 0.001;
              that.startAltMin = that.form.startAlt - 100;
              that.startLonMax = that.form.startLon + 0.001;
              that.startLatMax = that.form.startLat + 0.001;
              that.startAltMax = that.form.startAlt + 100;
            } else {
              // //设置可视域结果点
              vshed3d.targetPosition = cartesian;
              that.viewshed3daction = false;
              that.viewshed3ding = false;
            }
          }
        }
      } //鼠标右键结束


      function right(movement) {
        var find = that.findSource();
        var vshed3d = window.viewshed3d[that.index][find.index];

        if (that.viewshed3ding) {
          if (that.viewshedAn) {
            that.viewshed3daction = false;
            that.viewshed3ding = false;
          }
        }
      }

      function move(movement) {
        var find = that.findSource();
        var vshed3d = window.viewshed3d[that.index][find.index];

        if (that.viewshed3ding) {
          var cartesian = viewer.getCartesian3Position(movement.endPosition, cartesian);

          if (cartesian) {
            vshed3d.targetPosition = cartesian;
            var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
            var lng = Cesium.Math.toDegrees(cartographic.longitude);
            var lat = Cesium.Math.toDegrees(cartographic.latitude); //模型高度

            var height = cartographic.height;
            that.form.endLon = lng;
            that.form.endLat = lat;
            that.form.endAlt = height;
            that.endLonMin = that.form.endLon - 0.001;
            that.endLatMin = that.form.endLat - 0.001;
            that.endAltMin = that.form.endAlt - 100;
            that.endLonMax = that.form.endLon + 0.001;
            that.endLatMax = that.form.endLat + 0.001;
            that.endAltMax = that.form.endAlt + 100;
          }
        }
      }

      if (that.viewshedAn === false) {
        //获取三位场景视图对象
        that.viewshedAn = true; //可视域分析（新）

        window.viewshed3d[that.index].push(new Cesium.ViewshedAnalysis(viewer.scene));
        that.viewshed3daction = true;
        that.viewshed3ding = false; //注册事件

        that.webGlobe.registerMouseEvent("LEFT_CLICK", left);
        that.webGlobe.registerMouseEvent("RIGHT_CLICK", right);
        that.webGlobe.registerMouseEvent("MOUSE_MOVE", move);
      }
    },
    clearViewshed: function clearViewshed() {
      var that = this;
      var viewer = that.webGlobe.viewer;
      var find = that.findSource();
      viewer.scene.globe.depthTestAgainstTerrain = true;

      if (that.viewshedAn === true) {
        that.webGlobe.unRegisterMouseEvent("LEFT_CLICK");
        that.webGlobe.unRegisterMouseEvent("MOUSE_MOVE");
        that.webGlobe.unRegisterMouseEvent("RIGHT_CLICK"); // window.webGlobe.viewer.entities.removeById("vshedPos");

        viewer.scene.VisualAnalysisManager.remove(window.viewshed3d[this.index][find.index]);
        that.viewshedAn = false;
        that.viewshed3daction = false;
        that.viewshed3ding = false; //定义可视域分析类

        delete window.viewshed3d[this.index][find.index];
        that.form.endLon = 0;
        that.form.endLat = 0;
        that.form.endAlt = 0;
        that.form.startLon = 0;
        that.form.startLat = 0;
        that.form.startAlt = 0;
        that.startLonMin = 0;
        that.startLatMin = 0;
        that.startAltMin = 0;
        that.endLonMin = 0;
        that.endLatMin = 0;
        that.endAltMin = 0;
        that.startLonMax = 0;
        that.startLatMax = 0;
        that.startAltMax = 0;
        that.endLonMax = 0;
        that.endLatMax = 0;
        that.endAltMax = 0;
      }
    }
  },
  mounted: function mounted() {
    window.viewshed3d = window.viewshed3d || [[], []];
  },
  destroyed: function destroyed() {
    var webGlobe = this.webGlobe;
    var find = this.findSource();
    webGlobe.viewer.scene.VisualAnalysisManager.remove(window.viewshed3d[this.index][find.index]);
    delete window.viewshed3d;
    window.viewshed3d = [[], []];
  }
});
// CONCATENATED MODULE: ./src/components/Analysis/Viewshed.vue?vue&type=script&lang=js&
 /* harmony default export */ var Analysis_Viewshedvue_type_script_lang_js_ = (Viewshedvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/Analysis/Viewshed.vue?vue&type=style&index=0&id=531ad44f&scoped=true&lang=css&
var Viewshedvue_type_style_index_0_id_531ad44f_scoped_true_lang_css_ = __webpack_require__("e347");

// CONCATENATED MODULE: ./src/components/Analysis/Viewshed.vue






/* normalize component */

var Viewshed_component = normalizeComponent(
  Analysis_Viewshedvue_type_script_lang_js_,
  Viewshedvue_type_template_id_531ad44f_scoped_true_render,
  Viewshedvue_type_template_id_531ad44f_scoped_true_staticRenderFns,
  false,
  null,
  "531ad44f",
  null
  
)

/* harmony default export */ var Viewshed = (Viewshed_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4746d4ad-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Analysis/Sightline.vue?vue&type=template&id=56b74dc2&scoped=true&
var Sightlinevue_type_template_id_56b74dc2_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:[
        'edit-wrapper-vshed',
        { right: _vm.position === 'right', left: _vm.position === 'left' } ]},[_c('div',{staticClass:"card-title",style:({
            background: 'rgb(38, 151, 204)',
            padding: '5px',
            color: 'white',
        })},[_vm._v("\n        通视分析\n    ")]),_c('a-card',{staticClass:"box-card-vshed attr-table"},[_c('div',{staticClass:"starting"},[_vm._v("\n            起始点:\n            "),_c('div',{staticClass:"inputs"},[_c('a-input',{attrs:{"disabled":!_vm.form.startLon},model:{value:(_vm.form.startLon),callback:function ($$v) {_vm.$set(_vm.form, "startLon", $$v)},expression:"form.startLon"}},[_c('span',{attrs:{"slot":"prefix"},slot:"prefix"},[_vm._v("经度:")])]),_c('a-slider',{staticClass:"input",attrs:{"step":0.0001,"max":_vm.startLonMax,"min":_vm.startLonMin,"disabled":!_vm.form.startLon,"value":parseFloat(_vm.form.startLon)},on:{"change":function($event){return _vm.setInput($event, 'startLon')}}})],1),_c('div',{staticClass:"inputs"},[_c('a-input',{attrs:{"disabled":!_vm.form.startLat},model:{value:(_vm.form.startLat),callback:function ($$v) {_vm.$set(_vm.form, "startLat", $$v)},expression:"form.startLat"}},[_c('span',{attrs:{"slot":"prefix"},slot:"prefix"},[_vm._v("纬度:")])]),_c('a-slider',{staticClass:"input",attrs:{"step":0.0001,"max":_vm.startLatMax,"min":_vm.startLatMin,"disabled":!_vm.form.startLat,"value":parseFloat(_vm.form.startLat)},on:{"change":function($event){return _vm.setInput($event, 'startLat')}}})],1),_c('div',{staticClass:"inputs"},[_c('a-input',{attrs:{"disabled":!_vm.form.startAlt},model:{value:(_vm.form.startAlt),callback:function ($$v) {_vm.$set(_vm.form, "startAlt", $$v)},expression:"form.startAlt"}},[_c('span',{attrs:{"slot":"prefix"},slot:"prefix"},[_vm._v("高度:")])]),_c('a-slider',{staticClass:"input",attrs:{"step":10,"max":_vm.startAltMax,"min":_vm.startAltMin,"disabled":!_vm.form.startAlt,"value":parseFloat(_vm.form.startAlt)},on:{"change":function($event){return _vm.setInput($event, 'startAlt')}}})],1)]),_c('div',{staticClass:"ending"},[_vm._v("\n            结束点:\n            "),_c('div',{staticClass:"inputs"},[_c('a-input',{attrs:{"disabled":!_vm.form.endLon},model:{value:(_vm.form.endLon),callback:function ($$v) {_vm.$set(_vm.form, "endLon", $$v)},expression:"form.endLon"}},[_c('span',{attrs:{"slot":"prefix"},slot:"prefix"},[_vm._v("经度:")])]),_c('a-slider',{staticClass:"input",attrs:{"step":0.0001,"max":_vm.endLonMax,"min":_vm.endLonMin,"disabled":!_vm.form.endLon,"value":parseFloat(_vm.form.endLon)},on:{"change":function($event){return _vm.setInput($event, 'endLon')}}})],1),_c('div',{staticClass:"inputs"},[_c('a-input',{attrs:{"disabled":!_vm.form.endLat},model:{value:(_vm.form.endLat),callback:function ($$v) {_vm.$set(_vm.form, "endLat", $$v)},expression:"form.endLat"}},[_c('span',{attrs:{"slot":"prefix"},slot:"prefix"},[_vm._v("纬度:")])]),_c('a-slider',{staticClass:"input",attrs:{"step":0.0001,"max":_vm.endLatMax,"min":_vm.endLatMin,"disabled":!_vm.form.endLat,"value":parseFloat(_vm.form.endLat)},on:{"change":function($event){return _vm.setInput($event, 'endLat')}}})],1),_c('div',{staticClass:"inputs"},[_c('a-input',{attrs:{"disabled":!_vm.form.endAlt},model:{value:(_vm.form.endAlt),callback:function ($$v) {_vm.$set(_vm.form, "endAlt", $$v)},expression:"form.endAlt"}},[_c('span',{attrs:{"slot":"prefix"},slot:"prefix"},[_vm._v("高度:")])]),_c('a-slider',{staticClass:"input",attrs:{"step":10,"max":_vm.endAltMax,"min":_vm.endAltMin,"disabled":!_vm.form.endAlt,"value":parseFloat(_vm.form.endAlt)},on:{"change":function($event){return _vm.setInput($event, 'endAlt')}}})],1)]),_c('a-button',{staticClass:"content",attrs:{"type":"primary"},on:{"click":_vm.initSightline}},[_vm._v("点击绘制")]),_c('a-button',{staticClass:"content-clear",attrs:{"type":"primary"},on:{"click":_vm.clearSightline}},[_vm._v("清除")])],1)],1)}
var Sightlinevue_type_template_id_56b74dc2_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Analysis/Sightline.vue?vue&type=template&id=56b74dc2&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Analysis/Sightline.vue?vue&type=script&lang=js&


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var Sightlinevue_type_script_lang_js_ = ({
  name: "mapgis-3d-sightline",
  inject: ["Cesium", "CesiumZondy", "webGlobe"],
  props: {
    index: {
      type: Number,
      default: 0
    },
    position: {
      type: String,
      default: "right"
    }
  },
  data: function data() {
    return {
      //定义是否正在执行通视分析
      visiblitying: false,
      visiblityAn: false,
      visiblity3daction: false,
      startLonMin: 0,
      startLatMin: 0,
      startAltMin: 0,
      endLonMin: 0,
      endLatMin: 0,
      endAltMin: 0,
      startLonMax: 0,
      startLatMax: 0,
      startAltMax: 0,
      endLonMax: 0,
      endLatMax: 0,
      endAltMax: 0,
      form: {
        startLon: 0,
        startLat: 0,
        startAlt: 0,
        endLon: 0,
        endLat: 0,
        endAlt: 0
      }
    };
  },
  watch: {
    form: {
      deep: true,
      handler: function handler(val) {
        var find = this.findSource();
        var visiblity = window.visiblity[this.index][find.index];

        if (visiblity !== null && typeof visiblity !== "undefined") {
          if (val.startLon && val.startLat && val.startAlt) {
            visiblity.viewPosition = Cesium.Cartesian3.fromDegrees(val.startLon, val.startLat, val.startAlt);
          }

          if (val.endLon && val.endLat && val.endAlt) {
            visiblity.targetPosition = Cesium.Cartesian3.fromDegrees(val.endLon, val.endLat, val.endAlt);
          }
        }
      }
    }
  },
  methods: {
    setInput: function setInput(event, data) {
      this.form[data] = event;
    },
    findSource: function findSource() {
      var vm = this;
      var index = -1;
      var find = window.visiblity[this.index].find(function (s, i) {
        var result = false;
        var layer = vm.layer;

        if (s instanceof Cesium.VisiblityAnalysis) {
          index = i;
          result = true;
        }

        return result;
      });
      return {
        index: index,
        value: find
      };
    },
    initSightline: function initSightline() {
      var webGlobe = this.webGlobe;
      var viewer = webGlobe.viewer;
      var that = this;
      viewer.scene.globe.depthTestAgainstTerrain = true; //注册鼠标左键点击事件

      function left(movement) {
        var find = that.findSource();
        var visiblity = window.visiblity[that.index][find.index];
        viewer.scene.globe.enableTransparent = false; //判断是否初始化过通视分析类

        if (that.visiblity3daction) {
          //获取鼠标点击位置
          var cartesian = viewer.getCartesian3Position(movement.position, cartesian); //第一个点

          if (cartesian != undefined && !that.visiblitying) {
            //设置通视分析观察点
            // visiblity.viewPosition = cartesian;
            var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
            var lng = Cesium.Math.toDegrees(cartographic.longitude);
            var lat = Cesium.Math.toDegrees(cartographic.latitude); //模型高度

            var height = cartographic.height;
            that.form.startLon = lng;
            that.form.startLat = lat;
            that.form.startAlt = height;
            viewer.scene.VisualAnalysisManager.add(visiblity); //设置为正在通视分析

            that.visiblitying = true;
            that.startLonMin = that.form.startLon - 0.001;
            that.startLatMin = that.form.startLat - 0.001;
            that.startAltMin = that.form.startAlt - 100;
            that.startLonMax = that.form.startLon + 0.001;
            that.startLatMax = that.form.startLat + 0.001;
            that.startAltMax = that.form.startAlt + 100;
          } else {
            if (that.visiblitying) {
              //设置通视分析结果点
              // visiblity.targetPosition = cartesian;
              //设置为不在通视分析
              that.visiblitying = false;
              that.visiblity3daction = false;
            }
          }
        }
      } //鼠标右键结束


      function right(movement) {
        var find = that.findSource();
        var visiblity = window.visiblity[that.index][find.index]; //判断是否正在通视分析

        if (that.visiblitying) {
          //设置通视分析结果点
          // visiblity.targetPosition = cartesian;
          //设置不在通视分析
          that.visiblitying = false;
          that.visiblity3daction = false;
        }
      } //鼠标移动事件


      function move(movement) {
        var find = that.findSource();
        var visiblity = window.visiblity[that.index][find.index]; //判断是否正在通视分析

        if (that.visiblitying) {
          //获取鼠标位置
          var cartesian = viewer.getCartesian3Position(movement.endPosition, cartesian);

          if (cartesian) {
            //设置通视分析结果点
            // visiblity.targetPosition = cartesian;
            var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
            var lng = Cesium.Math.toDegrees(cartographic.longitude);
            var lat = Cesium.Math.toDegrees(cartographic.latitude); //模型高度

            var height = cartographic.height;
            that.form.endLon = lng;
            that.form.endLat = lat;
            that.form.endAlt = height;
            that.endLonMin = that.form.endLon - 0.001;
            that.endLatMin = that.form.endLat - 0.001;
            that.endAltMin = that.form.endAlt - 100;
            that.endLonMax = that.form.endLon + 0.001;
            that.endLatMax = that.form.endLat + 0.001;
            that.endAltMax = that.form.endAlt + 100;
          }
        }
      }

      if (that.visiblityAn === false) {
        window.visiblity[that.index].push(new Cesium.VisiblityAnalysis(viewer.scene)); //获取三位场景视图对象

        that.visiblityAn = true;
        that.visiblitying = false;
        that.visiblity3daction = true; //注册事件

        webGlobe.registerMouseEvent("LEFT_CLICK", left);
        webGlobe.registerMouseEvent("RIGHT_CLICK", right);
        webGlobe.registerMouseEvent("MOUSE_MOVE", move);
      }
    },
    clearSightline: function clearSightline() {
      var webGlobe = this.webGlobe;
      var that = this;
      var find = that.findSource();
      webGlobe.viewer.scene.globe.depthTestAgainstTerrain = true;

      if (that.visiblityAn === true) {
        //注销事件
        webGlobe.unRegisterMouseEvent("LEFT_CLICK");
        webGlobe.unRegisterMouseEvent("RIGHT_CLICK");
        webGlobe.unRegisterMouseEvent("MOUSE_MOVE"); //移除通视分析结果

        webGlobe.viewer.scene.VisualAnalysisManager.remove(window.visiblity[this.index][find.index]);
        that.visiblityAn = false;
        that.visiblitying = false;
        that.visiblity3daction = false; //销毁通视分析类

        delete window.visiblity[this.index][find.index];
        that.form.endLon = 0;
        that.form.endLat = 0;
        that.form.endAlt = 0;
        that.form.startLon = 0;
        that.form.startLat = 0;
        that.form.startAlt = 0;
        that.startLonMin = 0;
        that.startLatMin = 0;
        that.startAltMin = 0;
        that.endLonMin = 0;
        that.endLatMin = 0;
        that.endAltMin = 0;
        that.startLonMax = 0;
        that.startLatMax = 0;
        that.startAltMax = 0;
        that.endLonMax = 0;
        that.endLatMax = 0;
        that.endAltMax = 0;
      }
    }
  },
  mounted: function mounted() {
    window.visiblity = window.visiblity || [[], []];
  },
  destroyed: function destroyed() {
    var webGlobe = this.webGlobe;
    var find = this.findSource();
    webGlobe.viewer.scene.VisualAnalysisManager.remove(window.visiblity[this.index][find.index]);
    delete window.visiblity;
    window.visiblity = [[], []];
  }
});
// CONCATENATED MODULE: ./src/components/Analysis/Sightline.vue?vue&type=script&lang=js&
 /* harmony default export */ var Analysis_Sightlinevue_type_script_lang_js_ = (Sightlinevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/Analysis/Sightline.vue?vue&type=style&index=0&id=56b74dc2&scoped=true&lang=css&
var Sightlinevue_type_style_index_0_id_56b74dc2_scoped_true_lang_css_ = __webpack_require__("e1b4");

// CONCATENATED MODULE: ./src/components/Analysis/Sightline.vue






/* normalize component */

var Sightline_component = normalizeComponent(
  Analysis_Sightlinevue_type_script_lang_js_,
  Sightlinevue_type_template_id_56b74dc2_scoped_true_render,
  Sightlinevue_type_template_id_56b74dc2_scoped_true_staticRenderFns,
  false,
  null,
  "56b74dc2",
  null
  
)

/* harmony default export */ var Sightline = (Sightline_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4746d4ad-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Analysis/SkyLine.vue?vue&type=template&id=4e9af41b&scoped=true&
var SkyLinevue_type_template_id_4e9af41b_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:['skyl',{ right: _vm.position === 'right', left: _vm.position === 'left' }]},[_c('div',{staticClass:"card-title",style:({
              background: 'rgb(38, 151, 204)',
              padding: '5px',
              color: 'white',
          })},[_vm._v("\n    天际线分析\n  ")]),_c('a-card',[_c('a-button',{staticClass:"content",attrs:{"type":"primary"},on:{"click":_vm.startSkyLine}},[_vm._v("开始绘制")]),_c('a-button',{staticClass:"content-clear",attrs:{"type":"primary"},on:{"click":_vm.clearSkyLine}},[_vm._v("清除")])],1)],1)}
var SkyLinevue_type_template_id_4e9af41b_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Analysis/SkyLine.vue?vue&type=template&id=4e9af41b&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Analysis/SkyLine.vue?vue&type=script&lang=js&


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var SkyLinevue_type_script_lang_js_ = ({
  name: "mapgis-3d-skyline",
  props: {
    index: {
      type: Number,
      default: 0
    },
    position: {
      type: String,
      default: "right"
    }
  },
  inject: ["Cesium", "CesiumZondy", "webGlobe"],
  data: function data() {
    return {
      //定义天地线分析
      skyLineAn: false
    };
  },
  mounted: function mounted() {
    window.skyline = window.skyline || [[], []];
  },
  destroyed: function destroyed() {
    var webGlobe = this.webGlobe;
    var find = this.findSource();
    webGlobe.viewer.scene.VisualAnalysisManager.remove(window.skyline[this.index][find.index]);
    delete window.skyline;
    window.skyline = [[], []];
  },
  methods: {
    findSource: function findSource() {
      var vm = this;
      var index = -1;
      var find = window.skyline[this.index].find(function (s, i) {
        var result = false;
        var layer = vm.layer;

        if (s instanceof Cesium.SkyLineAnalysis) {
          index = i;
          result = true;
        }

        return result;
      });
      return {
        index: index,
        value: find
      };
    },
    startSkyLine: function startSkyLine() {
      var that = this;
      var viewer = that.webGlobe.viewer;
      viewer.scene.globe.depthTestAgainstTerrain = true;
      viewer.scene.globe.enableTransparent = false;

      if (that.skyLineAn === false) {
        that.skyLineAn = true;
        window.skyline[that.index].push(new Cesium.SkyLineAnalysis(viewer.scene));
      }

      if (that.skyLineAn) {
        var find = that.findSource();
        var skyline3d = window.skyline[that.index][find.index]; //添加天际线分析结果显示

        viewer.scene.VisualAnalysisManager.add(skyline3d);
      }
    },
    clearSkyLine: function clearSkyLine() {
      var that = this;
      var viewer = that.webGlobe.viewer;
      var find = that.findSource();
      viewer.scene.globe.depthTestAgainstTerrain = true;

      if (that.skyLineAn === true) {
        //删除分析结果
        viewer.scene.VisualAnalysisManager.remove(window.skyline[this.index][find.index]);
        delete window.skyline[this.index][find.index];
        that.skyLineAn = false;
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/Analysis/SkyLine.vue?vue&type=script&lang=js&
 /* harmony default export */ var Analysis_SkyLinevue_type_script_lang_js_ = (SkyLinevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/Analysis/SkyLine.vue?vue&type=style&index=0&id=4e9af41b&scoped=true&lang=css&
var SkyLinevue_type_style_index_0_id_4e9af41b_scoped_true_lang_css_ = __webpack_require__("0d96");

// CONCATENATED MODULE: ./src/components/Analysis/SkyLine.vue






/* normalize component */

var SkyLine_component = normalizeComponent(
  Analysis_SkyLinevue_type_script_lang_js_,
  SkyLinevue_type_template_id_4e9af41b_scoped_true_render,
  SkyLinevue_type_template_id_4e9af41b_scoped_true_staticRenderFns,
  false,
  null,
  "4e9af41b",
  null
  
)

/* harmony default export */ var SkyLine = (SkyLine_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4746d4ad-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Analysis/Excavate.vue?vue&type=template&id=124f769a&scoped=true&
var Excavatevue_type_template_id_124f769a_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:['excavate',{ right: _vm.position === 'right', left: _vm.position === 'left' }]},[_c('div',{staticClass:"card-title",style:({
              background: 'rgb(38, 151, 204)',
              padding: '5px',
              color: 'white',
          })},[_vm._v("\n    开挖分析\n  ")]),_c('a-card',[_c('span',{attrs:{"slot":"prefix"},slot:"prefix"},[_vm._v("开挖深度:")]),_c('a-row',{attrs:{"span":12}},[_c('a-slider',{attrs:{"step":10,"min":_vm.mindepth,"max":_vm.maxdepth,"disabled":_vm.excavateAn,"value":parseFloat(_vm.excavateDepth)},on:{"change":_vm.setInput},model:{value:(_vm.excavateDepth),callback:function ($$v) {_vm.excavateDepth=$$v},expression:"excavateDepth"}})],1),_c('a-row',{attrs:{"span":10}},[_c('a-input-number',{style:({marginLeft: '16px'}),attrs:{"min":_vm.mindepth,"max":_vm.maxdepth},model:{value:(_vm.excavateDepth),callback:function ($$v) {_vm.excavateDepth=$$v},expression:"excavateDepth"}})],1)],1)],1)}
var Excavatevue_type_template_id_124f769a_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Analysis/Excavate.vue?vue&type=template&id=124f769a&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Analysis/Excavate.vue?vue&type=script&lang=js&


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var Excavatevue_type_script_lang_js_ = ({
  name: "mapgis-3d-excavate",
  props: {
    index: {
      type: Number,
      default: 0
    },
    position: {
      type: String,
      default: "right"
    },
    planeRatio: {
      type: Number,
      default: 0.6
    },
    vueKey: {
      type: String,
      default: "default"
    },
    vueIndex: {
      type: Number,
      default: function _default() {
        return Number((Math.random() * 100000000).toFixed(0));
      }
    },
    material: {
      type: String,
      defalut: ""
    },
    edgeColor: {
      type: String,
      defalut: ""
    },
    edgeWidth: {
      type: Number,
      defalut: 3
    }
  },
  inject: ["Cesium", "CesiumZondy", "webGlobe"],
  mixins: [ServiceLayer],
  data: function data() {
    return {
      //定义
      excavateDepth: 0,
      excavateAn: false,
      maxdepth: 0,
      mindepth: 0,
      boundingSphere: "",
      waitManagerName: "M3DIgsManager"
    };
  },
  mounted: function mounted() {
    var vm = this;
    vm.$_init(vm.getM3d);
  },
  unmount: function unmount() {
    var CesiumZondy = this.CesiumZondy,
        vueKey = this.vueKey,
        vueIndex = this.vueIndex;
    var find = CesiumZondy.ExcavateAnalysisManager.findSource(vueKey, vueIndex);

    if (find) {
      var options = findSource.options;
      var source = findSource.source;
      options.forEach(function (o) {
        o.destroy();
      });
      source.forEach(function (s) {
        s.destroy();
      });
    } // 这段代码可以认为是对应的vue的获取destroyed生命周期


    CesiumZondy.ExcavateAnalysisManager.deleteSource(vueKey, vueIndex);
    this.$emit("unload", this);
  },
  methods: {
    getM3d: function getM3d() {
      var vm = this;
      var CesiumZondy = this.CesiumZondy,
          webGlobe = this.webGlobe;
      var find = vm.$_getObject();
      vm._boundingVolume = find.source[0]._root._boundingVolume; // 模型包围盒的世界坐标系的中心、东北角、西南角

      var center = vm._boundingVolume.boundingVolume.center;
      var northeastCornerCartesian = vm._boundingVolume.northeastCornerCartesian;
      var southwestCornerCartesian = vm._boundingVolume.southwestCornerCartesian; //这里：东南角和西北角在外包盒子的同一平面上

      var p1 = this.degreefromCartesian(southwestCornerCartesian);
      var p2 = this.degreefromCartesian(northeastCornerCartesian);
      var centerDegree = this.degreefromCartesian(center); // this.drawPoint(p1);
      // this.drawPoint(p2);

      var p3 = {},
          p4 = {};
      p3.longitude = p1.longitude;
      p3.latitude = p2.latitude;
      p3.height = p1.height;
      p4.longitude = p2.longitude;
      p4.latitude = p1.latitude;
      p4.height = p2.height; //p3,p4的笛卡尔坐标

      var p3Caetesian = Cesium.Cartesian3.fromDegrees(p3.longitude, p3.latitude, p3.height);
      var p4Caetesian = Cesium.Cartesian3.fromDegrees(p4.longitude, p4.latitude, p4.height); //求出平面的长和宽，再求出distance

      var length = Cesium.Cartesian3.distance(p4Caetesian, southwestCornerCartesian);
      var width = Cesium.Cartesian3.distance(p3Caetesian, southwestCornerCartesian);
      var beforeAfterDistance = length / 2;
      var leftRightDistance = width / 2; //求外包盒的高度

      var depth = Math.abs(vm._boundingVolume.maximumHeight - vm._boundingVolume.minimumHeight); // let depth = Math.abs(centerDegree.height - p1.height) * 2;
      //将滑动条的最大开挖深度值设置为depth

      vm.mindepth = Math.round(vm._boundingVolume.minimumHeight);
      vm.maxdepth = Math.round(vm._boundingVolume.maximumHeight);
      vm.excavateDepth = vm.maxdepth; //开挖面设置，原点在法向相反的方向，所以distance为负值。

      var planes = [new Cesium.ClippingPlane(new Cesium.Cartesian3(vm.planeRatio, 0.0, 0.0), -beforeAfterDistance), new Cesium.ClippingPlane(new Cesium.Cartesian3(-vm.planeRatio, 0.0, 0.0), -beforeAfterDistance), new Cesium.ClippingPlane(new Cesium.Cartesian3(0.0, vm.planeRatio, 0.0), -leftRightDistance), new Cesium.ClippingPlane(new Cesium.Cartesian3(0.0, -vm.planeRatio, 0.0), -leftRightDistance), new Cesium.ClippingPlane(new Cesium.Cartesian3(0.0, 0.0, -vm.planeRatio), -depth)]; //将获取的开挖示例放到ExcavateAnalysisManager中进行管理

      var analysisManager = new CesiumZondy.Manager.AnalysisManager({
        viewer: webGlobe.viewer
      }); //开挖分析：

      var dynaCut = analysisManager.createExcavateAnalysis({
        //图层信息
        tileset: find.source[0],
        //开挖面的形状
        planes: planes,
        //裁剪面材质
        //Cesium.Color.fromCssColorString(_textColor)
        material: new Cesium.Color(0.2, 0.4, 0.3, 0.7),
        //边界线颜色
        edgeColor: new Cesium.Color(0.2, 0.4, 0.3, 0.7),
        //边界线宽度
        edgeWidth: vm.edgeWidth,
        //裁减法线方向，默认值为 false
        unionClippingRegions: false,
        //开挖坐标
        longitude: centerDegree.longitude,
        latitude: centerDegree.latitude,
        height: centerDegree.height + depth / 2
      });
      CesiumZondy.ExcavateAnalysisManager.addSource(vm.vueKey, vm.vueIndex, dynaCut, {
        planes: planes
      });
      this.$emit("load", vm);
      dynaCut.planes[0].plane.plane = new Cesium.CallbackProperty(function (date) {
        for (var i = 0; i < planes.length; i++) {
          if (i === planes.length - 1) {
            var plane = planes[i];
            plane.distance = vm.excavateDepth;
            Cesium.Plane.transform(plane, find.source[0].modelMatrix, new Cesium.ClippingPlane(Cesium.Cartesian3.UNIT_X, 0.0));
          }
        }
      }, false);
    },
    drawPoint: function drawPoint(p) {
      var CesiumZondy = this.CesiumZondy,
          webGlobe = this.webGlobe;
      var entityController = new CesiumZondy.Manager.EntityController({
        viewer: webGlobe.viewer
      }); //填充颜色

      var fillColor = new Cesium.Color(255 / 255, 255 / 255, 0 / 255, 1); //边线颜色

      var outLineColor = new Cesium.Color(255 / 255, 0 / 255, 0 / 255, 1);
      var point1 = entityController.appendPoint(p.longitude, p.latitude, p.height, '外包盒上的点', 12, fillColor, outLineColor, 2);
    },
    degreefromCartesian: function degreefromCartesian(p) {
      var point = {};
      var cartographic = Cesium.Cartographic.fromCartesian(p);
      point.longitude = Cesium.Math.toDegrees(cartographic.longitude);
      point.latitude = Cesium.Math.toDegrees(cartographic.latitude);
      point.height = cartographic.height; //模型高度

      return point;
    },
    setInput: function setInput(data) {
      var excavateDepth = this.excavateDepth;
      excavateDepth = data;
    }
  }
});
// CONCATENATED MODULE: ./src/components/Analysis/Excavate.vue?vue&type=script&lang=js&
 /* harmony default export */ var Analysis_Excavatevue_type_script_lang_js_ = (Excavatevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/Analysis/Excavate.vue?vue&type=style&index=0&id=124f769a&scoped=true&lang=css&
var Excavatevue_type_style_index_0_id_124f769a_scoped_true_lang_css_ = __webpack_require__("15ca");

// CONCATENATED MODULE: ./src/components/Analysis/Excavate.vue






/* normalize component */

var Excavate_component = normalizeComponent(
  Analysis_Excavatevue_type_script_lang_js_,
  Excavatevue_type_template_id_124f769a_scoped_true_render,
  Excavatevue_type_template_id_124f769a_scoped_true_staticRenderFns,
  false,
  null,
  "124f769a",
  null
  
)

/* harmony default export */ var Excavate = (Excavate_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4746d4ad-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Analysis/Flood.vue?vue&type=template&id=7f0e7ef4&scoped=true&
var Floodvue_type_template_id_7f0e7ef4_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_vm._t("default",function(){return [(_vm.initial)?_c('div',{staticClass:"flood-analyse-box"},[_c('a-row',[_c('a-col',{attrs:{"span":8}},[_c('p',{staticClass:"flood-title"},[_vm._v("最大淹没高度(米):")])]),_c('a-col',{attrs:{"span":12}},[_c('a-slider',{attrs:{"min":0,"max":Number(_vm.maxHeightCopy),"disabled":_vm.disabled},model:{value:(_vm.currentHeightCopy),callback:function ($$v) {_vm.currentHeightCopy=$$v},expression:"currentHeightCopy"}})],1),_c('a-col',{attrs:{"span":4}},[_c('a-input',{model:{value:(_vm.maxHeightCopy),callback:function ($$v) {_vm.maxHeightCopy=$$v},expression:"maxHeightCopy"}})],1)],1),_c('a-row',[_c('a-col',{attrs:{"span":8}},[_c('p',{staticClass:"flood-title"},[_vm._v("颜色:")])]),_c('a-col',{attrs:{"span":12}},[_c('a-input',{staticClass:"flood-input",model:{value:(_vm.floodColorCopy),callback:function ($$v) {_vm.floodColorCopy=$$v},expression:"floodColorCopy"}})],1),(_vm.showPicker)?_c('div',{staticClass:"flood-color-picker"},[_c('colorPicker',{on:{"change":_vm.headleChangeColor},model:{value:(_vm.floodColorCopy),callback:function ($$v) {_vm.floodColorCopy=$$v},expression:"floodColorCopy"}})],1):_vm._e()],1),_c('a-row',[_c('a-col',{attrs:{"span":8}},[_c('p',{staticClass:"flood-title"},[_vm._v("洪水淹没速度:")])]),_c('a-col',{attrs:{"span":12}},[_c('a-input',{staticClass:"flood-input",model:{value:(_vm.floodSpeedCopy),callback:function ($$v) {_vm.floodSpeedCopy=$$v},expression:"floodSpeedCopy"}})],1)],1),_c('a-row',[_c('a-col',{attrs:{"span":8}},[_c('p',{staticClass:"flood-title"},[_vm._v("反射光强度:")])]),_c('a-col',{attrs:{"span":12}},[_c('a-input',{staticClass:"flood-input",model:{value:(_vm.specularIntensityCopy),callback:function ($$v) {_vm.specularIntensityCopy=$$v},expression:"specularIntensityCopy"}})],1)],1),_c('a-row',[_c('a-col',{attrs:{"span":8}},[_c('p',{staticClass:"flood-title"},[_vm._v("水波高度:")])]),_c('a-col',{attrs:{"span":12}},[_c('a-input',{staticClass:"flood-input",model:{value:(_vm.amplitudeCopy),callback:function ($$v) {_vm.amplitudeCopy=$$v},expression:"amplitudeCopy"}})],1)],1),_c('a-row',[_c('a-col',{attrs:{"span":8}},[_c('p',{staticClass:"flood-title"},[_vm._v("水纹速度:")])]),_c('a-col',{attrs:{"span":12}},[_c('a-input',{staticClass:"flood-input",model:{value:(_vm.animationSpeedCopy),callback:function ($$v) {_vm.animationSpeedCopy=$$v},expression:"animationSpeedCopy"}})],1)],1),_c('a-row',[_c('a-col',{attrs:{"span":8}},[_c('p',{staticClass:"flood-title"},[_vm._v("水纹频率:")])]),_c('a-col',{attrs:{"span":12}},[_c('a-input',{staticClass:"flood-input",model:{value:(_vm.frequencyCopy),callback:function ($$v) {_vm.frequencyCopy=$$v},expression:"frequencyCopy"}})],1)],1),_c('a-row',[_c('a-col',{attrs:{"span":8}},[_c('a-button',{staticClass:"flood-button",attrs:{"type":"primary","disabled":!_vm.disabled},on:{"click":_vm.$_startAnalyse}},[_vm._v("开始分析")])],1),_c('a-col',{attrs:{"span":8}},[_c('a-button',{staticClass:"flood-button flood-button-stop",attrs:{"disabled":_vm.disabled},on:{"click":_vm.$_stopAnalyse}},[_vm._v("停止分析")])],1)],1)],1):_vm._e()]})],2)}
var Floodvue_type_template_id_7f0e7ef4_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Analysis/Flood.vue?vue&type=template&id=7f0e7ef4&scoped=true&

// CONCATENATED MODULE: ./src/components/Analysis/ServiceLayer.js







function Analysis_ServiceLayer_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function Analysis_ServiceLayer_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { Analysis_ServiceLayer_ownKeys(Object(source), true).forEach(function (key) { Object(defineProperty["a" /* default */])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { Analysis_ServiceLayer_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/* harmony default export */ var Analysis_ServiceLayer = ({
  inject: ["webGlobe", "Cesium"],
  props: {
    vueKey: {
      type: String,
      default: "default"
    },
    vueIndex: {
      type: Number,
      default: function _default() {
        return Number((Math.random() * 100000000).toFixed(0));
      }
    },
    terrainGraphics: {
      type: Object,
      default: function _default() {
        return {
          //是否指定各点高度
          perPositionHeight: true,
          //颜色
          material: new Cesium.Color(33 / 255, 150 / 255, 243 / 255, 0),
          //轮廓线是否显示
          outline: false,
          //轮廓线颜色
          outlineColor: Cesium.Color.RED
        };
      }
    }
  },
  data: function data() {
    return {};
  },
  methods: {
    $_getCesium: function $_getCesium() {
      var Cesium = this.Cesium;

      if (!Cesium) {
        Cesium = window.Cesium;
      }

      return Cesium;
    },
    $_draw: function $_draw(drawFunction, webGlobe, analyseFunction, analysisName) {
      window.drawElement = new window.Cesium.DrawElement(webGlobe.viewer);
      var vm = this;
      console.log("drawElement", drawElement);
      window.drawElement[drawFunction]({
        callback: function callback(positions) {
          console.log("positions", positions);
          vm[analyseFunction](webGlobe, positions, analysisName);
        }
      });
    },
    $_terrainAnalyse: function $_terrainAnalyse(webGlobe, positions, analysisName) {
      if (positions.length > 0) {
        var pointArr = new Array();
        var Npositions = [];
        var terrainAnalyse = new window.Cesium.TerrainAnalyse(webGlobe.viewer, {}); //必须要一个原点,可以写死

        var transform = terrainAnalyse.getTransform(115.5, 30.5, 0.0);
        var inverseTransform = Cesium.Matrix4.inverse(transform, new Cesium.Matrix4());
        var globe = webGlobe.viewer.scene.globe;
        globe.modifiedSlopeMatrix = inverseTransform; //坐标转换、处理

        for (var i = 0; i < positions.length; i++) {
          var point = positions[i];
          var ellipsoid = globe.ellipsoid;
          var cartesian3 = new Cesium.Cartesian3(point.x, point.y, point.z);
          var cartographic = ellipsoid.cartesianToCartographic(cartesian3);
          var lat = Cesium.Math.toDegrees(cartographic.latitude);
          var lon = Cesium.Math.toDegrees(cartographic.longitude);
          var height = cartographic.height;
          pointArr.push(lon, lat, height);
          var geoPosition = Cesium.Matrix4.multiplyByPoint(inverseTransform, new Cesium.Cartesian3.fromDegrees(lon, lat, height), new Cesium.Cartesian3());
          Npositions.push(geoPosition);
        }

        Npositions.push(Npositions[0]);
        globe.selectArea = Npositions; //构造区对象

        var polygon = {
          name: "立体区",
          polygon: Analysis_ServiceLayer_objectSpread({
            //坐标点
            hierarchy: Cesium.Cartesian3.fromDegreesArrayHeights(pointArr)
          }, this.terrainGraphics)
        }; //绘制图形通用方法：对接Cesium原生特性

        webGlobe.appendGraphics(polygon); //更新地形

        terrainAnalyse.updateMaterial(analysisName);
      }
    },
    $_initAnalysis: function $_initAnalysis(drawFunction, analyseFunction, analysisName) {
      var vm = this;
      window.CesiumZondy.getWebGlobeByInterval(function (webGlobe) {
        vm.$_draw(drawFunction, webGlobe, analyseFunction, analysisName);
      }, this.vueKey);
    }
  }
});
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Analysis/Flood.vue?vue&type=script&lang=js&




//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var Floodvue_type_script_lang_js_ = ({
  name: "mapgis-3d-flood",
  mixins: [Analysis_ServiceLayer],
  props: {
    startHeight: {
      type: Number,
      default: 0
    },
    minHeight: {
      type: Number,
      default: 0
    },
    currentHeight: {
      type: Number,
      default: 0
    },
    maxHeight: {
      type: Number,
      default: 200
    },
    floodColor: {
      type: String,
      default: "#4e81bb"
    },
    floodSpeed: {
      type: Number,
      default: 30
    },
    specularIntensity: {
      type: Number,
      default: 1
    },
    amplitude: {
      type: Number,
      default: 10
    },
    animationSpeed: {
      type: Number,
      default: 0.01
    },
    frequency: {
      type: Number,
      default: 1000
    },
    showPicker: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    currentHeightCopy: {
      handler: function handler() {
        //开始分析后的下一帧，开启高度监听
        if (this.isFlood) {
          var vueKey = this.vueKey,
              vueIndex = this.vueIndex;

          var _webGlobe = window.CesiumZondy.getWebGlobe(vueKey);

          var floodAnalyseManager = window.CesiumZondy.FloodAnalyseManager.findSource(vueKey, vueIndex);

          if (floodAnalyseManager && floodAnalyseManager.hasOwnProperty("source") && floodAnalyseManager.source) {
            var floodAnalyse = floodAnalyseManager.source;
            floodAnalyse.maxHeight = Number(this.currentHeightCopy);
            floodAnalyse.floodSpeed = Number(this.floodSpeedCopy);
            floodAnalyse.frequency = Number(this.frequencyCopy);
            floodAnalyse.animationSpeed = Number(this.animationSpeedCopy);
            floodAnalyse.amplitude = Number(this.amplitudeCopy);
            floodAnalyse.specularIntensity = Number(this.specularIntensityCopy);
            floodAnalyse.isDownFlood = Number(this.floodHeightCopyTwo) > Number(this.currentHeightCopy);

            _webGlobe.scene.requestRender(); //存储高度，方便下一次比较


            this.floodHeightCopyTwo = this.currentHeightCopy;
          }
        }
      }
    },
    startHeight: {
      handler: function handler() {
        this.startHeightCopy = this.startHeight;
      }
    },
    minHeight: {
      handler: function handler() {
        this.minHeightCopy = this.minHeight;
      }
    },
    floodColor: {
      handler: function handler() {
        this.floodColorCopy = this.floodColor;
      }
    },
    maxHeight: {
      handler: function handler() {
        this.maxHeightCopy = this.maxHeight;
      }
    },
    floodSpeed: {
      handler: function handler() {
        this.floodSpeedCopy = this.floodSpeed;
      }
    },
    specularIntensity: {
      handler: function handler() {
        this.specularIntensityCopy = this.specularIntensity;
      }
    },
    amplitude: {
      handler: function handler() {
        this.amplitudeCopy = this.amplitude;
      }
    },
    animationSpeed: {
      handler: function handler() {
        this.animationSpeedCopy = this.animationSpeed;
      }
    },
    frequency: {
      handler: function handler() {
        this.frequencyCopy = this.frequency;
      }
    },
    currentHeight: {
      handler: function handler() {
        this.currentHeightCopy = this.currentHeight;
      }
    }
  },
  data: function data() {
    return {
      selectDefault: 'startDrawingPolygon',
      drawToolName: "startDrawingPolygon",
      // tools: [{
      //   name: "startDrawingPolygon",
      //   value: "多边形工具"
      // }, {
      //   name: "startDrawingExtent",
      //   value: "矩形工具"
      // }],
      initial: false,
      startHeightCopy: 0,
      minHeightCopy: 0,
      currentHeightCopy: 0,
      currentHeightCopyTwo: 0,
      maxHeightCopy: 0,
      floodColorCopy: "#4e81bb",
      floodSpeedCopy: 0,
      specularIntensityCopy: 0,
      amplitudeCopy: 0,
      animationSpeedCopy: 0,
      frequencyCopy: 0,
      disabled: true,
      isFlood: false
    };
  },
  mounted: function mounted() {
    var vm = this;
    window.CesiumZondy.getWebGlobeByInterval(function (webGlobe) {
      vm.$_init();
      vm.initial = true;
      vm.$emit("load", vm, webGlobe);
    }, this.vueKey);
  },
  methods: {
    //对外的开始分析方法
    startAnalyse: function startAnalyse() {
      this.$_startAnalyse();
    },
    //对外的停止分析方法
    stopAnalyse: function stopAnalyse() {
      this.$_stopAnalyse();
    },
    //颜色拾取事件
    headleChangeColor: function headleChangeColor(color) {
      this.floodColorCopy = color;
    },
    //由于无法改变props，因此复制这些值
    $_init: function $_init() {
      var vm = this;
      Object.keys(this.$props).forEach(function (key) {
        vm[key + "Copy"] = vm.$props[key];
      });
    },
    // $_selectChange(value) {
    //   this.drawToolName = value;
    // },
    //开始洪水淹没分析
    $_floodAnalyse: function $_floodAnalyse(webGlobe, positions) {
      //确保开始洪水分析后，不会触发currentHeightCopy的更新操作，不然会出现分析失灵的情况
      this.isFlood = false; //如果没有注入Cesium，则取得window上面的

      var Cesium = this.Cesium,
          vueKey = this.vueKey,
          vueIndex = this.vueIndex;

      if (!Cesium) {
        Cesium = window.Cesium;
      } //开始分析前，删除上一次分析


      if (webGlobe.scene.VisualAnalysisManager._visualAnalysisList.length > 0) {
        webGlobe.scene.VisualAnalysisManager.removeAll();
        window.CesiumZondy.FloodAnalyseManager.deleteSource(vueKey, vueIndex);
      } //将笛卡尔坐标转为经纬度坐标


      var cartographics = [],
          height = 0;

      for (var i = 0; i < positions.length; i++) {
        cartographics.push(Cesium.Cartographic.fromCartesian(positions[i]));
        height += Cesium.Cartographic.fromCartesian(positions[i]).height;
      } //极端洪水淹没平均高度


      this.currentHeightCopy = height / cartographics.length;
      this.currentHeightCopyTwo = this.currentHeightCopy; //初始化新的洪水淹没分析

      var floodAnalyse = new Cesium.FloodAnalysis(webGlobe.viewer, positions, {
        //设置洪水淹没水体起始高度
        startHeight: Number(this.startHeightCopy),
        //设置洪水淹没区域动画最低高度
        minHeight: Number(this.minHeightCopy),
        //设置洪水淹没区域最高高度
        maxHeight: Number(this.currentHeightCopy),
        //设置洪水上涨速度
        floodSpeed: Number(this.floodSpeedCopy),
        floodColor: Cesium.Color.fromCssColorString(this.floodColorCopy),
        //水纹频率 指波浪的个数
        frequency: Number(this.frequencyCopy),
        //水纹速度
        animationSpeed: Number(this.animationSpeedCopy),
        //水波的高度
        amplitude: Number(this.amplitudeCopy),
        // 指定光线强度
        specularIntensity: Number(this.specularIntensityCopy)
      });
      window.CesiumZondy.FloodAnalyseManager.addSource(vueKey, vueIndex, floodAnalyse); //设置深度检测

      webGlobe.viewer.scene.globe.depthTestAgainstTerrain = true; //添加洪水淹没结果显示

      webGlobe.scene.VisualAnalysisManager.add(floodAnalyse); //一定是在下一帧，开启对currentHeightCopy的监听操作

      this.$nextTick(function () {
        this.isFlood = true;
      });
    },
    //开始洪水淹没分析
    $_startAnalyse: function $_startAnalyse() {
      //开始分析前先禁用进度条以及停止分析按钮
      this.disabled = false;
      this.$_initAnalysis(this.drawToolName, "$_floodAnalyse");
    },
    //停止洪水淹没分析
    $_stopAnalyse: function $_stopAnalyse() {
      if (webGlobe.scene.VisualAnalysisManager._visualAnalysisList.length > 0) {
        //删除淹没分析
        webGlobe.scene.VisualAnalysisManager.removeAll(); //停止绘制

        window.drawElement.stopDrawing(); //启用开始分析按钮

        this.disabled = true; //高度置零

        this.currentHeight = 0;
        this.currentHeightCopy = 0;
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/Analysis/Flood.vue?vue&type=script&lang=js&
 /* harmony default export */ var Analysis_Floodvue_type_script_lang_js_ = (Floodvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/Analysis/Flood.vue?vue&type=style&index=0&id=7f0e7ef4&scoped=true&lang=css&
var Floodvue_type_style_index_0_id_7f0e7ef4_scoped_true_lang_css_ = __webpack_require__("0e80");

// CONCATENATED MODULE: ./src/components/Analysis/Flood.vue






/* normalize component */

var Flood_component = normalizeComponent(
  Analysis_Floodvue_type_script_lang_js_,
  Floodvue_type_template_id_7f0e7ef4_scoped_true_render,
  Floodvue_type_template_id_7f0e7ef4_scoped_true_staticRenderFns,
  false,
  null,
  "7f0e7ef4",
  null
  
)

/* harmony default export */ var Flood = (Flood_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4746d4ad-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Analysis/FloodNoSlot.vue?vue&type=template&id=70b9094e&scoped=true&
var FloodNoSlotvue_type_template_id_70b9094e_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.initial)?_c('div',{staticClass:"flood-analyse-box"},[_c('a-row',[_c('a-col',{attrs:{"span":8}},[_c('p',{staticClass:"flood-title"},[_vm._v("最大淹没高度(米):")])]),_c('a-col',{attrs:{"span":12}},[_c('a-slider',{attrs:{"min":0,"max":Number(_vm.maxHeightCopy),"disabled":_vm.disabled},model:{value:(_vm.currentHeightCopy),callback:function ($$v) {_vm.currentHeightCopy=$$v},expression:"currentHeightCopy"}})],1),_c('a-col',{attrs:{"span":4}},[_c('a-input',{model:{value:(_vm.maxHeightCopy),callback:function ($$v) {_vm.maxHeightCopy=$$v},expression:"maxHeightCopy"}})],1)],1),_c('a-row',[_c('a-col',{attrs:{"span":8}},[_c('p',{staticClass:"flood-title"},[_vm._v("颜色:")])]),_c('a-col',{attrs:{"span":12}},[_c('a-input',{staticClass:"flood-input",model:{value:(_vm.floodColorCopy),callback:function ($$v) {_vm.floodColorCopy=$$v},expression:"floodColorCopy"}})],1),_c('div',{staticClass:"flood-color-picker"},[_c('colorPicker',{on:{"change":_vm.headleChangeColor},model:{value:(_vm.floodColorCopy),callback:function ($$v) {_vm.floodColorCopy=$$v},expression:"floodColorCopy"}})],1)],1),_c('a-row',[_c('a-col',{attrs:{"span":8}},[_c('p',{staticClass:"flood-title"},[_vm._v("洪水淹没速度:")])]),_c('a-col',{attrs:{"span":12}},[_c('a-input',{staticClass:"flood-input",model:{value:(_vm.floodSpeedCopy),callback:function ($$v) {_vm.floodSpeedCopy=$$v},expression:"floodSpeedCopy"}})],1)],1),_c('a-row',[_c('a-col',{attrs:{"span":8}},[_c('p',{staticClass:"flood-title"},[_vm._v("反射光强度:")])]),_c('a-col',{attrs:{"span":12}},[_c('a-input',{staticClass:"flood-input",model:{value:(_vm.specularIntensityCopy),callback:function ($$v) {_vm.specularIntensityCopy=$$v},expression:"specularIntensityCopy"}})],1)],1),_c('a-row',[_c('a-col',{attrs:{"span":8}},[_c('p',{staticClass:"flood-title"},[_vm._v("水波高度:")])]),_c('a-col',{attrs:{"span":12}},[_c('a-input',{staticClass:"flood-input",model:{value:(_vm.amplitudeCopy),callback:function ($$v) {_vm.amplitudeCopy=$$v},expression:"amplitudeCopy"}})],1)],1),_c('a-row',[_c('a-col',{attrs:{"span":8}},[_c('p',{staticClass:"flood-title"},[_vm._v("水纹速度:")])]),_c('a-col',{attrs:{"span":12}},[_c('a-input',{staticClass:"flood-input",model:{value:(_vm.animationSpeedCopy),callback:function ($$v) {_vm.animationSpeedCopy=$$v},expression:"animationSpeedCopy"}})],1)],1),_c('a-row',[_c('a-col',{attrs:{"span":8}},[_c('p',{staticClass:"flood-title"},[_vm._v("水纹频率:")])]),_c('a-col',{attrs:{"span":12}},[_c('a-input',{staticClass:"flood-input",model:{value:(_vm.frequencyCopy),callback:function ($$v) {_vm.frequencyCopy=$$v},expression:"frequencyCopy"}})],1)],1),_c('a-row',[_c('a-col',{attrs:{"span":8}},[_c('a-button',{staticClass:"flood-button",attrs:{"type":"primary","disabled":!_vm.disabled},on:{"click":_vm.$_startAnalyse}},[_vm._v("开始分析")])],1),_c('a-col',{attrs:{"span":8}},[_c('a-button',{staticClass:"flood-button flood-button-stop",attrs:{"disabled":_vm.disabled},on:{"click":_vm.$_stopAnalyse}},[_vm._v("停止分析")])],1)],1)],1):_vm._e()}
var FloodNoSlotvue_type_template_id_70b9094e_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Analysis/FloodNoSlot.vue?vue&type=template&id=70b9094e&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Analysis/FloodNoSlot.vue?vue&type=script&lang=js&




//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var FloodNoSlotvue_type_script_lang_js_ = ({
  name: "mapgis-3d-flood-no-slot",
  mixins: [Analysis_ServiceLayer],
  props: {
    startHeight: {
      type: Number,
      default: 0
    },
    minHeight: {
      type: Number,
      default: 0
    },
    currentHeight: {
      type: Number,
      default: 0
    },
    maxHeight: {
      type: Number,
      default: 200
    },
    floodColor: {
      type: String,
      default: "#4e81bb"
    },
    floodSpeed: {
      type: Number,
      default: 30
    },
    specularIntensity: {
      type: Number,
      default: 1
    },
    amplitude: {
      type: Number,
      default: 10
    },
    animationSpeed: {
      type: Number,
      default: 0.01
    },
    frequency: {
      type: Number,
      default: 1000
    }
  },
  watch: {
    currentHeightCopy: {
      handler: function handler() {
        //开始分析后的下一帧，开启高度监听
        if (this.isFlood) {
          var vueKey = this.vueKey,
              vueIndex = this.vueIndex;

          var _webGlobe = window.CesiumZondy.getWebGlobe(vueKey);

          var floodAnalyseManager = window.CesiumZondy.FloodAnalyseManager.findSource(vueKey, vueIndex);

          if (floodAnalyseManager && floodAnalyseManager.hasOwnProperty("source") && floodAnalyseManager.source) {
            var floodAnalyse = floodAnalyseManager.source;
            floodAnalyse.maxHeight = Number(this.currentHeightCopy);
            floodAnalyse.floodSpeed = Number(this.floodSpeedCopy);
            floodAnalyse.frequency = Number(this.frequencyCopy);
            floodAnalyse.animationSpeed = Number(this.animationSpeedCopy);
            floodAnalyse.amplitude = Number(this.amplitudeCopy);
            floodAnalyse.specularIntensity = Number(this.specularIntensityCopy);
            floodAnalyse.isDownFlood = Number(this.floodHeightCopyTwo) > Number(this.currentHeightCopy);

            _webGlobe.scene.requestRender(); //存储高度，方便下一次比较


            this.floodHeightCopyTwo = this.currentHeightCopy;
          }
        }
      }
    },
    startHeight: {
      handler: function handler() {
        this.startHeightCopy = this.startHeight;
      }
    },
    minHeight: {
      handler: function handler() {
        this.minHeightCopy = this.minHeight;
      }
    },
    floodColor: {
      handler: function handler() {
        this.floodColorCopy = this.floodColor;
      }
    },
    maxHeight: {
      handler: function handler() {
        this.maxHeightCopy = this.maxHeight;
      }
    },
    floodSpeed: {
      handler: function handler() {
        this.floodSpeedCopy = this.floodSpeed;
      }
    },
    specularIntensity: {
      handler: function handler() {
        this.specularIntensityCopy = this.specularIntensity;
      }
    },
    amplitude: {
      handler: function handler() {
        this.amplitudeCopy = this.amplitude;
      }
    },
    animationSpeed: {
      handler: function handler() {
        this.animationSpeedCopy = this.animationSpeed;
      }
    },
    frequency: {
      handler: function handler() {
        this.frequencyCopy = this.frequency;
      }
    },
    currentHeight: {
      handler: function handler() {
        this.currentHeightCopy = this.currentHeight;
      }
    }
  },
  data: function data() {
    return {
      selectDefault: 'startDrawingPolygon',
      drawToolName: "startDrawingPolygon",
      // tools: [{
      //   name: "startDrawingPolygon",
      //   value: "多边形工具"
      // }, {
      //   name: "startDrawingExtent",
      //   value: "矩形工具"
      // }],
      initial: false,
      startHeightCopy: 0,
      minHeightCopy: 0,
      currentHeightCopy: 0,
      currentHeightCopyTwo: 0,
      maxHeightCopy: 0,
      floodColorCopy: "#4e81bb",
      floodSpeedCopy: 0,
      specularIntensityCopy: 0,
      amplitudeCopy: 0,
      animationSpeedCopy: 0,
      frequencyCopy: 0,
      disabled: true,
      isFlood: false
    };
  },
  mounted: function mounted() {
    var vm = this;
    window.CesiumZondy.getWebGlobeByInterval(function (webGlobe) {
      vm.$_init();
      vm.initial = true;
      vm.$emit("load", vm, webGlobe);
    }, this.vueKey);
  },
  methods: {
    //对外的开始分析方法
    startAnalyse: function startAnalyse() {
      this.$_startAnalyse();
    },
    //对外的停止分析方法
    stopAnalyse: function stopAnalyse() {
      this.$_stopAnalyse();
    },
    //颜色拾取事件
    headleChangeColor: function headleChangeColor(color) {
      this.floodColorCopy = color;
    },
    //由于无法改变props，因此复制这些值
    $_init: function $_init() {
      var vm = this;
      Object.keys(this.$props).forEach(function (key) {
        vm[key + "Copy"] = vm.$props[key];
      });
    },
    // $_selectChange(value) {
    //   this.drawToolName = value;
    // },
    //开始洪水淹没分析
    $_floodAnalyse: function $_floodAnalyse(webGlobe, positions) {
      //确保开始洪水分析后，不会触发currentHeightCopy的更新操作，不然会出现分析失灵的情况
      this.isFlood = false; //如果没有注入Cesium，则取得window上面的

      var Cesium = this.Cesium,
          vueKey = this.vueKey,
          vueIndex = this.vueIndex;

      if (!Cesium) {
        Cesium = window.Cesium;
      } //开始分析前，删除上一次分析


      if (webGlobe.scene.VisualAnalysisManager._visualAnalysisList.length > 0) {
        webGlobe.scene.VisualAnalysisManager.removeAll();
        window.CesiumZondy.FloodAnalyseManager.deleteSource(vueKey, vueIndex);
      } //将笛卡尔坐标转为经纬度坐标


      var cartographics = [],
          height = 0;

      for (var i = 0; i < positions.length; i++) {
        cartographics.push(Cesium.Cartographic.fromCartesian(positions[i]));
        height += Cesium.Cartographic.fromCartesian(positions[i]).height;
      } //极端洪水淹没平均高度


      this.currentHeightCopy = height / cartographics.length;
      this.currentHeightCopyTwo = this.currentHeightCopy; //初始化新的洪水淹没分析

      var floodAnalyse = new Cesium.FloodAnalysis(webGlobe.viewer, positions, {
        //设置洪水淹没水体起始高度
        startHeight: Number(this.startHeightCopy),
        //设置洪水淹没区域动画最低高度
        minHeight: Number(this.minHeightCopy),
        //设置洪水淹没区域最高高度
        maxHeight: Number(this.currentHeightCopy),
        //设置洪水上涨速度
        floodSpeed: Number(this.floodSpeedCopy),
        floodColor: Cesium.Color.fromCssColorString(this.floodColorCopy),
        //水纹频率 指波浪的个数
        frequency: Number(this.frequencyCopy),
        //水纹速度
        animationSpeed: Number(this.animationSpeedCopy),
        //水波的高度
        amplitude: Number(this.amplitudeCopy),
        // 指定光线强度
        specularIntensity: Number(this.specularIntensityCopy)
      });
      window.CesiumZondy.FloodAnalyseManager.addSource(vueKey, vueIndex, floodAnalyse); //设置深度检测

      webGlobe.viewer.scene.globe.depthTestAgainstTerrain = true; //添加洪水淹没结果显示

      webGlobe.scene.VisualAnalysisManager.add(floodAnalyse); //一定是在下一帧，开启对currentHeightCopy的监听操作

      this.$nextTick(function () {
        this.isFlood = true;
      });
    },
    //开始洪水淹没分析
    $_startAnalyse: function $_startAnalyse() {
      //开始分析前先禁用进度条以及停止分析按钮
      this.disabled = false;
      this.$_initAnalysis(this.drawToolName, "$_floodAnalyse");
    },
    //停止洪水淹没分析
    $_stopAnalyse: function $_stopAnalyse() {
      if (webGlobe.scene.VisualAnalysisManager._visualAnalysisList.length > 0) {
        //删除淹没分析
        webGlobe.scene.VisualAnalysisManager.removeAll(); //停止绘制

        window.drawElement.stopDrawing(); //启用开始分析按钮

        this.disabled = true; //高度置零

        this.currentHeight = 0;
        this.currentHeightCopy = 0;
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/Analysis/FloodNoSlot.vue?vue&type=script&lang=js&
 /* harmony default export */ var Analysis_FloodNoSlotvue_type_script_lang_js_ = (FloodNoSlotvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/Analysis/FloodNoSlot.vue?vue&type=style&index=0&id=70b9094e&scoped=true&lang=css&
var FloodNoSlotvue_type_style_index_0_id_70b9094e_scoped_true_lang_css_ = __webpack_require__("6ca1");

// CONCATENATED MODULE: ./src/components/Analysis/FloodNoSlot.vue






/* normalize component */

var FloodNoSlot_component = normalizeComponent(
  Analysis_FloodNoSlotvue_type_script_lang_js_,
  FloodNoSlotvue_type_template_id_70b9094e_scoped_true_render,
  FloodNoSlotvue_type_template_id_70b9094e_scoped_true_staticRenderFns,
  false,
  null,
  "70b9094e",
  null
  
)

/* harmony default export */ var FloodNoSlot = (FloodNoSlot_component.exports);
// EXTERNAL MODULE: ./node_modules/vcolorpicker/lib/vcolorpicker.umd.min.js
var vcolorpicker_umd_min = __webpack_require__("a9f5");
var vcolorpicker_umd_min_default = /*#__PURE__*/__webpack_require__.n(vcolorpicker_umd_min);

// CONCATENATED MODULE: ./src/cdn/cdn_component.js
 // 工具




 // export { default as Mapgis3dTable } from "../components/UI/Controls/Table/BaseTable";


 // 影像










 // 矢量瓦片

 // 模型





/* export { default as Mapgis3dMapvLayer} from "../components/Overlay/Mapv3dLayer.vue";
export { default as Mapgis3dEchartsLayer} from "../components/Overlay/Echarts.vue"; */


 // 数据源


 //三维空间分析








// CONCATENATED MODULE: ./src/cdn/main.js


var main_install = function install(Vue, options) {
  for (var name in cdn_component_namespaceObject) {
    var com = cdn_component_namespaceObject[name];

    if (name === "colorPicker") {
      com = cdn_component_namespaceObject[name][name];
    }

    Vue.component(com.options ? com.options.name : com.name, com);
  }
};

if (typeof window !== "undefined" && window["Vue"]) {
  main_install(window["Vue"], {});
}


/* harmony default export */ var main = ({
  install: main_install
});
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (main);



/***/ }),

/***/ "fc33":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "fdef":
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ })

/******/ });