const express = require("express");
const router = express.Router();

const {
  getComments,
  createComment,
  updateComment,
  deleteComment,
} = require("../Controllers/comments");

const { verifyToken } = require("../utils/verifyToken");

// Define routes for comments
router.get("/:postId/comments", verifyToken, getComments);
router.post("/:postId/comments", verifyToken, createComment);
router.put("/:postId/comments/:commentId", verifyToken, updateComment);
router.delete("/:postId/comments/:commentId", verifyToken, deleteComment);

module.exports = router;
