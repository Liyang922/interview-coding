function makeClosures(arr, fn) {
    let result = [];
    arr.forEach(item => {
        result.push(() => {
            return fn(item);
        });
    });
    return result;
}

var arr = [1,2,3]; 
var fn = function (x) { 
    return x * x; 
}
var result = makeClosures(arr,fn);
console.log(result[1]());
console.log(fn(arr[1]));
// (result[1]() === 4) === (fn(arr[1]) === 4) === true