const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    firstName: { type: String, required: true, min: 10 },
    lastName: { type: String, required: true, min: 10 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    year: { type: String },
    program: { type: String },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      username: this.username,
      isAdmin: this.isAdmin,
    },
    process.env.JWT_PRIVATEKEY
  );
  return token;
};

const User = mongoose.model("User", userSchema);
module.exports.User = User;
module.exports.userSchema = userSchema;
