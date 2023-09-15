// const express = require("express");
const {
  makeAPost,
  updatePost,
  deletePost,
  getPost,
  getPosts,
} = require("../Controllers/posts");

const { verifyUser } = require("../utils/verifyToken");

const router = require("express").Router();

router.post("/", makeAPost);
// UPDATE/EDIT
router.put("/:id", verifyUser, updatePost);

// DELETE
router.delete("/:id", verifyUser, deletePost);

// GET
router.get("/:id", getPost);

// GET ALL USERS
router.get("/", getPosts);

module.exports = router;
