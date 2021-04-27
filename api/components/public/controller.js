const jwt = require('jsonwebtoken')

const USER_TABLE = 'user'
const expiration = Math.floor(Date.now() / 1000) + (60 * 60)
const { jwtSecret } = require('../../../config')

module.exports = function (injectedStore) {
  const store = injectedStore

  async function upsert (product) {
    return store.upsert(USER_TABLE, user)
  }

  async function get (id) {
    return store.get(USER_TABLE, '*', 'id', id)
  }

  async function sign (data) {
    return jwt.sign({
      data,
      exp: expiration
    }, jwtSecret)
  }

  return {
    get,
    upsert,
    sign
  }
}
