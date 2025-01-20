const passport = require("passport");
const bcrypt = require("bcryptjs");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const { User } = require("../model/queries");
require("dotenv").config();

const db = new User();

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET,
};

// Two auth strategies, one to protect routes from unauth users and the other one to protect routes from users other than me...
const userStrategy = new JwtStrategy(options, async (payload, done) => {
    try {
        console.log(payload)
        const user = await db.getUserByUsername({ username: payload.user.username });
        if (!user) return done(null, false);

        return done(null, user);
    } catch (err) {
        done(err);
    }
});

const authorStrategy = new JwtStrategy(options, async (payload, done) => {
    try {
        console.log(payload)
        const user = await db.getUserByUsername({ username: payload.user.username });
        if (user.username !== "mastachii") return done(null, false);

        return done(null, user);
    } catch (err) {
        done(err);
    }
});

module.exports = {
    userStrategy,
    authorStrategy,
};
