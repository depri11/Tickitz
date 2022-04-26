const express = require('express')
const routers = express.Router()
const controller = require('../controllers/movie')
const validate = require('../middleware/validate')

routers.get('/', controller.getData)
routers.get('/all', controller.getAll)
routers.get('/search', controller.getTitle)
routers.get('/:id', controller.getMovie)
routers.post('/', controller.createData)
routers.put('/:id', validate, controller.updateData)
routers.delete('/:id', validate, controller.deleteMovie)

module.exports = routers
