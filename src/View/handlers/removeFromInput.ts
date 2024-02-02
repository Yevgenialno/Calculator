import { setCursorPosition } from "./setCursorPosition";

export function removeFromInput(input: HTMLInputElement, count: number): void {
    const start: number = input.selectionStart;
    input.value = input.value.substring(0, start - count) +
        input.value.substring(start, input.value.length);
    setCursorPosition(input, Math.max(start - count, 0));
}