const mysql = require('mysql')

const config = require('../config')

const dbconf = {
  host: config.dbHost,
  user: config.dbUser,
  password: config.dbPassword,
  database: config.dbName,
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

function list(table) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table}`, (err, data) => {
      if (err) return reject(err)
      resolve(data)
    })
  })
}

function get(table, id) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table} WHERE id=${id}`, (err, data) => {
      if (err) return reject(err)
      resolve(data)
    })
  })
}

function getUserTasks(users, tasks, category, subcategory, costCenter, userId) {
  const taskId = `${tasks}.id`
  const taskCategoryId = `${tasks}.category_id`
  const taskSubcategoryId = `${tasks}.subcategory_id`
  const taskCostCenterId = `${tasks}.cost_center_id`
  const userName = `${users}.name`
  const personId = `${tasks}.person_id`
  const userID = `${users}.id`
  const categoryId = `${category}.id`
  const categoryDescription = `${category}.description`
  const subcategoryId = `${subcategory}.id`
  const subcategoryDescription = `${subcategory}.description`
  const costCenterId = `${costCenter}.id`
  const costCenterNumber = `${costCenter}.cost_number`

  const query = `SELECT ${taskId}, ${userName}, date, ${costCenterNumber}, ${categoryDescription}, ${subcategoryDescription}, 
  init_time, final_time, total_hours, validation, comments 
  FROM ${tasks} 
  JOIN ${users} 
    ON ${personId} = ${userID} 
  JOIN ${category} 
    ON ${taskCategoryId} = ${categoryId} 
  JOIN ${subcategory} 
    ON ${taskSubcategoryId} = ${subcategoryId} 
  JOIN ${costCenter} 
    ON ${taskCostCenterId} = ${costCenterId} 
  WHERE ${personId}='${userId}'`

  return new Promise ((resolve, reject) => {
    connection.query(query, (err, data) => {
      if (err) return reject(err)
      resolve(data)
    })
  })
}

function update(table, data) {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE ${table} SET ? WHERE id=?`,
      [data, data.id],
      (err, result) => {
        if (err) return reject(err)
        resolve(result)
      }
    )
  })
}

function getCategory(table, data) {
  console.log(data)
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT id FROM ${table} WHERE description=?`,
      data,
      (err, result) => {
        if (err) return reject(err)
        resolve(result)
      }
    )
  })
}

function getSubcategory(table, data) {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT id FROM ${table} WHERE description=?`,
      data,
      (err, result) => {
        if (err) return reject(err)
        resolve(result)
      }
    )
  })
}

function getCostCenterId(table, data) {
  console.log(data)
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT id FROM ${table} WHERE cost_number=?`,
      data,
      (err, result) => {
        if (err) return reject(err)
        resolve(result)
      }
    )
  })
}

function getUserId(table, data) {
  console.log(data)
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT id FROM ${table} WHERE name=?`,
      data,
      (err, result) => {
        console.log(result)
        if (err) return reject(err)
        resolve(result)
      }
    )
  })
}
function upsert(table, data) {
  return new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO ${table} SET?`,
      data, 
      (err, result) => {
      if (err) return reject(err)
      resolve(result)
    }
    )
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
  list,
  get,
  upsert,
  remove,
  getUserTasks,
  getCategory,
  getSubcategory,
  getCostCenterId,
  getUserId,
}
