import { symbols } from "./symbols.config";
import { ButtonsConfig } from "./ButtonsConfig";
import { operationKeysByTypes } from "@services/Solver/Operations/operationKeysByTypes";
import { defaultHandler } from "@handlers/defaultHandler";
import { getInputBeforeCursor } from "@handlers/getInputBeforeCursor";
import { insertInInput } from "@handlers/insertInInput";
import { setCursorPosition } from "@handlers/setCursorPosition";
import { getSymbolBeforeCursor } from "@handlers/getSymbolBeforeCursor";
import { removeFromInput } from "@handlers/removeFromInput";
import { moveCursor } from "@handlers/moveCursor";
import { endsWithNumberWithoutDot } from "View/stringUtilMethods/endsWithNumberWithoutDot";
import { endsWithDigit } from "View/stringUtilMethods/endsWithDigit";
import { endsWithDigitOrRightBracket } from "View/stringUtilMethods/endsWithDigitOrRightBracket";
import { OperationTypes } from "@services/Solver/Operations/operationClasses/OperationTypes";
import { EMPTY_STRING, SPACE } from "calculatorConstants";
import { divIds } from "enums/DivIds";
import { CssClasses } from "enums/CssClasses";

export const buttonsConfigs: ButtonsConfig[] = [
    new ButtonsConfig(defaultHandler, [...Array(9).keys()].map(el => String(el + 1)), 
        [...Array(9).keys()].map(el => String(el + 1)), divIds.DIGIT, undefined, CssClasses.DIGIT_BUTTON),

    new ButtonsConfig(defaultHandler, [symbols.Coma], [symbols.Coma + SPACE],
         divIds.DOT, 2, CssClasses.SMALL_BUTTON),

    new ButtonsConfig((input, event) => {
        const currentInput: string = getInputBeforeCursor(input);
        if (endsWithNumberWithoutDot(currentInput)) {
            if (!endsWithDigit(currentInput)) {
                insertInInput(input, '0');
            }

            defaultHandler(input, event);
        }

        setCursorPosition(input, input.selectionStart);
    }, [symbols.Dot], [symbols.Dot], divIds.DOT, 2, CssClasses.SMALL_BUTTON),

    new ButtonsConfig(defaultHandler, ['0'], ['0'], divIds.ZERO, 1, CssClasses.DIGIT_BUTTON),

    new ButtonsConfig(function (input): void {
        this.notifyEqualityClicked(input.value);
        insertInInput(input, EMPTY_STRING);
    }, [symbols.Equal], null, divIds.EQUALITY, 1, CssClasses.EQUALITY_BUTTON),

    new ButtonsConfig(
        (input, event) => {
            const previous: string = getSymbolBeforeCursor(input);
            if (operationKeysByTypes[OperationTypes.BINARY_OPERATOR].includes(previous)) {
                removeFromInput(input, 1);
            }

            defaultHandler(input, event);
        },
        operationKeysByTypes[OperationTypes.BINARY_OPERATOR],
        operationKeysByTypes[OperationTypes.BINARY_OPERATOR], divIds.BINARY_OPERATORS, 1),
    
    new ButtonsConfig(defaultHandler, 
        operationKeysByTypes[OperationTypes.UNARY_OPERATOR], 
        operationKeysByTypes[OperationTypes.UNARY_OPERATOR], divIds.UNARY_OPERATORS, 1),

    new ButtonsConfig(defaultHandler, [symbols.RightBracket], [symbols.RightBracket], divIds.BRACKETS, 2),

    new ButtonsConfig((input, event) => {
        const currentInput: string = getInputBeforeCursor(input);
        if (endsWithDigitOrRightBracket(currentInput)) {
            insertInInput(input, symbols.Multtiplication);
        }

        defaultHandler(input, event);
    }, [symbols.LeftBracket], [symbols.LeftBracket], divIds.BRACKETS, 2),

    new ButtonsConfig((input, event) => {
        removeFromInput(input, 1);
    }, ['CE'], null, divIds.ERASE, 2, CssClasses.ERASE_ONE_BUTTON),

    new ButtonsConfig((input, event) => {
        input.value = EMPTY_STRING;
        input.focus();
    }, ['C'], null, divIds.ERASE, 2, CssClasses.ERASE_ALL_BUTTON),

    new ButtonsConfig(
        (input, event) => {
            const previous: string = getSymbolBeforeCursor(input);
            if (previous && !operationKeysByTypes[OperationTypes.BINARY_OPERATOR].includes(previous) && previous !== symbols.LeftBracket) {
                insertInInput(input, symbols.Multtiplication);
            }

            defaultHandler(input, event);
            insertInInput(input, symbols.LeftBracket + symbols.RightBracket);
            moveCursor(input, -1);
        },
        operationKeysByTypes[OperationTypes.FUNCTION],
        operationKeysByTypes[OperationTypes.FUNCTION], divIds.FUNCTIONS_DROPDOWN, 1),

    new ButtonsConfig((input, event) => {
        document.getElementById(divIds.FUNCTIONS_DROPDOWN).classList.toggle(CssClasses.SHOW_DROPDOWN);
    }, ['functions'], null, divIds.FUNCTIONS, 1, `${CssClasses.DROPDOWN} ${CssClasses.BIG_ELEMENT}`),

    new ButtonsConfig((input, event) => {
        moveCursor(input, 1);
    }, ['->'], null, divIds.ARROWS, 2),

    new ButtonsConfig((input, event) => {
        moveCursor(input, -1);
    }, ['<-'], null, divIds.ARROWS, 2),
]