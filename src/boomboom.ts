import { Types } from "./types";
import { Stack } from "./stack";
import { VStack, VariableMap } from "./vstack";
import { Logger } from "./logger";

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

export class BoomBoom {
    public map: BBMethodMap;
    public stack: Stack;
    public vstack: VStack;
    private logger: Logger;

    public constructor(map: BBMethodMap, stack: Array<any>, vstack: VariableMap) {
        this.map = map;
        this.stack = new Stack(stack);
        this.vstack = new VStack(vstack);
        this.logger = new Logger("BOOMBOOM");

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
                this.logger.debug("Data type found");

                if (Array.isArray(instr)) {
                    this.stack.push(instr[0]);
                } else {
                    this.stack.push(instr);
                }

                continue;
            }

            if (!/\s/g.test(instr) && /[a-zA-Z0-9z]/.test(instr)) {
                this.logger.debug("Instruction found");

                if (instr in this.map) {
                    this.logger.debug("Given method is in map, executing");

                    this.eval(instr);
                } else {
                    if (instr == "--boomboom-vstack-dump") {
                        this.logger.debug("Dumping vstack");
                        this.vstack.dump();
                    } else if (instr == "--boomboom-stack-dump") {
                        this.logger.debug("Dumping stack");
                        this.stack.dump();
                    } else
                        throw new BBException(`Invalid method (${instr})`);
                }

                continue;
            }

            if (instr.startsWith(".")) {
                this.logger.debug("Given expression is a pop-expression");

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
