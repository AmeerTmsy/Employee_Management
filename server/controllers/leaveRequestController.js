const LeaveRequest = require("../models/leaveRquestModel");

const allLeaveReqests = async (req, res) => {
    try {
        console.log("req.body:", req.body);
        res.json({ message: 'All Leave Requests' })
    } catch (err) {
        res.json({ message: 'Something went wrong' })
    }
}
const LeaveReqestsOfEmpId = async (req, res) => {
    try {
        // console.log("req.params.id:", req.params.id);
        let leaveRequest = await LeaveRequest.findOne({ employeeId: req.params.id }).exec();
        if (!leaveRequest) return res.status(400).json({
            message: 'Not any associated leave record with this employee'
        });

        res.json({
            message: `Leave Requests of  ${req.params.id}`,
            leaveRequest
        })
    } catch (err) {
        res.json({ message: 'Something went wrong' })
    }
}
const addLeaveRequest = async (req, res) => {
    try {
        const { employeeId, leaveType, date, reason } = req.body;
        const newLeave = { leaveType, date, reason, status: 'Pending' };

        if (!employeeId || !leaveType || !date) return res.status(400).json({
            message: 'employeeId, leaveType, and date are required'
        });

        let leaveRequest = await LeaveRequest.findOne({ employeeId }).exec();

        if (leaveRequest) {
            const existingLeave = leaveRequest.leaves.find((leave) => leave.date === date);
            if (existingLeave) return res.status(400).json({
                message: 'A leave request already exists for this date'
            });

            leaveRequest.leaves.push(newLeave);
            await leaveRequest.save();
        } else {
            if (err.code === 11000) return res.status(400).json({
                message: 'A leave request document already exists for this employee'
            });
            leaveRequest = new LeaveRequest({ employeeId, leaves: [newLeave] });
            await leaveRequest.save();
        }

        res.status(201).json({ message: 'Leave request added successfully', leaveRequest });
    } catch (err) {
        console.error('Error adding leave request:', err);
        res.status(500).json({ message: 'Something went wrong', error: err.message });
    }
}
const updateLeaveRequestStatus = async (req, res) => {
    res.json({ message: 'Update Leave Requests' })
}
const deleteLeaveRequest = async (req, res) => {
    res.json({ message: 'Delete Leave Requests' })
}

module.exports = {
    allLeaveReqests,
    LeaveReqestsOfEmpId,
    addLeaveRequest,
    updateLeaveRequestStatus,
    deleteLeaveRequest,
}