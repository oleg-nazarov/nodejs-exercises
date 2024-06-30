// class decorator
function addAgeProp<T extends { new (...args: any[]): {} }>(value: any ) {
    return (constructor: T) => {
        return class extends constructor {
            age = value;
        }
    }
}

// method decorator
function returnTrue(target: any, propertyName: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    return {
        ...descriptor,
        value: (...args: any[]) => true,
    };
}

// parameters decorator
function logTemp(target: any, propertyName: string, paramIndex: number) {
    const key = `_log_${propertyName}`;
    
    if (!Array.isArray(target[key])) {
        target[key] = [];
    }

    target[key].push(paramIndex);
}
// [note]: in this impl there's no need in 'logParam', so it's only an educational example
function logMethod(target: any, propertyName: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const originalMethos = descriptor.value;
    const key = `_log_${propertyName}`;


    const value = (...args: any[]) => {
        const result = originalMethos(...args);

        if (Array.isArray(target[key])) {
            // for (let i = 0; i < args.length; ++i) {
            const argsText = args.map(a => JSON.stringify(a)).join(',');
            console.log(`Call ${propertyName}: (${argsText}) => ${JSON.stringify(result)}`);
            // }
        }

        return result;
    }
    
    return {
        ...descriptor,
        value,
    };
}

// property decorator
function setMrMrs(target: any, propertyName: string) {
    const key = `_${propertyName}`;
    let _val = target[propertyName];

    function getter() {
        return `Mr/Mrs ${_val}`;
    }
    function setter(val: string) {
        _val = val;
    }

    Object.defineProperty(target, propertyName, {
        get: getter,
        set: setter,
    });
}

@addAgeProp(142)
export class Calculations {
    @setMrMrs
    name: string;

    constructor({ name = "[no name]" }) {
        this.name = name;
    }

    getResult = () => {
        // @ts-ignore
        return this.age + 10;
    }

    @returnTrue
    isValid(pass: string) {
        return pass === "lsdjfkl2j3k431t004lj";
    }

    @logMethod
    getWeatherText(city: string, @logTemp temp: number) {
        return `${city}: ${temp} degree`;
    }
}
