let promise = new Promise(function(resolve, reject) {
    // the function is executed automatically when the promise is constructed
  
    // after 1 second signal that the job is done with the result "done"
    setTimeout(() => resolve("done"), 100);
  });

  promise.then(
      result => alert(result),
      error => alert(error)
  );



  //Finally block

  new Promise((resolve, reject) => {
    setTimeout(() => resolve("result"), 2000)
  })
    .finally(() => alert("Promise ready"))
    .then(result => alert(result)); // <-



//flow in promises;

    new Promise(function(resolve, reject) {

        setTimeout(() => resolve(1), 1000); // (*)
      
      }).then(function(result) { // (**)
      
        alert(result); // 1
        return result * 2;
      
      }).then(function(result) { // (***)
      
        alert(result); // 2
        return result * 2;
      
      }).then(function(result) {
      
        alert(result); // 4
        return result * 2;
      
      });










//Load Script Using promises;

    // function loadScript(src) {
    //     return new Promise(function(resolve, reject) {
    //       let script = document.createElement('script');
    //       script.src = src;
      
    //       script.onload = () => resolve(script);
    //       script.onerror = () => reject(new Error(`Script load error for ${src}`));
      
    //       document.head.append(script);
    //     });
    //   }


    //   loadScript("1.js")
    //   .then(script=>loadScript("2.js"))
    //   .then(script=>loadScript("3.js"))
    //   .then(script=>{
    //        // scripts are loaded, we can use functions declared there
    //       one();
    //       two();
    //       three();
    //   })
