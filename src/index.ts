import { HtmlElementClickEvent } from "HtmlElementClickEvent";
import { CalculatorController } from "./Controller/CalculatorController";
import { CalculatorModel } from "./Model/CalculatorModel";
import { CalculatorView } from "./View/CalculatorView";
import { CssClasses } from "enums/CssClasses";
import "./calculatorStyles.css";

let calculatorView: CalculatorView = new CalculatorView();
const calculatorController: CalculatorController = new CalculatorController();
let calculatorModel: CalculatorModel = new CalculatorModel(calculatorView, calculatorController);
calculatorView.renderAll(calculatorModel);

window.onclick = function (event: HtmlElementClickEvent): void {
    if (!event.target.classList.contains(CssClasses.DROPDOWN)) {
        let dropdowns: Element[] = Array.from(document.getElementsByClassName(CssClasses.DROPDOWN_CONTENT));
        for (let openDropdown of dropdowns) {
            openDropdown.classList.remove(CssClasses.SHOW_DROPDOWN);
        }
    }
}