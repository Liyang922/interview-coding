// 实现一个sum函数：
// sum(1,2,3)(4)(5).valueOf();

function sum () {
  var arr = [...arguments];
  var _add = function () {
      arr.push(...arguments);
      return _add;
  };
  _add.valueOf = function () {
      return arr.reduce((t, c) => t + c)
  };
  return _add;
}

// console.log(sum.valueOf());