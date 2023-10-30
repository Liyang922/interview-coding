function add(a, b, c) {
    return a + b + c
}

add.length = 3;
add(1, 2, 3)
let addCurry = curry(add)
console.log(addCurry(1)(2, 3))

// 闭包实现柯里化
function curry(fn) {
    let args = [];
    let f = function() {
        args.push(...arguments);
        if(args.length == fn.length) return fn(...args);
        return (...args) => f(...args); // 箭头函数没有arguments对象，所以用args将箭头函数的参数传给f
    };
    return f;
}

/**
 * 柯里化的应用：
 *  创建偏函数，可以实现某些便捷功能
 *      例如，打印日志函数log，固定第一个参数为当前日期，可以创建偏函数logNow
 */

// “高级”柯里化
function curry(fn) {
    return function curried(...args) {
        if(args.length >= fn.length) { // 函数的length为形参个数，不包括剩余参数，只包括有默认值的参数之前的参数
            return fn.apply(this, args);
        } else {
            return function(...args2) {
                return curried.apply(this, args.concat(args2));
            }
        }
    }
}

function sum(a, b, c) {
    return a + b + c;
}

let curriedSum = curry(sum);

console.log( curriedSum(1, 2, 3) ); // 6，仍然可以被正常调用
console.log( curriedSum(1)(2,3) ); // 6，对第一个参数的柯里化
console.log( curriedSum(1)(2)(3) ); // 6，全柯里化