/**
 * 
 * Understanding your code
 * 
 */

// Algorithm of ++ operation
function plusPlus(originalValue) {
    var coercedValue = Number(originalValue);
    y = coercedValue + 1;
    return coercedValue;
}

var y = "5";

console.log(plusPlus(y)); // 5
console.log(y); // 6