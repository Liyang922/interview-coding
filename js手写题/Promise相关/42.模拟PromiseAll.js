
// 一个出错就reject
// 全部fulfilled才fulfilled
function promiseAll(tasks) {
  let arr = new Array(tasks.length).fill(0).map(item => ({val: undefined, success: false}));

  return new Promise((resolve, reject) => {
    for(let i = 0; i < tasks.length; i++) {
      tasks[i]().then(res => {
        arr[i].success = true;
        arr[i].val = res;
        // 因为是异步任务，所以不确定在哪执行完成
        if(arr.every(item => item.success)) { //用一个count记录
          resolve(arr.map(item => item.val));
        }
      }).catch(err => {
        reject(err);
      })
    }
  })
}

var p1 = function(){
  return new Promise((resolve, reject) => {setTimeout(function(){resolve('12')}, 1000)})
};
var p2 = function(){
  return new Promise((resolve, reject) => {setTimeout(function(){resolve(2)}, 2000)})
};
var p3 = function(){
  return new Promise((resolve, reject) => {setTimeout(function(){resolve(3)}, 1000)})
};
promiseAll([p1, p2, p3]).then(res => console.log(res)).catch(err => {
  console.log(err);
});
// Promise.all([p1(), p2(), p3()]).then(res => console.log(res)).catch(err => {
//   console.log(err);
// });