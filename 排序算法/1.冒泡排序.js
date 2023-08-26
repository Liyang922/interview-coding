// 思想：从第一个元素开始，把当前元素和下一个索引元素进行比较。如果当前元素大，那么就交换位置.
// 重复操作直到比较到最后一个元素，那么此时最后一个元素就是该数组中最大的数。
// 下一轮重复以上操作，但是此时最后一个元素已经是最大数了，所以不需要再比较最后一个元素，只需要比较到 length - 1 的位置。

function bubbleSort(arr) {
  let len = arr.length;
  if(!len) return [];

  for(let i = 0; i < len; i++) {
    for(let j = 0; j < len - i - 1; j++) {
      if(arr[j] > arr[j + 1]) {
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
      }
    }
  }

  return arr;
}

let arr = [5, 4, 2];
console.log(bubbleSort(arr))

// 优化：某次没有交换操作，表示已经有序，无需继续冒泡
function bubbleSort(arr) {
  let len = arr.length;
  if(!len) return [];
  
  for(let i = 0; i < len; i++) {
    let flag = false;
    for(let j = 0; j < len - i - 1; j++) {
      if(arr[j] > arr[j + 1]) {
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
        flag = true;
      }
    }
    if(!flag) break;
  }

  return arr;
}