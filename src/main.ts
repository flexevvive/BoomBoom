import { BBException, BBMethodHandler, BBMethodMap } from "./method";
import chalk from "chalk";

try {
    const bb = new BBMethodHandler({
        "flex": [["HELLO, WORLD"], "--boomboom-stack-dump"],
        "--main": [["Welcome to FLEX!"], "flexo"]
    }, [], {
        flex: {
            isConst: true,
            value: 15
        }
    });
} catch (err) {
    if (err instanceof BBException) {
        console.log(`${chalk.red("ERROR:")} ${err.message}`);
        console.log(`${chalk.red("Aborting")}...`);
    } else throw err;
}
