'use strict'

// TODO: some documentation system especially for POST/PUT
// TODO: tests

const knex = require('../../config/database')

// TODO: implement for non-Sqlite3 databases
// Properties that are allowed to be selected from the database for reading.
/*
const selectableProps = [
  'id',
  'employeeName',
  'email',
  'created_at',
  'updated_at',
  'deleted_at'
]
*/

const timeout = 1000

// TODO: move to /lib
const scrub = (props) => {
  const notAllowedKeys = ['id', 'created_at', 'updated_at', 'deleted_at']

  notAllowedKeys.forEach(notAllowedKey => delete props['notAllowedKey'])
  return props
}

// TODO: whitelisting system

const postEmployees = async (req, res, next) => {
  const props = req.body.employee

  props = scrub(props)

  props.created_at = new Date() // TODO: throw into a file in /lib and import

  const result = await knex.insert(props)
    // .returning(selectableProps) // NOTE: Not supported by Sqlite3
    .into('employees')
    .timeout(timeout)

  if (result) {
    res.json({
      ok: true,
      message: 'Employee created',
      employee
    })
  } else {
  }
  next()
}

// ADMIN
const getEmployees = async (req, res, next) => {
  const result = await knex.select()
    .from('employees')
    .whereNull('deleted_at')
    .join('performance_reviews', 'employees.id', '=', 'performance_reviews.target_employee_id')
    // .returning(selectableProps) // TODO: not supported in Sqlite3 :(
    .timeout(timeout)

  // TODO: error checking
  if (result) {
    res.json({
      ok: true,
      message: 'Employees found',
      result
    })
  } else {
    // TODO: error system in place
    // if (!props) return res.status(422)
  }

  next()
}

// FRONT
const getEmployee = (req, res, next) => {
  const employeeId = req.params.id

  const result = await knex.select({ id: employeeId})
    .from('employees')
    .whereNull('deleted_at')
    .join('performance_reviews', 'employees.id', '=', 'performance_reviews.assignee_employee_id')
    // .returning(selectableProps) // TODO: not supported in Sqlite3 :(
    .timeout(timeout)

  // TODO: error checking
  if (result) {
    res.json({
      ok: true,
      message: 'Employees found',
      result
    })
  } else {
    // TODO: error system in place
    // if (!props) return res.status(422)
  }

  next()
}

const putEmployee = (req, res, next) => {
  const employeeId = req.params.id
  const props = req.body.employee

  props = scrub(props)

  props.updated_at = new Date() // TODO: throw into a file in /lib and import

  knex('employees')
    .where({ id: employeeId })
    .update({ ...props })

  if (result) {
    res.json({
      ok: true,
      message: 'Employee updated',
      employee
    })
  } else {
  }
  next()
}

const deleteEmployee = (req, res, next) => {
  const employeeId = req.params.id
  const props = req.body.employee

  props = scrub(props)

  props.deleted_at = new Date() // TODO: throw into a file in /lib and import

  if (result) {
    res.json({
      ok: true,
      message: `Employee '${ employeeId }' deleted`,
      employee
    })
  } else {
  }
  next()
}

module.exports = {
  postEmployees,
  getEmployees,
  // getEmployee,
  putEmployee,
  deleteEmployee
}
