---
title: 数组去重
date: 2018-09-05 22:57:05
tags: [JS, 数组操作]
categories: [JS]
---



## 1. 一般的数字和字符串去重

一般的数字去重，比如说`[1, '1', 2, 3, 4, 1, '1' -1]`去重，那么我们可以分ES6与ES5之前，还有ES3，首先是最简单的ES6去重，我们直接使用Set就可以了

### ES6

```javascript
// Set本身是一种无重复值的无序列表
// new Set(arr) 会返回一个数组中去除重复值之后的列表
let array = [1, '1', 2, 3, 4, 1, '1', -1];
const unique = (arr) => {
    return [...new Set(arr)];
}
unique(array);  // [1, '1', 2, 3, 4, -1]
```

### IE9

ES5的情况下，我们不能使用Set，但是我们可以使用indexOf来判断元素在数组中是否重复出现，从而来去重

```javascript
// indexOf会判断元素首先出现的位置，如果不存在，则返回-1
var array = [1, '1', 2, 3, 4, 1, '1', -1];
function unique(arr){
    var ret = [];
    for(var i = 0 ; i < arr.length; i++){
        if( arr.indexOf(arr[i]) ===  i){
            ret.push(arr[i]);
        }
    }
    return ret;
}

unique(array);  // [1, '1', 2, 3, 4, -1]
```

### ES3 

这种情况下，我们老老实实的使用两层循环来遍历吧

```javascript
var array = [1, '1', 2, 3, 4, 1, '1', -1];
function unique(arr){
    let ret = [];
    for(var i = 0 ; i < arr.length ; i++){
        var j = 0,
            retLen = ret.length;
        for(; j < retLen ; j++){
            if(arr[i] === ret[j]){
                break;
            }
        }
        if(j === retLen){
            ret.push(arr[i]);
        }
    }
    return ret;
}
unique(array);  // [1, '1', 2, 3, 4, -1]
```

## 2. 如果要去重的数组里含有NaN？

NaN指的是Not-A-Number,我们用typeof操作符判断的结果是

```javascript
typeof NaN;  // "number"
```

我们用 `===`判断的话则会发现：

```javascript
NaN === NaN;  // false
```

这就意味着虽然`Set`可以起作用，但是我们的 `===`判断对于NaN不起作用了

那我们可以换一个思路，如果我们把要去重的元素作为对象的属性，那不也就意味着对象属性的不重复，也即是数组元素的不重复了吗？

```javascript
var array = [1, '1', 2, 3, 4, 1, '1', -1, NaN, NaN];

function unique(arr){
    var ret = [];
    var obj = {};
    for(var i = 0 ; i < arr.length ; i ++){
        if( !obj.hasOwnProperty(arr[i])){
            obj[arr[i]] = true;
            ret.push(arr[i]);
        }
    }    
    return ret;
}
unique(array);  // [ 1, 2, 3, 4, -1, NaN ]
```

我们发现NaN虽然被去重了，但是我们的`1`和`'1'`被当成相同的元素一起去重了，那么我们怎么来区分这两个元素呢？

我们可以加入`typeof`操作符, 因为 `typeof 1 === "number", typeof '1' === "string"`,我们的代码可以做如下修改

```javascript
var array = [1, '1', 2, 3, 4, 1, '1', -1, NaN, NaN];

function unique(arr){
    var ret = [];
    var obj = {};
    for(var i = 0 ; i < arr.length ; i ++){
        if( !obj.hasOwnProperty(typeof arr[i] + arr[i])) ){
            obj[typeof arr[i] + arr[i]] = true;
            ret.push(arr[i]);
        }
    }
    return ret;
}
unique(array);  // [ 1, '1', 2, 3, 4, -1, NaN ]
```

那么现在就解决了我们的问题

## 3. 如果我们要去重的元素中还含有对象呢？

我们用我们在上一步中写好的函数来判断这样两个数组

`[1, '1', 2, 3, 4, 1, '1', -1, NaN, NaN, { a : 1 }, { a : 1 }]`

`[1, '1', 2, 3, 4, 1, '1', -1, NaN, NaN, { a : 1 }, { b : 1 }]`

我们会发现最后对象的去重结果，都只剩 `{ a : 1 }`

这是为什么呢？因为我们在做属性判断的时候，`{ a : 1 }`自动转换成了 `[object Object]`

这就使得对象看起来都一样了，那我们可以这样做

```javascript
var array = [1, '1', 2, 3, 4, 1, '1', -1, NaN, NaN, {a: 1}, {b:2}, {b: 2}];

function unique(arr){
    var ret = [];
    var obj = {};
    for(var i = 0 ; i < arr.length ; i ++){
        if(typeof arr[i] === "object"){
            // 这里的正则是用于替换空格
            if( !obj.hasOwnProperty(JSON.stringify(arr[i]).replace(/(\s|[\\t])/g,''))){
                obj[JSON.stringify(arr[i]).replace(/(\s|[\\t])/g,'')] = true;
                ret.push(arr[i]);
            }
        }
        else{
            if( !obj.hasOwnProperty( typeof arr[i] + arr[i])) {
                obj[typeof arr[i] + arr[i]] = true;
                ret.push(arr[i]);
            }
        }
    }
    return ret;
}
unique(array);  // [ 1, '1', 2, 3, 4, -1, NaN, { a: 1 }, { b: 2 } ]
```

那么到这里数组去重就结束了