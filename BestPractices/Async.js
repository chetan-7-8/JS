
// The word “async” before a function means one simple thing: a function always returns a promise
// The keyword await makes JavaScript wait until that promise settles and returns its result.

async function f() {

    let promise = new Promise((resolve, reject) => {
      setTimeout(() => resolve("done!"), 1000)
    });
  
    let result = await promise; // wait until the promise resolves (*)
  
    alert(result); // "done!"
  }
  
  f();