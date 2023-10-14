const express = require("express");
const router = express.Router();
// const multer = require("multer");

// Configure Multer for handling file uploads
// const storage = multer.memoryStorage(); // Store uploaded file in memory
// const upload = multer({ storage });
const { verifyToken } = require("../utils/verifyToken");
const { uploadProfilePic } = require("../Controllers/profilePicture");

// Route to upload a profile picture
router.post("/upload-profile-picture", verifyToken, uploadProfilePic);

module.exports = router;
