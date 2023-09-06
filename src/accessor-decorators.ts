class Point {
    private _x: number;
    private _y: number;

    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    @configurable(false)
    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }
}

function configurable(value: boolean) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log('configurable()')
        console.log('target', target)
        console.log('propertyKey', propertyKey)
        // console.log(descriptor)
        descriptor.configurable = true;
    }
}


const pt = new Point(5, 10)

console.log(pt.x)
console.log(pt.y)
// console.log(Object.keys(pt))
// console.log(Object.values(pt))