const { default: mongoose } = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: {
        type: String
    },
    status: {
        type: String,
        enum: ["To Do", "In Progress", "Blocked", "Completed"],
        default: "To Do"
    },
    priority: {
        type: String,
        enum: ["Low", "Medium", "High", "Critical"],
        default: "Medium"
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee"
    },
    assignedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee"
    },
    dueDate: {
        type: Date
    },
    progress: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    },
    subtasks: [{
        title: String,
        isCompleted: {
            type: Boolean,
            default: false
        }
    }],
    comments: [{
        text: String,
        commentedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employee"
        },
    }],
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);
module.exports = Task