const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true,
    },
    employeeName: {
        type: String,
        required: true
    },
    records: [
        {
            date: String,
            status: {
                type: String,
                enum: ['P', 'HP', 'X', 'L']
            }
        },
    ],
    tatalP: {
        type: Number,
        default: 0,
    },
    totalHP: {
        type: Number,
        default: 0,
    },
    totalX: {
        type: Number,
        default: 0,
    },
    totalL: {
        type: Number,
        default: 0,
    }
})

attendanceSchema.pre('save', function (next) {
    const counts = { P: 0, HP: 0, X: 0, L: 0 };
    this.records?.forEach(record => {
        if (counts.hasOwnProperty(record.status)) {
            counts[record.status]++;
        }
    });

    this.totalP = counts.P;
    this.totalHP = counts.HP;
    this.totalX = counts.X;
    this.totalL = counts.L;

    next();
})

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance