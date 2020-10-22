const express = require('express')
const Controller = require('./index')
const router = express.Router()

const response = require('../../../network/response')
const controller = require('../tasks/controller')

// Routes
router.get('/', list)
router.post('/', upsert)
router.delete('/:id', remove)
router.put('/:id', update)

async function list(req, res, next) {
  await Controller.list()
  .then((users) => {
    response.success(req, res, users, 200)
  })
  .catch(next)
}

async function upsert(req, res, next) {
  const newUser = req.body

  await Controller.upsertUser(newUser)
  .then((user) => {
    response.success(req, res, {
      user,
      message: "User Created"
    }, 201)
  })
  .catch(next)
}

async function remove(req, res, next) {
  const {id} = req.params
  await Controller.remove(id)
  .then((userDeleted) => {
    const message = userDeleted.affectedRows ? "User Deleted" : "User Not Found"
    response.success(req, res, {
      message: message,
    }, 200)
  })
  .catch(next)
}

async function update(req, res, next){
  const { id } = req.params
  const data = req.body
  await Controller.update(data, id)
  .then((userUpdated) => {
    const message = userUpdated.affectedRows ? "User Updated" : "User Not Found"
    response.success(req, res, {
      message: message,
    }, 200)
  })
  .catch(next)
}


module.exports = router