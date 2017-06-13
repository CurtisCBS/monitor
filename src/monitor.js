//相关api文档入口: https://developer.mozilla.org/en/docs/Web/API/GlobalEventHandlers/onerror

(function() {
  // 异常
  // 1 runtime异常捕捉 √
  // 2 load faided异常捕捉 √
  // 3 xmlhttprequest异常捕捉

  // 常规
  // 1.pv & uv
  // 2.资源加载时长
  // 3.请求加载时长

  //定义的错误类型码
  var ERROR_RUNTIME = 1,
    ERROR_SCRIPT = 2,
    ERROR_STYLE = 3,
    ERROR_IMAGE = 4,
    ERROR_AUDIO = 5,
    ERROR_VIDEO = 6,
    ERROR_CONSOLE = 7,
    MAX_ERR_NUM = 120, //一个页面最大异常报错数量限制
    errorNum = 0, // 异常数量
    timer = null, //定时器，防止短时间内重复请求
    delay = 1000, //两次error间隔在3000ms内不重复请求错误
    errorList = [] //存储错误日志的数组


  /**
   *针对vue报错使用的是error。重写的方法
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
   *监听js报错异常(JavaScript runtime error)
   */
  window.onerror = function(messageOrEvent, source, lineno, colno, error) {
    clearTimer()
    var error = createRuntimerError(messageOrEvent, source, lineno, colno, error)
    pushError(error)
    setTimer(handler)
  }

  /**
   *监听资源加载错误(JavaScript Scource failed to load)
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
    if (err.target !== window) { //过滤window的异常,避免与上面的onerror重复
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
   *清除定时器
   */
  function clearTimer() {
    clearTimeout(timer)
  }

  /**
   *设置定时器
   */
  function setTimer(callback) {
    timer = setTimeout(function() {
      callback && callback()
    }, delay)
  }

  /**
   *记录成功后的操作，自定义
   */
  function handler() {
    console.table(errorList)
    console.log('发送请求')
  }

  /**
   *往‘异常信息’数组里面添加一条记录
   */
  function pushError(err) {
    if (errorNum < MAX_ERR_NUM) {
      errorList.push(err)
      errorNum++
    }
  }

  // des :"", //错误描述
  // type:"", //错误类型
  function LogMessage(type, des) {
    this.type = type
    this.des = des
  }

  function createRuntimerError(messageOrEvent, source, lineno, colno, error) {
    return {
      type: ERROR_RUNTIME,
      des: messageOrEvent + ' at ' + source + ':' + lineno + ':' + colno
    }
  }


  if (window.performance) {
    var sources = window.performance.getEntries(),
      entries
    entries = sources.map(function(entry) {
      return {
        type: entry.initiatorType, //资源类型 ，字符串
        duration: entry.duration, //资源请求时间
        source: name, //资源名字
        startTime: entry.startTime, //资源请求开始时间
        endTime: connectEnd //资源请求结束时间
      }
    })

    // 自定义事件，保存数据到服务端
  }
}())
