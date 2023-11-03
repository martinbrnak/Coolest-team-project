/* 
two global variables, __dirname and __filename
these correspond to the current working directory and current working file
*/
console.log(__dirname);
console.log(__filename);

// define global variables like so
global.myVariable = "Hello World";

console.log(myVariable);

// we created a module in the hello.js file, so no we can access it here
const sayHello = require('./hello.js');

sayHello('John');
sayHello('Peter');
sayHello('Rohit');

// OS built-in module --> provides information about the operating system
const os = require('os');

// system time in seconds since last reboot
const systemUptime = os.uptime();

// returns user ID, group ID, username, home directory, default shell of the current user
const userInfo = os.userInfo();

const otherInfo = {
    name: os.type(),  // name of the OS
    release: os.release(),  // release version of OS
    totalMem: os.totalmem(),  // total memory available in bytes
    freeMem: os.freemem(),  // total free memory available in bytes
}

console.log(systemUptime);
console.log(userInfo);
console.log(otherInfo);

// PATH built-in module --> provides utility functions for working with file paths
const path = require('path');

const myPath = "D:\\School\\CS 411"

const pathInfo = {
    fileName: path.basename(myPath), // returns the last part of myPath
    folderName: path.dirname(myPath), // the path to the parent directory of the last part of myPath
    fileExtension: path.extname(myPath), // checks for extension and returns it OR '' if nothing exists
    absoluteOrNot: path.isAbsolute(myPath), // tells whether the path is absolute or not (Windows - // or C:, Linux - /)
    detailInfo: path.parse(myPath), // returns a detailed breakdown of the path
}

console.log(pathInfo);

console.log(myPath.sep) // '/' for mac or linux, '\' for windows

console.log(path.join('grandParentFolder', 'parentFolder', 'child.txt')) // joins the paths with the correct sep

console.log(path.resolve('grandParentFolder', 'parentFolder', 'child.txt')) // joins the paths and then appends them to the current working directory

// FS built-in module --> File System Operations like Reading and Writing Files

// HTTP built-in module --> Create HTTP Servers