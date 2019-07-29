'use strict'

const knex = require('../../config/database')
// const { PerformanceReview, Employee } = require('../models')

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

const getPerformanceReviews = (req, res, next) => {
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

const getPerformanceReview = (req, res, next) => {
  const performanceReviewId = req.params.id

  PerformanceReview.findById(performanceReviewId)
    .then(performanceReview => res.json({
      ok: true,
      message: 'PerformanceReview found',
      performanceReview
    }))
    .catch(next)
}

const putPerformanceReview = (req, res, next) => {
  const performanceReviewId = req.params.id
  const props = req.body.performanceReview

  PerformanceReview.update(performanceReviewId, props)
    .then(performanceReview => res.json({
      ok: true,
      message: 'PerformanceReview updated',
      performanceReview
    }))
    .catch(next)
}

const deletePerformanceReview = (req, res, next) => {
  const performanceReviewId = req.params.id

  PerformanceReview.destroy(performanceReviewId)
    .then(deleteCount => res.json({
      ok: true,
      message: 'PerformanceReview deleted',
      deleteCount
    }))
    .catch(next)
}

module.exports = {
  postPerformanceReviews,
  getPerformanceReviews,
  getPerformanceReview,
  putPerformanceReview,
  deletePerformanceReview
}
