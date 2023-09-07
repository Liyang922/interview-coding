// 给定一个任务，失败后可以最多重试times次，但最多用时timeout，超时后也算失败
function asyncRetry(fn, times, timeout = 0) {
  // fn必需
  // times必需，且为大于0的正整数
  times = parseInt(times);
  if(times <= 0 || isNaN(times)) {
    throw new TypeError("times必需是大于0的正整数");
  }
  // Number.isInteger()

  return Promise.race([
    // 错误后重复
    new Promise(async (resolve, reject) => {
      while(times--) {
        try {
          const res = await fn();
          resolve(res);
          break;
        } catch (error) {
          if(times <= 0) {
            reject("retry error");
          }
        }
      }
    }),
    // 定时任务判断是否超时
    new Promise((resolve, reject) => {
      setTimeout(() => {
        reject("retry error");
      }, timeout)
    })
  ]);
}

// https://blog.csdn.net/xy1580/article/details/127285053
// https://juejin.cn/post/6971411461767692325#heading-7