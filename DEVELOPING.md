# Developer style guide for writing clean javascript

## Table of Contents

1. [Introduction](#introduction)
2. [Formatting](#formatting)
3. [Concurrency](#concurrency)
3. [Variables](#variables)
4. [Functions](#functions)
5. [Naming Convemntions](#naming-conventions)
5. [Objects](#objects-and-data-structures)
6. [Classes](#classes)
7. [Testing](#testing)
8. [Comments](#comments)
9.  [Error Handling](#error-handling)
10. [Additioonal Thougts](#addional-thoughtsthis-and-that)

## Introduction
Writing clean code is an neccessity to having a happy and successful engineering team. It is critical that the codebase is structured in a way that is cohesive, easy to read, and easy to maintain. Code should be wrigtten as if one person write it, although that is not the reality. As there are many hands stiring the pot, so to speak, writing bad, unstrcuctured code that does not follow standards and best practices will hurt your productivity, performance, effects other team members and ultimately hurts the business in ways that are easily avildable if you just take the time to write excellent code.

So take heed to the details that follow and as always remember that this is a living document and as you grow and gain more insight, this doc can and will be modified. Have fun :)

### **Formatting:**
* 2 Spaces for indentation
  * Use 2 spaces for indenting your code and swear an oath to never mix tabs and spaces - a special kind of hell is awaiting you otherwise.
* Newlines
  * Use UNIX-style newlines (\n), and a newline character as the last character of a file. Windows-style newlines (\r\n) are forbidden inside any repository.
* No trailing whitespace
  * Just like you brush your teeth after every meal, you clean up any trailing whitespace in your JS files before committing. Otherwise the rotten smell of careless neglect will eventually drive away contributors and/or co-workers.
* Use Semicolons
  * According to scientific research, the usage of semicolons is a core value of our community. Consider the points of the opposition, but be a traditionalist when it comes to abusing error correction mechanisms for cheap syntactic pleasures.
* 80 characters per line max
  * Limit your lines to 80 characters. Yes, screens have gotten much bigger over the last few years, but your brain has not. Use the additional room for split screen, your editor supports that, right?
* Use single quotes
  * Use single quotes, unless you are writing JSON.

    ***Don't do this:***
    ```Javascript
    const foo = "bar";
    ```

    ***Do this instead:***
    ```Javascript
    var foo = 'bar';
    ```

* Opening braces go on the same line
  * Your opening braces go on the same line as the statement. Also will apply to functions, loops, and any other block statements.

     ***Don't do this:***
    ```Javascript
    if (true) 
    {
         console.log('Incorrect');
    }
    ```

     ***Do this instead:***
    ```Javascript
    if (true) {
         console.log('Correct');
    }
    ```

* Declare one variable per var statement
  * Declare one variable per var statement, it makes it easier to re-order the lines. However, ignore Crockford when it comes to declaring variables deeper inside a function, just put the declarations wherever they make sense.

    ***Don't do this:***
    ```javascript
     let keys = ['foo', 'bar'],
       values = [23, 42],
       object = {},
       key;

     while (keys.length) {
      key = keys.pop();
      object[key] = values.pop();
    }
    ```

    ***Do this instead:***
    ```javascript
      const keys   = ['foo', 'bar'];
      const values = [23, 42];

      const object = {};
      while (keys.length) {
        let key = keys.pop();
        object[key] = values.pop();
      }
      ```
* 500 lines per file max
  * large source files are hard to read and maintain and will get messy overtime. Its best practice to keep files at maximum of 500 lines.
* Remove dead code
  * Above, we mention keeping the number of lines in a file to a limit. Well, make sure we remove code that is not being used and/or commented out from the codebase. We can use source control as a reference for code we mignt need or want to revisit.

**[⬆ back to top](#table-of-contents)**

### **Concurrency**
  * Use async/await instead of promises directly. Its cleaner as promises will be encapsulated.

  ***Don't do this:***
  ```javascript
  const somefunc = function() {

    // accepts fullment and rejection callbacks
    // too many permutations for this syntax.
    // could use arrow functions, regular functions etc...
    // using async/await is cleaner and async functionr return promises
    return new Promise(() => {}, () => {});
  }
  ```

  ***Do this instead:***
  ```Javascript
    async someFunc() {
      return retVal = await getSomething();

      console.log(retVal);
    }

  ```
  * Never use callbacks, They are hard to read and maintain.

**[⬆ back to top](#table-of-contents)**
### **Variables:**
* Never use var to declare variables, use const or let instead

***Don't do this:***

```javascript
var rightAngleDegrees = 90;

```

***Do this instead:***

```javascript
// using const in most cases
const currentTemperature  = 90;

// this is ok as well but use const(above) if you are not expecting to mutate the variable
let currentTemperature = 90;
```

**[⬆ back to top](#table-of-contents)**

### **Classes:**
* classes should have private memebers
* export one class per module/file

**[⬆ back to top](#table-of-contents)**
### **Functions:**
* Keep method/function sizes small, should be no more than 20 -  25 lines
* Methods/functions too big should be broken up into spearate functions
* Function aguments count should be kept to a minimum, for example if several arguments are required:

***Don't do this:***
```Javascript
const someFunc = function(foo, bar, baz, zap, pop) {
  // ...
}
```

***Do this instead:***
```Javascript

// this code uses an object that can be destrcutured
const someFunc = function({foo, bar, baz, zap, pop}) {
  // ...
}
```

**[⬆ back to top](#table-of-contents)**

### **Naming Conventions:**
#### **Variables:**
* Variable names should be short and descriptive
* Constants should be written in UPPERCASE
***Don't do this:***

  ```javascript
  const temperature = 90;

  ```

  ***Do this instead:***

  ```javascript
  const TEMPERATURE = 90;

  ```

***Don't do this:***

#### **Functions:**
* Function names should not be too long
  * Function should describe what action is performed, so be descriptive
  * Function names should have the correct amount of info, not too long or short
* Function names should be written in camelCase
  * Also should explain what action is being performed
* Names should be consistent all across the code
* Names should be formatted in camelCase

***Don't do this:***

```javascript
// what the heck is tmp ????
const tmp = 90;

```

***Do this instead:***

```javascript
const temperature = 90;

```

**[⬆ back to top](#table-of-contents)**

### **Comments**

### Only comment things that have business logic complexity.

Comments are an apology, not a requirement. Good code _mostly_ documents itself.

***Don't do this:***

```javascript
function hashIt(data) {
  // The hash
  let hash = 0;

  // Length of string
  const length = data.length;

  // Loop through every character in data
  for (let i = 0; i < length; i++) {
    // Get character code.
    const char = data.charCodeAt(i);
    // Make the hash
    hash = (hash << 5) - hash + char;
    // Convert to 32-bit integer
    hash &= hash;
  }
}
```

***Do This instead:***

```javascript
function hashIt(data) {
  let hash = 0;
  const length = data.length;

  for (let i = 0; i < length; i++) {
    const char = data.charCodeAt(i);
    hash = (hash << 5) - hash + char;

    // Convert to 32-bit integer
    hash &= hash;
  }
}
```

**[⬆ back to top](#table-of-contents)**

### Don't leave commented out code in your codebase

Version control exists for a reason. Leave old code in your history.

***Don't do this:***

```javascript
doStuff();
// doOtherStuff();
// doSomeMoreStuff();
// doSoMuchStuff();
```

:***Do this instead:***

```javascript
doStuff();
```

**[⬆ back to top](#table-of-contents)**

### Don't have journal comments

Remember, use version control! There's no need for dead code, commented code,
and especially journal comments. Use `git log` to get history!

***Don't do this:***

```javascript
/**
 * 2016-12-20: Removed monads, didn't understand them (RM)
 * 2016-10-01: Improved using special monads (JP)
 * 2016-02-03: Removed type-checking (LI)
 * 2015-03-14: Added combine with type-checking (JR)
 */
function combine(a, b) {
  return a + b;
}
```

***Do this instead:***

```javascript
function combine(a, b) {
  return a + b;
}
```

**[⬆ back to top](#table-of-contents)**

### Avoid positional markers

They usually just add noise. Let the functions and variable names along with the
proper indentation and formatting give the visual structure to your code.

***Don't do this:***

```javascript
////////////////////////////////////////////////////////////////////////////////
// Scope Model Instantiation
////////////////////////////////////////////////////////////////////////////////
$scope.model = {
  menu: "foo",
  nav: "bar"
};

////////////////////////////////////////////////////////////////////////////////
// Action setup
////////////////////////////////////////////////////////////////////////////////
const actions = function() {
  // ...
};
```

***Do this instead:***

```javascript
$scope.model = {
  menu: "foo",
  nav: "bar"
};

const actions = function() {
  // ...
};
```

**[⬆ back to top](#table-of-contents)**

### **Deep Nesting**

For loops, conditionals[or any combination of if's, while loop etc..., all nested], you should go NO more than 2 levels deep. If it neccessary to go deeper than that, your logic is probably too complicated and it's probably best to split up the logic to simplify. methods that are more predictable and expressly identifies the action your logic is trying to do.

IN Javascript, there are several ways to interate over a collection. ***for, foreach, while etc...*** You can mixmatch and combine any number of these. Even so, the same rules apply and there is still opportunity to split up the code into smaller chunks.

***Don't do this:***
```Javascript

// loops
for(;;) {
  for(;;) {
    for(;;) {
      // ...
    }
  }
}

// conditionals
if(true) {
  if(true) {
    if(true) {
      while(true) {
        // ...
      }
    }
  }
}
```

***Do this instead:***
```Javascript

// loops
// shows 1 level but no more than 2 levels
for(;;) {
  // ...
}

// conditionals
// shows 1 level, but no more than 2 levels
if(true) {
  // ...
}
```

**[⬆ back to top](#table-of-contents)**

### **Conditionals:**
* Use === and not ==

***Don't do this:***
```Javascript
let a = 0;
if (a == '') {
  console.log('This is incorrect');
}
```

***Do this instea:d***
```Javascript
let a = 0;
if (a === 1) {
  console.log('This is correct');
}
```

* try to limit and not overuse negative or negation(!)

**[⬆ back to top](#table-of-contents)**

### **Testing:**
Testing is an essential element to writing functional and well maintained code. Testing helps to prevent recurring issues and can ensure that the software runs the same way each time, even when new features are added. This is an important step because as many engineers are adding new features and fixing bugs, it's important for engineers to be able to maintain pace without have to circle back unnecessarily to test code that, with great testing in place, can be tested in line with a merge(PR) for testing if the code has regressed. Doing it this way, helps build confidence and helps with keeping the engineers working more efficiently. The following highlight some of the things that should be at the top of mind:

* Always write test before submittng a PR to merge. Not doing so will reject the PR
* Select and utilize one testing framwork for consistency
* Be verbose in your test coverage
* One feature per test or one test per feature
  * Each test should be simple and test a single test case

**[⬆ back to top](#table-of-contents)**

### **Error Handling:**
Thrown errors are a good thing! They mean the runtime has successfully
identified when something in your program has gone wrong and it's letting
you know by stopping function execution on the current stack, killing the
process (in Node), and notifying you in the console with a stack trace.

### Don't ignore caught errors

Doing nothing with a caught error doesn't give you the ability to ever fix
or react to said error. Logging the error to the console (`console.log`)
isn't much better as often times it can get lost in a sea of things printed
to the console. If you wrap any bit of code in a `try/catch` it means you
think an error may occur there and therefore you should have a plan,
or create a code path, for when it occurs.

***Don't do this:***

```javascript
try {
  functionThatMightThrow();
} catch (error) {
  console.log(error);
}
```

***Do this instead:***

```javascript
try {
  functionThatMightThrow();
} catch (error) {
  // One option (more noisy than console.log):
  console.error(error);
  // Another option:
  notifyUserOfError(error);
  // Another option:
  reportErrorToService(error);
  // OR do all three!
}
```

### Don't ignore rejected promises

For the same reason you shouldn't ignore caught errors
from `try/catch`.

:**Don't do this:***

```javascript
getdata()
  .then(data => {
    functionThatMightThrow(data);
  })
  .catch(error => {
    console.log(error);
  });
```

***Do this instead:***

```javascript
getdata()
  .then(data => {
    functionThatMightThrow(data);
  })
  .catch(error => {
    // One option (more noisy than console.log):
    console.error(error);
    // Another option:
    notifyUserOfError(error);
    // Another option:
    reportErrorToService(error);
    // OR do all three!
  });
```

### **Addional Thoughts(This and That):**
* Dependencies should be placed at the top of the file for easy search and readability
* Use import to inject the dependencies into your module.
  * Do not use require
  * Do not mix require and import. Being consistent is the theme of this style guide.

  ***Don't do this:***
  ```javascript
    import {} from '<<../some_module>>';
    import {} from '<<../some_module>>';
    const module1 = require('<<../some_module>>');
    import {} from '<<../some_module>>';
    const module2 = require('<<../some_module>>');
    import {} from '<<../some_module>>';
    const module3 = require('<<../some_module>>');
    const module4 = require('<<../some_module>>');
  ```

  ***Do this instead:***

  ```javascript
     import {} from '<<../some_module>>';
     import {} from '<<../some_module>>';
     import {} from '<<../some_module>>';
     import {} from '<<../some_module>>';
     import {} from '<<../some_module>>';
     import {} from '<<../some_module>>';
     import {} from '<<../some_module>>';
     import {} from '<<../some_module>>';
  ```

Happy Coding!  :smile: