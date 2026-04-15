const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePic: { type: String, default: "" },
  theme: { type: String, default: "light" },
  monthlyBudget: { type: Number, default: 50000 },
  isAdmin: { type: Boolean, default: false },
  currency: { type: String, default: "NPR", enum: ["NPR", "USD"] }
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
