import { CalculatorButton } from "./CalculatorButton";

export class ButtonsChunk {
    buttons: CalculatorButton[] = [];
    columnCount: number;

    constructor(buttons: CalculatorButton[], columnCount: number) {
        this.buttons = buttons;
        this.columnCount = columnCount;
    }

    addButtons(newButtons: CalculatorButton[]): void {
        this.buttons = this.buttons.concat(newButtons);
    }
}