//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors")
const connectToMongo = require("./Database/db");
const port = 5000;
connectToMongo();

const UserRouter = require("./routes/user");
const PostRouter = require("./routes/post");
const AuthRouter = require("./routes/auth");

const app = express();
app.use(cors());
// app.use(cors({ origin: process.env.FRONTEND_URI }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/user", UserRouter);
app.use("/api/v1/post", PostRouter);

app.listen(port, function (err) {
    if (!err) {
        console.log("server is running on port " + port);
    } else {
        console.error(err);
    }
})