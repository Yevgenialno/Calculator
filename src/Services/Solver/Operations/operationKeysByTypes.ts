import { groupBy } from "./utilMethods/groupBy";
import { operations } from "./operation.config";
import { Operation } from "./operationClasses/Operation";
import { mapObject } from "./utilMethods/mapObject";

export const operationKeysByTypes: { [s: string]: string[] } =
    mapObject(groupBy(operations, (operation: Operation) => operation.type),
        (ops: Operation[]) => ops.map((op: Operation) => op.key));