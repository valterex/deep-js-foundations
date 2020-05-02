/**
 *
 * Lexical scope
 *
 */

// Think of lexical scope in terms of the compiler
// Decided at compile time, not run time

var teacher = "Kyle";

function otherClass() {
  var teacher = "Suzy";

  function ask(question) {
    console.log(teacher, question);
  }

  ask("Why");
}

/**
 *
 * Dynamic scope
 *
 */

// Does not exist in Javascript

/**
 *
 * Function scoping
 *
 */

// Use the defensive approach of "minimum exposure"
// Hide things from the global scope as much as possible

/**
 *
 * IIFE
 *
 */

var teacher = "Kyle";

(function anotherTeacher() {
  var teacher = "Suzy";
  console.log(teacher); // Suzy
})();

console.log(teacher); // Kyle

/**
 *
 * Block scoping
 *
 */

var teacher = "Kyle";

{
  let teacher = "Suzy";
  console.log(teacher); // Suzy
}

console.log(teacher); // Kyle

/**
 *
 * let and var
 *
 */

function repeat(fn, n) {
  var result; // used in the entire function scope

  // let for localized usage
  for (let i = 0; i < n; i++) {
    result = fn(result, i);
  }

  return result;
}

/**
 *
 * const
 *
 */

const myTeacher = teacher;
myTeacher = "Suzy"; // TypeError

const teachers = ["Kyle", "Suzy"];
teachers[1] = "Brian";
teachers; // [ 'Kyle', 'Brian' ]

/**
 *
 * Hoisting
 *
 */

// variable hoisting is usually bad
teacher = "Kyle";
var teacher;

// function hoisting is pretty useful
getTeacher();

function getTeacher() {
  return teacher;
}
