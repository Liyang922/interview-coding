// 时间分片：渲染大量数据时，使用createDocumentFragment和requestAnimationFrame，将渲染操作分割成一段一段的
setTimeout(() => {
    const totalCount = 10000;
    const once = 20;
    const loopCount = Math.ceil(totalCount / once);
    let countOfRender = 0;

    const ul = document.querySelector("ul");

    // 添加数据
    function addData() {
        const fragment = document.createDocumentFragment(); // node
        for (let j = 0; j < once; j++) {
            const li = document.createElement("li");
            li.innerText = countOfRender * once + j;
            fragment.appendChild(li);
        }        
        ul.append(fragment);
        countOfRender++;
        // 单次渲染完成后执行下一次渲染
        loop();
    }

    function loop() {
        if(countOfRender < loopCount) {
            window.requestAnimationFrame(addData);//在渲染下一帧动画前执行传入的回调，渲染频率一般与屏幕刷新率一样
        }
    }
    loop();
}, 0)

// 为什么用requestAnimation？setTimeout会丢帧引起闪屏。
// 为什么用documentFragment？不会因为插入元素频繁引发回流重绘。
    // 插入的时候插入它的所有子节点，留下一个空的documentFragment