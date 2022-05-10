const express = require('express')
const routers = express.Router()
const controller = require('../controllers/booking')
const validate = require('../middleware/validate')

routers.get('/', validate(['admin']), controller.getAll)
routers.post('/', validate(['admin', 'user']), controller.createData)
routers.get('/:id', validate(['admin', 'user']), controller.getData)
routers.put('/:id', validate(['admin', 'user']), controller.updateData)
routers.delete('/:id', validate(['admin', 'user']), controller.deleteData)

module.exports = routers
