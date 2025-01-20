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

        return post
    }

    async getPosts() {
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
}

const postdb = new Post();
const commentdb = new Comment();

// commentdb.createComment({ body: "Great post :)", postId: "9aa8e3f3-4ec9-4955-a3be-3dd93a7b41da" });
postdb.getPost({ id: "9aa8e3f3-4ec9-4955-a3be-3dd93a7b41da" });
