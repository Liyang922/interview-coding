const arr = [1, 1, '1', 17, true, true, false, false, 'true', 'a', {}, {}];
// => [1, '1', 17, true, false, 'true', 'a', {}, {}]

// 方法一：利用Set
// 注：无法去除重复的空对象，
const res1 = Array.from(new Set(arr));

// 方法二：filter() + lastIndexOf() or indexOf()
const res2 = arr.filter((item, index, arr) => {
    return index == arr.lastIndexOf(item);  
    // return index == arr.indexOf(item);
})


// 方法三：根据结果数组中是否存在当前值，判断是否存入当前值
// includes() or indexOf()
function unique(arr) {
    let res = [];
    arr.forEach(item => {
        if(!res.includes(item)) res.push(item);
        // if(!res.indexOf(item) === -1) res.push(item);
    })
    return res;
}
const res3 = unique(arr);

// 其他方法：
// 两层for循环+splice
// 利用map


console.log(res1, res2, res3);
console.log({} === {}); // false