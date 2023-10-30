// 红灯3秒亮一次，黄灯2秒亮一次，绿灯1秒亮一次；如何让三个灯不断交替重复亮灯？（用Promise实现）
function red() {
  console.log('red');
}
function green() {
  console.log('green');
}
function yellow() {
  console.log('yellow');
}

function light(timeout, fn) {
  return new Promise((resolve) => {
    setTimeout(() => {
      fn();
      resolve();
    }, timeout);
  });
}

// 实现原理：
// 首先三个交替执行，和promise依次输出1,2,3一样，需要上一个resolved后new下一个，同时return这个新的promise
// 循环：最后的then再执行一次step()
function step() {
  Promise.resolve()
    .then(() => {
      return light(3000, red); // 有return
      // 必须有return，因为then如果没有返回值，就是返回一个立即resolved的值为undefined的promise对象
      // 不能实现上一个promise几秒后resolved后再new下一个promise的效果
    })
    .then(() => {
      return light(2000, green);
    })
    .then(() => {
      return light(1000, yellow);
    })
    .then(() => {
      step();
    })
}

step();

// async await版本
// 写不出来，放弃了。。。
async function loop(promisfy, ...fns) {
  let fnArr = [...fns];
  let promiseArr = fnArr.map(fn => promisfy(2000 ,fn));

  const step = async () => {
    let newArr = [...promiseArr, step];
    return new Promise(async (resolve) => {
      for(let promise of newArr) {
        await promise;
      }
      resolve();
    })
  };

  step();
}

loop(light, red, green, yellow);