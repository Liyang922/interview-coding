// 实现jsonp
// url, params, callback
function jsonp(url, params, callback) {
  const generateUrl = () => {
    let res = "";
    Object.keys(params).forEach(key => {
      res += `${key}=${params[key]}&`;
    });
    res += `callback=${callback}`;
    return `${url}?${res}`;
  }

  return new Promise((resolve, reject) => {
    let script = document.createElement("script");
    window[callback] = (data) => {
      resolve(data);
      script.remove(); // 移除script元素！！
    };
    script.src = generateUrl();
    document.body.append(script);
  })
}

// 手写ajax
function getJSON(url) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open("get", url, false);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = () => {
      if(xhr.readyState == 4) {
        if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
          resolve(xhr.responseText);
        } else {
          reject("error");
        }
      }
    }
    xhr.send(null);
  })
}

// 图片懒加载
function lazyLoad() {
  let imgs = document.querySelectorAll("img");

  let windowHeight = document.documentElement.clientHeight; // 窗口高度

  imgs.forEach(img => {
    let imgY = img.getBoundingClientRect.y;
    if(imgY < windowHeight) {
      img.src = img.dataset.src;
    }
  })
}

// 渲染几万条数据
function render() {
  let count = 10000;
  let maxCount = 20;
  let loop = Math.ceil(count / maxCount);
  let runCount = 0;

  let ul = document.querySelector("ul");

  function addData() {
    let fragment = document.createDocumentFragment();
    for(let i = 0; i < maxCount; i++) {
      let li = document.createElement("li");
      li.innerText = runCount * maxCount + i + 1;
      fragment.append(li);
    }
    ul.append(fragment);
    runCount++;

    loop();
  }

  function loop() {
    if(runCount < loop) {
      requestAnimationFrame(addData); // 传进去的是回调！！！不要加括号！！
    }
  }
  
}

// setTimeout模拟setInterval
function mySetInterval(fn, timeout) {
  let timerId;

  function interval() { // 关键要定义一个用来回调的函数，否则没法写
    fn();
    timerId = setTimeout(interval, timeout);
  }

  timerId = setTimeout(interval, timeout);

  return {
    cancel: () => clearTimeout(timerId)
  }
}

// 转为驼峰命名
let s = "a_b_cdft";
function changeName(s) {
  return s.replace(/-\w/g, (str) => {
    return str.slice(1).toUpperCase();
  })
}

// 解析URL参数
let url = 'http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled';
parseParam(url);
function parseParam(url) {
  let params = url.split("?")[1].split("&");
  let res = {};

  for(let param of params) {
    let [key, value] = param;
    value = value == undefined ? true : decodeURIComponent(value);
    value = /^\d+$/.test(value) ? parseFloat(value) : value;
    if(res.hasOwnProperty(key)) {
      res[key] = [].concat(res[key], value);
    } else {
      res[key] = value; // 这部分也改成?
    }
  }

  return res;
}

// 模拟promiseAll
function promiseAll(promiseList) {
  let ans = new Array(promiseList.length).fill(0);
  let count = 0;

  return new Promise((resolve, reject) => {
    promiseList.forEach((promiseGenerator, index) => {
      promiseGenerator().then((value) => {
        ans[index] = value;
        count++;
        if(count >= promiseList.length) resolve(ans);
      }).catch(err => {
        reject(err);
      })
    })
  })
}

// promise生成函数
let p1 = () => {
  return new Promise((resolve) => setTimeout(resolve(12), 1000));
}

// promise调度器
class Scheduler{
  constructor() {
    this.maxCount = 2;
    this.runCount = 0;
    this.queue = [];
  }

  addTask(promiseGenerator) {
    this.queue.push(promiseGenerator);
  }

  request() {
    if(!this.queue || !this.queue.length || this.runCount >= this.maxCount) { // 要判断queue！！！
      return;
    }
    
    this.runCount++;
    this.queue.shift()().then(data => {
      this.runCount--;
      this.request();
    })
  }

  start() {
    for(let i = 0; i < this.runCount; i++) {
      this.request();
    }
  }
}


// 观察者模式

