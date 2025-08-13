const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    employeeId: String,
    name: String,
    email: String,
    designation: String,
    department: String,
    workLocation: String,
    bank: String,
    accountNo: String,
    ifsc: String,
    branch: String,
    grossWages: Number,
    totalWorkingDays: Number,
    workingHours: Number,
    paymentSchedule: String,
    noticePeriod: String,
    benefits: {
        casualLeave: Number,
        sickLeave: Number,
    },
    lopDays: Number,
    leaves: Number,
    paidDays: Number,
    earnings: {
        basic: Number,
        totalEarnings: Number,
    },
    deductions: {
        lop: Number,
        totalDeductions: Number,
    },
    netSalary: Number,
    responsibilities: [String],
    conditionsOfEmployment: [String],
    dateOfJoining: String,
    offerAcceptanceDate: String,
    password: String,
    role: {
        type: String,
        enum: ['employee', 'admin'], // Directly define enum values here
        default: 'employee',
        required: true
    },
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;

