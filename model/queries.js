const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class Post {
    async createPost({ title, body, isPrivate }) {
        const post = await prisma.post.create({
            data: {
                title,
                body,
                isPrivate,
            },
        });

        return post;
    }

    async updatePost({ title, body, isPrivate, postId }) {
        const post = await prisma.post.update({
            where: { id: postId },
            data: {
                title,
                body,
                isPrivate,
            },
        });

        return post;
    }

    async getPost({ id }) {
        const post = await prisma.post.findUnique({
            where: { id },
            include: {
                comments: true,
            },
        });

        return post;
    }

    async getAllPosts() {
        const posts = await prisma.post.findMany({
            include: {
                comments: true,
            },
        });

        return posts;
    }
}

class Comment {
    async createComment({ body, postId }) {
        const comment = await prisma.comment.create({
            data: {
                body,
                postId,
            },
        });

        return comment;
    }

    async getComment({ id }) {
        const comment = await prisma.comment.findUnique({
            where: { id },
            include: {
                Post: true,
            },
        });
    }

    async getAllComments() {
        const comments = await prisma.comment.findMany({
            include: {
                Post: true,
            },
        });

        return comments;
    }
}

class User {
    async createUser({ username, password, email }) {
        const user = await prisma.user.create({
            data: {
                username,
                password,
                email,
                comments: {
                    create: {
                        body: "NULL",
                    },
                },
            },
        });

        return user;
    }

    async getUserByEmail({ email }) {
        const user = await prisma.user.findUnique({
            where: { email },
            include: {
                comments: true,
            },
        });

        return user;
    }

    async getUserByUsername({ username }) {
        const user = await prisma.user.findUnique({
            where: { username },
            include: {
                comments: true,
            },
        });

        return user;
    }
}

module.exports = {
    Post,
    Comment,
    User,
};
