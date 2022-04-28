const express = require('express')
const routers = express.Router()
const auth = require('../controllers/auth')

routers.post('/', auth.Login)
routers.post('/refresh-token', auth.refreshToken)

module.exports = routers
