const { User } = require("../model/queries");
const { body, validationResult } = require("express-validator");

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

            await db.createUser({ username, password, email });

            res.status(204).send();
        } catch (err) {
            next(err);
        }
    },
];

module.exports = {
    createUser,
};
