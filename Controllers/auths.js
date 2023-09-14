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
      username : req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hash,
      year: req.body.year,
      program: req.body.program
      
    });

    await newUser.save();
    res.status(200).send("User has been created.");
  } catch (err) {
    next(err);
  }
};

// An already existing user is signing in
const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

    const token = jwt.sign(
      { id: user._id, username: user.username, email: user.email },
      process.env.JWT_PRIVATEKEY
    );

    const { password, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, username, email });
  } catch (err) {
    next(err);
  }
};

module.exports.register = register;
module.exports.login = login;
