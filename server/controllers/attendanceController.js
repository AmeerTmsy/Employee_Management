const Employee = require("../models/employeeModel")
const Attendance = require("../models/attendanceModel")

// creating attendance model for a new employee
const createNewAttendance = async (req, res) => {
    try {
        const attendance = new Attendance(req.body);
        await attendance.save();

        res.status(200).json({
            success: true,
            message: 'Creating new attendance model for the employee',
            attendance,
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error while creating new attendance model for the employee',
        })
    }
}

// adding attendance to an existing employee
const addAttendance = async (req, res) => {
    const {employeeId, date, status} = req.body
    try {
        const employee = await Employee.findOne({_id:employeeId}).exec();
        if (!employee) return res.status(404).json({ success: false, message: 'Employee not found' });
        
        const employeeAttendance = await Attendance.findOne({employeeId}).exec();
        if (!employeeAttendance) return res.status(404).json({ success: false, message: 'Employee attendance not found' });
        console.log(employeeAttendance);
        employeeAttendance.records.push({date, status})
        await employeeAttendance.save();
        res.status(200).json({
            success: true,
            message: 'Adding attendance for the employee',
            employeeAttendance
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error while adding attendance, ',
            'error': error
        })
    }
}

// searching for new employees (to create new attendance model)
const getNewEmployees = async (req, res) => {
    try {
        const employees = await Employee.find({});
        const employeesToAdd = (
            await Promise.all(
                employees.map(async (emp) => {
                    if (!(await Attendance.findOne({ employeeId: emp._id }))) return emp
                })
            )
        ).filter(Boolean)

        res.status(200).json({
            success: true,
            message: 'New employee for to create attendance model',
            employeesToAdd
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error while chacking for new employees, ',
            'error': error
        })
    }
}

module.exports = {
    createNewAttendance,
    addAttendance,
    getNewEmployees,
}