import { Operation } from "./operationClasses/Operation";
import { OperationTypes } from "./operationClasses/OperationTypes";
import { operationsByPriorityAndTypes } from "./operationsByPriorityAndTypes";
import { operationRegExps } from "./operationsRegExps";

export function applyOperations(input: string, priority: number, type: OperationTypes): string {
    const regExp = operationRegExps[priority][type];
    for (const match of input.matchAll(regExp)) {
        const operations: Operation[] = operationsByPriorityAndTypes[priority][type];
        const result: number = Operation.calculateMatchedFragment(match, operations);
        input = input.replace(match[0], result.toString());
    }

    return input;
}