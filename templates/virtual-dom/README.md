---
title: virtual-dom && diff
date: 2018-09-04 11:07:04
tags: ['JS']
categories: ['JS']
---

该部分包括两方面内容， `virtual-dom` 和 `diff`

这篇文章需要解决如下几个问题：

1. 什么是 `virtual-dom` 
2. 为什么要使用 `virtual-dom` 和 `diff`
3. `diff` 算法是如何实现的
4. `diff` 算法的优缺点又体现在哪里



## 1. 什么是Virtual Dom

引用知乎上的回答（修改了部分内容）：

> 1. 首先 `Virtual DOM` 和 `DOM` 并没有什么关系
> 2. `Virtual DOM` 数据结构的表现形式为一棵二叉树
> 3. `Virtual DOM`的存在形式，是以 JS 中对象的形式存在
> 4. 从 UI 的对应角度上来看， `Virtual DOM` 对象的节点和 `DOM Tree` 每个位置上的属性是一一对应的
> 5. `dom = f(virtualDom)`

举个例子，比如说我们有这样一组DOM结构

```html
<ul id="content">
    <li class="type">content1</li>
    <li class="type">content1</li>
    <li class="type">content1</li>
    <li class="type">content1</li>
</ul>
```

我们可以用如下的对象形式来表示

``` javascript
let ul = {
    tagName: 'ul',
    attrs: {
        id: "content"
    },
    children: [
        { tagName: 'li', attrs: { class: "type" }, children: "content1" },
        { tagName: 'li', attrs: { class: "type" }, children: "content2" },
        { tagName: 'li', attrs: { class: "type" }, children: "content3" },
        { tagName: 'li', attrs: { class: "type" }, children: "content4" }
    ]
}
```

下面的 JS 对象就是我们的 `virtual-dom` ， 我们可以用它来反映我们的 `DOM` 结构

## 2. 为什么要使用 Virtual DOM 和 Diff

原因总结起来就两点：

1. JS 很快
2. DOM 操作很慢

![](D:\wave9\rewrite\templates\virtual-dom\README.assets\1536031389080.png)

这是一个普通的 div 标签，他的属性就已经非常多了（约是图中的三倍），那么操作一个 DOM 带来的结果就是要非常耗时的去操作这些无关属性，可能我们想改的只是把里面的某个 li 标签中文本从1更改到2，而可能要操作的时候用的是父级的 `innerHTMl` 来改变，那这就造成了很大的性能浪费。

那我们去尝试这样一种思路，我在直接 DOM 结构中间加上一层缓存操作，类似于操作内存之于操作硬盘，那么 `Virtual DOM` 就是一种很好的缓存结构

再说说 `Diff`

比如说我们有了如下的两组对象

``` js
// 比如说这是一次ajax请求拿到的数据
let ul_1 = {
    tagName: 'ul',
    attrs: {
        id: "content"
    },
    children: [
        { tagName: 'li', attrs: { class: "type" }, children: "content1" },
        { tagName: 'li', attrs: { class: "type" }, children: "content2" },
        { tagName: 'li', attrs: { class: "type" }, children: "content3" },
        { tagName: 'li', attrs: { class: "type" }, children: "content4" }
    ]
}

// 比如这是又一次ajax请求所拿到的数据
let ul_2 = {
    tagName: 'ul',
    attrs: {
        id: "content"
    },
    children: [
        { tagName: 'li', attrs: { class: "type" }, children: "content4" },
        { tagName: 'li', attrs: { class: "type" }, children: "content3" },
        { tagName: 'li', attrs: { class: "type" }, children: "content5" },
        { tagName: 'li', attrs: { class: "type" }, children: "content2" }
    ]
}
```

我们通过肉眼可以发现，上下两组数据，不同的地方只不过是子元素 li 的文本内容不太一样，然后在不用 `virtual-dom` 和 `diff`的情况下，我们通常做的事情可能是根据返回的内容销毁原 li 再创建新的 li，这样做不是说不可以，但是这样会存在一个很明显的性能问题，我们明明只需要更改子节点中文本内容就可以实现我们想要的结果，为什么还要大动干戈去操作一连串的 dom 呢？

那么 `virtual-dom` 和 `diff` 很好的帮我们解决了这个问题，我们通过 `diff` 对比两组数据中的不同之处并得到一个 patches, 然后我们再将 patches 反映到真实 dom 当中，那么这中间到底是怎样的一个过程呢？



## 3. Diff 算法是如何实现的

我们首先来思考一下，两组节点树之间的区别有哪些呢？

- 不同的节点,比如我们的节点从 `ul` 变成了 `ol`
- 相同的节点，但是节点的属性发生了变化，比如我们的 `class` 更改了
- 节点相同属性相同，节点的文本内容发生了变化，比如文本内容从 `conten1` 变成了 `content2`
- 节点的顺序发生了变化，比如子节点1 变动到了 3 的位置









## 参考链接

[如何理解虚拟DOM？ - 知乎](https://www.zhihu.com/question/29504639)

[Virtual Dom && Diff](https://my.oschina.net/qiangdada/blog/975591#h2_6)

[深度剖析：如何实现一个 Virtual DOM 算法](https://github.com/livoras/blog/issues/13)



