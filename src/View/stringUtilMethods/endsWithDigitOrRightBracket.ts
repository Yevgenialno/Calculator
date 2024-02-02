export function endsWithDigitOrRightBracket(input: string): boolean {
    return Boolean(/[\d\)]$/.exec(input));
}