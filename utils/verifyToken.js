const jwt = require("jsonwebtoken");
const { createError } = require("../utils/error");

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }

  jwt.verify(token, process.env.JWT_PRIVATEKEY, (err, user) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.user = user;
    next();
  });
};

const verifyUser = (req, res, next) => {
  // Verify the token first before proceeding with user authorization checks
  verifyToken(req, res, (err) => {
    if (err) {
      console.log("Is the token invalid?");
      // Handle token verification errors
      return next(err);
    }

    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).send("You are not authorized");
      return next(createError(403, "You are not authorized!"));
    }
  });
};

const verifyAdmin = (req, res, next) => {
  // Verify the token first before proceeding with admin authorization checks
  verifyToken(req, res, (err) => {
    if (err) {
      // Handle token verification errors
      return next(err);
    }

    if (req.user.isAdmin) {
      res.send("It actually came here, woww");
      res.send(`Admin or not: ${req.user.isAdmin}`);
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

module.exports.verifyToken = verifyToken;
module.exports.verifyUser = verifyUser;
module.exports.verifyAdmin = verifyAdmin;
