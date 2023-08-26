// 归并排序
// 切分合并的思想
// 排序一个数组等于将数组的两部分排序后合并，然后对于这两部分来说也是同样
function mergeSort(arr) {
  let len = arr.length;
  if(len <= 1) return arr;

  let mid = Math.round(len / 2);
  let left = mergeSort(arr.slice(0, mid));
  let right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(arr1, arr2) {
  let ans = [];
  let i = 0;
  let j = 0;
  while(i < arr1.length && j < arr2.length) {
    ans.push(arr1[i] < arr2[j] ? arr1[i++] : arr2[j++]);
  }
  return ans.concat(i == arr1.length ? arr2.slice(j) : arr1.slice(i));
}

let array = [3, 5, 19, 2, 1, 67, 2];
console.log(mergeSort(array));

// 快排
// 找到一个中间位置，让小于中间位置的值的元素都去左边，大于的都去右边
// 从顶至下，不断切分
// 具体实现就是数组中间位置作为主元，创建两个指针，找到左边一个大于主元的值，右边一个小于主元的值，交换它们
// 直到左指针超过右指针
// 对划分之后的小数组重复这个操作
function quickSort(a) {
  return quick(a, 0, a.length - 1);
}

function quick(arr, left, right) {
  if(arr.length > 1) {
    let index = partition(arr, left, right);
    if(left < index - 1) quick(arr, left, index - 1);
    if(index < right) quick(arr, index, right);
  }
  return arr;
}

function partition(arr, left, right) {
  const pivot = arr[Math.floor((left + right) / 2)];
  let i = left;
  let j = right;

  while(i <= j) {
    while(arr[i] < pivot) {
      i++;
    }
    while(arr[j] > pivot) {
      j--;
    }
    if (i <= j) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
      j--;
    }
  }

  return i;
}

console.log(quickSort(array));