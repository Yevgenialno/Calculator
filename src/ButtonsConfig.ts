import { CalculatorClickEvent } from "CalculatorClickEvent";
import { CalculatorView } from "View/CalculatorView";
import { DEFAULT_COLUMN_NUMBER, EMPTY_STRING } from "calculatorConstants";

export class ButtonsConfig {
    public readonly handler: (input: HTMLInputElement, event: CalculatorClickEvent) => void;
    public readonly texts: string[];
    public readonly textsToInsert: string[];
    public readonly divId: string;
    public readonly columnCount: number = DEFAULT_COLUMN_NUMBER;
    public readonly class: string = EMPTY_STRING;
    
    constructor(handler: (this: CalculatorView, input: HTMLInputElement, 
        event: CalculatorClickEvent) => void, texts: string[], textsToInsert: string[],
        divId: string, columnCount: number = DEFAULT_COLUMN_NUMBER, cssClass: string = EMPTY_STRING) {
        this.handler = handler;
        this.texts = texts;
        this.textsToInsert = textsToInsert;
        this.divId = divId;
        this.class = cssClass;
        this.columnCount = columnCount;
    }
}