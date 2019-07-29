'use strict'

// https://devhints.io/knex
module.exports = {
  development: {
    /*
    // TODO: play around with this later
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user:
      'mysql://localhost:5432/knex-test'
    },
    */
    client: 'sqlite3',
    connection: {
      filename: "./mymydb.sqlite"
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: `${ __dirname }/db/migrations`
    },
    seeds: {
      directory: `${ __dirname }/db/seeds`
    }
  }
}
