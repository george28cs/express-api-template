const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
require('dotenv').config()

//local modules
const { port } = require('../config')
const tasks = require('../api/components/tasks/network')
const users = require('../api/components/users/network')

//Config
const app = express()
app.use(helmet())
app.use(cors())

//Boddy Parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Routes
app.use('/api/tasks', tasks)
app.use('/api/users', users)
// app.use('/api/auth', auth)

app.listen(port, () => console.log(
  `Server running on port ${port}`
))