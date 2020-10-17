const express = require('express')
const Controller = require('./index')
const router = express.Router()

const response = require('../../../network/response')

// Routes
router.get('/', list)
router.get('/:id', get)
router.post('/', upsert)
router.delete('/:id', remove)
router.get('/user/:id', listUserTasks)

//Internal functions
function list(req, res, next) {
  Controller.list()
    .then((lista) => {
      response.success(req, res, lista, 200)
    })
    .catch(next)
}

function listUserTasks(req, res, next) {
  const { id } = req.params
  Controller.getUserTasks(id)
    .then((tasks) => {
      response.success(req, res, tasks, 200)
    })
    .catch(next)
}

function get(req, res, next) {
  const { id } = req.params
  Controller.get(id)
    .then((user) => {
      response.success(req, res, user, 200)
    })
    .catch(next)
}

async function upsert(req, res, next) {
  const { category, subcategory, cost_center, name } = req.body


  const categoryId = await Controller.getCategoryId(category)
  const subcategoryId = await Controller.getSubcategoryId(subcategory)
  const costCenterId = await Controller.getCostCenterId(cost_center)
  const userId = await Controller.getUserId(name)

  const task = req.body

  const newTask = {
    ...task,
    category_id: categoryId[0].id,
    subcategory_id: subcategoryId[0].id,
    cost_center_id: costCenterId[0].id,
    person_id: userId[0].id
  }
  
  delete newTask.category
  delete newTask.subcategory
  delete newTask.cost_center
  delete newTask.name

  console.log(newTask)
  Controller.upsert(newTask)
    .then((task) => {
      response.success(req, res, task, 201)
    })
    .catch(next)
}

function remove(req, res, next) {
  const { id } = req.params
  Controller.remove(id)
    .then((result) => {
      response.success(req, res, result, 201)
    })
    .catch(next)
}

module.exports = router
