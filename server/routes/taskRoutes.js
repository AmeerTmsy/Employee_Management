const express = require('express');
const { getTask, addTask, deleteTask, updateTask } = require('../controllers/taskController');
const router = express.Router();

router.get('/', getTask)
router.post('/', addTask)
router.patch('/:id', updateTask)
router.delete('/:id', deleteTask)

module.exports = router