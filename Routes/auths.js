const { login, register, logout } = require("../Controllers/auths");
const router = require("express").Router();

// Routes
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
