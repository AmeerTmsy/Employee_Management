const express = require('express')
const { createNewAttendance, addAttendance, getNewEmployees } = require('../controllers/attendanceController')
const router = express.Router()


router.post('/create-new', createNewAttendance)
router.post('/add', addAttendance)
router.get('/new-employees', getNewEmployees)

module.exports = router
