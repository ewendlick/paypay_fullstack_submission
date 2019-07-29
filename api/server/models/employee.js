'use strict'

// const createGuts = require('../helpers/model_guts')

const name = 'Employee'
const tableName = 'employees'

// Properties that are allowed to be selected from the database for reading.
const selectableProps = [
  'id',
  'employeeName',
  'email',
  'created_at',
  'updated_at',
  'deleted_at'
]

module.exports = knex => {
  const guts = createGuts({
    knex,
    name,
    tableName,
    selectableProps
  })

  // TODO: if there's time, throw a login page into /front and /admin
  const verify = (employeeName) => {
    const matchErrorMsg = 'Employee name not found'

    knex.select()
      .from(tableName)
      .where({ employeeName })
      .timeout(guts.timeout)
      .then(employee => {
        if (!employee) throw matchErrorMsg

        return employee
      })
  }

  return {
    ...guts,
    verify
  }
}
