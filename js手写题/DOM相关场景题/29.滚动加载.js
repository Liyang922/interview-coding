window.addEventListener('scroll', function() {
    const clientHeight = document.documentElement.clientHeight; // 窗口高度
    const scrollTop = document.documentElement.scrollTop; // 页面的当前滚动
    const scrollHeight = document.documentElement.scrollHeight; // 已经滚动的高度
    if (clientHeight + scrollTop >= scrollHeight) {
      // 检测到滚动至页面底部，进行后续操作
      // ...
    }
  }, false);
