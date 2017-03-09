# web页面js异常捕获

原文地址: [https://github.com/CurtisCBS/monitor](https://github.com/CurtisCBS/monitor) 欢迎star
## 简介
通过对error的监听，获取异常的相关信息并添加这些信息到异常信息数组，在达到上限或者一定时间之后做处理(返回服务端保存数据之类)

## 功能

捕获页面js异常报错,捕获异常类型包含:

	1.js runtime异常捕捉 √
	2.静态资源load faided异常捕捉 √
	3.console.error的异常捕获

	4.记录静态资源加载时长


## 实现概述
接上述

1.通过对window.onerror进行监听，捕获js的运行时异常，记录错误
event+错误来源(source)+错误行数+错误列数等数据

2.通过对window.addEventListener监听error事件类型，获取静态资源报错，资源类型包含js文件，css文件，图片，视频，音频。

3.主要针对vue的异常捕获，重写了console.error事件，在捕获异常先记错误录信息的描述，再next到console.error的native code函数

## 后续功能

通过对性能记录，获取web的性能数据，并做处理。

性能数据包含:

	1.记录pv和uv
	2.记录页面加载时长
## 兼容性
performance接口的兼容性 (看到nosupport绝望，iOS不可用！)

Chrome |	Edge | Firefox (Gecko) | Internet Explorer | Opera | Safari (WebKit)
---|---|---|---|---|---|------
43.0|yes|41|10|33|No support