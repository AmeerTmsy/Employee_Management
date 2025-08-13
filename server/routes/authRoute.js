const express = require('express')
const { logout, login, loginVerify } = require('../controllers/authController')
const router = express.Router()


router.post('/login', login)
router.get('/logout', logout)
router.get('/loginVerify', loginVerify)

module.exports = router
