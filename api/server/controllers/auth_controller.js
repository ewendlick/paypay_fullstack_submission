'use strict'

const { Employee } = require('../models')
const {
  createError,
  BAD_REQUEST,
  UNAUTHORIZED
} = require('../helpers/error_helper')

const postLogin = (req, res, next) => {
  // TODO: a system to enforce underscores in API/DB things only
  const employeeName = String(req.body.employeeName)

  if (!employeeName) next(createError({
    status: BAD_REQUEST,
    message: '`employeename` is a required field'
  }))

  Employee.verify(employeeName)
    .then(employee => res.json({
      ok: true,
      message: 'Login successful',
      employee
    }))
    .catch(err => next(createError({
      status: UNAUTHORIZED,
      message: err
    })))
}

const postRegister = (req, res, next) => {
  const props = req.body.employee

  Employee.findOne({ employee_name: props.employeeName })
    .then(employee => {
      if (employee) return next(createError({
        status: CONFLICT,
        message: 'employee_name already exists' // TODO: Human-readable? Fully refers to the DB column?
      }))

      return Employee.create(props)
    })
    .then(employee => res.json({
      ok: true,
      message: 'Registration successful',
      employee
    }))
    .catch(next)
}

module.exports = {
  postLogin,
  postRegister
}
