const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.get("/google", passport.authenticate("google", { scope: ["profile", "email", "https://www.googleapis.com/auth/calendar.events"] }));

router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "http://localhost:5173/login", session: false }),
    (req, res) => {
        const token = jwt.sign(
            { id: req.user._id, email: req.user.email },
            process.env.TOKEN_SECRET,
            { expiresIn: '1d' }
        );

        const employee = req.user
        
        res.cookie('token', token, { httpOnly: true });
        res.redirect("http://localhost:5173");
    }
)

module.exports = router;