class Calculator {
    constructor(previousInputTextElement, currentInputTextElement) {
        this.previousInputTextElement = previousInputTextElement;
        this.currentInputTextElement = currentInputTextElement;
        this.clear()
    }
    clear() {
        this.currentInput = ''
        this.previousInput = ''
        this.operation = undefined
    }
    delete() {
        this.currentInput = this.currentInput.toString().slice(0, -1)

    }
    appendNumber(number) {
        if (number === '.' && this.currentInput.includes('.')) return
        this.currentInput = this.currentInput.toString() + number.toString()
    }
    chooseOperation(operation) {
        if (this.currentInput === '') return
        if (this.previousInput !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousInput = this.currentInput
        this.currentInput = ''
    }
    compute() {
        let computation
        const prev = parseFloat(this.previousInput)
        const current = parseFloat(this.currentInput)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break;
            case '-':
                computation = prev - current
                break;
            case '*':
                computation = prev * current
                break;
            case '/':
                computation = prev / current
                break;

            default:
                return
        }
        this.currentInput = computation
        this.operation = undefined
        this.previousInput = ''
    }
    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentInputTextElement.innerText = this.getDisplayNumber(this.currentInput)
        if (this.operation != null) {
            this.previousInputTextElement.innerText = `
                ${this.getDisplayNumber(this.previousInput)}
                ${this.operation}
                `
        } else {
            this.previousInputTextElement.innerText = ''
        }
    }
}




const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousInputTextElement = document.querySelector('[data-previous-input]');
const currentInputTextElement = document.querySelector('[data-current-input]');

const calculator = new Calculator(previousInputTextElement, currentInputTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})