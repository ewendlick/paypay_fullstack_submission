'use strict'

// const createGuts = require('../helpers/model_guts')

const name = 'Performance Reviews'
const tableName = 'performance_reviews'

const selectableProps = [
  'id',
  'target_employee_id',
  'assignee_employee_id',
  'payload',
  'completed_at',
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

  return {
    ...guts
  }
}
