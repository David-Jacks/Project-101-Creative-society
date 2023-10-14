const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  commentText: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference the User model
    authorProfilePic: { type: String },
    body: { type: String, required: true, min: 10 },
    photos: [{ data: Buffer, contentType: String }],
    comments: [commentSchema],
    date: { type: Date, default: Date.now },
    timeTakenToReadPost: { type: Number },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] }],
    categories: [{ type: String }],
    description: { type: String, required: true },
  },

  { timestamps: true }
);

// Sort posts based on the number of likes in descending order and limit
// the result to 3. If there are multiple posts with the same
// number of likes, this method will still return three of them
postSchema.statics.getTopLikedPosts = async function () {
  return this.find({}).sort({ likes: -1 }).limit(3).exec();
};

postSchema.statics.getRecentPosts = async function () {
  return this.find({})
    .sort({ createdAt: -1 }) // Sort by creation date in descending order
    .limit(6) // Limit to the top 6 posts
    .exec();
};

const Post = mongoose.model("Post", postSchema);
module.exports.Post = Post;
module.exports.postSchema = postSchema;
// module.exports.getTopLikedPosts = getTopLikedPosts;
