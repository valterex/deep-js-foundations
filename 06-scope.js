// Scope = where to look for things
// Javascript organizes scopes with functions and blocks (ES6)

var teacher = "Kyle";

function otherClass() {
  var teacher = "Suzy";
  console.log("Welcome"); // console is an "auto-global"
}

function ask() {
  var question = "Why?";
  console.log(question);
}

otherClass(); // Welcome!
ask(); // Why?

// Example
// *************************************
// 1. line 17 - ask()
// 2. asks global scope for identifier called ask() - line 11
// 3. () of ask() executes the function
// 4. line 12 - target reference for identifier question
// 5. line 13 - asks scope of ask for identifier question

/**
 *
 * Dynamic global variables
 *
 */

var teacher = "Kyle";

function otherClass() {
  teacher = "Suzy";
  topic = "React"; // Creates an auto-global declaration dynamically at runtime
  console.log("Welcome");
}

otherClass();

teacher; // Suzy, reassigned at line 36
topic; // React

/**
 *
 * Strict mode
 *
 */

("use strict");

var teacher = "Kyle";

function otherClass() {
  teacher = "Suzy";
  topic = "React"; // ReferenceError: topic is not defined
  console.log("Welcome");
}

otherClass();

/**
 *
 * Nested scope
 *
 */

var teacher = "Kyle";

function otherClass() {
  var teacher = "Suzy";

  function ask(question) {
    console.log(teacher, question);
  }

  ask("Why?");
}

otherClass(); // Suzy Why?
ask("????"); // ReferenceError
