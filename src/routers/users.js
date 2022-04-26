const express = require('express')
const routers = express.Router()
const controller = require('../controllers/user')

routers.get('/', controller.getAll)
routers.post('/', controller.Create)

module.exports = routers
