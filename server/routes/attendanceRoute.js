const express = require('express')
const { createNewAttendance, addAttendance, getNewEmployees, getAllAttendanceList, getAttendanceOfMonth } = require('../controllers/attendanceController')
const router = express.Router()


router.get('/', getAllAttendanceList)
router.get('/month-attendance', getAttendanceOfMonth)
router.post('/add', addAttendance)

module.exports = router
