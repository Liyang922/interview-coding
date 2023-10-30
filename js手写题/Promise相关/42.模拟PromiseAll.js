
// 一个出错就reject
// 全部fulfilled才fulfilled
function promiseAll(tasks) {
  const len = tasks.length;
  const values = new Array(len);
  let count = 0;

  return new Promise((resolve, reject) => {
    for (let i = 0; i < len; i++) {
      tasks[i]().then(
        (res) => {
          values[i] = res;
          count++;
          if (count === len) resolve(values);
        },
        (reason) => reject(reason)
      );
    }
  });
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