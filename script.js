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

module.exports = {
  add,
  subtract,
  multiply,
  divide,
};
