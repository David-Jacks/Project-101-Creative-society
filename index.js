const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const auths = require("./Routes/auths");
const users = require("./Routes/users");
const cookieParser = require("cookie-parser");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/api/auths", auths);
app.use("/api/users", users);

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Successfully connected to mongoDB");
      } catch (error) {
        throw error;
      }
}

mongoose.connection.on("disconnected", () => {
    console.log("Disconnected From MongoDB");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>{
    connect();
    console.log(`Backend server listening on port ${PORT}`);
});
