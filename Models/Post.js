const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    body: { type: String, required: true, min: 10 },
    photos: { type: [String] },
  },
  { timestamps: true }
);

// postSchema.methods.generateAuthToken = function () {
//   const token = jwt.sign(
//     {
//       _id: this._id,
//       username: this.username,
//       isAdmin: this.isAdmin,
//     },
//     process.env.JWT_PRIVATEKEY
//   );
//   return token;
// };

const Post = mongoose.model("Post", postSchema);
module.exports.Post = Post;
module.exports.postSchema = postSchema;
