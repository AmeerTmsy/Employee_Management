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
    res.send('update Task')
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