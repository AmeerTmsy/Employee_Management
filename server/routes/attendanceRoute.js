const express = require('express')
const { createNewAttendance, addAttendance, getNewEmployees, getAllAttendanceList } = require('../controllers/attendanceController')
const router = express.Router()


router.get('/', getAllAttendanceList)
router.post('/add', addAttendance)

module.exports = router
