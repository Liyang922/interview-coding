// split()写法
let s = "a_b_cdft";
function changeName(s) {
  let strArr = s.split('_');
  for(let i = 1; i < strArr.length; i++) {
    let str = strArr[i];
    str = str[0].toUpperCase() + str.slice(1);
    strArr[i] = str;
  }
  let res = strArr.join("");
  console.log(res);
  return res;
}

changeName(s);

// 正则写法
var s1 = "get-element-by-id"
let f = function(s) {
  return s.replace(/-\w/g, function(x) { // -\w只匹配到了首字母！不是\w+
      return x.slice(1).toUpperCase(); // slice(1)，即去掉匹配结果中的'-'
  })
}
console.log(f(s1));