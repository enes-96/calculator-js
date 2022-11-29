"use strict";

class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.currentOperand = "";
    console.log(`display is removed`);
    this.previousOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
    console.log(this.currentOperand);
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return console.log("put a number");
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        console.log(computation);
        break;
      case "-":
        computation = prev - current;
        console.log(computation);

        break;
      case "*":
        computation = prev * current;
        console.log(computation);

        break;
      case "÷":
        computation = prev / current;
        console.log(computation);
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(
      this.currentOperand
    );
    this.currentOperandTextElement.style.color = "green";
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = "";
    }
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);
const outputCalc = document.querySelector(".output");

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});

const darkModeIcon = document.querySelector("#dark-mode");

darkModeIcon.style.cursor = "pointer";

darkModeIcon.addEventListener("click", () => {
  darkModeIcon.addEventListener("click", () => {
    if ((equalsButton.style.backgroundColor = "black")) {
      location.reload();
    }
  });
  darkModeIcon.style.fill = "white";
  numberButtons.forEach((button) => {
    button.style.backgroundColor = "black";
    button.addEventListener("mouseover", () => {
      button.style.backgroundColor = "gray";
    });
    button.addEventListener("mouseout", () => {
      button.style.backgroundColor = "black";
    });
  });

  operationButtons.forEach((button) => {
    button.style.backgroundColor = "black";
    button.addEventListener("mouseover", () => {
      button.style.backgroundColor = "gray";
    });
    button.addEventListener("mouseout", () => {
      button.style.backgroundColor = "black";
    });
  });
  equalsButton.addEventListener("mouseover", () => {
    equalsButton.style.backgroundColor = "gray";
  });
  equalsButton.addEventListener("mouseout", () => {
    equalsButton.style.backgroundColor = "black";
  });
  allClearButton.addEventListener("mouseover", () => {
    allClearButton.style.backgroundColor = "gray";
  });
  allClearButton.addEventListener("mouseout", () => {
    allClearButton.style.backgroundColor = "black";
  });
  deleteButton.addEventListener("mouseover", () => {
    deleteButton.style.backgroundColor = "gray";
  });
  deleteButton.addEventListener("mouseout", () => {
    deleteButton.style.backgroundColor = "black";
  });
  deleteButton.style.backgroundColor = "black";
  allClearButton.style.backgroundColor = "black";
  equalsButton.style.backgroundColor = "black";
  outputCalc.style.backgroundColor = "black";
});
