const express = require("express");
const router = express.Router();
const {
  uploadPic,
  uploadProfilePicture,
} = require("../Controllers/profilePicture");
const { verifyToken } = require("../utils/verifyToken");

// Route to upload a user's profile picture
router.post(
  "/upload-profile-picture",
  verifyToken,
  uploadPic,
  uploadProfilePicture
);

module.exports = router;
