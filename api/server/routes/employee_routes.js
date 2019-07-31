'use strict'

const router = require('express').Router()

const {
  postEmployees,
  getEmployees,
  getEmployee,
  putEmployee,
  deleteEmployee
} = require('../controllers/employee_controller')

router.route('/employees')
  .post(postEmployees)
  .get(getEmployees)

router.route('/employees/:id') // TODO: Document naming convention regarding singular/plural
  .get(getEmployee)
  .put(putEmployee)
  .delete(deleteEmployee)

module.exports = router
