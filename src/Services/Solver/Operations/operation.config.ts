import { symbols } from "symbols.config";
import { BinaryOperator } from "./operationClasses/BinaryOperator";
import { Function } from "./operationClasses/Function";
import { Operation } from "./operationClasses/Operation";
import { UnaryOperator } from "./operationClasses/UnaryOperator";

export const operations: Operation[] = [
    new UnaryOperator('!', (parameters) => {
        let result: number = 1;
        for (let i: number = 2; i <= parameters[0]; i++) {
            result *= i;
        }

        return result;
    }, 4),
    new UnaryOperator('$', (parameters) => Math.log10(parameters[0]), 4),
    new Function('sin', (parameters) => Math.sin(parameters[0]), 3, 1, 1),
    new Function('sum', (parameters) => parameters.reduce((acc, val) => acc + Number(val), 0), 3, 1, Infinity),
    new BinaryOperator(symbols.Multtiplication, (parameters) => parameters[0] * parameters[1], 2),
    new BinaryOperator(symbols.Division, (parameters) => parameters[0] / parameters[1], 2),
    new BinaryOperator(symbols.Plus, (parameters) => parameters[0] + parameters[1], 1),
    new BinaryOperator(symbols.Minus, (parameters) => parameters[0] - parameters[1], 1),
]