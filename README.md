---
title: 重新实现一些经典的方法
date: 2018-09-02 21:13:24
tags: ['JS']
categories: ['JS'] 
---

重写一些方法

新开了个github,之前的被我用成代码网盘了(囧)。。。

## 项目的初衷

在平时的编码中常常会遇到一些经典的实现，有些是经典的实现方法，有些是框架或代码的核心功能模块等等，这些都是前端进阶路上所需要掌握的地方。

## 如何使用

clone本项目到本地

` git clone https://github.com/wave9/rewrite.git `

安装项目依赖，webpack用的4.x

`npm i`

目前只支持热加载，可以用参数的形式打包自己想要运行的模块

例如这里我们想要尝试`virtual dom`

我们可以这样做

`npm run dev -- virtual-dom`

之后浏览器访问`localhost:10023	`就可以了

## 预期及进展

### 1. JS基础部分

- [x] 数组去重
- [ ] 节流
- [ ] 防抖
- [x] 类型判断

### 2. 框架部分

- [ ] virtual dom与diff实现
- [ ] JSX实现
- [ ] 组件和生命周期
- [ ] 异步setState