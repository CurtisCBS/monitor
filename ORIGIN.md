# JS 异常的防范与监控

## 三种思路

### 主动防御

对于我们操作的数据，通常是由 API 接口返回的，时常会有一个很复杂的深层嵌套的数据结构。

为了代码的健壮性，需要对每一层访问都作空值判断，就像这样：

```js
props.user &&
props.user.posts &&
props.user.posts[0] &&
props.user.posts[0].comments &&
props.user.posts[0].comments[0]
```

类似的代码大家可能都写过。看起来确实相当地不美观，有句话说得很棒：

**The opposite of beautiful is not ugly, but wrong.**

参考这篇文章：[Safely Accessing Deeply Nested Values In JavaScript](https://medium.com/javascript-inside/safely-accessing-deeply-nested-values-in-javascript-99bf72a0855a)

我们可以很简单使用一种更优雅、更安全的方式访问深层嵌套数据。

使用一个简单函数

```js
function getIn(p, o) {
    return p.reduce(function(xs, x) {
        return (xs && xs[x]) ? xs[x] : null;
    }, o);
}
```

接下来我们这样访问就可以了：

```js
getIn(['user', 'posts', 0, 'comments'], props)
```

如果正常访问到，则返回对应的值，否则返回 `null`。

### 全局监控

* 当 JavaScript 运行时错误（包括语法错误）发生时，会执行 `window.onerror()``
* 当一项资源（如 <img> 或 <script> ）加载失败，能被单一的 `window.addEventListener` 捕获

```javascript
/**
 * @param  {String} message 错误信息
 * @param  {String} source  发生错误的脚本URL
 * @param  {Number} lineno  发生错误的行号
 * @param  {Number} colno   发生错误的列号
 * @param  {Object} error   Error对象
 */
window.onerror = function(message, source, lineno, colno, error) {
  // ...
}
```

参考：https://developer.mozilla.org/zh-CN/docs/Web/API/GlobalEventHandlers/onerror

### 针对抓取try..catch


可以通过 try..catch 来主动抓取错误，想要对一段代码 try..catch，我们可以这样：

```javascript
try {
  // ...
} catch (error) {
  handler(error)
}
```

对一个函数做 try..catch 封装:

```javascript
function tryify(func) {
  return function() {
    try {
      return func.apply(this, arguments)
    } catch (error) {
      handleError(error)

      throw error
    }
  }
}
```

## 已有问题

### script error

当加载自不同域的脚本中发生语法错误时，为避免信息泄露，语法错误的细节将不会报告，而代之简单的 "Script error."

而在大多数情况下，我们的静态资源放在专门的 CDN 服务器上，跟站点并不在一个域，所以如果只是简单的抓取，只会得到一堆意义不大的 `script error`

解决方案：

* 添加 CORS 支持
* 使用 try..catch

#### 添加 CORS 支持

需要做两点：

在 script 便签添加 crossorigin，默认值 `crossorigin="anonymous"`

```html
<script src="//xxx.com/example.js" crossorigin></script>
```

同时在 CDN 服务器增加响应头 `access-control-allow-orgin`，配置允许访问 CORS 的域

#### try..catch

这一点上面也有提到，算是一种比较通用，可定制强的方案

### 错误定位
