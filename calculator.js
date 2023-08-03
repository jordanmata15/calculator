const OPERATIONS = {
    "+": (a, b) => +a + +b,
    "-": (a, b) => +a - +b,
    "*": (a, b) => +a * +b,
    "/": (a, b) => (+b === 0) ? "REALLY...?" : +a / +b,
    "": () => "ERR!",
}

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
    operator = ""
    result = "";

function operate(left, right, operator) {
    let temp = OPERATIONS[operator](left, right)
    clear();
    result = temp;
    leftOperand = result;
    updateDisplay(result);
}

function changeOperator(newOperator) {
    if (rightOpo)
    operator = newOperator;
}

function appendCharacter(character) {
    let toDisplay = "";
    if (!operator) { // not finished with left operand yet
        // avoid duplicate decimal points
        let isDuplcateDecimal = (leftOperand.slice(-1) === ".") && character === ".";
        leftOperand += isDuplcateDecimal ? "" : character;
        toDisplay = +leftOperand;
    } else {
        let isDuplcateDecimal = (rightOperand.slice(-1) === ".") && character === ".";
        rightOperand += isDuplcateDecimal ? "" : character;
        toDisplay = +rightOperand;
    }

    // converting to numeric with nothing after the decimal gives an error
    if (character === ".") {
        toDisplay = toDisplay + "";
    } 
    updateDisplay(toDisplay);
}

function makeNegative() {
    if (!operator) { // not finished with left operand yet
        leftOperand = +leftOperand*(-1);
    } else {
        rightOperand = +rightOperand*(-1);
    }
    updateDisplay((!operator) ? +leftOperand : +rightOperand);
}

function updateDisplay(newContent) {
    screen.textContent = newContent;
}

function clear() {
    leftOperand = "0";
    rightOperand = "0";
    operator = "";
    result = "";
    updateDisplay(0);
}


function wireUpButtons() {
    operatorButtonList.forEach( button => {
        button.addEventListener("click", () => changeOperator(button.textContent));
    });
    numericButtonList.forEach( button => {
        button.addEventListener("click", () => appendCharacter(button.textContent));
    });
    plusMinusButton.addEventListener("click", () => makeNegative());
    decimalButton.addEventListener("click", () => appendCharacter("."));
    equalsButton.addEventListener("click", () => operate(leftOperand, rightOperand, operator));
    clearButton.addEventListener("click", () => clear());
}

wireUpButtons();