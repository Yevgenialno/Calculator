import { regExps } from "@operations/regExps";
import { getSignBasedOnMinusCount } from "./getSignBasedOnMinusCount";

export function sanitizeRepeatedSigns(input: string): string {
    for (const match of input.matchAll(regExps.signsRegExp)) {
        const sign: string = getSignBasedOnMinusCount(match.groups.signs);
        input = input.replace(match[0], sign);
    }
    
    return input;
}