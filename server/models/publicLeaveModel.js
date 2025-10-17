const mongoose = require('mongoose')

const publicHolidaySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        trim: true,
    },
    date: {
        type: Date,
        required: true,
    },
    isRecurring: {
        type: Boolean,
        default: false
    },
    country: {
        type: String,
        default: 'India'
    },
    region: String,
    isActive: {
        type: Boolean,
        default: true
    },
}, { timestamps: true });

const PublicHoliday = mongoose.model('PublicHoliday', publicHolidaySchema);

module.exports = PublicHoliday;