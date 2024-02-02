import { operations } from "../operation.config";
import { Operation } from "./Operation";
import { OperationTypes } from "./OperationTypes";
import { KEYS_PARAMETER, NUMBER_REGEX_STRING } from "calculatorConstants";

export class UnaryOperator extends Operation {
    public readonly type: OperationTypes = OperationTypes.UNARY_OPERATOR;

    public constructor(key: string, operation: (parameters: number[]) => number, priority: number) {
        super(key, operation, priority);
    }

    protected extractParameters(match: RegExpMatchArray): number[] {
        return [+match.groups.n];
    }

    protected getTemplate(): string {
        const morePriorOperations: Operation[] = operations.filter((op: Operation) => op.priority > this.priority);
        const morePriorOperationsJoined: string = Operation.joinByPipe(morePriorOperations);
        return `(?<![${morePriorOperationsJoined}\\d]\\s*)(?<n>${NUMBER_REGEX_STRING})(?<operation>${KEYS_PARAMETER})(?!\\s*\\d)`;
    }
}