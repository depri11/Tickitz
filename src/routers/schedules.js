const express = require('express')
const routers = express.Router()
const controller = require('../controllers/schedule')
const validate = require('../middleware/validate')

routers.get('/', controller.getAll)
routers.get('/:id', controller.getData)
routers.post('/', validate(['admin']), controller.createData)
routers.put('/:id', validate(['admin']), controller.updateData)
routers.delete('/:id', validate(['admin']), controller.deleteData)

module.exports = routers
