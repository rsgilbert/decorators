@sealed
class BugReport {
    type = 'report'
    title: string;

    constructor(t: string) {
        this.title = t;
    }

    print(){
        console.log('*** Printing bug report ***')
        console.log(this.title)
        console.log(this.type)
    }
}


function sealed(constructor: Function) {
    console.log('sealed(): called')
    Object.seal(constructor)
    Object.seal(constructor.prototype)
}

const bugReport = new BugReport('I love movies')
bugReport.print()


function reportableClassDecorator<T extends { new (...args: any[]) : {} }>(constructor: T) {
    return class extends constructor {
        reportingURL = 'http://www.report'
    }
}


@reportableClassDecorator
class AnalysisReport {
    type = 'report'
    title : string;

    constructor(t: string) {
        this.title = t;
    }
}

const a: any = new AnalysisReport('Jackson is good')
console.log(a.title)
console.log(a.reportingURL)