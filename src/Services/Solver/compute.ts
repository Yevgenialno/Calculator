import { removeBracketsAroundNumbers } from "./CalculationSteps/RemoveBracketsAroundNumbers/removeBracketsAroundNumbers";
import { sanitizeRepeatedSigns } from "./CalculationSteps/SanitizeRepeatedSigns/sanitizeRepeatedSigns";
import { INCORRECT_INPUT } from "calculatorConstants";
import { operationsByPriorityAndTypes } from "./Operations/operationsByPriorityAndTypes";
import { maxPriority } from "./Operations/utilMethods/maxPriority";
import { minPriority } from "./Operations/utilMethods/minPriority";
import { applyOperations } from "./Operations/applyOperations";
import { OperationTypes } from "./Operations/operationClasses/OperationTypes";

export function compute(input: string): string {
    let result: string = input;
    result = removeBracketsAroundNumbers(result);
    result = sanitizeRepeatedSigns(result);

    for (let priority = maxPriority; priority >= minPriority; priority--) {
        for (const type of Object.keys(operationsByPriorityAndTypes[priority])) {
            result = applyOperations(result, priority, type as OperationTypes);
            if (result !== input) {
                return compute(result);
            }
        }
    }

    return isNaN(+input) ? INCORRECT_INPUT : input;
}