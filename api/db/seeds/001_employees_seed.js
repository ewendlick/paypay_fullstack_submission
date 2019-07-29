'use strict'

exports.seed = async function (knex) {
  await knex('employees').del()
  // NOTE: Sqlite3 does not allow default values. All values are explicitly listed here
  return knex('employees').insert([
    {
      employee_name: 'PW Herman',
      email: 'pw.herman@example.com',
      created_at: knex.fn.now(),
      updated_at: null,
      deleted_at: null
    },
    {
      employee_name: 'Smash Lampjaw',
      email: 'smash.lampjaw@example.com',
      created_at: knex.fn.now(),
      updated_at: null,
      deleted_at: null
    }
  ])
}
