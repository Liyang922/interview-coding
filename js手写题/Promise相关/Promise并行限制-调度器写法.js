// 实现一个有并行限制（最多同时运行几个promise）的Promise调度器
class Scheduler {
    constructor() {
        this.queue = [];
        this.maxCount = 2;
        this.runCount = 0;
    }
    // 添加
    add(promiseCreator) {
        this.queue.push(promiseCreator);
    }
    // 执行
    request() {
        if(!this.queue || !this.queue.length || this.runCount >= this.maxCount) {
            return;
        }
        
        this.runCount++;
        this.queue.shift()().then(() => { // 没有错误处理、结果保存
            this.runCount--;
            this.request();
        });
    }

    taskStart() {
        for (let i = 0; i < this.maxCount; i++) {
            this.request();
        }
    }
  }
     
  const timeout = time => new Promise(resolve => {
    setTimeout(resolve, time);
  })
    
  const scheduler = new Scheduler();
    
  const addTask = (time, order) => {
    scheduler.add(() => timeout(time).then(() => console.log(order))) // 闭包order
  }
  
  addTask(1000, '1');
  addTask(500, '2');
  addTask(300, '3');
  addTask(400, '4');

  scheduler.taskStart();
  
  // output: 2 3 1 4    
