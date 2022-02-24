import { BBException } from "./method";

export interface VariableMap {
    [name: string]: {
        isConst: boolean,
        value: any
    }
}

export class VStack {
    private map: VariableMap;

    public constructor(variables: VariableMap) {
        this.map = variables;

        return;
    }

    public set(variable: {name: string, isConst: boolean, value: any}): void {
        if (variable.name in this.map && this.map[variable.name].isConst)
            throw new BBException(`Trying to modify constant viable (${variable.name})`);

        this.map[variable.name] = {
            isConst: variable.isConst,
            value: variable.value
        };

        return;
    }

    public get(name: string): {isConst: boolean, value: any} {
        if (!(name in this.map))
            throw new BBException(`Trying to access undefined variable ${name}`)

        return this.map[name];
    }

    public dump(): void {
        console.log("*** VSTACK DUMP ***");
        console.log(this.map);
        console.log("*** END VSTACK DUMP ***");

        return;
    }
}
