function add(a, b) {
  return parseFloat((Number(1.0 * a) + Number(1.0 * b)).toFixed(9));
};

function subtract(a, b) {
	return parseFloat((1.0 * a - b).toFixed(9));
};

function multiply(a, b) {
  return parseFloat((1.0 * a * b).toFixed(9));
  /*
    //Array parameter implementation
    return arr.reduce((product, arrValue) => {
    return product * arrValue;
  }, 1)*/
};

function divide(a, b) {
  if (Number(1.0 * b) === 0)
    return 'Cannot divide by 0';
  return parseFloat((1.0 * a / b).toFixed(9));
};

function operate(operator, x, y) { return operator(x, y) };

function activateNumberButtonListeners() {
  numbers.forEach(number => {number.addEventListener('click', displayNumber)});
}

function removeNumberButtonListeners() {
  numbers.forEach(number => {number.removeEventListener('click', displayNumber)});
}

function displayNumber(event) {
  if (divideByZeroFlag) return;

  resetValuesAfterEquals();
  clearsDisplayAfterResult();

  let number = event.target.textContent;
  display.textContent += number;

  countCharactersDisplayed++;
  checkCharactersDisplayedCount();
  
  numberCurrentlyDisplayed = display.textContent;
}

function activatePeriodButtonListener() { period.addEventListener('click', displayPeriod, {once : true}); }

function removePeriodButtonListener() { period.removeEventListener('click', displayPeriod); }

function displayPeriod(event) {
  if (divideByZeroFlag) return;

  resetValuesAfterEquals();
  clearsDisplayAfterResult();

  let period = event.target.textContent;
  display.textContent += period;
  isPeriodUsed = true;

  countCharactersDisplayed++;
  checkCharactersDisplayedCount();

  numberCurrentlyDisplayed = display.textContent;
}

function activatePlusMinusButtonListener() { plusMinus.addEventListener('click', displayMinusSign); }

function displayMinusSign() {
  if (divideByZeroFlag) return;

  resetValuesAfterEquals();
  clearsDisplayAfterResult();
  
  // Other ways of implementing.. Math.sign ... problem is -0 gets treated as 0 (sign === 0)
  const sign = numberCurrentlyDisplayed.charAt(0);
  if (sign === '-') {
    // Other ways of implementing..
    // Math.abs(), n * -1...problem is rounds off digits past long decimal numbers
    numberCurrentlyDisplayed = numberCurrentlyDisplayed.slice(1, numberCurrentlyDisplayed.length);
  } else if (sign !== undefined) {
    const minus = '-';
    numberCurrentlyDisplayed = minus + numberCurrentlyDisplayed;
  }
  display.textContent = numberCurrentlyDisplayed;
}

function resetValuesAfterEquals() {
  if (equalsFlag && result !== undefined && secondOperand === undefined) {
    clearDisplay();
    firstOperand = undefined;
    result = undefined;
    equalsFlag = 0;
  }
}

function clearsDisplayAfterResult() {
  if (result !== undefined && secondOperand === undefined) {
    // helps chaining + = by clearing display & resetting result
    clearDisplay();
    result = undefined;
  }
}

function activateBackspaceButtonListener() { backspace.addEventListener('click', eraseOneCharacter); }

function eraseOneCharacter() {
  if (divideByZeroFlag) return;
  
  if (equalsFlag) return;

  if (numberCurrentlyDisplayed !== undefined && numberCurrentlyDisplayed !== "") {
    const ch = numberCurrentlyDisplayed[numberCurrentlyDisplayed.length - 1];
    numberCurrentlyDisplayed = numberCurrentlyDisplayed.substr(0, numberCurrentlyDisplayed.length - 1);
    if (countCharactersDisplayed === 47) {
      countCharactersDisplayed--;
      activateNumberButtonListeners();
      if (ch == '.')
        activatePeriodButtonListener();
    } else if (ch !== '-') {
      countCharactersDisplayed--;
      if (ch === '.')
        activatePeriodButtonListener();
    }
  }
  display.textContent = numberCurrentlyDisplayed;
}

function activateResetButtonListener() { reset.addEventListener('click', resetDisplay); }

function resetDisplay() {
  display.textContent = "";
  numberCurrentlyDisplayed = "";
  countCharactersDisplayed = 0;
  isPeriodUsed = false;
  
  firstOperand = undefined;
  secondOperand = undefined;
  operation = undefined;
  previousOperation = undefined;
  result = undefined;
  equalsFlag = 0;
  divideByZeroFlag = 0;

  activateNumberButtonListeners();
  activatePeriodButtonListener();
}

function activateClearEntryButtonListener() { clearEntry.addEventListener('click', clearDisplay); }

function clearDisplay() {
  if (divideByZeroFlag) return;

  countCharactersDisplayed = 0;
  numberCurrentlyDisplayed = '';
  isPeriodUsed = false;
  activatePeriodButtonListener();
  activateNumberButtonListeners();

  display.textContent = '';
}

function checkCharactersDisplayedCount() {
  if (countCharactersDisplayed >= 43 && !isPeriodUsed) {
    removeNumberButtonListeners();
    removePeriodButtonListener();
  } else if (countCharactersDisplayed >= 43) {
    removeNumberButtonListeners();
  }
}

function activateOperationButtons() {
  addition.addEventListener('click', updateValues); 
  subtraction.addEventListener('click', updateValues);
  multiplication.addEventListener('click', updateValues);
  division.addEventListener('click', updateValues);
}

function updateValues(event) {
  if (divideByZeroFlag) return;

  let eventType = event.target.textContent;
  switch(eventType) {
    case '+': eventType = add; break;
    case '−': eventType = subtract; break;
    case "×": eventType = multiply; break;
    case '÷': eventType = divide; break;
  }

  if (previousOperation === undefined && operation === undefined) {
    previousOperation = eventType;
  } else if (previousOperation !== undefined && operation === undefined) {
    operation = eventType;
  } else if (previousOperation !== undefined && operation !== undefined) {
    previousOperation = operation;
    operation = eventType;
  }

  let displayValue = numberCurrentlyDisplayed;

  if (equalsFlag) equalsFlag = 0;

  displayValue = convertNANDisplayValueToZero(displayValue);

  if (result !== undefined && secondOperand === undefined) {
    // helps chaining + = by clearing display & resetting result
    clearDisplay();
    result = undefined;

  } else if (firstOperand === undefined) {
    firstOperand = displayValue;
    clearDisplay();

  } else if (firstOperand !== undefined && secondOperand === undefined) {
    secondOperand = displayValue;

    if (operation === divide && secondOperand == 0) {
      display.textContent = 'How can something come from nothing?';
      divideByZeroFlag = 1;
      return;
    }
    
    display.textContent = operate(previousOperation, firstOperand, secondOperand);

    numberCurrentlyDisplayed = display.textContent;
    firstOperand = display.textContent;
    result = display.textContent;
    secondOperand = undefined;
  }
}

function activateEqualsButton() { equals.addEventListener('click', equalsOperation); }

function equalsOperation() {
  if (divideByZeroFlag) return;

  if (equalsFlag) return;

  secondOperand = numberCurrentlyDisplayed;

  secondOperand = convertNANDisplayValueToZero(secondOperand);

  if (firstOperand !== undefined) {
    if (operation === divide && secondOperand == 0) {
      resetDisplay();
      display.textContent = 'Divide by zero, how can something come from nothing?';
      return;
    }

    if (operation === undefined)
      display.textContent = operate(previousOperation, firstOperand, secondOperand);
    else
      display.textContent = operate(operation, firstOperand, secondOperand);

    numberCurrentlyDisplayed = display.textContent;
    firstOperand = display.textContent;
    result = display.textContent;
    secondOperand = undefined;
    
    equalsFlag = 1;
  }
}

function convertNANDisplayValueToZero(value) {
  if (value === '' || value === '.' || value === '-.' || value === '-') {
    value = '0';
    numberCurrentlyDisplayed = '0';
    countCharactersDisplayed = 1;
    display.textContent = '0';
    isPeriodUsed = false;
    activatePeriodButtonListener();
  }
  return value;
}

let countCharactersDisplayed, numberCurrentlyDisplayed, isPeriodUsed, firstOperand, secondOperand,
    operation, previousOperation, result, equalsFlag, divideByZeroFlag;

numberCurrentlyDisplayed = '';
countCharactersDisplayed = 0;
isPeriodUsed = false;

firstOperand = undefined;
secondOperand = undefined;
operation = undefined;
previousOperation = undefined;
result = undefined;
equalsFlag = 0;
divideByZeroFlag = 0;

const numbers = document.querySelectorAll('button.number');
const display = document.querySelector('div.display-container');
const period = document.querySelector('button.period');
const plusMinus = document.querySelector('button.plus-minus');
const backspace = document.querySelector('button.backspace');
const reset = document.querySelector('button.reset');
const clearEntry = document.querySelector('button.clear-entry');
const addition = document.querySelector('button.plus');
const subtraction = document.querySelector('button.subtract');
const multiplication = document.querySelector('button.multiply');
const division = document.querySelector('button.divide');
const equals = document.querySelector('button.equals');

activateNumberButtonListeners();
activatePeriodButtonListener();
activatePlusMinusButtonListener();
activateBackspaceButtonListener();
activateResetButtonListener();
activateClearEntryButtonListener();
activateOperationButtons();
activateEqualsButton();