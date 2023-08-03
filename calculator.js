const OPERATIONS = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b,
}

let leftOperand,
    rightOperand,
    operator;

function operate(left, right, operator) {
    return OPERATIONS[operator](left, right);
}