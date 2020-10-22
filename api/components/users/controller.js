const { nanoid } = require('nanoid')
const bcrypt = require("bcrypt")

const TABLE_TASKS = 'tasks'
const TABLE_USERS = 'users'
const TABLE_CATEGORIES = 'categories'
const TABLE_SUBCATEGORY = 'subcategory'
const TABLE_COST_CENTER = 'cost_center'

module.exports = function (injectedStore) {
  let store = injectedStore
  if (!store) {
    store = require('../../../store/dummy')
  }

  async function list() {
    users = await store.list(TABLE_USERS)
    for (user of users) {
      delete user.password
      delete user.isAdmin
    }
    return users
  }

  async function upsertUser(userData) {
    const newUser = userData;
    newUser.id = nanoid(16)
    newUser.password = await bcrypt.hash(newUser.password, 10)
    newUser.isAdmin = false
    return store.upsert(TABLE_USERS, userData)
  }

  async function remove(userId) {
    return store.remove(TABLE_USERS, userId)
  }

  async function update(userData, userId) {
    const COLUMN = "id"
    return store.update(TABLE_USERS, COLUMN, userData, userId)
  }

  
  return {
    list,
    upsertUser,
    remove,
    update,
  }
}