const mongoose = require('mongoose');
const Counter = require('./counterModel');

const employeeSchema = new mongoose.Schema({
    employeeId: {
        type: String,
        unique: true
    },
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

employeeSchema.pre('save', async function (next) {
    if (this.isNew) {
        const counter = await Counter.findOneAndUpdate(
            { name: 'employeeId' },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );
        const seqNum = counter.seq.toString().padStart(4, '0');
        this.employeeId = `EMP${seqNum}`;
    }
    next();
})

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;

