// Set
let arr1 = [1, 2, 3, 4, 5, 6];
let arr2 = [2, 4, 6, 7, 8];
let arr3 = Array.from(new Set([...arr1, ...arr2])); 

// 遍历
function unionArray(arr1,arr2) {
  arr2.map(item =>{
    !arr1.includes(item) && arr1.push(item)
  })

  return arr1.sort()
}