/**
 *
 * Prototypes
 *
 */

// A "constructor call" makes an object its own prototype

/**
 *
 * Prototypal class
 *
 */

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

/**
 *
 * Dunder prototypes
 *
 */

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

/**
 *
 * Shadowing prototypes
 *
 */

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

/**
 *
 * Prototypal inheritance
 *
 */

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

/**
 *
 * OLOO (Objects Linked to Other Objects) pattern
 *
 */

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
