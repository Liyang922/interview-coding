// O(nlog(n))
function mergeSort(array) {
  if(array.length <= 1) return array;
  const mid = Math.round(array.length / 2);
  const left = mergeSort(array.slice(0, mid));
  const right = mergeSort(array.slice(mid));
  return merge(left, right);
}

function merge(arr1, arr2) {
  const ans = [];
  let i = 0;
  let j = 0;
  while(i < arr1.length && j < arr2.length) {
    ans.push(arr1[i] < arr2[j] ? arr1[i++] : arr2[j++]);
  }
  return ans.concat(i == arr1.length ? arr2.slice(j) : arr1.slice(i));
}

let array = [3, 5, 19, 2, 1, 67, 2];
console.log(mergeSort(array));