import { operations } from "../operation.config";

export const minPriority: number = Math.min(...operations.map((op) => op.priority));