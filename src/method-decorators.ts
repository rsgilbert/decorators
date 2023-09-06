class Greeter {
    greeting: string;

    constructor(message: string) {
        this.greeting = message;
    }

    @enumerable(true)
    greet() {
        return 'Hello, ' + this.greeting
    }
}

function enumerable(value: boolean) {
    console.log('enumerable(): value is', value)
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log(target.greet())
        console.log(target)
        console.log(propertyKey)
        console.log(descriptor)
        descriptor.enumerable = value 
    }
}


const greeter = new Greeter('John')
console.log(greeter.greet())