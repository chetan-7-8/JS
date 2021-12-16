function sayHello() {
    console.log('Hello!');
    return function(){
        console.log("hello from nested function")
    }
  }
  
  // do this - reference the function by its name:
  setTimeout(sayHello, 3000)
  // => Hello! is logged after three seconds.
  
  // don't do this - invoke the function in place:
  setTimeout(sayHello(), 3000)
  // => Hello! is logged instantly... nothing happens 3 seconds later.


  const ans = (firstName,secondName) => {
       return firstName.charAt(0)+secondName.charAt(0);
  };

  console.log(ans("chetan","singh"));