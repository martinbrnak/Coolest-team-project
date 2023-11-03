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
const fs = require('fs');

// making a new folder called myFolder in the current directory.
// the first param is the path to create the new folder in , the second is a callback function to report the completion of the creation.
// (need the callback because the function is asynchronous so the rest of the code will keep progressing)
fs.mkdir('../myFolder', (err) => {
    if(err){
        console.log(err);
    } else{
        console.log('Folder Created Successfully');
    }
})

const data = "Hi, this is newFile.txt"  // data can either be a string or buffer


/*
The following are examples of Asynchronous read/write
*/


// creates OR overrides* file located at the path (first param), writes the data (second param), and then calls the callback function to report completion
// (similar logic to above, but this time with string/buffer data)
fs.writeFile('../myFolder/myFile.txt', data, /*{flag: 'a'},*/ (err) => {  // *adding flag A causes it to append to the file instead of overriding.
    if(err){
        console.log(err);
    } else{
        console.log('Written to file Successfully');
    }
})

// function call to read data from a file, param: path, encoding, callback function.
// in this case, the callback also needs to return the data if there was no error, instead of just reporting the completion.
fs.readFile("../myFolder/myFile.txt", {encoding: 'utf-8'}, (err, data) => {
    if(err){
        console.log(err);
        return;
    } else {
        console.log('File read successfully! Here is the data:');
        console.log(data);
    }
})


/*
The following are examples of Synchronous read/write. They still need to handle errors, so we use a try catch block.
*/

try {
    // write file synchronously
    fs.writeFileSync("../myFolder/myFileSync.txt", "myFileSync says Hi");
    console.log("Write operation successful");

    // read file synchronously
    const fileData = fs.readFileSync("../myFolder/myFileSync.txt", "utf-8");
    console.log('Read operation successful. Here is the data:');
    console.log(fileData);
} catch(err){
    console.log('Error occurred!');
    console.log(err);
}

// way to asynchronously read a directory, same as doing so for a file
fs.readdir("../myFolder", (err, files) => {
    if(err){
        console.log(err);
        return;
    }
    console.log('Directory read successfully! Here are the files:');
    console.log(files);
})

// renaming a file/directory. first path is the old one, second one is the new one, and the callback handles errors
fs.rename("../myFolder/myFile.txt", "../myFolder/myFileAsync.txt", (err) => {
    if(err){
        console.log(err);
        return;
    }
    console.log('File renamed successfully!');
})

// delete a file, same param as creating one.
fs.unlink("../myFolder/myFileSync.txt", (err) => {
    if(err){
        console.log(err);
        return;
    }
    console.log('File deleted successfully!');    
})



// HTTP built-in module --> Create HTTP Servers