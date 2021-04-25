const { SyncHook } = require('tapable')

class Car {
  constructor() {
    this.hooks = {
      brake: new SyncHook(["newSpeed"]),
    };
  }

  setSpeed(newSpeed) {
    this.hooks.brake.call(newSpeed);
  }
}

const myCar = new Car()

// 设计模式，各种解耦
myCar.hooks.brake.tap('LoggerPlugin', newSpeed => console.log(`Accelerating to ${newSpeed}`))
myCar.setSpeed('20')