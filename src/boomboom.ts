import { Types } from "./types";
import { Stack } from "./stack";
import { VStack, VariableMap } from "./vstack";
import { Logger } from "./logger";
import { IOBuffer } from "./iobuffer";

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
        const currentMethod = this.map[method];
        this.logger.debug(`Evaluating method '${method}'`);

        for (let instrNum in currentMethod) {
            const instr = currentMethod[instrNum];

            if (Types.isString(instr) || typeof instr == "number") {
                this.logger.debug(`(${method}) Data type found`);

                if (Array.isArray(instr)) {
                    this.stack.push(instr[0]);
                } else {
                    this.stack.push(instr);
                }

                continue;
            }

            if (instr.startsWith(".")) {
                let isConst: boolean, name: string;

                this.logger.debug(`(${method}) Given expression is a pop-expression`);

                if (!(instr.split(".")[1].startsWith("@")))
                    throw new BBException(`Malformed pop-expression (${instr}) in ${method}`);

                if (instr.split(".")[1].split("@")[1].endsWith("#")) {
                    isConst = true;
                    name = instr.split(".")[1].split("@")[1].split("#")[0];
                    this.logger.debug(`(${method}) Popping into constant`);
                } else {
                    isConst = false;
                    name = instr.split(".")[1].split("@")[1];
                }

                this.vstack.set({
                    name: name,
                    value: this.stack.pop(),
                    isConst: isConst
                });

                continue;
            }

            if (!/\s/g.test(instr) && /[a-zA-Z0-9-]/.test(instr)) {
                this.logger.debug(`(${method}) Instruction found`);

                if (instr in this.map) {
                    this.logger.debug(`(${method}) Given method is in map, executing`);

                    this.eval(instr);
                } else {
                    // if (instr == "--boomboom-vstack-dump") {
                    //     this.logger.debug(`(${method}) Dumping vstack`);
                    //     this.vstack.dump();
                    // } else if (instr == "--boomboom-stack-dump") {
                    //     this.logger.debug(`(${method}) Dumping stack`);
                    //     this.stack.dump();

                    // } else
                    //     throw new BBException(`Invalid method (${instr}) in ${method}`);
                    switch (instr) {
                        case "--boomboom-stack-dump":
                            this.logger.debug(`(${method}) Dumping stack`);
                            this.stack.dump();

                            break;

                        case "--boomboom-vstack-dump":
                            this.logger.debug(`(${method}) Dumping vstack`);
                            this.vstack.dump();

                            break;

                        case "puts":
                            IOBuffer.putString(this.stack.pop());

                            break;

                        case "gets":
                            this.stack.push(IOBuffer.getString(this.stack.pop()));

                            break;

                        default:
                            throw new BBException(`Invalid instruction (${instr}) in ${method}`);

                    }
                }

                continue;
            }
        }

        return;
    }

    private hasMain(): boolean {
        return ("--main" in this.map);
    }
}
