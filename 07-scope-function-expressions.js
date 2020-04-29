// Function declaration
function teacher() {}

// Function expression
var myTeacher = function anotherTeacher() {
  console.log(anotherTeacher);
};

console.log(teacher);
console.log(myTeacher);
console.log(anotherTeacher); // ReferenceError

// Anonymous function expression
var anonFooExp = function () {};

// Named function expression
var namedFooExp = function foo() {};

// Prefer named function expressions!
// **********************************
// 1. Reliable function self-reference
// 2. More debuggable stack traces
// 3. More self-documenting code

// Arrow functions
var ids = people.map((person) => person.id);

var ids = people.map(function getId(person) {
  return person.id;
});

// Named function declaration > Named function expression > Anonymous function expression
