const express = require('express')
const Controller = require('./index')
const router = express.Router()

const response = require('../../../network/response')

// Routes
router.get('/:id', get)
router.post('/', upsert)
router.put('/:id', update)
router.delete('/:id', remove)

async function get(req, res, next) {
  const { id } = req.params
  await Controller.get(id)
    .then((product) => {
      response.success(req, res, product, 200)
    })
    .catch(next)
}

async function upsert(req, res, next) {
  const product = req.body
  Controller.upsert(product)
    .then(() => {
      response.success(req, res, product, 201)
    })
    .catch(next)
}

async function update( req, res, next){
  const { id } = req.params
  const {name} = req.body
  
  await Controller.update(id, name)
    .then(async () => {
      const updatedProduct = await Controller.get(id)
      response.success(req, res, updatedProduct[0], 200)
    })
    .catch(next)
}

async function remove(req, res, next) {
  const { id } = req.params
  await Controller.remove(id)
    .then(() => {
      response.success(req, res, "Product Deleted", 201)
    })
    .catch(next)
}

module.exports = router
