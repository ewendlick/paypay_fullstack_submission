'use strict'

// https://devhints.io/knex
module.exports = {
  development: {
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
