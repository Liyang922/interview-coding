// push(element0, element1, /* … ,*/ elementN)
// 返回新length

Array.prototype.push = function(...items) {
    if(this == undefined) {
        throw new TypeError("this is null or not undefined");
    }

    let O = Object(this);
    const len = O.length >>> 0;
    const itemLen = items.length;
    const newLength = len + itemLen;
    
    // 判断新数组长度是否超过最大值
    if(newLength > 2**53 - 1) {
        throw new TypeError("The new length of array is over the max value.");
    }
    // 对原数组进行修改
    for (let i = 0; i < itemLen; i++) {
        O[len + i] = items[i];
        // console.log( O[len + i]);
    }
    O.length = newLength;
    return newLength;
}



let a = [1,2,3];
a.push(5,6)
console.log(a);