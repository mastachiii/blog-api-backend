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

    async getPosts() {
        const posts = await prisma.post.findMany({});

        console.log(posts);

        return posts;
    }
}

const postdb = new Post();

postdb.getPosts();
