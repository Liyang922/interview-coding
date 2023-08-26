// 思想：
// 假设数组第一项已经排序了，然后插入第二项，此时要比较两者大小以决定它们的位置
// 当插入第三项的时候，再将第三项的值与前两项分别比较，以确定第三项插入的位置
function insertionSort(arr) {
  let len = arr.length;
  if(!len) return [];

  for(let i = 1; i < len; i++) { // 第一项已经排序
    let j = i;
    let target = arr[j];
    while(j > 0 && arr[j - 1] > target) { // 将第j位的值与它前面的值进行比较
      arr[j] = arr[j - 1]; // 不断将第j位的值向前挪动，这里的arr[j - 1]应该存储target的值
      j--;
    }
    arr[j] = target;
  }

  return arr;
}

let arr = [5, 4, 2, 6, 1];
console.log(insertionSort(arr));