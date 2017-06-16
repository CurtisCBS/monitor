(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.jstracker = factory());
}(this, (function () { 'use strict';

/**
 * debounce
 *
 * @param {Function} func 实际要执行的函数
 * @param {Number} delay 延迟时间，单位是 ms
 *
 * @return {Function}
 */
function debounce(func, delay) {
  var timer;

  return function() {
    var context = this;
    var args = arguments;

    clearTimeout(timer);

    timer = setTimeout(function() {
      func.apply(context, args);
    }, delay);
  }
}

/**
 * merge
 *
 * @param  {Object} src
 * @param  {Object} dest
 * @return {Object}
 */
function merge(src, dest) {
  for (var item in src) {
    dest[item] = src[item];
  }

  return dest
}

/**
 * 是否是函数
 *
 * @param  {Any} func 判断对象
 * @return {Boolean}
 */
function isFunction(func) {
  return Object.prototype.toString.call(func) === '[object Function]'
}

/**
 * 将类数组转化成数组
 *
 * @param  {Object} arrayLike 类数组对象
 * @return {Array} 转化后的数组
 */
function arrayFrom(arrayLike) {
  return [].slice.call(arrayLike)
}

var tryJS = {};

var config$1 = {
  handleCatchError: function() {}
};

function setting(opts) {
  merge(opts, config$1);
}

/**
 * 将函数使用 try..catch 包装
 *
 * @param  {Function} func 需要进行包装的函数
 * @return {Function} 包装后的函数
 */
function tryify(func) {
  return function() {
    try {
      return func.apply(this, arguments)
    } catch (error) {
      config$1.handleCatchError(error);

      throw error
    }
  }
}

/**
 * 只对函数参数进行包装
 *
 * @param  {Function} func 需要进行包装的函数
 * @return {Function}
 */
function tryifyArgs(func) {
  return function() {
    var args = arrayFrom(arguments).map(function(arg) {
      return isFunction(arg) ? tryify(arg) : arg
    });

    return func.apply(this, args)
  }
}

tryJS.wrapFunction = function(func) {
  return isFunction(func) ? tryify(func) : func
};

tryJS.wrapArgs = tryifyArgs;

var monitor = {};
monitor.tryJS = tryJS;

// 错误日志列表
var errorList = [];
// 错误处理回调
var report = function() {};

var config = {
  delay: 2000, // 错误处理间隔时间
  maxError: 16, // 异常报错数量限制
  sampling: 1, // 采样率
  report: function(errorList) {
    console.table(errorList);
  }
};

monitor.config = function(opts) {
  merge(opts, config);

  setting({
    handleCatchError: config.handleCatchError
  });

  report = debounce(config.report, config.delay);
};

// 定义的错误类型码
var ERROR_RUNTIME = 1;
var ERROR_SCRIPT = 2;
var ERROR_STYLE = 3;
var ERROR_IMAGE = 4;
var ERROR_AUDIO = 5;
var ERROR_VIDEO = 6;
var ERROR_CONSOLE = 7;

var LOAD_ERROR_TYPE = {
  SCRIPT: ERROR_SCRIPT,
  LINK: ERROR_STYLE,
  IMG: ERROR_IMAGE,
  AUDIO: ERROR_AUDIO,
  VIDEO: ERROR_VIDEO
};

// 监听 JavaScript 报错异常(JavaScript runtime error)
window.onerror = function() {
  handleError(formatRuntimerError.apply(null, arguments));
};

// 监听资源加载错误(JavaScript Scource failed to load)
window.addEventListener('error', function(event) {
  // 过滤 target 为 window 的异常，避免与上面的 onerror 重复
  var errorTarget = event.target;
  if (errorTarget !== window && errorTarget.nodeName && LOAD_ERROR_TYPE[errorTarget.nodeName.toUpperCase()]) {
    handleError(formatLoadError(errorTarget));
  }
}, true);

// 针对 vue 报错重写 console.error
// TODO
console.error = (function(origin) {
  return function(info) {
    var errorLog = {
      type: ERROR_CONSOLE,
      desc: info
    };

    handleError(errorLog);
    origin.call(console, info);
  }
})(console.error);

/**
 * 生成 runtime 错误日志
 *
 * @param  {String} message 错误信息
 * @param  {String} source  发生错误的脚本 URL
 * @param  {Number} lineno  发生错误的行号
 * @param  {Number} colno   发生错误的列号
 * @param  {Object} error   error 对象
 * @return {Object}
 */
function formatRuntimerError(message, source, lineno, colno, error) {
  return {
    type: ERROR_RUNTIME,
    desc: message + ' at ' + source + ':' + lineno + ':' + colno,
    stack: error && error.stack ? error.stack : 'no stack'
  }
}

/**
 * 生成 laod 错误日志
 *
 * @param  {Object} errorTarget
 * @return {Object}
 */
function formatLoadError(errorTarget) {
  return {
    type: LOAD_ERROR_TYPE[errorTarget.nodeName.toUpperCase()],
    desc: errorTarget.baseURI + '@' + (errorTarget.src || errorTarget.href),
    stack: 'no stack'
  }
}

/**
 * 错误数据预处理
 *
 * @param  {Object} errorLog    错误日志
 */
function handleError(errorLog) {
  pushError(errorLog);
  report(errorList);
}

/**
 * 往异常信息数组里面添加一条记录
 *
 * @param  {Object} errorLog 错误日志
 */
function pushError(errorLog) {
  if (needReport(config.sampling) && errorList.length < config.maxError) {
    errorList.push(errorLog);
  }
}

/**
 * 设置一个采样率，决定是否上报
 *
 * @param  {Number} sampling 0 - 1
 * @return {Boolean}
 */
function needReport(sampling) {
  return Math.random() < (sampling || 1)
}

return monitor;

})));
