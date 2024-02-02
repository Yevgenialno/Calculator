import { ObjectKey } from "./ObjectKey";

export function groupBy<T>(items: T[], groupingFn: (item: T) => ObjectKey): { [key: ObjectKey]: T[] } {
    return items.reduce((result: { [key: string]: T[] }, element) => {
        const groupKey: ObjectKey = groupingFn(element);
        result[groupKey] = result[groupKey] || [];
        result[groupKey].push(element);
        return result;
    }, Object.create(null));
}