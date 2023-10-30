/* 
    JSONP(JSON with Padding)
        1. script标签没有同源限制，但只能使用get方法。
        2. script标签设置src，然后服务器返回一个字符串，该字符串为“callback(data)”。
            callback为src里的url里传给服务器的回调函数的名字，该回调函数已经定义。
            data为服务器返回的数据。
            script标签将字符串解析为js代码，执行。
 */ 

// 实现jsonp函数，传入url等参数，返回promise
const jsonp = ({url, params, callbackName}) => {
    const generateUrl = () => {
        let dataSrc = '';
        for(let key in params) {
            if(Object.prototype.hasOwnProperty.call(params, key)) { // 不是特别理解为什么要借用原型方法，考虑了params不是对象类型吗？
                dataSrc += `${key}=${params[key]}&`; // 直接用Object.keys()应该就可以
            }
        }
        dataSrc += `callback=${callbackName}`;
        return `${url}?${dataSrc}`;
    }
    return new Promise((resolve, reject) => {
        let script = document.createElement("script");
        script.src = generateUrl();
        document.body.append(script);
        // 定义callbackName函数，以备调用
        window[callbackName] = data => {
            resolve(data);
            script.remove();
        }
    })
}

