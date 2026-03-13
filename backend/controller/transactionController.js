const Transaction = require("../models/Transaction"); // importing transaction model



exports.getTransactions = async (req, res) => // get transactions controller 
{
    try
    {
        const transactions = await Transaction.find({User: req.user._id}).sort({createdAt: -1}); // finding transaction by user id and sorted by date in descending order 

        return res.status(200).json
        ({
            success: true, count: transactions.length, data: transactions // respond with success, count of transactions and transaction data 
        });
    } 
    catch (error)
    {
        return res.status(500).json
        ({success: false, error: 'Server Error'}); // response for server error
    }
}; 



exports.addTransactions = async (req, res) => // add transaction controller
{
    try
    {
        const {text, amount, type, category, date} = req.body; // reqeuest data from request body

        const transaction = await Transaction.create({
            text, amount, type, category, date, User: req.user._id // create transaction with the provided data and user id from request
        }); 

        return res.status(201).json({
            success: true, data: transaction // response with success and transaction data
        }); 
    } 
    catch (error)
    {
        return res.status(500).json({success: false, message: error.message}); // response for server error
    }
}; 




exports.updateTransactions = async (req, res) => // update transaction controller
{
    try
    {
        let transaction = await Transaction.findById (req.params.id); // finding transaction by id from request parameters)

        if (!transaction) // for transaction not found
        {
            return res.status(404).json({success: false, message: "Transaction not found"}); 
        }

        if (transaction.User.toString() !== req.user.id) // for unauthorized access
        {
            return res.status(401).json({success: false, message: "Not authorized"}); // return unauthorized error message
        }

        transaction = await Transaction.findByIdAndUpdate (req.params.id, req. body, {new: true, runValidators: true}); // to update transaction with the provided data and return the updated transaction

        return res.status(200).json({success: true, data: transaction}); // respond with sucess and updated data 
    }
    catch (error)
    {
        return res.status(500).json({sucesss: false, message: error.message}); // response for servor error
    }
}; 




exports.deleteTransactions = async (req, res) => // delete transaction controller
{
    try
    {
        const transaction = await Transaction.findById(req.params.id); 

        if (!transaction) 
        {
            return res.status(404).json({success: false, message: "Transaction not found"});  
        }

        if (transaction.user.toString() !== req.user.id) //  unauthorized access
        {
            return res.status(401).json({success: false, message: "Not authorized"}); 
        }

        await transaction.deleteOne(); // delete transaction 

        return res.status(200).json({success: true, data: transaction}); // respond with success and deleted transaction data
    }
    catch (error)
    {
        return res.status(500).json({success: false, message: error.message}); 
    }
}; 



exports.getTransactionSummary = async (req, res) =>  
{
    try 
    {
        const transactions = await Transaction.find({User: req.user._id}); 

        const totalIncome = transactions .filter (t=> t.type === 'income') .reduce ((acc, t) => acc + t.amount, 0); 
        const totalExpense = transactions .filter (t =>t.type === 'expense') .reduce ((acc, t) => acc + t.amount, 0); 

        res.status(200).json ({
            success: true,
            totalIncome,
            totalExpense,
            balance: totalIncome - totalExpense, count: transactions.length
        }); 
    }catch (error){
        res.status(500).json({success: false, message: error.message}); 
    }
}; 