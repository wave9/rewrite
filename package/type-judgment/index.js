let _w = exports;

/**
 * 通过调用toString来获取对象的类型
 * @param obj
 * @returns { string }
 */
_w.type = function (obj) {
    return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
};

/**
 * 判断数组
 * @param obj
 * @returns { Boolean }
 */
_w.isArray = function (obj) {
    if(Array.isArray){
        return Array.isArray(obj);
    }else{
        return _w.type(obj) === "array";
    }
};