import readlineSync from "readline-sync";

export class IOBuffer {
    public static putString(s: string): void {
        console.log(s);

        return;
    }

    public static getString(s: string): string {
        return readlineSync.question(s);
    }
}
