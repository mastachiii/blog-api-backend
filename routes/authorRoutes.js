const express = require("express");
const controller = require("../controller/postController");
const passport = require("passport");
const { authorStrategy } = require("../passport/passport");

const route = express.Router();

passport.use(authorStrategy);

route.post("/", controller.createPost);

module.exports = route;
