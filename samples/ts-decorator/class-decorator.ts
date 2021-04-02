function sealed(constructor: Function) {
  Object.seal(constructor); // Prevents the modification of attributes of existing properties, and prevents the addition of new properties.
  Object.seal(constructor.prototype);
}

@sealed
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message
    }
    greet() {
        return 'Hello,' + this.greeting
    }
}


// 下面是一个重载构造函数的例子
function classDecorator<T extends { new(...args:any[]): {}}>(constructor: T) {
    return class extends constructor {
        newProperty = 'new property';
        hello = 'override';
    }
}


@classDecorator
class Greeter1 {
    property = 'property'
    hello: string
    constructor(m: string) {
        this.hello = m
    }
}

console.log(new Greeter1('world'))

/**  打印结果如下:
class_1 {
  property: 'property',
  hello: 'override',
  newProperty: 'new property'
}
 */