const express = require('express');
const { allLeaveReqests, addLeaveRequest, countLeaveRequests, updateLeaveRequestStatus, deleteLeaveRequest, LeaveReqestsOfEmpId, pendingLeaveReqests } = require('../controllers/leaveRequestController');
const router = express.Router();

router.get('/', allLeaveReqests);
router.get('/pending', pendingLeaveReqests);
router.get('/count', countLeaveRequests);
router.get('/:id', LeaveReqestsOfEmpId);
router.post('/', addLeaveRequest);
router.patch('/:id', updateLeaveRequestStatus);
router.delete('/', deleteLeaveRequest);

module.exports = router;