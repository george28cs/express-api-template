const { nanoid } = require('nanoid')
const moment = require('moment')
// const auth = require('../auth')

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

  function list() {
    return store.list(TABLE_TASKS)
  }

  function get(id) {
    return store.get(TABLE_TASKS, id)
  }

  function getUserTasks(userId) {
    return store.getUserTasks(TABLE_USERS, TABLE_TASKS, TABLE_CATEGORIES, TABLE_SUBCATEGORY, TABLE_COST_CENTER, userId)
  }

  function getCategoryId(description) {
    return store.getCategory(TABLE_CATEGORIES, description)
  }

  function getSubcategoryId(description) {
    return store.getSubcategory(TABLE_SUBCATEGORY, description)
  }

  function getCostCenterId(costNumber) {
    return store.getCostCenterId(TABLE_COST_CENTER, costNumber)
  }

  function getUserId(name) {
    return store.getUserId(TABLE_USERS, name)
  }

  async function upsert(task) {
    const { person_id, date, cost_center_id, category_id, subcategory_id, init_time, final_time, comments } = task

    const startTime = moment(init_time, 'HH:mm:ss a')
    const endTime = moment(final_time, 'HH:mm:ss a')
    const minutes = moment
      .utc(moment(endTime, 'HH:mm:ss').diff(moment(startTime, 'HH:mm:ss')))
      .format('mm')
    const seconds = moment
      .utc(moment(endTime, 'HH:mm:ss').diff(moment(startTime, 'HH:mm:ss')))
      .format('ss')
    total_hours =
      endTime.diff(startTime, 'hours') + ':' + minutes + ':' + seconds
    const newTask = {
      id: nanoid(8),
      person_id,
      date,
      cost_center_id,
      category_id,
      subcategory_id,
      init_time,
      final_time,
      total_hours,
      comments,
    }
    
    return store.upsert(TABLE_TASKS, newTask)
  }

  async function remove(TABLE_TASKS, id) {
    return store.remove(TABLE_TASKS, id)
  }

  return {
    list,
    get,
    upsert,
    remove,
    getUserTasks,
    getCategoryId,
    getSubcategoryId,
    getCostCenterId,
    getUserId,
  }
}