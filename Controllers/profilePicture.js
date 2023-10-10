const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

// Configure AWS SDK with your credentials and region
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "us-east-1",
});

const s3 = new AWS.S3();

// Create a multer storage engine for S3
const s3Storage = multerS3({
  s3: s3,
  bucket: "cyclic-cute-plum-scorpion-yoke-us-east-1",
  contentType: multerS3.AUTO_CONTENT_TYPE,
  acl: "public-read", // Set appropriate ACL for your use case
  key: (req, file, cb) => {
    cb(null, "profile-pictures/" + file.originalname);
  },
});

const upload = multer({ storage: s3Storage });

// Controller function to upload a user's profile picture
const uploadProfilePicture = upload.single("file"); // 'file' is the name of the field in the form

const uploadPic = async (req, res, next) => {
  try {
    const userId = req.user.id;
    console.log("UserID 1: ", req.user._id);
    console.log("UserID 2: ", req.user.id);

    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    // The profile picture URL in S3 after upload
    const profilePictureURL = req.file.location;

    // Update the user's profile picture field in the database
    await User.findByIdAndUpdate(userId, { profilePicture: profilePictureURL });

    res.status(200).json({ profilePictureURL });
  } catch (error) {
    next(error);
  }
};

module.exports.uploadProfilePicture = uploadProfilePicture;
module.exports.uploadPic = uploadPic;
