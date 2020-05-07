/**
 *
 * this
 *
 */

// A function's this references the execution context for that call,
// determined entirely by how the function was called

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

/**
 *
 * Implicit & explicit binding
 *
 */

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

/**
 *
 * Arrow functions & lexical this
 *
 */

// An arrow function is this-bound
// aka .bind() to its parent function

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

/**
 *
 * Resolving this in arrow functions
 *
 */

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

// only use arrow functions when you need lexical this

/**
 *
 * ES6 class keyword
 *
 */

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
