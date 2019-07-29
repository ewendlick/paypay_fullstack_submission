#!/usr/bin/env node

'use strict'

const PORT = process.env.PORT || 9000

const app = require('../server')

app.listen(PORT, () => {
  console.log(`API server started on port ${ PORT }`)
}).on('error', err => {
  console.log('ERROR: ', err)
})
