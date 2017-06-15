import {
  arrayFrom,
  isFunction,
  merge
} from './util'

var tryJS = {}

var config = {
  handleError: function(error) {
    console.log(error)
  }
}

tryJS.config = function(opts) {
  merge(opts, config)
}

/**
 * 将函数使用 try catch 包装
 *
 * @param  {Function} func 需要进行包装的函数
 * @return {Function} 包装后的函数
 */
function tryify(func) {
  return function() {
    try {
      return func.apply(this, arguments)
    } catch (error) {
      config.handleError(error)

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
    })

    return func.apply(this, args)
  }
}

tryJS.wrapFunction = function(func) {
  if (!isFunction(func)) return func

  return tryify(func)
}

tryJS.wrapArgs = tryifyArgs

export default tryJS
