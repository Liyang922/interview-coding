// 触发高频事件后n秒内只会执行一次，如果n秒内事件再次触发，则重新计时

// 写法一：
const debounce = (fn, time) => {
    let timeout;
    return function() {
        clearTimeout(timeout); // 没有判断timeout是否存在
        let args = [...arguments];
        timeout = setTimeout(() => fn.call(this, ...args), time);
        // 箭头函数没有arguments对象，因此可以直接在setTimeout的回调中使用arguments
        // timeout = setTimeout(() => fn.apply(this, arguments), time);
    }
}

// 写法二：
function debounce(fn, timeout) {
    let timerId = null;
    return function f() {
      if(timerId) {
        clearTimeout(timerId);
        timerId = null; // clearTimeout并不会改变timerId的值
      }
      timerId = setTimeout(() => {
        fn.apply(this, arguments);
        timerId = null;
      }, timeout);
    }
  }


// 使用
var node = document.getElementById('layout')
function getUserAction(e) {
    console.log(this, e)  // 分别打印：node 这个节点 和 MouseEvent
    node.innerHTML = count++;
};
node.onmousemove = debounce(getUserAction, 1000)



