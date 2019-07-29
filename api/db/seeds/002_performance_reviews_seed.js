'use strict'

exports.seed = async function(knex) {
  await knex('performance_reviews').del()
  // NOTE: Sqlite3 does not allow default values. All values are explicitly listed here
  return knex('performance_reviews').insert([
    {
      target_employee_id: 1,
      assignee_employee_id: 2,
      payload: '',
      completed_at: null,
      created_at: knex.fn.now(),
      updated_at: null,
      deleted_at: null
    },
    {
      target_employee_id: 2,
      assignee_employee_id: 1,
      payload: '',
      completed_at: knex.fn.now(),
      created_at: knex.fn.now(),
      updated_at: null,
      deleted_at: null
    }
  ])
}
