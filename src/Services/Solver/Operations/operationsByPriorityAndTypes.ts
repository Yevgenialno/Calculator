import { operations } from "./operation.config";
import { Operation } from "./operationClasses/Operation";
import { groupBy } from "./utilMethods/groupBy";
import { mapObject } from "./utilMethods/mapObject";

export const operationsByPriorityAndTypes: { [priority: number]: { [type: string]: Operation[] } } =
    mapObject(groupBy(operations, (op: Operation) => op.priority), 
        (ops: Operation[]) => groupBy(ops, ((op: Operation) => op.type)));