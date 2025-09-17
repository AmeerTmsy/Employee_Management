const Task = require("../models/taskModel");

const getTask = async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.status(200).json({
            success: true,
            message: 'Tetriveing task data successful',
            tasks
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error while retriveing task data, ',
            'error': error
        })
    }
}
const addTask = async (req, res) => {
    // console.log('req.body: ', req.body);

    try {
        const newTask = new Task(req.body);
        await newTask.save();

        if (newTask) console.log(newTask)
        res.status(200).json({
            success: true,
            message: 'Added new task',
            newTask
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error while adding new task, ',
            'error': error
        })
    }
}
const updateTask = async (req, res) => {

    try {
        `const { id } = req.params`
        const { body } = req
        console.log("update task", id, body);
        const updatedTask = await Task.findOneAndUpdate(
            { googleEventId: id },
            { $set: body },// Use $set to update only the fields present in the body
            { new: true }
        )

        if (!updatedTask) {
            return res.status(404).json({
                success: false,
                message: "Task not found."
            });
        }
        res.status(200).json({
            success: true,
            message: 'Added new task',
            updatedTask
        })
    } catch (err) {
        res.status(400).json({
            success: false,
            message: 'Error while updating task, ',
            'error': err.message
        })
    }
}
const deleteTask = async (req, res) => {
    res.send('delete task')
}

module.exports = {
    getTask,
    addTask,
    updateTask,
    deleteTask
}