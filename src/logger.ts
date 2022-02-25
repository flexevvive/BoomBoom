import chalk from "chalk";

export class Logger {
    private prefix: string;

    public constructor(prefix: string) {
        this.prefix = prefix;

        return;
    }

    public info(message: string): void {
        console.log("|INFO| " + this.prefix + ": " + message);

        return;
    }

    public warn(message: string): void {
        console.log(chalk.yellow("|WARN| ") + this.prefix + ": " + message);

        return;
    }

    public error(message: string): void {
        console.log(chalk.red("|ERR| ") + this.prefix + ": " + message);

        return;
    }

    public debug(message: string): void {
        console.log(chalk.green("|DBG| ") + this.prefix + ": " + message);

        return;
    }

    public dump(name: string, dump: string): void {
        console.log(chalk.green("|DUMP| ") + name + " dump");
        console.log(dump);
        console.log(chalk.green("|DUMP| ") + "End " + name + " dump");

        return;
    }
}
