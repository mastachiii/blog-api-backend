const express = require("express");
const passport = require("passport");

// Passport config
const strategy = require("./passport/passport");

// Routes
const post = require("./routes/postRoutes");
const user = require("./routes/userRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/posts", post);
app.use("/", user);
passport.use(strategy);

app.get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
    console.log(req.headers);
    res.send("Hello Express");
});

// Error handler
app.use((err, req, res, next) => {
    console.log(err);

    return res.json(err.message);
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
