'use strict'

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use(cors({ allowedHeaders: ['Accept', 'Authorization', 'Cache-Control', 'X-Requested-With', 'Content-Type'] }))

app.use(bodyParser.json())
app.disable('x-powered-by')

app.use('/', [
  require('./routes/employee_routes'),
  require('./routes/performance_review_routes')
])

app.use(require('./middleware/error_middleware').all)

module.exports = app
