const mongoose = require("mongoose"); //for MongoDB connection

const TransactionSchema = new mongoose.Schema({ // defining transaction scehma 
    text: {type: String, trim: true, required: [true, "Please add some text"]},
    amount: {type: Number, required: [true, "Please add some number"]},
    type: {type: String, enum: ["income", "expense"], required: true},
    category: {type: String, required: false, default: "General"},
    date: {type: Date, default: Date.now},
    User: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}, // reference to user model
    createdAt: {type: Date, default: Date.now} 
}); 

module.exports = mongoose.model("Transaction", TransactionSchemea); //Exporting transaction model according to the created schema 