const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/transactions", require("./routes/transactionRoutes"));

const dirname = path.resolve();
app.use("/uploads", express.static(path.join(dirname, "/uploads")));

app.listen(5000, () => console.log("Server running on port 5000"));
