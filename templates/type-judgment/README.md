---
title: 类型判断
date: 2018-09-03 23:18:37
tags: ['JS']
categories: ['JS']
---

首先我们要知道的是，ES6之前，JS中的数据类型包括

`Undefined`,`String`,`Number`,`Null`,`Boolean`以及`object`,ES6新增了`Symbol`

对这几种数据类型，`typeof`的结果分别为：

`undefined`,`string`,`number`,`object`,`boolean`,`object`,此外typeof对于引用类型的判断也都是`object`,这导致`typeof`操作符并不能很好的区分各项数据类型

![图片来源于MDN](https://wave-1253805456.cos.ap-chengdu.myqcloud.com/WaveBlog/wave9-rewrite/1536025292807.png)

这里提一点里面提到的宿主对象，宿主对象指的是 `BOM` 和 `DOM` 这种浏览器提供的对象

只用 `typeof` 的话会有很多的问题，例如：

1. 我们想要知道我们的这个对象是不是数组
2. 怎么区分 `null`  和其它对象，毕竟 `null` 也被判断成了 `"object"`

那么我们可以通过 `Object.prototype.toString.call(obj)` 来获取我们想要知道的对象的类型

通过这种可以判断的类型有

1. `String`
2. `Boolean`
3. `Undefined`
4. `Null`
5. `Number`
6. `Object`
7. `Array`
8. `Function`
9. `Arguments`
10. `Date`
11. `Error`
12. `RegExp`
13. `Math`
14. `JSON`

但是还有一个 IE6 下的问题，他会将 `null` 和 `undefined` 都判断为 `[object Object]`，这个问题在当前浏览器兼容环境下就不探讨了吧

那最后还有一个老生常谈的问题 `如何判断一个对象是否是数组?`

我们可以通过 `Array.isArray()` 来判断是否为数组，如果要兼容低版本IE的话，还是通过 `Object.prototype.toString()` 来判断就可以了