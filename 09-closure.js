// Closure is when a function "remembers" its lexical scope
// even when the function is executed outside that lexical scope

function ask(question) {
  return function holdYourQuestion() {
    console.log(question);
  };
}

var myQuestion = ask("What is a closure?");

myQuestion(); // What is a closure?

// You close over variables, not values
// Preserves access to variables

var teacher = "Kyle";

var myTeacher = function () {
  console.log(teacher); // "Suzy"
};

teacher = "Suzy";

myTeacher(); // "Suzy"

/**
 *
 * Module pattern
 *
 */

// Module pattern requires encapsulation
// You can't have a module without closure
var workshop = (function Module(teacher) {
  var publicAPI = { ask };
  return publicAPI;

  // *********************
  function ask(question) {
    console.log(teacher, question);
  }
})("Kyle");

workshop.ask("It's a module, right?");
// 'Kyle' 'It\'s a module, right?'

/**
 *
 * ES6 modules
 *
 */

var teacher = "Kyle";

export default function ask(question) {
  console.log(teacher, question);
}

/**
 *
 * ES6 module syntax
 *
 */

var teacher = "Kyle";

export default function ask(question) {
  console.log(teacher, question);
}

import ask from "workshop.mjs";

ask("It's a default import, right");
// 'Kyle' 'It\'s a default import, right?'

import * as workshop from "workshop.mjs";

workshop.ask("It's a namespace import, right?");
// 'Kyle' 'It\'s a namespace import, right?'
