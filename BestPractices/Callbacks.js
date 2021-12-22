function loadScript(src) {
    // creates a <script> tag and append it to the page
    // this causes the script with given src to start loading and run when complete
    let script = document.createElement('script');
    script.src = src;
    document.head.append(script);
  }


//Let’s say we need to use the new script as soon as it loads. It declares new functions, and we want to run them.
//  But if we do that immediately after the loadScript(…) call, that wouldn’t work:

loadScript('/my/script.js'); // the script has "function newFunction() {…}"
newFunction(); // no such function!


//Let’s add a callback function as a second argument to loadScript that should execute when the script loads:
function loadScript(src, callback) {
    let script = document.createElement('script');
    script.src = src;
  
    script.onload = () => callback(script);
  
    document.head.append(script);
  }

//Now if we want to call new functions from the script, we should write that in the callback:
loadScript('/my/script.js', function() {
    // the callback runs after the script is loaded
    newFunction(); // so now it works
  });


//That’s called a “callback-based” style of asynchronous programming.
//But it is not good if there are large number of scripts the callbacks will get very much nested.



//HANDLING ERRORS
function loadScript(src, callback) {
    let script = document.createElement('script');
    script.src = src;
  
    script.onload = () => callback(null, script);
    script.onerror = () => callback(new Error(`Script load error for ${src}`));
  
    document.head.append(script);
  }
  
  

//Example of multiple callbacks


loadScript('1.js', function(error, script) {

    if (error) {
      handleError(error);
    } else {
      // ...
      loadScript('2.js', function(error, script) {
        if (error) {
          handleError(error);
        } else {
          // ...
          loadScript('3.js', function(error, script) {
            if (error) {
              handleError(error);
            } else {
              // ...continue after all scripts are loaded (*)
            }
          });
  
        }
      });
    }
  });