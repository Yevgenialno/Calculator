export function endsWithNumberWithoutDot(input: string): boolean {
    return !/\.\d*$/.exec(input);
}