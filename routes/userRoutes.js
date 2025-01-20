const express = require("express");
const controller = require("../controller/userController");

const route = express.Router();

route.post("/sign-up", controller.createUser);
route.post("/log-in", controller.logInUser);

module.exports = route;
