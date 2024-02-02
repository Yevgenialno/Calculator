export function endsWithDigit(input: string): boolean {
    return Boolean(/\d$/.exec(input));
}