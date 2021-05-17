const mysql = require('./mysql')

function get (table, data) {
  return new Promise((resolve, reject) => {
    mysql.connection.query(`SELECT * FROM ${table} WHERE?`, data, (err, data) => {
      if (err) return reject(err)
      resolve(data)
    })
  })
}

function customGet (table, colums, data) {
  return new Promise((resolve, reject) => {
    mysql.connection.query(`SELECT ${colums} FROM ${table} WHERE?`, data, (err, data) => {
      if (err) return reject(err)
      resolve(data)
    })
  })
}

function upsert (table, data) {
  return new Promise((resolve, reject) => {
    mysql.connection.query(`INSERT INTO ${table} SET?`, data, (err, result) => {
      if (err) return reject(err)
      resolve(result)
    })
  })
}

function remove (table, data) {
  return new Promise((resolve, reject) => {
    mysql.connection.query(`UPDATE ${table} SET is_deleted = true  WHERE?`, data, (err, result) => {
      if (err) return reject(err)
      resolve(result)
    })
  })
}

module.exports = {
  get,
  customGet,
  upsert,
  remove
}
