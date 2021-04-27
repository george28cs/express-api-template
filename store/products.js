const mysql = require('./mysql')

function get (table, columns, condition, conditionValue) {
  return new Promise((resolve, reject) => {
    mysql.connection.query(`SELECT product.name AS product, store.name as store FROM ${table} 
        JOIN store 
        ON product.store_id = store.id
        WHERE product.id='${conditionValue}'`, (err, data) => {
      if (err) return reject(err)
      resolve(data)
    })
  })
}

module.exports = {
  get
}
