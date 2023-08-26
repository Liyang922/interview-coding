function captureThreeNumbers(str) {
    // 设置全局标志，则不会返回捕获组，只返回捕获结果
    // 捕获结果是捕获数组或null（不是第一个匹配结果！）
    let result = str.match(/\d{3}/g);
    return result == null ? false : result[0];

    // regexp.exec()会返回捕获组
    // return /\d{3}/.exec(str);
}
console.log(captureThreeNumbers("123456"));