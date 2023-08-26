// 类数组：有索引，有length属性
// 常见的类数组有arguments、DOM操作方法返回的结果等

let a = document.querySelectorAll("");

// 四个方法
Array.from()
let b = [...a]

// 方法借用
// call(thisArg, ...args)
Array.prototype.slice.call()
// let c = [].slice.call()

// apply(thisArg, args)
// 类数组对象作为借用的concat的许多参数的集合
// 相当于对类数组中的每一个值被作为concat的单独参数，最后整合成了一个数组
Array.prototype.concat.apply([], a)
// let c = [].concat.apply([], a)


// Array.from()
// 1.有一个可选参数mapFn，在最后生成的数组上执行一次map方法后再返回

// 例子：序列数生成
Array.from({length: 5}, (v, i) => i); // 回调函数的参数：element index
// [0, 1, 2, 3, 4]

// 例子：指定范围的序列数生成
const range = (start, stop, step) => {
    Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));
}

range(1, 10, 2);
// [1, 3, 5, 7, 9]

range('A'.charCodeAt(0), 'Z'.charCodeAt(0), 1).map(x => String.fromCharCode(x));
// ["A", "B", "C", "D", "E", "F",...,"W", "X", "Y", "Z"]

// 例子：数组去重合并
function combine(){
    let arr = [].concat.apply([], arguments);  //没有去重复的新数组
    return Array.from(new Set(arr));
}

var m = [1, 2, 2], n = [2,3,3];
console.log(combine(m,n));                     // [1, 2, 3]
