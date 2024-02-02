import { BACK_SLASH, EMPTY_STRING, KEYS_PARAMETER, PIPE } from "calculatorConstants";
import { OperationTypes } from "./OperationTypes";

export abstract class Operation {
    public readonly key: string;
    public readonly priority: number;
    protected readonly operation: (parameters: number[]) => number;
    protected readonly needsBackSlashInRegExp: boolean = true;
    
    public constructor(key: string, operation: (parameters: any) => number, priority: number) {
        this.key = key;
        this.operation = operation;
        this.priority = priority;
    }
    
    public abstract readonly type: OperationTypes;
    protected abstract extractParameters(match: RegExpMatchArray): number[];
    protected abstract getTemplate(): string;

    public static getCommonTemplate(operations: Operation[]): RegExp {
        const template: string = operations[0]?.getTemplate();
        const commonTemplate: string = template?.replaceAll(KEYS_PARAMETER, Operation.joinByPipe(operations));
        return new RegExp(commonTemplate || '$^', 'g');
    }

    public static calculateMatchedFragment(match: RegExpMatchArray, operations: Operation[]): number {
        const operationKey: string = match.groups.operation;
        const matchedOperation: Operation = Operation.findOperation(operations, operationKey);
        const parameters: number[] = matchedOperation.extractParameters(match);
        const result: number = matchedOperation.operation(parameters);
        return result; 
    }

    protected static joinByPipe(operations: Operation[]): string {
        const backSlash: string = operations[0]?.needsBackSlashInRegExp ? BACK_SLASH : EMPTY_STRING;
        return backSlash + operations.map((op: Operation) => op.key).join(PIPE + backSlash);
    }

    public static findOperation(operations: Operation[], key: string): Operation {
        return operations.filter((op: Operation) => op.key === key)[0];
    }
}