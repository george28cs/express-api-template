const config = require('../config')
const mysql = require('mysql')
const dbconf = {
  host: config.dbHost,
  user: config.dbUser,
  password: config.dbPassword,
  database: config.dbName,
  port: config.dbPort
}

let connection

function handleCon () {
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

module.exports = {
  connection
}
