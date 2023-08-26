// 原理：new Promise(executor)的executor是立即执行的
// promise按序执行需要再一个promise resolved之后再创建下一个promise
const arr = [1, 2, 3];
// arr.reduce((prev, cur) => {
//   return prev.then(() => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         console.log(cur);
//         resolve();
//       }, 1000);
//     });
//   });
// }, Promise.resolve());
// Promise.resolve(value)返回一个以value解析后的Promise对象

// 这种写法会在5秒后一起打印1,2,3
// arr.reduce((prev, cur) => {
//   return prev.then(
//     new Promise((resolve) => { // 相当于对Promise.resolve()返回的promise对象添加了很多参数为值而不是函数的then
//       // 因此发生值穿透，但then里的代码还是会执行
//       // 因此定义了三个5秒的定时器，因此5秒后一起输出
//       setTimeout(() => {
//         console.log(cur);
//         resolve();
//       }, 5000);
//     })
//   );
// }, Promise.resolve());

// async await版
(async function () {
  for (let num of arr) {
    await new Promise((resolve) => {
      setTimeout(() => {
        console.log(num);
        resolve();
      }, 1000); // 总是忘记写时间
    });
  }
})();

// let promiseArr = arr.map((num) => {
//   return () => {
//     new Promise((resolve) => {
//       setTimeout(() => {
//         console.log(num);
//         resolve();
//       }, 1000);
//     });
//   };
// });
// (async function () {
//   for (let promise of promiseArr) {
//     await promise();
//   }
// })();
