const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.get("/google", passport.authenticate(
    "google", {
        scope: ["profile", "email", "https://www.googleapis.com/auth/calendar.events"],
        accessType: "offline",      // 👈 forces refreshToken
        prompt: "consent",          // 👈 asks user every time
    }
));

router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: `${process.env.FRONTEND_URL}/login`, session: false }),
    (req, res) => {
        console.log("req.user: auth.js ", req.user)
        const token = jwt.sign(
            { id: req.user._id, email: req.user.email },
            process.env.TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        res.cookie('token', token, { 
            httpOnly: true,
            secure: process.env.ENVIRONMENT === 'development' ? false : true,
            sameSite: process.env.ENVIRONMENT === "development" ? 'Lax' : 'None',
            // maxAge: 1 * 60 * 60 * 1000,
         });
        res.redirect(process.env.FRONTEND_URL);
    }
)

module.exports = router;