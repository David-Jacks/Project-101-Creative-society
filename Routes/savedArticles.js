const express = require("express");
const router = express.Router();
const {
  saveArticle,
  getSavedArticles,
} = require("../Controllers/savedArticles");
const { verifyToken } = require("../utils/verifyToken");

// Route to save an article for a user
router.post("/save-article/:articleId", verifyToken, saveArticle);

// Route to get saved articles for a user
router.get("/saved-articles", getSavedArticles);

module.exports = router;
