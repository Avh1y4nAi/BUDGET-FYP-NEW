const express = require("express"); 
const router = express.Router(); 
const {register, login, getUserProfile, updateUserProfile} = require("../controller/authController"); 
const {protect} = require("../middleware/authMiddleware"); // to protect routes 
const multer = require("multer"); // multer to handle file uploads like images
const path = require("path");  

// configuring multer for storage

const storage = multer.diskStorage
({ 
    destination(req, file, cb) //destination folder for uploaded files 
    { 
        cb(null, "uploads/"); 
    },
    filename(req, file, cb) // filename config 
    { 
        cb
        (
            null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}` // filename format to be saved in upload folder 
        ); 
    }
}); 



function checkFileType(file, cb) 
{ 
    const filetypes = /jpg|jpeg|png/; // allowed file types
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase()); // checking file extension 
    const mimetype = filetypes.test(file,mimetype); // checking file extension 

    if (extname && mimetype) 
    {
        return cb(null, true); // checking if file extenion is valid 
    }
    else 
    {
        cb("Images only"); 
    }
}



const upload = multer // multer upload config
({
    storage,
    fileFilter: function (req, file, cb) // to check file type with filter 
    {
        checkFileType(file, cb); // function to check file type 
    }, 
}); 



router.post("/register", register); // user reg route
router.post("/login", login); // user login route
router.get("/profile", getUserProfile); // user profile route
router.put("/profile", protect, updateUserProfile); // user profile update route
router.post("/upload", protect,  upload.single("image"), (req, res) => // route to upload picture
{
    res.send(`/$(req.file.path)`); 
}); 

module.exports = router; // exporting router to be used in serverjs
