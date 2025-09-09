const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
    leaveType: {
        type: String,
        enum: ['Sick', 'Casual', 'Other'],
        required: true,
    },
    reason: {
        type: String,
        trim: true,
        maxlength: 500,
    },
    date: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
}, { timestamps: true });

const leaveRequestSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true,
    },
    leaves: [leaveSchema],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
}, { timestamps: true });

leaveRequestSchema.index({ employeeId: 1}, { unique: true});
const LeaveRequest = mongoose.model('LeaveRequest', leaveRequestSchema);

module.exports = LeaveRequest;