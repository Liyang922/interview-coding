// 给定一个Promise任务数组，并行执行这些任务，最多同时执行n个
function parallel(tasks, maxCount) {
  return new Promise((resolve, reject) => {
    let index = 0;
    let count = 0;
    let result = [];

    function next() {
      if (index >= tasks.length) {
        resolve(result);
        return;
      }
      let cur = index++;
      count++;
      tasks[cur]().then(res => {
        result[cur] = res;
      }).catch(err => {
        reject(err);
      }).finally(() => {
        count--;
        if (count < maxCount) {
          next();
        }
      })
    }
    for (let i = 0; i < maxCount; i++) {
      next();
    }
  })
}

// 写法2：用Promise.race([pool])