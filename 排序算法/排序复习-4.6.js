function swap(a, i, j) {
  [a[i], a[j]] = [a[j], a[i]];
}

// 冒泡和优化
function bubbleSort1(arr) {
  const len = arr.length;
  if(!len) return [];

  for(let i = 0; i < len; i++) { // i只是表示执行len次排序操作
    for(let j = 0; j < len - 1; j++) { // 优化版这里是len - i - 1
      if(arr[j] > arr[j + 1]) swap(arr[j], arr[j + 1]);
    }
  }

  return arr;
} 

// 选择排序
function selectionSort(a) {
  const len = arr.length;
  if(!len) return [];

  for(let i = 0; i < len; i++) {
    // let minIndex = 1;
    for(let j = i + 1; j < len; j++) {
      if(a[j] < a[i]) {
        // minIndex = j;
        swap(a[j], a[i]);
      }
    }
  }
  // 优化版
  for(let i = 0; i < len; i++) {
    let minIndex = 0;
    for(let j = i + 1; j < len; j++) {
      if(a[j] < a[minIndex]) {
        minIndex = j;
      }
    }
    // 找到最小值之后只swap一次
    swap(a[i], a[minIndex]);
  }

  return a;
}

// 插入排序
// 也是原位修改，插入第j项时，与前面j-1项进行比较，如果前面的值比较大，就交换值
// 优化版：保存a[j]，比较时不进行交换，而是将j-1位的值直接赋给j位
function insertionSort(a) {
  let len = a.length;
  if(len <= 1) return a;

  for(let i = 1; i < len; i++) {
    let j = i;
    let target = a[j];
    while((j >= 1) && (a[j - 1] > target)) {
      a[j] = a[j - 1];
      j--;
    }
    a[j] = target;
  }

  return a;
}

// 归并排序
function mergeSort(a) {
  const len = a.length;
  if(len <= 1) return a;
  let mid = Math.floor(len / 2);
  return merge(mergeSort(a.slice(0, mid)), mergeSort(a.slice(mid)));
}

function merge(a, b) {
  const len = a.length ? b.length : b.length; a.length;
  const res = [];

  for(let i = 0; i < len; i++) { // 写错了！！！
    res.push(a[i] < b[i] ? a[i] : b[i]);
  }

  let i = 0;
  let j = 0;
  while(i < a.length && j < b.length) {
    res.push(a[i] < b[j] ? a[i++] : b[j++]);
  }
  return res.concat(i == a.length ? b.slice(j) : a.slice(i));

  return res.concat(len == a.length ? b.slice(len) : a.slice(len));
}

// 快排
function quickSort(a) {
  return quick(a, 0, a.length - 1);
}

function quick(a, l, r) {
  if(a.length > 1) {
    let q = partition(a, l, r);
    if(l < q - 1) {
      quick(a, l, q - 1);
    }
    if(r > q) {
      quick(a, q, r);
    }
  }
  return a;
}
// 左右闭区间
function partition(a, l, r) {
  let pivot = a[Math.round((l + r) / 2)];
  
  let i = l;
  let j = r;
  while(i <= j) {
    while(a[i] < pivot) {
      i++;
    }
    while(a[j] > pivot) {
      j--;
    }
    if(i <= j) {
      swap(a, i, j);
      i++;
      j--;
    }
  }
  return i;
}

let a = [3, 5, 19, 2, 1, 67, 2];
console.log(quickSort(a));
console.log(a);

// swap(a, 1, 0)
// console.log(a)