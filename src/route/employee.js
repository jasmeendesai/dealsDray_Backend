const express = require('express')

const {createEmployee, getEmployee, getAllEmployee, updateEmployee, deleteEmployee} = require('../controller/Employee')
const { Authentication } = require('../middleware/middleware')


const router = express.Router()

router.post("/", Authentication, createEmployee)
router.get("/search", getEmployee)
router.get("/", getAllEmployee)
router.put("/:employeeId", Authentication, updateEmployee)
router.put("/", Authentication, deleteEmployee)

module.exports = router