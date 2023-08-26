// 减少小数运算的精度误差问题
// 1.toFixed(n)——对结果进行舍入
// 2.先乘以100或其他，将小数化为整数，结果再除以100
function multiply(a, b) {
    let strA = String(a);
    let strB = String(b);
    let dotIndexA = strA.indexOf(".");
    let dotIndexB = strB.indexOf(".");

    dotIndexA = dotIndexA > 0 ? strA.length - dotIndexA - 1 : 0;
    dotIndexB = dotIndexB > 0 ? strB.length - dotIndexB - 1 : 0;

    return (a * b).toFixed(dotIndexA + dotIndexB);
    
}

console.log(multiply(0.1, 0.0001));