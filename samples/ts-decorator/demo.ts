function f() {
     console.log('f(): evaluated')
     return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
         console.log('f(): called')
     }
}

function g() {
    console.log('g(): evaluated')
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log('g(): called')
    }
}

class C {
    @f()
    @g()
    method() {
    }
}

/* tsc --target ES5 --experimentalDecorators ./samples/ts-decorator/demo.ts */
/* θΏεη»ζ */
/** 
    f(): evaluated
    g(): evaluated
    g(): called
    f(): called
*/