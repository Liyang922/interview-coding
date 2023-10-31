let obj1 = {
  a: 1,
  b: {c: 1},
}
let obj2 = {
  a: 1,
  b: {c: 1},
}

// json
// 1. 引用数据类型也可以
// 2. 位置不同为false
console.log(JSON.stringify(obj1) == JSON.stringify(obj2));

// 手动实现
function isEqual(obj1, obj2) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  // 比较属性值个数
  if(keys1.length != keys2.length) return false;

  // 遍历对象比较
  for(const key of keys1) {
    // 可以增加对函数的判断，判断属性值是否指向同一个函数（只能判断到这种程度了吧）
    if(typeof obj1[key] == 'object' && typeof obj2[key] == 'object') {
      if(!isEqual(obj1[key], obj2[key])) return false;
    } else if(obj1[key] != obj2[key]) {
      return false;
    }
  }
  return true;
}

console.log(isEqual(obj1, obj2));