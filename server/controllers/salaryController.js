const sendEmail = require("../config/sendMail");
const Employee = require("../models/employeeModel");
const generateSalarySlipPDF = require("../utility/generateSalarySlipPDF");

const sendSalarySlip = async (req, res) => {
    try {
        const { id } = req.params
        console.log('id: ', id)
        const employee = await Employee.findById({ _id: id }).exec();
        console.log('employee: ', employee)
        const pdfBuffer = await generateSalarySlipPDF()
        await sendEmail(
            employee.email,
            `Salary Slip of ${employee.name} ${employee.email}`,
            `Dear ${employee.name},\nPlease find attached your salary slip for ${'employee.month'} ${'employee.year'}.`,
            '',
            [
                {
                    filename: `SalarySlip_${employee.name}_${'employee.month'}_${'employee.year'}.pdf`,
                    content: pdfBuffer,
                }
            ]
        )
        res.json({
            success: true,
            message: "Salary slip sent successfull",
            pdfBuffer
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

module.exports = sendSalarySlip