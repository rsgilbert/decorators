function first() {
    console.log('first(): factory evaluated')
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log('first(): called')
    }
}

function second() {
    console.log('second(): factory evaluated')
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log('second(): called')
    }
}

class Command {
    @first()
    @second() 
    execute() {
        console.log('Command executed')
    }
}

const cmd = new Command()
cmd.execute()