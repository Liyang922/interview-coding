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


var s1 = "get-element-by-id"
// 正则
let f = function(s) {
  return s.replace(/-\w/g, function(x) { // -\w只匹配到了首字母！不是\w+
      return x.slice(1).toUpperCase();
  })
}
console.log(f(s1));