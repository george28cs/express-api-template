const jwt = require('jsonwebtoken')
const expiration = Math.floor(Date.now() / 1000) + (60 * 60)
const { jwtSecret } = require('../../../config')

module.exports = function () {

  async function sign (data) {
    return jwt.sign({
      data,
      exp: expiration
    }, jwtSecret)
  }

  return {
    sign
  }
}
