// 时间
// 成功失败信息
async function preloadImage(imgUrls, timeout) {
  
  const imgPreloader = url => {
    return new Promise((resolve, reject) => {
      let img = new Image();
      img.onload = () => {
        resolve("success");
      }
      img.onerror = () => {
        reject(url + "load fail");
      }
      img.src = url;
    })
  }

  let promiseArr = [];
  imgUrls.forEach(url => {
    promiseArr.push(imgPreloader(url));
  });

  const result = await Promise.allSettled(promiseArr);
  setTimeout(() => {
    if(result === undefined) { // timeout内没有加载完
      console.log("");
    } else {
      result.forEach(res => {
        if(res.reason) console.log(res.reason);
      })
    }
  }, timeout);
}

// polyfill
if (!Promise.allSettled) {
  const rejectHandler = reason => ({ status: 'rejected', reason });
  const resolveHandler = value => ({ status: 'fulfilled', value });

  Promise.allSettled = function (promises) {
    const convertedPromises = promises.map(p => Promise.resolve(p).then(resolveHandler, rejectHandler));
    return Promise.all(convertedPromises);
  };
}

