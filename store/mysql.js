const mysql = require('mysql')

const config = require('../config')

const dbconf = {
  host: config.dbHost,
  user: config.dbUser,
  password: config.dbPassword,
  database: config.dbName,
  port: config.dbPort,
}

let connection

function handleCon() {
  connection = mysql.createConnection(dbconf)

  connection.connect((err) => {
    if (err) {
      console.error('[db err]', err)
      setTimeout(handleCon, 2000)
    } else {
      console.log('DB Connected!')
    }
  })

  connection.on('error', (err) => {
    console.error('[db err]', err)
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleCon()
    } else {
      throw err
    }
  })
}

handleCon()

function get(table, columns, condition, conditionValue) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT product.name AS product, store.name FROM ${table} 
     JOIN store 
      ON product.store_id = store.id
     WHERE product.id='${conditionValue}'`, (err, data) => {
      if (err) return reject(err)
      resolve(data)
    })
  })
}

function update(table, column, name, id) {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE ${table} SET name=?, store_id=? WHERE ${column}=?`,
      [name, id, id],
      (err, result) => {
        if (err) return reject(err)
        resolve(result)
      }
    )
  })
}

function upsert(table, data) {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO ${table} SET?`, data, (err, result) => {
      if (err) return reject(err)
      resolve(result)
    })
  })
}

const remove = (table, id) => {
  return new Promise((resolve, reject) => {
    connection.query(`DELETE FROM ${table} WHERE id=?`, id, (err, result) => {
      if (err) return reject(err)
      resolve(result)
    })
  })
}



module.exports = {
  get,
  upsert,
  remove,
  update,
}
