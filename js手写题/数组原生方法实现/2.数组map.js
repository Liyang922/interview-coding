// var new_array = arr.map(function callback(currentValue[, index[, array]]) {
//     Return element for new_array 
//    }[, thisArg])

Array.prototype.map = function(callback, thisArg) {
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
    // 创建与原数组相同长度的数组
    let res = new Array(len);
    // 遍历数组元素
    for (let i = 0; i < len; i++) {
        // 跳过空值
        if(i in O) {
            res[i] = callback.call(thisArg, O[i], i, O);
        }        
    }
    return res;
}

console.log(null == undefined) //true

let a = [1,2];
a.map(item => item**2);
console.log(a);