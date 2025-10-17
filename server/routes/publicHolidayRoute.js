const express = require('express');
const { getAllPublicHoliday, getPublicHolidayById, createPublicHoliday, updatePublicHoliday, deletePublicHoliday } = require('../controllers/publicLeaveController');
const router = express.Router();

router.get('/', getAllPublicHoliday);
router.get('/:id', getPublicHolidayById);
router.post('/', createPublicHoliday);
router.patch('/:id', updatePublicHoliday);
router.delete('/:id', deletePublicHoliday);

module.exports = router 