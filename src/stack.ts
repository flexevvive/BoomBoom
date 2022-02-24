import { BBException } from "./method";

export class Stack {
    private stack: Array<any>;

    public constructor(stack: Array<any>)  {
        this.stack = stack;

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
        console.log("*** STACK DUMP ***");
        console.log(this.stack);
        console.log("*** END STACK DUMP ***");

        return;
    }
}
