const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { postSchema } = require("./Post");

const userSchema = new mongoose.Schema(
  {
    profilePicture: { type: String }, // Store the URL or reference to the profile picture
    username: { type: String, required: true, unique: true },
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    year: { type: String },
    program: { type: String },
    isAdmin: { type: Boolean, default: false },
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    savedArticles: [postSchema],
  },
  { timestamps: true }
);

userSchema.methods.generateAuthToken = function () {
  console.log("I am here when registering ....");
  var token = jwt.sign(
    {
      _id: this._id,
      username: this.username,
      isAdmin: this.isAdmin,
      following: this.following,
      followers: this.followers,
    },
    process.env.JWT_PRIVATEKEY
  );

  return token;
};

const User = mongoose.model("User", userSchema);
module.exports.User = User;
module.exports.userSchema = userSchema;
