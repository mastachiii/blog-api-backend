const express = require("express");
const controller = require("../controller/postController");
const passport = require("passport");
const userStrategy = require("../passport/passport");

const route = express.Router();

route.get("/", controller.getAllPublicPosts);
route.get("/:id", controller.getPost);

route.post("/:id", passport.authenticate("jwt", { session: false }), controller.createComment); // I think this is much better than creating a whole new route / controller for comments.

module.exports = route;
