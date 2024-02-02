export function getSymbolBeforeCursor(input: HTMLInputElement): string {
    return input.value[input.selectionStart - 1];
}