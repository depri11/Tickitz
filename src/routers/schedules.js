const express = require('express')
const routers = express.Router()
const controller = require('../controllers/schedule')

routers.get('/', controller.getAll)
routers.get('/:id', controller.getData)
routers.post('/', controller.createData)
routers.put('/:id', controller.updateData)
routers.delete('/:id', controller.deleteData)

module.exports = routers
