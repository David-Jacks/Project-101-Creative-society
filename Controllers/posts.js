const express = require("express");
const router = express.Router();
const { Post } = require("../Models/Post");

const makeAPost = async (req, res, next) => {
  try {
    const newPost = new Post(req.body);
    console.log(`newPost: ${newPost}`);
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    next(error);
  }
};

// This will update the post, if you want to make some edits to your posts
const updatePost = async (req, res, next) => {
  try {
    const updatePost = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatePost);
    console.log("We are here, Edited Succesfully");
  } catch (err) {
    console.log("It failed to update");
    next(err);
  }
};

// Delete user by unique ID
const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post == null) next(err);
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json("Post has been deleted.");
  } catch (err) {
    next(err);
  }
};

// Search for a post by unique ID
const getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post == null) {
      res.status(404).send("The post you are looking for isnt available");
      return;
    }

    res.status(200).send(post);
  } catch (err) {
    next(err);
  }
};

// Search for all posts
const getPosts = async (req, res, next) => {
  try {
    const users = await Post.find();
    res.status(200).send(users);
  } catch (err) {
    next(err);
  }
};

const searchByTitle = async (req, res, next) => {
  try {
    const searchText = req.query.q || ""; // Get the search query from the request

    // Create a regex pattern for case-insensitive and partial matching
    const regex = new RegExp(searchText, "i");

    // Find articles whose title matches the regex pattern
    const articles = await Post.find({ title: regex });

    res.status(200).json(articles);
  } catch (error) {
    next(error);
  }
};

module.exports.makeAPost = makeAPost;
module.exports.getPost = getPost;
module.exports.getPosts = getPosts;
module.exports.updatePost = updatePost;
module.exports.deletePost = deletePost;
module.exports.searchByTitle = searchByTitle;
