import { KEYS_PARAMETER, NUMBER_REGEX_STRING, WRONG_ARGUMENT_NUMBER } from "calculatorConstants";
import { CalculatorError } from "@operations/CalculatorError";
import { Operation } from "./Operation";
import { OperationTypes } from "./OperationTypes";
import { symbols } from "symbols.config";

export class Function extends Operation {
    private readonly minParameterCount: number;
    private readonly maxParameterCount: number;
    public readonly type: OperationTypes = OperationTypes.FUNCTION;
    protected readonly needsBackSlashInRegExp: boolean = false;

    public constructor(key: string, operation: (parameters: number[]) => number, priority: number, 
        minParameterCount: number, maxParameterCount: number) {
        super(key, operation, priority);
        this.minParameterCount = minParameterCount;
        this.maxParameterCount = maxParameterCount;
    }

    private validateCall(parameters: number[]): boolean {
        return (parameters.length >= this.minParameterCount) && (parameters.length <= this.maxParameterCount)
    }

    protected extractParameters(match: RegExpMatchArray): number[] {
        const parameters: number[] = (match.groups.parameters ? match.groups.parameters.split(symbols.Coma) : []).map((p: string): number => +p);
        if (this.validateCall(parameters)) {
            return parameters;
        }

        throw new CalculatorError(this.key + WRONG_ARGUMENT_NUMBER);
    }

    protected getTemplate(): string {
        return `(?<!\\d)(?<operation>${KEYS_PARAMETER})\\s*\\((?<parameters>((${NUMBER_REGEX_STRING})(,${NUMBER_REGEX_STRING})*)?)\\)(?!\\d)`;
    }
}