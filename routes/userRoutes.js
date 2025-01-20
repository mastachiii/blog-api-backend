const express = require("express");
const controller = require("../controller/userController");

const route = express.Router();

route.post("/log-in", controller.createUser);

module.exports = route;
