// 要求：传入promise数组，按照传入顺序，返回第一个resolved的结果；否则，返回最后一个rejected的结果
function promiseOr(arr) {
  arr[0].then(
    (res) => { 
      return res;
    },
    (err) => {
      if(arr.length == 1) return err;
      return promiseOr(arr.slice(1));
    }
  );
}

// 注意，这个并不是链式调用，因为不依赖上一个promise的结果
// 只是我们用递归调用的方式，依次给这些promise注册回调，返回对应的值

// 和Promise.any的区别：不是利用for循环一次性给所有promise都注册了回调
// 而是根据上一个promise的执行情况，选择是否给下一个promise注册回调
