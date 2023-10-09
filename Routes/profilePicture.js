const express = require("express");
const router = express.Router();
const {
  uploadProfilePicture,
  updateProfilePicture,
} = require("../Controllers/profilePicture");

// Route to upload a user's profile picture
router.post(
  "/upload-profile-picture",
  uploadProfilePicture,
  updateProfilePicture
);

module.exports = router;
