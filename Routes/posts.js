const {
  makeAPost,
  updatePost,
  deletePost,
  getPost,
  getPosts,
  searchByTitle,
} = require("../Controllers/posts");
const multer = require("multer");

const { verifyPostOwner } = require("../utils/verifyToken");

const router = require("express").Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Set the destination folder for uploaded photos
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name
  },
});

const upload = multer({ storage: storage });

// Publish a post
// router.post("/", upload.array("photos", 5), makeAPost);
router.post("/", makeAPost);

// UPDATE/EDIT
router.put("/:id", verifyPostOwner, updatePost);

// DELETE
router.delete("/:id", verifyPostOwner, deletePost);

// SEARCH FOR A POST
router.get("/search", searchByTitle);
//http://localhost:3000/api/search?q=programming

// GET
router.get("/:id", getPost);

// GET ALL POSTS
router.get("/", getPosts);

module.exports = router;
