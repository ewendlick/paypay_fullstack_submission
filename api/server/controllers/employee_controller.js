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
  if (!props || props.length === 0) return
  const notAllowedKeys = ['employee_id', 'created_at', 'updated_at', 'deleted_at']

  notAllowedKeys.forEach(notAllowedKey => delete props['notAllowedKey'])
  console.log(props)
  return props
}

// TODO: whitelisting system

const postEmployees = async (req, res) => {
  let props = req.body.employee

  // TODO: one line in all locations
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
      data: result
    })
  } else {
  }
}

const getEmployees = async (req, res) => {
  const result = await knex.select()
    .from('employees')
    .whereNull('employees.deleted_at')
    .join('performance_reviews', 'employees.employee_id', '=', 'performance_reviews.target_employee_id')
    // .returning(selectableProps) // TODO: not supported in Sqlite3 :(
    .timeout(timeout)

  // TODO: error checking
  if (result) {
    return res.json({
      ok: true,
      message: 'Employees found',
      data: result
    })
  } else {
    // TODO: error system in place
    // if (!props) return res.status(422)
  }
}

const getEmployee = async (req, res) => {
  const employeeId = req.params.id

  const result = await knex.select({ employee_id: employeeId})
    .from('employees')
    .whereNull('deleted_at')
    .join('performance_reviews', 'employees.employee_id', '=', 'performance_reviews.assignee_employee_id')
    // .returning(selectableProps) // TODO: not supported in Sqlite3 :(
    .timeout(timeout)

  // TODO: error checking
  if (result) {
    res.json({
      ok: true,
      message: 'Employees found',
      data: result
    })
  } else {
    // TODO: error system in place
    // if (!props) return res.status(422)
  }
}

const putEmployee = async (req, res) => {
  const employeeId = req.params.id
  // TODO: early returns on all PUT/POST/DELETE without payloads with 422 errors
  let props = req.body.employee

  props = scrub(props)

  props.updated_at = new Date() // TODO: throw into a file in /lib and import

  const result = await knex('employees')
    .where({ employee_id: employeeId })
    .update({ ...props })

  if (result) {
    res.json({
      ok: true,
      message: 'Employee updated',
      data: result
    })
  } else {
  }

}

const deleteEmployee = async (req, res) => {
  const employeeId = req.params.id
  let props = req.body.employee

  props = scrub(props)

  // props.deleted_at = new Date() // TODO: throw into a file in /lib and import

  const result = await knex('employees')
    .where({ employee_id: employeeId })
    .update({ deleted_at: new Date() })

  if (result) {
    res.json({
      ok: true,
      message: `Employee '${ employeeId }' deleted`,
      data: result
    })
  } else {
  }
}

module.exports = {
  postEmployees,
  getEmployees,
  getEmployee,
  putEmployee,
  deleteEmployee
}
