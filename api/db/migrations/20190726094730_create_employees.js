// TODO: encoding, collation

exports.up = knex => {
  return knex.schema.createTable('employees', table => {
    table.increments('id').primary().unsigned()
    table.string('employee_name').unique().index()
    table.string('email').unique().index()
    // TODO: Password
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').nullable()
    table.timestamp('deleted_at').nullable()

    // NOTE: multiple 'mul_timestamp' is ok in MySQL. We need unique names for Sqlite3
    table.index(['created_at', 'updated_at'], 'mul_employees_timestamp')
    table.index('deleted_at', 'idx_employees_deleted_at')
  })
}

exports.down = knex => {
  return knex.schema.dropTable('employees')
}
