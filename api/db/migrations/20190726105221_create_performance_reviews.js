exports.up = knex => {
  return knex.schema.createTable('performance_reviews', table => {
    // table.charset('utf8mb4') // TODO: use with MySQL
    // table.collate('utf8mb4_unicode_ci')
    table.increments('id').primary().unsigned()
    table.integer('target_employee_id').references('employees.id').unsigned().index()
    table.integer('assignee_employee_id').references('employees.id').unsigned().index()
    table.text('payload') // TODO: JSON type - table.json('payload'). See if sqlite can do it with a default installation
    table.timestamp('completed_at')
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').nullable()
    table.timestamp('deleted_at').nullable()

    // NOTE: multiple 'mul_timestamp' is ok in MySQL. We need unique names for Sqlite3
    table.index(['created_at', 'updated_at'], 'mul_performance_reviews_timestamp')
    table.index('deleted_at', 'idx_performance_reviews_deleted_at')
  })
}

exports.down = knex => {
  return knex.schema.dropTable('performance_reviews')
}
