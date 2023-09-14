const { login, register } = require("../Controllers/auths"); 
const router = require("express").Router();

// Routes
router.post("/register", register);
router.post("/login", login);

module.exports = router;


