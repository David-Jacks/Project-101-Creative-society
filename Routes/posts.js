const {
  makeAPost,
  updatePost,
  deletePost,
  getPost,
  getPosts,
  searchByTitle,
} = require("../Controllers/posts");

const { verifyPostOwner } = require("../utils/verifyToken");

const router = require("express").Router();

router.post("/", makeAPost);

// UPDATE/EDIT
router.put("/:id", verifyPostOwner, updatePost);

// DELETE
router.delete("/:id", verifyPostOwner, deletePost);

// SEARCH FOR A POST
router.get("/search", searchByTitle);

// GET
router.get("/:id", getPost);

// GET ALL POSTS
router.get("/", getPosts);

//http://localhost:3000/api/search?q=programming

module.exports = router;
