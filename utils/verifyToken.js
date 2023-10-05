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
    console.log("User object from token:", user);
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

const verifyCommentOwner = (req, res, next) => {
  // Verify the token first before proceeding with comment authorization checks
  verifyToken(req, res, (err) => {
    if (err) {
      // Handle token verification errors
      return next(err);
    }

    // Check if the user is the owner of the comment or admin
    const postId = req.params.postId;
    const commentId = req.params.commentId;

    Post.findById(postId)
      .then((post) => {
        if (!post) {
          res.status(404).send("Post Not Found");
          return next(createError(404, "Post not found!"));
        }

        const comment = post.comments.id(commentId);

        if (!comment) {
          res.status(404).send("Comment Not Found");
          return next(createError(404, "Comment not found!"));
        }

        console.log("req.user:", req.user);
        console.log("comment.user:", comment.user);
        console.log(
          "Comparison:",
          comment.user.toString() === req.user._id.toString()
        );

        if (
          req.user &&
          req.user._id &&
          comment.user &&
          comment.user.toString() === req.user._id.toString()
        ) {
          next();
        } else if (req.user.isAdmin) {
          next();
        } else {
          res
            .status(403)
            .send("You are not authorized to perform this request.");
        }
      })
      .catch((err) => {
        console.log(`Detailed : ${err}`);
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
module.exports.verifyPostOwner = verifyPostOwner;
module.exports.verifyCommentOwner = verifyCommentOwner;
