var addStrings = function(num1, num2) {
  // 补零位数相等
  while(num1.length < num2.length) {
      num1 = '0' + num1;
  }
  while(num2.length < num1.length) {
      num2 = '0' + num2;
  }
  
  let n = num1.length;
  let flag = 0;
  let res = [];

  for(let i = n-1; i >= 0; i--) {
      let tmp = Number(num1[i]) + Number(num2[i]) + flag;
      flag = flag >= 10 ? 1 : 0;
      res.push(tmp - flag * 10);
  }

  if(flag != 0) res.push(1);
  return res.reverse().join("");
};

let num1 = "456";
let num2 = "77";
console.log(addStrings(num1, num2));
