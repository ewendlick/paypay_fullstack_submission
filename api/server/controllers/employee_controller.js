'use strict'

// TODO: some documentation system especially for POST/PUT
// TODO: tests

const knex = require('../../config/database')
const moment = require('moment')

// TODO: implement for non-Sqlite3 databases
// Properties that are allowed to be selected from the database for reading.
// usage: .returning(selectableProps)
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
  let props = req.body.data

  // TODO: one line in all locations
  props = scrub(props)

  props.created_at = moment().format('YYYY-MM-DD hh:mm:ss')

  const result = await knex.insert(props)
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
    .whereNull('deleted_at')
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

  const result = await knex.select()
    .from('employees')
    .where({ employee_id: employeeId })
    .whereNull('deleted_at')
    .timeout(timeout)

  // TODO: error checking
  if (result) {
    res.json({
      ok: true,
      message: 'Employee found',
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
  let props = req.body.data

  props = scrub(props)

  props.updated_at = moment().format('YYYY-MM-DD hh:mm:ss')

  const result = await knex('employees')
    .where({ employee_id: employeeId })
    .update(props)

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

  const result = await knex('employees')
    .where({ employee_id: employeeId })
    .update({ deleted_at: moment().format('YYYY-MM-DD hh:mm:ss') })

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
