// const { SyncHook } = require('tapable')
const SyncHook = require('./SyncHook')

class Car {
  constructor() {
    this.hooks = {
      brake: new SyncHook(),
    };
  }
  setSpeed(newSpeed) {
    this.hooks.brake.call(newSpeed);
  }
}

const myCar = new Car()

myCar.hooks.brake.tap('LoggerPlugin', newSpeed => console.log(`Accelerating to ${newSpeed}`))
myCar.setSpeed('20')