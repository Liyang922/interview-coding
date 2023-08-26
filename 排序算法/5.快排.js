// O(nlog(n))
// 快排的递归公式： quick_sort(p…r) = quick_sort(p…q-1) + quick_sort(q+1… r)
// 终止条件： p >= r
// 而q是partioon的返回结果

function quickSort(a) {
  return quick(a, 0, a.length - 1); // l和r都参与，左右闭区间
}

function quick(a, l, r) {
  if(a.length > 1) {
    let index = partition(a, l, r);
    if (l < index - 1) {
      quick(a, l, index - 1);
    }
    if (index < r) { // index而不是index + 1，因为要保证数组每一位都参与下一次的quick
      quick(a, index, r);
    }
  } 
  return a;
}

// 分别从l和r开始向中间遍历，找到第一个左边大于pivot和右边小于pivot的值，交换
function partition(a, left, right) {
  const pivot = a[Math.floor((right + left) / 2)];
  let i = left;
  let j = right;

  while (i <= j) {
    while (a[i] < pivot) {
      i++;
    }
    while (a[j] > pivot) {
      j--;
    }
    if (i <= j) {
      [a[i], a[j]] = [a[j], a[i]];
      i++;
      j--;
    }
  }
  return i; // 因为是a[i] < pivot
}

let array = [3, 5, 19, 2, 1, 67, 2];
console.log(quickSort(array));