'use strict'

const knex = require('../../config/database')

const timeout = 1000

// TODO: move to /lib
const scrub = (props) => {
  if (!props || props.length === 0) return
  const notAllowedKeys = ['performance_review_id', 'created_at', 'updated_at', 'deleted_at']

  notAllowedKeys.forEach(notAllowedKey => delete props['notAllowedKey'])
  console.log(props)
  return props
}

/*
const postPerformanceReviews = (req, res, next) => {
  const employeeId = req.params.id
  const props = req.body.performanceReview

  PerformanceReview.create({ ...props, employee_id: employeeId })
    .then(performanceReview => res.json({
      ok: true,
      message: 'PerformanceReview created',
      performanceReview,
      employeeId
    }))
    .catch(next)
}
*/

// FRONT
const getAssignedEmployeePerformanceReviewsForUser = async (req, res) => {
  const employeeId = req.params.id
  const result = await knex.select()
    .from('performance_reviews')
    .whereNull('performance_reviews.deleted_at')
    .where('performance_reviews.assignee_employee_id', '=', employeeId)
    .join('employees', 'performance_reviews.target_employee_id', '=', 'employees.employee_id')
    // .returning(selectableProps) // TODO: not supported in Sqlite3 :(
    .timeout(timeout)

  // TODO: error checking
  if (result) {
    console.log(result)
    return res.json({
      ok: true,
      message: 'Performance Reviews found',
      data: result
    })
  } else {
    // TODO: error system in place
    // return res.status(404)
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
    // .returning(selectableProps) // TODO: not supported in Sqlite3 :(
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

/*
const getPerformanceReviews = (req, res) => {
  const employeeId = req.params.id

  PerformanceReview.findAll()
    .then(performanceReviews => res.json({
      ok: true,
      message: 'PerformanceReviews found',
      performanceReviews,
      employeeId
    }))
    .catch(next)
}
*/

const getPerformanceReview = async (req, res) => {
  const performanceReviewId = req.params.id

  const result = await knex.select()
    .from('performance_reviews')
    .where({ performance_review_id: performanceReviewId })

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

  console.log(performanceReviewId)

  props = scrub(props)

  // TODO: possible bug. Revisit this
  const now = new Date() // TODO: throw into a file in /lib and import
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

/*
const deletePerformanceReview = (req, res) => {
  const performanceReviewId = req.params.id

  PerformanceReview.destroy(performanceReviewId)
    .then(deleteCount => res.json({
      ok: true,
      message: 'PerformanceReview deleted',
      deleteCount
    }))
    .catch(next)
}
*/

module.exports = {
  // postPerformanceReviews
  getAssignedEmployeePerformanceReviewsForUser,
  getTargetEmployeePerformanceReviewsForUser,
  // getPerformanceReviews,
  getPerformanceReview,
  putPerformanceReview
  // deletePerformanceReview
}
