const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware");
const User = require("../models/User");
const Contact = require("../models/Contact");
const Transaction = require("../models/Transaction");

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
router.get("/users", protect, admin, async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get all contact messages
// @route   GET /api/admin/contacts
// @access  Private/Admin
router.get("/contacts", protect, admin, async (req, res) => {
  try {
    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Delete a contact message
// @route   DELETE /api/admin/contacts/:id
// @access  Private/Admin
router.delete("/contacts/:id", protect, admin, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (contact) {
      await contact.deleteOne();
      res.json({ message: "Message removed" });
    } else {
      res.status(404).json({ message: "Message not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Delete a user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
router.delete("/users/:id", protect, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      if (user.isAdmin && (await User.countDocuments({ isAdmin: true })) <= 1) {
        return res.status(400).json({ message: "Cannot delete the only admin" });
      }
      await user.deleteOne();
      res.json({ message: "User removed" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Update user role (Toggle Admin)
// @route   PUT /api/admin/users/:id/role
// @access  Private/Admin
router.put("/users/:id/role", protect, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      user.isAdmin = !user.isAdmin;
      const updatedUser = await user.save();
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
// @access  Private/Admin
router.get("/stats", protect, admin, async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const contactCount = await Contact.countDocuments();
    const transactionCount = await Transaction.countDocuments();
    
    // Total platform volume (sum of all transactions)
    const transactions = await Transaction.find({});
    const totalVolume = transactions.reduce((acc, item) => acc + item.amount, 0);

    res.json({
      userCount,
      contactCount,
      transactionCount,
      totalVolume
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
