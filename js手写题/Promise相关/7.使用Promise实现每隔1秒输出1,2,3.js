// 原理：new Promise(executor)的executor是立即执行的
// promise按序执行需要再一个promise resolved之后再创建下一个promise
const arr = [1, 2, 3];

// async await版
(async function () {
  for (let num of arr) {
    await new Promise((resolve) => {
      setTimeout(() => {
        console.log(num);
        resolve();
      }, 1000);
    });
  }
})();

