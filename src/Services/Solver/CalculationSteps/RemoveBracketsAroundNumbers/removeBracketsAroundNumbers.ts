import { regExps } from "@operations/regExps";

export function removeBracketsAroundNumbers(input: string): string {
    for (const match of input.matchAll(regExps.bracketsRegExp)) {
        input = input.replace(match[0], match.groups.number);
    }
    
    return input;
}