import { BBException, BoomBoom } from "./boomboom";
import chalk from "chalk";

try {
    const bb = new BoomBoom({
        "--main": [["Hello, World"], "puts", ["What is your name?"], "gets", ".@name#", "--boomboom-vstack-dump"]
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
