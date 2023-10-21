const { User } = require("../Models/User");
const bcrypt = require("bcrypt");
const { createError } = require("../utils/error");
const jwt = require("jsonwebtoken");

// Create a new User, the pasword is encrypted by the bcrypt package
const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hash,
      year: req.body.year,
      program: req.body.program,
      isAdmin: req.body.isAdmin,
      savedArticles: req.body.savedArticles,
    });
    const newUsername = await User.findOne({ username: req.body.username });
    const newEmail = await User.findOne({ email: req.body.email });
    if (newUsername || newEmail) {
      res
        .status(400)
        .send("An account with this username and or email already exists");
      return;
    }

    await newUser.save();
    res.status(200).send("User has been created succesfully.");
  } catch (err) {
    next(err);
  }
};

// An already existing user is signing in
const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      res.status(404).send("User not found");
      return;
    }

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect) {
      res.status(400).send("You entered a wrong password");
      return;
      // return next(createError(400, "Wrong password or username!"));
    }

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        following: user.following,
        followers: user.followers,
      },
      process.env.JWT_PRIVATEKEY
    );

    var { username, isAdmin, password, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    next(err);
  }
};

const logout = (req, res) => {
  // Clear the access_token cookie
  res.clearCookie("access_token", { path: "/" });

  //sending this response to the client
  res.status(200).json({ message: "Logout successful" });
};

module.exports.register = register;
module.exports.login = login;
module.exports.logout = logout;
