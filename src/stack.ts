import { BBException } from "./boomboom";
import { Logger } from "./logger";
import chalk from "chalk";

export class Stack {
    private stack: Array<any>;
    private logger: Logger;

    public constructor(stack: Array<any>)  {
        this.stack = stack;
        this.logger = new Logger("STACK");

        return;
    }

    public push(value: any): void {
        this.stack.push(value);

        return;
    }

    public pop(): any {
        const value = this.stack.pop();

        if (value === undefined)
            throw new BBException(`Stack underflow`);

        return value;
    }

    public flush(): void {
        this.stack = [];

        return;
    }

    public dump(): void {
        let formattedStack: string = "";

        for (let i in this.stack) {
            const value = this.stack[i];

            if (this.stack[0] == this.stack[i])
                formattedStack += `${chalk.green("|STK|")} ${chalk.red(`${i}`)}: ${value}`;
            else
                formattedStack += `\n${chalk.green("|STK|")} ${chalk.red(`${i}`)}: ${value}`;


        }

        this.logger.dump("Stack", `${formattedStack}`);

        return;
    }
}
