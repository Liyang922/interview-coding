// 虚拟列表：只渲染可视区域，并监听滚动事件改变渲染内容
// 虚拟列表 vs 懒加载：只改变可视区域内的元素内容，并没有增加多余的元素

<div className="container">
  <div className="scroll-box" ref={containerRef} onScroll={boxScroll}>
    <div style={topBlankFill.current}>
      {showList.map((item) => (
        <div
          className="item"
          key={item.commentId || Math.random() + item.comments}
        >
          {item.content}
        </div>
      ))}
    </div>
  </div>
</div>;

// 一：计算渲染数量
const changeHeight = useCallback(
  throttle(() => {
    curContainerHeight.current = containerRef.current.offsetHeight;
    curViewNum.current = Math.ceil(curContainerHeight.current / itemHeight) + 1;
  }, 500),
  []
);

useEffect(() => {
  changeHeight();
  window.addEventListener("resize", changeHeight);
  return () => {
    window.removeEventListener("resize", changeHeight);
  };
}, [changeHeight]);

// 二：计算item开始结束索引
const scrollHandle = () => {
  let startIndex = Math.floor(containerRef.current.scrollTop / itemHeight);
  if (!isNeedLoad && lastStartIndex.current === startIndex) return;
  isNeedLoad.current = false;
  lastStartIndex.current = startIndex;
  const containerMaxSize = curViewNum.current;

  let endIndex = startIndex + 2 * containerMaxSize - 1;
  const currLen = dataListRef.current.length;
  if (endIndex > currLen - 1) {
    !isRequestRef.current &&
      setOptions((state) => ({ offset: state.offset + 1 }));
    endIndex = currLen - 1;
  }
  if (startIndex <= containerMaxSize) {
    startIndex = 0;
  } else {
    startIndex = startIndex - containerMaxSize;
  }
  setShowList(dataListRef.current.slice(startIndex, endIndex + 1));
};


// 三：上下空白填充
topBlankFill.current = {
  paddingTop: `${startIndex * itemHeight}px`,
  paddingBottom: `${(dataListRef.current.length - 1 - endIndex) * itemHeight}px`
}

// 四：结合懒加载
useEffect(() => {
  (async () => {
    try {
      isRequestRef.current = true
      const { offset } = options
      let limit = 20
      if (offset === 1) limit = 40
      const { data: { comments, more } } = await axios({
        url: `http://localhost:3000/comment/music?id=${186015 - offset}&limit=${limit}&offset=1`
      })
      isNeedLoad.current = more
      dataListRef.current = [...dataListRef.current, ...comments]
      isRequestRef.current = false
      boxScroll()
    } catch (err) {
      isRequestRef.current = false
      console.log(err);
    }
  })()
}, [options])

// 五：使用requestAnimationFrame进行节流优化
let then = useRef(0)
const boxScroll = () => {
  const now = Date.now()
  if (now - then.current > 30) {
    then.current = now
    window.requestAnimationFrame(scrollHandle)
  }
}

// https://juejin.cn/post/7215114042494844988
// https://juejin.cn/post/7085941958228574215
// 虚拟列表滚动太快出现白屏：增大缓冲区；pc端实现自己的滚动条限制滚动速度；移动端限制webview滚动速度等
