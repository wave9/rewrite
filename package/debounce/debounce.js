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
        if(timer){
            clearTimeout(timer);
        }

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