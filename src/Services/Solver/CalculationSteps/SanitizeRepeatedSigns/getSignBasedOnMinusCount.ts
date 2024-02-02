import { symbols } from "symbols.config";

export function getSignBasedOnMinusCount(signSequence: string): string {
    const minusCount: number = (signSequence.match(/-/g) || []).length;
    const sign: string = minusCount % 2 ? symbols.Minus : symbols.Plus;
    return sign;
}