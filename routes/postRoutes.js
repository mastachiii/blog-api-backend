const express = require("express");
const controller = require("../controller/postController");

const route = express.Router();

route.get("/", controller.getAllPosts);

route.post("/", controller.createPost);
route.post("/:id", controller.createComment); // I think this is much better than creating a whole new route / controller for comments.

route.put("/:id", controller.updatePost);

module.exports = route;
