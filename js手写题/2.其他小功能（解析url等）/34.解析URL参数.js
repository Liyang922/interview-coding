let url = 'http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled';
parseParam(url);

function parseParam(url) {
  const params = url.split('?')[1].split('&');
  const paramsObj = {};
  for(let param of params) {
    let [key, val] = param.split('=');
    val = val == undefined ? true : decodeURIComponent(val); // 未指定值的为true&解码
    // 判断val是否为数字
    val = /^\d+$/.test(val) ? parseFloat(val) : val; // parseFloat
    paramsObj[key] = paramsObj.hasOwnProperty(key) ? [].concat(paramsObj[key], val) : val; // 重复的key保存为数组
    // console.log(paramsObj[key]);
  }
  // console.log(paramsObj);
  return paramsObj;
}

// 正则
// function parseParams(url) {
//   const paramStr = /.+\?(.+)$/.exec(url)[1]; // 捕获组
//   // const paramStr = url.match(/.+\?(.+)$/)[1]; // 捕获组
//   const paramArr = paramStr.split("&");
//   let paramObj = {};
//   paramArr.forEach(param => {
//     if(/=/.test(param)) { // 处理有value的
//     }
//   })
// }