class Observer {
    subscribe(target, fn) {
        target.observerList.push(fn);
    }
}

class Subject {
    constructor() {
        this.observerList = [];
    }

    // 触发事件
    fireEvent(data) {
        this.observerList.forEach(item => {
            item(data);
        })
    }
}

const observer = new Observer();
const target = new Subject();

observer.subscribe(target, data => {
    console.log(data);
})

target.fireEvent(1);