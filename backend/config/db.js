const mongoose = require('mongoose'); // for MongoDB connection

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI); // connect to MongoDB using Mongoose 
        console.log("MongoDB connected successfully"); // log success message
    } catch(error) {
        console.error(error); // log the error message
        process.exit(1); // exit process with failure code 
    }
}

module.exports = connectDB; 
