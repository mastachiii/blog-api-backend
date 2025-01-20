const express = require("express");
const controller = require("../controller/postController");

const route = express.Router();

route.get("/", controller.getAllPosts);

route.post("/", controller.createPost);

module.exports = route;
