// 
function binarySearch(arr, num) {
  let len = arr.length;
  let l = 0;
  let r = len - 1;
  
  while(l <= r) {
    let mid = l + (r - l) >> 2;
    if(arr[mid] > num) {
      r = mid - 1;
    } else if(arr[mid] < num) {
      l = mid + 1;
    } else {
      if(mid == 0 || arr[mid - 1] != num) {
        return mid;
      }
      r = mid - 1; // 当前mid不是第一个
    }
  }

  return -1;
}

let a = [1, 2, 4, 4, 6];
console.log(binarySearch(a, 4));