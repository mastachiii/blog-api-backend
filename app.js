const express = require("express");
const passport = require("passport");
const cors = require("cors");
const userStrategy = require('./passport/passport')

// Routes
const post = require("./routes/postRoutes");
const user = require("./routes/userRoutes");
const postAuthor = require("./routes/authorRoutes"); // post routes that only author can access

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
passport.use(userStrategy); // Load strategy before routes
app.use("/posts", postAuthor);
app.use("/posts", post);
app.use("/", user);

// Error handler
app.use((err, req, res, next) => {
    console.log(err);

    return res.json(err.message);
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
