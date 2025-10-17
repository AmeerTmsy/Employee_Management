const { default: mongoose } = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: {
        type: String
    },
    status: {
        type: String,
        enum: ["To Do", "In Progress", "Blocked", "Completed", "Returned"],
        default: "To Do"
    },
    priority: {
        type: String,
        default: "medium"
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee"
    },
    assignedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee"
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
    },
    dueDate: {
        type: Date
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    calendarEventId: { type: String },
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
    googleEventId: { type: String },
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);
module.exports = Task