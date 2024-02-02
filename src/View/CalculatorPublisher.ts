import { ICalculatorObserver } from "Model/ICalculatorObserver";

export abstract class CalculatorPublisher {
    subscribers: ICalculatorObserver[];

    constructor() {
        this.subscribers = [];
    }

    public notifyEqualityClicked(input: string): void {
        for (const subscriber of this.subscribers) {
            subscriber.updateOutput(input);
        }
    }

    public addSubscriber(subscriber: ICalculatorObserver): void {
        if (!this.subscribers.includes(subscriber)) {
            this.subscribers.push(subscriber);
        }
    }
}