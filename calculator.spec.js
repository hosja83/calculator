const calculator = require('./script');

describe('add', () => {
	test('adds 0 and 0', () => {
		expect(calculator.add(0,0)).toBe(0);
	});

	test('adds 2 and 2', () => {
		expect(calculator.add(2,2)).toBe(4);
	});

	test('adds positive numbers', () => {
		expect(calculator.add(2,6)).toBe(8);
	});

  test('adds negative and positive number', () => {
		expect(calculator.add(-2,6)).toBe(4);
	});

  test('adds negative and positive number', () => {
		expect(calculator.add(2,-6)).toBe(-4);
	});

  test('adds negative numbers', () => {
		expect(calculator.add(-2,-6)).toBe(-8);
	});  

  test('adds negative decimals', () => {
		expect(calculator.add(-2.9,-6.5)).toBe(-9.4);
	});  

  test('adds negative and positive decimals', () => {
		expect(calculator.add(-2.9, 6.5)).toBe(3.6);
	});  

  test('adds negative numbers', () => {
		expect(calculator.add(2.9,-6.5)).toBe(-3.6);
	});

  test('adds negative numbers', () => {
		expect(calculator.add(2.9,-6.5)).toBe(-3.6);
	});

  test('adds negative numbers', () => {
		expect(calculator.add(2.9,-6.5)).toBe(-3.6);
	});

  test('adds large positive numbers', () => {
		expect(calculator.add(3511658465,543178648424)).toBe(546690306889);
	});

  test('adds large negative numbers', () => {
		expect(calculator.add(-3511658465,-543178648424)).toBe(-546690306889);
	});

  test('adds large negative decimal numbers', () => {
		expect(calculator.add(-3511658465.5135351,-543178648424.54161651)).toBe(-546690306890.05515161);
	});

  test('adds large negative decimal numbers', () => {
		expect(calculator.add(3511658465.5135351,543178648424.54161651)).toBe(546690306890.05515161);
	});

  test('adds large positive decimal numbers', () => {
		expect(calculator.add(0.5341536151451,0.24154515165)).toBe(0.775698767);
	});

  test('adds large negative decimal numbers', () => {
		expect(calculator.add(-0.5341536151451,-0.24154515165)).toBe(-0.775698767);
	});

  test('adds large negative decimal numbers', () => {
		expect(calculator.add(-0.5341536151451,0.24154515165)).toBe(-0.292608463);
	});
});

describe('subtract', () => {
	test('subtracts zero', () => {
		expect(calculator.subtract(10,0)).toBe(10);
	});
  
  test('subtracts 2 positive numbers', () => {
		expect(calculator.subtract(10,4)).toBe(6);
	});

  test('subtracts 2 large positive numbers', () => {
		expect(calculator.subtract(564984165896457,5415616516165)).toBe(559568549380292);
	});

  test('subtracts 2 positive decimal numbers', () => {
		expect(calculator.subtract(10.51616165168,4.131518944652)).toBe(6.384642707);
	});

  test('subtracts 2 large positive decimal numbers', () => {
		expect(calculator.subtract(517751.516165168,31651.13444652)).toBe(486100.381718648);
	});

  test('subtracts 2 large positive decimal numbers', () => {
		expect(calculator.subtract(517751.516165168,31651.13444652)).toBe(486100.381718648);
	});

  test('subtracts zero from negative number', () => {
		expect(calculator.subtract(-10,0)).toBe(-10);
	});
  
  test('subtracts positive and negative numbers', () => {
		expect(calculator.subtract(10,-4)).toBe(14);
	});

  test('subtracts large positive and negative decimal numbers', () => {
		expect(calculator.subtract(-564984165896457,5415616516165)).toBe(-570399782412622);
	});

  test('subtracts 2 negative decimal numbers', () => {
		expect(calculator.subtract(-10.51616165168,-4.131518944652)).toBe(-6.384642707);
	});

  test('subtracts large negative and positive decimal numbers', () => {
		expect(calculator.subtract(-517751.516165168,31651.13444652)).toBe(-549402.650611688);
	});

  test('subtracts large negative and positive decimal numbers', () => {
		expect(calculator.subtract(517751.516165168,-31651.13444652)).toBe(549402.650611688);
	});
});

describe('multiply', () => {
	test('multiplying zeroes', () => {
		expect(calculator.multiply(0, 0)).toBe(0);
	});

	test('multiplying zero by integer', () => {
		expect(calculator.multiply(7, 0)).toBe(0);
	});

	test('positive integer multiplication', () => {
		expect(calculator.multiply(7, 11)).toBe(77);
	});

  test('negative integer multiplication', () => {
		expect(calculator.multiply(-7, 11)).toBe(-77);
	});

  test('negative integer multiplication', () => {
		expect(calculator.multiply(-7, -11)).toBe(77);
	});

  test('negative integer multiplication', () => {
		expect(calculator.multiply(7, -11)).toBe(-77);
	});

	test('decimal positive multiplication', () => {
		expect(calculator.multiply(2, 3.5)).toBe(7);
	});

  test('decimal negative multiplication', () => {
		expect(calculator.multiply(-2, 3.5)).toBe(-7);
	});

  test('decimal negative multiplication', () => {
		expect(calculator.multiply(-3.5, 2)).toBe(-7);
	});

  test('decimal negative multiplication', () => {
		expect(calculator.multiply(-2, -3.5)).toBe(7);
	});

  test('large numbers multiplication', () => {
		expect(calculator.multiply(5631654151, 56)).toBe(315372632456);
	});

  test('large numbers multiplication', () => {
		expect(calculator.multiply(5631654151, -56.5)).toBe(-318188459531.5);
	});
});

describe('divide', () => {
  test('division by zero error', () => {
    expect(calculator.divide(1, 0)).toBe('Cannot divide by 0');
  });

  test('divides two positive integers for positive integer result', () => {
    expect(calculator.divide(10, 2)).toBe(5);
  });

  test('divides two positive integers for positive decimal result', () => {
    expect(calculator.divide(10, 3)).toBe(3.333333333);
  });

  test('divides two positive integers for positive decimal result', () => {
    expect(calculator.divide(2, 9)).toBe(0.222222222);
  });

  test('divides two integers for negative integer result', () => {
    expect(calculator.divide(10, -2)).toBe(-5);
  });

  test('divides two integers for negative decimal result', () => {
    expect(calculator.divide(-10, 3)).toBe(-3.333333333);
  });

  test('divides two positive integers for negative decimal result', () => {
    expect(calculator.divide(-2, 9)).toBe(-0.222222222);
  });

  test('divides two positive integers for very large decimal result', () => {
    expect(calculator.divide(2453243783, 4534534535)).toBe(0.541013364);
  });

  test('divides two integers for very large negative decimal result', () => {
    expect(calculator.divide(-2453243783, 4534534535)).toBe(-0.541013364);
  });

  test('divides two positive integers for very large result', () => {
    expect(calculator.divide(245324163783, 561)).toBe(437297974.657754011);
  });

  test('divides two positive integers for very large result', () => {
    expect(calculator.divide(245324163783, 3)).toBe(81774721261);
  });

  test('divides two positive decimals', () => {
    expect(calculator.divide(3.5, 0.5)).toBe(7);
  });
});