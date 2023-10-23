const express = require("express");
const router = express.Router();
const { User } = require("../Models/User"); // Import User model
const { Post } = require("../Models/Post"); // Import Post model

const saveArticle = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Add the entire article object to the user's savedArticles array
    await User.findByIdAndUpdate(userId, { $push: { savedArticles: article } });

    res.status(200).send("Article saved successfully.");
  } catch (error) {
    console.log("This is the Error: ", error);
    next(error);
  }
};

// Function to get saved articles for a user
// const getSavedArticles = async (req, res, next) => {
//   try {
//     const userId = req.user._id;

//     // Find the user by ID and populate the savedArticles array with article details
//     const user = await User.findById(userId).populate("savedArticles");

//     res.status(200).json(user.savedArticles);
//   } catch (error) {
//     next(error);
//   }
// };

// Function to get saved articles for a user
const getSavedArticles = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Find the user by ID and populate the savedArticles array with article details
    const user = await User.findById(userId).populate({
      path: "savedArticles",
      model: "User", // Assuming your model for articles is named "Article"
    });

    res.status(200).json(user.savedArticles);
  } catch (error) {
    next(error);
  }
};

module.exports.getSavedArticles = getSavedArticles;
module.exports.saveArticle = saveArticle;
