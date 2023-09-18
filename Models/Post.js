const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // String is shorthand for {type: String}
    author: { type: String, required: true },
    body: { type: String, required: true, min: 10 },
    photos: { type: [String] },
    comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now },
    hidden: Boolean,
    meta: {
      likes: Number,
      // favs: Number
    },
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
