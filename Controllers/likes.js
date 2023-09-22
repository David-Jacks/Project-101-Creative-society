const express = require("express");
const router = express.Router();
const { Post } = require("../Models/Post");

// Like a post
const likeAPost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id;

    // Check if the user has already liked the post
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).send("Post not found!");
    }

    if (post.likes.includes(userId)) {
      return res.status(400).send("You've already liked this post.");
    }

    // Add the user's ID to the post's likes array
    post.likes.push(userId);
    await post.save();

    res.status(200).send("Post liked successfully.");
  } catch (error) {
    next(error);
  }
};

// Unlike a post
const unlikeAPost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id;

    // Check if the user has already liked the post
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).send("Post not found!");
    }

    // Check if the post.likes array exists and if the user has liked the post
    if (!post.likes || !post.likes.includes(userId)) {
      return res.status(400).send("You haven't liked this post.");
    }

    // Remove the user's ID from the post's likes array
    post.likes = post.likes.filter(
      (like) => like.toString() !== userId.toString()
    );
    await post.save();

    res.status(200).send("Post unliked successfully.");
  } catch (error) {
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

module.exports.likeAPost = likeAPost;
module.exports.unlikeAPost = unlikeAPost;
module.exports.likeCount = likeCount;
module.exports.topLiked = topLiked;
module.exports.getRecentPosts = getRecentPosts;
