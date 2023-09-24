const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { Post } = require("../Models/Post");

// GET comments for a specific blog post
exports.getComments = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId).populate(
      "comments.user"
    );
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json(post.comments);
  } catch (error) {
    next(error);
  }
};

// POST a comment to a blog post
exports.createComment = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Access the Comment subdocument through the Post model
    console.log(`req.user: `, req.user);
    const newComment = {
      text: req.body.text,
      user: req.user._id, // Assuming you have user authentication
    };
    console.log(`newComment `, newComment);
    console.log(`text: `, newComment.text);

    post.comments.push(newComment);
    await post.save();

    res.status(201).json(newComment);
  } catch (error) {
    next(error);
  }
};

exports.updateComment = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const commentId = req.params.commentId;
    const updatedText = req.body.text;

    // Find the comment by its _id and update its text
    const comment = post.comments.id(commentId);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    comment.text = updatedText;
    await post.save();

    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
};

exports.deleteComment = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const commentId = req.params.commentId;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Find the comment within the post's comments array
    const comment = post.comments.id(commentId);

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    // Remove the comment from the post's comments array
    comment.remove();
    await post.save();

    return res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    next(error);
  }
};