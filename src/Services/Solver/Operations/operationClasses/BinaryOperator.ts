import { KEYS_PARAMETER, NUMBER_REGEX_STRING } from "calculatorConstants";
import { Operation } from "./Operation";
import { OperationTypes } from "./OperationTypes";
import { operations } from "../operation.config";

export class BinaryOperator extends Operation {
    public readonly type: OperationTypes = OperationTypes.BINARY_OPERATOR;

    public constructor(key: string, operation: (parameters: number[]) => number, priority: number) {
        super(key, operation, priority);
    }

    protected extractParameters(match: RegExpMatchArray): number[] {
        return [+match.groups.n1, +match.groups.n2];
    }

    protected getTemplate(): string {
        const morePriorOperations: Operation[] = operations.filter((op: Operation) => op.priority > this.priority);
        const morePriorOperationsJoined: string = Operation.joinByPipe(morePriorOperations);
        return `(?<![${morePriorOperationsJoined}\\d]\\s*)(?<n1>${NUMBER_REGEX_STRING})(?<operation>${KEYS_PARAMETER})(?<n2>${NUMBER_REGEX_STRING})(?!\\s*[\\d${morePriorOperationsJoined}])`;
    }
}