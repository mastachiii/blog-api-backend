const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class Post {
    async createPost({ title, body, isPrivate, backdropUrl }) {
        const post = await prisma.post.create({
            data: {
                title,
                body,
                isPrivate,
                backdropUrl,
            },
        });

        return post;
    }

    async updatePost({ title, body, isPrivate, backdropUrl, postId }) {

        const post = await prisma.post.update({
            where: { id: postId },
            data: {
                title,
                body,
                isPrivate,
                backdropUrl,
            },
        });

        return post;
    }

    async deletePost({ id }) {
        await prisma.post.delete({
            where: { id },
        });
    }

    async getPost({ id }) {
        const post = await prisma.post.findUnique({
            where: { id },
            include: {
                comments: {
                    include: { User: true },
                },
            },
        });

        return post;
    }

    async getAllPublicPosts() {
        const posts = await prisma.post.findMany({
            where: {
                isPrivate: false,
            },
            include: {
                comments: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return posts;
    }

    async getAllPrivatePosts() {
        const posts = await prisma.post.findMany({
            where: {
                isPrivate: true,
            },
            include: {
                comments: true,
            },
        });

        return posts;
    }

    async getAllPosts() {
        const posts = await prisma.post.findMany({
            include: {
                comments: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return posts;
    }
}

class Comment {
    async createComment({ body, postId, userId }) {
        const comment = await prisma.comment.create({
            data: {
                body,
                postId,
                userId,
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
