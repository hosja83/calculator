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
  let number = event.target.textContent; // string
  display.textContent += number;

  countCharactersDisplayed++;
  checkCharactersDisplayedCount();
  
  numberCurrentlyDisplayed = display.textContent; // string
}

function activatePeriodButtonListener() { 
  period.addEventListener('click', displayPeriod, {once : true});
}

function removePeriodButtonListener() { period.removeEventListener('click', displayPeriod); }

function displayPeriod(event) {
  let period = event.target.textContent; // string
  display.textContent += period;
  isPeriodUsed = true;

  countCharactersDisplayed++;
  checkCharactersDisplayedCount();

  numberCurrentlyDisplayed = display.textContent; // string
}

function activatePlusMinusButtonListener() {
  plusMinus.addEventListener('click', displayMinusSign);
}

function displayMinusSign() {
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

function activateBackspaceButtonListener() {
  backspace.addEventListener('click', eraseOneCharacter);
}

function eraseOneCharacter() {
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

function activateClearButtonLister() { clear.addEventListener('click', clearDisplay); }

function clearDisplay() {
  display.textContent = "";
  countCharactersDisplayed = 0;
  numberCurrentlyDisplayed = "";

  activateNumberButtonListeners();
  activatePeriodButtonListener();
}

function checkCharactersDisplayedCount() {
  if (countCharactersDisplayed >= 47 && !isPeriodUsed) {
    removeNumberButtonListeners();
    removePeriodButtonListener();
  } else if (countCharactersDisplayed >= 47) {
    removeNumberButtonListeners();
  }
}

let countCharactersDisplayed, numberCurrentlyDisplayed, firstOperand, secondOperand, result, isPeriodUsed;

countCharactersDisplayed = 0;
isPeriodUsed = false;

const numbers = document.querySelectorAll('button.number');
const display = document.querySelector('div.display-container');
const period = document.querySelector('button.period');
const plusMinus = document.querySelector('button.plus-minus');
const backspace = document.querySelector('button.backspace');
const clear = document.querySelector('button.clear');

activateNumberButtonListeners();
activatePeriodButtonListener();
activatePlusMinusButtonListener();
activateBackspaceButtonListener();
activateClearButtonLister();