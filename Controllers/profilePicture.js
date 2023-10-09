const uuid = require("uuid");
const multer = require("multer");

// Configure Multer for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Specify the destination folder for storing profile pictures
  },
  filename: function (req, file, cb) {
    // Generate a unique filename (you can use a package like `uuid`)
    const uniqueFilename = `${uuid.v4()}-${file.originalname}`;
    cb(null, uniqueFilename);
  },
});

const upload = multer({ storage: storage });

// Controller function to upload a user's profile picture
const uploadProfilePicture = upload.single("profilePicture"); // 'profilePicture' is the name of the field in the form

const updateProfilePicture = async (req, res, next) => {
  try {
    const userId = req.user._id;

    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    // Assuming you've stored the uploaded file's path in the database
    const profilePicturePath = req.file.path;

    // Update the user's profile picture field in the database
    await User.findByIdAndUpdate(userId, {
      profilePicture: profilePicturePath,
    });

    res.status(200).send("Profile picture updated successfully.");
  } catch (error) {
    next(error);
  }
};

module.exports.uploadProfilePicture = uploadProfilePicture;
module.exports.updateProfilePicture = updateProfilePicture;
