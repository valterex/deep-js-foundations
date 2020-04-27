/**
 *
 * typeof operator
 *
 */

// typeof always returns a "string"

var v;
typeof v; // "undefined"

var v = "1";
typeof v; // "string"

v = 2;
typeof v; // "number"

v = true;
typeof v; // "boolean"

v = {};
typeof v; // "object"

v = Symbol();
typeof v; // "symbol"

typeof doesntExist; // "undefined"

var v = null;
typeof v; // "object"

v = function () {};
typeof v; // "function"

v = [1, 2, 3];
typeof v; // "object"

/**
 *
 * BigInt
 *
 */

var x = 42n;
typeof x; // "bigint"

/**
 *
 * NaN & isNaN
 *
 */

// NaN = it is not not-number, it is invalid number

var myAge = Number("0o46"); // 38
var myNextAge = Number("39"); // 39

var myCatsAge = Number("n/a"); // NaN
myAge - "my sons age"; // NaN

myCatsAge === myCatsAge; // false OOPS

isNaN(myAge); // false
isNaN(myCatsAge); // true
isNaN("my sons age"); // true OOPS

Number.isNaN(myCatsAge); // true
Number.isNaN("my sons age"); // false

/**
 *
 * Negative zero
 *
 */

var trendRate = -0;
trendRate === -0; // true

trendRate.toString(); // "0"
trendRate === 0; // true
trendRate < 0; // false
trendRate > 0; // false

// Best way to check whether two values are the same value
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
Object.is(trendRate, -0); // true
Object.is(trendRate, 0); // false

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sign
Math.sign(-3); // -1
Math.sign(3); // 1
Math.sign(-0); // -0 ???
Math.sign(0); // 0 ???

// Fix Math.sign
function sign(v) {
  return v !== 0 ? Math.sign(v) : Object.is(v, -0) ? -1 : 1;
}

Math.sign(-3); // -1
Math.sign(3); // 1
Math.sign(-0); // -1
Math.sign(0); // 1

function formatTrend(trendRate) {
  var direction = trendRate < 0 || Object.is(trendRate, -0) ? "↓" : "↑";
  return `${direction} ${Math.abs(trendRate)}`;
}

formatTrend(-3); // "↓ 3"
formatTrend(3); // "↑ 3"
formatTrend(-0); // "↓ 0"
formatTrend(0); // "↑ 0"

/**
 *
 * Fundamental objects
 *
 */

// When to use new keyword?
Object();
Array();
Function();
Date();
RegExp();
Error();

// Don't use new keyword
String();
Number();
Boolean();
