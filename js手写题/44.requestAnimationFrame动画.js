/**
 * @param 
 */
function animate({duration, draw, timing}) {

  let start = performance.now();
  
  requestAnimationFrame(function animate(time) {
    // timeFraction 从 0 增加到 1
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    // 计算当前动画状态
    let progress = timing(timeFraction); // 0-1

    draw(progress); // draw为绘制函数（控制css属性等）

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }

  });
}

animate({
  duration: 1000,
  timing(timeFraction) {
    return timeFraction;
  },
  draw(progress) {
    elem.style.width = progress * 100 + '%';
  }
});

// setInterval实现动画
let start = Date.now();

let timer = setInterval(() => {
  let timePassed = Date.now() - start;
  if(timePassed >= 2000) {
    clearInterval(timer);
    return;
  }
  draw(timePassed);
}, 20);

function draw(timePassed) {
  train.style.left = timePassed / 5 + 'px'; // train为页面中的元素
}
