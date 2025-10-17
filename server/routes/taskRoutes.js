const express = require('express');
const { getTask, getTaskById, addTask, deleteTask, updateTask } = require('../controllers/taskController');
const router = express.Router();

router.get('/', getTask)
router.get('/:id', getTaskById)
router.post('/', addTask)
router.patch('/:id', updateTask)
router.delete('/:id', deleteTask)

module.exports = router