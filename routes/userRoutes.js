const express = require("express");
const user_route = express();

const User = require("../models/userModel");
const userController = require("../controllers/userController");

const bodyParser = require("body-parser");

user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({ extended: true }));

user_route.set("view engine", "ejs");
user_route.set("views", "../view/register.ejs");

user_route.use(express.static("public"));

const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images"));
  },
  filename: function (req, file, cb) {
    const name = Date.now + "-" + file.originalname;
    cb(null, name);
  },
});

const upload = multer({ storage: storage });

user_route.get("/register", userController.registerLoad);
user_route.post("/register", upload.single("image"), userController.register);

module.exports = user_route;
