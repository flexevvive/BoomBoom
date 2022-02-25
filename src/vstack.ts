import { BBException } from "./boomboom";
import { Logger } from "./logger";
import chalk from "chalk";

export interface VariableMap {
    [name: string]: {
        isConst: boolean,
        value: any
    }
}

export class VStack {
    private map: VariableMap;
    private logger: Logger;

    public constructor(variables: VariableMap) {
        this.map = variables;
        this.logger = new Logger("VSTACK");

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
        let formattedStack: string = "";

        if (this.map === {})
            this.logger.dump("VStack", "<EMPTY>");

        for (let v in this.map) {
            const value = this.map[v];

            if (Object.keys(this.map)[0] == v)
                formattedStack += `${chalk.green("|VSTK|")} ${chalk.red(`${v}${(value.isConst) ? "#" : ""}`)}: ${value.value}`;
            else
                formattedStack += `${chalk.green("|VSTK|")} ${chalk.red(`${v}${(value.isConst) ? "#" : ""}`)}: ${value.value}`;

        }

        this.logger.dump("VStack", `${formattedStack}`);

        return;
    }
}
