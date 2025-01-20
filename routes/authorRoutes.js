const express = require("express");
const controller = require("../controller/postController");
const passport = require("passport");
const { authorStrategy } = require("../passport/passport");

const route = express.Router();

passport.use(authorStrategy);

route.get("/", passport.authenticate("jwt", { session: false }), controller.getAllPosts);

route.post("/", controller.createPost);

module.exports = route;
