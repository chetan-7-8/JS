var x = 10
if (true) {
  var x = 15     // inner declaration overrides declaration in parent scope
  console.log(x) // prints 15
}
console.log(x)   // prints 15

//to overcome this problem we use let and const

let y = 10
if (true) {
  let y = 15       // inner declaration is scoped within the if block
  console.log(y)   // prints 15
}
console.log(y)     // prints 10

//objects

var obj = {
    name: 'Carrot',
    _for: 'Max', // 'for' is a reserved word, use '_for' instead.
    details: {
      color: 'orange',
      size: 12
    }
  };


  obj.details.color; // orange
obj['details']['size']; // 12
 
console.log(obj?.details?.size);
console.log(obj?.details?.age);


//functions

function Person(name, age) {
    this.name = name;
    this.age = age;
  }
  
  // Define an object
  var you = new Person('chetan', 24);
  // We are creating a new person named "You" aged 24.
  console.log(you.name);


  //anonymous function
  var myFunction = function() {
    statements
}

//named function

var myFunction = function namedFunction(){
    statements
}



  //In classic object-oriented programming, objects are collections of data and methods that operate on that data. 
//   JavaScript uses functions as classes.

function makePerson(first, last) {
  return {
    first: first,
    last: last
  };
}
function personFullName(person) {
  return person.first + ' ' + person.last;
}
function personFullNameReversed(person) {
  return person.last + ', ' + person.first;
}

var s = makePerson('Chetan', 'Singh');
console.log(personFullName(s)); 
console.log(personFullNameReversed(s)); 





function makePerson(first, last) {
  return {
    first: first,
    last: last,
    fullName: function() {
      return this.first + ' ' + this.last;
    },
    fullNameReversed: function() {
      return this.last + ', ' + this.first;
    }
  };
}

var s = makePerson('Chetan', 'Singh');
console.log(s.fullName()); 
console.log(s.fullNameReversed());




// Person.prototype is an object shared by all instances of Person
// This is an incredibly powerful tool. JavaScript lets you modify something's prototype at any time in your program, 
// which means you can add extra methods to existing objects at runtime

function Person(first, last) {
  this.first = first;
  this.last = last;
}
Person.prototype.fullName = function() {
  return this.first + ' ' + this.last;
};
Person.prototype.fullNameReversed = function() {
  return this.last + ', ' + this.first;
};

var p = new Person('Zemoso','tech');
console.log(p.fullNameReversed());


console.log(p.toString());

Person.prototype.toString = function() {
  return '<Person: ' + this.fullName() + '>';
}


console.log(p.toString());
