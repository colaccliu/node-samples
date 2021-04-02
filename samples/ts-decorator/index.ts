function greeter(person: string) {
    return 'Hello' + person
}

let user = 'cola'

document.body.innerHTML = greeter(user)

/* tsc ./samples/ts-decorator/index.ts */