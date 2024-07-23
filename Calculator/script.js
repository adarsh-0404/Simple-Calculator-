document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    let currentInput = '';
    let operator = '';
    let firstOperand = null;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');
            const type = button.getAttribute('data-type');

            if (value === 'C') {
                currentInput = '';
                operator = '';
                firstOperand = null;
                display.textContent = '0';
                return;
            }

            if (value === '=') {
                if (firstOperand !== null && operator !== '' && currentInput !== '') {
                    const result = calculate(firstOperand, parseFloat(currentInput), operator);
                    display.textContent = result;
                    currentInput = result.toString();
                    firstOperand = null;
                    operator = '';
                }
                return;
            }

            if (type === 'operator') {
                if (firstOperand === null) {
                    firstOperand = parseFloat(currentInput);
                } else if (currentInput !== '') {
                    firstOperand = calculate(firstOperand, parseFloat(currentInput), operator);
                    display.textContent = firstOperand;
                }
                operator = value;
                currentInput = '';
                return;
            }

            currentInput += value;
            display.textContent = currentInput;
        });
    });

    function calculate(a, b, operator) {
        switch (operator) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case '*':
                return a * b;
            case '/':
                return a / b;
            default:
                return b;
        }
    }
});
