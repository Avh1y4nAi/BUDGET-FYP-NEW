const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

// @desc    Post contact message
// @route   POST /api/contact
// @access  Public
router.post("/", async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "Please provide name, email and message." });
  }

  try {
    const newContact = new Contact({
      name,
      email,
      subject,
      message
    });

    await newContact.save();

    console.log(`New contact message from ${name} (${email}): ${subject} - ${message}`);

    // Simulate success
    res.status(200).json({ success: true, message: "Message sent successfully! We'll get back to you soon." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;