const { Post } = require("../model/queries");
const { body, validationResult } = require("express-validator");

const db = new Post();

const validateForm = [
    body("title").trim().notEmpty().withMessage("Title is required").isLength({ max: 300 }).withMessage("Title must not exceed 300 characters."),
    body("body").trim().notEmpty().withMessage("Post is required").isLength({ max: 40000 }).withMessage("Post must not exceed 40000 characters."),
];

const createPost = [
    validateForm,
    async (req, res, next) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) return res.status(400).json({ errorMessage: errors.array() });

            const { title, body, private } = req.body;

            const post = await db.createPost({ title, body, isPrivate: private });

            return res.status(201).json({ post });
        } catch (err) {
            next(err);
        }
    },
];

async function getAllPosts(req, res, next) {
    try {
        const posts = await db.getAllPosts();

        return res.status(200).json({ posts });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createPost,
    getAllPosts,
};
