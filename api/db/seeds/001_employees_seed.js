'use strict'

exports.seed = async function (knex) {
  await knex('employees').del()
  // NOTE: Sqlite3 does not allow default values. All values are explicitly listed here
  return knex('employees').insert([
    {
      employee_id: 1,
      // NOTE: I would split up first name and last name on a real system
      employee_name: 'Firstname Lastname',
      email: 'firstname.lastname@example.com',
      created_at: knex.fn.now(),
      updated_at: null,
      deleted_at: null
    },
    {
      employee_id: 2,
      employee_name: 'Smash Lampjaw',
      email: 'smash.lampjaw@example.com',
      created_at: knex.fn.now(),
      updated_at: null,
      deleted_at: null
    },
    {
      employee_id: 3,
      employee_name: 'Tyler Durden',
      email: 'abc@example.com',
      created_at: knex.fn.now(),
      updated_at: null,
      deleted_at: null
    },
    {
      employee_id: 4,
      employee_name: 'Anomander Rake',
      email: 'abcd@example.com',
      created_at: knex.fn.now(),
      updated_at: null,
      deleted_at: null
    },
    {
      employee_id: 5,
      employee_name: 'Jorg Ancrath',
      email: 'abce@example.com',
      created_at: knex.fn.now(),
      updated_at: null,
      deleted_at: null
    }
  ])
}
