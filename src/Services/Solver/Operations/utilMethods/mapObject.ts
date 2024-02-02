export function mapObject<T, U>(obj: { [s: string | number]: T },
    mapCallback: (value: T) => U): { [s: string | number]: U } {
    return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [key, mapCallback(value)])
    );
}