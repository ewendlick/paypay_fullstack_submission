'use strict'

const env = process.env.NODE_ENV || 'development' // Currently, only 'development'
const knexfile = require('../knexfile')
const knex = require('knex')(knexfile[env])

module.exports = knex
