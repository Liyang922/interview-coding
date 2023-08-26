// setInterval的缺陷
/**
 * 定时是指何时将任务加入消息队列，执行时间取决于主线程的事件循环
 * setInterval将任务push进队列前会检查队列中是否有上一次的任务，因此可能会跳过某些任务
 * 可能多个定时器会连续执行（这个模拟的也会有吧？）
 */

function mySetInterval(fn, t) {
  let timerId;
  function interval() {
    fn();
    timerId = setTimeout(interval, t);
  }
  timerId = setTimeout(interval, t);
  return {
    // 闭包
    cancel: () => clearTimeout(timerId) 
  }
}

let count = 1;
let timer = mySetInterval(() => {
  console.log(count++);
}, 100);
setTimeout(() => {
  timer.cancel();
}, 1000);



// setInterval模型setTimeout
function mySetTimeout(fn, t) {
  const timerId = setInterval(() => {
    clearInterval(timerId);
    fn();
  }, t);
} 