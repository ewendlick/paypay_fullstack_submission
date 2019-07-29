'use strict'
// const Promise = require('promise')

const { Employee } = require('../../server/models')
// async await in here
exports.seed = (knex, Promise) => knex(Employee.tableName).del()
  .then(() => [
    {
      employee_name: 'PW Herman',
      email: 'pw.herman@example.com',
      created_at: '2019-09-10',
      // created_at: knex.fn.now(), // TODO: remove when switching to non SQLite DB
      updated_at: null, // TODO: remove when switching to non SQLite DB
      deleted_at: null // TODO: remove when switching to non SQLite DB
    },
    {
      employee_name: 'Smash Lampjaw',
      email: 'smash.lampjaw@example.com',
      created_at: '2019-09-10',
      // created_at: knex.fn.now(), // TODO: remove when switching to non SQLite DB
      updated_at: null, // TODO: remove when switching to non SQLite DB
      deleted_at: null // TODO: remove when switching to non SQLite DB
    }
  ])
  .then(newEmployees => {
    console.log(Promise)
    // const newEmployeesArray = newEmployees.map(employee => Employee.create(employee))
    // console.log(typeof newEmployeesArray[0])
    // console.log(Promise)
    // return null
    // return Promise.all([])
    // return Promise.all(newEmployeesArray)
    console.log(newEmployees)
    console.log(newEmployees.map(employee => Employee.create(employee)))

    return Promise.all(newEmployees.map(employee => Employee.create(employee)))

  })
  // .then(newEmployees => Promise.all(newEmployees.map(employee => Employee.create(employee))))
  .catch(err => console.log('err: ', err))
