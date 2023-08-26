// 高频事件触发，n秒内只执行一次，稀释函数的执行频率
// 与防抖不同，n秒内再次触发，不会重新开始计时，即严格的n秒一次的频率执行

let throttle = (fn, time) => {
    let flag = false;
    return function f() {
        if(flag) return;
        flag = true;
        setTimeout(() => {
            fn.apply(this, arguments);
            flag = false;
        }, time);
    }
}

// 鼠标的不断点击触发、监听滚动事件