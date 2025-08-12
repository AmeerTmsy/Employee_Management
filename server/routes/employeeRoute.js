const express = require('express')
const { getAllEmployees, getEmployeeById, updateEmployee, deleteEmployee, createEmployee } = require('../controllers/employeeController')
const router = express.Router()


router.get('/', getAllEmployees)
router.get('/:id', getEmployeeById)
router.post('/', createEmployee)
router.patch('/:id', updateEmployee)
router.delete('/:id', deleteEmployee)

module.exports = router
