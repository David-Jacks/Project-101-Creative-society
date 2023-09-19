const { likeAPost, unlikeAPost, likeCount } = require("../Controllers/likes");
const router = require("express").Router();
const { verifyToken } = require("../utils/verifyToken");

router.post("/:id", verifyToken, likeAPost);
router.post("/:id", verifyToken, unlikeAPost);
router.get("/:id", verifyToken, likeCount);

module.exports = router;
