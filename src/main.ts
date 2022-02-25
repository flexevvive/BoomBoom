import { BBException, BoomBoom } from "./boomboom";
import chalk from "chalk";

try {
    const bb = new BoomBoom({
        "flex": [["HELLO, WORLD"], "--boomboom-stack-dump"],
        "--main": [["Welcome to FLEX!"], "flex"]
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
