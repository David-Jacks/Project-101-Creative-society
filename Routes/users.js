const { verify } = require("jsonwebtoken");
const {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} = require("../Controllers/users");

const { verifyUser, verifyToken } = require("../utils/verifyToken");

const router = require("express").Router();

// UPDATE
router.put("/:id", verifyToken, updateUser);

// DELETE
router.delete("/:id", verifyUser, deleteUser);

// GET
router.get("/:id", getUser);

// GET ALL USERS
router.get("/", getUsers);

module.exports = router;
