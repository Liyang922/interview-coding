// compose：前一个函数的输出是下一个函数的输入
/**
 * 1. 函数式编程思想，将分解任务组合成复杂任务
 * 2. 比如，实现任务A需要步骤B和C，B已经写好，用组合就不用去修改B，新增C，然后compose
 * 3. 设计模式的开闭原则
 */

function compose(...fnArr) {
  return function(...args) {
    return fnArr.reverse().reduce((prev, cur) => {
      return cur(prev);
    }, args);
  } 
}

// reduceRight
function compose(...fnArr) {
  return function(x) {
    return fnArr.reduceRight((prev, cur) => {
      return cur(prev);
    }, x);
  } 
}

// 管道：函数从左至右执行