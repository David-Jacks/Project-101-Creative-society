const express = require("express");
const {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} = require("../Controllers/users");

const { verifyUser, verifyAdmin } = require("../utils/verifyToken");

const router = require("express").Router();

// UPDATE
router.put("/:id", verifyUser, updateUser);

// DELETE
router.delete("/:id", verifyUser, deleteUser);

// GET
router.get("/:id", verifyUser, getUser);

// GET ALL USERS
router.get("/", verifyAdmin, getUsers);

module.exports = router;
