import { INCORRECT_INPUT } from "calculatorConstants";
import { compute } from "./compute";
import { validate } from "./validate";

export function calculate(input: string): string {
    if (validate(input)) {
        try {
            return compute(input);
        } catch (ex) {
            return ex.output || INCORRECT_INPUT;
        }
    }

    return INCORRECT_INPUT;
}