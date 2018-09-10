---
title: 防抖
date: 2018-09-10 08:14:29
tags: [JS]
categories: [JS]
---

js 实现防抖

这次是将 `throttle`（节流） 和 `debounce` （防抖） 放在一起比较，简单说下个人所理解的这两者之间的区别：

#### 防抖

比如说我们在用户在用户每输入时发送一个用户所输入的姓名判断该用户输入的用户名是否存在

那么这个场景我们可以这样来处理，首先不能用户每输入一个字符就向后台发送请求，我们应该是在用户输入完一段字符串之后再向后台发送请求

那么这部分行为我们可以将其视为 **防抖 `debounce`** 处理

#### 节流

那么再考虑下一个场景，比如我们在滚动页面，计算页面中一个元素离顶部的距离，但是 `onscroll` 事件触发的实在是太频繁了，我们希望的是让我们的滚动事件最好能 100 ms 左右触发一次

那么这部分行为我们可以将其视为 **节流 `throttle` ** 处理

#### 简单版

我们设想一下这样一个场景，我们在用户输入时判断用户名是否存在，由于网络请求的代价很高，我们不希望用户的每一次输入都会产生一次网络请求，我们可以这样做

``` javascript
/**
 * 我们希望这个函数可以实现 { wait } 秒后执行一次 { fn }
 * @param fn 需要防抖的函数
 * @param wait 防抖时间
 */
export default function debounce(fn, wait) {
    let timer = null;  // 计时器

    function debounced() {
        clearTimeout(timer);
        timer = setTimeout(function () {
            fn();
        }, wait);
    }

    return debounced;
}
```

![](D:\wave9\rewrite\templates\debounce\README.assets\1.gif)

#### this

我们稍微再增加一下我们的需求：我希望我能拿到我想要的 this

可是我们如果在 `setTimeout` 中拿 `this` 拿到的结果为 `window` 对象， 但是我们可以在外层函数获取 this  然后让我们的函数绑定这个外层函数获取到的 this 

修正 this 绑定的第二版如下

``` javascript
/**
 * 我们希望这个函数可以实现 { wait } 秒后执行一次 { fn }
 * @param fn 需要防抖的函数
 * @param wait 防抖时间
 */
export default function debounce(fn, wait) {
    let timer = null;  // 计时器

    function debounced() {
        let content = this;  // 获取外层 this
        clearTimeout(timer);
        timer = setTimeout(function () {
            fn.apply(content);  // 绑定 this
        }, wait);
    }

    return debounced;
}
```

#### Event

有时候我们需要获取事件传入的 `Event` 对象，但是我们通过正常手段获取的结果是 `undefined`

这是我们需要纠正一下我们的参数传递

``` javascript
/**
 * 我们希望这个函数可以实现 { wait } 秒后执行一次 { fn }
 * @param fn 需要防抖的函数
 * @param wait 防抖时间
 */
export default function debounce(fn, wait) {
    let timer = null;  // 计时器

    function debounced() {
        let content = this;  // 获取外层 this
        let args = arguments;  // 获取 arguments
        clearTimeout(timer);

        timer = setTimeout(function () {
            fn.apply(content, args);  // 绑定 this 和 arguments
        }, wait);
    }

    return debounced;
}
```

![1536549021175](D:\wave9\rewrite\templates\debounce\README.assets\1536549021175.png)

偶然发现 `KeyboardEvent` 的继承链是：

`KeyboardEvent ----> UIEvent ----> Event ----> Object `

`MouseEvent` 的继承链是：

`KeyboardEvent ----> UIEvent ----> Event ----> Object`

#### 返回值

我们有时候还想获取我们函数的返回值

那我们再修改一下，代码如下

``` javascript
/**
 * 我们希望这个函数可以实现 { wait } 秒后执行一次 { fn }
 * @param fn 需要防抖的函数
 * @param wait 防抖时间
 */
export default function debounce(fn, wait) {
    let timer = null;  // 计时器
    let useFlag = true;

    function debounced() {
        let content = this;  // 获取外层 this
        let args = arguments;  // 获取 arguments
        let result = null;
        
        if(timer) clearTimeout(timer);
        if(useFlag){
            timer = setTimeout(function () {
                result = fn.apply(content, args);  // 绑定 this 和 arguments
            }, wait);
        }else{
            result = fn.apply(content, args);
        }
        return result;
    }
    // 取消防抖
    debounced.cancel = function () {
        useFlag = false;
    };
    return debounced;
}
```







