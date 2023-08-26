function swap(a, i, j) {
  [a[i], a[j]] = [a[j], a[i]];
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
  let pivot = a[Math.floor((l + r) / 2)]; // 居然是因为用了Math.round
  // Math.round导致返回的q - 1总是大于l的，所以一直执行quick(a, l, q - 1)
  
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

let a = [19, 2, 1, 78, 34, 98, 100, 1];
console.log(quickSort(a));
console.log(a);

// swap(a, 1, 0)
// console.log(a)