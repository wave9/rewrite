let _w = exports;

/**
 * 通过调用toString来获取对象的类型
 * @param obj
 * @returns { string }
 */
_w.type = function (obj) {
    return Object.prototype.toString.call(obj).slice(8, -1);
};