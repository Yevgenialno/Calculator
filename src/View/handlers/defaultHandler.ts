import { insertInInput } from "./insertInInput";
import { CalculatorClickEvent } from "CalculatorClickEvent";

export function defaultHandler(input: HTMLInputElement, event: CalculatorClickEvent): void {
    insertInInput(input, event.target.textToInsert);
}