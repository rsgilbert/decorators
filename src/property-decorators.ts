import 'reflect-metadata'
const formatMetadataKey = Symbol('format')

function format(formatString: string) {
    console.log('format():', formatString)
    return Reflect.metadata(formatMetadataKey, formatString)
}

function getFormat(target: any, propertyKey: string) {
    console.log('getFormat()', target, propertyKey)
    return Reflect.getMetadata(formatMetadataKey, target, propertyKey)
}

class Greeter2 {
    @format('Hey %s')
    greeting: string 

    constructor(message: string) {
        console.log('message is', message)
        this.greeting = message
    }

    greet() {
        let formatString = getFormat(this,'greeting')
        console.log({ formatString })
        return formatString.replace('%s', this.greeting)
    }
}



const g = new Greeter2('Teletubies are single')
console.log(g.greet())