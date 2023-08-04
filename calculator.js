const OPERATIONS = {
    "+": (a, b) => +a + +b,
    "-": (a, b) => +a - +b,
    "*": (a, b) => +a * +b,
    "/": (a, b) => (+b === 0) ? "REALLY...?" : +a / +b,
    null: () => "ERROR!",
}
const CALCULATION_STEP = {
    INPUT_LEFT: 0,
    OPERAND: 1,
    INPUT_RIGHT: 2,
}
const SCREEN_NUM_SUPPORTED_CHARACTERS = 9;

const screen = document.querySelector(".screen");
const buttons = document.querySelector(".buttons");
const plusMinusButton = buttons.querySelector('.plus-minus');
const decimalButton = buttons.querySelector('.decimal');
const equalsButton = buttons.querySelector('.equals');
const clearButton = buttons.querySelector('.clear');
const operatorButtonList = Array.from(buttons.querySelectorAll('.operator'));
const numericButtonList = Array.from(buttons.querySelectorAll('button.number'))
                                .sort((a,b) => (+a.textContent > +b.textContent) ? 1: -1);

let leftOperand = "",
    rightOperand = "",
    selectedOperator = null
    hasBeenCalculated = false;

function calculate(left, right, operator) {
    if (!left || !right || !operator) {
        updateDisplay("ERROR!");
        return;
    }
    // the result is now the left operand in case of chained calculations
    leftOperand = OPERATIONS[operator](left, right)
    updateDisplay(leftOperand);
    hasBeenCalculated = true;
}

function inputOperator(newOperator) {
    // handle chained calculations
    if (leftOperand && rightOperand && selectedOperator) {
        if (!hasBeenCalculated) {
            calculate(leftOperand, rightOperand, selectedOperator);
        }
        rightOperand = "";
    }
    selectedOperator = newOperator;
    activateButton(decimalButton);
    hasBeenCalculated = false;
}

function inputCharacter(c) {
    if (!doneWithLeftOperand()) {
        leftOperand += c;
        updateDisplay(leftOperand);
    } else {
        rightOperand += c;
        updateDisplay(rightOperand);
    }
    hasBeenCalculated = false;
}

function inputNegative() {
    // If we chain the inputs
    if (!doneWithLeftOperand() || hasBeenCalculated) {
        let terminatingDecimal = endsWithDecimal(leftOperand) ? "." : "";
        leftOperand = +leftOperand*(-1) + terminatingDecimal;
        updateDisplay(leftOperand);
    } else {
        let terminatingDecimal = endsWithDecimal(rightOperand) ? "." : "";
        rightOperand = +rightOperand*(-1) + terminatingDecimal;
        updateDisplay(rightOperand);
    }
}

function activateButton(button) {
    if (button.classList.contains('disabled')) {
        button.classList.remove('disabled');
        button.disabled = false;
    }
}

function deactivateButton(button) {
    if (!button.classList.contains('disabled')) {
        button.classList.add('disabled');
        button.disabled = true;
    }
}

function updateDisplay(newContent) {
    screen.textContent = String(newContent).slice(0, SCREEN_NUM_SUPPORTED_CHARACTERS);
}

function doneWithLeftOperand() {
    return leftOperand && selectedOperator;
}

function endsWithDecimal(number) {
    return String(number).slice(-1) === ".";
}

function clear() {
    leftOperand = "";
    rightOperand = "";
    selectedOperator = null;
    activateButton(decimalButton);
    updateDisplay(0);
}


function wireUpButtons() {
    operatorButtonList.forEach( button => {
        button.addEventListener("click", () => inputOperator(button.textContent));
    });
    numericButtonList.forEach( button => {
        button.addEventListener("click", () => inputCharacter(button.textContent));
    });
    decimalButton.addEventListener("click", () => {
        inputCharacter(decimalButton.textContent);
        deactivateButton(decimalButton);
    });
    plusMinusButton.addEventListener("click", () => inputNegative());
    equalsButton.addEventListener("click", () => calculate(leftOperand, rightOperand, selectedOperator));
    clearButton.addEventListener("click", () => clear());
}

wireUpButtons();