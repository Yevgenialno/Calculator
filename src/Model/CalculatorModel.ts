import { ICalculatorObserver } from "./ICalculatorObserver";
import { CalculatorController } from "Controller/CalculatorController";
import { AbstractCalculatorView } from "View/AbstractCalculatorView";
import { EMPTY_STRING } from "calculatorConstants";

export class CalculatorModel implements ICalculatorObserver {
    input: string;
    output: string;
    view: AbstractCalculatorView;
    controller: CalculatorController;

    constructor(view: AbstractCalculatorView, controller: CalculatorController) {
        this.input = EMPTY_STRING;
        this.output = EMPTY_STRING;

        this.view = view;
        this.view.addSubscriber(this);
        this.controller = controller;
    }

    updateOutput(input: string): void {
        this.input = input;
        this.output = this.controller.calculate(input);
        this.view.updateOutput(this);
    }
}