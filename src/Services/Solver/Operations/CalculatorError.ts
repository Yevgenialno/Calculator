export class CalculatorError extends Error {
    output: string;

    constructor(description: string) {
        super(description);
        this.output = description;
    }
}