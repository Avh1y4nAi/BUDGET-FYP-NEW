const mongoose = require("mongoose"); // for MongoDB connection

const UserSchema = new mongoose.Schema({ //define user schema 
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    theme: {type: String, default: "light"},
    profilePicture: {type: String, default: ""}
}, {timestamps: true}); // add createdat and updatedat timestamps

module.exports = mongoose.model("User", UserSchema); // export user mode laccording to the created schema
 