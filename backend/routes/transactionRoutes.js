const express = require('express');
const router = express.Router(); 
const {getTransactions, addTransactions, deleteTransactions, updateTransactions} = require("../controller/transactionController"); 
const {protect} = require("../middleware/authMiddleware"); //  to protect routes 

router 
    .route('/')
    .get(protect, getTransactions)
    .post(protect, addTransaction); // get and post routes for transactions with authentication

router
    .route('/:id')
    .put(protect, updateTransaction) // 
    .delete(protect, deleteTransaction); // update and delete transaction route with authentication

module.exports = router; // export router to be used in server.js