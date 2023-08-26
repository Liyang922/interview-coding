// 非数字型字符转为数字为NaN
// NaN也是number类型，只能用isNaN()判断
// isNaN是全局对象（js标准内置对象）的属性，因此可以直接调用
    // 它不是number实例的方法,而是global作用域里的内置方法,所以不是number.isNaN()
function containsNumber(str) {
    return str.split("").some(item => 
        typeof(+item) === "number" && isNaN(+item) == false
    );
}

console.log(containsNumber("slt"));