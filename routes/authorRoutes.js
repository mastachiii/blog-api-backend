const express = require("express");
const controller = require("../controller/postController");
const passport = require("passport");
const { authorStrategy } = require("../passport/passport");

const route = express.Router();

// Check if user is author before proceeding to controller
function verifyAuthor(req, res, next) {
    if (req.user.username !== "mastachii") return res.status(403).send({ message: "Unauthorized" });

    next();
}

route.post("/", passport.authenticate("jwt", { session: false }), verifyAuthor, controller.createPost);

module.exports = route;
