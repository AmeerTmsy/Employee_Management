const Employee = require("../models/employeeModel")
const Attendance = require("../models/attendanceModel")
const moment = require('moment')

// getting the list of attendance
const getAllAttendanceList = async (req, res) => {
    try {
        const attendance = await Attendance.find({});
        res.status(200).json({
            success: true,
            message: 'Successfull retrieving attendance data',
            attendance,
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error while retrieving attendance data',
            error
        })
    }
}
const getAttendanceOfMonth = async (req, res) => {
    const today = moment();
    const startOfMonth = moment().startOf('month').format('YYYY-MM-DD');
    const yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD');
    // console.log("today: ", today,"\nstartOfMonth: ", startOfMonth, "\nyesterday: ", yesterday)

    try {
        const result = await Attendance.aggregate([
            {
                $unwind: '$records'
            },
            {
                $match: {
                    'records.date': {
                        $gte: startOfMonth,
                        $lte: yesterday
                    },
                    'records.status': 'L'
                }
            },
            {
                $group: {
                    _id: null,
                    totalLeaves: { $sum: 1 }
                }
            }
        ]);
        res.status(200).json({
            success: true,
            message: 'Successfull retrieving attendance data',
            result,
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error while retrieving attendance data',
            error
        })
    }
}

// adding attendance to an existing employee
const addAttendance = async (req, res) => {
    const { employeeId, date, status } = req.body
    console.log(req.body)
    try {
        const employee = await Employee.findOne({ _id: employeeId }).exec();
        if (!employee) return res.status(404).json({ success: false, message: 'Employee not found' });
        // console.log(employee)

        const employeeAttendance = await Attendance.findOne({ employeeId }).exec();
        if (!employeeAttendance) return res.status(404).json({ success: false, message: 'Employee attendance not found' });

        const existingRecord = employeeAttendance.records.find(rec => rec.date === date);
        if (existingRecord) existingRecord.status = status;
        else employeeAttendance.records.push({ date, status });

        console.log('employeeAttendance: ', employeeAttendance);

        await employeeAttendance.save();
        res.status(200).json({
            success: true,
            message: 'Adding attendance for the employee',
            // employeeAttendance
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error while adding attendance, ',
            'error': error
        })
    }
}

module.exports = {
    addAttendance,
    getAllAttendanceList,
    getAttendanceOfMonth,

}