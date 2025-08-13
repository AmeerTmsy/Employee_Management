const express = require('express')
const {
    getAllEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
    createEmployee,
    getEmployeeCount
} = require('../controllers/employeeController')
const { checkLogin } = require('../midleware/checkLogin')
const router = express.Router()


router.get('/count', getEmployeeCount)
router.get('/', checkLogin, getAllEmployees)
router.get('/:id', getEmployeeById)
router.post('/', createEmployee)
router.patch('/:id', updateEmployee)
router.delete('/:id', deleteEmployee)

module.exports = router
