export function setCursorPosition(input: HTMLInputElement, position: number): void {
    input.focus();
    input.setSelectionRange(position, position);
}