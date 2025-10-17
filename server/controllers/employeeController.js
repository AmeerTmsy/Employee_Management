const sendEmail = require("../config/sendMail");
const Attendance = require("../models/attendanceModel");
const Employee = require("../models/employeeModel")
const nodemailer = require('nodemailer');

const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find({});
        // console.log("newEmployee: ", employees);

        return res.status(200).json({
            success: true,
            message: "Successfully",
            employees,
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: `Error while retriveing employees data, error${error}`,
        })
    }
}
const getEmployeeById = async (req, res) => {
    try {
        const { id } = req.params
        const employee = await Employee.findById({ _id: id }).exec();
        if (!employee) return res.status(404).json({
            success: false,
            message: `Employee not found`,
        })
        res.status(200).json({
            success: true,
            message: `found the employee`,
            employee
        })
    } catch (err) {
        res.status(400).json({
            success: false,
            message: `Error while retriveing employee, error${error}`,
        })
    }
}

const getEmployeeCount = async (req, res) => {
    try {
        const employeesCount = await Employee.countDocuments({role: 'employee'});
        res.status(200).json({
            success: true,
            message: "Successfully",
            employeesCount,
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: `Error while retriveing employees count, error${error}`,
        })
    }
}


const createEmployee = async (req, res) => {
    // console.log("req.body: ", req.body);
    try {
        const newEmployee = new Employee(req.body);
        console.log(newEmployee);
        
        // creating attendance model for the employee
        const attendance = new Attendance({ employeeId: newEmployee._id, employeeName: newEmployee.name });
        
        console.log("newEmployee: ", newEmployee);
        
        
        const subject = `${process.env.EMAIL_USER} , An admin from employee management has created a new account for you with an id of ${newEmployee.employeeId}`
        const text = `You can now log in to the Employee Management Web with following credentials. email: ${newEmployee.email}, passowrd: ${newEmployee.password} \n or you can login using Google address with the email ${newEmployee.email}`
        
        const response= await sendEmail(newEmployee.email, subject, text);
        console.log(response);
        
        await newEmployee.save();
        await attendance.save();

        res.status(200).json({
            success: true,
            message: "New employee added successfully",
            data: newEmployee,
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: `Error while adding employee, error${error}`,
        })
    }
}


const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params
        const update = req.body

        const employee = await Employee.findOneAndUpdate({ _id: id }, update, { new: true })
        if (!employee) return res.status(404).json({
            success: false,
            message: `Can not find employee, error${error}`,
        })
        res.status(200).json({
            success: true,
            message: `found the employee data`,
            employee
        })
    } catch (err) {
        res.status(400).json({
            success: false,
            message: `Error while retriveing employee, error${error}`,
        })
    }
}
const deleteEmployee = async (req, res) => {
    res.send('delete employee')
}

module.exports = {
    getAllEmployees,
    getEmployeeById,
    getEmployeeCount,
    createEmployee,
    updateEmployee,
    deleteEmployee,
}