const router = require("express").Router();
const {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
} = require("../Controllers/follow");

const { verifyToken } = require("../utils/verifyToken");

// Follow a user
router.post("/follow/:userId", verifyToken, followUser);

// Unfollow a user
router.post("/unfollow/:userId", verifyToken, unfollowUser);

// Get a user's followers
router.get("/followers/:userId", verifyToken, getFollowers);

// Get users followed by a user
router.get("/following/:userId", verifyToken, getFollowing);

module.exports = router;
