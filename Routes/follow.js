const router = require("express").Router();
const {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
} = require("../Controllers/follow");

const { verifyToken } = require("../utils/verifyToken");

// Follow a user
router.post("/follow/:id", verifyToken, followUser);

// Unfollow a user
router.post("/unfollow/:id", verifyToken, unfollowUser);

// Get a user's followers
router.get("/followers/:id", verifyToken, getFollowers);

// Get users followed by a user
router.get("/following/:id", verifyToken, getFollowing);

module.exports = router;
