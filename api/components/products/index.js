const store = require('../../../store/mysql')
const ctrl = require('./controller')

// Para utilidad en pruebas.
module.exports = ctrl(store)
