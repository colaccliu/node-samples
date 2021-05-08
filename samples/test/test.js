class A {
    name = 'cola'

    getName() {
        console.log('我是function',this.name)
    }
}


// console.log(new A().name)
// new A().getName()


function test(x) {
    console.log(this.x)
}
x = 'cola'

test('123')


