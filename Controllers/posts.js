const express = require("express");
const router = express.Router();
const multer = require("multer");

const { Post } = require("../Models/Post");

const makeAPost = async (req, res, next) => {
  try {
    const newPostData = req.body;

    // Map uploaded files to an array of objects with data and contentType
    // const photos = req.files.map((file) => ({
    //   data: file.buffer, // Use the buffer from multer
    //   contentType: file.mimetype, // Use the content type from multer
    // }));

    // newPostData.photos = photos;
    const newPost = new Post(newPostData);
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
    const post = await Post.findById(req.params.postId);

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
    const posts = await Post.find()
      .populate({
        path: "authorId",
        model: "User",
        select: "profilePicture",
      })
      .exec();

    console.log("Did we get here, getPosts..........");
    // console.log("post.authorProfilePic before: ", post.authorProfilePic);
    // console.log("post.authorId.profilePicture before: ", post.authorId.profilePicture);
    posts.forEach((post) => {
      if (post.authorId) {
        console.log("How about my if func, getPosts..........");
        post.authorProfilePic = post.authorId.profilePicture;
      }
    });
    console.log("post.authorProfilePic after: ", post.authorProfilePic);
    console.log(
      "post.authorId.profilePicture after : ",
      post.authorId.profilePicture
    );

    // Send the posts as a response
    res.status(200).json(posts);
  } catch (err) {
    console.log("Error: ", err);
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

// Controller to get all posts of a specific user
const getAllUserPosts = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    // Use Mongoose to query for posts created by the specified user
    const userPosts = await Post.find({ authorId: userId });

    if (!userPosts) {
      return res.status(404).send("User has no posts.");
    }

    res.status(200).json(userPosts);
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
module.exports.getAllUserPosts = getAllUserPosts;
