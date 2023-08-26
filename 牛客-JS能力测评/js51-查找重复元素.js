// 循环次数过多
function duplicates(arr) {
    let count = {};
    for(let num of arr) {
        if(count[num]) {
            count[num]++;
        } else {
            count[num] = 1;
        }
    }
    console.log(count);
    
    let result = [];
    for(key of Object.keys(count)) {
        if(count[key] > 1) result.push(+key);
    }
    return result;
}

let arr = [1, 2, 4, 4, 3, 3, 1, 5, 3];
console.log(duplicates(arr));


// 利用indexOf和lastIndexOf
// 时间复杂度会不会很高？
function duplicates2(arr) {
    let result = [];
    arr.forEach(item => {
        if(arr.indexOf(item) !== arr.lastIndexOf(item) && result.indexOf(item) == -1) {
            result.push(item);
        }
    });
    return result;
}

// 利用indexOf和lastIndexOf和filter
function duplicates3(arr) {
    return arr.filter((el, index) => 
        index !== arr.lastIndexOf(el) && index === arr.indexOf(item)
    );
}

// 两个set，一个存放所有元素，一个存放重复元素
function duplicates4(arr) {
    let set1 = new Set();
    let set2 = new Set();
    for(item of arr) {
        if(set1.has(item)) {
            set2.add(item);
        } else {
            set1.add(item);
        }
    }
    return Array.from(set2);
}

// 数组排序
// filter出与后面元素相等，与前面元素不相等的元素
function duplicates5(arr) {
    let newArr = arr.sort();
    return newArr.filter((item, index) => 
        item == arr[index+1] && item != arr[index-1]
    );
};




