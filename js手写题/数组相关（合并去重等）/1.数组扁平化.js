const arr = [1, [2, [3, [4, 5]]], 6];
// => [1, 2, 3, 4, 5, 6]

// 方法一：flat()

// flat()：按照制定深度递归遍历数组，返回新数组
// 语法：flat(depth)，depth可选，默认为1
// 注：会移除数组中的空项

const res1 = arr.flat(Infinity);

// 方法二：函数递归

// Array.isArray()：类方法而不是实例方法！！
// Array.prototype.concat()：返回一个新数组而不是原位修改！！

function flatArr(arr) {
    let res = [];
    arr.forEach(item => {
        if(!Array.isArray(item)) {
            res.push(item);
        } else {
            res = res.concat(flatArr(item));
            // 正确：
            // res.push(...[flatArr(item)]);
            
            // 错误:
            // res.concat(flatArr(item));
            // res.push(flatArr(item));
        }
    });
    return res;
}
const res2 = flatArr(arr);

// 借助方法三的思路简写一下
flatArr3 = arr => {
    let res = [];
    arr.forEach(item => {
        res.concat(Array.isArray(item) ? flatArr3(item) : item);
    });
    return res;
}


// 方法三：reduce()+递归
// 注: concat()的参数可以是单独的值
// 对比方法二：借助reduce()的特性，省略了自己定义返回变量的操作

function flatArr2(arr) {
    return arr.reduce((prev, cur) => {
        return prev.concat(Array.isArray(cur) ? flatArr2(cur) : cur);
    }, []);
}
const res3 = flatArr2(arr);

// 方法四：正则
const res4 = JSON.stringify(arr).match(/\d/g).map(item => +item);
const res5 = JSON.stringify(arr).replace(/\[|\]/g, '').split(',');

// 正则改良
// JSON.parse()：解析JSON格式的字符串，返回字符串表示的js值或对象
const res6 = JSON.parse('[' + JSON.stringify(arr).replace(/\[|\]/g, '') + ']');

// 方法五：借助字符串
const res7 = arr.toString().split(",").map((item) => Number(item));
const res8 = arr.join(',').split(',').map(item => Number(item));

// 方法六：数组解构
function flatArr4(arr) {
    while(arr.some(item => Array.isArray(item))) {
        arr =  [].concat(...arr);
    }
    return arr;
}

console.log(res1, res2, res3, res4, res5, res6);
