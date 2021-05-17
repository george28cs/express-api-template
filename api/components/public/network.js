const express = require('express')
const Controller = require('./index')
const router = express.Router()
const passport = require('passport')
require('../../../auth/strategies/local')

const response = require('../../../network/response')

// Routes
router.post('/login', passport.authenticate('local'), authenticate)

async function authenticate (req, res, next) {
  try {
    const { user } = req
    const jwt = await Controller.sign(user)
    response.success(req, res, { token: jwt }, 200)
  } catch (error) {
    next(error)
  }
}

module.exports = router
