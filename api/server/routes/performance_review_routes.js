'use strict'

const router = require('express').Router()
const {
  getAssignedEmployeePerformanceReviewsForUser,
  getTargetEmployeePerformanceReviewsForUser,
  getPerformanceReview,
  putPerformanceReview
} = require('../controllers/performance_review_controller')

router.route('/employees/:id/performance_reviews/assigned')
  .get(getAssignedEmployeePerformanceReviewsForUser)

router.route('/employees/:id/performance_reviews/target')
  .get(getTargetEmployeePerformanceReviewsForUser)

router.route('/performance_reviews/:id')
  .get(getPerformanceReview)
  .put(putPerformanceReview)

module.exports = router
