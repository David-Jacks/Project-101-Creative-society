const express = require("express");
const router = express.Router();
const {
  uploadProfilePicture,
  updateProfilePicture,
} = require("../Controllers/profilePicture");
const { verifyToken } = require("../utils/verifyToken");

// Route to upload a user's profile picture
router.post(
  "/upload-profile-picture",
  verifyToken,
  uploadProfilePicture,
  updateProfilePicture
);

module.exports = router;
