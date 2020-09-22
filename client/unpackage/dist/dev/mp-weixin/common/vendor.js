(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });var


EventChannel = /*#__PURE__*/function () {
  function EventChannel(id, events) {var _this = this;_classCallCheck(this, EventChannel);
    this.id = id;
    this.listener = {};
    this.emitCache = {};
    if (events) {
      Object.keys(events).forEach(function (name) {
        _this.on(name, events[name]);
      });
    }
  }_createClass(EventChannel, [{ key: "emit", value: function emit(

    eventName) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
      var fns = this.listener[eventName];
      if (!fns) {
        return (this.emitCache[eventName] || (this.emitCache[eventName] = [])).push(args);
      }
      fns.forEach(function (opt) {
        opt.fn.apply(opt.fn, args);
      });
      this.listener[eventName] = fns.filter(function (opt) {return opt.type !== 'once';});
    } }, { key: "on", value: function on(

    eventName, fn) {
      this._addListener(eventName, 'on', fn);
      this._clearCache(eventName);
    } }, { key: "once", value: function once(

    eventName, fn) {
      this._addListener(eventName, 'once', fn);
      this._clearCache(eventName);
    } }, { key: "off", value: function off(

    eventName, fn) {
      var fns = this.listener[eventName];
      if (!fns) {
        return;
      }
      if (fn) {
        for (var i = 0; i < fns.length;) {
          if (fns[i].fn === fn) {
            fns.splice(i, 1);
            i--;
          }
          i++;
        }
      } else {
        delete this.listener[eventName];
      }
    } }, { key: "_clearCache", value: function _clearCache(

    eventName) {
      var cacheArgs = this.emitCache[eventName];
      if (cacheArgs) {
        for (; cacheArgs.length > 0;) {
          this.emit.apply(this, [eventName].concat(cacheArgs.shift()));
        }
      }
    } }, { key: "_addListener", value: function _addListener(

    eventName, type, fn) {
      (this.listener[eventName] || (this.listener[eventName] = [])).push({
        fn: fn,
        type: type });

    } }]);return EventChannel;}();


var eventChannels = {};

var eventChannelStack = [];

var id = 0;

function initEventChannel(events) {var cache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  id++;
  var eventChannel = new EventChannel(id, events);
  if (cache) {
    eventChannels[id] = eventChannel;
    eventChannelStack.push(eventChannel);
  }
  return eventChannel;
}

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var navigateTo = {
  args: function args(fromArgs, toArgs) {
    var id = initEventChannel(fromArgs.events).id;
    if (fromArgs.url) {
      fromArgs.url = fromArgs.url + (fromArgs.url.indexOf('?') === -1 ? '?' : '&') + '__id__=' + id;
    }
  },
  returnValue: function returnValue(fromRes, toRes) {
    fromRes.eventChannel = getEventChannel();
  } };


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}
var protocols = {
  redirectTo: redirectTo,
  navigateTo: navigateTo,
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets },

  getSystemInfoSync: {
    returnValue: addSafeAreaInsets } };


var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {args[_key4 - 1] = arguments[_key4];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this2 = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this2.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this2.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this2.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          // eslint-disable-next-line no-sparse-arrays
          ret.push(handler.apply(handlerCtx, (Array.isArray(params) ? params : []).concat([,,,,,,,,,, event])));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  _vue.default.prototype.getOpenerEventChannel = function () {
    if (!this.__eventChannel__) {
      this.__eventChannel__ = new EventChannel();
    }
    return this.__eventChannel__;
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 10:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
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
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

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
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
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


/***/ }),

/***/ 106:
/*!*******************************************************************!*\
  !*** /Users/zhangyunfei/Work/code/chat/pages/api/groupchatapi.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default =
{
  groupchatList: function groupchatList(data) {
    var groupchatList = [];
    for (var i = 1; i <= 3; i++) {
      groupchatList.push({ id: i, name: '群聊' + i, avatar: '/static/icon/avatar.png', msg: '我是' + '昵称' + i });
    }

    data.list = groupchatList;
  } };exports.default = _default;

/***/ }),

/***/ 121:
/*!**************************************************************!*\
  !*** /Users/zhangyunfei/Work/code/chat/pages/api/billapi.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default =
{
  billList: function billList(data) {
    var billList = [];
    for (var i = 1; i <= 20; i++) {
      billList.push({ id: i, title: '昵称' + i, avatar: '/static/icon/avatar.png',
        time: '2020-09-04 13:37', amount: 20.5 });
    }

    data.list = billList;
  } };exports.default = _default;

/***/ }),

/***/ 130:
/*!******************************************************************!*\
  !*** /Users/zhangyunfei/Work/code/chat/pages/api/withdrawapi.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default =
{
  init: function init(data) {
    data.rate = 0.02;
    data.least = 1;
    data.balance = 1000;
  },
  withdraw: function withdraw(amount, data) {
    console.log("提现" + amount);
    data.balance = 1000;
  } };exports.default = _default;

/***/ }),

/***/ 16:
/*!**************************************************************!*\
  !*** /Users/zhangyunfei/Work/code/chat/pages/api/chatapi.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default =
{
  chatList: function chatList(data) {
    var chatList = [];
    for (var i = 1; i <= 20; i++) {
      chatList.push({ id: i, name: '昵称' + i, avatar: '/static/icon/avatar.png', lastMsg: '最后一条消息' + i, lastTime: this.timeToString('2020/09/18 12:37'), unread: i % 3 });
    }

    data.list = chatList;
  },
  timeToString: function timeToString(time) {
    var now = new Date();
    var dateTime = new Date(time);

    if (now.toDateString() === dateTime.toDateString()) {
      var hour = dateTime.getHours();
      var minute = dateTime.getMinutes();
      if (hour < 5) {
        return '凌晨' + hour + ':' + minute;
      } else if (hour >= 5 && hour < 12) {
        return '上午' + hour + ':' + minute;
      } else if (hour === 12) {
        return '中午' + hour + ':' + minute;
      } else if (hour > 12 && hour < 19) {
        return '下午' + (hour - 12) + ':' + minute;
      } else if (hour >= 19 && hour < 24) {
        return '晚上' + (hour - 12) + ':' + minute;
      }
    }

    var yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    if (yesterday.toDateString() === dateTime.toDateString()) {
      return '昨天';
    }

    var nowWeekDay = now.getDay();
    var today = new Date(now.toLocaleDateString()).getTime();
    if (nowWeekDay == 0) nowWeekDay = 7;
    if (today - (nowWeekDay - 1) * 24 * 60 * 60 * 1000 < dateTime.getTime()) {
      var weekStr = ['日', '一', '二', '三', '四', '五', '六'];
      return '周' + weekStr[dateTime.getDay()];
    }

    var year = dateTime.getFullYear();
    var nowYear = now.getFullYear();
    var dayNo = dateTime.getDate();
    var month = dateTime.getMonth() + 1;

    if (nowYear != year) {
      return year + '年' + '' + month + '月' + dayNo + '日';
    } else {
      return month + '月' + dayNo + '日';
    }
  } };exports.default = _default;

/***/ }),

/***/ 171:
/*!**********************************************************************************************!*\
  !*** /Users/zhangyunfei/Work/code/chat/node_modules/@dcloudio/uni-ui/lib/uni-icons/icons.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  "pulldown": "\uE588",
  "refreshempty": "\uE461",
  "back": "\uE471",
  "forward": "\uE470",
  "more": "\uE507",
  "more-filled": "\uE537",
  "scan": "\uE612",
  "qq": "\uE264",
  "weibo": "\uE260",
  "weixin": "\uE261",
  "pengyouquan": "\uE262",
  "loop": "\uE565",
  "refresh": "\uE407",
  "refresh-filled": "\uE437",
  "arrowthindown": "\uE585",
  "arrowthinleft": "\uE586",
  "arrowthinright": "\uE587",
  "arrowthinup": "\uE584",
  "undo-filled": "\uE7D6",
  "undo": "\uE406",
  "redo": "\uE405",
  "redo-filled": "\uE7D9",
  "bars": "\uE563",
  "chatboxes": "\uE203",
  "camera": "\uE301",
  "chatboxes-filled": "\uE233",
  "camera-filled": "\uE7EF",
  "cart-filled": "\uE7F4",
  "cart": "\uE7F5",
  "checkbox-filled": "\uE442",
  "checkbox": "\uE7FA",
  "arrowleft": "\uE582",
  "arrowdown": "\uE581",
  "arrowright": "\uE583",
  "smallcircle-filled": "\uE801",
  "arrowup": "\uE580",
  "circle": "\uE411",
  "eye-filled": "\uE568",
  "eye-slash-filled": "\uE822",
  "eye-slash": "\uE823",
  "eye": "\uE824",
  "flag-filled": "\uE825",
  "flag": "\uE508",
  "gear-filled": "\uE532",
  "reload": "\uE462",
  "gear": "\uE502",
  "hand-thumbsdown-filled": "\uE83B",
  "hand-thumbsdown": "\uE83C",
  "hand-thumbsup-filled": "\uE83D",
  "heart-filled": "\uE83E",
  "hand-thumbsup": "\uE83F",
  "heart": "\uE840",
  "home": "\uE500",
  "info": "\uE504",
  "home-filled": "\uE530",
  "info-filled": "\uE534",
  "circle-filled": "\uE441",
  "chat-filled": "\uE847",
  "chat": "\uE263",
  "mail-open-filled": "\uE84D",
  "email-filled": "\uE231",
  "mail-open": "\uE84E",
  "email": "\uE201",
  "checkmarkempty": "\uE472",
  "list": "\uE562",
  "locked-filled": "\uE856",
  "locked": "\uE506",
  "map-filled": "\uE85C",
  "map-pin": "\uE85E",
  "map-pin-ellipse": "\uE864",
  "map": "\uE364",
  "minus-filled": "\uE440",
  "mic-filled": "\uE332",
  "minus": "\uE410",
  "micoff": "\uE360",
  "mic": "\uE302",
  "clear": "\uE434",
  "smallcircle": "\uE868",
  "close": "\uE404",
  "closeempty": "\uE460",
  "paperclip": "\uE567",
  "paperplane": "\uE503",
  "paperplane-filled": "\uE86E",
  "person-filled": "\uE131",
  "contact-filled": "\uE130",
  "person": "\uE101",
  "contact": "\uE100",
  "images-filled": "\uE87A",
  "phone": "\uE200",
  "images": "\uE87B",
  "image": "\uE363",
  "image-filled": "\uE877",
  "location-filled": "\uE333",
  "location": "\uE303",
  "plus-filled": "\uE439",
  "plus": "\uE409",
  "plusempty": "\uE468",
  "help-filled": "\uE535",
  "help": "\uE505",
  "navigate-filled": "\uE884",
  "navigate": "\uE501",
  "mic-slash-filled": "\uE892",
  "search": "\uE466",
  "settings": "\uE560",
  "sound": "\uE590",
  "sound-filled": "\uE8A1",
  "spinner-cycle": "\uE465",
  "download-filled": "\uE8A4",
  "personadd-filled": "\uE132",
  "videocam-filled": "\uE8AF",
  "personadd": "\uE102",
  "upload": "\uE402",
  "upload-filled": "\uE8B1",
  "starhalf": "\uE463",
  "star-filled": "\uE438",
  "star": "\uE408",
  "trash": "\uE401",
  "phone-filled": "\uE230",
  "compose": "\uE400",
  "videocam": "\uE300",
  "trash-filled": "\uE8DC",
  "download": "\uE403",
  "chatbubble-filled": "\uE232",
  "chatbubble": "\uE202",
  "cloud-download": "\uE8E4",
  "cloud-upload-filled": "\uE8E5",
  "cloud-upload": "\uE8E6",
  "cloud-download-filled": "\uE8E9",
  "headphones": "\uE8BF",
  "shop": "\uE609" };exports.default = _default;

/***/ }),

/***/ 186:
/*!**********************************************************************************************!*\
  !*** /Users/zhangyunfei/Work/code/chat/node_modules/@dcloudio/uni-ui/lib/uni-popup/popup.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _message = _interopRequireDefault(__webpack_require__(/*! ./message.js */ 187));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
// 定义 type 类型:弹出类型：top/bottom/center
var config = {
  // 顶部弹出
  top: 'top',
  // 底部弹出
  bottom: 'bottom',
  // 居中弹出
  center: 'center',
  // 消息提示
  message: 'top',
  // 对话框
  dialog: 'center',
  // 分享
  share: 'bottom' };var _default =


{
  data: function data() {
    return {
      config: config };

  },
  mixins: [_message.default] };exports.default = _default;

/***/ }),

/***/ 187:
/*!************************************************************************************************!*\
  !*** /Users/zhangyunfei/Work/code/chat/node_modules/@dcloudio/uni-ui/lib/uni-popup/message.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  created: function created() {
    if (this.type === 'message') {
      // 不显示遮罩
      this.maskShow = false;
      // 获取子组件对象
      this.childrenMsg = null;
    }
  },
  methods: {
    customOpen: function customOpen() {
      if (this.childrenMsg) {
        this.childrenMsg.open();
      }
    },
    customClose: function customClose() {
      if (this.childrenMsg) {
        this.childrenMsg.close();
      }
    } } };exports.default = _default;

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var rawBindings = vm.__secret_vfa_state__ && vm.__secret_vfa_state__.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }
  
  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 204:
/*!****************************************************************************!*\
  !*** /Users/zhangyunfei/Work/code/chat/node_modules/vue-qr/dist/vue-qr.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function (t, e) { true ? module.exports = e() : undefined;}("undefined" != typeof self ? self : this, function () {return function (t) {function e(n) {if (r[n]) return r[n].exports;var i = r[n] = { i: n, l: !1, exports: {} };return t[n].call(i.exports, i, i.exports, e), i.l = !0, i.exports;}var r = {};return e.m = t, e.c = r, e.d = function (t, r, n) {e.o(t, r) || Object.defineProperty(t, r, { configurable: !1, enumerable: !0, get: n });}, e.n = function (t) {var r = t && t.__esModule ? function () {return t.default;} : function () {return t;};return e.d(r, "a", r), r;}, e.o = function (t, e) {return Object.prototype.hasOwnProperty.call(t, e);}, e.p = "/dist/", e(e.s = 51);}([function (t, e) {var r = t.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();"number" == typeof __g && (__g = r);}, function (t, e, r) {var n = r(26)("wks"),i = r(18),o = r(0).Symbol,a = "function" == typeof o;(t.exports = function (t) {return n[t] || (n[t] = a && o[t] || (a ? o : i)("Symbol." + t));}).store = n;}, function (t, e) {var r = t.exports = { version: "2.6.5" };"number" == typeof __e && (__e = r);}, function (t, e, r) {var n = r(6);t.exports = function (t) {if (!n(t)) throw TypeError(t + " is not an object!");return t;};}, function (t, e, r) {var n = r(5),i = r(17);t.exports = r(7) ? function (t, e, r) {return n.f(t, e, i(1, r));} : function (t, e, r) {return t[e] = r, t;};}, function (t, e, r) {var n = r(3),i = r(36),o = r(23),a = Object.defineProperty;e.f = r(7) ? Object.defineProperty : function (t, e, r) {if (n(t), e = o(e, !0), n(r), i) try {return a(t, e, r);} catch (t) {}if ("get" in r || "set" in r) throw TypeError("Accessors not supported!");return "value" in r && (t[e] = r.value), t;};}, function (t, e) {t.exports = function (t) {return "object" == typeof t ? null !== t : "function" == typeof t;};}, function (t, e, r) {t.exports = !r(16)(function () {return 7 != Object.defineProperty({}, "a", { get: function get() {return 7;} }).a;});}, function (t, e) {var r = {}.hasOwnProperty;t.exports = function (t, e) {return r.call(t, e);};}, function (t, e, r) {var n = r(65),i = r(21);t.exports = function (t) {return n(i(t));};}, function (t, e) {t.exports = !0;}, function (t, e, r) {var n = r(0),i = r(2),o = r(14),a = r(4),s = r(8),u = function u(t, e, r) {var c,l,f,h = t & u.F,p = t & u.G,d = t & u.S,g = t & u.P,v = t & u.B,y = t & u.W,m = p ? i : i[e] || (i[e] = {}),w = m.prototype,b = p ? n : d ? n[e] : (n[e] || {}).prototype;p && (r = e);for (c in r) {(l = !h && b && void 0 !== b[c]) && s(m, c) || (f = l ? b[c] : r[c], m[c] = p && "function" != typeof b[c] ? r[c] : v && l ? o(f, n) : y && b[c] == f ? function (t) {var e = function e(_e, r, n) {if (this instanceof t) {switch (arguments.length) {case 0:return new t();case 1:return new t(_e);case 2:return new t(_e, r);}return new t(_e, r, n);}return t.apply(this, arguments);};return e.prototype = t.prototype, e;}(f) : g && "function" == typeof f ? o(Function.call, f) : f, g && ((m.virtual || (m.virtual = {}))[c] = f, t & u.R && w && !w[c] && a(w, c, f)));}};u.F = 1, u.G = 2, u.S = 4, u.P = 8, u.B = 16, u.W = 32, u.U = 64, u.R = 128, t.exports = u;}, function (t, e) {t.exports = {};}, function (t, e) {var r = {}.toString;t.exports = function (t) {return r.call(t).slice(8, -1);};}, function (t, e, r) {var n = r(15);t.exports = function (t, e, r) {if (n(t), void 0 === e) return t;switch (r) {case 1:return function (r) {return t.call(e, r);};case 2:return function (r, n) {return t.call(e, r, n);};case 3:return function (r, n, i) {return t.call(e, r, n, i);};}return function () {return t.apply(e, arguments);};};}, function (t, e) {t.exports = function (t) {if ("function" != typeof t) throw TypeError(t + " is not a function!");return t;};}, function (t, e) {t.exports = function (t) {try {return !!t();} catch (t) {return !0;}};}, function (t, e) {t.exports = function (t, e) {return { enumerable: !(1 & t), configurable: !(2 & t), writable: !(4 & t), value: e };};}, function (t, e) {var r = 0,n = Math.random();t.exports = function (t) {return "Symbol(".concat(void 0 === t ? "" : t, ")_", (++r + n).toString(36));};}, function (t, e, r) {var n = r(5).f,i = r(8),o = r(1)("toStringTag");t.exports = function (t, e, r) {t && !i(t = r ? t : t.prototype, o) && n(t, o, { configurable: !0, value: e });};}, function (t, e) {var r = Math.ceil,n = Math.floor;t.exports = function (t) {return isNaN(t = +t) ? 0 : (t > 0 ? n : r)(t);};}, function (t, e) {t.exports = function (t) {if (void 0 == t) throw TypeError("Can't call method on  " + t);return t;};}, function (t, e, r) {var n = r(6),i = r(0).document,o = n(i) && n(i.createElement);t.exports = function (t) {return o ? i.createElement(t) : {};};}, function (t, e, r) {var n = r(6);t.exports = function (t, e) {if (!n(t)) return t;var r, i;if (e && "function" == typeof (r = t.toString) && !n(i = r.call(t))) return i;if ("function" == typeof (r = t.valueOf) && !n(i = r.call(t))) return i;if (!e && "function" == typeof (r = t.toString) && !n(i = r.call(t))) return i;throw TypeError("Can't convert object to primitive value");};}, function (t, e, r) {var n = r(39),i = r(27);t.exports = Object.keys || function (t) {return n(t, i);};}, function (t, e, r) {var n = r(26)("keys"),i = r(18);t.exports = function (t) {return n[t] || (n[t] = i(t));};}, function (t, e, r) {var n = r(2),i = r(0),o = i["__core-js_shared__"] || (i["__core-js_shared__"] = {});(t.exports = function (t, e) {return o[t] || (o[t] = void 0 !== e ? e : {});})("versions", []).push({ version: n.version, mode: r(10) ? "pure" : "global", copyright: "© 2019 Denis Pushkarev (zloirock.ru)" });}, function (t, e) {t.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");}, function (t, e, r) {"use strict";function n(t) {var e, r;this.promise = new t(function (t, n) {if (void 0 !== e || void 0 !== r) throw TypeError("Bad Promise constructor");e = t, r = n;}), this.resolve = i(e), this.reject = i(r);}var i = r(15);t.exports.f = function (t) {return new n(t);};}, function (t, e, r) {e.f = r(1);}, function (t, e, r) {var n = r(0),i = r(2),o = r(10),a = r(29),s = r(5).f;t.exports = function (t) {var e = i.Symbol || (i.Symbol = o ? {} : n.Symbol || {});"_" == t.charAt(0) || t in e || s(e, t, { value: a.f(t) });};}, function (t, e) {e.f = {}.propertyIsEnumerable;}, function (t, e, r) {"use strict";var n = r(56),i = r.n(n),o = r(59),a = r.n(o),s = r(87),u = r.n(s),c = r(90),l = r(91),f = r(112),h = r(113);e.a = { props: { text: { type: String, required: !0 }, qid: { type: String }, correctLevel: { type: Number, default: 1 }, size: { type: Number, default: 200 }, margin: { type: Number, default: 20 }, colorDark: { type: String, default: "#000000" }, colorLight: { type: String, default: "#FFFFFF" }, bgSrc: { type: String, default: void 0 }, background: { type: String, default: "rgba(0,0,0,0)" }, backgroundDimming: { type: String, default: "rgba(0,0,0,0)" }, logoSrc: { type: String, default: void 0 }, logoBackgroundColor: { type: String, default: "rgba(255,255,255,1)" }, gifBgSrc: { type: String, default: void 0 }, logoScale: { type: Number, default: .2 }, logoMargin: { type: Number, default: 0 }, logoCornerRadius: { type: Number, default: 8 }, whiteMargin: { type: [Boolean, String], default: !0 }, dotScale: { type: Number, default: 1 }, autoColor: { type: [Boolean, String], default: !0 }, binarize: { type: [Boolean, String], default: !1 }, binarizeThreshold: { type: Number, default: 128 }, callback: { type: Function, default: function _default() {} }, bindElement: { type: Boolean, default: !0 }, backgroundColor: { type: String, default: "#FFFFFF" } }, name: "vue-qr", data: function data() {return { uuid: "" };}, watch: { $props: { deep: !0, handler: function handler() {this.main();} } }, mounted: function mounted() {this.uuid = u()(), this.main();}, methods: { main: function main() {var t = this;return a()(i.a.mark(function e() {var r, n, o, a, s;return i.a.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:if (r = t, !t.gifBgSrc) {e.next = 10;break;}return e.next = 4, Object(h.a)(t.gifBgSrc);case 4:return n = e.sent, e.next = 7, Object(f.a)(t.logoSrc);case 7:return o = e.sent, t.render(void 0, o, n), e.abrupt("return");case 10:return e.next = 12, Object(f.a)(t.bgSrc);case 12:return a = e.sent, e.next = 15, Object(f.a)(t.logoSrc);case 15:s = e.sent, t.render(a, s);case 17:case "end":return e.stop();}}}, e, t);}))();}, render: function render(t, e, r) {var n = this;new l.a().create({ gifBackground: r, text: n.text, size: n.size, margin: n.margin, colorDark: n.colorDark, colorLight: n.colorLight, backgroundColor: n.backgroundColor, backgroundImage: t, backgroundDimming: n.backgroundDimming, logoImage: e, logoScale: n.logoScale, logoBackgroundColor: n.logoBackgroundColor, correctLevel: n.correctLevel, logoMargin: n.logoMargin, logoCornerRadius: n.logoCornerRadius, whiteMargin: Object(c.a)(n.whiteMargin), dotScale: n.dotScale, autoColor: Object(c.a)(n.autoColor), binarize: Object(c.a)(n.binarize), binarizeThreshold: n.binarizeThreshold, callback: function callback(t) {n.callback && n.callback(t, n.qid);}, bindElement: n.bindElement ? n.uuid : void 0 });} } };}, function (t, e) {}, function (t, e, r) {"use strict";var n = r(62)(!0);r(35)(String, "String", function (t) {this._t = String(t), this._i = 0;}, function () {var t,e = this._t,r = this._i;return r >= e.length ? { value: void 0, done: !0 } : (t = n(e, r), this._i += t.length, { value: t, done: !1 });});}, function (t, e, r) {"use strict";var n = r(10),i = r(11),o = r(37),a = r(4),s = r(12),u = r(63),c = r(19),l = r(68),f = r(1)("iterator"),h = !([].keys && "next" in [].keys()),p = function p() {return this;};t.exports = function (t, e, r, d, g, v, y) {u(r, e, d);var m,w,b,_ = function _(t) {if (!h && t in P) return P[t];switch (t) {case "keys":case "values":return function () {return new r(this, t);};}return function () {return new r(this, t);};},x = e + " Iterator",B = "values" == g,k = !1,P = t.prototype,S = P[f] || P["@@iterator"] || g && P[g],E = S || _(g),C = g ? B ? _("entries") : E : void 0,L = "Array" == e ? P.entries || S : S;if (L && (b = l(L.call(new t()))) !== Object.prototype && b.next && (c(b, x, !0), n || "function" == typeof b[f] || a(b, f, p)), B && S && "values" !== S.name && (k = !0, E = function E() {return S.call(this);}), n && !y || !h && !k && P[f] || a(P, f, E), s[e] = E, s[x] = p, g) if (m = { values: B ? E : _("values"), keys: v ? E : _("keys"), entries: C }, y) for (w in m) {w in P || o(P, w, m[w]);} else i(i.P + i.F * (h || k), e, m);return m;};}, function (t, e, r) {t.exports = !r(7) && !r(16)(function () {return 7 != Object.defineProperty(r(22)("div"), "a", { get: function get() {return 7;} }).a;});}, function (t, e, r) {t.exports = r(4);}, function (t, e, r) {var n = r(3),i = r(64),o = r(27),a = r(25)("IE_PROTO"),s = function s() {},_u = function u() {var t,e = r(22)("iframe"),n = o.length;for (e.style.display = "none", r(41).appendChild(e), e.src = "javascript:", t = e.contentWindow.document, t.open(), t.write("<script>document.F=Object<\/script>"), t.close(), _u = t.F; n--;) {delete _u.prototype[o[n]];}return _u();};t.exports = Object.create || function (t, e) {var r;return null !== t ? (s.prototype = n(t), r = new s(), s.prototype = null, r[a] = t) : r = _u(), void 0 === e ? r : i(r, e);};}, function (t, e, r) {var n = r(8),i = r(9),o = r(66)(!1),a = r(25)("IE_PROTO");t.exports = function (t, e) {var r,s = i(t),u = 0,c = [];for (r in s) {r != a && n(s, r) && c.push(r);}for (; e.length > u;) {n(s, r = e[u++]) && (~o(c, r) || c.push(r));}return c;};}, function (t, e, r) {var n = r(20),i = Math.min;t.exports = function (t) {return t > 0 ? i(n(t), 9007199254740991) : 0;};}, function (t, e, r) {var n = r(0).document;t.exports = n && n.documentElement;}, function (t, e, r) {r(70);for (var n = r(0), i = r(4), o = r(12), a = r(1)("toStringTag"), s = "CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(","), u = 0; u < s.length; u++) {var c = s[u],l = n[c],f = l && l.prototype;f && !f[a] && i(f, a, c), o[c] = o.Array;}}, function (t, e, r) {var n = r(13),i = r(1)("toStringTag"),o = "Arguments" == n(function () {return arguments;}()),a = function a(t, e) {try {return t[e];} catch (t) {}};t.exports = function (t) {var e, r, s;return void 0 === t ? "Undefined" : null === t ? "Null" : "string" == typeof (r = a(e = Object(t), i)) ? r : o ? n(e) : "Object" == (s = n(e)) && "function" == typeof e.callee ? "Arguments" : s;};}, function (t, e, r) {var n = r(3),i = r(15),o = r(1)("species");t.exports = function (t, e) {var r,a = n(t).constructor;return void 0 === a || void 0 == (r = n(a)[o]) ? e : i(r);};}, function (t, e, r) {var n,i,o,a = r(14),s = r(79),u = r(41),c = r(22),l = r(0),f = l.process,h = l.setImmediate,p = l.clearImmediate,d = l.MessageChannel,g = l.Dispatch,v = 0,y = {},m = function m() {var t = +this;if (y.hasOwnProperty(t)) {var e = y[t];delete y[t], e();}},w = function w(t) {m.call(t.data);};h && p || (h = function h(t) {for (var e = [], r = 1; arguments.length > r;) {e.push(arguments[r++]);}return y[++v] = function () {s("function" == typeof t ? t : Function(t), e);}, n(v), v;}, p = function p(t) {delete y[t];}, "process" == r(13)(f) ? n = function n(t) {f.nextTick(a(m, t, 1));} : g && g.now ? n = function n(t) {g.now(a(m, t, 1));} : d ? (i = new d(), o = i.port2, i.port1.onmessage = w, n = a(o.postMessage, o, 1)) : l.addEventListener && "function" == typeof postMessage && !l.importScripts ? (n = function n(t) {l.postMessage(t + "", "*");}, l.addEventListener("message", w, !1)) : n = "onreadystatechange" in c("script") ? function (t) {u.appendChild(c("script")).onreadystatechange = function () {u.removeChild(this), m.call(t);};} : function (t) {setTimeout(a(m, t, 1), 0);}), t.exports = { set: h, clear: p };}, function (t, e) {t.exports = function (t) {try {return { e: !1, v: t() };} catch (t) {return { e: !0, v: t };}};}, function (t, e, r) {var n = r(3),i = r(6),o = r(28);t.exports = function (t, e) {if (n(t), i(e) && e.constructor === t) return e;var r = o.f(t);return (0, r.resolve)(e), r.promise;};}, function (t, e) {e.f = Object.getOwnPropertySymbols;}, function (t, e, r) {var n = r(39),i = r(27).concat("length", "prototype");e.f = Object.getOwnPropertyNames || function (t) {return n(t, i);};}, function (t, e, r) {t.exports = function () {return r(111)('!function(t){function e(r){if(i[r])return i[r].exports;var s=i[r]={i:r,l:!1,exports:{}};return t[r].call(s.exports,s,s.exports,e),s.l=!0,s.exports}var i={};e.m=t,e.c=i,e.d=function(t,i,r){e.o(t,i)||Object.defineProperty(t,i,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="/dist/",e(e.s=0)}([function(t,e){~function(){function t(t,e,i,r){function a(t,e){F[P++]=t,P>=254&&d(e)}function f(t){c(u),D=S+2,G=!0,b(S,t)}function c(t){for(var e=0;e<t;++e)A[e]=-1}function y(t,e){var i,r,s,o,a,p,y;for(m=t,G=!1,n=m,B=g(n),S=1<<t-1,T=S+1,D=S+2,P=0,o=x(),y=0,i=u;i<65536;i*=2)++y;y=8-y,p=u,c(p),b(S,e);t:for(;(r=x())!=h;)if(i=(r<<l)+o,s=r<<y^o,A[s]!==i){if(A[s]>=0){a=p-s,0===s&&(a=1);do{if((s-=a)<0&&(s+=p),A[s]===i){o=C[s];continue t}}while(A[s]>=0)}b(o,e),o=r,D<1<<l?(C[s]=D++,A[s]=i):f(e)}else o=C[s];b(o,e),b(T,e)}function w(i){i.writeByte(M),s=t*e,o=0,y(M+1,i),i.writeByte(0)}function d(t){P>0&&(t.writeByte(P),t.writeBytes(F,0,P),P=0)}function g(t){return(1<<t)-1}function x(){return 0===s?h:(--s,255&i[o++])}function b(t,e){for(v&=p[I],I>0?v|=t<<I:v=t,I+=n;I>=8;)a(255&v,e),v>>=8,I-=8;if((D>B||G)&&(G?(B=g(n=m),G=!1):(++n,B=n==l?1<<l:g(n))),t==T){for(;I>0;)a(255&v,e),v>>=8,I-=8;d(e)}}var v,P,B,m,S,T,M=Math.max(2,r),F=new Uint8Array(256),A=new Int32Array(u),C=new Int32Array(u),I=0,D=0,G=!1;this.encode=w}function e(t,e){function i(){B=[],S=new Int32Array(256),R=new Int32Array(c),U=new Int32Array(c),Q=new Int32Array(c>>3);var t,e;for(t=0;t<c;t++)e=(t<<w+8)/c,B[t]=new Float64Array([e,e,e,0]),U[t]=g/c,R[t]=0}function r(){for(var t=0;t<c;t++)B[t][0]>>=w,B[t][1]>>=w,B[t][2]>>=w,B[t][3]=t}function s(t,e,i,r,s){B[e][0]-=t*(B[e][0]-i)/F,B[e][1]-=t*(B[e][1]-r)/F,B[e][2]-=t*(B[e][2]-s)/F}function o(t,e,i,r,s){for(var o,n,a=Math.abs(e-t),h=Math.min(e+t,c),l=e+1,u=e-1,p=1;l<h||u>a;)n=Q[p++],l<h&&(o=B[l++],o[0]-=n*(o[0]-i)/C,o[1]-=n*(o[1]-r)/C,o[2]-=n*(o[2]-s)/C),u>a&&(o=B[u--],o[0]-=n*(o[0]-i)/C,o[1]-=n*(o[1]-r)/C,o[2]-=n*(o[2]-s)/C)}function n(t,e,i){var r,s,o,n,a,h=~(1<<31),l=h,u=-1,p=u;for(r=0;r<c;r++)s=B[r],o=Math.abs(s[0]-t)+Math.abs(s[1]-e)+Math.abs(s[2]-i),o<h&&(h=o,u=r),n=o-(R[r]>>d-w),n<l&&(l=n,p=r),a=U[r]>>b,U[r]-=a,R[r]+=a<<x;return U[u]+=v,R[u]-=P,p}function a(){var t,e,i,r,s,o,n=0,a=0;for(t=0;t<c;t++){for(i=B[t],s=t,o=i[1],e=t+1;e<c;e++)r=B[e],r[1]<o&&(s=e,o=r[1]);if(r=B[s],t!=s&&(e=r[0],r[0]=i[0],i[0]=e,e=r[1],r[1]=i[1],i[1]=e,e=r[2],r[2]=i[2],i[2]=e,e=r[3],r[3]=i[3],i[3]=e),o!=n){for(S[n]=a+t>>1,e=n+1;e<o;e++)S[e]=t;n=o,a=t}}for(S[n]=a+y>>1,e=n+1;e<256;e++)S[e]=y}function h(t,e,i){for(var r,s,o,n=1e3,a=-1,h=S[e],l=h-1;h<c||l>=0;)h<c&&(s=B[h],o=s[1]-e,o>=n?h=c:(h++,o<0&&(o=-o),r=s[0]-t,r<0&&(r=-r),(o+=r)<n&&(r=s[2]-i,r<0&&(r=-r),(o+=r)<n&&(n=o,a=s[3])))),l>=0&&(s=B[l],o=e-s[1],o>=n?l=-1:(l--,o<0&&(o=-o),r=s[0]-t,r<0&&(r=-r),(o+=r)<n&&(r=s[2]-i,r<0&&(r=-r),(o+=r)<n&&(n=o,a=s[3]))));return a}function l(){var i,r=t.length,a=30+(e-1)/3,h=r/(3*e),l=~~(h/f),u=F,p=T,c=p>>m;for(c<=1&&(c=0),i=0;i<c;i++)Q[i]=u*((c*c-i*i)*A/(c*c));var y;r<E?(e=1,y=3):y=r%I!=0?3*I:r%D!=0?3*D:r%G!=0?3*G:3*z;var d,g,x,b,v=0;for(i=0;i<h;)if(d=(255&t[v])<<w,g=(255&t[v+1])<<w,x=(255&t[v+2])<<w,b=n(d,g,x),s(u,b,d,g,x),0!==c&&o(c,b,d,g,x),v+=y,v>=r&&(v-=r),i++,0===l&&(l=1),i%l==0)for(u-=u/a,p-=p/M,c=p>>m,c<=1&&(c=0),b=0;b<c;b++)Q[b]=u*((c*c-b*b)*A/(c*c))}function u(){i(),l(),r(),a()}function p(){for(var t=[],e=[],i=0;i<c;i++)e[B[i][3]]=i;for(var r=0,s=0;s<c;s++){var o=e[s];t[r++]=B[o][0],t[r++]=B[o][1],t[r++]=B[o][2]}return t}var B,S,R,U,Q;this.buildColormap=u,this.getColormap=p,this.lookupRGB=h}function i(){this.page=-1,this.pages=[],this.newPage()}function r(t,e){this.width=~~t,this.height=~~e,this.transparent=null,this.transIndex=0,this.repeat=-1,this.delay=0,this.image=null,this.pixels=null,this.indexedPixels=null,this.colorDepth=null,this.colorTab=null,this.neuQuant=null,this.usedEntry=new Array,this.palSize=7,this.dispose=-1,this.firstFrame=!0,this.sample=10,this.dither=!1,this.globalPalette=!1,this.out=new i}var s,o,n,a,h=-1,l=12,u=5003,p=[0,1,3,7,15,31,63,127,255,511,1023,2047,4095,8191,16383,32767,65535],f=100,c=256,y=c-1,w=4,d=16,g=1<<d,x=10,b=10,v=g>>b,P=g<<x-b,B=c>>3,m=6,S=1<<m,T=B*S,M=30,F=1024,A=256,C=1<<18,I=499,D=491,G=487,z=503,E=3*z;a=function(t){var e,i,s,o;return e=new r(t.width,t.height),0===t.index?e.writeHeader():e.firstFrame=!1,e.setTransparent(t.transparent),e.setRepeat(t.repeat),e.setDelay(t.delay),e.setQuality(t.quality),e.setDither(t.dither),e.setGlobalPalette(t.globalPalette),e.addFrame(t.data),t.last&&e.finish(),!0===t.globalPalette&&(t.globalPalette=e.getGlobalPalette()),s=e.stream(),t.data=s.pages,t.cursor=s.cursor,t.pageSize=s.constructor.pageSize,t.canTransfer?(o=function(){var e,r,s,o;for(s=t.data,o=[],e=0,r=s.length;e<r;e++)i=s[e],o.push(i.buffer);return o}(),self.postMessage(t,o)):self.postMessage(t)},self.onmessage=function(t){return a(t.data)},i.pageSize=4096,i.charMap={};for(var R=0;R<256;R++)i.charMap[R]=String.fromCharCode(R);i.prototype.newPage=function(){this.pages[++this.page]=new Uint8Array(i.pageSize),this.cursor=0},i.prototype.getData=function(){for(var t="",e=0;e<this.pages.length;e++)for(var r=0;r<i.pageSize;r++)t+=i.charMap[this.pages[e][r]];return t},i.prototype.writeByte=function(t){this.cursor>=i.pageSize&&this.newPage(),this.pages[this.page][this.cursor++]=t},i.prototype.writeUTFBytes=function(t){for(var e=t.length,i=0;i<e;i++)this.writeByte(t.charCodeAt(i))},i.prototype.writeBytes=function(t,e,i){for(var r=i||t.length,s=e||0;s<r;s++)this.writeByte(t[s])},r.prototype.setDelay=function(t){this.delay=Math.round(t/10)},r.prototype.setFrameRate=function(t){this.delay=Math.round(100/t)},r.prototype.setDispose=function(t){t>=0&&(this.dispose=t)},r.prototype.setRepeat=function(t){this.repeat=t},r.prototype.setTransparent=function(t){this.transparent=t},r.prototype.addFrame=function(t){this.image=t,this.colorTab=this.globalPalette&&this.globalPalette.slice?this.globalPalette:null,this.getImagePixels(),this.analyzePixels(),!0===this.globalPalette&&(this.globalPalette=this.colorTab),this.firstFrame&&(this.writeLSD(),this.writePalette(),this.repeat>=0&&this.writeNetscapeExt()),this.writeGraphicCtrlExt(),this.writeImageDesc(),this.firstFrame||this.globalPalette||this.writePalette(),this.writePixels(),this.firstFrame=!1},r.prototype.finish=function(){this.out.writeByte(59)},r.prototype.setQuality=function(t){t<1&&(t=1),this.sample=t},r.prototype.setDither=function(t){!0===t&&(t="FloydSteinberg"),this.dither=t},r.prototype.setGlobalPalette=function(t){this.globalPalette=t},r.prototype.getGlobalPalette=function(){return this.globalPalette&&this.globalPalette.slice&&this.globalPalette.slice(0)||this.globalPalette},r.prototype.writeHeader=function(){this.out.writeUTFBytes("GIF89a")},r.prototype.analyzePixels=function(){this.colorTab||(this.neuQuant=new e(this.pixels,this.sample),this.neuQuant.buildColormap(),this.colorTab=this.neuQuant.getColormap()),this.dither?this.ditherPixels(this.dither.replace("-serpentine",""),null!==this.dither.match(/-serpentine/)):this.indexPixels(),this.pixels=null,this.colorDepth=8,this.palSize=7,null!==this.transparent&&(this.transIndex=this.findClosest(this.transparent,!0))},r.prototype.indexPixels=function(t){var e=this.pixels.length/3;this.indexedPixels=new Uint8Array(e);for(var i=0,r=0;r<e;r++){var s=this.findClosestRGB(255&this.pixels[i++],255&this.pixels[i++],255&this.pixels[i++]);this.usedEntry[s]=!0,this.indexedPixels[r]=s}},r.prototype.ditherPixels=function(t,e){var i={FalseFloydSteinberg:[[3/8,1,0],[3/8,0,1],[.25,1,1]],FloydSteinberg:[[7/16,1,0],[3/16,-1,1],[5/16,0,1],[1/16,1,1]],Stucki:[[8/42,1,0],[4/42,2,0],[2/42,-2,1],[4/42,-1,1],[8/42,0,1],[4/42,1,1],[2/42,2,1],[1/42,-2,2],[2/42,-1,2],[4/42,0,2],[2/42,1,2],[1/42,2,2]],Atkinson:[[1/8,1,0],[1/8,2,0],[1/8,-1,1],[1/8,0,1],[1/8,1,1],[1/8,0,2]]};if(!t||!i[t])throw"Unknown dithering kernel: "+t;var r=i[t],s=0,o=this.height,n=this.width,a=this.pixels,h=e?-1:1;this.indexedPixels=new Uint8Array(this.pixels.length/3);for(var l=0;l<o;l++){e&&(h*=-1);for(var u=1==h?0:n-1,p=1==h?n:0;u!==p;u+=h){s=l*n+u;var f=3*s,c=a[f],y=a[f+1],w=a[f+2];f=this.findClosestRGB(c,y,w),this.usedEntry[f]=!0,this.indexedPixels[s]=f,f*=3;for(var d=this.colorTab[f],g=this.colorTab[f+1],x=this.colorTab[f+2],b=c-d,v=y-g,P=w-x,B=1==h?0:r.length-1,m=1==h?r.length:0;B!==m;B+=h){var S=r[B][1],T=r[B][2];if(S+u>=0&&S+u<n&&T+l>=0&&T+l<o){var M=r[B][0];f=s+S+T*n,f*=3,a[f]=Math.max(0,Math.min(255,a[f]+b*M)),a[f+1]=Math.max(0,Math.min(255,a[f+1]+v*M)),a[f+2]=Math.max(0,Math.min(255,a[f+2]+P*M))}}}}},r.prototype.findClosest=function(t,e){return this.findClosestRGB((16711680&t)>>16,(65280&t)>>8,255&t,e)},r.prototype.findClosestRGB=function(t,e,i,r){if(null===this.colorTab)return-1;if(this.neuQuant&&!r)return this.neuQuant.lookupRGB(t,e,i);for(var s=0,o=16777216,n=this.colorTab.length,a=0,h=0;a<n;h++){var l=t-(255&this.colorTab[a++]),u=e-(255&this.colorTab[a++]),p=i-(255&this.colorTab[a++]),f=l*l+u*u+p*p;(!r||this.usedEntry[h])&&f<o&&(o=f,s=h)}return s},r.prototype.getImagePixels=function(){var t=this.width,e=this.height;this.pixels=new Uint8Array(t*e*3);for(var i=this.image,r=0,s=0,o=0;o<e;o++)for(var n=0;n<t;n++)this.pixels[s++]=i[r++],this.pixels[s++]=i[r++],this.pixels[s++]=i[r++],r++},r.prototype.writeGraphicCtrlExt=function(){this.out.writeByte(33),this.out.writeByte(249),this.out.writeByte(4);var t,e;null===this.transparent?(t=0,e=0):(t=1,e=2),this.dispose>=0&&(e=7&dispose),e<<=2,this.out.writeByte(0|e|t),this.writeShort(this.delay),this.out.writeByte(this.transIndex),this.out.writeByte(0)},r.prototype.writeImageDesc=function(){this.out.writeByte(44),this.writeShort(0),this.writeShort(0),this.writeShort(this.width),this.writeShort(this.height),this.firstFrame||this.globalPalette?this.out.writeByte(0):this.out.writeByte(128|this.palSize)},r.prototype.writeLSD=function(){this.writeShort(this.width),this.writeShort(this.height),this.out.writeByte(240|this.palSize),this.out.writeByte(0),this.out.writeByte(0)},r.prototype.writeNetscapeExt=function(){this.out.writeByte(33),this.out.writeByte(255),this.out.writeByte(11),this.out.writeUTFBytes("NETSCAPE2.0"),this.out.writeByte(3),this.out.writeByte(1),this.writeShort(this.repeat),this.out.writeByte(0)},r.prototype.writePalette=function(){this.out.writeBytes(this.colorTab);for(var t=768-this.colorTab.length,e=0;e<t;e++)this.out.writeByte(0)},r.prototype.writeShort=function(t){this.out.writeByte(255&t),this.out.writeByte(t>>8&255)},r.prototype.writePixels=function(){new t(this.width,this.height,this.indexedPixels,this.colorDepth).encode(this.out)},r.prototype.stream=function(){return this.out}}()}]);\n//# sourceMappingURL=9ce638df9d8d3f921ad6.worker.js.map', r.p + "9ce638df9d8d3f921ad6.worker.js");};}, function (t, e, r) {t.exports = r(52);}, function (t, e, r) {"use strict";Object.defineProperty(e, "__esModule", { value: !0 });var n = r(53),i = [n.a];"undefined" != typeof window && window.Vue && function (t) {arguments.length > 1 && void 0 !== arguments[1] && arguments[1];i.map(function (e) {t.component(e.name, e);});}(window.Vue), e.default = n.a;}, function (t, e, r) {"use strict";var n = r(54);n.a.install = function (t) {return t.component(n.a.name, n.a);}, e.a = n.a;}, function (t, e, r) {"use strict";var n = r(32),i = r(114),o = r(55),a = o(n.a, i.a, !1, null, null, null);e.a = a.exports;}, function (t, e) {t.exports = function (t, e, r, n, i, o) {var a,s = t = t || {},u = typeof t.default;"object" !== u && "function" !== u || (a = t, s = t.default);var c = "function" == typeof s ? s.options : s;e && (c.render = e.render, c.staticRenderFns = e.staticRenderFns, c._compiled = !0), r && (c.functional = !0), i && (c._scopeId = i);var l;if (o ? (l = function l(t) {t = t || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, t || "undefined" == typeof __VUE_SSR_CONTEXT__ || (t = __VUE_SSR_CONTEXT__), n && n.call(this, t), t && t._registeredComponents && t._registeredComponents.add(o);}, c._ssrRegister = l) : n && (l = n), l) {var f = c.functional,h = f ? c.render : c.beforeCreate;f ? (c._injectStyles = l, c.render = function (t, e) {return l.call(e), h(t, e);}) : c.beforeCreate = h ? [].concat(h, l) : [l];}return { esModule: a, exports: s, options: c };};}, function (t, e, r) {t.exports = r(57);}, function (t, e, r) {var n = function () {return this;}() || Function("return this")(),i = n.regeneratorRuntime && Object.getOwnPropertyNames(n).indexOf("regeneratorRuntime") >= 0,o = i && n.regeneratorRuntime;if (n.regeneratorRuntime = void 0, t.exports = r(58), i) n.regeneratorRuntime = o;else try {delete n.regeneratorRuntime;} catch (t) {n.regeneratorRuntime = void 0;}}, function (t, e) {!function (e) {"use strict";function r(t, e, r, n) {var o = e && e.prototype instanceof i ? e : i,a = Object.create(o.prototype),s = new p(n || []);return a._invoke = c(t, r, s), a;}function n(t, e, r) {try {return { type: "normal", arg: t.call(e, r) };} catch (t) {return { type: "throw", arg: t };}}function i() {}function o() {}function a() {}function s(t) {["next", "throw", "return"].forEach(function (e) {t[e] = function (t) {return this._invoke(e, t);};});}function u(t) {function e(r, i, o, a) {var s = n(t[r], t, i);if ("throw" !== s.type) {var u = s.arg,c = u.value;return c && "object" == typeof c && m.call(c, "__await") ? Promise.resolve(c.__await).then(function (t) {e("next", t, o, a);}, function (t) {e("throw", t, o, a);}) : Promise.resolve(c).then(function (t) {u.value = t, o(u);}, a);}a(s.arg);}function r(t, r) {function n() {return new Promise(function (n, i) {e(t, r, n, i);});}return i = i ? i.then(n, n) : n();}var i;this._invoke = r;}function c(t, e, r) {var i = P;return function (o, a) {if (i === E) throw new Error("Generator is already running");if (i === C) {if ("throw" === o) throw a;return g();}for (r.method = o, r.arg = a;;) {var s = r.delegate;if (s) {var u = l(s, r);if (u) {if (u === L) continue;return u;}}if ("next" === r.method) r.sent = r._sent = r.arg;else if ("throw" === r.method) {if (i === P) throw i = C, r.arg;r.dispatchException(r.arg);} else "return" === r.method && r.abrupt("return", r.arg);i = E;var c = n(t, e, r);if ("normal" === c.type) {if (i = r.done ? C : S, c.arg === L) continue;return { value: c.arg, done: r.done };}"throw" === c.type && (i = C, r.method = "throw", r.arg = c.arg);}};}function l(t, e) {var r = t.iterator[e.method];if (r === v) {if (e.delegate = null, "throw" === e.method) {if (t.iterator.return && (e.method = "return", e.arg = v, l(t, e), "throw" === e.method)) return L;e.method = "throw", e.arg = new TypeError("The iterator does not provide a 'throw' method");}return L;}var i = n(r, t.iterator, e.arg);if ("throw" === i.type) return e.method = "throw", e.arg = i.arg, e.delegate = null, L;var o = i.arg;return o ? o.done ? (e[t.resultName] = o.value, e.next = t.nextLoc, "return" !== e.method && (e.method = "next", e.arg = v), e.delegate = null, L) : o : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), e.delegate = null, L);}function f(t) {var e = { tryLoc: t[0] };1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);}function h(t) {var e = t.completion || {};e.type = "normal", delete e.arg, t.completion = e;}function p(t) {this.tryEntries = [{ tryLoc: "root" }], t.forEach(f, this), this.reset(!0);}function d(t) {if (t) {var e = t[b];if (e) return e.call(t);if ("function" == typeof t.next) return t;if (!isNaN(t.length)) {var r = -1,n = function e() {for (; ++r < t.length;) {if (m.call(t, r)) return e.value = t[r], e.done = !1, e;}return e.value = v, e.done = !0, e;};return n.next = n;}}return { next: g };}function g() {return { value: v, done: !0 };}var v,y = Object.prototype,m = y.hasOwnProperty,w = "function" == typeof Symbol ? Symbol : {},b = w.iterator || "@@iterator",_ = w.asyncIterator || "@@asyncIterator",x = w.toStringTag || "@@toStringTag",B = "object" == typeof t,k = e.regeneratorRuntime;if (k) return void (B && (t.exports = k));k = e.regeneratorRuntime = B ? t.exports : {}, k.wrap = r;var P = "suspendedStart",S = "suspendedYield",E = "executing",C = "completed",L = {},T = {};T[b] = function () {return this;};var A = Object.getPrototypeOf,I = A && A(A(d([])));I && I !== y && m.call(I, b) && (T = I);var R = a.prototype = i.prototype = Object.create(T);o.prototype = R.constructor = a, a.constructor = o, a[x] = o.displayName = "GeneratorFunction", k.isGeneratorFunction = function (t) {var e = "function" == typeof t && t.constructor;return !!e && (e === o || "GeneratorFunction" === (e.displayName || e.name));}, k.mark = function (t) {return Object.setPrototypeOf ? Object.setPrototypeOf(t, a) : (t.__proto__ = a, x in t || (t[x] = "GeneratorFunction")), t.prototype = Object.create(R), t;}, k.awrap = function (t) {return { __await: t };}, s(u.prototype), u.prototype[_] = function () {return this;}, k.AsyncIterator = u, k.async = function (t, e, n, i) {var o = new u(r(t, e, n, i));return k.isGeneratorFunction(e) ? o : o.next().then(function (t) {return t.done ? t.value : o.next();});}, s(R), R[x] = "Generator", R[b] = function () {return this;}, R.toString = function () {return "[object Generator]";}, k.keys = function (t) {var e = [];for (var r in t) {e.push(r);}return e.reverse(), function r() {for (; e.length;) {var n = e.pop();if (n in t) return r.value = n, r.done = !1, r;}return r.done = !0, r;};}, k.values = d, p.prototype = { constructor: p, reset: function reset(t) {if (this.prev = 0, this.next = 0, this.sent = this._sent = v, this.done = !1, this.delegate = null, this.method = "next", this.arg = v, this.tryEntries.forEach(h), !t) for (var e in this) {"t" === e.charAt(0) && m.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = v);}}, stop: function stop() {this.done = !0;var t = this.tryEntries[0],e = t.completion;if ("throw" === e.type) throw e.arg;return this.rval;}, dispatchException: function dispatchException(t) {function e(e, n) {return o.type = "throw", o.arg = t, r.next = e, n && (r.method = "next", r.arg = v), !!n;}if (this.done) throw t;for (var r = this, n = this.tryEntries.length - 1; n >= 0; --n) {var i = this.tryEntries[n],o = i.completion;if ("root" === i.tryLoc) return e("end");if (i.tryLoc <= this.prev) {var a = m.call(i, "catchLoc"),s = m.call(i, "finallyLoc");if (a && s) {if (this.prev < i.catchLoc) return e(i.catchLoc, !0);if (this.prev < i.finallyLoc) return e(i.finallyLoc);} else if (a) {if (this.prev < i.catchLoc) return e(i.catchLoc, !0);} else {if (!s) throw new Error("try statement without catch or finally");if (this.prev < i.finallyLoc) return e(i.finallyLoc);}}}}, abrupt: function abrupt(t, e) {for (var r = this.tryEntries.length - 1; r >= 0; --r) {var n = this.tryEntries[r];if (n.tryLoc <= this.prev && m.call(n, "finallyLoc") && this.prev < n.finallyLoc) {var i = n;break;}}i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);var o = i ? i.completion : {};return o.type = t, o.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, L) : this.complete(o);}, complete: function complete(t, e) {if ("throw" === t.type) throw t.arg;return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), L;}, finish: function finish(t) {for (var e = this.tryEntries.length - 1; e >= 0; --e) {var r = this.tryEntries[e];if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), h(r), L;}}, catch: function _catch(t) {for (var e = this.tryEntries.length - 1; e >= 0; --e) {var r = this.tryEntries[e];if (r.tryLoc === t) {var n = r.completion;if ("throw" === n.type) {var i = n.arg;h(r);}return i;}}throw new Error("illegal catch attempt");}, delegateYield: function delegateYield(t, e, r) {return this.delegate = { iterator: d(t), resultName: e, nextLoc: r }, "next" === this.method && (this.arg = v), L;} };}(function () {return this;}() || Function("return this")());}, function (t, e, r) {"use strict";e.__esModule = !0;var n = r(60),i = function (t) {return t && t.__esModule ? t : { default: t };}(n);e.default = function (t) {return function () {var e = t.apply(this, arguments);return new i.default(function (t, r) {function n(o, a) {try {var s = e[o](a),u = s.value;} catch (t) {return void r(t);}if (!s.done) return i.default.resolve(u).then(function (t) {n("next", t);}, function (t) {n("throw", t);});t(u);}return n("next");});};};}, function (t, e, r) {t.exports = { default: r(61), __esModule: !0 };}, function (t, e, r) {r(33), r(34), r(42), r(73), r(85), r(86), t.exports = r(2).Promise;}, function (t, e, r) {var n = r(20),i = r(21);t.exports = function (t) {return function (e, r) {var o,a,s = String(i(e)),u = n(r),c = s.length;return u < 0 || u >= c ? t ? "" : void 0 : (o = s.charCodeAt(u), o < 55296 || o > 56319 || u + 1 === c || (a = s.charCodeAt(u + 1)) < 56320 || a > 57343 ? t ? s.charAt(u) : o : t ? s.slice(u, u + 2) : a - 56320 + (o - 55296 << 10) + 65536);};};}, function (t, e, r) {"use strict";var n = r(38),i = r(17),o = r(19),a = {};r(4)(a, r(1)("iterator"), function () {return this;}), t.exports = function (t, e, r) {t.prototype = n(a, { next: i(1, r) }), o(t, e + " Iterator");};}, function (t, e, r) {var n = r(5),i = r(3),o = r(24);t.exports = r(7) ? Object.defineProperties : function (t, e) {i(t);for (var r, a = o(e), s = a.length, u = 0; s > u;) {n.f(t, r = a[u++], e[r]);}return t;};}, function (t, e, r) {var n = r(13);t.exports = Object("z").propertyIsEnumerable(0) ? Object : function (t) {return "String" == n(t) ? t.split("") : Object(t);};}, function (t, e, r) {var n = r(9),i = r(40),o = r(67);t.exports = function (t) {return function (e, r, a) {var s,u = n(e),c = i(u.length),l = o(a, c);if (t && r != r) {for (; c > l;) {if ((s = u[l++]) != s) return !0;}} else for (; c > l; l++) {if ((t || l in u) && u[l] === r) return t || l || 0;}return !t && -1;};};}, function (t, e, r) {var n = r(20),i = Math.max,o = Math.min;t.exports = function (t, e) {return t = n(t), t < 0 ? i(t + e, 0) : o(t, e);};}, function (t, e, r) {var n = r(8),i = r(69),o = r(25)("IE_PROTO"),a = Object.prototype;t.exports = Object.getPrototypeOf || function (t) {return t = i(t), n(t, o) ? t[o] : "function" == typeof t.constructor && t instanceof t.constructor ? t.constructor.prototype : t instanceof Object ? a : null;};}, function (t, e, r) {var n = r(21);t.exports = function (t) {return Object(n(t));};}, function (t, e, r) {"use strict";var n = r(71),i = r(72),o = r(12),a = r(9);t.exports = r(35)(Array, "Array", function (t, e) {this._t = a(t), this._i = 0, this._k = e;}, function () {var t = this._t,e = this._k,r = this._i++;return !t || r >= t.length ? (this._t = void 0, i(1)) : "keys" == e ? i(0, r) : "values" == e ? i(0, t[r]) : i(0, [r, t[r]]);}, "values"), o.Arguments = o.Array, n("keys"), n("values"), n("entries");}, function (t, e) {t.exports = function () {};}, function (t, e) {t.exports = function (t, e) {return { value: e, done: !!t };};}, function (t, e, r) {"use strict";var n,i,o,a,s = r(10),u = r(0),c = r(14),l = r(43),f = r(11),h = r(6),p = r(15),d = r(74),g = r(75),v = r(44),y = r(45).set,m = r(80)(),w = r(28),b = r(46),_ = r(81),x = r(47),B = u.TypeError,k = u.process,P = k && k.versions,S = P && P.v8 || "",_E = u.Promise,C = "process" == l(k),L = function L() {},T = i = w.f,A = !!function () {try {var t = _E.resolve(1),e = (t.constructor = {})[r(1)("species")] = function (t) {t(L, L);};return (C || "function" == typeof PromiseRejectionEvent) && t.then(L) instanceof e && 0 !== S.indexOf("6.6") && -1 === _.indexOf("Chrome/66");} catch (t) {}}(),I = function I(t) {var e;return !(!h(t) || "function" != typeof (e = t.then)) && e;},R = function R(t, e) {if (!t._n) {t._n = !0;var r = t._c;m(function () {for (var n = t._v, i = 1 == t._s, o = 0; r.length > o;) {!function (e) {var r,o,a,s = i ? e.ok : e.fail,u = e.resolve,c = e.reject,l = e.domain;try {s ? (i || (2 == t._h && O(t), t._h = 1), !0 === s ? r = n : (l && l.enter(), r = s(n), l && (l.exit(), a = !0)), r === e.promise ? c(B("Promise-chain cycle")) : (o = I(r)) ? o.call(r, u, c) : u(r)) : c(n);} catch (t) {l && !a && l.exit(), c(t);}}(r[o++]);}t._c = [], t._n = !1, e && !t._h && D(t);});}},D = function D(t) {y.call(u, function () {var e,r,n,i = t._v,o = M(t);if (o && (e = b(function () {C ? k.emit("unhandledRejection", i, t) : (r = u.onunhandledrejection) ? r({ promise: t, reason: i }) : (n = u.console) && n.error && n.error("Unhandled promise rejection", i);}), t._h = C || M(t) ? 2 : 1), t._a = void 0, o && e.e) throw e.v;});},M = function M(t) {return 1 !== t._h && 0 === (t._a || t._c).length;},O = function O(t) {y.call(u, function () {var e;C ? k.emit("rejectionHandled", t) : (e = u.onrejectionhandled) && e({ promise: t, reason: t._v });});},F = function F(t) {var e = this;e._d || (e._d = !0, e = e._w || e, e._v = t, e._s = 2, e._a || (e._a = e._c.slice()), R(e, !0));},N = function N(t) {var e,r = this;if (!r._d) {r._d = !0, r = r._w || r;try {if (r === t) throw B("Promise can't be resolved itself");(e = I(t)) ? m(function () {var n = { _w: r, _d: !1 };try {e.call(t, c(N, n, 1), c(F, n, 1));} catch (t) {F.call(n, t);}}) : (r._v = t, r._s = 1, R(r, !1));} catch (t) {F.call({ _w: r, _d: !1 }, t);}}};A || (_E = function E(t) {d(this, _E, "Promise", "_h"), p(t), n.call(this);try {t(c(N, this, 1), c(F, this, 1));} catch (t) {F.call(this, t);}}, n = function n(t) {this._c = [], this._a = void 0, this._s = 0, this._d = !1, this._v = void 0, this._h = 0, this._n = !1;}, n.prototype = r(82)(_E.prototype, { then: function then(t, e) {var r = T(v(this, _E));return r.ok = "function" != typeof t || t, r.fail = "function" == typeof e && e, r.domain = C ? k.domain : void 0, this._c.push(r), this._a && this._a.push(r), this._s && R(this, !1), r.promise;}, catch: function _catch(t) {return this.then(void 0, t);} }), o = function o() {var t = new n();this.promise = t, this.resolve = c(N, t, 1), this.reject = c(F, t, 1);}, w.f = T = function T(t) {return t === _E || t === a ? new o(t) : i(t);}), f(f.G + f.W + f.F * !A, { Promise: _E }), r(19)(_E, "Promise"), r(83)("Promise"), a = r(2).Promise, f(f.S + f.F * !A, "Promise", { reject: function reject(t) {var e = T(this);return (0, e.reject)(t), e.promise;} }), f(f.S + f.F * (s || !A), "Promise", { resolve: function resolve(t) {return x(s && this === a ? _E : this, t);} }), f(f.S + f.F * !(A && r(84)(function (t) {_E.all(t).catch(L);})), "Promise", { all: function all(t) {var e = this,r = T(e),n = r.resolve,i = r.reject,o = b(function () {var r = [],o = 0,a = 1;g(t, !1, function (t) {var s = o++,u = !1;r.push(void 0), a++, e.resolve(t).then(function (t) {u || (u = !0, r[s] = t, --a || n(r));}, i);}), --a || n(r);});return o.e && i(o.v), r.promise;}, race: function race(t) {var e = this,r = T(e),n = r.reject,i = b(function () {g(t, !1, function (t) {e.resolve(t).then(r.resolve, n);});});return i.e && n(i.v), r.promise;} });}, function (t, e) {t.exports = function (t, e, r, n) {if (!(t instanceof e) || void 0 !== n && n in t) throw TypeError(r + ": incorrect invocation!");return t;};}, function (t, e, r) {var n = r(14),i = r(76),o = r(77),a = r(3),s = r(40),u = r(78),c = {},l = {},e = t.exports = function (t, e, r, f, h) {var p,d,g,v,y = h ? function () {return t;} : u(t),m = n(r, f, e ? 2 : 1),w = 0;if ("function" != typeof y) throw TypeError(t + " is not iterable!");if (o(y)) {for (p = s(t.length); p > w; w++) {if ((v = e ? m(a(d = t[w])[0], d[1]) : m(t[w])) === c || v === l) return v;}} else for (g = y.call(t); !(d = g.next()).done;) {if ((v = i(g, m, d.value, e)) === c || v === l) return v;}};e.BREAK = c, e.RETURN = l;}, function (t, e, r) {var n = r(3);t.exports = function (t, e, r, i) {try {return i ? e(n(r)[0], r[1]) : e(r);} catch (e) {var o = t.return;throw void 0 !== o && n(o.call(t)), e;}};}, function (t, e, r) {var n = r(12),i = r(1)("iterator"),o = Array.prototype;t.exports = function (t) {return void 0 !== t && (n.Array === t || o[i] === t);};}, function (t, e, r) {var n = r(43),i = r(1)("iterator"),o = r(12);t.exports = r(2).getIteratorMethod = function (t) {if (void 0 != t) return t[i] || t["@@iterator"] || o[n(t)];};}, function (t, e) {t.exports = function (t, e, r) {var n = void 0 === r;switch (e.length) {case 0:return n ? t() : t.call(r);case 1:return n ? t(e[0]) : t.call(r, e[0]);case 2:return n ? t(e[0], e[1]) : t.call(r, e[0], e[1]);case 3:return n ? t(e[0], e[1], e[2]) : t.call(r, e[0], e[1], e[2]);case 4:return n ? t(e[0], e[1], e[2], e[3]) : t.call(r, e[0], e[1], e[2], e[3]);}return t.apply(r, e);};}, function (t, e, r) {var n = r(0),i = r(45).set,o = n.MutationObserver || n.WebKitMutationObserver,a = n.process,s = n.Promise,u = "process" == r(13)(a);t.exports = function () {var t,e,r,c = function c() {var n, i;for (u && (n = a.domain) && n.exit(); t;) {i = t.fn, t = t.next;try {i();} catch (n) {throw t ? r() : e = void 0, n;}}e = void 0, n && n.enter();};if (u) r = function r() {a.nextTick(c);};else if (!o || n.navigator && n.navigator.standalone) {if (s && s.resolve) {var l = s.resolve(void 0);r = function r() {l.then(c);};} else r = function r() {i.call(n, c);};} else {var f = !0,h = document.createTextNode("");new o(c).observe(h, { characterData: !0 }), r = function r() {h.data = f = !f;};}return function (n) {var i = { fn: n, next: void 0 };e && (e.next = i), t || (t = i, r()), e = i;};};}, function (t, e, r) {var n = r(0),i = n.navigator;t.exports = i && i.userAgent || "";}, function (t, e, r) {var n = r(4);t.exports = function (t, e, r) {for (var i in e) {r && t[i] ? t[i] = e[i] : n(t, i, e[i]);}return t;};}, function (t, e, r) {"use strict";var n = r(0),i = r(2),o = r(5),a = r(7),s = r(1)("species");t.exports = function (t) {var e = "function" == typeof i[t] ? i[t] : n[t];a && e && !e[s] && o.f(e, s, { configurable: !0, get: function get() {return this;} });};}, function (t, e, r) {var n = r(1)("iterator"),i = !1;try {var o = [7][n]();o.return = function () {i = !0;}, Array.from(o, function () {throw 2;});} catch (t) {}t.exports = function (t, e) {if (!e && !i) return !1;var r = !1;try {var o = [7],a = o[n]();a.next = function () {return { done: r = !0 };}, o[n] = function () {return a;}, t(o);} catch (t) {}return r;};}, function (t, e, r) {"use strict";var n = r(11),i = r(2),o = r(0),a = r(44),s = r(47);n(n.P + n.R, "Promise", { finally: function _finally(t) {var e = a(this, i.Promise || o.Promise),r = "function" == typeof t;return this.then(r ? function (r) {return s(e, t()).then(function () {return r;});} : t, r ? function (r) {return s(e, t()).then(function () {throw r;});} : t);} });}, function (t, e, r) {"use strict";var n = r(11),i = r(28),o = r(46);n(n.S, "Promise", { try: function _try(t) {var e = i.f(this),r = o(t);return (r.e ? e.reject : e.resolve)(r.v), e.promise;} });}, function (t, e, r) {function n(t, e, r) {var n = e && r || 0;"string" == typeof t && (e = "binary" === t ? new Array(16) : null, t = null), t = t || {};var a = t.random || (t.rng || i)();if (a[6] = 15 & a[6] | 64, a[8] = 63 & a[8] | 128, e) for (var s = 0; s < 16; ++s) {e[n + s] = a[s];}return e || o(a);}var i = r(88),o = r(89);t.exports = n;}, function (t, e) {var r = "undefined" != typeof crypto && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || "undefined" != typeof msCrypto && "function" == typeof window.msCrypto.getRandomValues && msCrypto.getRandomValues.bind(msCrypto);if (r) {var n = new Uint8Array(16);t.exports = function () {return r(n), n;};} else {var i = new Array(16);t.exports = function () {for (var t, e = 0; e < 16; e++) {0 == (3 & e) && (t = 4294967296 * Math.random()), i[e] = t >>> ((3 & e) << 3) & 255;}return i;};}}, function (t, e) {function r(t, e) {var r = e || 0,i = n;return [i[t[r++]], i[t[r++]], i[t[r++]], i[t[r++]], "-", i[t[r++]], i[t[r++]], "-", i[t[r++]], i[t[r++]], "-", i[t[r++]], i[t[r++]], "-", i[t[r++]], i[t[r++]], i[t[r++]], i[t[r++]], i[t[r++]], i[t[r++]]].join("");}for (var n = [], i = 0; i < 256; ++i) {n[i] = (i + 256).toString(16).substr(1);}t.exports = r;}, function (t, e, r) {"use strict";function n(t) {return "" === t ? t : "true" === t || "1" == t;}e.a = n;}, function (t, e, r) {"use strict";function n(t) {this.mode = y.MODE_8BIT_BYTE, this.data = t, this.parsedData = [];for (var e = 0, r = this.data.length; e < r; e++) {var n = [],i = this.data.charCodeAt(e);i > 65536 ? (n[0] = 240 | (1835008 & i) >>> 18, n[1] = 128 | (258048 & i) >>> 12, n[2] = 128 | (4032 & i) >>> 6, n[3] = 128 | 63 & i) : i > 2048 ? (n[0] = 224 | (61440 & i) >>> 12, n[1] = 128 | (4032 & i) >>> 6, n[2] = 128 | 63 & i) : i > 128 ? (n[0] = 192 | (1984 & i) >>> 6, n[1] = 128 | 63 & i) : n[0] = i, this.parsedData.push(n);}this.parsedData = Array.prototype.concat.apply([], this.parsedData), this.parsedData.length != this.data.length && (this.parsedData.unshift(191), this.parsedData.unshift(187), this.parsedData.unshift(239));}function i(t, e) {this.typeNumber = t, this.errorCorrectLevel = e, this.modules = null, this.moduleCount = 0, this.dataCache = null, this.dataList = [];}function o(t, e) {if (void 0 == t.length) throw new Error(t.length + "/" + e);for (var r = 0; r < t.length && 0 == t[r];) {r++;}this.num = new Array(t.length - r + e);for (var n = 0; n < t.length - r; n++) {this.num[n] = t[n + r];}}function a(t, e) {this.totalCount = t, this.dataCount = e;}function s() {this.buffer = [], this.length = 0;}function u(t, e, r, n, i, o) {t.beginPath(), t.moveTo(e, r), t.arcTo(e + n, r, e + n, r + i, o), t.arcTo(e + n, r + i, e, r + i, o), t.arcTo(e, r + i, e, r, o), t.arcTo(e, r, e + n, r, o), t.closePath();}function c(t, e, r) {return .3 * t + .59 * r + .11 * r;}function l(t, e, r, n, i, o, a) {if (void 0 === o) t.fillRect(e, r, n, i);else {t.drawImage(o, e, r, n, i, e, r, n, i);var s = t.fillStyle;t.fillStyle = a ? "rgba(0, 0, 0, .5)" : "rgba(255, 255, 255, .7)", t.fillRect(e, r, n, i), t.fillStyle = s;}}function f(t, e, r, n, i) {t.clearRect((e - 2) * n, (r - 2) * i, 5 * n, 5 * i), t.fillRect((e - 2) * n, (r - 2) * i, 5 * n, 5 * i);}function h(t, e, r, n, i) {t.fillRect((e - 2) * n, (r - 2) * i, n, 4 * i), t.fillRect((e + 2) * n, (r - 2 + 1) * i, n, 4 * i), t.fillRect((e - 2 + 1) * n, (r - 2) * i, 4 * n, i), t.fillRect((e - 2) * n, (r + 2) * i, 4 * n, i), t.fillRect(e * n, r * i, n, i);}function p(t) {var e,r,n,i,o = { r: 0, g: 0, b: 0 },a = document.createElement("canvas"),s = a.getContext && a.getContext("2d"),u = -4,c = { r: 0, g: 0, b: 0 },l = 0;if (!s) return o;n = a.height = t.naturalHeight || t.offsetHeight || t.height, r = a.width = t.naturalWidth || t.offsetWidth || t.width, s.drawImage(t, 0, 0);try {e = s.getImageData(0, 0, r, n);} catch (t) {return o;}for (i = e.data.length; (u += 20) < i;) {e.data[u] > 200 || e.data[u + 1] > 200 || e.data[u + 2] > 200 || (++l, c.r += e.data[u], c.g += e.data[u + 1], c.b += e.data[u + 2]);}return c.r = ~~(c.r / l), c.g = ~~(c.g / l), c.b = ~~(c.b / l), c;}var d,g = r(92),v = r(97);n.prototype = { getLength: function getLength(t) {return this.parsedData.length;}, write: function write(t) {for (var e = 0, r = this.parsedData.length; e < r; e++) {t.put(this.parsedData[e], 8);}} }, i.prototype = { addData: function addData(t) {var e = new n(t);this.dataList.push(e), this.dataCache = null;}, isDark: function isDark(t, e) {if (t < 0 || this.moduleCount <= t || e < 0 || this.moduleCount <= e) throw new Error(t + "," + e);return this.modules[t][e];}, getModuleCount: function getModuleCount() {return this.moduleCount;}, make: function make() {if (this.typeNumber < 1) {var t = 1;for (t = 1; t < 40; t++) {for (var e = a.getRSBlocks(t, this.errorCorrectLevel), r = new s(), n = 0, i = 0; i < e.length; i++) {n += e[i].dataCount;}for (var i = 0; i < this.dataList.length; i++) {var o = this.dataList[i];r.put(o.mode, 4), r.put(o.getLength(), b.getLengthInBits(o.mode, t)), o.write(r);}if (r.getLengthInBits() <= 8 * n) break;}this.typeNumber = t;}this.makeImpl(!1, this.getBestMaskPattern());}, makeImpl: function makeImpl(t, e) {this.moduleCount = 4 * this.typeNumber + 17, this.modules = new Array(this.moduleCount);for (var r = 0; r < this.moduleCount; r++) {this.modules[r] = new Array(this.moduleCount);for (var n = 0; n < this.moduleCount; n++) {this.modules[r][n] = null;}}this.setupPositionProbePattern(0, 0), this.setupPositionProbePattern(this.moduleCount - 7, 0), this.setupPositionProbePattern(0, this.moduleCount - 7), this.setupPositionAdjustPattern(), this.setupTimingPattern(), this.setupTypeInfo(t, e), this.typeNumber >= 7 && this.setupTypeNumber(t), null == this.dataCache && (this.dataCache = i.createData(this.typeNumber, this.errorCorrectLevel, this.dataList)), this.mapData(this.dataCache, e);}, setupPositionProbePattern: function setupPositionProbePattern(t, e) {for (var r = -1; r <= 7; r++) {if (!(t + r <= -1 || this.moduleCount <= t + r)) for (var n = -1; n <= 7; n++) {e + n <= -1 || this.moduleCount <= e + n || (this.modules[t + r][e + n] = 0 <= r && r <= 6 && (0 == n || 6 == n) || 0 <= n && n <= 6 && (0 == r || 6 == r) || 2 <= r && r <= 4 && 2 <= n && n <= 4);}}}, getBestMaskPattern: function getBestMaskPattern() {for (var t = 0, e = 0, r = 0; r < 8; r++) {this.makeImpl(!0, r);var n = b.getLostPoint(this);(0 == r || t > n) && (t = n, e = r);}return e;}, createMovieClip: function createMovieClip(t, e, r) {var n = t.createEmptyMovieClip(e, r);this.make();for (var i = 0; i < this.modules.length; i++) {for (var o = 1 * i, a = 0; a < this.modules[i].length; a++) {var s = 1 * a,u = this.modules[i][a];u && (n.beginFill(0, 100), n.moveTo(s, o), n.lineTo(s + 1, o), n.lineTo(s + 1, o + 1), n.lineTo(s, o + 1), n.endFill());}}return n;}, setupTimingPattern: function setupTimingPattern() {for (var t = 8; t < this.moduleCount - 8; t++) {null == this.modules[t][6] && (this.modules[t][6] = t % 2 == 0);}for (var e = 8; e < this.moduleCount - 8; e++) {null == this.modules[6][e] && (this.modules[6][e] = e % 2 == 0);}}, setupPositionAdjustPattern: function setupPositionAdjustPattern() {for (var t = b.getPatternPosition(this.typeNumber), e = 0; e < t.length; e++) {for (var r = 0; r < t.length; r++) {var n = t[e],i = t[r];if (null == this.modules[n][i]) for (var o = -2; o <= 2; o++) {for (var a = -2; a <= 2; a++) {this.modules[n + o][i + a] = -2 == o || 2 == o || -2 == a || 2 == a || 0 == o && 0 == a;}}}}}, setupTypeNumber: function setupTypeNumber(t) {for (var e = b.getBCHTypeNumber(this.typeNumber), r = 0; r < 18; r++) {var n = !t && 1 == (e >> r & 1);this.modules[Math.floor(r / 3)][r % 3 + this.moduleCount - 8 - 3] = n;}for (var r = 0; r < 18; r++) {var n = !t && 1 == (e >> r & 1);this.modules[r % 3 + this.moduleCount - 8 - 3][Math.floor(r / 3)] = n;}}, setupTypeInfo: function setupTypeInfo(t, e) {for (var r = this.errorCorrectLevel << 3 | e, n = b.getBCHTypeInfo(r), i = 0; i < 15; i++) {var o = !t && 1 == (n >> i & 1);i < 6 ? this.modules[i][8] = o : i < 8 ? this.modules[i + 1][8] = o : this.modules[this.moduleCount - 15 + i][8] = o;}for (var i = 0; i < 15; i++) {var o = !t && 1 == (n >> i & 1);i < 8 ? this.modules[8][this.moduleCount - i - 1] = o : i < 9 ? this.modules[8][15 - i - 1 + 1] = o : this.modules[8][15 - i - 1] = o;}this.modules[this.moduleCount - 8][8] = !t;}, mapData: function mapData(t, e) {for (var r = -1, n = this.moduleCount - 1, i = 7, o = 0, a = this.moduleCount - 1; a > 0; a -= 2) {for (6 == a && a--;;) {for (var s = 0; s < 2; s++) {if (null == this.modules[n][a - s]) {var u = !1;o < t.length && (u = 1 == (t[o] >>> i & 1));var c = b.getMask(e, n, a - s);c && (u = !u), this.modules[n][a - s] = u, i--, -1 == i && (o++, i = 7);}}if ((n += r) < 0 || this.moduleCount <= n) {n -= r, r = -r;break;}}}} }, i.PAD0 = 236, i.PAD1 = 17, i.createData = function (t, e, r) {for (var n = a.getRSBlocks(t, e), o = new s(), u = 0; u < r.length; u++) {var c = r[u];o.put(c.mode, 4), o.put(c.getLength(), b.getLengthInBits(c.mode, t)), c.write(o);}for (var l = 0, u = 0; u < n.length; u++) {l += n[u].dataCount;}if (o.getLengthInBits() > 8 * l) throw new Error("code length overflow. (" + o.getLengthInBits() + ">" + 8 * l + ")");for (o.getLengthInBits() + 4 <= 8 * l && o.put(0, 4); o.getLengthInBits() % 8 != 0;) {o.putBit(!1);}for (;;) {if (o.getLengthInBits() >= 8 * l) break;if (o.put(i.PAD0, 8), o.getLengthInBits() >= 8 * l) break;o.put(i.PAD1, 8);}return i.createBytes(o, n);}, i.createBytes = function (t, e) {for (var r = 0, n = 0, i = 0, a = new Array(e.length), s = new Array(e.length), u = 0; u < e.length; u++) {var c = e[u].dataCount,l = e[u].totalCount - c;n = Math.max(n, c), i = Math.max(i, l), a[u] = new Array(c);for (var f = 0; f < a[u].length; f++) {a[u][f] = 255 & t.buffer[f + r];}r += c;var h = b.getErrorCorrectPolynomial(l),p = new o(a[u], h.getLength() - 1),d = p.mod(h);s[u] = new Array(h.getLength() - 1);for (var f = 0; f < s[u].length; f++) {var g = f + d.getLength() - s[u].length;s[u][f] = g >= 0 ? d.get(g) : 0;}}for (var v = 0, f = 0; f < e.length; f++) {v += e[f].totalCount;}for (var y = new Array(v), m = 0, f = 0; f < n; f++) {for (var u = 0; u < e.length; u++) {f < a[u].length && (y[m++] = a[u][f]);}}for (var f = 0; f < i; f++) {for (var u = 0; u < e.length; u++) {f < s[u].length && (y[m++] = s[u][f]);}}return y;};for (var y = { MODE_NUMBER: 1, MODE_ALPHA_NUM: 2, MODE_8BIT_BYTE: 4, MODE_KANJI: 8 }, m = { L: 1, M: 0, Q: 3, H: 2 }, w = { PATTERN000: 0, PATTERN001: 1, PATTERN010: 2, PATTERN011: 3, PATTERN100: 4, PATTERN101: 5, PATTERN110: 6, PATTERN111: 7 }, b = { PATTERN_POSITION_TABLE: [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170]], G15: 1335, G18: 7973, G15_MASK: 21522, getBCHTypeInfo: function getBCHTypeInfo(t) {for (var e = t << 10; b.getBCHDigit(e) - b.getBCHDigit(b.G15) >= 0;) {e ^= b.G15 << b.getBCHDigit(e) - b.getBCHDigit(b.G15);}return (t << 10 | e) ^ b.G15_MASK;}, getBCHTypeNumber: function getBCHTypeNumber(t) {for (var e = t << 12; b.getBCHDigit(e) - b.getBCHDigit(b.G18) >= 0;) {e ^= b.G18 << b.getBCHDigit(e) - b.getBCHDigit(b.G18);}return t << 12 | e;}, getBCHDigit: function getBCHDigit(t) {for (var e = 0; 0 != t;) {e++, t >>>= 1;}return e;}, getPatternPosition: function getPatternPosition(t) {return b.PATTERN_POSITION_TABLE[t - 1];}, getMask: function getMask(t, e, r) {switch (t) {case w.PATTERN000:return (e + r) % 2 == 0;case w.PATTERN001:return e % 2 == 0;case w.PATTERN010:return r % 3 == 0;case w.PATTERN011:return (e + r) % 3 == 0;case w.PATTERN100:return (Math.floor(e / 2) + Math.floor(r / 3)) % 2 == 0;case w.PATTERN101:return e * r % 2 + e * r % 3 == 0;case w.PATTERN110:return (e * r % 2 + e * r % 3) % 2 == 0;case w.PATTERN111:return (e * r % 3 + (e + r) % 2) % 2 == 0;default:throw new Error("bad maskPattern:" + t);}}, getErrorCorrectPolynomial: function getErrorCorrectPolynomial(t) {for (var e = new o([1], 0), r = 0; r < t; r++) {e = e.multiply(new o([1, _.gexp(r)], 0));}return e;}, getLengthInBits: function getLengthInBits(t, e) {if (1 <= e && e < 10) switch (t) {case y.MODE_NUMBER:return 10;case y.MODE_ALPHA_NUM:return 9;case y.MODE_8BIT_BYTE:case y.MODE_KANJI:return 8;default:throw new Error("mode:" + t);} else if (e < 27) switch (t) {case y.MODE_NUMBER:return 12;case y.MODE_ALPHA_NUM:return 11;case y.MODE_8BIT_BYTE:return 16;case y.MODE_KANJI:return 10;default:throw new Error("mode:" + t);} else {if (!(e < 41)) throw new Error("type:" + e);switch (t) {case y.MODE_NUMBER:return 14;case y.MODE_ALPHA_NUM:return 13;case y.MODE_8BIT_BYTE:return 16;case y.MODE_KANJI:return 12;default:throw new Error("mode:" + t);}}}, getLostPoint: function getLostPoint(t) {for (var e = t.getModuleCount(), r = 0, n = 0; n < e; n++) {for (var i = 0; i < e; i++) {for (var o = 0, a = t.isDark(n, i), s = -1; s <= 1; s++) {if (!(n + s < 0 || e <= n + s)) for (var u = -1; u <= 1; u++) {i + u < 0 || e <= i + u || 0 == s && 0 == u || a == t.isDark(n + s, i + u) && o++;}}o > 5 && (r += 3 + o - 5);}}for (var n = 0; n < e - 1; n++) {for (var i = 0; i < e - 1; i++) {var c = 0;t.isDark(n, i) && c++, t.isDark(n + 1, i) && c++, t.isDark(n, i + 1) && c++, t.isDark(n + 1, i + 1) && c++, 0 != c && 4 != c || (r += 3);}}for (var n = 0; n < e; n++) {for (var i = 0; i < e - 6; i++) {t.isDark(n, i) && !t.isDark(n, i + 1) && t.isDark(n, i + 2) && t.isDark(n, i + 3) && t.isDark(n, i + 4) && !t.isDark(n, i + 5) && t.isDark(n, i + 6) && (r += 40);}}for (var i = 0; i < e; i++) {for (var n = 0; n < e - 6; n++) {t.isDark(n, i) && !t.isDark(n + 1, i) && t.isDark(n + 2, i) && t.isDark(n + 3, i) && t.isDark(n + 4, i) && !t.isDark(n + 5, i) && t.isDark(n + 6, i) && (r += 40);}}for (var l = 0, i = 0; i < e; i++) {for (var n = 0; n < e; n++) {t.isDark(n, i) && l++;}}return r += Math.abs(100 * l / e / e - 50) / 5 * 10;} }, _ = { glog: function glog(t) {if (t < 1) throw new Error("glog(" + t + ")");return _.LOG_TABLE[t];}, gexp: function gexp(t) {for (; t < 0;) {t += 255;}for (; t >= 256;) {t -= 255;}return _.EXP_TABLE[t];}, EXP_TABLE: new Array(256), LOG_TABLE: new Array(256) }, x = 0; x < 8; x++) {_.EXP_TABLE[x] = 1 << x;}for (var x = 8; x < 256; x++) {_.EXP_TABLE[x] = _.EXP_TABLE[x - 4] ^ _.EXP_TABLE[x - 5] ^ _.EXP_TABLE[x - 6] ^ _.EXP_TABLE[x - 8];}for (var x = 0; x < 255; x++) {_.LOG_TABLE[_.EXP_TABLE[x]] = x;}o.prototype = { get: function get(t) {return this.num[t];}, getLength: function getLength() {return this.num.length;}, multiply: function multiply(t) {for (var e = new Array(this.getLength() + t.getLength() - 1), r = 0; r < this.getLength(); r++) {for (var n = 0; n < t.getLength(); n++) {e[r + n] ^= _.gexp(_.glog(this.get(r)) + _.glog(t.get(n)));}}return new o(e, 0);}, mod: function mod(t) {if (this.getLength() - t.getLength() < 0) return this;for (var e = _.glog(this.get(0)) - _.glog(t.get(0)), r = new Array(this.getLength()), n = 0; n < this.getLength(); n++) {r[n] = this.get(n);}for (var n = 0; n < t.getLength(); n++) {r[n] ^= _.gexp(_.glog(t.get(n)) + e);}return new o(r, 0).mod(t);} }, a.RS_BLOCK_TABLE = [[1, 26, 19], [1, 26, 16], [1, 26, 13], [1, 26, 9], [1, 44, 34], [1, 44, 28], [1, 44, 22], [1, 44, 16], [1, 70, 55], [1, 70, 44], [2, 35, 17], [2, 35, 13], [1, 100, 80], [2, 50, 32], [2, 50, 24], [4, 25, 9], [1, 134, 108], [2, 67, 43], [2, 33, 15, 2, 34, 16], [2, 33, 11, 2, 34, 12], [2, 86, 68], [4, 43, 27], [4, 43, 19], [4, 43, 15], [2, 98, 78], [4, 49, 31], [2, 32, 14, 4, 33, 15], [4, 39, 13, 1, 40, 14], [2, 121, 97], [2, 60, 38, 2, 61, 39], [4, 40, 18, 2, 41, 19], [4, 40, 14, 2, 41, 15], [2, 146, 116], [3, 58, 36, 2, 59, 37], [4, 36, 16, 4, 37, 17], [4, 36, 12, 4, 37, 13], [2, 86, 68, 2, 87, 69], [4, 69, 43, 1, 70, 44], [6, 43, 19, 2, 44, 20], [6, 43, 15, 2, 44, 16], [4, 101, 81], [1, 80, 50, 4, 81, 51], [4, 50, 22, 4, 51, 23], [3, 36, 12, 8, 37, 13], [2, 116, 92, 2, 117, 93], [6, 58, 36, 2, 59, 37], [4, 46, 20, 6, 47, 21], [7, 42, 14, 4, 43, 15], [4, 133, 107], [8, 59, 37, 1, 60, 38], [8, 44, 20, 4, 45, 21], [12, 33, 11, 4, 34, 12], [3, 145, 115, 1, 146, 116], [4, 64, 40, 5, 65, 41], [11, 36, 16, 5, 37, 17], [11, 36, 12, 5, 37, 13], [5, 109, 87, 1, 110, 88], [5, 65, 41, 5, 66, 42], [5, 54, 24, 7, 55, 25], [11, 36, 12], [5, 122, 98, 1, 123, 99], [7, 73, 45, 3, 74, 46], [15, 43, 19, 2, 44, 20], [3, 45, 15, 13, 46, 16], [1, 135, 107, 5, 136, 108], [10, 74, 46, 1, 75, 47], [1, 50, 22, 15, 51, 23], [2, 42, 14, 17, 43, 15], [5, 150, 120, 1, 151, 121], [9, 69, 43, 4, 70, 44], [17, 50, 22, 1, 51, 23], [2, 42, 14, 19, 43, 15], [3, 141, 113, 4, 142, 114], [3, 70, 44, 11, 71, 45], [17, 47, 21, 4, 48, 22], [9, 39, 13, 16, 40, 14], [3, 135, 107, 5, 136, 108], [3, 67, 41, 13, 68, 42], [15, 54, 24, 5, 55, 25], [15, 43, 15, 10, 44, 16], [4, 144, 116, 4, 145, 117], [17, 68, 42], [17, 50, 22, 6, 51, 23], [19, 46, 16, 6, 47, 17], [2, 139, 111, 7, 140, 112], [17, 74, 46], [7, 54, 24, 16, 55, 25], [34, 37, 13], [4, 151, 121, 5, 152, 122], [4, 75, 47, 14, 76, 48], [11, 54, 24, 14, 55, 25], [16, 45, 15, 14, 46, 16], [6, 147, 117, 4, 148, 118], [6, 73, 45, 14, 74, 46], [11, 54, 24, 16, 55, 25], [30, 46, 16, 2, 47, 17], [8, 132, 106, 4, 133, 107], [8, 75, 47, 13, 76, 48], [7, 54, 24, 22, 55, 25], [22, 45, 15, 13, 46, 16], [10, 142, 114, 2, 143, 115], [19, 74, 46, 4, 75, 47], [28, 50, 22, 6, 51, 23], [33, 46, 16, 4, 47, 17], [8, 152, 122, 4, 153, 123], [22, 73, 45, 3, 74, 46], [8, 53, 23, 26, 54, 24], [12, 45, 15, 28, 46, 16], [3, 147, 117, 10, 148, 118], [3, 73, 45, 23, 74, 46], [4, 54, 24, 31, 55, 25], [11, 45, 15, 31, 46, 16], [7, 146, 116, 7, 147, 117], [21, 73, 45, 7, 74, 46], [1, 53, 23, 37, 54, 24], [19, 45, 15, 26, 46, 16], [5, 145, 115, 10, 146, 116], [19, 75, 47, 10, 76, 48], [15, 54, 24, 25, 55, 25], [23, 45, 15, 25, 46, 16], [13, 145, 115, 3, 146, 116], [2, 74, 46, 29, 75, 47], [42, 54, 24, 1, 55, 25], [23, 45, 15, 28, 46, 16], [17, 145, 115], [10, 74, 46, 23, 75, 47], [10, 54, 24, 35, 55, 25], [19, 45, 15, 35, 46, 16], [17, 145, 115, 1, 146, 116], [14, 74, 46, 21, 75, 47], [29, 54, 24, 19, 55, 25], [11, 45, 15, 46, 46, 16], [13, 145, 115, 6, 146, 116], [14, 74, 46, 23, 75, 47], [44, 54, 24, 7, 55, 25], [59, 46, 16, 1, 47, 17], [12, 151, 121, 7, 152, 122], [12, 75, 47, 26, 76, 48], [39, 54, 24, 14, 55, 25], [22, 45, 15, 41, 46, 16], [6, 151, 121, 14, 152, 122], [6, 75, 47, 34, 76, 48], [46, 54, 24, 10, 55, 25], [2, 45, 15, 64, 46, 16], [17, 152, 122, 4, 153, 123], [29, 74, 46, 14, 75, 47], [49, 54, 24, 10, 55, 25], [24, 45, 15, 46, 46, 16], [4, 152, 122, 18, 153, 123], [13, 74, 46, 32, 75, 47], [48, 54, 24, 14, 55, 25], [42, 45, 15, 32, 46, 16], [20, 147, 117, 4, 148, 118], [40, 75, 47, 7, 76, 48], [43, 54, 24, 22, 55, 25], [10, 45, 15, 67, 46, 16], [19, 148, 118, 6, 149, 119], [18, 75, 47, 31, 76, 48], [34, 54, 24, 34, 55, 25], [20, 45, 15, 61, 46, 16]], a.getRSBlocks = function (t, e) {var r = a.getRsBlockTable(t, e);if (void 0 == r) throw new Error("bad rs block @ typeNumber:" + t + "/errorCorrectLevel:" + e);for (var n = r.length / 3, i = [], o = 0; o < n; o++) {for (var s = r[3 * o + 0], u = r[3 * o + 1], c = r[3 * o + 2], l = 0; l < s; l++) {i.push(new a(u, c));}}return i;}, a.getRsBlockTable = function (t, e) {switch (e) {case m.L:return a.RS_BLOCK_TABLE[4 * (t - 1) + 0];case m.M:return a.RS_BLOCK_TABLE[4 * (t - 1) + 1];case m.Q:return a.RS_BLOCK_TABLE[4 * (t - 1) + 2];case m.H:return a.RS_BLOCK_TABLE[4 * (t - 1) + 3];default:return;}}, s.prototype = { get: function get(t) {var e = Math.floor(t / 8);return 1 == (this.buffer[e] >>> 7 - t % 8 & 1);}, put: function put(t, e) {for (var r = 0; r < e; r++) {this.putBit(1 == (t >>> e - r - 1 & 1));}}, getLengthInBits: function getLengthInBits() {return this.length;}, putBit: function putBit(t) {var e = Math.floor(this.length / 8);this.buffer.length <= e && this.buffer.push(0), t && (this.buffer[e] |= 128 >>> this.length % 8), this.length++;} };var B = function () {function t() {this._elImage.src = this._elCanvas.toDataURL("image/png"), this._elImage.style.display = "block", this._elCanvas.style.display = "none";}function e(t, e) {var r = this;if (r._fFail = e, r._fSuccess = t, null === r._bSupportDataURI) {var n = document.createElement("img"),i = function i() {r._bSupportDataURI = !1, r._fFail && r._fFail.call(r);},o = function o() {r._bSupportDataURI = !0, r._fSuccess && r._fSuccess.call(r);};return n.onabort = i, n.onerror = i, n.onload = o, void (n.src = "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==");}!0 === r._bSupportDataURI && r._fSuccess ? r._fSuccess.call(r) : !1 === r._bSupportDataURI && r._fFail && r._fFail.call(r);}var r = function r(t) {this._bIsPainted = !1, this._htOption = t, this._elCanvas = document.createElement("canvas"), this._elCanvas.width = t.size, this._elCanvas.height = t.size, this._oContext = this._elCanvas.getContext("2d"), this._bIsPainted = !1, this._elImage = document.createElement("img"), this._elImage.alt = "Scan me!", this._elImage.style.display = "none", this._bSupportDataURI = null, this._callback = t.callback, this._bindElement = t.bindElement;};return r.prototype.draw = function (t) {var e = this._elImage,r = document.createElement("canvas"),n = r.getContext("2d"),i = this._htOption,o = t.getModuleCount(),a = i.size,s = i.margin;(s < 0 || 2 * s >= a) && (s = 0);var d = Math.ceil(s),y = a - 2 * s,m = i.whiteMargin,w = i.backgroundDimming,_ = Math.ceil(y / o),x = _ * o,B = x + 2 * d,k = void 0,P = void 0;r.width = B, r.height = B;var S = i.dotScale;if (e.style.display = "none", this.clear(), S <= 0 || S > 1) throw new Error("Scale should be in range (0, 1).");n.save(), n.translate(d, d);var E = document.createElement("canvas");E.width = B, E.height = B;var C = E.getContext("2d"),L = void 0,T = void 0;if (void 0 !== i.gifBackground) {var A = new g.a(i.gifBackground);if (!A.raw.hasImages) throw new Error("An invalid gif has been selected as the background.");if (k = A, P = A.decompressFrames(!0), i.autoColor) {for (var I = 0, R = 0, D = 0, M = 0, O = 0; O < P[0].colorTable.length; O++) {var F = P[0].colorTable[O];F[0] > 200 || F[1] > 200 || F[2] > 200 || 0 === F[0] && 0 === F[1] && 0 === F[2] || (M++, I += F[0], R += F[1], D += F[2]);}I = ~~(I / M), R = ~~(R / M), D = ~~(D / M), i.colorDark = "rgb(" + I + ", " + R + ", " + D + ")";}} else if (void 0 !== i.backgroundImage) {if (i.autoColor) {var N = p(i.backgroundImage);i.colorDark = "rgb(" + N.r + ", " + N.g + ", " + N.b + ")";}i.maskedDots ? (L = document.createElement("canvas"), L.width = B, L.height = B, T = L.getContext("2d"), T.drawImage(i.backgroundImage, 0, 0, i.backgroundImage.width, i.backgroundImage.height, 0, 0, B, B), C.rect(0, 0, B, B), C.fillStyle = "#ffffff", C.fill()) : (C.drawImage(i.backgroundImage, 0, 0, i.backgroundImage.width, i.backgroundImage.height, 0, 0, B, B), C.rect(0, 0, B, B), C.fillStyle = w, C.fill());} else C.rect(0, 0, B, B), C.fillStyle = i.backgroundColor, C.fill();i.binarize && (i.colorDark = "#000000", i.colorLight = "#FFFFFF");for (var j = b.getPatternPosition(t.typeNumber), U = .5 * (1 - S), G = 0; G < o; G++) {for (var z = 0; z < o; z++) {for (var W = t.isDark(G, z), H = z < 8 && (G < 8 || G >= o - 8) || z >= o - 8 && G < 8, q = 6 === G || 6 === z || H, O = 0; O < j.length - 1; O++) {q = q || G >= j[O] - 2 && G <= j[O] + 2 && z >= j[O] - 2 && z <= j[O] + 2;}var Q = z * _ + (q ? 0 : U * _),K = G * _ + (q ? 0 : U * _);if (n.strokeStyle = W ? i.colorDark : i.colorLight, n.lineWidth = .5, n.fillStyle = W ? i.colorDark : "rgba(255, 255, 255, 0.6)", 0 === j.length) q || l(n, Q, K, (q ? 1 : S) * _, (q ? 1 : S) * _, L, W);else {var V = z < o - 4 && z >= o - 4 - 5 && G < o - 4 && G >= o - 4 - 5;q || V || l(n, Q, K, (q ? 1 : S) * _, (q ? 1 : S) * _, L, W);}}}var X = i.colorLight;n.fillStyle = X, n.fillRect(0, 0, 8 * _, 8 * _), n.fillRect(0, (o - 8) * _, 8 * _, 8 * _), n.fillRect((o - 8) * _, 0, 8 * _, 8 * _), n.fillRect(8 * _, 6 * _, (o - 8 - 8) * _, _), n.fillRect(6 * _, 8 * _, _, (o - 8 - 8) * _);for (var Y = j[j.length - 1], O = 0; O < j.length; O++) {for (var J = 0; J < j.length; J++) {var $ = j[J],Z = j[O];(6 !== $ || 6 !== Z && Z !== Y) && (6 !== Z || 6 !== $ && $ !== Y) && f(n, $, Z, _, _);}}n.fillStyle = i.colorDark, n.fillRect(0, 0, 7 * _, _), n.fillRect((o - 7) * _, 0, 7 * _, _), n.fillRect(0, 6 * _, 7 * _, _), n.fillRect((o - 7) * _, 6 * _, 7 * _, _), n.fillRect(0, (o - 7) * _, 7 * _, _), n.fillRect(0, (o - 7 + 6) * _, 7 * _, _), n.fillRect(0, 0, _, 7 * _), n.fillRect(6 * _, 0, _, 7 * _), n.fillRect((o - 7) * _, 0, _, 7 * _), n.fillRect((o - 7 + 6) * _, 0, _, 7 * _), n.fillRect(0, (o - 7) * _, _, 7 * _), n.fillRect(6 * _, (o - 7) * _, _, 7 * _), n.fillRect(2 * _, 2 * _, 3 * _, 3 * _), n.fillRect((o - 7 + 2) * _, 2 * _, 3 * _, 3 * _), n.fillRect(2 * _, (o - 7 + 2) * _, 3 * _, 3 * _);for (var O = 0; O < o - 8; O += 2) {n.fillRect((8 + O) * _, 6 * _, _, _), n.fillRect(6 * _, (8 + O) * _, _, _);}for (var O = 0; O < j.length; O++) {for (var J = 0; J < j.length; J++) {var $ = j[J],Z = j[O];(6 !== $ || 6 !== Z && Z !== Y) && (6 !== Z || 6 !== $ && $ !== Y) && (6 !== $ && $ !== Y && 6 !== Z && Z !== Y ? (n.fillStyle = i.colorLight, h(n, $, Z, _, _)) : (n.fillStyle = i.colorDark, h(n, $, Z, _, _)));}}if (m && (n.fillStyle = i.backgroundColor, n.fillRect(-d, -d, B, d), n.fillRect(-d, x, B, d), n.fillRect(x, -d, d, B), n.fillRect(-d, -d, d, B)), void 0 !== i.logoImage) {var tt = i.logoScale,et = i.logoMargin,rt = i.logoCornerRadius;(tt <= 0 || tt >= 1) && (tt = .2), et < 0 && (et = 0), rt < 0 && (rt = 0), n.restore(), n.translate(d, d);var nt = x * tt,it = .5 * (x - nt),ot = it;n.fillStyle = i.logoBackgroundColor, n.save(), u(n, it - et, ot - et, nt + 2 * et, nt + 2 * et, rt), n.clip(), n.fill(), n.restore(), n.save(), u(n, it, ot, nt, nt, rt), n.clip(), n.drawImage(i.logoImage, it, ot, nt, nt), n.restore();}if (void 0 === k) {if (C.drawImage(r, 0, 0, B, B), n.drawImage(E, -d, -d, B, B), i.binarize) {var at = n.getImageData(0, 0, B, B),st = 128;parseInt(i.binarizeThreshold) > 0 && parseInt(i.binarizeThreshold) < 255 && (st = parseInt(i.binarizeThreshold));for (var O = 0; O < at.data.length; O += 4) {c(at.data[O], at.data[O + 1], at.data[O + 2]) > st ? (at.data[O] = 255, at.data[O + 1] = 255, at.data[O + 2] = 255) : (at.data[O] = 0, at.data[O + 1] = 0, at.data[O + 2] = 0);}n.putImageData(at, 0, 0);}var ut = document.createElement("canvas"),ct = ut.getContext("2d");if (ut.width = a, ut.height = a, ct.drawImage(r, 0, 0, a, a), this._elCanvas = ut, this._bIsPainted = !0, void 0 !== this._callback && this._callback(this._elCanvas.toDataURL()), void 0 !== this._bindElement) try {var lt = document.getElementById(this._bindElement);if ("IMG" === lt.nodeName) lt.src = this._elCanvas.toDataURL();else {var ft = lt.style;ft["background-image"] = "url(" + this._elCanvas.toDataURL() + ")", ft["background-size"] = "contain", ft["background-repeat"] = "no-repeat";}} catch (t) {console.error(t);}} else {var ht,pt,dt,gt,vt = document.createElement("canvas"),yt = vt.getContext("2d");if (P.forEach(function (t) {void 0 === ht && (ht = new v.a({ workers: 4, quality: 10, width: a, height: a })), void 0 === pt && (pt = document.createElement("canvas"), dt = pt.getContext("2d"), pt.width = t.dims.width, pt.height = t.dims.height, dt.rect(0, 0, pt.width, pt.height), dt.fillStyle = "#ffffff", dt.fill()), gt && t.dims.width === vt.width && t.dims.height === vt.height || (vt.width = t.dims.width, vt.height = t.dims.height, gt = yt.createImageData(t.dims.width, t.dims.height)), gt.data.set(t.patch), yt.putImageData(gt, 0, 0), dt.drawImage(vt, t.dims.left, t.dims.top);var e = document.createElement("canvas");e.width = B, e.height = B;var n = e.getContext("2d");n.drawImage(pt, 0, 0, B, B), n.drawImage(r, 0, 0, B, B);var i = document.createElement("canvas"),o = i.getContext("2d");i.width = a, i.height = a, o.drawImage(e, 0, 0, a, a), ht.addFrame(o, { copy: !0, delay: t.delay });}), void 0 === ht) throw new Error("No frames.");var mt = this;ht.on("finished", function (t) {var e = new FileReader();e.onload = function (t) {var e = t.target.result;if (mt._bIsPainted = !0, void 0 !== mt._callback && mt._callback(e), void 0 !== mt._bindElement) try {var r = document.getElementById(mt._bindElement);if ("IMG" === r.nodeName) r.src = e;else {var n = r.style;n["background-image"] = "url(" + e + ")", n["background-size"] = "contain", n["background-repeat"] = "no-repeat";}} catch (t) {console.error(t);}}, e.readAsDataURL(t);}), ht.render();}}, r.prototype.makeImage = function () {this._bIsPainted && e.call(this, t);}, r.prototype.isPainted = function () {return this._bIsPainted;}, r.prototype.clear = function () {this._oContext.clearRect(0, 0, this._elCanvas.width, this._elCanvas.height), this._bIsPainted = !1;}, r.prototype.round = function (t) {return t ? Math.floor(1e3 * t) / 1e3 : t;}, r;}();d = function d() {}, d.prototype.create = function (t) {if (this._htOption = { size: 800, margin: 20, typeNumber: 4, colorDark: "#000000", colorLight: "rgba(255, 255, 255, 0.6)", logoBackgroundColor: "#ffffff", correctLevel: m.M, backgroundImage: void 0, backgroundDimming: "rgba(0,0,0,0)", logoImage: void 0, logoScale: .2, logoMargin: 6, logoCornerRadius: 8, whiteMargin: !0, dotScale: .35, maskedDots: !1, autoColor: !0, binarize: !1, binarizeThreshold: 128, gifBackground: void 0, callback: void 0, bindElement: void 0, backgroundColor: "#ffffff" }, "string" == typeof t && (t = { text: t }), t) for (var e in t) {this._htOption[e] = t[e];}this._oQRCode = null, this._oDrawing = new B(this._htOption), this._htOption.text && this.makeCode(this._htOption.text);}, d.prototype.makeCode = function (t) {this._oQRCode = new i(-1, this._htOption.correctLevel), this._oQRCode.addData(t), this._oQRCode.make(), this._oDrawing.draw(this._oQRCode), this.makeImage();}, d.prototype.makeImage = function () {"function" == typeof this._oDrawing.makeImage && this._oDrawing.makeImage();}, d.prototype.clear = function () {this._oDrawing.clear();}, d.CorrectLevel = m, e.a = d;}, function (t, e, r) {"use strict";function n(t) {var e = new Uint8Array(t),r = new i.a(e);this.raw = r.parse(o.a), this.raw.hasImages = !1;for (var n = 0; n < this.raw.frames.length; n++) {if (this.raw.frames[n].image) {this.raw.hasImages = !0;break;}}}var i = r(93),o = r(95);n.prototype.decompressFrame = function (t, e) {if (t >= this.raw.frames.length) return null;var r = this.raw.frames[t];if (r.image) {var n = r.image.descriptor.width * r.image.descriptor.height,i = function (t, e, r) {var n,i,o,a,s,u,c,l,f,h,p,d,g,v,y,m,w = r,b = new Array(r),_ = new Array(4096),x = new Array(4096),B = new Array(4097);for (d = t, i = 1 << d, s = i + 1, n = i + 2, c = -1, a = d + 1, o = (1 << a) - 1, f = 0; f < i; f++) {_[f] = 0, x[f] = f;}for (p = l = g = v = m = y = 0, h = 0; h < w;) {if (0 === v) {if (l < a) {p += e[y] << l, l += 8, y++;continue;}if (f = p & o, p >>= a, l -= a, f > n || f == s) break;if (f == i) {a = d + 1, o = (1 << a) - 1, n = i + 2, c = -1;continue;}if (-1 == c) {B[v++] = x[f], c = f, g = f;continue;}for (u = f, f == n && (B[v++] = g, f = c); f > i;) {B[v++] = x[f], f = _[f];}g = 255 & x[f], B[v++] = g, n < 4096 && (_[n] = c, x[n] = g, 0 == (++n & o) && n < 4096 && (a++, o += n)), c = u;}v--, b[m++] = B[v], h++;}for (h = m; h < w; h++) {b[h] = 0;}return b;}(r.image.data.minCodeSize, r.image.data.blocks, n);r.image.descriptor.lct.interlaced && (i = function (t, e) {for (var r = new Array(t.length), n = t.length / e, i = [0, 4, 2, 1], o = [8, 8, 4, 2], a = 0, s = 0; s < 4; s++) {for (var u = i[s]; u < n; u += o[s]) {!function (n, i) {var o = t.slice(i * e, (i + 1) * e);r.splice.apply(r, [n * e, e].concat(o));}(u, a), a++;}}return r;}(i, r.image.descriptor.width));var o = { pixels: i, dims: { top: r.image.descriptor.top, left: r.image.descriptor.left, width: r.image.descriptor.width, height: r.image.descriptor.height } };return r.image.descriptor.lct && r.image.descriptor.lct.exists ? o.colorTable = r.image.lct : o.colorTable = this.raw.gct, r.gce && (o.delay = 10 * (r.gce.delay || 10), o.disposalType = r.gce.extras.disposal, r.gce.extras.transparentColorGiven && (o.transparentIndex = r.gce.transparentColorIndex)), e && (o.patch = function (t) {for (var e = t.pixels.length, r = new Uint8ClampedArray(4 * e), n = 0; n < e; n++) {var i = 4 * n,o = t.pixels[n],a = t.colorTable[o];r[i] = a[0], r[i + 1] = a[1], r[i + 2] = a[2], r[i + 3] = o !== t.transparentIndex ? 255 : 0;}return r;}(o)), o;}return null;}, n.prototype.decompressFrames = function (t) {for (var e = [], r = 0; r < this.raw.frames.length; r++) {this.raw.frames[r].image && e.push(this.decompressFrame(r, t));}return e;}, e.a = n;}, function (t, e, r) {"use strict";function n(t) {this.stream = new o.a(t), this.output = {};}function i(t) {return t.reduce(function (t, e) {return 2 * t + e;}, 0);}var o = r(94);n.prototype.parse = function (t) {return this.parseParts(this.output, t), this.output;}, n.prototype.parseParts = function (t, e) {for (var r = 0; r < e.length; r++) {var n = e[r];this.parsePart(t, n);}}, n.prototype.parsePart = function (t, e) {var r,n = e.label;if (!e.requires || e.requires(this.stream, this.output, t)) if (e.loop) {for (var i = []; e.loop(this.stream);) {var o = {};this.parseParts(o, e.parts), i.push(o);}t[n] = i;} else e.parts ? (r = {}, this.parseParts(r, e.parts), t[n] = r) : e.parser ? (r = e.parser(this.stream, this.output, t), e.skip || (t[n] = r)) : e.bits && (t[n] = this.parseBits(e.bits));}, n.prototype.parseBits = function (t) {var e = {},r = this.stream.readBitArray();for (var n in t) {var o = t[n];o.length ? e[n] = i(r.slice(o.index, o.index + o.length)) : e[n] = r[o.index];}return e;}, e.a = n;}, function (t, e, r) {"use strict";function n(t) {this.data = t, this.pos = 0;}n.prototype.readByte = function () {return this.data[this.pos++];}, n.prototype.peekByte = function () {return this.data[this.pos];}, n.prototype.readBytes = function (t) {for (var e = new Array(t), r = 0; r < t; r++) {e[r] = this.readByte();}return e;}, n.prototype.peekBytes = function (t) {for (var e = new Array(t), r = 0; r < t; r++) {e[r] = this.data[this.pos + r];}return e;}, n.prototype.readString = function (t) {for (var e = "", r = 0; r < t; r++) {e += String.fromCharCode(this.readByte());}return e;}, n.prototype.readBitArray = function () {for (var t = [], e = this.readByte(), r = 7; r >= 0; r--) {t.push(!!(e & 1 << r));}return t;}, n.prototype.readUnsigned = function (t) {var e = this.readBytes(2);return t ? (e[1] << 8) + e[0] : (e[0] << 8) + e[1];}, e.a = n;}, function (t, e, r) {"use strict";var n = r(96),i = { label: "blocks", parser: function parser(t) {for (var e = [], r = t.readByte(); 0 !== r; r = t.readByte()) {e = e.concat(t.readBytes(r));}return e;} },o = { label: "gce", requires: function requires(t) {var e = t.peekBytes(2);return 33 === e[0] && 249 === e[1];}, parts: [{ label: "codes", parser: n.a.readBytes(2), skip: !0 }, { label: "byteSize", parser: n.a.readByte() }, { label: "extras", bits: { future: { index: 0, length: 3 }, disposal: { index: 3, length: 3 }, userInput: { index: 6 }, transparentColorGiven: { index: 7 } } }, { label: "delay", parser: n.a.readUnsigned(!0) }, { label: "transparentColorIndex", parser: n.a.readByte() }, { label: "terminator", parser: n.a.readByte(), skip: !0 }] },a = { label: "image", requires: function requires(t) {return 44 === t.peekByte();}, parts: [{ label: "code", parser: n.a.readByte(), skip: !0 }, { label: "descriptor", parts: [{ label: "left", parser: n.a.readUnsigned(!0) }, { label: "top", parser: n.a.readUnsigned(!0) }, { label: "width", parser: n.a.readUnsigned(!0) }, { label: "height", parser: n.a.readUnsigned(!0) }, { label: "lct", bits: { exists: { index: 0 }, interlaced: { index: 1 }, sort: { index: 2 }, future: { index: 3, length: 2 }, size: { index: 5, length: 3 } } }] }, { label: "lct", requires: function requires(t, e, r) {return r.descriptor.lct.exists;}, parser: n.a.readArray(3, function (t, e, r) {return Math.pow(2, r.descriptor.lct.size + 1);}) }, { label: "data", parts: [{ label: "minCodeSize", parser: n.a.readByte() }, i] }] },s = { label: "text", requires: function requires(t) {var e = t.peekBytes(2);return 33 === e[0] && 1 === e[1];}, parts: [{ label: "codes", parser: n.a.readBytes(2), skip: !0 }, { label: "blockSize", parser: n.a.readByte() }, { label: "preData", parser: function parser(t, e, r) {return t.readBytes(r.text.blockSize);} }, i] },u = { label: "application", requires: function requires(t, e, r) {var n = t.peekBytes(2);return 33 === n[0] && 255 === n[1];}, parts: [{ label: "codes", parser: n.a.readBytes(2), skip: !0 }, { label: "blockSize", parser: n.a.readByte() }, { label: "id", parser: function parser(t, e, r) {return t.readString(r.blockSize);} }, i] },c = { label: "comment", requires: function requires(t, e, r) {var n = t.peekBytes(2);return 33 === n[0] && 254 === n[1];}, parts: [{ label: "codes", parser: n.a.readBytes(2), skip: !0 }, i] },l = { label: "frames", parts: [o, u, c, a, s], loop: function loop(t) {var e = t.peekByte();return 33 === e || 44 === e;} },f = [{ label: "header", parts: [{ label: "signature", parser: n.a.readString(3) }, { label: "version", parser: n.a.readString(3) }] }, { label: "lsd", parts: [{ label: "width", parser: n.a.readUnsigned(!0) }, { label: "height", parser: n.a.readUnsigned(!0) }, { label: "gct", bits: { exists: { index: 0 }, resolution: { index: 1, length: 3 }, sort: { index: 4 }, size: { index: 5, length: 3 } } }, { label: "backgroundColorIndex", parser: n.a.readByte() }, { label: "pixelAspectRatio", parser: n.a.readByte() }] }, { label: "gct", requires: function requires(t, e) {return e.lsd.gct.exists;}, parser: n.a.readArray(3, function (t, e) {return Math.pow(2, e.lsd.gct.size + 1);}) }, l];e.a = f;}, function (t, e, r) {"use strict";var n = { readByte: function readByte() {return function (t) {return t.readByte();};}, readBytes: function readBytes(t) {return function (e) {return e.readBytes(t);};}, readString: function readString(t) {return function (e) {return e.readString(t);};}, readUnsigned: function readUnsigned(t) {return function (e) {return e.readUnsigned(t);};}, readArray: function readArray(t, e) {return function (r, n, i) {for (var o = e(r, n, i), a = new Array(o), s = 0; s < o; s++) {a[s] = r.readBytes(t);}return a;};} };e.a = n;}, function (t, e, r) {"use strict";function n() {this._events = this._events || {}, this._maxListeners = this._maxListeners || void 0;}function i(t) {return "function" == typeof t;}function o(t) {return "number" == typeof t;}function a(t) {return "object" === (void 0 === t ? "undefined" : c()(t)) && null !== t;}function s(t) {return void 0 === t;}var u = r(98),c = r.n(u);n.EventEmitter = n, n.prototype._events = void 0, n.prototype._maxListeners = void 0, n.defaultMaxListeners = 10, n.prototype.setMaxListeners = function (t) {if (!o(t) || t < 0 || isNaN(t)) throw TypeError("n must be a positive number");return this._maxListeners = t, this;}, n.prototype.emit = function (t) {var e, r, n, o, u, c;if (this._events || (this._events = {}), "error" === t && (!this._events.error || a(this._events.error) && !this._events.error.length)) {if ((e = arguments[1]) instanceof Error) throw e;var l = new Error('Uncaught, unspecified "error" event. (' + e + ")");throw l.context = e, l;}if (r = this._events[t], s(r)) return !1;if (i(r)) switch (arguments.length) {case 1:r.call(this);break;case 2:r.call(this, arguments[1]);break;case 3:r.call(this, arguments[1], arguments[2]);break;default:o = Array.prototype.slice.call(arguments, 1), r.apply(this, o);} else if (a(r)) for (o = Array.prototype.slice.call(arguments, 1), c = r.slice(), n = c.length, u = 0; u < n; u++) {c[u].apply(this, o);}return !0;}, n.prototype.addListener = function (t, e) {var r;if (!i(e)) throw TypeError("listener must be a function");return this._events || (this._events = {}), this._events.newListener && this.emit("newListener", t, i(e.listener) ? e.listener : e), this._events[t] ? a(this._events[t]) ? this._events[t].push(e) : this._events[t] = [this._events[t], e] : this._events[t] = e, a(this._events[t]) && !this._events[t].warned && (r = s(this._maxListeners) ? n.defaultMaxListeners : this._maxListeners) && r > 0 && this._events[t].length > r && (this._events[t].warned = !0, console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[t].length), "function" == typeof console.trace && console.trace()), this;}, n.prototype.on = n.prototype.addListener, n.prototype.once = function (t, e) {function r() {this.removeListener(t, r), n || (n = !0, e.apply(this, arguments));}if (!i(e)) throw TypeError("listener must be a function");var n = !1;return r.listener = e, this.on(t, r), this;}, n.prototype.removeListener = function (t, e) {var r, n, o, s;if (!i(e)) throw TypeError("listener must be a function");if (!this._events || !this._events[t]) return this;if (r = this._events[t], o = r.length, n = -1, r === e || i(r.listener) && r.listener === e) delete this._events[t], this._events.removeListener && this.emit("removeListener", t, e);else if (a(r)) {for (s = o; s-- > 0;) {if (r[s] === e || r[s].listener && r[s].listener === e) {n = s;break;}}if (n < 0) return this;1 === r.length ? (r.length = 0, delete this._events[t]) : r.splice(n, 1), this._events.removeListener && this.emit("removeListener", t, e);}return this;}, n.prototype.removeAllListeners = function (t) {var e, r;if (!this._events) return this;if (!this._events.removeListener) return 0 === arguments.length ? this._events = {} : this._events[t] && delete this._events[t], this;if (0 === arguments.length) {for (e in this._events) {"removeListener" !== e && this.removeAllListeners(e);}return this.removeAllListeners("removeListener"), this._events = {}, this;}if (r = this._events[t], i(r)) this.removeListener(t, r);else if (r) for (; r.length;) {this.removeListener(t, r[r.length - 1]);}return delete this._events[t], this;}, n.prototype.listeners = function (t) {return this._events && this._events[t] ? i(this._events[t]) ? [this._events[t]] : this._events[t].slice() : [];}, n.prototype.listenerCount = function (t) {if (this._events) {var e = this._events[t];if (i(e)) return 1;if (e) return e.length;}return 0;}, n.listenerCount = function (t, e) {return t.listenerCount(e);};var l, f, h, p, d;d = navigator.userAgent.toLowerCase(), p = navigator.platform.toLowerCase(), l = d.match(/(opera|ie|firefox|chrome|version)[\s\/:]([\w\d\.]+)?.*?(safari|version[\s\/:]([\w\d\.]+)|$)/) || [null, "unknown", 0], h = "ie" === l[1] && document.documentMode, f = { name: "version" === l[1] ? l[3] : l[1], version: h || parseFloat("opera" === l[1] && l[4] ? l[4] : l[2]), platform: { name: d.match(/ip(?:ad|od|hone)/) ? "ios" : (d.match(/(?:webos|android)/) || p.match(/mac|win|linux/) || ["other"])[0] } }, f[f.name] = !0, f[f.name + parseInt(f.version, 10)] = !0, f.platform[f.platform.name] = !0;var g = function g(t, e) {function r() {this.constructor = t;}for (var n in e) {v.call(e, n) && (t[n] = e[n]);}return r.prototype = e.prototype, t.prototype = new r(), t.__super__ = e.prototype, t;},v = {}.hasOwnProperty,y = [].indexOf || function (t) {for (var e = 0, r = this.length; e < r; e++) {if (e in this && this[e] === t) return e;}return -1;},m = [].slice,w = function (t) {function e(t) {var e, r, i;this.running = !1, this.options = {}, this.frames = [], this.freeWorkers = [], this.activeWorkers = [], this.setOptions(t);for (r in n) {i = n[r], null == (e = this.options)[r] && (e[r] = i);}}var n, i;g(e, t);var o = r(50);return n = { workerScript: o, workers: 2, repeat: 0, background: "#fff", quality: 10, width: null, height: null, transparent: null, debug: !1, dither: !1 }, i = { delay: 500, copy: !1 }, e.prototype.setOption = function (t, e) {if (this.options[t] = e, null != this._canvas && ("width" === t || "height" === t)) return this._canvas[t] = e;}, e.prototype.setOptions = function (t) {var e, r, n;r = [];for (e in t) {v.call(t, e) && (n = t[e], r.push(this.setOption(e, n)));}return r;}, e.prototype.addFrame = function (t, e) {var r, n;null == e && (e = {}), r = {}, r.transparent = this.options.transparent;for (n in i) {r[n] = e[n] || i[n];}if (null == this.options.width && this.setOption("width", t.width), null == this.options.height && this.setOption("height", t.height), "undefined" != typeof ImageData && null !== ImageData && t instanceof ImageData) r.data = t.data;else if ("undefined" != typeof CanvasRenderingContext2D && null !== CanvasRenderingContext2D && t instanceof CanvasRenderingContext2D || "undefined" != typeof WebGLRenderingContext && null !== WebGLRenderingContext && t instanceof WebGLRenderingContext) e.copy ? r.data = this.getContextData(t) : r.context = t;else {if (null == t.childNodes) throw new Error("Invalid image");e.copy ? r.data = this.getImageData(t) : r.image = t;}return this.frames.push(r);}, e.prototype.render = function () {var t, e, r, n;if (this.running) throw new Error("Already running");if (null == this.options.width || null == this.options.height) throw new Error("Width and height must be set prior to rendering");if (this.running = !0, this.nextFrame = 0, this.finishedFrames = 0, this.imageParts = function () {var e, r, n;for (n = [], t = e = 0, r = this.frames.length; 0 <= r ? e < r : e > r; t = 0 <= r ? ++e : --e) {n.push(null);}return n;}.call(this), r = this.spawnWorkers(), !0 === this.options.globalPalette) this.renderNextFrame();else for (t = e = 0, n = r; 0 <= n ? e < n : e > n; t = 0 <= n ? ++e : --e) {this.renderNextFrame();}return this.emit("start"), this.emit("progress", 0);}, e.prototype.abort = function () {for (var t;;) {if (null == (t = this.activeWorkers.shift())) break;this.log("killing active worker"), t.terminate();}return this.running = !1, this.emit("abort");}, e.prototype.spawnWorkers = function () {var t, e, n;return t = Math.min(this.options.workers, this.frames.length), function () {n = [];for (var r = e = this.freeWorkers.length; e <= t ? r < t : r > t; e <= t ? r++ : r--) {n.push(r);}return n;}.apply(this).forEach(function (t) {return function (e) {var n;t.log("spawning worker " + e);var i = r(50);return n = new i(), n.onmessage = function (e) {return t.activeWorkers.splice(t.activeWorkers.indexOf(n), 1), t.freeWorkers.push(n), t.frameFinished(e.data);}, t.freeWorkers.push(n);};}(this)), t;}, e.prototype.frameFinished = function (t) {var e, r;if (this.log("frame " + t.index + " finished - " + this.activeWorkers.length + " active"), this.finishedFrames++, this.emit("progress", this.finishedFrames / this.frames.length), this.imageParts[t.index] = t, !0 === this.options.globalPalette && (this.options.globalPalette = t.globalPalette, this.log("global palette analyzed"), this.frames.length > 2)) for (e = 1, r = this.freeWorkers.length; 1 <= r ? e < r : e > r; 1 <= r ? ++e : --e) {this.renderNextFrame();}return y.call(this.imageParts, null) >= 0 ? this.renderNextFrame() : this.finishRendering();}, e.prototype.finishRendering = function () {var t, e, r, n, i, o, a, s, u, c, l, f, h, p, d, g;for (s = 0, p = this.imageParts, i = 0, u = p.length; i < u; i++) {e = p[i], s += (e.data.length - 1) * e.pageSize + e.cursor;}for (s += e.pageSize - e.cursor, this.log("rendering finished - filesize " + Math.round(s / 1e3) + "kb"), t = new Uint8Array(s), f = 0, d = this.imageParts, o = 0, c = d.length; o < c; o++) {for (e = d[o], g = e.data, r = a = 0, l = g.length; a < l; r = ++a) {h = g[r], t.set(h, f), r === e.data.length - 1 ? f += e.cursor : f += e.pageSize;}}return n = new Blob([t], { type: "image/gif" }), this.emit("finished", n, t);}, e.prototype.renderNextFrame = function () {var t, e, r;if (0 === this.freeWorkers.length) throw new Error("No free workers");if (!(this.nextFrame >= this.frames.length)) return t = this.frames[this.nextFrame++], r = this.freeWorkers.shift(), e = this.getTask(t), this.log("starting frame " + (e.index + 1) + " of " + this.frames.length), this.activeWorkers.push(r), r.postMessage(e);}, e.prototype.getContextData = function (t) {return t.getImageData(0, 0, this.options.width, this.options.height).data;}, e.prototype.getImageData = function (t) {var e;return null == this._canvas && (this._canvas = document.createElement("canvas"), this._canvas.width = this.options.width, this._canvas.height = this.options.height), e = this._canvas.getContext("2d"), e.setFill = this.options.background, e.fillRect(0, 0, this.options.width, this.options.height), e.drawImage(t, 0, 0), this.getContextData(e);}, e.prototype.getTask = function (t) {var e, r;if (e = this.frames.indexOf(t), r = { index: e, last: e === this.frames.length - 1, delay: t.delay, transparent: t.transparent, width: this.options.width, height: this.options.height, quality: this.options.quality, dither: this.options.dither, globalPalette: this.options.globalPalette, repeat: this.options.repeat, canTransfer: "chrome" === f.name }, null != t.data) r.data = t.data;else if (null != t.context) r.data = this.getContextData(t.context);else {if (null == t.image) throw new Error("Invalid frame");r.data = this.getImageData(t.image);}return r;}, e.prototype.log = function () {var t;if (t = 1 <= arguments.length ? m.call(arguments, 0) : [], this.options.debug) return console.log.apply(console, t);}, e;}(n);e.a = w;}, function (t, e, r) {"use strict";function n(t) {return t && t.__esModule ? t : { default: t };}e.__esModule = !0;var i = r(99),o = n(i),a = r(101),s = n(a),u = "function" == typeof s.default && "symbol" == typeof o.default ? function (t) {return typeof t;} : function (t) {return t && "function" == typeof s.default && t.constructor === s.default && t !== s.default.prototype ? "symbol" : typeof t;};e.default = "function" == typeof s.default && "symbol" === u(o.default) ? function (t) {return void 0 === t ? "undefined" : u(t);} : function (t) {return t && "function" == typeof s.default && t.constructor === s.default && t !== s.default.prototype ? "symbol" : void 0 === t ? "undefined" : u(t);};}, function (t, e, r) {t.exports = { default: r(100), __esModule: !0 };}, function (t, e, r) {r(34), r(42), t.exports = r(29).f("iterator");}, function (t, e, r) {t.exports = { default: r(102), __esModule: !0 };}, function (t, e, r) {r(103), r(33), r(109), r(110), t.exports = r(2).Symbol;}, function (t, e, r) {"use strict";var n = r(0),i = r(8),o = r(7),a = r(11),s = r(37),u = r(104).KEY,c = r(16),l = r(26),f = r(19),h = r(18),p = r(1),d = r(29),g = r(30),v = r(105),y = r(106),m = r(3),w = r(6),b = r(9),_ = r(23),x = r(17),B = r(38),k = r(107),P = r(108),S = r(5),E = r(24),C = P.f,L = S.f,T = k.f,_A = n.Symbol,I = n.JSON,R = I && I.stringify,D = p("_hidden"),M = p("toPrimitive"),O = {}.propertyIsEnumerable,F = l("symbol-registry"),N = l("symbols"),j = l("op-symbols"),U = Object.prototype,G = "function" == typeof _A,z = n.QObject,W = !z || !z.prototype || !z.prototype.findChild,H = o && c(function () {return 7 != B(L({}, "a", { get: function get() {return L(this, "a", { value: 7 }).a;} })).a;}) ? function (t, e, r) {var n = C(U, e);n && delete U[e], L(t, e, r), n && t !== U && L(U, e, n);} : L,q = function q(t) {var e = N[t] = B(_A.prototype);return e._k = t, e;},Q = G && "symbol" == typeof _A.iterator ? function (t) {return "symbol" == typeof t;} : function (t) {return t instanceof _A;},K = function K(t, e, r) {return t === U && K(j, e, r), m(t), e = _(e, !0), m(r), i(N, e) ? (r.enumerable ? (i(t, D) && t[D][e] && (t[D][e] = !1), r = B(r, { enumerable: x(0, !1) })) : (i(t, D) || L(t, D, x(1, {})), t[D][e] = !0), H(t, e, r)) : L(t, e, r);},V = function V(t, e) {m(t);for (var r, n = v(e = b(e)), i = 0, o = n.length; o > i;) {K(t, r = n[i++], e[r]);}return t;},X = function X(t, e) {return void 0 === e ? B(t) : V(B(t), e);},Y = function Y(t) {var e = O.call(this, t = _(t, !0));return !(this === U && i(N, t) && !i(j, t)) && (!(e || !i(this, t) || !i(N, t) || i(this, D) && this[D][t]) || e);},J = function J(t, e) {if (t = b(t), e = _(e, !0), t !== U || !i(N, e) || i(j, e)) {var r = C(t, e);return !r || !i(N, e) || i(t, D) && t[D][e] || (r.enumerable = !0), r;}},$ = function $(t) {for (var e, r = T(b(t)), n = [], o = 0; r.length > o;) {i(N, e = r[o++]) || e == D || e == u || n.push(e);}return n;},Z = function Z(t) {for (var e, r = t === U, n = T(r ? j : b(t)), o = [], a = 0; n.length > a;) {!i(N, e = n[a++]) || r && !i(U, e) || o.push(N[e]);}return o;};G || (_A = function A() {if (this instanceof _A) throw TypeError("Symbol is not a constructor!");var t = h(arguments.length > 0 ? arguments[0] : void 0),e = function e(r) {this === U && e.call(j, r), i(this, D) && i(this[D], t) && (this[D][t] = !1), H(this, t, x(1, r));};return o && W && H(U, t, { configurable: !0, set: e }), q(t);}, s(_A.prototype, "toString", function () {return this._k;}), P.f = J, S.f = K, r(49).f = k.f = $, r(31).f = Y, r(48).f = Z, o && !r(10) && s(U, "propertyIsEnumerable", Y, !0), d.f = function (t) {return q(p(t));}), a(a.G + a.W + a.F * !G, { Symbol: _A });for (var tt = "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","), et = 0; tt.length > et;) {p(tt[et++]);}for (var rt = E(p.store), nt = 0; rt.length > nt;) {g(rt[nt++]);}a(a.S + a.F * !G, "Symbol", { for: function _for(t) {return i(F, t += "") ? F[t] : F[t] = _A(t);}, keyFor: function keyFor(t) {if (!Q(t)) throw TypeError(t + " is not a symbol!");for (var e in F) {if (F[e] === t) return e;}}, useSetter: function useSetter() {W = !0;}, useSimple: function useSimple() {W = !1;} }), a(a.S + a.F * !G, "Object", { create: X, defineProperty: K, defineProperties: V, getOwnPropertyDescriptor: J, getOwnPropertyNames: $, getOwnPropertySymbols: Z }), I && a(a.S + a.F * (!G || c(function () {var t = _A();return "[null]" != R([t]) || "{}" != R({ a: t }) || "{}" != R(Object(t));})), "JSON", { stringify: function stringify(t) {for (var e, r, n = [t], i = 1; arguments.length > i;) {n.push(arguments[i++]);}if (r = e = n[1], (w(e) || void 0 !== t) && !Q(t)) return y(e) || (e = function e(t, _e2) {if ("function" == typeof r && (_e2 = r.call(this, t, _e2)), !Q(_e2)) return _e2;}), n[1] = e, R.apply(I, n);} }), _A.prototype[M] || r(4)(_A.prototype, M, _A.prototype.valueOf), f(_A, "Symbol"), f(Math, "Math", !0), f(n.JSON, "JSON", !0);}, function (t, e, r) {var n = r(18)("meta"),i = r(6),o = r(8),a = r(5).f,s = 0,u = Object.isExtensible || function () {return !0;},c = !r(16)(function () {return u(Object.preventExtensions({}));}),l = function l(t) {a(t, n, { value: { i: "O" + ++s, w: {} } });},f = function f(t, e) {if (!i(t)) return "symbol" == typeof t ? t : ("string" == typeof t ? "S" : "P") + t;if (!o(t, n)) {if (!u(t)) return "F";if (!e) return "E";l(t);}return t[n].i;},h = function h(t, e) {if (!o(t, n)) {if (!u(t)) return !0;if (!e) return !1;l(t);}return t[n].w;},p = function p(t) {return c && d.NEED && u(t) && !o(t, n) && l(t), t;},d = t.exports = { KEY: n, NEED: !1, fastKey: f, getWeak: h, onFreeze: p };}, function (t, e, r) {var n = r(24),i = r(48),o = r(31);t.exports = function (t) {var e = n(t),r = i.f;if (r) for (var a, s = r(t), u = o.f, c = 0; s.length > c;) {u.call(t, a = s[c++]) && e.push(a);}return e;};}, function (t, e, r) {var n = r(13);t.exports = Array.isArray || function (t) {return "Array" == n(t);};}, function (t, e, r) {var n = r(9),i = r(49).f,o = {}.toString,a = "object" == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [],s = function s(t) {try {return i(t);} catch (t) {return a.slice();}};t.exports.f = function (t) {return a && "[object Window]" == o.call(t) ? s(t) : i(n(t));};}, function (t, e, r) {var n = r(31),i = r(17),o = r(9),a = r(23),s = r(8),u = r(36),c = Object.getOwnPropertyDescriptor;e.f = r(7) ? c : function (t, e) {if (t = o(t), e = a(e, !0), u) try {return c(t, e);} catch (t) {}if (s(t, e)) return i(!n.f.call(t, e), t[e]);};}, function (t, e, r) {r(30)("asyncIterator");}, function (t, e, r) {r(30)("observable");}, function (t, e, r) {"use strict";var n = window.URL || window.webkitURL;t.exports = function (t, e) {try {try {var r;try {var i = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;r = new i(), r.append(t), r = r.getBlob();} catch (e) {r = new Blob([t]);}return new Worker(n.createObjectURL(r));} catch (e) {return new Worker("data:application/javascript," + encodeURIComponent(t));}} catch (t) {if (!e) throw Error("Inline worker is not supported");return new Worker(e);}};}, function (t, e, r) {"use strict";function n(t) {if (t) return new Promise(function (e, r) {if ("data" == t.slice(0, 4)) {var n = new Image();return n.onload = function () {e(n);}, n.onerror = function () {r("Image load error");}, void (n.src = t);}var i = new Image();i.setAttribute("crossOrigin", "Anonymous"), i.onload = function () {e(i);}, i.onerror = function () {r("Image load error");}, i.src = t;});}e.a = n;}, function (t, e, r) {"use strict";function n(t, e) {return new Promise(function (e, r) {var n = new XMLHttpRequest();n.responseType = "blob", n.onload = function () {var t = new FileReader();t.onloadend = function () {e(t.result);}, t.readAsArrayBuffer(n.response);}, n.open("GET", t), n.send();});}e.a = n;}, function (t, e, r) {"use strict";var n = function n() {var t = this,e = t.$createElement,r = t._self._c || e;return t.bindElement ? r("img", t._b({ staticStyle: { display: "inline-block" } }, "img", { id: t.uuid }, !1)) : t._e();},i = [],o = { render: n, staticRenderFns: i };e.a = o;}]);});

/***/ }),

/***/ 24:
/*!******************************************************************!*\
  !*** /Users/zhangyunfei/Work/code/chat/pages/api/contactsapi.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  contactList: function contactList(data) {
    var list = [{}];
    for (var i = 0; i < 26; i++) {
      list[i] = {};
      list[i].index = String.fromCharCode(65 + i);
      list[i].friends = [{ id: i, name: '昵称' + i, avatar: '/static/icon/avatar.png' }];
    }
    data.count = 26;
    data.list = list;
  } };exports.default = _default;

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
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

/***/ 32:
/*!******************************************************************!*\
  !*** /Users/zhangyunfei/Work/code/chat/pages/api/discoverapi.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default =
{
  discoverList: function discoverList(data) {
    var discoverList = [];
    for (var i = 1; i <= 20; i++) {
      discoverList.push({ id: i, name: '昵称' + i, avatar: '/static/icon/avatar.png',
        msg: '最后一条消息最后一条消息最后一条消息最后一条消息最后一条消息最后一条消息最后一条消息最后一条消息最后一条消息最后一条消息最后一条消息', time: this.timeToString('2020/09/20 16:05') });
    }

    data.list = discoverList;
  },

  timeToString: function timeToString(time) {
    var currentTime = Date.parse(new Date());
    var dateTime = time; //后台传递来的时间
    var d_day = Date.parse(new Date(dateTime));
    var day = Math.abs(parseInt((d_day - currentTime) / 1000 / 3600 / 24)); //计算日期
    var hour = Math.abs(parseInt((d_day - currentTime) / 1000 / 3600)); //计算小时
    var minutes = Math.abs(parseInt((d_day - currentTime) / 1000 / 60)); //计算分钟
    var seconds = Math.abs(parseInt((d_day - currentTime) / 1000)); //计算秒
    if (day >= 2) {
      return day + "天前";
    } else if (day > 0 && day < 2) {
      return "昨天";
    } else if (hour > 0 && hour < 24) {
      return hour + "小时前";
    } else if (minutes > 0 && minutes < 60) {
      return minutes + "分钟前";
    } else if (seconds > 0 && seconds < 60) {
      return '刚刚';
    }
  } };exports.default = _default;

/***/ }),

/***/ 4:
/*!****************************************************!*\
  !*** /Users/zhangyunfei/Work/code/chat/pages.json ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 40:
/*!*****************************************************************!*\
  !*** /Users/zhangyunfei/Work/code/chat/pages/api/profileapi.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default =
{
  init: function init(data) {
    data.id = 1;
    data.name = '我的昵称';
    data.note = '账号：未设置';
    data.avatar = '/static/icon/avatar.png';
  } };exports.default = _default;

/***/ }),

/***/ 53:
/*!******************************************************************!*\
  !*** /Users/zhangyunfei/Work/code/chat/pages/api/chatroomapi.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  chatroominit: function chatroominit(data) {
    var id = data.id;
    data.name = "昵称后台获取";
    data.isGroup = id % 4 == 0;
    data.isGroupOwner = id % 8 == 0;
    var msgList = [];
    var lastShowTime = 0;
    for (var i = 1; i <= 20; i++) {
      var message = {
        type: i % 3, // 0 text 1 forbidden 2 packet 3 image 4 sound 5 time 6 system
        senderAvatar: '/static/icon/avatar.png',
        id: i,
        sendderId: i,
        content: '测试测试测试测试',
        isSelf: i % 2 === 0 };

      var time = new Date('2020/09/20 18:20').getTime();
      if (lastShowTime + 5 * 60 * 1000 < time) {
        msgList.push({
          type: 5,
          content: this.timeToString(time),
          id: 't' + i });

        lastShowTime = time;
      }
      msgList.push(message);
    }
    data.lastShowTime = lastShowTime;
    data.msgList = msgList;
  },
  sendMessage: function sendMessage(data) {
    if (data.sendMsg) {
      var msg = data.sendMsg;
      if (data.socketOpen) {
        uni.sendSocketMessage({
          data: { fromid: 1, toid: data.id, message: msg } });

      } else {
        // socketMsgQueue.push(msg);
      }
      var id = data.maxID++;
      var message = {
        type: 0,
        senderAvatar: '/static/icon/avatar.png',
        id: id,
        sendderId: id,
        content: msg,
        time: new Date().toDateString(),
        isSelf: true };

      var time = new Date().getTime();
      if (data.lastShowTime + 5 * 60 * 1000 < time) {
        data.msgList.push({
          type: 5,
          content: this.timeToString(time),
          id: 't' + id });

        data.lastShowTime = time;
      }
      data.msgList.push(message);
      data.sendMsg = '';
      data.sendText = false;
    }
  },
  timeToString: function timeToString(time) {
    var now = new Date();
    var dateTime = new Date(time);

    var hour = dateTime.getHours();
    var minute = dateTime.getMinutes();
    var timeStr = '';
    if (hour < 5) {
      timeStr = '凌晨' + hour + ':' + minute;
    } else if (hour >= 5 && hour < 12) {
      timeStr = '上午' + hour + ':' + minute;
    } else if (hour === 12) {
      timeStr = '中午' + hour + ':' + minute;
    } else if (hour > 12 && hour < 19) {
      timeStr = '下午' + (hour - 12) + ':' + minute;
    } else if (hour >= 19 && hour < 24) {
      timeStr = '晚上' + (hour - 12) + ':' + minute;
    }
    if (now.toDateString() === dateTime.toDateString()) {
      return timeStr;
    }

    var yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    if (yesterday.toDateString() === dateTime.toDateString()) {
      return '昨天' + timeStr;
    }

    var nowWeekDay = now.getDay();
    var today = new Date(now.toLocaleDateString()).getTime();
    if (nowWeekDay == 0) nowWeekDay = 7;
    if (today - (nowWeekDay - 1) * 24 * 60 * 60 * 1000 < dateTime.getTime()) {
      var weekStr = ['日', '一', '二', '三', '四', '五', '六'];
      return '周' + weekStr[dateTime.getDay()] + timeStr;
    }

    var year = dateTime.getFullYear();
    var nowYear = now.getFullYear();
    var dayNo = dateTime.getDate();
    var month = dateTime.getMonth() + 1;

    if (nowYear != year) {
      return year + '年' + '' + month + '月' + dayNo + '日' + timeStr;
    } else {
      return month + '月' + dayNo + '日' + timeStr;
    }
  } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 54:
/*!*************************************************************!*\
  !*** /Users/zhangyunfei/Work/code/chat/pages/api/common.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  BackPage: function BackPage() {
    if (getCurrentPages().length < 2 && 'undefined' !== typeof __wxConfig) {
      var url = '/' + __wxConfig.pages[0];
      return uni.redirectTo({ url: url });
    }
    uni.navigateBack({
      delta: 1 });

  } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 63:
/*!*********************************************************************!*\
  !*** /Users/zhangyunfei/Work/code/chat/pages/api/chatsettingapi.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default =
{
  init: function init(data) {
    var id = data.id;
    data.isForbidden = id;
    data.isGroup = id % 4 == 0;
    data.isGroupOwner = id % 8 == 0;
    data.name = '群聊名称后台获取';
    var memberList = [];
    for (var i = 1; i <= 20; i++) {
      memberList.push({ id: i, name: '昵称' + i, avatar: '/static/icon/avatar.png' });
    }
    data.memberList = memberList;
  },
  changeForbidden: function changeForbidden(id, isForbidden) {
    console.log("set " + id + " forbidden " + isForbidden);
  },
  changeGroupName: function changeGroupName(data, name) {
    console.log("set " + data.id + " name " + name);
    data.name = name;
  },
  disbanded: function disbanded(id) {
    console.log("disbanded " + id);
    uni.navigateTo({
      url: '/pages/chat/chat.vue' });

  },
  leave: function leave(id) {
    console.log("leave " + id);
    uni.navigateTo({
      url: '/pages/chat/chat.vue' });

  } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 72:
/*!*****************************************************************!*\
  !*** /Users/zhangyunfei/Work/code/chat/pages/api/requestapi.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default =
{
  search: function search(data) {
    var keyword = data.keyword;
    console.log(keyword);
    var result = [];
    for (var i = 1; i <= 10; i++) {
      result.push({ id: i, name: '昵称' + i, avatar: '/static/icon/avatar.png', status: i % 3 });
    }

    data.list = result;
  },
  request: function request(id) {
    console.log("request" + id);
  } };exports.default = _default;

/***/ }),

/***/ 81:
/*!******************************************************************!*\
  !*** /Users/zhangyunfei/Work/code/chat/pages/api/newGroupapi.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  init: function init(data) {
    var invite = false;
    if (data.id > 0)
    invite = true;
    var list = [{}];
    for (var i = 0; i < 26; i++) {
      list[i] = {};
      list[i].index = String.fromCharCode(65 + i);
      list[i].friends = [{ id: i, name: '昵称' + i, avatar: '/static/icon/avatar.png', checked: false, inGroup: invite && i % 6 == 0 }];
    }
    data.list = list;
  },
  create: function create(selectedList) {
    var groupid = 1;
    console.log(selectedList);
    uni.navigateTo({
      url: '/pages/chat/chatroom?id=' + groupid });

  } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 90:
/*!**************************************************************!*\
  !*** /Users/zhangyunfei/Work/code/chat/pages/api/postapi.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default =
{
  post: function post(content) {
    console.log('POST ' + content);
  } };exports.default = _default;

/***/ }),

/***/ 97:
/*!*********************************************************************!*\
  !*** /Users/zhangyunfei/Work/code/chat/pages/api/requestListapi.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default =
{
  requestList: function requestList(data) {
    var requestList = [];
    for (var i = 1; i <= 3; i++) {
      requestList.push({ id: i, name: '昵称' + i, avatar: '/static/icon/avatar.png', msg: '我是' + '昵称' + i, status: i % 3 });
    }

    data.list = requestList;
  },
  accept: function accept(request) {
    console.log("accept" + request.id);
    request.status = 1;
  },
  reject: function reject(request) {
    console.log("reject" + request.id);
    request.status = 2;
  } };exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map