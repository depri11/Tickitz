const express = require('express')
const routers = express.Router()
const Login = require('../controllers/auth')

routers.post('/', Login)

module.exports = routers
