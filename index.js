const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const auths = require("./Routes/auths");
const users = require("./Routes/users");
const posts = require("./Routes/posts");
const likes = require("./Routes/likes");
const categories = require("./Routes/categories");
const savedArticle = require("./Routes/savedArticles");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config();
const app = express();
app.use(express.json({ limit: "100mb" }));

// CORS configuration to allow any origin
const corsOptions = {
  origin: "*", // Allow requests from any origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Enable credentials (cookies, authorization headers, etc.)
  allowedHeaders: "*", // Allow any headers
};

app.use(cors(corsOptions));

app.use(cookieParser());
app.use("/api/auths", auths);
app.use("/api/users", users);
app.use("/api/posts", posts);
app.use("/api/post/likes", likes);
app.use("/api/categories", categories);
app.use("/api/article", savedArticle);

// Mount the comment routes
app.use("/api/posts", require("./Routes/comments"));

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Successfully connected to mongoDB");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("Disconnected From MongoDB");
});

// Define a route handler for the root URL ("/")
app.get("/", (req, res) => {
  // Redirect to the desired URL
  res.redirect("https://lugblog.netlify.app/");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  connect();
  console.log(`Backend server listening on port ${PORT}`);
});

// const fs = require("fs");
// const folderPath = "./uploads";

// if (!fs.existsSync(folderPath)) {
//   fs.mkdirSync(folderPath);
// }
