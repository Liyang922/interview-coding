let encodedData = btoa("Hello, world"); // 编码
let decodedData = atob(encodedData);    // 解码
console.log(decodedData); //"Hello, world"