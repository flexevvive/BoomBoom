import { Types } from "./types";
import { Stack } from "./stack";
import { VStack, VariableMap } from "./vstack";

export interface BBMethodMap {
    [name: string]: Array<any>;
}

export class BBException {
    public readonly message: string;
    public readonly boomBoom: boolean = true;

    public constructor(message: string) {
        this.message = message;

        return;
    }
}

export class BBMethodHandler {
    public map: BBMethodMap;
    public stack: Stack;
    public vstack: VStack;

    public constructor(map: BBMethodMap, stack: Array<any>, vstack: VariableMap) {
        this.map = map;
        this.stack = new Stack(stack);
        this.vstack = new VStack(vstack);

        if (!this.hasMain())
            throw new BBException("Main method not found, aborting");

        this.eval("--main");
    }

    public eval(method: string): void {
        const mainMethod = this.map[method];

        console.log(mainMethod);

        for (let instrNum in mainMethod) {
            const instr = mainMethod[instrNum];

            if (Types.isString(instr) || typeof instr == "number") {
                console.log("*** DATA TYPE ***");

                if (Array.isArray(instr)) {
                    this.stack.push(instr[0]);
                } else {
                    this.stack.push(instr);
                }

                continue;
            }

            if (!/\s/g.test(instr) && /[a-zA-Z0-9z]/.test(instr)) {
                console.log("*** INSTRUCTION ***");

                if (instr in this.map) {
                    console.log("*** METHOD IN MAP ***");

                    this.eval(instr);
                } else {
                    if (instr == "--boomboom-vstack-dump") {
                        this.vstack.dump();
                    } else if (instr == "--boomboom-stack-dump") {
                        this.stack.dump();
                    } else
                        throw new BBException(`Invalid method (${instr})`);
                }

                continue;
            }

            if (instr.startsWith(".")) {
                console.log("*** POP EXPRESSION ***");

                if (!(!/\s/g.test(instr) && /^.?@[a-zA-Z0-9z]/.test(instr)))
                    throw new BBException(`Malformed pop-expression (${instr})`);

                this.vstack.set({
                    name: instr.split(".")[1].split("@")[1],
                    value: this.stack.pop(),
                    isConst: false
                });
            }

            throw new BBException(`Invalid instruction (${instr})`);
        }

        return;
    }

    private hasMain(): boolean {
        return ("--main" in this.map);
    }
}
