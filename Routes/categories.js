const {
  getCategories,
  articlesOfACategory,
} = require("../Controllers/categories");
const router = require("express").Router();

router.get("/", getCategories);
router.get("/:categoryName", articlesOfACategory);

module.exports = router;
