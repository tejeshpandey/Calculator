document.addEventListener('DOMContentLoaded', function() {
    // Select the display element
    const display = document.getElementById('user-input');

    // Store the current value, previous value, and operation history
    let currentValue = '0';
    let operationHistory = '';

    // Function to update the display
    function updateDisplay() {
        display.textContent = operationHistory;
    }

    // Function to handle number input
    function handleNumber(number) {
        if (currentValue === '0') {
            currentValue = number;
        } else {
            currentValue += number;
        }
        operationHistory += number;
        updateDisplay();
    }

    // Function to handle operator input
    function handleOperator(op) {
        if (currentValue !== '') {
            operationHistory += ` ${op} `;
            currentValue = '';
            updateDisplay();
        }
    }

    // Function to handle the calculation
    function calculate() {
        try {
            let result = eval(operationHistory.replace(/[^-()\d/*+.]/g, ''));
            operationHistory += ` = ${result}`;
            currentValue = result.toString();
            updateDisplay();
            // Reset operationHistory to only show the result
            operationHistory = result.toString();
        } catch (error) {
            display.textContent = "Error";
            currentValue = '';
            operationHistory = '';
        }
    }

    // Function to clear the display and reset values
    function clear() {
        currentValue = '0';
        operationHistory = '';
        updateDisplay();
    }

    // Function to handle delete (DEL) action
    function deleteLast() {
        if (operationHistory.length > 0) {
            operationHistory = operationHistory.slice(0, -1);
            updateDisplay();
        }
    }

    // Add event listeners to the buttons
    document.querySelector('.calc-keys').addEventListener('click', function(event) {
        const target = event.target;

        if (!target.matches('button')) {
            return;
        }

        if (target.classList.contains('numbers')) {
            handleNumber(target.textContent);
        }

        if (target.classList.contains('key-operate')) {
            if (target.textContent === '=') {
                calculate();
            } else {
                handleOperator(target.textContent);
            }
        }

        if (target.textContent === 'AC') {
            clear();
        }

        if (target.textContent === 'DEL') {
            deleteLast();
        }

        if (target.textContent === '%') {
            handleOperator('%');
        }
    });
});
