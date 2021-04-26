class SyncHook {
    //存储
    taps = []
    // 注册
    tap(tapName, fn) {
        this.taps[tapName] = fn
    }
    call() {
        // 对taps中的方法进行遍历
        Object.keys(this.taps).forEach((key) => {
            console.log('tapName is ', key)
            this.taps[key].call();
        })
    }
}

module.exports = SyncHook