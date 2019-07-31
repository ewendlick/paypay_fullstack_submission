'use strict'

const knex = require('../../config/database')
const moment = require('moment')

const timeout = 1000

// TODO: move someplace better
const scrub = (props) => {
  if (!props || props.length === 0) return
  const notAllowedKeys = ['performance_review_id', 'created_at', 'updated_at', 'deleted_at']

  notAllowedKeys.forEach(notAllowedKey => delete props['notAllowedKey'])
  return props
}

// FRONT
const getAssignedEmployeePerformanceReviewsForUser = async (req, res) => {
  const employeeId = req.params.id
  const result = await knex.select()
    .from('performance_reviews')
    .whereNull('performance_reviews.deleted_at')
    .where('performance_reviews.assignee_employee_id', '=', employeeId)
    .join('employees', 'performance_reviews.target_employee_id', '=', 'employees.employee_id')
    .timeout(timeout)

  // TODO: error checking
  if (result) {
    return res.json({
      ok: true,
      message: 'Performance Reviews found',
      data: result
    })
  } else {
    // TODO: error system in place
  }
}

// ADMIN
const getTargetEmployeePerformanceReviewsForUser = async (req, res) => {
  const employeeId = req.params.id

  const result = await knex.select()
    .from('performance_reviews')
    .whereNull('performance_reviews.deleted_at')
    .where('performance_reviews.target_employee_id', '=', employeeId)
    .join('employees', 'performance_reviews.assignee_employee_id', '=', 'employees.employee_id')
    .timeout(timeout)

  // TODO: error checking
  if (result) {
    res.json({
      ok: true,
      message: 'Employees found',
      data: result
    })
  } else {
    // TODO: error system in place
    // if (!props) return res.status(422)
  }
}

const getPerformanceReview = async (req, res) => {
  const performanceReviewId = req.params.id

  const result = await knex.select()
    .from('performance_reviews')
    .where({ performance_review_id: performanceReviewId })
    .whereNull('deleted_at')

  if (result) {
    res.json({
      ok: true,
      message: 'PerformanceReview found',
      data: result
    })
  } else {
    // TODO: Error system
  }
}

const putPerformanceReview = async (req, res) => {
  const performanceReviewId = req.params.id
  let props = req.body.data

  props = scrub(props)

  const now = moment().format('YYYY-MM-DD hh:mm:ss') // TODO: throw into a file in /lib and import
  props.updated_at = now
  props.completed_at = now

  const result = await knex('performance_reviews')
    .where({ performance_review_id: performanceReviewId })
    .update(props)

  if (result) {
    res.json({
      ok: true,
      message: 'PerformanceReview updated',
      data: result
    })
  } else {
    // TODO: Error system
  }
}

module.exports = {
  getAssignedEmployeePerformanceReviewsForUser,
  getTargetEmployeePerformanceReviewsForUser,
  getPerformanceReview,
  putPerformanceReview
}
