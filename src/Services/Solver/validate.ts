import { regExps } from "@operations/regExps";

export function validate(input: string): boolean {
    return !regExps.validateRegExp.exec(input);
}