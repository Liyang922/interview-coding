// reduce(function(previousValue, currentValue, currentIndex, array) { /* … */ }, initialValue)
Array.prototype.reduce = function(callback, init) {
    // 判断this是否存在
    if(this == undefined) {
        throw TypeError("this is null or not undefined");
    }
    // 判断callback是否为函数
    if(! typeof callback == "function") {
        throw TypeError(callback + "is not a function");
    }

    const O = Object(this);
    const len = O.length >>> 0;
    
    let accumulator = init;
    let k = 0;
    // 如果没有传入init，则遍历数组获得初始值
    if(accumulator == undefined) {
        while(k < len && !(k in O)) {
            k++;
        }
        // 如果没有找到有效值，则抛出错误
        if(k == len) {
            throw new TypeError("Reduce of empty array with no initial value.");
        }
        accumulator = O[k];
    }
    // 从k+1位，遍历数组元素
    for (let i = k + 1; i < len; i++) {
        // 跳过空值
        if(i in O) {
            accumulator = callback.call(undefined, accumulator, O[i], i, O);
        }        
    }
    return accumulator;
}