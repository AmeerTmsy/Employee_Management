const Employee = require("../models/employeeModel");
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    console.log('login.....\n', req.body);

    try {

        let employee = await Employee.findOne({ email: req.body.email }).select('-password').exec()
        console.log("employee: ", employee.name);
        let token = jwt.sign({ name: employee.name, id: employee.employeeId, email: employee.email }, process.env.TOKEN_SECRET)
        console.log(token);

        if (!employee) return res.status(404).json({
            success: false,
            message: "User not found",
        })

        res.cookie('token', token, { httpOnly: true, secure: process.env.ENVIRONMENT === 'development' ? false : true, maxAge: 1 * 60 * 60 * 1000, sameSite: 'None' })
        res.status(200).json({
            success: true,
            message: "Login successfully",
            employee
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: `Error while login, error${error}`,
        })
    }
}

const logout = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            message: "Logout successfully",
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: `Error while logout, error${error}`,
        })
    }
}

const loginVerify = async (req, res) => {
    // console.log('req.cookie:............................................\n ', req.cookies);
    try {

        if (req.cookies.token) {
            const tokenDecode = jwt.verify(req.cookies.token, process.env.TOKEN_SECRET)
            // console.log(tokenDecode);
            let employee = await Employee.findOne({ email: tokenDecode.email }).select('-password').exec()
            return res.status(200).json({
                success: true,
                message: "Verifyed",
                employee
            })
        }
        return res.status(200).json({
            success: false,
            message: "token not verifyed",
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: `Error while verifying login, error${error}`,
        })
    }
}

module.exports = {
    login,
    logout,
    loginVerify
}