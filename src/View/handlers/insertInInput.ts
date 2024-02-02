import { setCursorPosition } from "./setCursorPosition";

export function insertInInput(input: HTMLInputElement, value: string): void {
    const start: number = input.selectionStart;
    input.value = input.value.substring(0, start) +
        value +
        input.value.substring(start, input.value.length);
    setCursorPosition(input, start + value.toString().length);
}