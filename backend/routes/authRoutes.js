const express = require("express");
const router = express.Router();
const { register, login, getUserProfile, updateUserProfile, updateProfilePicture } = require("../controller/authController");
const { protect } = require("../middleware/authMiddleware");
const multer = require("multer");
const path = require("path");

// Multer Config
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only!");
  }
}

const upload = multer({
  storage,
  limits: { fileSize: 5000000 }, // 5MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post("/register", register);
router.post("/login", login);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

router.post("/upload", protect, upload.single("image"), (req, res) => {
  res.send(`/${req.file.path.replace(/\\/g, "/")}`);
});

router.post("/profile/upload", protect, upload.single("image"), updateProfilePicture);

module.exports = router;
