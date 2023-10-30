function add(num1, num2) {
	//num1 小数位的长度
 const num1Digits = (num1.toString().split('.')[1] || '').length;
 //num2 小数位的长度
 const num2Digits = (num2.toString().split('.')[1] || '').length;
 // 取最大的小数位作为10的指数
 const baseNum = Math.pow(10, Math.max(num1Digits, num2Digits));
 // 把小数都转为整数然后再计算
 return (num1 * baseNum + num2 * baseNum) / baseNum;
}