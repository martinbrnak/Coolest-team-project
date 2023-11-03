function sayHello(name){
    console.log(`Hello ${name}`);
}

module.exports = sayHello
/*
module.exports is an object used for exporting functions, objects, or values. 
Once we put in this line of code, other modules can use require('./hello.js') to access 
the methods written here.
If we had multiple functions, module.exports for each proceeding function would 
overwrite the original one. Instead do this:
module.exports = {
    foo: 'bar',
    myFunction1: myFunction1,
    myFunction2: myFunction2
};

in app.js you could call:
console.log(myModule.foo);
myModule.myFunction1(); 
etc.
*/