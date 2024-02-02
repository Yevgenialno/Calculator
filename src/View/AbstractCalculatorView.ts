import { CalculatorPublisher } from "./CalculatorPublisher";
import { ICalculatorView } from "./ICalculatorView";

export type AbstractCalculatorView = CalculatorPublisher & ICalculatorView;