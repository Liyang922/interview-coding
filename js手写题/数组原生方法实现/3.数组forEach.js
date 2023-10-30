// forEach(function(element, index, array) { /* … */ }, thisArg)
Array.prototype.forEach = function(callback, thisArg) {
    // 判断this是否存在
    if(this == undefined) {
        throw new TypeError("this is null or not undefined");
    }
    // 判断callback是否为函数
    if(! typeof callback == "function") {
        throw new TypeError(callback + "is not a function");
    }
    // 将this转为对象变量
    const O = Object(this);
    // 对数组length进行合法化处理
    const len = O.length >>> 0;
    // 遍历数组元素
    for (let i = 0; i < len; i++) {
        // 跳过空值
        if(i in O) {
            callback.call(thisArg, O[i], i, O);
        }        
    }
}
