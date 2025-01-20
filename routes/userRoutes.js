const express = require("express");
const controller = require("../controller/userController");

const route = express.Router();

route.post("/sign-up", controller.createUser);

module.exports = route;
