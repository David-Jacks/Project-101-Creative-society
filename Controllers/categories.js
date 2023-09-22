const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { Post } = require("../Models/Post");

//Retrieve a list of available categories (only titles, limited to 6)
const getCategories = async (req, res, next) => {
  try {
    const categories = await Post.aggregate([
      { $unwind: "$categories" }, // Split categories array into separate documents
      { $group: { _id: "$categories" } }, // Group by category
      { $limit: 6 }, // Limit to 6 categories
    ]);

    const categoryTitles = categories.map((category) => category._id);

    res.status(200).json(categoryTitles);
  } catch (error) {
    next(error);
  }
};

// Retrieve articles belonging to a specific category
const articlesOfACategory = async (req, res, next) => {
  try {
    const categoryName = req.params.categoryName;
    const posts = await Post.find({ categories: categoryName });
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

module.exports.getCategories = getCategories;
module.exports.articlesOfACategory = articlesOfACategory;
