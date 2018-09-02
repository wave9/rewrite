let _w = exports;

/**
 * 判断对象的类型
 * @param obj
 */
_w.type = function (obj) {
    return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
};

/**
 * 判断对象是否是字符串
 * @param obj
 * @returns {boolean}
 */
_w.isString = function (obj) {
    return (_w.type(obj) === "string");
};

/**
 * 判断对象是否是数组
 * @param obj
 * @returns {*}
 */
_w.isArray = function (obj) {
    if(Array.isArray){
        return Array.isArray(obj);
    }else{
        return _w.type(obj) === "array";
    }
};

/**
 * 给节点设置属性和值
 * @param node
 * @param key { string }
 * @param value { string }
 */
_w.setAttr = function (node, key, value) {
    switch (key) {
        case 'style':
            node.style.cssText = value;
            break;

        case 'value':
            let tagName = (node.tagName || '').toLowerCase();
            if(tagName === 'input' || tagName === "textArea"){
                node.value = value;
            }else{
                node.setAttribute(key, value);
            }
            break;

        default:
            node.setAttribute(key, value);
            break;
    }
};

/**
 * 将类数组转换为数组
 * @param arrayLike
 */
_w.toArray = function (arrayLike) {
    if(Array.from){
        Array.from(arrayLike)
    }else{
        Array.prototype.slice.call(arrayLike);
    }
};

_w.isElementNode = function (node) {
    return node.nodeType === 1;
};