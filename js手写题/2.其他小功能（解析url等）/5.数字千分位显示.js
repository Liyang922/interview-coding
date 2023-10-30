// reduce版本
function fmoney(num) { // num为整数
  let str = num + '';
  return str.split("").reverse().reduce((prev, cur, index) => {
    return ((index + 1) % 3 == 0 ?  ("," + cur) : cur) + prev; // 注意prev和cur先后顺序，注意括号
  }, "");
}
console.log(fmoney(1234567));
// reverse之后：7654321
// 第一次循环：7_67_,567
