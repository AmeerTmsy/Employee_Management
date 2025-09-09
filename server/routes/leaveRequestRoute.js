const express = require('express');
const { allLeaveReqests, addLeaveRequest, updateLeaveRequestStatus, deleteLeaveRequest, LeaveReqestsOfEmpId } = require('../controllers/leaveRequestController');
const router = express.Router();

router.get('/', allLeaveReqests);
router.get('/:id', LeaveReqestsOfEmpId);
router.post('/', addLeaveRequest);
router.patch('/:id', updateLeaveRequestStatus);
router.delete('/', deleteLeaveRequest);

module.exports = router;