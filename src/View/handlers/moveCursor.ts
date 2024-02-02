import { setCursorPosition } from "./setCursorPosition";

export function moveCursor(input: HTMLInputElement, step: number): void {
    const start: number = input.selectionStart;
    setCursorPosition(input, start + step);
}