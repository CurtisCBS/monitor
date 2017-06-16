# monitor: JavaScript 异常监控

## 简介

通过对 error 的监听，获取异常的相关信息并添加这些信息到异常信息数组，在达到上限或者一定时间之后做处理(返回服务端保存数据之类)

## 功能

捕获页面 JavaScript 异常报错，捕获异常类型包含:

1. JavaScript runtime 异常捕捉 √
2. 静态资源 load faided 异常捕捉 √
3. console.error 的异常捕获
4. 记录静态资源加载时长

## 实现概述

* 通过对 [`window.onerror`](https://developer.mozilla.org/en/docs/Web/API/GlobalEventHandlers/onerror) 进行监听，捕获 JavaScript 的运行时异常，记录错误：event + 错误来源(source) + 错误行数 + 错误列数等数据

* 通过对 `window.addEventListener` 监听 `error` 事件类型，获取静态资源报错，包含 JavaScript 文件，CSS 文件，图片，视频，音频。

* 主要针对vue的异常捕获，重写了 `console.error` 事件，在捕获异常先记录错误信息的描述，再 `next` 到原始的 `console.error`

## 使用指南

### script

```html
<script src="../dist/jstracker.js"></script>

<script>
  jstracker.config({
    report: function(data) {
      console.table(data)
      console.log('发送请求')
    }
  })
</script>
```

### ESM

1.安装

```sh
npm install jstracker --save-dev
```

2.在文件中添加

```javascript
import jstracker from 'jstracker'

jstracker.config({
  report: function(data) {
    console.table(data)
    console.log('发送请求')
  }
})
```

## 错误类型

```javascript
var ERROR_RUNTIME = 1
var ERROR_SCRIPT = 2
var ERROR_STYLE = 3
var ERROR_IMAGE = 4
var ERROR_AUDIO = 5
var ERROR_VIDEO = 6
var ERROR_CONSOLE = 7
```

## 后续功能

记录性能数据，包含:

* 记录 pv 和 uv
* 记录页面加载时长

performance api 兼容性情况 (看到 no support 绝望，iOS不可用！)

| Chrome | Edge | Firefox (Gecko) | Internet Explorer | Opera | Safari (WebKit) |
| ------ | ---- | --------------- | ----------------- | ----- | --------------- |
| 43.0   | yes  | 41              | 10                | 33    | No support      |
