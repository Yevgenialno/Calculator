import { calculate } from "@services/Solver/calculate";

export class CalculatorController {
    constructor() {}

    calculate(input: string): string {
        return calculate(input);
    }
}