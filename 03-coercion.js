// Algorithms in JS are largely recursive

/**
 *
 * toString()
 *
 */

var negativeZero = -0;
negativeZero.toString(); // "0"

var x = [];
x.toString(); // ''

var y = ["..."];
y.toString(); // '...'

var z = [null, undefined];
z.toString(); // ','

var obj = {};
obj.toString(); // '[object Object]'

/**
 *
 * toNumber()
 *
 */

var num1 = "";
Number(num1); // 0

var num2 = " 009 ";
Number(num2); // 9

var num3 = null;
Number(num3); // 0

var num4 = undefined;
Number(num4); // NaN

/**
 *
 * Cases of coercion
 *
 */

var num = 16;

// Implicit coercion
console.log(`There are ${num} dwarves in the garden`);
// 'There are 16 dwarves in the garden'

// Explicit coercion
console.log(`There are ${String(num)} dwarves in the garden`);
