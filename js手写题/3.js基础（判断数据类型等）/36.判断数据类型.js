// 处理null和object
function getType(obj) {
  if (obj === null) return String(obj);
  return typeof obj === 'object' 
  ? Object.prototype.toString.call(obj).replace('[object ', '').replace(']', '').toLowerCase()
  : typeof obj;
}

// console.log(typeof undefined);
console.log(Object.prototype.toString.call([])); // [object Array]
console.log(Object.getPrototypeOf([])); // 返回具体对象