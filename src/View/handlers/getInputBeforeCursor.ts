export function getInputBeforeCursor(input: HTMLInputElement): string {
    return input.value.substring(0, input.selectionStart);
}