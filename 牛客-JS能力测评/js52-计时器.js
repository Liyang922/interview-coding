function count(start, end) {
    //嵌套的setTimeout
    let current = start;

    let timerId = setTimeout(function tick() {
        console.log(current);
        if(current < end) {
            timerId = setTimeout(tick, 100);
        }
        current++;
    }, 0);

    return {
        cancel() {
            clearTimeout(timerId);
        }
    }
}

let obj = count(1,6);
// setTimeout(() => {
//     obj.cancel();
// }, 500);


// 嵌套setTimeout——更新timeId（可选），当达到条件时，不再setTimeout
// setInterval——只有一个timeId，达到中止条件时，clearInterval
// 输出内容和timerId都存储在外层函数的作用域里

// setInterval写法
function count(start, end) {
    console.log(start);

    let current = start;
    let timerId = setInterval(function() {
        if(current < end) {
            console.log(++current);
        } else {
            clearInterval(timerId);
        }
    }, 100)
    return {
        cancel() {
            clearTimeout(timerId);
        }
    }
}

function count(start, end) {
    let current = start;
    function go() {
        if(current < end) {
            console.log(++current);
        } else {
            clearInterval(timerId);
        }
    }

    go();
    let timerId = setInterval(go, 100);

    return {
        cancel() {
            clearTimeout(timerId);
        }
    }
}
