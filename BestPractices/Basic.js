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



