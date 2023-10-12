const express = require("express");
const router = express.Router();
const { Post } = require("../Models/Post");

// Like or unlike a post and return the number of likes
const likeOrUnlikePost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id;
    console.log("userId: ", req.user._id);
    console.log("userId: ", req.user.id);

    // Check if the user has already liked the post
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).send("Post not found!");
    }

    const isLiked = post.likes.includes(userId);
    console.log("isLiked: ", isLiked);

    if (isLiked) {
      // User has already liked the post, so unlike it
      post.likes = post.likes.filter(
        (like) => like.toString() !== userId.toString()
      );
    } else {
      // User hasn't liked the post, so like it
      post.likes.push(userId);
    }

    await post.save();

    // Calculate the number of likes
    const numberOfLikes = post.likes.length;

    // Return a boolean value indicating success, whether the user liked or unliked the post, and the number of likes
    res.status(200).json({ liked: !isLiked, likes: numberOfLikes });
  } catch (error) {
    console.log("Error: ", error);
    next(error);
  }
};

// Get a post by ID, including the number of likes
const likeCount = async (req, res, next) => {
  try {
    const postId = req.params.id;

    // Retrieve the post by ID
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).send("Post not found!");
    }

    // Calculate the number of likes
    const numberOfLikes = post.likes.length;

    // Send the post details, including the number of likes
    res.status(200).json({
      post: {
        _id: post._id,
        title: post.title,
        content: post.content,
        // ... other post fields ...
        likes: numberOfLikes,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get the three most liked posts
const topLiked = async (req, res, next) => {
  try {
    const topLikedPosts = await Post.getTopLikedPosts();
    res.status(200).json(topLikedPosts);
  } catch (error) {
    next(error);
  }
};

// Get the 6 most recent blog posts
const getRecentPosts = async (req, res, next) => {
  try {
    const recentPosts = await Post.getRecentPosts();
    res.status(200).json(recentPosts);
  } catch (error) {
    next(error);
  }
};

module.exports.likeOrUnlikePost = likeOrUnlikePost;
module.exports.likeCount = likeCount;
module.exports.topLiked = topLiked;
module.exports.getRecentPosts = getRecentPosts;
