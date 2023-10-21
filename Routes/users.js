const { verify } = require("jsonwebtoken");
const {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} = require("../Controllers/users");

const { verifyUser, verifyToken } = require("../utils/verifyToken");

const router = require("express").Router();

router.put("/:id", verifyToken, updateUser);

router.delete("/:id", verifyUser, deleteUser);

router.get("/:id", getUser);

router.get("/", getUsers);

module.exports = router;
