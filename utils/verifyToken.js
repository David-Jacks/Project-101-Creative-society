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
  console.log("We came to the verfiy user section");
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (!req.user.isAdmin) {
      res.json("It actually cam here, woww");
      res.json(`Admin or not: ${req.user.isAdmin}`);
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

module.exports.verifyToken = verifyToken;
module.exports.verifyUser = verifyUser;
module.exports.verifyAdmin = verifyAdmin;
