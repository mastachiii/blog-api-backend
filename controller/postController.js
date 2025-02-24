const { Post, Comment } = require("../model/queries");
const { body, validationResult } = require("express-validator");

// Database stuff
const post = new Post();
const comment = new Comment();

const validatePost = [
    body("title").trim().notEmpty().withMessage("Title is required").isLength({ max: 300 }).withMessage("Title must not exceed 300 characters."),
    body("body").trim().notEmpty().withMessage("Post is required").isLength({ max: 40000 }).withMessage("Post must not exceed 40000 characters."),
];

const validateComment = [
    body("comment")
        .trim()
        .notEmpty()
        .withMessage("Comment can not be empty")
        .isLength({ max: 10000 })
        .withMessage("Comment must not exceed 10000 characters"),
];

const createPost = [
    validatePost,
    async (req, res, next) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) return res.status(400).json({ errorMessage: errors.array() });

            const { title, body, private, backdropUrl } = req.body;
            const newPost = await post.createPost({ title, body, isPrivate: private, backdropUrl });

            return res.status(201).json({ newPost });
        } catch (err) {
            next(err);
        }
    },
];

const updatePost = [
    validatePost,
    async (req, res, next) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) return res.status(400).json({ errorMessage: errors.array() });

            const { title, body, private, backdropUrl } = req.body;

            await post.updatePost({ title, body, isPrivate: private, backdropUrl, postId: req.params.id });

            return res.status(204).send();
        } catch (err) {
            next(err);
        }
    },
];

const createComment = [
    validateComment,
    async (req, res, next) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) return res.status(400).json({ errorMessage: errors.array() });

            const data = await comment.createComment({ body: req.body.comment, userId: req.user.id, postId: req.params.id });

            res.status(201).json({ data });
        } catch (err) {
            next(err);
        }
    },
];

async function getAllPublicPosts(req, res, next) {
    try {
        const posts = await post.getAllPublicPosts();

        return res.status(200).json({ posts });
    } catch (err) {
        next(err);
    }
}

async function getAllPosts(req, res, next) {
    try {
        const posts = await post.getAllPosts();

        return res.status(200).json({ posts });
    } catch (err) {
        next(err);
    }
}

async function getPost(req, res, next) {
    try {
        const data = await post.getPost({ id: req.params.id });

        return res.status(200).json({ data });
    } catch (err) {
        next(err);
    }
}

async function deletePost(req, res, next) {
    try {
        await post.deletePost({ id: req.params.id });

        return res.sendStatus(204);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createPost,
    getAllPublicPosts,
    updatePost,
    createComment,
    getPost,
    deletePost,
    getAllPosts,
};
