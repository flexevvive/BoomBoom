import { BBException } from "./boomboom";
import { Logger } from "./logger";

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
        this.logger.dump("Stack", `${this.stack}`);

        return;
    }
}
