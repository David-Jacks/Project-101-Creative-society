const {
  makeAPost,
  updatePost,
  deletePost,
  getPost,
  getPosts,
} = require("../Controllers/posts");

const { verifyPostOwner } = require("../utils/verifyToken");

const router = require("express").Router();

router.post("/", makeAPost);

// UPDATE/EDIT
router.put("/:id", verifyPostOwner, updatePost);

// DELETE
router.delete("/:id", verifyPostOwner, deletePost);

// GET
router.get("/:id", getPost);

// GET ALL USERS
router.get("/", getPosts);

module.exports = router;
