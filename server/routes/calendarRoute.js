const express = require("express");
const { createEvent, getEvents, deleteEvent } = require("../controllers/calendarController");
const { checkLogin } = require("../midleware/checkLogin");
const router = express.Router();

//  Protect routes with JWT
router.post("/create", checkLogin, createEvent);
router.get("/list", checkLogin, getEvents);
router.post("/delete", checkLogin, deleteEvent);

module.exports = router;