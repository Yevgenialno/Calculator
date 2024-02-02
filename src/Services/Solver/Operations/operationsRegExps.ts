import { Operation } from "./operationClasses/Operation";
import { operationsByPriorityAndTypes } from "./operationsByPriorityAndTypes"
import { mapObject } from "./utilMethods/mapObject";

export const operationRegExps: {[priority: number]: {[operationType: string]: RegExp}} = 
    mapObject(operationsByPriorityAndTypes, 
        (operationsByTypes) => mapObject(operationsByTypes, Operation.getCommonTemplate));