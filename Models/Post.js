const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    body: { type: String, required: true, min: 10 },
    photos: { type: [String] },
    comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now },
    timeTakenToReadPost: { type: Number, required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] }],
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
