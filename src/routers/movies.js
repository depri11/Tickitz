const express = require('express')
const routers = express.Router()
const controller = require('../controllers/movie')

routers.get('/', controller.getAll)
routers.get('/search', controller.getTitle)
routers.get('/:id', controller.getMovie)
routers.post('/', controller.createData)
routers.put('/:id', controller.updateData)
routers.delete('/:id', controller.deleteMovie)

module.exports = routers
