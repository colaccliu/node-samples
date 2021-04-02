class Greeter2 {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }

  @enumerable(false)
  greet() {
    return "Hello, " + this.greeting;
  }
}


function enumerable(value: boolean) {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      console.log("target-----", target); // { greet: [Function (anonymous)] }
      console.log("propertyKey-----", propertyKey); // greet
      console.log("descriptor-----", descriptor); 
      descriptor.enumerable = value;
    }
}

// 当装饰器 @enumerable(false)被调用时，它会修改属性描述符的enumerable属性。