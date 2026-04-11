const mongoose = require("mongoose");

const testConnection = async () => {
  console.log("Attempting to connect to MongoDB...");
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/budget_app", {
      serverSelectionTimeoutMS: 5000 // Timeout after 5s
    });
    console.log("SUCCESS: MongoDB is running and accessible!");
    await mongoose.connection.close();
  } catch (error) {
    console.error("ERROR: Could not connect to MongoDB.");
    console.error("Reason:", error.message);
    console.log("\nPossible solutions:");
    console.log("1. Make sure MongoDB Community Server is installed.");
    console.log("2. Open Task Manager -> Services tab -> Start 'MongoDB' service.");
  }
};

testConnection();
