// 思想：
// 从第一个元素开始，分别比较第一个元素和它后面的所有元素，如果后面的元素比第一个元素小，就记录下标
// 交换第一个元素和minIndex代表的元素（也就是不断地将最小值换到前面来）
// (冒泡是不断的把最大值换到数组后面去)
function selectionSort(arr) {
  let len = arr.length;
  if(!len) return [];

  for(let i = 0; i < len; i++) {
    let minIndex = i;
    for(let j = i; j < len; j++) {
      if(arr[j] < arr[minIndex]) minIndex = j;
    }
    [arr[minIndex], arr[i]] = [arr[i], arr[minIndex]];
  }

  return arr;
}

let arr = [5, 4, 2, 6, 1];
console.log(selectionSort(arr));

// 不断将最大值放在数组尾部呢？可以的
function selectionSort2(arr) {
  let len = arr.length;
  if(!len) return [];

  for(let i = len - 1; i > -1; i--) {
    let maxIndex = i;
    for(let j = i; j > -1; j--) {
      if(arr[j] > arr[maxIndex]) maxIndex = j;
    }
    [arr[maxIndex], arr[i]] = [arr[i], arr[maxIndex]];
  }

  return arr;
}

let arr2 = [5, 4, 2, 6, 1];
console.log(selectionSort(arr2));