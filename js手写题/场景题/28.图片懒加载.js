// 可以给img标签统一自定义属性data-src='default.png'
// 当检测到图片出现在窗口之后再补充src属性，此时才会进行图片资源加载。
function lazyLoad() {
  const imgs = document.querySelectorAll("img");

  const windowHeight = document.documentElement.clientHeight; // 窗口高度

  imgs.forEach((img) => {
    if (img.getBoundingClientRect.y < windowHeight) {
      img.src = img.dataset.src;
    }
  });
}

// 可以用节流进行优化
window.addEventListener("scroll", lazyLoad);
