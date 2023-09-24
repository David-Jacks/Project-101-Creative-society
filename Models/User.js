const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    year: { type: String },
    program: { type: String },
    isAdmin: { type: Boolean, default: false },
    following: { type: Number, default: 0 },
    followers: { type: Number, default: 0 },
    savedArticles: { type: [String] },
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
    },
    process.env.JWT_PRIVATEKEY
  );
  console.log("I am here again when registering ....");
  console.log(`Token for ${username} : ${token}`);

  return token;
};

const User = mongoose.model("User", userSchema);
module.exports.User = User;
module.exports.userSchema = userSchema;
