const Compare = {
    LESS_THAN: false,
    BIGGER_THAN: true
}

function defaultCompare(a, b) {
    return a > b ? Compare.BIGGER_THAN : Compare.LESS_THAN;
}

// 冒泡
// 比较所有相邻项，更大的元素向上走（第一趟将最大值放至数组末尾，然后是次大值）
// 共进行length次外循环，每次外循环中进行length - 1次比较
// 复杂度：O(n^2)

function bubbleSort(array, compareFn = defaultCompare) {
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - 1; j++) {
            if(compareFn(array[j], array[j + 1]) === Compare.BIGGER_THAN) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
            }
        } 
    }
    return array;
}

// 优化的冒泡
function modifiedBubbleSort(array, compareFn = defaultCompare) {
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - 1 - i; j++) {
            if(compareFn(array[j], array[j + 1]) === Compare.BIGGER_THAN) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
            }
        } 
    }
    return array;
}

// 选择排序
// 每一趟找到最小值，将其放入数组头部（第一趟找到数组最小值，放在[0]处）
// 共进行length次外循环，每次循环进行length - i - 1次比较
function selectionSort(array, compareFn = defaultCompare) {
    const length = array.length;
    
    for (let i = 0; i < length; i++) {
        let indexMin = i;
        for (let j = i; j < length; j++) { //j从i开始
            if(compareFn(array[indexMin], array[j]) === Compare.BIGGER_THAN) {
                indexMin = j;
            }
        }
        [array[indexMin], array[i]] = [array[i], array[indexMin]];
    }
    return array;
}



// test
function createNonSortedArray(size) { // 6
    const array = [];
    for (let i = size; i > 0; i--) {
      array.push(i);
    }
    return array;
}

let array = createNonSortedArray(5); // {7}
console.log(array.join()); // {8}
//   array = bubbleSort(array); // {9}
//   array = modifiedBubbleSort(array); // {9}
array = selectionSort(array); // {9}
console.log(array.join()); //{10}