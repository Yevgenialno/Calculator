import { CalculatorButton } from "View/CalculatorButton"

export type CalculatorClickEvent  = MouseEvent & { target: CalculatorButton };