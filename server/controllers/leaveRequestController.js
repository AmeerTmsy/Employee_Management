const LeaveRequest = require("../models/leaveRquestModel");

const allLeaveReqests = async (req, res) => {
    try {
        console.log("req.body:", req.body);
        const leaveRequests = await LeaveRequest.find({})
        res.json({
            message: 'All Leave Requests',
            leaveRequests
        })
    } catch (err) {
        res.json({ message: 'Something went wrong' })
    }
}

const pendingLeaveReqests = async (req, res) => {
    try {
        // console.log("req.body:", req.body);
        const leaveRequests = await LeaveRequest.aggregate([
            {
                $project: {
                    employeeId: 1,
                    leaves: {
                        $filter: {
                            input: "$leaves",
                            as: "leave",
                            cond: { $in: ["$$leave.status", ["Pending"]] }
                        }
                    }
                }
            },
            {
                $match: {
                    "leaves.0": { $exists: true } // only include docs with matching leaves
                }
            }
        ]);

        res.json({
            message: 'Pending Leave Requests',
            leaveRequests
        })
    } catch (err) {
        res.json({ message: 'Something went wrong' })
    }
}

const countLeaveRequests = async (req, res) => {
    try {
        const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));

        const employeesleaveRequests = await LeaveRequest.find({}).lean()
        const result = { sick: 0, casual: 0, other: 0 };

        employeesleaveRequests.forEach(employee => {
            employee.leaves.forEach(leave => {
                if (leave.status === 'Approved' &&
                    new Date(leave.date) >= startOfMonth &&
                    new Date(leave.date) <= yesterday) {
                        const leaveType = leave.leaveType.toLowerCase()
                    if (result.hasOwnProperty(leaveType)) {
                        result[leaveType]++;
                    }
                    console.log(leave)
                }
            });
        });

        res.json({
            message: 'Leave counts',
            result
        })
    } catch (err) {
        res.json({ message: 'Something went wrong' })
    }
}



const LeaveReqestsOfEmpId = async (req, res) => {
    try {
        console.log("req.params.id:", req.params.id);
        let leaveRequest = await LeaveRequest.findOne({ employeeId: req.params.id }).exec();
        if (!leaveRequest) return res.status(400).json({
            message: 'Not any associated leave record with this employee'
        });

        res.status(200).json({
            message: `Leave Requests of  ${req.params.id}`,
            leaveRequest
        })
    } catch (err) {
        res.status(400).json({ message: 'Something went wrong', err })
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
            const existingLeave = leaveRequest.leaves.find((leave) => leave.date === new Date(date));
            if (existingLeave) return res.status(400).json({
                message: 'A leave request already exists for this date'
            });

            leaveRequest.leaves.push(newLeave);
            await leaveRequest.save();
        } else {
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
    try {
        const { status, leaveId } = req.body;
        const employeeId = req.params.id;
        const leaveRequest = await LeaveRequest.findOneAndUpdate(
            { employeeId, "leaves._id": leaveId },
            {
                $set: {
                    "leaves.$.status": status,
                    "leaves.$.updatedAt": Date.now()
                }
            }, { new: true }
        );

        if (!leaveRequest) {
            return res.status(404).json({ message: 'Leave request not found' });
        }

        res.status(200).json({ message: 'Update Leave Requests', leaveRequest })
    } catch (err) {
        res.status(400).json({ message: 'Something went wrong', err })
    }
}
const deleteLeaveRequest = async (req, res) => {
    res.json({ message: 'Delete Leave Requests' })
}

module.exports = {
    allLeaveReqests,
    pendingLeaveReqests,
    countLeaveRequests,
    LeaveReqestsOfEmpId,
    addLeaveRequest,
    updateLeaveRequestStatus,
    deleteLeaveRequest,
}