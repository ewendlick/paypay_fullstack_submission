'use strict'

exports.seed = async function(knex) {
  await knex('performance_reviews').del()
  // NOTE: Sqlite3 does not allow default values. All values are explicitly listed here
  return knex('performance_reviews').insert([
    {
      performance_review_id: 1,
      target_employee_id: 1,
      assignee_employee_id: 2,
      payload: '',
      completed_at: null,
      created_at: knex.fn.now(),
      updated_at: null,
      deleted_at: null
    },
    {
      performance_review_id: 2,
      target_employee_id: 1,
      assignee_employee_id: 2,
      payload: 'This is a finished review and should not be editable',
      completed_at: knex.fn.now(),
      created_at: knex.fn.now(),
      updated_at: null,
      deleted_at: null
    },
    {
      performance_review_id: 3,
      target_employee_id: 2,
      assignee_employee_id: 1,
      payload: '',
      completed_at: null,
      created_at: knex.fn.now(),
      updated_at: null,
      deleted_at: null
    },
    {
      performance_review_id: 4,
      target_employee_id: 2,
      assignee_employee_id: 1,
      payload: 'This is a finished review and should not be editable',
      completed_at: knex.fn.now(),
      created_at: knex.fn.now(),
      updated_at: null,
      deleted_at: null
    },
    {
      performance_review_id: 5,
      target_employee_id: 3,
      assignee_employee_id: 1,
      payload: '',
      completed_at: null,
      created_at: knex.fn.now(),
      updated_at: null,
      deleted_at: null
    },
    {
      performance_review_id: 6,
      target_employee_id: 4,
      assignee_employee_id: 1,
      payload: '',
      completed_at: null,
      created_at: knex.fn.now(),
      updated_at: null,
      deleted_at: null
    },
    {
      performance_review_id: 7,
      target_employee_id: 5,
      assignee_employee_id: 1,
      payload: '',
      completed_at: null,
      created_at: knex.fn.now(),
      updated_at: null,
      deleted_at: null
    }
  ])
}
