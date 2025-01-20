const express = require("express");

// Routes
const post = require("./routes/postRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/posts", post);

app.get("/", (req, res) => {
    res.send("Hello Express");
});

app.use((err, req, res, next) => {
    console.log(err);

    return res.json(err.message);
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
