const {
  likeCount,
  topLiked,
  getRecentPosts,
  likeOrUnlikePost,
  getTopLikedAuthors,
} = require("../Controllers/likes");
const router = require("express").Router();
const { verifyToken } = require("../utils/verifyToken");

// the top liked route has to be defined first else there would be a castID error
router.get("/recent-posts", getRecentPosts);
router.get("/top-liked", topLiked);
router.post("/:id", verifyToken, likeOrUnlikePost);
router.get("/:id", verifyToken, likeCount);
router.get("/topauthors/top-liked-authors", getTopLikedAuthors);

module.exports = router;
