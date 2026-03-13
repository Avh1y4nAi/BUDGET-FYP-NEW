const express = require('express');
const router = express.Router(); 
const {getTransactions, addTransactions, deleteTransactions, updateTransactions, getTransactionSummary} = require("../controller/transactionController"); 
const {protect} = require("../middleware/authMiddleware"); //  to protect routes 

router 
    .route('/')
    .get(protect, getTransactions)
    .post(protect, addTransactions); // get and post routes for transactions with authentication

router
    .route('/:id')
    .put(protect, updateTransactions) // 
    .delete(protect, deleteTransactions) // update and delete transaction route with authentication

router.get ("/summary", protect, getTransactionSummary); 

module.exports = router; // export router to be used in server.js