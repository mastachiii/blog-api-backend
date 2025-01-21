const { User } = require("../model/queries");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const db = new User();

// Validation stuff
const passwordErrorMessage =
    "The password you entered seems to be invalid, your password needs to have atleast 10 characters and contains both numbers and letters.";
const validateUser = [
    body("username")
        .trim()
        .notEmpty()
        .withMessage("Username is required")
        .custom(async value => {
            const user = await db.getUserByUsername({ username: value });

            if (user) throw "User already exists";
        }),
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .custom(async value => {
            const user = await db.getUserByEmail({ email: value });

            if (user) throw "Email has already been used";
        }),
    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password is required")
        .isAlphanumeric()
        .withMessage(passwordErrorMessage)
        .isLength({ min: 10 })
        .withMessage(passwordErrorMessage),
    body("passwordConfirm")
        .trim()
        .notEmpty()
        .custom((value, { req }) => {
            return value === req.body.password;
        })
        .withMessage("The password does not match."),
];

const createUser = [
    validateUser,
    async (req, res, next) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) res.status(400).json({ errorMessage: errors.array() });

            const { username, password, email } = req.body;

            bcrypt.hash(req.body.password, 10, async (err, hashedPass) => {
                if (err) next(err);

                req.body.password = hashedPass;

                await db.createUser(req.body);
                res.sendStatus(204);
            });
        } catch (err) {
            next(err);
        }
    },
];

async function logInUser(req, res, next) {
    try {
        const user = await db.getUserByUsername(req.body);
        if (!user) return res.status(401).json({ message: "Incorrect username or password", err: true });

        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) return res.status(401).json({ message: "Incorrect username or password", err: true });

        const secret = process.env.SECRET;

        jwt.sign({ user }, secret, { expiresIn: "1d" }, (err, token) => {
            if (err) next(err);

            res.json(token);
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createUser,
    logInUser,
};
