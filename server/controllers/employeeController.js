const Employee = require("../models/employeeModel")

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
    res.send('Get Emploee by id')
}

const getEmployeeCount = async (req, res) => {
    try {
        const employeesCount = await Employee.countDocuments({});
        return res.status(200).json({
            success: true,
            message: "Successfully",
            employeesCount,
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: `Error while retriveing employees count, error${error}`,
        })
    }
}


const createEmployee = async (req, res) => {
    // console.log("req.body: ", req.body);
    try {
        const newEmployee = new Employee(req.body);
        await newEmployee.save();
        console.log("newEmployee: ", newEmployee);

        return res.status(200).json({
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
    res.send('update employee')
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
    deleteEmployee
}