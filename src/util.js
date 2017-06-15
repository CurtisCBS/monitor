/**
 * debounce
 *
 * @param func {Function} 实际要执行的函数
 * @param delay {Number} 延迟时间，单位是 ms
 *
 * @return {Function}
 */
export function debounce(func, delay) {
  var timer

  return function() {
    var context = this
    var args = arguments

    clearTimeout(timer)

    timer = setTimeout(function() {
      func.apply(context, args)
    }, delay)
  }
}

/**
 * merge
 *
 * @param  {Object} src
 * @param  {Object} dest
 * @return {Object}
 */
export function merge(src, dest) {
  for (var item in src) {
    dest[item] = src[item]
  }

  return dest
}

/**
 * 是否是函数
 *
 * @param  {Any}  func 判断对象
 * @return {Boolean}
 */
export function isFunction(func) {
  return Object.prototype.toString.call(func) === '[object Function]'
}

/**
 * 将类数组转化成数组
 *
 * @param  {Object} arrayLike 类数组对象
 * @return {Array} 转化后的数组
 */
export function arrayFrom(arrayLike) {
  return [].slice.call(arrayLike)
}
