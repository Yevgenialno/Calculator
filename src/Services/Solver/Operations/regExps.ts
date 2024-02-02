import { operations } from "./operation.config";
import { symbols } from "symbols.config";
import { isFunction } from "./utilMethods/isFunction";
import { BACK_SLASH } from "calculatorConstants";

export const regExps: {[s: string]: RegExp} = {
    bracketsRegExp: /(?<![\w\d])\(\s*(?<number>[\+\-]*[\d\.]+)\s*\)(?!\d)/g,
    signsRegExp: /(?<signs>\s*[\+\-]+\s*)/g,
    validateRegExp: new RegExp(`[^${Object.values(symbols).join(BACK_SLASH)}\\d\\w\\${operations.filter((op) => !isFunction(op)).map((op) => op.key).join(BACK_SLASH)}\\s]`),
}