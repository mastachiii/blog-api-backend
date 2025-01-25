const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const { User } = require("../model/queries");
require("dotenv").config();

const db = new User();

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET,
};

const userStrategy = new JwtStrategy(options, async (payload, done) => {
    try {
        const user = await db.getUserByUsername({ username: payload.user.username });
        if (!user) return done(null, false);

        return done(null, user);
    } catch (err) {
        done(err);
    }
});

module.exports = userStrategy;
