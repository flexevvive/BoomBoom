export class Types {
    public static isString(s: any): boolean {
        if (!Array.isArray(s) || s.length != 1 || typeof s[0] != "string")
            return false;

        return true;
    }
}
