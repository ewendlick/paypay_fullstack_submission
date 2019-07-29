'use strict'

const { Employee } = require('./server/models')

Employee.create({
  employeeName: 'admin',
  email: 'admin@email.com'
})
