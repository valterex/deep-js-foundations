# Deep Javascript Foundations

Partial notes on the course [Deep Javascript Foundations](https://frontendmasters.com/courses/deep-javascript-v3/) by [Kyle Simpson](https://github.com/getify).

## Contents

- [Intro](#intro)
- [Types](#types)
- [Coercion](#coercion)
- [Equality](#equality)
- [Scope](#scope)
- [Scope & function expressions](#scope-&-function-expressions)
- [Advanced scope](#advanced-scope)
- [Closure](#closure)
- [Objects](#objects)
- [Prototypes](#prototypes)

## Intro

Algorithm of ++ operation

```javascript
function plusPlus(originalValue) {
  var coercedValue = Number(originalValue);
  y = coercedValue + 1;

  return coercedValue;
}

var y = "5";

console.log(plusPlus(y)); // 5
console.log(y); // 6
```

## Types

### `typeof`

`typeof` operator always returns a "string"

```javascript
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
```

### BigInt

```javascript
var x = 42n;
typeof x; // "bigint"
```

### NaN & isNaN

It is not not-number, it is an invalid number.

```javascript
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
```

### Negative zero

```js
var trendRate = -0;
trendRate === -0; // true

trendRate.toString(); // "0"
trendRate === 0; // true
trendRate < 0; // false
trendRate > 0; // false

// Check whether two values are the same value
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is

Object.is(trendRate, -0); // true
Object.is(trendRate, 0); // false

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sign
Math.sign(-3); // -1
Math.sign(3); // 1
Math.sign(-0); // -0 ???
Math.sign(0); // 0 ???
```

Fix Math.sign:

```javascript
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
```

### Fundamental objects

When to use `new` keyword:

```js
Object();
Array();
Function();
Date();
RegExp();
Error();
```

When not to use `new` keyword?

```js
String();
Number();
Boolean();
```

### Coercion

Algorithms in JS are largely recursive.

#### `toString()`

```javascript
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
```

#### `Number`

```javascript
var num1 = "";
Number(num1); // 0

var num2 = " 009 ";
Number(num2); // 9

var num3 = null;
Number(num3); // 0

var num4 = undefined;
Number(num4); // NaN
```

#### Cases of coercion

```javascript
var num = 16;

// Implicit coercion
console.log(`There are ${num} dwarves in the garden`);
// 'There are 16 dwarves in the garden'

// Explicit coercion
console.log(`There are ${String(num)} dwarves in the garden`);
```

### Equality

- `==` allows coercion (types are different)
- `===` disallows coercion (types are same)

Coercive equality prefers numeric comparison.

Avoid:

- `==` with `0` or `""` (or even `" "`)
- `==` with non-primitives
- `== true` or `== false` (allow `ToBoolean` or use `===`)

If you know the types, it's ok to use `==`.

### Scope

- scope = where to look for things
- Javascript organizes scopes with functions and blocks (ES6).

```javascript
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
```

1. `ask()`
2. asks global scope for identifier called `ask()`
3. `()` of `ask()` executes the function
4. `var question` - target reference for identifier `question`
5. `console.log(question)` - asks scope of function `ask()` for identifier question

#### Dynamic global variables

```javascript
var teacher = "Kyle";

function otherClass() {
  teacher = "Suzy";
  topic = "React"; // Creates an auto-global declaration dynamically at runtime
  console.log("Welcome");
}

otherClass();

teacher; // Suzy, reassigned at line 36
topic; // React
```

#### Strict mode

```javascript
("use strict");

var teacher = "Kyle";

function otherClass() {
  teacher = "Suzy";
  topic = "React"; // ReferenceError: topic is not defined

  console.log("Welcome");
}

otherClass();
```

#### Nested scope

```javascript
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
```

### Scope & function expressions

#### Function declaration and expression

```javascript
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
```

- Prefer named function expressions because:
- Reliable function self-reference
- More debuggable stack traces
- More self-documenting code

#### Arrow functions

```javascript
var ids = people.map((person) => person.id);

var ids = people.map(function getId(person) {
  return person.id;
});
```

Choose:

1. named function declaration _over_
2. named function expression _over_
3. anonymous function expression.

### Advanced scope

#### Lexical scope

Think of lexical scope in terms of the compiler. Decided at compile time, not run time.

#### Function scoping

- Use the defensive approach of "minimum exposure"
- Hide things from the global scope as much as possible

#### IIFE

```javascript
var teacher = "Kyle";

(function anotherTeacher() {
  var teacher = "Suzy";
  console.log(teacher); // Suzy
})();

console.log(teacher); // Kyle
```

#### Block scoping

```javascript
var teacher = "Kyle";

{
  let teacher = "Suzy";
  console.log(teacher); // Suzy
}

console.log(teacher); // Kyle
```

#### `let` and `var`

```javascript
function repeat(fn, n) {
  var result; // Used in the entire function scope

  // let used for localized usage
  for (let i = 0; i < n; i++) {
    result = fn(result, i);
  }

  return result;
}
```

#### const

```javascript
const myTeacher = teacher;
myTeacher = "Suzy"; // TypeError

const teachers = ["Kyle", "Suzy"];
teachers[1] = "Brian";
teachers; // [ 'Kyle', 'Brian' ]
```

#### Hoisting

```javascript
// Variable hoisting is usually bad
teacher = "Kyle";
var teacher;

// Function hoisting is pretty useful
getTeacher();

function getTeacher() {
  return teacher;
}
```

### Closure

_Closure is when a function "remembers" its lexical scope even when the function is executed outside that lexical scope._

```javascript
function ask(question) {
  return function holdYourQuestion() {
    console.log(question);
  };
}

var myQuestion = ask("What is a closure?");

myQuestion(); // What is a closure?
```

You close over variables, not values - preserves access to variables.

```javascript
var teacher = "Kyle";

var myTeacher = function () {
  console.log(teacher); // "Suzy"
};

teacher = "Suzy";

myTeacher(); // "Suzy"
```

#### Module pattern

Module pattern requires encapsulation. You can't have a module without closure.

```javascript
var workshop = (function Module(teacher) {
  var publicAPI = { ask };
  return publicAPI;

  function ask(question) {
    console.log(teacher, question);
  }
})("Kyle");

workshop.ask("It's a module, right?");
// 'Kyle' 'It\'s a module, right?'
```

#### ES6 modules

```javascript
var teacher = "Kyle";

export default function ask(question) {
  console.log(teacher, question);
}
```

#### ES6 module syntax

```javascript
// workshop.mjs

var teacher = "Kyle";

export default function ask(question) {
  console.log(teacher, question);
}
```

```javascript
import ask from "workshop.mjs";

ask("It's a default import, right");
// 'Kyle' 'It\'s a default import, right?'
```

```javascript
import * as workshop from "workshop.mjs";

workshop.ask("It's a namespace import, right?");
// 'Kyle' 'It\'s a namespace import, right?'
```

### Objects

#### `this`

A function's `this` references the execution context for that call, determined entirely by how the function was called.

```javascript
function ask(question) {
  console.log(this.teacher, question);
}

function otherClass() {
  var myContext = {
    teacher: "Suzy",
  };

  ask.call(myContext, "Why?");
}

otherClass(); // 'Suzy' 'Why?'
```

#### Implicit & explicit binding

```javascript
// Implicit binding

var workshop = {
  teacher: "Kyle",

  ask(question) {
    console.log(this.teacher, question);
  },
};

workshop.ask("What is implicit binding?"); // 'Kyle' 'What is implicit binding?'

function ask(question) {
  console.log(this.teacher, question);
}

var workshop1 = {
  teacher: "Kyle",
  ask: ask,
};

var workshop2 = {
  teacher: "Suzy",
  ask: ask,
};

workshop1.ask("How do I share a method?"); // 'Kyle' 'How do I share a method?'
workshop2.ask("How do I share a method?"); // 'Suzy' 'How do I share a method?'
```

```javascript
// Explicit binding

function ask(question) {
  console.log(this.teacher, question);
}

var workshop1 = {
  teacher: "Kyle",
  ask: ask,
};

var workshop2 = {
  teacher: "Suzy",
  ask: ask,
};

ask.call(workshop1, "How do I share a method?"); // 'Kyle' 'How do I share a method?'

ask.call(workshop2, "How do I share a method?"); // 'Suzy' 'How do I share a method?'
```

```javascript
// Hard binding

var workshop = {
  teacher: "Kyle",

  ask(question) {
    console.log(this.teacher, question);
  },
};

setTimeout(workshop.ask, 10, "Lost this?");
// undefined 'Lost this?'

setTimeout(workshop.ask.bind(workshop), 10, "Hard bound this?");
// 'Kyle' 'Hard bound this?'
```

#### Arrow functions & lexical `this`

An arrow function is `this`-bound aka `.bind()` to its parent function.

```javascript
var workshop = {
  teacher: "Kyle",

  ask(question) {
    setTimeout(() => {
      console.log(this.teacher, question);
    }, 100);
  },
};

workshop.ask("Is this lexical 'this'?");
// 'Kyle' 'Is this lexical \'this\'?'
```

#### Resolving this in arrow functions

```javascript
// workshop is not a scope!

var workshop = {
  teacher: "Kyle",

  ask: (question) => {
    console.log(this.teacher, question);
  },
};

workshop.ask("What happened to 'this'?");
// TypeError: Cannot read property 'teacher' of undefined

workshop.ask.call(workshop, "Still no 'this'?");
// TypeError: Cannot read property 'teacher' of undefined
```

Only use arrow functions when you need lexical `this`.

#### ES6 `class` keyword

```javascript
class Workshop {
  constructor(teacher) {
    this.teacher = teacher;
  }

  ask(question) {
    console.log(this.teacher, question);
  }
}

var deepJS = new Workshop("Kyle");
var reactJS = new Workshop("Suzy");

deepJS.ask("Is 'class' a class?");
// 'Kyle' 'Is \'class\' a class?'

reactJS.ask("Is this class OK?");
// 'Suzy' 'Is this class OK?'

class AnotherWorkshop extends Workshop {
  speakUp(msg) {
    this.ask(msg);
  }
}

var JSRecentParts = new AnotherWorkshop("Kyle");

JSRecentParts.speakUp("Are classes getting better?");
// 'Kyle' 'Are classes getting better?'

class AnotherWorkshop1 extends Workshop {
  ask(msg) {
    super.ask(msg.toUpperCase());
  }
}

var JSRecentParts1 = new AnotherWorkshop("Kyle");

JSRecentParts1.ask("Are classes super?");
// 'Kyle' 'Are classes super?'
```

```javascript
class Workshop {
  constructor(teacher) {
    this.teacher = teacher;
  }

  ask(question) {
    console.log(this.teacher, question);
  }
}

var deepJS = new Workshop("Kyle");

setTimeout(deepJS.ask, 100, "Still losing 'this?");
// undefined 'Still losing \'this?'
```

```javascript
class Workshop {
  constructor(teacher) {
    this.teacher = teacher;

    this.ask = (question) => {
      console.log(this.teacher, question);
    };
  }

  ask(question) {
    console.log(this.teacher, question);
  }
}

var deepJS = new Workshop("Kyle");

setTimeout(deepJS.ask, 100, "Is 'this' fixed?");
// 'Kyle' 'Is \'this\' fixed?'
```

### Prototypes

A "constructor call" makes an object its own prototype.

#### Prototypal class

```javascript
function Workshop(teacher) {
  this.teacher = teacher;
}

Workshop.prototype.ask = function (question) {
  console.log(this.teacher, question);
};

var deepJS = new Workshop("Kyle");
var reactJS = new Workshop("Suzy");

deepJS.ask("Is 'prototype' a class?");
// 'Kyle' 'Is \'prototype\' a class?'

reactJS.ask("Isn't 'prototype' ugly?");
// 'Suzy' 'Isn\'t \'prototype\' ugly?'
```

#### Dunder prototypes

```javascript
function Workshop(teacher) {
  this.teacher = teacher;
}

Workshop.prototype.ask = function (question) {
  console.log(this.teacher, queueMicrotask);
};

var deepJS = new Workshop("Kyle");

deepJS.constructor === Workshop; // true

deepJS.__proto__ === Workshop.prototype; // true

Object.getPrototypeOf(deepJS) === Workshop.prototype; // true
```

#### Shadowing prototypes

```javascript
function Workshop(teacher) {
  this.teacher = teacher;
}

Workshop.prototype.ask = function (question) {
  console.log(this.teacher, queueMicrotask);
};

var deepJS = new Workshop("Kyle");

deepJS.ask = function (question) {
  this.ask(question.toUpperCase());
};

deepJS.ask("Oops, is this infinite recursion?");
// RangeError: Maximum call stack size exceeded

function Workshop(teacher) {
  this.teacher = teacher;
}

Workshop.prototype.ask = function (question) {
  console.log(this.teacher, question);
};

var deepJS = new Workshop("Kyle");

deepJS.ask = function (question) {
  this.__proto__.ask.call(this, question.toUpperCase());
};

deepJS.ask("Is this fake polymorphism?");
// 'Kyle' 'IS THIS FAKE POLYMORPHISM?'
```

#### Prototypal inheritance

```javascript
function Workshop(teacher) {
  this.teacher = teacher;
}

Workshop.prototype.ask = function (question) {
  console.log(this.teacher, question);
};

function AnotherWorkshop(teacher) {
  Workshop.call(this, teacher);
}

AnotherWorkshop.prototype = Object.create(Workshop.prototype);

AnotherWorkshop.prototype.speakUp = function (msg) {
  this.ask(msg.toUpperCase());
};

var JSRecentParts = new AnotherWorkshop("Kyle");

JSRecentParts.speakUp("Is this actually inheritance?");
// 'Kyle' 'IS THIS ACTUALLY INHERITANCE?'
```

#### OLOO (Objects Linked to Other Objects) pattern

```javascript
// ES6 class pattern
class Workshop {
  constructor(teacher) {
    this.teacher = teacher;
  }

  ask(question) {
    console.log(this.teacher, question);
  }
}

class AnotherWorkshop extends Workshop {
  speakUp(msg) {
    this.ask(msg);
  }
}

var JSRecentParts = new AnotherWorkshop("Kyle");

JSRecentParts.speakUp("Are classes getting better?");

// OLOO pattern
var Workshop = {
  setTeacher(teacher) {
    this.teacher = teacher;
  },

  ask(question) {
    console.log(this.teacher, question);
  },
};

var AnotherWorkshop = Object.assign(Object.create(Workshop), {
  speakUp(msg) {
    this.ask(msg.toUpperCase());
  },
});

var JSRecentParts = Object.create(AnotherWorkshop);

JSRecentParts.setTeacher("Kyle");

JSRecentParts.speakUp("But isn't this cleaner?");
//'Kyle' 'BUT ISN\'T THIS CLEANER?'
```
