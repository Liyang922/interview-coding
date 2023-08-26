// filter(function(element, index, array) { /* … */ }, thisArg)
Array.prototype.filter = function(callback, thisArg) {
    if(this == undefined) {
        throw new TypeError("this is null or not undefined");        
    }
    if(!typeof callback === "function") {
        throw new TypeError(callback + "is not a function");
    }
    const res = [];
    // 转换对象，方便操作
    const O = Object(this);
    const len = O.length >>> 0; //无符号右移。类型转换+变为非负数。取整。
    for(let i = 0; i < len; i++) {
        // 排除空值
        if(i in O) {
            // call的context参数，如果没有，非严格模式下-全局对象，严格-undefined
            if(callback.call(thisArg, O[i], i, O)) {
                res.push(O[i]);
            }
        }
    }
    return res;
}


let a = [,,,"a"];
let len = 4;
while(len--) {
    if(len in a) {
        console.log(a[len]) // "a"
    }
}