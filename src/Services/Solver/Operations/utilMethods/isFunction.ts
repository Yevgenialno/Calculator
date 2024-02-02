import { Operation } from "../operationClasses/Operation";
import { OperationTypes } from "../operationClasses/OperationTypes";

export function isFunction(operation: Operation): boolean {
    return operation.type === OperationTypes.FUNCTION;
}