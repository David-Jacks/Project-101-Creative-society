const jwt = require("jsonwebtoken");
const { createError } = require("../utils/error");
const { Post } = require("../Models/Post");

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

const verifyPost = (req, res, next) => {
  console.log(`Post: ${Post.findById(req.params.id)}`);
  console.log("we didnt come here, did we?");
  // Verify the token first before proceeding with user authorization checks
  verifyToken(req, res, (err) => {
    if (err) {
      console.log("Is the token invalid?");
      // Handle token verification errors
      return next(err);
    }
    console.log(`req.user.username: ${req.user.username}`);
    // console.log(`req.params: ${[req.params]}`);
    console.log(`req.body: ${JSON.stringify(req.body)}`);

    console.log(`isAdmin: ${req.user.isAdmin}`);
    console.log(`req.body.author: ${req.body.author}`);
    if (req.body.author === undefined) {
      res.status(400).send("The request needs the author name");
      console.log("So we got here!!!!!!");
      return;
    }

    if (req.user.username === req.body.author || req.user.isAdmin) {
      console.log("How about here!!!");
      next();
    } else {
      console.log("OR How about here!!!");
      res.status(403).send("You are not authorized");
      return next(createError(403, "You are not authorized!"));
    }
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

const verifyPostOwner = (req, res, next) => {
  // Verify the token first before proceeding with user authorization checks
  verifyToken(req, res, (err) => {
    if (err) {
      // Handle token verification errors
      return next(err);
    }

    // Check if the user is the owner of the post
    const postId = req.params.id;

    Post.findById(postId)
      .then((post) => {
        if (!post) {
          res.status(404).send("Post Not Found");
          return next(createError(404, "Post not found!"));
        }

        if (req.user.username === post.author || req.user.isAdmin) {
          next();
        } else {
          res
            .status(403)
            .send("You are not authorized to perform this request.");
        }
      })
      .catch((err) => {
        return next(createError(500, "Internal server error."));
      });
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
module.exports.verifyPost = verifyPost;
module.exports.verifyPostOwner = verifyPostOwner;
