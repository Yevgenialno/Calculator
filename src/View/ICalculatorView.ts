import { CalculatorModel } from "Model/CalculatorModel";

export interface ICalculatorView {
    updateOutput(model: CalculatorModel): void;

    renderAll(model: CalculatorModel): void;
}