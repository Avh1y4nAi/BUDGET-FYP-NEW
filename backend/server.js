const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

connectDB(); // function call for database connection 

const app = express();
app.use(cors()); 
app.use(express.json()); 

// routing middleware 
app.use("/api/auth", require("./routes/authRoutes")); 
app.use("/api/transactions", require("./routes/transactionRoutes")); // register transaction endpoints under a common base URL

const dirname = path.resolve(); // return absolute path 
app.use("/uploads", express.static(path.join(dirname, "/uploads"))); // servre static files from uploads

app.listen(5000, () => console.log("Server running on port 5000")); // server on port 5000 

