const express     = require('express')
const cors        = require('cors')
const helmet      = require('helmet')
const passport    = require('passport');
const morgan      = require('morgan')
require('dotenv').config()

//local modules
const { port, apiEndpoint } = require('../config')
const products = require('../api/components/products/network')
const public = require('../api/components/public/network');

//Config
const app = express()
app.use(helmet())
app.use(cors())
app.use(morgan(':remote-addr :user-agent :method :url :status :res[content-length] - :response-time ms'))

//Body Parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(passport.initialize())
app.use(passport.session())
passport.serializeUser( (user, done) => done(null, user));
passport.deserializeUser( (user, done) => done(null, user));

//Public routes
app.use(apiEndpoint, public)

//Protected routes
app.use(apiEndpoint + '/products', products)


app.listen(port, () => console.log(
  `Server running on port ${port}`
))