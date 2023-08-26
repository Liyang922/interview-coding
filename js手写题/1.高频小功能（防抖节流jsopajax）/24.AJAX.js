// xhr的异步设为false，利用promise实现异步
let getJSON = (url) => {
    return new Promise((resolve, reject) => {
        const xhr = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Mscrosoft.XMLHttp"); // ActiveX控件方便用户在网页中插入各种效果,微软独有，IE内核浏览器可用
        xhr.open("GET", url, false); // 请求类型、url、是否异步
        xhr.setRequestHeader("Accept", "application/json"); // 头部名，头部值
        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4) {
                if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                    resolve(xhr.responseText);
                } else {
                    reject(new Error(xhr.responseText));
                }
            } 
        }
        xhr.send(null); // 请求体数据，因为某些浏览器该参数必须，所以传一个null
    })  
}