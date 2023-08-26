const { func } = require("prop-types");

// jsonp
function jsonp({url, params, callbackName}) {
  function generateUrl() {
    let res = "";
    Object.keys(params).forEach(key => {
      res += `${key}=${params[key]}&`;
    })
    return `${url}?${res}&callback=${callbackName}`;
  }

  return new Promise((resolve, reject) => {
    let script = document.createElement("script");
    window[callbackName] = (data) => {
      resolve(data);
      script.remove();
    };
    script.src = generateUrl();
    document.body.append(script);
  })
}

// ajax
// open send onreadystatechange readyState status responseText
const getJSON = (url) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open("get", url)
    xhr.onreadystatechange = () => {
      if(xhr.readyState === 4) {
        if(xhr.status >= 200 && xhr.status <= 300) {
          resolve(xhr.responseText);
        } else {
          reject("error");
        }
      }
    }
    xhr.send()
  })
}

// 图片懒加载
const lazyLoad = () => {
  let img = document.querySelectorAll("img")

  const windowHeight = document.documentElement.clientHeight; 

  img.forEach(img => {
    if(img.getBoundingClientRect.y < windowHeight) { // 判断进入可视区域
      img.src = img.dataset.src;
    }
  })  
}

// 渲染几万条数据
// documentFragment
// requestAnimation
setTimeout(() => {
  const count = 10000;
  const once = 20;
  const loopCount = Math.ceil(count / once);
  let renderedCount = 0;

  const ul = document.querySelector("ul");

  function addData() {
    let fragment = document.createDocumentFragment();
    for(let i = 0; i < once; i++) {
      let li = document.createElement("li");
      li.textContent = renderedCount * once + i + 1;
      fragment.append(li);
    }
    ul.append(fragment);
    loop();
  }

  function loop() {
    if(renderedCount < loopCount) {
      window.requestAnimationFrame(addData);
    }
  }
  loop();
}, 0)

// setTimeout模拟interval
function mySetInterval(fn, t) {
  let timerId;

  function interval() {
    fn();
    timerId = setTimeout(interval, t);
  }
  timerId = setTimeout(interval, t);
  return {
    cancel: () => {clearTimeout(timerId)}
  }
}

// 转为驼峰命名
let s = "a_b_cdft";
const changeName = (s) => {
  return s.replace(/-\w/g, (x) => {
    return x.slice(1).toUpperCase();
  })
}

// 解析url参数
let url = 'http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled';
parseParam(url);
// 重复key是数组
// 非ASICC要解码
// 数字要改成数字类型
// 无value的默认为true

const parseParam = (url) => {
  let params = url.split("?")[1].split("&").map(param => param.split("="));
  let res = {};
  params.forEach(param => {
    let key = param[0];
    let value = param[1] === undefined ? true : decodeURIComponent(param[1]);
    value = /^\d+$/.test(value) ? parseFloat(value) : value;
    res[key] = res.hasOwnProperty(key) ? [].concat(res[key], value) : value;
  })
  return res;
}

// 模拟promiseAll
function promiseAll(promiseList) {
  let res = new Array(promiseList.length).fill(0);
  let count = 0;

  return new Promise((resolve, reject) => {
    for(let i = 0; i < promiseList.length; i++) {
      promiseList[i]().then(data => {
        res[i] = data;
        count++;
        if(count >= promiseList.length) resolve(res);
      }).catch(err => {
        reject(err);
      })
    }
  })
}

let p1 = () => {
  return new Promise((resolve) => setTimeout(() => {resolve(12)}, 1000));
}

// Promise调度器
class Scheduler {
  constructor() {
    this.queue = [];
    this.maxCount = 2;
    this.runCount = 0;
  }

  addTask(promiseGenerator) {
    this.queue.push(promiseGenerator);
  }

  // 运行任务
  request() {
    if(!this.queue || !this.queue.length || this.runCount >= this.maxCount) {
      return;
    }
    this.runCount++;
    this.queue.shift()().then(data => {
      this.runCount--;
      this.request(); // 循环调用！！！
    })
  }

  taskStart() {
    for(let i = 0; i < this.maxCount; i++) {
      this.request();
    }
  }
}


