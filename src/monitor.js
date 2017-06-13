// 相关api文档入口: https://developer.mozilla.org/en/docs/Web/API/GlobalEventHandlers/onerror

(function() {
  // 异常
  // 1 runtime 异常捕捉 √
  // 2 load faided 异常捕捉 √
  // 3 xmlhttprequest 异常捕捉

  // 常规
  // 1.pv & uv
  // 2.资源加载时长
  // 3.请求加载时长

  // 定义的错误类型码
  var ERROR_RUNTIME = 1
  var ERROR_SCRIPT = 2
  var ERROR_STYLE = 3
  var ERROR_IMAGE = 4
  var ERROR_AUDIO = 5
  var ERROR_VIDEO = 6
  var ERROR_CONSOLE = 7
  var MAX_ERR_NUM = 16 // 一个页面最大异常报错数量限制

  var errorNum = 0 // 异常数量
  var timer = null // 定时器，防止短时间内重复请求
  var delay = 1000 // 两次error间隔在3000ms内不重复请求错误
  var errorList = [] // 存储错误日志的数组


  /**
   * 针对 vue 报错使用的是 error 重写的方法
   */
  console.error = (function(origin) {
    return function(errorlog) {
      clearTimer()
      pushError({
        type: ERROR_CONSOLE,
        des: errorlog
      })
      setTimer(handler)
      origin.call(console, errorlog)
    }
  })(console.error)

  /**
   * 监听js报错异常(JavaScript runtime error)
   */
  window.onerror = function(messageOrEvent, source, lineno, colno, error) {
    clearTimer()
    var errorMsg = createRuntimerError(messageOrEvent, source, lineno, colno, error)
    pushError(errorMsg)
    setTimer(handler)
  }

  /**
   * 监听资源加载错误(JavaScript Scource failed to load)
   */
  window.addEventListener('error', function(err) {
    // 过滤非资源加载的错误
    var ERR_TYPE = {
      'SCRIPT': ERROR_SCRIPT,
      'LINK': ERROR_STYLE,
      'IMG': ERROR_IMAGE,
      'AUDIO': ERROR_AUDIO,
      'VIDEO': ERROR_VIDEO
    }

    // 过滤 target 为 window 的异常,避免与上面的 onerror 重复
    if (err.target !== window) {
      clearTimer()
      var errNode = err.target.nodeName

      if (errNode && ERR_TYPE[errNode.toUpperCase()]) {
        var des = err.target.baseURI + '@' + (err.target.src || err.target.href)
        pushError({
          type: ERR_TYPE[errNode.toUpperCase()],
          des: des
        })
        setTimer(handler)
      }
    }

  }, true)

  /**
   * 清除定时器
   */
  function clearTimer() {
    clearTimeout(timer)
  }

  /**
   * 设置定时器
   */
  function setTimer(callback) {
    timer = setTimeout(function() {
      callback && callback()
    }, delay)
  }

  /**
   * 记录成功后的操作，自定义
   */
  function handler() {
    console.table(errorList)
    console.log('发送请求')
  }

  /**
   * 往异常信息数组里面添加一条记录
   */
  function pushError(err) {
    if (errorNum < MAX_ERR_NUM) {
      errorList.push(err)
      errorNum++
    }
  }

  /**
   * 生成 runtime 错误日志
   */
  function createRuntimerError(messageOrEvent, source, lineno, colno) {
    return {
      type: ERROR_RUNTIME,
      des: messageOrEvent + ' at ' + source + ':' + lineno + ':' + colno
    }
  }

}())
