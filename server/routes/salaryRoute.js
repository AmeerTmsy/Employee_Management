const express = require('express');
const sendSalarySlip = require('../controllers/salaryController');
const router = express.Router();

router.get('/:id', sendSalarySlip)

module.exports = router