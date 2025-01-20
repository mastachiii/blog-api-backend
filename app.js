const express = require("express");

// Routes
const post = require("./routes/postRoutes");
const user = require("./routes/userRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/posts", post);
app.use("/", user);

app.get("/", (req, res) => {
    res.send("Hello Express");
});

// Error handler
app.use((err, req, res, next) => {
    console.log(err);

    return res.json(err.message);
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));