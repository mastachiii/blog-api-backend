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

    async getPost({ id }) {
        const post = await prisma.post.findUnique({
            where: { id },
            include: {
                comments: true,
            },
        });

        console.log(post);

        return post;
    }

    async getAllPosts() {
        const posts = await prisma.post.findMany({
            include: {
                comments: true,
            },
        });

        console.log(posts);

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
        console.dir(comments, { colors: true, depth: null });
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
                        body: "NULL"
                    },
                },
            },
        });

        return user;
    }

    async getUser({ email }) {
        const user = await prisma.user.findUnique({
            where: { email },
            include: {
                comments: true
            }
        });
        console.log(user);
        return user;
    }
}

const postdb = new Post();
const commentdb = new Comment();
const userdb = new User();
