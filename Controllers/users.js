const { User } = require("../Models/User");

// Update User by unique ID
const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).send("Succesfully updated");
  } catch (err) {
    console.log("Not updated");
    res
      .status(400)
      .send("Not authorized to update this user or user doesnt exist");
    next(err);
  }
};

// Delete user by unique ID
const deleteUser = async (req, res, next) => {
  try {
    const deletedUser = await User.findById(req.params.id);
    if (deletedUser == null) {
      res.status(404).send("User does not exist.");
      return;
    }
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send("User has been deleted.");
  } catch (err) {
    next(err);
  }
};

// Search for a user by unique ID
const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// Search for all users
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

module.exports.getUser = getUser;
module.exports.getUsers = getUsers;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
