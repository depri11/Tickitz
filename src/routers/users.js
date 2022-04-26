const express = require('express')
const routers = express.Router()
const validate = require('../middleware/validate')
const controller = require('../controllers/user')

routers.get('/', validate, controller.getAll)
routers.post('/', validate, controller.Create)

module.exports = routers
