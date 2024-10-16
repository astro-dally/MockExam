// const { PrismaClient } = require("@prisma/client");
// const dotenv = require('dotenv');
// const express = require("express");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken"); // Import JWT

// dotenv.config();
// const app = express();
// const prisma = new PrismaClient();

// const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key"; // Set JWT Secret

// app.use(express.json());

// // Generate JWT Token Helper
// const generateToken = (userId) => {
//     return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "1h" }); // Token expires in 1 hour
// };

// // Middleware to Verify JWT Token
// const authenticateToken = (req, res, next) => {
//     const token = req.headers.authorization?.split(" ")[1]; // Get token from "Authorization: Bearer <token>"

//     if (!token) return res.status(401).send({ message: "Access denied. No token provided." });

//     jwt.verify(token, JWT_SECRET, (err, user) => {
//         if (err) return res.status(403).send({ message: "Invalid or expired token." });
//         req.user = user; // Attach user information to request
//         next();
//     });
// };

// // Signup Route
// app.post('/signup', async (req, res) => {
//     const { name, email, password } = req.body;

//     if (!email || !name || !password) {
//         return res.status(400).send({ message: "Invalid user credentials" });
//     }

//     try {
//         const existingUser = await prisma.users.findUnique({ where: { email } });

//         if (existingUser) {
//             return res.status(400).send({ message: "User with this email already exists" });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);

//         const newUser = await prisma.users.create({
//             data: {
//                 name,
//                 email,
//                 password: hashedPassword
//             }
//         });

//         const token = generateToken(newUser.id); // Generate JWT Token

//         res.status(201).send({ message: "Sign Up successful", token }); // Return token in response
//     } catch (err) {
//         console.error(err);
//         res.status(500).send({ message: "Internal server error" });
//     }
// });

// // Login Route
// app.post('/login', async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         if (!email || !password) {
//             return res.status(400).send({ message: "Invalid user credentials" });
//         }

//         const user = await prisma.users.findUnique({ where: { email } });

//         if (!user) {
//             return res.status(400).send({ message: "User not found" });
//         }

//         const isPasswordValid = await bcrypt.compare(password, user.password);

//         if (!isPasswordValid) {
//             return res.status(401).send({ message: "Invalid password" });
//         }

//         const token = generateToken(user.id); // Generate JWT Token

//         res.status(200).send({ message: "Login successful", token }); // Return token in response
//     } catch (err) {
//         console.error(err);
//         res.status(500).send({ message: "Internal server error" });
//     }
// });

// // Protected Route (Requires JWT Token)
// app.get('/profile', authenticateToken, async (req, res) => {
//     try {
//         const user = await prisma.users.findUnique({
//             where: { id: req.user.id },
//             select: { id: true, name: true, email: true }
//         });

//         if (!user) {
//             return res.status(404).send({ message: "User not found" });
//         }

//         res.status(200).send({ user });
//     } catch (err) {
//         console.error(err);
//         res.status(500).send({ message: "Internal server error" });
//     }
// });

// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });

// module.exports = { app, prisma };


// const { PrismaClient } = require("@prisma/client");
// const dotenv = require('dotenv');
// const express = require("express");

// dotenv.config();
// const app = express();
// const prisma = new PrismaClient();


// app.use(express.json());
// app.get('./usernames', async (req, res) => {
//     const users = prisma.username.findMany();
//     res.send(users)
// })

// app.post('/usernames', async (req, res) => {
//     const { username } = req.body;
//     if (!username) {
//         return res.status(400).send({ message: "username not found" })
//     }
//     try {
//         await prisma.username.create({
//             data: { username }
//         })
//         res.status(200).json({ username: username })
//     } catch (err) {
//         console.log(err)
//         res.status(500).send({ message: "Internal server error" })
//     }
// })

// app.get('/username/:id', async (req, res) => {
//     const { id } = req.params;
//     const username = await prisma.username.findUnique({ where: { id: parseInt(id) } })
//     res.json(username)
// })

// app.put('/usernames/:id', async (req, res) => {
//     const { username } = req.body;
//     const { id } = req.params
//     try {
//         await prisma.username.update({
//             where: { id: parseInt(id) },
//             data: { username: username }
//         })
//         res.status(200).send({ message: "updated succesfully" })
//     } catch (err) {
//         console.log(err)
//         res.status(500).send({ message: "Internal server error" })
//     }
// })

// app.delete('/usernames/:id', async (req, res) => {
//     const { id } = req.params
//     try {
//         await prisma.username.delete({
//             where: {
//                 id: parseInt(id)
//             }
//         })
//         res.status(200).send({ message: "deleted successfully" })
//     } catch (err) {
//         console.log(err)
//         res.status(500).send({ message: "Internal server error" })
//     }
// })

// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });

// module.exports = { app, prisma };



// transactions
// Get by transactionId
// static async getTransaction(req, res) {
//     if (req.verified === false) {
//         return res.status(403).send({message:req.msg});
//     }

//     const { transactionId } = req.params;

//     if (isNaN(transactionId)) {
//         return res.status(400).json({ message: "Invalid transaction ID" });
//     }

//     try {
//         const id = parseInt(transactionId);

//         const transaction = await prisma.transaction.findUnique({
//             where: {
//                 id: id,
//             },
//         });

//         if (!transaction) {
//             return res.status(404).json({ message: "Transaction not found" });
//         }

//         return res.status(200).json(transaction);

//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: "Internal server error" });
//     }
// }

// Get All Transactions
// static async getAllTransactions(req, res) {
//     try {
//       if (req.verified === false) {
//         return res.status(403).json({ message: req.msg });
//       }

//       const userId = req.id;

//       const transactions = await prisma.transaction.findMany({
//         where: {
//           OR: [
//             { giverId: userId },
//             { receiverId: userId }
//           ]
//         }
//       });
//       if(!transactions){
//         return res.status(404).json({ message: [] });
//       }

//       return res.status(200).json(transactions);

//     } catch (error) {
//       console.error("Error fetching transactions:", error);
//       return res.status(500).json({ message: "Internal server error" });
//     }
//   }

// Edit the transactions
// static async editTransaction(req, res) {
//     if (!req.verified) {
//         return res.status(403).json({ msg: req.msg });
//       }

//     const { id } = req.params;
//       if (isNaN(id)) {
//         return res.status(400).json({ msg: "Invalid transaction ID" });
//       }

//     const { amount, description, settled } = req.body;

//     const updateData = {};

//     if (amount !== undefined) {
//         if (typeof amount !== 'number' || amount <= 0) {
//             return res.status(400).json({ msg: "Invalid amount" });
//         }
//         updateData.amount = amount;
//     }

//     if (description !== undefined) {
//         if (typeof description !== 'string' || description.trim() === "") {
//             return res.status(400).json({ msg: "Invalid description" });
//         }
//         updateData.description = description;
//     }

//     if (settled !== undefined) {
//         if (typeof settled !== 'boolean') {
//             return res.status(400).json({ msg: "Invalid settled flag" });
//         }
//         updateData.settled = settled;
//     }

//     try {
//         const transaction = await prisma.transaction.update({
//             where: { id: Number(id) },
//             data: updateData,
//         });

//     //     if(!transaction){
//     //   return res.status(404).json({ msg: "Transaction not found"});
//     // }

//         return res.status(200).json({
//             msg: "Transaction updated successfully!",
//             transaction,
//         });
//     } catch (error) {
//         if (error.code === 'P2025') {
//             return res.status(404).json({ msg: "Transaction not found" });
//         }
//         console.error(error);
//         return res.status(500).json({ msg: "Internal server error" });
//     }
// }

// Delete the transactions
// static async deleteTransaction(req, res) {
//     if (req.verified === false) {
//         return res.status(403).json({ msg: req.msg });
//     }

//     const { transactionId } = req.params;

//     if (isNaN(transactionId)) {
//         return res.status(400).json({ msg: "Invalid transaction ID" });
//     }

//     try {
//         const transaction = await prisma.transaction.findUnique({
//             where: { id: Number(transactionId) }
//         });

//         if (!transaction) {
//             return res.status(404).json({ msg: "Transaction not found" });
//         }

//         await prisma.transaction.delete({
//             where: { id: Number(transactionId) }
//         });

//         return res.status(200).json({ msg: "Transaction deleted successfully" });
//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({ msg: "Internal server error" });
//     }
// }


// Balance the transactions

//     static async calculateBalance(req, res) {
//     try {
//         if (!req.verified) {
//             return res.status(403).json({ msg: req.msg });
//         }

//         const userId = parseInt(req.params.id);
//         if (isNaN(userId)) {
//             return res.status(400).json({ msg: "Invalid user ID" });
//         }

//         const amountGiven = await prisma.transaction.aggregate({
//             where: {
//                 giverId: userId,
//                 settled: false
//             },
//             _sum: {
//                 amount: true
//             }
//         });

//         const amountReceived = await prisma.transaction.aggregate({
//             where: {
//                 receiverId: userId,
//                 settled: false
//             },
//             _sum: {
//                 amount: true
//             }
//         });


//         const totalGiven = amountGiven._sum.amount || 0;  
//         const totalReceived = amountReceived._sum.amount || 0;
//         const balance = totalReceived - totalGiven;

//         return res.status(200).json({ balance });

//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ msg: "Internal Server Error" });
//     }
// }

// const {
//     parseLocalDriveIntoJson,
//     checkIfDirExists,
//   } = require("../utils/fileSystem.js");
  
//   const { prisma } = require("../db/config");
//   const { driveFolderPath } = require("../utils/constants.js");
  
//   const createFileSystemToRemoteDb = async (_, res) => {
//     const exists = await checkIfDirExists(driveFolderPath);
//     if (exists) {
//       const json = await parseLocalDriveIntoJson(driveFolderPath);
//       // console.log(json);
//       const data = await prisma.storage.create({ data: { fileSystem: json } });
//       res.status(200).json({
//         message: "File system pushed to remote database",
//         repository: data,
//       });
//     } else {
//       res.status(400).json({ message: "drive folder does not exists" });
//     }
//   };
  
//   const updateFileSystemToRemoteDb = async (req, res) => {
//     const id = req.query.id;
//     if (!id) {
//       return res.status(400).json({ message: "id not provided" });
//     }
//     const exists = await checkIfDirExists(driveFolderPath);
//     if (exists) {
//       const json = await parseLocalDriveIntoJson(driveFolderPath);
//       const data = await prisma.storage.update({
//         where: { id: parseInt(id) },
//         data: { fileSystem: json },
//       });
//       res.status(200).json({
//         message: "File system pushed to remote database",
//         repository: data,
//       });
//     } else {
//       res.status(400).json({ message: "drive folder does not exists" });
//     }
//   };
  
//   module.exports = {
//     createFileSystemToRemoteDb,
//     updateFileSystemToRemoteDb,
//   };