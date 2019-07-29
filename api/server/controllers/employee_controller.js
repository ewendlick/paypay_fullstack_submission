'use strict'

// TODO: A full system to handle created_at, updated_at, deleted_at, overwritable here
const { Employee } = require('../models')

const postEmployees = (req, res, next) => {
  const props = req.body.employee

  Employee.create(props)
    .then(employee => res.json({
      ok: true,
      message: 'Employee created',
      employee
    }))
    .catch(next)
}

const getEmployees = (req, res, next) => {
  Employee.findAll()
    .then(employees => res.json({
      ok: true,
      message: 'Employees found',
      employees
    }))
    .catch(next)
}

const getEmployee = (req, res, next) => {
  const employeeId = req.params.id

  Employee.findById(employeeId)
    .then(employee => res.json({
      ok: true,
      message: 'Employee found',
      employee
    }))
    .catch(next)
}

const putEmployee = (req, res, next) => {
  const employeeId = req.params.id
  const props = req.body.employee

  Employee.update(employeeId, props)
    .then(employee => res.json({
      ok: true,
      message: 'Employee updated',
      employee
    }))
    .catch(next)
}

const deleteEmployee = (req, res, next) => {
  const employeeId = req.params.id

  // TODO: soft delete
  Employee.destroy(employeeId)
    .then(deleteCount => res.json({
      ok: true,
      message: `Employee '${ employeeId }' deleted`,
      deleteCount
    }))
    .catch(next)
}

module.exports = {
  postEmployees,
  getEmployees,
  getEmployee,
  putEmployee,
  deleteEmployee
}
