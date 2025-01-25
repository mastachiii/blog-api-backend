const express = require("express");
const controller = require("../controller/postController");
const passport = require("passport");
const userStrategy = require("../passport/passport");

const route = express.Router();

passport.use(userStrategy);

route.get("/", controller.getAllPosts);
route.get("/:id", controller.getPost);

route.post("/:id", passport.authenticate("jwt", { session: false }), controller.createComment); // I think this is much better than creating a whole new route / controller for comments.

route.put("/:id", controller.updatePost);

module.exports = route;
