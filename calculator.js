const OPERATIONS = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b,
}

const buttons = document.querySelector(".buttons");
const numericButtonList = Array.from(buttons.querySelectorAll('button.number'))
                                .sort((a,b) => (+a.textContent > +b.textContent) ? 1: -1);
const plusMinusButton = buttons.querySelector('.button-plus-minus');
const decimalButton = buttons.querySelector('.button-decimal');

let leftOperand,
    rightOperand,
    operator;

function operate(left, right, operator) {
    return OPERATIONS[operator](left, right);
}

function wireUpButtons() {
    numericButtonList.forEach( button => {
        button.addEventListener("click", () => console.log(button.textContent));
    });
    plusMinusButton.addEventListener("click", () => console.log(plusMinusButton.textContent));
    decimalButton.addEventListener("click", () => console.log(decimalButton.textContent));
}

wireUpButtons();