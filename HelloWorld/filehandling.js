// const fs = require("fs")
// fs module enables interacting with the file system

//write file
//Synchornous file
// fs.writeFileSync('./test.txt', "Hey there, hows life going?")

//Asyncronous
// fs.writeFile('./test.txt', "How are you bro? I am Async bhai", (err) => { }) 

//Read file
// const res = fs.readFileSync('./contacts.txt', 'utf-8')
// //utf-8 is the standard encoding
// console.log(res)

//One of the main difference betn the readFileSync and readFile is that the readFile is async and then 
//to read it we will cannot assign it to some variable and log it.
//so we neeed to use callbacks

//asynchronous readFile -> its doesnt return u anything for eg if u assigned it in a var and logging
//then it will nopt perform the action 
// fs.readFile("./contacts.txt", "utf-8", (err, res) => {
//     if (err) {
//         console.log("error", err)
//     } else {
//         console.log(res)
//     }
// })

//Appending file
// fs.appendFileSync('./test.txt', new Date().getDate().toLocaleString())
// fs.appendFileSync('./test.txt', `${Date.now()}Hey there\n`)


//to copy the data of the file in fs u can use cpSync
// fs.cpSync('./test.txt', './copy.txt')

//to delete we use unlink 
// fs.unlinkSync('./copy.txt')



/// to understand the architecture of the nodejs

//Best way to understand the blocking and non-blocking functions
//Blocking..
// console.log("1")
// const res = fs.readFileSync('./contacts.txt', 'utf-8');
// console.log(res);
// console.log("2")
//output
// 1
// contact1 : 1234567890
// contact2: 3425768976
// contact3: 4536718356
// contact4: 3574877880
// 2

//Non-blocking -> gives the res through callback
// console.log("1")
// fs.readFile('./contacts.txt', 'utf-8', (err, res) => { console.log(res) });
// // console.log(res);
// console.log("2")
//output
// 1
// 2
// contact1: 1234567890
// contact2: 3425768976
// contact3: 4536718356
// contact4: 3574877880

// for blocking functions
//Can i increase the size of my thread pool? YEs
// The defualt size of my thread pool is -> 4
//How can i increase it? and what it the max? it depends on my cpu cores
/// if i have 8 cpu cores then i can get max -> 8

// want to know how many thread pools u can make?
// const os = require('os')
// console.log(os.cpus().length)
//it gives me the output as 8. so it simply means that i get 8 thread pools