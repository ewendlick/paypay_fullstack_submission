'use strict'

const router = require('express').Router()
const {
  postPerformanceReviews,
  getPerformanceReviews,
  getPerformanceReview,
  putPerformanceReview,
  deletePerformanceReview
} = require('../controllers/performance_review_controller')

router.route('/employees/:id/performance_reviews')
  .post(postPerformanceReviews)
  .get(getPerformanceReviews)

router.route('/performance_reviews/:id')
  .get(getPerformanceReview)
  .put(putPerformanceReview)
  .delete(deletePerformanceReview)

module.exports = router
