const express = require('express')
const routers = express.Router()
const controller = require('../controllers/booking')

routers.get('/', controller.getAll)
routers.post('/', controller.createData)
routers.get('/:id', controller.getData)
routers.put('/:id', controller.updateData)
routers.delete('/:id', controller.deleteData)

module.exports = routers
