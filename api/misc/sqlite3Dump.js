'use strict'

// Testing purposes

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('../mymydb.sqlite')

db.serialize(() => {
  db.each(`SELECT * FROM employees`, (err, row) => {
    if (err) {
      console.error(err.message)
    }
    console.log(row.id + "\t" + row.name)
  })

  db.each(`SELECT * FROM performance_reviews`, (err, row) => {
    if (err) {
      console.error(err.message)
    }
    console.log(row.id + "\t" + row.name)
  })
})

db.close()
