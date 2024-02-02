import { operations } from "../operation.config";

export const maxPriority: number = Math.max(...operations.map((op) => op.priority));