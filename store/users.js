const mysql = require('./mysql')
const usersTable = 'user'

function getByMail (email) {
  return new Promise((resolve, reject) => {
    mysql.connection.query(`SELECT id, password from ${usersTable}
        WHERE email='${email}'`, (err, data) => {
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

module.exports = {
  getByMail,
  upsert
}
