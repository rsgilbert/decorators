import "reflect-metadata";
const requiredMetadataKey = Symbol("required");

function required(target: Object, propertyKey: string | symbol, parameterIndex: number) {
    let existingRequiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey) || [];
    existingRequiredParameters.push(parameterIndex);
    Reflect.defineMetadata(requiredMetadataKey, existingRequiredParameters, target, propertyKey);
}

function validate(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) {
    let method = descriptor.value!;

    descriptor.value = function () {
        let requiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyName);
        if (requiredParameters) {
            for (let parameterIndex of requiredParameters) {
                if (parameterIndex >= arguments.length || arguments[parameterIndex] === undefined  || arguments[parameterIndex] === null) {
                    throw new Error("Missing required argument.");
                }
            }
        }
        return method.apply(this, arguments);
    };
}


class BugReport2 {
    type = 'report'
    title: string;

    constructor(t: string) {
        this.title = t;
    }


    @validate
    print(@required verbose: boolean) {
        if (verbose) {
            console.log('Verbose flag is on')
            console.log(`type ${this.type}\ntitle: ${this.title}`)
        }
        console.log('*** Printing bug report ***')
        console.log(this.title)
        console.log(this.type)
    }
}


const r = new BugReport2('News incoming today morning')
r.print(true)