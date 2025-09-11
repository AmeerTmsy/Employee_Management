const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const Employee = require("../models/employeeModel");

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:3000/api/auth/google/callback",
            passReqToCallback: true,
        },
        async (req, accessToken, refreshToken, profile, done) => {
            try {
                let user = await Employee.findOne({ googleId: profile.id }).select('-password').exec()
                console.log("googleAuth.js loaded");

                if (!user) {
                    user = await Employee.create({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        googleId: profile.id,
                        refreshToken: refreshToken,
                    });
                } else {
                    if (refreshToken) {
                        user.refreshToken = refreshToken;
                        await user.save();
                    }
                }

                return done(null, user);
            } catch (err) {
                return done(err, null);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    Employee.findById(id).then(user => done(null, user))
})

module.exports = passport;