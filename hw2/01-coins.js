/** Exercise 01 - Coins **/

// Add your function here
const calculateChange = (amount) => {
  if (typeof amount !== 'number' || Number.isNaN(amount) || amount < 0) {
    return `$${amount} ===> Error: amount must be valid number`;
  }

  if (amount > 100.0) {
    return `$${amount} ===> Error: the number is too large`;
  }

  if (amount === 0) {
    return `$${amount} ===> $0 penny`;
  }

  let cents = Math.round(amount * 100);

  const coins = new Map();
  const result = [];
  let dollars = 0;
  let quarters = 0;
  let dimes = 0;
  let nickels = 0;
  let pennies = 0;

  while (cents > 0) {
    if (cents >= 100) {
      dollars += 1;
      cents -= 100;
    } else if (cents >= 25) {
      quarters += 1;
      cents -= 25;
    } else if (cents >= 10) {
      dimes += 1;
      cents -= 10;
    } else if (cents >= 5) {
      nickels += 1;
      cents -= 5;
    } else if (cents >= 1) {
      pennies += 1;
      cents -= 1;
    }
  }

  if (dollars > 0) {
    coins.set(dollars === 1 ? 'dollar' : 'dollars', dollars);
  }

  if (quarters > 0) {
    coins.set(quarters === 1 ? 'quarter' : 'quarters', quarters);
  }

  if (dimes > 0) {
    coins.set(dimes === 1 ? 'dime' : 'dimes', dimes);
  }

  if (nickels > 0) {
    coins.set(nickels === 1 ? 'nickel' : 'nickels', nickels);
  }

  if (pennies > 0) {
    coins.set(pennies === 1 ? 'penny' : 'pennies', pennies);
  }

  coins.forEach((val, key) => {
    result.push(`${val} ${key}`);
  });

  return `$${amount} ===> ${result.join(', ')}`;
};

// Sample test cases
console.log(calculateChange(4.62));
// $4.62 ==> 4 dollars, 2 quarters, 1 dime, 2 pennies
console.log(calculateChange(0.16));
// $0.16 ==> 1 dime, 1 nickel, 1 penny
console.log(calculateChange(150.11));
// $150.11 ==> Error: the number is too large

// Add additional test cases here
console.log('========= Edge Case ============');
console.log(calculateChange(100));
console.log(calculateChange(0.99));
console.log(calculateChange(0));
console.log(calculateChange(100.0001));
console.log(calculateChange(-1));
console.log(calculateChange('abc'));
