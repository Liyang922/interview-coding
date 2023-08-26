// 图片加载成功返回结果为img的promise
// 加载失败返回rejected的promise

function loadImg(url) {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.onload = () => {
      resolve(img);
    };
    img.onerror = () => {
      reject(new Error("Can't load img from" + url));
    }
    img.src = url; // 赋值src要在绑定好监听函数之后啊！！
  })
}