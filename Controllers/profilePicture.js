const sharp = require("sharp");
const { User } = require("../Models/User");

const uploadProfilePic = async (req, res) => {
  try {
    console.log("Request File: ", req.file);
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    // Process the uploaded image using Sharp or other image processing libraries
    const processedImageBuffer = await sharp(req.file.buffer)
      .resize(200, 200) // Resize the image (example)
      .toBuffer();

    console.log("ProcessedImage: ", processedImageBuffer);

    // Convert the processed image buffer to a base64 string
    const base64Image = processedImageBuffer.toString("base64");

    console.log("base64Image: ", base64Image);

    // Get the user ID from the authenticated request
    const userId = req.user.id;
    console.log("userId without underscore: ", userId);

    // Update the user's profile picture field in the database
    await User.findByIdAndUpdate(userId, { profilePicture: base64Image });

    // Send a response indicating success
    res.status(200).send("Profile picture updated successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error processing the image.");
  }
};

module.exports = {
  uploadProfilePic,
};
