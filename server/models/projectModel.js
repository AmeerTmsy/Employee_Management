const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Project name is required'],
        trim: true, // Removes leading/trailing whitespace
        minlength: [3, 'Project name must be at least 3 characters long'],
        maxlength: [100, 'Project name cannot exceed 100 characters'],
    },
    description: {
        type: String,
        trim: true,
        maxlength: [1000, 'Description cannot exceed 500 characters'],
        default: '',
    },
    manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee', // Reference to the User model
        required: [true, 'Project manager is required'],
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee', // Reference to the User model
        required: [true, 'At least one project member is required'],
    }],
    deadline: {
        type: Date,
        required: [true, 'Deadline is required'],
    },
    isDelete:{
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        enum: {
            values: ['Not Started', 'On Going', 'On Hold', 'Completed', 'Returned'],
            message: '{VALUE} is not a valid status',
        },
        default: 'Not Started',
    },
}, {timestamps: true});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project