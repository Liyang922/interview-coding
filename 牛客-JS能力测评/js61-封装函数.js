function partialUsingArguments(fn) {
    let [func, ...args] = [...arguments];
    // bug：function result(arguments)
    // arguments就成了传给函数的第一个参数值，而不是函数本来的内置对象了
    return function result() {
        args = args.concat([...arguments]);
        return func(...args);
    };
}

let a = 1;
let b = 2;
let c = 3;
let d = 4;
function test(a,b,c,d) {
    return a+b+c+d;
}
console.log(partialUsingArguments(test, a, b)(c, d))