const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

function MyPromise(fn) {
    const that = this
    this.state = PENDING

    this.value = null

    that.resolvedCallbacks = []
    that.rejectedCallbacks = []


    function resolve(value) {
        if(that.state === PENDING) {
            that.state = RESOLVED
            that.value = value

            that.resolvedCallbacks.map(cb => cb(that.value))
        }
    }
    function reject(value) {
        if(that.state === PENDING) {
            that.state = REJECTED
            that.value = value
            that.rejectedCallbacks.map(cb => cb(that.value))
        }
    }

    try {
        fn(resolve, reject)
    }catch(e){
        reject(e)
    }
}

MyPromise.prototype.then = function(onFulfilled, onRejected){
  const that = this

  // promise值穿透
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v
  onRejected = typeof onRejected === 'function' ? onRejected : e => {throw e}

  // 不考虑链式调用，也就是then没有返回一个新的promise
  if(this.state === PENDING) {
      // 真正的promise的then方法会将回调包装成微任务
      this.resolvedCallbacks.push(onFulfilled)
      this.rejectedCallbacks.push(onRejected)
  }
  if(this.state === RESOLVED) {
      onFulfilled(that.value)
  }
  if(this.state === REJECTED) {
      onRejected(that.value)
  }
}