"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Calculator =
/*#__PURE__*/
function () {
  function Calculator(previousInputTextElement, currentInputTextElement) {
    _classCallCheck(this, Calculator);

    this.previousInputTextElement = previousInputTextElement;
    this.currentInputTextElement = currentInputTextElement;
    this.clear();
  }

  _createClass(Calculator, [{
    key: "clear",
    value: function clear() {
      this.currentInput = '';
      this.previousInput = '';
      this.operation = undefined;
    }
  }, {
    key: "delete",
    value: function _delete() {
      this.currentInput = this.currentInput.toString().slice(0, -1);
    }
  }, {
    key: "appendNumber",
    value: function appendNumber(number) {
      if (number === '.' && this.currentInput.includes('.')) return;
      this.currentInput = this.currentInput.toString() + number.toString();
    }
  }, {
    key: "chooseOperation",
    value: function chooseOperation(operation) {
      if (this.currentInput === '') return;

      if (this.previousInput !== '') {
        this.compute();
      }

      this.operation = operation;
      this.previousInput = this.currentInput;
      this.currentInput = '';
    }
  }, {
    key: "compute",
    value: function compute() {
      var computation;
      var prev = parseFloat(this.previousInput);
      var current = parseFloat(this.currentInput);
      if (isNaN(prev) || isNaN(current)) return;

      switch (this.operation) {
        case '+':
          computation = prev + current;
          break;

        case '-':
          computation = prev - current;
          break;

        case '*':
          computation = prev * current;
          break;

        case '/':
          computation = prev / current;
          break;

        default:
          return;
      }

      this.currentInput = computation;
      this.operation = undefined;
      this.previousInput = '';
    }
  }, {
    key: "getDisplayNumber",
    value: function getDisplayNumber(number) {
      var stringNumber = number.toString();
      var integerDigits = parseFloat(stringNumber.split('.')[0]);
      var decimalDigits = stringNumber.split('.')[1];
      var integerDisplay;

      if (isNaN(integerDigits)) {
        integerDisplay = '';
      } else {
        integerDisplay = integerDigits.toLocaleString('en', {
          maximumFractionDigits: 0
        });
      }

      if (decimalDigits != null) {
        return "".concat(integerDisplay, ".").concat(decimalDigits);
      } else {
        return integerDisplay;
      }
    }
  }, {
    key: "updateDisplay",
    value: function updateDisplay() {
      this.currentInputTextElement.innerText = this.getDisplayNumber(this.currentInput);

      if (this.operation != null) {
        this.previousInputTextElement.innerText = "\n                ".concat(this.getDisplayNumber(this.previousInput), "\n                ").concat(this.operation, "\n                ");
      } else {
        this.previousInputTextElement.innerText = '';
      }
    }
  }]);

  return Calculator;
}();

var numberButtons = document.querySelectorAll('[data-number]');
var operationButtons = document.querySelectorAll('[data-operation]');
var equalsButton = document.querySelector('[data-equals]');
var deleteButton = document.querySelector('[data-delete]');
var allClearButton = document.querySelector('[data-all-clear]');
var previousInputTextElement = document.querySelector('[data-previous-input]');
var currentInputTextElement = document.querySelector('[data-current-input]');
var calculator = new Calculator(previousInputTextElement, currentInputTextElement);
numberButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});
operationButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});
equalsButton.addEventListener('click', function (button) {
  calculator.compute();
  calculator.updateDisplay();
});
allClearButton.addEventListener('click', function (button) {
  calculator.clear();
  calculator.updateDisplay();
});
deleteButton.addEventListener('click', function (button) {
  calculator["delete"]();
  calculator.updateDisplay();
});