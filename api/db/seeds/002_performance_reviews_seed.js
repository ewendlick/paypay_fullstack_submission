'use strict'

const { Employee, PerformanceReview } = require('../../server/models')

exports.seed = (knex, Promise) => knex(PerformanceReview.tableName).del()
  .then(() => Employee.findAll())
  .then(employees => {
    if (employees.length <= 0) throw 'No employees found'

    return employees[0].employee_id
  })
  // TODO: need to pass in employeeIds for target and assignee
  .then(employeeId => [
    {
      target_employee_id: employeeId,
      assignee_employee_id: employeeId,
      payload: '',
      created_at: knex.fn.now(), // TODO: remove when switching to non SQLite DB
      updated_at: null, // TODO: remove when switching to non SQLite DB
      deleted_at: null // TODO: remove when switching to non SQLite DB
    },
    {
      target_employee_id: employeeId,
      assignee_employee_id: employeeId,
      payload: '',
      completed_at: knex.fn.now(),
      created_at: knex.fn.now(), // TODO: remove when switching to non SQLite DB
      updated_at: null, // TODO: remove when switching to non SQLite DB
      deleted_at: null // TODO: remove when switching to non SQLite DB
    }
  ])
  .then(newPerformanceReviews => Promise.all(newPerformanceReviews.map(performanceReview => PerformanceReview.create(performanceReview))))
  .catch(err => console.log('err: ', err))
