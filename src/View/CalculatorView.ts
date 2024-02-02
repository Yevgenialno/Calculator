import { CalculatorPublisher } from "./CalculatorPublisher";
import { ICalculatorView } from "./ICalculatorView";
import { CALCULATE_BUTTON, CLICK, DEFAULT_COLUMN_NUMBER, EMPTY_STRING, 
    HTML_SPACE, INPUT_ACCESS_KEY, KEYPRESS } from "calculatorConstants";
import { buttonsConfigs } from "buttons.config";
import { CalculatorButton } from "./CalculatorButton";
import { ButtonsChunk } from "./ButtonsChunk";
import { CalculatorModel } from "Model/CalculatorModel";
import { ButtonsConfig } from "ButtonsConfig";
import { CalculatorClickEvent } from "CalculatorClickEvent";
import { divIds } from "enums/DivIds";
import { HtmlTags } from "enums/HtmlTags";

export class CalculatorView extends CalculatorPublisher implements ICalculatorView {
    input: HTMLInputElement;
    output: HTMLSpanElement;
    buttonsChunks: { [s: string]: ButtonsChunk } = {};

    constructor() {
        super();
        this.input = this.createInput();
        this.output = CalculatorView.createOutput();
        this.fillButtonsFromConfig();
    }

    public updateOutput(model: CalculatorModel): void {
        this.renderOutput(model.output);
    }

    public renderAll(model: CalculatorModel): void {
        this.renderInput(model.input);
        this.renderOutput(model.output);
        for (const [divId, divButtons] of Object.entries(this.buttonsChunks)) {
            CalculatorView.renderButtons(divButtons.buttons, divId, divButtons.columnCount);
        }
    }

    // filling view instance
    private fillButtonsFromConfig(): void {
        for (const btnConfig of buttonsConfigs) {
            this.addButtons(btnConfig);
        }
    }

    private addButtons(btnConfig: ButtonsConfig): void {
        let newButtons: CalculatorButton[] = CalculatorView.createButtons(btnConfig);
        this.bindButtons(newButtons, btnConfig.handler);
        if (this.buttonsChunks[btnConfig.divId]) {
            this.buttonsChunks[btnConfig.divId].addButtons(newButtons);
        } else {
            this.buttonsChunks[btnConfig.divId] = new ButtonsChunk(newButtons, btnConfig.columnCount);
        }
    }

    // elements creation
    private createInput(): HTMLInputElement {
        let inputField: HTMLInputElement = document.createElement(HtmlTags.INPUT);
        inputField.accessKey = INPUT_ACCESS_KEY;
        inputField.addEventListener(KEYPRESS, (event: KeyboardEvent) => {
            if (event.key === CALCULATE_BUTTON) {
                event.preventDefault();
                this.notifyEqualityClicked(this.input.value);
            }
        })
        return inputField;
    }

    private static createOutput(): HTMLSpanElement {
        let outputField: HTMLSpanElement = document.createElement(HtmlTags.SPAN);
        return outputField;
    }

    private static createButtons(btnConfig: ButtonsConfig): CalculatorButton[] {
        let buttons: CalculatorButton[] = [];
        btnConfig.texts.forEach((buttonText: string, i: number) => {
            let button: CalculatorButton = CalculatorView.createButton(buttonText, btnConfig.textsToInsert?.[i], btnConfig.class);
            buttons.push(button);
        });

        return buttons;
    }

    private static createButton(buttonText: string, textToInsert: string, buttonClass: string): CalculatorButton {
        return Object.assign(document.createElement(HtmlTags.BUTTON), {
            textToInsert: textToInsert,
            innerHTML: buttonText,
            className: buttonClass,
        });
    }

    // buttons binding
    private bindButtons(buttons: CalculatorButton[],
        handler: (this: CalculatorView, input: HTMLInputElement, event: CalculatorClickEvent) => void): void {
        for (let i: number = 0; i < buttons.length; i++) {
            buttons[i].addEventListener(CLICK, handler.bind(this, this.input));
        }
    }

    private renderInput(input: string): void {
        let div = document.getElementById(divIds.INPUT);
        this.input.value = input;
        div.append(this.input);
    }

    private renderOutput(output: string): void {
        let div = document.getElementById(divIds.OUTPUT);
        this.output.innerHTML = output || HTML_SPACE;
        div.append(this.output);
    }

    private static renderButtons(buttons: CalculatorButton[], divId: string, columnCount: number = DEFAULT_COLUMN_NUMBER): void {
        let div = document.getElementById(divId);
        div.innerHTML = EMPTY_STRING;
        let buttonRows = CalculatorView.renderButtonRows(buttons, columnCount);
        for (const node of buttonRows) {
            div.append(node);
        }
    }

    private static renderButtonRows(buttons: CalculatorButton[], columnCount: number): HTMLTableRowElement[] {
        const rowCount: number = CalculatorView.computeRowCount(buttons.length, columnCount);
        let buttonRows: HTMLTableRowElement[] = [];
        for (let i: number = 0; i < rowCount; i++) {
            const rowButtons: CalculatorButton[] = CalculatorView.carveRowButtons(buttons, i, columnCount);
            const row: HTMLTableRowElement = CalculatorView.renderRow(rowButtons);
            buttonRows.push(row);
        }

        return buttonRows;
    }

    private static carveRowButtons(buttons: CalculatorButton[], rowNumber: number, columnCount: number): CalculatorButton[] {
        return buttons.slice(rowNumber * columnCount, Math.min((rowNumber + 1) * columnCount, buttons.length))
    }

    private static renderRow(buttons: CalculatorButton[]): HTMLTableRowElement {
        let row: HTMLTableRowElement = document.createElement(HtmlTags.TABLE_ROW);
        for (const button of buttons) {
            let cell: HTMLTableCellElement = CalculatorView.renderCell(button);
            row.prepend(cell);
        }

        return row;
    }

    private static renderCell(button: CalculatorButton): HTMLTableCellElement {
        let cell: HTMLTableCellElement = document.createElement(HtmlTags.TABLE_CELL);
        cell.append(button);
        return cell;
    }

    private static computeRowCount(buttonsCount: number, columnCount: number): number {
        let rowCount: number = Math.floor(buttonsCount / columnCount);
        if (buttonsCount % columnCount !== 0) {
            rowCount++;
        }

        return rowCount;
    }
}