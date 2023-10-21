const express = require("express");
const router = express.Router();
const { User } = require("../Models/User");

const followUser = async (req, res) => {
  const currentUser = req.user;
  const userIdToFollow = req.params.id;

  // Add the user being followed to the "following" list of the current user
  currentUser.following.push(userIdToFollow);
  await currentUser.save();

  // Add the current user to the "followers" list of the user being followed
  const userToFollow = await User.findById(userIdToFollow);
  userToFollow.followers.push(currentUser.id);
  await userToFollow.save();

  res.status(200).json({ message: "User followed successfully." });
};

const unfollowUser = async (req, res) => {
  const currentUser = req.user;
  const userIdToUnfollow = req.params.id;

  // Remove the user being unfollowed from the "following" list of the current user
  currentUser.following = currentUser.following.filter(
    (id) => id.toString() !== userIdToUnfollow
  );
  await currentUser.save();

  // Remove the current user from the "followers" list of the user being unfollowed
  const userToUnfollow = await User.findById(userIdToUnfollow);
  userToUnfollow.followers = userToUnfollow.followers.filter(
    (id) => id.toString() !== currentUser._id.toString()
  );
  await userToUnfollow.save();

  res.status(200).json({ message: "User unfollowed successfully." });
};

const getFollowers = async (req, res) => {
  try {
    const userId = req.params.id;

    // Find the user's followers
    const user = await User.findById(userId).populate(
      "followers",
      "name profilePicture"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const followers = user.followers; // Array of user objects with name and profilePicture

    res.status(200).json(followers);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving followers", error: error.message });
  }
};

const getFollowing = async (req, res) => {
  try {
    const userId = req.params.id;

    // Find the users being followed by the specified user
    const user = await User.findById(userId).populate(
      "following",
      "name profilePicture"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const following = user.following; // Array of user objects with name and profilePicture

    res.status(200).json(following);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving following", error: error.message });
  }
};

module.exports.followUser = followUser;
module.exports.unfollowUser = unfollowUser;
module.exports.getFollowers = getFollowers;
module.exports.getFollowing = getFollowing;
